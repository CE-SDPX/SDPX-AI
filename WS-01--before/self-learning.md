# Self-Learning: เตรียมตัวก่อนเรียนครั้งแรก

## วัตถุประสงค์
เตรียม environment และความรู้พื้นฐานให้พร้อมก่อนเข้าห้องเรียน
อาจารย์จะไม่สอนซ้ำเนื้อหาเหล่านี้ แต่จะตอบเฉพาะจุดที่สงสัยจาก entry ticket

---

## สิ่งที่ต้องติดตั้ง

### 1. ติดตั้ง Tools ทั้งหมด
```bash
# ยืนยันว่าแต่ละตัวทำงานได้
node --version        # ควรได้ v18 ขึ้นไป
python --version      # ควรได้ 3.9 ขึ้นไป
docker --version      # ควรได้ 20 ขึ้นไป
git --version         # ควรได้ 2.x
```

- Node.js: https://nodejs.org
- Python: https://www.python.org
- Docker Desktop: https://www.docker.com/products/docker-desktop
- VS Code: https://code.visualstudio.com

### 2. ติดตั้ง VS Code Extensions
- GitHub Copilot (ต้องมี GitHub account)
- GitLens
- Docker
- Prettier

### 3. สร้าง Accounts
- GitHub: https://github.com
- Vercel: https://vercel.com (sign in ด้วย GitHub)

---

## สิ่งที่ต้องศึกษา

### Git & GitHub
- [video] Git and GitHub Crash Course for Beginners — freeCodeCamp
  (https://www.youtube.com/watch?v=l2yrJtwoC_E)
  ดู 30 นาทีแรก เน้น: clone, add, commit, push, branch, pull request

- [reading] Git Official Documentation — Getting Started
  (https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

**จุดที่ต้องเข้าใจ:**
- clone, add, commit, push คืออะไร ต่างกันอย่างไร
- branch คืออะไร ทำไมต้องใช้
- pull request คืออะไร

### GitHub Copilot
- [reading] Getting Started with GitHub Copilot
  (https://docs.github.com/en/copilot/getting-started-with-github-copilot)

**จุดที่ต้องเข้าใจ:**
- Copilot ช่วยอะไรได้บ้าง
- Copilot ไม่ได้ช่วยอะไร และต้องระวังอะไร

---

## Entry Ticket
ส่งก่อนเข้าห้องอย่างน้อย 1 ชั่วโมง:

> "ติดตั้ง tools ครบแล้วหรือยัง และมีตัวไหนที่ติดปัญหาบ้าง"

ถ้าติดปัญหา: บอก error message ที่เจอ
ถ้าไม่มีปัญหา: บอกว่า version ของแต่ละ tool เป็นอะไร
