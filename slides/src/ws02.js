const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref, codeBox, rowsTable, goodBad } = L;
const S0 = "เปิดคาบ", S1 = "เหตุใด spec จึงสำคัญ", S2 = "intent, spec และ OpenAPI", S3 = "เขียน spec ให้ตรวจได้", S4 = "ADR", S5 = "สรุป", S6 = "Glossary", S7 = "Lab และการวัดผล";
const pres = L.newDeck("WS-02 Spec Loop", [S0, S1, S2, S3, S4, S5, S6, S7]);
const bullets = (a, o = {}) => a.map((t, i) => ({ text: t, options: Object.assign({ bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 }, o) }));

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดคาบ บทนี้เพิ่ม intent.md และ spec.md เข้าไปใน artifact chain");
  T(s, "WS-02", { x: 0.7, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "Spec Loop", { x: 0.7, y: 1.8, w: 8.6, h: 1.0, fontSize: 40, bold: true, color: K.white });
  T(s, [{ text: "Rathachai Chawuthai", options: { bold: true, fontSize: 18, color: K.white, breakLine: true } }, { text: "Computer Engineering, KMITL", options: { fontSize: 14, color: "B8C4D4" } }], { x: 0.7, y: 3.55, w: 8.6, h: 0.75 });
  T(s, "SDPX-AI · Software Development Process in Practice — AI-Assisted", { x: 0.7, y: 4.5, w: 8.6, h: 0.4, fontSize: 14, color: "B8C4D4" }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "เมื่อจบคาบ นักศึกษาควรทำได้", "อ่านวัตถุประสงค์ทั้ง 4 ข้อ");
  const it = ["อธิบายว่าเหตุใด AI ทำงานได้ตรงขึ้นเมื่อมี spec ที่ตรวจได้", "แยกว่า intent, spec และ OpenAPI ตอบคำถามใด และใครเขียนแต่ละไฟล์", "เขียนข้อกำหนดที่ test ตรวจได้ และระบุ edge case", "บันทึกการตัดสินใจทางเทคนิคเป็น ADR"];
  it.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.75; box(s, pres, x, y, 4.4, 1.55, K.paper); chip(s, pres, x + 0.2, y + 0.2, i + 1);
    T(s, t, { x: x + 0.8, y: y + 0.2, w: 3.4, h: 1.2, fontSize: 15 }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "คำตอบส่วนใหญ่เป็นแบบที่สอง เมื่อคำสั่งไม่ได้บอกบางเรื่อง AI จะเลือกคำตอบให้เอง คำตอบที่เลือกมักดูสมเหตุสมผลจึงตรวจพบยาก ผลจากส่วน C ของ 0-Before ใช้ยืนยันได้ คือกรณีที่กฎใน PROJECT.md ยังไม่ได้บอก");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "ครั้งล่าสุดที่ AI สร้างสิ่งที่ไม่ตรงกับที่ต้องการ\nAI ทำผิด หรือ\nคำสั่งของเราไม่ได้บอกเรื่องนั้น", { x: 0.7, y: 1.5, w: 8.6, h: 2.8, fontSize: 32, bold: true, color: K.white }); }

// 4 ช่องว่างที่ AI เติมเอง
{ const s = lightSlide(pres, S1, "ช่องว่างที่ AI เติมให้เอง",
    "เมื่อเขียน code เอง ผู้เขียนเจอเรื่องที่ไม่ชัดแล้วหยุดถาม AI ไม่หยุด แต่เลือกทางหนึ่งแล้วเขียนต่อ แต่ละครั้งที่สั่งอาจเลือกไม่เหมือนกัน test ที่เขียนภายหลังจะตรวจตามสิ่งที่ AI เลือก ไม่ใช่สิ่งที่กลุ่มต้องการ");
  box(s, pres, 0.5, 1.3, 9, 0.8, K.tealT);
  T(s, "R4: “ยกเลิกได้จนถึง 24 ชั่วโมงก่อนเวลาเริ่ม”", { x: 0.75, y: 1.3, w: 8.5, h: 0.8, fontSize: 18, bold: true, valign: "middle" });
  const q = ["เหลือ 24 ชั่วโมงพอดี ยกเลิกได้หรือไม่", "เทียบกับเวลาของ server หรือเวลาที่ผู้ใช้เห็น", "ถ้ายกเลิกไม่ได้ ระบบตอบกลับอย่างไร"];
  q.forEach((t, i) => { const x = 0.5 + i * 3.1; box(s, pres, x, 2.35, 2.9, 1.3, K.amberT); chip(s, pres, x + 0.15, 2.5, i + 1, K.amber, K.ink, 0.38);
    T(s, t, { x: x + 0.2, y: 2.95, w: 2.55, h: 0.65, fontSize: 13 }); });
  T(s, "ถ้าไม่มีใครตัดสิน AI เลือกให้ทั้ง 3 ข้อ และแต่ละครั้งที่สั่งอาจเลือกไม่เหมือนกัน", { x: 0.5, y: 3.95, w: 9, h: 0.4, fontSize: 15, bold: true, color: K.teal });
  T(s, "test ที่เขียนภายหลังจะตรวจตามสิ่งที่ AI เลือก ไม่ใช่สิ่งที่กลุ่มต้องการ", { x: 0.5, y: 4.4, w: 9, h: 0.4, fontSize: 14, color: K.ink2 }); }

// 5 Spec Loop
{ const s = lightSlide(pres, S1, "Spec Loop",
    "บทนี้เพิ่ม 2 ไฟล์ใน artifact chain คือ intent.md และ spec.md ขั้นตรวจสอบมี 2 ส่วนคือ PR ที่คนตรวจ และ lint ของ openapi.yaml ใน CI การตรวจว่า code ทำตาม spec จริงเริ่มในบทที่ 3");
  flow(s, pres, [{ t: "intent.md", sub: "คนเขียนเอง", fill: K.tealT }, { t: "AI ร่าง spec.md", sub: "พร้อมข้อกังวล" }, { t: "กลุ่มตัดสิน", sub: "ข้อกังวลทุกข้อ", fill: K.amber }, { t: "spec.md", sub: "ผ่าน PR" }], 0.5, 1.4, 9, 1.2, { gap: 0.3 });
  flow(s, pres, [{ t: "openapi.yaml" }, { t: "CI ตรวจรูปแบบ", fill: K.greenT }, { t: "บทที่ 3", sub: "test ตรวจ code เทียบ spec", fill: K.paper, wt: 1.6 }], 0.5, 3.0, 9, 1.0, { gap: 0.3 });
  T(s, "ต่อจาก spec.md", { x: 0.5, y: 2.65, w: 3, h: 0.3, fontSize: 12, color: K.mute });
  T(s, "สีเหลืองคือจุดที่มนุษย์ตัดสิน", { x: 0.5, y: 4.3, w: 9, h: 0.35, fontSize: 13, color: K.ink2 }); }

// 6 ขั้นตรวจ 2 ส่วน
{ const s = lightSlide(pres, S1, "ขั้นตรวจของบทนี้ตรวจอะไรได้ ไม่ได้",
    "lint ตรวจได้เฉพาะรูปแบบ จึงเร็วแต่ครอบคลุมน้อย การตรวจว่าระบบทำตาม spec จริงจะเริ่มในบทที่ 3 เมื่อมี code และ unit test");
  rowsTable(s, pres, [["PR ของ intent และ spec", "สมาชิกอีกคนในกลุ่ม", "ความเข้าใจตรงกัน และข้อกังวลที่ยังไม่ตัดสิน", "ว่าการตัดสินใจดีในระยะยาวหรือไม่"],
    ["lint ของ openapi.yaml ใน CI", "เครื่อง", "รูปแบบไฟล์ถูกต้อง ไม่ขาดส่วนที่จำเป็น", "ว่า API ทำตามกฎ R1–R6 จริงหรือไม่"]], 0.5, 1.3, [2.3, 1.6, 2.6, 2.5], 1.35, { head: ["ส่วน", "ผู้ตรวจ", "ตรวจได้", "ตรวจไม่ได้"], fs: 12, fills: [K.paper, K.paper] });
  box(s, pres, 0.5, 4.3, 9, 0.65, K.amberT); T(s, "lint เร็วแต่ครอบคลุมน้อย: fidelity ต่ำสำหรับคำถามว่า “ทำตาม spec หรือไม่”", { x: 0.7, y: 4.3, w: 8.6, h: 0.65, fontSize: 14, bold: true, valign: "middle" }); }

// 7 Spec Kit / Kiro
caseSlide(pres, S1, { title: "กรณีจริง: เครื่องมือที่เริ่มจาก spec", tag: "GitHub Spec Kit · AWS Kiro · 2025",
  notes: "GitHub เผยแพร่ Spec Kit เป็น open source ลำดับงานเริ่มจาก specification แล้วทำ technical plan และแตกเป็นงานย่อยที่ทดสอบได้ให้ agent Kiro ของ AWS สร้าง requirements.md, design.md, tasks.md ต่อ feature ผู้รีวิวรายหนึ่งชี้ว่าเอกสารไม่ปรับตามเองเมื่อ code เปลี่ยน",
  facts: ["GitHub Spec Kit (open source): เริ่มที่ specification แล้วทำ plan และแตกเป็นงานย่อยที่ทดสอบได้", "Kiro (AWS): สร้าง requirements.md, design.md, tasks.md ต่อ feature", "ผู้ใช้ตรวจเอกสารแต่ละขั้นก่อนไปขั้นถัดไป", "ผู้รีวิวรายหนึ่งชี้ว่าเอกสารไม่ปรับตามเองเมื่อ code เปลี่ยน"],
  principle: "กติกาของวิชา", takeaway: "spec กับ code ค่อย ๆ ไม่ตรงกันได้ จึงมีกติกาว่า หาก code ต้องต่างจาก spec ให้แก้ spec ก่อน",
  refs: "อ้างอิง: GitHub Spec Kit · DevOps.com · Kiro Docs — Specs" });

// 8 สามไฟล์
{ const s = lightSlide(pres, S2, "intent, spec และ OpenAPI ต่างกันอย่างไร", "ทั้ง 3 ไฟล์ตอบคำถามต่างกัน ผู้เขียนและผู้ตรวจต่างกัน ให้นักศึกษาชี้ว่าไฟล์ใดต้องเขียนเอง");
  rowsTable(s, pres, [["intent.md", "ต้องการอะไร เพื่อใคร เพราะอะไร เมื่อใดสำเร็จ", "สมาชิกเขียนเอง ไม่ใช้ AI", "สมาชิกอีกคนผ่าน PR"],
    ["spec.md", "ระบบทำอะไรในแต่ละกรณี รวมกรณีผิดพลาดและสิทธิ์", "AI ร่าง กลุ่มตัดสินข้อกังวล", "สมาชิกอีกคนผ่าน PR"],
    ["openapi.yaml", "endpoint ใดรับและตอบข้อมูลอะไร", "AI แปลงจาก spec", "lint ใน CI"]], 0.5, 1.3, [1.6, 3.2, 2.2, 2.0], 1.05, { head: ["ไฟล์", "ตอบคำถาม", "ผู้เขียน", "ผู้ตรวจ"], fs: 12, mono: [0], fills: [K.tealT, K.paper, K.paper] }); }

// 9 intent ต้องเขียนเอง
{ const s = lightSlide(pres, S2, "เหตุใด intent ต้องเขียนเอง",
    "intent เป็นจุดเริ่มของทุกไฟล์ที่ตามมา หาก AI เขียนด้วย ทุกไฟล์จะมาจากสิ่งที่ AI คาดเดาว่าผู้ใช้ต้องการ และไม่มีใครเป็นเจ้าของความต้องการนั้น The AI-native SDLC playbook จึงให้บันทึก intent ด้วยคำของผู้ที่ต้องการเอง");
  flow(s, pres, [{ t: "AI เขียน intent", fill: K.redT }, { t: "ทุกไฟล์ตามมา", sub: "มาจากสิ่งที่ AI คาดเดา" }, { t: "ไม่มีเจ้าของ", sub: "ความต้องการ", fill: K.redT }], 0.5, 1.4, 9, 1.2, { gap: 0.35 });
  box(s, pres, 0.5, 3.0, 9, 1.9, K.greenT);
  T(s, "intent ที่ดี", { x: 0.75, y: 3.1, w: 8, h: 0.35, fontSize: 15, bold: true, color: K.green });
  T(s, bullets(["เขียนด้วยคำของผู้ที่ต้องการเอง แล้ว commit เป็นจุดเริ่ม", "ไม่มีชื่อ endpoint ชื่อตาราง หรือชื่อ library", "ถ้ามีเรื่องเหล่านี้ แสดงว่ากำลังเขียน spec ไม่ใช่ intent"]), { x: 0.75, y: 3.5, w: 8.5, h: 1.3, fontSize: 14 }); }

// 10 intent หลักการ
{ const s = lightSlide(pres, S2, "หลักการเขียน intent",
    "ตัวอย่างในบทนี้ใช้ feature แจ้งเตือนเมื่อได้ที่นั่งจากคิวสำรอง ซึ่งอยู่นอกขอบเขตของ PROJECT.md จึงไม่ใช่คำตอบของ lab แต่ใช้ระบบและกฎชุดเดียวกัน");
  const p = ["เขียนจากมุมผู้ใช้: ใครเจอปัญหาอะไร และเหตุใดสำคัญ", "เกณฑ์ความสำเร็จเป็นสิ่งที่ผู้ใช้เห็นหรือวัดได้", "ไม่มีรายละเอียดทางเทคนิค", "บอกสิ่งที่ไม่ทำ เพื่อกันขอบเขตขยาย", "สั้น ไม่เกิน 1 หน้า"];
  p.forEach((t, i) => { const y = 1.3 + i * 0.72; box(s, pres, 0.5, y, 9, 0.62, K.paper); chip(s, pres, 0.65, y + 0.1, i + 1, K.teal, K.white, 0.42); T(s, t, { x: 1.3, y, w: 8, h: 0.62, fontSize: 15, valign: "middle" }); });
  T(s, "ตัวอย่างใช้ feature “แจ้งเตือนเมื่อได้ที่นั่งจากคิวสำรอง” ซึ่งอยู่นอก PROJECT.md", { x: 0.5, y: 4.95, w: 9, h: 0.25, fontSize: 10, color: K.mute }); }

// 11 intent ดี/ไม่ดี
goodBad(pres, S2, "ตัวอย่าง intent: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดีบอกวิธีทำแทนความต้องการ ไม่บอกว่าใครเจอปัญหา ใช้คำที่วัดไม่ได้ และไม่มีเกณฑ์สำเร็จหรือสิ่งที่ไม่ทำ ฉบับเต็มของตัวอย่างที่ดีอยู่ใน 1-Lecture.md",
  ["# Notification Feature", "", "ระบบต้องมี notification", "service ที่ส่ง event ผ่าน", "WebSocket ไปยัง client", "ใช้ตาราง notifications", "และ library socket.io", "ระบบต้องรวดเร็ว", "ใช้งานง่าย และรองรับ", "ผู้ใช้จำนวนมาก"],
  ["# Intent: แจ้งเตือนเมื่อได้ที่นั่ง", "", "## ปัญหา", "ผู้อยู่ในคิวสำรองไม่รู้ว่า", "ได้ที่นั่งแล้ว บางคนไม่มา", "ที่นั่งจึงว่าง", "## เมื่อใดสำเร็จ", "- ผู้ที่ได้เลื่อนเห็นข้อความ", "  ตั้งแต่เปิดเว็บครั้งแรก", "- คนอื่นไม่เห็น", "## ไม่ทำ", "- อีเมล / SMS"], 12);

// 12 ปัญหาของ intent ไม่ดี
{ const s = lightSlide(pres, S2, "intent ที่ไม่ดีมีปัญหาอะไร", "แต่ละข้อเป็นเหตุผลที่ intent นี้ใช้ต่อไม่ได้");
  rowsTable(s, pres, [["บอกวิธีทำแทนความต้องการ", "WebSocket ตาราง และ library เป็นการตัดสินใจทางเทคนิค ยังไม่ควรตัดสินในขั้นนี้"], ["ไม่บอกว่าใครเจอปัญหาอะไร", "ไม่รู้ว่าจะแจ้งเตือนใคร เมื่อใด และเพื่ออะไร"],
    ["ใช้คำที่วัดไม่ได้", "“รวดเร็ว” และ “ใช้งานง่าย” ไม่มีเกณฑ์ว่าแค่ไหนจึงพอ"], ["ไม่มีเกณฑ์สำเร็จและสิ่งที่ไม่ทำ", "ไม่มีทางรู้ว่า feature เสร็จแล้วหรือยัง"]], 0.5, 1.3, [3.2, 5.8], 0.8, { fills: [K.redT, K.redT, K.redT, K.redT], fs: 14 }); }

// 13 ข้อกังวล
{ const s = lightSlide(pres, S2, "ข้อกังวลที่ AI ต้องบอก แต่ไม่ตัดสิน",
    "ให้สั่ง AI แยกข้อกังวล (open questions) ออกมาเป็นรายการและห้ามตัดสินเอง กลุ่มเป็นผู้ตัดสินทุกข้อและบันทึกในตาราง ตารางนี้เป็นจุดที่มนุษย์ตรวจและอนุมัติของบทนี้ ตามหลักข้อ 3 ของ WS-01");
  flow(s, pres, [{ t: "AI ร่าง spec" }, { t: "แยก Open questions", sub: "ห้ามตัดสินเอง", fill: K.tealT }, { t: "กลุ่มตัดสินทุกข้อ", sub: "บันทึกในตาราง", fill: K.amber }], 0.5, 1.3, 9, 1.0, { gap: 0.35 });
  rowsTable(s, pres, [["เหลือ 24 ชั่วโมงพอดี ยกเลิกได้หรือไม่", "ไม่ได้ ต้องเหลือมากกว่า 24 ชั่วโมง", "เขียน test ได้ชัดว่าเส้นแบ่งอยู่ตรงไหน", "[ชื่อ]"]], 0.5, 2.9, [3.0, 2.5, 2.5, 1.0], 1.0, { head: ["คำถาม", "ตัดสินใจ", "เหตุผล", "ผู้ตัดสิน"], fs: 12, noBold: true });
  T(s, "ตารางการตัดสินใจเป็น gate ของบทนี้", { x: 0.5, y: 4.55, w: 9, h: 0.35, fontSize: 15, bold: true, color: K.teal }); }

// 14 spec ตรวจได้
{ const s = lightSlide(pres, S3, "ข้อกำหนดทุกข้อต้องตอบได้ว่า test ตรวจอย่างไร",
    "หลักการ: ข้อกำหนดทุกข้อต้องตอบได้ว่า test จะตรวจข้อนี้อย่างไร การตรวจหน้ารายการกิจกรรมเรื่องความเร็วจะทำในบทที่ 7");
  const r = [["ระบบต้องป้องกันการลงทะเบียนซ้ำ", "มีรายการ CONFIRMED หรือ WAITLISTED อยู่แล้วแล้วขอลงทะเบียนอีก ตอบ 409 ALREADY_REGISTERED และไม่สร้างรายการใหม่ (R3)"],
    ["ยกเลิกได้ก่อนเริ่มพอสมควร", "ยกเลิกได้เมื่อ server เวลาห่างจาก starts_at มากกว่า 24 ชั่วโมง มิฉะนั้น 409 CANCEL_TOO_LATE (R4)"],
    ["หน้ารายการกิจกรรมต้องเร็ว", "หน้ารายการกิจกรรมมี p95 ไม่เกิน 500 ms (ตรวจในบทที่ 7)"]];
  T(s, "ไม่ชัด", { x: 0.7, y: 1.2, w: 3, h: 0.3, fontSize: 12, bold: true, color: K.red }); T(s, "ตรวจได้", { x: 4.05, y: 1.2, w: 3, h: 0.3, fontSize: 12, bold: true, color: K.green });
  r.forEach((v, i) => { const y = 1.55 + i * 1.12; box(s, pres, 0.5, y, 3.3, 1.02, K.redT); box(s, pres, 3.95, y, 5.55, 1.02, K.greenT);
    T(s, v[0], { x: 0.65, y, w: 3.0, h: 1.02, fontSize: 12, valign: "middle" }); T(s, v[1], { x: 4.1, y, w: 5.25, h: 1.02, fontSize: 11, valign: "middle" }); }); }

// 15 Given When Then
{ const s = lightSlide(pres, S3, "Given / When / Then", "เขียนพฤติกรรมของแต่ละกฎในรูปแบบเดียวกันเพื่อแปลงเป็น test ได้ตรงตัว ตัวอย่างคือ R1 ในสองกรณี");
  codeBox(s, pres, 0.5, 1.3, 4.4, 2.6, ["R1 — ที่นั่งยังไม่เต็ม", "Given capacity 2 มีผู้ได้", "      ที่นั่งแล้ว 1 คน", "When  ผู้เข้าร่วมอีกคน", "      ลงทะเบียน", "Then  201 รายการใหม่", "      สถานะ CONFIRMED"], 12);
  codeBox(s, pres, 5.1, 1.3, 4.4, 2.6, ["R1 — ที่นั่งเต็มแล้ว", "Given capacity 2 มีผู้ได้", "      ที่นั่งแล้ว 2 คน", "When  ผู้เข้าร่วมอีกคน", "      ลงทะเบียน", "Then  201 รายการใหม่", "      สถานะ WAITLISTED"], 12);
  box(s, pres, 0.5, 4.1, 9, 0.8, K.tealT); T(s, "แต่ละบรรทัด Then แปลงเป็น assertion ใน test ได้ตรงตัว", { x: 0.75, y: 4.1, w: 8.5, h: 0.8, fontSize: 15, bold: true, valign: "middle" }); }

// 16 edge case
{ const s = lightSlide(pres, S3, "Edge case: กรณีที่ AI มักไม่เขียนถึง", "edge case คือกรณีที่อยู่ตรงขอบของกฎ ถ้าไม่สั่ง AI มักไม่เขียนถึง");
  const e = [["R6", "ที่นั่งเหลือ 1 ที่ แต่มีผู้ลงทะเบียน 2 คนพร้อมกัน", "ทดสอบจริงในบทที่ 7"], ["R2", "ผู้ที่อยู่ในคิวสำรองยกเลิกเอง คิวต้องเลื่อนหรือไม่", ""], ["R5", "มี 3 กิจกรรมแล้ว และกิจกรรมหนึ่งเพิ่งเริ่ม ลงทะเบียนกิจกรรมที่ 4 ได้หรือไม่", ""]];
  e.forEach((v, i) => { const y = 1.35 + i * 1.2; box(s, pres, 0.5, y, 9, 1.05, K.paper); chip(s, pres, 0.7, y + 0.3, v[0], K.amber, K.ink, 0.46);
    T(s, [{ text: v[1], options: { fontSize: 15, bold: true, breakLine: !!v[2] } }].concat(v[2] ? [{ text: v[2], options: { fontSize: 12, color: K.ink2 } }] : []), { x: 1.45, y, w: 7.8, h: 1.05, valign: "middle" }); }); }

// 17 ตารางสิทธิ์
{ const s = lightSlide(pres, S3, "ตารางสิทธิ์", "ระบุให้ชัดว่าบทบาทใดเรียก endpoint ใดได้ ตารางนี้จะใช้ตรวจ security ในบทที่ 8");
  rowsTable(s, pres, [["GET /api/events", "ได้", "ได้", "401"], ["POST /api/events", "ได้", "403", "401"], ["POST /api/events/{eventId}/registrations", "403", "ได้", "401"]], 0.5, 1.3, [4.4, 1.5, 1.6, 1.5], 0.78, { head: ["endpoint", "ผู้จัด", "ผู้เข้าร่วม", "ยังไม่เข้าสู่ระบบ"], fs: 12, mono: [0], noBold: true });
  box(s, pres, 0.5, 4.35, 9, 0.6, K.amberT); T(s, "ตารางนี้ใช้เป็นฐานของ access test ในบทที่ 8", { x: 0.75, y: 4.35, w: 8.5, h: 0.6, fontSize: 14, bold: true, valign: "middle" }); }

// 18 status code
{ const s = lightSlide(pres, S3, "status code และรูปแบบ error",
    "ใช้รูปแบบ error เดียวกันทั้งระบบ { code, message } code ให้ test และหน้าจอตรวจ message ให้คนอ่าน บางทีมใช้ 422 แทน 409 สำหรับผิดกฎธุรกิจ ใช้ได้ทั้งสองแบบ ให้เลือกแบบเดียวและบันทึกในตารางการตัดสินใจ");
  codeBox(s, pres, 0.5, 1.3, 9, 0.7, ['{ "code": "ALREADY_REGISTERED", "message": "..." }'], 13);
  const f = [["2xx", "สำเร็จ", "—"], ["4xx", "คำขอมีปัญหา: ผิดรูปแบบ ยังไม่เข้าสู่ระบบ ผิดกฎ", "ผู้เรียก"], ["5xx", "server ทำงานผิดพลาด", "ผู้พัฒนาระบบ"]];
  rowsTable(s, pres, f, 0.5, 2.3, [1.2, 5.6, 2.2], 0.5, { head: ["ตระกูล", "ความหมาย", "ผู้ที่ต้องแก้"], fs: 13, mono: [0] });
  T(s, "code ใช้ให้ test ตรวจ · message ใช้ให้คนอ่าน", { x: 0.5, y: 4.7, w: 9, h: 0.3, fontSize: 14, bold: true, color: K.teal }); }

// 19 ตาราง code
{ const s = lightSlide(pres, S3, "เลือก status code ให้ถูกกรณี", "ผิดกฎทางธุรกิจต้องตอบ 4xx เสมอ ถ้า test ได้ 500 จากกรณีที่ spec ระบุไว้ แปลว่า code มี bug");
  const r = [["200 / 201", "สำเร็จ / สร้างรายการใหม่สำเร็จ"], ["400", "ข้อมูลที่ส่งมาผิดรูปแบบ เช่น ไม่มีชื่อกิจกรรม"], ["401", "ยังไม่ได้เข้าสู่ระบบ"], ["403", "เข้าสู่ระบบแล้ว แต่บทบาทนี้ไม่มีสิทธิ์"], ["404", "ไม่พบสิ่งที่ขอ"], ["409", "คำขอขัดกับสถานะปัจจุบัน เช่น ลงทะเบียนซ้ำ"], ["500", "ข้อผิดพลาดที่ไม่คาดไว้ใน server เช่น code มี bug"], ["503", "server ให้บริการไม่ได้ชั่วคราว เช่น ต่อฐานข้อมูลไม่ได้"]];
  r.forEach((v, i) => { const col = i < 4 ? 0 : 1, row = i % 4, x = 0.5 + col * 4.6, y = 1.3 + row * 0.8; box(s, pres, x, y, 4.4, 0.7, i >= 6 ? K.amberT : K.paper);
    T(s, v[0], { x: x + 0.15, y, w: 1.1, h: 0.7, fontSize: 14, bold: true, color: K.teal, valign: "middle", fontFace: "Courier New" }); T(s, v[1], { x: x + 1.3, y, w: 3.0, h: 0.7, fontSize: 12, valign: "middle" }); });
  T(s, "ผิดกฎทางธุรกิจ = 4xx เสมอ · ได้ 500 จากกรณีที่ spec ระบุ = code มี bug", { x: 0.5, y: 4.6, w: 9, h: 0.35, fontSize: 14, bold: true, color: K.teal }); }

// 20 5xx
{ const s = lightSlide(pres, S3, "กำหนดกรณี 5xx ไว้ครั้งเดียว",
    "spec ไม่ต้องเขียนกรณี 500 ซ้ำทุก endpoint กำหนดไว้ครั้งเดียวว่าตอบรูปแบบ error เดียวกัน ห้ามส่ง stack trace หรือข้อความ error ของฐานข้อมูลกลับไปให้ผู้ใช้ เพราะเปิดเผยโครงสร้างของระบบ จะตรวจในบทที่ 8");
  codeBox(s, pres, 0.5, 1.3, 9, 0.7, ['{ "code": "INTERNAL_ERROR", "message": "..." }'], 13);
  const r = [["กำหนดครั้งเดียว", "ไม่ต้องเขียนกรณี 500 ซ้ำทุก endpoint", K.tealT], ["ห้ามส่งรายละเอียดภายใน", "ไม่ส่ง stack trace หรือข้อความ error ของฐานข้อมูลให้ผู้ใช้ (ตรวจในบทที่ 8)", K.redT], ["ผิดกฎธุรกิจ = 4xx", "ได้ 500 จากกรณีที่ spec ระบุ แปลว่า code มี bug", K.amberT]];
  r.forEach((v, i) => { const y = 2.3 + i * 0.9; box(s, pres, 0.5, y, 9, 0.8, v[2]); T(s, v[0], { x: 0.75, y, w: 3.0, h: 0.8, fontSize: 14, bold: true, valign: "middle" }); T(s, v[1], { x: 3.8, y, w: 5.5, h: 0.8, fontSize: 13, valign: "middle" }); }); }

// 21 spec ดี/ไม่ดี
goodBad(pres, S3, "ตัวอย่าง spec: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดีใช้คำว่าเหมาะสม ไม่มี status code ไม่มีตารางสิทธิ์ ไม่อ้างกฎ และกำหนดวิธีทำภายใน (Redis queue) ซึ่งควรอยู่ใน ADR",
  ["เมื่อมีผู้ยกเลิก ระบบจะ", "แจ้งเตือนผู้ใช้ที่เกี่ยวข้อง", "อย่างเหมาะสม", "", "API: GET /notifications", "คืนรายการแจ้งเตือน", "หากเกิด error ให้คืน error", "", "ใช้ Redis queue เพื่อรองรับ", "ผู้ใช้จำนวนมาก"],
  ["N1 — เลื่อนจากคิวสำรอง (R2)", "Given A เป็น WAITLISTED", "      ลำดับแรกของกิจกรรม E", "When  ผู้ได้ที่นั่งของ E ยกเลิก", "Then  รายการของ A เป็น CONFIRMED", "And   A มีการแจ้งเตือนใหม่ 1", "      รายการ ระบุชื่อ E", "", "N2 — ไม่เห็นของผู้อื่น", "When B แก้การแจ้งเตือนของ A", "Then 404 NOTIFICATION_NOT_FOUND"], 11);

// 22 ปัญหาของ spec ไม่ดี
{ const s = lightSlide(pres, S3, "spec ที่ไม่ดีมีปัญหาอะไร", "ไม่มีตารางสิทธิ์เป็นช่องโหว่ที่พบบ่อย เพราะไม่รู้ว่าผู้ใช้อ่านการแจ้งเตือนของผู้อื่นได้หรือไม่");
  rowsTable(s, pres, [["“ผู้ใช้ที่เกี่ยวข้อง” “อย่างเหมาะสม”", "ไม่รู้ว่าใครได้รับ และ test ตรวจคำว่าเหมาะสมไม่ได้"], ["ไม่มี status code และ error code", "หน้าจอและ test ไม่รู้ว่าต้องรอรับค่าใด"], ["ไม่มีตารางสิทธิ์", "ไม่รู้ว่าอ่านของผู้อื่นได้หรือไม่ ซึ่งเป็นช่องโหว่ที่พบบ่อย"], ["ไม่อ้างกฎ", "ไม่รู้ว่ามาจากกฎ R2"], ["กำหนดวิธีทำภายใน", "Redis queue ควรอยู่ใน ADR ไม่ใช่ใน spec"]], 0.5, 1.3, [3.5, 5.5], 0.62, { fills: [K.redT, K.redT, K.redT, K.redT, K.redT], fs: 13 }); }

// 23 OpenAPI หลักการ
{ const s = lightSlide(pres, S3, "OpenAPI: spec ที่เครื่องอ่านได้",
    "openapi.yaml อธิบายว่า endpoint ใดรับและตอบข้อมูลอะไร Next.js ไม่ได้สร้าง OpenAPI จาก code ให้อัตโนมัติ การเขียน spec ก่อนจึงเป็นลำดับปกติ แต่ไม่มีเครื่องมือเตือนเมื่อ code ต่างจาก spec กติกาใน AGENTS.md จึงต้องกำหนดไว้");
  const p = ["ทุก endpoint และ status code ใน spec มีใน openapi.yaml และไม่มีสิ่งที่ spec ไม่ได้ระบุ", "path เป็นคำนาม การกระทำใช้ method เช่น GET /api/me/notifications", "schema ระบุ field ที่จำเป็นและชนิดข้อมูลครบ", "error ทุกกรณีใช้ schema Error ร่วมกัน", "ระบุวิธียืนยันตัวตนด้วย security"];
  p.forEach((t, i) => { const y = 1.3 + i * 0.72; box(s, pres, 0.5, y, 9, 0.62, K.paper); chip(s, pres, 0.65, y + 0.1, i + 1, K.teal, K.white, 0.42); T(s, t, { x: 1.3, y, w: 8, h: 0.62, fontSize: 13, valign: "middle" }); }); }

// 24 OpenAPI ดี/ไม่ดี
goodBad(pres, S3, "ตัวอย่าง openapi.yaml: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดีผ่าน lint โดยมีเพียง warning 1 ข้อ เพราะ lint ตรวจรูปแบบ ไม่ได้ตรวจว่าตรงกับ spec การเทียบว่า endpoint และ status code ครบตาม spec ยังต้องให้คนตรวจ ตามขั้นตอนที่ 4 ของ lab",
  ["paths:", "  /api/getNotifications:", "    get:", "      summary: get notifications", "      responses:", '        "200":', "          description: OK", "          content:", "            application/json:", "              schema:", "                type: object"],
  ["paths:", "  /api/me/notifications:", "    get:", "      operationId:", "        listMyNotifications", "      responses:", '        "200":', "          # schema: array of", "          #   Notification", '        "401":', '          $ref: Error'], 10);

// 25 ปัญหา openapi ไม่ดี
{ const s = lightSlide(pres, S3, "ผ่าน lint ไม่ได้แปลว่าตรงกับ spec", "ตัวอย่างที่ไม่ดีผ่านคำสั่ง lint โดยมี warning 1 ข้อ (operation-4xx-response) เพราะ lint ตรวจรูปแบบของไฟล์ ไม่ได้ตรวจว่าตรงกับ spec คำสั่ง npx --yes @redocly/cli@2 lint docs/openapi.yaml จะไม่ผ่านเมื่อไฟล์ผิดรูปแบบ เช่นพิมพ์ responses เป็น respones");
  rowsTable(s, pres, [["path มีคำกริยา getNotifications", "ไม่สอดคล้องกับ endpoint อื่น และสับสนเมื่อเพิ่ม method"], ["มีแต่ 200", "ไม่มี 401 และ 404 ตามที่ spec ระบุ"], ["type: object ไม่มี properties", "ไม่รู้ว่ามี field ใด AI จะเดาเอง"], ["ไม่มี endpoint ทำเครื่องหมายว่าอ่านแล้ว", "ไม่ตรงกับ spec"]], 0.5, 1.3, [3.5, 5.5], 0.64, { fills: [K.redT, K.redT, K.redT, K.redT], fs: 13 });
  box(s, pres, 0.5, 4.45, 9, 0.55, K.amberT); T(s, "ไฟล์นี้ผ่าน lint (มี warning 1 ข้อ) เพราะ lint ตรวจรูปแบบ ไม่ใช่ความตรงกับ spec", { x: 0.75, y: 4.45, w: 8.5, h: 0.55, fontSize: 14, bold: true, valign: "middle" }); }

// 26 ADR คืออะไร
{ const s = lightSlide(pres, S4, "ADR: บันทึกการตัดสินใจทางเทคนิค",
    "1 เรื่องต่อ 1 ไฟล์ พร้อมทางเลือกที่พิจารณาและเหตุผล เขียนเมื่อการตัดสินใจเปลี่ยนภายหลังได้ยากหรือมีผลกับงานของสมาชิกหลายคน ADR ที่ตัดสินแล้วไม่แก้ หากเปลี่ยนใจให้เขียนฉบับใหม่อ้างถึงฉบับเดิม ประวัติจึงอยู่ครบ");
  codeBox(s, pres, 0.5, 1.3, 4.6, 3.65, ["# ADR-001: [หัวข้อ]", "", "สถานะ: ใช้อยู่ / ถูกแทนที่", "วันที่: [วันที่]", "", "## บริบท", "## ทางเลือกที่พิจารณา", "## การตัดสินใจ", "## ผลที่ตามมา"], 12);
  const r = [["1 เรื่องต่อ 1 ไฟล์", K.tealT], ["เขียนเมื่อเปลี่ยนยาก หรือมีผลกับหลายคน", K.paper], ["ไม่แก้ฉบับที่ตัดสินแล้ว เปลี่ยนใจให้เขียนฉบับใหม่", K.amberT]];
  r.forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 5.3, y, 4.2, 1.15, v[1]); T(s, v[0], { x: 5.5, y, w: 3.8, h: 1.15, fontSize: 14, bold: true, valign: "middle" }); }); }

// 27 ADR ดี/ไม่ดี
goodBad(pres, S4, "ตัวอย่าง ADR: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดีไม่มีบริบท ไม่มีทางเลือกอื่น เหตุผลกว้างเกินไป และไม่มีผลที่ตามมาหรือสถานะ การแก้ ADR เดิมเมื่อเปลี่ยนใจก็เป็นตัวอย่างที่ไม่ดีเช่นกัน เพราะเหตุผลของการตัดสินใจครั้งก่อนหายไป",
  ["# ADR: Database", "", "เราเลือก PostgreSQL", "เพราะดีที่สุดและทุกคนใช้", "", "(ไม่มีบริบท", " ไม่มีทางเลือกอื่น", " ไม่มีผลที่ตามมา", " ไม่มีสถานะ)"],
  ["# ADR-005: แสดงแจ้งเตือน", "  ในหน้าเว็บ แทนอีเมล", "สถานะ: ใช้อยู่", "## บริบท  ไม่มีอีเมลในขอบเขต", "## ทางเลือก", "1. หน้าเว็บ — ไม่ต้องมี", "   บริการภายนอก / ต้องเปิดเว็บ", "2. อีเมล — ทันที / ต้องมี key", "3. ไม่แจ้ง — ปัญหายังอยู่", "## ตัดสิน เลือกข้อ 1", "## ผล ยอมรับความเสี่ยงที่", "   ผู้ไม่เปิดเว็บไม่ทราบ"], 10);

// 28 ADR-001
{ const s = lightSlide(pres, S4, "ADR-001: เก็บข้อมูลอย่างไรก่อนบทที่ 5",
    "บทที่ 3 และ 4 จะเริ่มเขียน code ของการลงทะเบียนซึ่งต้องเก็บข้อมูล ส่วนบทที่ 5 จะใช้ PostgreSQL ผ่าน Docker ระหว่างนี้กลุ่มต้องตัดสินใจเอง ไม่มีทางเลือกที่ถูกเพียงทางเดียว สิ่งที่ตรวจคือกลุ่มเขียนเหตุผลและผลที่ตามมาได้ การแบ่งชั้นของ code จะเป็น ADR-002 ในบทที่ 3 อ้างอิง: Vercel — Is SQLite supported in Vercel?");
  rowsTable(s, pres, [["เก็บในหน่วยความจำ", "ง่ายที่สุด เหมาะกับ unit test", "ข้อมูลหายเมื่อ server เริ่มใหม่ และบน Vercel แต่ละ instance ไม่เห็นข้อมูลชุดเดียวกัน"], ["SQLite", "ฐานข้อมูลจริงในไฟล์เดียว", "Vercel ระบุว่าใช้ SQLite บนบริการไม่ได้ เพราะพื้นที่ไฟล์ของ function ไม่ถาวร"], ["PostgreSQL ภายนอกตั้งแต่ตอนนี้", "เว็บจริงเก็บข้อมูลได้ถาวร", "ต้องสมัครบริการเพิ่ม และจัดการ DATABASE_URL อย่างปลอดภัยตั้งแต่บทนี้"]], 0.5, 1.3, [2.4, 2.6, 4.0], 1.05, { head: ["ทางเลือก", "ข้อดี", "ข้อจำกัดที่ต้องรู้"], fs: 12, fills: [K.paper, K.redT, K.paper] });
  ref(s, "อ้างอิง: Vercel — Is SQLite supported in Vercel?"); }

// 29 สรุป
{ const s = darkSlide(pres, S5, "สรุป 4 ข้อ ก่อนเข้าสู่ lab");
  T(s, "สรุป", { x: 0.7, y: 0.5, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["เมื่อคำสั่งไม่ได้บอกบางเรื่อง AI เลือกให้เอง spec มีไว้ให้กลุ่มเป็นผู้เลือก", "intent เขียนเอง spec ให้ AI ร่างได้ แต่ข้อกังวลทุกข้อต้องมีคนในกลุ่มตัดสิน", "ข้อกำหนดที่ดีตอบได้ว่า test ตรวจอย่างไร และครอบคลุม error สิทธิ์ และ edge case", "การตัดสินใจที่เปลี่ยนยาก บันทึกเป็น ADR พร้อมทางเลือกที่ไม่ได้เลือก"];
  r.forEach((t, i) => { const y = 1.35 + i * 0.95; chip(s, pres, 0.7, y + 0.1, i + 1, K.amber, K.ink); T(s, t, { x: 1.35, y, w: 8, h: 0.7, fontSize: 17, color: K.white, valign: "middle" }); }); }

// 30-31 Glossary
const GL = [["intent.md", "ไฟล์ที่ผู้ต้องการเขียนเอง: ปัญหา สิ่งที่ผู้ใช้ทำได้ เกณฑ์สำเร็จ สิ่งที่ไม่ทำ"], ["spec.md", "ข้อกำหนดที่ตรวจได้: พฤติกรรม API สิทธิ์ edge case"], ["OpenAPI", "spec ของ API ในรูปแบบที่เครื่องอ่านได้ (openapi.yaml)"],
  ["Open question", "ข้อกังวลที่ intent และ PROJECT.md ยังไม่ตัดสิน AI ต้องบอกแต่ไม่ตัดสิน"], ["Given / When / Then", "รูปแบบเขียนพฤติกรรม: เงื่อนไข การกระทำ ผลลัพธ์"], ["Edge case", "กรณีตรงขอบของกฎที่ AI มักไม่เขียนถึง"],
  ["status code", "ตัวเลขบอกผลของคำขอ: 2xx สำเร็จ 4xx ผู้เรียกผิด 5xx server ผิดพลาด"], ["error code", "ข้อความรหัสใน { code, message } ที่ test และหน้าจอใช้ตรวจ"], ["lint", "เครื่องมือตรวจรูปแบบไฟล์ ไม่ได้ตรวจว่าตรงกับ spec"],
  ["ADR", "บันทึกการตัดสินใจทางเทคนิค 1 เรื่องต่อ 1 ไฟล์"], ["ตารางสิทธิ์", "ตารางว่าบทบาทใดเรียก endpoint ใดได้"], ["Gate", "จุดที่มนุษย์ตรวจและอนุมัติ ในบทนี้คือตารางการตัดสินใจ"]];
[0, 6].forEach((k, n) => { const s = lightSlide(pres, S6, "Glossary (" + (n + 1) + "/2)", "ใช้ทบทวนคำศัพท์ของบทนี้");
  GL.slice(k, k + 6).forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.1, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 15, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.2, y, w: 4.0, h: 1.1, valign: "middle" }); }); });

// L1 หัวข้อ lab
{ const s = darkSlide(pres, S7, "เปลี่ยนจากบรรยายเป็นลงมือ บทนี้ยังไม่เขียน code ของ feature งานทั้งหมดเป็นเอกสารที่บทที่ 3 จะใช้ตรวจ code");
  T(s, "Lab", { x: 0.7, y: 1.1, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "เขียน spec ที่ตรวจได้\nให้ครบรอบ", { x: 0.7, y: 1.7, w: 8.6, h: 1.6, fontSize: 38, bold: true, color: K.white });
  T(s, "intent → spec → ตัดสินข้อกังวล → openapi.yaml → ADR-001 → CI lint", { x: 0.7, y: 3.8, w: 8.6, h: 0.5, fontSize: 16, color: "B8C4D4" }); }

// L2 brief
{ const s = lightSlide(pres, S7, "Brief ของ lab: ทำอะไรและได้อะไร",
    "ตั้งแต่บทนี้ การแก้ไขทุกอย่างทำบน branch แยกและเข้า main ผ่าน PR ที่สมาชิกอีกคนเป็นผู้อนุมัติ ทุกคนต้องทำ 0-Before ส่วน B และ C และนำคำถามเกี่ยวกับกฎ R1–R6 มาด้วย");
  const c = [["รูปแบบ", "งานกลุ่ม ใช้ repository เดิมจาก WS-01"], ["เป้าหมาย", "feature 01-events และ 02-register มี intent, spec ที่ตัดสินข้อกังวลครบ, openapi.yaml ที่ CI ตรวจ และ ADR-001"],
    ["ต้องมีก่อนเริ่ม", "WS-01 เสร็จ (CI ของ main สีเขียว, Live URL เปิดได้)"], ["กติกาใหม่", "ทุกการแก้ไขผ่าน branch และ PR ที่สมาชิกอีกคนอนุมัติ"]];
  c.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.65; box(s, pres, x, y, 4.4, 1.5, i === 3 ? K.amberT : K.paper);
    T(s, v[0], { x: x + 0.25, y: y + 0.15, w: 3.9, h: 0.35, fontSize: 13, bold: true, color: K.teal }); T(s, v[1], { x: x + 0.25, y: y + 0.55, w: 3.9, h: 0.85, fontSize: 14 }); }); }

// L3 7 ขั้นตอน
{ const s = lightSlide(pres, S7, "7 ขั้นตอนของ lab", "ทุกขั้นมี ทำ / ผลที่ควรเห็น / หากติดปัญหา ใน 2-Lab.md");
  const st = [["1", "เขียน intent ด้วยคำของกลุ่มเอง", "ไม่ใช้ AI · 01-events และ 02-register"], ["2", "ให้ AI ร่าง spec พร้อมข้อกังวล", "7 หัวข้อ · ห้ามตัดสินเอง"], ["3", "ตัดสินข้อกังวล", "บันทึกในตารางการตัดสินใจ"], ["4", "สร้าง docs/openapi.yaml จาก spec", "คนเทียบ endpoint และ status code"],
    ["5", "เขียน ADR-001", "เก็บข้อมูลอย่างไรก่อนบทที่ 5"], ["6", "เพิ่มขั้นตรวจใน CI และ AGENTS.md", "redocly lint · กติกาเรื่อง spec"], ["7", "เตรียมหลักฐาน", "เวลา intent→spec · break-it-live · evidence"]];
  st.forEach((v, i) => { const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4, x = 0.5 + col * 4.6, y = 1.3 + row * 0.9;
    box(s, pres, x, y, 4.4, 0.8, i === 6 ? K.amberT : K.paper); chip(s, pres, x + 0.15, y + 0.19, v[0], i === 6 ? K.amber : K.teal, i === 6 ? K.ink : K.white);
    T(s, [{ text: v[1], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[2], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.75, y, w: 3.55, h: 0.8, valign: "middle" }); });
  box(s, pres, 5.1, 4.0, 4.4, 0.8, K.ink); T(s, "แต่ละขั้น: ทำ → ผลที่ควรเห็น → หากติดปัญหา", { x: 5.25, y: 4.0, w: 4.1, h: 0.8, fontSize: 13, color: K.white, valign: "middle" }); }

// L4 repo
{ const s = lightSlide(pres, S7, "repository ที่จะได้เมื่อจบบทนี้", "แสดงเฉพาะไฟล์ที่เพิ่มหรือแก้ในบทนี้ ตัวเลขคือขั้นตอนที่สร้างไฟล์");
  codeBox(s, pres, 0.5, 1.3, 5.6, 3.65, ["AGENTS.md              ← 6", "docs/", "├── openapi.yaml       ← 4", "├── adr/", "│   └── ADR-001-data-storage.md ← 5", "└── features/", "    ├── 01-events/ intent, spec ← 1-3", "    └── 02-register/ intent, spec ← 1-3", "evidence/ws-02.md      ← 7", ".github/workflows/ci.yml ← 6"], 11);
  const r = [["เพิ่มใน CI", "redocly lint docs/openapi.yaml"], ["เพิ่มใน AGENTS.md", "อ่าน spec ก่อนเขียน code · ต่างจาก spec ให้แก้ spec ก่อน"], ["ห้ามแก้", "ไฟล์ใน docs/adr/ เปลี่ยนใจให้เขียนฉบับใหม่"]];
  r.forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.3, y, 3.2, 1.15, i === 2 ? K.redT : K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11, color: K.ink2 } }], { x: 6.45, y, w: 2.95, h: 1.15, valign: "middle" }); }); }

// L5 prompt ขั้น 2
{ const s = lightSlide(pres, S7, "ขั้นที่ 2: สั่ง AI ร่าง spec แต่ห้ามตัดสินเอง",
    "คำสั่งเต็มอยู่ใน 2-Lab.md ขั้นที่ 2 ถ้า AI ตัดสินข้อกังวลเอง เช่นเขียนว่า สมมติว่า... ให้สั่งย้ายข้อสมมติทั้งหมดไปไว้ใน Open questions ถ้า AI แก้ไฟล์อื่นหรือเขียน code ให้ปฏิเสธ git status ต้องแสดงเฉพาะ spec.md ที่เพิ่มขึ้น");
  codeBox(s, pres, 0.5, 1.3, 5.4, 3.65, ["Read AGENTS.md, PROJECT.md", "and intent.md.", "Write spec.md in Thai:", "1 Scope  2 Rules", "3 Behaviour (Given/When/Then)", "4 API endpoints + errors", "5 Permissions  6 Edge cases", "7 Open questions", "One error format:", "{ code, message }", "Do not decide the open", "questions yourself.", "Do not change other files."], 11);
  const r = [["ผลที่ควรเห็น", "ครบ 7 หัวข้อ · git status เห็นเฉพาะ spec.md", K.greenT], ["ถ้า AI ตัดสินเอง", "สั่งย้ายข้อสมมติไปไว้ใน Open questions", K.amberT], ["ถ้า AI แก้ไฟล์อื่น", "ปฏิเสธ และย้ำข้อห้ามในคำสั่ง", K.redT]];
  r.forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.1, y, 3.4, 1.15, v[2]);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: 6.25, y, w: 3.15, h: 1.15, valign: "middle" }); }); }

// L6 break-it-live
{ const s = lightSlide(pres, S7, "break-it-live: พิสูจน์ว่า lint จับความผิดได้",
    "แก้คำว่า responses: ของ endpoint ใดก็ได้ 1 ตำแหน่งเป็น respones: บน branch demo/broken-spec เปิด PR รอให้ CI เป็นสีแดงที่ขั้น lint แล้วปิด PR โดยไม่ merge");
  flow(s, pres, [{ t: "branch", sub: "demo/broken-spec" }, { t: "responses: → respones:", sub: "ใน openapi.yaml" }, { t: "เปิด PR", sub: "CI แดงที่ขั้น lint", fill: K.redT }, { t: "ปิด PR", sub: "ไม่ merge", fill: K.amberT }], 0.5, 1.7, 9, 1.4, { gap: 0.3, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.6, 9, 1.3, K.paper); T(s, "สิ่งที่พิสูจน์ได้: ไฟล์ spec ที่ผิดรูปแบบถูกหยุดที่ CI\nสิ่งที่ยังไม่พิสูจน์: ว่า API ทำตามกฎ R1–R6 (เริ่มในบทที่ 3)", { x: 0.75, y: 3.6, w: 8.5, h: 1.3, fontSize: 15, bold: true, valign: "middle" }); }

// L7 evidence
{ const s = lightSlide(pres, S7, "หลักฐานใน evidence/ws-02.md", "ตาราง AI เสนอแต่ไม่รับต้องมีอย่างน้อย 2 แถว ดูเวลาที่ไฟล์ถูกเพิ่มครั้งแรกด้วย git log --diff-filter=A");
  rowsTable(s, pres, [["เวลาจาก intent ถึง spec", "commit แรกของ intent.md → commit แรกของ spec.md (02-register)"], ["ข้อกังวลที่ AI พบ", "จำนวน"], ["ข้อกังวลที่สมาชิกพบเองแต่ AI ไม่พบ", "จำนวน"], ["Break-it-live", "ลิงก์ PR ที่ CI ไม่ผ่านและปิดแล้ว"], ["AI เสนอแต่ไม่รับ", "ตาราง “AI เสนอ / เหตุผลที่ไม่รับ” อย่างน้อย 2 แถว"]], 0.5, 1.3, [3.8, 5.2], 0.62, { fills: [K.paper, K.paper, K.paper, K.paper, K.amberT], fs: 13 }); }

// L8 การวัดผล
{ const s = lightSlide(pres, S7, "การวัดผล: Present 7 ขั้นตอน", "เวลา 5 นาทีต่อกลุ่ม ผู้ตรวจเป็นผู้เลือกกฎและ endpoint ในขั้น 2 และ 4 ไม่มีการให้คะแนน แต่ละขั้นมีเกณฑ์ผ่านที่ตรวจได้");
  const r = [["เปิด PR ของ intent.md ที่ผู้ตรวจเลือก", "ผู้อนุมัติ PR ไม่ใช่ผู้เขียน intent"], ["ผู้ตรวจเลือกกฎ 1 ข้อ กลุ่มชี้ตำแหน่งใน spec.md", "ระบุ status code และ error code ของกรณีผิดกฎ"], ["เปิดตารางการตัดสินใจ เลือก 1 ข้อแล้วอธิบาย", "อธิบายด้วยคำของกลุ่มว่าเลือกทางใดเพราะเหตุใด"],
    ["ผู้ตรวจเลือก endpoint เปิดใน openapi.yaml", "มี endpoint พร้อม error response ตรงกับ spec"], ["เปิด ADR-001 แล้วอธิบาย", "บอกได้ว่าทางเลือกที่ไม่เลือกคืออะไร และเหตุใด"], ["เปิด PR break-it-live", "เห็น CI สีแดงที่ขั้น lint ของ openapi.yaml"], ["ถาม AI ว่าจะเขียน code ลงทะเบียนต้องอ่านไฟล์ใดก่อน", "agent ตอบ docs/features/02-register/spec.md"]];
  T(s, "ขั้นตอน", { x: 1.05, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute }); T(s, "เกณฑ์ผ่าน", { x: 5.3, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  r.forEach((v, i) => { const y = 1.48 + i * 0.5; box(s, pres, 0.5, y, 9, 0.46, i % 2 ? K.white : K.paper); chip(s, pres, 0.55, y + 0.04, i + 1, K.teal, K.white, 0.38);
    T(s, v[0], { x: 1.05, y, w: 4.15, h: 0.46, fontSize: 11, valign: "middle", bold: true }); T(s, v[1], { x: 5.3, y, w: 4.1, h: 0.46, fontSize: 11, valign: "middle" }); }); }

// L9 Retro
{ const s = lightSlide(pres, S7, "Retro: ปรึกษากันแล้วบันทึกท้าย evidence", "ข้อ 3 เชื่อมไปบทถัดไป เพราะขั้นที่ทำด้วยมือคือสิ่งที่บทหลัง ๆ จะเปลี่ยนเป็นการตรวจอัตโนมัติ");
  const q = ["ข้อกังวลข้อใดที่หากไม่ตัดสินในบทนี้ จะกลายเป็น bug ในบทถัดไป", "ขั้นตรวจของบทนี้ (PR และ lint) ตรวจอะไรได้ และตรวจอะไรไม่ได้", "ขั้นตอนใดวันนี้ยังทำด้วยมือ และควรเปลี่ยนเป็นการตรวจอัตโนมัติในบทใด"];
  q.forEach((t, i) => { const y = 1.4 + i * 1.15; box(s, pres, 0.5, y, 9, 1.0, K.paper); chip(s, pres, 0.75, y + 0.29, i + 1); T(s, t, { x: 1.4, y, w: 7.9, h: 1.0, fontSize: 16, valign: "middle" }); }); }

L.save(pres, "ws-02-spec.pptx").then(() => console.log("saved"));
