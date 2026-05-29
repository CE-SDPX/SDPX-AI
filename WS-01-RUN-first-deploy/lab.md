# Lab: Dev Environment & First Deployment

## เป้าหมาย
ทุกคนในกลุ่มต้องมี dev environment ที่ทำงานได้ และ deploy app แรกขึ้น cloud ให้ได้ก่อนจบ lab

---

## ขั้นตอนที่ 1 — เลือก Domain (15 นาที)

กลุ่มหารือและเลือก service domain ของ Campus Service Hub
แต่ละกลุ่มต้องเลือก domain ที่ไม่ซ้ำกัน อาจารย์จะ assign ถ้ามีซ้ำ

**เกณฑ์การเลือก:**
- มี user ที่ชัดเจน (นักศึกษา, อาจารย์, staff)
- มี CRUD operations อย่างน้อย 2 entities
- สามารถเพิ่ม AI feature ได้ในอนาคต

---

## ขั้นตอนที่ 2 — ตั้ง Repository (20 นาที)

1. คนหนึ่งในกลุ่ม create repository บน GitHub
   - ตั้งชื่อ: `campus-[domain]-service` เช่น `campus-room-booking`
   - เลือก Public
   - เพิ่ม README และ .gitignore

2. Add collaborators ทุกคนในกลุ่มเป็น contributor

3. สร้าง branch structure:
```bash
git checkout -b develop
git push origin develop
```

4. ทุกคน clone repo และยืนยันว่าสามารถ push ได้

---

## ขั้นตอนที่ 3 — Scaffold Project ด้วย AI (45 นาที)

### ตัวเลือก A: Next.js (แนะนำสำหรับ full-stack)
```bash
npx create-next-app@latest . --typescript --tailwind --app
```

### ตัวเลือก B: FastAPI + React
```bash
# Backend
pip install fastapi uvicorn
# Frontend
npm create vite@latest frontend -- --template react-ts
```

**ใช้ AI scaffold หน้าแรก:**
ให้ Copilot หรือ Claude ช่วย generate:
- Landing page ที่อธิบาย service
- Navigation bar
- โครงสร้าง folder เบื้องต้น

> **สำคัญ:** ก่อน commit ทุกคนต้องอ่าน code ที่ AI generate ให้และอธิบายได้ว่าแต่ละส่วนทำอะไร

---

## ขั้นตอนที่ 4 — Deploy (30 นาที)

### Deploy ด้วย Vercel (Next.js)
1. ไปที่ [vercel.com](https://vercel.com) และ sign in ด้วย GitHub
2. กด "New Project" และ import repository
3. ตั้งค่า build settings (Vercel detect อัตโนมัติสำหรับ Next.js)
4. กด Deploy และรอผล

### Deploy ด้วย Render (FastAPI)
1. ไปที่ [render.com](https://render.com) และ sign in ด้วย GitHub
2. สร้าง "New Web Service" และ connect repository
3. ตั้ง Build Command: `pip install -r requirements.txt`
4. ตั้ง Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

---

## ขั้นตอนที่ 5 — ยืนยัน (15 นาที)

ทุกคนในกลุ่มต้องทำได้เอง:
- [ ] Clone repo ใหม่ในเครื่องตัวเองและ run local ได้
- [ ] สร้าง branch ใหม่และ push ขึ้น GitHub ได้
- [ ] เปิด live URL และเห็น app ที่ deploy แล้ว

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| GitHub Repository URL | Public repo พร้อม code | ส่งลิงก์ใน LMS |
| Live URL | App ที่ deploy แล้วเข้าได้จริง | ส่งลิงก์ใน LMS |
| README.md | อธิบาย project, วิธี run local | อยู่ใน repo |

### เกณฑ์ผ่าน
- App เปิดได้จาก live URL
- ทุกคนในกลุ่ม clone และ run local ได้
- README มีครบ: project description, team members, how to run
