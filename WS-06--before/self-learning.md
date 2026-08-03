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

## Entry Ticket
> "จากประสบการณ์ที่ผ่านมา ถ้าไม่มี CI/CD ใน project นี้จะเกิดปัญหาอะไรได้บ้าง"
>
> พร้อมประมาณ 2 ตัวเลขของกลุ่มตัวเองในตอนนี้:
> - ตั้งแต่ commit จนถึงขึ้น staging ใช้เวลาเท่าไร (lead time)
> - อาทิตย์ที่ผ่านมา deploy ไปกี่ครั้ง (deployment frequency)
