# Lab: Performance & Observability

## เป้าหมาย
วัด performance จริงของ application, เปรียบเทียบกับ hypothesis, และเพิ่ม structured logging

---

## ขั้นตอนที่ 1 — Load Test กับ Staging (45 นาที)

### สร้าง k6 Test ที่ Realistic
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // ramp up
    { duration: '1m',  target: 10 },  // steady state
    { duration: '30s', target: 0  },  // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],    // error rate under 1%
  },
};

export default function () {
  // ทำ user journey จริงๆ ไม่ใช่แค่ hit homepage
  const listRes = http.get(`${BASE_URL}/api/rooms`);
  check(listRes, { 'list rooms OK': (r) => r.status === 200 });
  sleep(1);

  const detailRes = http.get(`${BASE_URL}/api/rooms/1`);
  check(detailRes, { 'room detail OK': (r) => r.status === 200 });
  sleep(2);
}
```

ใช้ AI ช่วย generate scenarios แล้ว review ว่า realistic ไหม

### บันทึกผลลัพธ์
```bash
k6 run --out json=results.json performance/load-test.js
```

เปรียบเทียบกับ hypothesis ที่ส่งมาใน entry ticket:
- Bottleneck ที่เดาไว้ถูกหรือผิด
- จุดที่ช้าจริงๆ คือที่ไหน

---

## ขั้นตอนที่ 2 — Identify Bottleneck (20 นาที)

จาก test results ระบุ:
1. Endpoint ไหน response time สูงที่สุด
2. p95 latency เป็นเท่าไหร่ — acceptable หรือไม่
3. Error rate เป็นเท่าไหร่

Document ใน `docs/performance-report.md`

---

## ขั้นตอนที่ 3 — เพิ่ม Structured Logging (45 นาที)

เพิ่ม logging เข้า application โดยใช้ library:

**Node.js:** `npm install pino` หรือ `npm install winston`
**Python:** ใช้ built-in `logging` module พร้อม JSON formatter

Logging ที่ต้องมีอย่างน้อย:
- Request เข้ามา (method, path, user)
- Response ออกไป (status code, duration)
- Error ที่เกิด (error message, stack trace, context)

```javascript
// ตัวอย่าง pino
const logger = pino({ level: 'info' });

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info({
      event: 'http_request',
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: Date.now() - start,
    });
  });
  next();
});
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `performance/load-test.js` | k6 script ที่ใช้ทดสอบ | GitHub repo |
| `docs/performance-report.md` | ผลลัพธ์ + hypothesis vs actual + bottleneck | GitHub repo |
| Structured logging code | Logging เพิ่มใน application | GitHub repo |

### เกณฑ์ผ่าน
- k6 test รันได้กับ staging URL จริง
- Performance report ระบุ bottleneck ได้ชัดเจน
- Application log output เป็น JSON format
