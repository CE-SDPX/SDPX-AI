const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref, rowsTable } = L;
const S0 = "เปิดบท", S1 = "Tar Pit", S2 = "Man-Month", S3 = "Conceptual Integrity", S4 = "ระบบที่สองและการทิ้ง", S5 = "โครงการสายทีละวัน", S6 = "No Silver Bullet", S7 = "ยุค AI", S8 = "ใช้จริง", S9 = "สรุป", S10 = "Glossary";
const pres = L.newDeck("The Mythical Man-Month: บทเรียนปี 1975 ที่ยังจริงอยู่", [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10]);
const BK = "Brooks, The Mythical Man-Month (Anniversary Edition, 1995)";
const NSB = "Brooks, No Silver Bullet (1986)";
const cards = (s, items, x, y0, w, h, fs = 14, gap = 0.1, fill = K.paper) => items.forEach((t, i) => { const y = y0 + i * (h + gap); box(s, pres, x, y, w, h, fill); chip(s, pres, x + 0.15, y + (h - 0.42) / 2, i + 1, K.teal, K.white, 0.42); T(s, t, { x: x + 0.75, y, w: w - 0.95, h, fontSize: fs, valign: "middle" }); });
const bullets = (a) => a.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 } }));
const big = (s, x, y, w, num, label, fill, col, h = 1.9, nfs = 40) => { box(s, pres, x, y, w, h, fill); T(s, num, { x, y: y + 0.2, w, h: 0.9, align: "center", valign: "middle", fontSize: nfs, bold: true, color: col }); T(s, label, { x: x + 0.15, y: y + 1.1, w: w - 0.3, h: 0.7, align: "center", fontSize: 13, color: K.ink }); };

// 1 title
{ const s = darkSlide(pres, S0, "เปิดบทด้วยหนังสือเล่มนี้ ซึ่งเขียนจากโครงการ IBM OS/360 ปี 1975 แล้วบอกว่าบทเรียนในนั้นยังใช้ได้ในยุค AI");
  s.addShape(pres.ShapeType.rect, { x: 0.7, y: 1.3, w: 0.12, h: 2.0, fill: { color: K.amber }, line: { color: K.amber, width: 0 } });
  T(s, "The Mythical Man-Month", { x: 1.1, y: 1.3, w: 8.4, h: 0.9, fontSize: 38, bold: true, color: K.white, valign: "middle" });
  T(s, "บทเรียนปี 1975 ที่ยังจริงอยู่", { x: 1.1, y: 2.3, w: 8.4, h: 0.6, fontSize: 24, color: K.white });
  T(s, "Reading 05", { x: 1.1, y: 3.0, w: 8, h: 0.4, fontSize: 16, color: K.amber, bold: true }); }

// 2 objectives
{ const s = lightSlide(pres, S0, "อ่านแล้วจะได้อะไร", "บทนี้มี 6 ข้อที่เอาไปใช้ได้จริง เริ่มจากการอธิบาย Brooks's Law ไปจนถึงการประเมินคำโฆษณาของเครื่องมือใหม่ ให้ผู้เรียนเห็นว่าแต่ละข้อใช้ในงานจริงอย่างไร");
  const r = [["อธิบาย Brooks's Law และเหตุผล", "คุยกับหัวหน้าได้ เมื่อมีคนเสนอ \"เพิ่มคน\" ตอนงานสาย"], ["คำนวณต้นทุนสื่อสารตามขนาดทีม", "เลือกขนาดทีมและวิธีแบ่งงานได้อย่างมีเหตุผล"], ["แยก \"เขียนเสร็จ\" ออกจาก \"ส่งมอบได้\"", "ประเมินเวลาได้ใกล้ความจริงขึ้น"], ["รักษา conceptual integrity ในทีม", "ระบบไม่ใช้ยากและแก้ยากตลอดอายุ"], ["แยก essential ออกจาก accidental", "ตอบได้ว่า AI ช่วยงานตรงไหนได้จริง"], ["ประเมินคำโฆษณาเครื่องมือใหม่", "ดูจากหลักฐาน ไม่พาทีมไปผิดทาง"]];
  r.forEach((a, i) => { const col = i % 2, row = Math.floor(i / 2), x = 0.5 + col * 4.6, y = 1.3 + row * 1.2; box(s, pres, x, y, 4.4, 1.05, K.paper); chip(s, pres, x + 0.15, y + 0.31, i + 1, K.teal);
    T(s, [{ text: a[0], options: { bold: true, breakLine: true, fontSize: 14 } }, { text: a[1], options: { fontSize: 12, color: K.ink2 } }], { x: x + 0.7, y, w: 3.6, h: 1.05, valign: "middle" }); });
  ref(s, BK); }

// 3 hook
{ const s = lightSlide(pres, S0, "โครงการสาย แล้วมีคนถามว่า \"ต้องการคนเพิ่มไหม\"", "เริ่มด้วยคำถามที่ผู้บริหารเกือบทุกคนถามเมื่อโครงการสาย ให้ผู้เรียนเดาก่อนว่าจะตอบอะไร แล้วบอกว่าคำตอบมักเป็น ไม่ และบทนี้จะอธิบายเหตุผล");
  box(s, pres, 0.5, 1.3, 9, 1.6, K.amberT);
  T(s, "\"ต้องการคนเพิ่มไหม\"", { x: 0.5, y: 1.3, w: 9, h: 1.6, align: "center", valign: "middle", fontSize: 32, bold: true, color: "B5651D" });
  box(s, pres, 0.5, 3.15, 4.4, 1.7, K.redT); T(s, [{ text: "คำตอบที่คนมักให้", options: { bold: true, color: K.red, breakLine: true } }, { text: "\"ได้\" เพราะคนมากขึ้นน่าจะเสร็จเร็วขึ้น", options: {} }], { x: 0.7, y: 3.3, w: 4.0, h: 1.4, fontSize: 15 });
  box(s, pres, 5.1, 3.15, 4.4, 1.7, K.greenT); T(s, [{ text: "คำตอบที่บทนี้จะอธิบาย", options: { bold: true, color: K.green, breakLine: true } }, { text: "มักเป็น \"ไม่\" พร้อมทางเลือกที่ได้ผลกว่า", options: {} }], { x: 5.3, y: 3.3, w: 4.0, h: 1.4, fontSize: 15 });
  ref(s, BK); }

// 4 background
{ const s = lightSlide(pres, S0, "ที่มา: IBM OS/360 และเหตุผลที่ยังต้องอ่าน", "Brooks เป็นผู้จัดการโครงการ OS/360 ที่มีคนกว่า 1,000 คนและสายหนัก หนังสือคือบันทึกว่าเขาพลาดอะไร ปัญหาที่เขียนถึงเป็นเรื่องของคนที่ต้องทำงานร่วมกัน จึงไม่ล้าสมัย");
  big(s, 0.5, 1.4, 2.8, "1,000+", "คนในโครงการ IBM OS/360 ที่สายอย่างหนัก", K.tealT, K.teal, 1.65);
  big(s, 0.5, 3.2, 2.8, "50 ปี", "ที่ผ่านมา แต่ปัญหายังอยู่", K.amberT, "B5651D", 1.65);
  box(s, pres, 3.6, 1.4, 5.9, 3.45, K.paper);
  T(s, [{ text: "ทำไมยังไม่ล้าสมัย", options: { bold: true, color: K.teal, breakLine: true, fontSize: 15 } }, ...bullets(["ปัญหาที่เขาเขียนถึงไม่ใช่ปัญหาเทคนิค", "แต่เป็นปัญหาของคนที่ต้องทำงานร่วมกัน", "เทคโนโลยีเปลี่ยนไปหมดแล้ว", "แต่ต้นทุนของการทำให้คนหลายคนเข้าใจตรงกัน ไม่ได้ลดลงเลย"])], { x: 3.85, y: 1.55, w: 5.4, h: 3.2, fontSize: 15 });
  ref(s, BK); }

// 5 case 1
caseSlide(pres, S0, { title: "กรณีตัวอย่าง: คำถามแรกเมื่อโครงการสาย", tag: "สถานการณ์", facts: ["โครงการเริ่มสาย", "คำถามแรกของผู้บริหารเกือบทุกคนคือ \"ต้องการคนเพิ่มไหม\"", "วิศวกรที่อ่านเล่มนี้แล้วตอบได้ว่าทำไมคำตอบมักเป็น \"ไม่\"", "และเสนอทางเลือกที่ได้ผลกว่าได้"], principle: "ข้อคิด", takeaway: "บทสนทนานี้สร้างความน่าเชื่อถือให้วิศวกรได้มาก", refs: BK,
  notes: "ให้ผู้เรียนนึกภาพว่าตัวเองอยู่ในห้องประชุมตอนโครงการสาย การตอบได้ว่าทำไมไม่ควรเพิ่มคน พร้อมเสนอทางเลือก คือสิ่งที่ทำให้วิศวกรน่าเชื่อถือ" });

// 6 tar pit ladder
{ const s = lightSlide(pres, S1, "The Tar Pit: 4 สิ่งที่คนเรียกรวมว่า \"โปรแกรม\"", "บทแรกแยกของ 4 อย่างที่คนเรียกรวมกันว่าโปรแกรม แต่ละขั้นเพิ่มต้นทุนขึ้น จนของที่ส่งมอบได้จริงมีต้นทุนประมาณ 9 เท่าของโปรแกรมที่รันได้บนเครื่องเรา");
  const b = (x, y, w, h, fill, t1, t2, t3, col) => { box(s, pres, x, y, w, h, fill); T(s, [{ text: t1, options: { bold: true, fontSize: 14, color: col || K.ink, breakLine: true } }, { text: t2, options: { fontSize: 12, color: K.ink2, breakLine: true } }, { text: t3, options: { bold: true, fontSize: 16, color: col || K.teal } }], { x: x + 0.1, y, w: w - 0.2, h, align: "center", valign: "middle" }); };
  b(0.5, 2.5, 2.1, 1.7, K.paper, "Program", "รันได้บนเครื่องเรา", "1x");
  b(3.4, 1.35, 2.7, 1.6, K.tealT, "Programming Product", "+ test เอกสาร กรณีขอบ คนอื่นแก้ต่อได้", "3x");
  b(3.4, 3.4, 2.7, 1.6, K.tealT, "Programming System", "+ ทำงานร่วมกับระบบอื่นตาม interface", "3x");
  b(6.9, 2.3, 2.6, 2.1, K.amberT, "Programming Systems Product", "ของที่ส่งมอบได้จริง", "9x", "B5651D");
  arrow(s, pres, 2.65, 3.35, 2.5); arrow(s, pres, 2.65, 3.35, 4.0); arrow(s, pres, 6.15, 6.85, 2.5); arrow(s, pres, 6.15, 6.85, 4.2);
  ref(s, BK); }

// 7 9x
{ const s = lightSlide(pres, S1, "ทำไมนักศึกษาประเมินเวลาพลาด", "เขียน API จองห้องเสร็จ ในความหมายของนักศึกษาคือ Program แต่สิ่งที่ถูกให้คะแนนคือ Programming Systems Product ช่องว่าง 9 เท่านี้ทำให้ เหลืออีกนิดเดียว กลายเป็นสองสัปดาห์ และใช้กับ WBS ได้ทันที");
  box(s, pres, 0.5, 1.3, 4.4, 2.2, K.redT); T(s, [{ text: "สิ่งที่นักศึกษาคิดว่าเสร็จ", options: { bold: true, color: K.red, breakLine: true, fontSize: 13 } }, { text: "\"เขียน API จองห้องเสร็จ\"", options: { bold: true, fontSize: 17, breakLine: true } }, { text: "= Program (1x)", options: { fontSize: 15 } }], { x: 0.7, y: 1.4, w: 4.0, h: 2.0, valign: "middle" });
  box(s, pres, 5.1, 1.3, 4.4, 2.2, K.greenT); T(s, [{ text: "สิ่งที่ถูกให้คะแนน และผู้ใช้ต้องการ", options: { bold: true, color: K.green, breakLine: true, fontSize: 13 } }, { text: "test, จัดการ error, เอกสาร, ทำงานร่วมกับส่วนอื่น, deploy ได้จริง", options: { fontSize: 14, breakLine: true } }, { text: "= Systems Product (9x)", options: { fontSize: 15, bold: true } }], { x: 5.3, y: 1.4, w: 4.0, h: 2.0, valign: "middle" });
  box(s, pres, 0.5, 3.7, 9, 1.2, K.paper); T(s, [{ text: "ใช้กับ WBS: ", options: { bold: true, color: K.teal } }, { text: "work package ต้องระบุว่าปลายทางคือระดับไหน เกณฑ์ยอมรับของ \"ทำ API สร้างการจอง\" ต้องครอบคลุมทั้ง 9 เท่า ไม่ใช่แค่ 1 เท่า" }], { x: 0.75, y: 3.7, w: 8.5, h: 1.2, fontSize: 15, valign: "middle" });
  ref(s, BK); }

// 8 man-month 3 types
{ const s = lightSlide(pres, S2, "คนกับเดือนสลับกันได้ ก็ต่อเมื่อไม่ต้องสื่อสาร", "เปรียบเทียบงาน 3 แบบ เก็บฝ้ายแบ่งได้สนิท เพิ่มคนแล้วเร็วขึ้นตามสัดส่วน งานซอฟต์แวร์แบ่งได้แต่ต้องประสานกัน ส่วนการตั้งครรภ์แบ่งไม่ได้เลย ประโยคด้านล่างเป็นการถอดความ ไม่ใช่คำแปลตรงตัว");
  const c = [["งานที่แบ่งได้สนิท", "เช่น เก็บฝ้าย", "เพิ่มคน = เร็วขึ้นตามสัดส่วน", "ได้ผลเต็มที่", K.greenT, K.green], ["งานที่แบ่งได้แต่ต้องประสานกัน", "เช่น พัฒนาซอฟต์แวร์", "เพิ่มคน = ได้ประโยชน์ลดลงเรื่อย ๆ จนติดลบ", "ได้ผลไม่แน่นอน", K.amberT, "B5651D"], ["งานที่แบ่งไม่ได้เลย", "เช่น ตั้งครรภ์ 9 เดือน", "เพิ่มคนไม่ช่วยอะไร", "ไม่ได้ผลเลย", K.redT, K.red]];
  c.forEach((a, i) => { const x = 0.5 + i * 3.1; box(s, pres, x, 1.3, 2.9, 2.75, a[4]);
    T(s, [{ text: a[0], options: { bold: true, fontSize: 14, color: a[5], breakLine: true } }, { text: a[1], options: { fontSize: 13, breakLine: true } }, { text: a[2], options: { fontSize: 13, breakLine: true } }, { text: "ผล: " + a[3], options: { bold: true, fontSize: 14 } }], { x: x + 0.15, y: 1.4, w: 2.6, h: 2.55, paraSpaceAfter: 8 }); });
  box(s, pres, 0.5, 4.2, 9, 0.75, K.paper); T(s, "ถอดความ: การอุ้มท้อง 9 เดือน ผู้หญิง 9 คนช่วยกันทำให้เสร็จใน 1 เดือนไม่ได้", { x: 0.7, y: 4.2, w: 8.6, h: 0.75, fontSize: 14, valign: "middle", bold: true });
  ref(s, BK + " (ประโยคเป็นการถอดความ)"); }

// 9 comm paths
{ const s = lightSlide(pres, S2, "ต้นทุนการสื่อสารโตแบบกำลังสอง", "จำนวนช่องทางสื่อสารของทีม n คนคือ n(n-1)/2 ทีม 5 คนมี 10 ช่อง ทีม 20 คนมี 190 ช่อง ตัวเลขช่องทางโตเร็วกว่าจำนวนคนมาก");
  box(s, pres, 0.5, 1.3, 3.6, 1.2, K.tealT); T(s, [{ text: "communication paths", options: { fontSize: 12, color: K.teal, bold: true, breakLine: true } }, { text: "n (n - 1) / 2", options: { fontSize: 26, bold: true } }], { x: 0.5, y: 1.3, w: 3.6, h: 1.2, align: "center", valign: "middle" });
  T(s, "n คือจำนวนคนในทีม", { x: 0.5, y: 2.65, w: 3.6, h: 0.4, fontSize: 14, color: K.ink2, align: "center" });
  rowsTable(s, pres, [["2 คน", "1", "-"], ["3 คน", "3", "+2"], ["4 คน", "6", "+3"], ["5 คน", "10", "+4"], ["8 คน", "28", "+7"], ["10 คน", "45", "+9"], ["20 คน", "190", "+19"]], 4.5, 1.3, [1.6, 1.9, 1.5], 0.4, { head: ["ขนาดทีม", "ช่องทางสื่อสาร", "เพิ่มจากเดิม"], fs: 14 });
  box(s, pres, 0.5, 3.35, 3.6, 1.5, K.amberT); T(s, "ทีม 20 คนมี 190 ช่องทาง มากกว่าทีม 10 คนสี่เท่าเศษ ทั้งที่คนเพิ่มแค่สองเท่า", { x: 0.7, y: 3.4, w: 3.2, h: 1.4, fontSize: 14, valign: "middle", bold: true });
  ref(s, BK); }

// 10 team diagrams
{ const s = lightSlide(pres, S2, "ทีม 3 คนมี 3 ช่องทาง ทีม 5 คนมี 10 ช่องทาง", "วาดให้เห็นว่าเพิ่มคนทีละคน เส้นเชื่อมเพิ่มเร็วกว่ามาก เพิ่มคนจาก 4 เป็น 5 ได้กำลังทำงานเพิ่ม 25% แต่ต้นทุนการประสานงานเพิ่ม 67% นี่คือเหตุผลที่ทีมที่ทำงานคล่องมักมีขนาดเล็ก");
  const line = (x1, y1, x2, y2) => s.addShape(pres.ShapeType.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), flipV: (x2 - x1) * (y2 - y1) < 0, line: { color: K.mute, width: 1.5 } });
  const graph = (cx, cy, r, n, names) => { const pts = names.map((_, i) => [cx + r * Math.sin(2 * Math.PI * i / n), cy - r * Math.cos(2 * Math.PI * i / n)]);
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1]);
    pts.forEach((p, i) => chip(s, pres, p[0] - 0.21, p[1] - 0.21, names[i], K.teal)); };
  box(s, pres, 0.5, 1.3, 4.4, 2.75, K.paper); box(s, pres, 5.1, 1.3, 4.4, 2.75, K.paper);
  graph(2.7, 2.45, 0.8, 3, ["A", "B", "C"]); graph(7.3, 2.45, 0.85, 5, ["A", "B", "C", "D", "E"]);
  T(s, "ทีม 3 คน: 3 ช่องทาง", { x: 0.5, y: 3.65, w: 4.4, h: 0.35, align: "center", fontSize: 14, bold: true }); T(s, "ทีม 5 คน: 10 ช่องทาง", { x: 5.1, y: 3.65, w: 4.4, h: 0.35, align: "center", fontSize: 14, bold: true });
  const big2 = (x, num, lab, f, c) => { box(s, pres, x, 4.2, 4.4, 0.8, f); T(s, [{ text: num + "  ", options: { bold: true, fontSize: 22, color: c } }, { text: lab, options: { fontSize: 14 } }], { x: x + 0.2, y: 4.2, w: 4.0, h: 0.8, valign: "middle" }); };
  big2(0.5, "+25%", "กำลังทำงาน (จาก 4 เป็น 5 คน)", K.greenT, K.green); big2(5.1, "+67%", "ต้นทุนการประสานงาน", K.redT, K.red);
  ref(s, BK); }

// 11 Brooks law
{ const s = lightSlide(pres, S2, "Brooks's Law: เพิ่มคนให้โครงการที่สาย ยิ่งสาย", "Brooks's Law บอกว่าการเพิ่มคนเข้าโครงการที่สายอยู่แล้วทำให้สายกว่าเดิม มีสาเหตุ 3 ข้อที่ทำงานร่วมกัน คือคนใหม่ยังทำงานไม่ได้ คนเก่าต้องหยุดมาสอน และช่องทางสื่อสารเพิ่มแบบกำลังสอง");
  box(s, pres, 0.5, 1.3, 9, 0.7, K.amberT); T(s, "\"Adding manpower to a late software project makes it later.\"", { x: 0.5, y: 1.3, w: 9, h: 0.7, align: "center", valign: "middle", fontSize: 18, bold: true, fontFace: "Tahoma" });
  const r = [["คนใหม่ยังทำงานไม่ได้ทันที", "ต้องใช้เวลาเรียนรู้ระบบ"], ["คนเก่าต้องหยุดงานมาสอน", "กำลังผลิตลดลงทันที"], ["ช่องทางสื่อสารเพิ่มแบบกำลังสอง", "ทุกคนช้าลง"]];
  r.forEach((a, i) => { const x = 0.5 + i * 3.1; box(s, pres, x, 2.3, 2.9, 1.6, K.paper); chip(s, pres, x + 0.15, 2.42, i + 1, K.teal); T(s, [{ text: a[0], options: { bold: true, breakLine: true, fontSize: 14 } }, { text: a[1], options: { fontSize: 13, color: K.ink2 } }], { x: x + 0.15, y: 2.9, w: 2.6, h: 0.95 }); });
  box(s, pres, 0.5, 4.2, 9, 0.7, K.redT); T(s, "โครงการสายกว่าเดิม", { x: 0.5, y: 4.2, w: 9, h: 0.7, align: "center", valign: "middle", fontSize: 18, bold: true, color: K.red });
  ref(s, BK); }

// 12 exceptions
{ const s = lightSlide(pres, S2, "ข้อยกเว้น: ไม่ได้แปลว่าห้ามเพิ่มคนตลอดกาล", "Brooks's Law ไม่เป็นจริงในบางกรณี เช่น เพิ่มคนตั้งแต่ต้นโครงการ งานที่เพิ่มให้แยกขาดจากส่วนอื่นได้ คนใหม่คุ้นระบบอยู่แล้ว หรือคอขวดคือกำลังคนจริง ๆ");
  const e = ["เพิ่มคนตั้งแต่ต้นโครงการ ไม่ใช่ตอนใกล้เส้นตาย", "งานที่เพิ่มให้แยกขาดจากส่วนอื่นได้จริง เช่น เขียนเอกสาร หรือทำคนละโมดูลที่ไม่แตะกัน", "คนใหม่คุ้นระบบอยู่แล้ว ไม่ต้องใช้เวลาเรียนรู้", "คอขวดคือกำลังคนจริง ๆ ไม่ใช่การประสานงาน"];
  T(s, "Brooks's Law ไม่เป็นจริงเมื่อ", { x: 0.5, y: 1.25, w: 9, h: 0.35, fontSize: 14, bold: true, color: K.teal });
  e.forEach((t, i) => { const col = i % 2, row = Math.floor(i / 2), x = 0.5 + col * 4.6, y = 1.7 + row * 1.6; box(s, pres, x, y, 4.4, 1.45, K.greenT); chip(s, pres, x + 0.15, y + 0.15, i + 1, K.green); T(s, t, { x: x + 0.75, y: y + 0.1, w: 3.5, h: 1.25, fontSize: 14, valign: "middle" }); });
  ref(s, BK); }

// 13 alternatives
{ const s = lightSlide(pres, S2, "เมื่องานสาย ลองทำสิ่งเหล่านี้แทนการเพิ่มคน", "ทางเลือกแรกและได้ผลที่สุดคือตัด scope ทางเลือกอื่นคือเลื่อนกำหนดส่ง ปล่อยเป็นระยะ และลดงานที่ไม่ใช่การพัฒนา การเพิ่มคนมาเป็นข้อสุดท้าย และเหมาะเมื่อเหลือเวลาพอ");
  rowsTable(s, pres, [["ตัด scope", "เกือบทุกกรณี และเป็นทางที่ได้ผลที่สุด"], ["เลื่อนกำหนดส่ง", "เมื่อคุณภาพสำคัญกว่าวันที่"], ["ปล่อยเป็นระยะ ส่งของสำคัญก่อน", "เมื่อ scope แบ่งเป็นชิ้นบางได้"], ["ลดงานที่ไม่ใช่การพัฒนา เช่น ประชุม", "เมื่อทีมถูกขัดจังหวะบ่อย"], ["เพิ่มคน", "เมื่อยังเหลือเวลามากพอให้คนใหม่คุ้มค่า"]], 0.5, 1.3, [4.3, 4.7], 0.58, { head: ["ทางเลือก", "เมื่อไรถึงเหมาะ"], fs: 14, fills: [K.greenT, K.paper, K.paper, K.paper, K.amberT] });
  ref(s, BK); }

// 14 case
caseSlide(pres, S2, { title: "กรณีตัวอย่าง: ประชุมที่มีคนเสนอให้เพิ่มคน", tag: "สถานการณ์", facts: ["ในประชุมมีคนเสนอให้เพิ่มคน", "การอ้างชื่อ Brooks ไม่ได้ผลเท่าการถามคำถามหนึ่งข้อ", "ถ้าตอบไม่ได้ ทุกคนในห้องจะเห็นคำตอบเอง"], principle: "คำถามที่ควรถาม", takeaway: "\"งานส่วนไหนที่คนใหม่ทำได้เลย โดยไม่ต้องรอใครสอน\"", refs: BK,
  notes: "ชี้ให้เห็นว่าการถามคำถามที่ตรงจุดได้ผลกว่าการอ้างชื่อผู้เขียน ถ้าไม่มีงานส่วนไหนที่คนใหม่ทำได้ทันที ข้อเสนอเพิ่มคนก็ตกไปเอง" });

// 15 symptoms
{ const s = lightSlide(pres, S3, "Conceptual Integrity: สำคัญที่สุดในการออกแบบ", "Brooks ยืนยันว่า conceptual integrity สำคัญที่สุด ดีกว่าได้ระบบที่สอดคล้องแต่ขาดบางฟีเจอร์ มากกว่าระบบครบฟีเจอร์ที่แต่ละส่วนคิดคนละแบบ อาการเหล่านี้เห็นได้ง่ายในโครงการกลุ่ม");
  box(s, pres, 0.5, 1.3, 9, 0.75, K.tealT); T(s, "ดีกว่าที่จะได้ระบบที่สอดคล้องแต่ขาดบางฟีเจอร์ มากกว่าระบบครบทุกฟีเจอร์แต่แต่ละส่วนคิดกันคนละแบบ", { x: 0.7, y: 1.3, w: 8.6, h: 0.75, fontSize: 14, bold: true, valign: "middle" });
  T(s, "อาการที่เห็นในโครงการกลุ่ม", { x: 0.5, y: 2.2, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.red });
  const a = [["`snake_case` กับ `camelCase`", "endpoint หนึ่งใช้อย่างหนึ่ง อีกอันใช้อีกอย่าง"], ["404 กับ 200 พร้อม null", "บางที่คืน 404 เมื่อไม่พบ บางที่คืน 200 พร้อม null"], ["ลบแบบถามกับไม่ถาม", "บางหน้าจอถามยืนยันก่อนลบ บางหน้าจอลบทันที"], ["จัดการ error สามแบบ", "ในระบบเดียว เพราะสามคนเขียนคนละสัปดาห์"]];
  a.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 2.55 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.1, K.redT); T(s, [{ text: t[0].replace(/`/g, ""), options: { bold: true, fontSize: 14, breakLine: true } }, { text: t[1], options: { fontSize: 12, color: K.ink2 } }], { x: x + 0.2, y, w: 4.0, h: 1.1, valign: "middle" }); });
  ref(s, BK); }

// 16 ways
{ const s = lightSlide(pres, S3, "วิธีรักษา conceptual integrity ในทีมนักศึกษา", "ผลของการขาดความสอดคล้องคือผู้ใช้เดาไม่ได้ และคนมาแก้ต่อต้องเรียนกฎใหม่ทุกไฟล์ วิธีรักษามี 5 ข้อ และข้อที่เชื่อมกับยุค AI คือต้องเขียนกฎเป็นข้อความที่ agent อ่านได้");
  rowsTable(s, pres, [["มีคนเดียวตัดสินการออกแบบโดยรวม", "คนที่มีอำนาจตัดสินขั้นสุดท้ายเรื่องความสอดคล้อง คือช่อง A ใน RACI"], ["เขียนกฎลงเป็นลายลักษณ์อักษร", "memory-bank/standards/ และ AGENTS.md"], ["ทำ API contract ก่อนเขียน code", "ตกลง openapi.yaml ให้จบก่อนเริ่มเขียน"], ["บังคับกฎด้วยเครื่องมือ", "linter, schema validation, fitness function"], ["review ดูความสอดคล้อง ไม่ใช่แค่ความถูกต้อง", "ถามว่า \"อันนี้ทำเหมือนที่อื่นในระบบไหม\""]], 0.5, 1.3, [3.6, 5.4], 0.5, { head: ["วิธี", "ทำอย่างไร"], fs: 13 });
  box(s, pres, 0.5, 4.6, 9, 0.45, K.amberT); T(s, "ยุค AI: agent ไม่มีความทรงจำร่วมกัน จึงต้องเขียนกฎเป็นข้อความที่ agent อ่านได้", { x: 0.7, y: 4.6, w: 8.6, h: 0.45, fontSize: 13, bold: true, valign: "middle" });
  ref(s, BK); }

// 17 second system
{ const s = lightSlide(pres, S4, "Second-System Effect: ระบบที่สองบวมที่สุด", "ระบบแรกมักเรียบง่ายเพราะสถาปนิกยังไม่มั่นใจ ระบบที่สองอันตรายเพราะยัดทุกอย่างที่เคยอยากทำ ยาแก้คือถามว่ามีผู้ใช้จริงกี่คนที่ต้องการ ถ้าศูนย์ให้จดใน backlog ตามหลัก YAGNI");
  flow(s, pres, [{ t: "ระบบแรก", sub: "เรียบง่าย เพราะยังไม่มั่นใจ มักใช้งานได้ดี", fill: K.greenT, wt: 1 }, { t: "ระบบที่สอง", sub: "ยัดทุกอย่างที่เคยอยากทำ บวม ช้า เสร็จยาก", fill: K.redT, wt: 1 }], 0.5, 1.35, 9, 1.5, { gap: 0.6, fs: 16, sfs: 14 });
  box(s, pres, 0.5, 3.1, 4.4, 1.8, K.paper); T(s, [{ text: "อาการในโครงการนักศึกษา", options: { bold: true, color: K.red, breakLine: true } }, { text: "เสร็จรอบแรกแล้วรู้สึกธรรมดาเกินไป จึงเพิ่ม plugin system, config ยืดหยุ่นทุกอย่าง, abstraction ที่รองรับกรณีที่ยังไม่มี" }], { x: 0.7, y: 3.2, w: 4.0, h: 1.6, fontSize: 13 });
  box(s, pres, 5.1, 3.1, 4.4, 1.8, K.greenT); T(s, [{ text: "ยาแก้", options: { bold: true, color: K.green, breakLine: true } }, { text: "ถามว่า \"ตอนนี้มีผู้ใช้จริงกี่คนที่ต้องการสิ่งนี้\" ถ้าศูนย์ ให้จดใน backlog แล้วเดินหน้าต่อ (YAGNI: You Aren't Gonna Need It)" }], { x: 5.3, y: 3.2, w: 4.0, h: 1.6, fontSize: 13 });
  ref(s, BK + "; Martin Fowler, Yagni"); }

// 18 throw one away
{ const s = lightSlide(pres, S4, "Plan to Throw One Away และการกลับคำของ Brooks", "ในหนังสือเดิม Brooks แนะนำให้วางแผนทิ้งระบบแรก แต่ในฉบับครบรอบ 20 ปีเขากลับคำเอง บอกว่าใช้ได้กับ waterfall เท่านั้น และเสนอ incremental ผู้เขียนกลับคำตัวเองเป็นบทเรียนในตัวมันเอง");
  box(s, pres, 0.5, 1.3, 4.1, 2.3, K.paper); T(s, [{ text: "หนังสือเดิม (1975)", options: { bold: true, color: K.mute, breakLine: true, fontSize: 13 } }, { text: "\"จงวางแผนที่จะทิ้งระบบแรกไป เพราะยังไงคุณก็จะต้องทิ้งมันอยู่ดี\"", options: { bold: true, fontSize: 15 } }], { x: 0.7, y: 1.4, w: 3.7, h: 2.1, valign: "middle" });
  arrow(s, pres, 4.65, 5.35, 2.45, K.amber);
  box(s, pres, 5.4, 1.3, 4.1, 2.3, K.greenT); T(s, [{ text: "ฉบับครบรอบ 20 ปี (1995)", options: { bold: true, color: K.green, breakLine: true, fontSize: 13 } }, { text: "กลับคำเอง: ใช้ได้กับ waterfall เท่านั้น ให้พัฒนาแบบ incremental แทน", options: { bold: true, fontSize: 15 } }], { x: 5.6, y: 1.4, w: 3.7, h: 2.1, valign: "middle" });
  box(s, pres, 0.5, 3.8, 9, 1.1, K.amberT); T(s, "Incremental คือสร้างระบบที่ทำงานได้ตั้งแต่ตัวเล็ก แล้วขยายทีละขั้น เป็นบรรพบุรุษของการ deploy ระบบเปล่า ๆ ตั้งแต่สัปดาห์แรก การยึดติดกับสิ่งที่เคยพูดมีต้นทุนสูงกว่าการยอมรับว่าเข้าใจใหม่", { x: 0.7, y: 3.8, w: 8.6, h: 1.1, fontSize: 13, valign: "middle" });
  ref(s, BK); }

// 19 catastrophe
{ const s = lightSlide(pres, S5, "โครงการสายไปหนึ่งปีได้อย่างไร ทีละวัน", "หายนะไม่ได้มาจากเหตุการณ์ใหญ่ครั้งเดียว แต่มาจากการสายวันละนิดที่ไม่มีใครรายงาน Brooks เสนอ milestone แหลมคมที่เถียงไม่ได้ว่าผ่านหรือไม่ผ่าน ซึ่งก็คือขั้น Verify ของ loop");
  flow(s, pres, [{ t: "สาย 1 วัน", sub: "\"เดี๋ยวตามทัน\"", fill: K.greenT }, { t: "สาย 3 วัน", sub: "\"ยังไม่ต้องบอกใคร\"", fill: K.amberT }, { t: "สาย 2 สัปดาห์", sub: "\"บอกไปก็เสียหน้า\"", fill: K.amberT }, { t: "สาย 2 เดือน", sub: "สายเกินแก้", fill: K.redT }], 0.5, 1.3, 9, 1.3, { gap: 0.3, fs: 14, sfs: 12 });
  box(s, pres, 0.5, 2.9, 4.4, 2.0, K.redT); T(s, [{ text: "milestone คลุมเครือ (ไม่ช่วย)", options: { bold: true, color: K.red, breakLine: true, fontSize: 13 } }, { text: "\"เขียน backend เสร็จ 80%\"", options: { bold: true, fontSize: 16 } }], { x: 0.7, y: 3.0, w: 4.0, h: 1.8, valign: "middle" });
  box(s, pres, 5.1, 2.9, 4.4, 2.0, K.greenT); T(s, [{ text: "milestone แหลมคม (ช่วย)", options: { bold: true, color: K.green, breakLine: true, fontSize: 13 } }, { text: "POST /api/bookings ตอบ 201 บน staging และ E2E test เขียวใน CI", options: { bold: true, fontSize: 14 } }], { x: 5.3, y: 3.0, w: 4.0, h: 1.8, valign: "middle" });
  ref(s, BK); }

// 20 NSB statement
{ const s = lightSlide(pres, S6, "No Silver Bullet: ข้อเสนอหลัก", "บทความปี 1986 เสนอว่าไม่มีเทคโนโลยีหรือวิธีบริหารเดียวที่เพิ่มผลิตภาพ 10 เท่าภายในทศวรรษ ชื่อมาจากตำนานมนุษย์หมาป่า ข้อที่คนอ่านผิดบ่อยคือ Brooks ไม่ได้บอกว่าก้าวหน้าไม่ได้ แต่ก้าวหน้าจากการสะสมปรับปรุงเล็ก ๆ");
  big(s, 0.5, 1.3, 2.8, "10 เท่า", "ใน 1 ทศวรรษ จากเทคโนโลยีเดียว คือสิ่งที่ Brooks บอกว่าไม่มี", K.tealT, K.teal);
  box(s, pres, 3.6, 1.3, 5.9, 1.9, K.paper); T(s, "ไม่มีเทคโนโลยีหรือวิธีบริหารเดียวใด ที่จะทำให้ผลิตภาพ ความน่าเชื่อถือ หรือความเรียบง่ายดีขึ้นถึง 10 เท่าภายในหนึ่งทศวรรษ", { x: 3.85, y: 1.3, w: 5.4, h: 1.9, fontSize: 15, bold: true, valign: "middle" });
  box(s, pres, 0.5, 3.45, 4.4, 1.45, K.amberT); T(s, [{ text: "ที่มาของชื่อ", options: { bold: true, color: "B5651D", breakLine: true } }, { text: "ตำนานมนุษย์หมาป่า: ดูเหมือนคนธรรมดาแต่กลายเป็นสัตว์ร้ายโดยไม่ทันตั้งตัว" }], { x: 0.7, y: 3.5, w: 4.0, h: 1.35, fontSize: 13 });
  box(s, pres, 5.1, 3.45, 4.4, 1.45, K.greenT); T(s, [{ text: "ข้อที่คนอ่านผิดบ่อย", options: { bold: true, color: K.green, breakLine: true } }, { text: "ไม่ได้บอกว่าก้าวหน้าไม่ได้ แต่ก้าวหน้ามาจากการสะสมปรับปรุงเล็ก ๆ หลายอย่าง" }], { x: 5.3, y: 3.5, w: 4.0, h: 1.35, fontSize: 13 });
  ref(s, NSB); }

// 21 essence vs accident
{ const s = lightSlide(pres, S6, "Essence กับ Accident: อะไรลดได้ อะไรลดไม่ได้", "Accidental complexity มาจากเครื่องมือและวิธีทำงาน ลดได้ Essential complexity ติดมากับตัวปัญหา ลดไม่ได้ Brooks คำนวณว่าถ้า accidental กิน 9 ใน 10 ส่วน ลบทิ้งหมดก็เร็วขึ้นแค่ 10 เท่า และความจริงสัดส่วนนั้นน้อยกว่านั้นมาก");
  const col = (x, ttl, fill, c, items, res) => { box(s, pres, x, 1.3, 4.4, 2.7, fill); T(s, ttl, { x: x + 0.2, y: 1.38, w: 4.0, h: 0.4, fontSize: 14, bold: true, color: c });
    T(s, bullets(items), { x: x + 0.2, y: 1.85, w: 4.0, h: 1.4, fontSize: 13 }); T(s, res, { x: x + 0.2, y: 3.4, w: 4.0, h: 0.55, fontSize: 13, bold: true, color: c }); };
  col(0.5, "Accidental: ลดได้", K.greenT, K.green, ["จัดการหน่วยความจำเอง", "เขียน assembly", "ตั้ง server ด้วยมือ", "เขียน boilerplate ซ้ำ ๆ"], "เครื่องมือใหม่ช่วยได้มาก หายไปตามยุค");
  col(5.1, "Essential: ลดไม่ได้", K.redT, K.red, ["ตัดสินว่าจะสร้างอะไร", "ทำให้ความต้องการหลายฝ่ายลงตัว", "business rule ที่พันกัน", "โจทย์ที่เปลี่ยนไม่หยุด"], "เครื่องมือช่วยได้น้อย ยังอยู่เท่าเดิม");
  box(s, pres, 0.5, 4.15, 9, 0.75, K.paper); T(s, "ถ้า accidental กิน 9 ใน 10 ส่วน ลบทิ้งหมดก็เร็วขึ้นได้แค่ 10 เท่า ความจริงสัดส่วนน้อยกว่านั้น เพดานจึงต่ำกว่านั้นอีก", { x: 0.7, y: 4.15, w: 8.6, h: 0.75, fontSize: 13, valign: "middle", bold: true });
  ref(s, NSB); }

// 22 four properties
{ const s = lightSlide(pres, S6, "คุณสมบัติ 4 ข้อของ Essential Complexity", "สี่คุณสมบัติคือ Complexity, Conformity, Changeability และ Invisibility ข้อ Invisibility ส่งผลกับวิธีทำงานมากที่สุด เพราะมองไม่เห็นจึงต้องสร้างสัญญาณ เช่น test เขียวหรือแดง log ที่มีโครงสร้าง และ metric");
  rowsTable(s, pres, [["Complexity", "ไม่มีสองส่วนที่เหมือนกันเป๊ะ", "สะพานใช้เสาเหมือนกัน 200 ต้น แต่ระบบ 200 หน้าจอไม่มีสองหน้าที่เหมือนกันจริง"], ["Conformity", "ต้องปรับตัวเข้าหาระบบที่มนุษย์สร้างไว้ก่อน", "กฎคิดค่าหน่วยกิตแต่ละคณะไม่เหมือนกัน นอกจาก \"ตกลงกันไว้อย่างนั้น\""], ["Changeability", "ถูกกดดันให้เปลี่ยนตลอด เพราะดู \"เปลี่ยนง่าย\"", "ไม่มีใครขอย้ายเสาสะพาน แต่ทุกคนขอเพิ่มปุ่ม"], ["Invisibility", "มองไม่เห็นด้วยตา สื่อสารและตรวจสอบยาก", "แผนผังบ้านวาดแผ่นเดียวได้ แต่ซอฟต์แวร์ต้องหลายมุมมองและยังไม่ครบ"]], 0.5, 1.3, [1.8, 3.2, 4.0], 0.68, { head: ["คุณสมบัติ", "ความหมาย", "ตัวอย่างในโครงการจริง"], fs: 12 });
  box(s, pres, 0.5, 4.75, 9, 0.35, K.amberT); T(s, "Invisibility ชดเชยด้วย test เขียว/แดง, log มีโครงสร้าง, metric ที่วัดได้", { x: 0.7, y: 4.75, w: 8.6, h: 0.35, fontSize: 12, bold: true, valign: "middle" });
  ref(s, NSB); }

// 23 verdicts
{ const s = lightSlide(pres, S6, "กระสุนเงินที่ Brooks ตรวจแล้วปฏิเสธ", "Brooks ไล่ตรวจความหวังของปี 1986 ทีละข้อ และสรุปว่าแต่ละข้อแก้ได้แค่ accident ให้ผู้เรียนอ่านคำวินิจฉัยของแต่ละข้อ โดยเฉพาะ Automatic programming ที่จะพูดถึงในหน้าถัดไป");
  rowsTable(s, pres, [["ภาษาระดับสูง เช่น Ada", "ช่วยมาก แต่เป็น accident ล้วน"], ["Object-Oriented Programming", "ช่วยลด accident ได้ดี แต่ไม่ใช่ 10 เท่า"], ["ปัญญาประดิษฐ์และ expert system", "ยังไม่พร้อม และไม่แตะ essence"], ["Automatic programming", "เป็นเพียงการเปลี่ยนชื่อของ \"ภาษาระดับสูงกว่าเดิม\""], ["Graphical programming", "หน้าจอเล็กเกินไปสำหรับความซับซ้อนจริง"], ["Program verification", "พิสูจน์ว่าตรง spec แต่ไม่ได้พิสูจน์ว่า spec ถูก"], ["Environment และ tool ที่ดีขึ้น", "ช่วย แต่กำไรเหลือน้อยลงเรื่อย ๆ"]], 0.5, 1.3, [3.6, 5.4], 0.42, { head: ["ผู้ท้าชิงในปี 1986", "คำวินิจฉัยของ Brooks"], fs: 13, noBold: false });
  ref(s, NSB); }

// 24 outcomes
{ const s = lightSlide(pres, S6, "สิ่งที่เกิดขึ้นจริงในเวลาต่อมา", "ย้อนดูว่าความหวังเหล่านี้เป็นอย่างไรในเวลาต่อมา แถวที่ควรจำที่สุดคือ Automatic programming ซึ่งไม่เคยมีความหมายชัดเจน เป็นคำโฆษณาที่กลับมาทุก 10 ถึง 15 ปีในชื่อใหม่ ได้ผลจริงบางส่วนแต่ไม่เคยลบ essence");
  rowsTable(s, pres, [["Ada", "กระทรวงกลาโหมสหรัฐฯ บังคับใช้ช่วงปี 1991–1997 แล้วยกเลิกเพราะไม่ได้ผลอย่างที่หวัง"], ["AI และ expert system", "ฤดูหนาวของ AI ตามมาในทศวรรษ 1990"], ["Automatic programming", "วนกลับมาซ้ำในชื่อ CASE tool, 4GL, MDA, low-code และล่าสุดเครื่องมือ AI"], ["Program verification", "ยังใช้เฉพาะระบบวิกฤต เช่น การบินและการแพทย์"], ["Environment และ tool", "IDE สมัยใหม่ดีมาก แต่ไม่มีใครอ้างว่าเร็วขึ้น 10 เท่า"]], 0.5, 1.3, [2.6, 6.4], 0.62, { head: ["ผู้ท้าชิง", "ต่อมาเป็นอย่างไร"], fs: 13, fills: [K.paper, K.paper, K.amberT, K.paper, K.paper] });
  ref(s, NSB); }

// 25 approaches
{ const s = lightSlide(pres, S6, "4 แนวทางที่ Brooks บอกว่าพอจะได้ผล", "Brooks ไม่ได้มองโลกในแง่ร้าย เขาเสนอ 4 แนวทางที่โจมตี essence โดยตรง ข้อแรกคือซื้อแทนสร้าง ซึ่งยังถูกที่สุดในปี 2026 และทีมนักศึกษาละเลยบ่อยที่สุด ข้อ 2 และ 3 เป็นรากของ agile ส่วนข้อ 4 คือเหตุผลที่การพัฒนาคนคุ้มกว่าซื้อเครื่องมือ");
  const a = [["ซื้อแทนสร้าง", "ซอฟต์แวร์ที่ดีที่สุดคือซอฟต์แวร์ที่ไม่ต้องเขียน"], ["ทำต้นแบบเร็ว ๆ", "ลูกค้าไม่รู้ว่าตัวเองต้องการอะไรจนกว่าจะได้เห็น"], ["ปลูกให้โต ไม่ใช่ประกอบ", "ระบบที่ทำงานได้ตั้งแต่เล็ก แล้วค่อยขยาย"], ["ลงทุนกับนักออกแบบที่ยอดเยี่ยม", "ความต่างระหว่างคนธรรมดากับคนเก่งมากไม่ใช่เรื่องเล็ก"]];
  a.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.75; box(s, pres, x, y, 4.4, 1.6, K.tealT); chip(s, pres, x + 0.15, y + 0.15, i + 1, K.teal);
    T(s, [{ text: t[0], options: { bold: true, fontSize: 15, breakLine: true } }, { text: t[1], options: { fontSize: 13, color: K.ink2 } }], { x: x + 0.75, y: y + 0.1, w: 3.5, h: 1.4, valign: "middle" }); });
  box(s, pres, 0.5, 4.8, 9, 0.3, K.paper); T(s, "ข้อ 1 ถูกที่สุดในปี 2026 และทีมนักศึกษาละเลยบ่อยที่สุด", { x: 0.7, y: 4.8, w: 8.6, h: 0.3, fontSize: 12, bold: true, valign: "middle" });
  ref(s, NSB); }

// 26 real cases
{ const s = lightSlide(pres, S6, "กรณีศึกษาจริง: กระสุนเงินที่ยิงแล้วไม่โดน", "ห้ากรณีนี้แสดงบทเรียนต่างกัน Ada คือเครื่องมือที่ดีกว่าไม่แก้ปัญหาที่ไม่ได้มาจากเครื่องมือ Denver คือ essence ปรากฏพร้อมกัน Knight Capital คือเรื่องของกระบวนการ deploy NHS และ HealthCare.gov คือเงินซื้อ essence ไม่ได้ ส่วน cloud คือกระสุนที่โดนเป้าครึ่งเดียว");
  const c = [["Ada", "ภาษาดี แต่โครงการไม่เสร็จตรงเวลาขึ้นมาก ข้อบังคับถูกยกเลิกปี 1997", "เครื่องมือที่ดีกว่าไม่แก้ปัญหาที่ไม่ได้เกิดจากเครื่องมือ"], ["Denver", "สนามบินเปิดช้าราว 16 เดือน ต้นทุนบานปลายหลายร้อยล้านดอลลาร์", "essence ทั้งสามปรากฏพร้อมกัน"], ["Knight Capital", "1 ส.ค. 2012 เสียราว 460 ล้านดอลลาร์ใน 45 นาที เซิร์ฟเวอร์ 1 ใน 8 ไม่ได้ code ใหม่", "ปัญหาอยู่ที่กระบวนการ deploy ไม่ใช่เทคโนโลยี"], ["NHS และ HealthCare.gov", "NHS ถูกยกเลิกปี 2011 HealthCare.gov เปิดตุลาคม 2013 แล้วใช้แทบไม่ได้", "เงินซื้อ essence ไม่ได้ เพิ่มผู้รับเหมาคือ Brooks's Law ระดับองค์กร"], ["Cloud", "ก่อนปี 2006 รอเป็นสัปดาห์ถึงเดือน วันนี้ไม่กี่นาที", "ลด accident เกิน 10 เท่า แต่ไม่ช่วยตัดสินว่าจะสร้างอะไร"]];
  c.forEach((a, i) => { const y = 1.25 + i * 0.72; box(s, pres, 0.5, y, 9, 0.66, i === 4 ? K.greenT : K.paper);
    T(s, a[0], { x: 0.65, y, w: 1.7, h: 0.66, fontSize: 12, bold: true, valign: "middle", color: K.teal }); T(s, a[1], { x: 2.4, y, w: 3.6, h: 0.66, fontSize: 11, valign: "middle" }); T(s, a[2], { x: 6.1, y, w: 3.3, h: 0.66, fontSize: 11, bold: true, valign: "middle" }); });
  ref(s, "U.S. GAO (Denver, GAO/RCED-95-35BR; HealthCare.gov, GAO-14-694); U.S. SEC Release No. 34-70694; UK NAO (NHS National Programme for IT)"); }

// 27 AI table
{ const s = lightSlide(pres, S7, "AI เป็น silver bullet หรือเปล่า", "ลองใช้กรอบของ Brooks วิเคราะห์ AI ตามตรง AI ช่วยด้าน accidental ได้มาก ช่วยด้าน essential ได้น้อยหรือไม่ช่วย และบางด้านอาจแย่ลง การตัดสินว่าจะสร้างอะไรเป็นเรื่องคุณค่า ไม่ใช่เรื่องข้อมูล");
  const G = K.greenT, A = K.amberT, R = K.redT;
  rowsTable(s, pres, [["Accidental: boilerplate, แปลงภาษา, config", "ช่วยได้มาก", "ในบางงานเกิน 10 เท่าจริง"], ["Accidental: ค้นเอกสาร, อธิบาย code", "ช่วยได้มาก", "ลดเวลาเรียนรู้ชัดเจน"], ["Essential: Complexity", "ช่วยได้บ้าง", "ความซับซ้อนของโดเมนไม่ลดลง"], ["Essential: Conformity", "ช่วยได้บ้าง", "ยังต้องมีคนบอกว่ากฎคืออะไร"], ["Essential: Changeability", "แทบไม่ช่วย", "อาจแย่ลง เพราะมีของให้ดูแลมากขึ้น"], ["Essential: Invisibility", "ไม่ช่วย", "อาจแย่ลง เพราะมี code ที่ไม่มีใครอ่าน"], ["ตัดสินว่าจะสร้างอะไร", "ไม่ช่วย", "เป็นเรื่องคุณค่า ไม่ใช่ข้อมูล"]], 0.5, 1.3, [3.5, 1.6, 3.9], 0.43, { head: ["ด้าน", "ระดับที่ AI ช่วย", "อธิบาย"], fs: 12, fills: [G, G, A, A, R, R, R] });
  ref(s, NSB + " (นำกรอบมาวิเคราะห์ AI ตามที่ reading สรุป)"); }

// 28 evidence
{ const s = lightSlide(pres, S7, "หลักฐานเชิงประจักษ์ยังไม่นิ่ง และขัดแย้งกันเอง", "งานวิจัย 3 ชิ้นให้ผลต่างกัน Copilot RCT เร็วขึ้น 56% ในงานเดี่ยวที่โจทย์ชัด METR ช้าลง 19% กับนักพัฒนาที่รู้ repo ดี DORA พบว่าระดับระบบแย่ลงแม้ผลิตภาพรายบุคคลเพิ่ม ความขัดแย้งนี้มีเหตุผล");
  const e = [["GitHub Copilot RCT", "Peng et al., 2023", "งานเดี่ยวที่โจทย์ชัด: เขียน HTTP server ด้วย JavaScript", "เร็วขึ้น ~56%", K.greenT, K.green], ["METR RCT", "2025", "นักพัฒนา open source ประสบการณ์เฉลี่ย 5 ปี กับ repo ตัวเอง 246 งานจริง", "ช้าลง 19%", K.redT, K.red], ["DORA State of DevOps", "2024", "ทีมทั่วโลก ความสัมพันธ์ระหว่างการใช้ AI กับตัวชี้วัดการส่งมอบ", "ใช้ AI +25% : throughput -1.5% และ stability -7.2% ส่วนผลิตภาพรายบุคคลและความพึงพอใจเพิ่ม", K.amberT, "B5651D"]];
  e.forEach((a, i) => { const y = 1.3 + i * 1.2; box(s, pres, 0.5, y, 9, 1.1, K.paper); box(s, pres, 6.2, y, 3.3, 1.1, a[4]);
    T(s, [{ text: a[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: a[1], options: { fontSize: 11, color: K.mute } }], { x: 0.7, y, w: 1.9, h: 1.1, valign: "middle" });
    T(s, a[2], { x: 2.7, y, w: 3.4, h: 1.1, fontSize: 12, valign: "middle" }); T(s, a[3], { x: 6.35, y, w: 3.0, h: 1.1, fontSize: i === 2 ? 11 : 16, bold: true, color: a[5], valign: "middle", align: i === 2 ? "left" : "center" }); });
  ref(s, "Peng et al. (2023); METR (2025); DORA, Accelerate State of DevOps Report 2024"); }

// 29 explained + METR gap
{ const s = lightSlide(pres, S7, "อธิบายความขัดแย้งด้วยกรอบของ Brooks", "งานใหม่ในโจทย์ชัดเป็น accidental เป็นส่วนใหญ่ AI จึงช่วยมาก งานในระบบเก่าที่ตัวเองรู้ดีเป็น essential เป็นส่วนใหญ่ AI ช่วยน้อยและเพิ่มต้นทุนตรวจสอบ ระดับระบบจะเร็วขึ้นก็ต่อเมื่อขั้น Verify ขยายตามทัน");
  box(s, pres, 0.5, 1.3, 4.4, 1.15, K.greenT); T(s, [{ text: "งานใหม่ในโจทย์ชัด = accidental เป็นส่วนใหญ่", options: { bold: true, breakLine: true, fontSize: 13 } }, { text: "AI ช่วยได้มาก", options: { fontSize: 13, color: K.green, bold: true } }], { x: 0.7, y: 1.3, w: 4.0, h: 1.15, valign: "middle" });
  box(s, pres, 5.1, 1.3, 4.4, 1.15, K.redT); T(s, [{ text: "ระบบเก่าที่รู้ดี = essential เป็นส่วนใหญ่", options: { bold: true, breakLine: true, fontSize: 13 } }, { text: "AI ช่วยน้อย และมีต้นทุนตรวจสอบเพิ่ม", options: { fontSize: 13, color: K.red, bold: true } }], { x: 5.3, y: 1.3, w: 4.0, h: 1.15, valign: "middle" });
  box(s, pres, 0.5, 2.7, 9, 0.55, K.paper); T(s, "ระดับบุคคลเร็วขึ้น แล้วระดับระบบเร็วขึ้นด้วยไหม", { x: 0.5, y: 2.7, w: 9, h: 0.55, align: "center", valign: "middle", fontSize: 14, bold: true });
  box(s, pres, 0.5, 3.45, 4.4, 1.5, K.amberT); T(s, [{ text: "ถ้า Verify ขยายตามไม่ทัน", options: { bold: true, breakLine: true, fontSize: 13 } }, { text: "ไม่ คอขวดย้ายไปที่ review และ stability", options: { fontSize: 13 } }], { x: 0.7, y: 3.45, w: 4.0, h: 1.5, valign: "middle" });
  box(s, pres, 5.1, 3.45, 4.4, 1.5, K.greenT); T(s, [{ text: "ถ้าลงทุนกับ test และ CI ด้วย", options: { bold: true, breakLine: true, fontSize: 13 } }, { text: "ใช่ ระดับระบบเร็วขึ้นด้วย", options: { fontSize: 13 } }], { x: 5.3, y: 3.45, w: 4.0, h: 1.5, valign: "middle" });
  ref(s, NSB + "; METR (2025); DORA 2024"); }

// 30 METR numbers
{ const s = lightSlide(pres, S7, "ผลจาก METR: ช่องว่าง 39 จุดคือสิ่งที่น่าสนใจ", "สิ่งที่น่าสนใจที่สุดในผล METR ไม่ใช่ 19% แต่เป็นช่องว่าง 39 จุดระหว่างที่เกิดจริงกับที่ผู้เข้าร่วมเชื่อ นี่คือ automation bias ที่วัดเป็นตัวเลขได้ จึงต้องวัดของจริงแทนการถามความรู้สึก");
  big(s, 0.5, 1.3, 2.8, "ช้าลง 19%", "สิ่งที่เกิดขึ้นจริงเมื่อใช้ AI", K.redT, K.red, 1.9, 26);
  big(s, 3.6, 1.3, 2.8, "เร็วขึ้น 20%", "สิ่งที่ผู้เข้าร่วมเชื่อว่าเกิดขึ้น", K.greenT, K.green, 1.9, 26);
  big(s, 6.7, 1.3, 2.8, "39 จุด", "ช่องว่างระหว่างความจริงกับความเชื่อ", K.amberT, "B5651D", 1.9, 26);
  box(s, pres, 0.5, 3.45, 9, 1.45, K.paper); T(s, [{ text: "นี่คือ automation bias ที่วัดเป็นตัวเลขได้", options: { bold: true, breakLine: true, fontSize: 15, color: K.teal } }, { text: "จึงต้องวัดของจริง แทนการถามความรู้สึก", options: { fontSize: 15 } }], { x: 0.75, y: 3.45, w: 8.5, h: 1.45, valign: "middle" });
  ref(s, "METR (2025), Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity"); }

// 31 case METR
caseSlide(pres, S7, { title: "กรณีตัวอย่าง: อ่านผล METR ให้ถูก", tag: "อย่าอ่านผิดแบบนี้", facts: ["อย่าอ่านผลว่า \"อย่าใช้ AI\"", "มันวัดในบริบทเฉพาะมาก คือคนที่เชี่ยวชาญ repo ของตัวเองอยู่แล้ว", "เป็นสถานการณ์ที่ AI ได้เปรียบน้อยที่สุด", "ผลของเครื่องมือขึ้นกับว่างานเป็น accident หรือ essence เป็นหลัก"], principle: "คำถามก่อนหยิบเครื่องมือ", takeaway: "\"งานตรงหน้าเป็นแบบไหน\"", refs: "METR (2025)",
  notes: "ย้ำว่าผลวิจัยต้องอ่านพร้อมบริบท การวัดครั้งนี้เป็นกรณีที่ AI ได้เปรียบน้อยที่สุด จึงไม่ใช่ข้อสรุปว่าห้ามใช้ AI คำถามที่ควรถามคือ งานตรงหน้าเป็น accident หรือ essence" });

// 32 considerations
{ const s = lightSlide(pres, S7, "7 สิ่งที่ต้องคำนึงถึงในยุคปัจจุบัน", "สรุป 7 ข้อสำหรับยุค AI ความเร็วบุคคลไม่เท่าความเร็วระบบ ต้นทุนย้ายไปที่การตรวจสอบ ต้นทุนอยู่ที่การดูแล conceptual integrity เสี่ยงกว่าเดิม ตรวจคำโฆษณา automatic programming มีความเสี่ยงใหม่ และคนตั้งโจทย์เป็นมีค่ามากขึ้น");
  const a = ["ความเร็วระดับบุคคลไม่เท่ากับความเร็วระดับระบบ (ถ้า review คือคอขวด เขียนเร็วขึ้นสองเท่า คิวก็ยาวขึ้นสองเท่า)", "ต้นทุนย้ายจากการเขียนไปที่การตรวจสอบ เกิด verification debt คือ code ที่ไม่มีใครเคยอ่าน", "ต้นทุนตลอดอายุอยู่ที่การดูแล ไม่ใช่การเขียนครั้งแรก", "Conceptual integrity เสี่ยงกว่าเดิม เพราะ agent ไม่มีความทรงจำร่วม ต้องเขียนกฎเป็นข้อความและบังคับด้วยเครื่องมือ", "คำโฆษณา \"ไม่ต้องเขียน code อีกต่อไป\" ให้ถาม: ลด accidental หรือลบ essential? ผิดแล้วรู้ได้อย่างไร? ใครรับผิดชอบเมื่อพังบน production?", "ความเสี่ยงใหม่ที่ Brooks ไม่ได้เห็น: dependency ที่ AI แนะนำ ข้อมูลรั่วผ่าน prompt agent ทำสิ่งที่ย้อนกลับไม่ได้", "คนที่ตั้งโจทย์เป็นมีค่ามากขึ้น คือแปลงความต้องการคลุมเครือเป็นข้อกำหนดที่ตรวจสอบได้"];
  a.forEach((t, i) => { const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4, x = 0.5 + col * 4.6, h = col === 0 ? 0.85 : 1.1, y = 1.25 + row * (h + 0.08);
    box(s, pres, x, y, 4.4, h, K.paper); chip(s, pres, x + 0.1, y + (h - 0.36) / 2, i + 1, K.teal, K.white, 0.36); T(s, t, { x: x + 0.55, y, w: 3.75, h, fontSize: 11, valign: "middle" }); });
  ref(s, NSB + "; " + BK); }

// 33 summary of loop
{ const s = lightSlide(pres, S7, "AI ตัดต้นทุนขั้น Act แต่ไม่ตัด Context และ Verify", "ข้อสรุปที่ตรงกับสิ่งที่วิชานี้สอน AI ตัดต้นทุนของขั้น Act ลงมาก แต่ไม่ได้ตัดต้นทุนของ Context และ Verify สิ่งที่จำกัดความเร็วของทีมจึงย้ายไปสองขั้นนั้น เป็นเหตุผลที่หลักสูตรลงทุนกับ spec test CI และ observability");
  flow(s, pres, [{ t: "Context", sub: "ต้นทุนไม่ลด", fill: K.amberT }, { t: "Act", sub: "ต้นทุนลดลงมาก", fill: K.greenT }, { t: "Verify", sub: "ต้นทุนไม่ลด", fill: K.amberT }], 0.5, 1.5, 9, 1.4, { gap: 0.6, fs: 20, sfs: 14 });
  box(s, pres, 0.5, 3.3, 9, 1.55, K.paper); T(s, [{ text: "ความเร็วของทีมจึงถูกจำกัดที่ Context และ Verify", options: { bold: true, fontSize: 16, color: K.teal, breakLine: true } }, { text: "เหตุผลที่หลักสูตรนี้ลงทุนกับ spec, test, CI และ observability", options: { fontSize: 15 } }], { x: 0.75, y: 3.3, w: 8.5, h: 1.55, valign: "middle" });
  ref(s, NSB + "; " + BK); }

// 34 what changed
{ const s = lightSlide(pres, S8, "อะไรเปลี่ยนไปแล้ว และอะไรยังเหมือนเดิม", "ส่วนใหญ่ของข้อเสนอในหนังสือยังจริงในปี 2026 มีสองข้อที่เปลี่ยน คือ Plan to throw one away ที่ผู้เขียนกลับคำเอง และการประมาณด้วย man-month ที่เลิกใช้เป็นหน่วยหลัก");
  const st = (t) => t.startsWith("ยังจริง") ? K.greenT : K.amberT;
  const rows = [["Brooks's Law", "ยังจริง งานวิจัยสมัยใหม่เรื่องขนาดทีมยืนยันทิศทางเดียวกัน"], ["ต้นทุนสื่อสารแบบกำลังสอง", "ยังจริงทางคณิตศาสตร์ แต่เครื่องมือช่วยลดค่าคงที่ได้"], ["Conceptual integrity", "ยังจริง และสำคัญขึ้นเมื่อ AI ร่วมเขียน code"], ["Programming Systems Product 9 เท่า", "ยังจริง แม้ CI/CD จะลดบางส่วนลง"], ["Second-system effect", "ยังจริงมาก"], ["\"Plan to throw one away\"", "ผู้เขียนกลับคำเอง ให้ใช้ incremental แทน"], ["Surgical team", "แนวคิดยังใช้ได้ แต่เปลี่ยนเป็นทีมข้ามสายงานที่เป็นเจ้าของงานร่วมกัน"], ["สื่อสารด้วยเอกสารกระดาษ", "เปลี่ยนเป็นเอกสารใน repo ที่ตรวจสอบอัตโนมัติได้"], ["ประมาณด้วย man-month", "เลิกใช้เป็นหน่วยหลักในทีมสมัยใหม่"]];
  rowsTable(s, pres, rows.map(r => r), 0.5, 1.2, [3.4, 5.6], 0.3, { head: ["ข้อเสนอในหนังสือ", "สถานะในปี 2026"], fs: 12, fills: rows.map(r => st(r[1])) });
  ref(s, BK + "; " + NSB); }

// 35 what Brooks didn't expect
{ const s = lightSlide(pres, S8, "สิ่งที่ Brooks ไม่ได้คาด แต่เปลี่ยนสมการจริง", "สี่อย่างนี้เปลี่ยนสมการ ทั้งหมดโจมตี accidental complexity ซึ่งตรงกับที่ Brooks ทำนายว่าความก้าวหน้าจะมาจากด้านนี้ และไม่มีอันไหนแก้ essential complexity ได้");
  const a = [["ทดสอบอัตโนมัติและ CI", "ลดต้นทุน integrate ซึ่งสมัย OS/360 คือฝันร้าย"], ["Open source", "ทีมเล็กใช้ของที่ทีมใหญ่สร้างไว้ได้"], ["Cloud", "ตัดงาน infrastructure ที่เคยกินคนไปเป็นทีม"], ["AI agent", "ลดต้นทุนของขั้นลงมือลงอย่างมีนัยสำคัญ"]];
  a.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.4; box(s, pres, x, y, 4.4, 1.25, K.greenT); T(s, [{ text: t[0], options: { bold: true, fontSize: 15, breakLine: true } }, { text: t[1], options: { fontSize: 13 } }], { x: x + 0.2, y, w: 4.0, h: 1.25, valign: "middle" }); });
  box(s, pres, 0.5, 4.15, 9, 0.75, K.amberT); T(s, "ทั้ง 4 อย่างโจมตี accidental complexity ตรงกับที่ Brooks ทำนาย และไม่มีอันไหนแก้ essential ได้", { x: 0.7, y: 4.15, w: 8.6, h: 0.75, fontSize: 14, bold: true, valign: "middle" });
  ref(s, BK + "; " + NSB); }

// 36 checklist
{ const s = lightSlide(pres, S8, "เอาไปใช้กับโครงการกลุ่มอย่างไร", "เช็กลิสต์ 7 ข้อสำหรับโครงการกลุ่ม ให้ผู้เรียนเลือกหนึ่งข้อที่ทีมตัวเองมีความเสี่ยงที่สุด แล้ววางแผนรับมือ");
  const a = ["อย่าเพิ่มคนสัปดาห์ท้าย ๆ ถ้างานสาย ให้ตัด scope แทน", "ประเมินเวลาระดับ Programming Systems Product ไม่ใช่แค่ \"code รัน\"", "มีคนเดียวตัดสินความสอดคล้องของการออกแบบ และเขียนกฎลง AGENTS.md", "ตั้ง milestone ที่เถียงไม่ได้ เช่น \"test เขียวใน CI\" ไม่ใช่ \"เสร็จ 80%\"", "รายงานความสายทันทีที่รู้ ไม่ใช่ตอนที่แก้ไม่ทันแล้ว", "ระวัง second-system effect เมื่อรอบแรกเสร็จแล้วเริ่มอยากเพิ่มของ", "จะเอาเครื่องมือใหม่เข้ามา ถามว่าลด accidental หรือหลบ essential"];
  a.forEach((t, i) => { const y = 1.25 + i * 0.53; box(s, pres, 0.5, y, 9, 0.47, K.paper); s.addShape(pres.ShapeType.rect, { x: 0.7, y: y + 0.12, w: 0.23, h: 0.23, fill: { color: K.white }, line: { color: K.teal, width: 1.5 } }); T(s, t, { x: 1.15, y, w: 8.2, h: 0.47, fontSize: 13, valign: "middle" }); });
  ref(s, BK); }

// 37 summary dark
{ const s = darkSlide(pres, S9, "สรุปบท 5 ข้อ ย้ำว่าความเร็วของงานซอฟต์แวร์ถูกจำกัดด้วยคนและความเข้าใจร่วมกัน ไม่ใช่ด้วยจำนวนบรรทัด code");
  T(s, "สรุป", { x: 0.7, y: 0.35, w: 8, h: 0.6, fontSize: 28, bold: true, color: K.white });
  const a = ["เพิ่มคนให้โครงการที่สายมักทำให้สายกว่าเดิม ช่องทางสื่อสารโตแบบกำลังสอง", "ของที่ส่งมอบได้จริงมีต้นทุนราว 9 เท่าของโปรแกรมที่รันได้", "Conceptual integrity ต้องมีเจ้าของ และต้องเขียนเป็นกฎที่อ่านและบังคับได้", "ไม่มี silver bullet: แยก accidental ออกจาก essential ก่อนเชื่อคำโฆษณา", "AI ลดต้นทุนขั้น Act แต่ความเร็วของทีมย้ายไปที่ Context และ Verify"];
  a.forEach((t, i) => { const y = 1.15 + i * 0.75; box(s, pres, 0.7, y, 8.6, 0.65, "1E3250"); chip(s, pres, 0.85, y + 0.12, i + 1, K.amber, K.ink, 0.42); T(s, t, { x: 1.5, y, w: 7.7, h: 0.65, fontSize: 14, color: K.white, valign: "middle" }); }); }

// 38-39 glossary
const gl = [["Man-month", "คน 1 คน ทำงาน 1 เดือน หน่วยนี้ชวนให้เข้าใจผิด"], ["Brooks's Law", "เพิ่มคนเข้าโครงการที่สายอยู่แล้ว ทำให้สายกว่าเดิม"], ["Communication path", "ช่องทางที่คนสองคนต้องประสานกัน เพิ่มแบบกำลังสอง"], ["Programming Systems Product", "ของที่ส่งมอบได้จริง ต่างจากโปรแกรมที่รันได้ประมาณ 9 เท่า"], ["Conceptual Integrity", "ความสอดคล้องของแนวคิดทั้งระบบ เหมือนคนคนเดียวออกแบบ"], ["Second-system effect", "ระบบที่สองมักบวม เพราะยัดทุกอย่างที่เคยอยากทำ"], ["Surgical team", "ทีมเล็กที่มีคนเก่งเป็นแกน คนอื่นคอยสนับสนุน"], ["Essential complexity", "ความซับซ้อนที่ติดมากับตัวปัญหาเอง เลี่ยงไม่ได้"], ["Accidental complexity", "ความซับซ้อนจากเครื่องมือและวิธีทำงาน ลดได้"], ["No Silver Bullet", "ไม่มีเทคโนโลยีเดียวที่เพิ่มผลิตภาพ 10 เท่าใน 1 ทศวรรษ"]];
[[0, 5, "Glossary (1/2)"], [5, 10, "Glossary (2/2)"]].forEach(([a, b, t]) => { const s = lightSlide(pres, S10, t, "อ่านศัพท์ทีละคำพร้อมความหมายในวิชานี้ ให้ผู้เรียนลองยกตัวอย่างจากโครงการของตัวเองสำหรับแต่ละคำ");
  rowsTable(s, pres, gl.slice(a, b), 0.5, 1.3, [3.2, 5.8], 0.62, { head: ["ศัพท์", "ความหมายในวิชานี้"], fs: 13, fills: gl.slice(a, b).map((_, i) => i % 2 ? K.tealT : K.paper) });
  ref(s, BK + "; " + NSB); });

// 40 Ref
{ const s = lightSlide(pres, S10, "Ref", "สไลด์นี้รวมเอกสารอ้างอิงทั้งหมดของบท ผู้เรียนควรเช็กกับแหล่งต้นฉบับก่อนเชื่อ");
  const refs = ["Brooks. The Mythical Man-Month: Essays on Software Engineering, Anniversary Edition (1995), Addison-Wesley", "Brooks. No Silver Bullet: Essence and Accident in Software Engineering (1986) (cs.unc.edu/techreports/86-020.pdf)", "Brooks. The Design of Design (2010)", "ACM. Turing Award ปี 1999 ของ Frederick Brooks (amturing.acm.org)", "Martin Fowler. Conway's Law; Yagni (martinfowler.com/bliki)", "DORA. Accelerate State of DevOps Report; Report 2024 (dora.dev)", "Peng, Kalliamvakou, Cihon & Demirer. The Impact of AI on Developer Productivity: Evidence from GitHub Copilot (2023) (arxiv.org/abs/2302.06590)", "METR. Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity (2025) (arxiv.org/abs/2507.09089)", "U.S. GAO. Denver International Airport: Impact of the Delayed Baggage System (GAO/RCED-95-35BR)", "U.S. SEC. Knight Capital Americas LLC, Release No. 34-70694 (2013)", "UK National Audit Office. National Programme for IT in the NHS", "U.S. GAO. HealthCare.gov (GAO-14-694)"];
  T(s, refs.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < refs.length - 1, paraSpaceAfter: 4 } })), { x: 0.5, y: 1.3, w: 9, h: 3.8, fontSize: 11 }); }

L.save(pres, "R05-mythical-man-month.pptx").then(() => console.log("ok"));
