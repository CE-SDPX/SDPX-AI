# Present: CI/CD Pipeline

## เวลา: 1 ชั่วโมง (6 กลุ่ม × 10 นาที)
## รูปแบบ: อาจารย์ random 1 คนจากกลุ่ม

---

## สิ่งที่ต้อง Present (10 นาที/กลุ่ม)

### Demo (5 นาที)
1. เปิด GitHub Actions และแสดง successful pipeline run
2. คลิก เข้าไปดูแต่ละ job และ steps
3. แสดง branch protection settings
4. Demo: push code ที่มี failing test และแสดงว่า merge ถูกบล็อก

### คำถาม (5 นาที)
อาจารย์อาจถาม:
- "ถ้า E2E test fail แต่ unit test ผ่าน จะเกิดอะไร"
- "ทำไมใช้ `npm ci` แทน `npm install`"
- "Secrets ที่ใช้ใน workflow มีอะไรบ้าง เก็บไว้ที่ไหน"
- "Fail fast strategy ที่ใช้คืออะไร"

---

## Rubric (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Pipeline ครบ** | แค่ 1 job | lint หรือ test | lint + test | lint + test + E2E | lint + test + E2E + deploy |
| **Secrets** | hardcode | env vars | GitHub Secrets | Secrets + ไม่ log | Secrets + rotation plan |
| **Branch Protection** | ไม่มี | มีแต่ไม่ require CI | require CI | + require review | + tested ว่า block จริง |
| **Pipeline Speed** | > 10 นาที | 5-10 นาที | 3-5 นาที | 2-3 นาที | < 2 นาที (caching) |
| **Presentation** | ไม่ครบ | ครบ | ชัดเจน | ชัดเจน + ตอบได้ | ตอบทุกคำถาม |

**คะแนนเต็ม: 5 คะแนน**
