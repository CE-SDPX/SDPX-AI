# Self-Learning: เตรียมก่อนเรียน Unit Testing

## วิธีใช้เอกสารนี้
ศึกษาสิ่งเหล่านี้ก่อนเข้าห้อง อาจารย์จะไม่สอนซ้ำ แต่จะตอบเฉพาะจุดที่สงสัยจาก entry ticket

---

## สิ่งที่ต้องศึกษา

### 1. Test-Driven Development (TDD)
- [video] Test-Driven Development — the TDD Manifesto
  (https://www.youtube.com/watch?v=llaUBH5oayw)
- [video] Unit Testing Best Practices — Continuous Delivery
  (https://www.youtube.com/watch?v=rhSyX7JyhEo)

**จุดที่ต้องเข้าใจ:**
- TDD cycle คืออะไร: Red → Green → Refactor
- ทำไมต้องเขียน test ก่อน code
- Unit test vs Integration test ต่างกันอย่างไร

### 2. pytest หรือ Jest Documentation
เลือกตาม stack ที่กลุ่มใช้:

- [reading] Getting Started with pytest
  (https://docs.pytest.org/en/stable/getting-started.html)
- [reading] Write Tests, Not Too Many — Kent C. Dodds
  (https://kentcdodds.com/blog/write-tests)

**จุดที่ต้องเข้าใจ:**
- Arrange / Act / Assert pattern คืออะไร
- วิธีดู test coverage report
- Test ที่ดีมีลักษณะอย่างไร (FIRST: Fast, Independent, Repeatable, Self-validating, Timely)

---

## Entry Ticket
ส่งก่อนเข้าห้องอย่างน้อย 1 ชั่วโมง:

> "เขียน 1 test case สำหรับ feature ที่วางแผนจะทำ — pseudocode ก็ได้"

อาจารย์จะนำ test cases เหล่านี้มา review ร่วมกันในห้องว่าเป็น good test หรือไม่

---

## ไม่จำเป็นต้องศึกษาเพิ่มเติม
สิ่งต่อไปนี้จะทำใน lab:
- การเขียน test สำหรับ project จริง
- การใช้ AI generate tests
- การ review AI-generated tests
- Mutation testing
