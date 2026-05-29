# Lecture: Unit Testing

## Learning Objectives
- เข้าใจหลักการเขียน unit test ที่มีคุณภาพ
- วิเคราะห์ AI-generated tests ได้ว่าดีหรือไม่
- ใช้ coverage และ mutation testing วัดคุณภาพ tests ได้

---

## 1. Entry Ticket Review

อาจารย์เปิด test cases ที่กลุ่มต่างๆ ส่งมา (anonymized) และ discuss:
- Test ไหนที่เป็น good test และทำไม
- Test ไหนที่ดูเหมือนผ่านแต่ไม่ได้วัดอะไรจริงๆ
- Pattern ที่มักพลาด

---

## 2. Anatomy of a Good Test

### Arrange / Act / Assert (AAA)
```python
def test_booking_confirms_when_room_is_available():
    # Arrange
    room = Room(id=1, capacity=10, is_available=True)
    service = BookingService(room_repository=FakeRoomRepo([room]))

    # Act
    result = service.create_booking(
        room_id=1, user_id=42, start_time="13:00", end_time="15:00"
    )

    # Assert
    assert result.status == "confirmed"
    assert result.room_id == 1
```

### FIRST Principles
- **F**ast — test ควรรันเร็ว (< 1 วินาที)
- **I**ndependent — ไม่พึ่งพา test อื่น ลำดับ run ไม่ควรสำคัญ
- **R**epeatable — ผลลัพธ์เหมือนเดิมทุกครั้ง ไม่ขึ้นกับ environment
- **S**elf-validating — pass/fail ชัดเจน ไม่ต้องดู log เพิ่มเติม
- **T**imely — เขียนพร้อมหรือก่อน production code

---

## 3. กับดัก: AI-Generated Tests ที่ไม่ได้วัดอะไร

### ตัวอย่างที่แย่ (AI มักสร้าง)
```python
def test_create_booking():
    booking = Booking(room_id=1, user_id=1)
    assert booking is not None       # ไม่ได้วัดอะไรจริงๆ
    assert booking.room_id == 1      # แค่ test constructor
```

### ตัวอย่างที่ดี (วัด business logic)
```python
def test_booking_rejected_when_room_already_booked():
    room = Room(id=1, is_available=False)
    service = BookingService(room_repository=FakeRoomRepo([room]))

    with pytest.raises(RoomNotAvailableError):
        service.create_booking(room_id=1, user_id=42, ...)
```

### วิธีตรวจ AI-Generated Tests
1. ถามตัวเอง: "ถ้า code นี้พัง test นี้จะ fail ไหม"
2. ลอง comment out business logic แล้วดูว่า test ยัง pass อยู่ไหม
3. ถ้า test pass แม้ logic จะผิด — test นั้นไม่มีค่า

---

## 4. Coverage vs Quality

### Coverage บอกอะไร
- Line coverage: กี่ % ของ code ถูก execute
- Branch coverage: กี่ % ของ if/else branches ถูกเดิน

### Coverage ไม่บอกอะไร
```python
def calculate_discount(price, is_member):
    if is_member:
        return price * 0.9
    return price

def test_discount():
    assert calculate_discount(100, True) == 90
    # 100% line coverage แต่ไม่ได้ test กรณี is_member=False เลย
```

### Mutation Testing
Mutation testing แก้ code เล็กน้อย เช่น เปลี่ยน `>` เป็น `>=` แล้วดูว่า test fail ไหม

```bash
# Python
pip install mutmut
mutmut run && mutmut results
```

ถ้า test ยัง pass หลัง mutation — แสดงว่า test ไม่ได้จับ logic นั้น

---

## Key Takeaways
- Test ที่ดีต้อง fail เมื่อ code พัง — ถ้า pass ตลอดไม่ว่า code จะเป็นอะไร มันไม่มีค่า
- Coverage 100% ไม่ได้แปลว่า tests มีคุณภาพ
- AI generate tests ได้เร็ว แต่มักสร้าง trivial tests — ต้อง review ทุกอัน
- Mutation testing เป็นวิธีพิสูจน์คุณภาพ tests ที่ดีที่สุด
