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

**JavaScript / TypeScript (Vitest):**
```bash
npm install --save-dev vitest @vitest/coverage-v8
# เพิ่มใน package.json: "test": "vitest run", "test:watch": "vitest"
# ทดสอบ
echo "import {test, expect} from 'vitest'; test('ok', () => expect(1+1).toBe(2))" > sample.test.ts
npm test  # ต้องเห็น 1 passed
rm sample.test.ts
```

### 2. เพิ่มคำสั่ง test ลงใน AGENTS.md
เปิด `AGENTS.md` ที่สร้างไว้ใน WS-01 แล้วยืนยันว่าบรรทัด `test:` ชี้ไปคำสั่งที่รันได้จริง

```bash
# ทดสอบว่า agent จะรันได้จริง — copy คำสั่งจาก AGENTS.md มารันตรง ๆ
npm test     # หรือ  pytest
```

> ถ้าคำสั่งใน `AGENTS.md` รันไม่ได้ แปลว่า loop ของ agent จะพังตั้งแต่ขั้น Verify

### 3. วาด Component Diagram
วาด component diagram คร่าว ๆ ของ project กลุ่มตัวเอง
ใช้ Mermaid (https://mermaid.js.org/) เขียนในไฟล์ `.md` แล้ว push ขึ้น GitHub
— GitHub render Mermaid ให้อัตโนมัติ ทำให้ diagram อยู่ใน version control และ AI อ่านได้

### 4. เตรียมคำถามสำหรับ Spec
เขียน 3 คำถามที่ **ยังตอบไม่ได้** เกี่ยวกับ requirement ของ project
เช่น "นักศึกษาจองล่วงหน้าได้กี่วัน" "ยกเลิกได้ถึงเมื่อไหร่" "หนึ่งคนจองพร้อมกันได้กี่ห้อง"

> คำถามพวกนี้คือช่องว่างที่ AI จะ "เดาแทน" ให้ถ้าเราไม่ตอบเอง — และมันมักเดาผิด
