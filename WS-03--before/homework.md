# Homework: เตรียมพร้อมก่อนเรียน Unit Testing

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ยืนยัน Testing Framework ทำงานได้
```bash
# Python
pytest --version  # ต้องขึ้น version

# JavaScript
npm test  # ต้องเห็น test passed (จาก sample test ที่ทำใน WS-02-before)
```

### 2. Revise Backlog และ Wireframe
- แก้ user stories ตาม feedback ที่ได้รับจาก present
- วาด wireframe 3 screens หลักด้วย Excalidraw
- เพิ่มใน `docs/wireframes/`

### 3. ติดตั้ง Playwright (สำหรับ E2E ที่จะเริ่มใน week นี้)
```bash
npm init playwright@latest
# เลือก TypeScript, tests/ folder, GitHub Actions: No (จะตั้งเองทีหลัง)
npx playwright install
# ยืนยัน
npx playwright test --version
```