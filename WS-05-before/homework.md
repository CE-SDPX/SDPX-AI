# Homework: เตรียมพร้อมก่อนเรียน CI/CD Pipeline

## วัตถุประสงค์
สร้าง GitHub Actions workflow เบื้องต้นให้ทำงานได้ก่อนเข้าห้อง เพื่อให้ lab ต่อยอดได้ทันที

---

## งานที่ต้องทำก่อนเข้าห้อง

### 1. สร้าง GitHub Actions Workflow พื้นฐาน
สร้างไฟล์ `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

Push ขึ้น GitHub และยืนยันว่า workflow รันและขึ้น green

### 2. เพิ่ม E2E Failure Test
เพิ่ม test ที่ตรวจ failure scenario 1 ตัวพร้อม comment อธิบาย

### 3. ตรวจสอบ Secrets ใน Repo
- ไปที่ repo > Settings > Security > Secret scanning
- ตรวจว่าไม่มี secrets หลุด
- รัน: `git log --all --full-history -- "**/*.env"` ยืนยันว่าไม่มี .env ใน history

### 4. ส่ง Entry Ticket
> "คิดว่า feature ไหนใน project จะเป็น bottleneck และทำไม"

ตอบจากสิ่งที่สังเกตเห็นจากการพัฒนาจริงๆ
