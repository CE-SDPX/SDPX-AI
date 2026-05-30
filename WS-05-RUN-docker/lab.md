# Lab: Docker & Environment Harness

## เวลา: 1.5 ชั่วโมง
## เป้าหมาย
Dockerize application และสร้าง docker-compose สำหรับ dev และ test environment

---

## ขั้นตอนที่ 1 — สร้าง Dockerfile (25 นาที)

### ใช้ AI Generate Draft
```
I have a [Next.js / FastAPI] application.
Generate a production-ready Dockerfile that:
- Uses alpine base image
- Separates dependency installation from source copy (for layer caching)
- Runs as non-root user
- Uses multi-stage build if appropriate
- Exposes the correct port
```

### Review ทุก Instruction
ก่อน commit ทุกคนในกลุ่มต้องตอบได้:
- `FROM node:18-alpine` — ทำไมถึงเลือก alpine?
- `RUN npm ci` — ต่างจาก `npm install` อย่างไร?
- `USER node` — ทำไมต้อง non-root?
- `EXPOSE 3000` — ทำหน้าที่อะไร?

### Build และทดสอบ
```bash
docker build -t campus-[domain]:dev .
docker run -p 3000:3000 campus-[domain]:dev
# เปิด browser ตรวจว่า app ทำงานได้
```

### สร้าง .dockerignore
```
node_modules
.next
dist
.env
.env.local
*.log
.git
tests/e2e/playwright-report
```

---

## ขั้นตอนที่ 2 — docker-compose.yml สำหรับ Dev (20 นาที)

สร้าง `docker-compose.yml`:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: ${DATABASE_URL:-postgres://user:pass@db:5432/appdb}
      NODE_ENV: development
    volumes:
      - .:/app                    # hot reload สำหรับ dev
      - /app/node_modules         # ไม่ override node_modules
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d appdb"]
      interval: 5s
      retries: 5
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"               # expose สำหรับ local development tools

volumes:
  postgres_data:
```

### ทดสอบ
```bash
docker-compose up
# ต้องเห็น app และ db รันพร้อมกัน

docker-compose down
docker-compose up  # ต้องรันได้ใหม่โดยไม่ต้อง setup เพิ่ม
```

---

## ขั้นตอนที่ 3 — Test Environment (25 นาที)

สร้าง `docker-compose.test.yml`:
```yaml
version: '3.8'

services:
  test-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
    ports:
      - "5433:5432"
    # ไม่มี volume — ephemeral

  app-test:
    build:
      context: .
      target: test              # multi-stage: test stage
    environment:
      DATABASE_URL: postgres://testuser:testpass@test-db:5432/testdb
      NODE_ENV: test
    depends_on:
      - test-db
    command: npm test

  e2e:
    build: .
    environment:
      BASE_URL: http://app-test:3000
      DATABASE_URL: postgres://testuser:testpass@test-db:5432/testdb
    depends_on:
      - app-test
    command: npx playwright test
    profiles: ["e2e"]
```

### ทดสอบ Test Environment
```bash
# รัน unit tests ใน container
docker-compose -f docker-compose.test.yml up app-test --abort-on-container-exit
echo "Exit code: $?"  # 0 = pass, non-zero = fail

# cleanup
docker-compose -f docker-compose.test.yml down
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `Dockerfile` | Build ได้ ทุกคนอธิบาย instruction ได้ | GitHub repo |
| `.dockerignore` | ครอบคลุม | GitHub repo |
| `docker-compose.yml` | Dev environment รันได้ | GitHub repo |
| `docker-compose.test.yml` | Test environment พร้อม ephemeral DB | GitHub repo |

### เกณฑ์ผ่าน
- [ ] `docker-compose up` รันได้โดยไม่ต้อง setup เพิ่ม
- [ ] ทุกคนในกลุ่มอธิบาย Dockerfile ได้ทุก instruction
- [ ] Test database ไม่มี volume (ephemeral)
- [ ] ไม่มี secrets hardcode ใน docker-compose files
