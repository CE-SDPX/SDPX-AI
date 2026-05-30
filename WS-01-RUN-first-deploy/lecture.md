# Lecture: First Deployment, Harness Mindset & Skill Intro

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (5 นาที)

เปิด entry tickets ที่นักศึกษาส่งมา ตอบเฉพาะปัญหา setup ที่คนสงสัยมากที่สุด
ถ้าทุกคน setup ได้แล้ว ข้ามส่วนนี้

---

## 2. แนะนำ Project: Campus Service Hub (5 นาที)

แต่ละกลุ่มจะพัฒนา web application สำหรับบริการในมหาวิทยาลัย
6 กลุ่ม เลือก domain ที่ไม่ซ้ำกัน เช่น:
- ระบบจองห้อง
- ระบบยืมอุปกรณ์
- ระบบนัดอาจารย์ที่ปรึกษา
- ระบบแจ้งซ่อม
- ระบบติดตามการบ้าน
- ระบบสมัครกิจกรรม

Tech stack: **Next.js** (frontend + backend) หรือ **FastAPI + React**
ทุกกลุ่มใช้ stack เดียวกัน

---

## 3. AI Ethics ในการพัฒนาซอฟต์แวร์ (5 นาที)

### หลักการ: AI เป็นเครื่องมือ ไม่ใช่ผู้รับผิดชอบ

**ใช้ได้:**
- scaffold boilerplate และ repetitive code
- อธิบาย error messages และ debug
- suggest implementation approaches
- generate test cases และ documentation

**ต้องระวัง:**
- อย่า commit code ที่อ่านไม่ออก — ถ้าอธิบายไม่ได้ ให้อ่านก่อนเสมอ
- อย่าส่ง API keys, passwords, หรือ personal data เข้า AI tools
- AI hallucinate API ที่ไม่มีจริงได้ — verify กับ official docs เสมอ
- AI-generated code มี security vulnerabilities ได้ — ต้อง review

**กฎทองของวิชานี้:**
> "ถ้า oral defense ถามแล้วตอบไม่ได้ว่า code ทำอะไร — นั่นคือ code ที่ไม่ควร commit"

---

## 4. Harness Mindset (10 นาที)

### Harness คืออะไร

Test Harness ในความหมายดั้งเดิมคือ infrastructure ที่ห่อหุ้ม system เพื่อให้รันและตรวจสอบได้ในสภาพแวดล้อมที่ควบคุมได้

ในวิชานี้ขยายความหมายให้กว้างขึ้น:

> **Harness = โครงสร้างใดๆ ที่ทำให้ system รันซ้ำได้, เชื่อถือได้, และตรวจสอบได้**

### Harness มีอยู่ทุกระดับ

```
Production
    ↑
[Performance Harness]   ← k6, baseline, synthetic monitoring
    ↑
[Pipeline Harness]      ← CI/CD รัน harness ทั้งหมดอัตโนมัติ
    ↑
[Environment Harness]   ← Docker, reproducible dev environment
    ↑
[E2E Harness]           ← Playwright fixtures, seed data
    ↑
[Unit Test Harness]     ← test doubles, factories, isolation
    ↑
[Contract Harness]      ← OpenAPI spec, consumer-driven contracts
    ↑
[Repo Harness]          ← branch strategy, deploy pipeline
```

### ทำไม Harness สำคัญ

**ไม่มี harness:**
- "works on my machine" — รันได้ในเครื่องตัวเองแต่พังใน production
- test ที่รันทีไรก็ผลต่างกัน
- deploy แล้วไม่รู้ว่า break อะไรไปบ้าง
- refactor แล้วกลัวว่าจะพังอะไร

**มี harness:**
- ทุกคนใน team รันได้เหมือนกัน
- ปัญหาถูกจับก่อนถึง production
- deploy ด้วยความมั่นใจ
- refactor ได้โดยมี safety net

### Harness ที่จะสร้างตลอด 8 สัปดาห์

| Wฆ | Harness ที่เพิ่ม |
|---|---|
| 01 | Repo & deploy harness |
| 02 | Contract harness (OpenAPI spec) |
| 03 | Unit test harness (doubles, fixtures) |
| 04 | E2E harness (Playwright fixtures, seed data) |
| 05 | Environment harness (Docker + test container) |
| 06 | Pipeline harness (CI รัน harness ทั้งหมด) |
| 07 | Performance harness (k6 baseline) |
| 08 | Harness เป็น safety net สำหรับ refactor |

---

## 5. Skills ที่จะฝึกตลอด Course (5 นาที)

AI ช่วยเขียน code ได้ แต่ skills เหล่านี้คือสิ่งที่ AI ทำแทนไม่ได้:

| Skill | ทำไมสำคัญ |
|---|---|
| **Reading & explaining code** | oral defense วัดทักษะนี้โดยตรง |
| **Debugging systematically** | AI suggest fix แต่ไม่รู้ context ของปัญหา |
| **Prompt engineering** | output ของ AI ดีแค่ไหนขึ้นกับ prompt |
| **AI output verification** | AI ผิดได้ — ต้องรู้ว่าผิดตรงไหน |
| **System thinking** | เข้าใจว่า component ต่างๆ เชื่อมกันอย่างไร |
| **Technical communication** | present และ defend การตัดสินใจได้ |

### วิธีใช้ AI ให้ได้ทั้ง speed และ skill

```
❌ วิธีที่ทำให้ไม่ได้ skill:
   User: "write me a booking API"
   AI: [generates 200 lines]
   User: copy → paste → submit

✅ วิธีที่ได้ทั้ง speed และ skill:
   1. คิด design เองก่อน (5 นาที)
   2. ใช้ AI generate draft
   3. อ่านและ explain ทุก line ให้ตัวเองฟัง
   4. แก้ส่วนที่ไม่เข้าใจหรือไม่เห็นด้วย
   5. commit เฉพาะ code ที่อธิบายได้
```

---

## Key Takeaways
- Harness คือ infrastructure ที่ทำให้ทุกอย่าง reproducible — จะสร้างทีละชั้นตลอด course
- AI เป็นเครื่องมือเร่งความเร็ว แต่ responsibility อยู่ที่ developer เสมอ
- Skills ที่สำคัญที่สุดคือสิ่งที่ AI ทำแทนไม่ได้: reading, debugging, explaining
