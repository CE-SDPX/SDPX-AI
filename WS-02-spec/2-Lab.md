# WS-02 · Lab — Spec Loop

**รูปแบบ:** งานกลุ่ม ใช้ repository เดิมของกลุ่มจาก WS-01

**เป้าหมาย:** feature `01-events` และ `02-register` มี intent ที่กลุ่มเขียนเอง มี spec ที่ไม่เหลือข้อกังวลที่ยังไม่ได้ตัดสิน
มี `openapi.yaml` ที่ CI ตรวจรูปแบบทุกครั้ง และมี ADR-001 บันทึกการตัดสินใจเรื่องการเก็บข้อมูล

บทนี้ยังไม่เขียน code ของ feature งานทั้งหมดเป็นเอกสารที่บทที่ 3 จะใช้เป็นเกณฑ์ตรวจ code

---

## สิ่งที่ต้องมีก่อนเริ่ม

- WS-01 เสร็จแล้ว: CI ของ `main` เป็นสีเขียว และ Live URL เปิดได้
- ทุกคนทำ `0-Before.md` ส่วน B และ C เสร็จแล้ว และนำคำถามเกี่ยวกับกฎ R1–R6 มาด้วย

ตั้งแต่บทนี้ การแก้ไขทุกอย่างทำบน branch แยกและเข้า `main` ผ่าน PR ที่สมาชิกอีกคนเป็นผู้อนุมัติ

---

## โครงสร้าง repository ที่จะได้เมื่อจบบทนี้

แสดงเฉพาะไฟล์ที่เพิ่มหรือแก้ในบทนี้ ตัวเลขหลังชื่อไฟล์คือขั้นตอนที่สร้างหรือแก้ไฟล์นั้น

```
sdpx-[ชื่อกลุ่ม]/
├── AGENTS.md                        ← 6 เพิ่มกติกาเรื่อง spec และ ADR
├── docs/
│   ├── openapi.yaml                 ← 4
│   ├── adr/
│   │   └── ADR-001-data-storage.md  ← 5
│   └── features/
│       ├── 01-events/
│       │   ├── intent.md            ← 1
│       │   └── spec.md              ← 2 และ 3
│       └── 02-register/
│           ├── intent.md            ← 1
│           └── spec.md              ← 2 และ 3
├── evidence/
│   └── ws-02.md                     ← 7
└── .github/workflows/ci.yml         ← 6 เพิ่มขั้นตรวจ openapi.yaml
```

---

## ขั้นตอนที่ 1 — เขียน intent ด้วยคำของกลุ่มเอง

**ทำ**

แบ่งสมาชิกให้แต่ละ feature มีผู้เขียนอย่างน้อย 1 คน **เขียนเองโดยไม่ใช้ AI**
intent ของ `01-events` จะสั้นกว่า เพราะมีกฎน้อยกว่า

```bash
git switch main
git pull origin main
git switch -c docs/intent-02-register
mkdir -p docs/features/02-register
```

สร้าง `docs/features/02-register/intent.md`

```markdown
# Intent: [ชื่อ feature]

ผู้เขียน: [ชื่อ]
วันที่: [วันที่]

## ปัญหา
[ผู้ใช้กลุ่มใดเจอปัญหาอะไร 2–3 ประโยค]

## สิ่งที่ผู้ใช้ต้องทำได้
- [ ... ]

## เมื่อใดจึงถือว่าสำเร็จ
- [สิ่งที่ผู้ใช้เห็นหรือวัดได้ เช่น ผู้เข้าร่วมเห็นสถานะของตนทันทีหลังลงทะเบียน]

## กฎที่เกี่ยวข้อง
[รหัสกฎจาก PROJECT.md เช่น R1, R3]

## สิ่งที่ไม่ทำใน feature นี้
- [ ... ]
```

```bash
git add docs/features/02-register/intent.md
git commit -m "docs: add intent for 02-register"
git push -u origin docs/intent-02-register
```

เปิด PR แล้วให้สมาชิกที่ไม่ใช่ผู้เขียนเป็นผู้อนุมัติ ผู้อนุมัติต้องเข้าใจ intent ได้โดยไม่ต้องถามผู้เขียน
ทำแบบเดียวกันกับ `01-events` บน branch `docs/intent-01-events`

**ผลที่ควรเห็น**

- PR ของ intent ทั้ง 2 feature ถูก merge โดยผู้อนุมัติที่ไม่ใช่ผู้เขียน
- intent แต่ละไฟล์ยาวไม่เกิน 1 หน้า และไม่มีชื่อ endpoint ชื่อตาราง หรือชื่อ library

**หากติดปัญหา**

- ไม่รู้จะเริ่มเขียนอย่างไร: อ่าน `PROJECT.md` หัวข้อ 1–2 แล้วเขียนจากมุมของผู้ใช้ ไม่ใช่มุมของ code
- เขียนแล้วมีชื่อ endpoint หรือ status code: เรื่องเหล่านี้เป็นของ spec ให้ลบออกจาก intent

---

## ขั้นตอนที่ 2 — ให้ AI ร่าง spec พร้อมข้อกังวล

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/spec-02-register
```

สั่ง AI agent

```
Read AGENTS.md, PROJECT.md and docs/features/02-register/intent.md.
Write docs/features/02-register/spec.md in Thai with these sections:
1. Scope
2. Rules (refer to the rule codes in PROJECT.md)
3. Behaviour: Given / When / Then for each rule, including the error cases
4. API endpoints: method, path, request body, success response,
   and every error response with its status code and error code
5. Permissions: a table of which role can call each endpoint
6. Edge cases
7. Open questions: every point that the intent and PROJECT.md do not decide
Use one error format for the whole system: { "code": string, "message": string }.
Do not decide the open questions yourself. Do not create or change any other file.
```

ทำแบบเดียวกันกับ `01-events`

**ผลที่ควรเห็น**

- `spec.md` มีครบ 7 หัวข้อ และหัวข้อ Open questions มีรายการให้กลุ่มตัดสิน
- `git status` แสดงเฉพาะไฟล์ `spec.md` ที่เพิ่มขึ้น

**หากติดปัญหา**

- AI ตัดสินข้อกังวลเอง เช่น เขียนว่า "สมมติว่า..." ไว้ในเนื้อหา: สั่งให้ย้ายข้อสมมติทั้งหมดไปไว้ในหัวข้อ Open questions
- AI แก้ไฟล์อื่น หรือเขียน code: ปฏิเสธการแก้ไขนั้น และย้ำข้อห้ามในคำสั่ง
- spec ยาวเกินจนอ่านไม่ไหว: สั่งให้เขียน Given / When / Then เพียงกรณีละ 1 ชุด

---

## ขั้นตอนที่ 3 — ตัดสินข้อกังวล

**ทำ**

นำคำถามที่สมาชิกเตรียมมาจาก `0-Before.md` เพิ่มเข้าไปในรายการ Open questions
จากนั้นกลุ่มตัดสินทุกข้อ แล้วแทนหัวข้อ Open questions ด้วยตารางการตัดสินใจ

```markdown
## การตัดสินใจ

| คำถาม | ตัดสินใจ | เหตุผล | ผู้ตัดสิน |
|---|---|---|---|
| | | | |
```

เมื่อตัดสินครบแล้ว สั่ง AI agent ให้ปรับเนื้อหาตามการตัดสินใจ

```
Update docs/features/02-register/spec.md so that every section follows
the decisions table. Do not change the decisions table.
```

อ่านส่วนที่ AI แก้ทุกส่วนก่อน commit แล้วเปิด PR ให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- ไม่เหลือข้อกังวลที่ยังไม่ได้ตัดสิน และทุกข้อมีเหตุผลกับชื่อผู้ตัดสิน
- กลุ่มเลือก status code ของกรณีผิดกฎ (`409` หรือ `422`) แบบเดียวทั้งระบบ และบันทึกไว้ในตาราง
- PR ของ spec ทั้ง 2 feature ถูก merge

**หากติดปัญหา**

- สมาชิกเห็นไม่ตรงกัน: เลือกทางที่เขียน test ตรวจได้ง่ายกว่า แล้วบันทึกอีกทางไว้ในช่องเหตุผล
- คำถามเป็นเรื่องที่ต้องเปลี่ยนกฎใน `PROJECT.md`: กลุ่มเปลี่ยนเองไม่ได้ ให้ถามผู้สอน แล้วบันทึกคำตอบไว้ในตาราง

---

## ขั้นตอนที่ 4 — สร้าง `docs/openapi.yaml` จาก spec

**ทำ**

สร้าง branch `docs/openapi` แล้วสั่ง AI agent

```
Read docs/features/01-events/spec.md and docs/features/02-register/spec.md.
Write docs/openapi.yaml (OpenAPI 3.1) that contains every endpoint in the specs,
with request and response schemas and every error response listed in the specs.
Use one shared Error schema with the fields code and message.
Then run: npx --yes @redocly/cli@2 lint docs/openapi.yaml
and fix every error. Do not change any spec.md.
```

จากนั้นตรวจเองว่า endpoint ทุกรายการในหัวข้อ API endpoints ของ spec ทั้ง 2 ไฟล์ มีอยู่ใน `openapi.yaml`
ทั้ง status code ของกรณีสำเร็จและกรณีผิดพลาด

**ผลที่ควรเห็น**

- `npx --yes @redocly/cli@2 lint docs/openapi.yaml` แสดง `Your API description is valid` (มี warning ได้)
- endpoint และ status code ใน `openapi.yaml` ตรงกับ spec ครบทุกรายการ

**หากติดปัญหา**

- error `security-defined`: เพิ่มการกำหนดวิธียืนยันตัวตนไว้ระดับบนของไฟล์

  ```yaml
  security:
    - session: []
  components:
    securitySchemes:
      session:
        type: apiKey
        in: cookie
        name: session
  ```

- warning `no-server-example.com` เมื่อใช้ `http://localhost:3000`: เป็นเพียง warning ไม่ต้องแก้
- `openapi.yaml` มี endpoint ที่ไม่มีใน spec: ลบออก หรือย้อนไปตัดสินในขั้นตอนที่ 3 ว่าจะเพิ่มเข้า spec หรือไม่
- error เรื่องย่อหน้า: เปิดไฟล์ใน VS Code ที่มี extension YAML เพื่อดูบรรทัดที่ผิด

---

## ขั้นตอนที่ 5 — เขียน ADR-001

**ทำ**

สร้าง branch `docs/adr-001` และไฟล์ `docs/adr/ADR-001-data-storage.md`
หัวข้อคือ **เก็บข้อมูลอย่างไรก่อนถึงบทที่ 5** ทางเลือกอย่างน้อย 3 ทางตามที่เรียนใน lecture

```markdown
# ADR-001: วิธีเก็บข้อมูลก่อนถึงบทที่ 5

สถานะ: ใช้อยู่
วันที่: [วันที่]

## บริบท
[เหตุใดต้องตัดสินตอนนี้ และมีข้อจำกัดอะไร]

## ทางเลือกที่พิจารณา
1. เก็บในหน่วยความจำ — ข้อดี / ข้อเสีย
2. SQLite — ข้อดี / ข้อเสีย
3. PostgreSQL ที่ให้บริการภายนอก — ข้อดี / ข้อเสีย

## การตัดสินใจ
[เลือกทางใด]

## ผลที่ตามมา
[ผลต่อ unit test ในบทที่ 3 ผลต่อข้อมูลบน Live URL และความเสี่ยงที่ยอมรับ]
```

ใช้ AI ช่วยหาข้อดีข้อเสียได้ แต่การตัดสินใจและเหตุผลต้องเขียนเอง

**ผลที่ควรเห็น**

- ADR มีทางเลือกอย่างน้อย 3 ทาง พร้อมเหตุผลที่ไม่เลือกทางอื่น
- หัวข้อผลที่ตามมาระบุผลต่อข้อมูลบน Live URL

**หากติดปัญหา**

- ไม่แน่ใจว่าทางเลือกใดใช้บน Vercel ได้: ดูเอกสาร Vercel ที่อ้างถึงใน lecture แล้วจดสิ่งที่ยังไม่แน่ใจเป็นความเสี่ยงในหัวข้อผลที่ตามมา
- เลือก PostgreSQL ภายนอก: ห้าม commit ค่า `DATABASE_URL` จริง ให้ใส่ใน environment variable ของ Vercel และเพิ่มชื่อตัวแปรใน `.env.example` เท่านั้น

---

## ขั้นตอนที่ 6 — เพิ่มขั้นตรวจใน CI และกติกาใน `AGENTS.md`

**ทำ**

สร้าง branch `ci/openapi-lint`

เพิ่มบรรทัดสุดท้ายใน `.github/workflows/ci.yml` ต่อจาก `npm run build`

```yaml
      - run: npm run build
      - run: npx --yes @redocly/cli@2 lint docs/openapi.yaml
```

เพิ่มในหัวข้อ Rules ของ `AGENTS.md`

```markdown
- ก่อนเขียน code ของ feature ให้อ่าน `docs/features/[feature]/spec.md`
- หาก code ต้องทำงานต่างจาก spec ให้หยุดและเสนอการแก้ spec ก่อน ห้ามเขียน code ที่ต่างจาก spec โดยไม่แจ้ง
- ห้ามแก้ไฟล์ใน `docs/adr/` หากต้องเปลี่ยนการตัดสินใจ ให้เขียน ADR ฉบับใหม่
```

commit แล้วเปิด PR ให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- CI ของ PR มีขั้น `npx --yes @redocly/cli@2 lint docs/openapi.yaml` และเป็นสีเขียว
- เมื่อถาม AI agent ว่า "ถ้าจะเขียน code ลงทะเบียน ต้องอ่านไฟล์ใดก่อน" agent ตอบ `docs/features/02-register/spec.md`

**หากติดปัญหา**

- CI ไม่ผ่านที่ขั้น lint แต่ในเครื่องผ่าน: ตรวจว่า `docs/openapi.yaml` ฉบับล่าสุดถูก commit แล้ว
- CI ไม่ทำงาน: ตรวจย่อหน้าของบรรทัดที่เพิ่มว่าตรงกับบรรทัด `- run:` ก่อนหน้า

---

## ขั้นตอนที่ 7 — เตรียมหลักฐาน

### 7.1 เวลาจาก intent ถึง spec

ดูเวลาที่ไฟล์ถูกเพิ่มครั้งแรกจากประวัติของ git

```bash
git log --diff-filter=A --format="%ci %s" -- docs/features/02-register/intent.md
git log --diff-filter=A --format="%ci %s" -- docs/features/02-register/spec.md
```

### 7.2 เตรียม PR break-it-live

```bash
git switch main
git pull origin main
git switch -c demo/broken-spec
```

เปิด `docs/openapi.yaml` แล้วแก้คำว่า `responses:` ของ endpoint ใดก็ได้ 1 ตำแหน่ง ให้เป็น `respones:`

```bash
git commit -am "test: break the API spec on purpose"
git push -u origin demo/broken-spec
```

เปิด PR รอให้ `CI` เป็นสีแดงที่ขั้น lint แล้ว **ปิด PR โดยไม่ merge**

### 7.3 บันทึกใน `evidence/ws-02.md`

```markdown
# WS-02 Evidence

- เวลาจาก intent ถึง spec (02-register): [เวลา commit ของ intent] → [เวลา commit ของ spec]
- จำนวนข้อกังวลที่ AI พบ: [จำนวน]
- จำนวนข้อกังวลที่สมาชิกพบเองแต่ AI ไม่พบ: [จำนวน]
- Break-it-live: [ลิงก์ PR ที่ CI ไม่ผ่านและปิดแล้ว]
- สิ่งที่ AI เสนอแต่กลุ่มไม่รับ:

| AI เสนอ | เหตุผลที่ไม่รับ |
|---|---|
| | |
| | |
```

**ผลที่ควรเห็น**

- PR break-it-live แสดง `CI` เป็นสีแดงที่ขั้น lint และปิดแล้ว
- `evidence/ws-02.md` มีครบทุกหัวข้อ และตาราง "AI เสนอแต่ไม่รับ" อย่างน้อย 2 แถว

**หากติดปัญหา**

- คำสั่ง `git log` ไม่แสดงผล: ตรวจ path ของไฟล์ และดึง `main` ล่าสุดด้วย `git pull origin main`
- CI ของ PR break-it-live ไม่ขึ้นสีแดง: รัน `npx --yes @redocly/cli@2 lint docs/openapi.yaml` ในเครื่องเพื่อยืนยันว่าแก้คำผิดแล้วจริง

---

## Retro

ปรึกษากันในกลุ่ม แล้วบันทึกคำตอบสั้น ๆ ท้าย `evidence/ws-02.md`

1. ข้อกังวลข้อใดที่หากไม่ได้ตัดสินในบทนี้ จะกลายเป็น bug ในบทถัดไป
2. ขั้นตรวจของบทนี้ (PR และ lint) ตรวจอะไรได้ และตรวจอะไรไม่ได้
3. ขั้นตอนใดในวันนี้ยังทำด้วยมือ และควรเปลี่ยนเป็นการตรวจอัตโนมัติในบทใด
