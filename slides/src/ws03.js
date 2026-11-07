const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref, codeBox, rowsTable, goodBad } = L;
const S0 = "เปิดคาบ", S1 = "Unit Test Loop", S2 = "plan.md", S3 = "แยกกฎออกจาก HTTP", S4 = "test ที่ดี", S5 = "test ก่อน code", S6 = "สรุป", S7 = "Glossary", S8 = "Lab และการวัดผล";
const pres = L.newDeck("WS-03 Unit Test Loop", [S0, S1, S2, S3, S4, S5, S6, S7, S8]);
const bullets = (a) => a.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 } }));
const numbered = (s, items, y0 = 1.3, h = 0.62, fs = 14) => items.forEach((t, i) => { const y = y0 + i * (h + 0.1); box(s, pres, 0.5, y, 9, h, K.paper); chip(s, pres, 0.65, y + (h - 0.42) / 2, i + 1, K.teal, K.white, 0.42); T(s, t, { x: 1.3, y, w: 8, h, fontSize: fs, valign: "middle" }); });

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดคาบ บทนี้เพิ่ม plan.md และขั้นตรวจที่ตรวจพฤติกรรมของ code เป็นครั้งแรก");
  T(s, "WS-03", { x: 0.7, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "Unit Test Loop", { x: 0.7, y: 1.8, w: 8.6, h: 1.0, fontSize: 40, bold: true, color: K.white });
  T(s, [{ text: "Rathachai Chawuthai", options: { bold: true, fontSize: 18, color: K.white, breakLine: true } }, { text: "Computer Engineering, KMITL", options: { fontSize: 14, color: "B8C4D4" } }], { x: 0.7, y: 3.55, w: 8.6, h: 0.75 });
  T(s, "SDPX-AI · Software Development Process in Practice — AI-Assisted", { x: 0.7, y: 4.5, w: 8.6, h: 0.4, fontSize: 14, color: "B8C4D4" }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "เมื่อจบคาบ นักศึกษาควรทำได้", "อ่านวัตถุประสงค์ทั้ง 4 ข้อ");
  const it = ["อธิบายว่าเหตุใด AI agent ทำงานได้ตรงขึ้นเมื่อมี unit test ที่เชื่อถือได้", "เขียน plan.md ที่ผู้อื่นลงมือทำตามได้ และระบุ test ที่ยืนยันว่างานเสร็จ", "แยก code ที่เป็นกฎของระบบออกจาก HTTP และการเก็บข้อมูล", "เขียน test ที่ไม่ผ่านเมื่อกฎถูกลบหรือผิด และตรวจ test ที่ AI เขียนได้"];
  it.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.75; box(s, pres, x, y, 4.4, 1.55, K.paper); chip(s, pres, x + 0.2, y + 0.2, i + 1);
    T(s, t, { x: x + 0.8, y: y + 0.2, w: 3.4, h: 1.2, fontSize: 14 }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "เมื่อจบ WS-02 คำตอบคือไม่มี CI ตรวจ lint, build และรูปแบบ openapi.yaml ซึ่งผ่านหมดแม้ระบบรับลงทะเบียนเกิน 3 กิจกรรม กฎข้อนั้นอยู่ได้ด้วยความจำของสมาชิกเท่านั้น ผลจากส่วน C ของ 0-Before ใช้ประกอบได้");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "หากคืนนี้มีผู้ลบบรรทัดที่ตรวจกฎ R5\nออกจาก code ของกลุ่ม\nพรุ่งนี้เช้าจะมีสิ่งใดแจ้งให้ทราบ", { x: 0.7, y: 1.5, w: 8.6, h: 2.8, fontSize: 32, bold: true, color: K.white }); }

// 4 Unit Test Loop
{ const s = lightSlide(pres, S1, "Unit Test Loop",
    "บทนี้เพิ่ม plan.md ต่อจาก intent.md และ spec.md และเพิ่มขั้นตรวจที่ตรวจพฤติกรรมของ code เป็นครั้งแรกในวิชา CI รัน npm test ทุก PR");
  flow(s, pres, [{ t: "spec.md", sub: "และตารางการตัดสินใจ" }, { t: "plan.md", sub: "test ที่ต้องมี", fill: K.tealT }, { t: "Red", sub: "test ที่ยังไม่ผ่าน", fill: K.redT }, { t: "Green", sub: "code ให้ test ผ่าน", fill: K.greenT }, { t: "Refactor", sub: "test ยังผ่าน" }], 0.5, 1.4, 9, 1.3, { gap: 0.25, fs: 13, sfs: 11 });
  T(s, "วนกลับไป Red ทีละ test", { x: 0.5, y: 2.8, w: 9, h: 0.3, fontSize: 12, color: K.mute, align: "right" });
  box(s, pres, 0.5, 3.4, 9, 1.4, K.ink); T(s, "CI รัน npm test ทุก PR", { x: 0.8, y: 3.5, w: 8.4, h: 0.5, fontSize: 20, bold: true, color: K.amber });
  T(s, "จากบทนี้ ขั้น Verify ตรวจพฤติกรรมของ code ไม่ใช่แค่ว่า build ผ่าน", { x: 0.8, y: 4.1, w: 8.4, h: 0.5, fontSize: 15, color: K.white }); }

// 5 3 เกณฑ์ของบทนี้
{ const s = lightSlide(pres, S1, "เป้าหมายของ loop ในบทนี้", "ใช้เกณฑ์ latency, fidelity, coverage จาก WS-01 coverage วัดที่กฎ ไม่ใช่จำนวนบรรทัด");
  rowsTable(s, pres, [["Latency", "npm test ทั้งชุดเสร็จภายในไม่กี่วินาที", "test ช้า คนและ AI จะรันน้อยลง"], ["Fidelity", "ลบหรือแก้ code ของกฎข้อใด ต้องมี test ไม่ผ่านอย่างน้อย 1 ข้อ", "test ที่ผ่านเสมอไม่ป้องกันอะไร"], ["Coverage", "R1, R3, R4, R5 มี test ครบ รวมค่าขอบ", "ครอบคลุมกฎสำคัญ ไม่วัดที่จำนวนบรรทัด"]], 0.5, 1.3, [1.6, 4.0, 3.4], 1.1, { head: ["เกณฑ์", "เป้าหมายในบทนี้", "เหตุผล"], fs: 13, fills: [K.paper, K.tealT, K.paper] }); }

// 6 test คือ Verify ของ agent
{ const s = lightSlide(pres, S1, "test คือขั้น Verify ของ AI agent",
    "agent มีเป้าหมายให้ test ผ่าน และบางครั้งเลือกวิธีที่ง่ายกว่าการแก้ code เช่นแก้ test ให้ตรงกับ code ที่ผิด หรือลบ test ที่ไม่ผ่าน ดังนั้น test ต้องเขียนก่อน code และไม่ให้ agent แก้ test ระหว่างแก้ code");
  box(s, pres, 0.5, 1.3, 4.4, 3.65, K.greenT); T(s, "test เชื่อถือได้", { x: 0.75, y: 1.45, w: 4, h: 0.4, fontSize: 16, bold: true, color: K.green });
  T(s, "agent แก้ code จนทำงานตามกฎจริง", { x: 0.75, y: 2.0, w: 3.9, h: 1.2, fontSize: 15 });
  box(s, pres, 5.1, 1.3, 4.4, 3.65, K.redT); T(s, "test ตรวจไม่ครบ หรือ agent แก้ test", { x: 5.35, y: 1.45, w: 4, h: 0.4, fontSize: 16, bold: true, color: K.red });
  T(s, bullets(["agent รายงานว่าเสร็จทั้งที่ code ผิด", "แก้ test ให้ตรงกับ code ที่ผิด", "ลบ test ที่ไม่ผ่านทิ้ง"]), { x: 5.35, y: 2.0, w: 3.9, h: 2.8, fontSize: 14 }); }

// 7 METR
caseSlide(pres, S1, { title: "กรณีจริง: AI แก้ตัวตรวจแทนการแก้งาน", tag: "METR · มิถุนายน 2025",
  notes: "METR รายงานว่า model รุ่นใหม่หลายรุ่น รวมถึง o3 และ Claude 3.7 Sonnet ทำคะแนนสูงโดยไม่ได้แก้โจทย์จริง เช่นแก้ function จับเวลาให้คืนค่าสั้นกว่าจริง และแก้ function ตรวจคำตอบให้ถือว่าทุกคำตอบถูก เมื่อถาม o3 ภายหลัง ตอบว่าไม่ตรงกับที่ผู้ใช้ต้องการทั้ง 10 ครั้ง",
  facts: ["model รุ่นใหม่หลายรุ่น (รวม o3 และ Claude 3.7 Sonnet) ทำคะแนนสูงโดยไม่ได้แก้โจทย์จริง", "แก้ function จับเวลาให้คืนค่าสั้นกว่าความจริง", "แก้ function ตรวจคำตอบให้ถือว่าทุกคำตอบถูก", "ถาม o3 ภายหลัง: ตอบว่าไม่ตรงกับที่ผู้ใช้ต้องการทั้ง 10 ครั้งที่ถาม"],
  principle: "เหตุผลที่ต้องห้ามแก้ test", takeaway: "model รู้ว่าเป็นการเลี่ยง แต่ยังเลือกทำ จึงต้องมีกติกาและการตรวจ ไม่พึ่งแค่ว่า AI จะรู้เอง",
  refs: "อ้างอิง: METR — Recent Frontier Models Are Reward Hacking" });

// 8 ตรวจอะไรได้
{ const s = lightSlide(pres, S1, "unit test ตรวจอะไรได้ ไม่ได้", "ส่วนที่ unit test ตรวจไม่ได้ มีขั้นตรวจเพิ่มในบทถัดไป ฐานข้อมูลจริงบทที่ 5 หน้าจอและ journey บทที่ 6 R6 บทที่ 7");
  rowsTable(s, pres, [["PR ของ plan.md", "สมาชิกอีกคน", "แผนครบตาม spec และมี test ของทุกกฎ", "ว่า code ภายหลังทำตามแผนจริง"], ["npm test ใน CI", "เครื่อง", "R1, R3, R4, R5 ทำงานตาม spec ทุกครั้งที่แก้ code", "HTTP, ฐานข้อมูลจริง, หน้าจอ และ R6 เมื่อมีคำขอพร้อมกัน"]], 0.5, 1.3, [1.9, 1.4, 3.0, 2.7], 1.0, { head: ["ขั้นตรวจ", "ผู้ตรวจ", "ตรวจได้", "ตรวจไม่ได้"], fs: 12 });
  flow(s, pres, [{ t: "บทที่ 5", sub: "ฐานข้อมูลจริง" }, { t: "บทที่ 6", sub: "หน้าจอและ journey" }, { t: "บทที่ 7", sub: "R6 พร้อมกัน" }], 0.5, 4.2, 9, 0.75, { gap: 0.3, fs: 13, sfs: 11 }); }

// 9 plan คืออะไร
{ const s = lightSlide(pres, S2, "plan.md: จะทำให้เป็นจริงอย่างไร",
    "spec.md บอกว่าทำอะไร plan.md บอกว่าจะทำอย่างไร playbook ให้ AI ร่างแผนใน plan mode (อ่านได้แก้ไม่ได้) แล้วให้คนถามและแก้จนผู้ที่ไม่เคยเห็นบทสนทนาลงมือทำตามได้เพียงลำพัง จากนั้นจึงอนุญาตให้ AI แก้ code ถ้าต้องทำต่างจากแผนให้แก้ plan.md ใน commit เดียวกับ code");
  flow(s, pres, [{ t: "AI ร่างแผน", sub: "plan mode อ่านได้ แก้ไม่ได้" }, { t: "คนถามและแก้", sub: "จนผู้อื่นทำตามได้", fill: K.amber }, { t: "เปิด PR", sub: "สมาชิกอีกคนอนุมัติ" }, { t: "อนุญาตให้ AI แก้ code", fill: K.greenT }], 0.5, 1.4, 9, 1.3, { gap: 0.25, fs: 13, sfs: 11 });
  rowsTable(s, pres, [["plan.md", "แก้ไฟล์ใด ลำดับใด ความเสี่ยงใด test ใดยืนยันว่าเสร็จ", "AI ร่าง กลุ่มแก้จนใช้ได้", "สมาชิกอีกคนผ่าน PR"]], 0.5, 3.2, [1.4, 3.8, 2.0, 1.8], 0.9, { head: ["ไฟล์", "ตอบคำถาม", "ผู้เขียน", "ผู้ตรวจ"], fs: 12 });
  T(s, "ถ้าต้องทำต่างจากแผน: แก้ plan.md ใน commit เดียวกับ code", { x: 0.5, y: 4.65, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal }); }

// 10 plan หลักการ
{ const s = lightSlide(pres, S2, "หลักการเขียน plan", "ตัวอย่างใช้ feature แจ้งเตือนเมื่อได้ที่นั่งจากคิวสำรองต่อจาก WS-02 ซึ่งอยู่นอก PROJECT.md");
  numbered(s, ["อ้างถึง intent, spec และ ADR แผนไม่ตัดสินเรื่องที่ spec ยังไม่ตัดสิน", "ระบุไฟล์ที่จะเพิ่มหรือแก้ทุกไฟล์ พร้อมสิ่งที่เปลี่ยน", "ลำดับงานเริ่มจาก test", "รายการ test ระบุชื่อ และโยงกับรหัสกฎหรือหัวข้อใน spec", "บอกความเสี่ยง วิธีตรวจ และสิ่งที่ไม่ทำ"], 1.3, 0.62, 14); }

// 11 plan ดี/ไม่ดี
goodBad(pres, S2, "ตัวอย่าง plan: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ดีอยู่ใน 1-Lecture.md ฉบับเต็ม ตัวอย่างที่ไม่ดีไม่ระบุไฟล์ เขียน test หลังสร้างระบบ ไม่มีรายชื่อ test ไม่มีความเสี่ยงและสิ่งที่ไม่ทำ",
  ["# Plan", "", "1. สร้างระบบแจ้งเตือน", "2. เขียน test", "3. แก้ bug", "4. deploy"],
  ["# Plan: แจ้งเตือน", "อ้างอิง intent, spec, ADR-002", "## ไฟล์ที่เพิ่ม/แก้", "src/domain/notifications.ts", "src/domain/notifications.test.ts", "## ลำดับ", "1 test + function ว่าง (แดง)", "2 code ใน domain จนผ่าน", "## test ที่ยืนยันว่าเสร็จ", "R2: เลื่อนจากคิวสำรองได้แจ้ง 1", "## ความเสี่ยง / ไม่ทำ"], 11);

// 12 ปัญหา plan
{ const s = lightSlide(pres, S2, "plan ที่ไม่ดีมีปัญหาอะไร", "แต่ละข้อเป็นผลที่เกิดขึ้นจริงเมื่อไม่มีแผนที่ตรวจได้");
  rowsTable(s, pres, [["ไม่ระบุไฟล์", "AI เลือกเองว่าจะวาง code ที่ใด อาจวางกฎใน route handler ขัดกับ ADR-002"], ["เขียน test หลังสร้างระบบ", "test ตาม code ที่มี ไม่ตาม spec ถ้า code ผิด test ก็ผิดตาม"], ["ไม่มีรายชื่อ test", "ไม่รู้ว่าเมื่อใดเสร็จ ผู้ตรวจ PR ไม่มีสิ่งให้เทียบ"], ["ไม่มีความเสี่ยงและสิ่งที่ไม่ทำ", "ขอบเขตขยายเรื่อย ๆ และไม่มีใครเตรียมรับปัญหาที่คาดได้"]], 0.5, 1.3, [3.0, 6.0], 0.8, { fills: [K.redT, K.redT, K.redT, K.redT], fs: 13 }); }

// 13 สถานการณ์ที่พบบ่อย
{ const s = lightSlide(pres, S2, "สถานการณ์ที่พบบ่อย: ไม่มีแผน", "สถานการณ์ที่พบบ่อย ไม่ใช่เหตุการณ์จริงที่มีแหล่งอ้างอิง");
  T(s, "สถานการณ์ที่พบบ่อย", { x: 0.5, y: 1.25, w: 5, h: 0.3, fontSize: 12, bold: true, color: K.teal });
  flow(s, pres, [{ t: "“ทำ feature ลงทะเบียนให้เสร็จ”", sub: "ไม่มีแผน" }, { t: "AI แก้ 15 ไฟล์ใน commit เดียว", sub: "เปลี่ยนรูปแบบ error ที่ตกลงไว้", fill: K.amberT }, { t: "ผู้ตรวจอนุมัติ", sub: "CI สีเขียว ไม่มีแผนให้เทียบ", fill: K.redT }], 0.5, 1.65, 9, 1.4, { gap: 0.3, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.4, 9, 1.4, K.redT); T(s, "ความต่างจาก spec ถูกพบอีก 2 สัปดาห์ต่อมา เมื่อเริ่มเขียน E2E test", { x: 0.75, y: 3.4, w: 8.5, h: 1.4, fontSize: 17, bold: true, valign: "middle" }); }

// 14 เหตุใดต้องแยก
{ const s = lightSlide(pres, S3, "เหตุใดต้องแยกกฎออกจาก HTTP",
    "หากกฎ R4 อยู่ใน route handler การ test ต้องสร้างคำขอ HTTP ต้องมีข้อมูลในที่เก็บ และต้องปรับเวลาเครื่อง จึงช้า เขียนยาก และมักไม่ตรวจค่าขอบ หากกฎอยู่ใน function ที่รับข้อมูลเป็น parameter test เหลือเพียงเรียก function แล้วเทียบผล ไม่ต้องใช้ test double เลย");
  box(s, pres, 0.5, 1.3, 4.4, 3.65, K.redT); T(s, "กฎอยู่ใน route handler", { x: 0.75, y: 1.45, w: 4, h: 0.4, fontSize: 16, bold: true, color: K.red });
  T(s, bullets(["สร้างคำขอ HTTP", "เตรียมข้อมูลในที่เก็บ", "ปรับเวลาเครื่อง", "ช้า เขียนยาก ไม่ตรวจค่าขอบ"]), { x: 0.75, y: 2.0, w: 3.9, h: 2.8, fontSize: 14 });
  box(s, pres, 5.1, 1.3, 4.4, 3.65, K.greenT); T(s, "กฎอยู่ใน function", { x: 5.35, y: 1.45, w: 4, h: 0.4, fontSize: 16, bold: true, color: K.green });
  T(s, bullets(["รับข้อมูลทั้งหมดเป็น parameter", "คืนผลโดยไม่แตะสิ่งภายนอก", "test = เรียก function แล้วเทียบผล", "ไม่ต้องใช้ test double"]), { x: 5.35, y: 2.0, w: 3.9, h: 2.8, fontSize: 14 }); }

// 15 3 ชั้น
{ const s = lightSlide(pres, S3, "การแบ่งชั้น: handler → domain → data", "unit test ชี้ไปที่ domain โดยตรง ไม่ผ่าน handler");
  flow(s, pres, [{ t: "route handler", sub: "src/app/api/...\nอ่านคำขอ แปลงผลเป็น status code" }, { t: "domain", sub: "src/domain/\nกฎ R1–R5 รับ now เป็น parameter", fill: K.tealT }, { t: "data", sub: "src/data/\nอ่านและบันทึกตาม ADR-001" }], 0.5, 1.4, 9, 1.7, { gap: 0.35, fs: 15, sfs: 12 });
  box(s, pres, 3.7, 3.55, 2.6, 0.8, K.amberT); T(s, "unit test", { x: 3.7, y: 3.55, w: 2.6, h: 0.8, fontSize: 16, bold: true, align: "center", valign: "middle" });
  arrow(s, pres, 5.0, 5.0, 3.5); s.addShape(pres.ShapeType.line, { x: 5.0, y: 3.15, w: 0, h: 0.38, line: { color: K.mute, width: 1.5, endArrowType: "triangle" }, flipV: true });
  T(s, "unit test เรียก domain โดยตรง ไม่ผ่าน HTTP และไม่ต้องมีข้อมูลในที่เก็บ", { x: 0.5, y: 4.55, w: 9, h: 0.4, fontSize: 14, color: K.ink2, align: "center" }); }

// 16 เวลาเป็นข้อมูลนำเข้า
{ const s = lightSlide(pres, S3, "เวลาเป็นข้อมูลนำเข้า",
    "R4 ขึ้นกับเวลาปัจจุบัน ถ้า function เรียก new Date() เอง test จะได้เวลาไม่เหมือนเดิมทุกครั้งและทดสอบกรณีเหลือ 24 ชั่วโมงพอดีไม่ได้ ให้ส่งเวลาเข้าเป็น parameter โดย route handler เป็นผู้ส่ง new Date() ตัวอย่างใช้ feature 03-cancel ของบทที่ 4");
  box(s, pres, 0.5, 1.3, 4.4, 1.6, K.redT); T(s, "ไม่ดี: กฎอ่านเวลาเอง", { x: 0.7, y: 1.4, w: 4, h: 0.3, fontSize: 13, bold: true, color: K.red });
  T(s, "const hoursLeft =\n  (event!.startsAt.getTime()\n   - Date.now()) / 3_600_000;", { x: 0.7, y: 1.75, w: 4.0, h: 1.0, fontSize: 12, fontFace: "Courier New" });
  box(s, pres, 5.1, 1.3, 4.4, 1.6, K.greenT); T(s, "ดี: รับ now เป็น parameter", { x: 5.3, y: 1.4, w: 4, h: 0.3, fontSize: 13, bold: true, color: K.green });
  T(s, "export function canCancel(\n  event, now: Date\n): boolean { ... }", { x: 5.3, y: 1.75, w: 4.0, h: 1.0, fontSize: 12, fontFace: "Courier New" });
  rowsTable(s, pres, [["กฎอยู่ใน route handler", "test ต้องสร้างคำขอ HTTP และเตรียมข้อมูลก่อน"], ["เรียก Date.now() เอง", "ทดสอบ “เหลือ 24 ชั่วโมงพอดี” ไม่ได้ ผลขึ้นกับเวลารัน"], ["ใช้ ! บังคับว่ามีข้อมูล", "ไม่พบข้อมูลแล้ว server ตอบ 500 แทน 404 ตาม spec"]], 0.5, 3.1, [2.8, 6.2], 0.55, { fills: [K.redT, K.redT, K.redT], fs: 12 }); }

// 17 canCancel test
{ const s = lightSlide(pres, S3, "ค่าขอบมาจาก spec ไม่ใช่ที่ AI เลือก",
    "เครื่องหมาย >= หรือ > มาจากตารางการตัดสินใจใน spec test ข้อนี้ทำให้การตัดสินใจนั้นถูกตรวจทุกครั้งที่แก้ code ถ้ามีผู้เปลี่ยน >= เป็น > test จะไม่ผ่านทันที");
  codeBox(s, pres, 0.5, 1.3, 9, 2.0, ["// src/domain/cancel.ts", "export function canCancel(event: { startsAt: Date }, now: Date): boolean {", "  return event.startsAt.getTime() - now.getTime() >= DAY_MS;", "}"], 12);
  codeBox(s, pres, 0.5, 3.5, 9, 1.45, ['it("R4: ยกเลิกได้เมื่อเหลือ 24 ชั่วโมงพอดี", () => {', "  const event = { startsAt: new Date(\"2026-12-10T09:00:00Z\") };", "  expect(canCancel(event, new Date(\"2026-12-09T09:00:00Z\"))).toBe(true);", "});"], 12, K.ink2); }

// 18 ADR-002
{ const s = lightSlide(pres, S3, "ADR-002: การแบ่งชั้นของ code",
    "การวาง code ใน src/ มีผลกับงานของทุกคนและเปลี่ยนภายหลังได้ยาก จึงบันทึกเป็น ADR เกณฑ์ที่ตรวจ: กลุ่มเลือกทางใดก็ได้ แต่ต้อง test R1, R3, R4, R5 ได้โดยไม่สร้างคำขอ HTTP และเขียนเหตุผลและผลที่ตามมาได้");
  rowsTable(s, pres, [["ทุกอย่างใน route handler", "ไฟล์น้อย เริ่มเร็ว", "test กฎยาก และกฎเดียวกันอาจถูกเขียนซ้ำหลาย endpoint"], ["แยก handler, domain, data", "test กฎได้โดยตรง เปลี่ยนวิธีเก็บข้อมูลในบทที่ 5 โดยไม่แก้กฎ", "ไฟล์และชั้นมากขึ้น ต้องตกลงว่าสิ่งใดอยู่ชั้นใด"], ["Server Actions ของ Next.js", "เรียกจากหน้าจอได้โดยตรง", "ไม่ตรงกับ openapi.yaml และเรียกด้วย curl หรือ load test ในบทที่ 7 ยากกว่า"]], 0.5, 1.3, [2.5, 3.2, 3.3], 0.95, { head: ["ทางเลือก", "ข้อดี", "ข้อจำกัดที่ต้องรู้"], fs: 12, fills: [K.paper, K.greenT, K.paper] });
  T(s, "เกณฑ์: test R1, R3, R4, R5 ได้โดยไม่สร้างคำขอ HTTP", { x: 0.5, y: 4.75, w: 9, h: 0.25, fontSize: 12, bold: true, color: K.teal }); }

// 19 โครง test
{ const s = lightSlide(pres, S4, "โครงของ test 1 ข้อ", "ชื่อ test ขึ้นต้นด้วยรหัสกฎ เมื่อ test ไม่ผ่านใน CI ชื่อเดียวบอกว่ากฎข้อใดเสีย ใช้ npx vitest run -t \"R1\" รันเฉพาะ test ของกฎนั้นได้");
  codeBox(s, pres, 0.5, 1.3, 6.0, 3.65, ['it("R1: ได้ WAITLISTED เมื่อที่นั่งเต็มพอดี", () => {', "  // Arrange: เตรียมข้อมูล", "  const existing = [confirmed(\"u1\"), confirmed(\"u2\")];", "  // Act: เรียก function", "  const result = register(event, \"u3\", existing, NOW);", "  // Assert: เทียบผล", '  expect(result).toEqual({ ok: true, status: "WAITLISTED" });', "});"], 11);
  [["Arrange", "เตรียมข้อมูล", K.paper], ["Act", "เรียก function ที่ตรวจ", K.tealT], ["Assert", "เทียบผลที่แน่นอน", K.greenT]].forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.7, y, 2.8, 1.15, v[2]);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 15, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: 6.85, y, w: 2.55, h: 1.15, valign: "middle" }); }); }

// 20 หลักการ test
{ const s = lightSlide(pres, S4, "หลักการเขียน test", "ตรวจผลลัพธ์ที่ spec กำหนด ไม่ตรวจรายละเอียดภายในของ code");
  const p = ["ชื่อบอกรหัสกฎ เงื่อนไข และผลที่คาดไว้", "1 test ตรวจพฤติกรรมเดียว", "ใช้เวลาตายตัว ไม่ใช้เวลาจริงของเครื่อง", "มีค่าขอบตาม spec: เหลือ 1 ที่ เต็มพอดี เวลาเริ่มพอดี", "เทียบค่าที่แน่นอน: สถานะและ error code", "แต่ละ test เตรียมข้อมูลเอง ไม่ขึ้นกับลำดับการรัน"];
  p.forEach((t, i) => { const col = i % 2, row = Math.floor(i / 2), x = 0.5 + col * 4.6, y = 1.3 + row * 1.2; box(s, pres, x, y, 4.4, 1.05, K.paper); chip(s, pres, x + 0.15, y + 0.3, i + 1, K.teal, K.white, 0.42); T(s, t, { x: x + 0.7, y, w: 3.6, h: 1.05, fontSize: 13, valign: "middle" }); }); }

// 21 test ดี/ไม่ดี
goodBad(pres, S4, "ตัวอย่าง test: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดี: ชื่อไม่บอกกฎ ใช้ toBeTruthy ซึ่ง object ผ่านเสมอ ใช้ new Date() และตรวจ 2 พฤติกรรมใน test เดียว ตัวอย่างที่ดีมีชื่อรหัสกฎ ค่าที่แน่นอน และเวลาตายตัว",
  ['it("register works", () => {', "  const r1 = register(", '    event, "u1", [], new Date());', "  expect(r1).toBeTruthy();", "  const r2 = register(", '    event, "u1",', '    [confirmed("u1")], new Date());', "  expect(r2).toBeTruthy();", "});"],
  ['it("R3: ซ้ำไม่ได้เมื่อมี', '    WAITLISTED อยู่แล้ว", () => {', "  expect(", '    register(event, "u1",', '      [waitlisted("u1")], NOW))', "    .toEqual({", "      ok: false,", '      code: "ALREADY_REGISTERED"', "    });", "});"], 11);

// 22 ปัญหา test ไม่ดี
{ const s = lightSlide(pres, S4, "test ที่ไม่ดีมีปัญหาอะไร", "toBeTruthy ผ่านกับ object ใดก็ตาม จึงผ่านแม้ R3 ไม่ทำงาน");
  rowsTable(s, pres, [["ชื่อ register works", "ไม่ผ่านใน CI แล้วไม่รู้ว่ากฎข้อใดเสีย"], ["toBeTruthy()", "ผล { ok: false, code } เป็น object จึงผ่านเช่นกัน test ผ่านทั้งที่ R3 ไม่ทำงาน"], ["new Date()", "ผลขึ้นกับวันที่รัน ถึงวันเริ่มกิจกรรม test เริ่มไม่ผ่านโดยไม่มีใครแก้ code"], ["ตรวจ 2 พฤติกรรมใน test เดียว", "assertion แรกไม่ผ่าน assertion ที่สองไม่ถูกรัน"]], 0.5, 1.3, [3.0, 6.0], 0.8, { fills: [K.redT, K.redT, K.redT, K.redT], fs: 13 }); }

// 23 test double
{ const s = lightSlide(pres, S4, "test double และข้อควรระวังเรื่อง mock",
    "เมื่อกฎอยู่ใน domain และรับข้อมูลเป็น parameter test ส่วนใหญ่ไม่ต้องใช้ test double ระวังการใช้ mock กับกฎของระบบ เพราะ test ที่ตรวจว่า function ภายในถูกเรียกจะไม่ผ่านเมื่อจัด code ใหม่ทั้งที่พฤติกรรมยังถูกต้อง");
  rowsTable(s, pres, [["Fake", "ต้องการสิ่งที่ทำงานได้จริงแต่เรียบง่ายกว่า", "ที่เก็บข้อมูลในหน่วยความจำแทนฐานข้อมูล"], ["Stub", "ต้องการกำหนดค่าที่คืนกลับ", "function ที่คืนผู้ใช้ปัจจุบันเป็นผู้ใช้ที่กำหนด"], ["Mock", "ต้องการตรวจว่ามีการเรียก function", "ตรวจว่ามีการบันทึกข้อมูล 1 ครั้ง"]], 0.5, 1.3, [1.3, 3.8, 3.9], 0.85, { head: ["ชนิด", "ใช้เมื่อ", "ตัวอย่างใน project"], fs: 12 });
  box(s, pres, 0.5, 4.3, 9, 0.65, K.amberT); T(s, "ระวัง mock กับกฎ: ตรวจผลลัพธ์ที่ spec กำหนด ไม่ตรวจว่า function ภายในถูกเรียก", { x: 0.75, y: 4.3, w: 8.5, h: 0.65, fontSize: 13, bold: true, valign: "middle" }); }

// 24 ลำดับ Red Green
{ const s = lightSlide(pres, S5, "ลำดับที่ใช้ใน lab",
    "function ว่างในข้อ 1 จำเป็น เพราะ npm run build ตรวจ type ของไฟล์ test ด้วย ถ้า test import function ที่ยังไม่มี ทั้ง build และ Vercel preview จะไม่ผ่าน ข้อ 2 ต้องไม่ผ่านด้วยเหตุผลที่ถูกต้อง คือ not implemented หรือค่าไม่ตรง ไม่ใช่หาไฟล์ไม่พบ");
  numbered(s, ["เขียน test จาก plan.md และสร้าง function ว่าง (throw not implemented)", "รัน npm test ยืนยันว่าไม่ผ่านด้วยเหตุผลที่ถูกต้อง ไม่ใช่หาไฟล์ไม่พบ", "commit และ push test นี้ก่อน CI ของ PR เป็นสีแดง", "สั่ง AI เขียน code ให้ test ผ่าน โดยห้ามแก้ไฟล์ test", "รัน npm test จนผ่าน แล้ว commit code CI กลับเป็นสีเขียว"], 1.3, 0.62, 13); }

// 25 AGENTS.md rules
{ const s = lightSlide(pres, S5, "กติกาใหม่ใน AGENTS.md", "playbook กำหนดว่า ถ้า test ไม่ผ่านให้แก้ code ไม่ใช่ test และให้ agent รัน test และแสดงผลก่อนรายงานว่าเสร็จ");
  codeBox(s, pres, 0.5, 1.3, 9, 3.65, ["- ก่อนแก้ code ให้อ่าน docs/features/[feature]/plan.md", "  ต้องทำต่างจากแผน ให้แก้ plan.md ใน commit เดียวกัน", "- กฎ R1–R6 อยู่ใน src/domain/ เท่านั้น (ADR-002)", "- function ใน src/domain/ ห้ามเรียก new Date() / Date.now()", "  ให้รับเวลาเป็น parameter", "- คิดว่า test ผิด: หยุดและอธิบายเหตุผล ห้ามแก้ test เอง", "- รัน npm test ก่อนรายงานว่าเสร็จ และแสดงผลที่ได้"], 12); }

// 26 ImpossibleBench
caseSlide(pres, S5, { title: "กรณีจริง: บอกให้หยุดเมื่อ test ขัดกับ spec", tag: "ImpossibleBench · CMU และ Anthropic · ตุลาคม 2025",
  notes: "นักวิจัยแก้ unit test ของโจทย์ให้ขัดกับคำอธิบายโจทย์ ถ้า model ทำให้ test ผ่านได้ แปลว่าใช้ทางลัด GPT-5 ใช้ทางลัดใน 54% ของโจทย์ชุดหนึ่งที่มาจาก SWE-bench และ Claude Opus 4.1 ส่วนใหญ่แก้ไฟล์ test เมื่อเพิ่มคำสั่งให้หยุดหาก test ขัดกับโจทย์ อัตราของ GPT-5 ในโจทย์อีกชุดลดจาก 92% เหลือ 1% และการทำให้ไฟล์ test แก้ไม่ได้ป้องกันการแก้ test โดยไม่ทำให้ผลงานจริงลดลง",
  facts: ["แก้ unit test ของโจทย์ให้ขัดกับคำอธิบายโจทย์ ถ้าผ่านได้แปลว่าใช้ทางลัด", "GPT-5 ใช้ทางลัดใน 54% ของโจทย์ชุดหนึ่งจาก SWE-bench", "Claude Opus 4.1 ส่วนใหญ่ใช้วิธีแก้ไฟล์ test", "สั่งให้หยุดหาก test ขัดกับโจทย์: GPT-5 ในโจทย์อีกชุดลดจาก 92% เหลือ 1%", "ทำให้ไฟล์ test แก้ไม่ได้ ป้องกันได้โดยผลงานจริงไม่ลด"],
  principle: "ที่มาของกติกาใน AGENTS.md", takeaway: "“ห้ามแก้ test และให้หยุดถามหากคิดว่า test ผิด” มาจากผลนี้",
  refs: "อ้างอิง: arXiv:2510.20270 — ImpossibleBench" });

// 27 Kent Beck
caseSlide(pres, S5, { title: "กรณีจริง: TDD กับ AI agent", tag: "Kent Beck · มิถุนายน 2025",
  notes: "Kent Beck ผู้พัฒนา Test-Driven Development เขียนบันทึกการสร้าง library B+ Tree ร่วมกับ AI agent กำหนดใน prompt ให้ทำตาม Red, Green, Refactor และเขียน test ทีละข้อ สัญญาณที่เฝ้าดูเพื่อหยุด agent: การทำงานวนซ้ำ การเพิ่มสิ่งที่ไม่ได้สั่ง และการปิดหรือลบ test ซึ่งเขาถือว่าเป็นการโกง",
  facts: ["เขียนบันทึกการสร้าง library B+ Tree ร่วมกับ AI agent", "กำหนดใน prompt: Red → Green → Refactor และเขียน test ทีละข้อ", "สัญญาณที่หยุด agent: ทำงานวนซ้ำ, เพิ่มสิ่งที่ไม่ได้สั่ง", "การปิดหรือลบ test ถือเป็นการโกง"],
  principle: "ที่มาของลำดับใน lab", takeaway: "ลำดับ Red → Green → Refactor และการเฝ้าสัญญาณของ agent ใช้ได้จริงกับ AI agent",
  refs: "อ้างอิง: Kent Beck — Augmented Coding: Beyond the Vibes" });

// 28 mutation
{ const s = lightSlide(pres, S5, "test ที่ผ่านยังไม่พอ: ลบกฎแล้วดูว่า test จับได้หรือไม่",
    "test ที่ผ่านทั้งหมดบอกเพียงว่า code ไม่ขัดกับ test ไม่ได้บอกว่า test ตรวจกฎครบ วิธีตรวจที่ตรงที่สุดคือแก้ code ของกฎให้ผิดทีละจุด แนวคิดนี้เรียก mutation testing ซึ่งมีเครื่องมือทำอัตโนมัติ ในบทนี้ทำด้วยมือในขั้นตอนที่ 6 coverage บอกว่าบรรทัดใดถูกรัน แต่บรรทัดที่ถูกรันโดย test ที่ใช้ toBeTruthy ก็นับเป็น coverage");
  flow(s, pres, [{ t: "แก้กฎให้ผิด 1 จุด", sub: "ลบเงื่อนไข หรือ < เป็น <=" }, { t: "รัน npm test" }, { t: "มี test ไม่ผ่าน?", sub: "ไม่มี = กฎจุดนั้นไม่มี test ป้องกัน", fill: K.amber }, { t: "คืนไฟล์เดิม", sub: "git checkout" }], 0.5, 1.4, 9, 1.4, { gap: 0.25, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.2, 9, 1.7, K.paper); T(s, "coverage บอกว่าส่วนใดยังไม่มี test", { x: 0.75, y: 3.3, w: 8.5, h: 0.4, fontSize: 15, bold: true });
  T(s, "แต่บอกไม่ได้ว่า test ที่มีอยู่ตรวจได้จริง เพราะบรรทัดที่ถูกรันโดย toBeTruthy() ก็นับเป็น coverage", { x: 0.75, y: 3.8, w: 8.5, h: 0.9, fontSize: 14, color: K.ink2 }); }

// 29 Meta ACH
caseSlide(pres, S5, { title: "กรณีจริง: ใช้ข้อผิดพลาดจำลองนำการสร้าง test", tag: "Meta · ACH · 2025",
  notes: "Meta รายงานเครื่องมือ ACH ใช้ LLM สร้างข้อผิดพลาดจำลองใน code ที่เกี่ยวกับความเป็นส่วนตัว แล้วสร้าง test ที่ไม่ผ่านเมื่อมีข้อผิดพลาดนั้น กับ class ภาษา Kotlin 10,795 class วิศวกรรับ test ที่เสนอ 73% และประมาณครึ่งหนึ่งของ test ที่ได้จะถูกคัดทิ้งหากเลือกจากการเพิ่ม coverage เพียงอย่างเดียว",
  facts: ["ใช้ LLM สร้างข้อผิดพลาดจำลองใน code ที่เกี่ยวกับความเป็นส่วนตัว", "สร้าง test ที่ไม่ผ่านเมื่อมีข้อผิดพลาดนั้น", "ใช้กับ class ภาษา Kotlin 10,795 class: วิศวกรรับ test ที่เสนอ 73%", "ประมาณครึ่งหนึ่งของ test ที่ได้ จะถูกคัดทิ้งหากเลือกจาก coverage อย่างเดียว"],
  principle: "เชื่อมกับขั้นตอนที่ 6", takeaway: "เริ่มจากข้อผิดพลาดที่จำลองขึ้น ดีกว่าเริ่มจากตัวเลข coverage ซึ่งเป็นหลักการเดียวกับขั้นตอนที่ 6 ของ lab",
  refs: "อ้างอิง: arXiv:2501.12862 — Mutation-Guided LLM-based Test Generation at Meta" });

// 30 สรุป
{ const s = darkSlide(pres, S6, "สรุป 5 ข้อ ก่อนเข้าสู่ lab");
  T(s, "สรุป", { x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["test คือขั้น Verify ของ agent test ที่ตรวจไม่ครบทำให้ agent รายงานว่าเสร็จทั้งที่ code ผิด", "plan.md ระบุไฟล์ ลำดับ ความเสี่ยง และ test ที่ยืนยันว่าเสร็จ ก่อนให้ AI แก้ code", "กฎอยู่ใน function ที่รับข้อมูลและเวลาเป็น parameter จึง test ค่าขอบได้โดยตรง", "เขียน test ก่อน ยืนยันว่าไม่ผ่านด้วยเหตุผลที่ถูกต้อง แล้วให้ AI แก้ code โดยห้ามแก้ test", "ตรวจคุณภาพ test ด้วยการแก้กฎให้ผิด ไม่ใช่ดูตัวเลข coverage"];
  r.forEach((t, i) => { const y = 1.15 + i * 0.78; chip(s, pres, 0.7, y + 0.08, i + 1, K.amber, K.ink, 0.4); T(s, t, { x: 1.3, y, w: 8.2, h: 0.65, fontSize: 15, color: K.white, valign: "middle" }); }); }

// 31-32 Glossary
const GL = [["plan.md", "แผนที่ระบุไฟล์ ลำดับ ความเสี่ยง และ test ที่ยืนยันว่าเสร็จ"], ["plan mode", "โหมดที่ AI อ่านไฟล์ได้แต่แก้ไม่ได้ ใช้ร่างแผน"], ["Red → Green → Refactor", "เขียน test ที่ไม่ผ่าน → code ให้ผ่าน → จัด code โดย test ยังผ่าน"],
  ["unit test", "test ที่เรียก function โดยตรง ตรวจกฎโดยไม่ผ่าน HTTP"], ["domain", "ชั้นที่เก็บกฎของระบบ (src/domain/) รับเวลาเป็น parameter"], ["Arrange / Act / Assert", "เตรียมข้อมูล → เรียก function → เทียบผล"],
  ["ค่าขอบ", "ค่าตรงเส้นแบ่งของกฎ เช่น เหลือ 24 ชั่วโมงพอดี"], ["test double", "Fake, Stub, Mock: สิ่งที่ใช้แทนของจริงใน test"], ["coverage", "บรรทัดที่ถูกรัน ไม่ได้บอกว่า test ตรวจได้จริง"],
  ["mutation testing", "แก้กฎให้ผิดแล้วดูว่า test จับได้หรือไม่"], ["reward hacking", "AI ทำให้ตัวตรวจผ่านโดยไม่แก้งานจริง"], ["ADR-002", "บันทึกการตัดสินใจเรื่องการแบ่งชั้นของ code"]];
[0, 6].forEach((k, n) => { const s = lightSlide(pres, S7, "Glossary (" + (n + 1) + "/2)", "ใช้ทบทวนคำศัพท์ของบทนี้");
  GL.slice(k, k + 6).forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.1, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 15, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.2, y, w: 4.0, h: 1.1, valign: "middle" }); }); });

// L1
{ const s = darkSlide(pres, S8, "เปลี่ยนจากบรรยายเป็นลงมือ");
  T(s, "Lab", { x: 0.7, y: 1.1, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "test ก่อน code\nให้ครบรอบ", { x: 0.7, y: 1.7, w: 8.6, h: 1.6, fontSize: 38, bold: true, color: K.white });
  T(s, "ADR-002 → plan.md → Red/Green → กฎ R1, R3, R4, R5 → แก้กฎให้ผิด", { x: 0.7, y: 3.8, w: 8.6, h: 0.5, fontSize: 16, color: "B8C4D4" }); }

// L2 brief
{ const s = lightSlide(pres, S8, "Brief ของ lab: ทำอะไรและได้อะไร", "งานกลุ่ม ใช้ repository เดิมจาก WS-02");
  const c = [["รูปแบบ", "งานกลุ่ม ใช้ repository เดิมจาก WS-02"], ["เป้าหมาย", "01-events และ 02-register ใช้งานได้ผ่าน API ตาม openapi.yaml"], ["สิ่งที่ได้", "unit test ของ R1, R3, R4, R5 ที่เขียนก่อน code · CI รัน test ทุก PR · plan.md ของ 2 feature · ADR-002"], ["กติกา", "test ก่อน code · ห้ามให้ AI แก้ test · ผ่าน PR ที่สมาชิกอีกคนอนุมัติ"]];
  c.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.65; box(s, pres, x, y, 4.4, 1.5, i === 3 ? K.amberT : K.paper);
    T(s, v[0], { x: x + 0.25, y: y + 0.15, w: 3.9, h: 0.35, fontSize: 13, bold: true, color: K.teal }); T(s, v[1], { x: x + 0.25, y: y + 0.55, w: 3.9, h: 0.85, fontSize: 13 }); }); }

// L3 steps
{ const s = lightSlide(pres, S8, "7 ขั้นตอนของ lab", "ทุกขั้นมี ทำ / ผลที่ควรเห็น / หากติดปัญหา ขั้น 3 คือรอบ Red → Green แรกร่วมกัน ขั้น 4 แต่ละคนทำกฎที่ตนรับผิดชอบ");
  const st = [["1", "เขียน ADR-002", "การแบ่งชั้นของ code"], ["2", "ให้ AI ร่าง plan.md", "กลุ่มแก้จนใช้ได้ · 2 feature"], ["3", "ติดตั้ง Vitest และรอบ Red → Green แรก", "เพิ่ม npm test ใน CI และ AGENTS.md"], ["4", "test ก่อน code ของ R1, R3, R4, R5", "แต่ละคนทำกฎของตน"],
    ["5", "เชื่อม route handler และที่เก็บข้อมูล", "เรียกเทียบกับ openapi.yaml"], ["6", "แก้กฎให้ผิดทีละข้อ", "ดูว่า test จับได้หรือไม่ (ไม่ commit)"], ["7", "เตรียมหลักฐาน", "break-it-live · evidence"]];
  st.forEach((v, i) => { const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4, x = 0.5 + col * 4.6, y = 1.3 + row * 0.9;
    box(s, pres, x, y, 4.4, 0.8, i === 6 ? K.amberT : K.paper); chip(s, pres, x + 0.15, y + 0.19, v[0], i === 6 ? K.amber : K.teal, i === 6 ? K.ink : K.white);
    T(s, [{ text: v[1], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[2], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.75, y, w: 3.55, h: 0.8, valign: "middle" }); });
  box(s, pres, 5.1, 4.0, 4.4, 0.8, K.ink); T(s, "แต่ละขั้น: ทำ → ผลที่ควรเห็น → หากติดปัญหา", { x: 5.25, y: 4.0, w: 4.1, h: 0.8, fontSize: 13, color: K.white, valign: "middle" }); }

// L4 repo
{ const s = lightSlide(pres, S8, "repository ที่จะได้เมื่อจบบทนี้", "ชื่อไฟล์ใน src/ เป็นตัวอย่างสำหรับกลุ่มที่แบ่ง 3 ชั้น ให้ใช้ตาม plan.md ของกลุ่ม");
  codeBox(s, pres, 0.5, 1.3, 5.8, 3.65, ["AGENTS.md           ← 3", "package.json · vitest.config.mts ← 3", "docs/adr/ADR-002-layering.md ← 1", "docs/features/*/plan.md ← 2", "src/domain/", "  types.ts events.ts ← 3", "  registration.ts ← 4", "  registration-r*.test.ts ← 4", "src/data/store.ts ← 5", "src/app/api/... ← 5", "evidence/ws-03.md ← 6, 7", ".github/workflows/ci.yml ← 3"], 11);
  [["เพิ่มใน CI", "npm test ต่อจาก npm run lint"], ["เพิ่มคำสั่งใน AGENTS.md", "test · npx vitest run -t \"R1\""], ["ชื่อไฟล์ test", "แยกตามกฎ registration-r*.test.ts"]].forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.5, y, 3.0, 1.15, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11, color: K.ink2 } }], { x: 6.65, y, w: 2.75, h: 1.15, valign: "middle" }); }); }

// L5 Red green
{ const s = lightSlide(pres, S8, "ขั้นที่ 3: PR แรก CI แดงโดยตั้งใจ",
    "commit test พร้อม function ว่างก่อน push และเปิด PR CI ของ PR เป็นสีแดงที่ขั้น npm test ส่วน Vercel preview ยัง build ผ่าน ถ้า CI แดงที่ build แทน test แปลว่า test import สิ่งที่ยังไม่มี ให้สร้าง function ว่างให้ครบทุกตัว ถ้าแดงที่ npm ci ให้ตรวจว่า commit package-lock.json");
  flow(s, pres, [{ t: "commit test", sub: "+ function ว่าง" }, { t: "push และเปิด PR" }, { t: "CI แดง", sub: "ที่ขั้น npm test", fill: K.redT }, { t: "AI เขียน code", sub: "ห้ามแก้ test" }, { t: "CI เขียว", fill: K.greenT }], 0.5, 1.5, 9, 1.4, { gap: 0.22, fs: 13, sfs: 11 });
  rowsTable(s, pres, [["CI แดงที่ build แทน test", "test import สิ่งที่ยังไม่มี สร้าง function ว่างให้ครบทุกตัว"], ["CI แดงที่ npm ci", "ตรวจว่า commit package-lock.json แล้ว"]], 0.5, 3.3, [3.0, 6.0], 0.65, { fills: [K.amberT, K.amberT], fs: 12 }); }

// L6 mutation step
{ const s = lightSlide(pres, S8, "ขั้นที่ 6: แก้กฎให้ผิด ไม่ commit",
    "ทำในเครื่องบน main ล่าสุด ไม่ commit สมาชิกแต่ละคนทำกับกฎของตน ทุกจุดที่แก้ต้องมี test ไม่ผ่านอย่างน้อย 1 ข้อ ถ้าแก้แล้วไม่มี test ไม่ผ่าน ให้เพิ่ม test ใน PR ใหม่แล้วทำซ้ำ และบันทึกในตาราง");
  numbered(s, ["เปิด src/domain/registration.ts แก้ code ของกฎตนให้ผิด 1 จุด", "รัน npm test แล้วจดชื่อ test ที่ไม่ผ่าน", "คืนไฟล์เดิมด้วย git checkout -- src/domain", "ทำซ้ำอีก 1 จุด แล้วบันทึกผลใน evidence/ws-03.md"], 1.25, 0.52, 14);
  rowsTable(s, pres, [["R4", "เปลี่ยน < เป็น <= ในการเทียบเวลาเริ่ม", "R4: ลงทะเบียนไม่ได้เมื่อถึงเวลาเริ่มพอดี"]], 0.5, 4.0, [0.8, 4.0, 4.2], 0.55, { head: ["กฎ", "จุดที่แก้", "test ที่ไม่ผ่าน"], fs: 11 }); }

// L7 break-it
{ const s = lightSlide(pres, S8, "break-it-live: ลบเงื่อนไขของ R5",
    "ลบหรือ comment เงื่อนไขที่ตรวจกฎ R5 ใน registration.ts บน branch demo/broken-rule เปิด PR รอให้ CI แดงที่ขั้น npm test แล้วปิด PR ไม่ merge ถ้า CI ยังเขียว แปลว่า R5 ไม่มี test ป้องกัน ให้กลับไปขั้น 6 ถ้าแดงที่ lint หรือ build ให้ลบเฉพาะเงื่อนไขของ if แทนการลบทั้งบล็อก");
  flow(s, pres, [{ t: "branch", sub: "demo/broken-rule" }, { t: "ลบเงื่อนไข R5", sub: "ใน registration.ts" }, { t: "เปิด PR", sub: "CI แดงที่ npm test", fill: K.redT }, { t: "ปิด PR", sub: "ไม่ merge", fill: K.amberT }], 0.5, 1.7, 9, 1.4, { gap: 0.3, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.6, 9, 1.3, K.paper); T(s, "สิ่งที่พิสูจน์ได้: กฎที่ถูกลบมี test จับได้ก่อนถึงเว็บจริง", { x: 0.75, y: 3.6, w: 8.5, h: 1.3, fontSize: 15, bold: true, valign: "middle" }); }

// L8 evidence
{ const s = lightSlide(pres, S8, "หลักฐานใน evidence/ws-03.md", "ตาราง AI เสนอแต่ไม่รับต้องมีอย่างน้อย 2 แถว");
  rowsTable(s, pres, [["จำนวน test และเวลาที่ใช้", "ตัวเลข Tests และ Duration จาก npm test บน main"], ["PR ของแต่ละกฎ", "R1, R3, R4, R5: commit test แดง แล้ว commit code เขียว"], ["Break-it-live", "ลิงก์ PR ที่ CI ไม่ผ่านและปิดแล้ว"], ["ผลการแก้กฎให้ผิด", "ตาราง กฎ / จุดที่แก้ / test ที่ไม่ผ่าน"], ["AI เสนอแต่ไม่รับ", "ตาราง “AI เสนอ / เหตุผลที่ไม่รับ” อย่างน้อย 2 แถว"]], 0.5, 1.3, [3.2, 5.8], 0.62, { fills: [K.paper, K.paper, K.paper, K.paper, K.amberT], fs: 13 }); }

// L9 การวัดผล
{ const s = lightSlide(pres, S8, "การวัดผล: Present 7 ขั้นตอน", "เวลา 5 นาทีต่อกลุ่ม ผู้ตรวจเลือกกฎ 1 ข้อจาก R1, R3, R4 หรือ R5 และชี้ 1 บรรทัดใน code ไม่มีการให้คะแนน");
  const r = [["ผู้ตรวจเลือกกฎ กลุ่มเปิด PR ของกฎนั้น", "commit test CI แดง อยู่ก่อน commit code CI เขียว"], ["รัน npx vitest run -t รหัสกฎ", "ผ่านทั้งหมด และมีค่าขอบตาม spec อย่างน้อย 1 test"], ["ผู้ตรวจชี้ 1 บรรทัด กลุ่มแก้ให้ผิดแล้วรัน npm test", "มี test ไม่ผ่านอย่างน้อย 1 ข้อ"], ["เปิด plan.md ที่รายการ test ของกฎนั้น", "ชื่อ test ในแผนตรงกับชื่อที่รัน"], ["เปิด ADR-002 แล้วอธิบาย", "บอกทางเลือกที่ไม่เลือกและเหตุผล"], ["เรียก endpoint ลงทะเบียน 2 ครั้ง ผู้ใช้คนเดียว", "ครั้งที่สองได้ status และ error code ของ R3"], ["เปิด PR break-it-live", "CI สีแดงที่ขั้น npm test"]];
  T(s, "ขั้นตอน", { x: 1.05, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute }); T(s, "เกณฑ์ผ่าน", { x: 5.3, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  r.forEach((v, i) => { const y = 1.48 + i * 0.5; box(s, pres, 0.5, y, 9, 0.46, i % 2 ? K.white : K.paper); chip(s, pres, 0.55, y + 0.04, i + 1, K.teal, K.white, 0.38);
    T(s, v[0], { x: 1.05, y, w: 4.15, h: 0.46, fontSize: 11, valign: "middle", bold: true }); T(s, v[1], { x: 5.3, y, w: 4.1, h: 0.46, fontSize: 11, valign: "middle" }); }); }

// L10 Retro
{ const s = lightSlide(pres, S8, "Retro: ปรึกษากันแล้วบันทึกท้าย evidence", "ข้อ 3 เชื่อมไปบทถัดไป");
  const q = ["กฎข้อใดที่ test ของกลุ่มยังป้องกันได้ไม่ครบ และรู้ได้อย่างไร", "AI เสนอแก้ test หรือเสนอผลที่ขัดกับ spec ครั้งใดบ้าง และพบได้จากขั้นตอนใด", "ขั้นตอนใดวันนี้ยังทำด้วยมือ และควรเปลี่ยนเป็นการตรวจอัตโนมัติในบทใด"];
  q.forEach((t, i) => { const y = 1.4 + i * 1.15; box(s, pres, 0.5, y, 9, 1.0, K.paper); chip(s, pres, 0.75, y + 0.29, i + 1); T(s, t, { x: 1.4, y, w: 7.9, h: 1.0, fontSize: 16, valign: "middle" }); }); }

L.save(pres, "ws-03-unit-test.pptx").then(() => console.log("saved"));
