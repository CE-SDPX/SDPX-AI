# Present: Requirements & API Design

## เวลา: 1 ชั่วโมง (6 กลุ่ม × 10 นาที)
## รูปแบบ
- อาจารย์ random 1 คนจากกลุ่มมา present
- ไม่ต้องมี slide — demo หน้าจอ

---

## สิ่งที่ต้อง Present (10 นาที/กลุ่ม)

### Demo (5 นาที)
1. เปิด GitHub Issues แสดง product backlog
2. อ่าน user story 1 อัน พร้อม acceptance criteria
3. เปิด architecture diagram และอธิบาย
4. เปิด OpenAPI spec ใน Swagger Editor

### Defend (3 นาที)
- เลือก 1 endpoint ที่น่าสนใจที่สุดและ defend การตัดสินใจ
  เช่น ทำไมใช้ POST ไม่ใช่ PUT, ทำไม status code 422 ไม่ใช่ 400

### คำถาม (2 นาที)
อาจารย์อาจถาม:
- "Endpoint นี้ถ้า user ส่ง request มาโดยไม่ได้ login จะเกิดอะไร"
- "User story นี้ test ยังไงได้บ้าง"
- "N:M relationship ใน ER diagram handle อย่างไรใน database"

---

## Rubric (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **User Stories** | ไม่มี AC | มี AC แต่วัดไม่ได้ | AC วัดได้บางส่วน | AC วัดได้ทุกอัน | AC ครบ + edge cases |
| **Architecture** | ไม่มี diagram | มีแต่ไม่สมบูรณ์ | ครบ components | ครบ + relationships | ครบ + อธิบายได้ชัดเจน |
| **OpenAPI Spec** | ไม่มี | invalid | valid แต่ขาด errors | valid + error responses | valid + error + auth + schema ครบ |
| **Defense** | ตอบไม่ได้ | ตอบได้แต่ไม่มีเหตุผล | มีเหตุผลบางส่วน | มีเหตุผลชัดเจน | มีเหตุผล + รู้ trade-off |
| **Presentation** | ไม่ครบ | ครบแต่ไม่ชัด | ชัดเจน | ชัดเจน + ตอบคำถามได้ | ชัดเจน + ตอบทุกคำถาม |

**คะแนนเต็ม: 5 คะแนน**
