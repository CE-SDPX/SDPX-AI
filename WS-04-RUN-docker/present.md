# Presentation: E2E Testing & Docker

## รูปแบบ
- เวลา: **2 นาที** ต่อกลุ่ม (ทุกกลุ่ม)
- แสดงผ่านหน้าจอ: terminal demo

---

## สิ่งที่ต้อง Demo (ไม่ต้องมี slide)

1. รัน E2E tests ให้เห็น pass ใน terminal หรือ browser
2. รัน `docker-compose up` และเปิด app ใน browser

---

## Rubric การให้คะแนน (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **E2E Tests** | ไม่มี tests | มี test แต่ fail | pass แต่แค่ happy path | pass + 1 edge case | pass + 2 edge cases + ใช้ data-testid |
| **Docker Build** | build ไม่ได้ | build ได้แต่ run ไม่ได้ | run ได้แต่ไม่มี compose | compose ทำงานได้ | compose + อธิบาย Dockerfile ได้ |
| **Dockerfile Quality** | copy-paste ไม่เข้าใจ | เข้าใจบางส่วน | เข้าใจทุก instruction | + layer caching ถูกต้อง | + security best practices |
| **Demo** | demo พัง | demo ได้แต่ช้ามาก | demo ผ่านแต่ไม่อธิบาย | demo + อธิบาย | demo + อธิบาย + ตอบคำถามได้ |
| **ทีมงาน** | คนเดียวทำ | 2 คน | 3 คน | 4 คน | ทุกคน (5 คน) ทำได้ |

**คะแนนเต็ม: 5 คะแนน**

---

## คำถามที่อาจารย์อาจถาม
- "Instruction `RUN npm ci` ต่างจาก `RUN npm install` อย่างไร"
- "ถ้าแก้ source file 1 ไฟล์ Docker จะ rebuild กี่ layer"
- "E2E test นี้อาจ flaky ได้ไหม ทำไม"
