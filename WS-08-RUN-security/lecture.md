# Lecture: Security, Responsible AI & Final Demo

## Learning Objectives
- ตรวจสอบและแก้ไข security vulnerabilities พื้นฐานได้
- เข้าใจ implications ของการใช้ AI-generated code ใน production
- Present และ defend project ทั้งหมดได้

---

## 1. Entry Ticket Review

อาจารย์เปิด security findings ที่กลุ่มต่างๆ พบ (anonymized):
- findings ที่ critical ที่สุดที่พบ
- กรณีที่น่าสนใจ
- pattern ที่หลายกลุ่มพลาดเหมือนกัน

---

## 2. Security: สิ่งที่ AI มักพลาด

### SQL Injection
```python
# แย่: AI บางครั้งสร้าง code แบบนี้
query = f"SELECT * FROM rooms WHERE name = '{user_input}'"
db.execute(query)
# ถ้า user_input = "'; DROP TABLE rooms; --" → ภัยพิบัติ

# ดี: Parameterized queries
query = "SELECT * FROM rooms WHERE name = ?"
db.execute(query, (user_input,))
```

### Exposed Sensitive Data in Responses
```python
# แย่: return user object ทั้งหมด
return user.__dict__  # รวม password_hash, internal_id ด้วย

# ดี: explicit fields
return {
    "id": user.public_id,
    "name": user.name,
    "email": user.email
}
```

### Missing Authorization Checks
```python
# แย่: ตรวจแค่ว่า login แล้ว
@login_required
def delete_booking(booking_id):
    booking = Booking.get(booking_id)
    booking.delete()  # ใครก็ลบ booking ของคนอื่นได้!

# ดี: ตรวจว่าเป็นเจ้าของด้วย
@login_required
def delete_booking(booking_id):
    booking = Booking.get(booking_id)
    if booking.user_id != current_user.id:
        raise ForbiddenError("Not your booking")
    booking.delete()
```

---

## 3. GitHub Secret Scanning

GitHub จะ scan ทุก push หาหา patterns เช่น:
- AWS Access Keys (`AKIA...`)
- GitHub Personal Access Tokens
- Private keys (`-----BEGIN RSA PRIVATE KEY-----`)
- Database URLs ที่มี credentials

ถ้า secret หลุด:
1. **Revoke ทันที** — ไปที่ service ที่ออก secret นั้นแล้ว revoke
2. **Generate ใหม่** — อย่าคิดว่า "ลบ commit แล้วปลอดภัย"
3. **Force push ไม่ช่วย** — history ยังอยู่ใน forks และ caches ต่างๆ

---

## 4. Responsible AI: License ของ AI-Generated Code

### สิ่งที่ยังไม่ชัดเจนในกฎหมาย
- AI-generated code ไม่มี copyright ที่ชัดเจน (ยังอยู่ระหว่าง debate ทางกฎหมาย)
- GitHub Copilot Terms อนุญาตให้ใช้ output ใน commercial products
- Claude/ChatGPT Terms คล้ายกัน แต่ควรอ่าน ToS เสมอ

### ข้อควรระวัง
- ถ้า AI generate code ที่ copy จาก open source project ที่มี GPL license — อาจมีปัญหา
- ไม่ควรส่ง proprietary code ของบริษัทเข้า public AI tools
- ไม่ควรส่ง PII ของ users เข้า AI tools

### หลักการปฏิบัติที่ดี
- ใช้ AI เป็น coding assistant ไม่ใช่ "copy-paste machine"
- Review ทุก output ก่อน commit
- Understand ก่อน use

---

## Key Takeaways
- Security ไม่ใช่ feature ที่เพิ่มทีหลัง — ต้อง build ตั้งแต่ต้น
- AI มักสร้าง functional code แต่พลาด security edge cases
- License ของ AI-generated code ยังเป็น gray area — ใช้อย่างระวัง
- Oral defense วัดว่าเข้าใจ project ของตัวเองจริงๆ ไม่ใช่แค่ทำเสร็จ
