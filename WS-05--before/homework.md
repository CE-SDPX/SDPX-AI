# Homework: เตรียมพร้อมก่อนเรียน Docker

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ยืนยัน Docker ทำงานได้
```bash
docker run hello-world
docker pull postgres:15-alpine
docker images  # ต้องเห็น postgres image
```

### 2. สร้าง GitHub Actions Workflow เบื้องต้น
สร้างไฟล์ `.github/workflows/ci.yml`:
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Pipeline works!"
```
Push ขึ้น GitHub และยืนยันว่า workflow รัน ขึ้น green

### 3. เพิ่ม E2E Tests เพิ่มเติม
เพิ่ม E2E test สำหรับ 1 failure scenario จาก backlog
พร้อม comment อธิบายว่าทำไมเลือก scenario นั้น

### 4. ส่ง Entry Ticket
> "Dockerfile instruction ไหนที่ยังไม่เข้าใจ หรือสงสัยว่าทำไมต้องมี"
