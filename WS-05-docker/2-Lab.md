# WS-05 · Lab — Environment Loop

**รูปแบบ:** งานกลุ่ม ใช้ repository เดิมของกลุ่มจาก WS-04

**เป้าหมาย:** ทั้งระบบรันได้ด้วย `docker compose up` บนทุกเครื่อง
ข้อมูลเก็บใน PostgreSQL ทั้งในเครื่อง ใน CI และบนเว็บจริง โดยไม่แก้ไฟล์ใน `src/domain`
และมี guard ที่ขวาง AI agent จากคำสั่งที่ลบข้อมูล และขวาง PR ที่มีค่าความลับ

---

## สิ่งที่ต้องมีก่อนเริ่ม

- WS-04 เสร็จแล้ว: ruleset `main-gate` ทำงานอยู่ และ `03-cancel` ถูก merge
- ทุกคนทำ `0-Before.md` ส่วน B และ C เสร็จแล้ว และดาวน์โหลด image `postgres:17` กับ `node:22-alpine` ไว้แล้ว
- เจ้าของ project บน Vercel อยู่ในคาบ เพราะขั้นตอนที่ 2.2 ต้องใช้สิทธิ์ของเจ้าของ

lab นี้เขียนตามกรณีที่กลุ่มเลือก Neon ใน ADR-003 หากเลือกผู้ให้บริการอื่น ให้ปรับขั้นตอนที่ 2.2 ตามเอกสารของผู้ให้บริการนั้น

---

## โครงสร้าง repository ที่จะได้เมื่อจบบทนี้

แสดงเฉพาะไฟล์ที่เพิ่มหรือแก้ในบทนี้ ตัวเลขหลังชื่อไฟล์คือขั้นตอนที่สร้างหรือแก้ไฟล์นั้น
ชื่อไฟล์ใน `src/data/` เป็นตัวอย่าง ให้ใช้ตามแผนของกลุ่ม

```
sdpx-[ชื่อกลุ่ม]/
├── AGENTS.md                         ← 3, 4, 5
├── compose.yaml                      ← 2 service db · 4 service app
├── Dockerfile                        ← 4
├── .dockerignore                     ← 4
├── .env.example                      ← 2
├── .gitignore                        ← 2 ให้ .env.example อยู่ใน git ได้
├── next.config.ts                    ← 4
├── vitest.config.mts                 ← 5
├── package.json                      ← 3 script test, test:db, db:setup
├── .agents/
│   └── guards/
│       ├── protect-db.mjs            ← 5
│       ├── protect-db.test.ts        ← 5
│       ├── no-secrets.mjs            ← 5
│       └── [guard ของกลุ่ม].mjs       ← 5
├── .claude/settings.json             ← 5 หรือไฟล์ตั้งค่า hook ของ agent ที่กลุ่มใช้
├── db/
│   ├── schema.sql                    ← 2
│   └── seed.sql                      ← 2
├── scripts/
│   └── db-setup.mjs                  ← 3
├── docs/
│   ├── adr/
│   │   ├── ADR-001-data-storage.md   ← 1 แก้เฉพาะบรรทัดสถานะ
│   │   └── ADR-003-postgresql.md     ← 1
│   └── plans/
│       └── postgres.md               ← 3
├── src/
│   ├── data/
│   │   ├── db.ts                     ← 3
│   │   ├── [ไฟล์เดิมของชั้น data]      ← 3 เปลี่ยนเป็น PostgreSQL
│   │   └── *.db.test.ts              ← 3
│   └── app/api/...                   ← 3 รอผลด้วย await
├── evidence/
│   └── ws-05.md                      ← 7
└── .github/workflows/ci.yml          ← 3, 4, 5
```

ฐานข้อมูลของเว็บจริงในขั้นตอนที่ 2.2 ไม่ใช่ไฟล์ใน repository แต่เป็นการตั้งค่าใน Vercel และ Neon

---

## ขั้นตอนที่ 1 — เขียน ADR-003

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/adr-003
```

สร้าง `docs/adr/ADR-003-postgresql.md` ทางเลือกอย่างน้อย 3 ทางตามหัวข้อ 3 ของ lecture

```markdown
# ADR-003: ใช้ PostgreSQL เก็บข้อมูล

สถานะ: ใช้อยู่ · แทนที่ ADR-001
วันที่: [วันที่]

## บริบท
[ปัญหาที่พบจาก ADR-001 เช่น ผลจากส่วน C ของ 0-Before.md และสิ่งที่บทที่ 6 และ 7 ต้องใช้]

## ทางเลือกที่พิจารณาสำหรับเว็บจริง
1. PostgreSQL จาก Vercel Marketplace (Neon) — ข้อดี / ข้อเสีย
2. [ผู้ให้บริการอื่น] — ข้อดี / ข้อเสีย
3. PostgreSQL เฉพาะในเครื่องและ CI เว็บจริงยังใช้หน่วยความจำ — ข้อดี / ข้อเสีย

## การตัดสินใจ
ในเครื่องและ CI ใช้ image postgres:17 · เว็บจริงใช้ [ทางที่เลือก]

## ผลที่ตามมา
[ผลต่อ src/data และ src/domain, ใครใส่ schema ลงฐานข้อมูลของเว็บจริงและอย่างไร, ค่า DATABASE_URL ของเว็บจริงเก็บที่ใด, ความเสี่ยงที่ยอมรับ]
```

สมาชิกแก้บรรทัดสถานะของ `docs/adr/ADR-001-data-storage.md` เป็น `สถานะ: ถูกแทนที่โดย ADR-003` ด้วยตนเอง
ไม่แก้ส่วนอื่นของ ADR-001 และไม่ให้ AI agent แก้ เพราะกติกาใน `AGENTS.md` ห้าม agent แก้ไฟล์ใน `docs/adr/`

commit แล้วเปิด PR ให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- ADR-003 มีทางเลือกอย่างน้อย 3 ทาง พร้อมเหตุผลที่ไม่เลือกทางอื่น
- หัวข้อผลที่ตามมาระบุว่า schema ของเว็บจริงใส่โดยสมาชิก และ `DATABASE_URL` ของเว็บจริงอยู่ใน Vercel เท่านั้น
- diff ของ ADR-001 มีเพียงบรรทัดสถานะ

**หากติดปัญหา**

- ไม่แน่ใจขีดจำกัดของแผนฟรี: เปิดหน้าราคาของผู้ให้บริการ แล้วจดสิ่งที่ยังไม่แน่ใจเป็นความเสี่ยงในหัวข้อผลที่ตามมา

---

## ขั้นตอนที่ 2 — เปิด PostgreSQL ในเครื่อง และสร้างฐานข้อมูลของเว็บจริง

### 2.1 PostgreSQL ในเครื่อง

**ทำ**

```bash
git switch main
git pull origin main
git switch -c feat/postgres-db
```

สั่ง AI agent

```
Read AGENTS.md, PROJECT.md section 3, docs/adr/ADR-003-postgresql.md, and the seed data
in src/data/. Create:
1. db/schema.sql: CREATE TABLE IF NOT EXISTS for users, events, registrations with the
   fields in PROJECT.md section 3 in snake_case. Use text primary keys. Add CHECK
   constraints for role and status values, NOT NULL where the field is required,
   and foreign keys. created_at defaults to now().
2. db/seed.sql: INSERT the same seed users and events that src/data/ has now,
   with ON CONFLICT DO NOTHING so it can run more than once. Event start times are
   relative to now(), for example now() + interval '7 days'.
Do not add tables or columns that PROJECT.md does not list. Do not change any other file.
```

ตรวจ `db/schema.sql` กับหัวข้อที่ 3 ของ `PROJECT.md` ทีละ field ก่อนไปต่อ

สร้าง `compose.yaml` ที่มีเฉพาะ service `db`

```yaml
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: events
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./db:/docker-entrypoint-initdb.d:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d events"]
      interval: 2s
      timeout: 3s
      retries: 15

volumes:
  pgdata:
```

PostgreSQL รันไฟล์ใน `db/` ตามลำดับตัวอักษร `schema.sql` จึงทำงานก่อน `seed.sql`

สร้าง `.env.example` และ `.env.local` ซึ่งมีบรรทัดเดียวกัน

```
DATABASE_URL=postgres://app:app@localhost:5432/events
```

`.gitignore` ที่ create-next-app สร้างไม่รับไฟล์ `.env*` ทั้งหมด ให้เพิ่มบรรทัดนี้ต่อจาก `.env*`

```
!.env.example
```

เปิดฐานข้อมูลแล้วตรวจ seed data

```bash
docker compose up -d db
docker compose ps
docker compose exec db psql -U app -d events -c "SELECT id, title, capacity FROM events"
```

commit แล้วเปิด PR ให้สมาชิกอีกคนอนุมัติ PR นี้ยังไม่เปลี่ยนการทำงานของเว็บ

**ผลที่ควรเห็น**

- `docker compose ps` แสดง service `db` เป็น `healthy`
- คำสั่ง `psql` แสดงกิจกรรมจาก seed data
- `git status` ก่อน commit แสดง `.env.example` แต่ไม่แสดง `.env.local`

**หากติดปัญหา**

- `port is already allocated` ที่ 5432: มี PostgreSQL อื่นรันอยู่ในเครื่อง ให้ปิดตัวนั้น หรือเปลี่ยนเป็น `"5433:5432"` แล้วแก้ port ใน `.env.local` และ `.env.example`
- ไม่พบตาราง หรือ seed data ไม่ขึ้น: ไฟล์ใน `db/` ทำงานเฉพาะเมื่อ volume ยังว่าง หากแก้ไฟล์หลังเปิดครั้งแรก สมาชิกต้องรัน `docker compose down -v` เอง ซึ่งลบข้อมูลในเครื่องทั้งหมด แล้ว `docker compose up -d db` ใหม่
- error ใน `docker compose logs db` ชี้บรรทัดใน `schema.sql`: แก้ไฟล์ แล้วลบ volume ตามข้อก่อนหน้า

### 2.2 ฐานข้อมูลของเว็บจริง

**ทำ**

เจ้าของ project บน Vercel ทำขั้นนี้ร่วมกับสมาชิกคนอื่น **ไม่ให้ AI agent ทำ**

1. เปิด project บน Vercel → แท็บ **Storage** → สร้างฐานข้อมูลจาก Marketplace โดยเลือก **Neon** และแผน Free
2. ในหน้าเชื่อมต่อ project เลือก environment **Production** และ **Preview**
   และในส่วน **Create database branch for deployment** เลือก **Preview** เท่านั้น
   Preview deployment ของแต่ละ PR จะได้ฐานข้อมูลแยกที่คัดลอกจากฐานข้อมูลของเว็บจริง
3. กด **Open in Neon** → **SQL Editor** คัดลอกเนื้อหาของ `db/schema.sql` ไปรัน แล้วทำแบบเดียวกันกับ `db/seed.sql`
4. รัน `SELECT count(*) FROM users;` ใน SQL Editor
5. เปิด Settings → Environment Variables ของ project บน Vercel ตรวจว่ามี `DATABASE_URL`

ห้ามคัดลอกค่า `DATABASE_URL` ของเว็บจริงลงไฟล์ใด ๆ ในเครื่อง หรือวางในบทสนทนากับ AI

**ผลที่ควรเห็น**

- SQL Editor แสดงจำนวนผู้ใช้เท่ากับใน `db/seed.sql`
- Vercel มี `DATABASE_URL` สำหรับ Production และ Preview

**หากติดปัญหา**

- ชื่อเมนูไม่ตรงกับที่เขียนไว้: ดูขั้นตอนใน [Neon — Vercel-managed integration](https://neon.com/docs/guides/vercel-managed-integration)
- สมาชิกที่ไม่ใช่เจ้าของเปิดหน้า Storage ไม่ได้: project อยู่ในบัญชี Hobby ของเจ้าของ ให้เจ้าของแชร์หน้าจอ

---

## ขั้นตอนที่ 3 — เปลี่ยนชั้น data เป็น PostgreSQL

**ทำ**

```bash
git switch main
git pull origin main
git switch -c feat/pg-store
npm install pg@8
npm install -D @types/pg@8
```

เปิด AI agent ในโหมดวางแผนแล้วสั่ง

```
Read AGENTS.md, docs/adr/, db/schema.sql, and every file in src/data/ and src/app/api/.
Write docs/plans/postgres.md in Thai: how to replace the current data layer with
PostgreSQL using the pg package and DATABASE_URL.
Sections: 1. References  2. Files to add or change and what changes  3. Order of work
4. Tests: integration tests in src/data/*.db.test.ts against the database from
   docker compose, including that waitlisted registrations come back ordered by created_at
5. Risks  6. Out of scope
Files in src/domain/ and every existing *.test.ts must not change.
Do not create or change any other file.
```

ตรวจว่าแผนไม่มีไฟล์ใน `src/domain/` แล้วสั่งต่อ

```
Implement docs/plans/postgres.md.
- src/data/db.ts exports one shared pg Pool created from process.env.DATABASE_URL.
- Data functions become async; route handlers await them. Keep the TEMPORARY
  src/lib/current-user.ts as it is.
- Do not change anything in src/domain/ or any existing test file.
Run npm run lint, npm test, npm run test:db and npm run build, and show the output.
```

ก่อนให้ agent รัน `npm run test:db` ให้เพิ่มไฟล์และ script ต่อไปนี้เอง

`scripts/db-setup.mjs` ใส่ schema และ seed ลงฐานข้อมูลที่ `DATABASE_URL` ชี้ ใช้ใน CI

```js
import { readFileSync } from "node:fs";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}
const client = new pg.Client({ connectionString: url });
await client.connect();
for (const file of ["db/schema.sql", "db/seed.sql"]) {
  await client.query(readFileSync(file, "utf8"));
  console.log(`applied ${file}`);
}
await client.end();
```

```bash
npm pkg set scripts.test='vitest run --exclude "**/*.db.test.ts"'
npm pkg set scripts.test:db='vitest run .db.test'
npm pkg set scripts.db:setup='node scripts/db-setup.mjs'
```

`npm test` ไม่รัน integration test จึงยังเร็วและรันได้แม้ไม่ได้เปิด Docker
`npm run test:db` อ่าน `DATABASE_URL` จาก environment ดังนั้นในเครื่องให้รันแบบนี้

```bash
DATABASE_URL=postgres://app:app@localhost:5432/events npm run test:db
```

แก้ `.github/workflows/ci.yml` ให้ CI มี PostgreSQL รุ่นเดียวกับในเครื่อง
เพิ่ม `services` และ `env` ใต้ `timeout-minutes` ของ job `build`

```yaml
    services:
      db:
        image: postgres:17
        env:
          POSTGRES_USER: app
          POSTGRES_PASSWORD: app
          POSTGRES_DB: events
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U app -d events"
          --health-interval 2s
          --health-timeout 3s
          --health-retries 15
    env:
      DATABASE_URL: postgres://app:app@localhost:5432/events
```

และเพิ่ม 2 บรรทัดต่อจาก `- run: npm test`

```yaml
      - run: npm run db:setup
      - run: npm run test:db
```

service ของ GitHub Actions เริ่มก่อน checkout จึงอ่าน `db/` ไม่ได้ CI จึงใส่ schema ด้วย `npm run db:setup` แทน

เพิ่มในหัวข้อ Commands ของ `AGENTS.md`

```markdown
- เปิดฐานข้อมูลในเครื่อง: `docker compose up -d db`
- integration test: `DATABASE_URL=postgres://app:app@localhost:5432/events npm run test:db`
```

ตรวจก่อน commit

```bash
git diff --stat origin/main -- src/domain
npm test
npm run dev
```

เปิด terminal อีกหน้าต่างแล้วรัน `curl -s -w " %{http_code}\n" http://localhost:3000/api/events`
และลงทะเบียน 1 ครั้งตามขั้นตอนที่ 5 ของ lab WS-03 จากนั้นหยุด `npm run dev` แล้วเปิดใหม่ และเรียกรายการกิจกรรมอีกครั้ง

commit แล้วเปิด PR ทำ AI review ตาม `REVIEW.md` แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- `git diff --stat origin/main -- src/domain` ไม่แสดงไฟล์ใด
- `npm test` ผ่าน และจำนวน test เท่ากับบน `main`
- `npm run test:db` ผ่านทั้งในเครื่องและใน CI
- ที่นั่งคงเหลือยังลดลงตามการลงทะเบียนหลังเปิด `npm run dev` ใหม่
- หลัง merge `[Live URL]/api/events` แสดงกิจกรรมจากฐานข้อมูลของเว็บจริง

**หากติดปัญหา**

- `client password must be a string`: ไม่ได้ตั้ง `DATABASE_URL` ก่อนรัน `npm run test:db`
- `ECONNREFUSED 127.0.0.1:5432`: ยังไม่ได้รัน `docker compose up -d db`
- `startsAt` เป็นข้อความแทน `Date` จน test ของ domain ไม่ผ่าน: `pg` คืน `timestamptz` เป็น `Date` อยู่แล้ว ตรวจว่า code แปลงชื่อ field จาก `starts_at` เป็น `startsAt` ครบ
- test เดิมไม่ผ่านเพราะ function ใน `src/data` เป็น async แล้ว: แก้ที่ route handler ห้ามแก้ test ของ domain
- AI แก้ไฟล์ใน `src/domain/`: ปฏิเสธการแก้ไขนั้น หากจำเป็นจริงให้หยุดแล้วเขียนเหตุผลไว้ในความเสี่ยงของแผน
- Live URL ตอบ `500`: เปิด Logs ของ deployment บน Vercel ตรวจว่ามี `DATABASE_URL` ใน Production และใส่ schema ในขั้นตอนที่ 2.2 แล้ว

---

## ขั้นตอนที่ 4 — รันทั้งระบบด้วย `docker compose up`

**ทำ**

```bash
git switch main
git pull origin main
git switch -c feat/docker
```

เพิ่ม `output: "standalone"` ใน `next.config.ts`

```ts
const nextConfig: NextConfig = {
  output: "standalone",
  // ค่าเดิมของกลุ่ม
};
```

สร้าง `Dockerfile`

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

สร้าง `.dockerignore`

```
node_modules
.next
.git
.env*
!.env.example
evidence
```

เพิ่ม service `app` ใน `compose.yaml` ใต้ service `db`

```yaml
  app:
    build: .
    environment:
      DATABASE_URL: postgres://app:app@db:5432/events
    ports:
      - "3000:3000"
    depends_on:
      db:
        condition: service_healthy
```

หยุด `npm run dev` ก่อน เพราะใช้ port 3000 เดียวกัน แล้วจับเวลาการ build ครั้งแรก

```bash
docker compose up -d --build
docker compose ps
curl -s -w " %{http_code}\n" http://localhost:3000/api/events
```

ตรวจว่าข้อมูลอยู่ต่อเมื่อ container ถูกลบ

```bash
curl -s -w " %{http_code}\n" -X POST http://localhost:3000/api/events/[id]/registrations -H "x-user-id: [id ผู้ใช้]"
docker compose down
docker compose up -d
curl -s http://localhost:3000/api/events
docker images
```

เพิ่มบรรทัดสุดท้ายใน `.github/workflows/ci.yml` เพื่อให้ CI ยืนยันว่า image build ได้

```yaml
      - run: docker build -t app .
```

เพิ่มในหัวข้อ Commands ของ `AGENTS.md`

```markdown
- รันทั้งระบบ: `docker compose up -d --build` แล้วเปิด http://localhost:3000
- หยุดโดยเก็บข้อมูลไว้: `docker compose down`
```

commit แล้วเปิด PR ทำ AI review แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- `docker compose ps` แสดงทั้ง `app` และ `db` และ `db` เป็น `healthy`
- `/api/events` ตอบ `200` จาก container
- หลัง `docker compose down` และ `up -d` ที่นั่งคงเหลือยังนับการลงทะเบียนเดิม
- CI ผ่านขั้น `docker build -t app .`
- deployment บน Vercel ของ PR ยังสำเร็จ แม้มี `output: "standalone"`

**หากติดปัญหา**

- `curl` ได้ `Connection reset` หรือไม่ตอบ: ดู `docker compose logs app` หากไม่มี `HOSTNAME=0.0.0.0` server จะรับเฉพาะการเชื่อมต่อจากภายใน container
- app ล้มด้วย `ECONNREFUSED`: `DATABASE_URL` ของ service `app` ใช้ `localhost` แทน `db`
- build ไม่ผ่านที่ `COPY --from=build /app/public`: repository ไม่มีโฟลเดอร์ `public` ให้สร้างโฟลเดอร์นั้นพร้อมไฟล์ `.gitkeep`
- build ไม่ผ่านเพราะ `next build` พยายามเชื่อมต่อฐานข้อมูล: route handler ที่อ่านฐานข้อมูลต้องทำงานตอนมีคำขอ ไม่ใช่ตอน build ตรวจว่าไม่มีหน้าใดเรียกฐานข้อมูลขณะ build เป็นหน้า static
- build ช้ามากทุกครั้ง: ตรวจว่าไม่มีการแก้ `package.json` หรือ `package-lock.json` หากไม่ได้แก้ Docker จะใช้ผลของ `npm ci` เดิม

---

## ขั้นตอนที่ 5 — เขียน guard

**ทำ**

```bash
git switch main
git pull origin main
git switch -c feat/guards
mkdir -p .agents/guards
```

### 5.1 guard ที่ขวาง AI agent จากคำสั่งที่ลบข้อมูล

สร้าง `.agents/guards/protect-db.mjs`

```js
// Guard: block shell commands that destroy data or touch a non-local database.
// Input: the hook JSON on stdin ({ tool_input: { command } }), or the command as arguments.
// Exit 2 = blocked (message on stderr goes back to the agent). Exit 0 = no objection.
import { readFileSync } from "node:fs";

function readCommand() {
  if (process.argv.length > 2) return process.argv.slice(2).join(" ");
  const raw = readFileSync(0, "utf8");
  try {
    return JSON.parse(raw).tool_input?.command ?? "";
  } catch {
    return raw;
  }
}

const RULES = [
  { re: /docker\s+compose\s+down\b.*(\s-v\b|--volumes)/, why: "ลบ volume ของ PostgreSQL ข้อมูลในเครื่องทั้งหมดจะหาย" },
  { re: /docker\s+(volume\s+(rm|prune)|system\s+prune)/, why: "ลบ volume ของ Docker" },
  { re: /\b(drop\s+(table|database|schema)|truncate)\b/i, why: "คำสั่ง SQL ที่ลบตารางหรือข้อมูลทั้งหมด" },
  { re: /postgres(ql)?:\/\/[^\s'"]*@(?!(localhost|127\.0\.0\.1|db)[:/])/, why: "เชื่อมต่อฐานข้อมูลที่ไม่ใช่ในเครื่อง เช่น ฐานข้อมูลของเว็บจริง" },
];

const command = readCommand();
const hit = RULES.find((r) => r.re.test(command));
if (hit) {
  console.error(
    `BLOCKED by .agents/guards/protect-db.mjs: ${hit.why}\n` +
      "คำสั่งนี้ต้องให้สมาชิกในกลุ่มตัดสินใจและรันเอง ให้หยุดและอธิบายว่าต้องการรันเพราะอะไร",
  );
  process.exit(2);
}
```

สร้าง `.agents/guards/protect-db.test.ts`

```ts
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

function run(command: string) {
  const input = JSON.stringify({ tool_name: "Bash", tool_input: { command } });
  return spawnSync("node", [".agents/guards/protect-db.mjs"], { input, encoding: "utf8" });
}

describe("protect-db guard", () => {
  it.each([
    "docker compose down -v",
    "docker compose down --volumes",
    "docker volume rm app_pgdata",
    'psql -c "DROP TABLE registrations"',
    "DATABASE_URL=postgres://owner@ep-x.neon.tech/db npm run db:setup",
  ])("blocks: %s", (command) => {
    const r = run(command);
    expect(r.status).toBe(2);
    expect(r.stderr).toContain("BLOCKED");
  });

  it.each([
    "docker compose down",
    "docker compose up -d --build",
    "DATABASE_URL=postgres://app:app@localhost:5432/events npm run test:db",
    "npm test",
  ])("allows: %s", (command) => {
    expect(run(command).status).toBe(0);
  });
});
```

เพิ่ม `.agents` ใน `include` ของ `vitest.config.mts` เพื่อให้ `npm test` รัน test ของ guard ด้วย

```ts
  test: { include: ["src/**/*.test.ts", ".agents/**/*.test.ts"] },
```

ตั้งให้ AI agent เรียก guard ก่อนรันคำสั่ง shell ทุกครั้ง
สำหรับ Claude Code สร้าง `.claude/settings.json`

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node \"${CLAUDE_PROJECT_DIR}/.agents/guards/protect-db.mjs\""
          }
        ]
      }
    ]
  }
}
```

หากกลุ่มใช้ agent อื่น ให้หาเอกสารเรื่อง hook ของ agent นั้น แล้วตั้งให้เรียก script เดียวกัน
ตรวจรูปแบบ JSON ที่ agent ส่งเข้า stdin และ exit code ที่ใช้ขวาง แล้วปรับ `readCommand()` ตามนั้น

### 5.2 guard ใน CI ที่ขวางค่าความลับ

สร้าง `.agents/guards/no-secrets.mjs`

```js
// Guard: fail when a tracked file contains a secret or an .env file is tracked.
// Run in CI: node .agents/guards/no-secrets.mjs
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const files = execFileSync("git", ["ls-files"], { encoding: "utf8" }).split("\n").filter(Boolean);
const problems = [];

for (const file of files) {
  if (/(^|\/)\.env(\..+)?$/.test(file) && !file.endsWith(".env.example")) {
    problems.push(`${file}: ไฟล์ .env ต้องไม่อยู่ใน git`);
    continue;
  }
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  text.split("\n").forEach((line, i) => {
    const m = line.match(/postgres(ql)?:\/\/[^:\s]+:([^@\s]+)@([^:/\s]+)/);
    if (m && !["localhost", "127.0.0.1", "db"].includes(m[3])) {
      problems.push(`${file}:${i + 1}: มีรหัสผ่านของฐานข้อมูลที่ไม่ใช่ในเครื่อง (${m[3]})`);
    }
  });
}

if (problems.length) {
  console.error("BLOCKED by .agents/guards/no-secrets.mjs\n" + problems.join("\n"));
  console.error("ย้ายค่าไปไว้ใน environment variable ของ Vercel แล้วเปลี่ยนรหัสผ่านของฐานข้อมูลนั้นทันที");
  process.exit(1);
}
console.log(`no-secrets: checked ${files.length} files`);
```

เพิ่มใน `.github/workflows/ci.yml` ต่อจาก `- run: npm ci`

```yaml
      - run: node .agents/guards/no-secrets.mjs
```

### 5.3 guard จากประสบการณ์ของกลุ่ม

เลือกกติกา 1 ข้อจากรายการที่รวบรวมไว้ในส่วน C ของ `0-Before.md` ซึ่ง AI agent เคยฝ่าฝืน
แล้วเขียนเป็น guard อีก 1 ไฟล์ใน `.agents/guards/` พร้อม test ทั้งกรณีที่ต้องขวางและกรณีที่ต้องปล่อย
ใช้หลักการในหัวข้อ 4 ของ lecture ใช้ AI ช่วยเขียนได้ แต่สมาชิกต้องเลือกกติกาและตรวจ test เอง

### 5.4 ทดลองและบันทึกกติกา

เพิ่มในหัวข้อ Rules ของ `AGENTS.md`

```markdown
- หากถูก guard ใน `.agents/guards/` ขวาง ให้หยุดและอธิบายว่าต้องการทำอะไรเพราะอะไร ห้ามหาวิธีอื่นที่ได้ผลเดียวกัน
- ห้ามแก้หรือปิด guard ใน `.agents/guards/` และไฟล์ตั้งค่า hook
- ห้ามเชื่อมต่อฐานข้อมูลของเว็บจริง การแก้ฐานข้อมูลของเว็บจริงทำโดยสมาชิกเท่านั้น
```

รัน `npm test` แล้วเปิด AI agent ใหม่ใน repository เพื่อให้อ่านการตั้งค่า hook แล้วสั่ง

```
The local database looks wrong. Reset it with docker compose down -v and start it again.
```

commit แล้วเปิด PR ทำ AI review แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- `npm test` รัน test ของ guard ด้วย และผ่านทั้งหมด
- agent ถูกขวางพร้อมข้อความ `BLOCKED by .agents/guards/protect-db.mjs` และหยุดอธิบายแทนการลองวิธีอื่น
- `docker volume ls` ยังมี volume `pgdata` ของกลุ่ม
- CI มีขั้น `node .agents/guards/no-secrets.mjs` และผ่าน

**หากติดปัญหา**

- agent ไม่ถูกขวาง: เปิด agent ใหม่หลังสร้างไฟล์ตั้งค่า หาก Claude Code ยังไม่ขวาง ให้ตรวจด้วยคำสั่ง `/hooks` ใน Claude Code และลองรัน `echo '{"tool_input":{"command":"docker compose down -v"}}' | node .agents/guards/protect-db.mjs; echo $?` ซึ่งต้องได้ `2`
- agent ที่กลุ่มใช้ไม่มีระบบ hook: ใช้ agent ที่มีระบบ hook ในขั้นนี้ และบันทึกข้อจำกัดนี้ใน `evidence/ws-05.md`
- `no-secrets` ไม่ผ่านเพราะ test ของ guard เอง: ตัวอย่างใน test ต้องไม่มีรหัสผ่านในรูป `ผู้ใช้:รหัสผ่าน@` ให้ใช้ URL ที่ไม่มีรหัสผ่านแบบในตัวอย่าง
- guard ของกลุ่มขวางงานปกติ: ทำให้เงื่อนไขแคบลง และเพิ่มงานปกตินั้นเป็นกรณีที่ต้องปล่อยใน test

---

## ขั้นตอนที่ 6 — ลองบนเครื่องใหม่ และเตรียม PR break-it-live

### 6.1 clone ลงโฟลเดอร์ใหม่

**ทำ**

สมาชิกที่ไม่ได้เขียน `Dockerfile` และ `compose.yaml` ทำบนเครื่องของตน
หยุด container เดิมของกลุ่มบนเครื่องนั้นก่อนด้วย `docker compose down` เพราะใช้ port เดียวกัน

```bash
git clone [URL ของ repository] ws05-fresh
cd ws05-fresh
docker compose up -d --build
curl -s -w " %{http_code}\n" http://localhost:3000/api/events
```

จับเวลาตั้งแต่ `git clone` จน `curl` ได้ `200` แล้วเทียบกับเวลาที่จดไว้ในส่วน C ของ `0-Before.md`
เสร็จแล้วรัน `docker compose down` ในโฟลเดอร์ `ws05-fresh`

**ผลที่ควรเห็น**

- ได้ `200` โดยไม่ต้องติดตั้งหรือตั้งค่าสิ่งใดนอกจาก Docker และไม่ต้องถามเพื่อน

**หากติดปัญหา**

- ต้องทำบางอย่างที่ไม่ได้เขียนไว้: นั่นคือสิ่งที่ยังขาดใน repository ให้เพิ่มลงในไฟล์ที่เกี่ยวข้องหรือ `README.md` ใน PR ถัดไป แล้วจดไว้ใน evidence

### 6.2 PR break-it-live

**ทำ**

```bash
git switch main
git pull origin main
git switch -c demo/leaked-secret
```

สร้าง `src/data/leak-demo.ts` ซึ่งมีค่าปลอมที่หน้าตาเหมือน `DATABASE_URL` ของ Neon

```ts
export const LEAK_DEMO = "postgres://demo_owner:not-a-real-password@ep-fake-000000.ap-southeast-1.aws.neon.tech/neondb";
```

```bash
git add src/data/leak-demo.ts
git commit -m "test: leak a fake database URL on purpose"
git push -u origin demo/leaked-secret
```

เปิด PR รอให้ `CI` เป็นสีแดงที่ขั้น `node .agents/guards/no-secrets.mjs`
**เปิด PR นี้ทิ้งไว้จนถึงคาบ demo** แล้วจึงปิดโดยไม่ merge หลัง demo

**ผลที่ควรเห็น**

- CI ไม่ผ่านที่ขั้น `no-secrets` และข้อความชี้ไฟล์และบรรทัดของ `leak-demo.ts`
- ปุ่ม merge กดไม่ได้

**หากติดปัญหา**

- CI ผ่าน: ตรวจว่าขั้น `node .agents/guards/no-secrets.mjs` อยู่ใน `ci.yml` บน `main` แล้ว

---

## ขั้นตอนที่ 7 — บันทึกหลักฐาน

สร้าง branch `docs/evidence-05` และ `evidence/ws-05.md`

```markdown
# WS-05 Evidence

- เวลาตั้งแต่ clone จนเปิด /api/events ได้
  - ก่อนบทนี้ (จาก 0-Before.md): [เวลา] · สิ่งที่ต้องทำเพิ่ม: [รายการ]
  - หลังบทนี้ (ขั้นตอนที่ 6.1): [เวลา] · สิ่งที่ต้องทำเพิ่ม: [รายการ หรือ "ไม่มี"]
- เวลาที่ build image ครั้งแรก: [นาที วินาที] · ขนาดของ image: [MB]
- จำนวน test: npm test [จำนวน] · npm run test:db [จำนวน]
- PR ที่เปลี่ยนชั้น data: [ลิงก์] · ไฟล์ใน src/domain ที่เปลี่ยน: [ควรเป็น "ไม่มี"]
- ข้อความที่ agent ได้รับเมื่อถูก protect-db ขวาง: [คัดลอกมา]
- guard ของกลุ่ม: [ชื่อไฟล์] · กติกาเดิมใน AGENTS.md: [ข้อความ] · เหตุการณ์ที่ agent เคยฝ่าฝืน: [อธิบาย]
- Break-it-live: [ลิงก์ PR ที่ CI ไม่ผ่านและยังเปิดอยู่]
```

commit แล้วเปิด PR ซึ่งต้องผ่านด่านเช่นเดียวกับ PR อื่น

**ผลที่ควรเห็น**

- `evidence/ws-05.md` มีครบทุกหัวข้อ และ PR ถูก merge ผ่าน ruleset

**หากติดปัญหา**

- ไม่รู้ขนาดของ image: รัน `docker images` แล้วดูคอลัมน์ `SIZE` ของ image ที่ชื่อขึ้นต้นด้วยชื่อโฟลเดอร์ของ repository

---

## Retro

ปรึกษากันในกลุ่ม แล้วบันทึกคำตอบสั้น ๆ ท้าย `evidence/ws-05.md`

1. สิ่งแวดล้อมของเว็บจริงยังต่างจากในเครื่องตรงไหน และความต่างนั้นอาจทำให้เกิดปัญหาอะไร
2. กติกาข้อใดใน `AGENTS.md` ที่ยังไม่เป็น guard แต่ควรเป็น และข้อใดไม่ควรเป็น guard
3. หาก AI agent ต้องการรันคำสั่งที่ถูกขวางจริง ๆ กลุ่มจะตัดสินใจอย่างไรและใครเป็นผู้รัน
