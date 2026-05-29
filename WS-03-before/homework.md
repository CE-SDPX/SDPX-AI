# Homework: เตรียมพร้อมก่อนเรียน Unit Testing

## วัตถุประสงค์
ติดตั้ง testing framework และเขียน test แรกให้ได้ก่อนเข้าห้อง เพื่อให้ lab เริ่มได้ทันทีโดยไม่ต้องเสียเวลา setup

---

## งานที่ต้องทำให้เสร็จก่อนเข้าห้อง

### 1. Revise Backlog หลัง Feedback
- แก้ไข user stories ตาม feedback ที่ได้รับ
- เพิ่ม edge case stories ที่ AI suggest และกลุ่มเห็นว่า valid
- ทุก story ต้องมี acceptance criteria ที่ pass/fail ได้

### 2. วาด Wireframe 3 Screens หลัก
วาด wireframe (ไม่ต้อง hi-fi) สำหรับ 3 หน้าที่สำคัญที่สุด เช่น:
- หน้า List รายการ
- หน้า Create/Form
- หน้า Detail

ใช้ Excalidraw, Figma, หรือวาดมือแล้วถ่ายรูปก็ได้ เพิ่มใน `docs/wireframes/`

### 3. ยืนยัน Testing Framework ทำงานได้
ต้องทำก่อนเข้าห้อง:

**Python (pytest):**
```bash
pip install pytest pytest-cov
# สร้างไฟล์ tests/test_sample.py
# def test_basic():
#     assert 1 + 1 == 2
pytest tests/  # ต้องเห็น 1 passed
```

**JavaScript (Jest):**
```bash
npm install --save-dev jest @types/jest
# เพิ่มใน package.json: "test": "jest"
# สร้างไฟล์ src/sample.test.js
# test('basic', () => expect(1 + 1).toBe(2))
npm test  # ต้องเห็น 1 passed
```

### 4. ส่ง Entry Ticket
> "เขียน 1 test case สำหรับ feature ที่วางแผนจะทำ — pseudocode ก็ได้"

ตัวอย่าง pseudocode ที่ acceptable:
```
test: ถ้าห้องว่าง และ user จอง → booking status = confirmed
test: ถ้าห้องไม่ว่าง และ user พยายามจอง → error "Room not available"
```
