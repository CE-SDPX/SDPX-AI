# Lecture: Performance & Performance Harness

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (5 นาที)

เปิด hypotheses ที่กลุ่มต่างๆ ส่งมา:
- hypothesis ไหนน่าสนใจและมีเหตุผลดี
- hypothesis ไหนที่น่าจะผิด และทำไม
- จะพิสูจน์ได้อย่างไร

---

## 2. p95 Latency vs Average (8 นาที)

### ทำไม Average หลอกได้
```
Request times (ms): 50, 48, 52, 49, 51, 53, 47, 50, 49, 1200

Average: 164ms  ← ดูเหมือนช้าปานกลาง แต่ไม่สะท้อนความจริง
p50:      50ms  ← ครึ่งหนึ่งของ users เร็วกว่านี้
p95:     1200ms ← 5% ของ users รอนาน 1.2 วินาที!
```

### ความหมายในทางปฏิบัติ
```
ถ้า app มี 1,000 requests/นาที:
p95 = 1200ms หมายความว่า 50 users/นาที รอนาน 1.2 วินาที

Standard targets:
- API response: p95 < 200ms
- Page load: p95 < 3s
- Background job: p95 < 30s
```

### k6 Output อ่านอย่างไร
```
http_req_duration...: avg=145ms min=45ms med=98ms
                      max=2100ms p(90)=310ms p(95)=890ms

http_req_failed.....: 1.50% ✓ 1856 ✗ 30
http_reqs...........: 1886  62.87/s
```

- `p(95)=890ms` → 5% ของ requests ช้ากว่า 890ms → ต้อง investigate
- `http_req_failed=1.50%` → error rate 1.5% → น่ากังวลถ้า target คือ < 1%
- `62.87/s` → throughput ปัจจุบัน

---

## 3. กับดัก: Optimize ก่อน Measure (5 นาที)

```
❌ วิธีที่ผิด:
Developer: "น่าจะช้าเพราะ database ไม่มี index"
→ เพิ่ม index ทุก column
→ database ช้าลงเพราะ index ที่ไม่จำเป็น
→ ปัญหาจริงคือ N+1 query ที่ไม่ได้แก้

✅ วิธีที่ถูก:
1. วัดก่อน → หา endpoint ที่ช้าที่สุด
2. Profile → ดูว่า time เสียที่ไหน (DB? CPU? Network?)
3. Fix → แก้เฉพาะจุดที่เป็นปัญหา
4. วัดอีกครั้ง → ยืนยันว่าดีขึ้นจริง
```

---

## 4. Performance Harness (7 นาที)

Performance harness คือ infrastructure ที่ทำให้ load test reproducible

### องค์ประกอบของ Performance Harness
```
k6 Script         ← define load pattern และ scenarios
Test Data         ← consistent test data ทุกครั้ง
Baseline Results  ← reference point สำหรับ comparison
Thresholds        ← criteria ที่กำหนดว่า pass/fail
CI Integration    ← รันอัตโนมัติหลัง deploy
```

### k6 Thresholds: Pass/Fail ที่ชัดเจน
```javascript
export const options = {
  thresholds: {
    // 95% ของ requests ต้องเสร็จใน 500ms
    'http_req_duration': ['p(95)<500'],
    // Error rate ต้องต่ำกว่า 1%
    'http_req_failed': ['rate<0.01'],
    // Specific endpoint
    'http_req_duration{url:/api/bookings}': ['p(95)<300'],
  },
};
```

ถ้า threshold ไม่ผ่าน k6 exit ด้วย code ≠ 0 → CI fail อัตโนมัติ

---

## 5. Structured Logging: Observability Harness (5 นาที)

### ปัญหาของ console.log ธรรมดา
```javascript
console.log("User booked room " + roomId);
// ค้นหายาก ไม่รู้ context ไม่สามารถ query ได้
```

### Structured Logging (JSON)
```javascript
logger.info({
  event: 'booking_created',
  userId: 42,
  roomId: 5,
  duration_ms: 145,
  timestamp: new Date().toISOString()
});

// ค้นหาได้: event="booking_created" AND userId=42
// วิเคราะห์ได้: avg duration ของ booking_created events
// Alert ได้: เมื่อ booking_created หายไปมากกว่า 5 นาที
```

---

## Key Takeaways
- p95 latency สำคัญกว่า average — สะท้อน worst-case ที่ users จริงๆ เจอ
- วัดก่อน optimize เสมอ — อย่าเดา
- Thresholds ทำให้ performance test มี pass/fail criteria เหมือน unit test
- Structured logging เป็น observability harness ที่ทำให้ debug production ได้
