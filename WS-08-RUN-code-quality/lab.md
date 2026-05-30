# Lab: Refactoring & Code Quality

## เวลา: 1.5 ชั่วโมง
## เป้าหมาย
Refactor code จริงจาก project โดยใช้ harness เป็น safety net และเขียน ADR

---

## ขั้นตอนที่ 1 — Full Codebase Review (20 นาที)

### ใช้ AI Review ทั้ง Codebase
```
Review this codebase and provide a prioritized refactoring plan.
For each issue found:
- File and approximate line number
- Type of code smell
- Impact if left unfixed: High/Medium/Low
- Suggested fix (concise)

Sort by impact (High first).
```

สร้าง `docs/refactoring-plan.md`:
```markdown
# Refactoring Plan

## High Priority
1. [file]: [issue] — [why it's a problem]
2. ...

## Medium Priority
...

## What AI Suggested vs What We'll Do
- Agree: [list]
- Disagree/Skip: [list + reasons]
```

---

## ขั้นตอนที่ 2 — Refactor Module (45 นาที)

### เลือก Module จาก Entry Ticket

**ขั้นตอนบังคับ (ห้ามข้าม):**

**Step 1: ยืนยัน Tests มีอยู่ก่อน**
```bash
# ต้องผ่านก่อน refactor
pytest tests/unit/test_[module].py -v
# ถ้าไม่มี tests → เขียนก่อน แล้วค่อย refactor
```

**Step 2: Refactor ทีละ Step**
```bash
# refactor เล็กๆ แล้ว run tests ทันที
# อย่า refactor ทีเดียว 100 lines แล้วค่อย test

git add -p  # stage ทีละ change
pytest      # ต้อง green ก่อน stage ต่อไป
```

**Step 3: Document Before/After**

สร้าง `docs/refactoring-[module].md`:
```markdown
## Function: [function_name]

### Before
\`\`\`python
# code เดิม
\`\`\`

### Issues Found
- Long method: ทำ 4 หน้าที่ในที่เดียว
- Magic number: 8 และ 150 ไม่มี context

### After
\`\`\`python
# code ใหม่
\`\`\`

### What AI Suggested
- Extract 6 methods → เราทำ 3 (3 อันเล็กเกินไป ไม่คุ้ม)
- Add Repository pattern → skip เพราะ overkill สำหรับขนาดนี้

### Tests Result
- Before: 5 tests pass
- After: 5 tests pass (+ 2 tests เพิ่มระหว่าง refactor)
```

---

## ขั้นตอนที่ 3 — เขียน ADR (15 นาที)

Architecture Decision Record บันทึกการตัดสินใจสำคัญ:

สร้าง `docs/adr/ADR-001-[topic].md`:
```markdown
# ADR-001: [Title]

## Status
Accepted

## Date
[วันที่]

## Context
[อธิบาย background — ทำไมถึงต้องตัดสินใจเรื่องนี้]

## Decision
[การตัดสินใจที่เลือก]

## Alternatives Considered
1. [Alternative A] — ไม่เลือกเพราะ [reason]
2. [Alternative B] — ไม่เลือกเพราะ [reason]

## Rationale
[เหตุผลที่เลือก decision นี้]

## Consequences
### Positive
- [ข้อดี]

### Negative / Trade-offs
- [ข้อเสียหรือ trade-off ที่ยอมรับ]
```

**ตัวอย่าง topics สำหรับ ADR:**
- Database choice (PostgreSQL vs MongoDB)
- Authentication strategy (JWT vs session)
- State management approach
- API design decision (REST vs GraphQL)

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `docs/refactoring-plan.md` | Full review + AI analysis | GitHub repo |
| Refactored code | Module ที่ refactor + tests ยังผ่าน | GitHub repo |
| `docs/refactoring-[module].md` | Before/after + AI vs team decisions | GitHub repo |
| `docs/adr/ADR-001-*.md` | ADR 1 ฉบับ | GitHub repo |

### เกณฑ์ผ่าน
- [ ] Tests ผ่านทั้งหมดหลัง refactor (harness เป็น safety net)
- [ ] Refactoring plan ระบุชัดว่าเห็นด้วย/ไม่เห็นด้วยกับ AI ตรงไหน
- [ ] ADR ครบทุก section โดยเฉพาะ alternatives considered
- [ ] ทุกคนในกลุ่มอธิบาย refactoring decisions ได้


---

## ขั้นตอนเพิ่มเติม: ADR ใน AI-DLC Framework

### เขียน ADR ด้วย AI-DLC Context

เมื่อเขียน ADR ให้ถามตัวเองว่า:

**1. AI propose อะไรสำหรับ decision นี้**
```
Prompt: "What are the options for [decision]? 
List pros and cons of each for a university [domain] system 
with [constraints from tech-stack.md]."
```

**2. Human validate อะไร**
- Option ไหนที่ AI propose แต่ไม่เหมาะกับ context จริงๆ
- Constraint อะไรที่ AI ไม่รู้ (เช่น team skills, existing infrastructure)
- Trade-off อะไรที่ AI ประเมินต่างจาก human

**3. Document ทั้ง AI proposal และ human decision**
```markdown
## AI-DLC Note
AI proposed: [Option A] เพราะ [reason]
Human decided: [Option B] เพราะ [human context ที่ AI ไม่รู้]
```

### ตัวอย่าง ADR Topics สำหรับ Campus Service

- **ADR-001:** Database selection (PostgreSQL vs SQLite vs MongoDB)
- **ADR-002:** Authentication strategy (JWT vs session-based)
- **ADR-003:** API design (REST vs GraphQL)
- **ADR-004:** State management (server-side vs client-side)
- **ADR-005:** Deployment strategy (monolith vs microservices)

เลือก 1 topic ที่กลุ่มได้ตัดสินใจจริงๆ ใน course นี้ และ document ว่า AI propose อะไร human ตัดสินใจอย่างไร
