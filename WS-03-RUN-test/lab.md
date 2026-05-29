# Lab: Unit Testing

## เป้าหมาย
เขียน unit tests ที่ครอบคลุม core business logic ของ project โดยเน้นคุณภาพมากกว่าปริมาณ

---

## ขั้นตอนที่ 1 — ระบุ Business Logic ที่ต้อง Test (15 นาที)

จาก user stories และ OpenAPI spec ของกลุ่ม ระบุ functions/methods ที่มี business logic สำคัญ เช่น:
- Validation rules (ห้องจองซ้อนไม่ได้, capacity ไม่เกิน)
- Calculation (คำนวณราคา, คำนวณเวลา)
- State transitions (booking: pending → confirmed → cancelled)

สร้าง list ใน `tests/TEST_PLAN.md` ก่อนเริ่มเขียน

---

## ขั้นตอนที่ 2 — เขียน Tests ด้วยตัวเอง (30 นาที)

เขียน tests สำหรับ core logic อย่างน้อย **3 functions** โดยใช้ AAA pattern:

```
tests/
  test_booking_service.py
  test_room_validator.py
  test_[your_domain].py
```

**ทำด้วยมือก่อน — ยังไม่ใช้ AI ในขั้นตอนนี้**

---

## ขั้นตอนที่ 3 — ใช้ AI Generate Tests เพิ่มเติม (30 นาที)

หลังเขียน tests ด้วยตัวเองแล้ว ให้ใช้ AI generate เพิ่ม:

```
Here is my [function/class]:
[วาง code]

Generate comprehensive unit tests for this. Include:
- Happy path
- Edge cases
- Error cases
Use pytest and AAA pattern.
```

จากนั้น **review ทุก test ที่ AI สร้าง** โดยถามตัวเองสำหรับแต่ละ test:
- [ ] Test นี้วัด business rule อะไร
- [ ] ถ้า comment out logic นี้ออก test จะ fail ไหม
- [ ] Test นี้ independent จาก test อื่นไหม

ลบ tests ที่ไม่ผ่านการ review ออก อย่า commit tests ที่ไม่เข้าใจ

---

## ขั้นตอนที่ 4 — Coverage Report (20 นาที)

```bash
# Python
pytest --cov=src tests/ --cov-report=html
open htmlcov/index.html

# JavaScript
npx jest --coverage
```

ดู report และระบุ:
- Code ส่วนไหนที่ยังไม่ได้ test
- Branch ไหนที่ยังไม่ได้เดิน
- เพิ่ม tests สำหรับ gaps ที่สำคัญ

---

## ขั้นตอนที่ 5 — Peer Review (15 นาที)

สลับ review tests กับอีกกลุ่มในทีม:
- เลือก 2 tests จาก suite ของเพื่อน
- บอกว่า test นั้น good หรือไม่ และทำไม
- ถ้าไม่ good — suggest วิธีปรับปรุง

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `tests/TEST_PLAN.md` | รายการ functions ที่ต้อง test พร้อม rationale | GitHub repo |
| Test files | Unit tests ที่รันผ่านทั้งหมด | GitHub repo |
| Coverage report | Screenshot หรือ HTML report | GitHub repo `docs/coverage/` |

### เกณฑ์ผ่าน
- Tests รันผ่านทั้งหมด (`pytest` หรือ `npm test` ไม่มี failure)
- Core business logic covered ≥ 80%
- ทุกคนในกลุ่มอธิบาย test ที่ตัวเองเขียนได้ว่ามันวัดอะไร
- มีทั้ง tests ที่เขียนเอง และ AI-generated พร้อม comment ว่า review แล้ว
