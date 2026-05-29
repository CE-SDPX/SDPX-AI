# Presentation: Performance & Observability

## รูปแบบ
- เวลา: **3 นาที** ต่อกลุ่ม (5 กลุ่มที่เหลือ)
- แสดงผ่านหน้าจอ: k6 results + performance report

---

## สิ่งที่ต้อง Present

1. **Hypothesis vs Actual** — บอก hypothesis ที่ส่งมาก่อน และผลจริงเป็นอย่างไร ถูกหรือผิด
2. **Bottleneck ที่เจอ** — คือที่ไหน สาเหตุคืออะไร
3. **p95 latency** — เป็นเท่าไหร่ acceptable สำหรับ use case นี้หรือไม่

---

## Rubric การให้คะแนน (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **k6 Test Quality** | แค่ hit homepage | มีหลาย endpoints | realistic user journey | + thresholds | + stages (ramp up/down) |
| **Analysis** | แค่ copy k6 output | อ่านค่าได้ | อธิบาย p95 ได้ | ระบุ bottleneck ได้ | bottleneck + สาเหตุ + แนวทางแก้ |
| **Hypothesis** | ไม่มี hypothesis | มีแต่ไม่เชื่อมกับผล | เชื่อมกันได้บางส่วน | ถูก/ผิด + เหตุผล | ถูก/ผิด + เรียนรู้อะไรจากการผิด |
| **Structured Logging** | ยังเป็น console.log | มี logging แต่ไม่ structured | JSON format | + context fields | + request tracing |
| **การนำเสนอ** | present ไม่ครบ | ครบแต่ไม่ชัด | ชัดเจน | + ตอบคำถามได้ | + อธิบาย trade-off ได้ |

**คะแนนเต็ม: 5 คะแนน**

---

## คำถามที่อาจารย์อาจถาม
- "p95=500ms ดีหรือแย่สำหรับ service นี้"
- "ถ้าจะแก้ bottleneck นี้ จะเริ่มจากตรงไหน"
- "Structured logging ช่วยอะไรที่ console.log ทำไม่ได้"
