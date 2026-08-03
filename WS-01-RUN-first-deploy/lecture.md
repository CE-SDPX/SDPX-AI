# Lecture: AI-DLC, Loop Engineering & First Deployment

## เวลา: 45 นาที

---

## 1. AI-Driven Development Lifecycle (12 นาที)

### ทำไม Traditional Agile ไม่พอในยุค AI

Agile ถูกออกแบบมาสำหรับ human-driven, week-long iterations จึงมี "whitespace" —
จุดที่ methodology ไม่ได้ define ชัดเจน แล้วปล่อยให้ทีมเติมเอง ผลคือ:

- Inconsistent architecture decisions ระหว่าง sprint
- Missing design documentation
- Context loss เมื่อ team member เปลี่ยน
- Quality issues จาก steps ที่ถูก skip เมื่อมี deadline

พอ AI เขียน code ได้ในหลักนาที ต้นทุนของการ "ลงมือทำ" ลดลงมหาศาล
แต่ต้นทุนของการ **ตัดสินใจผิดแล้วไม่รู้ตัว** เท่าเดิมหรือแพงขึ้น
unit of work จึงย่อจาก **Sprint (2 สัปดาห์)** → **Bolt (ชั่วโมงหรือวัน)**

### Core Insight: AI Proposes, Human Validates

> เหมือน Google Maps — AI วาง route ให้ทุก step แต่คนขับเป็นคนตัดสินใจว่าจะไปทางไหน
> มีสิทธิ์เบี่ยงเส้นทางได้เสมอ และเป็นคนรับผิดชอบเมื่อไปผิดที่

### 3 Phases ของ AI-DLC

```
Inception          Construction         Operations
─────────────      ─────────────────    ──────────────
Intent Capture     Domain Model         Build
Requirement        Technical Design     Deploy
Elaboration        ADR                  Verify
Unit Decompose     Implement            Monitor
Bolt Planning      Test
```

| Phase | AI ทำอะไร | Human ทำอะไร |
|---|---|---|
| **Inception** | propose requirements, decompose units | validate, push back, approve |
| **Construction** | generate code, tests, ADR drafts | review, approve each stage |
| **Operations** | generate configs, runbooks | verify, monitor |

### Map กับ Course นี้

```
WS-01  ← AI-DLC + Loop Engineering overview (วันนี้)
WS-02  ← Inception: Intent → Units → Stories → Bolt Plan
WS-03  ← Construction: Test stage (unit tests)
WS-04  ← Construction: Acceptance test stage (E2E)
WS-05  ← Operations: Build stage (Docker)
WS-06  ← Operations: Deploy + Verify (CI/CD)
WS-07  ← Operations: Monitor (Performance & Observability)
WS-08  ← Construction: ADR + Refactoring
```

---

## 2. Loop Engineering (18 นาที)

### จาก Entry Ticket

เปิดคำตอบข้อ 2 ที่นักศึกษาส่งมา (anonymized) — "กว่าจะรู้ว่าเขียนผิดใช้เวลานานแค่ไหน"
คำตอบมักกระจายตั้งแต่ "2 วินาที เพราะ editor ขีดแดง" ไปจนถึง "อาทิตย์หนึ่ง เพราะเพื่อนมาบอก"
ช่องว่างระหว่างสองอันนี้แหละคือสิ่งที่วิชานี้ทั้งวิชาพยายามลด

### นิยาม

> **Loop Engineering** = การออกแบบวงจร feedback ให้ **สั้น เชื่อถือได้ และรันซ้ำได้**
> เพื่อให้ทั้งมนุษย์และ AI agent รู้ให้เร็วที่สุดว่าสิ่งที่เพิ่งทำไปนั้นถูกหรือผิด

```
   ┌──────────────────────────────────────────────┐
   ↓                                              │
Context ──→ Plan ──→ Act ──→ Verify ──→ Feedback ─┘
(รู้อะไร)  (จะทำ)  (ลงมือ)  (ตรวจ)    (แก้/เรียนรู้)
```

ทุกอย่างในวิชานี้ — test, Docker, CI/CD, k6, code review — คือความพยายามทำให้
ขั้น **Verify** เร็วขึ้น จริงขึ้น และครอบคลุมขึ้น

### วัด Loop ด้วย 3 ตัวเลข

| คุณสมบัติ | คำถาม | ตัวอย่างที่แย่ | ตัวอย่างที่ดี |
|---|---|---|---|
| **Latency** | กว่าจะรู้ผลใช้เวลาเท่าไร | รอ user แจ้ง bug 3 วันให้หลัง | unit test เขียว/แดงใน 2 วินาที |
| **Fidelity** | signal บอกความจริงแค่ไหน | test ที่ผ่านตลอดไม่ว่า code จะพังแค่ไหน | test ที่แดงทันทีเมื่อลบ business rule |
| **Coverage** | จับความผิดพลาดได้กี่แบบ | ตรวจแค่ happy path | ตรวจ error case + integration + performance |

**ข้อควรระวัง — Fidelity สำคัญกว่า Latency:** loop ที่เร็วแต่โกหก
อันตรายกว่าไม่มี loop เลย เพราะมันทำให้เรา (และ AI) มั่นใจผิด ๆ

### Loop ทั้ง 8 ชั้นที่จะสร้างในวิชานี้

```
WS-08  Quality Loop        review → refactor → verify → ADR
WS-07  Production Loop     measure → analyze → optimize → measure
WS-06  Integration Loop    CI/CD รวมทุก loop ให้เป็น gate เดียว
WS-05  Environment Loop    compose up แล้วได้ผลเหมือนกันทุกเครื่อง
WS-04  Acceptance Loop     user journey → E2E → report   [E2E Test Harness]
WS-03  Unit Test Loop      red → green → refactor        [Unit Test Harness]
WS-02  Spec Loop           intent → story → API contract → review
WS-01  Deploy Loop         commit → build → deploy → เห็นของจริงบน URL  ← วันนี้
```

> **คำศัพท์:** *Test Harness* เป็นคำเฉพาะของฝั่ง testing — หมายถึงโครงสร้างรอบ test
> (test doubles, fixtures, factories, seed data, page objects) ที่ทำให้ test รันซ้ำได้ผลเดิม
> ในวิชานี้ใช้คำนี้เฉพาะ WS-03 และ WS-04 ส่วนสัปดาห์อื่นเราเรียกว่า *loop*

### ทำไม Loop ถึงสำคัญกว่าเดิมมากในยุค AI

AI coding agent **ทำงานเป็น loop อยู่แล้ว** ทุกตัว:

```
อ่าน context (repo, AGENTS.md, error ก่อนหน้า)
   → เสนอแผน
   → แก้ไฟล์
   → รันคำสั่ง (test / lint / typecheck)
   → อ่าน output
   → แก้ใหม่  ↺  จนกว่าสัญญาณจะเขียว
   → หยุดให้ human review          ← checkpoint
```

จากตรงนี้จะเห็นข้อสรุปที่เป็นหัวใจของทั้งวิชา:

> **ความสามารถของ AI agent ถูกจำกัดด้วยคุณภาพของขั้น Verify ที่เราสร้างให้มัน**

- ไม่มี test → agent ไม่มีทางรู้ว่าตัวเองทำพัง มันจะรายงานว่า "เสร็จแล้ว" ทุกครั้ง
- test อ่อน (fidelity ต่ำ) → agent จะ "แก้" จนกว่า test ผ่าน ซึ่งบางทีแปลว่าแก้ test ไม่ใช่แก้ code
- test ช้า → agent วนได้น้อยรอบต่อเวลา คุณภาพตกตาม

จาก homework: คนที่ให้ agent รัน pytest ได้เอง ใช้รอบน้อยกว่าและได้ code ที่ถูกกว่า
คนที่ต้อง copy error ไปวางเอง — เพราะ loop ของสองกลุ่มนี้ latency ต่างกันสิบเท่า

### กติกาที่ตามมา 3 ข้อ

1. **สร้าง Verify ก่อนเร่ง Act** — อย่าเพิ่งให้ AI เขียน 500 บรรทัด ถ้ายังไม่มีอะไรตรวจได้
2. **ปิด loop ให้ครบก่อนขยาย** — ทำ commit → deploy → เห็นผลให้ได้ก่อน แล้วค่อยเพิ่ม feature
3. **Human checkpoint คือส่วนหนึ่งของ loop ไม่ใช่ส่วนเกิน** — agent หยุดให้คนดูตรงไหน คือสิ่งที่เราออกแบบ

### Deploy Loop ของวันนี้

```
เขียน code → git push → build อัตโนมัติ → ได้ URL จริง → เปิดดู
```

เป้าหมายของ lab: ทำให้ loop นี้ **ปิดครบและวัดเวลาได้** ก่อนออกจากห้อง
ตัวเลขที่จะจดคือ *commit-to-live time* — จาก push ถึงเห็นของบน URL ใช้เวลากี่นาที
สัปดาห์ต่อ ๆ ไปเราจะเพิ่มด่านตรวจเข้าไปใน loop นี้โดยพยายามไม่ให้เวลาบานปลาย

---

## 3. Context Engineering, Ethics & Skills (15 นาที)

### จาก Prompt Engineering สู่ Context Engineering

การเขียน prompt เก่ง ๆ ช่วยได้ แต่ผลลัพธ์ถูกกำหนดโดย **สิ่งที่อยู่ใน context window ณ ตอนนั้น**
มากกว่าถ้อยคำที่พิมพ์เข้าไป

> **Context Engineering** = การจัดการว่า *ข้อมูลอะไร* ควรอยู่ใน context ของ AI
> *ตอนไหน* และ *มากแค่ไหน* เพื่อให้มันตัดสินใจได้ถูก

หลักปฏิบัติ 4 ข้อ:

| หลัก | ความหมาย | ในวิชานี้คือ |
|---|---|---|
| **เขียนไว้ให้อ่านซ้ำได้** | อย่าเล่าเรื่องเดิมทุก session | `AGENTS.md`, `memory-bank/` |
| **ให้เท่าที่จำเป็น** | context ยาวเกินทำให้ AI หลงประเด็น | ชี้ไฟล์ที่เกี่ยว ไม่ใช่ทั้ง repo |
| **ให้ของจริง ไม่ใช่คำบรรยาย** | error log จริงดีกว่าคำว่า "มันพัง" | วาง output ของ test ตรง ๆ |
| **ตัดของเก่าที่ไม่จริงแล้ว** | context ที่ล้าสมัยทำให้ AI มั่นใจผิด | อัปเดต ADR/spec เมื่อเปลี่ยนใจ |

### AGENTS.md — Context ระดับ Repo

`AGENTS.md` เป็นไฟล์มาตรฐาน (agents.md) ที่วางไว้ที่ root ของ repo
agent ส่วนใหญ่จะอ่านให้อัตโนมัติ — เหมือน README แต่เขียนให้เครื่องอ่าน

```markdown
# AGENTS.md

## Project
ระบบจองห้องเรียนสำหรับนักศึกษา — ดู memory-bank/intent.md

## Commands
- install: `npm ci`
- dev: `npm run dev`
- test: `npm test`          ← ต้องเขียวก่อนเสนอ diff เสมอ
- lint: `npm run lint`

## Conventions
- TypeScript strict mode ห้ามใช้ `any`
- ใช้ `data-testid` สำหรับ element ที่ E2E ต้องอ้างถึง
- Commit ตาม Conventional Commits

## Rules
- ห้ามแก้ไฟล์ใน `docs/adr/` โดยไม่ถามก่อน
- ห้ามใส่ค่า secret ลงในไฟล์ใด ๆ ให้ใช้ env var เท่านั้น
- ถ้า test แดง ให้แก้ code ห้ามแก้ test เพื่อให้ผ่าน
```

> บรรทัดสุดท้ายสำคัญที่สุด — มันคือการป้องกัน agent จาก "ทางลัด" ที่ทำลาย fidelity ของ loop

### AI Ethics: เส้นแบ่งที่ต้องรู้

**ใช้ได้:**
- Scaffold boilerplate และ repetitive code
- อธิบาย error messages และช่วย debug
- เสนอ implementation approaches หลาย ๆ ทางให้เลือก
- Generate test cases และ documentation
- Draft artifacts ใน memory-bank

**ต้องระวัง:**
- อย่า commit code ที่อ่านไม่ออก — ถ้าอธิบายไม่ได้ ให้อ่านก่อนเสมอ
- อย่าส่ง API keys, passwords, personal data เข้า AI tools
- AI hallucinate API ที่ไม่มีจริงได้ — verify กับ official docs เสมอ
- AI-generated code มี security vulnerabilities ได้ — ต้อง review
- ระวัง **automation bias**: ยิ่ง AI ตอบคล่องเท่าไร คนยิ่งตรวจน้อยลงเท่านั้น

**กฎทองของ course นี้:**
> "ถ้า oral defense ถามแล้วตอบไม่ได้ว่า code ทำอะไร — นั่นคือ code ที่ไม่ควร commit"

### Skills ที่ AI ทำแทนไม่ได้

| Skill | ทำไมสำคัญ |
|---|---|
| **Reading & explaining code** | oral defense วัดทักษะนี้โดยตรง |
| **Debugging systematically** | AI เสนอ fix ได้ แต่ไม่รู้ context จริงของระบบ |
| **Context engineering** | output ของ AI ดีแค่ไหนขึ้นกับ context ที่เราจัดให้ |
| **Designing the verify step** | ตัดสินใจว่าอะไรคือหลักฐานว่า "ถูก" — AI ตัดสินแทนไม่ได้ |
| **AI output verification** | AI ผิดได้ — ต้องรู้ว่าผิดตรงไหนและทำไม |
| **System thinking** | เข้าใจว่า components เชื่อมกันอย่างไร |
| **Technical communication** | present และ defend การตัดสินใจได้ |

### วิธีใช้ AI ให้ได้ทั้ง Speed และ Skill

```
❌ วิธีที่ทำให้ไม่ได้ skill:
   Prompt → Copy → Paste → Submit

✅ วิธีที่ได้ทั้ง speed และ skill:
   1. คิด design เองก่อน (5 นาที) — เขียน 3 บรรทัดว่าจะทำอะไร
   2. เตรียม verify ก่อน — จะรู้ได้อย่างไรว่าถูก
   3. ใช้ AI generate draft
   4. อ่านและ explain ทุก line ให้ตัวเองฟัง
   5. แก้ส่วนที่ไม่เข้าใจหรือไม่เห็นด้วย
   6. Commit เฉพาะ code ที่อธิบายได้
```

---

## Key Takeaways
- AI-DLC: AI proposes → human validates ทุก checkpoint — ไม่ใช่ปล่อย AI วิ่งเอง
- Loop Engineering คือแกนของวิชานี้ — วัดที่ latency, fidelity, coverage
- คุณภาพของ AI agent ถูกจำกัดด้วยคุณภาพของขั้น Verify ที่เราสร้างให้มัน
- Context Engineering (`AGENTS.md`, memory-bank) สำคัญกว่าการเขียน prompt สวย ๆ
- Skills ที่สำคัญที่สุดคือสิ่งที่ AI ทำแทนไม่ได้ โดยเฉพาะ "ออกแบบว่าอะไรคือหลักฐานว่าถูก"
