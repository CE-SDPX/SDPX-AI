# Self-Learning: เตรียมก่อนเรียน Unit Testing

## สิ่งที่ต้องศึกษา

### TDD & Unit Testing
- [video] Test Driven Development — What? Why? And How? — Modern Software Engineering
  (https://www.youtube.com/watch?v=llaUBH5oayw)
- [video] CS50P Lecture 5 — Unit Tests (ดูช่วง unittest/pytest ก็พอ)
  (https://www.youtube.com/watch?v=tIrcxwLqzjQ)
- [reading] Getting Started with pytest (https://docs.pytest.org/en/stable/getting-started.html)
- [reading] Write Tests, Not Too Many — Kent C. Dodds (https://kentcdodds.com/blog/write-tests)
- [reading] The Practical Test Pyramid — Martin Fowler
  (https://martinfowler.com/articles/practical-test-pyramid.html)
  อ่านเฉพาะหัวข้อ *The Test Pyramid* และ *Unit Tests*

**จุดที่ต้องเข้าใจ:**
- TDD cycle: Red → Green → Refactor
- Arrange / Act / Assert (AAA) pattern
- Unit test vs Integration test ต่างกันอย่างไร
- Test coverage คืออะไร และข้อจำกัดของมัน (coverage สูงไม่ได้แปลว่า test ดี)

### Test Doubles (อ่านก่อนเพื่อเตรียม lab)
- [reading] Test Double — Martin Fowler (https://martinfowler.com/bliki/TestDouble.html)

**จุดที่ต้องเข้าใจ:**
- Mock vs Stub vs Fake vs Spy ต่างกันอย่างไร
- ใช้ test doubles เพื่ออะไร และ over-mocking เสียหายอย่างไร

### ทำไม Test สำคัญเป็นพิเศษเมื่อมี AI เขียน code
- [reading] Claude Code Best Practices (https://code.claude.com/docs/en/best-practices)
  อ่านหัวข้อที่พูดถึง *tests* และ *verification* — หลักการใช้ได้กับ agent ทุกยี่ห้อ

**จุดที่ต้องเข้าใจ:**
- ทำไม agent ที่รัน test เองได้ ถึงให้ผลดีกว่า agent ที่รันไม่ได้
- ทำไม test ที่ "ผ่านง่ายเกินไป" ทำให้ AI agent เดินหลงทางแบบมั่นใจ

---

## Entry Ticket
ส่งก่อนเข้าห้องอย่างน้อย 1 ชั่วโมง:

> "เลือก business rule 1 ข้อจาก `unit-brief.md` ของกลุ่ม แล้วเขียน 1 test case
> ที่จะ **แดง** ถ้าใครลบกฎข้อนั้นออกจาก code — pseudocode ก็ได้"
>
> พร้อมตอบ 1 บรรทัด: "test นี้จะแดงตอนไหน"
