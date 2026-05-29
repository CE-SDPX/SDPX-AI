# Lecture: CI/CD Pipeline

## Learning Objectives
- สร้าง GitHub Actions pipeline ที่ lint, test, และ deploy อัตโนมัติได้
- จัดการ secrets อย่างปลอดภัยใน pipeline
- ใช้ branch protection เพื่อป้องกัน broken code เข้า main

---

## 1. Entry Ticket Review

อาจารย์เปิด entry tickets และ discuss ปัญหาจริงที่เกิดเพราะไม่มี CI เช่น code พัง, merge conflict, deploy ผิดรุ่น

---

## 2. CI/CD Pipeline Concepts

### ทำไม CI/CD สำคัญ
- **ไม่มี CI:** "works on my machine" — code ที่ merge อาจพัง environment อื่น
- **มี CI:** ทุก push ถูกทดสอบอัตโนมัติ ปัญหาถูกจับก่อน merge

### Pipeline Stages
```
Push to GitHub
    ↓
Lint (code style check)
    ↓
Unit Tests
    ↓
E2E Tests (optional on PR)
    ↓
Build
    ↓
Deploy to Staging
```

---

## 3. GitHub Actions: โครงสร้างที่สำคัญ

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'        # cache dependencies

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test -- --coverage

      - name: Build
        run: npm run build

  deploy:
    needs: test              # รอให้ test pass ก่อน
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'  # deploy เฉพาะ main

    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 4. กับดัก: Secrets หลุดเข้า Repo

### ตัวอย่างที่เกิดจริง
```bash
# Developer commit โดยไม่ตั้งใจ
git add .
git commit -m "add config"
# ไฟล์ .env ที่มี API_KEY=sk-... ถูก commit เข้าไป
```

### ป้องกันด้วย .gitignore
```
.env
.env.local
.env.production
*.pem
*.key
```

### ใช้ GitHub Secrets แทน Hardcode
```yaml
# แย่
env:
  DATABASE_URL: "postgres://user:password@host/db"

# ดี
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### ถ้า Secret หลุดแล้ว
1. Revoke secret ทันที (GitHub, AWS, etc.)
2. Generate ใหม่
3. อย่าแค่ลบ commit — history ยังอยู่ และอาจถูก scan แล้ว

---

## 5. Branch Protection

ตั้งค่าใน GitHub: Settings > Branches > Add rule

แนะนำ settings สำหรับ `main`:
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Require pull request reviews (อย่างน้อย 1 คน)
- ✅ Do not allow bypassing the above settings

---

## Key Takeaways
- CI/CD ทำให้ "code พังเพราะ merge" กลายเป็นปัญหาที่จับได้ก่อน production
- Secrets ต้องอยู่ใน GitHub Secrets ไม่ใช่ใน code
- Branch protection บังคับให้ทุกคนทำตาม workflow
- Pipeline ที่ใช้ AI draft มักพลาด caching และ secret handling
