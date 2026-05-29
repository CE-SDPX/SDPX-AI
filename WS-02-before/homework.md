# Homework: เตรียมพร้อมก่อนเรียน Requirements & API Design

## วัตถุประสงค์
เตรียม environment และความเข้าใจพื้นฐานเพื่อให้ lab สัปดาห์หน้าเริ่มได้ทันที โดยไม่ต้องเสียเวลา setup ในห้อง

---

## งานที่ต้องทำให้เสร็จก่อนเข้าห้อง

### 1. ยืนยัน Environment
ทุกคนในกลุ่มต้องทำได้เองทั้งหมด:

```bash
# ยืนยันว่าทุกตัวทำงานได้
node --version        # ควรได้ v18 ขึ้นไป
python --version      # ควรได้ 3.9 ขึ้นไป
docker --version      # ควรได้ 20 ขึ้นไป
git --version         # ควรได้ 2.x
```

ถ้าตัวไหนยังไม่ได้ติดตั้ง ให้ติดตั้งก่อนและ screenshot ผลลัพธ์

### 2. เขียน README ให้ครบ
README ใน repo ต้องมี:
- ชื่อ project และ description (2-3 ประโยค)
- รายชื่อสมาชิกในกลุ่ม
- Tech stack ที่ใช้
- วิธี run local แบบ step-by-step
- Live URL

### 3. ติดตั้ง pytest หรือ Jest
ติดตั้ง testing framework ตาม stack ที่ใช้ แล้วยืนยันว่า run ได้:

**สำหรับ Python:**
```bash
pip install pytest
# สร้างไฟล์ test_sample.py
# def test_basic(): assert 1 + 1 == 2
pytest test_sample.py  # ต้องผ่าน
```

**สำหรับ JavaScript:**
```bash
npm install --save-dev jest
# เพิ่ม "test": "jest" ใน package.json scripts
# สร้างไฟล์ sample.test.js
# test('basic', () => expect(1 + 1).toBe(2))
npm test  # ต้องผ่าน
```

### 4. ส่ง Entry Ticket
ตอบคำถามต่อไปนี้ใน GitHub Issue หรือ form ที่อาจารย์กำหนด **ก่อนเข้าห้องอย่างน้อย 1 ชั่วโมง:**

> "วาด component diagram คร่าวๆ ของ project มาก่อน — คิดว่าจะมี component อะไรบ้าง"
> (วาดด้วยมือแล้วถ่ายรูป หรือใช้ Excalidraw ก็ได้)
