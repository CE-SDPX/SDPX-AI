# Homework: เตรียมพร้อมก่อนเรียน E2E Testing & Docker

## วัตถุประสงค์
ติดตั้ง Playwright และ Docker ให้พร้อมก่อนเข้าห้อง เพื่อให้ lab เริ่ม test และ containerize ได้ทันที

---

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ติดตั้ง Playwright และทดสอบ
```bash
npx playwright install
```

เขียน test ไว้ใน `e2e/smoke.spec.ts` หรือ `e2e/smoke.spec.js`:
```javascript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('YOUR_LIVE_URL');
  await expect(page).toHaveTitle(/.+/);
});
```

รัน test และยืนยันว่าผ่าน:
```bash
npx playwright test
```

### 2. ติดตั้ง Docker Desktop และทดสอบ
- ดาวน์โหลด Docker Desktop: https://www.docker.com/products/docker-desktop
- ติดตั้งและยืนยัน:
```bash
docker run hello-world
# ต้องเห็น "Hello from Docker!"

docker run --name test-db -e POSTGRES_PASSWORD=test -d postgres
docker ps
# ต้องเห็น container ที่ชื่อ test-db กำลังรัน
docker rm -f test-db
```

### 3. เพิ่ม E2E Test สำหรับ Failure Scenario
เพิ่ม 1 test ที่ตรวจ error case เช่น:
- ไปที่ URL ที่ไม่มีอยู่ → ต้องเห็น 404
- กรอก form ผิด format → ต้องเห็น error message

พร้อมเขียน comment อธิบายว่าทำไมเลือก scenario นี้

### 4. ส่ง Entry Ticket
> "จากประสบการณ์ที่ผ่านมา ถ้าไม่มี CI/CD ใน project นี้จะเกิดปัญหาอะไรได้บ้าง"

คิดจาก sprint ที่ผ่านมาจริงๆ ไม่ต้องตอบตามทฤษฎี
