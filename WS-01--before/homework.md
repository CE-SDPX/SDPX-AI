# Homework: เตรียมพร้อมก่อนเรียน

## งานที่ต้องทำให้เสร็จก่อนเข้าห้อง

### 1. ติดตั้งและยืนยัน Tools
รันคำสั่งต่อไปนี้และ screenshot ผลลัพธ์:
```bash
node --version
python --version
docker --version
docker compose version
git --version
```

### 2. สร้าง GitHub Account
- สร้าง account ที่ https://github.com
- ตั้งชื่อ username ที่ professional (จะใช้ในอาชีพการงาน)
- เพิ่ม profile picture

### 3. ทดลอง Git เบื้องต้น
สร้าง repository แรกบน GitHub:
```bash
mkdir my-first-repo
cd my-first-repo
git init
echo "# My First Repo" > README.md
git add README.md
git commit -m "docs: add readme"
# push ขึ้น GitHub
```

### 4. ทดลอง AI Agent Loop ครั้งแรก
ใน repo เดียวกัน ให้ AI agent ที่เลือกไว้ทำงานนี้:

```
Create a Python file `fizzbuzz.py` with a function fizzbuzz(n),
and a pytest file `test_fizzbuzz.py` that tests it.
Then run pytest and fix the code until all tests pass.
```

**สิ่งที่ต้องบันทึก** (เขียนลง `LOOP_NOTES.md` ใน repo เดียวกัน):
- AI รัน test ไปกี่รอบกว่าจะเขียว
- มีรอบไหนที่ test แดงแล้ว AI แก้ถูกทันทีไหม
- ถ้า **ไม่มี** test ให้ AI รันเลย คุณคิดว่าผลจะต่างไปอย่างไร

> นี่คือการทดลอง "loop" ครั้งแรกของวิชา — เราจะกลับมาคุยเรื่องนี้ในห้อง
> ถ้า agent ที่ใช้รัน command ไม่ได้ ให้รัน `pytest` เองแล้ววาง error กลับไปให้ AI
> แล้วบันทึกว่าต้องวนกี่รอบ

### 5. ห้ามลืม
- อย่า commit ไฟล์ `.env` หรือ key ใด ๆ ตั้งแต่ repo แรก
- ถ้าเผลอ commit key ไปแล้ว ให้ **revoke key นั้นทันที** — การลบ commit ไม่ช่วย
