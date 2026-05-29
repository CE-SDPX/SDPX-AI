# Lab: Refactoring & Code Quality

## เป้าหมาย
Refactor code จริงจาก project โดยใช้ AI เป็นเครื่องมือช่วย และ document การตัดสินใจด้วย ADR

---

## ขั้นตอนที่ 1 — Full Codebase Review ด้วย AI (30 นาที)

Run AI review ทั้ง codebase:
```
Review this codebase and provide a prioritized list of refactoring opportunities.
For each issue:
- File and line number
- Type of code smell
- Impact (High/Medium/Low)
- Suggested fix

[วาง code หรือ describe structure]
```

สร้าง `docs/refactoring-plan.md` รายการ issues ที่พบ เรียงตาม priority

**Review AI output ก่อน:**
- อะไรที่เห็นด้วย
- อะไรที่ไม่เห็นด้วยหรือ AI ไม่เข้าใจ context
- อะไรที่ AI พลาด

---

## ขั้นตอนที่ 2 — Refactor Module ที่แย่ที่สุด (45 นาที)

เลือก module จาก entry ticket และ refactor:

**ขั้นตอนบังคับ:**
1. ยืนยันว่ามี unit tests ครอบคลุม behavior ที่จะ refactor
2. ถ้าไม่มี — เขียน tests ก่อน (อย่า skip ขั้นตอนนี้)
3. Refactor ทีละ step เล็กๆ
4. Run tests หลังทุก step

**บันทึกการเปลี่ยนแปลง:**
```markdown
## Before
[code เดิม]

## Issues Found
- Long method: ทำหน้าที่ 3 อย่างในที่เดียว
- Magic number: 150 คืออะไร

## After
[code ใหม่]

## What AI Suggested vs What We Did
- AI: Extract 5 methods → เราทำ: Extract 3 methods (2 อันเล็กเกินไป)
- AI: Add design pattern X → เราไม่ทำ เพราะ overkill สำหรับขนาดนี้
```

---

## ขั้นตอนที่ 3 — เขียน ADR (20 นาที)

เขียน ADR 1 ฉบับสำหรับ technical decision ที่สำคัญที่สุดใน project:

สร้างไฟล์ `docs/adr/ADR-001-[topic].md` ตาม template:
```markdown
# ADR-[number]: [Title]

## Status
[Proposed / Accepted / Deprecated / Superseded]

## Context
[อธิบาย background และ problem ที่ต้องตัดสินใจ]

## Decision
[การตัดสินใจที่เลือก]

## Rationale
[เหตุผลที่เลือก และ alternatives ที่พิจารณาแล้วไม่เลือก]

## Consequences
[ผลที่ตามมา ทั้งดีและไม่ดี]
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `docs/refactoring-plan.md` | รายการ issues + priority + AI review analysis | GitHub repo |
| Refactored code | Module ที่ refactor พร้อม tests ยังผ่าน | GitHub repo |
| `docs/adr/ADR-001-*.md` | ADR 1 ฉบับ | GitHub repo |

### เกณฑ์ผ่าน
- Tests ยังผ่านทั้งหมดหลัง refactor
- Refactoring plan ระบุชัดว่าเห็นด้วย/ไม่เห็นด้วยกับ AI ตรงไหน
- ADR อธิบาย context, decision, และ rationale ครบ
