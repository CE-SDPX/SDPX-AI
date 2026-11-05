# WS-03 · Before — Unit Test Loop

สัปดาห์นี้แต่ละกลุ่มจะเริ่มเขียน code ของ feature `01-events` และ `02-register`
โดยเขียน test ของกฎแต่ละข้อก่อน แล้วจึงให้ AI เขียน code จนกว่า test จะผ่าน
เป้าหมายคือมีสิ่งที่บอกได้ทันทีเมื่อ code ไม่ได้ทำตามกฎใน spec ไม่ว่าคนหรือ AI จะเป็นผู้แก้ code นั้น

เนื้อหาในหน้านี้จะไม่มีการอธิบายซ้ำในชั้นเรียน
ช่วงต้นคาบจะมีการสุ่มถามความหมายของคำในส่วน A
เวลาที่ควรใช้เตรียมตัวทั้งหมดไม่เกิน 1.5 ชั่วโมง

---

## A. Keywords

| Keyword | ความหมายโดยย่อ |
|---|---|
| Unit test | test ที่ตรวจ code ส่วนเล็ก ๆ เช่น function 1 ตัว โดยไม่ใช้ฐานข้อมูล network หรือเวลาจริง จึงรันได้เร็วและได้ผลเดิมทุกครั้ง |
| Assertion | บรรทัดใน test ที่เทียบผลจริงกับผลที่คาดไว้ เช่น `expect(result.status).toBe("WAITLISTED")` |
| Red → Green → Refactor | ลำดับการเขียน test ก่อน code: เขียน test ที่ยังไม่ผ่าน (red) เขียน code ให้ผ่าน (green) แล้วจัด code ให้อ่านง่ายโดยที่ test ยังผ่าน (refactor) |
| Arrange / Act / Assert | โครงของ test 1 ข้อ: เตรียมข้อมูล เรียก function ที่ต้องการตรวจ แล้วเทียบผล |
| Boundary value (ค่าขอบ) | ค่าที่อยู่ตรงขอบของกฎ เช่น ที่นั่งเหลือ 1 ที่ ที่นั่งเต็มพอดี หรือเวลาเท่ากับเวลาเริ่มกิจกรรมพอดี |
| Test double | สิ่งที่ใช้แทนของจริงระหว่าง test เช่น ที่เก็บข้อมูลในหน่วยความจำแทนฐานข้อมูลจริง |
| Plan (`plan.md`) | เอกสารที่ระบุว่าจะแก้ไฟล์ใด ทำตามลำดับใด และ test ใดจะยืนยันว่างานเสร็จ เขียนก่อนลงมือแก้ code |

---

## B. ติดตั้งและทดสอบ

| เครื่องมือ | คำสั่งทดสอบ | ผลที่ต้องได้ |
|---|---|---|
| เครื่องมือจาก WS-01 และ WS-02 | `npm run build` ใน repository ของกลุ่ม | build ผ่าน |
| Node.js | `node -v` | `v22` ขึ้นไป |
| Vitest (ไม่ต้องติดตั้งตอนนี้ จะติดตั้งลง project ใน lab) | `npx --yes vitest@5 --version` | แสดงเลขรุ่นที่ขึ้นต้นด้วย `vitest/5` |

---

## C. เตรียมใน repository

- [ ] CI ของกลุ่มบน `main` เป็นสีเขียว และ `spec.md` ของ `01-events` กับ `02-register` ถูก merge แล้ว
- [ ] ในกลุ่มแบ่งกฎ R1, R3, R4 และ R5 ให้สมาชิกรับผิดชอบคนละอย่างน้อย 1 ข้อ
  (กลุ่มที่มีสมาชิกน้อยกว่า 4 คน ให้บางคนรับ 2 ข้อ)
- [ ] สมาชิกแต่ละคนเขียนกรณีทดสอบของกฎที่ตนรับผิดชอบ **ด้วยมือ ไม่ใช้ AI** อย่างน้อย 3 กรณี
  โดยดูจาก `spec.md` และตารางการตัดสินใจ อย่างน้อย 1 กรณีต้องเป็นค่าขอบ แล้วนำมาใช้ในขั้นตอนที่ 4 ของ lab

  | กรณี | ข้อมูลตั้งต้น | การกระทำ | ผลที่คาดไว้ |
  |---|---|---|---|
  | ที่นั่งเต็มพอดี | capacity 2 มี CONFIRMED 2 คน | ผู้ใช้คนที่ 3 ลงทะเบียน | ได้สถานะ `WAITLISTED` |
  | | | | |

  ไม่ต้อง commit ตารางนี้

- [ ] เปิด AI agent ใน repository ของกลุ่มแล้วสั่งงานต่อไปนี้ โดยแทน `[รหัสกฎ]` ด้วยกฎที่ตนรับผิดชอบ

  ```
  Read docs/features/02-register/spec.md. List the test cases you would write
  for rule [รหัสกฎ], including boundary values. Do not write any code.
  ```

  เทียบกับตารางของตนเอง แล้วจดกรณีที่ AI เสนอแต่ขัดกับ spec หรือตารางการตัดสินใจ (ไม่ต้อง commit)

หากติดตั้งไม่สำเร็จ ให้บันทึกข้อความ error ไว้ และแจ้งผู้สอนภายใน 5 นาทีแรกของคาบ

---

อ่านเพิ่มเติม (ไม่บังคับ)

- Vitest — Getting Started: https://vitest.dev/guide/
- Test Double (Martin Fowler): https://martinfowler.com/bliki/TestDouble.html
- The Practical Test Pyramid (Martin Fowler) อ่านเฉพาะหัวข้อ Unit Tests: https://martinfowler.com/articles/practical-test-pyramid.html
- The AI-native SDLC playbook (Anthropic) อ่านเฉพาะหัวข้อ Build และ Test: https://claude.com/resources/articles/the-ai-native-sdlc-playbook
