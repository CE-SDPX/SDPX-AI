# Lab: Setup, First Deployment & Repo Harness

## เวลา: 1.5 ชั่วโมง
## เป้าหมาย
- ทุกคนในกลุ่มมี dev environment ที่ทำงานได้
- Deploy app แรกขึ้น cloud ได้ก่อนจบ lab
- สร้าง repo harness: โครงสร้าง repo ที่เป็นระเบียบและทุกคน contribute ได้

---

## ขั้นตอนที่ 1 — เลือก Domain และ Stack (10 นาที)

### เลือก Domain
แต่ละกลุ่มเลือก service domain ที่ไม่ซ้ำกัน แจ้งอาจารย์ทันที

**เกณฑ์การเลือก:**
- มี user ที่ชัดเจน (นักศึกษา, อาจารย์, staff)
- มี CRUD operations อย่างน้อย 2 entities
- ทุกคนในกลุ่มเข้าใจ domain นี้

### เลือก Stack
- **Option A: Next.js** — full-stack, JavaScript/TypeScript ทั้งหมด แนะนำถ้าไม่แน่ใจ
- **Option B: FastAPI + React** — Python backend, JavaScript frontend

ทุกคนในกลุ่มต้องเห็นด้วยกับ stack ที่เลือก

---

## ขั้นตอนที่ 2 — สร้าง Repository (15 นาที)

### สมาชิกคนที่ 1: สร้าง Repo
```bash
# บน GitHub: New repository
# ชื่อ: campus-[domain] เช่น campus-room-booking
# Visibility: Public
# เพิ่ม README, .gitignore (Node หรือ Python)
```

### สมาชิกทุกคน: Clone และ Setup
```bash
git clone https://github.com/[org]/campus-[domain].git
cd campus-[domain]
```

### สร้าง Branch Structure (Repo Harness ชั้นแรก)
```bash
# สร้าง develop branch
git checkout -b develop
git push origin develop

# ตั้ง default branch เป็น develop ใน GitHub Settings
```

### สร้าง .gitignore ที่ครอบคลุม
ตรวจสอบว่า `.gitignore` มีสิ่งต่อไปนี้:
```
# Environment
.env
.env.local
.env.production
.env*.local

# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/

# Build
.next/
dist/
build/

# IDE
.vscode/
.idea/
*.swp
```

> **Harness note:** .gitignore ที่ดีคือส่วนหนึ่งของ repo harness — ป้องกัน secrets และ local files หลุดเข้า repo

---

## ขั้นตอนที่ 3 — Scaffold Project ด้วย AI (25 นาที)

### Option A: Next.js
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

### Option B: FastAPI
```bash
# Backend
mkdir backend && cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install fastapi uvicorn python-dotenv
pip freeze > requirements.txt

# สร้าง main.py
```

### ใช้ AI Scaffold หน้าแรก
Prompt ที่แนะนำ:
```
I am building a [domain] system for a university.
Tech stack: [Next.js / FastAPI + React]
Create a simple landing page that:
- Shows the name of the service
- Has a navigation bar
- Has a placeholder for the main feature

Keep it simple and clean. Use TypeScript.
```

**ก่อน commit:** อ่าน code ที่ AI generate ให้ครบ และอธิบายให้เพื่อนในกลุ่มฟังได้

---

## ขั้นตอนที่ 4 — Deploy (20 นาที)

### Deploy ด้วย Vercel (Next.js)
1. ไปที่ [vercel.com](https://vercel.com) → New Project
2. Import repository จาก GitHub
3. กด Deploy (Vercel detect settings อัตโนมัติ)
4. รอ 2-3 นาที จนได้ URL

### Deploy ด้วย Render (FastAPI)
1. ไปที่ [render.com](https://render.com) → New Web Service
2. Connect repository
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### ยืนยัน Deploy สำเร็จ
```
✅ เปิด URL ได้จาก browser
✅ ไม่มี error ใน deployment logs
✅ ทุกคนในกลุ่มเห็น URL เดียวกัน
```

---

## ขั้นตอนที่ 5 — เขียน README (10 นาที)

README คือส่วนหนึ่งของ repo harness — บอกคนใหม่ว่าต้องทำอะไรเพื่อ run project

```markdown
# Campus [Domain] Service

## Description
[2-3 ประโยคอธิบาย service นี้ทำอะไร]

## Team
- [ชื่อ] — [role]
- [ชื่อ] — [role]

## Tech Stack
- Frontend: Next.js / React
- Backend: Next.js API Routes / FastAPI
- Database: (TBD)

## Getting Started
\`\`\`bash
git clone [url]
cd [repo]
npm install
npm run dev
\`\`\`

## Live URL
[vercel/render URL]
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| GitHub Repository URL | Public repo พร้อม code | ส่ง link ใน LMS |
| Live URL | App ที่ deploy แล้วเข้าได้จริง | ส่ง link ใน LMS |
| README.md | ครบตาม template ด้านบน | ใน repo |

### เกณฑ์ผ่าน
- [ ] Live URL เปิดได้จาก browser ของทุกคน
- [ ] ทุกคนในกลุ่ม clone และ run local ได้เอง
- [ ] README มีครบทุกส่วน
- [ ] ไม่มี .env หรือ secrets ใน repo
