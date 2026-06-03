# Homework: เตรียมพร้อมก่อนเรียน Code Quality & Security

## งานที่ต้องทำก่อนเข้าห้อง

### 1. AI Review Codebase
เลือก function ที่แย่ที่สุดใน codebase และ prompt:
```
Review this code and list ALL problems you find.
Be specific about: code smells, naming issues,
missing error handling, performance problems, security issues.
Rate each issue: High / Medium / Low severity.

[วาง code]
```

บันทึก response ไว้ใน `docs/ai-review.md`

### 2. ตรวจสอบ Security เบื้องต้น
```bash
# ตรวจ secrets ใน git history
git log --all --full-history -- "**/.env*"
git log -p | grep -iE "password|api_key|secret" | head -10

# ตรวจ GitHub Secret Scanning
# ไปที่ repo > Settings > Security > Secret scanning
```

บันทึกสิ่งที่พบใน `docs/security-pre-check.md`

### 3. ส่ง Entry Ticket
> "ส่ง 1 function จาก codebase ที่คิดว่าแย่ที่สุด พร้อมบอกว่าทำไม"

อาจารย์จะเปิดให้ class review (anonymized)
