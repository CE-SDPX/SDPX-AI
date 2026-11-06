# WS-08 · Before — Quality Loop

หัวข้อที่ 8 ของ `PROJECT.md` กำหนดว่า project เสร็จเมื่อผู้เข้าร่วมดูหรือยกเลิกการลงทะเบียนของผู้อื่นไม่ได้ และผ่าน security checklist ทุกข้อ
สัปดาห์นี้แต่ละกลุ่มจะเขียน checklist นั้น พิสูจน์แต่ละข้อด้วย test เครื่องมือ หรือการตรวจที่บันทึกไว้
เขียน `SKILL.md` ให้ AI ทำ security review ตามขั้นตอนเดียวกันทุกครั้ง
และสรุปบทเรียนทั้งภาคการศึกษาลงใน `LESSONS.md` โดยผูกแต่ละบทเรียนกับสิ่งที่ป้องกันไม่ให้เกิดซ้ำ

เนื้อหาในหน้านี้จะไม่มีการอธิบายซ้ำในชั้นเรียน
ช่วงต้นคาบจะมีการสุ่มถามความหมายของคำในส่วน A
เวลาที่ควรใช้เตรียมตัวทั้งหมดไม่เกิน 1.5 ชั่วโมง

---

## A. Keywords

| Keyword | ความหมายโดยย่อ |
|---|---|
| Authentication และ Authorization | authentication คือการรู้ว่าผู้ใช้เป็นใคร authorization คือการตัดสินว่าผู้ใช้คนนั้นทำสิ่งที่ขอได้หรือไม่ |
| Broken access control (IDOR) | ผู้ใช้เข้าถึงข้อมูลของผู้อื่นได้เพียงเปลี่ยน id ในคำขอ เพราะ server ไม่ได้ตรวจว่าข้อมูลนั้นเป็นของใคร |
| OWASP Top 10 | รายการความเสี่ยงด้านความปลอดภัยของเว็บที่พบบ่อยที่สุด จัดทำโดย OWASP ฉบับล่าสุดคือปี 2025 |
| SAST | การวิเคราะห์ source code หาช่องโหว่โดยไม่ต้องรันระบบ เช่น CodeQL ของ GitHub |
| Dependency vulnerability | ช่องโหว่ที่อยู่ใน package ที่ project ใช้ ตรวจได้ด้วย `npm audit` หรือ Dependabot |
| Skill (`SKILL.md`) | ไฟล์ขั้นตอนการทำงานเรื่องหนึ่งที่ AI agent โหลดมาใช้เมื่องานตรงกับคำอธิบายของ skill |
| Lesson learned (`LESSONS.md`) | บันทึกสิ่งที่ผิดพลาด สาเหตุ และสิ่งที่เพิ่มเพื่อไม่ให้เกิดซ้ำ |

---

## B. ตรวจสิทธิ์และเครื่องมือ

| สิ่งที่ต้องมี | วิธีตรวจ | ผลที่ต้องได้ |
|---|---|---|
| ระบบจาก WS-07 | `docker compose up -d --build --wait` แล้ว `npm run e2e` | E2E test ผ่าน |
| `npm audit` | `npm audit --omit=dev` ใน repository ของกลุ่ม | แสดงผลการตรวจ ไม่ว่าจะพบช่องโหว่หรือไม่ |
| สิทธิ์ของเจ้าของ repository | เจ้าของ repository เปิด Settings → Advanced Security | เห็นส่วน CodeQL analysis และ Dependabot alerts |

ไม่มีเครื่องมือที่ต้องติดตั้งเพิ่มในบทนี้

---

## C. เตรียมใน repository

- [ ] CI ของกลุ่มบน `main` เป็นสีเขียวทั้ง `build` และ `e2e` และ PR ทั้งหมดของ WS-07 ถูก merge แล้ว
- [ ] สมาชิกแต่ละคนลองโจมตีระบบของกลุ่มบน `docker compose up` อย่างน้อย 2 แบบด้วย `curl` แล้วจดคำสั่งและผล เช่น
  - เข้าสู่ระบบเป็นผู้เข้าร่วม แล้วเรียก endpoint ที่ควรเป็นของผู้จัด
  - เข้าสู่ระบบเป็นผู้จัดคนหนึ่ง แล้วดูรายชื่อผู้ลงทะเบียนของกิจกรรมที่ผู้จัดคนอื่นสร้าง
  - เปลี่ยนค่า cookie ของ session เอง หรือใช้ cookie เดิมหลังออกจากระบบ
  - ส่ง body ที่ผิดรูปแบบ แล้วดูว่า error ที่ได้มีข้อความภายในของระบบหรือไม่
- [ ] สมาชิกแต่ละคนอ่าน `evidence/ws-01.md` ถึง `evidence/ws-07.md` แล้วจดอย่างน้อย 2 เรื่องที่ผิดพลาดหรือเกือบผิดพลาด
  เช่น AI ฝ่าฝืนกติกา test ที่ควรจับได้แต่ไม่จับ หรือการตัดสินใจที่ต้องเปลี่ยนภายหลัง พร้อมว่าตอนนี้มีอะไรป้องกันเรื่องนั้นหรือไม่

สิ่งที่จดไม่ต้อง commit นำมาใช้ในขั้นตอนที่ 2 และ 6 ของ lab

---

อ่านเพิ่มเติม (ไม่บังคับ)

- OWASP Top 10:2025: https://owasp.org/Top10/2025/
- OWASP Authorization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- GitHub — Configuring default setup for code scanning: https://docs.github.com/en/code-security/code-scanning/enabling-code-scanning/configuring-default-setup-for-code-scanning
- Agent Skills — Specification: https://agentskills.io/specification
- The AI-native SDLC playbook (Anthropic) อ่านเฉพาะส่วนที่พูดถึง skill และการบันทึกเมื่อ AI ผิดซ้ำ: https://claude.com/resources/articles/the-ai-native-sdlc-playbook
