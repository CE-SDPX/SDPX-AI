# Lecture: E2E Testing & Docker

## Learning Objectives
- เขียน E2E tests ที่ stable และ meaningful ได้
- Dockerize application ได้และอธิบายทุก instruction ได้
- เข้าใจ Docker layer caching และหลีกเลี่ยงปัญหาที่พบบ่อย

---

## 1. Entry Ticket Review

อาจารย์เปิด Dockerfile instructions ที่กลุ่มต่างๆ สงสัย และอธิบายเฉพาะจุดที่คนสงสัยมากที่สุด

---

## 2. E2E Testing: กับดักที่พบบ่อย

### Flaky Tests คืออะไร
Test ที่บางครั้ง pass บางครั้ง fail โดยไม่มีการเปลี่ยน code สาเหตุหลัก:
- รอ element โดยไม่มี explicit wait
- พึ่ง timing ของ animation หรือ network
- State ค้างจาก test ก่อนหน้า

### วิธีป้องกัน
```typescript
// แย่: รอตาม time
await page.waitForTimeout(3000);

// ดี: รอตาม state
await page.waitForSelector('[data-testid="booking-confirmed"]');
await expect(page.locator('.success-message')).toBeVisible();
```

### ใช้ data-testid แทน CSS class
```html
<!-- แย่: class อาจเปลี่ยนเมื่อ redesign -->
<button class="btn btn-primary submit-booking">Book</button>

<!-- ดี: testid ไม่เปลี่ยนตาม style -->
<button data-testid="submit-booking">Book</button>
```

---

## 3. Docker: Layer Caching

### ทำงานอย่างไร
Docker build แต่ละ instruction เป็น layer ถ้า layer ไม่เปลี่ยน จะใช้ cache แทนการ rebuild

### กับดักที่พบบ่อย
```dockerfile
# แย่: COPY ทั้งหมดก่อน install dependencies
# ทุกครั้งที่แก้ source code จะต้อง npm install ใหม่ทั้งหมด
COPY . .
RUN npm install

# ดี: COPY เฉพาะ package files ก่อน
# npm install จะ cache ได้ถ้า package.json ไม่เปลี่ยน
COPY package*.json ./
RUN npm install
COPY . .
```

### Dockerfile Best Practices
```dockerfile
FROM node:18-alpine          # ใช้ alpine เพื่อ image size เล็ก
WORKDIR /app
COPY package*.json ./        # copy dependencies manifest ก่อน
RUN npm ci --only=production # ci แทน install เพื่อ reproducibility
COPY . .
RUN npm run build
EXPOSE 3000
USER node                    # ไม่ run ด้วย root
CMD ["node", "server.js"]
```

---

## 4. Docker Compose สำหรับ Local Dev

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## Key Takeaways
- E2E tests ที่ดีใช้ `data-testid` และ wait for state ไม่ใช่ time
- Docker layer order สำคัญมาก — dependencies ก่อน source code
- docker-compose ทำให้ทุกคนใน team มี environment เดียวกัน
- ทุก instruction ใน Dockerfile ต้องอธิบายได้ว่าทำไมต้องมี
