# Lecture: Requirements & API Design

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (5 นาที)

เปิด component diagrams ที่กลุ่มต่างๆ ส่งมา (anonymized) และ discuss:
- อะไรที่หลายกลุ่มลืม (เช่น Auth layer, Database)
- อะไรที่น่าสนใจ
- Monolith vs layered — เมื่อไหร่เลือกอะไร

---

## 2. User Stories ที่ Testable ได้ (8 นาที)

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

---

## 3. RESTful API Design (10 นาที)

### HTTP Methods
| Method | ใช้สำหรับ | ตัวอย่าง |
|---|---|---|
| GET | ดึงข้อมูล | `GET /rooms` |
| POST | สร้างข้อมูลใหม่ | `POST /bookings` |
| PUT | แทนที่ทั้งหมด | `PUT /bookings/123` |
| PATCH | อัปเดตบางส่วน | `PATCH /bookings/123` |
| DELETE | ลบ | `DELETE /bookings/123` |

### Status Codes ที่สำคัญ
```
200 OK           — สำเร็จ
201 Created      — สร้างสำเร็จ (ใช้กับ POST)
400 Bad Request  — ข้อมูลที่ส่งมาผิด
401 Unauthorized — ยังไม่ได้ login
403 Forbidden    — login แล้วแต่ไม่มีสิทธิ์
404 Not Found    — ไม่พบ resource
422 Unprocessable — validation ไม่ผ่าน
500 Server Error — ระบบมีปัญหา
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

---

## 4. OpenAPI Spec เป็น Contract Harness (7 นาที)

### OpenAPI Spec คืออะไร
เป็นไฟล์ YAML/JSON ที่ describe API อย่างครบถ้วน:
- Endpoints ทั้งหมด
- Request/response schemas
- Authentication requirements
- Status codes และ error responses

### ทำไม OpenAPI = Contract Harness
```
OpenAPI Spec
    ↓
Frontend รู้ว่า API ทำอะไร → develop แยกจาก backend ได้
Backend รู้ว่าต้อง implement อะไร → generate boilerplate ได้
Tests รู้ว่า contract คืออะไร → validate automatically ได้
```

### ตัวอย่าง OpenAPI spec เบื้องต้น
```yaml
openapi: 3.0.0
info:
  title: Campus Room Booking API
  version: 1.0.0

paths:
  /rooms:
    get:
      summary: List available rooms
      parameters:
        - name: date
          in: query
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
        '409':
          description: Room not available

components:
  schemas:
    Room:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        capacity:
          type: integer
```

### สิ่งที่ต้อง Review ใน AI-generated OpenAPI Spec
- Status codes ถูกต้องไหม (AI มักใช้ 200 สำหรับ POST แทน 201)
- Error responses มีครบไหม ไม่ใช่แค่ happy path
- Authentication ถูก define ไหม
- Schema ครบถ้วน ไม่มี field หายไปหรือ type ผิด

---

## Key Takeaways
- User story ที่ดีต้องมี acceptance criteria ที่ pass/fail ได้
- OpenAPI spec เป็น contract ระหว่าง frontend/backend — เป็น harness ชั้นที่ 2
- API endpoint ชื่อ resource ไม่ใช่ action
- AI draft spec ได้เร็ว แต่มักพลาด error cases และ authentication


---

## AI-DLC Connection: Inception Phase

### สิ่งที่ทำใน lab วันนี้ = Inception Phase ของ AI-DLC

```
Inception Phase
├── Intent Capture      ← เขียน intent.md (ทำใน lab)
├── Requirement Elaboration ← user stories + acceptance criteria
├── Unit Decomposition  ← unit-brief.md (ทำใน lab)
└── Bolt Planning       ← GitHub Projects board
```

### Intent vs Epic vs Feature

| ระดับ | AI-DLC | Agile | ตัวอย่าง |
|---|---|---|---|
| สูงสุด | **Intent** | Epic | "ระบบจองห้องสำหรับนักศึกษา" |
| กลาง | **Unit** | Feature | "Booking Management", "Room Catalog" |
| ล่างสุด | **Story** | User Story | "As a student, I want to book a room" |
| Execute | **Bolt** | Task/Sprint | implement booking form (4 ชั่วโมง) |

### Human Checkpoint ใน Inception

AI-DLC เน้นว่า human ต้อง validate ทุก step ใน inception:
- AI propose requirements → human review ว่าครบและถูกต้องไหม
- AI suggest unit decomposition → human ตัดสินว่า loosely coupled จริงไหม
- AI plan bolts → human approve ว่า scope สมเหตุสมผลไหม

> **ไม่ใช่:** ปล่อย AI วิ่งแล้วเอาผลมาส่ง
> **แต่คือ:** AI draft → human validate → refine → repeat
