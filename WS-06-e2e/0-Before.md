# WS-06 · Before — E2E Loop

ตั้งแต่ WS-03 ทุกกฎมี unit test และตั้งแต่ WS-05 ชั้น data มี integration test กับ PostgreSQL
แต่ยังไม่มี test ใดยืนยันว่าผู้ใช้จริงทำงานตั้งแต่ต้นจนจบได้ผ่านหน้าจอ
และ server ยังเชื่อ user id จาก header `x-user-id` ซึ่งใครก็ส่งได้
สัปดาห์นี้แต่ละกลุ่มจะทำ feature `04-access` ให้ server รู้จักผู้ใช้จาก session
ทำหน้าจอครบ 5 หน้า เขียน E2E test ของ journey หลักให้ CI รันทุก PR
และเขียน `.agents/verifier.md` ให้ AI ตรวจผลงานในสภาพที่ไม่รู้ว่า code ถูกเขียนมาอย่างไร

เนื้อหาในหน้านี้จะไม่มีการอธิบายซ้ำในชั้นเรียน
ช่วงต้นคาบจะมีการสุ่มถามความหมายของคำในส่วน A

---

## A. Keywords

| Keyword | ความหมายโดยย่อ |
|---|---|
| E2E test (end-to-end) | test ที่เปิดระบบจริงทั้งระบบ แล้วทำงานผ่านหน้าจอแบบที่ผู้ใช้ทำ ตั้งแต่ browser จนถึงฐานข้อมูล |
| User journey | ลำดับการกระทำของผู้ใช้เพื่อให้ได้สิ่งที่ต้องการ 1 เรื่อง เช่น ลงทะเบียนจนเต็ม → เข้าคิวสำรอง → มีผู้ยกเลิก → ได้ที่นั่ง |
| Session | สิ่งที่ server สร้างหลังผู้ใช้เข้าสู่ระบบ แล้วใช้จำว่าคำขอต่อ ๆ มาเป็นของผู้ใช้คนใด |
| Cookie | ข้อมูลสั้น ๆ ที่ server ให้ browser เก็บไว้ และ browser ส่งกลับมากับทุกคำขอ ใช้เก็บรหัสของ session |
| Locator | วิธีที่ test ระบุส่วนของหน้าจอ เช่น "ปุ่มที่ชื่อว่า ลงทะเบียน" แทนการอ้างถึงโครงสร้างของ HTML |
| Flaky test | test ที่บางครั้งผ่านบางครั้งไม่ผ่าน ทั้งที่ code ไม่ได้เปลี่ยน |
| Verifier | AI ที่เปิดในบทสนทนาใหม่เพื่อรันระบบและตรวจว่างานทำได้ตาม spec จริง โดยไม่รู้ว่า code ถูกเขียนมาอย่างไร |

---

## B. ติดตั้งและตรวจเครื่องมือ

| สิ่งที่ต้องมี | วิธีตรวจ | ผลที่ต้องได้ |
|---|---|---|
| Playwright | `npx --yes playwright@1.64 --version` | `Version 1.64.x` |
| browser สำหรับ Playwright | `npx --yes playwright@1.64 install chromium` | ดาวน์โหลดเสร็จ ประมาณ 100 MB |
| ระบบจาก WS-05 | `docker compose up -d --build` ใน repository ของกลุ่ม แล้วเปิด `http://localhost:3000/api/events` | ได้รายการกิจกรรม |

ผู้ใช้ Linux ใช้ `npx --yes playwright@1.64 install --with-deps chromium` เพื่อติดตั้ง library ของระบบที่ browser ต้องใช้

---

## C. เตรียมใน repository

- [ ] CI ของกลุ่มบน `main` เป็นสีเขียว และ PR ทั้งหมดของ WS-05 ถูก merge แล้ว
- [ ] ทั้งกลุ่มเขียนตาราง journey หลักของระบบ ทีละการกระทำ ตามตัวอย่างนี้ (ไม่ต้อง commit นำมาใช้ในขั้นตอนที่ 3 ของ lab)

  | ลำดับ | ผู้ใช้ | การกระทำ | สิ่งที่ต้องเห็นบนหน้าจอ |
  |---|---|---|---|
  | 1 | Alice | เข้าสู่ระบบ แล้วเปิดกิจกรรมที่มี 1 ที่นั่ง | ปุ่มลงทะเบียน |
  | 2 | Alice | กดลงทะเบียน | สถานะ `CONFIRMED` |
  | ... | | | |

  journey ต้องครอบคลุม ลงทะเบียนจนเต็ม → ผู้ใช้อีกคนเข้าคิวสำรองพร้อมลำดับ → ผู้ได้ที่นั่งยกเลิก → ผู้อยู่ในคิวสำรองได้ที่นั่ง

- [ ] สมาชิก 1 คนทำ journey นี้ผ่าน API ด้วย `curl` และ header `x-user-id` บน `docker compose up` แล้วจับเวลา
  จดว่าใช้เวลาเท่าไร และต้องพิมพ์คำสั่งกี่ครั้ง
- [ ] สมาชิกอีกคนลองส่งคำขอยกเลิกของผู้ใช้คนอื่นด้วย `curl` และ header `x-user-id` ของคนนั้น แล้วจดผล

หากติดตั้ง Playwright ไม่สำเร็จ ให้แจ้งผู้สอนก่อนเข้าคาบ

---

อ่านเพิ่มเติม (ไม่บังคับ)

- Playwright — Writing tests: https://playwright.dev/docs/writing-tests
- Playwright — Locators: https://playwright.dev/docs/locators
- MDN — Using HTTP cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
- Next.js — cookies: https://nextjs.org/docs/app/api-reference/functions/cookies
- The AI-native SDLC playbook (Anthropic) อ่านเฉพาะหัวข้อ Build ส่วน verifier และหัวข้อ Test: https://claude.com/resources/articles/the-ai-native-sdlc-playbook
