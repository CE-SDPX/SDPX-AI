# Lecture: Unit Testing & the Unit Test Harness

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (4 นาที)

เปิด test cases ที่กลุ่มต่าง ๆ ส่งมา (anonymized):
- Test ไหนที่จะแดงจริงถ้าลบ business rule ออก
- Test ไหนที่ดูเหมือนดีแต่จะเขียวตลอดไม่ว่า code จะเป็นอย่างไร
- Pattern ที่มักพลาด

---

## 2. Unit Test Loop: loop ที่สั้นที่สุดในวิชานี้ (4 นาที)

```
       ┌──── Red ────┐
       │  เขียน test  │
       ↓  ที่ยังแดง   │
   Refactor          │
       ↑             ↓
       └──── Green ──┘
          เขียน code
        ให้น้อยที่สุด
        ที่ทำให้เขียว
```

| คุณสมบัติของ loop | เป้าหมายในวิชานี้ |
|---|---|
| **Latency** | test suite ทั้งชุด < 10 วินาที |
| **Fidelity** | ลบ business rule 1 ข้อ → ต้องมี test แดงอย่างน้อย 1 ตัว |
| **Coverage** | ทุก business rule ใน `unit-brief.md` มี test คู่กัน |

**และนี่คือ loop เดียวกันกับที่ AI agent ใช้** — เมื่อ agent รัน `npm test` แล้วอ่านผล
มันกำลังยืมขั้น Verify ที่เราสร้างไว้ ดังนั้น:

> test suite ที่เร็วและซื่อสัตย์ = agent ที่ฉลาดขึ้น
> test suite ที่ช้าหรือหลอก = agent ที่มั่นใจแบบผิด ๆ

---

## 3. Anatomy of a Good Test (4 นาที)

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

### ชื่อ test คือเอกสาร
```python
❌ def test_booking()
❌ def test_1()
✅ def test_booking_rejected_when_room_unavailable()
```

ชื่อที่ดีบอก 3 อย่าง: ทำอะไร, ภายใต้เงื่อนไขไหน, คาดหวังอะไร
เวลา test แดงใน CI ตอนตีสอง ชื่อ test คือสิ่งเดียวที่คุณได้อ่าน

---

## 4. Unit Test Harness: Test Doubles, Fixtures, Factories (10 นาที)

> **Test Harness** = โครงสร้างรอบ ๆ test ที่ทำให้ test รันได้แบบ isolated และได้ผลเหมือนเดิมทุกครั้ง
> ประกอบด้วย **test doubles + fixtures + factories + runner config**
> คำว่า "harness" ในวิชานี้ใช้เฉพาะกับเรื่อง testing (WS-03, WS-04) เท่านั้น

### 4.1 Test Doubles

Test doubles คือ objects ที่ใช้แทน real dependencies ใน tests

**Stub — ให้ข้อมูลที่กำหนดไว้ล่วงหน้า**
```python
class StubRoomRepo:
    def find_by_id(self, room_id):
        return Room(id=room_id, is_available=True)  # เสมอ

# ใช้เมื่อ: ต้องการควบคุม return value ของ dependency
```

**Fake — implementation จริงแต่ simplified**
```python
class FakeRoomRepo:
    def __init__(self, rooms):
        self._rooms = {r.id: r for r in rooms}

    def find_by_id(self, room_id):
        return self._rooms.get(room_id)

    def save(self, room):
        self._rooms[room.id] = room

# ใช้เมื่อ: ต้องการ behavior จริง ๆ แต่ไม่อยากใช้ database จริง
```

**Mock — verify ว่า method ถูกเรียก**
```python
from unittest.mock import Mock

def test_notification_sent_after_booking():
    notifier = Mock()
    service = BookingService(notifier=notifier)

    service.create_booking(room_id=1, user_id=42, ...)

    notifier.send_confirmation.assert_called_once_with(user_id=42)
# ใช้เมื่อ: ต้องการ verify ว่า side effect เกิดขึ้น
```

**Spy — record การเรียก แต่ delegate ไปยัง real implementation**
```python
# ใช้น้อย ส่วนใหญ่ใช้ Mock แทนได้
# ใช้เมื่อ: ต้องการ real behavior + verify ว่าถูกเรียก
```

| ต้องการ | ใช้ |
|---|---|
| ควบคุม return value | Stub |
| ทดแทน database/repo | Fake |
| Verify ว่า method ถูกเรียก | Mock |
| Real behavior + verify | Spy |

### กับดัก: Over-Mocking
```python
# แย่: mock ทุกอย่างจน test ไม่ได้ test อะไรเลยนอกจาก mock ของตัวเอง
def test_create_booking():
    repo = Mock()
    validator = Mock()
    calculator = Mock()
    calculator.compute.return_value = 300
    service = BookingService(repo, validator, calculator)
    service.create_booking(...)
    repo.save.assert_called_once()
    # ถ้า logic ใน service ผิดหมด test นี้ก็ยังเขียว
```
**กติกา:** mock เฉพาะสิ่งที่ข้ามขอบเขต unit (I/O, network, เวลา, random)
ส่วน logic ภายใน ให้ใช้ของจริง

### 4.2 Fixtures & Factories

**ปัญหาของ test data ที่ไม่มี harness**
```python
# แย่: ซ้ำ ๆ ในทุก test
def test_booking_confirmed():
    room = Room(id=1, name="A101", capacity=10,
                location="Building A", is_available=True,
                hourly_rate=50)
    user = User(id=42, name="John", email="john@uni.ac.th",
                student_id="6301234", ...)

def test_booking_rejected():
    room = Room(id=1, name="A101", ...)  # ซ้ำทั้งหมด
```

**Fixture — shared setup ที่ reuse ได้**
```python
@pytest.fixture
def available_room():
    return Room(id=1, name="A101", capacity=10, is_available=True)

@pytest.fixture
def student_user():
    return User(id=42, name="John", email="john@uni.ac.th")

def test_booking_confirmed(available_room, student_user):
    service = BookingService(room_repo=FakeRoomRepo([available_room]))
    result = service.create_booking(available_room.id, student_user.id, ...)
    assert result.status == "confirmed"
```

**Factory — สร้าง object ที่ยืดหยุ่น**
```python
def make_room(**overrides):
    defaults = {
        "id": 1, "name": "A101", "capacity": 10,
        "is_available": True, "hourly_rate": 50,
    }
    return Room(**{**defaults, **overrides})

def test_booking_rejected_when_full():
    full_room = make_room(capacity=0)   # override แค่ที่ต้องการ
```

> Factory ทำให้ test **อ่านแล้วรู้ทันทีว่าอะไรคือตัวแปรสำคัญ**
> `make_room(capacity=0)` บอกชัดว่า test นี้สนใจแค่ capacity — ที่เหลือไม่เกี่ยว

### 4.3 กำจัดความไม่แน่นอน (สาเหตุอันดับ 1 ของ test แกว่ง)
```python
# แย่: ผูกกับเวลาจริง — test จะพังตอนเที่ยงคืน
def is_expired(booking):
    return booking.end_at < datetime.now()

# ดี: ฉีดเวลาเข้าไป
def is_expired(booking, now):
    return booking.end_at < now

def test_expired_booking():
    assert is_expired(make_booking(end_at=T("12:00")), now=T("13:00")) is True
```
เช่นเดียวกับ `random`, UUID, และ network — ทั้งหมดต้องควบคุมได้จาก test

---

## 5. กับดักใหญ่: AI-Generated Tests ที่ไม่มีค่า (8 นาที)

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

### 4 อาการที่พบบ่อยใน AI-generated tests

| อาการ | ตัวอย่าง | ทำไมอันตราย |
|---|---|---|
| **Test constructor** | `assert obj is not None` | coverage ขึ้น แต่ไม่ป้องกันอะไร |
| **Assert ตาม implementation** | เช็คว่า private method ถูกเรียก | refactor ทีไรแดงทุกที ทั้งที่ behavior ถูก |
| **Mock ทุกอย่าง** | ดูหัวข้อ over-mocking | test ตัวเอง ไม่ได้ test code |
| **ลอก logic มาไว้ใน assert** | `assert price == hours * RATE` | ถ้าสูตรผิด ทั้ง code และ test ผิดพร้อมกัน |

### วิธีตรวจแบบมือ: Zombie Test Detection
Comment out business logic แล้วดูว่า test ยัง pass ไหม:
```python
def create_booking(self, room_id, ...):
    room = self.room_repo.find_by_id(room_id)
    # if not room.is_available:        ← comment out
    #     raise RoomNotAvailableError()
    return Booking(...)

# ถ้า test ยัง pass → test นั้นไม่ได้ protect logic นี้
```

### วิธีตรวจแบบอัตโนมัติ: Mutation Testing
Mutation testing ทำสิ่งเดียวกันให้อัตโนมัติ — มันแก้ code ของเราทีละจุด
(เปลี่ยน `>` เป็น `>=`, ลบบรรทัด, สลับ `and`/`or`) แล้วดูว่ามี test แดงไหม

```bash
# Python
pip install mutmut && mutmut run

# JavaScript / TypeScript
npx stryker run
```

- **mutant killed** = มี test จับได้ → ดี
- **mutant survived** = แก้ code แล้วไม่มีใครรู้ → ตรงนั้นคือช่องโหว่ของ test suite

> Coverage บอกว่า "บรรทัดนี้ถูกรัน" — mutation score บอกว่า "บรรทัดนี้ถูกปกป้อง"
> อย่างที่สองคือสิ่งที่เราต้องการจริง ๆ และคือสิ่งที่ทำให้ AI agent เชื่อถือได้

### วิธีสั่ง AI ให้เขียน test ที่มีค่า
```
Write unit tests for BookingService.create_booking.

Rules:
- Each test must fail if I delete one specific business rule.
  Name the rule in the test name.
- Do not assert on private methods or internal call order.
- Use the existing factories in tests/factories.py — do not create new fixtures.
- Cover these cases: [ลิสต์จาก unit-brief.md]
- No test that only checks the constructor.
```

จากนั้น **ตรวจทุกตัวด้วยคำถามเดียว**: "ลบ logic อะไรออกแล้ว test นี้จะแดง"
ถ้าตอบไม่ได้ ให้ลบ test นั้นทิ้ง

---

## Key Takeaways
- Unit Test Harness = test doubles + fixtures + factories ที่ทำให้ test รันได้อย่าง isolated
- เลือก test double ให้ถูกประเภท: Stub/Fake สำหรับ data, Mock สำหรับ verify behavior — และอย่า mock เกินจำเป็น
- Coverage สูงไม่ได้แปลว่าปลอดภัย ใช้ zombie test detection หรือ mutation testing วัด fidelity
- AI generate tests ได้เร็วแต่มักสร้าง trivial tests — คำถามคัดกรองคือ "ลบอะไรออกแล้วมันจะแดง"
- Test suite ที่เร็วและซื่อสัตย์คือสิ่งที่ทำให้ AI agent ทำงานได้จริง ไม่ใช่แค่ดูเหมือนทำงาน

---

## AI-DLC Connection: Construction Phase — Test Stage

ใน AI-DLC Construction Phase แต่ละ bolt จบด้วย **Test Stage**:

```
Construction Bolt (DDD):
Model → Design → ADR → Implement → [Test] ← วันนี้
```

สิ่งที่ทำใน lab วันนี้ = Test stage ของ bolt:
- **Unit Test Harness** = infrastructure ที่ทำให้ test stage รันได้อย่าง isolated
- **Test Doubles** = testing ใน isolation โดยไม่ต้องพึ่ง external services
- **Fixtures/Factories** = ensure consistent test data ทุก bolt run

Human checkpoint ใน Test Stage: ทุก test ต้องผ่าน review ก่อน bolt ถือว่า "Done"
AI propose tests → human verify ว่า tests วัด business logic จริง ๆ ไม่ใช่แค่ดัน coverage

> เมื่อ harness นี้พร้อม เราจะเปิดให้ agent วน loop เองได้ยาวขึ้นในสัปดาห์ถัด ๆ ไป
> เพราะมีสัญญาณที่เชื่อถือได้คอยหยุดมันเมื่อทำพัง
