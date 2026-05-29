# Lab: E2E Testing & Docker

## เป้าหมาย
เขียน E2E tests ที่ครอบคลุม user flows หลัก และ Dockerize application ให้รันได้ด้วย docker-compose

---

## ขั้นตอนที่ 1 — E2E Tests (1 ชั่วโมง)

### Happy Path Tests
เขียน E2E test สำหรับ user flow หลักของ project:

```typescript
// ตัวอย่าง: ระบบจองห้อง
test('student can book an available room', async ({ page }) => {
  await page.goto('/rooms');
  await page.locator('[data-testid="room-card-1"]').click();
  await page.locator('[data-testid="date-picker"]').fill('2024-12-01');
  await page.locator('[data-testid="time-start"]').fill('13:00');
  await page.locator('[data-testid="time-end"]').fill('15:00');
  await page.locator('[data-testid="submit-booking"]').click();
  await expect(page.locator('[data-testid="booking-confirmed"]')).toBeVisible();
});
```

### Edge Case Tests
เขียน E2E tests สำหรับ 2 edge cases จาก acceptance criteria เช่น:
- พยายามจองห้องที่ไม่ว่าง
- ส่ง form โดยไม่กรอกข้อมูลที่จำเป็น

### ใช้ AI Generate Scenarios
```
Here are my user stories:
[วาง user stories]

What E2E test scenarios should I cover that I might have missed?
Focus on error cases and edge cases.
```
Review ทุก suggestion ก่อน implement

---

## ขั้นตอนที่ 2 — Dockerize Application (1 ชั่วโมง)

### สร้าง Dockerfile
ใช้ AI generate draft แล้ว review ทุก instruction:

```bash
# ตรวจสอบว่า build ได้
docker build -t campus-service .

# รัน container ทดสอบ
docker run -p 3000:3000 campus-service

# เปิด browser ตรวจสอบว่าทำงานได้
```

**ทุกคนในกลุ่มต้องอธิบายได้ว่าแต่ละ instruction ใน Dockerfile ทำอะไร**

### สร้าง docker-compose.yml
รวม app + database:

```bash
docker-compose up
# ต้องเห็น app และ database รันพร้อมกัน

docker-compose down
docker-compose up  # ต้องรันได้ใหม่โดยไม่ต้อง setup อะไรเพิ่ม
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `e2e/` directory | E2E tests ที่รันผ่าน (happy path + 2 edge cases) | GitHub repo |
| `Dockerfile` | Build ได้และทุกคนอธิบาย instruction ได้ | GitHub repo |
| `docker-compose.yml` | `docker-compose up` แล้ว app ทำงานได้ | GitHub repo |

### เกณฑ์ผ่าน
- E2E tests รันผ่านทั้งหมดบน CI (ไม่ใช่แค่ local)
- `docker-compose up` รันได้โดยไม่ต้อง setup เพิ่มเติม
- ทุกคนในกลุ่มอธิบาย Dockerfile ได้ทุก instruction
