# Homework: เตรียมพร้อมก่อนเรียน Docker

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ยืนยัน Docker ทำงานได้
```bash
docker run hello-world
docker pull postgres:17-alpine
docker images                # ต้องเห็น postgres image
docker compose version       # ต้องเป็น v2 (คำสั่งเว้นวรรค)
```

### 2. สร้าง GitHub Actions Workflow เบื้องต้น
สร้างไฟล์ `.github/workflows/ci.yml`:
```yaml
name: CI

on: [push, pull_request]

permissions:
  contents: read          # ให้สิทธิ์น้อยที่สุดเท่าที่จำเป็น

jobs:
  smoke:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - run: echo "Pipeline works!"
```
Push ขึ้น GitHub และยืนยันว่า workflow รันขึ้น green

### 3. เพิ่ม E2E Test สำหรับ Failure Scenario
เพิ่ม E2E test สำหรับ 1 failure scenario จาก backlog
พร้อม comment อ้าง acceptance criteria ที่มันครอบคลุม

### 4. จดขั้นตอนการ Setup ปัจจุบัน
เขียนลง `docs/setup-steps.md` ว่าเพื่อนใหม่ต้องทำอะไรบ้างกว่าจะรัน app ได้
นับเป็นข้อ ๆ เช่น

```markdown
1. ติดตั้ง Node 24
2. ติดตั้ง PostgreSQL 17 แล้วสร้าง database ชื่อ appdb
3. คัดลอก .env.example เป็น .env แล้วเติมค่า
4. npm ci
5. npm run migrate
6. npm run dev
→ รวม 6 ขั้นตอน ใช้เวลาประมาณ 25 นาที
```

> ตัวเลขนี้คือ **latency ของ Environment Loop** ตอนนี้
> เป้าหมายของ lab สัปดาห์นี้คือลดเหลือ **1 คำสั่ง**
