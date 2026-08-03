# Homework: เตรียมพร้อมก่อนเรียน CI/CD

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ยืนยัน GitHub Actions Workflow ที่สร้างใน WS-05 ทำงาน
```bash
git push origin develop
# ไปดูที่ GitHub repo > Actions
# ต้องเห็น workflow รันและขึ้น green
```

### 2. ยืนยันว่า Test รันใน Container ได้ และให้ Exit Code ถูก
```bash
docker compose -f compose.test.yaml up unit \
  --abort-on-container-exit --exit-code-from unit
echo $?     # ต้องเป็น 0 เมื่อ test ผ่าน
```

> ถ้าข้อนี้ยังไม่ผ่าน ให้แก้ก่อนเข้าห้อง — pipeline ทั้งอันในสัปดาห์นี้สร้างทับบนคำสั่งนี้

### 3. ติดตั้ง k6 (สำหรับ WS-07)
```bash
# macOS
brew install k6
# Windows
winget install k6.k6
# Linux (ดูวิธีอื่นที่ https://grafana.com/docs/k6/latest/set-up/install-k6/)

# ยืนยัน
k6 version
```

### 4. เตรียมตัวเลข Baseline ของ Loop
จดไว้ 3 ตัวเลข จะใช้เปรียบเทียบหลังทำ lab:
- unit test suite ใช้เวลากี่วินาที
- E2E suite ใช้เวลากี่นาที
- commit-to-live time ปัจจุบัน (จาก WS-01 มีเปลี่ยนไปไหม)
