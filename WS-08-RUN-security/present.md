# Presentation: Final Demo & Oral Defense

## รูปแบบ
- เวลา: **12 นาที** ต่อกลุ่ม (ทุก 10 กลุ่ม)
  - Live demo: 5 นาที
  - Oral defense: 7 นาที (อาจารย์ถามทุกคนในกลุ่ม)
- Platform: staging environment จริง

---

## Live Demo (5 นาที)

แสดง working features บน staging:
1. User journey หลัก end-to-end (2-3 features)
2. หนึ่ง feature ที่ภูมิใจที่สุด
3. ถ้ามีเวลา: แสดง CI/CD pipeline หรือ test suite รัน

**ข้อแนะนำ:**
- ซ้อมก่อนจนลื่น
- มี backup plan ถ้า demo พัง (screenshots หรือ video)
- ทุกคนในกลุ่มมีส่วนใน demo

---

## Oral Defense (7 นาที)

อาจารย์จะถามทุกคนในกลุ่ม ไม่ใช่แค่หัวหน้ากลุ่ม

**ตัวอย่างคำถาม:**
- "อธิบาย function นี้ให้ฟัง — มันทำอะไร ทำไมถึงเขียนแบบนี้"
- "AI เขียนส่วนนี้ให้ใช่ไหม รู้ได้อย่างไรว่าถูกต้อง"
- "ถ้าเริ่มใหม่จะเปลี่ยน architecture ตรงไหน"
- "Bottleneck ที่เจอคืออะไร แก้อย่างไร"
- "Security issue ที่พบคืออะไร แก้ยังไง"
- "Test ตัวนี้วัดอะไร ทำไมต้องมี"

---

## Rubric การให้คะแนน (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Working Product** | app ไม่ทำงาน | ทำงานได้บางส่วน | core features ทำงาน | core + nice-to-have | polished, production-ready feel |
| **Technical Depth** | อธิบาย code ไม่ได้ | อธิบายได้บางส่วน | อธิบาย core logic ได้ | + design decisions | + trade-offs และ alternatives |
| **AI Collaboration** | "AI เขียนให้" เฉยๆ | บอก AI ช่วยตรงไหน | + review process | + เหตุผลที่ยอมรับ/ปฏิเสธ | + เรียนรู้อะไรจาก AI |
| **Security & Quality** | ไม่ได้ audit | audit แต่มี issues ค้างอยู่ | แก้ critical issues | + checklist ครบ | + proactive improvements |
| **Team Contribution** | คนเดียวตอบทุกอย่าง | 2 คน | 3 คน | 4 คน | ทุกคนตอบได้ทุกส่วน |

**คะแนนเต็ม: 5 คะแนน**

---

## สิ่งที่จะทำให้ Oral Defense ผ่านหรือตก

**ผ่าน:**
- อธิบาย code ที่ตัวเองเขียน (หรือ AI เขียนและ review แล้ว) ได้
- รู้ว่า system ทำงานอย่างไร end-to-end
- บอกได้ว่า AI ช่วยตรงไหนและ review อย่างไร

**ตก:**
- ตอบไม่ได้ว่า function ที่อยู่ใน code ของตัวเองทำอะไร
- บอกแค่ "AI เขียนให้" โดยไม่มี review process
- ไม่รู้ว่า architecture ของ project ตัวเองเป็นอย่างไร
