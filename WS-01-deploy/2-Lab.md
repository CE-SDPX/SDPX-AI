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

ในแต่ละขั้นตอน ให้สมาชิกผลัดกันเป็นผู้ลงมือ และให้ทุกคนอ่านสิ่งที่เกิดขึ้นบนหน้าจอ

---

## ขั้นตอนที่ 1 — สร้าง repository เปล่า

**ทำ**

1. สมาชิกคนที่ 1 เปิด https://github.com/new
2. ตั้งชื่อ repository เป็น `sdpx-[ชื่อกลุ่ม]` และกำหนดเป็น **Public**
3. สร้างในบัญชีส่วนตัวของสมาชิกคนที่ 1 **ไม่ใช่บัญชีขององค์กร (organization)**
4. **ไม่เลือก** Add a README file, Add .gitignore และ Choose a license ปล่อยให้ว่างทั้งหมด
5. เพิ่มสมาชิกทุกคนเป็น collaborator ที่ Settings > Collaborators
6. สมาชิกทุกคน clone repository ลงเครื่องของตน

```bash
git clone https://github.com/[username]/sdpx-[ชื่อกลุ่ม].git
cd sdpx-[ชื่อกลุ่ม]
```

ข้อ 2 และ 3 ทำเพื่อหลีกเลี่ยงข้อจำกัดของ Vercel แผนฟรีที่มีกับ repository ขององค์กร

**ผลที่ควรเห็น**

- ขณะ clone จะมีข้อความ `You appear to have cloned an empty repository` ซึ่งเป็นเรื่องปกติ
- ในโฟลเดอร์ไม่มีไฟล์ใดนอกจาก `.git`
- `git branch --show-current` แสดง `main`

**หากติดปัญหา**

- clone ไม่ได้เนื่องจากสิทธิ์: ตรวจว่าได้ยอมรับคำเชิญ collaborator ทางอีเมลแล้ว
- branch ชื่อ `master`: รัน `git branch -M main`

---

## ขั้นตอนที่ 2 — สร้างโครง Next.js

สมาชิกคนที่ 1 ทำขั้นตอนนี้จนถึง push ส่วนสมาชิกคนอื่นรอแล้วทำตามหัวข้อ "สมาชิกคนอื่น"

### 2.1 สร้างโครงโปรเจค

รันในโฟลเดอร์ของ repository

```bash
npx create-next-app@16 . --ts --eslint --app --src-dir --no-tailwind --import-alias "@/*" --use-npm --yes
```

คำสั่งนี้สร้างไฟล์ของโปรเจคและติดตั้ง package ให้ ซึ่งใช้เวลาสักครู่

### 2.2 แก้ `.gitignore`

เปิด `.gitignore` หาบรรทัด `.env*` แล้วเพิ่มอีกบรรทัดต่อท้ายทันที

```
.env*
!.env.example
```

บรรทัด `.env*` ที่ Next.js สร้างให้ ซ่อนไฟล์ `.env.example` ไปด้วย
ซึ่งในขั้นตอนที่ 3 ต้องเพิ่มไฟล์นี้เข้า repository

### 2.3 ตรวจและ push

```bash
npm run lint
npm run build
git add .
git commit -m "chore: scaffold Next.js app"
git push -u origin main
```

### สมาชิกคนอื่น

```bash
git pull origin main
npm install
```

**ผลที่ควรเห็น**

- `npm run lint` และ `npm run build` ผ่านโดยไม่มี error
- หน้า repository บน GitHub แสดงไฟล์ของโปรเจค รวมถึง `AGENTS.md` ที่ Next.js สร้างให้
- ในไฟล์ `AGENTS.md` มีบล็อกที่ขึ้นต้นด้วย `<!-- BEGIN:nextjs-agent-rules -->` ให้เก็บไว้ ห้ามลบ

**หากติดปัญหา**

- ข้อความ error ระบุว่าต้องใช้ Node.js เวอร์ชันสูงกว่านี้: ดูหัวข้อ "หากเวอร์ชันต่ำกว่าที่กำหนด" ใน `0-Before.md`
- ข้อความ `directory contains files that could conflict`: ตรวจว่า repository ว่างจริง โดยไม่ได้เลือก README หรือ `.gitignore` ตอนสร้าง
- คำสั่งถามคำถามให้เลือกตัวเลือก: ตรวจว่าพิมพ์ตัวเลือกครบทุกตัว (`--ts --eslint ...` และ `--yes`)

---

## ขั้นตอนที่ 3 — เขียน context ให้ AI

ขั้นตอนนี้สร้างไฟล์ 4 ไฟล์ ซึ่งเป็นสิ่งที่ AI agent จะอ่านก่อนทำงานทุกครั้ง
การแก้ไขครั้งแรกนี้ commit เข้า `main` ได้โดยตรง ตั้งแต่ขั้นตอนที่ 6 เป็นต้นไป การแก้ `AGENTS.md` ต้องผ่าน PR

### 3.1 `docs/tech-stack.md`

```markdown
# Tech Stack

สมาชิก: [รายชื่อ]
วันที่: [วันที่]

| ส่วน | เลือกใช้ | เหตุผล |
|---|---|---|
| Frontend | Next.js (App Router, TypeScript) | |
| Backend | Next.js Route Handlers | |
| Database | PostgreSQL (เริ่มใช้จริงใน WS-05 ก่อนหน้านั้นใช้ SQLite หรือข้อมูลในหน่วยความจำได้) | |
| Deployment | Vercel | |
| AI agent | [ชื่อเครื่องมือ] | |
```

### 3.2 `.env.example`

```
# ชื่อตัวแปรที่ระบบต้องใช้ ห้ามใส่ค่าจริงในไฟล์นี้
# คัดลอกเป็น .env.local แล้วกรอกค่าในเครื่องของตนเอง
DATABASE_URL=
```

### 3.3 `PROJECT.md`

เปิด https://github.com/CE-SDPX/SDPX-AI/blob/main/PROJECT.md คัดลอกเนื้อหาทั้งไฟล์
แล้วสร้างไฟล์ `PROJECT.md` ที่โฟลเดอร์หลักของ repository โดย **ไม่แก้ไข**
หากผู้สอนปรับปรุงไฟล์นี้ จะแจ้งให้นำฉบับใหม่มาแทน

### 3.4 `AGENTS.md`

เปิด `AGENTS.md` ที่ Next.js สร้างให้ แล้วเพิ่มเนื้อหาต่อไปนี้ **ไว้ด้านบนของบล็อก** `nextjs-agent-rules` ห้ามลบบล็อกนั้น

```markdown
# AGENTS.md

## Project
[1 บรรทัด: ระบบนี้ทำอะไร ให้ใคร] — รายละเอียดดู PROJECT.md

## Commands
- install: `npm ci`
- dev: `npm run dev`
- lint: `npm run lint`
- build: `npm run build`

## Conventions
- ภาษา: TypeScript strict
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

ส่วนที่เขียนเองต้องยาวไม่เกิน 1 หน้า

### 3.5 commit และ push

```bash
git add .
git commit -m "docs: add project context for AI agents"
git push
```

**ผลที่ควรเห็น**

- เมื่อเปิด AI agent ใน repository แล้วถามว่า "โปรเจคนี้ใช้คำสั่งอะไรในการ build" agent ตอบ `npm run build` ตรงกับที่เขียนไว้ใน `AGENTS.md`
- `git ls-files` แสดงไฟล์ `.env.example`

**หากติดปัญหา**

- agent ตอบไม่ตรงกับ `AGENTS.md`: ตรวจว่าเปิด agent ในโฟลเดอร์ของ repository และไฟล์อยู่ที่โฟลเดอร์หลัก หากเครื่องมือที่ใช้อ่านไฟล์ชื่ออื่น เช่น `CLAUDE.md` ให้สร้างไฟล์นั้นโดยอ้างถึง `AGENTS.md`
- `git add` ปฏิเสธไฟล์ `.env.example`: ย้อนไปตรวจขั้นตอนที่ 2.2 ว่าเพิ่มบรรทัด `!.env.example` แล้ว
- เปิดลิงก์ `PROJECT.md` ไม่ได้: แจ้งผู้สอน และใช้ไฟล์จากเพื่อนร่วมชั้นไปก่อน

---

## ขั้นตอนที่ 4 — สร้างหน้าแรกด้วย AI

**ทำ**

ใช้ AI agent สร้างหน้าแรกของระบบด้วยคำสั่งต่อไปนี้

```
Read AGENTS.md, PROJECT.md and docs/tech-stack.md first.

Create a minimal landing page for this project that shows the service name,
a navigation bar, and a placeholder for the main feature.
Add data-testid to the navigation bar and the main call-to-action button.
Do not add dependencies other than the framework itself.
Then run the lint and build commands from AGENTS.md and fix any errors.
```

ก่อน commit สมาชิกทุกคนอ่าน code ที่ AI สร้าง และผลัดกันอธิบายให้กลุ่มฟัง
บรรทัดที่ไม่มีใครอธิบายได้ ให้ลบออก หรือให้ AI อธิบายจนเข้าใจก่อน

จากนั้น commit และ push

```bash
git add .
git commit -m "feat: add landing page"
git push
```

**ผลที่ควรเห็น**

- `npm run dev` แล้วเปิด `http://localhost:3000` เห็นหน้าแรก
- `npm run lint` และ `npm run build` ผ่านโดยไม่มี error

**หากติดปัญหา**

- AI ติดตั้ง library เพิ่มโดยไม่จำเป็น: ให้ลบออกและย้ำข้อจำกัดในคำสั่ง
- build ไม่ผ่าน: วางข้อความ error ทั้งหมดให้ agent แทนการอธิบายด้วยคำพูด
- lint ไม่ผ่านแต่ build ผ่าน: เป็นเรื่องที่พบได้จริง เช่น ใช้ `<a>` แทน `<Link>` ใน Next.js ให้วางข้อความ error ให้ agent แก้ และบันทึกลงตาราง "AI เสนอแต่ไม่รับ" ใน `evidence/ws-01.md`
- AI ทำผิดเรื่องเดิมเป็นครั้งที่ 2: เพิ่ม 1 บรรทัดในหัวข้อ Known mistakes ของ `AGENTS.md` แล้วสั่งใหม่

---

## ขั้นตอนที่ 5 — ตั้งค่า CI และ deploy อัตโนมัติ

### 5.1 CI

สร้างไฟล์ `.github/workflows/ci.yml` โดยระวังเรื่องย่อหน้า (ใช้ช่องว่างเท่านั้น)

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

```bash
git add .
git commit -m "ci: add build workflow"
git push
```

### 5.2 Deploy

1. สมาชิกคนที่ 1 (เจ้าของ repository) เข้า vercel.com ด้วยบัญชี GitHub ของตนเอง
2. เลือก Add New > Project แล้วเลือก repository `sdpx-[ชื่อกลุ่ม]`
3. กด Deploy โดยไม่ต้องแก้การตั้งค่า

Vercel จะ deploy ใหม่อัตโนมัติทุกครั้งที่มีการ push เข้า `main`

**ผลที่ควรเห็น**

- แท็บ Actions บน GitHub แสดง workflow `CI` เป็นสีเขียว
- URL ที่ได้จาก Vercel เปิดได้จาก browser ของสมาชิกทุกคน และเห็นหน้าแรกของระบบ

**หากติดปัญหา**

- CI ไม่ทำงาน: ตรวจว่าไฟล์อยู่ที่ `.github/workflows/ci.yml` และย่อหน้าถูกต้อง GitHub จะแจ้ง error ของไฟล์ที่แท็บ Actions
- `npm ci` ไม่ผ่าน: ตรวจว่า `package-lock.json` ถูก commit แล้ว (`git ls-files package-lock.json`)
- Vercel ไม่แสดง repository ที่ต้องการ: เลือก Adjust GitHub App Permissions แล้วอนุญาตให้เข้าถึง repository นั้น
- Vercel ไม่ยอมเชื่อม repository: ตรวจว่า repository เป็น Public และอยู่ในบัญชีส่วนตัว ไม่ใช่ organization
- deploy สำเร็จแต่หน้าเว็บว่าง: ดู build log บน Vercel เพื่อดูข้อความ error

---

## ขั้นตอนที่ 6 — Pull Request แรกของสมาชิกทุกคน

**ทำ**

สมาชิกแต่ละคนทำการแก้ไขเล็ก ๆ ของตนเอง เช่น เพิ่มชื่อของตนใน `README.md`

```bash
git pull origin main
git switch -c docs/add-[ชื่อ]
# แก้ README.md
git add README.md
git commit -m "docs: add [ชื่อ] to team list"
git push -u origin docs/add-[ชื่อ]
```

จากนั้นเปิด PR บน GitHub และให้สมาชิกอีกคนเป็นผู้ตรวจและกด merge

**ผลที่ควรเห็น**

- PR แต่ละรายการแสดงผล CI เป็นสีเขียวก่อน merge
- หลัง merge เว็บจริงแสดงเนื้อหาล่าสุด

**หากติดปัญหา**

- merge แล้วเกิด conflict: ให้ `git pull origin main` ใน branch ของตน แก้ conflict แล้ว push อีกครั้ง
- Vercel ไม่ deploy commit ของสมาชิกที่ไม่ใช่เจ้าของบัญชี: อาจเป็นข้อจำกัดของแผนฟรี ให้จดข้อความที่ Vercel แสดงไว้ และแจ้งผู้สอน

---

## ขั้นตอนที่ 7 — วัด commit-to-live time และเตรียมหลักฐาน

### 7.1 วัดเวลา

แก้ข้อความบนหน้าแรก 1 บรรทัด แล้วจับเวลา

```bash
git commit -am "feat: update landing headline"
git push          # เริ่มจับเวลา
# เปิด URL ซ้ำจนเห็นข้อความใหม่  -- หยุดจับเวลา
```

ในคาบสาธิตจริง ผู้ตรวจจะกำหนดข้อความใหม่ให้และจับเวลาเอง ขั้นตอนนี้จึงเป็นการซ้อม

### 7.2 เตรียม PR break-it-live

สร้าง PR ที่ CI ไม่ผ่าน เพื่อใช้แสดงว่า loop ตรวจพบข้อผิดพลาดก่อนถึงเว็บจริง

```bash
git switch main
git pull origin main
git switch -c demo/broken-build
```

เพิ่มบรรทัดนี้ท้ายไฟล์ `src/app/page.tsx` ซึ่งเป็น type error

```ts
const n: number = "a";
```

```bash
git commit -am "test: break the build on purpose"
git push -u origin demo/broken-build
```

เปิด PR บน GitHub รอให้ `CI` เป็นสีแดง แล้วเปิด Live URL เพื่อยืนยันว่ายังเป็นเวอร์ชันเดิม จากนั้น **ปิด PR โดยไม่ merge**

### 7.3 บันทึกใน `evidence/ws-01.md`

```markdown
# WS-01 Evidence

- Live URL: [URL]
- Commit-to-live time: [X นาที Y วินาที จากการซ้อม]
- Break-it-live: [ลิงก์ PR ที่ CI ไม่ผ่านและปิดแล้ว]
- สิ่งที่ AI เสนอแต่กลุ่มไม่รับ:

| AI เสนอ | เหตุผลที่ไม่รับ |
|---|---|
| | |
| | |
```

**ผลที่ควรเห็น**

- เปิด URL ซ้ำแล้วเห็นข้อความใหม่บนเว็บจริง
- PR break-it-live แสดง `CI` เป็นสีแดงและปิดแล้ว ส่วน Live URL ยังเป็นเวอร์ชันเดิม
- `evidence/ws-01.md` มีครบทุกหัวข้อ และตาราง "AI เสนอแต่ไม่รับ" อย่างน้อย 2 แถว

**หากติดปัญหา**

- push แล้วเว็บไม่เปลี่ยน: ตรวจแท็บ Actions ว่า `CI` ผ่านแล้วหรือยัง และดู build log บน Vercel
- เว็บยังแสดงข้อความเดิมทั้งที่ deploy เสร็จ: refresh แบบล้าง cache (Ctrl+Shift+R หรือ Cmd+Shift+R) หรือเปิดในหน้าต่างส่วนตัว
- PR break-it-live ไม่ขึ้นสีแดง: ตรวจว่าเพิ่มบรรทัดใน `src/app/page.tsx` แล้ว และ `npm run build` ในเครื่องไม่ผ่านจริง

---

## Checklist

ตรวจในคาบสาธิตตามขั้นตอนใน `3-Present.md`

- [ ] 1. Live URL เปิดได้ และแสดงหน้าแรกของระบบ
- [ ] 2. push เข้า `main` แล้ว CI ผ่านและ deploy โดยอัตโนมัติ
- [ ] 3. `evidence/ws-01.md` มี commit-to-live time และตาราง "AI เสนอแต่ไม่รับ" อย่างน้อย 2 แถว
- [ ] 4. `AGENTS.md` ยาวไม่เกิน 1 หน้า มีหัวข้อ Commands, Rules และ Known mistakes รวมถึงข้อห้ามแก้ test เพื่อให้ผ่าน
- [ ] 5. ไม่มีไฟล์ `.env` หรือค่าความลับใน repository และมี `.env.example`

**เงื่อนไขรายบุคคล:** สมาชิกทุกคนต้องมี PR ที่ถูก merge ในบทนี้

---

## Retro

ปรึกษากันในกลุ่ม แล้วบันทึกคำตอบสั้น ๆ ท้าย `evidence/ws-01.md`

1. ขณะนี้ loop ของกลุ่มมีขั้นตรวจสอบอะไรบ้าง
2. หากการ deploy ครั้งถัดไปทำให้หน้าเว็บใช้งานไม่ได้ กลุ่มจะทราบเมื่อใด และทราบได้อย่างไร
3. ขั้นตอนใดในวันนี้ยังทำด้วยมือและใช้เวลามากที่สุด ขั้นตอนนั้นควรเปลี่ยนเป็นการตรวจอัตโนมัติในบทใด
