# Lecture: CI/CD Pipeline & Pipeline Harness

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (5 นาที)

เปิด entry tickets discuss ปัญหาจริงที่เกิดโดยไม่มี CI:
- "works on my machine" — code พังใน environment อื่น
- Merge conflict ที่ไม่รู้ตัวจนถึง production
- ไม่มีใคร run tests ก่อน merge

---

## 2. CI/CD Pipeline Concept (5 นาที)

```
Push to GitHub
    ↓
[Lint]          ← code style, unused imports
    ↓
[Unit Tests]    ← fast, isolated
    ↓
[Integration]   ← database, services
    ↓
[E2E Tests]     ← browser, full flow
    ↓
[Build]         ← compile, bundle
    ↓
[Deploy Staging] ← automatic on develop branch
    ↓
[Deploy Prod]   ← manual approval or tag
```

### Pipeline เป็น Harness
CI pipeline คือ harness ที่รัน harnesses ทั้งหมดที่สร้างมาตั้งแต่ W01:
- Repo harness (checkout, branch protection)
- Contract harness (OpenAPI validation)
- Unit test harness (pytest/jest + fakes + fixtures)
- E2E harness (Playwright + seed data)
- Environment harness (docker-compose)

---

## 3. GitHub Actions Workshop (10 นาที)

### โครงสร้าง Workflow ที่สมบูรณ์
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ develop, main ]
  pull_request:
    branches: [ main ]

jobs:
  # Job 1: Fast checks
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'          # cache npm dependencies

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Unit Tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  # Job 2: E2E Tests (ต้องการ services)
  e2e:
    needs: lint-and-test        # รอ job แรกผ่านก่อน
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_DB: testdb
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - name: Run E2E tests
        run: npx playwright test
        env:
          DATABASE_URL: postgres://testuser:testpass@localhost:5432/testdb
          BASE_URL: http://localhost:3000
      - uses: actions/upload-artifact@v4
        if: failure()           # upload report เฉพาะเมื่อ fail
        with:
          name: playwright-report
          path: playwright-report/

  # Job 3: Deploy (เฉพาะ main branch)
  deploy:
    needs: [lint-and-test, e2e]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: npx vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## 4. กับดัก: Secrets หลุดเข้า Repo (5 นาที)

### ตัวอย่างที่เกิดจริง
```bash
# Developer commit โดยไม่ตั้งใจ
git add .
git commit -m "add database config"
# ไฟล์ .env ที่มี DATABASE_URL=postgres://user:realpassword@... ถูก commit

# Force push ไม่ช่วย — history ยังอยู่ใน GitHub caches
```

### วิธีป้องกัน
```yaml
# ใน GitHub Actions: ใช้ secrets เสมอ
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}

# ไม่เป็น:
env:
  DATABASE_URL: "postgres://user:password@host/db"
```

### ถ้า Secret หลุดแล้ว
1. **Revoke ทันที** — ไปที่ service ที่ออก secret
2. **Generate ใหม่** — update ใน GitHub Secrets
3. อย่าคิดว่า "ลบ commit แล้วปลอดภัย" — GitHub scan ก่อน delete แล้ว

---

## 5. Branch Protection + Fail Fast (5 นาที)

### Branch Protection
Settings > Branches > Add rule สำหรับ `main`:
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Require pull request reviews (1 reviewer)

### Fail Fast Strategy
```yaml
# หยุดทันทีเมื่อ step แรก fail
jobs:
  pipeline:
    steps:
      - name: Lint           # fail → หยุด ไม่รัน unit test
      - name: Unit Tests     # fail → หยุด ไม่รัน E2E
      - name: E2E Tests      # fail → หยุด ไม่ deploy
      - name: Deploy
```

ทำไม fail fast: ประหยัดเวลา developer — รู้ปัญหาเร็ว ไม่ต้องรอ pipeline ทั้งหมด

---

## Key Takeaways
- CI pipeline คือ harness ที่รัน harnesses ทั้งหมดอัตโนมัติ
- Fail fast: หยุดทันทีเมื่อ stage แรก fail ประหยัดเวลา
- Secrets ต้องอยู่ใน GitHub Secrets เท่านั้น ไม่ใช่ใน code หรือ logs
- Branch protection บังคับให้ทุกคนผ่าน pipeline ก่อน merge ไป main
