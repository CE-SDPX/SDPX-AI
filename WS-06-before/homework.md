# Homework: เตรียมพร้อมก่อนเรียน Performance & Observability

## วัตถุประสงค์
ติดตั้ง k6 และรัน load test เบื้องต้นก่อนเข้าห้อง เพื่อให้มีข้อมูลจริงมาใช้ใน lab

---

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ติดตั้ง k6
```bash
# macOS
brew install k6

# Windows
winget install k6

# Linux
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update && sudo apt-get install k6

# ยืนยัน
k6 version
```

### 2. รัน Basic Load Test กับ Staging URL

สร้างไฟล์ `performance/smoke-test.js`:
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
};

export default function () {
  const res = http.get('YOUR_STAGING_URL');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

รัน:
```bash
k6 run performance/smoke-test.js
```

บันทึกผลลัพธ์โดยเฉพาะค่า `p(95)` และ `avg` ไว้ใช้ใน lab

### 3. เลือก Function ที่คิดว่า "แย่ที่สุด"
เตรียม code จาก codebase ไว้ สำหรับทำ homework ก่อนสัปดาห์ที่ 7

### 4. ส่ง Entry Ticket
> "คิดว่า feature ไหนใน project จะเป็น bottleneck และทำไม"

ตอบโดยใช้ผลจาก smoke test ที่รัน
