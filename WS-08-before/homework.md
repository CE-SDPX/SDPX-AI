# Homework: เตรียมพร้อมก่อนเรียน Security & Responsible AI

## วัตถุประสงค์
ตรวจสอบ security ของ project ตัวเองเบื้องต้นก่อนเข้าห้อง เพื่อให้ lab ใช้เวลาแก้ปัญหาจริงแทนการหาปัญหา

---

## งานที่ต้องทำก่อนเข้าห้อง

### 1. เขียน Reflection
เขียน 1 หน้า (หรือ bullet points) ใน `docs/ai-reflection.md`:
- AI suggest อะไรบ้างในการ refactor
- ทำตามอะไร และทำไม
- ปฏิเสธอะไร และทำไม
- เรียนรู้อะไรจากการ review AI output

### 2. ตรวจสอบ Secrets ใน Repo
```bash
# ตรวจ GitHub Secret Scanning
# ไปที่ repo > Settings > Security > Secret scanning

# ตรวจ git history
git log --all --full-history -- "**/*.env"
git log --all --full-history -- "**/*.key"
git log --all --full-history -- "**/config.json"

# ตรวจหา patterns ที่น่าสงสัย
git log -p | grep -i "api_key\|password\|secret\|token" | head -20
```

บันทึกผลการตรวจใน `docs/security-scan.md`

### 3. ซ้อม Oral Defense
แต่ละคนในกลุ่มเตรียมตอบคำถามเหล่านี้ได้ด้วยตัวเอง (ไม่ต้องถามเพื่อน):
- "อธิบาย architecture ของ project ทั้งหมดให้ฟัง"
- "ส่วนไหนที่คุณเขียนเอง ส่วนไหนที่ AI ช่วย"
- "ถ้าเริ่มใหม่จะเปลี่ยนอะไร"

### 4. ส่ง Entry Ticket
> "ตรวจ codebase เบื้องต้น — มี secret หรือ sensitive data อยู่ใน repo ไหม"

ถ้าพบ: บอกว่าพบอะไรและแผนการแก้ไข
ถ้าไม่พบ: บอกว่าตรวจยังไงและมั่นใจแค่ไหน
