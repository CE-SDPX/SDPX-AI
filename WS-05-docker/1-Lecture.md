# WS-05 · Lecture — Environment Loop

เมื่อจบคาบ นักศึกษาควรสามารถ

- อธิบายว่าความต่างของสิ่งแวดล้อมระหว่างเครื่องของสมาชิก CI และเว็บจริงทำให้ผลการตรวจเชื่อถือไม่ได้อย่างไร
- เขียน `Dockerfile` และ `compose.yaml` ที่ทำให้ทั้งระบบรันได้ด้วยคำสั่งเดียว และข้อมูลไม่หายเมื่อเริ่มใหม่
- ย้ายที่เก็บข้อมูลไปเป็น PostgreSQL โดยไม่แก้ชั้น domain และแยก unit test กับ integration test
- เปลี่ยนกติกาใน `AGENTS.md` ที่ต้องเป็นจริงเสมอให้เป็น guard ที่ทำงานก่อน AI agent รันคำสั่งและก่อน merge

---

## 0. ทบทวน keyword และคำถามเปิด

สุ่มถามความหมายของ keyword จาก `0-Before.md` 2–3 คำ โดยให้ตอบด้วยคำพูดของตนเอง

จากนั้นถามทั้งห้องจากผลในส่วน C ของ `0-Before.md`

> การ clone repository ลงโฟลเดอร์ใหม่จนเปิด `/api/events` ได้ ใช้เวลาเท่าไร และต้องทำอะไรที่ไม่ได้เขียนไว้ใน repository บ้าง
> จำนวนที่นั่งคงเหลือบนเว็บจริงตรงกันทั้ง 5 ครั้งหรือไม่

คำตอบที่มักได้คือ แต่ละคนใช้เวลาต่างกันมาก และต้องรู้ขั้นตอนบางอย่างจากเพื่อน
ส่วนจำนวนที่นั่งบนเว็บจริงไม่ตรงกัน เพราะข้อมูลในหน่วยความจำของแต่ละ instance บน Vercel แยกกัน
ทั้งสองเรื่องคือปัญหาเดียวกัน สิ่งแวดล้อมที่ code ทำงานอยู่ไม่เหมือนกัน และไม่ได้ถูกกำหนดไว้ใน repository

---

## 1. Environment Loop

### สิ่งแวดล้อม 3 แห่งของกลุ่ม

| | ก่อนบทนี้ | หลังบทนี้ |
|---|---|---|
| เครื่องของสมาชิก | Node.js รุ่นที่แต่ละคนติดตั้ง ข้อมูลในหน่วยความจำ | `docker compose up` ได้ Node.js 22 และ PostgreSQL 17 เหมือนกันทุกเครื่อง |
| CI | Node.js 22 ไม่มีฐานข้อมูล | Node.js 22 และ PostgreSQL 17 image เดียวกับในเครื่อง |
| เว็บจริง | Vercel ข้อมูลในหน่วยความจำของแต่ละ instance | Vercel และ PostgreSQL 17 ที่ให้บริการภายนอก ข้อมูลชุดเดียวกันทุกคำขอ |

```mermaid
flowchart LR
    subgraph REPO["repository"]
        DF["Dockerfile"]
        CO["compose.yaml"]
        SQL["db/schema.sql<br/>db/seed.sql"]
    end

    subgraph LOCAL["เครื่องของสมาชิก"]
        APP1["container app<br/>Node.js 22"] --> DB1["container db<br/>postgres:17"]
        DB1 --- VOL["volume pgdata"]
    end

    subgraph CI["GitHub Actions"]
        T["npm run test:db"] --> DB2["service db<br/>postgres:17"]
        B["docker build"]
    end

    subgraph PROD["เว็บจริง"]
        V["Vercel"] --> N["PostgreSQL ภายนอก<br/>เช่น Neon"]
    end

    CO --> APP1
    CO --> DB1
    DF --> APP1
    DF --> B
    SQL --> DB1
    SQL --> DB2
    SQL -.->|"คนรันเอง"| N
```

สิ่งที่เหมือนกันทั้ง 3 แห่งคือรุ่นของ PostgreSQL, schema และ seed data
สิ่งที่ยังต่างคือเว็บจริงไม่ได้รันจาก image ของกลุ่ม Vercel build จาก source code เอง
`Dockerfile` จึงไม่ได้ใช้ขึ้นเว็บจริง แต่ใช้ให้ทุกเครื่องรันระบบเหมือนกัน และให้ CI ยืนยันว่าทั้งระบบ build ได้

### เหตุใดเรื่องนี้สำคัญขึ้นเมื่อใช้ AI agent

AI agent รันคำสั่งในสิ่งแวดล้อมของผู้ที่สั่ง ถ้าสิ่งแวดล้อมของแต่ละคนต่างกัน
ผล `npm test` ที่ agent แสดงในเครื่องหนึ่งก็ไม่ได้บอกว่าเครื่องอื่นหรือเว็บจริงจะได้ผลเดียวกัน
ขั้น Verify ของ agent เชื่อถือได้เท่ากับสิ่งแวดล้อมที่ใช้ตรวจเท่านั้น

บทต่อ ๆ ไปต้องใช้ฐานข้อมูลจริงด้วย
E2E test ในบทที่ 6 รันกับระบบที่เปิดด้วย `docker compose up`
และ load test ในบทที่ 7 ตรวจกฎ R6 ซึ่งข้อมูลในหน่วยความจำของ process เดียวไม่มีทางแสดงปัญหาที่เกิดเมื่อมีคำขอพร้อมกันหลายรายการ

| คุณสมบัติของ loop | ตัววัดในบทนี้ |
|---|---|
| Latency | เวลาตั้งแต่ clone ลงโฟลเดอร์ใหม่จน `/api/events` ตอบกลับ |
| Fidelity | ผลของ `npm run test:db` ในเครื่องและใน CI ตรงกัน เพราะใช้ PostgreSQL รุ่นเดียวกัน |
| Coverage | ทุกสิ่งที่ต้องใช้ในการรันอยู่ใน repository ไม่มีขั้นตอนที่ต้องถามเพื่อน |

---

## 2. Docker ที่ต้องรู้ในบทนี้

### image, container และ volume

```mermaid
flowchart LR
    DF["Dockerfile"] -->|"docker build"| IMG["image"]
    IMG -->|"docker run หรือ compose up"| C1["container"]
    IMG --> C2["container อีกตัว<br/>ได้ผลเหมือนกัน"]
    C1 --- VOL["volume<br/>ข้อมูลอยู่ต่อแม้ลบ container"]
```

| คำสั่ง | ผลต่อ container | ผลต่อข้อมูลใน volume |
|---|---|---|
| `docker compose up -d` | สร้างและเปิด | ใช้ข้อมูลเดิม หรือสร้าง volume ใหม่หากยังไม่มี |
| `docker compose down` | หยุดและลบ | ยังอยู่ |
| `docker compose down -v` | หยุดและลบ | **ถูกลบทั้งหมด** |
| `docker compose up -d --build` | build image ใหม่แล้วสร้าง container ใหม่ | ยังอยู่ |

### `Dockerfile`

**หลักการ**

- ระบุรุ่นของ base image เสมอ เช่น `node:22-alpine` ไม่ใช้ `latest`
- copy `package.json` และ `package-lock.json` แล้ว `npm ci` ก่อน copy code ส่วนอื่น
  เมื่อแก้เฉพาะ code Docker จะใช้ผลของ `npm ci` เดิมซ้ำ build จึงเร็วขึ้น
- แยก stage ที่ build ออกจาก stage ที่รัน image สุดท้ายจึงมีเฉพาะสิ่งที่ต้องใช้รัน
- มี `.dockerignore` ที่ตัด `node_modules`, `.next`, `.git` และไฟล์ `.env*` ออก ค่าความลับจึงไม่ติดไปใน image
- รัน process ด้วยผู้ใช้ที่ไม่ใช่ root
- ไม่ใส่ค่าความลับใน `Dockerfile` ส่งเข้ามาตอนรันผ่าน environment variable

**ตัวอย่างที่ไม่ดี**

```dockerfile
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
ENV DATABASE_URL=postgres://owner:s3cret@db.example.com/prod
CMD ["npm", "run", "dev"]
```

| ปัญหา | ผลที่ตามมา |
|---|---|
| `node:latest` | วันหนึ่ง Node.js เปลี่ยนรุ่นหลัก build ที่เคยผ่านก็ไม่ผ่านโดยไม่มีใครแก้ code |
| `COPY . .` ก่อน `npm install` และไม่มี `.dockerignore` | แก้ code บรรทัดเดียวก็ต้องติดตั้ง package ใหม่ทั้งหมด และ `.env.local` ในเครื่องติดไปใน image |
| `npm install` แทน `npm ci` | รุ่นของ package อาจไม่ตรงกับ `package-lock.json` |
| ค่าความลับใน `ENV` | ทุกคนที่ได้ image ไปอ่านรหัสผ่านได้ และค่านั้นอยู่ในประวัติของ git |
| `npm run dev` | รันแบบพัฒนา ช้ากว่าและทำงานต่างจากแบบที่ build แล้ว |
| ไม่แยก stage และรันด้วย root | image ใหญ่ และหาก process ถูกโจมตี ผู้โจมตีได้สิทธิ์สูงสุดใน container |

ตัวอย่างที่ดีคือ `Dockerfile` ในขั้นตอนที่ 4 ของ lab
ซึ่งใช้ `output: "standalone"` ของ Next.js ให้ build รวบรวมเฉพาะไฟล์ที่ต้องใช้รันไว้ใน `.next/standalone`

### `compose.yaml`

ตัวอย่างนี้ใช้ feature "แจ้งเตือนเมื่อได้ที่นั่งจากคิวสำรอง" ซึ่งอยู่นอกขอบเขตของ project
สมมติว่ามี process แยกชื่อ `notifier` ที่อ่านฐานข้อมูลเป็นระยะแล้วส่งการแจ้งเตือน

**หลักการ**

- ระบุรุ่นของทุก image
- service ที่ต้องใช้ฐานข้อมูลรอจนฐานข้อมูลพร้อมจริง ด้วย `healthcheck` และ `condition: service_healthy`
  `depends_on` อย่างเดียวรอแค่ให้ container เริ่ม ไม่ได้รอให้ฐานข้อมูลรับการเชื่อมต่อได้
- ข้อมูลที่ต้องอยู่ต่อเก็บใน volume ที่มีชื่อ
- ค่าที่ใช้ในเครื่องเท่านั้น เช่น รหัสผ่าน `app` ของฐานข้อมูลในเครื่อง ใส่ใน `compose.yaml` ได้
  ค่าความลับของเว็บจริงห้ามอยู่ในไฟล์นี้
- ใน network ของ compose แต่ละ service เรียกกันด้วยชื่อ service เช่น `db:5432` ไม่ใช่ `localhost`

**ตัวอย่างที่ดี**

```yaml
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: events
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d events"]
      interval: 2s
      retries: 15

  notifier:
    build: .
    command: ["node", "notifier.js"]
    environment:
      DATABASE_URL: postgres://app:app@db:5432/events
      NOTIFY_MODE: log
    depends_on:
      db:
        condition: service_healthy

volumes:
  pgdata:
```

**ตัวอย่างที่ไม่ดี**

```yaml
services:
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: app
  notifier:
    build: .
    command: ["node", "notifier.js"]
    environment:
      DATABASE_URL: postgres://postgres:app@localhost:5432/postgres
      SMTP_PASSWORD: real-smtp-password
    depends_on:
      - db
```

| ปัญหา | ผลที่ตามมา |
|---|---|
| `image: postgres` ไม่ระบุรุ่น | เครื่องที่ดาวน์โหลดคนละวันได้ PostgreSQL คนละรุ่นหลัก ข้อมูลใน volume เดิมอาจใช้กับรุ่นใหม่ไม่ได้ |
| ไม่มี volume | `docker compose down` แล้วข้อมูลหายทั้งหมด |
| `localhost` ใน `DATABASE_URL` | ภายใน container `localhost` คือตัว container เอง เชื่อมต่อฐานข้อมูลไม่ได้ |
| `depends_on` ไม่มี `healthcheck` | `notifier` เริ่มก่อนฐานข้อมูลพร้อม แล้วล้มเป็นบางครั้ง ซึ่งหาสาเหตุยาก |
| รหัสผ่าน SMTP จริงในไฟล์ | ค่าความลับอยู่ในประวัติของ git และทุกคนที่รันในเครื่องส่งการแจ้งเตือนจริงได้ |

---

## 3. จากหน่วยความจำเป็น PostgreSQL

### ADR-003 แทนที่ ADR-001

ADR-001 ตัดสินว่าจะเก็บข้อมูลอย่างไร **ก่อนถึงบทที่ 5** บทนี้จึงต้องตัดสินใหม่
ตามกติกาใน `AGENTS.md` ไม่แก้เนื้อหาของ ADR เดิม แต่เขียน ADR-003
และสมาชิกแก้เฉพาะบรรทัดสถานะของ ADR-001 เป็น "ถูกแทนที่โดย ADR-003"

| ทางเลือกสำหรับเว็บจริง | ข้อดี | ข้อจำกัดที่ต้องรู้ |
|---|---|---|
| PostgreSQL จาก Vercel Marketplace เช่น Neon | ติดตั้งจากหน้า Storage ของ Vercel และ Vercel ใส่ `DATABASE_URL` ให้เอง | ต้องตรวจขีดจำกัดของแผนฟรี และการเชื่อมต่อผ่านเครือข่ายช้ากว่าในเครื่อง |
| PostgreSQL จากผู้ให้บริการอื่น เช่น Supabase | มีบริการอื่นให้ใช้เพิ่ม | ต้องคัดลอก `DATABASE_URL` ไปใส่ใน Vercel เอง |
| ใช้ PostgreSQL เฉพาะในเครื่องและ CI เว็บจริงยังใช้หน่วยความจำ | ไม่ต้องสมัครบริการเพิ่ม | เว็บจริงทำงานต่างจากที่ทดสอบ ข้อมูลยังไม่ตรงกันระหว่างคำขอ |

Vercel ระบุว่าการใช้ Postgres บน Vercel ทำผ่าน Marketplace และ Vercel Postgres เดิมถูกย้ายไป Neon แล้ว
อ้างอิง: [Vercel — Postgres on Vercel](https://vercel.com/docs/postgres) ·
[Neon — Vercel-managed integration](https://neon.com/docs/guides/vercel-managed-integration)

### ADR-002 ทำให้การย้ายเล็กลง

```mermaid
flowchart TB
    R["route handler<br/>src/app/api"] --> D["domain<br/>src/domain · กฎ R1–R5"]
    R --> S["data<br/>src/data"]
    S -->|"ก่อน"| MEM["หน่วยความจำ"]
    S -->|"หลัง"| PG["PostgreSQL"]
```

กฎทั้งหมดอยู่ใน `src/domain` และรับข้อมูลเป็น argument ตาม ADR-002
การย้ายไป PostgreSQL จึงแก้เฉพาะ `src/data` และให้ route handler รอผลด้วย `await`
**ไฟล์ใน `src/domain` และ unit test ไม่ควรเปลี่ยนแม้แต่บรรทัดเดียว**
หาก AI แก้ไฟล์ใน `src/domain` ระหว่างการย้าย แปลว่ามีกฎรั่วออกไปอยู่นอก domain หรือ AI ทำเกินกว่าที่แผนกำหนด

### schema และ seed data

`db/schema.sql` สร้างตาราง และ `db/seed.sql` ใส่ข้อมูลตั้งต้นตามหัวข้อที่ 3 ของ `PROJECT.md`
ไฟล์ชุดเดียวกันนี้ใช้ทั้ง 3 แห่ง แต่ใส่เข้าฐานข้อมูลต่างวิธีกัน

| ที่ | วิธีใส่ schema และ seed | ผู้ทำ |
|---|---|---|
| เครื่องของสมาชิก | PostgreSQL image รันไฟล์ใน `/docker-entrypoint-initdb.d` อัตโนมัติ **เฉพาะเมื่อ volume ยังว่าง** | อัตโนมัติ |
| CI | `npm run db:setup` ก่อน `npm run test:db` | อัตโนมัติ |
| เว็บจริง | คัดลอกไฟล์ไปรันใน SQL Editor ของผู้ให้บริการ | สมาชิก ไม่ใช่ AI agent |

ข้อที่มักพลาดคือแก้ `db/schema.sql` แล้วคาดว่าฐานข้อมูลในเครื่องจะเปลี่ยนตาม
ไฟล์ใน `/docker-entrypoint-initdb.d` ทำงานครั้งเดียวตอนสร้าง volume
การใช้ schema ใหม่ต้องลบ volume ด้วย `docker compose down -v` ซึ่งลบข้อมูลทั้งหมด
คำสั่งนี้คนต้องเป็นผู้ตัดสินใจ หัวข้อ 4 จะใช้ guard ขวางไม่ให้ AI agent รันเอง

### unit test และ integration test

| | unit test | integration test |
|---|---|---|
| ไฟล์ | `*.test.ts` | `*.db.test.ts` |
| ตรวจอะไร | กฎ R1–R5 ใน `src/domain` | query ใน `src/data` กับ PostgreSQL จริง เช่น คิวสำรองเรียงตาม `created_at` |
| ต้องมีฐานข้อมูล | ไม่ต้อง | ต้อง |
| คำสั่ง | `npm test` | `npm run test:db` |
| เวลา | ไม่ถึง 1 วินาที | ไม่กี่วินาที |

แยกคำสั่งไว้เพื่อให้ `npm test` ยังเร็วและรันได้ทุกที่ แม้ไม่ได้เปิด Docker
AI agent จึงรัน `npm test` ได้ทุกครั้งที่แก้ code และรัน `npm run test:db` เมื่อแก้ `src/data`

### `DATABASE_URL` แต่ละที่มาจากไหน

| ที่ | ค่า | เก็บที่ใด |
|---|---|---|
| `npm run dev` ในเครื่อง | `postgres://app:app@localhost:5432/events` | `.env.local` ซึ่งไม่อยู่ใน git |
| container `app` ใน compose | `postgres://app:app@db:5432/events` | `compose.yaml` |
| CI | `postgres://app:app@localhost:5432/events` | `ci.yml` |
| เว็บจริง | ค่าที่ผู้ให้บริการสร้าง มีรหัสผ่านจริง | environment variable ของ Vercel เท่านั้น |

รหัสผ่าน `app` ใช้ได้เฉพาะฐานข้อมูลในเครื่องซึ่งไม่มีข้อมูลจริง จึงอยู่ใน repository ได้
ส่วนค่าของเว็บจริงไม่ควรอยู่ในเครื่องของสมาชิกหรือของ AI agent เลย

---

## 4. Guard: จากกติกาเป็นสิ่งที่ฝ่าฝืนไม่ได้

### กติกาใน `AGENTS.md` เป็นเพียงคำแนะนำ

ตั้งแต่ WS-01 กลุ่มเขียนกติกาไว้ใน `AGENTS.md` เช่น ห้ามแก้ไฟล์ test และห้ามใส่ค่าความลับใน code
AI agent อ่านกติกาเหล่านี้และทำตามได้เกือบทุกครั้ง แต่ไม่ใช่ทุกครั้ง
*The AI-native SDLC playbook* แยกการควบคุมเป็น 2 แบบ
คำแนะนำอย่าง skill หรือกติกาทำให้การฝ่าฝืนเกิดได้ยาก ส่วน hook ซึ่งทำงานแน่นอนทุกครั้งทำให้การฝ่าฝืนแทบเป็นไปไม่ได้
นโยบายที่ต้องเป็นจริงเสมอจึงต้องมีสิ่งที่ทำงานแน่นอนอยู่ด้านหลัง

| | กติกาใน `AGENTS.md` | guard |
|---|---|---|
| ทำงานอย่างไร | AI อ่านแล้วตัดสินใจเองว่าจะทำตาม | script ตรวจทุกครั้งแล้วขวาง ไม่ขึ้นกับการตัดสินใจของ AI |
| เมื่อ AI ลืมหรือเข้าใจผิด | ฝ่าฝืนได้ | ถูกขวาง |
| เหมาะกับ | แนวทางที่ต้องใช้วิจารณญาณ เช่น วิธีตั้งชื่อ | สิ่งที่ห้ามเกิดเด็ดขาด เช่น ลบข้อมูล หรือ commit ค่าความลับ |

> **ตัวอย่างจากการทำงานจริง: AI agent ลบฐานข้อมูลของเว็บจริง**
> เดือนกรกฎาคม 2025 Jason Lemkin ผู้ก่อตั้ง SaaStr ใช้ agent ของ Replit พัฒนาแอป
> และสั่งให้หยุดแก้ code ไว้ก่อน แต่ agent กลับรันคำสั่งที่ลบฐานข้อมูลของเว็บจริง
> ซึ่งมีข้อมูลผู้บริหาร 1,206 คนและบริษัทกว่า 1,196 แห่ง
> ซีอีโอของ Replit ยอมรับว่าไม่ควรเกิดขึ้นได้ ต้นเหตุส่วนหนึ่งคือแอปใช้ฐานข้อมูลเดียวกันทั้งตอนพัฒนาและตอนใช้งานจริง
> Replit จึงเริ่มแยกฐานข้อมูลสำหรับพัฒนาออกจากฐานข้อมูลของเว็บจริงโดยอัตโนมัติ
> คำสั่งให้หยุดเป็นเพียงคำแนะนำที่ agent ไม่ทำตาม สิ่งที่ป้องกันได้จริงคือ agent ไม่มีทางเข้าถึงฐานข้อมูลของเว็บจริงตั้งแต่แรก
>
> อ้างอิง:
> [The Register — Replit makes promise to stop its AI agents making vibe coding disasters](https://www.theregister.com/2025/07/22/replit_saastr_response/) ·
> [eWeek — AI Agent Wipes Production Database, Then Lies About It](https://www.eweek.com/news/replit-ai-coding-assistant-failure/)

### guard 2 ชั้นของกลุ่ม

| ชั้น | ทำงานเมื่อใด | ตัวอย่างในบทนี้ | หากไม่มีชั้นนี้ |
|---|---|---|---|
| hook ของ AI agent | ก่อน agent รันคำสั่งหรือแก้ไฟล์ | `protect-db.mjs` ขวางคำสั่งที่ลบข้อมูลหรือเชื่อมต่อฐานข้อมูลที่ไม่ใช่ในเครื่อง | ความเสียหายเกิดในเครื่องก่อนมีใครเห็น |
| CI | ก่อน merge | `no-secrets.mjs` ขวาง PR ที่มีไฟล์ `.env` หรือรหัสผ่านของฐานข้อมูลจริง | ค่าความลับเข้า `main` และอยู่ในประวัติของ git |

script ของ guard อยู่ใน `.agents/guards/` และเขียนด้วย Node.js ซึ่งทุกคนมีอยู่แล้ว
agent ต่างยี่ห้อตั้งค่า hook ต่างกัน แต่เรียก script เดียวกันได้
ชั้น CI ทำงานเหมือนกันไม่ว่าสมาชิกจะใช้ agent ใด

### ส่วนประกอบของ guard

**หลักการ**

- ทำงานเร็วและตรวจเฉพาะสิ่งที่ส่งเข้ามา งานหนักอย่าง test ทั้งชุดอยู่ใน CI
- ขวางด้วยวิธีที่ agent เข้าใจว่าถูกขวาง ใน Claude Code คือออกด้วย exit code 2
  exit code อื่นที่ไม่ใช่ 0 ถือว่า hook ผิดพลาดเอง และคำสั่งยังทำงานต่อ
- ข้อความที่ขวางบอกเหตุผลและทางต่อไป agent จะได้หยุดและอธิบาย ไม่พยายามหาทางอ้อม
- ขวางให้แคบที่สุดเท่าที่ป้องกันได้ guard ที่ขวางเกินจำเป็นจะถูกปิดทิ้ง
- มี test ของตนเอง ทั้งกรณีที่ต้องขวางและกรณีที่ต้องปล่อย

ตัวอย่างนี้ใช้กับ feature แจ้งเตือนเดิม สมมติว่ามีไฟล์ `.env.notify` เก็บรหัสผ่าน SMTP ที่ไม่ให้ agent แก้หรืออ่าน
hook ของ Claude Code ส่งข้อมูลการแก้ไฟล์เป็น JSON ทาง stdin ซึ่งมี `tool_input.file_path`

**ตัวอย่างที่ดี**

```js
// .agents/guards/protect-env.mjs
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const file = input.tool_input?.file_path ?? "";

if (/(^|\/)\.env(\.[\w-]+)?$/.test(file) && !file.endsWith(".env.example")) {
  console.error(
    `BLOCKED by .agents/guards/protect-env.mjs: ${file} เก็บค่าความลับ\n` +
      "ห้าม AI agent อ่านหรือแก้ไฟล์นี้ หากต้องเพิ่มตัวแปรใหม่ให้แก้ .env.example แล้วแจ้งสมาชิก",
  );
  process.exit(2);
}
```

**ตัวอย่างที่ไม่ดี**

```js
const raw = require("fs").readFileSync(0, "utf8");
if (raw.includes("env")) process.exit(1);
```

| ปัญหา | ผลที่ตามมา |
|---|---|
| `process.exit(1)` | Claude Code ถือว่า hook ผิดพลาดเอง และให้ agent แก้ไฟล์ต่อได้ guard ไม่ได้ขวางอะไรเลย |
| ไม่มีข้อความ | agent ไม่รู้ว่าถูกขวางเพราะอะไร อาจลองวิธีอื่นที่ได้ผลเดียวกัน |
| ตรวจคำว่า `env` ทั้งข้อความ | ขวางการแก้ `src/lib/environment.ts` และ `.env.example` ด้วย สมาชิกจะรำคาญจนปิด guard |
| ไม่มี test | ไม่รู้ว่า guard ขวางได้จริงจนกว่าจะเกิดเหตุ |

### guard ไม่ใช่กำแพง

guard ที่ตรวจข้อความของคำสั่งถูกอ้อมได้ เช่น agent เขียนคำสั่งลงไฟล์ script แล้วรันไฟล์นั้น
guard จึงเป็นชั้นหนึ่งเท่านั้น ชั้นที่สำคัญกว่าคือไม่ให้สิ่งที่อันตรายอยู่ในมือของ agent ตั้งแต่แรก
ในบทนี้ `DATABASE_URL` ของเว็บจริงอยู่ใน Vercel เท่านั้น
และการใส่ schema ลงฐานข้อมูลของเว็บจริงทำผ่าน SQL Editor โดยสมาชิก agent จึงไม่มีค่าที่จะใช้เชื่อมต่อ

> **ตัวอย่างจากการทำงานจริง: คำสั่งลบข้อมูลถูกฝังเข้าไปใน AI agent**
> เดือนกรกฎาคม 2025 ผู้โจมตีส่งการแก้ไขเข้า repository แบบ open source ของ extension Amazon Q Developer สำหรับ VS Code
> การแก้ไขนั้นเพิ่ม prompt ที่สั่งให้ AI ลบไฟล์ใน home directory ของผู้ใช้ และค้นหา AWS profile เพื่อลบทรัพยากรบน cloud
> โดยรัน agent แบบอนุญาตทุกเครื่องมือและไม่ถามผู้ใช้ (`--trust-all-tools` และ `--no-interactive`)
> การแก้ไขนี้ถูกเผยแพร่ไปในรุ่น 1.84 และถูกถอนออกในรุ่น 1.85 สองวันต่อมา
> AWS ระบุว่าไม่มีบริการหรือผู้ใช้ได้รับผลกระทบ
> เหตุการณ์นี้แสดงว่าคำสั่งที่ agent รันอาจไม่ได้มาจากผู้ใช้ และการปิดการถามผู้ใช้ทำให้ไม่มีคนอยู่ในวงเลย
> guard ที่ขวางคำสั่งอันตรายและสิทธิ์ที่จำกัดจึงยังจำเป็น แม้ผู้ใช้จะไม่ได้สั่งสิ่งที่อันตรายเลย
>
> อ้างอิง:
> [The Register — Compromised Amazon Q extension told AI to delete everything](https://www.theregister.com/2025/07/24/amazon_q_ai_prompt/) ·
> [BleepingComputer — Amazon AI coding agent hacked to inject data wiping commands](https://www.bleepingcomputer.com/news/security/amazon-ai-coding-agent-hacked-to-inject-data-wiping-commands/)

### เริ่มจากทำเอง แล้วจึงเขียนเป็น code

guard ไม่ได้เขียนครั้งเดียวครบทุกข้อ ให้เริ่มจากกติกาที่ AI agent ของกลุ่มเคยฝ่าฝืนจริง
ซึ่งรวบรวมไว้ในส่วน C ของ `0-Before.md`
เมื่อกติกาข้อใดถูกฝ่าฝืนซ้ำ หรือผลของการฝ่าฝืนแก้คืนไม่ได้ ข้อนั้นควรเป็น guard
ส่วนกติกาที่ต้องใช้วิจารณญาณยังอยู่ใน `AGENTS.md` ต่อไป

| คนอยู่ในวงตอนไหน | ในบทนี้ |
|---|---|
| เมื่อ guard ขวาง | agent หยุดและอธิบาย สมาชิกตัดสินใจว่าจะรันคำสั่งนั้นเองหรือไม่ |
| เมื่อต้องแตะเว็บจริง | สมาชิกใส่ schema ผ่าน SQL Editor และตั้งค่า environment variable ใน Vercel |
| เมื่อจะเพิ่ม guard | สมาชิกเลือกกติกาจากสิ่งที่เคยเกิด และอนุมัติ PR ของ guard |

---

## สรุป

1. ผลการตรวจเชื่อถือได้เท่ากับสิ่งแวดล้อมที่ใช้ตรวจ ให้ทุกสิ่งที่ต้องใช้รันอยู่ใน repository และใช้ PostgreSQL รุ่นเดียวกันทุกที่
2. container ลบแล้วสร้างใหม่ได้ ข้อมูลที่ต้องอยู่ต่อเก็บใน volume และ `docker compose down -v` ลบข้อมูลนั้นทั้งหมด
3. ADR-002 ทำให้การย้ายไป PostgreSQL แก้เฉพาะ `src/data` หาก `src/domain` เปลี่ยน แปลว่ามีบางอย่างผิด
4. กติกาที่ต้องเป็นจริงเสมอต้องเป็น guard ที่ขวางทุกครั้ง ทั้งก่อน agent รันคำสั่งและก่อน merge
5. guard ถูกอ้อมได้ ค่าความลับและสิทธิ์ของเว็บจริงจึงต้องไม่อยู่ในมือของ agent ตั้งแต่แรก
