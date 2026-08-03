# Self-Learning: เตรียมก่อนเรียน CI/CD

## สิ่งที่ต้องศึกษา

- [video] GitHub Actions for Beginners (https://www.youtube.com/watch?v=hoN9r86D72U)
- [reading] GitHub Actions Quickstart
  (https://docs.github.com/en/actions/get-started/quickstart)
- [reading] Using Secrets in GitHub Actions
  (https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- [reading] DORA — Software Delivery Metrics (https://dora.dev/)
  อ่านเฉพาะ 4 ตัวชี้วัด: deployment frequency, lead time for changes,
  change failure rate, failed deployment recovery time

**จุดที่ต้องเข้าใจ:**
- Workflow, Job, Step ต่างกันอย่างไร
- Trigger (`on: push`, `pull_request`) คืออะไร
- Secrets ใช้อย่างไร ทำไมถึงต้องใช้แทน hardcode
- `permissions:` ใน workflow ทำอะไร และทำไมควรตั้งให้น้อยที่สุด
- 4 ตัวชี้วัดของ DORA วัดอะไร และมันเกี่ยวกับ "loop" อย่างไร

---

## เช็คตัวเองก่อนเข้าห้อง

- [ ] อธิบายความต่างของ Workflow / Job / Step ได้
- [ ] บอกได้ว่า `on: push` ต่างจาก `on: pull_request` อย่างไร
- [ ] รู้ว่า secret เก็บที่ไหน และทำไมห้าม hardcode
- [ ] บอกชื่อ 4 ตัวชี้วัดของ DORA ได้

### วอร์มอัพ: ประมาณตัวเลขของกลุ่มตัวเอง
ลองประมาณ 2 ตัวเลขนี้ของกลุ่มในตอนนี้ (เดาได้ ไม่ต้องแม่น):

- ตั้งแต่ commit จนถึงขึ้น staging ใช้เวลาเท่าไร — **lead time**
- อาทิตย์ที่ผ่านมา deploy ไปกี่ครั้ง — **deployment frequency**

จดไว้ แล้วเทียบอีกครั้งหลัง lab
