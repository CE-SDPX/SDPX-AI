# Homework: เตรียมพร้อมก่อนเรียน E2E Testing

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ติดตั้ง Docker Desktop และทดสอบ
```bash
docker run hello-world
# ต้องเห็น "Hello from Docker!"

docker run --name test-db -e POSTGRES_PASSWORD=test -d postgres:15-alpine
docker ps
# ต้องเห็น container กำลังรัน

docker rm -f test-db
```

### 2. เพิ่ม data-testid ใน Components
ไปที่ frontend components ของ project และเพิ่ม `data-testid` ให้กับ elements หลัก:
- Navigation bar
- Submit buttons
- Form inputs
- Error/success messages
- List items