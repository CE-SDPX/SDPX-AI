# Lab: CI/CD Pipeline

## เป้าหมาย
สร้าง GitHub Actions pipeline ที่ lint, test, build, และ deploy อัตโนมัติ พร้อม branch protection

---

## ขั้นตอนที่ 1 — สร้าง Pipeline เต็มรูปแบบ (1 ชั่วโมง)

### ต่อยอดจาก workflow ที่ทำ homework ไว้
เพิ่ม steps ต่อไปนี้:

1. **Lint** — ตรวจ code style อัตโนมัติ
2. **Unit Tests** — รัน test suite พร้อม coverage
3. **Build** — build production bundle
4. **Deploy to Staging** — deploy อัตโนมัติเมื่อ push ไป `develop`

### ใช้ AI Draft แล้ว Debug เอง
```
I have a Next.js app with pytest backend.
Generate a GitHub Actions workflow that:
- Runs on push to main and develop, and on PRs to main
- Runs ESLint and pytest
- Builds the Next.js app
- Deploys to Vercel staging when pushing to develop
- Deploys to Vercel production when pushing to main
Include proper caching for npm and pip dependencies.
```

**เมื่อ pipeline fail:** อ่าน error log เองก่อน ไม่ต้องรีบถามอาจารย์

---

## ขั้นตอนที่ 2 — จัดการ Secrets (30 นาที)

1. ไปที่ repo > Settings > Secrets and variables > Actions
2. เพิ่ม secrets ที่จำเป็น เช่น `VERCEL_TOKEN`, `DATABASE_URL`
3. แก้ workflow ให้ใช้ `${{ secrets.SECRET_NAME }}` แทน hardcode
4. ยืนยันว่า pipeline รันได้โดยไม่มี secrets ใน code

---

## ขั้นตอนที่ 3 — Branch Protection (20 นาที)

1. Settings > Branches > Add branch protection rule
2. Branch name pattern: `main`
3. เปิด: Require status checks, Require PR reviews
4. ทดสอบโดย push code ที่มี failing test แล้วยืนยันว่า merge ไม่ได้

---

## ขั้นตอนที่ 4 — ทดสอบ Full Flow (20 นาที)

1. สร้าง branch ใหม่: `feature/test-pipeline`
2. แก้ code เล็กน้อย และ push
3. เปิด Pull Request ไป `main`
4. ดู pipeline รันอัตโนมัติ
5. ยืนยัน merge ได้เฉพาะเมื่อ pipeline pass

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `.github/workflows/ci.yml` | Pipeline ที่ lint + test + build + deploy | GitHub repo |
| Branch protection screenshot | หน้า settings ที่เปิด protection แล้ว | `docs/screenshots/` |
| Pipeline run URL | Link ไปยัง successful pipeline run | ส่งใน LMS |

### เกณฑ์ผ่าน
- Pipeline รันผ่านบน GitHub Actions จริง
- ไม่มี secrets ใน code ทั้งหมด
- Main branch protected — failing test บล็อก merge ได้
