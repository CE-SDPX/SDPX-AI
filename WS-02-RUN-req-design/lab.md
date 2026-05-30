# Lab: Requirements & API Design

## เวลา: 1.5 ชั่วโมง
## เป้าหมาย
สร้าง product backlog, architecture diagram, และ OpenAPI spec ของ project ตัวเอง

---

## ขั้นตอนที่ 1 — Product Backlog (25 นาที)

### สร้าง GitHub Issues เป็น Backlog
1. ไปที่ repo > Issues > Labels
2. สร้าง labels: `user-story`, `bug`, `enhancement`, `tech-debt`
3. ไปที่ Projects > New Project > Board

### เขียน User Stories ≥ 8 items

ใช้ template นี้สำหรับแต่ละ issue:
```markdown
## User Story
As a [role], I want to [action], so that [benefit].

## Acceptance Criteria
- Given [context], when [action], then [outcome].
- Given [context], when [action], then [outcome].

## Definition of Done
- [ ] Feature ทำงานได้ตาม acceptance criteria
- [ ] มี unit test ครอบคลุม
- [ ] Code ผ่าน review จากสมาชิกในกลุ่ม
```

### ใช้ AI Find Edge Cases
หลังเขียน stories แล้ว:
```
Here are my user stories for [domain]:
[วาง stories]

What edge cases, error scenarios, or missing requirements
should I consider? List at least 5 specific cases.
```

Review ทุก suggestion — ไม่ใช่ทุกอันจะ relevant กับ project ของคุณ

---

## ขั้นตอนที่ 2 — Architecture Diagrams (20 นาที)

### Component Diagram
วาดด้วย [Excalidraw](https://excalidraw.com) หรือ draw.io

ต้องมีอย่างน้อย:
- Browser (Frontend)
- API Server (Backend)
- Database
- ลูกศรแสดงทิศทาง request/response

Save เป็น PNG เพิ่มที่ `docs/architecture.png`

### ER Diagram
วาดด้วย [dbdiagram.io](https://dbdiagram.io)

แต่ละ entity ต้องมี:
- ชื่อ attributes สำคัญ
- Primary key
- Relationships พร้อม cardinality (1:1, 1:N, N:M)

Save เป็น PNG เพิ่มที่ `docs/erd.png`

---

## ขั้นตอนที่ 3 — OpenAPI Specification (35 นาที)

### สร้างไฟล์ `docs/openapi.yaml`

**Step 1:** ใช้ AI generate draft:
```
I am building a [domain] system for a university.
Entities: [list your entities]
Users: [list your user roles]

Generate an OpenAPI 3.0 spec for the core CRUD operations.
Include:
- Proper HTTP methods and status codes
- Request body and response schemas
- Error responses (400, 401, 403, 404)
- Authentication header requirement
```

**Step 2:** ตรวจสอบด้วย [Swagger Editor](https://editor.swagger.io)
วาง YAML ลงไป ต้องไม่มี validation errors

**Step 3:** Review ทุก endpoint ด้วย checklist:
- [ ] HTTP method ถูกต้อง (POST ใช้ 201 ไม่ใช่ 200)
- [ ] Error responses มีครบ ไม่ใช่แค่ success case
- [ ] Request body schema ครบทุก required field
- [ ] Authentication requirement ระบุแล้ว

**Step 4:** แต่ละคนในกลุ่มเลือก 1 endpoint และอธิบายให้เพื่อนฟังก่อนจบ lab

---

## ขั้นตอนที่ 4 — Sprint Planning (10 นาที)

ตั้ง GitHub Project board:
- **To Do** — stories ที่ยังไม่ได้ทำ
- **In Progress** — กำลังทำ
- **Done** — เสร็จแล้ว

เลือก stories สำหรับ Sprint 1 (2 สัปดาห์แรก) และ assign ให้สมาชิก

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| GitHub Issues | User stories ≥ 8 items พร้อม acceptance criteria | GitHub repo |
| `docs/architecture.png` | Component diagram | GitHub repo |
| `docs/erd.png` | ER diagram | GitHub repo |
| `docs/openapi.yaml` | OpenAPI spec ≥ 5 endpoints (valid) | GitHub repo |

### เกณฑ์ผ่าน
- [ ] User stories ทุกอันมี acceptance criteria ที่ pass/fail ได้
- [ ] OpenAPI spec valid ผ่าน Swagger Editor
- [ ] ทุกคนในกลุ่มอธิบาย endpoint ของตัวเองได้
