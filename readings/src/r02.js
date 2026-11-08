const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, ref, rowsTable } = L;
const S0 = "เปิดบท", S1 = "ความเสี่ยงคืออะไร", S2 = "วงจรและการประเมิน", S3 = "วิธีตอบสนอง", S4 = "ความเสี่ยงในโครงการ", S5 = "ความเสี่ยงจาก AI", S6 = "เทคนิคและ register", S7 = "สรุป", S8 = "Glossary", S9 = "Ref";
const pres = L.newDeck("Risk Management สำหรับงานซอฟต์แวร์", [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9]);
const dash = (s, x, y, w, h, color = K.mute, arrowEnd = true) => s.addShape(pres.ShapeType.line, { x, y, w, h, line: { color, width: 1.5, dashType: "dash", endArrowType: arrowEnd ? "triangle" : undefined } });
const vline = (s, x, y1, y2, color = K.mute, head = true) => s.addShape(pres.ShapeType.line, { x, y: y1, w: 0, h: y2 - y1, line: { color, width: 1.5, endArrowType: head ? "triangle" : undefined } });
const numRow = (s, i, text, x, y, w, h, fs = 14, fill = K.paper) => { box(s, pres, x, y, w, h, fill); chip(s, pres, x + 0.15, y + (h - 0.42) / 2, i, K.teal, K.white, 0.42); T(s, text, { x: x + 0.75, y, w: w - 0.9, h, fontSize: fs, valign: "middle" }); };

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดบท Risk Management สำหรับงานซอฟต์แวร์ บทนี้ว่าด้วยวิธีมองความเสี่ยงให้เป็นเรื่องที่จัดการได้ ตั้งแต่การเขียนประโยคความเสี่ยง การประเมิน การเลือกวิธีตอบสนอง ไปจนถึงความเสี่ยงแบบใหม่ที่มากับ AI agent");
  s.addShape(pres.ShapeType.roundRect, { x: 0.7, y: 1.35, w: 0.9, h: 0.09, fill: { color: K.amber }, line: { color: K.amber, width: 0 }, rectRadius: 0.04 });
  T(s, "Risk Management\nสำหรับงานซอฟต์แวร์", { x: 0.7, y: 1.7, w: 8.6, h: 1.8, fontSize: 40, bold: true, color: K.white });
  T(s, "Reading 02", { x: 0.7, y: 3.8, w: 8, h: 0.5, fontSize: 20, color: "B8C4D4" }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "อ่านแล้วจะได้อะไร", "บทนี้มีเป้าหมาย 5 ข้อ ให้ดูว่าแต่ละข้อใช้ในงานจริงอย่างไร เช่น ถ้าปนคำว่า risk กับ issue ทีมจะรายงานสถานะผิด และเรื่อง AI agent เป็นหัวข้อที่มักถูกถามในการสัมภาษณ์งาน");
  const it = [["แยก risk, issue และ assumption", "ทีมที่ปนสามคำนี้จะรายงานสถานะผิด"], ["ทำ risk register ที่ใช้งานได้จริง", "ผู้บริหารมักเปิดเอกสารนี้ก่อนเมื่อโครงการมีปัญหา"], ["เลือกวิธีตอบสนองให้เหมาะกับต้นทุน", "ถ้า mitigate ทุกข้อเท่ากัน จะเสียเวลากับเรื่องไม่สำคัญ"], ["จัดลำดับงานโดยเอาความเสี่ยงขึ้นก่อน", "วิธีคิดที่แยก senior ออกจาก junior ได้ชัดเรื่องหนึ่ง"], ["ระบุความเสี่ยงแบบใหม่ที่มากับ AI agent", "องค์กรเริ่มมีนโยบายแล้ว และมักถูกถามในการสัมภาษณ์"]];
  it.forEach((v, i) => { const y = 1.3 + i * 0.74; box(s, pres, 0.5, y, 9, 0.66, K.paper); chip(s, pres, 0.65, y + 0.12, i + 1);
    T(s, v[0], { x: 1.3, y, w: 3.7, h: 0.66, fontSize: 14, bold: true, valign: "middle" }); T(s, v[1], { x: 5.1, y, w: 4.3, h: 0.66, fontSize: 12, color: K.ink2, valign: "middle" }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "ให้ถามผู้เรียนก่อนว่า ความเสี่ยงคืออะไร แล้วเฉลยว่าความเสี่ยงคือความไม่รู้ที่มีราคา การจัดการความเสี่ยงจึงเป็นการตัดสินใจว่าจะยอมจ่ายเท่าไรเพื่อรู้คำตอบให้เร็วขึ้นกี่วัน ซึ่งเชื่อมกับ loop ของวิชา");
  T(s, "ความเสี่ยงคือ", { x: 0.7, y: 0.9, w: 8, h: 0.4, fontSize: 18, bold: true, color: K.amber });
  T(s, "ความไม่รู้ที่มีราคา", { x: 0.7, y: 1.45, w: 8.6, h: 0.9, fontSize: 40, bold: true, color: K.white });
  box(s, pres, 0.7, 2.9, 8.6, 1.6, K.ink2);
  T(s, "จะยอมจ่ายเท่าไร\nเพื่อรู้คำตอบให้เร็วขึ้นกี่วัน", { x: 1.0, y: 2.9, w: 8.0, h: 1.6, fontSize: 26, bold: true, color: K.white, valign: "middle" }); }

// 4 ประโยคที่ไม่ช่วย vs ช่วย
{ const s = lightSlide(pres, S1, "ประโยคความเสี่ยงที่ใช้ได้ต้องบอกสาเหตุ", "ประโยคที่เจอบ่อยในรายงานนักศึกษาคือ ความเสี่ยงคือทีมอาจทำงานไม่ทัน ประโยคนี้ไม่บอกว่าอะไรทำให้ไม่ทัน จึงไม่รู้ว่าจะลงมือทำอะไร ให้เทียบกับตัวอย่างที่แก้แล้วทางขวา");
  box(s, pres, 0.5, 1.3, 3.8, 3.65, K.redT); T(s, "แบบที่ไม่ช่วย", { x: 0.75, y: 1.45, w: 3.3, h: 0.35, fontSize: 14, bold: true, color: K.red });
  T(s, "“ความเสี่ยงคือทีมอาจทำงานไม่ทัน”", { x: 0.75, y: 2.0, w: 3.3, h: 1.2, fontSize: 18, bold: true });
  T(s, "ไม่บอกว่าอะไรทำให้ไม่ทัน เลยไม่รู้ว่าจะลงมือทำอะไร", { x: 0.75, y: 3.5, w: 3.3, h: 1.2, fontSize: 14, color: K.ink2 });
  box(s, pres, 4.5, 1.3, 5.0, 3.65, K.greenT); T(s, "แบบที่ช่วย", { x: 4.75, y: 1.45, w: 4.5, h: 0.35, fontSize: 14, bold: true, color: K.green });
  [["เพราะ", "ทั้งกลุ่มไม่มีใครเคยใช้ WebSocket มาก่อน"], ["อาจเกิด", "feature แจ้งเตือนแบบ real-time ใช้เวลานานกว่าที่ประมาณไว้ 2 เท่า"], ["ซึ่งจะทำให้", "ไม่มีเวลาทำ E2E test ก่อน present"]].forEach((v, i) => { const y = 1.95 + i * 0.98;
    T(s, v[0], { x: 4.75, y, w: 1.2, h: 0.88, fontSize: 14, bold: true, color: K.green, valign: "middle" }); box(s, pres, 5.95, y, 3.35, 0.88, K.white); T(s, v[1], { x: 6.05, y, w: 3.15, h: 0.88, fontSize: 13, valign: "middle" }); }); }

// 5 โครงประโยค 3 ส่วน
{ const s = lightSlide(pres, S1, "ประโยคความเสี่ยงมี 3 ส่วน", "ประโยคความเสี่ยงที่ใช้ได้จริงมี 3 ส่วน คือเพราะข้อเท็จจริงที่เป็นสาเหตุ อาจเกิดเหตุการณ์ที่ไม่แน่นอน ซึ่งจะทำให้เกิดผลกระทบที่วัดได้ ให้สังเกตว่าส่วนสุดท้ายต้องวัดได้ ไม่ใช่คำกว้าง ๆ");
  flow(s, pres, [{ t: "เพราะ", sub: "ข้อเท็จจริงที่เป็นสาเหตุ", fill: K.tealT }, { t: "อาจเกิด", sub: "เหตุการณ์ที่ไม่แน่นอน", fill: K.amberT }, { t: "ซึ่งจะทำให้", sub: "ผลกระทบที่วัดได้", fill: K.redT }], 0.5, 1.35, 9, 1.1, { gap: 0.4, fs: 16, sfs: 13 });
  T(s, "ตัวอย่างที่แก้แล้ว", { x: 0.5, y: 2.7, w: 5, h: 0.3, fontSize: 12, bold: true, color: K.teal });
  flow(s, pres, [{ t: "ทั้งกลุ่มไม่มีใครเคยใช้ WebSocket มาก่อน", fill: K.paper }, { t: "feature แจ้งเตือนแบบ real-time ใช้เวลานานกว่าที่ประมาณไว้ 2 เท่า", fill: K.paper }, { t: "ไม่มีเวลาทำ E2E test ก่อน present", fill: K.paper }], 0.5, 3.05, 9, 1.5, { gap: 0.4, fs: 13 }); }

// 6 Assumption -> Risk -> Issue
{ const s = lightSlide(pres, S1, "Assumption, Risk และ Issue ต่างกันอย่างไร", "Assumption คือสิ่งที่เชื่อว่าจริงโดยยังไม่ตรวจ ถ้าตรวจแล้วผิดจะกลายเป็น risk Risk คือยังไม่เกิดแต่มีโอกาส ถ้าเกิดจริงเป็น issue ที่ต้องแก้ตอนนี้ ถ้าหมดเวลาที่จะเกิดก็ปิดความเสี่ยง ความผิดพลาดที่พบบ่อยที่สุดคือเอา issue ไปใส่ในตารางความเสี่ยง");
  const xs = [0.5, 2.9, 5.3, 7.7], nodes = [["Assumption", "เชื่อว่าจริง ยังไม่ตรวจ", K.tealT], ["Risk", "ยังไม่เกิด มีโอกาสเกิด", K.amberT], ["Issue", "เกิดแล้ว ต้องแก้ตอนนี้", K.redT], ["บทเรียน", "เข้า register รอบหน้า", K.greenT]];
  nodes.forEach((n, i) => { box(s, pres, xs[i], 1.9, 1.8, 1.3, n[2]);
    T(s, [{ text: n[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: n[1], options: { fontSize: 12, color: K.ink2 } }], { x: xs[i] + 0.08, y: 1.9, w: 1.64, h: 1.3, align: "center", valign: "middle" });
    if (i < 3) arrow(s, pres, xs[i] + 1.83, xs[i] + 2.37, 2.55); });
  T(s, "ตรวจแล้วผิด", { x: 1.9, y: 1.45, w: 1.4, h: 0.35, fontSize: 11, color: K.mute, align: "center" });
  T(s, "เกิดขึ้นจริง", { x: 4.3, y: 1.45, w: 1.4, h: 0.35, fontSize: 11, color: K.mute, align: "center" });
  vline(s, 3.8, 3.23, 3.85);
  box(s, pres, 2.9, 3.9, 1.8, 0.85, K.paper); T(s, "ปิดความเสี่ยง", { x: 2.9, y: 3.9, w: 1.8, h: 0.85, fontSize: 13, bold: true, align: "center", valign: "middle" });
  T(s, "หมดเวลาที่จะเกิด", { x: 3.95, y: 3.3, w: 1.5, h: 0.5, fontSize: 11, color: K.mute });
  box(s, pres, 5.3, 3.65, 4.2, 1.3, K.redT);
  T(s, [{ text: "ความผิดพลาดที่พบบ่อยที่สุด", options: { bold: true, fontSize: 13, color: K.red, breakLine: true } }, { text: "เอา issue ไปใส่ในตารางความเสี่ยง ดูเหมือนจัดการแล้ว แต่เป็นปัญหาที่ยังไม่มีใครแก้", options: { fontSize: 12 } }], { x: 5.5, y: 3.65, w: 3.8, h: 1.3, valign: "middle" }); }

// 7 วงจร
{ const s = lightSlide(pres, S2, "วงจรการจัดการความเสี่ยง 5 ขั้น", "ISO 31000 วางกระบวนการเป็นวงจรที่ต้องหมุนซ้ำ ไม่ได้ทำครั้งเดียวตอนต้นโครงการ เมื่อสถานการณ์เปลี่ยนให้กลับไประบุใหม่ และถ้าความเสี่ยงเกิดขึ้นจริงให้ยกระดับเป็น issue");
  flow(s, pres, [{ t: "1 Identify", sub: "ระบุว่ามีอะไรบ้าง", fill: K.tealT }, { t: "2 Analyze", sub: "ประเมินโอกาสและผลกระทบ" }, { t: "3 Prioritize", sub: "เรียงลำดับ" }, { t: "4 Respond", sub: "เลือกวิธีตอบสนอง" }, { t: "5 Monitor", sub: "เฝ้า trigger", fill: K.amberT }], 0.5, 1.4, 9, 1.5, { gap: 0.25, fs: 14, sfs: 12 });
  box(s, pres, 0.5, 3.3, 4.4, 0.95, K.paper); T(s, "สถานการณ์เปลี่ยน: กลับไป Identify", { x: 0.7, y: 3.3, w: 4.0, h: 0.95, fontSize: 14, bold: true, valign: "middle" });
  box(s, pres, 5.1, 3.3, 4.4, 0.95, K.redT); T(s, "เกิดขึ้นจริง: ยกระดับเป็น issue", { x: 5.3, y: 3.3, w: 4.0, h: 0.95, fontSize: 14, bold: true, valign: "middle" });
  box(s, pres, 0.5, 4.4, 9, 0.6, K.ink); T(s, "วงจรต้องหมุนซ้ำ ไม่ใช่ทำครั้งเดียวตอนต้นโครงการ", { x: 0.7, y: 4.4, w: 8.6, h: 0.6, fontSize: 15, bold: true, color: K.white, valign: "middle" });
  ref(s, "ISO 31000 — Risk management guidelines"); }

// 8 ทบทวนรายสัปดาห์
{ const s = lightSlide(pres, S2, "ทบทวน register สัปดาห์ละครั้ง ถามแค่ 3 ข้อ", "สำหรับโครงการขนาดวิชาเรียน ให้ทบทวน register สัปดาห์ละครั้ง ในที่ประชุมถามแค่ 3 ข้อ ข้างขวาคือกรณีตัวอย่าง register ที่ไม่เคยปิดบรรทัดไหนเลยคือ register ที่ไม่มีใครอ่าน");
  [["ข้อไหนหายไปแล้ว ปิดทิ้งได้"], ["ข้อไหนใกล้จะเกิด ไปดู trigger"], ["มีอะไรใหม่จากสิ่งที่เพิ่งรู้สัปดาห์นี้"]].forEach((v, i) => numRow(s, i + 1, v[0], 0.5, 1.3 + i * 1.25, 5.3, 1.1, 15));
  box(s, pres, 6.05, 1.3, 3.45, 3.65, K.amberT); T(s, "กรณีตัวอย่าง", { x: 6.3, y: 1.45, w: 3.0, h: 0.35, fontSize: 12, bold: true, color: "B5651D" });
  T(s, "Risk register ที่ไม่เคยมีบรรทัดไหนถูกปิดเลย คือ register ที่ไม่มีใครอ่าน", { x: 6.3, y: 1.85, w: 3.0, h: 1.7, fontSize: 15, bold: true });
  T(s, "การปิดความเสี่ยงได้เป็นสัญญาณที่ดี เพราะแปลว่าความไม่รู้ลดลงจริง", { x: 6.3, y: 3.65, w: 3.0, h: 1.2, fontSize: 13, color: K.ink2 }); }

// 9 ตาราง L x I
{ const s = lightSlide(pres, S2, "ประเมินเชิงคุณภาพ: Likelihood × Impact", "ใช้สเกล 1 ถึง 5 ทั้งสองแกน แล้วคูณกันได้คะแนน 1 ถึง 25 ระดับสูงต้องมีแผนที่ลงมือแล้วและมีเจ้าของ ระดับกลางต้องมีแผนเตรียมไว้และเฝ้า trigger ระดับต่ำรับไว้แล้วทบทวนเดือนละครั้ง");
  const lab = ["เล็กน้อย", "น้อย", "ปานกลาง", "สูง", "รุนแรง"], rl = { 5: "5 เกิดแน่", 4: "4 น่าจะเกิด", 3: "3 เกิดได้", 2: "2 ไม่น่าเกิด", 1: "1 แทบเป็นไปไม่ได้" };
  const gx = 2.1, gy = 1.75, cw = 0.82, ch = 0.58;
  T(s, "Impact", { x: gx, y: 1.27, w: cw * 5, h: 0.22, fontSize: 11, bold: true, color: K.mute, align: "center" });
  lab.forEach((t, j) => T(s, (j + 1) + " " + t, { x: gx + j * cw, y: 1.48, w: cw - 0.04, h: 0.25, fontSize: 11, color: K.ink2, align: "center" }));
  [5, 4, 3, 2, 1].forEach((l, r) => { T(s, rl[l], { x: 0.5, y: gy + r * ch, w: 1.55, h: ch - 0.06, fontSize: 11, color: K.ink2, valign: "middle", align: "right" });
    for (let i = 1; i <= 5; i++) { const v = l * i, f = v >= 15 ? K.redT : v >= 8 ? K.amberT : K.greenT;
      box(s, pres, gx + (i - 1) * cw, gy + r * ch, cw - 0.06, ch - 0.06, f); T(s, String(v), { x: gx + (i - 1) * cw, y: gy + r * ch, w: cw - 0.06, h: ch - 0.06, fontSize: 14, bold: true, align: "center", valign: "middle" }); } });
  T(s, "Likelihood", { x: 0.5, y: 1.48, w: 1.55, h: 0.25, fontSize: 11, bold: true, color: K.mute, align: "right" });
  [["สูง (15–25)", "ต้องมีแผนตอบสนองที่ลงมือแล้ว และมีเจ้าของชัดเจน", K.redT, K.red], ["กลาง (8–14)", "ต้องมีแผนเตรียมไว้ และมี trigger ที่เฝ้าอยู่", K.amberT, "B5651D"], ["ต่ำ (1–7)", "รับไว้ ทบทวนเดือนละครั้ง", K.greenT, K.green]].forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, 6.55, y, 2.95, 1.15, v[2]);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, color: v[3], breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: 6.7, y, w: 2.65, h: 1.15, valign: "middle" }); }); }

// 10 กับดักคะแนนคูณ
{ const s = lightSlide(pres, S2, "กับดักของคะแนนที่คูณกัน", "คะแนนที่คูณกันทำให้ความเสี่ยงที่โอกาสต่ำมากแต่ผลกระทบมหาศาล ได้คะแนนเท่ากับความเสี่ยงที่โอกาสสูงแต่ผลกระทบเล็ก ทั้งที่ต้องจัดการต่างกันมาก ข้อมูลรั่วไหลคือตัวอย่าง ให้ดูที่ผลกระทบเป็นหลัก");
  [[0.5, "โอกาสต่ำมาก × ผลกระทบมหาศาล", "1 × 5 = 5", K.redT, K.red], [5.6, "โอกาสสูง × ผลกระทบเล็ก", "5 × 1 = 5", K.greenT, K.green]].forEach(v => { box(s, pres, v[0], 1.3, 3.9, 1.9, v[3]);
    T(s, v[1], { x: v[0] + 0.2, y: 1.4, w: 3.5, h: 0.5, fontSize: 13, bold: true, color: v[4] }); T(s, v[2], { x: v[0] + 0.2, y: 1.95, w: 3.5, h: 1.0, fontSize: 34, bold: true, align: "center", valign: "middle" }); });
  T(s, "=", { x: 4.4, y: 1.7, w: 1.2, h: 1.0, fontSize: 40, bold: true, align: "center", valign: "middle", color: K.mute });
  box(s, pres, 0.5, 3.45, 9, 1.5, K.amberT);
  T(s, [{ text: "คะแนนเท่ากัน แต่ต้องจัดการต่างกันมาก", options: { bold: true, fontSize: 15, breakLine: true } }, { text: "ข้อมูลรั่วไหลมีโอกาสเกิดต่ำ แต่ถ้าเกิดแล้วโครงการอาจจบทันที ให้ดูที่ผลกระทบเป็นหลัก ไม่ใช่คะแนนรวม", options: { fontSize: 14 } }], { x: 0.75, y: 3.45, w: 8.5, h: 1.5, valign: "middle" }); }

// 11 EMV
{ const s = lightSlide(pres, S2, "ประเมินเชิงปริมาณ: Expected Monetary Value", "EMV คือความน่าจะเป็นที่จะเกิดคูณผลกระทบ ตัวเลขในตารางเป็นตัวเลขสมมติ ตัวอย่างนี้ทำ spike ทดลองได้ EMV รวมต่ำสุด ประโยชน์ของการเขียนตัวเลขคือการเถียงเปลี่ยนจากฉันรู้สึกว่าเสี่ยง เป็นเราเห็นไม่ตรงกันที่ตัวเลขไหน");
  box(s, pres, 0.5, 1.3, 9, 0.7, K.ink); T(s, "EMV = P(เกิด) × ผลกระทบ", { x: 0.5, y: 1.3, w: 9, h: 0.7, fontSize: 24, bold: true, color: K.white, align: "center", valign: "middle" });
  rowsTable(s, pres, [["ไม่ทำอะไร", "0", "40% × เสียเวลา 10 วัน", "4.0 วัน"], ["ทำ spike ทดลอง 1 วัน", "1 วัน", "10% × เสียเวลา 10 วัน", "2.0 วัน"], ["เปลี่ยนไปใช้ของที่ทีมคุ้นเคย", "2 วัน", "5% × เสียเวลา 4 วัน", "2.2 วัน"]], 0.5, 2.2, [3.0, 1.5, 3.0, 1.5], 0.62, { head: ["ทางเลือก (ตัวเลขสมมติ)", "ต้นทุนจ่ายแน่", "ความเสี่ยงที่เหลือ", "EMV รวม"], fs: 13, fills: [K.paper, K.greenT, K.paper] });
  T(s, "ตัวเลขไม่ต้องแม่น ประโยชน์คือการเถียงเปลี่ยนจาก “ฉันรู้สึกว่าเสี่ยง” เป็น “เราเห็นไม่ตรงกันที่ตัวเลขไหน”", { x: 0.5, y: 4.55, w: 9, h: 0.5, fontSize: 13, bold: true, color: K.teal }); }

// 12 ต้นไม้ตัดสินใจ
{ const s = lightSlide(pres, S3, "เลือกวิธีตอบสนอง 4 แบบ", "เริ่มจากถามว่าควบคุมสาเหตุได้ไหม ถ้าได้และคุ้มให้ mitigate ถ้าได้แต่ต้องเลิกทำสิ่งนั้นให้ avoid ถ้าไม่ได้แต่ให้คนอื่นรับแทนได้ให้ transfer และถ้าไม่ได้และไม่คุ้มจะทำอะไรให้ accept อย่างเป็นทางการ");
  box(s, pres, 3.5, 1.25, 3.0, 0.55, K.ink); T(s, "ควบคุมสาเหตุได้ไหม", { x: 3.5, y: 1.25, w: 3.0, h: 0.55, fontSize: 15, bold: true, color: K.white, align: "center", valign: "middle" });
  vline(s, 5.0, 1.8, 1.92, K.mute, false); s.addShape(pres.ShapeType.line, { x: 1.55, y: 1.92, w: 6.9, h: 0, line: { color: K.mute, width: 1.5 } });
  const cols = [["ได้ และคุ้ม", "Mitigate", "ลดโอกาสหรือลดผลกระทบ", "เช่น เขียน test, ทำ spike, เตรียม rollback", K.greenT, K.green], ["ได้ แต่ต้องเลิกทำสิ่งนั้น", "Avoid", "เปลี่ยนแผนเพื่อไม่ให้ความเสี่ยงมีอยู่", "เช่น ตัด feature, เปลี่ยน technology", K.tealT, K.teal], ["ไม่ได้ แต่ให้คนอื่นรับแทนได้", "Transfer", "ย้ายความเสี่ยงออกไป", "เช่น ใช้ managed service, ประกัน, สัญญา", K.amberT, "B5651D"], ["ไม่ได้ และไม่คุ้มจะทำอะไร", "Accept", "ยอมรับอย่างเป็นทางการ", "ต้องมีแผนสำรองและวงเงินกันไว้", K.paper, K.ink2]];
  cols.forEach((c, i) => { const x = 0.5 + i * 2.3, cx = x + 1.05; vline(s, cx, 1.92, 2.05);
    T(s, c[0], { x, y: 2.08, w: 2.1, h: 0.5, fontSize: 11, bold: true, color: K.mute, align: "center", valign: "middle" });
    box(s, pres, x, 2.65, 2.1, 2.3, c[4]);
    T(s, c[1], { x: x + 0.15, y: 2.75, w: 1.8, h: 0.4, fontSize: 16, bold: true, color: c[5] }); T(s, c[2], { x: x + 0.15, y: 3.2, w: 1.8, h: 0.8, fontSize: 13, bold: true });
    T(s, c[3], { x: x + 0.15, y: 4.0, w: 1.8, h: 0.85, fontSize: 12, color: K.ink2 }); }); }

// 13 Accept และด้านบวก
{ const s = lightSlide(pres, S3, "Accept ต้องเขียนลงเอกสาร", "Accept ที่ถูกต้องต้องเขียนลงเอกสาร ไม่ใช่เงียบไว้ ซึ่งต่างกันมากในวันที่เรื่องนั้นเกิดขึ้นจริง และ ISO 31000 นิยาม risk ว่าเป็นผลของความไม่แน่นอนต่อเป้าหมาย รวมด้านบวกด้วย วิธีตอบสนองฝั่งบวกคือ Exploit, Enhance, Share, Accept");
  box(s, pres, 0.5, 1.3, 4.4, 1.7, K.redT); T(s, "ไม่ดี", { x: 0.7, y: 1.4, w: 4, h: 0.3, fontSize: 13, bold: true, color: K.red }); T(s, "“ไม่มีใครพูดถึงมันเลย”", { x: 0.7, y: 1.8, w: 4.0, h: 1.0, fontSize: 18, bold: true, valign: "middle" });
  box(s, pres, 5.1, 1.3, 4.4, 1.7, K.greenT); T(s, "ดี", { x: 5.3, y: 1.4, w: 4, h: 0.3, fontSize: 13, bold: true, color: K.green }); T(s, "“เรารู้ว่าเสี่ยง และตัดสินใจร่วมกันว่ารับได้ ถ้าเกิดจะทำ X”", { x: 5.3, y: 1.75, w: 4.0, h: 1.15, fontSize: 14, bold: true, valign: "middle" });
  box(s, pres, 0.5, 3.2, 9, 1.75, K.ink);
  T(s, "ISO 31000: risk คือผลของความไม่แน่นอนต่อเป้าหมาย ซึ่งรวมด้านบวกด้วย", { x: 0.75, y: 3.3, w: 8.5, h: 0.55, fontSize: 14, bold: true, color: K.white });
  T(s, "วิธีตอบสนองฝั่งบวกที่เทียบกันได้", { x: 0.75, y: 3.85, w: 8.5, h: 0.3, fontSize: 12, color: "B8C4D4" });
  ["Exploit", "Enhance", "Share", "Accept"].forEach((t, i) => { box(s, pres, 0.75 + i * 2.15, 4.25, 1.95, 0.5, K.amber); T(s, t, { x: 0.75 + i * 2.15, y: 4.25, w: 1.95, h: 0.5, fontSize: 14, bold: true, align: "center", valign: "middle" }); });
  ref(s, "ISO 31000 — Risk management guidelines"); }

// 14 Technical risk
{ const s = lightSlide(pres, S4, "Technical risk: ของที่ไม่เคยทำ", "สัญญาณเตือนคือไม่มีใครในทีมเคยทำสิ่งนี้ วิธีจัดการคือทำ spike เป็นงานทดลองที่กำหนดเวลาตายตัว มีเกณฑ์ชัดว่าต้องได้คำตอบอะไร และตกลงล่วงหน้าว่าถ้าหมดเวลาแล้วไม่ได้คำตอบจะเลือกทางสำรอง จุดที่พลาดบ่อยคือเอา code ของ spike ไปใช้ต่อ");
  flow(s, pres, [{ t: "สัญญาณเตือน", sub: "ไม่มีใครในทีมเคยทำ และไม่มีตัวอย่างใกล้เคียงพอ", fill: K.redT }, { t: "ทำ spike", sub: "งานทดลองที่กำหนดเวลาตายตัว", fill: K.tealT }, { t: "เกณฑ์ชัด", sub: "ต้องได้คำตอบอะไร", fill: K.paper }, { t: "หมดเวลา", sub: "ยังไม่ได้คำตอบ เลือกทางสำรอง", fill: K.amberT }], 0.5, 1.4, 9, 1.6, { gap: 0.28, fs: 14, sfs: 12 });
  box(s, pres, 0.5, 3.4, 9, 1.55, K.redT);
  T(s, [{ text: "จุดที่คนพลาดบ่อย: เอา code ของ spike ไปใช้ต่อ", options: { bold: true, fontSize: 15, color: K.red, breakLine: true } }, { text: "spike เขียนเพื่อเรียนรู้ ไม่ใช่เพื่อใช้งาน ควรทิ้งแล้วเขียนใหม่พร้อม test", options: { fontSize: 14 } }], { x: 0.75, y: 3.4, w: 8.5, h: 1.55, valign: "middle" }); }

// 15 Integration risk
{ const s = lightSlide(pres, S4, "Integration risk: ความเสี่ยงกระจุกที่รอยต่อ", "ความเสี่ยงในซอฟต์แวร์มักกระจุกอยู่ที่รอยต่อ ได้แก่ frontend กับ API, app กับ database และเครื่องเรากับ production มาตรการคือเปลี่ยนความเสี่ยงตรงรอยต่อให้เป็นเครื่องมือ ล็อก contract ใช้ container และให้ CI ตรวจทุก commit");
  box(s, pres, 0.5, 1.3, 1.8, 2.2, K.paper); T(s, "Frontend", { x: 0.5, y: 1.3, w: 1.8, h: 2.2, fontSize: 15, bold: true, align: "center", valign: "middle" });
  box(s, pres, 3.2, 1.3, 2.0, 2.2, K.tealT); T(s, "API", { x: 3.2, y: 1.3, w: 2.0, h: 2.2, fontSize: 15, bold: true, align: "center", valign: "middle" });
  box(s, pres, 6.8, 1.3, 2.7, 1.0, K.paper); T(s, "Database", { x: 6.8, y: 1.3, w: 2.7, h: 1.0, fontSize: 15, bold: true, align: "center", valign: "middle" });
  box(s, pres, 6.8, 2.5, 2.7, 1.0, K.paper); T(s, "Production", { x: 6.8, y: 2.5, w: 2.7, h: 1.0, fontSize: 15, bold: true, align: "center", valign: "middle" });
  dash(s, 2.35, 2.4, 0.8, 0, K.red); dash(s, 5.25, 1.8, 1.5, 0, K.red); dash(s, 5.25, 3.0, 1.5, 0, K.red);
  T(s, "contract", { x: 2.3, y: 2.05, w: 0.95, h: 0.3, fontSize: 11, bold: true, color: K.red, align: "center" });
  T(s, "schema", { x: 5.25, y: 1.45, w: 1.5, h: 0.3, fontSize: 11, bold: true, color: K.red, align: "center" });
  T(s, "env ต่างกัน", { x: 5.25, y: 2.65, w: 1.5, h: 0.3, fontSize: 11, bold: true, color: K.red, align: "center" });
  T(s, "มาตรการ: เปลี่ยนความเสี่ยงตรงรอยต่อให้เป็นเครื่องมือ", { x: 0.5, y: 3.65, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal });
  ["ล็อก API contract ให้ชัดก่อนเริ่มเขียน code", "ใช้ container ให้ environment เหมือนกันทุกเครื่อง", "ให้ CI ตรวจทุกรอยต่ออัตโนมัติทุก commit"].forEach((t, i) => { const x = 0.5 + i * 3.05; box(s, pres, x, 4.0, 2.9, 0.95, K.greenT); T(s, t, { x: x + 0.15, y: 4.0, w: 2.6, h: 0.95, fontSize: 13, valign: "middle" }); }); }

// 16 People risk
{ const s = lightSlide(pres, S4, "People risk: bus factor", "ถ้ามีคนเดียวที่ตั้ง environment เป็นและคนนั้นป่วยในสัปดาห์สอบ โครงการหยุดทันที นี่คือ bus factor เท่ากับ 1 ให้ใช้เอกสารหรือ script, README ที่รันได้ใน 3 บรรทัด และหมุนเวียนงาน กรณีตัวอย่างคือ docker compose up ที่รันได้จริง ดีกว่าเอกสาร onboarding 20 หน้า");
  box(s, pres, 0.5, 1.3, 3.6, 2.3, K.amberT); T(s, "bus factor", { x: 0.7, y: 1.4, w: 3.2, h: 0.35, fontSize: 13, bold: true, color: "B5651D" });
  T(s, "= 1", { x: 0.7, y: 1.75, w: 3.2, h: 1.0, fontSize: 48, bold: true, align: "center", valign: "middle" });
  T(s, "คนเดียวตั้ง environment เป็น แล้วป่วยในสัปดาห์สอบ โครงการหยุดทันที", { x: 0.7, y: 2.75, w: 3.2, h: 0.8, fontSize: 12, color: K.ink2 });
  ["ทุกอย่างที่ทำด้วยมือต้องมีเอกสาร หรือดีกว่านั้นคือทำเป็น script", "README พาคนใหม่จาก clone ไปถึงรันได้ด้วยคำสั่งไม่เกิน 3 บรรทัด", "หมุนเวียนคนทำงานแต่ละส่วนอย่างน้อย 1 ครั้งต่อเทอม"].forEach((t, i) => numRow(s, i + 1, t, 4.3, 1.3 + i * 0.8, 5.2, 0.72, 13));
  box(s, pres, 0.5, 3.8, 9, 1.15, K.paper);
  T(s, [{ text: "กรณีตัวอย่าง: ", options: { bold: true, color: K.teal } }, { text: "docker compose up ที่รันได้จริงในเครื่องคนใหม่ ลด people risk ได้ดีกว่าเอกสาร onboarding 20 หน้า เพราะเอกสารจะเก่า แต่ compose file ที่ CI รันทุกวันจะไม่เก่า", options: {} }], { x: 0.75, y: 3.8, w: 8.5, h: 1.15, fontSize: 14, valign: "middle" }); }

// 17 Schedule risk
{ const s = lightSlide(pres, S4, "Schedule risk: งานที่มักถูกลืมตอนประมาณเวลา", "งานที่มักถูกลืมตอนประมาณเวลามี 5 อย่างตามรายการ เวลารอคนอื่นเป็นตัวที่ประเมินพลาดหนักที่สุด เพราะไม่ปรากฏใน task ของใครเลย วิธีจัดการคือเริ่มงานที่ต้องรอคนอื่นให้เร็วที่สุด แม้ยังไม่ถึงคิวตามแผน");
  ["เวลา review และแก้ตาม review", "เวลา deploy ครั้งแรก ซึ่งแทบไม่เคยผ่านในครั้งแรก", "เวลาแก้ bug ที่เจอตอน integrate", "เวลาเขียนเอกสารและเตรียม present", "เวลารอคนอื่น เช่น รออนุมัติ รอคำตอบ รอสิทธิ์เข้าถึง"].forEach((t, i) => { const y = 1.3 + i * 0.72, last = i === 4; box(s, pres, 0.5, y, 5.7, 0.64, last ? K.amberT : K.paper);
    s.addShape(pres.ShapeType.roundRect, { x: 0.7, y: y + 0.17, w: 0.3, h: 0.3, fill: { color: K.white }, line: { color: last ? K.amber : K.teal, width: 1.5 }, rectRadius: 0.04 });
    T(s, t, { x: 1.2, y, w: 4.9, h: 0.64, fontSize: 13, valign: "middle", bold: last }); });
  box(s, pres, 6.4, 1.3, 3.1, 3.5, K.amberT); T(s, "ประเมินพลาดหนักที่สุด", { x: 6.6, y: 1.45, w: 2.7, h: 0.35, fontSize: 13, bold: true, color: "B5651D" });
  T(s, "เวลารอคนอื่นไม่ปรากฏใน task ของใครเลย", { x: 6.6, y: 1.9, w: 2.7, h: 1.2, fontSize: 14, bold: true });
  T(s, "เริ่มงานที่ต้องรอคนอื่นให้เร็วที่สุด แม้ยังไม่ถึงคิวตามแผน", { x: 6.6, y: 3.2, w: 2.7, h: 1.5, fontSize: 13, color: K.ink2 }); }

// 18 Security risk
{ const s = lightSlide(pres, S4, "Security risk: ดูที่ impact", "ผลกระทบด้าน security ไม่ได้จบที่โครงการของเรา ข้อมูลผู้ใช้ที่รั่วแล้วเรียกคืนไม่ได้ และไทยมี PDPA กำกับ ใช้ OWASP Top 10 เป็น checklist ตั้งต้น ช่องโหว่ด้าน security มักได้ likelihood ต่ำแต่ impact สูงสุด จึงต้องดูที่ impact");
  box(s, pres, 0.5, 1.3, 4.4, 1.5, K.paper); T(s, [{ text: "ผลกระทบไม่จบที่โครงการเรา", options: { bold: true, fontSize: 14, breakLine: true } }, { text: "ข้อมูลผู้ใช้ที่รั่วไปแล้วเรียกคืนไม่ได้ และในไทยมี PDPA กำกับด้วย", options: { fontSize: 13, color: K.ink2 } }], { x: 0.7, y: 1.3, w: 4.0, h: 1.5, valign: "middle" });
  box(s, pres, 5.1, 1.3, 4.4, 1.5, K.paper); T(s, [{ text: "OWASP Top 10", options: { bold: true, fontSize: 14, breakLine: true } }, { text: "ใช้เป็น checklist ตั้งต้นสำหรับความเสี่ยงด้านนี้", options: { fontSize: 13, color: K.ink2 } }], { x: 5.3, y: 1.3, w: 4.0, h: 1.5, valign: "middle" });
  box(s, pres, 0.5, 3.0, 9, 1.95, K.tealT);
  T(s, "ช่องโหว่ด้าน security มักได้คะแนนแบบนี้", { x: 0.75, y: 3.1, w: 8.5, h: 0.3, fontSize: 12, bold: true, color: K.teal });
  [["Likelihood", "ต่ำ", 1.3, K.green], ["Impact", "สูงสุด", 6.0, K.red]].forEach((v, i) => { const y = 3.5 + i * 0.6; T(s, v[0], { x: 0.75, y, w: 1.5, h: 0.45, fontSize: 13, bold: true, valign: "middle" });
    box(s, pres, 2.3, y, 6.0, 0.45, K.white); box(s, pres, 2.3, y, v[2], 0.45, v[3]); T(s, v[1], { x: 8.4, y, w: 1.0, h: 0.45, fontSize: 13, bold: true, valign: "middle", color: v[3] }); });
  T(s, "จึงต้องดูที่ impact ไม่ใช่คะแนนรวม", { x: 0.75, y: 4.7, w: 8.5, h: 0.2, fontSize: 11, color: K.ink2 });
  ref(s, "OWASP Top 10; สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล — PDPA"); }

// 19-20 AI risk tables
const AI = [["Hallucination", "AI สร้าง API ฟังก์ชัน หรือแหล่งอ้างอิงที่ไม่มีอยู่จริง อย่างมั่นใจ", "ทุกอย่างต้องรันได้จริง และทุกลิงก์ต้องเปิดได้จริงก่อน commit"], ["Automation bias", "คนเชื่อคำตอบที่จัดหน้าสวยมากกว่าที่ควร", "กติกา “อธิบายไม่ได้ ห้าม commit”"], ["Excessive agency", "ให้ agent รันคำสั่งเองได้มากเกินความจำเป็น", "จำกัดสิทธิ์ และต้องมีคนอนุมัติก่อนแตะ production"], ["Prompt injection", "ข้อความในไฟล์หรือเว็บที่ agent อ่านแฝงคำสั่งไว้", "ถือว่าทุกอย่างที่ agent อ่านเป็นข้อมูล ไม่ใช่คำสั่ง"],
  ["ข้อมูลรั่วผ่าน prompt", "วาง secret ข้อมูลลูกค้า หรือ code ภายในลงในเครื่องมือภายนอก", "กติกาข้อ 3 ของวิชา ห้ามส่ง secret เข้า AI tool"], ["License / IP", "code ที่ AI สร้างอาจคล้ายของที่มีลิขสิทธิ์", "ตรวจ license ของ dependency และไม่ลอกก้อนใหญ่โดยไม่เข้าใจ"], ["Skill atrophy", "ทีมอธิบาย code ของตัวเองไม่ได้", "oral defense ทุกสัปดาห์"], ["Vendor / model drift", "โมเดลเปลี่ยนเวอร์ชัน ผลลัพธ์เปลี่ยนตาม", "อย่าให้ระบบพึ่ง output ที่ไม่ deterministic โดยไม่มี test คุม"]];
[[0, "ความเสี่ยงใหม่จาก AI agent (1/2)", "การใส่ AI agent เข้ามาใน loop เพิ่มความเสี่ยงที่ตำรา PM แบบเดิมไม่ได้พูดถึง ตารางนี้มี 4 ข้อแรก ได้แก่ hallucination, automation bias, excessive agency และ prompt injection ให้ดูทั้งสาเหตุและมาตรการที่ใช้ได้จริง"], [4, "ความเสี่ยงใหม่จาก AI agent (2/2)", "อีก 4 ข้อคือข้อมูลรั่วผ่าน prompt, license และ IP, skill atrophy และ vendor หรือ model drift ให้เชื่อมกับกติกาของวิชา เช่น ห้ามส่ง secret เข้า AI tool และ oral defense ทุกสัปดาห์"]].forEach(([k, t, n]) => { const s = lightSlide(pres, S5, t, n);
  rowsTable(s, pres, AI.slice(k, k + 4), 0.5, 1.25, [1.9, 3.2, 3.9], 0.78, { head: ["ความเสี่ยง", "เกิดขึ้นอย่างไร", "มาตรการที่ใช้ได้จริง"], fs: 12, fills: [K.paper, K.white, K.paper, K.white].map((f, i) => i % 2 ? K.tealT : K.paper) }); });

// 21 NIST
{ const s = lightSlide(pres, S5, "NIST AI RMF แบ่งหน้าที่เป็น 4 กลุ่ม", "กรอบอ้างอิงที่องค์กรใช้จริงคือ NIST AI Risk Management Framework แบ่งหน้าที่เป็น 4 กลุ่ม คือ Govern, Map, Measure และ Manage โดย Manage วนกลับไปที่ Govern ได้");
  flow(s, pres, [{ t: "GOVERN", sub: "นโยบาย บทบาท ความรับผิดชอบ", fill: K.tealT }, { t: "MAP", sub: "เข้าใจบริบทและผลกระทบ" }, { t: "MEASURE", sub: "วัดและติดตาม" }, { t: "MANAGE", sub: "จัดลำดับและตอบสนอง", fill: K.amberT }], 0.5, 1.45, 9, 1.6, { gap: 0.3, fs: 16, sfs: 12 });
  vline(s, 8.55, 3.1, 3.7, K.mute, false); s.addShape(pres.ShapeType.line, { x: 1.45, y: 3.7, w: 7.1, h: 0, line: { color: K.mute, width: 1.5, dashType: "dash" } }); vline(s, 1.45, 3.7, 3.1, K.mute, true);
  T(s, "MANAGE วนกลับไป GOVERN", { x: 2.5, y: 3.8, w: 5, h: 0.35, fontSize: 12, color: K.mute, align: "center" });
  box(s, pres, 0.5, 4.35, 9, 0.6, K.ink); T(s, "กรอบอ้างอิงที่องค์กรใช้จริงสำหรับความเสี่ยงของ AI", { x: 0.7, y: 4.35, w: 8.6, h: 0.6, fontSize: 14, bold: true, color: K.white, valign: "middle" });
  ref(s, "NIST — AI Risk Management Framework (AI RMF 1.0)"); }

// 22 กรณีตัวอย่าง สัมภาษณ์
{ const s = lightSlide(pres, S5, "กรณีตัวอย่าง: คำถามในการสัมภาษณ์งาน", "คำถามที่เจอในการสัมภาษณ์งานมากขึ้นเรื่อย ๆ คือคุณให้ AI agent ทำอะไรได้บ้างและอะไรที่ไม่ให้ทำเพราะอะไร คำตอบที่ดีไม่ใช่ใช้ทุกอย่างหรือไม่ใช้เลย แต่คือการอธิบายเส้นแบ่งพร้อมเหตุผล");
  box(s, pres, 0.5, 1.3, 5.3, 3.65, K.paper); T(s, "คำถามที่เจอมากขึ้นเรื่อย ๆ", { x: 0.75, y: 1.45, w: 4.8, h: 0.35, fontSize: 12, bold: true, color: K.teal });
  T(s, "“คุณให้ AI agent ทำอะไรได้บ้าง และอะไรที่คุณไม่ให้ทำ เพราะอะไร”", { x: 0.75, y: 1.9, w: 4.8, h: 1.5, fontSize: 18, bold: true });
  box(s, pres, 0.75, 3.55, 2.3, 1.1, K.redT); T(s, "ไม่ใช่ “ใช้ทุกอย่าง”", { x: 0.85, y: 3.55, w: 2.1, h: 1.1, fontSize: 13, bold: true, color: K.red, align: "center", valign: "middle" });
  box(s, pres, 3.2, 3.55, 2.4, 1.1, K.redT); T(s, "ไม่ใช่ “ไม่ใช้เลย”", { x: 3.3, y: 3.55, w: 2.2, h: 1.1, fontSize: 13, bold: true, color: K.red, align: "center", valign: "middle" });
  box(s, pres, 6.05, 1.3, 3.45, 3.65, K.greenT); T(s, "คำตอบที่ดี", { x: 6.3, y: 1.45, w: 3.0, h: 0.35, fontSize: 12, bold: true, color: K.green });
  T(s, "อธิบายเส้นแบ่งพร้อมเหตุผลได้", { x: 6.3, y: 1.9, w: 3.0, h: 2.5, fontSize: 18, bold: true }); }

// 23 Pre-mortem
{ const s = lightSlide(pres, S6, "Pre-mortem: ถอดบทเรียนก่อนเกิดเหตุ", "Pre-mortem เป็นเทคนิคของ Gary Klein ทำตาม 4 ขั้น คือสมมติว่าโครงการล้มแล้ว ให้ทุกคนเขียนเหตุผลเป็นอดีตกาล อ่านทีละคนแล้วรวมรายการ และเลือก 3 ข้อที่ตรงกันมากที่สุดใส่ register ได้ผลกว่าการถามว่ามีความเสี่ยงอะไรบ้าง เพราะคนกล้าพูดสิ่งที่ปกติไม่กล้า");
  ["สมมติว่าตอนนี้เป็นวัน present และโครงการล้มเหลวไปแล้ว", "ให้ทุกคนเขียนว่ามันล้มเพราะอะไร เขียนเป็นอดีตกาล", "อ่านออกมาทีละคน แล้วรวมเป็นรายการ", "เลือก 3 ข้อที่คนเขียนตรงกันมากที่สุด ใส่ risk register พร้อมมาตรการ"].forEach((t, i) => numRow(s, i + 1, t, 0.5, 1.3 + i * 0.92, 5.7, 0.82, 13));
  box(s, pres, 6.4, 1.3, 3.1, 3.5, K.amberT); T(s, "ทำไมได้ผล", { x: 6.6, y: 1.45, w: 2.7, h: 0.35, fontSize: 13, bold: true, color: "B5651D" });
  T(s, "การสมมติว่าล้มไปแล้ว ทำให้คนกล้าพูดสิ่งที่ปกติไม่กล้า เพราะกลัวดูเป็นคนขวางทีม", { x: 6.6, y: 1.9, w: 2.7, h: 2.8, fontSize: 14, bold: true });
  ref(s, "Gary Klein — Performing a Project Premortem, Harvard Business Review"); }

// 24 Risk first
{ const s = lightSlide(pres, S6, "จัดลำดับงานโดยเอาความเสี่ยงขึ้นก่อน", "คนส่วนใหญ่ทำของง่ายก่อนเพราะเห็นความคืบหน้าเร็ว แต่ไปเจอของยากตอนท้ายจนไม่เหลือเวลาแก้ ให้ทำส่วนที่ไม่แน่ใจที่สุดก่อน จะรู้เร็วว่าทำได้หรือไม่ และยังมีเวลาเปลี่ยนแผน เหตุผลเดียวกันทำให้ควร deploy ของจริงตั้งแต่ยังไม่มี feature");
  T(s, "ลำดับที่คนส่วนใหญ่ทำ", { x: 0.5, y: 1.25, w: 5, h: 0.3, fontSize: 12, bold: true, color: K.red });
  flow(s, pres, [{ t: "ทำของง่ายก่อน", sub: "เพราะเห็นความคืบหน้าเร็ว", fill: K.amberT }, { t: "เจอของยากตอนท้าย", fill: K.redT }, { t: "ไม่เหลือเวลาแก้", fill: K.redT }], 0.5, 1.58, 9, 0.95, { gap: 0.35, fs: 13, sfs: 12 });
  T(s, "ลำดับที่ลดความเสี่ยง", { x: 0.5, y: 2.7, w: 5, h: 0.3, fontSize: 12, bold: true, color: K.green });
  flow(s, pres, [{ t: "ทำส่วนที่ไม่แน่ใจที่สุดก่อน", fill: K.greenT }, { t: "รู้เร็วว่าทำได้หรือไม่ได้", fill: K.greenT }, { t: "ยังมีเวลาเปลี่ยนแผน", fill: K.greenT }], 0.5, 3.03, 9, 0.95, { gap: 0.35, fs: 13 });
  box(s, pres, 0.5, 4.2, 9, 0.75, K.ink); T(s, "deploy ของจริงตั้งแต่ยังไม่มี feature เพราะ deploy ไม่แน่นอนที่สุดและถูกเลื่อนบ่อยที่สุด", { x: 0.7, y: 4.2, w: 8.6, h: 0.75, fontSize: 14, bold: true, color: K.white, valign: "middle" }); }

// 25 Postmortem
{ const s = lightSlide(pres, S6, "Blameless postmortem: แม่แบบ 5 หัวข้อ", "เมื่อความเสี่ยงกลายเป็น issue จริง สิ่งที่ทำหลังจากนั้นสำคัญกว่าตัวเหตุการณ์ หัวข้อสุดท้ายคือหัวใจ จะระมัดระวังมากขึ้นไม่ใช่มาตรการ มาตรการจริงคือสิ่งที่ทำให้ครั้งหน้าระบบจับได้เองโดยไม่ต้องพึ่งความจำของคน");
  rowsTable(s, pres, [["เกิดอะไรขึ้น", "ลำดับเหตุการณ์พร้อมเวลา ข้อเท็จจริงล้วน ไม่มีการตีความ"], ["ผลกระทบ", "ใครได้รับผลกระทบ นานเท่าไร วัดเป็นตัวเลขได้ไหม"], ["ทำไมระบบถึงยอมให้เกิดขึ้นได้", "ถามว่า “ทำไม” ต่อเนื่องจนถึงสาเหตุเชิงระบบ ไม่หยุดที่ “คนทำพลาด”"], ["สัญญาณที่มีอยู่แล้วแต่ไม่มีใครเห็น", "log, test, alert ที่ควรจับได้แต่ไม่ได้จับ"], ["จะทำอะไรให้มันจับได้เองครั้งหน้า", "งานที่มีเจ้าของและกำหนดวัน ไม่ใช่ “จะระมัดระวังมากขึ้น”"]], 0.5, 1.25, [3.3, 5.7], 0.58, { fs: 13, fills: [K.paper, K.paper, K.paper, K.paper, K.amberT] });
  T(s, "มาตรการจริงคือสิ่งที่ทำให้ครั้งหน้าระบบจับได้เอง โดยไม่ต้องพึ่งความจำของคน", { x: 0.5, y: 4.7, w: 9, h: 0.35, fontSize: 13, bold: true, color: K.teal });
  ref(s, "Google SRE Book — Postmortem Culture: Learning from Failure"); }

// 26 Risk register
{ const s = lightSlide(pres, S6, "แม่แบบ Risk Register: docs/risk-register.md", "สร้างไฟล์ risk-register ในโครงการของกลุ่ม ตารางหลักมี 10 คอลัมน์ พร้อมส่วนความเสี่ยงที่ปิดแล้วและ assumption ที่ยังไม่ได้ตรวจ เกณฑ์ว่าใช้ได้จริงคือเปิดดูแล้วตอบได้ทันทีว่าสัปดาห์นี้ต้องเฝ้าอะไรเป็นพิเศษ");
  const r1 = [["ID", 0.8], ["ความเสี่ยง (เพราะ...อาจเกิด...ทำให้...)", 3.4], ["L", 0.7], ["I", 0.7], ["คะแนน", 1.0], ["วิธีตอบสนอง", 1.9]], r2 = [["มาตรการที่ลงมือแล้ว", 3.0], ["Trigger", 2.4], ["เจ้าของ", 1.8], ["สถานะ", 1.4]];
  [[r1, 1.3], [r2, 1.85]].forEach(([r, y]) => { let x = 0.5; r.forEach(c => { box(s, pres, x, y, c[1], 0.45, K.tealT); T(s, c[0], { x, y, w: c[1], h: 0.45, fontSize: 11, bold: true, color: K.teal, align: "center", valign: "middle" }); x += c[1] + 0.1; }); });
  box(s, pres, 0.5, 2.5, 9, 1.2, K.paper);
  T(s, [{ text: "ตัวอย่าง R1: ", options: { bold: true, color: K.teal } }, { text: "เพราะไม่มีใครเคยตั้ง CI มาก่อน อาจเกิดการที่ pipeline ใช้เวลาเกิน 2 วัน\nทำให้งานส่วน CI/CD ไม่เสร็จ", options: { breakLine: true } }, { text: "L 4 × I 3 = 12 · Mitigate · ทำ spike 3 ชม. ในสัปดาห์ก่อนหน้า", options: { fontSize: 12, color: K.ink2, breakLine: true } }, { text: "Trigger: ผ่านไป 1 วันแล้ว workflow ยังแดง · สถานะ: เปิด", options: { fontSize: 12, color: K.ink2 } }], { x: 0.7, y: 2.5, w: 8.6, h: 1.2, fontSize: 13, valign: "middle" });
  ["ความเสี่ยงที่ปิดแล้ว", "Assumption ที่ยังไม่ได้ตรวจ"].forEach((t, i) => { box(s, pres, 0.5 + i * 4.6, 3.85, 4.4, 0.5, K.paper); T(s, t, { x: 0.5 + i * 4.6, y: 3.85, w: 4.4, h: 0.5, fontSize: 13, bold: true, align: "center", valign: "middle" }); });
  box(s, pres, 0.5, 4.5, 9, 0.5, K.ink); T(s, "ใช้ได้จริงเมื่อเปิดดูแล้วตอบได้ทันทีว่าสัปดาห์นี้ต้องเฝ้าอะไรเป็นพิเศษ", { x: 0.7, y: 4.5, w: 8.6, h: 0.5, fontSize: 13, bold: true, color: K.white, valign: "middle" }); }

// 27 สรุป
{ const s = darkSlide(pres, S7, "สรุป 6 ข้อ ให้ทวนทีละข้อและถามผู้เรียนว่าข้อไหนจะนำไปใช้ในโครงการของกลุ่มก่อน");
  T(s, "สรุป", { x: 0.7, y: 0.35, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["เขียนความเสี่ยง 3 ส่วน: เพราะ, อาจเกิด, ซึ่งจะทำให้ และแยก risk, issue, assumption ให้ออก", "วงจรต้องหมุนซ้ำ ระบุ ประเมิน จัดลำดับ ตอบสนอง เฝ้า trigger และทบทวน register ทุกสัปดาห์", "คะแนน L × I ไม่พอ ความเสี่ยงที่ impact สูงสุดให้ดูที่ impact และใช้ EMV ให้การเถียงอยู่ที่ตัวเลข", "เลือกวิธีตอบสนองให้เหมาะกับต้นทุน และ Accept ต้องเขียนลงเอกสาร", "เอาความเสี่ยงขึ้นก่อน และระวังความเสี่ยงแบบใหม่ที่มากับ AI agent", "register ใช้ได้จริงเมื่อตอบได้ทันทีว่าสัปดาห์นี้ต้องเฝ้าอะไร"];
  r.forEach((t, i) => { const y = 1.1 + i * 0.66; chip(s, pres, 0.7, y + 0.1, i + 1, K.amber, K.ink, 0.4); T(s, t, { x: 1.3, y, w: 8.2, h: 0.6, fontSize: 14, color: K.white, valign: "middle" }); }); }

// 28-29 Glossary
const GL = [["Risk", "เหตุการณ์ที่ยังไม่เกิด แต่ถ้าเกิดจะกระทบเป้าหมาย มีความน่าจะเป็นเสมอ"], ["Issue", "ความเสี่ยงที่เกิดขึ้นแล้ว ต้องแก้ตอนนี้ ไม่ใช่แค่เฝ้าระวัง"], ["Assumption", "สิ่งที่เชื่อว่าจริงโดยยังไม่ได้ตรวจ ถ้าผิดจะกลายเป็น risk ทันที"], ["Constraint", "ข้อจำกัดที่รู้แน่นอนแล้ว เช่น ต้องส่งงานก่อนสอบไฟนอล"], ["Likelihood", "โอกาสที่ความเสี่ยงจะเกิด"], ["Impact", "ความรุนแรงถ้าเกิดขึ้น"], ["Exposure / EMV", "ค่าคาดหวังของความเสียหาย = likelihood × impact"],
  ["Risk appetite", "ระดับความเสี่ยงที่องค์กรยอมรับได้โดยไม่ต้องทำอะไร"], ["Trigger", "สัญญาณที่บอกว่าความเสี่ยงกำลังจะกลายเป็น issue"], ["Risk owner", "คนเดียวที่รับผิดชอบเฝ้าและตัดสินใจเรื่องความเสี่ยงข้อนั้น"], ["Residual risk", "ความเสี่ยงที่ยังเหลืออยู่หลังทำมาตรการแล้ว"], ["Spike", "งานทดลองสั้น ๆ เพื่อลดความไม่รู้ ไม่ได้ทำเพื่อส่งมอบ feature"], ["Bus factor", "ถ้าหายไปพร้อมกันกี่คนแล้วโครงการเดินต่อไม่ได้ ตัวเลขนั้นคือ bus factor"], ["Blameless postmortem", "ถอดบทเรียนหลังเกิดเหตุ โดยหาสาเหตุที่ตัวระบบ ไม่หาตัวคนผิด"]];
[0, 7].forEach((k, n) => { const s = lightSlide(pres, S8, "Glossary (" + (n + 1) + "/2)", "ใช้ทบทวนศัพท์ของบทนี้ ให้ผู้เรียนลองอธิบายคำด้วยภาษาของตัวเองก่อนดูความหมาย");
  GL.slice(k, k + 7).forEach((v, i) => { const full = i === 6, x = full ? 0.5 : 0.5 + (i % 2) * 4.6, y = 1.3 + (full ? 3 : Math.floor(i / 2)) * 0.95, w = full ? 9 : 4.4; box(s, pres, x, y, w, 0.85, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.2, y, w: w - 0.4, h: 0.85, valign: "middle" }); }); });

// 30 Ref
{ const s = lightSlide(pres, S9, "Ref", "รายการอ้างอิงทั้งหมดของบทนี้ ใช้เช็กกับต้นฉบับก่อนเชื่อ เพราะเอกสารเขียนโดยมี AI ช่วยและอาจมีส่วนผิดหรือเก่าไปแล้ว");
  const grp = (h, a) => [{ text: h, options: { bold: true, color: K.teal, fontSize: 13, breakLine: true, paraSpaceAfter: 5 } }].concat(a.map((t, i) => ({ text: t, options: { fontSize: 12, breakLine: true, paraSpaceAfter: 7 } })));
  T(s, grp("มาตรฐานและกรอบ", ["ISO 31000 — Risk management guidelines", "ISO/IEC 27005 — Information security risk management", "NIST — AI Risk Management Framework (AI RMF 1.0)", "NIST — Risk Management Framework for Information Systems", "PMI — PMBOK Guide 7th Edition (Uncertainty)"]), { x: 0.5, y: 1.3, w: 4.4, h: 3.6 });
  T(s, grp("ความเสี่ยงด้านความปลอดภัยและ AI", ["OWASP Top 10", "OWASP Top 10 for LLM Applications", "OWASP Risk Rating Methodology", "สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล — PDPA"]).concat(grp("เทคนิคและงานวิจัย", ["Gary Klein — Performing a Project Premortem, HBR", "Google SRE Book — Postmortem Culture: Learning from Failure", "Google SRE Book — Embracing Risk", "Flyvbjerg & Budzier — Why Your IT Project May Be Riskier Than You Think, HBR"])), { x: 5.1, y: 1.3, w: 4.4, h: 3.8 }); }

L.save(pres, "R02-risk-management.pptx").then(() => console.log("saved"));
