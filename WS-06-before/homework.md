# Homework: เตรียมพร้อมก่อนเรียน CI/CD

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ยืนยัน GitHub Actions Workflow ที่สร้างใน WS-05 ทำงาน
```bash
git push origin develop
# ไปดูที่ GitHub repo > Actions
# ต้องเห็น workflow รันและขึ้น green
```

### 2. ติดตั้ง k6
```bash
# macOS
brew install k6
# Windows
winget install k6
# ยืนยัน
k6 version
```

### 3. ส่ง Entry Ticket
> "จากประสบการณ์ที่ผ่านมา ถ้าไม่มี CI/CD ใน project นี้จะเกิดปัญหาอะไรได้บ้าง"
