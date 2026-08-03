# Lecture: Code Quality, Security & the Quality Loop

## เวลา: 30 นาที

---

## 1. Entry Ticket Review: Code ที่แย่ที่สุด (4 นาที)

เปิด code samples ที่กลุ่มต่าง ๆ ส่งมา (anonymized) discuss ร่วมกัน:
- Code smell นี้คืออะไร
- ทำไมถึงแย่ — impact คืออะไร
- ถ้าจะแก้ควรเริ่มจากตรงไหน

แล้วเปิดคำตอบข้อ 2: "function นี้มี test อะไรคุ้มครองอยู่บ้าง"
กลุ่มที่ตอบว่า "ไม่มีเลย" คือกลุ่มที่ **ยังแก้ไม่ได้** — ต้องเขียน test ก่อน

---

## 2. Quality Loop (4 นาที)

```
Review ──→ Refactor ──→ Verify ──→ Document (ADR)
   ↑                        │
   └────── ถ้าแดง revert ────┘
```

Quality Loop เป็น loop เดียวในวิชานี้ที่ **ไม่ได้เพิ่ม feature อะไรเลย**
มันมีไว้ลด "หนี้" ที่สะสมจาก 7 สัปดาห์ก่อน

**และมันทำงานได้ก็เพราะมี test harness จาก WS-03/WS-04 เป็นตาข่ายนิรภัย**

```
สมการแห่งหายนะ:
Code ที่ต้อง refactor + ไม่มี test = วิธีที่ดีที่สุดในการ break production

ขั้นตอนที่ถูกต้อง:
1. เขียน test ครอบคลุม behavior ที่ต้องรักษาก่อน
2. ยืนยัน test เขียวกับ code เก่า
3. Refactor ทีละก้าวเล็ก ๆ
4. รัน test หลังทุกก้าว — ต้องเขียวตลอด
5. ถ้าแดง → revert ทันที ไม่ต้องพยายามแก้ต่อ
```

> Refactoring คือการเปลี่ยน **โครงสร้าง** โดย **ไม่เปลี่ยนพฤติกรรม**
> ถ้าไม่มีอะไรยืนยันว่าพฤติกรรมไม่เปลี่ยน — สิ่งที่ทำอยู่ไม่ใช่ refactoring แต่คือการเขียนใหม่แล้วภาวนา

---

## 3. Code Smells ที่พบบ่อย (6 นาที)

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

### Primitive Obsession
```python
# แย่: string/int ลอย ๆ ที่ไม่รู้ว่าหน่วยอะไร รูปแบบไหน
def create_booking(room: int, start: str, end: str, price: float): ...

# ดี: type ที่บอกความหมายและ validate ตัวเองได้
def create_booking(room: RoomId, slot: TimeSlot, price: Money): ...
```

### Smell ยุคใหม่: AI-Shaped Code
code ที่ AI สร้างมีกลิ่นเฉพาะตัวที่ควรจับให้ได้:

| อาการ | ตัวอย่าง |
|---|---|
| **Duplicate abstraction** | มี `formatDate` อยู่แล้ว 3 ที่ AI สร้างอันที่ 4 |
| **Over-defensive** | `try/except` ครอบทุกบรรทัดจนกลืน error จริง |
| **Comment ที่แปลชื่อฟังก์ชัน** | `# increment counter` เหนือ `counter += 1` |
| **Config ที่ไม่มีใครใช้** | option/flag ที่ generate มาแต่ไม่มีที่เรียก |
| **Pattern เกินขนาดงาน** | Factory + Strategy + Observer สำหรับ CRUD 3 endpoint |

สาเหตุคล้ายกันทั้งหมด: AI ไม่เห็นภาพรวมของ repo และไม่รู้ว่าอะไรมีอยู่แล้ว
→ แก้ด้วย context engineering (บอกให้มันอ่านไฟล์ที่เกี่ยวก่อน) ไม่ใช่ด้วยการบ่น

---

## 4. AI Code Review: เชื่อตรงไหน ปฏิเสธตรงไหน (5 นาที)

### Prompt ที่ได้ผล
```
Review this function. For each issue:
1. Specific code smell or problem name
2. WHY it's a problem (impact on this codebase)
3. Concrete fix with example
4. Severity: High/Medium/Low
Do not suggest new design patterns unless the current code has a concrete
problem they solve. Prefer the smallest change that removes the problem.
```

| เชื่อ AI เมื่อ | ระวัง AI เมื่อ |
|---|---|
| ชี้ naming ที่ไม่ชัดเจน | แนะนำ design pattern ที่ไม่จำเป็น |
| พบ duplicate code | เสนอ refactor ทุกอย่างในครั้งเดียว |
| แนะนำ extract method | ไม่รู้ business context ว่าทำไม code ถึงเป็นแบบนั้น |
| ชี้ missing error handling | บอกว่า "อาจมีปัญหา performance" โดยไม่มีการวัด |
| ชี้ SQL string concatenation | ตัดสินเรื่องที่ต้องรู้ domain เช่น กฎการยกเลิกการจอง |

**หลักที่ใช้ตัดสิน:** AI เก่งเรื่องที่ตัดสินได้จาก code ที่เห็นตรงหน้า
และอ่อนเรื่องที่ต้องรู้สิ่งที่ไม่อยู่ใน context

---

## 5. Security: สิ่งที่ AI มักพลาด (6 นาที)

### SQL Injection
```python
# แย่: AI บางครั้งสร้าง code แบบนี้เมื่อขอ "dynamic filter"
query = f"SELECT * FROM rooms WHERE name = '{user_input}'"
# ถ้า user_input = "'; DROP TABLE rooms; --" → disaster

# ดี: Parameterized queries
db.execute("SELECT * FROM rooms WHERE name = ?", (user_input,))
```

### Missing Authorization
```python
# แย่: ตรวจแค่ว่า login แล้ว
@login_required
def delete_booking(booking_id):
    Booking.get(booking_id).delete()   # ใครก็ลบ booking ของคนอื่นได้

# ดี: ตรวจ ownership ด้วย
@login_required
def delete_booking(booking_id):
    booking = Booking.get(booking_id)
    if booking.user_id != current_user.id:
        raise ForbiddenError("Not your booking")
    booking.delete()
```
> นี่คือ **Broken Access Control** — อันดับ 1 ของ OWASP Top 10
> และเป็นสิ่งที่ AI มองไม่เห็น เพราะมันไม่รู้ว่าใครควรทำอะไรได้บ้างในระบบเรา

### Exposed Sensitive Data
```python
# แย่: return ทั้ง object
return user.__dict__          # รวม password_hash, internal_id

# ดี: explicit fields
return {"id": user.public_id, "name": user.name}
```
เช็คด้วยว่า **log ก็รั่วได้** (จาก WS-07) และ **error message ก็รั่วได้**
```python
return {"error": str(e)}      # ❌ อาจมี connection string อยู่ข้างใน
```

### Endpoint ที่ลืมปิด
`/api/test/seed` และ `/api/test/cleanup` จาก WS-04 —
เปิดดูตอนนี้เลยว่ามี guard กัน production หรือยัง

### ความเสี่ยงใหม่: Excessive Agency ของ AI Agent
เมื่อเราให้ agent รันคำสั่งได้เอง เราได้สร้างช่องทางใหม่ขึ้นมา:

| ความเสี่ยง | ตัวอย่าง | ป้องกัน |
|---|---|---|
| **Prompt injection** | issue/README/หน้าเว็บที่ agent อ่าน มีข้อความสั่งให้มันทำอย่างอื่น | ถือว่าทุกอย่างที่ agent *อ่าน* คือข้อมูล ไม่ใช่คำสั่ง |
| **Excessive agency** | agent รัน `git push --force` หรือลบไฟล์ | จำกัดคำสั่งที่อนุญาต, review diff ก่อน commit เสมอ |
| **Data leak** | วาง production log ที่มี email เข้า chat | redact ก่อน (จาก WS-07) |
| **Secret ใน context** | agent อ่าน `.env` แล้วเผลอเขียนค่าลงไฟล์อื่น | `.env` อยู่ใน `.gitignore` + ห้ามใน `AGENTS.md` |

> กติกาที่ใช้ได้จริง: **AI เสนอ diff — คนเป็นคนกด commit**
> อย่าให้ขั้น "ลงมือทำจริงกับของจริง" อยู่นอกสายตาคน

---

## 6. Responsible AI: License & Privacy (3 นาที)

### License ของ AI-Generated Code
- ผู้ให้บริการรายใหญ่อนุญาตให้ใช้ output ใน commercial products — แต่ **อ่าน ToS ของตัวที่ใช้จริงเสมอ**
- ถ้า AI generate code ที่คล้ายของ GPL project มาก — อาจมีปัญหาเรื่อง license
- ในงานจริง หลายบริษัทมีนโยบายของตัวเองที่เข้มกว่า ToS

### อย่าส่งเข้า AI Tools
- Passwords, API keys, tokens (แม้ใน comment)
- Personal data ของ users (email, ชื่อจริง, รหัสนักศึกษา)
- Proprietary business logic ที่เป็น confidential
- Code ของบริษัทที่มี NDA

### หลักการ
```
✅ ใช้ AI draft code → review → understand → commit
❌ ใช้ AI generate → copy → paste → hope it works
```

---

## 7. ADR: บันทึกการตัดสินใจ (2 นาที)

ADR แก้ปัญหา "ทำไมตอนนั้นถึงเลือกแบบนี้" ที่ไม่มีใครตอบได้ในอีก 6 เดือน

```markdown
# ADR-[number]: [Title]

## Status
Proposed / Accepted / Superseded by ADR-XXX

## Context
[ทำไมถึงต้องตัดสินใจเรื่องนี้ — constraint อะไรบ้าง]

## Decision
[ตัดสินใจอะไร]

## Alternatives Considered
[ทางเลือกอื่น + ทำไมถึงไม่เลือก]

## Consequences
Positive: [ข้อดี]
Negative: [trade-offs ที่ยอมรับ]

## AI-DLC Note
[AI เสนออะไร / human เห็นด้วยหรือ push back อะไร เพราะรู้อะไรที่ AI ไม่รู้]
```

section **Alternatives Considered** สำคัญที่สุด เพราะมันบอกว่า
เราคิดถึงทางอื่นแล้ว ไม่ใช่หยิบอันแรกที่ AI เสนอมาใช้

---

## Key Takeaways
- Quality Loop ทำงานได้เพราะมี test harness จาก WS-03/WS-04 เป็นตาข่ายนิรภัย
- Refactor ทีละก้าวเล็ก ๆ รัน test ทุกก้าว แดงเมื่อไหร่ revert ทันที
- AI เก่งเรื่องที่ตัดสินจาก code ตรงหน้า อ่อนเรื่องที่ต้องรู้ context ที่ไม่ได้ให้ไป
- Security: Broken Access Control คือข้อที่ AI มองไม่เห็นที่สุด และคือข้อที่พบบ่อยที่สุด
- ยุค agent มีความเสี่ยงใหม่: prompt injection และ excessive agency — คนต้องอยู่ตรงจุดที่ลงมือจริง
- ADR บันทึก "ทางที่ไม่ได้เลือก" ไม่ใช่แค่ทางที่เลือก

---

## AI-DLC Connection: Construction Phase — ADR Stage

```
DDD Construction Bolt:
Domain Model → Technical Design → [ADR] → Implement → Test
                                     ↑
                                  วันนี้
```

### ทำไม ADR ถึงอยู่ก่อน Implement
- AI มักเลือก solution ที่ common แต่ไม่ตรงกับ context ของ project
- Human ต้อง validate ว่า decision นี้เหมาะกับ constraints จริง ๆ
- ถ้าตัดสินใจผิด เปลี่ยนตอน ADR ถูกกว่าตอน code เขียนแล้วมาก

### ปิดท้ายทั้งวิชา: loop ครบวงแล้ว

```
Spec Loop        → รู้เร็วว่าเข้าใจโจทย์ผิด
Unit Test Loop   → รู้เร็วว่า logic ผิด          [harness]
Acceptance Loop  → รู้เร็วว่า journey พัง        [harness]
Environment Loop → รู้เร็วว่าที่อื่นรันไม่ได้
Integration Loop → รู้ทุกครั้งโดยหลบไม่ได้
Production Loop  → รู้ว่าสมมติฐานของเราผิดตรงไหน
Quality Loop     → กล้าแก้ เพราะมีตาข่ายรอง
```

> เครื่องมือในวิชานี้จะล้าสมัย — Playwright, k6, Actions จะถูกแทนที่ในไม่กี่ปี
> แต่คำถาม "ฉันจะรู้ได้เร็วแค่ไหนว่าสิ่งที่เพิ่งทำไปมันผิด และฉันเชื่อสัญญาณนั้นได้แค่ไหน"
> จะยังเป็นคำถามเดิมเสมอ ไม่ว่าจะมี AI เก่งขึ้นอีกกี่รุ่น
