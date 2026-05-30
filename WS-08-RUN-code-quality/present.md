# Present: Code Quality & Security

## เวลา: 1 ชั่วโมง (6 กลุ่ม × 10 นาที)
## รูปแบบ: อาจารย์ random 1 คนจากกลุ่ม

---

## สิ่งที่ต้อง Present (10 นาที/กลุ่ม)

### Demo (5 นาที)
1. แสดง code before/after refactoring
2. รัน tests และแสดงว่า harness ยัง green หลัง refactor
3. เปิด ADR และอธิบาย decision ที่บันทึกไว้
4. แสดง security issues ที่พบจาก pre-check

### คำถาม (5 นาที)
อาจารย์อาจถาม:
- "AI suggest ให้เพิ่ม [pattern X] แต่กลุ่มไม่ทำ ทำไม"
- "ถ้า tests ไม่ pass หลัง refactor จะทำอะไร"
- "ADR นี้จะ supersede ได้เมื่อไหร่"
- "Security issue ที่พบ fix ยังไง"

---

## Rubric (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Refactoring Quality** | เปลี่ยน cosmetic | แก้ naming | แก้ code smell จริงๆ | + แยก responsibilities | + ทั้งหมด + explain rationale |
| **Tests Green** | tests fail | บาง test fail | ทุก test ผ่าน | + เพิ่ม tests ใหม่ | + coverage เพิ่มขึ้น |
| **AI Review Analysis** | ไม่ได้ review | เก็บทุกอย่าง | ทิ้งบางส่วน | ทิ้ง + เหตุผล | วิเคราะห์ครบ + รู้ AI พลาดอะไร |
| **ADR** | ไม่มี | template เปล่า | มีเนื้อหา | ครบทุก section | + alternatives + trade-offs |
| **Presentation** | ไม่ครบ | ครบ | ชัดเจน | ชัดเจน + ตอบได้ | ตอบทุกคำถาม |

**คะแนนเต็ม: 5 คะแนน**
