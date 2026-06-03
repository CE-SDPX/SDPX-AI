# Homework: เตรียมพร้อมก่อนเรียน Performance

## งานที่ต้องทำก่อนเข้าห้อง

### 1. รัน k6 Smoke Test กับ Staging
สร้าง `performance/smoke.js`:
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 3, duration: '30s' };

export default function () {
  const res = http.get(__ENV.BASE_URL || 'http://localhost:3000');
  check(res, {
    'status 200': (r) => r.status === 200,
    'response < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

```bash
k6 run performance/smoke.js
```

บันทึก p95 latency และ error rate ที่ได้

### 2. เลือก Function ที่แย่ที่สุด
เตรียม function จาก codebase สำหรับ WS-08 lab:
```bash
# prompt Claude หรือ Copilot:
# "Review this code and list all problems you find"
# บันทึก response ไว้ใน docs/ai-review.md
```
