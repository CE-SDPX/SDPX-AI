# Lecture: Docker & the Environment Loop

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (4 นาที)

สองเรื่อง:
1. เปิด Dockerfile instructions ที่สงสัย อธิบายเฉพาะจุดที่คนสงสัยมากที่สุด
   ไม่สอนซ้ำสิ่งที่ video บอกไปแล้ว
2. เปิดตัวเลข "กี่ขั้นตอนกว่าจะรัน app ได้" ของแต่ละกลุ่ม
   ส่วนใหญ่จะอยู่ที่ 5–8 ขั้นตอน / 20–40 นาที — วันนี้จะทำให้เหลือ 1 คำสั่ง

---

## 2. Environment Loop (4 นาที)

```
clone repo ──→ docker compose up ──→ app + db รันครบ ──→ รัน test ได้ทันที
```

| คุณสมบัติ | ก่อนมี container | หลังมี container |
|---|---|---|
| **Latency** | 20–40 นาที ต่อคน ต่อเครื่อง | 1 คำสั่ง, ไม่กี่นาที |
| **Fidelity** | "works on my machine" | ทุกเครื่องได้ image เดียวกัน |
| **Coverage** | dev ต่างจาก CI ต่างจาก prod | dev/CI ใช้ definition เดียวกัน |

**ทำไมเรื่องนี้อยู่ในวิชาที่พูดเรื่อง AI:** AI agent ก็ต้องรัน test เหมือนกัน
ถ้า environment ตั้งยาก agent จะรัน test ไม่ได้ → มันเดาแทน
environment ที่ reproducible คือสิ่งที่ทำให้ agent ตรวจงานตัวเองได้จริง

---

## 3. Docker Fundamentals (5 นาที)

### Image vs Container
```
Image     = blueprint (read-only)
Container = running instance ของ image (มี read-write layer เพิ่มมา)

เหมือน: Image = class, Container = object instance
```

### Layer System
```dockerfile
FROM node:24-alpine       # Layer 1: base OS + Node
WORKDIR /app              # Layer 2: set working directory
COPY package*.json ./     # Layer 3: copy manifest
RUN npm ci                # Layer 4: install dependencies
COPY . .                  # Layer 5: copy source code
RUN npm run build         # Layer 6: build
CMD ["node", "server.js"] # Layer 7: default command
```

ถ้าแก้ Layer 5 (source code) → Layer 5, 6, 7 rebuild ใหม่
Layer 1–4 ยังใช้ cache ได้ → `npm ci` ไม่ต้องรันใหม่

---

## 4. กับดัก: Layer Caching ที่พลาด (4 นาที)

```dockerfile
# แย่: COPY ทั้งหมดก่อน
COPY . .              # ← ถ้าแก้ไฟล์ใด ๆ layer นี้ invalid
RUN npm install       # ← ต้อง install ใหม่ทุกครั้ง แม้ package.json ไม่เปลี่ยน

# ดี: แยก dependencies ออกก่อน
COPY package*.json ./  # ← เปลี่ยนน้อยมาก
RUN npm ci             # ← cache ได้เมื่อ package.json ไม่เปลี่ยน
COPY . .               # ← source code เปลี่ยนบ่อยก็ไม่กระทบ install
```

### Multi-Stage Build ที่ใช้ได้จริง
```dockerfile
# ---------- deps ----------
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci                       # ci = ติดตั้งตรงตาม lockfile เป๊ะ ๆ

# ---------- build ----------
FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- test ----------
FROM build AS test
CMD ["npm", "test"]              # stage นี้ใช้ตอนรัน test ใน container

# ---------- runtime ----------
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev            # ไม่เอา devDependencies ขึ้น production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
EXPOSE 3000
USER node                        # ไม่รันด้วย root
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
```

จุดที่ต้องอธิบายได้ทุกคน:
- `alpine` — image เล็ก ผิว attack surface น้อย
- `npm ci` ต่างจาก `npm install` — ci ยึด lockfile เป๊ะ และ reproducible
- `--omit=dev` — flag ปัจจุบัน (`--only=production` เลิกใช้แล้ว)
- `USER node` — ถ้า container ถูกเจาะ ผู้บุกรุกไม่ได้เป็น root
- `HEALTHCHECK` — บอก Docker/Compose ว่า "พร้อมรับ traffic แล้ว" ไม่ใช่แค่ "process ยังอยู่"

---

## 5. Compose = คำจำกัดความของ Environment (9 นาที)

Compose ทำให้ environment กลายเป็นไฟล์ที่อยู่ใน git — แก้ได้ review ได้ ย้อนได้

> **หมายเหตุ:** ไฟล์ยุคปัจจุบันชื่อ `compose.yaml` และ **ไม่ต้องมี `version:`** แล้ว
> (Compose Specification เลิกใช้ field นั้น — ใส่ไปจะขึ้น warning)

```yaml
# compose.yaml
services:
  app:
    build:
      context: .
      target: runtime
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/appdb
    depends_on:
      db:
        condition: service_healthy   # รอ db พร้อมจริง ไม่ใช่แค่ start แล้ว

  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d appdb"]
      interval: 5s
      timeout: 5s
      retries: 5
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Profiles: แยก dev ออกจาก test ในไฟล์เดียว
```yaml
  test-db:
    image: postgres:17-alpine
    profiles: ["test"]        # รันเฉพาะเมื่อเรียก profile test
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
    ports:
      - "5433:5432"           # port ต่างจาก dev db
    tmpfs:
      - /var/lib/postgresql/data   # เก็บใน RAM → เร็วและหายเองเมื่อหยุด
```

```bash
docker compose up                        # dev
docker compose --profile test up test-db # test database (ephemeral)
docker compose --profile test down -v    # cleanup ทุกอย่าง
```

**ทำไม test database ต้อง ephemeral:** ถ้ามี volume ค้าง ผลของ test run
ก่อนหน้าจะรั่วมาถึง run ถัดไป → fidelity พัง และ debug ยากมาก

### รัน Test Suite ใน Container
```yaml
# compose.test.yaml
services:
  test-db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U testuser -d testdb"]
      interval: 3s
      retries: 10
    tmpfs:
      - /var/lib/postgresql/data

  unit:
    build:
      context: .
      target: test
    environment:
      DATABASE_URL: postgres://testuser:testpass@test-db:5432/testdb
      NODE_ENV: test
    depends_on:
      test-db:
        condition: service_healthy
    command: npm test
```

```bash
docker compose -f compose.test.yaml up --abort-on-container-exit --exit-code-from unit
echo "Exit code: $?"    # 0 = pass — ตัวเลขนี้คือสิ่งที่ CI จะใช้ตัดสินใน WS-06
```

`--exit-code-from unit` สำคัญมาก — ถ้าไม่มี exit code จะมาจาก container ตัวไหนก็ได้
แล้ว CI จะเขียวทั้งที่ test แดง (fidelity พังแบบเงียบ ๆ)

### Config ต้องมาจาก Environment
```yaml
# แย่: ค่าจริงฝังในไฟล์ที่อยู่ใน git
environment:
  DATABASE_URL: postgres://admin:S3cretP%40ss@prod-db.example.com:5432/app

# ดี: อ่านจาก .env / secret ของ platform
environment:
  DATABASE_URL: ${DATABASE_URL:?DATABASE_URL is required}
```

รูปแบบ `${VAR:?message}` ทำให้ Compose **หยุดพร้อมข้อความชัดเจน** ถ้าลืมตั้งค่า
ดีกว่ารันไปแล้วพังลึก ๆ ด้วย error ที่อ่านไม่รู้เรื่อง

---

## 6. Review Dockerfile ที่ AI สร้าง (4 นาที)

| AI มักทำ | ทำไมเป็นปัญหา |
|---|---|
| `FROM node:latest` | ไม่ reproducible — build วันนี้กับพรุ่งนี้ได้คนละ image |
| `RUN npm install` | ไม่ยึด lockfile |
| `COPY . .` ก่อน install | ทำลาย layer cache ทั้งหมด |
| ไม่มี `USER` | container รันด้วย root |
| ไม่มี `.dockerignore` | copy `node_modules` และ `.git` เข้า image |
| ใส่ `version:` ใน compose | field ที่เลิกใช้แล้ว |
| ใช้ `--only=production` | flag เก่า ปัจจุบันคือ `--omit=dev` |

**Prompt ที่ให้ผลดีกว่า:**
```
Generate a multi-stage Dockerfile for a Next.js app on node:24-alpine with
stages: deps, build, test, runtime.
Requirements: copy package manifests before source, use `npm ci`,
`npm ci --omit=dev` in runtime, run as non-root, add a HEALTHCHECK,
and pin the base image tag. Explain each instruction in one line as a comment.
```
บรรทัดสุดท้ายสำคัญ — บังคับให้ AI เขียนคำอธิบายไว้ ทำให้ review ง่ายขึ้นมาก

---

## Key Takeaways
- Environment Loop: จาก "6 ขั้นตอน 25 นาที" เหลือ `docker compose up` คำสั่งเดียว
- Docker layer order สำคัญมาก — dependencies ก่อน source code เสมอ
- Compose ยุคใหม่: ไฟล์ `compose.yaml` ไม่มี `version:` และใช้คำสั่ง `docker compose`
- Test database ต้อง ephemeral (`tmpfs`) และต้องใช้ `--exit-code-from` เพื่อให้ผลเชื่อถือได้
- Config มาจาก environment เสมอ — ค่าจริงห้ามอยู่ในไฟล์ที่อยู่ใน git

---

## AI-DLC Connection: Operations Phase — Build Stage

```
Operations Phase:
[Build] → Deploy → Verify → Monitor
   ↑
 วันนี้
```

**Docker = Build Stage Infrastructure:**
- Dockerfile = reproducible build process ที่ทุก bolt ใช้ร่วมกัน
- Compose = คำจำกัดความของ environment ที่ dev, test และ CI ใช้ตรงกัน
- Test container (ephemeral) = environment ที่แยกออกมาสำหรับ verify ก่อน deploy

Human checkpoint ใน Build Stage: ทุก Dockerfile ต้องอ่านออกและอธิบายได้ทุกบรรทัด
AI generate Dockerfile → human verify ว่า secure, efficient และ reproducible

> สัปดาห์หน้า CI จะเป็นตัวรันคำสั่งพวกนี้ให้อัตโนมัติทุกครั้งที่ push —
> สิ่งที่ตั้งวันนี้จะกลายเป็นเนื้อหาของ pipeline พอดี
