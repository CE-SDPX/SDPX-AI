# Lecture: Refactoring & Code Quality

## Learning Objectives
- ระบุ code smells ใน codebase จริงได้
- Refactor code โดยมี tests เป็น safety net
- วิเคราะห์ AI code review ได้ว่าควรเชื่อตรงไหนและปฏิเสธตรงไหน

---

## 1. Entry Ticket Review: Code ที่แย่ที่สุด

อาจารย์เปิด code samples ที่กลุ่มต่างๆ ส่งมา (anonymized) และ discuss กับ class:
- นี่คือ code smell อะไร
- ถ้าจะแก้ควรเริ่มจากไหน
- อะไรที่ทำให้ code นี้ยาก maintain

---

## 2. Code Smells ที่พบบ่อยในโปรเจกต์นักศึกษา

### Long Method
```python
# แย่: function ทำทุกอย่าง
def process_booking(room_id, user_id, start_time, end_time):
    # validate input
    if not room_id or not user_id:
        raise ValueError("...")
    if start_time >= end_time:
        raise ValueError("...")

    # check availability
    existing = db.query(Booking).filter(
        Booking.room_id == room_id,
        Booking.start_time < end_time,
        Booking.end_time > start_time
    ).first()
    if existing:
        raise ConflictError("...")

    # calculate price
    hours = (end_time - start_time).seconds / 3600
    room = db.query(Room).get(room_id)
    price = hours * room.hourly_rate

    # create booking
    booking = Booking(...)
    db.add(booking)

    # send notification
    send_email(user_id, "Your booking is confirmed")

    return booking

# ดี: แยก responsibilities
def process_booking(room_id, user_id, start_time, end_time):
    validate_booking_input(room_id, user_id, start_time, end_time)
    check_room_availability(room_id, start_time, end_time)
    price = calculate_booking_price(room_id, start_time, end_time)
    booking = create_booking_record(room_id, user_id, start_time, end_time, price)
    notify_user(user_id, booking)
    return booking
```

### Magic Numbers
```python
# แย่
if booking_duration > 8:
    raise ValueError("Too long")
price = hours * 150

# ดี
MAX_BOOKING_HOURS = 8
HOURLY_RATE = 150

if booking_duration > MAX_BOOKING_HOURS:
    raise ValueError(f"Booking cannot exceed {MAX_BOOKING_HOURS} hours")
price = hours * HOURLY_RATE
```

---

## 3. กับดัก: Refactor โดยไม่มี Tests

```
สมการแห่งหายนะ:
Code ที่ต้อง refactor + ไม่มี tests = วิธีที่ดีที่สุดในการ break production

ขั้นตอนที่ถูกต้อง:
1. เขียน test ครอบคลุม behavior ที่ต้องการรักษาไว้ก่อน
2. ยืนยัน tests pass กับ code เก่า
3. Refactor
4. ยืนยัน tests ยังผ่านอยู่
```

---

## 4. AI Code Review: เชื่อตรงไหน ปฏิเสธตรงไหน

### Prompt ที่ได้ผลดี
```
Review this function. For each issue found:
1. Name the specific code smell or problem
2. Explain WHY it's a problem
3. Show a concrete fix
4. Rate severity: High / Medium / Low

[วาง code]
```

### เชื่อ AI เมื่อ
- ชี้ naming ที่ไม่ชัดเจน
- พบ duplicate code
- แนะนำ extract method สำหรับ long function
- ชี้ missing error handling

### ระวัง AI เมื่อ
- แนะนำ over-engineering (เพิ่ม design patterns โดยไม่จำเป็น)
- Refactor ทั้งหมดในครั้งเดียว (เสี่ยง break)
- แนะนำ library ใหม่เพื่อแก้ปัญหาง่ายๆ
- ไม่รู้ context ของ business logic

---

## 5. Architecture Decision Record (ADR)

ADR คือเอกสารบันทึกการตัดสินใจสำคัญ:
```markdown
# ADR-001: Use PostgreSQL for Main Database

## Status: Accepted

## Context
เราต้องการ database สำหรับ booking system ที่มี concurrent users

## Decision
ใช้ PostgreSQL แทน MongoDB

## Rationale
- Booking data มี relationships ชัดเจน (User, Room, Booking)
- ต้องการ ACID transactions เพื่อป้องกัน double booking
- ทีมมี SQL experience มากกว่า NoSQL

## Consequences
- ต้องออกแบบ schema ล่วงหน้า
- Schema migration ต้องระวังมากขึ้น
```

---

## Key Takeaways
- Refactor ทีละเล็ก ไม่ใช่ทีเดียวทั้งหมด
- Tests คือ safety net ที่ต้องมีก่อน refactor
- AI review ดีสำหรับ surface-level issues แต่ไม่รู้ business context
- ADR ช่วยให้ team ในอนาคตเข้าใจว่าทำไมถึงตัดสินใจแบบนั้น
