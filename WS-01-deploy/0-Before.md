# WS-01 · Before — Deploy Loop

สัปดาห์นี้แต่ละกลุ่มจะเริ่ม project และนำขึ้นเว็บจริงเป็นครั้งแรก
เป้าหมายคือทำให้การแก้ code หนึ่งครั้งไปปรากฏบน URL จริงได้โดยอัตโนมัติ
และวัดได้ว่าใช้เวลาเท่าใด

เนื้อหาในหน้านี้จะไม่มีการอธิบายซ้ำในชั้นเรียน
ช่วงต้นคาบจะมีการสุ่มถามความหมายของคำในส่วน A
เวลาที่ควรใช้เตรียมตัวทั้งหมดไม่เกิน 1.5 ชั่วโมง

---

## A. Keywords

| Keyword | ความหมายโดยย่อ |
|---|---|
| Pull Request (PR) | การขอรวม code จาก branch ของตนเข้าสู่ `main` โดยให้สมาชิกคนอื่นตรวจก่อน |
| Trunk-based development | แนวทางที่ทุกคนรวม code เข้า `main` บ่อยครั้งและทีละน้อย แทนการแยก branch ไว้เป็นเวลานาน |
| AI coding agent | AI ที่สามารถแก้ไฟล์และรันคำสั่งได้เอง แล้วนำผลลัพธ์กลับมาใช้แก้ไขต่อ ต่างจาก AI ที่ตอบเป็นข้อความเพียงอย่างเดียว |
| `AGENTS.md` | ไฟล์ที่ root ของ repository ใช้บอก AI agent ว่าโปรเจคนี้ใช้คำสั่งใด และมีข้อห้ามอะไรบ้าง |
| `.env` | ไฟล์สำหรับเก็บค่าที่เป็นความลับ เช่น API key ซึ่งต้องไม่ถูก commit เข้า git |
| Continuous Deployment | กระบวนการที่เมื่อ push code แล้ว ระบบจะ build และนำขึ้นเว็บจริงให้โดยอัตโนมัติ |
| Artifact chain | การที่แต่ละขั้นของการพัฒนาจบด้วยไฟล์ที่ commit เข้า repository เช่น `intent.md` `spec.md` `plan.md` และขั้นถัดไปเริ่มจากการอ่านไฟล์นั้น |

---

## B. ติดตั้งและทดสอบ

| เครื่องมือ | คำสั่งทดสอบ | ผลที่ต้องได้ |
|---|---|---|
| Node.js | `node --version` | v22 ขึ้นไป |
| Python | `python --version` | 3.12 ขึ้นไป |
| Docker Desktop | `docker --version` | 27 ขึ้นไป |
| Docker Compose | `docker compose version` | v2 (ใช้คำสั่งแบบเว้นวรรค ไม่ใช่ `docker-compose`) |
| Git | `git --version` | 2.40 ขึ้นไป |
| VS Code | เปิดโฟลเดอร์และแก้ไฟล์ได้ | ติดตั้ง extension: GitLens และ Prettier (JS/TS) หรือ Ruff (Python) |
| AI coding agent อย่างน้อย 1 ตัว | สั่งให้ agent รัน `git status` | agent รันคำสั่งได้เองและรายงานผลกลับมา |
| บัญชี GitHub | push repository ทดลองขึ้น GitHub | repository ปรากฏบนหน้า GitHub ของตน |
| บัญชี Vercel | เข้าสู่ระบบด้วยบัญชี GitHub | เห็นหน้า dashboard ของ Vercel |

AI coding agent ที่ใช้ได้ เช่น Claude Code, Gemini CLI, Codex CLI หรือ GitHub Copilot ในโหมด agent
ข้อสำคัญคือต้องรันคำสั่งในเครื่องได้เอง เนื่องจากตลอดวิชาจะให้ agent รัน test และอ่านผลด้วยตนเอง

หาก `docker compose version` ใช้ไม่ได้ แต่ `docker-compose --version` ใช้ได้
แสดงว่ายังเป็น Compose v1 ซึ่งเลิกใช้แล้ว ให้ปรับปรุง Docker Desktop เป็นรุ่นล่าสุด

---

## C. เตรียมใน repository

- [ ] repository ทดลองบน GitHub ที่มี commit แรกแล้ว และมี `.gitignore` ที่ระบุ `.env`
- [ ] ใน repository เดียวกัน ให้ AI agent ทำงานต่อไปนี้ แล้วบันทึกผลใน `LOOP_NOTES.md`

  ```
  Create a Python file fizzbuzz.py with a function fizzbuzz(n),
  and a pytest file test_fizzbuzz.py that tests it.
  Then run pytest and fix the code until all tests pass.
  ```

  สิ่งที่ต้องบันทึก
  - agent รัน test ทั้งหมดกี่รอบจึงผ่าน
  - หากไม่มี test ให้ agent รัน ผลลัพธ์น่าจะแตกต่างไปอย่างไร

- [ ] เตรียมคำตอบของคำถาม "ครั้งล่าสุดที่เขียน code ผิด ใช้เวลานานเท่าใดกว่าจะรู้ว่าผิด"

หากติดตั้งไม่สำเร็จ ให้บันทึกข้อความ error ไว้ และแจ้งผู้สอนภายใน 5 นาทีแรกของคาบ

---

อ่านเพิ่มเติม (ไม่บังคับ)

- Git Book — Getting Started: https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control
- AGENTS.md: https://agents.md/
- The AI-native SDLC playbook (Anthropic) อ่านเฉพาะส่วนนำและหัวข้อ Plan: https://claude.com/resources/articles/the-ai-native-sdlc-playbook
