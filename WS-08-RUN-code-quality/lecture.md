# Lecture: Code Quality, Security & Responsible AI

## เวลา: 30 นาที

---

## 1. Entry Ticket Review: Code ที่แย่ที่สุด (5 นาที)

เปิด code samples ที่กลุ่มต่างๆ ส่งมา (anonymized) discuss ร่วมกัน:
- Code smell นี้คืออะไร
- ทำไมถึงแย่ — impact คืออะไร
- ถ้าจะแก้ควรเริ่มจากตรงไหน

---

## 2. Code Smells ที่พบบ่อย (8 นาที)

### Long Method
```python
# แย่: function ทำหลายอย่าง
def process_booking(room_id, user_id, start, end):
    # validate (5 lines)
    # check availability (8 lines)
    # calculate price (5 lines)
    # save to db (3 lines)
    # send notification (4 lines)
    # log event (2 lines)
    # return response (2 lines)
    # รวม 30+ lines ใน function เดียว

# ดี: Single Responsibility
def process_booking(room_id, user_id, start, end):
    validate_booking_input(room_id, user_id, start, end)
    check_room_availability(room_id, start, end)
    price = calculate_price(room_id, start, end)
    booking = save_booking(room_id, user_id, start, end, price)
    notify_user(user_id, booking)
    return booking
```

### Magic Numbers
```python
# แย่
if duration > 8:              # 8 คืออะไร
    raise ValueError("error")
price = hours * 150           # 150 คืออะไร

# ดี
MAX_BOOKING_HOURS = 8
HOURLY_RATE_THB = 150

if duration > MAX_BOOKING_HOURS:
    raise ValueError(f"Max {MAX_BOOKING_HOURS} hours per booking")
price = hours * HOURLY_RATE_THB
```

### กับดัก: Refactor โดยไม่มี Tests
```
สมการแห่งหายนะ:
Code ที่ต้อง refactor + ไม่มี tests = วิธีที่ดีที่สุดในการ break production

ขั้นตอนที่ถูกต้อง:
1. เขียน test ครอบคลุม behavior ที่ต้องรักษาก่อน
2. ยืนยัน tests pass กับ code เก่า
3. Refactor
4. ยืนยัน tests ยังผ่านอยู่ (harness ทำงาน!)
```

---

## 3. AI Code Review: เชื่อตรงไหน ปฏิเสธตรงไหน (5 นาที)

### Prompt ที่ได้ผล
```
Review this function. For each issue:
1. Specific code smell or problem name
2. WHY it's a problem (impact)
3. Concrete fix with example
4. Severity: High/Medium/Low
```

### เชื่อ AI เมื่อ
- ชี้ naming ที่ไม่ชัดเจน
- พบ duplicate code
- แนะนำ extract method
- ชี้ missing error handling

### ระวัง AI เมื่อ
- แนะนำ over-engineering (เพิ่ม design patterns ที่ไม่จำเป็น)
- Refactor ทุกอย่างในครั้งเดียว
- ไม่รู้ business context ว่าทำไม code ถึงเป็นแบบนั้น

---

## 4. Security: สิ่งที่ AI มักพลาด (7 นาที)

### SQL Injection
```python
# แย่: AI บางครั้งสร้าง code แบบนี้
query = f"SELECT * FROM rooms WHERE name = '{user_input}'"
# ถ้า user_input = "'; DROP TABLE rooms; --" → disaster

# ดี: Parameterized queries
query = "SELECT * FROM rooms WHERE name = ?"
db.execute(query, (user_input,))
```

### Missing Authorization
```python
# แย่: ตรวจแค่ว่า login แล้ว
@login_required
def delete_booking(booking_id):
    Booking.get(booking_id).delete()  # ใครก็ลบ booking ของคนอื่นได้!

# ดี: ตรวจ ownership ด้วย
@login_required
def delete_booking(booking_id):
    booking = Booking.get(booking_id)
    if booking.user_id != current_user.id:
        raise ForbiddenError("Not your booking")
    booking.delete()
```

### Exposed Sensitive Data
```python
# แย่: return ทั้ง object
return user.__dict__  # รวม password_hash, internal_id

# ดี: explicit fields
return {"id": user.public_id, "name": user.name, "email": user.email}
```

---

## 5. Responsible AI: License & Privacy (5 นาที)

### License ของ AI-Generated Code
- GitHub Copilot Terms: อนุญาตให้ใช้ output ใน commercial products
- Claude/ChatGPT Terms: คล้ายกัน แต่ควรอ่าน ToS เสมอ
- ถ้า AI generate code ที่ copy จาก GPL project — อาจมีปัญหา

### อย่าส่งเข้า AI Tools
- Passwords, API keys, tokens (แม้ใน comment)
- Personal data ของ users (email, ชื่อจริง, รหัสนักศึกษา)
- Proprietary business logic ที่เป็น confidential
- Code ของบริษัทที่มี NDA

### หลักการ: AI เป็น Coding Assistant ไม่ใช่ Source of Truth
```
✅ ใช้ AI draft code → review → understand → commit
❌ ใช้ AI generate → copy → paste → hope it works
```

---

## Key Takeaways
- Harness ที่สร้างมาตลอด course คือ safety net สำหรับ refactor
- Refactor ทีละเล็กๆ ไม่ใช่ทีเดียวทั้งหมด
- Security ไม่ใช่ feature ที่เพิ่มทีหลัง — ต้อง build ตั้งแต่ต้น
- AI มักสร้าง functional code แต่พลาด security edge cases
