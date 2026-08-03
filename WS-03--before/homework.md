# Homework: เตรียมพร้อมก่อนเรียน Unit Testing

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ยืนยัน Testing Framework ทำงานได้
```bash
# Python
pytest --version   # ต้องขึ้น version

# JavaScript / TypeScript
npm test           # ต้องเห็น test passed (จาก sample test ที่ทำใน WS-02--before)
```

### 2. Revise Backlog และ Wireframe
- แก้ user stories ตาม feedback ที่ได้รับจาก present
- วาด wireframe 3 screens หลักด้วย Excalidraw (https://excalidraw.com)
- เพิ่มใน `docs/wireframes/`

### 3. ติดตั้ง Playwright (สำหรับ E2E ที่จะเริ่มใน week นี้)
```bash
npm init playwright@latest
# เลือก TypeScript, tests/ folder, GitHub Actions: No (จะตั้งเองทีหลัง)
npx playwright install --with-deps chromium
# ยืนยัน
npx playwright --version
```

### 4. เตรียมข้อมูลสำหรับ Lab: จับเวลา Test Loop
รัน test suite ปัจจุบัน (แม้จะมีแค่ 1 test) แล้วจดเวลา:
```bash
# Python
pytest --durations=5

# JS/TS
npm test
```

จดไว้ 2 ตัวเลข:
- test suite รันเสร็จในกี่วินาที
- ถ้าแก้ code 1 บรรทัดแล้วอยากรู้ว่าพังไหม ต้องรออีกกี่วินาที

> ตัวเลขนี้คือ **latency ของ Unit Test Loop** ของกลุ่ม เราจะพยายามรักษาให้ต่ำกว่า 10 วินาที
> ตลอดทั้งวิชา เพราะ loop ที่ช้าคือ loop ที่ไม่มีใครรัน (รวมถึง AI agent)
