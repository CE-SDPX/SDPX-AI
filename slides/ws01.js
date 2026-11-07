const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref } = L;
const S0 = "เปิดคาบ", S1 = "เหตุใดต้องเน้น loop", S2 = "การวัดคุณภาพของ loop", S3 = "Context และการตรวจงาน AI", S4 = "สรุป", S5 = "Lab และการวัดผล", S6 = "Glossary";
const pres = L.newDeck("WS-01 Loop Engineering และ Deploy Loop", [S0, S1, S2, S3, S4, S6, S5]);

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดคาบ แนะนำว่าบทนี้เป็นบทแรกของ 8 บท และเป็นบทที่วางหลักคิดของทั้งวิชา");
  T(s, "WS-01", { x: 0.7, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "Loop Engineering\nและ Deploy Loop", { x: 0.7, y: 1.8, w: 8.6, h: 1.7, fontSize: 40, bold: true, color: K.white });
  T(s, [{ text: "Rathachai Chawuthai", options: { bold: true, fontSize: 18, color: K.white, breakLine: true } }, { text: "Computer Engineering, KMITL", options: { fontSize: 14, color: "B8C4D4" } }], { x: 0.7, y: 3.55, w: 8.6, h: 0.75 });
  T(s, "SDPX-AI · Software Development Process in Practice — AI-Assisted", { x: 0.7, y: 4.5, w: 8.6, h: 0.4, fontSize: 14, color: "B8C4D4" }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "เมื่อจบคาบ นักศึกษาควรทำได้",
    "อ่านวัตถุประสงค์ทั้ง 4 ข้อ และบอกว่าข้อ 4 จะได้ลงมือทำใน lab");
  const it = ["อธิบายว่าเหตุใดในยุคที่ AI เขียน code ได้ งานตรวจสอบจึงสำคัญมากขึ้น", "ประเมิน loop ด้วยเกณฑ์ latency, fidelity และ coverage",
    "อธิบาย artifact chain และจุดที่มนุษย์ต้องอนุมัติ", "เขียน AGENTS.md ที่กำหนดคำสั่งและข้อห้ามของ repository"];
  it.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.75;
    box(s, pres, x, y, 4.4, 1.55, K.paper); chip(s, pres, x + 0.2, y + 0.2, i + 1);
    T(s, t, { x: x + 0.8, y: y + 0.2, w: 3.4, h: 1.2, fontSize: 15 }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "ถามทั้งห้อง ให้ตอบ 1 ข้อใน 4 กลุ่ม: (1) ไม่กี่วินาที editor แจ้ง (2) เมื่อรันแล้ว error (3) เมื่อเพื่อนแจ้ง (4) เมื่อผู้สอนตรวจหรือผู้ใช้แจ้ง ก่อนขึ้นสไลด์ถัดไปให้ลองถามว่ามีใครอยู่กลุ่ม 4");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "ครั้งล่าสุดที่เขียน code ผิด\nใช้เวลานานเท่าใด\nกว่าจะรู้ว่าผิด", { x: 0.7, y: 1.5, w: 8.6, h: 2.8, fontSize: 36, bold: true, color: K.white }); }

// 4 ระยะห่างของการรู้ว่าผิด
{ const s = lightSlide(pres, S0, "ระยะห่างจากกลุ่ม 1 ถึงกลุ่ม 4 คือต้นทุน",
    "ข้อผิดพลาดที่พบเร็วแก้ง่ายและต้นทุนต่ำ พบช้ายิ่งแก้ยาก เป้าหมายของวิชาคือลดระยะนี้");
  const g = ["ไม่กี่วินาที", "เมื่อรันแล้ว error", "เมื่อเพื่อนแจ้ง", "เมื่อผู้สอนหรือผู้ใช้แจ้ง"];
  const sub = ["editor แสดงข้อผิดพลาด", "", "", ""]; const fills = [K.greenT, K.tealT, K.amberT, K.redT];
  g.forEach((t, i) => { const x = 0.5 + i * 2.3; box(s, pres, x, 1.5, 2.1, 1.7, fills[i]); chip(s, pres, x + 0.15, 1.65, i + 1, K.ink);
    T(s, t, { x: x + 0.15, y: 2.2, w: 1.8, h: 0.9, fontSize: 15, bold: true }); });
  arrow(s, pres, 0.5, 9.5, 3.7, K.ink2);
  T(s, "แก้ง่าย ต้นทุนต่ำ", { x: 0.5, y: 3.85, w: 3, h: 0.3, fontSize: 12, color: K.mute });
  T(s, "แก้ยาก ต้นทุนสูง", { x: 6.5, y: 3.85, w: 3, h: 0.3, fontSize: 12, color: K.mute, align: "right" });
  T(s, "ตลอดวิชานี้ เป้าหมายคือลดระยะเวลาดังกล่าว", { x: 0.5, y: 4.4, w: 9, h: 0.4, fontSize: 16, bold: true, color: K.teal }); }

// 5 งานเปลี่ยนไปเมื่อมี AI
{ const s = lightSlide(pres, S1, "เมื่อมี AI ข้อจำกัดคือ “ตรวจไม่ทัน”",
    "ต้นทุนการเขียนลดลงมาก แต่ต้นทุนของการตัดสินใจผิดโดยไม่รู้ตัวยังเท่าเดิมหรือสูงขึ้น เพราะปริมาณ code ต่อวันมากขึ้น แนวทาง: แบ่งงานให้เล็กพอจะตรวจได้ และให้เครื่องตรวจส่วนที่ตรวจอัตโนมัติได้");
  T(s, "ก่อนมี AI", { x: 0.5, y: 1.35, w: 3, h: 0.3, fontSize: 13, bold: true, color: K.mute });
  flow(s, pres, [{ t: "คิด" }, { t: "เขียน code", sub: "ใช้เวลาส่วนใหญ่", wt: 2.2, fill: K.tealT }, { t: "ตรวจ" }], 0.5, 1.7, 9, 0.95);
  T(s, "เมื่อมี AI agent", { x: 0.5, y: 2.9, w: 3, h: 0.3, fontSize: 13, bold: true, color: K.mute });
  flow(s, pres, [{ t: "คิดและให้ context" }, { t: "เขียน" }, { t: "ตรวจและตัดสินใจ", sub: "ใช้เวลาส่วนใหญ่", wt: 2.2, fill: K.amberT }], 0.5, 3.25, 9, 0.95);
  T(s, "แนวทาง: แบ่งงานให้เล็กพอที่จะตรวจได้ และให้เครื่องตรวจในส่วนที่ตรวจอัตโนมัติได้", { x: 0.5, y: 4.5, w: 9, h: 0.4, fontSize: 14, color: K.ink2 }); }

// 6 Artifact chain
{ const s = lightSlide(pres, S1, "Artifact chain: แต่ละขั้นจบด้วยไฟล์",
    "แนวทางมาจาก The AI-native SDLC playbook ของ Anthropic (2026) ขั้นหนึ่งจบด้วยไฟล์ที่ commit ขั้นถัดไปเริ่มจากการอ่านไฟล์นั้น มนุษย์อนุมัติที่จุดเชื่อม (gate) ผลที่ตามมา: AI ทุก session เริ่มจากไฟล์เดียวกัน และ git history เป็นหลักฐานว่าใครขออะไร AI สร้างอะไร ใครอนุมัติ");
  const n = [["intent.md", "ต้องการอะไร"], ["spec.md", "ทำอะไร"], ["plan.md", "แก้ไฟล์ใด"], ["code + test", ""], ["PR + review", ""], ["deploy", ""]];
  const bw = 1.28, gap = 0.264; n.forEach((v, i) => { const x = 0.5 + i * (bw + gap);
    box(s, pres, x, 1.7, bw, 1.15, i < 3 ? K.tealT : K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: !!v[1] } }].concat(v[1] ? [{ text: v[1], options: { fontSize: 11, color: K.ink2 } }] : []),
      { x: x + 0.05, y: 1.7, w: bw - 0.1, h: 1.15, align: "center", valign: "middle" });
    if (i < 5) { arrow(s, pres, x + bw + 0.02, x + bw + gap - 0.02, 2.275);
      s.addShape(pres.ShapeType.ellipse, { x: x + bw + gap / 2 - 0.1, y: 1.45, w: 0.2, h: 0.2, fill: { color: K.amber }, line: { color: K.amber, width: 0 } }); } });
  s.addShape(pres.ShapeType.ellipse, { x: 0.5, y: 3.15, w: 0.2, h: 0.2, fill: { color: K.amber }, line: { color: K.amber, width: 0 } });
  T(s, "จุดที่มนุษย์ตรวจและอนุมัติ (gate)", { x: 0.85, y: 3.1, w: 5, h: 0.3, fontSize: 13, color: K.ink2 });
  T(s, "ปัญหาที่พบหลัง deploy ย้อนกลับไปที่ intent", { x: 0.5, y: 3.5, w: 9, h: 0.3, fontSize: 13, color: K.ink2 });
  box(s, pres, 0.5, 4.0, 9, 0.95, K.paper);
  T(s, "AI ทุก session เริ่มจากไฟล์เดียวกัน · git history เป็นหลักฐานว่าใครขออะไร AI สร้างอะไร ใครอนุมัติ", { x: 0.7, y: 4.0, w: 8.6, h: 0.95, fontSize: 14, valign: "middle" }); }

// 7 Loop Engineering
{ const s = lightSlide(pres, S1, "Loop Engineering",
    "นิยาม: ออกแบบวงจร feedback ให้สั้น เชื่อถือได้ ทำซ้ำได้ AI coding agent ทำงานตามวงจรนี้อยู่แล้ว ดังนั้นคุณภาพของงานขึ้นกับคุณภาพของขั้น Verify ที่เราจัดเตรียม");
  T(s, "การออกแบบวงจร feedback ให้สั้น เชื่อถือได้ และทำซ้ำได้ เพื่อให้ทั้งผู้พัฒนาและ AI agent ทราบโดยเร็วว่าสิ่งที่เพิ่งทำถูกต้องหรือไม่",
    { x: 0.5, y: 1.3, w: 9, h: 0.8, fontSize: 16 });
  flow(s, pres, [{ t: "Context", sub: "ข้อมูลที่มี" }, { t: "Plan", sub: "วางแผน" }, { t: "Act", sub: "ลงมือ" },
    { t: "Verify", sub: "ตรวจสอบ", fill: K.amber }, { t: "Feedback", sub: "แก้ไขและเรียนรู้" }], 0.5, 2.3, 9, 1.2, { gap: 0.25 });
  T(s, "วนกลับไปที่ Context", { x: 0.5, y: 3.6, w: 9, h: 0.3, fontSize: 12, color: K.mute, align: "right" });
  box(s, pres, 0.5, 4.05, 9, 0.9, K.amberT);
  T(s, "คุณภาพของงานที่ agent ทำได้ ขึ้นอยู่กับคุณภาพของขั้น Verify ที่เราจัดเตรียมให้", { x: 0.7, y: 4.05, w: 8.6, h: 0.9, fontSize: 16, bold: true, valign: "middle" }); }

// 8 สิ่งที่ agent มีให้ใช้
{ const s = lightSlide(pres, S1, "agent ที่ไม่มี test ย่อมไม่รู้ว่าทำพัง",
    "ผลจาก LOOP_NOTES.md ใน 0-Before ใช้ยืนยันได้ ผู้ที่ให้ agent รัน node --test ได้เองมักใช้จำนวนรอบน้อยกว่าผู้ที่ต้องคัดลอก error ไปวางเอง");
  const r = [["ไม่มี test", "agent ไม่รู้ว่าทำระบบเสียหาย และรายงานว่างานเสร็จทุกครั้ง", K.redT],
    ["test ที่ตรวจไม่จริง", "agent แก้จนผ่าน ซึ่งอาจหมายถึงแก้ test แทนแก้ code", K.redT],
    ["test ที่ช้า", "แก้ได้น้อยรอบในเวลาเท่ากัน", K.amberT],
    ["test ที่เร็วและตรวจจริง", "แก้ได้หลายรอบ และส่งงานที่ผ่านการตรวจแล้ว", K.greenT]];
  r.forEach((v, i) => { const y = 1.4 + i * 0.9; box(s, pres, 0.5, y, 9, 0.78, v[2]);
    T(s, v[0], { x: 0.7, y, w: 2.9, h: 0.78, fontSize: 15, bold: true, valign: "middle" });
    T(s, v[1], { x: 3.7, y, w: 5.6, h: 0.78, fontSize: 14, valign: "middle" }); }); }

// 8b เปรียบเทียบ 2 วิธี
{ const s = lightSlide(pres, S1, "ผลต่างจาก LOOP_NOTES.md ใน Before",
    "ผู้ที่ให้ agent รัน node --test ได้เองมักใช้จำนวนรอบน้อยกว่าผู้ที่ต้องคัดลอก error ไปวางเอง ให้ถามห้องว่ามีใครได้ผลตรงกันหรือต่างออกไป");
  const cols = [["วิธี ก: คนเป็นตัวกลาง", K.redT, K.red, ["agent เสนอการแก้ไข", "คนรัน test เอง", "คนคัดลอก error วางกลับไปให้ agent", "agent แก้ แล้ววนซ้ำ"], "ทุกรอบมีขั้นตอนของคนคั่นอยู่ จึงช้าและเสียสมาธิ"],
    ["วิธี ข: agent รันเอง", K.greenT, K.green, ["agent เสนอการแก้ไข", "agent รัน node --test เอง", "agent อ่านผลและแก้ต่อ", "ส่งงานเมื่อ test ผ่าน"], "คนตรวจเฉพาะผลสุดท้าย และใช้จำนวนรอบน้อยกว่า"]];
  cols.forEach((c, i) => { const x = 0.5 + i * 4.6; box(s, pres, x, 1.3, 4.4, 3.65, c[1]);
    T(s, c[0], { x: x + 0.25, y: 1.45, w: 3.9, h: 0.4, fontSize: 17, bold: true, color: c[2] });
    T(s, c[3].map((t, j, a) => ({ text: (j + 1) + ". " + t, options: { breakLine: j < a.length - 1, paraSpaceAfter: 6 } })), { x: x + 0.25, y: 1.95, w: 3.9, h: 1.9, fontSize: 14 });
    T(s, c[4], { x: x + 0.25, y: 3.95, w: 3.9, h: 0.9, fontSize: 14, bold: true }); }); }

// 9 สามเกณฑ์
{ const s = lightSlide(pres, S2, "วัดคุณภาพ loop ด้วย 3 เกณฑ์",
    "Latency = ใช้เวลาเท่าใดจึงทราบผล, Fidelity = ผลสะท้อนความจริงเพียงใด, Coverage = ตรวจพบข้อผิดพลาดได้กี่ประเภท");
  const c = [["Latency", "ใช้เวลาเท่าใดจึงทราบผล", "ผู้ใช้แจ้งปัญหาหลัง 3 วัน", "unit test แสดงผลใน 2 วินาที"],
    ["Fidelity", "ผลสะท้อนความจริงเพียงใด", "test ที่ผ่านเสมอไม่ว่า code จะผิดเพียงใด", "test ที่ไม่ผ่านทันทีเมื่อกฎธุรกิจถูกลบ"],
    ["Coverage", "ตรวจพบข้อผิดพลาดได้กี่ประเภท", "ตรวจเฉพาะกรณีปกติ", "ตรวจกรณีผิดพลาด การเชื่อมต่อ และประสิทธิภาพ"]];
  c.forEach((v, i) => { const x = 0.5 + i * 3.1; box(s, pres, x, 1.3, 2.9, 3.65, K.paper);
    T(s, v[0], { x: x + 0.2, y: 1.4, w: 2.5, h: 0.4, fontSize: 20, bold: true, color: K.teal });
    T(s, v[1], { x: x + 0.2, y: 1.85, w: 2.5, h: 0.6, fontSize: 13, color: K.ink2 });
    box(s, pres, x + 0.15, 2.55, 2.6, 1.05, K.redT); T(s, [{ text: "ไม่ดี", options: { bold: true, fontSize: 11, color: K.red, breakLine: true } }, { text: v[2], options: { fontSize: 12 } }], { x: x + 0.25, y: 2.55, w: 2.4, h: 1.05, valign: "middle" });
    box(s, pres, x + 0.15, 3.75, 2.6, 1.05, K.greenT); T(s, [{ text: "ดี", options: { bold: true, fontSize: 11, color: K.green, breakLine: true } }, { text: v[3], options: { fontSize: 12 } }], { x: x + 0.25, y: 3.75, w: 2.4, h: 1.05, valign: "middle" }); }); }

// 10 Fidelity vs Latency
{ const s = lightSlide(pres, S2, "Fidelity สำคัญกว่า Latency",
    "loop ที่เร็วแต่ผลไม่ตรงความจริงทำให้ทั้งคนและ AI เชื่อว่างานถูกทั้งที่ไม่ใช่ ในขณะที่การไม่มี loop อย่างน้อยรู้ว่ายังไม่ได้ตรวจ");
  T(s, "ผลตรงกับความจริง", { x: 2.8, y: 1.3, w: 3.2, h: 0.35, fontSize: 13, bold: true, align: "center", color: K.ink2 });
  T(s, "ผลไม่ตรงกับความจริง", { x: 6.2, y: 1.3, w: 3.3, h: 0.35, fontSize: 13, bold: true, align: "center", color: K.ink2 });
  T(s, "เร็ว", { x: 0.5, y: 1.75, w: 2, h: 1.5, fontSize: 18, bold: true, valign: "middle" });
  T(s, "ช้า", { x: 0.5, y: 3.4, w: 2, h: 1.5, fontSize: 18, bold: true, valign: "middle" });
  const q = [[2.8, 1.75, K.greenT, "เป้าหมายของวิชา", "unit test ที่ดี"], [6.2, 1.75, K.redT, "ควรระวังมากที่สุด", "flaky test หรือ test ที่ผ่านเสมอ"],
    [2.8, 3.4, K.paper, "ยังใช้ได้", "ทดสอบด้วยมือที่รอบคอบ"], [6.2, 3.4, K.amberT, "เทียบเท่าไม่มี loop", ""]];
  q.forEach(v => { box(s, pres, v[0], v[1], v[0] > 3 ? 3.3 : 3.2, 1.5, v[2]);
    T(s, [{ text: v[3], options: { bold: true, fontSize: 15, breakLine: !!v[4] } }].concat(v[4] ? [{ text: v[4], options: { fontSize: 13 } }] : []),
      { x: v[0] + 0.2, y: v[1], w: 2.9, h: 1.5, valign: "middle" }); }); }

// 10b flaky test
{ const s = lightSlide(pres, S2, "สัญญาณเตือน: “ให้รันใหม่อีกครั้ง”",
    "สถานการณ์ที่พบบ่อย (ไม่ใช่เหตุการณ์จริงที่มีแหล่งอ้างอิง) เมื่อทีมเลิกเชื่อผลการทดสอบ ข้อผิดพลาดจริงก็ถูกมองข้ามไปด้วย ทีมที่ดูแลเรื่องนี้จะแก้หรือลบ flaky test ทันทีที่พบ");
  T(s, "สถานการณ์ที่พบบ่อย", { x: 0.5, y: 1.3, w: 5, h: 0.3, fontSize: 12, bold: true, color: K.teal });
  box(s, pres, 0.5, 1.7, 9, 1.0, K.paper);
  T(s, "“test ตัวนั้นไม่ผ่านเป็นประจำ ให้รันใหม่อีกครั้ง”", { x: 0.8, y: 1.7, w: 8.4, h: 1.0, fontSize: 20, bold: true, valign: "middle" });
  flow(s, pres, [{ t: "test ไม่ผ่านเป็นบางครั้ง", fill: K.amberT }, { t: "ทีมรันซ้ำจนผ่าน" }, { t: "เลิกเชื่อผล test", fill: K.redT }, { t: "ข้อผิดพลาดจริงถูกมองข้าม", fill: K.redT }], 0.5, 3.1, 9, 1.0, { gap: 0.25 });
  T(s, "ทีมที่ดูแลจริงจังจะแก้หรือลบ flaky test ทันทีที่พบ", { x: 0.5, y: 4.4, w: 9, h: 0.4, fontSize: 16, bold: true, color: K.teal }); }

// 11 loop ที่จะสร้าง
{ const s = lightSlide(pres, S2, "8 บท 8 loop และไฟล์ที่เพิ่มในสาย",
    "แต่ละบทเพิ่มขั้นตรวจสอบเข้าไปใน project ของกลุ่มทีละชั้น พร้อมไฟล์ใหม่ใน artifact chain บทนี้เริ่มที่ AGENTS.md");
  const r = [["01", "Deploy", "AGENTS.md"], ["02", "Spec", "intent / spec / ADR-001"], ["03", "Unit Test", "plan.md · ADR-002"], ["04", "CI/CD", "REVIEW.md"],
    ["05", "Environment", "guards · ADR-003"], ["06", "E2E", "verifier.md"], ["07", "Performance", "ops/bands.yaml"], ["08", "Quality", "SKILL.md · LESSONS.md"]];
  r.forEach((v, i) => { const x = 0.5 + (i % 4) * 2.3, y = 1.4 + Math.floor(i / 4) * 1.8; const me = i === 0;
    box(s, pres, x, y, 2.1, 1.6, me ? K.teal : K.paper);
    T(s, v[0], { x: x + 0.15, y: y + 0.12, w: 1.8, h: 0.35, fontSize: 13, bold: true, color: me ? K.amberT : K.teal });
    T(s, v[1], { x: x + 0.15, y: y + 0.5, w: 1.8, h: 0.4, fontSize: 17, bold: true, color: me ? K.white : K.ink });
    T(s, v[2], { x: x + 0.15, y: y + 0.95, w: 1.85, h: 0.55, fontSize: 11, color: me ? K.white : K.ink2, fontFace: "Courier New" }); }); }

// 12 Deploy loop
{ const s = lightSlide(pres, S2, "Deploy Loop ของสัปดาห์นี้",
    "ใน lab แต่ละกลุ่มจะวัด commit-to-live time ขั้น Verify ตอนนี้ยังเป็นการเปิดดูด้วยตนเอง ซึ่งช้าและตรวจไม่ครบ บทต่อไปจะแทนด้วยการตรวจอัตโนมัติ");
  flow(s, pres, [{ t: "แก้ code" }, { t: "git push" }, { t: "CI ตรวจ build" }, { t: "deploy อัตโนมัติ" }, { t: "เปิดดูบน URL", fill: K.amberT }], 0.5, 1.6, 9, 1.1, { gap: 0.25 });
  box(s, pres, 0.5, 3.2, 9, 1.7, K.ink);
  T(s, "commit-to-live time", { x: 0.8, y: 3.35, w: 8.4, h: 0.4, fontSize: 18, bold: true, color: K.amber });
  T(s, "เวลาตั้งแต่ push จนถึงเห็นการเปลี่ยนแปลงบน URL  ·  แต่ละกลุ่มจะวัดใน lab", { x: 0.8, y: 3.85, w: 8.4, h: 0.4, fontSize: 15, color: K.white });
  T(s, "ขั้น Verify ตอนนี้ยังเป็นการเปิดดูด้วยตนเอง", { x: 0.8, y: 4.3, w: 8.4, h: 0.4, fontSize: 13, color: "B8C4D4" }); }

// 13 หลักการ 4 ข้อ
{ const s = lightSlide(pres, S2, "หลักการที่ใช้ตลอดวิชา",
    "ข้อ 4: ทำด้วยมือก่อนแล้วจึงทำให้อัตโนมัติ บทที่ 1–3 เน้นทำทีละขั้น บทที่ 4–8 เปลี่ยนขั้นเดิมให้เป็นการตรวจอัตโนมัติ");
  const p = [["เตรียมขั้นตรวจก่อนเร่งการเขียน", "ไม่ให้ AI เขียนจำนวนมากทั้งที่ยังไม่มีวิธีตรวจ"], ["ทำ loop ให้ครบก่อนขยายงาน", "commit ถึง deploy ต้องทำงานก่อนเพิ่ม feature"],
    ["จุดที่มนุษย์ตรวจเป็นส่วนหนึ่งของ loop", "กำหนดว่า agent ต้องหยุดให้คนตรวจที่จุดใด"], ["ทำด้วยมือก่อน แล้วค่อยทำให้อัตโนมัติ", "ขั้นที่ยังไม่เข้าใจ ไม่ควรให้ระบบทำแทน"]];
  p.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.85; box(s, pres, x, y, 4.4, 1.7, K.paper); chip(s, pres, x + 0.2, y + 0.2, i + 1);
    T(s, v[0], { x: x + 0.8, y: y + 0.18, w: 3.4, h: 0.7, fontSize: 15, bold: true });
    T(s, v[1], { x: x + 0.8, y: y + 0.95, w: 3.4, h: 0.65, fontSize: 13, color: K.ink2 }); }); }

// 14 Replit
caseSlide(pres, S2, { title: "กรณีจริง: agent ที่ไม่มีจุดให้คนอนุมัติ", tag: "Replit × SaaStr · กรกฎาคม 2025",
  notes: "ผู้ก่อตั้ง SaaStr ทดลองกับ AI agent ของ Replit สั่ง code freeze แล้ว agent ยังลบ database จริงทั้งหมด ตามที่ผู้ใช้รายงาน agent ให้ข้อมูลกู้คืนที่ไม่ถูกต้อง และระบบใช้ database เดียวกันทั้งทดสอบและใช้งานจริง CEO ยอมรับและประกาศแยก database",
  facts: ["สั่ง code freeze ไว้แล้ว แต่ agent ยังลบ database ที่ใช้งานจริง", "ตามที่ผู้ใช้รายงาน agent ให้ข้อมูลการกู้คืนไม่ถูกต้อง", "ขณะนั้นใช้ database เดียวกันทั้งทดสอบและใช้งานจริง", "CEO ประกาศแยก database ของการพัฒนาออกจากการใช้งานจริง"],
  principle: "หลักการข้อ 3", takeaway: "ปัญหาไม่ได้อยู่ที่ AI ทำผิดเพียงอย่างเดียว แต่ agent เข้าถึงระบบจริงโดยไม่มีจุดที่ต้องให้คนอนุมัติ",
  refs: "อ้างอิง: Fortune (23 ก.ค. 2025) · heise online · AI Incident Database" });

// 15 Context
{ const s = lightSlide(pres, S3, "Context Engineering",
    "ผลลัพธ์ของ AI ขึ้นกับข้อมูลใน context ขณะนั้นมากกว่าถ้อยคำของคำสั่ง");
  const r = [["เขียนไว้ให้อ่านซ้ำได้", "AGENTS.md และ docs/"], ["ให้เท่าที่จำเป็น", "ระบุไฟล์ที่เกี่ยวข้อง ไม่ใช่ทั้ง repo"], ["ให้ข้อมูลจริง", "วางผลรัน test โดยตรง"], ["ปรับปรุงเมื่อข้อมูลเปลี่ยน", "แก้เอกสารเมื่อเปลี่ยนการตัดสินใจ"]];
  r.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.8; box(s, pres, x, y, 4.4, 1.6, K.paper);
    T(s, v[0], { x: x + 0.25, y: y + 0.2, w: 3.9, h: 0.5, fontSize: 17, bold: true, color: K.teal });
    T(s, [{ text: "ในวิชานี้: ", options: { bold: true } }, { text: v[1] }], { x: x + 0.25, y: y + 0.85, w: 3.9, h: 0.65, fontSize: 14 }); }); }

// 16 AGENTS.md
{ const s = lightSlide(pres, S3, "AGENTS.md ไฟล์แรกของ artifact chain",
    "ฉบับเต็มอยู่ใน 1-Lecture.md ข้อห้ามเรื่องการแก้ test สำคัญเป็นพิเศษ เพราะกันไม่ให้ agent ทำให้ test ผ่านด้วยวิธีที่ทำให้การตรวจไม่มีความหมาย ให้นักศึกษาลองหาว่าบรรทัดใดควรปรับกับ project ของกลุ่ม");
  box(s, pres, 0.5, 1.3, 5.3, 3.65, K.ink);
  const code = ["# AGENTS.md", "", "## Commands", "- install: npm ci", "- lint / build / test", "", "## Rules", "- test ไม่ผ่าน: แก้ code", "  ห้ามแก้หรือลบ test", "- ห้ามใส่ความลับในไฟล์", "- ห้ามแก้ docs/adr/ เอง", "", "## Known mistakes", "- (เพิ่มเมื่อ AI ผิดซ้ำ 2 ครั้ง)"];
  T(s, code.map((l, i) => ({ text: l, options: { breakLine: i < code.length - 1 } })), { x: 0.75, y: 1.45, w: 4.9, h: 3.4, fontSize: 12, fontFace: "Courier New", color: "E6EDF5" });
  const r = [["ยาวไม่เกิน 1 หน้า", "ไฟล์ยาวทำให้ AI ให้น้ำหนักแต่ละข้อน้อยลง"], ["ผิดซ้ำ 2 ครั้ง เพิ่ม 1 บรรทัด", "ความรู้ของทีมสะสมในไฟล์"], ["แก้ผ่าน PR เท่านั้น", "กติกาของ AI มีผลกับทุกคน"]];
  r.forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.05, y, 3.45, 1.15, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: v[1], options: { fontSize: 12, color: K.ink2 } }], { x: 6.2, y, w: 3.2, h: 1.15, valign: "middle" }); }); }

// 16b AGENTS.md ดี/ไม่ดี
{ const s = lightSlide(pres, S3, "กติกาที่ AI นำไปใช้ได้ ต้องเจาะจง",
    "ตัวอย่างที่ไม่ดีคือข้อความกว้างจน AI ตีความได้หลายแบบ ตัวอย่างที่ดีบอกคำสั่งหรือข้อห้ามที่ตรวจได้ ให้นักศึกษาลองเขียนกติกา 1 ข้อให้เจาะจงขึ้นก่อนถึงเวลา lab");
  const r = [["หลักการ", "ระบุคำสั่งที่รันได้จริง และข้อห้ามที่ตรวจได้", K.tealT, K.teal, null],
    ["ไม่ดี", "“เขียน code ให้ดี และทดสอบด้วย”", K.redT, K.red, "ไม่บอกว่ารันคำสั่งใด และ “ดี” คืออะไร"],
    ["ดี", "“รัน npm run lint และ npm test ให้ผ่านก่อนเสนอการแก้ไข”", K.greenT, K.green, "agent รันเองได้ และผ่านหรือไม่ชัดเจน"],
    ["ไม่ดี", "“อย่าทำให้ระบบพัง”", K.redT, K.red, "ไม่ระบุว่าอะไรคือการทำให้พัง"],
    ["ดี", "“ห้ามแก้หรือลบ test เพื่อให้ผ่าน”", K.greenT, K.green, "ตรวจได้จาก diff ของ PR"]];
  r.forEach((v, i) => { const y = 1.3 + i * 0.74; box(s, pres, 0.5, y, 9, 0.66, v[2]);
    T(s, v[0], { x: 0.7, y, w: 1.0, h: 0.66, fontSize: 13, bold: true, color: v[3], valign: "middle" });
    T(s, v[1], { x: 1.75, y, w: 4.5, h: 0.66, fontSize: 13, valign: "middle", bold: i === 0 });
    if (v[4]) T(s, v[4], { x: 6.3, y, w: 3.1, h: 0.66, fontSize: 12, color: K.ink2, valign: "middle" }); }); }

// 17 Amazon Q
caseSlide(pres, S3, { title: "กรณีจริง: คำสั่งของ AI ก็เป็น code ที่ต้องตรวจ", tag: "Amazon Q Developer (VS Code) · กรกฎาคม 2025",
  notes: "มีผู้ส่ง code ที่ฝังคำสั่งให้ AI agent ลบไฟล์ในเครื่องและ resource บน AWS เข้าไปใน repository ถูกปล่อยในเวอร์ชัน 1.84.0 AWS แถลงว่าคำสั่งเขียนผิดรูปแบบจึงไม่ทำงานและไม่มีลูกค้าได้รับผลกระทบ แต่นักวิจัยบางส่วนโต้แย้ง",
  facts: ["ผู้ส่ง code ฝังคำสั่งให้ AI ลบไฟล์ในเครื่องและ resource บน AWS", "ไม่ถูกตรวจพบ และถูกปล่อยออกในเวอร์ชัน 1.84.0", "AWS แถลงว่าคำสั่งเขียนผิดรูปแบบจึงไม่ทำงาน และไม่มีลูกค้าได้รับผลกระทบ", "นักวิจัยบางส่วนโต้แย้งข้อสรุปนี้"],
  principle: "เหตุผลที่ AGENTS.md แก้ผ่าน PR", takeaway: "ข้อความที่ใช้สั่ง AI มีผลเท่ากับ code จึงต้องผ่านการ review เช่นเดียวกัน",
  refs: "อ้างอิง: CyberInsider · TechRadar · Nudge Security" });

// 18 ขอบเขตการใช้ AI
{ const s = lightSlide(pres, S3, "ขอบเขตการใช้ AI ในวิชานี้",
    "ผู้ที่กด merge เป็นผู้รับผิดชอบ code นั้น ไม่ว่าผู้เขียนจะเป็นคนหรือ AI ตอนนำเสนอ กลุ่มต้องอธิบายเหตุผลของกติกาและการตัดสินใจเกี่ยวกับ AI ด้วยคำของตนเอง automation bias คือยิ่ง AI ตอบคล่อง ผู้ใช้ยิ่งตรวจน้อยลง");
  box(s, pres, 0.5, 1.3, 3.6, 3.65, K.greenT); T(s, "ใช้ได้", { x: 0.75, y: 1.45, w: 3, h: 0.4, fontSize: 18, bold: true, color: K.green });
  T(s, ["สร้างโครงสร้างและ code ซ้ำซาก", "อธิบาย error และช่วยหาสาเหตุ", "เสนอหลายแนวทางเพื่อเปรียบเทียบ", "ร่าง test และเอกสาร"].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 } })), { x: 0.75, y: 1.95, w: 3.15, h: 2.9, fontSize: 14 });
  box(s, pres, 4.3, 1.3, 5.2, 3.65, K.amberT); T(s, "ต้องระมัดระวัง", { x: 4.55, y: 1.45, w: 4, h: 0.4, fontSize: 18, bold: true, color: "B5651D" });
  T(s, ["ไม่ commit code ที่อธิบายไม่ได้", "ไม่ส่ง API key รหัสผ่าน ข้อมูลส่วนบุคคลเข้า AI", "AI อาจอ้าง function หรือ library ที่ไม่มีจริง", "code จาก AI อาจมีช่องโหว่ ต้องตรวจเสมอ", "automation bias: AI ตอบคล่อง คนยิ่งตรวจน้อย"].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 } })), { x: 4.55, y: 1.95, w: 4.7, h: 2.9, fontSize: 14 }); }

// 19 package hallucination
{ const s = lightSlide(pres, S3, "package ที่ AI แนะนำอาจไม่มีอยู่จริง",
    "งานวิจัยวิเคราะห์ code จาก AI 16 model จำนวน 576,000 ตัวอย่าง ผู้ไม่หวังดีสามารถจดทะเบียน package ตามชื่อที่ AI มักแต่งขึ้นเพื่อให้ผู้ที่ติดตั้งตาม AI ได้ code อันตราย ต้องตรวจกับเอกสารทางการก่อนติดตั้ง");
  box(s, pres, 0.5, 1.4, 4.4, 2.9, K.paper); box(s, pres, 5.1, 1.4, 4.4, 2.9, K.paper);
  T(s, "5.2%", { x: 0.5, y: 1.7, w: 4.4, h: 1.2, fontSize: 60, bold: true, color: K.teal, align: "center" });
  T(s, "model เชิงพาณิชย์ (อย่างน้อย)", { x: 0.5, y: 3.1, w: 4.4, h: 0.5, fontSize: 14, align: "center" });
  T(s, "21.7%", { x: 5.1, y: 1.7, w: 4.4, h: 1.2, fontSize: 60, bold: true, color: K.red, align: "center" });
  T(s, "model แบบ open source", { x: 5.1, y: 3.1, w: 4.4, h: 0.5, fontSize: 14, align: "center" });
  T(s, "สัดส่วน package ที่แนะนำแล้วไม่มีอยู่จริง · 16 model · 576,000 ตัวอย่าง", { x: 0.5, y: 4.5, w: 9, h: 0.35, fontSize: 14, color: K.ink2 });
  ref(s, "อ้างอิง: Spracklen et al., USENIX Security 2025, arXiv:2406.10279"); }

// 20 METR
{ const s = lightSlide(pres, S3, "กรณีจริง: รู้สึกว่าเร็วขึ้น แต่วัดแล้วช้าลง",
    "METR ก.พ.–มิ.ย. 2025 นักพัฒนา open source ที่มีประสบการณ์ 16 คน 246 งาน สุ่มว่างานใดใช้ AI ได้ ผู้วิจัยระบุว่าผลอาจเปลี่ยนเมื่อเครื่องมือพัฒนาขึ้น และไม่ควรสรุปกับงานทุกประเภท ข้อสรุปที่ใช้: ความรู้สึกว่าเร็วไม่ใช่หลักฐาน ต้องวัดจริง เช่น commit-to-live time");
  const st = [["+24%", "ที่คาดว่าจะเร็วขึ้น", K.tealT, K.teal], ["+20%", "ที่เชื่อว่าเร็วขึ้นหลังทำเสร็จ", K.tealT, K.teal], ["+19%", "เวลาที่ใช้จริง “นานขึ้น”", K.redT, K.red]];
  st.forEach((v, i) => { const x = 0.5 + i * 3.1; box(s, pres, x, 1.35, 2.9, 2.3, v[2]);
    T(s, v[0], { x, y: 1.5, w: 2.9, h: 1.1, fontSize: 48, bold: true, color: v[3], align: "center" });
    T(s, v[1], { x: x + 0.2, y: 2.7, w: 2.5, h: 0.8, fontSize: 14, align: "center" }); });
  T(s, "นักพัฒนา 16 คน · 246 งาน · สุ่มว่างานใดใช้ AI ได้", { x: 0.5, y: 3.85, w: 9, h: 0.35, fontSize: 14, color: K.ink2 });
  box(s, pres, 0.5, 4.3, 9, 0.65, K.amberT);
  T(s, "ความรู้สึกว่าเร็วไม่ใช่หลักฐาน ต้องวัดจริง", { x: 0.7, y: 4.3, w: 8.6, h: 0.65, fontSize: 16, bold: true, valign: "middle" });
  ref(s, "อ้างอิง: Becker et al., arXiv:2507.09089 · ITPro"); }

// 21 ลำดับการทำงานกับ AI
{ const s = lightSlide(pres, S3, "ลำดับการทำงานกับ AI ที่แนะนำ",
    "ผู้ที่กด merge เป็นผู้รับผิดชอบ code นั้น ไม่ว่าผู้เขียนจะเป็นคนหรือ AI");
  flow(s, pres, [{ t: "คิดแนวทางเอง" }, { t: "กำหนดวิธีตรวจ", sub: "ว่าอะไรคือถูก", fill: K.amberT }, { t: "ให้ AI ร่าง" }, { t: "อ่านและอธิบาย", sub: "ทุกบรรทัด", fill: K.amberT }, { t: "แก้ส่วนที่ไม่เห็นด้วย" }, { t: "commit เฉพาะ", sub: "ส่วนที่อธิบายได้", fill: K.greenT }], 0.5, 1.9, 9, 1.4, { gap: 0.22, fs: 13, sfs: 11 });
  T(s, "ผู้ที่กด merge เป็นผู้รับผิดชอบ code นั้น ไม่ว่าผู้เขียนจะเป็นคนหรือ AI", { x: 0.5, y: 3.8, w: 9, h: 0.5, fontSize: 16, bold: true, color: K.teal }); }

// 22 สรุป
{ const s = darkSlide(pres, S4, "สรุป 4 ข้อ ปิดท้ายด้วยการเชื่อมไปสู่ lab: วัด commit-to-live time ของกลุ่มตนเอง");
  T(s, "สรุป", { x: 0.7, y: 0.5, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["ถามว่าใช้เวลานานเท่าใดจึงรู้ว่าผิด และผลการตรวจเชื่อถือได้เพียงใด", "คุณภาพของ loop วัดจาก latency, fidelity, coverage โดย fidelity สำคัญที่สุด",
    "AI agent ทำงานได้ดีเท่ากับขั้นตรวจสอบและ context ที่จัดเตรียมให้", "แต่ละขั้นจบด้วยไฟล์ที่ commit ขั้นถัดไปอ่านไฟล์นั้น มนุษย์อนุมัติที่จุดเชื่อม"];
  r.forEach((t, i) => { const y = 1.35 + i * 0.95; chip(s, pres, 0.7, y + 0.1, i + 1, K.amber, K.ink); T(s, t, { x: 1.35, y, w: 8, h: 0.7, fontSize: 17, color: K.white, valign: "middle" }); }); }

// Glossary
const GL = [["Loop", "วงจร feedback: ทำ แล้วตรวจ แล้วนำผลมาแก้ซ้ำ"], ["Verify", "ขั้นตรวจสอบใน loop เช่น test, CI, การเปิดดูเว็บจริง"], ["Latency", "เวลาที่ใช้กว่าจะทราบผลการตรวจ"],
  ["Fidelity", "ความตรงของผลตรวจกับความจริง"], ["Coverage", "จำนวนประเภทข้อผิดพลาดที่ตรวจพบได้"], ["Artifact chain", "สายไฟล์ที่ commit ไว้ในแต่ละขั้น ขั้นถัดไปอ่านต่อ"],
  ["Gate", "จุดเชื่อมระหว่างขั้นที่มนุษย์ตรวจและอนุมัติ"], ["AGENTS.md", "ไฟล์กติกาของ repository ที่ AI agent อ่านทุกครั้ง"], ["Context engineering", "การจัดข้อมูลที่ AI ต้องใช้ให้ครบ จำเป็น จริง และทันสมัย"],
  ["commit-to-live time", "เวลาตั้งแต่ push จนเห็นการเปลี่ยนแปลงบน URL จริง"], ["Flaky test", "test ที่ผลไม่คงที่ ผ่านบ้างไม่ผ่านบ้างโดย code ไม่เปลี่ยน"], ["Automation bias", "ยิ่ง AI ตอบคล่อง ผู้ใช้ยิ่งตรวจน้อยลง"]];
[0, 6].forEach((k, n) => { const s = lightSlide(pres, S6, "Glossary (" + (n + 1) + "/2)", "ใช้เปิดกลับมาทบทวนคำศัพท์ของบทนี้ ศัพท์ที่เหลือของวิชาจะเพิ่มในบทถัดไป");
  GL.slice(k, k + 6).forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.1, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 15, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 13 } }], { x: x + 0.2, y, w: 4.0, h: 1.1, valign: "middle" }); }); });

// L1 หัวข้อ lab
{ const s = darkSlide(pres, S5, "เปลี่ยนจากบรรยายเป็นลงมือ lab เป็นงานกลุ่ม ใช้ project ของกลุ่มตาม PROJECT.md และต่อเนื่องไปทุกบท");
  T(s, "Lab", { x: 0.7, y: 1.1, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "สร้าง Deploy Loop\nให้ครบรอบ", { x: 0.7, y: 1.7, w: 8.6, h: 1.6, fontSize: 38, bold: true, color: K.white });
  T(s, "push เข้า main → CI ตรวจ → deploy อัตโนมัติ → วัด commit-to-live time", { x: 0.7, y: 3.8, w: 8.6, h: 0.5, fontSize: 16, color: "B8C4D4" }); }

// L2 brief
{ const s = lightSlide(pres, S5, "Brief ของ lab: ทำอะไรและได้อะไร",
    "รูปแบบ: งานกลุ่ม สมาชิกผลัดกันเป็นผู้ลงมือในแต่ละขั้น และทุกคนอ่านสิ่งที่เกิดบนหน้าจอ ทุกคนต้องทำ 0-Before ส่วน B และ C เสร็จก่อนเริ่ม หากใครติดตั้งไม่ครบให้ใช้เครื่องเพื่อนไปก่อน");
  const c = [["รูปแบบ", "งานกลุ่ม · ผลัดกันลงมือ · ทุกคนอ่านผลบนหน้าจอ"], ["เป้าหมาย", "push เข้า main แล้ว CI ตรวจ และ deploy ขึ้นเว็บจริงอัตโนมัติ"], ["สิ่งที่วัด", "commit-to-live time ของกลุ่ม"], ["ต้องมีก่อนเริ่ม", "0-Before ส่วน B และ C ของสมาชิกทุกคน"]];
  c.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.65; box(s, pres, x, y, 4.4, 1.5, K.paper);
    T(s, v[0], { x: x + 0.25, y: y + 0.15, w: 3.9, h: 0.35, fontSize: 13, bold: true, color: K.teal });
    T(s, v[1], { x: x + 0.25, y: y + 0.55, w: 3.9, h: 0.85, fontSize: 15 }); });
  T(s, "ผลงานวันนี้เป็นพื้นฐานของ lab ทุกบทถัดไป", { x: 0.5, y: 4.7, w: 9, h: 0.35, fontSize: 14, bold: true, color: K.ink2 }); }

// L3 7 ขั้นตอน
{ const s = lightSlide(pres, S5, "7 ขั้นตอนของ lab",
    "ทุกขั้นมีหัวข้อ ทำ / ผลที่ควรเห็น / หากติดปัญหา ใน 2-Lab.md ให้สมาชิกผลัดกันเป็นผู้ลงมือ ขั้น 3 คือที่เขียน AGENTS.md ของกลุ่ม ขั้น 7 คือการวัดเวลาและเตรียมหลักฐาน");
  const st = [["1", "สร้าง repository เปล่า", "Public · บัญชีส่วนตัว · เพิ่ม collaborator"], ["2", "สร้างโครง Next.js", "แก้ .gitignore แล้ว push"], ["3", "เขียน context ให้ AI", "tech-stack · .env.example · PROJECT · AGENTS.md"],
    ["4", "สร้างหน้าแรกด้วย AI", "สั่งให้อ่าน AGENTS.md ก่อน"], ["5", "ตั้งค่า CI และ deploy", "GitHub Actions + Vercel"], ["6", "PR แรกของทุกคน", "สมาชิกทุกคนเปิด PR อย่างน้อย 1 รายการ"], ["7", "วัดเวลาและเตรียมหลักฐาน", "commit-to-live · break-it-live · evidence"]];
  st.forEach((v, i) => { const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4, x = 0.5 + col * 4.6, y = 1.3 + row * 0.9;
    box(s, pres, x, y, 4.4, 0.8, i === 6 ? K.amberT : K.paper); chip(s, pres, x + 0.15, y + 0.19, v[0], i === 6 ? K.amber : K.teal, i === 6 ? K.ink : K.white);
    T(s, [{ text: v[1], options: { bold: true, fontSize: 14, breakLine: true } }, { text: v[2], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.75, y, w: 3.55, h: 0.8, valign: "middle" }); });
  box(s, pres, 5.1, 3.1 + 0.9, 4.4, 0.8, K.ink); T(s, "แต่ละขั้น: ทำ → ผลที่ควรเห็น → หากติดปัญหา", { x: 5.25, y: 4.0, w: 4.1, h: 0.8, fontSize: 13, color: K.white, valign: "middle" }); }

// L4 repo structure
{ const s = lightSlide(pres, S5, "repository ที่จะได้เมื่อจบบทนี้",
    "ตัวเลขหลังชื่อไฟล์ในเอกสาร lab คือขั้นตอนที่สร้างไฟล์นั้น PROJECT.md เป็นสำเนาจากรายวิชา ห้ามแก้");
  box(s, pres, 0.5, 1.3, 5.3, 3.65, K.ink);
  const t = ["sdpx-[ชื่อกลุ่ม]/", "├── AGENTS.md        ← 3.4", "├── PROJECT.md       ← 3.3", "├── README.md        ← 2.1, 6", "├── .env.example     ← 3.2", "├── docs/tech-stack.md   ← 3.1", "├── evidence/ws-01.md    ← 7.3", "├── .github/workflows/ci.yml ← 5.1", "└── src/             ← 2.1, 4"];
  T(s, t.map((l, i) => ({ text: l, options: { breakLine: i < t.length - 1 } })), { x: 0.7, y: 1.5, w: 5.0, h: 3.3, fontSize: 12, fontFace: "Courier New", color: "E6EDF5" });
  const r = [["ห้าม commit", ".env ที่มีค่าจริง"], ["ต้องมีเสมอ", ".env.example ที่มีเฉพาะชื่อตัวแปร"], ["ตรวจได้ทันที", "เปิด GitHub กด t แล้วพิมพ์ .env"]];
  r.forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.05, y, 3.45, 1.15, i === 0 ? K.redT : K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: v[1], options: { fontSize: 12, color: K.ink2 } }], { x: 6.2, y, w: 3.2, h: 1.15, valign: "middle" }); }); }

// L5 break-it-live
{ const s = lightSlide(pres, S5, "break-it-live: พิสูจน์ว่า loop ตรวจพบความผิด",
    "สร้าง PR ที่ CI ไม่ผ่านโดยตั้งใจ เพื่อแสดงว่า loop ตรวจพบก่อนถึงเว็บจริง ใส่ const n: number = 'a'; ท้าย src/app/page.tsx แล้วเปิด PR รอ CI เป็นสีแดง เปิด Live URL ยืนยันว่ายังเป็นเวอร์ชันเดิม แล้วปิด PR โดยไม่ merge");
  flow(s, pres, [{ t: "branch demo/broken-build" }, { t: "ใส่ type ผิด", sub: "const n: number = “a”" }, { t: "เปิด PR", sub: "CI เป็นสีแดง", fill: K.redT }, { t: "เปิด Live URL", sub: "ยังเป็นเวอร์ชันเดิม", fill: K.greenT }, { t: "ปิด PR", sub: "ไม่ merge", fill: K.amberT }], 0.5, 1.7, 9, 1.5, { gap: 0.22, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.7, 9, 1.2, K.paper);
  T(s, "สิ่งที่พิสูจน์ได้: ความผิดถูกหยุดที่ CI ก่อนถึงผู้ใช้ ไม่ต้องรอให้ผู้ใช้แจ้ง", { x: 0.75, y: 3.7, w: 8.5, h: 1.2, fontSize: 16, bold: true, valign: "middle" }); }

// L6 evidence
{ const s = lightSlide(pres, S5, "หลักฐานที่ต้องบันทึกใน evidence/ws-01.md",
    "ตาราง AI เสนอแต่ไม่รับต้องมีอย่างน้อย 2 แถว เป็นหลักฐานว่ากลุ่มตรวจงาน AI จริง ไม่ได้รับทุกอย่าง");
  const r = [["Live URL", "ลิงก์เว็บจริงของกลุ่ม"], ["Commit-to-live time", "เวลาจากการซ้อม (นาที วินาที)"], ["Break-it-live", "ลิงก์ PR ที่ CI ไม่ผ่านและปิดแล้ว"], ["AI เสนอแต่ไม่รับ", "ตาราง “AI เสนอ / เหตุผลที่ไม่รับ” อย่างน้อย 2 แถว"], ["Retro", "ตอบ 3 ข้อสั้น ๆ ท้ายไฟล์"]];
  r.forEach((v, i) => { const y = 1.3 + i * 0.74; box(s, pres, 0.5, y, 9, 0.66, i === 3 ? K.amberT : K.paper);
    T(s, v[0], { x: 0.75, y, w: 3.0, h: 0.66, fontSize: 14, bold: true, valign: "middle" });
    T(s, v[1], { x: 3.9, y, w: 5.4, h: 0.66, fontSize: 14, valign: "middle" }); }); }

// L7 การวัดผล
{ const s = lightSlide(pres, S5, "การวัดผล: Present 7 ขั้นตอน",
    "เวลา 5 นาทีต่อกลุ่ม ผู้ตรวจเปิดและทดลองบนเครื่องของตนเอง ไม่มีการให้คะแนน แต่ละขั้นมีเกณฑ์ผ่านที่ตรวจได้ ขั้น 2 ผู้ตรวจเป็นผู้กำหนดข้อความและจับเวลา ขั้น 3 และ 4 กลุ่มต้องอธิบายด้วยคำของตนเอง");
  const r = [["1", "เปิด Live URL", "ผู้ตรวจเปิดบนเครื่องตนเองแล้วเห็นหน้าแรก"], ["2", "ผู้ตรวจกำหนดข้อความใหม่ กลุ่ม push", "ข้อความขึ้นเว็บจริง และ CI เป็นสีเขียว"],
    ["3", "เลือกกติกาใน AGENTS.md 1 ข้อ", "อธิบายด้วยคำของกลุ่มว่าป้องกันปัญหาใด"], ["4", "เลือกข้อเสนอ AI ที่ไม่รับ 1 ข้อ", "อธิบายเหตุผลที่ไม่รับด้วยคำของกลุ่ม"],
    ["5", "GitHub กด t พิมพ์ .env", "เห็นเฉพาะ .env.example"], ["6", "เปิด PR break-it-live", "CI สีแดง และเว็บจริงยังเป็นเวอร์ชันเดิม"], ["7", "รายการ PR ที่ merge แล้ว", "สมาชิกทุกคนเปิด PR อย่างน้อย 1 รายการ"]];
  T(s, "ขั้นตอน", { x: 1.0, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute }); T(s, "เกณฑ์ผ่าน", { x: 5.3, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  r.forEach((v, i) => { const y = 1.48 + i * 0.5; box(s, pres, 0.5, y, 9, 0.46, i % 2 ? K.white : K.paper); chip(s, pres, 0.55, y + 0.04, v[0], K.teal, K.white, 0.38);
    T(s, v[1], { x: 1.05, y, w: 4.1, h: 0.46, fontSize: 12, valign: "middle", bold: true }); T(s, v[2], { x: 5.3, y, w: 4.1, h: 0.46, fontSize: 12, valign: "middle" }); }); }

// L8 Retro
{ const s = lightSlide(pres, S5, "Retro: ปรึกษากันแล้วบันทึกท้าย evidence",
    "ให้แต่ละกลุ่มตอบสั้น ๆ 3 ข้อ ข้อ 3 เชื่อมไปยังบทถัดไป เพราะขั้นที่ทำด้วยมือและใช้เวลามากที่สุดคือสิ่งที่บทหลัง ๆ จะเปลี่ยนเป็นการตรวจอัตโนมัติ");
  const q = ["ขณะนี้ loop ของกลุ่มมีขั้นตรวจสอบอะไรบ้าง", "หากการ deploy ครั้งถัดไปทำให้เว็บใช้งานไม่ได้ กลุ่มจะทราบเมื่อใดและทราบได้อย่างไร", "ขั้นตอนใดวันนี้ยังทำด้วยมือและใช้เวลามากที่สุด ควรเปลี่ยนเป็นการตรวจอัตโนมัติในบทใด"];
  q.forEach((t, i) => { const y = 1.4 + i * 1.15; box(s, pres, 0.5, y, 9, 1.0, K.paper); chip(s, pres, 0.75, y + 0.29, i + 1);
    T(s, t, { x: 1.4, y, w: 7.9, h: 1.0, fontSize: 16, valign: "middle" }); }); }

L.save(pres, "../WS-01-deploy/1-Lecture.pptx").then(() => console.log("saved"));
