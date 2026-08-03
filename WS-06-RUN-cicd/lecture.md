# Lecture: CI/CD & the Integration Loop

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (4 นาที)

เปิด entry tickets discuss ปัญหาจริงที่เกิดโดยไม่มี CI:
- "works on my machine" — code พังใน environment อื่น
- Merge conflict ที่ไม่รู้ตัวจนถึง production
- ไม่มีใคร run tests ก่อน merge

แล้วเปิดตัวเลข lead time / deployment frequency ที่แต่ละกลุ่มประเมินมา —
เก็บไว้เทียบตอนจบ lab

---

## 2. Integration Loop: รวมทุก loop ให้เป็นด่านเดียว (5 นาที)

5 สัปดาห์ที่ผ่านมาเราสร้าง loop แยกกันไว้ 4 วง วันนี้เอามาต่อกันให้รันเองทุกครั้งที่ push

```
Push / Open PR
    ↓
[Lint + Typecheck]  ← เร็วที่สุด ให้แดงก่อนถ้าจะแดง
    ↓
[Unit Tests]        ← WS-03 harness
    ↓
[E2E Tests]         ← WS-04 harness (บน container จาก WS-05)
    ↓
[Build]             ← WS-05
    ↓
[Deploy Staging]    ← อัตโนมัติเมื่อเข้า develop
    ↓
[Deploy Prod]       ← ต้องมีคน approve
```

| | ก่อนมี CI | หลังมี CI |
|---|---|---|
| **Latency** | รู้ตอนเพื่อน pull มาแล้วพัง | รู้ภายในไม่กี่นาทีหลัง push |
| **Fidelity** | ขึ้นกับว่าใครจำรัน test ได้บ้าง | รันทุกครั้ง เหมือนกันทุกครั้ง |
| **Coverage** | เฉพาะที่คนนึกออก | ทุก loop ที่เคยสร้างไว้ |

**สิ่งที่เปลี่ยนไปจริง ๆ ไม่ใช่ "มี test" — แต่คือ "test กลายเป็นสิ่งที่หลบไม่ได้"**

### วัดผลด้วย DORA
| ตัวชี้วัด | ความหมาย | เกี่ยวกับ loop อย่างไร |
|---|---|---|
| Deployment frequency | deploy บ่อยแค่ไหน | loop สั้น → กล้า deploy บ่อย |
| Lead time for changes | commit → production ใช้เวลาเท่าไร | คือ latency ของ loop รวม |
| Change failure rate | deploy แล้วพังกี่ % | คือ fidelity ที่หลุดออกไปถึง user |
| Recovery time | พังแล้วกู้คืนเร็วแค่ไหน | loop ของการแก้ไข |

สองตัวแรกวัด **ความเร็ว** สองตัวหลังวัด **ความมั่นคง** — และของจริงคือมันไปด้วยกัน
ทีมที่ deploy บ่อยมัก failure rate ต่ำกว่า เพราะแต่ละครั้งเปลี่ยนน้อย จึงหาสาเหตุง่าย

---

## 3. GitHub Actions Workshop (10 นาที)

### โครงสร้าง Workflow ที่ครบ
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ develop, main ]
  pull_request:
    branches: [ develop, main ]

# ให้สิทธิ์น้อยที่สุดเท่าที่จำเป็น (ค่า default ของ repo อาจกว้างเกินไป)
permissions:
  contents: read

# push ใหม่มาระหว่างที่ยังรันอยู่ → ยกเลิกอันเก่า ประหยัดเวลาและ quota
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '24'

jobs:
  # ---------- Job 1: ด่านที่เร็วที่สุด ----------
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - uses: actions/setup-node@v7
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'            # cache npm dependencies

      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - name: Unit Tests
        run: npm test -- --coverage

      - uses: actions/upload-artifact@v7
        if: always()
        with:
          name: coverage-${{ github.sha }}
          path: coverage/

  # ---------- Job 2: E2E ----------
  e2e:
    needs: lint-and-test          # รอ job แรกผ่านก่อน
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:17-alpine
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
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - name: Run E2E tests
        run: npx playwright test
        env:
          DATABASE_URL: postgres://testuser:testpass@localhost:5432/testdb
          BASE_URL: http://localhost:3000
      - uses: actions/upload-artifact@v7
        if: failure()             # upload report เฉพาะเมื่อ fail
        with:
          name: playwright-report
          path: playwright-report/

  # ---------- Job 3: Deploy ----------
  deploy:
    needs: [lint-and-test, e2e]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production       # บังคับให้ต้องมีคน approve ได้
    steps:
      - uses: actions/checkout@v7
      - name: Deploy to production
        run: npx vercel --prod --token "$VERCEL_TOKEN"
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

### 4 บรรทัดที่คนมักลืม แต่สำคัญมาก
| บรรทัด | ป้องกันอะไร |
|---|---|
| `permissions: contents: read` | workflow ที่ถูกแก้โดยไม่ตั้งใจ (หรือโดย dependency) เขียนอะไรก็ได้ใน repo |
| `concurrency` + `cancel-in-progress` | job เก่าค้างกินเวลา ทำให้ latency ของ loop บาน |
| `cache: 'npm'` | pipeline ช้าเพราะ install ใหม่ทุกครั้ง |
| `if: github.event_name == 'push'` | deploy ซ้ำจาก event ที่ไม่ได้ตั้งใจ |

---

## 4. กับดัก: Secrets และ Supply Chain (5 นาที)

### Secrets หลุดเข้า Repo
```bash
# Developer commit โดยไม่ตั้งใจ
git add .
git commit -m "add database config"
# ไฟล์ .env ที่มี DATABASE_URL=postgres://user:realpassword@... ถูก commit

# Force push ไม่ช่วย — history ยังอยู่ใน GitHub caches และใน clone ของคนอื่น
```

**วิธีป้องกัน:**
```yaml
# ใน GitHub Actions: ใช้ secrets เสมอ
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}

# ไม่ใช่:
env:
  DATABASE_URL: "postgres://user:password@host/db"
```

**ถ้า Secret หลุดแล้ว — เรียงตามลำดับ:**
1. **Revoke ทันที** ที่ service ที่ออก secret นั้น
2. Generate ใหม่ แล้ว update ใน GitHub Secrets
3. ค่อยไปจัดการ git history
> อย่าคิดว่า "ลบ commit แล้วปลอดภัย" — bot scan repo สาธารณะภายในไม่กี่วินาที

### Supply Chain: action ที่เราเรียกใช้ก็คือ code ที่เรารัน
```yaml
# พอใช้ได้: pin major version — ได้ security fix อัตโนมัติ
- uses: actions/checkout@v7

# ปลอดภัยที่สุด: pin commit SHA — ไม่มีใครเปลี่ยนของใต้เท้าเราได้
- uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
```
สำหรับ action จาก third-party (ไม่ใช่ `actions/*`) ให้ pin SHA เสมอ
เพราะ tag เป็นแค่ label ที่เจ้าของ repo เลื่อนไปชี้ code อื่นได้ทุกเมื่อ

### Log ก็รั่วได้
```yaml
- run: echo "Deploying with $DATABASE_URL"   # ❌ โผล่ใน log
```
GitHub มาสก์ค่า secret ให้บางกรณี แต่ไม่เสมอไป (เช่นถ้าถูกแปลงเป็น base64 ก่อน)
กติกาง่าย ๆ: อย่า echo อะไรที่มาจาก `secrets.*`

---

## 5. Branch Protection & Fail Fast (6 นาที)

### Branch Protection = ทำให้ loop หลบไม่ได้
Settings > Branches (หรือ Rules > Rulesets) สำหรับ `main`:
- ✅ Require status checks to pass — เลือก `lint-and-test`, `e2e`
- ✅ Require branches to be up to date before merging
- ✅ Require a pull request before merging (1 reviewer)
- ✅ Block force pushes

> ถ้าไม่มีข้อนี้ CI ก็เป็นแค่ "ไฟสัญญาณที่มองข้ามได้"
> Loop จะมีความหมายก็ต่อเมื่อผลของมันมีผลจริง

### Fail Fast
```yaml
jobs:
  pipeline:
    steps:
      - name: Lint           # fail → หยุด ไม่รัน unit test
      - name: Unit Tests     # fail → หยุด ไม่รัน E2E
      - name: E2E Tests      # fail → หยุด ไม่ deploy
      - name: Deploy
```
เรียงจากเร็ว/ถูก ไปช้า/แพง — ประหยัดเวลา developer และ compute

### เมื่อ Pipeline แดง
```
1. คลิก job ที่ fail → คลิก step ที่แดง
2. อ่าน error จากบนลงล่าง หา error แรก ไม่ใช่ error สุดท้าย
3. reproduce ใน local ด้วยคำสั่งเดียวกับ CI:
   docker compose -f compose.test.yaml up unit --abort-on-container-exit --exit-code-from unit
4. แก้ใน local จน green แล้วค่อย push
```

**ข้อห้าม:** debug ด้วยการ push ซ้ำ ๆ — นั่นคือการเปลี่ยน loop ที่ latency 10 วินาที
ให้กลายเป็น loop ที่ latency 5 นาที

> **ให้ AI ช่วยได้ตรงไหน:** วาง log ของ job ที่แดงให้ agent อ่านพร้อมไฟล์ workflow
> มันเก่งเรื่องตีความ error ของ YAML/CI มาก แต่ **อย่าให้มันแก้ workflow แล้ว push ทันที** —
> ทุก push คือการรัน pipeline จริง ให้ reproduce ใน local ก่อนเสมอ

---

## Key Takeaways
- Integration Loop ทำให้ทุก loop ที่สร้างมา 5 สัปดาห์กลายเป็นสิ่งที่หลบไม่ได้
- ตั้ง `permissions`, `concurrency`, cache และ pin version — 4 บรรทัดที่คนลืมบ่อยที่สุด
- Secrets อยู่ใน GitHub Secrets เท่านั้น หลุดเมื่อไหร่ให้ revoke ก่อนทำอย่างอื่น
- Branch protection คือสิ่งที่ทำให้ผลของ loop มีความหมาย
- วัดผลด้วย DORA — ความเร็วกับความมั่นคงไม่ใช่สิ่งที่ต้องแลกกัน

---

## AI-DLC Connection: Operations Phase — Deploy & Verify Stages

```
Operations Phase:
Build → [Deploy] → [Verify] → Monitor
          ↑            ↑
        วันนี้       วันนี้
```

**CI/CD = AI-DLC Operations Automation:**
- Pipeline รัน test harness ทั้งหมด (unit, E2E) และ build ก่อนทุก deploy
- Branch protection = human checkpoint ที่บังคับใช้อัตโนมัติ
- Staging deploy = verify ก่อนถึง production

ใน AI-DLC ทุก bolt ที่ complete ต้องผ่าน Operations phase:
ไม่มี "เดี๋ยวค่อย deploy" — deploy เป็นส่วนหนึ่งของ definition of done

> และตอนนี้ agent ของเราก็มีสัญญาณระดับเดียวกับที่ทีมใช้ตัดสินใจแล้ว
> สัปดาห์หน้าเราจะเพิ่มสัญญาณสุดท้าย: ความจริงจาก production
