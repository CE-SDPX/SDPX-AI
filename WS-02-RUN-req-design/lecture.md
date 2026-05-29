# Lecture: Requirements & API Design

## Learning Objectives
- เขียน user stories ที่ testable ได้
- ออกแบบ RESTful API ที่ถูกต้องได้
- ใช้ AI ช่วย find requirements gaps และ draft API spec ได้อย่างมีวิจารณญาณ

---

## 1. Entry Ticket Review

อาจารย์เปิด component diagrams ที่กลุ่มต่างๆ ส่งมา (anonymized) และ discuss:
- อะไรที่หลายกลุ่มลืม (เช่น Authentication, Database)
- Pattern ที่น่าสนใจ
- จุดที่มักสับสน

---

## 2. User Stories ที่ Testable ได้

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

### ตัวอย่าง: ระบบจองห้อง
```
Story:
As a student,
I want to book a room for a study group,
So that I have a guaranteed space to meet.

Acceptance Criteria:
Given I am logged in as a student,
When I select an available room and time slot and submit the booking,
Then the booking is confirmed and I receive a confirmation with booking ID.

Given a room is already booked for 13:00-15:00,
When another student tries to book the same room at 14:00-16:00,
Then the system rejects the booking with an error "Room not available for selected time".
```

### กับดัก: User Stories ที่ยาก Test
❌ "As a user, I want a good experience"
→ "good" วัดไม่ได้

❌ "As an admin, I want to manage everything"
→ "everything" กว้างเกินไป ไม่รู้จะ test อะไร

✅ แต่ละ story ควรมี acceptance criteria ที่ pass/fail ได้ชัดเจน

---

## 3. RESTful API Design

### HTTP Methods
| Method | ใช้สำหรับ | ตัวอย่าง |
|---|---|---|
| GET | ดึงข้อมูล | `GET /rooms` |
| POST | สร้างข้อมูลใหม่ | `POST /bookings` |
| PUT | แทนที่ข้อมูลทั้งหมด | `PUT /bookings/123` |
| PATCH | อัปเดตบางส่วน | `PATCH /bookings/123` |
| DELETE | ลบข้อมูล | `DELETE /bookings/123` |

### Resource Naming
```
✅ /rooms              (collection)
✅ /rooms/123          (single resource)
✅ /rooms/123/bookings (nested resource)

❌ /getRoom
❌ /createNewBooking
❌ /room_list
```

### HTTP Status Codes ที่สำคัญ
```
200 OK           — ทำสำเร็จ
201 Created      — สร้างสำเร็จ
400 Bad Request  — ข้อมูลที่ส่งมาผิด
401 Unauthorized — ยังไม่ได้ login
403 Forbidden    — login แล้วแต่ไม่มีสิทธิ์
404 Not Found    — ไม่พบ resource
422 Unprocessable — validation ไม่ผ่าน
500 Server Error — ระบบมีปัญหา
```

---

## 4. ใช้ AI Draft API Spec อย่างไรให้ได้ผล

### Prompt ที่ดี
```
I am building a room booking system for a university.
Users are: students (can book rooms), staff (can manage rooms).
Entities: Room (id, name, capacity, location), Booking (id, roomId, userId, startTime, endTime, status)

Generate an OpenAPI 3.0 spec for the core CRUD operations.
Include proper status codes, request bodies, and response schemas.
```

### สิ่งที่ต้อง Review ในผลลัพธ์ของ AI
- Status codes ถูกต้องไหม (AI มักใช้ 200 สำหรับ POST แทน 201)
- Schema ครบไหม — มี field อะไรขาดหายไปบ้าง
- Error responses มีครบไหม — ไม่ใช่แค่ happy path
- Security / Authentication ถูก define ไหม

---

## Key Takeaways
- User story ที่ดีต้องมี acceptance criteria ที่ pass/fail ได้
- API endpoint ชื่อ resource ไม่ใช่ action
- AI draft spec ได้เร็ว แต่มักพลาด error cases และ authentication
- ทุกคนในกลุ่มต้องอธิบาย endpoint ของตัวเองได้
