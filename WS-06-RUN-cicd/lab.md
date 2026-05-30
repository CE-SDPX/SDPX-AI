# Lab: CI/CD Pipeline & Pipeline Harness

## เวลา: 1.5 ชั่วโมง
## เป้าหมาย
สร้าง GitHub Actions pipeline ที่รัน harness ทั้งหมดอัตโนมัติ

---

## ขั้นตอนที่ 1 — สร้าง Full Pipeline (40 นาที)

สร้างหรือแก้ไข `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ develop, main ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'

jobs:
  lint-and-unit-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Unit Tests with Coverage
        run: npm test -- --coverage --reporter=verbose

      - name: Upload Coverage Report
        uses: actions/upload-artifact@v4
        with:
          name: coverage-${{ github.sha }}
          path: coverage/

  e2e-tests:
    needs: lint-and-unit-test
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_DB: ${{ secrets.TEST_DB_NAME || 'testdb' }}
          POSTGRES_USER: ${{ secrets.TEST_DB_USER || 'testuser' }}
          POSTGRES_PASSWORD: ${{ secrets.TEST_DB_PASS || 'testpass' }}
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps chromium

      - name: Start application
        run: npm run start &
        env:
          DATABASE_URL: postgres://testuser:testpass@localhost:5432/testdb

      - name: Wait for app to be ready
        run: npx wait-on http://localhost:3000

      - name: Run E2E Tests
        run: npx playwright test
        env:
          BASE_URL: http://localhost:3000

      - name: Upload Playwright Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report-${{ github.sha }}
          path: playwright-report/

  deploy-staging:
    needs: [lint-and-unit-test, e2e-tests]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'

    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Staging
        run: npx vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Debug Pipeline
เมื่อ pipeline fail:
1. คลิก job ที่ fail ใน GitHub Actions
2. คลิก step ที่แดง
3. อ่าน error log จากบนลงล่าง
4. แก้ใน local ก่อน push — อย่า debug ผ่าน push ซ้ำๆ

---

## ขั้นตอนที่ 2 — Setup GitHub Secrets (15 นาที)

1. ไปที่ repo > Settings > Secrets and variables > Actions
2. เพิ่ม secrets ที่จำเป็น:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - Database credentials (ถ้ามี)

### ตรวจสอบว่าไม่มี Secrets ใน Code
```bash
# ค้นหา patterns ที่น่าสงสัย
git log -p | grep -iE "(api_key|password|secret|token)\s*=" | head -20

# ตรวจ .env files ใน history
git log --all --full-history -- "**/.env*"
```

---

## ขั้นตอนที่ 3 — Branch Protection (15 นาที)

1. Settings > Branches > Add rule
2. Branch name: `main`
3. เปิด:
   - ✅ Require status checks: `lint-and-unit-test`, `e2e-tests`
   - ✅ Require branches to be up to date
   - ✅ Require pull request reviews: 1 review

### ทดสอบว่า Protection ทำงาน
```bash
# สร้าง test branch ที่มี failing test
git checkout -b test/break-pipeline
# แก้ test ให้ fail แล้ว push
git push origin test/break-pipeline
# เปิด PR → ต้องเห็น pipeline fail และ merge ถูกบล็อก
```

---

## ขั้นตอนที่ 4 — Test Report Summary (10 นาที)

เพิ่ม step ที่แสดงผล test summary ใน PR:
```yaml
- name: Test Summary
  uses: dorny/test-reporter@v1
  if: always()
  with:
    name: Test Results
    path: 'test-results/*.xml'
    reporter: jest-junit
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `.github/workflows/ci.yml` | Pipeline ที่รันผ่าน | GitHub repo |
| Pipeline run URL | Link ไปยัง successful run | ส่งใน LMS |
| Branch protection screenshot | Settings ที่เปิดแล้ว | `docs/screenshots/` |

### เกณฑ์ผ่าน
- [ ] Pipeline รันผ่านทุก job
- [ ] ไม่มี secrets hardcode ใน workflow file
- [ ] Branch protection เปิดแล้วสำหรับ main
- [ ] ทดสอบแล้วว่า failing test บล็อก merge ได้
