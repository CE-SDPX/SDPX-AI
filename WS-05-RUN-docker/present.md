# Present: Docker & Environment Harness

## เวลา: 1 ชั่วโมง (6 กลุ่ม × 10 นาที)
## รูปแบบ: อาจารย์ random 1 คนจากกลุ่ม

---

## สิ่งที่ต้อง Present (10 นาที/กลุ่ม)

### Demo (5 นาที)
1. รัน `docker-compose up` และเปิด app ใน browser
2. แสดง Dockerfile และอธิบาย layer caching strategy
3. แสดง test database config และอธิบายว่าทำไมต้อง ephemeral

### คำถาม (5 นาที)
อาจารย์อาจถาม:
- "Instruction นี้ใน Dockerfile ทำอะไร ทำไมต้องมี"
- "ถ้าแก้ source code 1 บรรทัด Docker จะ rebuild กี่ layer"
- "ทำไม test database ถึงไม่มี volume"
- "ถ้าจะเพิ่ม Redis เข้า stack จะ add ใน compose อย่างไร"

---

## Rubric (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Dockerfile Quality** | build ไม่ได้ | build ได้แต่ไม่ best practice | layer caching ถูกต้อง | + non-root user | + multi-stage build |
| **docker-compose Dev** | ไม่มี | มีแต่ run ไม่ได้ | run ได้ | run ได้ + health check | run ได้ + hot reload |
| **Test Environment** | ไม่มี | มีแต่ share db กับ dev | แยก db | ephemeral db | ephemeral + automated cleanup |
| **Understanding** | อธิบาย instruction ไม่ได้ | อธิบายได้บางส่วน | อธิบายได้ทั้งหมด | + รู้ trade-offs | + แก้ปัญหา on the spot ได้ |
| **Presentation** | ไม่ครบ | ครบแต่ไม่ชัด | ชัดเจน | ชัดเจน + ตอบได้ | ตอบทุกคำถาม |

**คะแนนเต็ม: 5 คะแนน**
