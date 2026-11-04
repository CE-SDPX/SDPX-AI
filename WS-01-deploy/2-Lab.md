# WS-01 · Lab — Deploy Loop

**รูปแบบ:** งานกลุ่ม ใช้ project ของกลุ่มตามที่กำหนดใน `PROJECT.md`

**เป้าหมาย:** เมื่อ push code เข้า `main` แล้ว CI ตรวจผ่าน ระบบนำขึ้นเว็บจริงโดยอัตโนมัติ
และกลุ่มวัดได้ว่ากระบวนการทั้งหมดใช้เวลาเท่าใด

lab ทุกบทในวิชานี้เป็นการพัฒนา project เดียวกันต่อเนื่องกัน
งานที่ทำในวันนี้จะเป็นพื้นฐานของบทถัดไปทั้งหมด

---

## สิ่งที่ต้องมีก่อนเริ่ม

ทุกคนในกลุ่มต้องทำ `0-Before.md` ส่วน B และ C เสร็จแล้ว
หากสมาชิกคนใดยังติดตั้งไม่ครบ ให้ใช้เครื่องของเพื่อนในกลุ่มทำงานไปก่อน และติดตั้งให้เรียบร้อยหลังคาบ

---

## ขั้นตอนที่ 1 — สร้าง repository จาก template

**ทำ**

1. สมาชิกคนที่ 1 เปิด `https://github.com/CE-SDPX/sdpx-template` แล้วเลือก **Use this template**
2. ตั้งชื่อ repository เป็น `sdpx-[ชื่อกลุ่ม]` และกำหนดเป็น Public
3. เพิ่มสมาชิกทุกคนเป็น collaborator ที่ Settings > Collaborators
4. สมาชิกทุกคน clone repository ลงเครื่องของตน

```bash
git clone https://github.com/[username]/sdpx-[ชื่อกลุ่ม].git
cd sdpx-[ชื่อกลุ่ม]
```

**ผลที่ควรเห็น**

ในโฟลเดอร์มีโครงสร้างดังนี้

```
AGENTS.md
PROJECT.md
README.md
.env.example
.gitignore
docs/tech-stack.md
evidence/
.github/workflows/ci.yml
.github/pull_request_template.md
```

โฟลเดอร์ `src/` และ `tests/` ยังไม่มีในขั้นตอนนี้ `src/` จะถูกสร้างในขั้นตอนที่ 3 และ `tests/` จะเพิ่มในบทที่ 3

`PROJECT.md` เป็นสำเนาจากรายวิชา ห้ามแก้ไข หากผู้สอนปรับปรุง จะแจ้งให้นำฉบับใหม่มาแทน

แท็บ Actions อาจแสดง `CI` เป็นสีแดงในตอนนี้ เนื่องจากยังไม่มี `package.json` ซึ่งเป็นเรื่องปกติ และจะเป็นสีเขียวเมื่อทำขั้นตอนที่ 3 เสร็จ

**หากติดปัญหา**

- clone ไม่ได้เนื่องจากสิทธิ์: ตรวจว่าได้ยอมรับคำเชิญ collaborator ทางอีเมลแล้ว
- template ยังไม่พร้อมใช้งาน: สร้าง repository ใหม่แบบว่าง แล้วสร้างโฟลเดอร์ตามโครงสร้างข้างต้นด้วยตนเอง

---

## ขั้นตอนที่ 2 — เลือก stack และเขียน context ให้ AI

### 2.1 เลือก stack

| ตัวเลือก | เหมาะกับ |
|---|---|
| **Next.js** (TypeScript) | กลุ่มที่ต้องการ frontend และ backend ในโปรเจคเดียว แนะนำหากยังไม่แน่ใจ |
| **FastAPI + React** | กลุ่มที่ถนัด Python สำหรับ backend |

เมื่อเลือกแล้ว ให้ใช้ stack นี้ตลอดภาคการศึกษา หากต้องการเปลี่ยนต้องบันทึกเหตุผลเป็น ADR (จะเรียนใน WS-02)

### 2.2 เขียน `docs/tech-stack.md`

```markdown
# Tech Stack

สมาชิก: [รายชื่อ]
วันที่: [วันที่]

| ส่วน | เลือกใช้ | เหตุผล |
|---|---|---|
| Frontend | [Next.js / React] | |
| Backend | [Next.js Route Handlers / FastAPI] | |
| Database | PostgreSQL (เริ่มใช้จริงใน WS-05 ก่อนหน้านั้นใช้ SQLite หรือข้อมูลในหน่วยความจำได้) | |
| Deployment | [Vercel / Render] | |
| AI agent | [ชื่อเครื่องมือ] | |
```

### 2.3 แก้ไข `AGENTS.md`

แก้ไฟล์ที่ได้จาก template ให้ตรงกับ stack ของกลุ่ม อย่างน้อยต้องมี 4 หัวข้อต่อไปนี้

```markdown
# AGENTS.md

## Project
[1 บรรทัด: ระบบนี้ทำอะไร ให้ใคร] — รายละเอียดดู PROJECT.md

## Commands
- install: `npm ci`            (หรือ `pip install -r requirements.txt`)
- dev:     `npm run dev`
- lint:    `npm run lint`
- build:   `npm run build`

## Conventions
- ภาษา: [TypeScript strict / Python 3.12 พร้อม type hints]
- ทำงานบน branch แยก แล้วเปิด PR เข้า `main`
- ข้อความ commit ตาม Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`)

## Rules
- ต้องรัน lint และ test ให้ผ่านก่อนเสนอการแก้ไข
- หาก test ไม่ผ่าน ให้แก้ code ห้ามแก้หรือลบ test เพื่อให้ผ่าน
- ห้ามใส่ค่าที่เป็นความลับลงในไฟล์ใด ๆ ให้ใช้ environment variable
- หากการแก้ไขมีขนาดเกินประมาณ 200 บรรทัด ให้หยุดและสอบถามก่อน

## Known mistakes
- (เพิ่มเมื่อ AI ทำผิดเรื่องเดิมซ้ำ 2 ครั้ง)
```

`AGENTS.md` ต้องยาวไม่เกิน 1 หน้า และหลังจากขั้นตอนนี้ ให้แก้ไขผ่าน PR เท่านั้น

**ผลที่ควรเห็น**

เมื่อเปิด AI agent ใน repository แล้วถามว่า "โปรเจคนี้ใช้คำสั่งอะไรในการ build"
agent ตอบได้ตรงกับที่เขียนไว้ใน `AGENTS.md`

**หากติดปัญหา**

- agent ตอบคำสั่ง build ไม่ตรงกับ `AGENTS.md`: ตรวจว่าเปิด agent ในโฟลเดอร์ของ repository และไฟล์อยู่ที่ root หากเครื่องมือที่ใช้อ่านไฟล์ชื่ออื่น เช่น `CLAUDE.md` ให้สร้างไฟล์นั้นโดยอ้างถึง `AGENTS.md`
- ยังไม่แน่ใจว่าจะเลือก stack ใด: เลือก Next.js

---

## ขั้นตอนที่ 3 — สร้างโครงโปรเจคและหน้าแรก

### 3.1 สร้างโครงโปรเจค

คำสั่งสร้างโครงของ framework ปฏิเสธโฟลเดอร์ที่มีไฟล์ชื่อซ้ำ เช่น `README.md` และ `AGENTS.md`
จึงให้สร้างในโฟลเดอร์ชั่วคราวก่อน แล้วคัดลอกเฉพาะไฟล์ที่ยังไม่มีใน repository

**Next.js** (รันในโฟลเดอร์ของ repository)

```bash
mkdir ../tmp-scaffold
npx create-next-app@latest ../tmp-scaffold/sdpx-[ชื่อกลุ่ม] --ts --eslint --app --src-dir --no-tailwind --import-alias "@/*" --use-npm --skip-install --yes
rsync -a --ignore-existing --exclude .git ../tmp-scaffold/sdpx-[ชื่อกลุ่ม]/ ./
rm -rf ../tmp-scaffold
npm install
```

- `--ignore-existing` ทำให้ไฟล์จาก template ไม่ถูกเขียนทับ
- ตั้งชื่อโฟลเดอร์ชั่วคราวตามชื่อ repository เพื่อให้ `name` ใน `package.json` ตรงกับชื่อกลุ่ม
- หากไม่มี `rsync` (เช่น Windows) ให้คัดลอกไฟล์จากโฟลเดอร์ชั่วคราวด้วยตนเอง โดยข้าม `README.md`, `AGENTS.md`, `.gitignore` และโฟลเดอร์ `.git`

**FastAPI**

```bash
python3.12 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install fastapi "uvicorn[standard]"
pip freeze > requirements.txt
```

### 3.2 สร้างหน้าแรกด้วย AI

**ทำ**

ใช้ AI agent สร้างหน้าแรกของระบบด้วยคำสั่งต่อไปนี้

```
Read AGENTS.md, PROJECT.md and docs/tech-stack.md first.

Create a minimal landing page for this project that shows the service name,
a navigation bar, and a placeholder for the main feature.
Add data-testid to the navigation bar and the main call-to-action button.
Do not add dependencies other than the framework itself.
For FastAPI, create main.py that returns the page as HTML at the path /.
Then run the lint and build commands from AGENTS.md and fix any errors.
```

ก่อน commit สมาชิกทุกคนอ่าน code ที่ AI สร้าง และผลัดกันอธิบายให้กลุ่มฟัง
บรรทัดที่ไม่มีใครอธิบายได้ ให้ลบออก หรือให้ AI อธิบายจนเข้าใจก่อน

**ผลที่ควรเห็น**

- `npm run dev` (หรือคำสั่งที่เทียบเท่า) แล้วเปิด `http://localhost:3000` เห็นหน้าแรก
- `npm run lint` และ `npm run build` ผ่านโดยไม่มี error
- หลังรัน `npm run dev` ครั้งแรก Next.js จะเพิ่มบล็อก `nextjs-agent-rules` (ประมาณ 10 บรรทัด) ท้ายไฟล์ `AGENTS.md` เองโดยอัตโนมัติ เป็นเรื่องปกติ ให้เก็บไว้และ commit พร้อมกับงานนี้

**หากติดปัญหา**

- AI ติดตั้ง library เพิ่มโดยไม่จำเป็น: ให้ลบออกและย้ำข้อจำกัดในคำสั่ง
- build ไม่ผ่าน: วางข้อความ error ทั้งหมดให้ agent แทนการอธิบายด้วยคำพูด
- lint ไม่ผ่านแต่ build ผ่าน: เป็นเรื่องที่พบได้จริง เช่น ใช้ `<a>` แทน `<Link>` ใน Next.js ให้วางข้อความ error ให้ agent แก้ และบันทึกลงตาราง "AI เสนอแต่ไม่รับ" ใน `evidence/ws-01.md`
- AI ทำผิดเรื่องเดิมเป็นครั้งที่ 2: เพิ่ม 1 บรรทัดในหัวข้อ Known mistakes ของ `AGENTS.md` แล้วสั่งใหม่

---

## ขั้นตอนที่ 4 — ตั้งค่า CI และ deploy อัตโนมัติ

### 4.1 CI

ตรวจสอบว่า `.github/workflows/ci.yml` ใช้คำสั่งตรงกับ stack ของกลุ่ม

**Next.js**

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

**FastAPI**

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt ruff
      - run: ruff check .
      - run: python -c "import main"
```

### 4.2 Deploy

- **Vercel (Next.js):** vercel.com > Add New Project > Import repository > Deploy
- **Render (FastAPI):** render.com > New Web Service > เชื่อม repository
  - Build command: `pip install -r requirements.txt`
  - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

ตั้งค่าให้ deploy อัตโนมัติเมื่อมีการ push เข้า `main`

**ผลที่ควรเห็น**

- แท็บ Actions บน GitHub แสดง workflow `CI` เป็นสีเขียว
- URL ที่ได้จาก Vercel หรือ Render เปิดได้จาก browser ของสมาชิกทุกคน

**หากติดปัญหา**

- CI ไม่ทำงาน: ตรวจว่าไฟล์อยู่ที่ `.github/workflows/` และชื่อ branch ตรงกับที่กำหนด
- deploy สำเร็จแต่หน้าเว็บว่าง: ตรวจ build log บน Vercel หรือ Render เพื่อดูข้อความ error

---

## ขั้นตอนที่ 5 — Pull Request แรกของสมาชิกทุกคน

**ทำ**

สมาชิกแต่ละคนทำการแก้ไขเล็ก ๆ ของตนเอง เช่น เพิ่มชื่อของตนใน `README.md`

```bash
git switch -c docs/add-[ชื่อ]
# แก้ README.md
git add README.md
git commit -m "docs: add [ชื่อ] to team list"
git push -u origin docs/add-[ชื่อ]
```

จากนั้นเปิด PR บน GitHub และให้สมาชิกอีกคนเป็นผู้ตรวจและกด merge

**ผลที่ควรเห็น**

- PR แต่ละรายการแสดงผล CI เป็นสีเขียวก่อน merge
- หลัง merge เว็บจริงแสดงรายชื่อที่เพิ่มเข้ามา

**หากติดปัญหา**

- merge แล้วเกิด conflict: ให้ `git pull origin main` ใน branch ของตน แก้ conflict แล้ว push อีกครั้ง

---

## ขั้นตอนที่ 6 — วัด commit-to-live time

**ทำ**

แก้ข้อความบนหน้าแรก 1 บรรทัด แล้วจับเวลา

```bash
git commit -am "feat: update landing headline"
git push          # เริ่มจับเวลา
# เปิด URL ซ้ำจนเห็นข้อความใหม่  -- หยุดจับเวลา
```

ขั้นตอนนี้คือการซ้อมสาธิต ในคาบสาธิตจริง ผู้ตรวจจะกำหนดข้อความใหม่ให้และจับเวลาเอง

บันทึกผลใน `evidence/ws-01.md`

```markdown
# WS-01 Evidence

- Live URL: [URL]
- Commit-to-live time: [X นาที Y วินาที จากการซ้อม]
- Break-it-live: [ลิงก์ PR ที่ CI ไม่ผ่านและปิดแล้ว เตรียมไว้ก่อนสาธิต]
- Sign-off จากกลุ่มผู้ตรวจ: [ลิงก์คอมเมนต์ กรอกหลังสาธิต]
- สิ่งที่ AI เสนอแต่กลุ่มไม่รับ:

| AI เสนอ | เหตุผลที่ไม่รับ |
|---|---|
| | |
| | |

- Checklist: [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5
```

**ผลที่ควรเห็น**

- เปิด URL ซ้ำแล้วเห็นข้อความใหม่บนเว็บจริง
- `evidence/ws-01.md` มี Commit-to-live time ที่จดจากการซ้อม

**หากติดปัญหา**

- push แล้วเว็บไม่เปลี่ยน: ตรวจแท็บ Actions ว่า `CI` ผ่านแล้วหรือยัง และดู build log บน Vercel หรือ Render
- เว็บยังแสดงข้อความเดิมทั้งที่ deploy เสร็จ: refresh แบบล้าง cache (Ctrl+Shift+R หรือ Cmd+Shift+R) หรือเปิดในหน้าต่างส่วนตัว

---

## Checklist (5 คะแนน)

กลุ่มอื่นเป็นผู้ตรวจ โดยดูจากการสาธิตจริงใน `3-Present.md` ข้อละ 1 คะแนน ผู้สอนไม่ต้องตรวจ
ทุกข้อต้องสาธิตให้ผู้ตรวจเห็นได้ภายในเวลาที่กำหนด จึงควรซ้อมก่อนถึงคาบสาธิต

- [ ] 1. Live URL เปิดได้ และแสดงหน้าแรกของระบบ
- [ ] 2. push เข้า `main` แล้ว CI ผ่านและ deploy โดยอัตโนมัติ
- [ ] 3. `evidence/ws-01.md` มี commit-to-live time และตาราง "AI เสนอแต่ไม่รับ" อย่างน้อย 2 แถว
- [ ] 4. `AGENTS.md` ยาวไม่เกิน 1 หน้า มีหัวข้อ Commands, Rules และ Known mistakes รวมถึงข้อห้ามแก้ test เพื่อให้ผ่าน
- [ ] 5. ไม่มีไฟล์ `.env` หรือค่าความลับใน repository และมี `.env.example`

**เงื่อนไขรายบุคคล:** สมาชิกที่ไม่มี PR ที่ถูก merge ในบทนี้ จะได้คะแนน lab ของบทนี้ครึ่งหนึ่ง ผู้ตรวจจะเปิดรายการ PR ที่ merge แล้วดูระหว่างสาธิต

---

## Retro

ปรึกษากันในกลุ่ม แล้วบันทึกคำตอบสั้น ๆ ท้าย `evidence/ws-01.md`

1. ขณะนี้ loop ของกลุ่มมีขั้นตรวจสอบอะไรบ้าง
2. หากการ deploy ครั้งถัดไปทำให้หน้าเว็บใช้งานไม่ได้ กลุ่มจะทราบเมื่อใด และทราบได้อย่างไร
3. ขั้นตอนใดในวันนี้ยังทำด้วยมือและใช้เวลามากที่สุด ขั้นตอนนั้นควรเปลี่ยนเป็นการตรวจอัตโนมัติในบทใด
