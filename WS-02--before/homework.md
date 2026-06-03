# Homework: เตรียมพร้อมก่อนเรียน Requirements & API Design

## งานที่ต้องทำก่อนเข้าห้อง

### 1. ติดตั้ง Testing Framework
ติดตั้งให้พร้อม เพื่อใช้ใน week ถัดไป:

**Python (pytest):**
```bash
pip install pytest pytest-cov
# ทดสอบ
echo "def test_ok(): assert 1+1==2" > test_sample.py
pytest test_sample.py  # ต้องเห็น 1 passed
rm test_sample.py
```

**JavaScript (Jest หรือ Vitest):**
```bash
npm install --save-dev vitest
# เพิ่มใน package.json: "test": "vitest"
# ทดสอบ
echo "test('ok', () => expect(1+1).toBe(2))" > sample.test.ts
npm test  # ต้องเห็น 1 passed
rm sample.test.ts
```

### 2. วาด Component Diagram
วาด component diagram คร่าวๆ ของ project กลุ่มตัวเอง
ใช้ (https://mermaid.js.org/) วาดในไฟล์ .md ใน github แล้วส่ง URL มา

### 3. ส่ง Entry Ticket
> "วาด component diagram คร่าวๆ ของ project — คิดว่าจะมี component อะไรบ้าง"
