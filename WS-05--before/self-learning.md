# Self-Learning: เตรียมก่อนเรียน Docker

## สิ่งที่ต้องศึกษา

### Docker
- [video] Docker Crash Course for Absolute Beginners — TechWorld with Nana
  (https://www.youtube.com/watch?v=pg19Z8LL06w)
- [reading] Dockerfile / Build Best Practices
  (https://docs.docker.com/build/building/best-practices/)
- [reading] Docker Compose — Getting Started
  (https://docs.docker.com/compose/gettingstarted/)
- [reading] The Twelve-Factor App — อ่านเฉพาะข้อ III (Config) และ X (Dev/prod parity)
  (https://12factor.net/)

**จุดที่ต้องเข้าใจ:**
- Image vs Container ต่างกันอย่างไร
- Layer คืออะไร caching ทำงานอย่างไร
- ทำไม COPY manifest ก่อนแล้วค่อย COPY source ถึงสำคัญ
- Compose ช่วยอะไรเมื่อมีหลาย services
- ทำไม config ต้องมาจาก environment variable ไม่ใช่ hardcode ในไฟล์

**หมายเหตุเรื่องคำสั่ง:** ใช้ `docker compose` (เว้นวรรค — Compose v2)
คำสั่ง `docker-compose` แบบมีขีดคือ v1 ที่หมดอายุการสนับสนุนแล้ว
และไฟล์ยุคใหม่ชื่อ `compose.yaml` โดยไม่ต้องมีบรรทัด `version:` อีกต่อไป

---

## เช็คตัวเองก่อนเข้าห้อง

- [ ] อธิบายความต่างของ image กับ container ได้
- [ ] บอกได้ว่าทำไม `COPY package.json` ต้องมาก่อน `COPY . .`
- [ ] บอกได้ว่า `npm ci` ต่างจาก `npm install` อย่างไร
- [ ] รู้ว่าต้องใช้คำสั่ง `docker compose` (เว้นวรรค) ไม่ใช่ `docker-compose`
- [ ] จดไว้แล้วว่า Dockerfile instruction ไหนที่ยังไม่เข้าใจ — เอาไปถามในห้องได้

### วอร์มอัพ: นับขั้นตอน Setup ของกลุ่มตัวเอง
ลองนับดูว่า ตอนนี้ถ้าเพื่อนใหม่มา clone repo ของกลุ่ม
**ต้องทำกี่ขั้นตอนกว่าจะรัน app ได้** และใช้เวลารวมประมาณเท่าไร

จดตัวเลขไว้ — lab สัปดาห์นี้จะลดมันให้เหลือ **1 คำสั่ง** และเราจะเทียบกันตอนท้าย
