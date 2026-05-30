# Present: Performance & Observability

## เวลา: 1 ชั่วโมง (6 กลุ่ม × 10 นาที)
## รูปแบบ: อาจารย์ random 1 คนจากกลุ่ม

---

## สิ่งที่ต้อง Present (10 นาที/กลุ่ม)

### Demo (5 นาที)
1. รัน k6 test ให้เห็นผลใน terminal
2. ชี้ค่า p95, error rate, throughput และอธิบาย
3. เปรียบเทียบกับ hypothesis ที่ส่งมา — ถูกหรือผิด
4. แสดง structured logs ใน terminal

### คำถาม (5 นาที)
อาจารย์อาจถาม:
- "p95=500ms ดีหรือแย่สำหรับ feature นี้"
- "Hypothesis ที่ผิดเพราะอะไร เรียนรู้อะไรจากการผิด"
- "ถ้าจะแก้ bottleneck นี้จะเริ่มจากตรงไหน"
- "Structured logging ช่วยอะไรที่ console.log ทำไม่ได้"

---

## Rubric (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **k6 Test Quality** | แค่ hit homepage | หลาย endpoints | realistic journey | + thresholds | + custom metrics + stages |
| **Analysis** | copy output เฉยๆ | อ่านค่าได้ | อธิบาย p95 ได้ | ระบุ bottleneck + สาเหตุ | + แนวทางแก้ที่ specific |
| **Hypothesis** | ไม่มี | มีแต่ไม่เชื่อมผล | เชื่อมได้บางส่วน | ถูก/ผิด + เหตุผล | + เรียนรู้จากการผิด |
| **Structured Logging** | console.log | มีแต่ text | JSON format | + context fields | + request tracing |
| **Presentation** | ไม่ครบ | ครบ | ชัดเจน | ชัดเจน + ตอบได้ | ตอบทุกคำถาม |

**คะแนนเต็ม: 5 คะแนน**
