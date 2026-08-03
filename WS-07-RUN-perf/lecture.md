# Lecture: Performance, Observability & the Production Loop

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (4 นาที)

เปิด hypotheses ที่กลุ่มต่าง ๆ ส่งมา:
- hypothesis ไหนน่าสนใจและมีเหตุผลดี
- hypothesis ไหนที่น่าจะผิด และทำไม
- จะพิสูจน์ได้อย่างไร

เก็บทุกอันไว้ — ตอนจบ lab เราจะกลับมาดูว่าใครเดาถูก และที่สำคัญกว่าคือ *ใครเดาผิดแล้วได้เรียนรู้อะไร*

---

## 2. Production Loop: loop ที่ยาวที่สุดและจริงที่สุด (4 นาที)

```
Deploy ──→ Measure ──→ Analyze ──→ Optimize ──→ Deploy ↺
```

ทุก loop ก่อนหน้านี้ใช้ข้อมูลที่ **เราสร้างขึ้นเอง** (test data, fixture, seed)
loop นี้เป็นอันแรกที่ใช้ **ความจริงจากระบบที่รันอยู่**

| | Test Loops (WS-03–06) | Production Loop |
|---|---|---|
| ข้อมูล | เราสมมติเอง | ของจริงจากการใช้งาน |
| Latency | วินาที–นาที | นาที–วัน |
| จับอะไรได้ | สิ่งที่เรานึกออกว่าจะพัง | สิ่งที่เราไม่เคยนึกถึง |

**ทำไมยังต้องมี ทั้งที่มี test ครบแล้ว:** test ตอบได้แค่ว่า "ระบบทำตามที่เราคิดไว้ไหม"
แต่ตอบไม่ได้ว่า "สิ่งที่เราคิดไว้ถูกไหม" — production loop ตอบข้อหลัง

---

## 3. p95 Latency vs Average (6 นาที)

### ทำไม Average หลอกได้
```
Request times (ms): 50, 48, 52, 49, 51, 53, 47, 50, 49, 1200

Average: 164.9ms ← ดูเหมือนช้าปานกลาง แต่ไม่มี request ไหนใช้เวลาเท่านี้เลย
p50:      50ms   ← ครึ่งหนึ่งของ users เร็วกว่านี้
p95:    1200ms   ← 5% ของ users รอนาน 1.2 วินาที
```

### ความหมายในทางปฏิบัติ
```
ถ้า app มี 1,000 requests/นาที:
p95 = 1200ms หมายความว่า ~50 requests/นาที ที่ผู้ใช้รอนาน 1.2 วินาที

เป้าหมายที่ใช้กันทั่วไป:
- API response:   p95 < 200ms
- Page load:      p95 < 3s
- Background job: p95 < 30s
```

> ยิ่ง user ใช้ระบบมาก ยิ่งมีโอกาสเจอ tail latency — คนที่ใช้บ่อยที่สุด
> คือคนที่เจอ p99 เป็นประจำ ซึ่งมักเป็น user ที่สำคัญที่สุดของเราด้วย

### จาก Percentile สู่ SLO
```
SLI (Indicator): p95 ของ GET /api/rooms
SLO (Objective): p95 < 300ms ใน 99% ของช่วงเวลา ตลอด 30 วัน
```
SLO ทำให้คำว่า "เร็วพอ" มีคำตอบที่ pass/fail ได้ — เหมือนที่ acceptance criteria
ทำให้ "ทำงานถูก" มีคำตอบที่ pass/fail ได้

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

## 4. กับดัก: Optimize ก่อน Measure (4 นาที)

```
❌ วิธีที่ผิด:
Developer: "น่าจะช้าเพราะ database ไม่มี index"
→ เพิ่ม index ทุก column
→ write ช้าลงเพราะต้อง maintain index ที่ไม่จำเป็น
→ ปัญหาจริงคือ N+1 query ที่ไม่ได้แก้

✅ วิธีที่ถูก:
1. วัดก่อน   → หา endpoint ที่ช้าที่สุด
2. Profile   → ดูว่าเวลาหมดไปกับอะไร (DB? CPU? Network? Serialization?)
3. Fix       → แก้เฉพาะจุดที่เป็นปัญหา
4. วัดอีกครั้ง → ยืนยันว่าดีขึ้นจริง และไม่ทำอย่างอื่นแย่ลง
```

**ข้อนี้ใช้กับ AI ด้วย** — ถ้าถาม AI ว่า "ทำไม endpoint นี้ช้า" โดยไม่ให้ข้อมูลการวัด
มันจะตอบด้วยรายการสาเหตุยอดฮิตที่อาจไม่เกี่ยวกับ code เราเลย
ให้ป้อน k6 output + query log + code จริงเข้าไปด้วย คำตอบจะเปลี่ยนไปคนละเรื่อง

---

## 5. ทำให้ Performance เป็นด่านที่ pass/fail ได้ (6 นาที)

### องค์ประกอบ
```
k6 Script         ← define load pattern และ user journey
Test Data         ← ข้อมูลชุดเดิมทุกครั้ง (ไม่งั้นเทียบกันไม่ได้)
Baseline Results  ← จุดอ้างอิงสำหรับเปรียบเทียบ
Thresholds        ← เกณฑ์ที่ทำให้ผลเป็น pass/fail
CI Integration    ← รันอัตโนมัติหลัง deploy staging
```

### k6 Thresholds
```javascript
export const options = {
  thresholds: {
    // 95% ของ requests ต้องเสร็จใน 500ms
    'http_req_duration': ['p(95)<500'],
    // Error rate ต้องต่ำกว่า 1%
    'http_req_failed': ['rate<0.01'],
    // เจาะจงราย endpoint ด้วย tag
    'http_req_duration{name:list_rooms}': ['p(95)<300'],
  },
};
```

ถ้า threshold ไม่ผ่าน **k6 exit ด้วย code ≠ 0 → CI fail อัตโนมัติ**
นี่คือสิ่งที่เปลี่ยน performance จาก "ตัวเลขที่ดูแล้วผ่าน ๆ ไป" เป็นด่านจริงใน loop

### Load Profile ที่สมจริง
```javascript
export const options = {
  stages: [
    { duration: '30s', target: 5  },   // ramp up
    { duration: '1m',  target: 10 },   // steady state
    { duration: '30s', target: 0  },   // ramp down
  ],
};
```
- ramp up ช่วยให้เห็นว่าระบบเริ่มแย่ที่ VU เท่าไร ไม่ใช่แค่ผ่าน/ไม่ผ่าน
- ต้องมี **think time** (`sleep`) ระหว่าง request ไม่งั้นเรากำลังวัด "bot ยิงรัว"
  ไม่ใช่ "คนใช้งาน"

> **ข้อควรระวังสำคัญ:** ยิง load test ใส่ staging เท่านั้น
> อย่ายิงใส่ production หรือใส่ระบบของคนอื่นเด็ดขาด — นั่นคือ DoS

---

## 6. Observability: ทำให้ระบบเล่าเรื่องตัวเองได้ (6 นาที)

k6 บอกว่า "ช้า" แต่ไม่บอกว่า "ช้าตรงไหน" — observability คือส่วนที่ตอบข้อหลัง

### ปัญหาของ console.log ธรรมดา
```javascript
console.log("User booked room " + roomId);
// ค้นหายาก ไม่มี context ไม่รู้ว่าใช้เวลาเท่าไร query ไม่ได้
```

### Structured Logging (JSON)
```javascript
logger.info({
  event: 'booking_created',
  userId: 42,
  roomId: 5,
  duration_ms: 145,
  requestId: req.id,
});

// ค้นหาได้:  event="booking_created" AND userId=42
// วิเคราะห์ได้: p95 ของ duration_ms ต่อ event
// Alert ได้:   เมื่อ booking_created หายไปเกิน 5 นาทีในช่วงเวลาทำการ
```

**กติกา 3 ข้อ:**
1. หนึ่ง event = หนึ่งบรรทัด JSON มี `event` เป็นชื่อคงที่
2. มี `requestId` (correlation id) ทุกบรรทัด เพื่อร้อยเรื่องของ request เดียวกันเข้าด้วยกัน
3. **ห้าม log ข้อมูลส่วนบุคคลหรือ secret** — email, รหัสนักศึกษา, token, password
   ให้ log `userId` แทน

### สามเสาของ Observability
| เสา | ตอบคำถาม | ตัวอย่างในวิชานี้ |
|---|---|---|
| **Logs** | "เกิดอะไรขึ้นตอนนั้น" | structured log ของ booking_created |
| **Metrics** | "แนวโน้มเป็นอย่างไร" | p95 latency, error rate, requests/s |
| **Traces** | "เวลาหมดไปกับ step ไหน" | request → service → query |

Traces คือสิ่งที่ตอบคำถาม "ช้าตรงไหน" ได้ตรงที่สุด มาตรฐานปัจจุบันคือ **OpenTelemetry**
ในวิชานี้ยังไม่ต้อง setup เต็มรูปแบบ แต่ให้รู้ว่า `requestId` ที่เราใส่ใน log
คือรุ่นทำมือของ trace id

### Log คือ context ของ AI ด้วย
เวลาให้ agent ช่วย debug production:
```
❌ "ระบบช้า ช่วยดูให้หน่อย"
✅ "นี่คือ k6 output, structured log 20 บรรทัดของ request ที่ช้าที่สุด
    และ code ของ handler นี้ — ช่วยหาว่าเวลาหมดไปตรงไหน"
```
โครงสร้างของ log ที่ดีทำให้ context ที่เราให้ AI แม่นขึ้นมาก

---

## Key Takeaways
- Production Loop เป็น loop เดียวที่ใช้ความจริง ไม่ใช่ข้อมูลที่เราสมมติเอง
- p95 สำคัญกว่า average — และ SLO ทำให้ "เร็วพอ" มีคำตอบที่ pass/fail ได้
- วัดก่อน optimize เสมอ ทั้งเวลาเราคิดเองและเวลาถาม AI
- Thresholds ทำให้ performance test เป็นด่านจริงใน CI ไม่ใช่แค่รายงาน
- Structured logging + requestId คือฐานของ observability และเป็น context ชั้นดีให้ AI

---

## AI-DLC Connection: Operations Phase — Monitor Stage

```
Operations Phase:
Build → Deploy → Verify → [Monitor]
                              ↑
                           วันนี้
```

**Monitor Stage:**
- k6 script = load scenario ที่รันซ้ำได้เหมือนเดิมทุก deploy
- Thresholds = quality gate อัตโนมัติ — fail fast ถ้ามี performance regression
- Structured logging = สัญญาณที่ทั้งคนและ AI ใช้วิเคราะห์ได้
- Baseline comparison = รู้ทันทีว่า bolt ใหม่ทำให้ช้าลงหรือไม่

Human checkpoint ใน Monitor Stage: review performance report หลังทุก significant bolt
AI analyze logs → propose optimizations → human validate และ approve

> ตอนนี้ loop ครบวงแล้ว: spec → unit → acceptance → environment → integration → production
> สัปดาห์สุดท้ายเราจะใช้ทั้งหมดนี้เป็นตาข่ายนิรภัยเพื่อกล้าแก้ code ที่ไม่ดี
