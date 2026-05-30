# Lab: Setup, First Deployment & Tech Stack

## เวลา: 1 ชั่วโมง
## รูปแบบ: ไม่มีการตรวจ — กลุ่มช่วยกันเอง
## เป้าหมาย
- ทุกคนมี dev environment ที่ทำงานได้
- Deploy app แรกขึ้น cloud ได้ก่อนจบ lab
- สร้าง `memory-bank/standards/tech-stack.md` — artifact แรกของ AI-DLC

---

## ขั้นตอนที่ 1 — เลือก Domain และ Stack (10 นาที)

### เลือก Domain
6 กลุ่ม เลือก domain ที่ไม่ซ้ำกัน แจ้งอาจารย์ทันที:
- ระบบจองห้อง
- ระบบยืมอุปกรณ์
- ระบบนัดอาจารย์ที่ปรึกษา
- ระบบแจ้งซ่อม
- ระบบติดตามการบ้าน
- ระบบสมัครกิจกรรม

### เลือก Stack
- **Next.js** — full-stack TypeScript แนะนำถ้าไม่แน่ใจ
- **FastAPI + React** — Python backend, JavaScript frontend

---

## ขั้นตอนที่ 2 — สร้าง Repository (15 นาที)

```bash
# สมาชิกคนที่ 1: สร้าง repo บน GitHub
# ชื่อ: campus-[domain] เช่น campus-room-booking
# Visibility: Public, เพิ่ม README + .gitignore

# ทุกคน: clone และ setup
git clone https://github.com/[org]/campus-[domain].git
cd campus-[domain]

# สร้าง develop branch
git checkout -b develop
git push origin develop
```

### สร้าง memory-bank/ structure
```bash
mkdir -p memory-bank/standards
mkdir -p memory-bank/units
```

---

## ขั้นตอนที่ 3 — เขียน tech-stack.md (10 นาที)

สร้าง `memory-bank/standards/tech-stack.md`:

```markdown
# Tech Stack

## Decision Summary
ทีม: [ชื่อสมาชิก]
Domain: [ชื่อ domain]
Date: [วันที่]

## Frontend
- Framework: [Next.js / React]
- Language: TypeScript
- Styling: Tailwind CSS
- Rationale: [ทำไมถึงเลือก]

## Backend
- Framework: [Next.js API Routes / FastAPI]
- Language: [TypeScript / Python]
- Rationale: [ทำไมถึงเลือก]

## Database
- [PostgreSQL / SQLite / TBD]
- Rationale: [ทำไมถึงเลือก]

## Deployment
- Platform: [Vercel / Render]
- Staging URL: [จะเพิ่มหลัง deploy]

## AI Tools
- Code generation: GitHub Copilot / Claude
- Review policy: ทุก AI-generated code ต้องอ่านและอธิบายได้ก่อน commit
```

> **AI-DLC Note:** ไฟล์นี้คือ `standards/tech-stack.md` ใน Memory Bank
> AI จะใช้ไฟล์นี้เป็น context เมื่อ generate code — ยิ่งละเอียดยิ่งได้ output ที่ตรงกับ project

---

## ขั้นตอนที่ 4 — Scaffold และ Deploy (25 นาที)

### Scaffold ด้วย AI
```
I am building a [domain] system for a university.
Tech stack: [stack จาก tech-stack.md]
Create a simple landing page that shows the service name,
a navigation bar, and a placeholder for the main feature.
Keep it clean and simple.
```

**ก่อน commit:** ทุกคนอ่าน code ที่ AI generate และอธิบายให้เพื่อนฟังได้

### Deploy
**Vercel (Next.js):** vercel.com → New Project → Import repo → Deploy

**Render (FastAPI):** render.com → New Web Service → Connect repo
- Build: `pip install -r requirements.txt`
- Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### อัปเดต tech-stack.md
เพิ่ม Staging URL ที่ได้จาก deploy ลงใน `memory-bank/standards/tech-stack.md`

---

## สร้าง .gitignore ที่ครอบคลุม

```
.env
.env.local
.env.production
node_modules/
__pycache__/
.venv/
.next/
dist/
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| GitHub Repository URL | Public repo | ส่ง link ใน LMS |
| Live URL | App ที่ deploy แล้ว | ส่ง link ใน LMS |
| `memory-bank/standards/tech-stack.md` | ครบทุก section | ใน repo |

### เกณฑ์ผ่าน (ตรวจกันเองในกลุ่ม)
- [ ] Live URL เปิดได้จาก browser ของทุกคน
- [ ] ทุกคน clone และ run local ได้เอง
- [ ] tech-stack.md มีครบทุก section รวม Staging URL
- [ ] ไม่มี .env หรือ secrets ใน repo
