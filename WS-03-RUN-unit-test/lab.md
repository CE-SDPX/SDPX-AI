# Lab: Unit Testing & Introduce E2E

## เวลา: 1.5 ชั่วโมง
## เป้าหมาย
สร้าง unit test harness สำหรับ project และเริ่มต้น E2E test แรก

---

## Part A: Unit Test Harness (60 นาที)

### ขั้นตอนที่ 1 — สร้าง Test Structure (10 นาที)

```
project/
├── src/
│   ├── services/
│   │   └── booking_service.py (หรือ .ts)
│   └── repositories/
│       └── room_repository.py
├── tests/
│   ├── conftest.py          ← fixtures และ factories (Python)
│   ├── factories.py         ← factory functions
│   ├── fakes/
│   │   └── fake_room_repo.py ← fake implementations
│   └── unit/
│       └── test_booking_service.py
└── TEST_PLAN.md
```

### ขั้นตอนที่ 2 — เขียน TEST_PLAN.md (10 นาที)

ระบุ business logic ที่ต้อง test:
```markdown
# Test Plan

## Functions ที่ต้อง Test
1. BookingService.create_booking()
   - ห้องว่าง → booking confirmed
   - ห้องไม่ว่าง → RoomNotAvailableError
   - เวลาซ้อนทับ → ConflictError
   - user ไม่ exists → UserNotFoundError

2. BookingService.cancel_booking()
   - booking exists และเป็นของ user → cancelled
   - booking ของคนอื่น → ForbiddenError
   - booking ไม่ exists → NotFoundError
```

### ขั้นตอนที่ 3 — สร้าง Fake Repository (10 นาที)

```python
# tests/fakes/fake_room_repo.py
class FakeRoomRepo:
    def __init__(self, rooms=None):
        self._rooms = {r.id: r for r in (rooms or [])}

    def find_by_id(self, room_id):
        return self._rooms.get(room_id)

    def find_available(self, start_time, end_time):
        return [r for r in self._rooms.values() if r.is_available]

    def save(self, room):
        self._rooms[room.id] = room
        return room
```

### ขั้นตอนที่ 4 — สร้าง Fixtures และ Factories (10 นาที)

```python
# tests/factories.py
def make_room(**overrides):
    defaults = {"id": 1, "name": "A101", "capacity": 10, "is_available": True}
    return Room(**{**defaults, **overrides})

def make_user(**overrides):
    defaults = {"id": 1, "name": "John", "email": "john@uni.ac.th"}
    return User(**{**defaults, **overrides})

# tests/conftest.py (pytest)
import pytest
from tests.factories import make_room, make_user
from tests.fakes.fake_room_repo import FakeRoomRepo

@pytest.fixture
def available_room():
    return make_room(is_available=True)

@pytest.fixture
def unavailable_room():
    return make_room(is_available=False)

@pytest.fixture
def student():
    return make_user(role="student")
```

### ขั้นตอนที่ 5 — เขียน Unit Tests (20 นาที)

เขียนด้วยตัวเองก่อน จากนั้นใช้ AI generate เพิ่ม:

```python
# tests/unit/test_booking_service.py
def test_booking_confirmed_when_room_available(available_room, student):
    repo = FakeRoomRepo([available_room])
    service = BookingService(room_repo=repo)

    result = service.create_booking(
        room_id=available_room.id,
        user_id=student.id,
        start="13:00", end="15:00"
    )

    assert result.status == "confirmed"
    assert result.room_id == available_room.id

def test_booking_rejected_when_room_unavailable(unavailable_room, student):
    repo = FakeRoomRepo([unavailable_room])
    service = BookingService(room_repo=repo)

    with pytest.raises(RoomNotAvailableError):
        service.create_booking(
            room_id=unavailable_room.id,
            user_id=student.id,
            start="13:00", end="15:00"
        )
```

**หลังใช้ AI generate tests:** Review ทุก test ด้วยคำถาม:
- Test นี้วัด business rule อะไร
- ถ้า comment out logic ออก test จะ fail ไหม

---

## Part B: Introduce E2E (30 นาที)

### ขั้นตอนที่ 6 — First E2E Test ด้วย Playwright

```typescript
// tests/e2e/smoke.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto(process.env.BASE_URL || 'http://localhost:3000');

  // ตรวจ title
  await expect(page).toHaveTitle(/Campus/);

  // ตรวจ navigation
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('main service page is accessible', async ({ page }) => {
  await page.goto('/');

  // ตรวจว่า main CTA ปรากฏ
  await expect(page.getByTestId('main-cta')).toBeVisible();
});
```

### เพิ่ม data-testid ใน Components
```tsx
// แทนที่จะใช้ class หรือ text selector
<button data-testid="submit-booking">Book Now</button>
<nav data-testid="main-nav">...</nav>
<div data-testid="room-list">...</div>
```

### รัน E2E Test
```bash
npx playwright test
# ดูผลใน terminal
npx playwright show-report  # เปิด HTML report
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `tests/` directory | Unit tests พร้อม fakes, fixtures, factories | GitHub repo |
| `TEST_PLAN.md` | รายการ functions ที่ต้อง test | GitHub repo |
| `tests/e2e/smoke.spec.ts` | E2E smoke test ผ่าน | GitHub repo |
| Coverage report | `pytest --cov` หรือ `vitest --coverage` | GitHub repo `docs/coverage/` |

### เกณฑ์ผ่าน
- [ ] Unit tests รันผ่านทั้งหมด
- [ ] มี fake repository อย่างน้อย 1 ตัว
- [ ] มี fixtures หรือ factories อย่างน้อย 2 ตัว
- [ ] E2E smoke test รันผ่าน
- [ ] ทุกคนในกลุ่มอธิบาย test ที่ตัวเองเขียนได้
