# Presentation: CI/CD Pipeline

## รูปแบบ
- เวลา: **3 นาที** ต่อกลุ่ม (5 กลุ่ม สลับกัน)
- แสดงผ่านหน้าจอ: GitHub Actions dashboard

---

## สิ่งที่ต้อง Present

1. **Show pipeline รันผ่าน** — เปิด GitHub Actions แสดง green run
2. **Show branch protection** — เปิด Settings แสดง protection rules
3. **Demo: failing test บล็อก merge** — push code ที่มี failing test แล้วแสดงว่า merge ไม่ได้

---

## Rubric การให้คะแนน (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Pipeline ครบ stages** | มีแค่ 1 step | lint หรือ test อย่างใดอย่างหนึ่ง | lint + test | lint + test + build | lint + test + build + deploy |
| **Secrets Management** | hardcode ใน code | hardcode ใน workflow | ใช้ env vars | ใช้ GitHub Secrets | ใช้ Secrets + ไม่มี sensitive data ใน log |
| **Branch Protection** | ไม่มี | มีแต่ไม่ได้เปิด status check | เปิด status check | + require PR review | + ทดสอบว่า failing test บล็อกจริง |
| **Pipeline Speed** | > 10 นาที | 5-10 นาที | 3-5 นาที | 2-3 นาที | < 2 นาที (มี caching) |
| **การนำเสนอ** | demo พัง | demo ได้แต่ไม่อธิบาย | อธิบายได้ | อธิบาย + ตอบคำถาม | อธิบาย + ตอบ + แสดง debug ที่ผ่านมา |

**คะแนนเต็ม: 5 คะแนน**

---

## คำถามที่อาจารย์อาจถาม
- "ถ้า deploy step fail แต่ tests ผ่าน จะเกิดอะไร"
- "ทำไม pipeline ถึงใช้ `npm ci` แทน `npm install`"
- "ถ้ามีคนใน team push secret เข้า repo โดยไม่ตั้งใจ ทำอะไรได้บ้าง"
