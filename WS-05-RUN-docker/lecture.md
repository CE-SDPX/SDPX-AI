# Lecture: Docker & Environment Harness

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (5 นาที)

เปิด Dockerfile instructions ที่สงสัย อธิบายเฉพาะจุดที่คนสงสัยมากที่สุด
ไม่สอนซ้ำสิ่งที่ video บอกไปแล้ว

---

## 2. Docker Fundamentals (5 นาที)

### Image vs Container
```
Image = blueprint (read-only)
Container = running instance ของ image (read-write layer เพิ่มมา)

เหมือน: Image = class, Container = object instance
```

### Layer System
```dockerfile
FROM node:18-alpine      # Layer 1: base OS + Node
WORKDIR /app             # Layer 2: set working directory
COPY package*.json ./    # Layer 3: copy manifest
RUN npm ci               # Layer 4: install dependencies
COPY . .                 # Layer 5: copy source code
RUN npm run build        # Layer 6: build
CMD ["node", "server.js"] # Layer 7: default command
```

ถ้าแก้ Layer 5 (source code) → Layer 5, 6, 7 rebuild ใหม่
Layer 1-4 ยังใช้ cache ได้ → npm install ไม่ต้องรันใหม่

---

## 3. กับดัก: Layer Caching ที่พลาด (5 นาที)

```dockerfile
# แย่: COPY ทั้งหมดก่อน
COPY . .              # ← ถ้าแก้ไฟล์ใดๆ layer นี้ invalid
RUN npm install       # ← ต้อง install ใหม่ทุกครั้ง แม้ package.json ไม่เปลี่ยน

# ดี: แยก dependencies ออกก่อน
COPY package*.json ./  # ← เปลี่ยนน้อยมาก
RUN npm ci             # ← cache ได้เมื่อ package.json ไม่เปลี่ยน
COPY . .               # ← source code เปลี่ยนบ่อยก็ไม่กระทบ npm install
```

### Dockerfile Best Practices
```dockerfile
FROM node:18-alpine          # alpine = image เล็ก
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production # ci แทน install = reproducible
COPY . .
RUN npm run build
EXPOSE 3000
USER node                    # ไม่ run ด้วย root = security
CMD ["node", "server.js"]
```

---

## 4. Docker Compose เป็น Environment Harness (10 นาที)

docker-compose คือ environment harness — ทำให้ทุกคนใน team รันได้เหมือนกัน

### Compose Profiles: Dev vs Test

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/appdb
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
      timeout: 5s
      retries: 5
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Test database: ephemeral, ไม่มี volume
  test-db:
    image: postgres:15-alpine
    profiles: ["test"]          # รันเฉพาะเมื่อใช้ profile test
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
    ports:
      - "5433:5432"             # port ต่างจาก dev db
    # ไม่มี volume → destroy ทุกครั้งที่ container หยุด

volumes:
  postgres_data:
```

### รัน Test Environment
```bash
# Dev environment
docker-compose up

# Test environment (ephemeral database)
docker-compose --profile test up test-db
# รัน tests
docker-compose --profile test down  # cleanup อัตโนมัติ
```

---

## 5. E2E Harness ใน Container (5 นาที)

ขั้นตอนสุดท้ายของ E2E Harness คือรันได้ใน container:

```yaml
# docker-compose.test.yml
services:
  e2e:
    build:
      context: .
      dockerfile: Dockerfile.test
    environment:
      BASE_URL: http://app:3000
      DATABASE_URL: postgres://testuser:testpass@test-db:5432/testdb
    depends_on:
      - app
      - test-db
    command: npx playwright test
```

```bash
# รัน E2E tests ทั้งหมดใน isolated container
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

ทำไมสำคัญ:
- ทุกคนรันได้ผลเหมือนกัน ไม่ว่าจะใช้ OS อะไร
- CI จะรันแบบเดียวกันกับ local — ไม่มี "works on my machine"

---

## Key Takeaways
- Docker layer order สำคัญมาก — dependencies ก่อน source code เสมอ
- docker-compose profiles แยก dev/test environment ได้
- Test database ต้องเป็น ephemeral ไม่มี volume — destroy และ recreate ทุกครั้ง
- E2E harness ที่รันใน container ทำให้ CI และ local ได้ผลเหมือนกัน


---

## AI-DLC Connection: Operations Phase — Build Stage

ใน AI-DLC Operations Phase เริ่มด้วย **Build Stage**:

```
Operations Phase:
[Build] → Deploy → Verify → Monitor
  ↑
วันนี้
```

**Docker = Build Stage Infrastructure:**
- Dockerfile = reproducible build process
- docker-compose = environment harness ที่ consistent ทุก bolt
- Test container (ephemeral) = isolated environment สำหรับ verify ก่อน deploy

Human checkpoint ใน Build Stage: ทุก Dockerfile ต้องอ่านออกและอธิบายได้
AI generate Dockerfile → human verify ว่า secure, efficient, และ reproducible
