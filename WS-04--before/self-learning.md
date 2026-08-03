# Self-Learning: เตรียมก่อนเรียน E2E Testing

## สิ่งที่ต้องศึกษา

### Playwright
- [video] Playwright Tutorial Full Course — Testers Talk (ดู 20 นาทีแรก)
  (https://www.youtube.com/watch?v=2poXBtifpzA)
- [reading] Playwright — Getting Started (https://playwright.dev/docs/intro)
- [reading] Playwright — Best Practices (https://playwright.dev/docs/best-practices)
  **อ่านให้ครบ** โดยเฉพาะ *Testing philosophy* และ *Use locators*
- [reading] Playwright — Page Object Model (https://playwright.dev/docs/pom)

**จุดที่ต้องเข้าใจ:**
- Locator คืออะไร และทำไม `getByRole` ดีกว่า CSS class
- Web-first assertion (`await expect(...).toBeVisible()`) รออัตโนมัติอย่างไร
- Flaky test คืออะไร เกิดจากอะไร
- Page Object Model แก้ปัญหาอะไร
- Trace Viewer ใช้ debug test ที่ fail ใน CI ได้อย่างไร

### Docker (เตรียมล่วงหน้าสำหรับ WS-05)
- [video] Docker Crash Course for Absolute Beginners — TechWorld with Nana
  (https://www.youtube.com/watch?v=pg19Z8LL06w)
- [reading] Dockerfile Best Practices
  (https://docs.docker.com/build/building/best-practices/)

---

## Entry Ticket
ส่งก่อนเข้าห้องอย่างน้อย 1 ชั่วโมง:

> "เลือก user story 1 อันจาก backlog ที่อยากเขียน E2E test มากที่สุด
> แล้วเขียนขั้นตอนที่ user ทำจริงเป็นข้อ ๆ (คลิกอะไร กรอกอะไร คาดหวังเห็นอะไร)"
>
> พร้อมตอบ 1 บรรทัด: "ทำไม story นี้ถึงควรเป็น E2E ไม่ใช่ unit test"
