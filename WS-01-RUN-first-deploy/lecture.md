# Lecture: Dev Environment & First Deployment

## Learning Objectives
- ติดตั้งและใช้งาน dev environment สมัยใหม่ได้
- เข้าใจหลักการใช้ AI ในการพัฒนาซอฟต์แวร์อย่างมีจริยธรรม
- Deploy application ขึ้น cloud ได้ครั้งแรก

---

## 1. แนะนำ Project: Campus Service Hub

แต่ละกลุ่มจะพัฒนา web application สำหรับบริการในมหาวิทยาลัย โดยเลือก domain ที่แตกต่างกัน เช่น:
- ระบบจองห้อง
- ระบบยืมอุปกรณ์
- ระบบนัดอาจารย์ที่ปรึกษา
- ระบบติดตามการบ้าน
- ระบบแจ้งซ่อม

ทุกกลุ่มใช้ tech stack เดียวกัน (Next.js หรือ FastAPI) และ architecture pattern เดียวกัน

---

## 2. AI Ethics ในการพัฒนาซอฟต์แวร์

### สิ่งที่ใช้ได้
- ใช้ AI scaffold boilerplate code
- ใช้ AI อธิบาย error messages
- ใช้ AI suggest implementation approaches
- ใช้ AI generate test cases

### สิ่งที่ต้องระวัง
- อย่า commit code ที่ไม่เข้าใจ — ถ้าอธิบายไม่ได้ ให้อ่านก่อนเสมอ
- อย่าส่ง sensitive data (passwords, API keys, personal data) เข้า AI tools
- AI อาจ hallucinate API ที่ไม่มีจริง — ตรวจสอบ documentation เสมอ
- AI-generated code อาจมี security vulnerabilities — ต้อง review

### สิ่งที่ต้องรับผิดชอบเอง
- ความถูกต้องของ code ทั้งหมดที่ส่ง
- การเข้าใจ logic ของระบบที่สร้าง
- การตัดสินใจด้าน architecture และ design

---

## 3. Modern Dev Workflow

### เครื่องมือหลัก
- **VS Code** — editor พร้อม GitHub Copilot extension
- **Git + GitHub** — version control และ collaboration
- **GitHub Copilot / Cursor** — AI coding assistant
- **Vercel / Render** — deployment platform

### Branch Strategy เบื้องต้น
```
main          ← production-ready เสมอ
└── develop   ← integration branch
    └── feature/xxx  ← งานของแต่ละคน
```

### Commit Message Convention
```
feat: add booking form
fix: resolve date picker bug
docs: update README
test: add unit tests for booking service
```

---

## 4. Entry Ticket Review

อาจารย์จะเปิด entry tickets ที่นักศึกษาส่งมาก่อนเข้าห้อง และตอบเฉพาะจุดที่คนสงสัยมากที่สุด ไม่ได้สอนซ้ำทุกอย่างที่ให้ไปอ่านแล้ว

---

## Key Takeaways
- AI เป็นเครื่องมือ ไม่ใช่ผู้รับผิดชอบ — นักศึกษาต้องอธิบาย code ของตัวเองได้เสมอ
- Deploy ให้ได้เร็ว แม้จะ imperfect — "working beats perfect"
- ทุกคนในกลุ่มต้อง setup ได้เอง ไม่ใช่แค่คนเดียว
