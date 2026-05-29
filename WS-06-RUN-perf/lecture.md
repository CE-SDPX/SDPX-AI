# Lecture: Performance & Observability

## Learning Objectives
- รัน load test และอ่านผลลัพธ์ได้อย่างมีความหมาย
- เข้าใจความแตกต่างระหว่าง p95 latency กับ average
- เพิ่ม structured logging เข้า application ได้

---

## 1. Entry Ticket Review

อาจารย์เปิด hypotheses ที่กลุ่มต่างๆ ส่งมา:
- hypothesis ไหนน่าสนใจ ถูกหรือผิดอย่างไร
- pattern ที่หลายกลุ่มเดาผิด
- วิธีคิดที่ดีกว่าในการ predict bottleneck

---

## 2. p95 Latency vs Average

### ทำไม Average หลอกได้
```
Request times (ms): 50, 55, 48, 52, 49, 51, 800, 47, 53, 50

Average: 125ms  ← ดูเหมือนช้าปานกลาง
p50:      51ms  ← ครึ่งหนึ่งของ requests เร็วกว่านี้
p95:     800ms  ← 5% ของ users รอนาน 800ms!
p99:     800ms
```

### ความหมายในทางปฏิบัติ
- **p95 = 200ms** หมายความว่า 95 ใน 100 requests ตอบภายใน 200ms
- 5 requests ที่เหลืออาจช้ากว่ามาก — นั่นคือ users ที่ experience แย่
- ถ้า service ของคุณมี 1,000 requests/นาที → 50 users/นาที รอนานผิดปกติ

---

## 3. กับดัก: Optimize ก่อน Measure

```
❌ Developer: "น่าจะช้าเพราะ database query ลอง add index ดู"
   → เพิ่ม index แต่ปัญหาจริงคือ N+1 query ที่อื่น
   → เสียเวลา optimize สิ่งที่ไม่ใช่ปัญหา

✅ วิธีที่ถูก:
   1. วัดก่อน — หา endpoint ที่ช้าที่สุดจาก metrics
   2. Profile — ดูว่า time เสียไปที่ไหน (DB? computation? network?)
   3. Optimize จุดที่เป็นปัญหาจริงๆ
   4. วัดอีกครั้ง — ยืนยันว่าดีขึ้นจริง
```

---

## 4. Structured Logging

### ปัญหาของ console.log ธรรมดา
```javascript
console.log("User booked room");
console.log("Error: " + error.message);
// ค้นหายาก วิเคราะห์ไม่ได้ ไม่รู้ context
```

### Structured Logging (JSON format)
```javascript
logger.info({
  event: "booking_created",
  userId: 42,
  roomId: 5,
  duration: 120,
  timestamp: new Date().toISOString()
});

logger.error({
  event: "booking_failed",
  userId: 42,
  roomId: 5,
  error: error.message,
  stack: error.stack
});
```

ข้อดี:
- ค้นหาได้ด้วย query เช่น `event="booking_failed" AND userId=42`
- วิเคราะห์ pattern ได้
- Alert ได้เมื่อ error rate สูง

---

## 5. k6 Result Reading

```
scenarios: (100.00%) 1 scenario, 10 max VUs
default: 10 looping VUs for 30s

✓ status is 200
✓ response time OK

checks.........................: 98.50%
http_req_duration..............: avg=145ms min=45ms med=98ms max=2100ms p(90)=310ms p(95)=890ms
http_req_failed................: 1.50%
http_reqs......................: 1240 41.33/s
```

**อ่านผลอย่างไร:**
- `p(95)=890ms` — 5% ของ users รอนานกว่า 890ms → น่ากังวล
- `http_req_failed=1.50%` — มี error 1.5% → ต้อง investigate
- `41.33/s` — throughput ปัจจุบัน

---

## Key Takeaways
- p95 สำคัญกว่า average เพราะสะท้อน worst-case experience จริงๆ
- วัดก่อน optimize เสมอ — อย่าเดา
- Structured logging ทำให้ debug production ง่ายขึ้นมาก
- k6 script ที่ AI generate มักขาด realistic user behavior — ต้อง review
