# Lecture: AI-DLC, Harness Mindset & First Deployment

## เวลา: 45 นาที

---

## 1. AI-Driven Development Lifecycle (15 นาที)

### ทำไม Traditional Agile ไม่พอในยุค AI

Agile ถูกออกแบบมาสำหรับ human-driven, week-long iterations มี "whitespace" — จุดที่ methodology ไม่ได้ define ชัดเจน ทำให้เกิด:
- Inconsistent architecture decisions ระหว่าง sprint
- Missing design documentation
- Context loss เมื่อ team member เปลี่ยน
- Quality issues จาก steps ที่ถูก skip เมื่อมี deadline

AI เปลี่ยน unit of work จาก **Sprint (2 สัปดาห์)** → **Bolt (ชั่วโมงหรือวัน)**

### Core Insight: AI Proposes, Human Validates

> เหมือน Google Maps — AI วาง route ให้ทุก step แต่คนขับเป็นคนตัดสินใจว่าจะไปทางไหน มีสิทธิ์เบี่ยงเส้นทางได้เสมอ

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
WS-01  ← AI-DLC overview (วันนี้)
WS-02  ← Inception: Intent → Units → Stories → Bolt Plan
WS-03  ← Construction: Test stage (unit tests)
WS-04  ← Construction: Acceptance test stage (E2E)
WS-05  ← Operations: Build stage (Docker)
WS-06  ← Operations: Deploy + Verify (CI/CD)
WS-07  ← Operations: Monitor (Performance)
WS-08  ← Construction: ADR + Refactoring
```

### 3 Artifacts ที่จะสร้างตลอด Course

```
memory-bank/
├── intent.md                    ← WS-02: "why we build this"
├── units/
│   └── [unit-name]/
│       └── unit-brief.md        ← WS-02: loosely-coupled modules
└── standards/
    └── tech-stack.md            ← วันนี้: tool decisions
```

ส่วน Stories → GitHub Issues, Bolt Plan → GitHub Projects, ADR → docs/adr/ (WS-08)

---

## 2. Harness Mindset (15 นาที)

### Harness คืออะไร

> **Harness = โครงสร้างใดๆ ที่ทำให้ system รันซ้ำได้, เชื่อถือได้, และตรวจสอบได้**

ใน AI-DLC: Memory Bank คือ harness ของ artifacts — ทำให้ AI มี context ที่ consistent ทุกครั้งที่ทำงาน

### Harness มีอยู่ทุกระดับ

```
[Performance Harness]   ← WS-07: k6, baseline, synthetic monitoring
[Pipeline Harness]      ← WS-06: CI/CD รัน harness ทั้งหมดอัตโนมัติ
[Environment Harness]   ← WS-05: Docker, reproducible environment
[E2E Harness]           ← WS-04: Playwright fixtures, seed data
[Unit Test Harness]     ← WS-03: test doubles, factories, isolation
[Contract Harness]      ← WS-02: OpenAPI spec
[Repo Harness]          ← WS-01: branch strategy, deploy pipeline (วันนี้)
```

### ทำไม Harness สำคัญ

**ไม่มี harness:**
- "Works on my machine" — พังใน environment อื่น
- Tests ที่รันทีไรก็ผลต่างกัน
- Deploy แล้วไม่รู้ว่า break อะไรไปบ้าง

**มี harness:**
- ทุกคนใน team รันได้เหมือนกัน
- ปัญหาถูกจับก่อนถึง production
- Refactor ได้อย่างมั่นใจ

---

## 3. AI Ethics & Skills (15 นาที)

### AI Ethics: เส้นแบ่งที่ต้องรู้

**ใช้ได้:**
- Scaffold boilerplate และ repetitive code
- อธิบาย error messages และ debug
- Suggest implementation approaches
- Generate test cases และ documentation
- Draft memory-bank artifacts

**ต้องระวัง:**
- อย่า commit code ที่อ่านไม่ออก — ถ้าอธิบายไม่ได้ ให้อ่านก่อนเสมอ
- อย่าส่ง API keys, passwords, personal data เข้า AI tools
- AI hallucinate API ที่ไม่มีจริงได้ — verify กับ official docs เสมอ
- AI-generated code มี security vulnerabilities ได้ — ต้อง review

**กฎทองของ course นี้:**
> "ถ้า oral defense ถามแล้วตอบไม่ได้ว่า code ทำอะไร — นั่นคือ code ที่ไม่ควร commit"

### Skills ที่ AI ทำแทนไม่ได้

| Skill | ทำไมสำคัญ |
|---|---|
| **Reading & explaining code** | oral defense วัดทักษะนี้โดยตรง |
| **Debugging systematically** | AI suggest fix แต่ไม่รู้ context จริงๆ |
| **Prompt engineering** | output ของ AI ดีแค่ไหนขึ้นกับ prompt |
| **AI output verification** | AI ผิดได้ — ต้องรู้ว่าผิดตรงไหน |
| **System thinking** | เข้าใจว่า components เชื่อมกันอย่างไร |
| **Technical communication** | present และ defend การตัดสินใจได้ |

### วิธีใช้ AI ให้ได้ทั้ง Speed และ Skill

```
❌ วิธีที่ทำให้ไม่ได้ skill:
   Prompt → Copy → Paste → Submit

✅ วิธีที่ได้ทั้ง speed และ skill:
   1. คิด design เองก่อน (5 นาที)
   2. ใช้ AI generate draft
   3. อ่านและ explain ทุก line ให้ตัวเองฟัง
   4. แก้ส่วนที่ไม่เข้าใจหรือไม่เห็นด้วย
   5. Commit เฉพาะ code ที่อธิบายได้
```

---

## Key Takeaways
- AI-DLC: AI proposes → human validates ทุก checkpoint — ไม่ใช่ let AI run ทุกอย่าง
- Harness สร้างทีละชั้นตลอด 8 ครั้ง — memory-bank/ คือ harness ของ artifacts
- Skills ที่สำคัญที่สุดคือสิ่งที่ AI ทำแทนไม่ได้
