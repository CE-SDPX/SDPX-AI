# Lab: Security Audit & Final Preparation

## เป้าหมาย
ตรวจสอบและแก้ไข security issues ทั้งหมดก่อน final demo

---

## ขั้นตอนที่ 1 — Security Audit Checklist (45 นาที)

ตรวจสอบทุกข้อต่อไปนี้และ document ผลใน `docs/security-checklist.md`:

### Secrets & Configuration
- [ ] ไม่มี hardcoded passwords, API keys, หรือ tokens ใน code
- [ ] ไม่มี .env files ใน git history (`git log -- "**/*.env"`)
- [ ] Environment variables ทุกตัวถูก define ใน GitHub Secrets หรือ .env.example
- [ ] GitHub Secret Scanning ไม่พบอะไร

### Authentication & Authorization
- [ ] ทุก protected endpoint ตรวจสอบ authentication
- [ ] ทุก action ตรวจสอบว่า user มีสิทธิ์จริงๆ (ไม่ใช่แค่ login แล้ว)
- [ ] Passwords ถูก hash (bcrypt, argon2) — ไม่ใช่ plaintext หรือ MD5

### Input Validation
- [ ] ทุก user input ถูก validate ก่อนใช้
- [ ] ไม่มี SQL query ที่ใช้ string concatenation
- [ ] File uploads (ถ้ามี) ตรวจสอบ file type และ size

### Data Exposure
- [ ] API responses ไม่ expose fields ที่ไม่จำเป็น (passwords, internal IDs)
- [ ] Error messages ไม่ leak technical details ให้ users

### แก้ไขทุก issue ที่พบใน lab นี้ก่อนออกจากห้อง

---

## ขั้นตอนที่ 2 — Final Demo Preparation (30 นาที)

เตรียม demo script:
1. User journey ที่จะ demo (เลือก 2-3 features ที่ดีที่สุด)
2. ลำดับการ demo ที่ smooth ที่สุด
3. ซ้อม demo ในกลุ่ม — ทุกคนต้องรู้ว่าจะ present ส่วนไหน
4. เตรียม staging environment ให้มี test data พร้อม

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `docs/security-checklist.md` | ทุกข้อ checked พร้อมหมายเหตุ | GitHub repo |
| Fixed security issues | Code แก้แล้ว tests ยังผ่าน | GitHub repo |
| Final codebase | Clean, documented, ready for demo | GitHub repo |

### เกณฑ์ผ่าน
- Security checklist ครบทุกข้อ (ไม่ใช่แค่ tick ผ่านๆ)
- ทุก critical issue ได้รับการแก้ไข
- App ทำงานได้บน staging environment
