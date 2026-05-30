# Present: Unit Testing

## เวลา: 1 ชั่วโมง (6 กลุ่ม × 10 นาที)
## รูปแบบ
- อาจารย์ random 1 คนจากกลุ่มมา present

---

## สิ่งที่ต้อง Present (10 นาที/กลุ่ม)

### Demo (5 นาที)
1. รัน test suite ให้เห็น pass ใน terminal
2. แสดง fake repository และอธิบายว่าทำงานอย่างไร
3. แสดง fixture หรือ factory 1 ตัวและอธิบาย
4. รัน E2E smoke test

### อธิบาย (3 นาที)
- เลือก test 1 ตัวที่น่าสนใจที่สุด อธิบายว่ามันวัดอะไร
- บอกว่า AI generate test อะไรให้บ้าง และทิ้งอะไรไปทำไม

### คำถาม (2 นาที)
อาจารย์อาจถาม:
- "Test นี้จะ fail ได้อย่างไร — ลอง break มันให้ดู"
- "ทำไมใช้ FakeRepo แทน real database"
- "Fixture นี้ต่างจาก Factory อย่างไร"

---

## Rubric (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Tests ผ่าน** | มี failure | ผ่านบางส่วน | ทุก test ผ่าน | ผ่าน + coverage ≥ 70% | ผ่าน + coverage ≥ 80% + no trivial tests |
| **Test Doubles** | ไม่มี | มีแต่ใช้ผิดประเภท | มี fake/stub อย่างน้อย 1 | มีหลายประเภท | มีครบ + อธิบายว่าใช้เมื่อไหร่ได้ |
| **Fixtures/Factories** | ไม่มี | มีแต่ไม่ reuse | มี + reuse ใน tests | มี + ลด repetition ชัดเจน | มี + เห็น before/after ที่ cleaner |
| **E2E Smoke Test** | ไม่มี | มีแต่ fail | ผ่าน + basic check | ผ่าน + data-testid | ผ่าน + หลาย assertions |
| **AI Review** | ไม่ได้ review | เก็บทุกอย่าง | ทิ้งบางส่วน | ทิ้ง + เหตุผล | วิเคราะห์ครบ + ชี้ได้ว่า AI พลาดอะไร |

**คะแนนเต็ม: 5 คะแนน**
