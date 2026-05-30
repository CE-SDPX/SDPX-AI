# Lecture: Unit Testing & Test Harness ระดับ Unit

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (5 นาที)

เปิด test cases ที่กลุ่มต่างๆ ส่งมา (anonymized):
- Test ไหนที่เป็น good test และทำไม
- Test ไหนที่ดูเหมือนดีแต่จริงๆ ไม่ได้วัดอะไร
- Pattern ที่มักพลาด

---

## 2. Anatomy of a Good Test (5 นาที)

### Arrange / Act / Assert (AAA)
```python
def test_booking_confirmed_when_room_available():
    # Arrange — เตรียม state และ dependencies
    room = Room(id=1, capacity=10, is_available=True)
    service = BookingService(room_repo=FakeRoomRepo([room]))

    # Act — เรียก function ที่ต้องการ test
    result = service.create_booking(
        room_id=1, user_id=42,
        start="13:00", end="15:00"
    )

    # Assert — ตรวจสอบผลลัพธ์
    assert result.status == "confirmed"
    assert result.room_id == 1
```

### FIRST Principles
- **F**ast — รันเร็ว (milliseconds ไม่ใช่ seconds)
- **I**ndependent — ไม่พึ่ง test อื่น ลำดับ run ไม่ควรสำคัญ
- **R**epeatable — ผลเหมือนเดิมทุกครั้ง ไม่ขึ้นกับ environment
- **S**elf-validating — pass/fail ชัดเจน ไม่ต้องดู log เพิ่ม
- **T**imely — เขียนพร้อมหรือก่อน production code

---

## 3. Test Doubles: Mock, Stub, Fake, Spy (10 นาที)

Test doubles คือ objects ที่ใช้แทน real dependencies ใน tests
เป็นส่วนหนึ่งของ Unit Test Harness ที่ทำให้ test รันได้โดยไม่ต้องพึ่ง external services

### Stub — ให้ข้อมูลที่กำหนดไว้ล่วงหน้า
```python
class StubRoomRepo:
    def find_by_id(self, room_id):
        return Room(id=room_id, is_available=True)  # เสมอ

# ใช้เมื่อ: ต้องการควบคุม return value ของ dependency
```

### Fake — implementation จริงแต่ simplified
```python
class FakeRoomRepo:
    def __init__(self, rooms):
        self._rooms = {r.id: r for r in rooms}

    def find_by_id(self, room_id):
        return self._rooms.get(room_id)

    def save(self, room):
        self._rooms[room.id] = room

# ใช้เมื่อ: ต้องการ behavior จริงๆ แต่ไม่อยากใช้ database จริง
```

### Mock — verify ว่า method ถูกเรียก
```python
from unittest.mock import Mock

def test_notification_sent_after_booking():
    notifier = Mock()
    service = BookingService(notifier=notifier)

    service.create_booking(room_id=1, user_id=42, ...)

    notifier.send_confirmation.assert_called_once_with(user_id=42)
# ใช้เมื่อ: ต้องการ verify ว่า side effect เกิดขึ้น
```

### Spy — record การเรียก แต่ delegate ไปยัง real implementation
```python
# ใช้น้อย ส่วนใหญ่ใช้ Mock แทนได้
# ใช้เมื่อ: ต้องการ real behavior + verify ว่าถูกเรียก
```

### สรุปว่าใช้อะไรเมื่อไหร่
| ต้องการ | ใช้ |
|---|---|
| ควบคุม return value | Stub |
| ทดแทน database/repo | Fake |
| Verify ว่า method ถูกเรียก | Mock |
| Real behavior + verify | Spy |

---

## 4. Test Fixtures & Factories (5 นาที)

### ปัญหาของ Test Data ที่ไม่มี Harness
```python
# แย่: ซ้ำๆ ในทุก test
def test_booking_confirmed():
    room = Room(id=1, name="A101", capacity=10,
                location="Building A", is_available=True,
                hourly_rate=50)
    user = User(id=42, name="John", email="john@uni.ac.th",
                student_id="6301234", ...)
    # ... setup อีก 10 บรรทัด

def test_booking_rejected():
    room = Room(id=1, name="A101", ...)  # ซ้ำทั้งหมด
```

### Fixture — shared setup ที่ reuse ได้
```python
# pytest fixtures
@pytest.fixture
def available_room():
    return Room(id=1, name="A101", capacity=10, is_available=True)

@pytest.fixture
def student_user():
    return User(id=42, name="John", email="john@uni.ac.th")

def test_booking_confirmed(available_room, student_user):
    # ใช้ fixture โดยตรง — ไม่ต้อง setup ซ้ำ
    service = BookingService(room_repo=FakeRoomRepo([available_room]))
    result = service.create_booking(available_room.id, student_user.id, ...)
    assert result.status == "confirmed"
```

### Factory — สร้าง object ที่ยืดหยุ่น
```python
def make_room(**overrides):
    defaults = {
        "id": 1,
        "name": "A101",
        "capacity": 10,
        "is_available": True,
        "hourly_rate": 50
    }
    return Room(**{**defaults, **overrides})

# ใช้งาน
def test_booking_rejected_when_full():
    full_room = make_room(capacity=0)  # override แค่ที่ต้องการ
    ...
```

---

## 5. กับดัก: AI-Generated Tests ที่ไม่มีค่า (5 นาที)

### Test ที่ผ่าน Coverage แต่ไม่วัดอะไร
```python
# AI มักสร้าง:
def test_create_booking():
    booking = Booking(room_id=1, user_id=1)
    assert booking is not None     # ไม่มีค่า
    assert booking.room_id == 1    # แค่ test constructor

# Test ที่มีค่า:
def test_booking_rejected_when_room_unavailable():
    room = make_room(is_available=False)
    service = BookingService(room_repo=FakeRoomRepo([room]))

    with pytest.raises(RoomNotAvailableError):
        service.create_booking(room.id, user_id=1, ...)
    # Test นี้จะ fail ถ้า validation logic หายไป
```

### วิธีตรวจ: Zombie Test Detection
Comment out business logic แล้วดูว่า test ยัง pass ไหม:
```python
def create_booking(self, room_id, ...):
    room = self.room_repo.find_by_id(room_id)
    # if not room.is_available:        ← comment out
    #     raise RoomNotAvailableError()
    return Booking(...)

# ถ้า test ยัง pass → test นั้นไม่ได้ protect logic นี้
```

---

## Key Takeaways
- Unit Test Harness = test doubles + fixtures + factories ที่ทำให้ test รันได้อย่าง isolated
- เลือก test double ให้ถูกประเภท: Stub/Fake สำหรับ data, Mock สำหรับ verify behavior
- AI generate tests ได้เร็วแต่มักสร้าง trivial tests — ต้อง review ทุกอัน
- Fixtures และ factories ลด repetition และทำให้ test suite maintainable


---

## AI-DLC Connection: Construction Phase — Test Stage

ใน AI-DLC Construction Phase แต่ละ bolt จบด้วย **Test Stage**:

```
Construction Bolt (DDD):
Model → Design → ADR → Implement → [Test] ← วันนี้
```

สิ่งที่ทำใน lab วันนี้ = Test stage ของ bolt:
- **Unit Test Harness** = infrastructure ที่ทำให้ test stage รันได้อย่าง isolated
- **Test Doubles** = allow testing ใน isolation โดยไม่ต้องพึ่ง external services
- **Fixtures/Factories** = ensure consistent test data ทุก bolt run

Human checkpoint ใน Test Stage: ทุก test ต้องผ่าน review ก่อน bolt ถือว่า "Done"
AI propose tests → human verify ว่า tests วัด business logic จริงๆ ไม่ใช่แค่ pass coverage
