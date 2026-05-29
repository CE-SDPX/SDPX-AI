# Homework: เตรียมพร้อมก่อนเรียน Refactoring & Code Quality

## วัตถุประสงค์
เตรียม code ที่แย่ที่สุดจาก project และผล AI review ไว้ เพื่อให้ใช้เวลา lab ทำ refactoring จริงแทนการหา code

---

## งานที่ต้องทำก่อนเข้าห้อง

### 1. แก้ไข Bottleneck 1 จุด
จาก performance report สัปดาห์ที่แล้ว แก้ bottleneck ที่สำคัญที่สุด 1 จุด:

```bash
# วัดก่อนแก้ (บันทึกผล)
k6 run performance/load-test.js

# แก้ code
# ...

# วัดหลังแก้ (เปรียบเทียบ)
k6 run performance/load-test.js
```

บันทึกผล before/after ใน `docs/performance-improvement.md`

### 2. ใช้ AI Review Code และบันทึกผล
เลือก function ที่คิดว่าแย่ที่สุดใน codebase และ prompt:

```
Review this code and list ALL problems you find.
Be specific about: code smells, naming issues,
missing error handling, performance problems, and security issues.

[วาง code]
```

บันทึก AI response ไว้ในไฟล์ `docs/ai-review.md`
จะนำมาใช้ใน lab สัปดาห์หน้า

### 3. ส่ง Entry Ticket
> "ส่ง 1 function จาก codebase ที่คิดว่าแย่ที่สุด พร้อมบอกว่าทำไม"

ส่งทั้ง code และเหตุผล — อาจารย์จะเปิดให้ class discuss (anonymized)
