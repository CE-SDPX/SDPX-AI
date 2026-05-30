# Lab: Performance Testing & Performance Harness

## เวลา: 1.5 ชั่วโมง
## เป้าหมาย
สร้าง performance harness ที่ reproducible และเพิ่ม structured logging

---

## ขั้นตอนที่ 1 — Load Test Script ที่ Realistic (30 นาที)

### สร้าง performance/load-test.js

```javascript
import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const bookingDuration = new Trend('booking_duration');

export const options = {
  stages: [
    { duration: '30s', target: 5  },   // ramp up
    { duration: '1m',  target: 10 },   // steady state
    { duration: '30s', target: 0  },   // ramp down
  ],
  thresholds: {
    'http_req_duration':            ['p(95)<500'],
    'http_req_failed':              ['rate<0.01'],
    'errors':                       ['rate<0.05'],
    // Custom threshold สำหรับ main feature
    'booking_duration':             ['p(95)<300'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // Simulate realistic user journey ไม่ใช่แค่ hit 1 endpoint
  group('Browse and select', () => {
    const listRes = http.get(`${BASE_URL}/api/[resource]`);
    check(listRes, {
      'list status 200': (r) => r.status === 200,
      'list has items': (r) => JSON.parse(r.body).length > 0,
    });
    errorRate.add(listRes.status !== 200);
    sleep(1);

    const detailRes = http.get(`${BASE_URL}/api/[resource]/1`);
    check(detailRes, { 'detail status 200': (r) => r.status === 200 });
    sleep(1);
  });

  group('Create action', () => {
    const start = Date.now();
    const createRes = http.post(
      `${BASE_URL}/api/[resource]`,
      JSON.stringify({ /* test data */ }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    bookingDuration.add(Date.now() - start);

    check(createRes, {
      'create status 201': (r) => r.status === 201,
    });
    errorRate.add(createRes.status !== 201);
    sleep(2);
  });
}
```

### รันและบันทึก Baseline
```bash
k6 run --out json=performance/results-baseline.json performance/load-test.js
```

เปรียบเทียบกับ hypothesis ที่ส่งมา:
- Bottleneck ที่เดาไว้ถูกหรือผิด
- p95 latency ที่ได้คือเท่าไหร่
- Endpoint ไหนช้าที่สุด

บันทึกผลใน `docs/performance-report.md`

---

## ขั้นตอนที่ 2 — เพิ่ม Structured Logging (25 นาที)

### ติดตั้ง Logger
```bash
# Node.js
npm install pino pino-pretty

# Python
pip install structlog
```

### Setup Logger
```javascript
// lib/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  ...(process.env.NODE_ENV === 'development' && {
    transport: { target: 'pino-pretty' }
  }),
});
```

### เพิ่ม Request Logging Middleware
```javascript
// middleware/logging.ts
export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    logger.info({
      event: 'http_request',
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration_ms: Date.now() - start,
      userId: req.user?.id,
    });
  });

  next();
}
```

### เพิ่ม Business Event Logging
```javascript
// services/[domain]Service.ts
logger.info({
  event: '[action]_created',
  [resource]Id: result.id,
  userId: userId,
  duration_ms: Date.now() - start,
});

logger.error({
  event: '[action]_failed',
  reason: error.message,
  userId: userId,
  input: { /* sanitized input */ },
});
```

---

## ขั้นตอนที่ 3 — Integrate กับ CI (20 นาที)

เพิ่ม performance job ใน `.github/workflows/ci.yml`:
```yaml
  performance:
    needs: e2e-tests
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'

    steps:
      - uses: actions/checkout@v4
      - name: Install k6
        run: |
          curl https://github.com/grafana/k6/releases/download/v0.49.0/k6-v0.49.0-linux-amd64.tar.gz -L | tar xvz
          sudo mv k6-v0.49.0-linux-amd64/k6 /usr/local/bin

      - name: Run Performance Tests
        run: k6 run performance/load-test.js
        env:
          BASE_URL: ${{ secrets.STAGING_URL }}

      - name: Upload Results
        uses: actions/upload-artifact@v4
        with:
          name: k6-results
          path: performance/results-*.json
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `performance/load-test.js` | k6 script พร้อม thresholds | GitHub repo |
| `docs/performance-report.md` | Baseline results + hypothesis vs actual | GitHub repo |
| Structured logging code | Request + business event logging | GitHub repo |

### เกณฑ์ผ่าน
- [ ] k6 test รันได้กับ staging URL
- [ ] มี thresholds ที่กำหนดชัดเจน
- [ ] Performance report ระบุ bottleneck ได้
- [ ] Application logs output เป็น JSON format
