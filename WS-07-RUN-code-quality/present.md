# Presentation: Refactoring & Code Quality

## รูปแบบ
- เวลา: **4 นาที** ต่อกลุ่ม (ทุก 10 กลุ่ม)
- แสดงผ่านหน้าจอ: code before/after + test results

---

## สิ่งที่ต้อง Present

1. **Before/After** — แสดง code เก่าและใหม่ อธิบายว่า smells อะไรที่แก้
2. **AI vs ทีม** — บอกว่า AI suggest อะไร เก็บอะไร ทิ้งอะไร และทำไม
3. **Tests ยังผ่าน** — รัน test suite ให้เห็น green

---

## Rubric การให้คะแนน (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Refactoring Quality** | เปลี่ยน cosmetic เท่านั้น | แก้ naming | แก้ code smell จริงๆ | + แยก responsibilities | + ทั้งหมดพร้อม explain rationale |
| **Tests หลัง Refactor** | tests fail | บาง test fail | ทุก test ผ่าน | + เพิ่ม tests ใหม่ด้วย | + coverage เพิ่มขึ้น |
| **AI Review Analysis** | ไม่ได้ review | เก็บทุกอย่างที่ AI บอก | ทิ้งบางส่วน | ทิ้ง + เหตุผล | วิเคราะห์ครบ + รู้ว่า AI ไม่รู้อะไร |
| **ADR** | ไม่มี | มี template แต่เปล่า | มีเนื้อหาบางส่วน | ครบทุก section | + alternatives ที่พิจารณาแล้วไม่เลือก |
| **การนำเสนอ** | present ไม่ครบ | ครบแต่ไม่ชัด | ชัดเจน | + ตอบคำถามได้ | + ทุกคนพูดและรู้เรื่อง |

**คะแนนเต็ม: 5 คะแนน**

---

## คำถามที่อาจารย์อาจถาม
- "AI suggest ให้เพิ่ม design pattern X แต่กลุ่มไม่ทำ ทำไม"
- "ถ้า refactor function นี้ต่อไปอีก จะเริ่มจากตรงไหน"
- "ADR นี้จะ supersede ได้เมื่อไหร่"
