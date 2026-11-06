# WS-05 · Before — Environment Loop

ตั้งแต่ WS-03 ข้อมูลของระบบเก็บตามที่กลุ่มเลือกใน ADR-001 กลุ่มส่วนใหญ่เก็บในหน่วยความจำ
ข้อมูลจึงหายเมื่อ server เริ่มใหม่ และบนเว็บจริงแต่ละคำขออาจเห็นข้อมูลไม่ตรงกัน
สัปดาห์นี้แต่ละกลุ่มจะย้ายไปใช้ PostgreSQL ทั้งในเครื่อง ใน CI และบนเว็บจริง
ทำให้ทั้งระบบรันได้ด้วย `docker compose up` คำสั่งเดียว
และเปลี่ยนกติกาใน `AGENTS.md` บางข้อให้เป็น guard ที่ AI agent ฝ่าฝืนไม่ได้

เนื้อหาในหน้านี้จะไม่มีการอธิบายซ้ำในชั้นเรียน
ช่วงต้นคาบจะมีการสุ่มถามความหมายของคำในส่วน A

---

## A. Keywords

| Keyword | ความหมายโดยย่อ |
|---|---|
| Image | ชุดไฟล์ที่บรรจุโปรแกรมพร้อมทุกอย่างที่ต้องใช้ในการรัน เช่น Node.js และ library สร้างจาก `Dockerfile` |
| Container | โปรแกรมที่กำลังรันจาก image แยกจากเครื่องที่รันอยู่ ลบแล้วสร้างใหม่จาก image เดิมได้ผลเหมือนเดิม |
| Volume | พื้นที่เก็บข้อมูลที่อยู่นอก container ข้อมูลจึงไม่หายเมื่อลบ container เช่น ข้อมูลของ PostgreSQL |
| Docker Compose | การกำหนดหลาย container ที่ทำงานร่วมกันไว้ในไฟล์ `compose.yaml` แล้วเปิดทั้งหมดด้วย `docker compose up` |
| Environment parity | ทำให้เครื่องของสมาชิก CI และเว็บจริงใช้สิ่งแวดล้อมใกล้เคียงกันที่สุด เช่น ฐานข้อมูลชนิดและรุ่นเดียวกัน |
| Integration test | test ที่ตรวจ code ร่วมกับระบบจริงภายนอก เช่น ตรวจว่า query กับ PostgreSQL จริงคืนข้อมูลถูกต้อง |
| Guard (hook) | script ที่ทำงานอัตโนมัติก่อน AI agent รันคำสั่ง หรือก่อน merge แล้วขวางสิ่งที่ห้ามทำ โดยไม่ขึ้นกับว่า agent จะทำตามกติกาหรือไม่ |

---

## B. ติดตั้งและตรวจเครื่องมือ

| สิ่งที่ต้องมี | วิธีตรวจ | ผลที่ต้องได้ |
|---|---|---|
| Docker Desktop | `docker --version` และ `docker compose version` | แสดงหมายเลขรุ่นทั้งคู่ |
| Docker ทำงานอยู่ | `docker run --rm hello-world` | มีข้อความ `Hello from Docker!` |
| image ที่จะใช้ในคาบ | `docker pull postgres:17` และ `docker pull node:22-alpine` | ดาวน์โหลดเสร็จทั้งคู่ |
| เครื่องมือจาก WS-01 ถึง WS-04 | `npm test` และ `npm run build` ใน repository ของกลุ่ม | ผ่านทั้งคู่ |

ติดตั้ง Docker Desktop จาก https://docs.docker.com/get-started/get-docker/
ผู้ใช้ Windows ต้องเปิดใช้ WSL 2 ตามขั้นตอนในหน้าติดตั้ง
เตรียมพื้นที่ว่างในเครื่องอย่างน้อย 5 GB และดาวน์โหลด image ไว้ก่อนเข้าคาบ เพราะเครือข่ายในห้องอาจช้า

---

## C. เตรียมใน repository

- [ ] CI ของกลุ่มบน `main` เป็นสีเขียว และ PR ของ `03-cancel` จาก WS-04 ถูก merge แล้ว
- [ ] สมาชิกแต่ละคน clone repository ของกลุ่มลงในโฟลเดอร์ใหม่ แล้วจับเวลาจนเปิด `http://localhost:3000/api/events` ได้
  จดเวลาที่ใช้ และทุกสิ่งที่ต้องทำหรือต้องถามเพื่อน เช่น ต้องเปลี่ยนรุ่นของ Node.js หรือต้องตั้งค่าบางอย่างเอง
- [ ] เปิด `[Live URL]/api/events` ลงทะเบียนผ่าน `curl` ตามขั้นตอนที่ 5 ของ lab WS-03 แล้วเปิดรายการกิจกรรมซ้ำ 5 ครั้ง
  จดว่าจำนวนที่นั่งคงเหลือตรงกันทุกครั้งหรือไม่
- [ ] ทั้งกลุ่มรวบรวมกติกาใน `AGENTS.md` ที่ AI agent เคยฝ่าฝืนอย่างน้อย 1 ครั้งตั้งแต่ WS-01
  เช่น แก้ไฟล์ test หรือแก้ไฟล์ใน `docs/adr/` นำมาใช้ในขั้นตอนที่ 5 ของ lab

สิ่งที่จดไม่ต้อง commit นำมาใช้ในขั้นตอนที่ 6 และ 7 ของ lab

หากติดตั้ง Docker ไม่สำเร็จ ให้แจ้งผู้สอนก่อนเข้าคาบ
lab ทั้งบทต้องใช้ Docker และควรมีสมาชิกอย่างน้อย 2 คนที่รัน Docker ได้

---

อ่านเพิ่มเติม (ไม่บังคับ)

- What is Docker? (Docker Docs): https://docs.docker.com/get-started/docker-overview/
- Docker Compose — How Compose works (Docker Docs): https://docs.docker.com/compose/intro/compose-application-model/
- Next.js — output: standalone: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
- Hooks reference (Claude Code Docs) หรือเอกสารเรื่อง hook ของ AI agent ที่กลุ่มใช้: https://code.claude.com/docs/en/hooks
- The AI-native SDLC playbook (Anthropic) อ่านเฉพาะหัวข้อ Build ส่วนที่พูดถึง hook: https://claude.com/resources/articles/the-ai-native-sdlc-playbook
