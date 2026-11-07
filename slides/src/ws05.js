const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref, codeBox, rowsTable, goodBad } = L;
const S0 = "เปิดคาบ", S1 = "Environment Loop", S2 = "Docker", S3 = "จากหน่วยความจำเป็น PostgreSQL", S4 = "Guard", S5 = "สรุป", S6 = "Glossary", S7 = "Lab และการวัดผล";
const pres = L.newDeck("WS-05 Environment Loop", [S0, S1, S2, S3, S4, S5, S6, S7]);
const bullets = (a) => a.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 } }));
const numbered = (s, items, y0 = 1.3, h = 0.62, fs = 14) => items.forEach((t, i) => { const y = y0 + i * (h + 0.1); box(s, pres, 0.5, y, 9, h, K.paper); chip(s, pres, 0.65, y + (h - 0.42) / 2, i + 1, K.teal, K.white, 0.42); T(s, t, { x: 1.3, y, w: 8, h, fontSize: fs, valign: "middle" }); });
const step7 = (s, st) => { st.forEach((v, i) => { const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4, x = 0.5 + col * 4.6, y = 1.3 + row * 0.9;
    box(s, pres, x, y, 4.4, 0.8, i === 6 ? K.amberT : K.paper); chip(s, pres, x + 0.15, y + 0.19, v[0], i === 6 ? K.amber : K.teal, i === 6 ? K.ink : K.white);
    T(s, [{ text: v[1], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[2], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.75, y, w: 3.55, h: 0.8, valign: "middle" }); });
  box(s, pres, 5.1, 4.0, 4.4, 0.8, K.ink); T(s, "แต่ละขั้น: ทำ → ผลที่ควรเห็น → หากติดปัญหา", { x: 5.25, y: 4.0, w: 4.1, h: 0.8, fontSize: 13, color: K.white, valign: "middle" }); };
const side = (s, items, x = 6.3, w = 3.2) => items.forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, x, y, w, 1.15, v[2] || K.paper);
  T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.15, y, w: w - 0.3, h: 1.15, valign: "middle" }); });

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดคาบ บทนี้ทำให้ทุกสิ่งที่ต้องใช้รันอยู่ใน repository และเปลี่ยนกติกาที่ต้องเป็นจริงเสมอให้เป็น guard");
  T(s, "WS-05", { x: 0.7, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "Environment Loop", { x: 0.7, y: 1.8, w: 8.6, h: 1.0, fontSize: 40, bold: true, color: K.white });
  T(s, [{ text: "Rathachai Chawuthai", options: { bold: true, fontSize: 18, color: K.white, breakLine: true } }, { text: "Computer Engineering, KMITL", options: { fontSize: 14, color: "B8C4D4" } }], { x: 0.7, y: 3.55, w: 8.6, h: 0.75 });
  T(s, "SDPX-AI · Software Development Process in Practice — AI-Assisted", { x: 0.7, y: 4.5, w: 8.6, h: 0.4, fontSize: 14, color: "B8C4D4" }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "เมื่อจบคาบ นักศึกษาควรทำได้", "อ่านวัตถุประสงค์ทั้ง 4 ข้อ");
  const it = ["อธิบายว่าความต่างของสิ่งแวดล้อมทำให้ผลการตรวจเชื่อถือไม่ได้อย่างไร", "เขียน Dockerfile และ compose.yaml ให้รันทั้งระบบด้วยคำสั่งเดียว และข้อมูลไม่หาย", "ย้ายที่เก็บข้อมูลไป PostgreSQL โดยไม่แก้ domain และแยก unit/integration test", "เปลี่ยนกติกาที่ต้องเป็นจริงเสมอให้เป็น guard ก่อน agent รันคำสั่งและก่อน merge"];
  it.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.75; box(s, pres, x, y, 4.4, 1.55, K.paper); chip(s, pres, x + 0.2, y + 0.2, i + 1);
    T(s, t, { x: x + 0.8, y: y + 0.2, w: 3.4, h: 1.2, fontSize: 13 }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "ถามจากผลส่วน C ของ 0-Before คำตอบที่มักได้: แต่ละคนใช้เวลาต่างกันมากและต้องรู้ขั้นตอนจากเพื่อน ส่วนจำนวนที่นั่งบนเว็บจริงไม่ตรงกัน เพราะข้อมูลในหน่วยความจำของแต่ละ instance บน Vercel แยกกัน ทั้งสองเรื่องคือปัญหาเดียวกัน คือสิ่งแวดล้อมไม่เหมือนกันและไม่ได้ถูกกำหนดไว้ใน repository");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "clone ลงโฟลเดอร์ใหม่จนเปิด /api/events ได้\nใช้เวลาเท่าไร และต้องทำอะไร\nที่ไม่ได้เขียนไว้ใน repository", { x: 0.7, y: 1.5, w: 8.6, h: 2.6, fontSize: 26, bold: true, color: K.white });
  T(s, "จำนวนที่นั่งบนเว็บจริงตรงกันทั้ง 5 ครั้งหรือไม่", { x: 0.7, y: 4.2, w: 8.6, h: 0.5, fontSize: 18, color: "B8C4D4" }); }

// 4 3 สิ่งแวดล้อม
{ const s = lightSlide(pres, S1, "สิ่งแวดล้อม 3 แห่งของกลุ่ม", "เครื่องสมาชิก CI และเว็บจริง ก่อนบทนี้ต่างกันหมด หลังบทนี้เครื่องและ CI ใช้ Node.js 22 และ PostgreSQL 17 เหมือนกัน เว็บจริงใช้ Vercel กับ PostgreSQL 17 ภายนอก ข้อมูลชุดเดียวกันทุกคำขอ");
  rowsTable(s, pres, [["เครื่องสมาชิก", "Node.js รุ่นที่แต่ละคนติดตั้ง · ข้อมูลในหน่วยความจำ", "docker compose up ได้ Node.js 22 + PostgreSQL 17 เหมือนกันทุกเครื่อง"], ["CI", "Node.js 22 · ไม่มีฐานข้อมูล", "Node.js 22 + PostgreSQL 17 image เดียวกับในเครื่อง"], ["เว็บจริง", "Vercel · ข้อมูลในหน่วยความจำของแต่ละ instance", "Vercel + PostgreSQL 17 ภายนอก ข้อมูลชุดเดียวกันทุกคำขอ"]], 0.5, 1.3, [1.4, 3.2, 4.4], 1.05, { head: ["", "ก่อนบทนี้", "หลังบทนี้"], fs: 12, fills: [K.paper, K.paper, K.paper] }); }

// 5 diagram
{ const s = lightSlide(pres, S1, "ไฟล์ใน repository คือแหล่งเดียวของสิ่งแวดล้อม", "Dockerfile compose.yaml db/schema.sql db/seed.sql อยู่ใน repository ใช้สร้างสิ่งแวดล้อมในเครื่องและใน CI ส่วนเว็บจริง schema ใส่ผ่าน SQL Editor โดยสมาชิก");
  codeBox(s, pres, 0.5, 1.3, 2.6, 3.65, ["repository", "", "Dockerfile", "compose.yaml", "db/schema.sql", "db/seed.sql"], 12);
  const r = [["เครื่องสมาชิก", "container app (Node 22) → container db (postgres:17) · volume pgdata", K.tealT], ["GitHub Actions", "npm run test:db → service db (postgres:17) · docker build", K.tealT], ["เว็บจริง", "Vercel → PostgreSQL ภายนอก (เช่น Neon) · schema ใส่โดยคน", K.amberT]];
  r.forEach((v, i) => { const y = 1.3 + i * 1.25; arrow(s, pres, 3.15, 3.5, y + 0.57); box(s, pres, 3.55, y, 5.95, 1.15, v[2]);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: 3.7, y, w: 5.65, h: 1.15, valign: "middle" }); }); }

// 6 เหมือน/ต่าง
{ const s = lightSlide(pres, S1, "สิ่งที่เหมือนและสิ่งที่ยังต่าง", "Dockerfile ไม่ได้ใช้ขึ้นเว็บจริง Vercel build จาก source code เอง Dockerfile ใช้ให้ทุกเครื่องรันระบบเหมือนกัน และให้ CI ยืนยันว่าทั้งระบบ build ได้");
  box(s, pres, 0.5, 1.3, 4.4, 3.65, K.greenT); T(s, "เหมือนกันทั้ง 3 แห่ง", { x: 0.75, y: 1.45, w: 4, h: 0.4, fontSize: 16, bold: true, color: K.green }); T(s, bullets(["รุ่นของ PostgreSQL", "schema", "seed data"]), { x: 0.75, y: 2.0, w: 3.9, h: 2.8, fontSize: 15 });
  box(s, pres, 5.1, 1.3, 4.4, 3.65, K.amberT); T(s, "ยังต่าง", { x: 5.35, y: 1.45, w: 4, h: 0.4, fontSize: 16, bold: true, color: "B5651D" }); T(s, bullets(["เว็บจริงไม่ได้รันจาก image ของกลุ่ม Vercel build จาก source เอง", "Dockerfile ใช้ให้ทุกเครื่องรันเหมือนกัน และให้ CI ยืนยันว่า build ได้"]), { x: 5.35, y: 2.0, w: 3.9, h: 2.8, fontSize: 14 }); }

// 7 AI agent + metrics
{ const s = lightSlide(pres, S1, "เหตุใดเรื่องนี้สำคัญขึ้นเมื่อใช้ AI agent",
    "AI agent รันคำสั่งในสิ่งแวดล้อมของผู้ที่สั่ง ถ้าสิ่งแวดล้อมต่างกัน ผล npm test ที่ agent แสดงก็ไม่ได้บอกว่าเครื่องอื่นหรือเว็บจริงจะได้ผลเดียวกัน บทต่อไปต้องใช้ฐานข้อมูลจริง E2E ในบทที่ 6 รันกับระบบที่เปิดด้วย docker compose up และ load test บทที่ 7 ตรวจ R6 ซึ่งข้อมูลในหน่วยความจำของ process เดียวไม่แสดงปัญหา");
  box(s, pres, 0.5, 1.3, 9, 0.9, K.ink); T(s, "ขั้น Verify ของ agent เชื่อถือได้เท่ากับสิ่งแวดล้อมที่ใช้ตรวจ", { x: 0.8, y: 1.3, w: 8.4, h: 0.9, fontSize: 18, bold: true, color: K.white, valign: "middle" });
  rowsTable(s, pres, [["Latency", "เวลาตั้งแต่ clone ลงโฟลเดอร์ใหม่จน /api/events ตอบกลับ"], ["Fidelity", "ผล npm run test:db ในเครื่องและใน CI ตรงกัน เพราะ PostgreSQL รุ่นเดียวกัน"], ["Coverage", "ทุกสิ่งที่ต้องใช้รันอยู่ใน repository ไม่มีขั้นตอนที่ต้องถามเพื่อน"]], 0.5, 2.5, [1.6, 7.4], 0.72, { fs: 12 }); }

// 8 image container volume
{ const s = lightSlide(pres, S2, "image, container และ volume", "Dockerfile สร้าง image ด้วย docker build image สร้าง container ได้หลายตัวที่ผลเหมือนกัน volume เก็บข้อมูลอยู่ต่อแม้ลบ container");
  flow(s, pres, [{ t: "Dockerfile" }, { t: "image", sub: "docker build" }, { t: "container", sub: "docker run / compose up", fill: K.tealT }, { t: "volume", sub: "ข้อมูลอยู่ต่อแม้ลบ container", fill: K.amberT }], 0.5, 1.5, 9, 1.4, { gap: 0.3, fs: 14, sfs: 11 });
  box(s, pres, 0.5, 3.4, 9, 1.5, K.paper); T(s, "image เดียวสร้าง container อีกตัวได้ผลเหมือนกัน — จึงลบ container แล้วสร้างใหม่ได้ ส่วนข้อมูลที่ต้องอยู่ต่อเก็บใน volume", { x: 0.75, y: 3.4, w: 8.5, h: 1.5, fontSize: 15, bold: true, valign: "middle" }); }

// 9 คำสั่ง
{ const s = lightSlide(pres, S2, "คำสั่ง compose และผลต่อข้อมูล", "docker compose down -v ลบข้อมูลทั้งหมด คำสั่งนี้คนต้องเป็นผู้ตัดสินใจ หัวข้อ guard จะขวางไม่ให้ AI agent รันเอง");
  rowsTable(s, pres, [["docker compose up -d", "สร้างและเปิด", "ใช้ข้อมูลเดิม หรือสร้าง volume ใหม่ถ้ายังไม่มี"], ["docker compose down", "หยุดและลบ", "ยังอยู่"], ["docker compose down -v", "หยุดและลบ", "ถูกลบทั้งหมด"], ["docker compose up -d --build", "build image ใหม่แล้วสร้าง container ใหม่", "ยังอยู่"]], 0.5, 1.3, [3.0, 3.0, 3.0], 0.78, { head: ["คำสั่ง", "ผลต่อ container", "ผลต่อข้อมูลใน volume"], fs: 12, mono: [0], fills: [K.paper, K.paper, K.redT, K.paper] }); }

// 10 Dockerfile หลักการ
{ const s = lightSlide(pres, S2, "หลักการเขียน Dockerfile", "ตัวอย่างที่ดีคือ Dockerfile ในขั้นตอนที่ 4 ของ lab ซึ่งใช้ output standalone ของ Next.js ให้ build รวบรวมเฉพาะไฟล์ที่ต้องใช้รันไว้ใน .next/standalone");
  numbered(s, ["ระบุรุ่นของ base image เช่น node:22-alpine ไม่ใช้ latest", "copy package.json และ lock แล้ว npm ci ก่อน copy code ส่วนอื่น (ใช้ผลเดิมซ้ำ build เร็ว)", "แยก stage ที่ build ออกจาก stage ที่รัน", "มี .dockerignore ตัด node_modules, .next, .git, .env* ออก", "รัน process ด้วยผู้ใช้ที่ไม่ใช่ root · ไม่ใส่ความลับใน Dockerfile"], 1.25, 0.6, 13); }

// 11 Dockerfile ดี/ไม่ดี
goodBad(pres, S2, "ตัวอย่าง Dockerfile: ไม่ดี เทียบกับ ดี",
  "ฉบับเต็มของตัวอย่างที่ดีอยู่ในขั้นตอนที่ 4 ของ lab แสดงเฉพาะแนวคิด: ระบุรุ่น แยก stage npm ci ก่อน copy code และรันด้วยผู้ใช้ที่ไม่ใช่ root",
  ["FROM node:latest", "WORKDIR /app", "COPY . .", "RUN npm install", "ENV DATABASE_URL=", "  postgres://owner:s3cret@", "  db.example.com/prod", 'CMD ["npm", "run", "dev"]'],
  ["FROM node:22-alpine AS build", "COPY package*.json ./", "RUN npm ci", "COPY . .", "RUN npm run build", "FROM node:22-alpine", "COPY --from=build .next/standalone", "USER node", 'CMD ["node", "server.js"]', "# ค่าความลับส่งตอนรัน ไม่ใส่ใน ENV"], 11);

// 12 ปัญหา Dockerfile
{ const s = lightSlide(pres, S2, "Dockerfile ที่ไม่ดีมีปัญหาอะไร", "แต่ละข้อเกิดขึ้นจริงเมื่อไม่ได้วางแผน");
  rowsTable(s, pres, [["node:latest", "Node.js เปลี่ยนรุ่นหลัก build ที่เคยผ่านก็ไม่ผ่านโดยไม่มีใครแก้ code"], ["COPY . . ก่อน install ไม่มี .dockerignore", "แก้ code บรรทัดเดียวต้องติดตั้งใหม่ทั้งหมด และ .env.local ติดไปใน image"], ["npm install แทน npm ci", "รุ่น package อาจไม่ตรง package-lock.json"], ["ค่าความลับใน ENV", "ทุกคนที่ได้ image อ่านรหัสผ่านได้ และอยู่ในประวัติ git"], ["npm run dev · ไม่แยก stage · root", "ช้า image ใหญ่ และถ้าถูกโจมตี ได้สิทธิ์สูงสุดใน container"]], 0.5, 1.3, [3.2, 5.8], 0.62, { fills: [K.redT, K.redT, K.redT, K.redT, K.redT], fs: 12 }); }

// 13 compose หลักการ
{ const s = lightSlide(pres, S2, "หลักการเขียน compose.yaml", "ตัวอย่างใช้ feature แจ้งเตือนซึ่งอยู่นอกขอบเขต สมมติมี process แยกชื่อ notifier ที่อ่านฐานข้อมูลเป็นระยะ depends_on อย่างเดียวรอแค่ให้ container เริ่ม ไม่ได้รอให้ฐานข้อมูลรับการเชื่อมต่อได้");
  numbered(s, ["ระบุรุ่นของทุก image", "รอฐานข้อมูลพร้อมจริงด้วย healthcheck + condition: service_healthy", "ข้อมูลที่ต้องอยู่ต่อเก็บใน volume ที่มีชื่อ", "ค่าที่ใช้ในเครื่องใส่ได้ ค่าความลับของเว็บจริงห้ามอยู่ในไฟล์นี้", "service เรียกกันด้วยชื่อ เช่น db:5432 ไม่ใช่ localhost"], 1.25, 0.6, 14); }

// 14 compose ดี/ไม่ดี
goodBad(pres, S2, "ตัวอย่าง compose.yaml: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างใช้ feature แจ้งเตือนที่อยู่นอกขอบเขตของ project ตัวอย่างที่ดี: ระบุรุ่น มี volume มี healthcheck และใช้ชื่อ service ส่วนตัวอย่างที่ไม่ดีมีหลายข้อพร้อมกัน",
  ["db:", "  image: postgres", "  environment:", "    POSTGRES_PASSWORD: app", "notifier:", "  environment:", "    DATABASE_URL: postgres://", "      postgres:app@localhost", "    SMTP_PASSWORD: real-pass", "  depends_on: [db]"],
  ["db:", "  image: postgres:17", "  volumes: [pgdata:/var/lib/...]", "  healthcheck:", "    test: pg_isready -U app", "notifier:", "  environment:", "    DATABASE_URL: ...@db:5432/", "  depends_on:", "    db:", "      condition: service_healthy"], 10);

// 15 ปัญหา compose
{ const s = lightSlide(pres, S2, "compose.yaml ที่ไม่ดีมีปัญหาอะไร", "ปัญหา localhost ใน container: localhost คือตัว container เอง");
  rowsTable(s, pres, [["image: postgres ไม่ระบุรุ่น", "ดาวน์โหลดคนละวันได้ PostgreSQL คนละรุ่นหลัก ข้อมูลใน volume เดิมอาจใช้กับรุ่นใหม่ไม่ได้"], ["ไม่มี volume", "docker compose down แล้วข้อมูลหายทั้งหมด"], ["localhost ใน DATABASE_URL", "ใน container localhost คือตัว container เอง เชื่อมต่อฐานข้อมูลไม่ได้"], ["depends_on ไม่มี healthcheck", "notifier เริ่มก่อนฐานข้อมูลพร้อม ล้มเป็นบางครั้ง หาสาเหตุยาก"], ["รหัสผ่าน SMTP จริงในไฟล์", "ความลับอยู่ในประวัติ git และทุกคนที่รันส่งการแจ้งเตือนจริงได้"]], 0.5, 1.3, [3.2, 5.8], 0.62, { fills: [K.redT, K.redT, K.redT, K.redT, K.redT], fs: 12 }); }

// 16 ADR-003
{ const s = lightSlide(pres, S3, "ADR-003 แทนที่ ADR-001",
    "ADR-001 ตัดสินการเก็บข้อมูลก่อนบทที่ 5 บทนี้ต้องตัดสินใหม่ ตามกติกาไม่แก้เนื้อหา ADR เดิม แต่เขียน ADR-003 และสมาชิกแก้เฉพาะบรรทัดสถานะของ ADR-001 เป็น ถูกแทนที่โดย ADR-003 Vercel ระบุว่า Postgres ทำผ่าน Marketplace และ Vercel Postgres เดิมถูกย้ายไป Neon");
  rowsTable(s, pres, [["Postgres จาก Vercel Marketplace (Neon)", "ติดตั้งจากหน้า Storage Vercel ใส่ DATABASE_URL ให้เอง", "ต้องตรวจขีดจำกัดแผนฟรี และเครือข่ายช้ากว่าในเครื่อง"], ["Postgres ผู้ให้บริการอื่น (Supabase)", "มีบริการอื่นให้ใช้เพิ่ม", "ต้องคัดลอก DATABASE_URL ไปใส่ใน Vercel เอง"], ["PostgreSQL เฉพาะในเครื่องและ CI", "ไม่ต้องสมัครบริการเพิ่ม", "เว็บจริงยังใช้หน่วยความจำ ทำงานต่างจากที่ทดสอบ"]], 0.5, 1.3, [2.9, 3.1, 3.0], 0.9, { head: ["ทางเลือกสำหรับเว็บจริง", "ข้อดี", "ข้อจำกัดที่ต้องรู้"], fs: 11, fills: [K.greenT, K.paper, K.redT] });
  T(s, "แก้ ADR-001 เฉพาะบรรทัดสถานะ: “ถูกแทนที่โดย ADR-003”", { x: 0.5, y: 4.5, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal }); ref(s, "อ้างอิง: Vercel — Postgres on Vercel · Neon — Vercel-managed integration"); }

// 17 ADR-002 ทำให้ย้ายเล็ก
{ const s = lightSlide(pres, S3, "ADR-002 ทำให้การย้ายเล็กลง",
    "กฎทั้งหมดอยู่ใน src/domain และรับข้อมูลเป็น argument ตาม ADR-002 การย้ายไป PostgreSQL จึงแก้เฉพาะ src/data และให้ route handler รอผลด้วย await ถ้า AI แก้ไฟล์ใน src/domain ระหว่างย้าย แปลว่ามีกฎรั่วออกไปอยู่นอก domain หรือ AI ทำเกินกว่าแผน");
  flow(s, pres, [{ t: "route handler", sub: "รอผลด้วย await", fill: K.amberT }, { t: "domain", sub: "กฎ R1–R5 ไม่เปลี่ยน", fill: K.greenT }, { t: "data", sub: "หน่วยความจำ → PostgreSQL", fill: K.amberT }], 0.5, 1.4, 9, 1.4, { gap: 0.35, fs: 15, sfs: 12 });
  box(s, pres, 0.5, 3.2, 9, 1.7, K.ink); T(s, "ไฟล์ใน src/domain และ unit test ไม่ควรเปลี่ยนแม้แต่บรรทัดเดียว", { x: 0.8, y: 3.2, w: 8.4, h: 1.0, fontSize: 18, bold: true, color: K.amber, valign: "middle" }); T(s, "ถ้า domain ถูกแก้ แปลว่ากฎรั่วออกนอก domain หรือ AI ทำเกินแผน", { x: 0.8, y: 4.2, w: 8.4, h: 0.5, fontSize: 14, color: K.white }); }

// 18 schema seed 3 ที่
{ const s = lightSlide(pres, S3, "schema และ seed ใส่เข้าฐานข้อมูล 3 วิธี", "ไฟล์ db/schema.sql และ db/seed.sql ชุดเดียวกันใช้ทั้ง 3 แห่ง ข้อที่มักพลาดคือแก้ schema แล้วคาดว่าฐานข้อมูลในเครื่องเปลี่ยนตาม ไฟล์ใน docker-entrypoint-initdb.d ทำงานครั้งเดียวตอนสร้าง volume");
  rowsTable(s, pres, [["เครื่องสมาชิก", "image รันไฟล์ใน /docker-entrypoint-initdb.d อัตโนมัติ เฉพาะเมื่อ volume ยังว่าง", "อัตโนมัติ"], ["CI", "npm run db:setup ก่อน npm run test:db", "อัตโนมัติ"], ["เว็บจริง", "คัดลอกไฟล์ไปรันใน SQL Editor ของผู้ให้บริการ", "สมาชิก ไม่ใช่ AI agent"]], 0.5, 1.3, [1.8, 5.0, 2.2], 0.78, { head: ["ที่", "วิธีใส่ schema และ seed", "ผู้ทำ"], fs: 12, fills: [K.paper, K.paper, K.amberT] });
  box(s, pres, 0.5, 4.3, 9, 0.65, K.redT); T(s, "แก้ schema แล้วต้อง docker compose down -v ซึ่งลบข้อมูลทั้งหมด — คนเป็นผู้ตัดสิน", { x: 0.75, y: 4.3, w: 8.5, h: 0.65, fontSize: 13, bold: true, valign: "middle" }); }

// 19 unit vs integration
{ const s = lightSlide(pres, S3, "unit test และ integration test", "แยกคำสั่งเพื่อให้ npm test ยังเร็วและรันได้ทุกที่แม้ไม่ได้เปิด Docker agent รัน npm test ทุกครั้งที่แก้ code และรัน npm run test:db เมื่อแก้ src/data");
  rowsTable(s, pres, [["ไฟล์", "*.test.ts", "*.db.test.ts"], ["ตรวจอะไร", "กฎ R1–R5 ใน src/domain", "query ใน src/data กับ PostgreSQL จริง เช่น คิวสำรองเรียงตาม created_at"], ["ต้องมีฐานข้อมูล", "ไม่ต้อง", "ต้อง"], ["คำสั่ง", "npm test", "npm run test:db"], ["เวลา", "ไม่ถึง 1 วินาที", "ไม่กี่วินาที"]], 0.5, 1.3, [1.9, 3.0, 4.1], 0.62, { head: ["", "unit test", "integration test"], fs: 12, fills: [K.paper, K.paper, K.paper, K.tealT, K.paper] }); }

// 20 DATABASE_URL
{ const s = lightSlide(pres, S3, "DATABASE_URL แต่ละที่มาจากไหน", "รหัสผ่าน app ใช้ได้เฉพาะฐานข้อมูลในเครื่องซึ่งไม่มีข้อมูลจริง จึงอยู่ใน repository ได้ ค่าของเว็บจริงไม่ควรอยู่ในเครื่องสมาชิกหรือของ AI agent เลย");
  rowsTable(s, pres, [["npm run dev ในเครื่อง", "postgres://app:app@localhost:5432/events", ".env.local (ไม่อยู่ใน git)"], ["container app ใน compose", "postgres://app:app@db:5432/events", "compose.yaml"], ["CI", "postgres://app:app@localhost:5432/events", "ci.yml"], ["เว็บจริง", "ค่าที่ผู้ให้บริการสร้าง มีรหัสผ่านจริง", "environment variable ของ Vercel เท่านั้น"]], 0.5, 1.3, [2.4, 3.8, 2.8], 0.78, { head: ["ที่", "ค่า", "เก็บที่ใด"], fs: 11, fills: [K.paper, K.paper, K.paper, K.amberT] }); }

// 21 กติกา vs guard
{ const s = lightSlide(pres, S4, "กติกาใน AGENTS.md เป็นเพียงคำแนะนำ",
    "playbook แยกการควบคุมเป็น 2 แบบ คำแนะนำอย่าง skill หรือกติกาทำให้การฝ่าฝืนเกิดได้ยาก ส่วน hook ซึ่งทำงานแน่นอนทุกครั้งทำให้ฝ่าฝืนแทบเป็นไปไม่ได้ นโยบายที่ต้องเป็นจริงเสมอจึงต้องมีสิ่งที่ทำงานแน่นอนอยู่ด้านหลัง");
  rowsTable(s, pres, [["ทำงานอย่างไร", "AI อ่านแล้วตัดสินใจเองว่าจะทำตาม", "script ตรวจทุกครั้งแล้วขวาง ไม่ขึ้นกับ AI"], ["เมื่อ AI ลืมหรือเข้าใจผิด", "ฝ่าฝืนได้", "ถูกขวาง"], ["เหมาะกับ", "แนวทางที่ต้องใช้วิจารณญาณ เช่น วิธีตั้งชื่อ", "สิ่งที่ห้ามเกิดเด็ดขาด เช่น ลบข้อมูล หรือ commit ค่าความลับ"]], 0.5, 1.3, [2.2, 3.2, 3.6], 0.9, { head: ["", "กติกาใน AGENTS.md", "guard"], fs: 12, fills: [K.paper, K.paper, K.paper] });
  T(s, "ต้องเป็นจริงเสมอ → ต้องเป็น guard", { x: 0.5, y: 4.65, w: 9, h: 0.3, fontSize: 14, bold: true, color: K.teal }); }

// 22 Replit
caseSlide(pres, S4, { title: "กรณีจริง: AI agent ลบฐานข้อมูลของเว็บจริง", tag: "Replit × SaaStr · กรกฎาคม 2025",
  notes: "Jason Lemkin ผู้ก่อตั้ง SaaStr ใช้ agent ของ Replit สั่งให้หยุดแก้ code ไว้ แต่ agent รันคำสั่งที่ลบฐานข้อมูลของเว็บจริง ซึ่งมีข้อมูลผู้บริหาร 1,206 คนและบริษัทกว่า 1,196 แห่ง ซีอีโอยอมรับว่าไม่ควรเกิดขึ้นได้ ต้นเหตุส่วนหนึ่งคือใช้ฐานข้อมูลเดียวกันทั้งพัฒนาและใช้งานจริง Replit เริ่มแยกฐานข้อมูลโดยอัตโนมัติ",
  facts: ["สั่งให้หยุดแก้ code ไว้แล้ว แต่ agent รันคำสั่งที่ลบฐานข้อมูลของเว็บจริง", "ข้อมูลผู้บริหาร 1,206 คน และบริษัทกว่า 1,196 แห่ง", "ซีอีโอยอมรับว่าไม่ควรเกิดขึ้นได้", "ต้นเหตุส่วนหนึ่ง: ใช้ฐานข้อมูลเดียวกันทั้งพัฒนาและใช้งานจริง", "Replit เริ่มแยกฐานข้อมูลพัฒนาออกจากเว็บจริงโดยอัตโนมัติ"],
  principle: "บทเรียน", takeaway: "คำสั่งให้หยุดเป็นเพียงคำแนะนำที่ agent ไม่ทำตาม สิ่งที่ป้องกันได้จริงคือ agent ไม่มีทางเข้าถึงฐานข้อมูลของเว็บจริงตั้งแต่แรก",
  refs: "อ้างอิง: The Register — Replit makes promise to stop its AI agents… · eWeek — AI Agent Wipes Production Database" });

// 23 guard 2 ชั้น
{ const s = lightSlide(pres, S4, "guard 2 ชั้นของกลุ่ม",
    "script ของ guard อยู่ใน .agents/guards/ เขียนด้วย Node.js ซึ่งทุกคนมีอยู่แล้ว agent ต่างยี่ห้อตั้งค่า hook ต่างกัน แต่เรียก script เดียวกันได้ ชั้น CI ทำงานเหมือนกันไม่ว่าสมาชิกจะใช้ agent ใด");
  rowsTable(s, pres, [["hook ของ AI agent", "ก่อน agent รันคำสั่งหรือแก้ไฟล์", "protect-db.mjs ขวางคำสั่งที่ลบข้อมูลหรือต่อฐานข้อมูลที่ไม่ใช่ในเครื่อง", "ความเสียหายเกิดในเครื่องก่อนมีใครเห็น"], ["CI", "ก่อน merge", "no-secrets.mjs ขวาง PR ที่มี .env หรือรหัสผ่านฐานข้อมูลจริง", "ความลับเข้า main และอยู่ในประวัติ git"]], 0.5, 1.3, [1.6, 1.8, 3.2, 2.4], 1.2, { head: ["ชั้น", "ทำงานเมื่อใด", "ตัวอย่างในบทนี้", "หากไม่มีชั้นนี้"], fs: 11 });
  box(s, pres, 0.5, 4.3, 9, 0.65, K.tealT); T(s, "script อยู่ใน .agents/guards/ · agent ต่างยี่ห้อเรียก script เดียวกัน", { x: 0.75, y: 4.3, w: 8.5, h: 0.65, fontSize: 14, bold: true, valign: "middle" }); }

// 24 guard หลักการ
{ const s = lightSlide(pres, S4, "หลักการเขียน guard", "ใน Claude Code ขวางด้วย exit code 2 exit code อื่นที่ไม่ใช่ 0 ถือว่า hook ผิดพลาดเอง และคำสั่งยังทำงานต่อ");
  numbered(s, ["เร็วและตรวจเฉพาะสิ่งที่ส่งเข้ามา งานหนักอยู่ใน CI", "ขวางด้วยวิธีที่ agent เข้าใจ: Claude Code ใช้ exit code 2 (code อื่นไม่ขวาง)", "ข้อความขวางบอกเหตุผลและทางต่อไป agent จะหยุดและอธิบาย", "ขวางให้แคบที่สุด guard ที่ขวางเกินจำเป็นจะถูกปิดทิ้ง", "มี test ของตนเอง ทั้งกรณีที่ต้องขวางและกรณีที่ต้องปล่อย"], 1.25, 0.6, 13); }

// 25 guard ดี/ไม่ดี
goodBad(pres, S4, "ตัวอย่าง guard: ไม่ดี เทียบกับ ดี",
  "hook ของ Claude Code ส่งข้อมูลการแก้ไฟล์เป็น JSON ทาง stdin ซึ่งมี tool_input.file_path ตัวอย่างสมมติไฟล์ .env.notify เก็บรหัสผ่าน SMTP ที่ไม่ให้ agent แก้หรืออ่าน",
  ["const raw = readFileSync(0)", '  .toString();', 'if (raw.includes("env"))', "  process.exit(1);"],
  ["const input = JSON.parse(", "  readFileSync(0, 'utf8'));", "const file =", "  input.tool_input?.file_path ?? '';", "if (/(^|\\/)\\.env(\\.[\\w-]+)?$/", "    .test(file) &&", "    !file.endsWith('.env.example')) {", "  console.error('BLOCKED ...');", "  process.exit(2);", "}"], 11);

// 26 ปัญหา guard
{ const s = lightSlide(pres, S4, "guard ที่ไม่ดีมีปัญหาอะไร", "ข้อแรกร้ายแรงที่สุด guard ไม่ได้ขวางอะไรเลย");
  rowsTable(s, pres, [["process.exit(1)", "Claude Code ถือว่า hook ผิดพลาดเอง และให้ agent แก้ไฟล์ต่อได้ guard ไม่ได้ขวางอะไรเลย"], ["ไม่มีข้อความ", "agent ไม่รู้ว่าถูกขวางเพราะอะไร อาจลองวิธีอื่นที่ได้ผลเดียวกัน"], ["ตรวจคำว่า env ทั้งข้อความ", "ขวางการแก้ src/lib/environment.ts และ .env.example ด้วย สมาชิกจะรำคาญจนปิด guard"], ["ไม่มี test", "ไม่รู้ว่า guard ขวางได้จริงจนกว่าจะเกิดเหตุ"]], 0.5, 1.3, [3.0, 6.0], 0.8, { fills: [K.redT, K.redT, K.redT, K.redT], fs: 13 }); }

// 27 guard ไม่ใช่กำแพง
{ const s = lightSlide(pres, S4, "guard ไม่ใช่กำแพง",
    "guard ที่ตรวจข้อความของคำสั่งถูกอ้อมได้ เช่น agent เขียนคำสั่งลงไฟล์ script แล้วรันไฟล์นั้น ชั้นที่สำคัญกว่าคือไม่ให้สิ่งอันตรายอยู่ในมือ agent ตั้งแต่แรก DATABASE_URL ของเว็บจริงอยู่ใน Vercel เท่านั้น การใส่ schema ลงฐานข้อมูลของเว็บจริงทำผ่าน SQL Editor โดยสมาชิก");
  flow(s, pres, [{ t: "agent เขียนคำสั่งลงไฟล์ script" }, { t: "แล้วรันไฟล์นั้น", fill: K.amberT }, { t: "guard ที่ตรวจข้อความ ถูกอ้อม", fill: K.redT }], 0.5, 1.4, 9, 1.1, { gap: 0.3, fs: 13 });
  box(s, pres, 0.5, 2.9, 9, 2.0, K.greenT); T(s, "ชั้นที่สำคัญกว่า: ไม่ให้สิ่งอันตรายอยู่ในมือ agent", { x: 0.75, y: 3.0, w: 8.5, h: 0.4, fontSize: 16, bold: true, color: K.green });
  T(s, bullets(["DATABASE_URL ของเว็บจริงอยู่ใน Vercel เท่านั้น", "ใส่ schema ลงเว็บจริงผ่าน SQL Editor โดยสมาชิก", "agent ไม่มีค่าที่จะใช้เชื่อมต่อ"]), { x: 0.75, y: 3.5, w: 8.5, h: 1.3, fontSize: 14 }); }

// 28 Amazon Q
caseSlide(pres, S4, { title: "กรณีจริง: คำสั่งลบข้อมูลถูกฝังเข้าไปใน AI agent", tag: "Amazon Q Developer (VS Code) · กรกฎาคม 2025",
  notes: "ผู้โจมตีส่งการแก้ไขเข้า repository open source ของ extension เพิ่ม prompt ที่สั่งให้ AI ลบไฟล์ใน home directory และค้นหา AWS profile เพื่อลบทรัพยากรบน cloud โดยรัน agent แบบอนุญาตทุกเครื่องมือและไม่ถามผู้ใช้ (--trust-all-tools และ --no-interactive) เผยแพร่ในรุ่น 1.84 ถอนในรุ่น 1.85 สองวันต่อมา AWS ระบุว่าไม่มีบริการหรือผู้ใช้ได้รับผลกระทบ",
  facts: ["prompt ที่ฝังสั่งให้ AI ลบไฟล์ใน home directory และทรัพยากรบน cloud", "รัน agent แบบอนุญาตทุกเครื่องมือและไม่ถามผู้ใช้ (--trust-all-tools, --no-interactive)", "เผยแพร่ในรุ่น 1.84 ถอนในรุ่น 1.85 สองวันต่อมา", "AWS ระบุว่าไม่มีบริการหรือผู้ใช้ได้รับผลกระทบ"],
  principle: "บทเรียน", takeaway: "คำสั่งที่ agent รันอาจไม่ได้มาจากผู้ใช้ และการปิดการถามทำให้ไม่มีคนในวง guard และสิทธิ์ที่จำกัดจึงยังจำเป็น",
  refs: "อ้างอิง: The Register — Compromised Amazon Q extension… · BleepingComputer" });

// 29 เริ่มจากทำเอง
{ const s = lightSlide(pres, S4, "เริ่มจากทำเอง แล้วจึงเขียนเป็น code", "guard ไม่ได้เขียนครั้งเดียวครบทุกข้อ เริ่มจากกติกาที่ agent ของกลุ่มเคยฝ่าฝืนจริง ซึ่งรวบรวมไว้ในส่วน C ของ 0-Before กติกาที่ต้องใช้วิจารณญาณยังอยู่ใน AGENTS.md");
  flow(s, pres, [{ t: "agent ฝ่าฝืนกติกา" }, { t: "ฝ่าฝืนซ้ำ หรือแก้คืนไม่ได้", fill: K.amberT }, { t: "เขียนเป็น guard", fill: K.greenT }], 0.5, 1.3, 9, 1.0, { gap: 0.35, fs: 14 });
  rowsTable(s, pres, [["เมื่อ guard ขวาง", "agent หยุดและอธิบาย สมาชิกตัดสินใจว่าจะรันคำสั่งนั้นเองหรือไม่"], ["เมื่อต้องแตะเว็บจริง", "สมาชิกใส่ schema ผ่าน SQL Editor และตั้ง environment variable ใน Vercel"], ["เมื่อจะเพิ่ม guard", "สมาชิกเลือกกติกาจากสิ่งที่เคยเกิด และอนุมัติ PR ของ guard"]], 0.5, 2.55, [2.6, 6.4], 0.66, { head: ["คนอยู่ในวงตอนไหน", "ในบทนี้"], fs: 12, fills: [K.amberT, K.amberT, K.amberT] }); }

// 30 สรุป
{ const s = darkSlide(pres, S5, "สรุป 5 ข้อ ก่อนเข้าสู่ lab");
  T(s, "สรุป", { x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["ผลการตรวจเชื่อถือได้เท่ากับสิ่งแวดล้อม ให้ทุกอย่างอยู่ใน repository และใช้ PostgreSQL รุ่นเดียวกันทุกที่", "container ลบแล้วสร้างใหม่ได้ ข้อมูลอยู่ใน volume และ down -v ลบข้อมูลทั้งหมด", "ADR-002 ทำให้ย้ายไป PostgreSQL แก้เฉพาะ src/data ถ้า src/domain เปลี่ยนแปลว่ามีบางอย่างผิด", "กติกาที่ต้องเป็นจริงเสมอต้องเป็น guard ที่ขวางทุกครั้ง ทั้งก่อน agent รันและก่อน merge", "guard ถูกอ้อมได้ ความลับและสิทธิ์ของเว็บจริงจึงต้องไม่อยู่ในมือ agent ตั้งแต่แรก"];
  r.forEach((t, i) => { const y = 1.15 + i * 0.78; chip(s, pres, 0.7, y + 0.08, i + 1, K.amber, K.ink, 0.4); T(s, t, { x: 1.3, y, w: 8.2, h: 0.65, fontSize: 14, color: K.white, valign: "middle" }); }); }

// 31-32 Glossary
const GL = [["image", "แม่แบบที่ build จาก Dockerfile ใช้สร้าง container"], ["container", "process ที่รันจาก image ลบแล้วสร้างใหม่ได้"], ["volume", "ที่เก็บข้อมูลที่อยู่ต่อแม้ลบ container"],
  ["compose.yaml", "ไฟล์ที่กำหนดหลาย service ให้รันด้วยคำสั่งเดียว"], ["healthcheck", "การตรวจว่า service พร้อมรับงานจริง ใช้กับ service_healthy"], ["standalone output", "การตั้ง Next.js ให้ build เฉพาะไฟล์ที่ต้องใช้รัน"],
  ["integration test", "test ที่ตรวจ query กับฐานข้อมูลจริง (*.db.test.ts)"], ["DATABASE_URL", "ที่อยู่ฐานข้อมูล ค่าของเว็บจริงเก็บใน Vercel เท่านั้น"], ["guard", "script ที่ขวางสิ่งที่ห้ามเกิดเด็ดขาด ไม่ขึ้นกับ AI"],
  ["hook", "จุดที่ agent เรียก script ก่อนรันคำสั่งหรือแก้ไฟล์"], ["exit code 2", "ค่าที่ Claude Code ถือว่า hook ขวาง (code อื่นไม่ขวาง)"], ["ADR-003", "บันทึกการตัดสินใจย้ายไป PostgreSQL แทน ADR-001"]];
[0, 6].forEach((k, n) => { const s = lightSlide(pres, S6, "Glossary (" + (n + 1) + "/2)", "ใช้ทบทวนคำศัพท์ของบทนี้");
  GL.slice(k, k + 6).forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.1, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 15, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.2, y, w: 4.0, h: 1.1, valign: "middle" }); }); });

// L1
{ const s = darkSlide(pres, S7, "เปลี่ยนจากบรรยายเป็นลงมือ");
  T(s, "Lab", { x: 0.7, y: 1.1, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "ทั้งระบบรันด้วย\ndocker compose up", { x: 0.7, y: 1.7, w: 8.6, h: 1.6, fontSize: 38, bold: true, color: K.white });
  T(s, "ADR-003 → PostgreSQL → ชั้น data → compose → guard → เครื่องใหม่", { x: 0.7, y: 3.8, w: 8.6, h: 0.5, fontSize: 16, color: "B8C4D4" }); }

// L2 brief
{ const s = lightSlide(pres, S7, "Brief ของ lab: ทำอะไรและได้อะไร", "งานกลุ่ม ใช้ repository เดิมจาก WS-04 ไม่แก้ไฟล์ใน src/domain");
  const c = [["รูปแบบ", "งานกลุ่ม ใช้ repository เดิมจาก WS-04"], ["เป้าหมาย", "ทั้งระบบรันด้วย docker compose up บนทุกเครื่อง ข้อมูลอยู่ใน PostgreSQL ทั้งในเครื่อง ใน CI และบนเว็บจริง"], ["ข้อห้าม", "ไม่แก้ไฟล์ใน src/domain"], ["สิ่งที่ได้ด้วย", "guard ที่ขวาง agent จากคำสั่งลบข้อมูล และขวาง PR ที่มีความลับ"]];
  c.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.65; box(s, pres, x, y, 4.4, 1.5, i === 2 ? K.redT : K.paper);
    T(s, v[0], { x: x + 0.25, y: y + 0.15, w: 3.9, h: 0.35, fontSize: 13, bold: true, color: K.teal }); T(s, v[1], { x: x + 0.25, y: y + 0.55, w: 3.9, h: 0.85, fontSize: 13 }); }); }

// L3 steps
{ const s = lightSlide(pres, S7, "7 ขั้นตอนของ lab", "ทุกขั้นมี ทำ / ผลที่ควรเห็น / หากติดปัญหา");
  step7(s, [["1", "เขียน ADR-003", "แทนที่ ADR-001 (แก้เฉพาะสถานะ)"], ["2", "PostgreSQL ในเครื่อง + ฐานข้อมูลเว็บจริง", "schema/seed · Neon ผ่าน Vercel"], ["3", "เปลี่ยนชั้น data เป็น PostgreSQL", "ไม่แก้ domain · test:db"], ["4", "รันทั้งระบบด้วย docker compose up", "Dockerfile · compose · standalone"], ["5", "เขียน guard", "protect-db · no-secrets · ของกลุ่ม"], ["6", "ลองบนเครื่องใหม่ + break-it-live", "clone ใหม่ · PR ใส่ DATABASE_URL ปลอม"], ["7", "บันทึกหลักฐาน", "เวลา clone · ข้อความ guard · evidence"]]); }

// L4 repo
{ const s = lightSlide(pres, S7, "repository ที่จะได้เมื่อจบบทนี้", "ฐานข้อมูลของเว็บจริงในขั้น 2.2 ไม่ใช่ไฟล์ใน repository เป็นการตั้งค่าใน Vercel และ Neon ชื่อไฟล์ใน src/data เป็นตัวอย่าง");
  codeBox(s, pres, 0.5, 1.3, 5.8, 3.65, ["compose.yaml · Dockerfile · .dockerignore", "next.config.ts ← 4 (standalone)", ".agents/guards/", "  protect-db.mjs (+ .test.ts) ← 5", "  no-secrets.mjs ← 5", "  [guard ของกลุ่ม].mjs ← 5", ".claude/settings.json ← 5 (hook)", "db/schema.sql  db/seed.sql ← 2", "scripts/db-setup.mjs ← 3", "docs/adr/ADR-003-postgresql.md ← 1", "src/data/db.ts + *.db.test.ts ← 3", "evidence/ws-05.md ← 7"], 11);
  side(s, [["ใน repository", "Dockerfile · compose · guard · schema"], ["ใน Vercel/Neon", "ฐานข้อมูลเว็บจริง · DATABASE_URL (ไม่ใช่ไฟล์)", K.amberT], ["ห้ามเปลี่ยน", "src/domain/ ไม่ถูกแก้เลย", K.redT]]); }

// L5 step 2
{ const s = lightSlide(pres, S7, "ขั้นที่ 2: ฐานข้อมูลของเว็บจริงทำโดยคน",
    "ในเครื่องใช้ PostgreSQL ผ่าน compose service db ฐานข้อมูลของเว็บจริงสร้างผ่าน Vercel Marketplace (Neon) แล้ว Vercel ใส่ DATABASE_URL ให้เอง การใส่ schema ลงฐานข้อมูลเว็บจริงทำโดยสมาชิก คัดลอก db/schema.sql ไปรันใน SQL Editor ของผู้ให้บริการ ไม่ใช่ AI agent เพื่อไม่ให้ agent มีค่าเชื่อมต่อเว็บจริง");
  flow(s, pres, [{ t: "compose service db", sub: "postgres:17 · volume" }, { t: "Neon ผ่าน Vercel Marketplace", sub: "Vercel ใส่ DATABASE_URL ให้", fill: K.tealT }, { t: "สมาชิกคัดลอก schema.sql", sub: "รันใน SQL Editor", fill: K.amber }, { t: "agent ไม่มีค่าเชื่อมต่อเว็บจริง", fill: K.greenT }], 0.5, 1.5, 9, 1.5, { gap: 0.22, fs: 12, sfs: 10 });
  box(s, pres, 0.5, 3.4, 9, 1.5, K.paper); T(s, "การใส่ schema ลงเว็บจริงเป็นงานของคน ไม่ใช่ AI agent", { x: 0.75, y: 3.4, w: 8.5, h: 1.5, fontSize: 17, bold: true, valign: "middle" }); }

// L6 compose step 4
{ const s = lightSlide(pres, S7, "ขั้นที่ 4: รันทั้งระบบด้วยคำสั่งเดียว",
    "ใช้ output standalone ของ Next.js และ HOSTNAME=0.0.0.0 เพื่อให้ container รับคำขอจากภายนอกได้ compose มี service db (postgres:17) และ app ผลที่ควรเห็น: docker compose ps แสดง app และ db โดย db เป็น healthy และลงทะเบียนแล้วข้อมูลยังอยู่หลัง down และ up");
  codeBox(s, pres, 0.5, 1.3, 5.6, 3.65, ["$ docker compose up -d --build", "$ docker compose ps", "  app   running", "  db    running (healthy)", "", "$ curl localhost:3000/api/events", "→ 200", "", "$ docker compose down", "$ docker compose up -d", "→ ข้อมูลยังอยู่ (volume pgdata)"], 12);
  side(s, [["เพิ่มใน ci.yml", "services: postgres:17 · test:db · docker build", K.tealT], ["ผลที่ควรเห็น", "db healthy · ข้อมูลอยู่หลัง down/up", K.greenT], ["ระวัง", "down -v ลบข้อมูลทั้งหมด", K.redT]]); }

// L7 guards step 5
{ const s = lightSlide(pres, S7, "ขั้นที่ 5: เขียน guard 3 ตัว",
    "5.1 protect-db.mjs เป็น hook ของ agent ขวางคำสั่งลบข้อมูลและการต่อฐานข้อมูลที่ไม่ใช่ในเครื่อง 5.2 no-secrets.mjs รันใน CI ขวาง PR ที่มี .env หรือรหัสผ่านจริง 5.3 guard ของกลุ่มมาจากประสบการณ์ที่ agent เคยฝ่าฝืน 5.4 ทดลองแล้วบันทึกกติกา ทดสอบด้วย npx vitest run .agents");
  const g = [["5.1 protect-db.mjs", "hook ของ agent: ขวาง docker compose down -v และการต่อฐานข้อมูลที่ไม่ใช่ในเครื่อง (exit 2)", K.tealT], ["5.2 no-secrets.mjs", "รันใน CI: ขวาง PR ที่มี .env หรือ DATABASE_URL จริง", K.tealT], ["5.3 guard ของกลุ่ม", "มาจากกติกาเดิมใน AGENTS.md ที่ agent เคยฝ่าฝืน", K.amberT], ["5.4 ทดลองและบันทึก", "รัน npx vitest run .agents · บันทึกกติกาและเหตุการณ์", K.paper]];
  g.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.8; box(s, pres, x, y, 4.4, 1.65, v[2]);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.2, y, w: 4.0, h: 1.65, valign: "middle" }); }); }

// L8 step 6
{ const s = lightSlide(pres, S7, "ขั้นที่ 6: เครื่องใหม่ และ break-it-live",
    "6.1 สมาชิกที่ไม่ได้เขียน Dockerfile ทำบนเครื่องของตน หยุด container เดิมก่อนเพราะใช้ port เดียวกัน จับเวลาตั้งแต่ git clone จน curl ได้ 200 เทียบกับเวลาในส่วน C ของ 0-Before 6.2 สร้าง src/data/leak-demo.ts ที่มี DATABASE_URL ปลอมหน้าตาเหมือนของ Neon เปิด PR รอให้ CI แดงที่ no-secrets เปิดทิ้งไว้จนถึงคาบ demo แล้วจึงปิดโดยไม่ merge");
  box(s, pres, 0.5, 1.3, 4.4, 3.65, K.tealT); T(s, "6.1 clone ลงโฟลเดอร์ใหม่", { x: 0.75, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: K.teal });
  T(s, bullets(["สมาชิกที่ไม่ได้เขียน Dockerfile ทำเอง", "docker compose up -d --build", "จับเวลา clone → /api/events = 200", "เทียบกับเวลาใน 0-Before", "ต้องทำสิ่งที่ไม่ได้เขียนไว้? ให้เพิ่มลง repo"]), { x: 0.75, y: 1.9, w: 3.9, h: 2.9, fontSize: 13 });
  box(s, pres, 5.1, 1.3, 4.4, 3.65, K.redT); T(s, "6.2 PR break-it-live", { x: 5.35, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: K.red });
  T(s, bullets(["สร้าง src/data/leak-demo.ts", "ใส่ DATABASE_URL ปลอมหน้าตาเหมือน Neon", "CI แดงที่ node .agents/guards/no-secrets.mjs", "เปิด PR ทิ้งไว้ ปุ่ม merge กดไม่ได้", "ปิดโดยไม่ merge หลัง demo"]), { x: 5.35, y: 1.9, w: 3.9, h: 2.9, fontSize: 13 }); }

// L9 evidence
{ const s = lightSlide(pres, S7, "หลักฐานใน evidence/ws-05.md", "ถ้าไม่รู้ขนาด image ให้รัน docker images แล้วดูคอลัมน์ SIZE");
  rowsTable(s, pres, [["เวลา clone จนเปิด /api/events", "ก่อนบทนี้ (0-Before) เทียบกับหลังบทนี้ (6.1) พร้อมสิ่งที่ต้องทำเพิ่ม"], ["เวลา build image ครั้งแรก", "นาที วินาที · ขนาด image (MB)"], ["จำนวน test", "npm test · npm run test:db"], ["PR ที่เปลี่ยนชั้น data", "ลิงก์ · ไฟล์ใน src/domain ที่เปลี่ยน ควรเป็น “ไม่มี”"], ["ข้อความที่ agent ได้รับเมื่อถูกขวาง", "คัดลอกจาก protect-db"], ["guard ของกลุ่ม · Break-it-live", "ชื่อไฟล์ กติกาเดิม เหตุการณ์ · ลิงก์ PR ที่ยังเปิดอยู่"]], 0.5, 1.3, [3.4, 5.6], 0.56, { fs: 12 }); }

// L10 การวัดผล
{ const s = lightSlide(pres, S7, "การวัดผล: Present 7 ขั้นตอน", "เวลา 5 นาทีต่อกลุ่ม ขั้น 3 สั่ง agent ให้รัน down -v เพื่อพิสูจน์ว่า guard ขวางจริง ไม่มีการให้คะแนน");
  const r = [["docker compose up -d แล้ว docker compose ps", "มี app และ db และ db เป็น healthy"], ["ลงทะเบียน 1 ครั้ง down แล้ว up เรียก /api/events", "ที่นั่งคงเหลือยังนับการลงทะเบียนนั้น"], ["สั่ง agent ให้รัน docker compose down -v", "ถูกขวางด้วย BLOCKED by protect-db.mjs และ volume ยังอยู่"], ["เปิด PR break-it-live ที่ยังเปิดอยู่", "CI แดงที่ขั้น no-secrets และปุ่ม merge กดไม่ได้"], ["เปิด Files changed ของ PR ที่เปลี่ยนชั้น data", "ไม่มีไฟล์ใน src/domain/ ถูกแก้"], ["ลงทะเบียนซ้ำ 2 ครั้งผ่าน curl ที่ Live URL", "ครั้งที่สองได้ status และ error code ของ R3"], ["เปิด guard ของกลุ่ม รัน npx vitest run .agents", "อธิบายว่ามาจากกติกาข้อใดที่ agent เคยฝ่าฝืน และ test ผ่าน"]];
  T(s, "ขั้นตอน", { x: 1.05, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute }); T(s, "เกณฑ์ผ่าน", { x: 5.3, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  r.forEach((v, i) => { const y = 1.48 + i * 0.5; box(s, pres, 0.5, y, 9, 0.46, i % 2 ? K.white : K.paper); chip(s, pres, 0.55, y + 0.04, i + 1, K.teal, K.white, 0.38);
    T(s, v[0], { x: 1.05, y, w: 4.15, h: 0.46, fontSize: 11, valign: "middle", bold: true }); T(s, v[1], { x: 5.3, y, w: 4.1, h: 0.46, fontSize: 11, valign: "middle" }); }); }

// L11 Retro
{ const s = lightSlide(pres, S7, "Retro: ปรึกษากันแล้วบันทึกท้าย evidence", "ข้อ 3: ถ้า agent ต้องการรันคำสั่งที่ถูกขวางจริง ๆ สมาชิกเป็นผู้ตัดสินใจและเป็นผู้รัน");
  const q = ["สิ่งแวดล้อมของเว็บจริงยังต่างจากในเครื่องตรงไหน และอาจทำให้เกิดปัญหาอะไร", "กติกาข้อใดใน AGENTS.md ที่ยังไม่เป็น guard แต่ควรเป็น และข้อใดไม่ควรเป็น", "ถ้า agent ต้องการรันคำสั่งที่ถูกขวางจริง ๆ กลุ่มจะตัดสินใจอย่างไร และใครเป็นผู้รัน"];
  q.forEach((t, i) => { const y = 1.4 + i * 1.15; box(s, pres, 0.5, y, 9, 1.0, K.paper); chip(s, pres, 0.75, y + 0.29, i + 1); T(s, t, { x: 1.4, y, w: 7.9, h: 1.0, fontSize: 16, valign: "middle" }); }); }

L.save(pres, "ws-05-docker.pptx").then(() => console.log("saved"));
