# Lab: Requirements & API Design

## เป้าหมาย
สร้าง user stories ที่ testable ได้, วาด architecture diagram, และเขียน OpenAPI spec ของ project ตัวเอง

---

## ขั้นตอนที่ 1 — User Stories (30 นาที)

### สร้าง GitHub Issues
ใช้ GitHub Issues เป็น product backlog:

1. ไปที่ repo > Issues > New Issue
2. สร้าง label: `user-story`, `bug`, `enhancement`
3. เขียน user stories อย่างน้อย **8 stories** พร้อม acceptance criteria

**Template ที่แนะนำ:**
```markdown
## User Story
As a [role], I want to [action], so that [benefit].

## Acceptance Criteria
- Given [context], when [action], then [outcome].
- Given [context], when [action], then [outcome].

## Definition of Done
- [ ] Feature ทำงานได้ตาม acceptance criteria
- [ ] มี unit test ครอบคลุม
- [ ] Code ผ่าน review
```

### ใช้ AI Find Edge Cases
หลังเขียน stories แล้ว ให้ใช้ AI ช่วย:
```
Here are my user stories for [domain]. What edge cases, error scenarios,
or missing requirements do you think I should consider?

[วาง user stories ของกลุ่ม]
```

Review ทุก suggestion ก่อน add เข้า backlog — ไม่ใช่ทุก suggestion จะ relevant

---

## ขั้นตอนที่ 2 — Component Diagram (20 นาที)

วาด component diagram ด้วย [Excalidraw](https://excalidraw.com) หรือ draw.io

**ต้องมีอย่างน้อย:**
- Frontend (Browser)
- Backend API
- Database
- External services (ถ้ามี เช่น Auth provider)
- ลูกศรแสดงทิศทางการสื่อสาร

**Save เป็น PNG และเพิ่มลงใน `docs/architecture.png`**

---

## ขั้นตอนที่ 3 — ER Diagram (20 นาที)

วาด ER diagram สำหรับ database ของ project

**แต่ละ entity ต้องมี:**
- Attributes ที่สำคัญ (ไม่ต้องทุก field)
- Primary key
- Relationships (1:1, 1:N, N:M)

ใช้ [dbdiagram.io](https://dbdiagram.io) และ export เป็น PNG เพิ่มใน `docs/erd.png`

---

## ขั้นตอนที่ 4 — OpenAPI Specification (40 นาที)

### สร้างไฟล์ `docs/openapi.yaml`

**ใช้ AI draft ก่อน** จากนั้น review ทุก endpoint:

```yaml
openapi: 3.0.0
info:
  title: Campus [Domain] Service API
  version: 1.0.0
paths:
  /[resources]:
    get:
      summary: List all [resources]
      ...
```

**Checklist สำหรับแต่ละ endpoint:**
- [ ] HTTP method ถูกต้อง
- [ ] Status codes ครบ (success + error cases)
- [ ] Request body schema ครบ
- [ ] Response schema ครบ
- [ ] Authentication requirement ระบุแล้ว

**ก่อนจบ lab:** ทุกคนในกลุ่มต้องเลือก 1 endpoint และอธิบายให้เพื่อนในกลุ่มฟังได้

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| GitHub Issues | User stories ≥ 8 items พร้อม acceptance criteria | GitHub repo |
| `docs/architecture.png` | Component diagram | GitHub repo |
| `docs/erd.png` | ER diagram | GitHub repo |
| `docs/openapi.yaml` | OpenAPI spec ≥ 5 endpoints | GitHub repo |

### เกณฑ์ผ่าน
- User stories ทุกอันมี acceptance criteria ที่ pass/fail ได้
- OpenAPI spec valid (ตรวจด้วย [editor.swagger.io](https://editor.swagger.io))
- ทุกคนในกลุ่มอธิบาย endpoint ของตัวเองได้
