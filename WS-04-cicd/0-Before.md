# WS-04 · Before — CI/CD Loop

ตั้งแต่ WS-01 CI ของกลุ่มเป็นเพียงสัญญาณ สมาชิกยัง push เข้า `main` ได้โดยตรง และ merge PR ที่ CI เป็นสีแดงได้
สัปดาห์นี้แต่ละกลุ่มจะเปลี่ยนสัญญาณนั้นเป็นด่านที่ข้ามไม่ได้ เพิ่มการ review ด้วย AI ตามเกณฑ์ที่กลุ่มเขียนเอง
และพัฒนา feature `03-cancel` ผ่านด่านนั้นตั้งแต่ต้นจนขึ้นเว็บจริง

เนื้อหาในหน้านี้จะไม่มีการอธิบายซ้ำในชั้นเรียน
ช่วงต้นคาบจะมีการสุ่มถามความหมายของคำในส่วน A
เวลาที่ควรใช้เตรียมตัวทั้งหมดไม่เกิน 1.5 ชั่วโมง

---

## A. Keywords

| Keyword | ความหมายโดยย่อ |
|---|---|
| Continuous Integration (CI) | รวม code ของทุกคนเข้าด้วยกันบ่อย ๆ และให้เครื่องตรวจทุกครั้งที่รวม เช่น lint, test และ build |
| Continuous Deployment (CD) | เมื่อ code ผ่านการตรวจและเข้า `main` แล้ว ระบบนำขึ้นเว็บจริงโดยอัตโนมัติ |
| Ruleset (branch protection) | กฎของ GitHub ที่กำหนดว่าจะแก้ branch หนึ่งได้อย่างไร เช่น ต้องผ่าน PR ที่ได้รับอนุมัติเท่านั้น |
| Required status check | ผลการตรวจของ CI ที่ต้องผ่านก่อน GitHub จะยอมให้ merge |
| Code review | การให้ผู้อื่นตรวจการแก้ไขก่อน merge เพื่อหาสิ่งที่เครื่องตรวจไม่ได้ เช่น ตรงกับ spec หรือไม่ |
| Lead time | เวลาตั้งแต่เปิด PR จนการแก้ไขนั้นขึ้นเว็บจริง |
| Revert | การสร้าง commit ใหม่ที่ย้อนผลของ commit หรือ PR เดิม ใช้แก้เมื่อสิ่งที่ merge ไปแล้วมีปัญหา |

---

## B. เตรียมสิทธิ์และเครื่องมือ

| สิ่งที่ต้องมี | วิธีตรวจ | ผลที่ต้องได้ |
|---|---|---|
| เครื่องมือจาก WS-01 ถึง WS-03 | `npm test` และ `npm run build` ใน repository ของกลุ่ม | ผ่านทั้งคู่ |
| สิทธิ์ของสมาชิก | เจ้าของ repository เปิด Settings → Collaborators | สมาชิกทุกคนอยู่ในรายการ และตอบรับคำเชิญแล้ว |
| สิทธิ์ของเจ้าของ repository | เจ้าของ repository เปิด Settings → Rules → Rulesets | เปิดหน้าได้ และเห็นปุ่ม New ruleset |

ไม่มีเครื่องมือที่ต้องติดตั้งเพิ่มในบทนี้

---

## C. เตรียมใน repository

- [ ] CI ของกลุ่มบน `main` เป็นสีเขียว และ PR ของกฎ R1, R3, R4, R5 จาก WS-03 ถูก merge แล้ว
- [ ] สมาชิกแต่ละคนเปิด PR ที่ merge แล้วของกลุ่ม 1 รายการ แล้วจด 1 เรื่องที่ผู้อนุมัติควรพบแต่ไม่ได้พบ
  เช่น code ต่างจาก spec หรือ test ไม่มีค่าขอบ นำมาใช้ในขั้นตอนที่ 3 ของ lab
- [ ] เปิด AI agent ใน repository ของกลุ่มแล้วสั่งงานต่อไปนี้ โดยไม่ให้เกณฑ์ใด ๆ

  ```
  Review the changes in the last merged commit: git show HEAD --stat and git show HEAD.
  List the problems you find. Do not change any file.
  ```

  สิ่งที่ต้องจด (ไม่ต้อง commit)
  - จำนวนข้อที่ AI รายงาน และจำนวนข้อที่กลุ่มเห็นว่าสำคัญจริง
  - ข้อที่ AI รายงานแต่ขัดกับ spec หรือการตัดสินใจของกลุ่ม

หากตรวจสิทธิ์ไม่ผ่าน ให้แจ้งผู้สอนภายใน 5 นาทีแรกของคาบ

---

อ่านเพิ่มเติม (ไม่บังคับ)

- About rulesets (GitHub Docs): https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets
- Secure use reference — GitHub Actions (GitHub Docs): https://docs.github.com/en/actions/reference/security/secure-use
- The AI-native SDLC playbook (Anthropic) อ่านเฉพาะหัวข้อ Deploy: https://claude.com/resources/articles/the-ai-native-sdlc-playbook
