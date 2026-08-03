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

## เช็คตัวเองก่อนเข้าห้อง

- [ ] อธิบาย Red → Green → Refactor ได้
- [ ] แยก Arrange / Act / Assert ในโค้ด test ที่เห็นได้
- [ ] บอกความต่างของ Mock / Stub / Fake ได้
- [ ] ตอบได้ว่าทำไม coverage 100% ถึงยังไม่แปลว่าปลอดภัย

### วอร์มอัพ: ลองเขียน 1 test ในหัว
เลือก business rule 1 ข้อจาก `unit-brief.md` ของกลุ่ม แล้วลองร่าง test case
ที่จะ **แดง** ถ้าใครลบกฎข้อนั้นออกจาก code (pseudocode ก็ได้)

แล้วถามตัวเองว่า *"test นี้จะแดงตอนไหน"* — ถ้าตอบไม่ได้ แปลว่ายังไม่ใช่ test ที่ดี
คำถามนี้จะถูกใช้ซ้ำตลอดทั้ง lab และตอน present
