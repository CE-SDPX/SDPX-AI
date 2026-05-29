# Presentation: Requirements & API Design

## รูปแบบ
- เวลา: **3 นาที** ต่อกลุ่ม (5 กลุ่ม สลับกันแต่ละสัปดาห์)
- ผู้พูด: อย่างน้อย 2 คนในกลุ่ม
- แสดงผ่านหน้าจอ: GitHub Issues + diagram + OpenAPI spec

---

## สิ่งที่ต้อง Present

1. **Product Backlog** — แสดง user stories ใน GitHub Issues พร้อม acceptance criteria 1 ตัวอย่าง
2. **Architecture** — อธิบาย component diagram ว่าแต่ละส่วนทำอะไร
3. **API Design Decision** — เลือก 1 endpoint ที่น่าสนใจและ defend การตัดสินใจ เช่น ทำไมถึงใช้ method นี้ ทำไม status code นี้

---

## Rubric การให้คะแนน (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **User Stories** | ไม่มี acceptance criteria | มี AC แต่วัดไม่ได้ | มี AC วัดได้บางส่วน | มี AC วัดได้ทุกอัน | มี AC ครบ + edge cases |
| **Component Diagram** | ไม่มี diagram | มี diagram แต่ไม่สมบูรณ์ | ครบ components แต่ขาด relationships | ครบและ relationships ถูกต้อง | ครบ ถูกต้อง และอธิบายได้ชัดเจน |
| **OpenAPI Spec** | ไม่มี spec | มี spec แต่ invalid | valid แต่ขาด error responses | valid + error responses ครบ | valid + error + auth + schema ครบ |
| **Defense การตัดสินใจ** | ตอบไม่ได้ | ตอบได้แต่ไม่มีเหตุผล | มีเหตุผลแต่ไม่ชัดเจน | มีเหตุผลชัดเจน | มีเหตุผล + รู้ trade-off |
| **การนำเสนอ** | present ไม่ครบหัวข้อ | ครบแต่ไม่ชัดเจน | ชัดเจนแต่มีแค่คนเดียวพูด | ชัดเจน 2 คนขึ้นไป | ชัดเจน ทุกคนมีส่วนร่วม ตอบคำถามได้ |

**คะแนนเต็ม: 5 คะแนน**

---

## คำถามที่อาจารย์อาจถาม
- "Endpoint นี้ทำไมใช้ POST ไม่ใช้ PUT"
- "ถ้า user ส่ง request มาโดยไม่ได้ login จะเกิดอะไร"
- "N:M relationship ใน ER diagram นี้ handle อย่างไรใน database จริงๆ"
- "User story ไหนที่คิดว่าสำคัญที่สุดและทำไม"
