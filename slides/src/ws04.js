const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref, codeBox, rowsTable, goodBad } = L;
const S0 = "เปิดคาบ", S1 = "CI, Delivery, Deployment", S2 = "จากสัญญาณเป็นด่าน", S3 = "Ruleset", S4 = "REVIEW.md", S5 = "ความปลอดภัยของ CI", S6 = "สรุป", S7 = "Glossary", S8 = "Lab และการวัดผล";
const pres = L.newDeck("WS-04 CI/CD Loop", [S0, S1, S2, S3, S4, S5, S6, S7, S8]);
const bullets = (a) => a.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 } }));
const numbered = (s, items, y0 = 1.3, h = 0.62, fs = 14) => items.forEach((t, i) => { const y = y0 + i * (h + 0.1); box(s, pres, 0.5, y, 9, h, K.paper); chip(s, pres, 0.65, y + (h - 0.42) / 2, i + 1, K.teal, K.white, 0.42); T(s, t, { x: 1.3, y, w: 8, h, fontSize: fs, valign: "middle" }); });
const H = (t, sub) => ({ t, sub, fill: K.amber });          // จุดที่คนตัดสิน
const legend = (s, y = 4.75) => { s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: y + 0.03, w: 0.3, h: 0.2, fill: { color: K.amber }, line: { color: K.amber, width: 0 }, rectRadius: 0.05 }); T(s, "กรอบสีเหลือง = จุดที่คนตัดสิน · กรอบอื่นทำโดยเครื่องหรือ AI", { x: 0.9, y, w: 8, h: 0.28, fontSize: 12, color: K.ink2, valign: "middle" }); };

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดคาบ บทนี้เปลี่ยน CI จากสัญญาณเตือนให้เป็นด่านที่ข้ามไม่ได้");
  T(s, "WS-04", { x: 0.7, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "CI/CD Loop", { x: 0.7, y: 1.8, w: 8.6, h: 1.0, fontSize: 40, bold: true, color: K.white });
  T(s, [{ text: "Rathachai Chawuthai", options: { bold: true, fontSize: 18, color: K.white, breakLine: true } }, { text: "Computer Engineering, KMITL", options: { fontSize: 14, color: "B8C4D4" } }], { x: 0.7, y: 3.55, w: 8.6, h: 0.75 });
  T(s, "SDPX-AI · Software Development Process in Practice — AI-Assisted", { x: 0.7, y: 4.5, w: 8.6, h: 0.4, fontSize: 14, color: "B8C4D4" }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "เมื่อจบคาบ นักศึกษาควรทำได้", "อ่านวัตถุประสงค์ทั้ง 5 ข้อ");
  const it = ["แยก CI, Continuous Delivery และ Continuous Deployment พร้อมเครื่องมือและจุดที่คนตัดสิน", "อธิบายความต่างของสัญญาณกับด่าน และเหตุใดด่านสำคัญขึ้นเมื่อ AI เขียนเร็ว", "ตั้ง ruleset ให้ main รับเฉพาะ PR ที่ผ่าน CI และได้รับอนุมัติ", "เขียน REVIEW.md ที่ทำให้คนและ AI review ตามเกณฑ์เดียวกัน", "ระบุความเสี่ยงของ workflow ใน CI และย้อนการแก้ไขผ่าน PR"];
  it.forEach((t, i) => { const col = i % 2, row = Math.floor(i / 2), x = 0.5 + col * 4.6, y = 1.3 + row * 1.2, w = i === 4 ? 9 : 4.4; box(s, pres, x, y, w, 1.05, K.paper); chip(s, pres, x + 0.15, y + 0.3, i + 1);
    T(s, t, { x: x + 0.7, y, w: w - 0.85, h: 1.05, fontSize: 13, valign: "middle" }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "คำตอบคือได้ทั้ง 2 ข้อ CI ที่สร้างใน WS-01 ถึง WS-03 เป็นเพียงสัญญาณเตือน ถ้ามีผู้ไม่ดูหรือรีบ code ที่ test ไม่ผ่านก็ขึ้นเว็บจริงได้ทันที เพราะ Vercel deploy ทุกครั้งที่ main เปลี่ยน ผลจากส่วน C ของ 0-Before: สั่ง AI review โดยไม่มีเกณฑ์ ผลมักยาว ปนเรื่องสำคัญกับเรื่องเล็ก");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "ใน repository ของกลุ่มตอนนี้\npush เข้า main โดยตรงได้หรือไม่\nและ merge PR ที่ CI สีแดงได้หรือไม่", { x: 0.7, y: 1.5, w: 8.6, h: 2.8, fontSize: 32, bold: true, color: K.white }); }

// 4 สามคำ
{ const s = lightSlide(pres, S1, "สามคำที่มักใช้ปนกัน",
    "คำว่า CD ใช้ได้ 2 ความหมาย ความต่างอยู่ที่ขั้นสุดท้าย คือใครเป็นผู้ปล่อยของขึ้นเว็บจริง Martin Fowler อธิบายว่า Continuous Delivery คือทีมสามารถปล่อยได้ทุกเมื่อ แต่อาจเลือกยังไม่ปล่อย ส่วน Continuous Deployment คือทุกการแก้ไขที่ผ่าน pipeline ขึ้นเว็บจริงอัตโนมัติ ทั้งสองแบบต้องมี CI ที่เชื่อถือได้มาก่อน");
  const c = [["Continuous Integration", "ตรวจ lint, test, build ทุกครั้งที่มีการแก้ไขจะรวมเข้า main", "อนุมัติ PR ก่อน merge", K.tealT], ["Continuous Delivery", "CI ทั้งหมด และ build main ทุก commit ให้พร้อมขึ้นเว็บจริง", "อนุมัติ PR และกดปล่อยขึ้นเว็บจริง", K.paper], ["Continuous Deployment", "CI ทั้งหมด และนำ main ทุก commit ที่ผ่านขึ้นเว็บจริงทันที", "อนุมัติ PR เท่านั้น ไม่มีคนกดปล่อย", K.amberT]];
  c.forEach((v, i) => { const x = 0.5 + i * 3.1; box(s, pres, x, 1.3, 2.9, 3.4, v[3]); T(s, v[0], { x: x + 0.2, y: 1.4, w: 2.5, h: 0.7, fontSize: 15, bold: true, color: K.teal });
    T(s, "เครื่องทำอะไร", { x: x + 0.2, y: 2.15, w: 2.5, h: 0.25, fontSize: 10, bold: true, color: K.mute }); T(s, v[1], { x: x + 0.2, y: 2.4, w: 2.5, h: 0.95, fontSize: 12 });
    T(s, "คนตัดสินตรงไหน", { x: x + 0.2, y: 3.4, w: 2.5, h: 0.25, fontSize: 10, bold: true, color: K.mute }); T(s, v[2], { x: x + 0.2, y: 3.65, w: 2.5, h: 0.95, fontSize: 12, bold: true }); });
  ref(s, "อ้างอิง: Martin Fowler — ContinuousDelivery"); }

// 5 เส้นทาง ช่วงก่อน merge
{ const s = lightSlide(pres, S1, "เส้นทางของกลุ่ม (1/2): ก่อน merge",
    "ช่วง CI ก่อน merge: ผู้เขียนอ่าน diff และผล test แล้ว commit (H1) เปิด PR แล้ว GitHub Actions รัน job build, สมาชิกที่ไม่ใช่ผู้เขียนสั่ง AI review ตาม REVIEW.md, Vercel สร้าง Preview ผู้เขียนตอบข้อ Important (H2) สมาชิกอีกคนอนุมัติ (H3) ruleset main-gate ตรวจว่า CI ผ่านและมีผู้อนุมัติ จึง merge ได้");
  T(s, "เครื่องของสมาชิก", { x: 0.5, y: 1.2, w: 4, h: 0.28, fontSize: 12, bold: true, color: K.mute });
  flow(s, pres, [{ t: "AI agent", sub: "เขียน code · รัน npm test" }, H("H1 ผู้เขียน", "อ่าน diff และผล test แล้ว commit")], 0.5, 1.5, 9, 0.9, { gap: 0.4, fs: 13, sfs: 11 });
  T(s, "CI · ก่อน merge", { x: 0.5, y: 2.6, w: 4, h: 0.28, fontSize: 12, bold: true, color: K.mute });
  flow(s, pres, [{ t: "Pull request", sub: "GitHub" }, { t: "ตรวจอัตโนมัติ", sub: "Actions job build · AI review · Vercel Preview" }, H("H2 + H3", "ผู้เขียนตอบ Important · สมาชิกอีกคนอนุมัติ"), { t: "ruleset main-gate", sub: "ครบ → merge", fill: K.greenT }], 0.5, 2.9, 9, 1.3, { gap: 0.25, fs: 12, sfs: 10 });
  legend(s); }

// 6 หลัง merge
{ const s = lightSlide(pres, S1, "เส้นทางของกลุ่ม (2/2): หลัง merge",
    "ช่วง CD หลัง merge: Vercel build จาก main แล้วขึ้นเว็บจริงอย่างไร Continuous Delivery คนกด Promote (H4) Continuous Deployment เครื่องปล่อยเอง ซึ่งเป็นค่าเริ่มต้นของกลุ่ม หลังขึ้นเว็บจริง คนตรวจเว็บจริงและตัดสินใจ Revert (H5)");
  flow(s, pres, [{ t: "merge เข้า main" }, { t: "Vercel build", sub: "จาก main" }, { t: "ขึ้นเว็บจริงอย่างไร?", sub: "แยก 2 ทาง", fill: K.tealT }], 0.5, 1.4, 9, 1.0, { gap: 0.35, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 2.7, 4.4, 1.5, K.paper); T(s, [{ text: "Continuous Delivery", options: { bold: true, fontSize: 14, breakLine: true } }, { text: "Staged → คนกด Promote (H4) → Production", options: { fontSize: 12 } }], { x: 0.7, y: 2.7, w: 4.0, h: 1.5, valign: "middle" });
  box(s, pres, 5.1, 2.7, 4.4, 1.5, K.amberT); T(s, [{ text: "Continuous Deployment · ค่าเริ่มต้นของกลุ่ม", options: { bold: true, fontSize: 14, breakLine: true } }, { text: "Production ทันที ไม่มีคนกดปล่อย", options: { fontSize: 12 } }], { x: 5.3, y: 2.7, w: 4.0, h: 1.5, valign: "middle" });
  flow(s, pres, [H("H5 หลังขึ้นเว็บจริง", "คนตรวจเว็บจริง ตัดสินใจ Revert")], 2.5, 4.3, 5, 0.6, { fs: 12, sfs: 10 }); }

// 7-8 ตารางเครื่องมือ
{ const s = lightSlide(pres, S1, "แต่ละจุดใช้เครื่องมือใด คนอยู่ในวงตอนไหน (1/2)", "ตารางแสดงเครื่องมือที่ใช้จริงในวิชานี้ จุดบังคับคืออนุมัติและ merge ผ่าน ruleset main-gate");
  rowsTable(s, pres, [["เขียน code และรัน test", "AI agent, Vitest", "AI", "ผู้เขียนอ่าน diff และผล npm test ก่อน commit"], ["เปิด PR", "GitHub", "คน", "จำกัด PR ให้ตรงกับ 1 ข้อใน plan.md"], ["ตรวจอัตโนมัติ", "GitHub Actions (ci.yml job build)", "เครื่อง", "ไม่มี คนอ่านผลเมื่อเป็นสีแดง"], ["AI review", "AI agent ของสมาชิก + REVIEW.md", "AI (สมาชิกที่ไม่ใช่ผู้เขียนสั่ง)", "ผู้เขียนตอบทุกข้อ Important พร้อมเหตุผล"], ["Preview deployment", "Vercel สร้าง URL ของทุก PR", "เครื่อง", "ผู้อนุมัติเปิดลองได้ ไม่บังคับ"]], 0.5, 1.3, [1.9, 2.5, 1.8, 2.8], 0.62, { head: ["จุด", "เครื่องมือ", "ผู้ทำ", "คนอยู่ในวงอย่างไร"], fs: 11 }); }
{ const s = lightSlide(pres, S1, "แต่ละจุดใช้เครื่องมือใด คนอยู่ในวงตอนไหน (2/2)", "เฉพาะ Continuous Delivery ที่คนกด Promote ในวิชานี้ใช้ Continuous Deployment");
  rowsTable(s, pres, [["อนุมัติและ merge", "GitHub ruleset main-gate", "คน", "จุดบังคับ: ไม่ให้ merge หากไม่มีผู้อนุมัติหรือ CI ไม่ผ่าน"], ["build จาก main", "Vercel", "เครื่อง", "ไม่มี"], ["ปล่อยขึ้นเว็บจริง", "Vercel", "Deployment: เครื่อง · Delivery: คน", "เฉพาะ Continuous Delivery คนกด Promote"], ["หลังขึ้นเว็บจริง", "Vercel Deployments, ปุ่ม Revert ของ GitHub", "คน", "ตรวจเว็บจริง ตัดสินใจย้อนผ่าน PR"]], 0.5, 1.3, [1.9, 2.5, 1.8, 2.8], 0.78, { head: ["จุด", "เครื่องมือ", "ผู้ทำ", "คนอยู่ในวงอย่างไร"], fs: 11, fills: [K.amberT, K.paper, K.paper, K.paper] }); }

// 9 กลุ่มใช้แบบใด
{ const s = lightSlide(pres, S1, "กลุ่มใช้ Continuous Deployment",
    "ตามค่าเริ่มต้น ทุก commit ที่เข้า main ขึ้นเว็บจริงทันที จุดบังคับที่คนตัดสินจึงมีจุดเดียวคืออนุมัติ PR ทุกอย่างที่ต้องการให้คนเห็นต้องเกิดก่อน merge หากต้องการเปลี่ยนเป็น Continuous Delivery ให้ปิด Auto-assign Custom Production Domains ใน Settings, Environments, Production, Branch Tracking ของ Vercel วิชานี้ไม่ใช้ เพราะ lead time จะรวมเวลารอคนกด");
  flow(s, pres, [{ t: "merge เข้า main" }, { t: "Vercel ขึ้นเว็บจริงทันที", fill: K.amberT }], 0.5, 1.4, 6.0, 1.0, { gap: 0.35 });
  box(s, pres, 6.7, 1.4, 2.8, 1.0, K.ink); T(s, "จุดบังคับเดียว: อนุมัติ PR", { x: 6.85, y: 1.4, w: 2.5, h: 1.0, fontSize: 14, bold: true, color: K.white, valign: "middle" });
  box(s, pres, 0.5, 2.8, 9, 2.15, K.paper);
  T(s, "จึงต้องทำให้ก่อน merge เป็นด่านที่ข้ามไม่ได้", { x: 0.75, y: 2.9, w: 8.5, h: 0.4, fontSize: 16, bold: true, color: K.teal });
  T(s, bullets(["CI ที่เป็น required check", "AI review ตาม REVIEW.md", "การอนุมัติของสมาชิกอีกคน"]), { x: 0.75, y: 3.4, w: 8.5, h: 1.4, fontSize: 14 }); }

// 10 Delivery vs Deployment
{ const s = lightSlide(pres, S1, "Delivery เทียบกับ Deployment", "เมื่อ AI เขียนเร็ว คนไม่ควรอยู่ในวงด้วยการกดปุ่มซ้ำ ๆ ควรอยู่ในจุดที่ต้องตัดสินจริง ได้แก่ แผน การอนุมัติ PR และการตัดสินใจย้อน");
  rowsTable(s, pres, [["จุดที่คนตัดสินก่อนขึ้นเว็บจริง", "2 จุด: อนุมัติ PR และกด Promote", "1 จุด: อนุมัติ PR"], ["lead time", "รวมเวลาที่รอคนกด", "สั้น เท่ากับเวลาของ CI และ build"], ["เหมาะกับ", "ต้องเลือกเวลาปล่อย หรือต้องมีผู้ลงนาม", "ทีมที่ test และด่านก่อน merge เชื่อถือได้"], ["ความเสี่ยง", "การแก้ไขค้างสะสมแล้วปล่อยพร้อมกัน พังแล้วหาสาเหตุยาก", "ถ้าด่านก่อน merge อ่อน ของที่พังขึ้นเว็บจริงทันที"]], 0.5, 1.3, [2.4, 3.3, 3.3], 0.66, { head: ["", "Continuous Delivery", "Continuous Deployment"], fs: 12 });
  T(s, "คนอยู่ในจุดที่ต้องตัดสินจริง: แผน · อนุมัติ PR · ย้อนเมื่อเว็บจริงมีปัญหา", { x: 0.5, y: 4.7, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal }); }

// 11 สัญญาณเป็นด่าน
{ const s = lightSlide(pres, S2, "ขั้นตรวจทั้ง 3 ชั้นของด่าน",
    "บทนี้เพิ่ม REVIEW.md ใน artifact chain และเปลี่ยนขั้นตรวจที่มีอยู่ให้เป็นเงื่อนไขของการ merge ข้อค้นพบของ AI review ไม่ได้อนุมัติหรือขวาง PR เอง ผู้ตัดสินคือสมาชิกที่อนุมัติ และ agent ที่เขียน code ต้องไม่เป็นผู้อนุมัติ code นั้นเอง");
  rowsTable(s, pres, [["CI ที่เป็น required check", "เครื่อง", "lint, type, unit test, รูปแบบ openapi.yaml ผ่านก่อน merge", "สิ่งที่ยังไม่มี test เช่น การทำงานผ่านหน้าจอ"], ["AI review ตาม REVIEW.md", "AI (สมาชิกที่ไม่ใช่ผู้เขียนสั่ง)", "code ต่างจาก spec/plan, logic ผิด, ความเสี่ยงความปลอดภัยที่พบบ่อย", "ว่าข้อค้นพบถูกหรือไม่ AI review อาจผิดได้"], ["อนุมัติโดยสมาชิกอีกคน", "คน", "ทำตามแผน และยอมรับความเสี่ยงที่เหลือได้", "สิ่งที่ผู้อนุมัติไม่ได้อ่าน"]], 0.5, 1.3, [1.9, 1.6, 2.8, 2.7], 1.05, { head: ["ขั้นตรวจ", "ผู้ตรวจ", "ตรวจได้", "ตรวจไม่ได้"], fs: 11 }); }

// 12 DORA
caseSlide(pres, S2, { title: "กรณีจริง: AI ขยายสิ่งที่ทีมมีอยู่แล้ว", tag: "Google · DORA 2025",
  notes: "รายงาน DORA ปี 2025 ของ Google สำรวจผู้ทำงานด้านเทคโนโลยี พบว่าเกือบ 90% ใช้ AI ในการทำงาน การใช้ AI สัมพันธ์กับการส่งมอบงานได้มากขึ้น แต่ความไม่เสถียรของการส่งมอบก็เพิ่มขึ้นต่อเนื่อง รายงานสรุปว่า AI ขยายสิ่งที่องค์กรมีอยู่แล้ว",
  facts: ["เกือบ 90% ของผู้ทำงานด้านเทคโนโลยีที่สำรวจ ใช้ AI ในการทำงาน", "การใช้ AI สัมพันธ์กับการส่งมอบงานได้มากขึ้น", "ความไม่เสถียรของการส่งมอบก็เพิ่มขึ้นต่อเนื่อง", "สรุป: AI ขยายสิ่งที่องค์กรมีอยู่แล้ว"],
  principle: "เชื่อมกับบทนี้", takeaway: "ด่านตรวจใน CI และการ review คือส่วนหนึ่งของ “ระบบ” ที่ AI จะขยาย ทีมที่มีระบบดีจะดีขึ้น ทีมที่มีปัญหาจะมีปัญหามากขึ้น",
  refs: "อ้างอิง: InfoQ — DORA State of AI-assisted Software Development 2025 · Google (PDF)" });

// 13 ruleset
{ const s = lightSlide(pres, S3, "ruleset แต่ละกฎป้องกันอะไร",
    "ruleset ของ GitHub ใช้ได้ฟรีกับ repository แบบ public ซึ่งตรงกับ repository ของกลุ่ม build คือชื่อ job ใน ci.yml ตั้งแต่ WS-01 รวมทุกขั้นตรวจไว้ใน job เดียว ขั้นใดไม่ผ่านทั้ง job ไม่ผ่าน GitHub ไม่นับการอนุมัติจากผู้เปิด PR เอง");
  rowsTable(s, pres, [["Restrict deletions", "ลบ main ทิ้ง"], ["Block force pushes", "เขียนทับประวัติของ main จนหลักฐานหาย"], ["Require a pull request", "push เข้า main โดยตรงโดยไม่มีใครเห็น"], ["Required approvals: 1", "merge โดยไม่มีสมาชิกอีกคนอ่าน (ไม่นับผู้เปิด PR เอง)"], ["Dismiss stale approvals", "แก้ code เพิ่มหลังได้รับอนุมัติโดยไม่มีใครอ่านส่วนที่แก้"], ["Require status checks: build", "merge ขณะที่ CI ยังไม่ผ่าน"]], 0.5, 1.3, [3.2, 5.8], 0.52, { fs: 12 }); }

// 14 bypass
{ const s = lightSlide(pres, S3, "ไม่มีผู้ใดอยู่ใน bypass list",
    "สถานการณ์ที่พบบ่อย ไม่ใช่เหตุการณ์จริงที่มีแหล่งอ้างอิง ถ้าเจ้าของ repository อยู่ใน bypass list ด่านจะมีผลกับทุกคนยกเว้นคนที่มีสิทธิ์มากที่สุด และ AI agent ที่ทำงานด้วยสิทธิ์ของเจ้าของก็ข้ามได้");
  box(s, pres, 0.5, 1.3, 9, 0.8, K.ink); T(s, "ในวิชานี้ bypass list ต้องว่าง", { x: 0.8, y: 1.3, w: 8.4, h: 0.8, fontSize: 20, bold: true, color: K.amber, valign: "middle" });
  T(s, "สถานการณ์ที่พบบ่อย", { x: 0.5, y: 2.3, w: 5, h: 0.3, fontSize: 12, bold: true, color: K.teal });
  flow(s, pres, [{ t: "คืนก่อนส่งงาน", sub: "CI แดงเพราะ test ข้อหนึ่ง" }, { t: "เจ้าของ (อยู่ใน bypass)", sub: "merge ไปก่อน ตั้งใจแก้พรุ่งนี้", fill: K.amberT }, { t: "PR ต่อ ๆ มา CI แดงทั้งหมด", sub: "แยกไม่ออกว่าใครทำเสีย", fill: K.redT }], 0.5, 2.65, 9, 1.4, { gap: 0.3, fs: 12, sfs: 11 });
  T(s, "ต้องหยุดงานทั้งกลุ่มเพื่อหาสาเหตุ", { x: 0.5, y: 4.4, w: 9, h: 0.4, fontSize: 15, bold: true, color: K.red }); }

// 15 PR เล็ก
{ const s = lightSlide(pres, S3, "PR เล็กจึง review ได้จริง",
    "ด่านที่ต้องมีคนอนุมัติจะช้าลงทันทีหาก PR ใหญ่เกินกว่าจะอ่านได้ ในวิชานี้ 1 PR ทำ 1 เรื่องตาม plan.md เช่น test และ code ของกฎ 1 ข้อ ถ้า AI แก้ไฟล์เกินแผน ให้แยกเป็น PR ใหม่");
  box(s, pres, 0.5, 1.3, 9, 1.5, K.paper); T(s, "เมื่อ AI เขียนเร็ว ขั้นที่ช้าที่สุดย้ายจากการเขียนไปเป็นการ review", { x: 0.75, y: 1.3, w: 8.5, h: 1.5, fontSize: 17, bold: true, valign: "middle" });
  numbered(s, ["1 PR ทำ 1 เรื่องตาม plan.md เช่น test และ code ของกฎ 1 ข้อ", "ถ้า AI แก้ไฟล์เกินแผน ให้แยกเป็น PR ใหม่"], 3.05, 0.7, 15); }

// 16 Faros
caseSlide(pres, S3, { title: "กรณีจริง: การ review กลายเป็นคอขวด", tag: "Faros AI · กรกฎาคม 2025",
  notes: "Faros AI รายงานจากข้อมูลนักพัฒนามากกว่า 10,000 คนใน 1,255 ทีม ทีมที่ใช้ AI มากมี PR ที่ merge เพิ่ม 98% แต่เวลา review PR เพิ่ม 91% ขนาดเฉลี่ยของ PR เพิ่ม 154% และ bug ต่อนักพัฒนาเพิ่ม 9%",
  facts: ["ข้อมูลนักพัฒนามากกว่า 10,000 คน ใน 1,255 ทีม", "ทีมที่ใช้ AI มาก: PR ที่ merge เพิ่ม 98%", "เวลาที่ใช้ review PR เพิ่ม 91%", "ขนาดเฉลี่ยของ PR เพิ่ม 154% และ bug ต่อนักพัฒนาเพิ่ม 9%"],
  principle: "เชื่อมกับกติกา PR เล็ก", takeaway: "เขียนเร็วขึ้นแต่ review ช้าลง จึงต้องจำกัดขนาด PR และให้ AI ช่วยตรวจตามเกณฑ์",
  refs: "อ้างอิง: Faros AI — The AI Productivity Paradox Report 2025" });

// 17 REVIEW.md ทำไม
{ const s = lightSlide(pres, S4, "เหตุใด AI review ต้องมีเกณฑ์",
    "AI ที่ไม่มีเกณฑ์จะรายงานทุกอย่างที่คิดว่าควรปรับ ตั้งแต่ชื่อตัวแปรจนถึงเปลี่ยน library ผู้อนุมัติต้องคัดเองและเรื่องสำคัญจมอยู่ในรายการยาว REVIEW.md กำหนดว่าตรวจเรื่องใด เรื่องใดสำคัญ เรื่องใดไม่ต้องตรวจ และรายงานรูปแบบใด ทั้งคนและ AI ใช้ไฟล์เดียวกัน");
  flow(s, pres, [{ t: "ไม่มีเกณฑ์", fill: K.redT }, { t: "AI รายงานทุกอย่าง", sub: "ชื่อตัวแปร ไปจนถึงเปลี่ยน library" }, { t: "เรื่องสำคัญจมในรายการยาว", fill: K.redT }], 0.5, 1.3, 9, 1.1, { gap: 0.35, fs: 13, sfs: 11 });
  rowsTable(s, pres, [["REVIEW.md", "review PR อย่างไร เรื่องใดสำคัญ เรื่องใดไม่ต้องตรวจ", "สมาชิกกลุ่ม ใช้ AI ช่วยร่างได้", "AI ที่สมาชิกสั่ง และผู้อนุมัติ PR"]], 0.5, 3.0, [1.5, 3.1, 2.2, 2.2], 0.9, { head: ["ไฟล์", "ตอบคำถาม", "ผู้เขียน", "ผู้ใช้"], fs: 12 }); }

// 18 REVIEW หลักการ
{ const s = lightSlide(pres, S4, "หลักการเขียน REVIEW.md", "แต่ละรอบมีเรื่องที่ตรวจชัดเจน และระบุรอบไว้หน้าข้อค้นพบทุกข้อ");
  numbered(s, ["แบ่งการตรวจเป็นรอบ และระบุรอบหน้าข้อค้นพบ", "รอบหนึ่งตรวจว่าตรงกับ spec และ plan ซึ่ง CI ตรวจไม่ได้", "นิยามระดับความรุนแรง และจำกัดจำนวนข้อเล็กน้อย", "บอกสิ่งที่ไม่ต้องตรวจ โดยเฉพาะสิ่งที่ CI ตรวจอยู่แล้ว", "กำหนดรูปแบบผล: ตำแหน่ง ปัญหา ผลที่ตามมา", "อ้างถึงการตัดสินใจของกลุ่ม เช่น ADR และตารางการตัดสินใจ"], 1.25, 0.52, 13); }

// 19 โครง REVIEW
{ const s = lightSlide(pres, S4, "ตัวอย่าง REVIEW.md ที่ดี", "ฉบับเต็มอยู่ใน 1-Lecture.md ผู้ตรวจที่เป็นคนและ AI ใช้ไฟล์เดียวกัน");
  codeBox(s, pres, 0.5, 1.3, 5.6, 3.65, ["## รอบการตรวจ", "[spec]  ตรงกับ spec และ plan", "[bug]   logic · กฎอยู่ใน src/domain", "[security] ไม่มีความลับ · ไม่อ่าน", "         user id จาก body", "## ระดับความรุนแรง", "Important: ต่างจาก spec / ข้อมูลรั่ว", "Nit: ไม่เกิน 5 ข้อ ที่เหลือบอกจำนวน", "## ไม่ต้องตรวจ", "สิ่งที่ CI ตรวจอยู่แล้ว · lock file"], 11);
  [["รอบ", "ระบุหน้าข้อค้นพบทุกข้อ", K.tealT], ["ระดับ", "Important เทียบกับ Nit", K.amberT], ["รูปแบบผล", "[รอบ][ระดับ] ไฟล์:บรรทัด — ปัญหา — ผลที่ตามมา — ข้อเสนอ", K.paper]].forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.3, y, 3.2, 1.15, v[2]);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11 } }], { x: 6.45, y, w: 2.95, h: 1.15, valign: "middle" }); }); }

// 20 REVIEW ดี/ไม่ดี
goodBad(pres, S4, "ตัวอย่าง REVIEW.md: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดีไม่บอกว่าตรวจเรื่องใด ไม่อ้าง spec plan ADR ไม่มีระดับความรุนแรง ใช้คำว่า best practice ซึ่งตรวจไม่ได้ และไม่บอกสิ่งที่ไม่ต้องตรวจ",
  ["# Review", "", "ตรวจ code อย่างละเอียด", "หา bug และเสนอวิธีปรับปรุง", "ให้ดีขึ้น", "ทำตาม best practice"],
  ["# REVIEW.md", "## รอบ", "[spec] ตรงกับ spec/plan", "[bug] logic ผิด", "[security] ความลับ สิทธิ์", "## ระดับ", "Important / Nit (ไม่เกิน 5)", "## ไม่ต้องตรวจ", "สิ่งที่ CI ตรวจอยู่แล้ว", "## รูปแบบผล", "[รอบ][ระดับ] ไฟล์:บรรทัด —", "ปัญหา — ผล — ข้อเสนอ"], 11);

// 21 ปัญหา REVIEW ไม่ดี
{ const s = lightSlide(pres, S4, "REVIEW.md ที่ไม่ดีมีปัญหาอะไร", "แต่ละข้อเป็นผลที่ทำให้ AI review ใช้ตัดสินไม่ได้");
  rowsTable(s, pres, [["ไม่บอกว่าตรวจเรื่องใด", "AI ตรวจตามที่คิดว่าสำคัญ แต่ละ PR ได้ผลไม่เหมือนกัน"], ["ไม่อ้าง spec, plan, ADR", "AI ไม่ตรวจเรื่องที่ CI ตรวจไม่ได้ และอาจเสนอสิ่งที่ขัดกับการตัดสินใจของกลุ่ม"], ["ไม่มีระดับและไม่จำกัดข้อเล็ก", "เรื่องสำคัญจมอยู่ในรายการยาว"], ["“best practice”", "ไม่มีความหมายที่ตรวจได้ แต่ละคนเข้าใจต่างกัน"], ["ไม่บอกสิ่งที่ไม่ต้องตรวจ", "AI รายงานซ้ำในสิ่งที่ CI ตรวจอยู่แล้ว"]], 0.5, 1.3, [3.0, 6.0], 0.62, { fills: [K.redT, K.redT, K.redT, K.redT, K.redT], fs: 12 }); }

// 22 ใครสั่ง
{ const s = lightSlide(pres, S4, "ใครสั่ง AI review และใครตัดสิน",
    "วิชานี้ไม่ใช้บริการ AI review แบบเสียเงิน สมาชิกที่ไม่ใช่ผู้เขียน code ใช้ AI agent ของตนอ่าน REVIEW.md และตรวจ diff แล้ววางผลเป็น comment ใน PR หากกลุ่มมีสิทธิ์ใช้บริการที่ review PR อัตโนมัติ ใช้แทนได้ โดยต้องให้บริการนั้นอ่าน REVIEW.md");
  flow(s, pres, [{ t: "สมาชิกที่ไม่ใช่ผู้เขียน", sub: "สั่ง AI agent อ่าน REVIEW.md + diff" }, { t: "วางผลเป็น comment ใน PR" }, H("ผู้เขียน code", "ตอบทุกข้อ Important: แก้หรือไม่ พร้อมเหตุผล"), H("ผู้อนุมัติ", "อ่านผล review และคำตอบ ก่อนกด Approve")], 0.5, 1.5, 9, 1.8, { gap: 0.22, fs: 12, sfs: 10 });
  box(s, pres, 0.5, 3.7, 9, 1.2, K.paper); T(s, "agent ที่เขียน code ต้องไม่เป็นผู้อนุมัติ code นั้นเอง", { x: 0.75, y: 3.7, w: 8.5, h: 1.2, fontSize: 16, bold: true, valign: "middle" }); }

// 23 Nx
caseSlide(pres, S5, { title: "กรณีจริง: ชื่อ PR กลายเป็นคำสั่ง", tag: "Nx · s1ngularity · สิงหาคม 2025",
  notes: "package ของ Nx ที่ถูกปลอมแปลงถูกเผยแพร่บน npm ประมาณ 4 ชั่วโมง ต้นเหตุคือ workflow ตรวจชื่อ PR ที่ใช้ pull_request_target ซึ่งรันด้วยสิทธิ์ของ repository หลัก และนำชื่อ PR ใส่ในคำสั่ง shell โดยตรง ผู้โจมตีตั้งชื่อ PR เป็นคำสั่ง ใช้สิทธิ์ของ token สั่งรัน workflow เผยแพร่จนได้ npm token package ปลอมสั่งให้ AI CLI ในเครื่องเหยื่อ เช่น Claude และ Gemini ค้นไฟล์ความลับ หลังเหตุการณ์ Nx เปลี่ยนไปใช้การเผยแพร่ที่ไม่ต้องเก็บ token ระยะยาว และให้คนอนุมัติ workflow ของผู้ร่วมพัฒนาภายนอกทุกครั้ง",
  facts: ["package ของ Nx ที่ถูกปลอมแปลงอยู่บน npm ประมาณ 4 ชั่วโมง", "ต้นเหตุ: workflow ใช้ pull_request_target (สิทธิ์ของ repo หลัก) และนำชื่อ PR ใส่ในคำสั่ง shell ตรง ๆ", "ผู้โจมตีตั้งชื่อ PR เป็นคำสั่ง จนได้ npm token", "package ปลอมสั่งให้ AI CLI ในเครื่องเหยื่อค้นไฟล์ความลับ", "Nx แก้: เลิกเก็บ token ระยะยาว และให้คนอนุมัติ workflow ของผู้ร่วมภายนอก"],
  principle: "บทเรียน", takeaway: "workflow ใน CI เป็น code ที่โจมตีได้ ข้อความจากผู้ใช้ภายนอกต้องไม่ถูกรันเป็นคำสั่ง",
  refs: "อ้างอิง: Nx — s1ngularity postmortem · BleepingComputer" });

// 24 หลักการ CI
{ const s = lightSlide(pres, S5, "ห้าหลักการใน ci.yml ของกลุ่ม", "รายละเอียดทำในขั้นตอนที่ 1 ของ lab");
  rowsTable(s, pres, [["ให้สิทธิ์น้อยที่สุด", "permissions: contents: read"], ["ไม่รัน code ของผู้อื่นด้วยสิทธิ์สูง", "ใช้ pull_request ไม่ใช้ pull_request_target"], ["ไม่นำข้อความจากผู้ใช้ไปรันเป็นคำสั่ง", "ไม่ใส่ ${{ github.event.pull_request.title }} ใน run:"], ["ไม่ให้งานค้าง", "timeout-minutes และยกเลิกการรันเก่าของ PR เดียวกัน"], ["ไม่ใส่ความลับใน workflow", "ใช้ env ของ Vercel หรือ GitHub Secrets ไม่ echo ค่า"]], 0.5, 1.3, [3.6, 5.4], 0.62, { fs: 12 }); }

// 25 Revert
{ const s = lightSlide(pres, S5, "ย้อนการแก้ไข: Revert ผ่าน PR",
    "กลุ่มใช้ Continuous Deployment สิ่งที่ขึ้นเว็บจริงผ่าน CI และการอนุมัติมาก่อนเสมอ ถ้า merge ไปแล้วมีปัญหา กด Revert ในหน้า PR GitHub สร้าง PR ใหม่ที่ย้อนการแก้ไข ต้องผ่านด่านเดียวกัน ไม่ push เข้า main โดยตรงและไม่ force push Instant Rollback ของ Vercel ใช้หยุดความเสียหายเร็ว แต่ต้องตามด้วย Revert PR เพื่อให้ main ตรงกับเว็บจริง");
  flow(s, pres, [{ t: "พบปัญหาบนเว็บจริง" }, { t: "Instant Rollback", sub: "หยุดความเสียหายเร็ว (Vercel)", fill: K.amberT }, { t: "กด Revert ใน PR", sub: "GitHub สร้าง PR ย้อน" }, { t: "ผ่านด่านเดียวกัน", sub: "CI + อนุมัติ", fill: K.greenT }], 0.5, 1.4, 9, 1.4, { gap: 0.25, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.2, 9, 1.7, K.redT); T(s, "ห้าม: push เข้า main โดยตรง และ force push", { x: 0.75, y: 3.3, w: 8.5, h: 0.5, fontSize: 16, bold: true, color: K.red });
  T(s, "Rollback เป็นการแก้ชั่วคราว ต้องตามด้วย Revert PR เพื่อให้ main ตรงกับสิ่งที่อยู่บนเว็บจริง", { x: 0.75, y: 3.9, w: 8.5, h: 0.9, fontSize: 14 }); }

// 26 ตัววัด
{ const s = lightSlide(pres, S5, "ตัววัดของ loop นี้", "ใช้เกณฑ์ latency, fidelity, coverage จาก WS-01");
  rowsTable(s, pres, [["Latency", "lead time ตั้งแต่เปิด PR จนขึ้นเว็บจริง และเวลาที่ CI ใช้"], ["Fidelity", "PR ที่ทำให้กฎเสีย merge ไม่ได้"], ["Coverage", "ทุกการแก้ไขที่เข้า main ผ่าน CI, AI review และการอนุมัติ ไม่มีทางอื่น"]], 0.5, 1.3, [2.0, 7.0], 1.0, { fs: 14, fills: [K.paper, K.tealT, K.paper] }); }

// 27 สรุป
{ const s = darkSlide(pres, S6, "สรุป 6 ข้อ ก่อนเข้าสู่ lab");
  T(s, "สรุป", { x: 0.7, y: 0.35, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["CI ตรวจก่อน merge CD นำขึ้นเว็บจริง กลุ่มใช้ Continuous Deployment จุดบังคับจึงคืออนุมัติ PR", "CI ที่ไม่ใช่เงื่อนไขของ merge เป็นแค่สัญญาณ ruleset เปลี่ยนเป็นด่าน", "bypass list ต้องว่าง ด่านจึงมีผลกับทุกคนรวมถึง AI agent", "REVIEW.md ทำให้ AI review ตามเกณฑ์ของกลุ่ม และให้คนตัดสินเฉพาะเรื่องที่ต้องใช้คน", "PR เล็กจึง review ได้จริง เมื่อ AI เขียนเร็ว การ review คือขั้นที่ช้าที่สุด", "workflow ใน CI เป็น code ที่โจมตีได้ ให้สิทธิ์น้อยที่สุด และย้อนด้วย Revert ผ่าน PR"];
  r.forEach((t, i) => { const y = 1.1 + i * 0.67; chip(s, pres, 0.7, y + 0.07, i + 1, K.amber, K.ink, 0.38); T(s, t, { x: 1.3, y, w: 8.2, h: 0.55, fontSize: 13, color: K.white, valign: "middle" }); }); }

// 28-29 Glossary
const GL = [["CI", "ตรวจ lint, test, build ทุกครั้งที่จะรวมเข้า main"], ["Continuous Delivery", "build พร้อมปล่อย คนกด Promote ขึ้นเว็บจริง"], ["Continuous Deployment", "main ที่ผ่านการตรวจขึ้นเว็บจริงอัตโนมัติ"],
  ["Ruleset", "กติกาของ GitHub ที่บังคับว่า main รับการแก้ไขอย่างไร"], ["Required status check", "check ที่ต้องผ่านก่อน merge (build)"], ["Bypass list", "รายชื่อผู้ที่ข้าม ruleset ได้ ต้องว่าง"],
  ["REVIEW.md", "เกณฑ์ review PR ที่คนและ AI ใช้ร่วมกัน"], ["Important / Nit", "ระดับข้อค้นพบ: สำคัญ เทียบกับเล็กน้อย"], ["Preview deployment", "URL ของแต่ละ PR ที่ Vercel สร้างให้ลองก่อน merge"],
  ["Revert", "สร้าง PR ใหม่ที่ย้อนการแก้ไขเดิม"], ["Instant Rollback", "สลับเว็บจริงกลับไป deployment เดิมโดยไม่ build ใหม่"], ["pull_request_target", "event ที่รันด้วยสิทธิ์ของ repo หลัก เสี่ยงหากรันข้อความภายนอก"]];
[0, 6].forEach((k, n) => { const s = lightSlide(pres, S7, "Glossary (" + (n + 1) + "/2)", "ใช้ทบทวนคำศัพท์ของบทนี้");
  GL.slice(k, k + 6).forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.1, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 15, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.2, y, w: 4.0, h: 1.1, valign: "middle" }); }); });

// L1
{ const s = darkSlide(pres, S8, "เปลี่ยนจากบรรยายเป็นลงมือ");
  T(s, "Lab", { x: 0.7, y: 1.1, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "ทำให้ main มีด่าน\nที่ข้ามไม่ได้", { x: 0.7, y: 1.7, w: 8.6, h: 1.6, fontSize: 38, bold: true, color: K.white });
  T(s, "ci.yml → ruleset main-gate → REVIEW.md → 03-cancel ผ่านด่าน", { x: 0.7, y: 3.8, w: 8.6, h: 0.5, fontSize: 16, color: "B8C4D4" }); }

// L2
{ const s = lightSlide(pres, S8, "Brief ของ lab: ทำอะไรและได้อะไร", "งานกลุ่ม ใช้ repository เดิมจาก WS-03 เป้าหมาย main รับการแก้ไขผ่าน PR ที่ CI ผ่านและสมาชิกอีกคนอนุมัติเท่านั้น");
  const c = [["รูปแบบ", "งานกลุ่ม ใช้ repository เดิมจาก WS-03"], ["เป้าหมาย", "main รับเฉพาะ PR ที่ CI ผ่านและสมาชิกอีกคนอนุมัติ"], ["สิ่งที่ได้", "ทุก PR มีผล AI review ตาม REVIEW.md · feature 03-cancel (R2, R4 ส่วนยกเลิก) ผ่านด่านตั้งแต่ intent จนขึ้นเว็บจริง"], ["กติกา", "เจ้าของ repository ทำ ruleset บนหน้าเว็บ ให้สมาชิกดูพร้อมกัน · bypass list ว่าง"]];
  c.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.65; box(s, pres, x, y, 4.4, 1.5, i === 3 ? K.amberT : K.paper);
    T(s, v[0], { x: x + 0.25, y: y + 0.15, w: 3.9, h: 0.35, fontSize: 13, bold: true, color: K.teal }); T(s, v[1], { x: x + 0.25, y: y + 0.55, w: 3.9, h: 0.85, fontSize: 13 }); }); }

// L3
{ const s = lightSlide(pres, S8, "7 ขั้นตอนของ lab", "ทุกขั้นมี ทำ / ผลที่ควรเห็น / หากติดปัญหา");
  const st = [["1", "จำกัดสิทธิ์และเวลาของ CI", "permissions · concurrency · timeout"], ["2", "ตั้ง ruleset ให้ main", "main-gate · ทดสอบ push ตรง"], ["3", "เขียน REVIEW.md และกติกาใน AGENTS.md", "เกณฑ์ review ของกลุ่ม"], ["4", "intent, spec, plan ของ 03-cancel", "ผ่าน PR ตามด่านใหม่"],
    ["5", "test และ code ของ 03-cancel ผ่านด่าน", "AI review · ตอบข้อ Important"], ["6", "เตรียม PR break-it-live", "ลบเงื่อนไข R2 · เปิดค้างไว้"], ["7", "บันทึกหลักฐาน", "lead time · ผล AI review ที่ไม่ทำตาม"]];
  st.forEach((v, i) => { const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4, x = 0.5 + col * 4.6, y = 1.3 + row * 0.9;
    box(s, pres, x, y, 4.4, 0.8, i === 6 ? K.amberT : K.paper); chip(s, pres, x + 0.15, y + 0.19, v[0], i === 6 ? K.amber : K.teal, i === 6 ? K.ink : K.white);
    T(s, [{ text: v[1], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[2], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.75, y, w: 3.55, h: 0.8, valign: "middle" }); });
  box(s, pres, 5.1, 4.0, 4.4, 0.8, K.ink); T(s, "แต่ละขั้น: ทำ → ผลที่ควรเห็น → หากติดปัญหา", { x: 5.25, y: 4.0, w: 4.1, h: 0.8, fontSize: 13, color: K.white, valign: "middle" }); }

// L4 repo
{ const s = lightSlide(pres, S8, "repository ที่จะได้เมื่อจบบทนี้", "ruleset ในขั้นที่ 2 ไม่ใช่ไฟล์ใน repository เป็นการตั้งค่าใน GitHub ชื่อไฟล์ใน src/ เป็นตัวอย่าง ให้ใช้ตาม plan.md ของกลุ่ม");
  codeBox(s, pres, 0.5, 1.3, 5.8, 3.65, ["AGENTS.md  ← 3 กติกา PR และ review", "REVIEW.md  ← 3", "docs/openapi.yaml ← 4 endpoint ยกเลิก", "docs/features/03-cancel/", "  intent.md spec.md plan.md ← 4", "src/domain/", "  cancel.ts ← 5", "  cancel-r2.test.ts cancel-r4.test.ts ← 5", "src/app/api/... ← 5", "evidence/ws-04.md ← 7", ".github/workflows/ci.yml ← 1"], 11);
  [["ในไฟล์", "ci.yml · REVIEW.md · AGENTS.md"], ["ใน GitHub", "ruleset main-gate (ไม่ใช่ไฟล์)"], ["feature ใหม่", "03-cancel: R2 และ R4 ส่วนการยกเลิก"]].forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.5, y, 3.0, 1.15, i === 1 ? K.amberT : K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11, color: K.ink2 } }], { x: 6.65, y, w: 2.75, h: 1.15, valign: "middle" }); }); }

// L5 ci.yml
{ const s = lightSlide(pres, S8, "ขั้นที่ 1: จำกัดสิทธิ์และเวลาของ CI",
    "ชื่อ job ต้องเป็น build เหมือนเดิม เพราะขั้นที่ 2 ใช้ชื่อนี้เป็น required status check ถ้า CI ไม่ทำงานเลย ตรวจย่อหน้าของ permissions และ concurrency ว่าอยู่ระดับเดียวกับ on และ jobs ผลที่ควรเห็น: CI เขียวและมีชื่อ build ใน Checks เมื่อ push commit ใหม่ขณะ CI ยังรัน การรันเก่าถูกยกเลิก");
  codeBox(s, pres, 0.5, 1.3, 5.6, 3.65, ["on:", "  push: { branches: [main] }", "  pull_request:", "permissions:", "  contents: read", "concurrency:", "  group: ci-${{ github.ref }}", "  cancel-in-progress:", "    ${{ github.event_name == 'pull_request' }}", "jobs:", "  build:", "    timeout-minutes: 10"], 11);
  [["เพิ่ม 3 อย่าง", "permissions · concurrency · timeout-minutes", K.tealT], ["ห้ามเปลี่ยน", "ชื่อ job build (ใช้เป็น required check)", K.amberT], ["ผลที่ควรเห็น", "commit ใหม่ใน PR เดิม ยกเลิกการรันเก่า", K.greenT]].forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.3, y, 3.2, 1.15, v[2]);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11 } }], { x: 6.45, y, w: 2.95, h: 1.15, valign: "middle" }); }); }

// L6 ruleset
{ const s = lightSlide(pres, S8, "ขั้นที่ 2: ตั้ง ruleset main-gate",
    "เจ้าของ repository ทำบนหน้าเว็บ GitHub สมาชิกที่เหลือดูพร้อมกัน Settings, Rules, Rulesets, New ruleset, New branch ruleset ทดสอบ push ตรงด้วย git commit --allow-empty แล้ว git push origin main ต้องถูกปฏิเสธด้วย GH013 จากนั้น git reset --hard origin/main ใช้เฉพาะหลัง commit ทดลองบน main เท่านั้น ถ้าหา build ใน Add checks ไม่พบ ให้ตรวจว่า CI ของขั้น 1 รันเสร็จแล้ว");
  numbered(s, ["Settings → Rules → Rulesets → New branch ruleset ชื่อ main-gate · Enforcement: Active", "Bypass list: ไม่เพิ่มผู้ใดเลย · Target: Include default branch", "เลือก: Restrict deletions · Block force pushes · Require PR (approvals 1, dismiss stale)", "Require status checks: เพิ่ม build"], 1.25, 0.58, 13);
  box(s, pres, 0.5, 4.1, 9, 0.85, K.amberT); T(s, "ทดสอบ: git push origin main ต้องถูกปฏิเสธ “GH013: Repository rule violations found”", { x: 0.75, y: 4.1, w: 8.5, h: 0.85, fontSize: 13, bold: true, valign: "middle" }); }

// L7 REVIEW + 5
{ const s = lightSlide(pres, S8, "ขั้นที่ 3–5: REVIEW.md และ 03-cancel",
    "ขั้น 3 เขียน REVIEW.md และเพิ่มกติกาใน AGENTS.md ขั้น 4 intent, spec, plan ของ 03-cancel ผ่าน PR ตามด่านใหม่ ขั้น 5 test และ code ผ่านด่าน แต่ละ PR มี AI review จากสมาชิกที่ไม่ใช่ผู้เขียน ผู้เขียนตอบทุกข้อ Important");
  flow(s, pres, [{ t: "REVIEW.md", sub: "+ กติกาใน AGENTS.md" }, { t: "intent · spec · plan", sub: "03-cancel ผ่าน PR" }, { t: "test (แดง) แล้ว code (เขียว)", sub: "ผ่าน PR" }, { t: "AI review + ตอบ Important", fill: K.amber }, { t: "อนุมัติ merge Vercel ขึ้นเว็บจริง", fill: K.greenT }], 0.5, 1.5, 9, 1.5, { gap: 0.2, fs: 12, sfs: 10 });
  box(s, pres, 0.5, 3.4, 9, 1.5, K.paper); T(s, "ทุก PR ในบทนี้ผ่านด่านเดียวกัน รวมถึง PR ของเอกสารและ evidence", { x: 0.75, y: 3.4, w: 8.5, h: 1.5, fontSize: 16, bold: true, valign: "middle" }); }

// L8 break-it
{ const s = lightSlide(pres, S8, "break-it-live: เปิด PR ทิ้งไว้ให้ merge ไม่ได้",
    "ลบหรือ comment เงื่อนไขที่เลื่อนผู้อยู่ในคิวสำรองลำดับแรกให้ได้ที่นั่ง (R2) ใน src/domain/ เปิด PR รอให้ CI แดงที่ npm test เปิด PR ทิ้งไว้จนถึงคาบ demo เพื่อให้ผู้ตรวจเห็นว่า merge ไม่ได้ แล้วจึงปิดโดยไม่ merge หลัง demo ต่างจากบทก่อนที่ปิด PR ทันที ถ้าปุ่ม merge ยังกดได้ แปลว่า ruleset ไม่ได้บังคับ check build ให้กลับไปตรวจขั้น 2");
  flow(s, pres, [{ t: "branch", sub: "demo/broken-gate" }, { t: "ลบเงื่อนไข R2", sub: "ใน src/domain" }, { t: "เปิด PR", sub: "CI แดงที่ npm test", fill: K.redT }, { t: "ปุ่ม merge กดไม่ได้", sub: "ruleset ขวาง", fill: K.amberT }], 0.5, 1.6, 9, 1.4, { gap: 0.3, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.5, 9, 1.4, K.paper); T(s, "ต่างจากบทก่อน: เปิด PR ทิ้งไว้จนถึงคาบ demo แล้วจึงปิดโดยไม่ merge", { x: 0.75, y: 3.5, w: 8.5, h: 1.4, fontSize: 16, bold: true, valign: "middle" }); }

// L9 evidence
{ const s = lightSlide(pres, S8, "หลักฐานใน evidence/ws-04.md", "ตาราง AI review ที่กลุ่มไม่ทำตามต้องมีอย่างน้อย 2 แถว ถ้า AI review ทำตามได้ทุกข้อ ให้อ่านข้อ Nit อีกครั้งหรือทำ AI review ของ PR นี้เพิ่ม");
  rowsTable(s, pres, [["Lead time ของ PR 03-cancel", "เปิด PR → merge → Production เสร็จ"], ["เวลาที่ CI ใช้", "นาที วินาที"], ["Break-it-live", "ลิงก์ PR ที่ CI ไม่ผ่านและยังเปิดอยู่"], ["AI review ที่ไม่ทำตาม", "ตาราง ข้อค้นพบ / ระดับ / เหตุผล อย่างน้อย 2 แถว"], ["ข้อค้นพบที่ทำให้แก้ code", "ลิงก์ commit"]], 0.5, 1.3, [3.6, 5.4], 0.62, { fills: [K.paper, K.paper, K.paper, K.amberT, K.paper], fs: 13 }); }

// L10 การวัดผล
{ const s = lightSlide(pres, S8, "การวัดผล: Present 7 ขั้นตอน", "เวลา 5 นาทีต่อกลุ่ม ขั้น 2 ทำต่อหน้าผู้ตรวจ ไม่มีการให้คะแนน");
  const r = [["เจ้าของ repo เปิด ruleset main-gate", "Active · ใช้กับ default branch · bypass list ว่าง"], ["commit ว่างบน main แล้ว git push origin main", "ถูกปฏิเสธ GH013: Repository rule violations found"], ["เปิด PR break-it-live ที่ยังเปิดอยู่", "CI แดงที่ npm test และปุ่ม merge กดไม่ได้"], ["เปิด REVIEW.md ชี้ 1 ข้อจากประสบการณ์กลุ่ม", "อธิบายว่าข้อนั้นป้องกันปัญหาใด"], ["เปิด PR R2 ของ 03-cancel ที่ merge แล้ว", "comment AI review ระบุรอบและระดับทุกข้อ"], ["เลือก 1 ข้อจากตาราง “ไม่ทำตาม” อธิบาย", "อธิบายด้วยคำของกลุ่มว่าเหตุใดไม่ทำตาม"], ["รัน npx vitest run -t \"R2\"", "ผ่านทั้งหมด มี test ที่ผู้ลงทะเบียนก่อนในคิวสำรองได้ที่นั่ง"]];
  T(s, "ขั้นตอน", { x: 1.05, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute }); T(s, "เกณฑ์ผ่าน", { x: 5.3, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  r.forEach((v, i) => { const y = 1.48 + i * 0.5; box(s, pres, 0.5, y, 9, 0.46, i % 2 ? K.white : K.paper); chip(s, pres, 0.55, y + 0.04, i + 1, K.teal, K.white, 0.38);
    T(s, v[0], { x: 1.05, y, w: 4.15, h: 0.46, fontSize: 11, valign: "middle", bold: true }); T(s, v[1], { x: 5.3, y, w: 4.1, h: 0.46, fontSize: 11, valign: "middle" }); }); }

// L11 Retro
{ const s = lightSlide(pres, S8, "Retro: ปรึกษากันแล้วบันทึกท้าย evidence", "ข้อ 3 ใช้ปรับ REVIEW.md ของกลุ่มในบทถัดไป");
  const q = ["ขั้นใดของด่านทำให้ lead time ยาวที่สุด และลดได้อย่างไรโดยไม่ข้ามด่าน", "AI review พบสิ่งใดที่ CI และผู้อนุมัติไม่พบ และรายงานสิ่งใดผิด", "ควรเพิ่มหรือตัดข้อใดใน REVIEW.md จากสิ่งที่เกิดขึ้นวันนี้"];
  q.forEach((t, i) => { const y = 1.4 + i * 1.15; box(s, pres, 0.5, y, 9, 1.0, K.paper); chip(s, pres, 0.75, y + 0.29, i + 1); T(s, t, { x: 1.4, y, w: 7.9, h: 1.0, fontSize: 16, valign: "middle" }); }); }

L.save(pres, "ws-04-cicd.pptx").then(() => console.log("saved"));
