# WS-04 · Lab — CI/CD Loop

**รูปแบบ:** งานกลุ่ม ใช้ repository เดิมของกลุ่มจาก WS-03

**เป้าหมาย:** `main` รับการแก้ไขผ่าน PR ที่ CI ผ่านและสมาชิกอีกคนอนุมัติเท่านั้น
ทุก PR มีผลการ review ด้วย AI ตาม `REVIEW.md` ของกลุ่ม
และ feature `03-cancel` (R2 และ R4 ส่วนการยกเลิก) พัฒนาผ่านด่านนี้ตั้งแต่ intent จนขึ้นเว็บจริง

---

## สิ่งที่ต้องมีก่อนเริ่ม

- WS-03 เสร็จแล้ว: test ของ R1, R3, R4, R5 ผ่านบน `main` และ CI ของ `main` เป็นสีเขียว
- ทุกคนทำ `0-Before.md` ส่วน B และ C เสร็จแล้ว สมาชิกทุกคนเป็น collaborator ของ repository
- เจ้าของ repository อยู่ในคาบ เพราะขั้นตอนที่ 2 ต้องใช้สิทธิ์ของเจ้าของ

---

## โครงสร้าง repository ที่จะได้เมื่อจบบทนี้

แสดงเฉพาะไฟล์ที่เพิ่มหรือแก้ในบทนี้ ตัวเลขหลังชื่อไฟล์คือขั้นตอนที่สร้างหรือแก้ไฟล์นั้น
ชื่อไฟล์ใน `src/` เป็นตัวอย่าง ให้ใช้ตาม `plan.md` ของกลุ่ม

```
sdpx-[ชื่อกลุ่ม]/
├── AGENTS.md                         ← 3 เพิ่มกติกาเรื่อง PR และ review
├── REVIEW.md                         ← 3
├── docs/
│   ├── openapi.yaml                  ← 4 เพิ่ม endpoint ยกเลิก
│   └── features/
│       └── 03-cancel/
│           ├── intent.md             ← 4
│           ├── spec.md               ← 4
│           └── plan.md               ← 4
├── src/
│   ├── domain/
│   │   ├── cancel.ts                 ← 5
│   │   └── cancel-r2.test.ts         ← 5 และ cancel-r4.test.ts
│   └── app/api/...                   ← 5 route handler ยกเลิก
├── evidence/
│   └── ws-04.md                      ← 7
└── .github/workflows/ci.yml          ← 1 จำกัดสิทธิ์และเวลา
```

ruleset ในขั้นตอนที่ 2 ไม่ใช่ไฟล์ใน repository แต่เป็นการตั้งค่าใน GitHub

---

## ขั้นตอนที่ 1 — จำกัดสิทธิ์และเวลาของ CI

**ทำ**

```bash
git switch main
git pull origin main
git switch -c ci/harden
```

แก้ `.github/workflows/ci.yml` ให้เป็นดังนี้ ส่วนที่เพิ่มคือ `permissions`, `concurrency` และ `timeout-minutes`

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
permissions:
  contents: read
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: ${{ github.event_name == 'pull_request' }}
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
      - run: npx --yes @redocly/cli@2 lint docs/openapi.yaml
```

ชื่อ job ต้องเป็น `build` เหมือนเดิม เพราะขั้นตอนที่ 2 จะใช้ชื่อนี้เป็น required status check

```bash
git commit -am "ci: limit permissions and time"
git push -u origin ci/harden
```

เปิด PR รอให้ CI เป็นสีเขียว ให้สมาชิกอีกคนอนุมัติ แล้ว merge

**ผลที่ควรเห็น**

- CI ของ PR เป็นสีเขียว และในหน้า Checks มีชื่อ `build`
- เมื่อ push commit ใหม่เข้า PR เดิมขณะที่ CI ยังรันอยู่ การรันครั้งเก่าถูกยกเลิก

**หากติดปัญหา**

- CI ไม่ทำงานเลย: ตรวจย่อหน้าของ `permissions` และ `concurrency` ว่าอยู่ระดับเดียวกับ `on` และ `jobs`
- CI แดงที่ขั้น checkout หลังเพิ่ม `permissions`: ตรวจว่าเขียน `contents: read` ถูกต้อง

---

## ขั้นตอนที่ 2 — ตั้ง ruleset ให้ `main`

**ทำ**

เจ้าของ repository ทำบนหน้าเว็บ GitHub โดยให้สมาชิกที่เหลือดูไปพร้อมกัน

1. เปิด Settings → Rules → Rulesets → **New ruleset** → **New branch ruleset**
2. Ruleset name: `main-gate`
3. Enforcement status: **Active**
4. Bypass list: **ไม่เพิ่มผู้ใดเลย**
5. Target branches: **Add target** → **Include default branch**
6. เลือกกฎต่อไปนี้
   - Restrict deletions
   - Block force pushes
   - Require a pull request before merging
     - Required approvals: `1`
     - Dismiss stale pull request approvals when new commits are pushed
   - Require status checks to pass → **Add checks** → พิมพ์ `build` แล้วเลือก
7. กด **Create**

ทดสอบว่า push เข้า `main` โดยตรงไม่ได้แล้ว

```bash
git switch main
git pull origin main
git commit --allow-empty -m "test: direct push to main"
git push origin main
```

จากนั้นลบ commit ทดลองนี้ออกจากเครื่อง

```bash
git reset --hard origin/main
```

**ผลที่ควรเห็น**

- หน้า Rulesets แสดง `main-gate` สถานะ Active และ Bypass list ว่าง
- `git push origin main` ถูกปฏิเสธ โดยมีข้อความที่ขึ้นต้นด้วย `remote: error: GH013: Repository rule violations found`

**หากติดปัญหา**

- ค้นหา `build` ใน Add checks ไม่พบ: GitHub แสดงเฉพาะ check ที่เคยรันในช่วงไม่นานนี้ ให้ตรวจว่า CI ของขั้นตอนที่ 1 รันเสร็จแล้ว
- push เข้า `main` ได้: ตรวจว่า Enforcement status เป็น Active, target เป็น default branch และ bypass list ว่าง
- `git reset --hard origin/main` ลบงานอื่นที่ยังไม่ได้ commit: คำสั่งนี้ใช้เฉพาะหลัง commit ทดลองบน `main` เท่านั้น งานจริงต้องอยู่บน branch อื่นเสมอ

---

## ขั้นตอนที่ 3 — เขียน `REVIEW.md` และเพิ่มกติกาใน `AGENTS.md`

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/review
```

สร้าง `REVIEW.md` ที่ระดับบนสุดของ repository โดยเริ่มจากตัวอย่างใน lecture แล้วปรับให้เป็นของกลุ่ม

- เปลี่ยน status code ของกรณีผิดกฎให้ตรงกับที่กลุ่มเลือกใน WS-02 (`409` หรือ `422`)
- เพิ่มอย่างน้อย 2 ข้อจากประสบการณ์ของกลุ่ม เช่น เรื่องที่สมาชิกจดมาจาก `0-Before.md`
  หัวข้อ Known mistakes ใน `AGENTS.md` หรือสิ่งที่ AI เสนอแต่กลุ่มไม่รับใน `evidence/ws-03.md`
- ใช้ AI ช่วยร่างได้ แต่ทุกข้อต้องอธิบายได้ว่าป้องกันปัญหาอะไร

เพิ่มในหัวข้อ Rules ของ `AGENTS.md`

```markdown
- ทุกการแก้ไขเข้า `main` ผ่าน PR เท่านั้น ห้าม push เข้า `main` และห้ามใช้ force push
- 1 PR ทำ 1 เรื่องตาม `plan.md` หากต้องแก้ไฟล์นอกแผน ให้หยุดและเสนอแยกเป็น PR ใหม่
- AI agent ห้ามอนุมัติหรือ merge PR
- เมื่อถูกสั่งให้ review PR ให้ทำตาม `REVIEW.md` และห้ามแก้ไฟล์ใด ๆ
```

commit แล้วเปิด PR นี่คือ PR แรกที่ต้องผ่าน ruleset

**ผลที่ควรเห็น**

- PR แสดงว่า merge ไม่ได้จนกว่า check `build` ผ่านและมีผู้อนุมัติ 1 คน
- หลังได้รับอนุมัติและ CI ผ่าน PR ถูก merge
- `REVIEW.md` มีอย่างน้อย 2 ข้อที่มาจากประสบการณ์ของกลุ่ม

**หากติดปัญหา**

- ผู้เปิด PR กด Approve ไม่ได้: ถูกต้องแล้ว GitHub ไม่นับการอนุมัติจากผู้เปิด PR ให้สมาชิกอีกคนอนุมัติ
- ได้รับอนุมัติแล้วแต่ยัง merge ไม่ได้หลัง push commit เพิ่ม: การอนุมัติเดิมถูกยกเลิกตามกฎ Dismiss stale approvals ให้ขออนุมัติใหม่

---

## ขั้นตอนที่ 4 — intent, spec และ plan ของ `03-cancel`

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/03-cancel
mkdir -p docs/features/03-cancel
```

ทำตามลำดับเดียวกับ WS-02 และ WS-03 ใน branch เดียว

1. **intent.md** สมาชิก 1 คนเขียนเอง ไม่ใช้ AI ตามแบบฟอร์มใน WS-02
2. **spec.md** สั่ง AI ร่างด้วยคำสั่งเดียวกับขั้นตอนที่ 2 ของ WS-02 โดยเปลี่ยนชื่อ feature เป็น `03-cancel`
   แล้วกลุ่มตัดสินข้อกังวลทุกข้อในตารางการตัดสินใจ อย่างน้อยต้องตัดสิน
   - ยกเลิกเมื่อเหลือ 24 ชั่วโมงพอดีได้หรือไม่
   - ผู้ที่อยู่ในคิวสำรองยกเลิกได้หรือไม่ และคิวที่เหลือเลื่อนอย่างไร
   - ยกเลิกรายการที่ยกเลิกไปแล้ว หรือรายการของผู้อื่น ได้ผลอย่างไร
3. **openapi.yaml** สั่ง AI เพิ่ม endpoint ยกเลิกตาม spec แล้วรัน `npx --yes @redocly/cli@2 lint docs/openapi.yaml`
4. **plan.md** สั่ง AI ร่างด้วยคำสั่งเดียวกับขั้นตอนที่ 2 ของ WS-03 โดยเปลี่ยนชื่อ feature เป็น `03-cancel`

commit แล้วเปิด PR

**AI review ของ PR นี้** สมาชิกที่ไม่ได้เขียนไฟล์ใน PR นี้ทำ

```bash
git fetch origin
git switch docs/03-cancel
```

สั่ง AI agent

```
Read REVIEW.md and AGENTS.md. Review the changes in: git diff origin/main...HEAD
Follow REVIEW.md exactly. Do not change any file.
Write the findings in Thai as a Markdown list that I can paste into a PR comment.
```

นำผลไปวางเป็น comment ใน PR ผู้เขียนตอบทุกข้อ Important ว่าแก้หรือไม่แก้ พร้อมเหตุผล
จากนั้นผู้อนุมัติอ่านทั้งผลการ review และคำตอบ แล้วอนุมัติ

**ผลที่ควรเห็น**

- PR มี comment ผลการ review ที่ระบุรอบและระดับความรุนแรงตาม `REVIEW.md` ทุกข้อ
- ทุกข้อ Important มีคำตอบจากผู้เขียน
- PR ถูก merge และ CI ผ่านที่ขั้น lint ของ `openapi.yaml`

**หากติดปัญหา**

- ผลการ review ไม่ได้ทำตามรูปแบบใน `REVIEW.md`: สั่งใหม่โดยให้อ่าน `REVIEW.md` ก่อน หากยังไม่ได้ ให้ปรับ `REVIEW.md` ให้ชัดขึ้นใน PR แยก
- `git diff origin/main...HEAD` ไม่แสดงอะไร: ตรวจว่าอยู่บน branch ของ PR และรัน `git fetch origin` แล้ว
- AI review เสนอให้เปลี่ยนการตัดสินใจที่กลุ่มตัดสินแล้ว: ตอบใน PR ว่าไม่แก้ และอ้างถึงตารางการตัดสินใจ

---

## ขั้นตอนที่ 5 — test และ code ของ `03-cancel` ผ่านด่าน

**ทำ**

แบ่งเป็น 2 PR ตามกฎ คือ R4 ส่วนการยกเลิก และ R2 ทำตามลำดับเดียวกับขั้นตอนที่ 4 ของ WS-03

```bash
git switch main
git pull origin main
git switch -c test/cancel-r2
```

1. สร้าง function ว่างตาม `docs/features/03-cancel/plan.md` และเขียน test ใน `src/domain/cancel-r2.test.ts`
   อย่างน้อยต้องมีกรณีที่คิวสำรองมีหลายคนและผู้ที่ลงทะเบียนก่อนได้ที่นั่ง และกรณีที่คิวสำรองว่าง
2. commit `test: add R2 tests (red)` แล้ว push และเปิด PR รอให้ CI เป็นสีแดง
3. สั่ง AI เขียน code ให้ test ของ R2 ผ่านโดยห้ามแก้ test แล้ว commit `feat: implement R2` และ push
4. หลังจากกฎใน domain ผ่านแล้ว ให้ AI เพิ่ม route handler ยกเลิกตาม `openapi.yaml` ใน PR ของกฎที่ merge ทีหลัง
5. สมาชิกที่ไม่ได้เขียน code ทำ AI review ตามขั้นตอนที่ 4 แล้ววางผลเป็น comment
6. ผู้เขียนตอบทุกข้อ Important แก้ตามที่ตัดสิน แล้วขออนุมัติใหม่
7. merge แล้วจดเวลาสำหรับขั้นตอนที่ 7: เวลาที่เปิด PR, เวลาที่ merge และเวลาที่ deployment Production บน Vercel เสร็จ

ทดสอบการยกเลิกในเครื่องด้วย curl หลัง merge ครบทั้ง 2 PR โดยแทน path ด้วย path จริงใน `openapi.yaml`

```bash
npm run dev
```

1. ลงทะเบียนด้วยผู้ใช้จนกิจกรรมที่มี capacity น้อยเต็ม และมีผู้อยู่ในคิวสำรอง 2 คน
2. ยกเลิกรายการของผู้ที่ได้ที่นั่ง 1 คน
3. เรียกดูรายการลงทะเบียนของกิจกรรมนั้น

**ผลที่ควรเห็น**

- PR ของ R2 และ R4 มี commit ของ test ที่ CI เป็นสีแดง ตามด้วย commit ของ code ที่ CI เป็นสีเขียว
- ทั้ง 2 PR มี comment ผลการ AI review และคำตอบของผู้เขียน
- หลังยกเลิก ผู้ที่อยู่ในคิวสำรองลำดับแรกได้สถานะ `CONFIRMED` และอีกคนยังเป็น `WAITLISTED`

**หากติดปัญหา**

- ผู้ที่อยู่ในคิวสำรองลำดับที่สองได้ที่นั่งแทนลำดับแรก: code ไม่ได้เรียงตาม `createdAt` ให้เพิ่ม test ที่สร้างรายการโดยไม่เรียงตามเวลา แล้วให้ AI แก้ code
- AI review พบปัญหาที่ test ไม่ได้ตรวจ: เพิ่ม test ก่อนแก้ code ใน PR เดียวกัน
- deployment Production บน Vercel ไม่เริ่มหลัง merge: เปิดหน้า Deployments ของ project บน Vercel และตรวจว่าเชื่อมกับ branch `main`

---

## ขั้นตอนที่ 6 — เตรียม PR break-it-live

**ทำ**

```bash
git switch main
git pull origin main
git switch -c demo/broken-gate
```

ลบหรือ comment เงื่อนไขที่เลื่อนผู้อยู่ในคิวสำรองลำดับแรกให้ได้ที่นั่ง (R2) ใน `src/domain/`

```bash
git commit -am "test: break rule R2 on purpose"
git push -u origin demo/broken-gate
```

เปิด PR รอให้ `CI` เป็นสีแดงที่ขั้น `npm test`
**เปิด PR นี้ทิ้งไว้จนถึงคาบ demo** เพื่อให้ผู้ตรวจเห็นว่า merge ไม่ได้ แล้วจึงปิดโดยไม่ merge หลัง demo

**ผลที่ควรเห็น**

- CI ของ PR เป็นสีแดงที่ขั้น `npm test`
- ส่วน merge ของ PR แสดงว่า merge ถูกขวาง และปุ่ม merge กดไม่ได้

**หากติดปัญหา**

- ปุ่ม merge ยังกดได้: ruleset ไม่ได้บังคับ check `build` ให้กลับไปตรวจขั้นตอนที่ 2
- CI ยังเป็นสีเขียว: R2 ไม่มี test ป้องกันจุดที่ลบ ให้เพิ่ม test ตามขั้นตอนที่ 5

---

## ขั้นตอนที่ 7 — บันทึกหลักฐาน

**ทำ**

สร้าง branch `docs/evidence-04` และ `evidence/ws-04.md`

```markdown
# WS-04 Evidence

- Lead time ของ PR [ลิงก์ PR ของ 03-cancel ที่ merge ทีหลัง]
  - เปิด PR: [เวลา]
  - merge: [เวลา]
  - Production บน Vercel เสร็จ: [เวลา]
- เวลาที่ CI ใช้ใน PR นั้น: [นาที วินาที]
- Break-it-live: [ลิงก์ PR ที่ CI ไม่ผ่านและยังเปิดอยู่]
- ผลการ AI review ที่กลุ่มไม่ทำตาม:

| ข้อค้นพบ | ระดับ | เหตุผลที่ไม่ทำตาม |
|---|---|---|
| | | |
| | | |

- ข้อค้นพบของ AI review ที่ทำให้แก้ code หรือเพิ่ม test: [ลิงก์ commit]
```

commit แล้วเปิด PR ซึ่งต้องผ่านด่านเช่นเดียวกับ PR อื่น

**ผลที่ควรเห็น**

- `evidence/ws-04.md` มีครบทุกหัวข้อ และตาราง "ผลการ AI review ที่กลุ่มไม่ทำตาม" อย่างน้อย 2 แถว
- PR ของ evidence ถูก merge ผ่าน ruleset

**หากติดปัญหา**

- ไม่รู้เวลาที่ Production เสร็จ: เปิดหน้า Deployments ของ project บน Vercel หรือส่วน Deployments ที่ด้านขวาของหน้า repository บน GitHub
- AI review ทำตามได้ทุกข้อจนไม่มีแถวในตาราง: อ่านข้อ Nit อีกครั้ง หรือทำ AI review ของ PR นี้เพิ่ม แล้วบันทึกข้อที่ไม่ทำตาม

---

## Retro

ปรึกษากันในกลุ่ม แล้วบันทึกคำตอบสั้น ๆ ท้าย `evidence/ws-04.md`

1. ขั้นใดของด่านทำให้ lead time ยาวที่สุด และจะลดได้อย่างไรโดยไม่ข้ามด่าน
2. AI review พบสิ่งใดที่ CI และผู้อนุมัติไม่พบ และรายงานสิ่งใดผิด
3. ควรเพิ่มหรือตัดข้อใดใน `REVIEW.md` จากสิ่งที่เกิดขึ้นวันนี้
