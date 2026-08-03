# Lecture: Requirements, API Design & the Spec Loop

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (5 นาที)

เปิด component diagrams ที่กลุ่มต่าง ๆ ส่งมา (anonymized) และ discuss:
- อะไรที่หลายกลุ่มลืม (เช่น Auth layer, Database, background job)
- อะไรที่น่าสนใจ
- Monolith vs layered — เมื่อไหร่เลือกอะไร

พร้อมกันนั้นเปิด "3 คำถามที่ยังตอบไม่ได้" ของแต่ละกลุ่ม
แล้วชี้ให้เห็นว่า **ทุกคำถามที่เราไม่ตอบ AI จะเดาแทน** — และคำเดาจะฝังลงใน code เงียบ ๆ

---

## 2. Spec Loop คืออะไร (4 นาที)

สัปดาห์ที่แล้วเราปิด Deploy Loop (commit → live) วันนี้เราสร้าง loop ที่อยู่ *ก่อนหน้า* นั้น

```
Intent ──→ User Story ──→ Acceptance Criteria ──→ API Contract
   ↑                                                    │
   └──────────── review / แก้เมื่อพบว่าไม่ตรงจริง ────────┘
```

| ขั้น Verify ของ Spec Loop | ทำอย่างไร | latency |
|---|---|---|
| Story มี AC ที่ pass/fail ได้ | อ่านแล้วถามว่า "จะรู้ได้ยังไงว่าผ่าน" | นาที |
| OpenAPI spec valid | validate ด้วย tool | วินาที |
| Contract ตรงกับ AC | ไล่ทีละ story ว่ามี endpoint รองรับ | นาที |

**ทำไมต้องปิด loop ตรงนี้ก่อนเขียน code:** แก้ requirement ที่ผิดตอนเป็นข้อความ
ใช้เวลาเป็นนาที แต่แก้ตอนเป็น code ที่ deploy แล้วใช้เวลาเป็นวัน

---

## 3. User Stories ที่ Testable ได้ (6 นาที)

### รูปแบบมาตรฐาน
```
As a [user role],
I want to [action],
So that [benefit].
```

### Acceptance Criteria (Given/When/Then)
```
Given [context/precondition],
When [action is taken],
Then [expected outcome].
```

### ตัวอย่างที่ดี
```
Story:
As a student, I want to book a study room,
So that I have a guaranteed space to meet my group.

Acceptance Criteria:
Given I am logged in as a student,
When I select an available room and submit a booking for 13:00-15:00,
Then the booking is confirmed and I receive a booking ID.

Given a room is booked for 13:00-15:00,
When another student tries to book the same room at 14:00-16:00,
Then the system rejects with "Room not available for selected time".
```

### กับดัก: Stories ที่ยาก Test
```
❌ "As a user, I want a good experience"
   → "good" วัดไม่ได้

❌ "As an admin, I want to manage everything"
   → "everything" ไม่รู้จะ test อะไร

✅ แต่ละ story ต้องมี acceptance criteria ที่ pass/fail ได้ชัดเจน
```

### เชื่อมกับสัปดาห์ถัดไป
```
Acceptance Criteria (วันนี้)
        ↓
E2E Test ที่ implement AC นั้น (WS-04)
        ↓
Story ถือว่า "Done" เมื่อ E2E เขียว
```

AC ที่เขียนวันนี้จะกลายเป็น test จริงในอีก 2 สัปดาห์ —
ถ้าวันนี้เขียนแบบวัดไม่ได้ วันนั้นจะเขียน test ไม่ออก

---

## 4. RESTful API Design (8 นาที)

### HTTP Methods
| Method | ใช้สำหรับ | ตัวอย่าง | Idempotent |
|---|---|---|---|
| GET | ดึงข้อมูล | `GET /rooms` | ✅ |
| POST | สร้างข้อมูลใหม่ | `POST /bookings` | ❌ |
| PUT | แทนที่ทั้งหมด | `PUT /bookings/123` | ✅ |
| PATCH | อัปเดตบางส่วน | `PATCH /bookings/123` | ❌ (ปกติ) |
| DELETE | ลบ | `DELETE /bookings/123` | ✅ |

> **Idempotent** = เรียกซ้ำกี่ครั้งผลก็เหมือนเดิม สำคัญมากตอน network มีปัญหาแล้ว client retry
> ถ้า POST ไม่ idempotent แล้ว user กดปุ่มสองครั้ง = จองซ้ำ 2 รายการ

### Status Codes ที่สำคัญ
```
200 OK            — สำเร็จ
201 Created       — สร้างสำเร็จ (ใช้กับ POST) พร้อม header Location
204 No Content    — สำเร็จแต่ไม่มี body (ใช้กับ DELETE)
400 Bad Request   — ข้อมูลที่ส่งมาผิดรูปแบบ
401 Unauthorized  — ยังไม่ได้ login / token ไม่ถูก
403 Forbidden     — login แล้วแต่ไม่มีสิทธิ์
404 Not Found     — ไม่พบ resource
409 Conflict      — ชนกับ state ปัจจุบัน (เช่น ห้องถูกจองแล้ว)
422 Unprocessable — รูปแบบถูกแต่ validation ทาง business ไม่ผ่าน
429 Too Many Requests — เกิน rate limit
500 Server Error  — ระบบมีปัญหา
```

### Resource Naming
```
✅ /rooms              (collection)
✅ /rooms/123          (single resource)
✅ /rooms/123/bookings (nested resource)

❌ /getRoom
❌ /createNewBooking
❌ /deleteAllRooms
```

### Error Response ที่มีรูปแบบเดียวกันทั้งระบบ
```json
{
  "error": {
    "code": "ROOM_NOT_AVAILABLE",
    "message": "Room A101 is already booked for 13:00-15:00",
    "field": "roomId"
  }
}
```

`code` เป็น string คงที่ให้เครื่องอ่าน `message` ให้คนอ่าน —
frontend และ E2E test จะเช็ค `code` ไม่ใช่ข้อความ เพราะข้อความเปลี่ยนได้

---

## 5. OpenAPI Spec = API Contract (7 นาที)

### OpenAPI Spec คืออะไร
ไฟล์ YAML/JSON ที่ describe API อย่างครบถ้วน:
- Endpoints ทั้งหมด
- Request/response schemas
- Authentication requirements
- Status codes และ error responses

### ทำไม Contract ถึงปิด loop ได้หลายวง
```
OpenAPI Spec (แหล่งความจริงเดียว)
    ├─→ Frontend รู้ว่า API ทำอะไร → develop คู่ขนานกับ backend ได้
    ├─→ Backend รู้ว่าต้อง implement อะไร → generate boilerplate/types ได้
    ├─→ Test รู้ว่า contract คืออะไร → validate response อัตโนมัติได้
    └─→ AI agent อ่าน spec เป็น context → generate code ที่ตรงกว่า prompt ยาว ๆ
```

ข้อสุดท้ายคือเหตุผลที่ spec สำคัญขึ้นมากในยุค AI:
**spec คือ context ที่มีโครงสร้าง** — สั้นกว่าอธิบายด้วยประโยค แม่นกว่า และไม่ลืม

### ตัวอย่าง OpenAPI spec เบื้องต้น
```yaml
openapi: 3.1.0
info:
  title: Campus Room Booking API
  version: 1.0.0

security:
  - bearerAuth: []

paths:
  /rooms:
    get:
      summary: List available rooms
      parameters:
        - name: date
          in: query
          required: true
          schema:
            type: string
            format: date
      responses:
        '200':
          description: List of rooms
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Room'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /bookings:
    post:
      summary: Create a booking
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BookingRequest'
      responses:
        '201':
          description: Booking created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Booking'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '409':
          description: Room not available for the selected time

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  responses:
    Unauthorized:
      description: Missing or invalid token
  schemas:
    Room:
      type: object
      required: [id, name, capacity]
      properties:
        id: { type: integer }
        name: { type: string }
        capacity: { type: integer, minimum: 1 }
```

### สิ่งที่ต้อง Review ใน AI-generated OpenAPI Spec

AI ร่าง spec ได้เร็วมาก แต่พลาดซ้ำ ๆ ที่เดิม:

| จุดที่ AI มักพลาด | ตรวจอย่างไร |
|---|---|
| ใช้ `200` กับ POST แทน `201` | ไล่ดูทุก POST |
| มีแต่ happy path ไม่มี error response | ทุก endpoint ต้องมีอย่างน้อย 1 error case |
| ไม่ได้ define authentication | มี `security` และ `securitySchemes` ไหม |
| ไม่มี `required` ใน schema | field ไหนที่ขาดไม่ได้ ต้องอยู่ใน `required` |
| ลืม 409 ตอนที่ business rule ชนกัน | ไล่จาก AC ที่มีคำว่า "reject" |
| เดา field ที่เราไม่เคยพูดถึง | ลบทิ้ง หรือถามตัวเองว่าต้องการจริงไหม |

---

## Key Takeaways
- Spec Loop ปิดข้อผิดพลาดตอนที่มันยังเป็นข้อความ ซึ่งถูกกว่าตอนเป็น code เป็นสิบเท่า
- User story ที่ดีต้องมี acceptance criteria ที่ pass/fail ได้ — AC วันนี้คือ E2E test ใน WS-04
- OpenAPI spec คือ contract เดียวที่ frontend, backend, test และ AI ใช้ร่วมกัน
- API endpoint ตั้งชื่อตาม resource ไม่ใช่ action และเลือก status code ให้ตรงความหมาย
- AI ร่าง spec ได้เร็ว แต่พลาดที่เดิมเสมอ: error case, auth, `required`, 201/409

---

## AI-DLC Connection: Inception Phase

### สิ่งที่ทำใน lab วันนี้ = Inception Phase ของ AI-DLC

```
Inception Phase
├── Intent Capture           ← เขียน intent.md (ทำใน lab)
├── Requirement Elaboration  ← user stories + acceptance criteria
├── Unit Decomposition       ← unit-brief.md (ทำใน lab)
└── Bolt Planning            ← GitHub Projects board
```

### Intent vs Unit vs Story vs Bolt

| ระดับ | AI-DLC | Agile | ตัวอย่าง |
|---|---|---|---|
| สูงสุด | **Intent** | Epic | "ระบบจองห้องสำหรับนักศึกษา" |
| กลาง | **Unit** | Feature | "Booking Management", "Room Catalog" |
| ล่างสุด | **Story** | User Story | "As a student, I want to book a room" |
| Execute | **Bolt** | Task/Sprint | implement booking form (4 ชั่วโมง) |

### Human Checkpoint ใน Inception

- AI propose requirements → human review ว่าครบและถูกต้องไหม
- AI suggest unit decomposition → human ตัดสินว่า loosely coupled จริงไหม
- AI plan bolts → human approve ว่า scope สมเหตุสมผลไหม

> **ไม่ใช่:** ปล่อย AI วิ่งแล้วเอาผลมาส่ง
> **แต่คือ:** AI draft → human validate → refine → repeat

### Spec คือ Context ถาวรของ Project

ทุกอย่างที่เขียนวันนี้จะถูก AI อ่านซ้ำทุกสัปดาห์ที่เหลือ
`intent.md` ที่คลุมเครือวันนี้ = code ที่หลงทางในอีก 6 สัปดาห์
ดังนั้นเวลาที่ลงกับ spec วันนี้ ไม่ใช่เวลาที่เสียไปจากการเขียน code — มันคือการลงทุนใน context
