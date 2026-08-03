# Homework: เตรียมพร้อมก่อนเรียน Code Quality & Security

## 🎯 ทำแล้วได้อะไร

| สิ่งที่จะทำได้ | ใช้ในงานจริงอย่างไร |
|---|---|
| เปิดเครื่องมือ security scanning ของ GitHub ให้ครบ | เป็นสิ่งแรกที่ทีม security ตรวจเมื่อเข้ามาดู repo |
| ตรวจ git history หา secret ที่หลุดไปแล้ว | ทักษะที่ต้องใช้จริงในวันที่มี incident |
| ให้ AI review code แล้วเก็บผลไว้วิเคราะห์ | ฝึกใช้ AI เป็นด่านแรก แล้วให้คนตัดสินด่านสุดท้าย |
| จัดลำดับความสำคัญของ alert ที่พบ | ไม่มีทีมไหนแก้ทุก alert ได้ — ทักษะคือรู้ว่าอันไหนต้องแก้ก่อน |

---

## งานที่ต้องทำก่อนเข้าห้อง

### 1. AI Review Codebase
เลือก function ที่แย่ที่สุดใน codebase และ prompt:
```
Review this code and list ALL problems you find.
Be specific about: code smells, naming issues,
missing error handling, performance problems, security issues.
Rate each issue: High / Medium / Low severity, and explain the impact.

[วาง code]
```

บันทึก response ไว้ใน `docs/ai-review.md` — **ยังไม่ต้องแก้**

### 2. เปิดเครื่องมือ Security ของ GitHub
ไปที่ repo > Settings > Code security แล้วเปิด:
- ✅ **Dependency graph**
- ✅ **Dependabot alerts** และ **Dependabot security updates**
- ✅ **Secret scanning** (+ Push protection ถ้ามีให้เลือก)
- ✅ **Code scanning** — ตั้งค่าแบบ Default setup (CodeQL)

รอให้ scan รอบแรกเสร็จ แล้ว screenshot ผลลัพธ์เก็บไว้

### 3. ตรวจสอบ Secret ใน History ด้วยตัวเอง
```bash
# ตรวจว่าเคยมี .env เข้ามาใน history ไหม
git log --all --full-history -- "**/.env*"

# ค้น pattern ที่น่าสงสัย
git log -p | grep -inE "(api[_-]?key|password|secret|token)\s*[:=]" | head -20
```

### 4. บันทึกผล
สร้าง `docs/security-pre-check.md`:
```markdown
# Security Pre-Check

## GitHub Security Features
| Feature | สถานะ | จำนวน alert |
|---|---|---|
| Dependabot alerts | เปิด/ปิด | |
| Secret scanning | เปิด/ปิด | |
| Code scanning (CodeQL) | เปิด/ปิด | |

## Alerts ที่พบ
| # | ประเภท | Severity | ไฟล์ | จะแก้/ไม่แก้ + เหตุผล |
|---|---|---|---|---|

## Secret ใน git history
[พบ/ไม่พบ — ถ้าพบ revoke แล้วหรือยัง]

## OWASP Top 10 ข้อที่เกี่ยวกับ project นี้มากที่สุด 3 ข้อ
1.
2.
3.
```

> ถ้าเจอ secret จริงใน history: **revoke key นั้นทันทีก่อนทำอย่างอื่น**
> แล้วค่อยมาคุยกันในห้องว่าจะจัดการ history อย่างไร
