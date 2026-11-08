const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, ref, codeBox, rowsTable } = L;
const S0 = "เปิด", S1 = "ทำไมและบทบาท", S2 = "ระดับและเทคนิค", S3 = "Coverage และ Test Double", S4 = "TDD และ Flaky", S5 = "Bug และ Defect", S6 = "ทดสอบกับ AI", S7 = "สรุป", S8 = "Glossary", S9 = "Ref";
const pres = L.newDeck("Software Testing: ภาพรวมและหลักการ", [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9]);
const bullets = (a, sp = 6) => a.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: sp } }));

// 1 ชื่อเรื่อง
{ const s = darkSlide(pres, S0, "เปิดบทอ่านเรื่อง Software Testing ภาพรวมและหลักการ เนื้อหาเชื่อมกับ loop ของวิชา test คือขั้น Verify ที่รันเองอัตโนมัติได้ คุณภาพของ test จึงเป็นเพดานของคุณภาพทั้ง loop รวมถึง loop ที่มี AI agent");
  T(s, "Reading 03", { x: 0.7, y: 1.3, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "Software Testing", { x: 0.7, y: 1.9, w: 8.6, h: 0.9, fontSize: 40, bold: true, color: K.white });
  T(s, "ภาพรวมและหลักการ", { x: 0.7, y: 2.9, w: 8.6, h: 0.7, fontSize: 28, color: "B8C4D4" });
  s.addShape(pres.ShapeType.rect, { x: 0.7, y: 3.9, w: 1.2, h: 0.06, fill: { color: K.amber }, line: { color: K.amber, width: 0 } }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "อ่านแล้วจะได้อะไร", "บทอ่านนี้พาไปไล่ตั้งแต่เหตุผลของการทดสอบ หน้าที่ของ tester เทคนิคออกแบบ test จัดการ bug จนถึงการทดสอบระบบที่มี AI ทั้ง 9 ข้อนี้คือสิ่งที่จะทำได้เมื่ออ่านจบ");
  const it = ["รู้หน้าที่ของ tester ในแต่ละ phase ไม่ใช่แค่ตอนท้าย", "เขียนรายงาน bug ที่ dev เอาไปทำต่อได้ทันที", "อธิบาย defect life cycle และรู้ว่าใครปิดใบได้", "เลือกระดับของ test ให้ตรงกับสิ่งที่อยากรู้", "ออกแบบ test case ด้วยเทคนิคที่มีหลักการ", "อ่านตัวเลข coverage โดยรู้ข้อจำกัดของมัน", "แยก test double 5 ชนิดและเลือกใช้ให้ถูก", "จัดการ flaky test อย่างเป็นระบบ", "ทดสอบระบบที่มี AI อยู่ข้างใน"];
  it.forEach((t, i) => { const x = 0.5 + (i % 3) * 3.05, y = 1.25 + Math.floor(i / 3) * 1.25; box(s, pres, x, y, 2.9, 1.15, K.paper); chip(s, pres, x + 0.12, y + 0.36, i + 1);
    T(s, t, { x: x + 0.65, y, w: 2.15, h: 1.15, fontSize: 13, valign: "middle" }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "ถามผู้เรียนก่อนว่า ถ้าส่วนหนึ่งของระบบพังไป อยากรู้ตอนไหนและจะแก้ยากแค่ไหน คำถามนี้ใช้ตัดสินว่าส่วนไหนควรมี test แน่นเป็นพิเศษ ตลอดบทจะวนกลับมาที่คำถามนี้");
  s.addShape(pres.ShapeType.rect, { x: 0.7, y: 1.3, w: 0.08, h: 2.4, fill: { color: K.amber }, line: { color: K.amber, width: 0 } });
  T(s, "คำถามเปิด", { x: 1.0, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "ถ้าตรงนี้พัง เราอยากรู้ตอนไหน\nและตอนนั้นจะแก้ยากแค่ไหน", { x: 1.0, y: 1.3, w: 8.5, h: 2.4, fontSize: 32, bold: true, color: K.white, valign: "middle" });
  T(s, "test คือขั้น Verify ที่ทำให้รันเองอัตโนมัติได้ คุณภาพของ test จึงเป็นเพดานของคุณภาพทั้ง loop", { x: 1.0, y: 4.0, w: 8.5, h: 0.7, fontSize: 15, color: "B8C4D4" }); }

// 4 ทำไมต้องทดสอบ
{ const s = lightSlide(pres, S1, "ทำไมต้องทดสอบ: ต้นทุนขึ้นกับเวลาที่เจอ", "เหตุผลจริงของการทดสอบคือ ต้นทุนของ bug ขึ้นกับว่าเจอเมื่อไร ตัวคูณที่มักถูกอ้างว่าแพงขึ้นกี่เท่ายังมีคนโต้แย้ง แต่ทิศทางว่ายิ่งเจอช้ายิ่งแก้แพงเป็นที่ยอมรับ เหตุผลคือบริบทที่หายไป test ที่รันใน 2 วินาทีย้ายจุดที่เจอ bug จากปลายทางมาไว้ต้นทาง");
  flow(s, pres, [{ t: "ตอนเขียน", sub: "ต้นทุนต่ำสุด", fill: K.greenT }, { t: "ตอน code review" }, { t: "ตอน integrate" }, { t: "ตอน QA" }, { t: "ผู้ใช้เจอเอง", sub: "ต้นทุนสูงสุด", fill: K.redT }], 0.5, 1.3, 9, 1.1, { gap: 0.25, fs: 13, sfs: 12 });
  T(s, "ไม่มีตัวเลขยืนยันว่าแพงขึ้นกี่เท่า แต่ทิศทางที่ว่ายิ่งเจอช้ายิ่งแพงเป็นที่ยอมรับทั่วไป", { x: 0.5, y: 2.55, w: 9, h: 0.3, fontSize: 12, color: K.mute, align: "center" });
  box(s, pres, 0.5, 3.0, 4.4, 1.95, K.greenT); T(s, "เจอตอนเขียน", { x: 0.7, y: 3.1, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.green });
  T(s, "ยังจำได้ว่าทำไมเขียนแบบนั้น แก้ได้ใน 2 นาที", { x: 0.7, y: 3.55, w: 4.0, h: 1.2, fontSize: 15 });
  box(s, pres, 5.1, 3.0, 4.4, 1.95, K.redT); T(s, "เจอหลังผู้ใช้ใช้แล้ว", { x: 5.3, y: 3.1, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.red });
  T(s, "ทำซ้ำให้เกิด สืบจาก log แก้ ทดสอบ deploy ฉุกเฉิน แจ้งผู้ใช้ และบางกรณีต้องแก้ข้อมูลที่เสียไปแล้ว", { x: 5.3, y: 3.55, w: 4.0, h: 1.3, fontSize: 14 }); }

// 5 ความเข้าใจผิดเรื่อง tester
{ const s = lightSlide(pres, S1, "Tester ไม่ใช่คนไล่กดหาที่พังตอนท้าย", "ความเข้าใจผิดที่ต้องแก้ก่อนคือ tester เข้ามาไล่กดหาที่พังหลัง dev เขียนเสร็จ ถ้าเข้ามาแค่ตอนท้าย งานเหลือแค่ยืนยันว่าความเสียหายเกิดแล้ว คุณค่าสูงสุดคือการป้องกัน ซึ่งต้องเข้ามาตั้งแต่ตอนคุย requirement คำถามเดียวในห้อง review อาจมีค่าเท่ากับ bug หลายสิบตัวหลัง deploy");
  box(s, pres, 0.5, 1.25, 9, 0.5, K.amberT); T(s, "ความเข้าใจผิด: “tester คือคนที่มาไล่กดหาที่พังหลังจาก dev เขียนเสร็จ”", { x: 0.7, y: 1.25, w: 8.6, h: 0.5, fontSize: 14, bold: true, valign: "middle" });
  T(s, "แบบที่ไม่ช่วย: tester เข้าตอนท้าย", { x: 0.5, y: 1.9, w: 6, h: 0.3, fontSize: 13, bold: true, color: K.red });
  flow(s, pres, [{ t: "requirement คลุมเครือ", fill: K.redT }, { t: "dev เดาความหมาย", fill: K.redT }, { t: "เจอว่าเข้าใจไม่ตรงกัน", fill: K.redT }, { t: "แก้ทั้ง design และ code", fill: K.redT }], 0.5, 2.25, 9, 0.8, { gap: 0.25, fs: 12 });
  T(s, "แบบที่ช่วย: tester เข้าตั้งแต่ต้น", { x: 0.5, y: 3.3, w: 6, h: 0.3, fontSize: 13, bold: true, color: K.green });
  flow(s, pres, [{ t: "tester ถามใน requirement review", sub: "“ถ้าจองคาบเดียวกันพร้อมกัน 2 คน จะเกิดอะไร”", fill: K.greenT, wt: 1.4 }, { t: "ทีมตอบไม่ได้", sub: "แปลว่าเจอ requirement ที่หายไป", fill: K.greenT }, { t: "ตกลงกันก่อนเขียน code", fill: K.greenT }], 0.5, 3.65, 9, 1.25, { gap: 0.3, fs: 13, sfs: 11 }); }

// 6 V-Model
{ const s = lightSlide(pres, S1, "V-Model: ออกแบบ test ตั้งแต่ฝั่งซ้าย", "ใจความของ V-Model ไม่ใช่ลำดับแบบ waterfall แต่คือเส้นประ การทดสอบแต่ละระดับควรถูกออกแบบตั้งแต่ phase ฝั่งซ้ายที่คู่กัน ไม่ใช่มาคิดตอนถึงคิว ทีม agile ก็ใช้หลักนี้ได้ แต่วงจรหมุนซ้ำทุก sprint หรือทุก bolt");
  const Ls = [["Requirement", "ความต้องการ"], ["System Design", "สถาปัตยกรรม"], ["Detailed Design", "โมดูล"], ["Coding", ""]], Rs = ["Acceptance Test", "System Test", "Integration Test", "Unit Test"];
  Ls.forEach((v, i) => { const y = 1.3 + i * 0.85;
    box(s, pres, 0.5, y, 3.6, 0.65, K.tealT); T(s, v[1] ? [{ text: v[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }] : [{ text: v[0], options: { bold: true, fontSize: 14 } }], { x: 0.65, y, w: 3.3, h: 0.65, valign: "middle" });
    box(s, pres, 5.9, y, 3.6, 0.65, K.greenT); T(s, Rs[i], { x: 6.05, y, w: 3.3, h: 0.65, fontSize: 14, bold: true, valign: "middle" });
    arrow(s, pres, 4.15, 5.85, y + 0.5); T(s, "เตรียมไว้ล่วงหน้า", { x: 4.15, y: y + 0.12, w: 1.7, h: 0.25, fontSize: 11, color: K.ink2, align: "center" }); });
  T(s, "ฝั่งซ้ายคือ phase ของงาน ฝั่งขวาคือ test ระดับที่คู่กัน", { x: 0.5, y: 4.75, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal, align: "center" }); }

// 7 9 phases
{ const s = lightSlide(pres, S1, "หน้าที่ของ tester ทั้ง 9 phase", "ตารางในบทอ่านไล่หน้าที่ของ tester ทีละ phase แต่ละ phase มีคำถามหลักที่ถือติดตัว แถวที่ 8 คือแถวที่แยกทีมที่เก่งออกจากทีมทั่วไป ทุก bug ที่หลุดถึงผู้ใช้ต้องจบที่คำถามว่าทำไม loop ไม่จับ และคำตอบต้องกลายเป็น test ใหม่เสมอ ในทีมที่ทำงานเป็น sprint สั้น ๆ ทั้ง 9 phase หมุนครบภายในไม่กี่วัน");
  const P = [["Requirement", "ข้อนี้จะพิสูจน์ว่าผ่านได้อย่างไร"], ["Design", "ถ้าส่วนนี้พังเงียบ ๆ จะรู้ได้อย่างไร"], ["Test Planning", "เวลามีจำกัด ควรใช้กับส่วนไหนก่อน"], ["Test Design", "test นี้จะแดงเมื่อไร ถ้าไม่เคยแดงแปลว่าอะไร"], ["Development", "ส่วนนี้ integrate กับของเดิมแล้วโอเคไหม"], ["Test Execution", "อาการนี้ทำซ้ำได้เสถียรหรือยัง"], ["Release / Deploy", "ถ้าปล่อยตอนนี้ ความเสี่ยงที่เหลือคืออะไร"], ["Production / Ops", "ทำไม suite ของเราถึงปล่อยตัวนี้ผ่าน"], ["Completion / Retro", "รอบหน้าจะจับได้เร็วขึ้นตรงไหน"]];
  P.forEach((v, i) => { const x = 0.5 + (i % 3) * 3.05, y = 1.25 + Math.floor(i / 3) * 1.25, hi = i === 7; box(s, pres, x, y, 2.9, 1.15, hi ? K.amberT : K.paper); chip(s, pres, x + 0.12, y + 0.12, i + 1, hi ? K.amber : K.teal, hi ? K.ink : K.white, 0.36);
    T(s, v[0], { x: x + 0.58, y: y + 0.12, w: 2.2, h: 0.36, fontSize: 13, bold: true, valign: "middle" });
    T(s, "“" + v[1] + "”", { x: x + 0.15, y: y + 0.55, w: 2.65, h: 0.55, fontSize: 11, color: K.ink2 }); }); }

// 8 Entry / Exit
{ const s = lightSlide(pres, S1, "Entry / Exit Criteria: เส้นที่ต้องตกลงก่อน", "ความขัดแย้งระหว่าง dev กับ tester เกือบทั้งหมดมาจากการไม่ได้ตกลงสองเส้นนี้ไว้ก่อน entry บอกว่าพร้อมให้ทดสอบเมื่อไร exit บอกว่าทดสอบเสร็จเมื่อไร exit ไม่ได้แปลว่าไม่มี bug เหลือ เพราะเป็นไปไม่ได้ แต่แปลว่า bug ที่เหลือถูกมองเห็น ประเมิน และมีคนรับไว้อย่างรู้ตัว");
  box(s, pres, 0.5, 1.3, 4.4, 2.95, K.tealT); T(s, "Entry: พร้อมให้ทดสอบเมื่อไร", { x: 0.75, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: K.teal });
  T(s, bullets(["build ขึ้น staging แล้ว", "smoke test ผ่าน", "unit test เขียวใน CI", "มี test data พร้อม", "มีคำอธิบายว่าเปลี่ยนอะไรบ้าง"], 8), { x: 0.75, y: 1.9, w: 3.9, h: 2.2, fontSize: 14 });
  box(s, pres, 5.1, 1.3, 4.4, 2.95, K.greenT); T(s, "Exit: ถือว่าทดสอบเสร็จเมื่อไร", { x: 5.35, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: K.green });
  T(s, bullets(["test case ที่วางไว้รันครบ", "ไม่มี bug Critical/High ค้าง", "bug ที่เหลือมีเจ้าของและถูกยอมรับ", "regression suite เขียว", "บันทึกผลแล้ว"], 8), { x: 5.35, y: 1.9, w: 3.9, h: 2.2, fontSize: 14 });
  box(s, pres, 0.5, 4.4, 9, 0.6, K.ink); T(s, "exit ไม่ได้แปลว่าไม่มี bug เหลือ แต่แปลว่าที่เหลือถูกมองเห็น ประเมิน และมีคนรับไว้อย่างรู้ตัว", { x: 0.75, y: 4.4, w: 8.5, h: 0.6, fontSize: 13, bold: true, color: K.white, valign: "middle" }); }

// 9 ระดับของ test
{ const s = lightSlide(pres, S2, "4 ระดับของ test ตอบคำถามคนละข้อ", "แต่ละระดับตอบคำถามคนละข้อและใช้แทนกันไม่ได้ unit ตรวจตรรกะข้างใน integration ตรวจว่าประกอบกันแล้วคุยกันรู้เรื่อง system ตรวจระบบในสภาพใกล้จริง acceptance ตรวจว่าผู้ใช้ทำงานสำเร็จ ดูคอลัมน์สุดท้ายด้วยว่าแต่ละระดับจับอะไรไม่ได้");
  rowsTable(s, pres, [["Unit", "ตรรกะข้างในถูกไหม", "คำนวณผิด เงื่อนไขขอบผิด", "ประกอบกันแล้วไม่ทำงาน"], ["Integration", "ประกอบกันแล้วคุยกันรู้เรื่องไหม", "schema ไม่ตรง transaction query ผิด", "ผู้ใช้ใช้ไม่ได้เพราะปุ่มหาย"], ["System", "ระบบในสภาพจริงยังทำงานไหม", "config network environment", "ของที่ถูกทุกอย่างแต่ไม่ใช่สิ่งที่ผู้ใช้ต้องการ"], ["Acceptance", "ผู้ใช้ทำงานสำเร็จไหม", "flow ขาด UX พัง", "รายละเอียดตรรกะลึก ๆ"]],
    0.5, 1.3, [1.4, 2.4, 2.6, 2.6], 0.75, { head: ["ระดับ", "ตอบคำถามว่า", "จับ bug ประเภทไหน", "จับไม่ได้"], fs: 12, fills: [K.tealT, K.paper, K.paper, K.greenT] }); }

// 10 รูปทรง suite
{ const s = lightSlide(pres, S2, "รูปทรงของ suite: Pyramid และ Ice Cream Cone", "Test Pyramid มี unit เยอะ เร็ว ถูก ที่ฐาน และ E2E น้อย ช้า แพง ที่ยอด ส่วน Ice Cream Cone คือรูปทรงที่เกิดขึ้นเองถ้าไม่มีใครออกแบบ เพราะการทดสอบด้วยมือให้ความมั่นใจทันที แต่ไม่สะสม สัปดาห์หน้าต้องทำใหม่ทั้งหมด สำหรับ web app ที่หน้าจอเยอะตรรกะน้อย Kent C. Dodds เสนอ Testing Trophy ที่ให้น้ำหนัก integration มากที่สุด");
  T(s, "แบบที่ช่วย: Test Pyramid", { x: 0.5, y: 1.25, w: 4.4, h: 0.3, fontSize: 13, bold: true, color: K.green, align: "center" });
  T(s, "แบบที่ไม่ช่วย: Ice Cream Cone", { x: 5.1, y: 1.25, w: 4.4, h: 0.3, fontSize: 13, bold: true, color: K.red, align: "center" });
  const mk = (cx, y, w, fill, a, b) => { box(s, pres, cx - w / 2, y, w, 0.72, fill); T(s, [{ text: a, options: { bold: true, fontSize: 13, breakLine: true } }, { text: b, options: { fontSize: 11 } }], { x: cx - w / 2 + 0.05, y, w: w - 0.1, h: 0.72, align: "center", valign: "middle" }); };
  mk(2.7, 1.65, 2.0, K.greenT, "E2E", "น้อย ช้า แพง"); mk(2.7, 2.45, 3.0, K.greenT, "Integration", "ปานกลาง"); mk(2.7, 3.25, 4.2, K.greenT, "Unit", "เยอะ เร็ว ถูก");
  mk(7.3, 1.65, 4.2, K.redT, "Manual test", "เยอะที่สุด"); mk(7.3, 2.45, 3.0, K.redT, "E2E", "เยอะ"); mk(7.3, 3.25, 2.0, K.redT, "Unit", "แทบไม่มี");
  box(s, pres, 0.5, 4.2, 9, 0.8, K.amberT);
  T(s, [{ text: "รูปทรงที่ถูกคือรูปทรงที่ทำให้ suite รันจบเร็วพอจะรันทุกครั้งที่แก้ code และเชื่อผลได้", options: { bold: true, fontSize: 13, breakLine: true } }, { text: "งานหน้าจอเยอะตรรกะน้อย: Testing Trophy ให้น้ำหนัก integration มากที่สุด เพราะ bug อยู่ตรงรอยต่อ", options: { fontSize: 12 } }], { x: 0.7, y: 4.2, w: 8.6, h: 0.8, valign: "middle" });
  ref(s, "Martin Fowler — Test Pyramid; Kent C. Dodds — The Testing Trophy and Testing Classifications"); }

// 11 EP + BVA
{ const s = lightSlide(pres, S2, "แบ่งกลุ่มค่า และทดสอบที่ขอบ", "ถ้าระบบรับอายุ 18 ถึง 65 การทดสอบ 20 21 22 23 ไม่ให้ข้อมูลเพิ่ม เพราะอยู่กลุ่มเดียวกัน เลือกตัวแทนกลุ่มละ 1 ค่า เหลือ 3 test แทน 40 ส่วน boundary value analysis ใช้ความจริงที่ว่า bug ส่วนใหญ่เกิดจากเครื่องหมายที่ควรเป็น <= แต่เขียนเป็น < จึงทดสอบ 17 18 19 และ 64 65 66 รวมสองเทคนิคได้ test 6-8 ตัวที่ครอบคลุมกว่า 40 ตัวที่เขียนสุ่ม");
  [[0.5, 2.3, "< 18", "ปฏิเสธ", K.redT, K.red], [2.9, 4.2, "18-65", "รับ", K.greenT, K.green], [7.2, 2.3, "> 65", "ปฏิเสธ", K.redT, K.red]].forEach(v => { box(s, pres, v[0], 1.3, v[1], 1.0, v[4]);
    T(s, [{ text: v[2], options: { bold: true, fontSize: 20, color: v[5], breakLine: true } }, { text: v[3], options: { fontSize: 13 } }], { x: v[0], y: 1.3, w: v[1], h: 1.0, align: "center", valign: "middle" }); });
  [[2.85, [17, 18, 19]], [7.15, [64, 65, 66]]].forEach(([b, vals]) => vals.forEach((n, i) => chip(s, pres, b + (i - 1) * 0.65 - 0.26, 2.45, n, i === 1 ? K.teal : K.amber, i === 1 ? K.white : K.ink, 0.52)));
  box(s, pres, 0.5, 3.15, 4.4, 1.2, K.paper); T(s, [{ text: "Equivalence Partitioning", options: { bold: true, fontSize: 13, color: K.teal, breakLine: true } }, { text: "20, 21, 22, 23 อยู่กลุ่มเดียวกัน ไม่ให้ข้อมูลเพิ่ม เลือกตัวแทนกลุ่มละ 1 ค่า เหลือ 3 test แทน 40", options: { fontSize: 12 } }], { x: 0.7, y: 3.15, w: 4.0, h: 1.2, valign: "middle" });
  box(s, pres, 5.1, 3.15, 4.4, 1.2, K.paper); T(s, [{ text: "Boundary Value Analysis", options: { bold: true, fontSize: 13, color: K.teal, breakLine: true } }, { text: "bug ส่วนใหญ่เกิดจาก < ที่ควรเป็น <= จึงทดสอบที่ขอบและรอบ ๆ ขอบ: 17, 18, 19 และ 64, 65, 66", options: { fontSize: 12 } }], { x: 5.3, y: 3.15, w: 4.0, h: 1.2, valign: "middle" });
  box(s, pres, 0.5, 4.5, 9, 0.5, K.amberT); T(s, "รวมสองเทคนิค: test 6-8 ตัวครอบคลุมกว่า test 40 ตัวที่เขียนสุ่ม", { x: 0.7, y: 4.5, w: 8.6, h: 0.5, fontSize: 14, bold: true, valign: "middle" });
  ref(s, "ISTQB — Certified Tester Foundation Level Syllabus"); }

// 12 Decision table + pairwise
{ const s = lightSlide(pres, S2, "Decision Table และ Pairwise", "decision table ใช้เมื่อเงื่อนไขหลายตัวมาเจอกัน ประโยชน์ที่มากกว่าการได้ test case คือทำให้เจอช่องที่ spec ไม่ได้บอก ระหว่างทำตารางมักพบแถวที่ไม่มีใครตอบได้ว่าผลควรเป็นอะไร นั่นคือ requirement ที่หายไป ส่วน pairwise ใช้เมื่อการรวมกันเยอะเกินไป เช่น 5 ตัวเลือก ตัวละ 4 ค่า มี 1,024 แบบ ถ้าให้ทุกคู่ของค่าปรากฏอย่างน้อยหนึ่งครั้งจะเหลือไม่กี่สิบกรณี");
  rowsTable(s, pres, [["1", "ใช่", "ใช่", "ใช่", "ลด 20%"], ["2", "ใช่", "ใช่", "ไม่", "ลด 15%"], ["3", "ใช่", "ไม่", "ใช่", "ลด 10%"], ["4", "ไม่", "ใช่", "ใช่", "ลด 5%"], ["5", "ไม่", "ไม่", "ไม่", "ไม่ลด"]], 0.5, 1.25, [0.7, 1.9, 2.3, 1.7, 2.4], 0.42, { head: ["#", "เป็นสมาชิก", "ยอดซื้อ > 1000", "มีคูปอง", "ผลลัพธ์ที่คาดหวัง"], fs: 13 });
  box(s, pres, 0.5, 4.1, 4.4, 0.95, K.amberT); T(s, "แถวที่ไม่มีใครตอบได้ คือ requirement ที่หายไป ควรถามก่อนเขียน code", { x: 0.7, y: 4.1, w: 4.0, h: 0.95, fontSize: 12, bold: true, valign: "middle" });
  box(s, pres, 5.1, 4.1, 4.4, 0.95, K.tealT); T(s, "Pairwise: 5 ตัวเลือก ตัวละ 4 ค่า = 1,024 แบบ ให้ทุกคู่ของค่าปรากฏอย่างน้อย 1 ครั้ง จะเหลือไม่กี่สิบกรณี", { x: 5.3, y: 4.1, w: 4.0, h: 0.95, fontSize: 12, bold: true, valign: "middle" });
  ref(s, "ISTQB — Certified Tester Foundation Level Syllabus"); }

// 13 State transition
{ const s = lightSlide(pres, S2, "State Transition: ทดสอบเส้นที่ต้องถูกปฏิเสธ", "state transition ใช้เมื่อลำดับมีความหมาย เช่นใบที่ผ่านสถานะ Draft Submitted Approved Cancelled test ที่ต้องมีไม่ใช่แค่เส้นทางปกติ แต่รวมถึงการเปลี่ยนสถานะที่ต้องถูกปฏิเสธ เช่นยกเลิกใบที่ยังเป็น Draft หรืออนุมัติใบที่ถูกยกเลิกไปแล้ว ช่องโหว่ business logic ส่วนใหญ่ซ่อนอยู่ตรงนี้");
  const N = ["Draft", "Submitted", "Approved", "Cancelled"], lab = ["submit", "approve", "cancel"];
  N.forEach((n, i) => { const x = 0.5 + i * 2.45; box(s, pres, x, 1.5, 1.6, 0.8, i === 3 ? K.redT : K.tealT); T(s, n, { x, y: 1.5, w: 1.6, h: 0.8, fontSize: 15, bold: true, align: "center", valign: "middle" });
    if (i < 3) { arrow(s, pres, x + 1.63, x + 2.42, 1.9); T(s, lab[i], { x: x + 1.63, y: 1.55, w: 0.79, h: 0.25, fontSize: 11, color: K.ink2, align: "center" }); } });
  s.addShape(pres.ShapeType.line, { x: 2.15, y: 2.5, w: 0.8, h: 0, flipH: true, line: { color: K.mute, width: 1.5, endArrowType: "triangle" } });
  T(s, "reject: กลับ Draft", { x: 1.6, y: 2.58, w: 2.0, h: 0.25, fontSize: 11, color: K.ink2, align: "center" });
  box(s, pres, 0.5, 3.1, 9, 0.95, K.redT); T(s, [{ text: "การเปลี่ยนสถานะที่ต้องถูกปฏิเสธ", options: { bold: true, fontSize: 13, color: K.red, breakLine: true } }, { text: "ยกเลิกใบที่ยังเป็น Draft · อนุมัติใบที่ถูกยกเลิกไปแล้ว", options: { fontSize: 14 } }], { x: 0.75, y: 3.1, w: 8.5, h: 0.95, valign: "middle" });
  box(s, pres, 0.5, 4.2, 9, 0.75, K.ink); T(s, "ช่องโหว่ด้าน business logic ส่วนใหญ่ซ่อนอยู่ตรงนี้", { x: 0.75, y: 4.2, w: 8.5, h: 0.75, fontSize: 16, bold: true, color: K.white, valign: "middle" });
  ref(s, "ISTQB — Certified Tester Foundation Level Syllabus"); }

// 14 Coverage
{ const s = lightSlide(pres, S3, "Coverage: วัดว่ารัน ไม่ได้วัดว่าตรวจ", "ตัวอย่าง test_divide เรียก divide แต่ไม่มี assert เลย ได้ statement coverage 100% แต่จับอะไรไม่ได้ แม้เปลี่ยนเป็น a คูณ b ก็ยังเขียว coverage ใช้เป็นตัวชี้วัดเชิงลบได้ดี ส่วนที่เป็น 0% คือไม่มีอะไรตรวจแน่นอน แต่ 90% ไม่ได้แปลว่าปลอดภัย 90% และเมื่อกลายเป็น KPI ก็จะมีคนเล่นเกมกับมัน ซึ่งเป็น Goodhart's Law");
  codeBox(s, pres, 0.5, 1.3, 4.5, 1.9, ["def divide(a, b):", "    return a / b", "", "def test_divide():", "    divide(10, 2)", "    # no assert at all"], 12);
  box(s, pres, 0.5, 3.35, 4.5, 1.6, K.redT);
  T(s, "100%", { x: 0.7, y: 3.45, w: 1.9, h: 1.4, fontSize: 36, bold: true, color: K.red, valign: "middle" });
  T(s, "statement coverage แต่เปลี่ยนเป็น a * b ก็ยังเขียว", { x: 2.5, y: 3.45, w: 2.4, h: 1.4, fontSize: 13, valign: "middle" });
  rowsTable(s, pres, [["Statement", "บรรทัดถูกรัน แต่ไม่รู้ว่าตรวจผลไหม"], ["Branch", "ทุกกิ่ง if/else ถูกรัน แต่เงื่อนไขย่อยอาจไม่ครบ"], ["Condition", "เงื่อนไขย่อยเป็นทั้ง true และ false แต่ไม่ครบทุกการรวมกัน"], ["Path", "ทุกเส้นทางถูกเดิน แต่เพิ่มแบบทวีคูณ ทำครบไม่ไหว"]], 5.2, 1.3, [1.3, 3.0], 0.82, { fs: 12 }); }

// 15 Mutation
{ const s = lightSlide(pres, S3, "Mutation Testing: วัดคุณภาพของ test", "แนวคิดคือจงใจแก้ code ให้ผิดทีละจุดแล้วดูว่า test แดงไหม ถ้าแดงเรียกว่า killed ถ้าเขียวเรียกว่า survived แปลว่าไม่มีอะไรตรวจตรงนี้ mutation score คือ mutant ที่ถูกฆ่าหารด้วยทั้งหมด โกงยากกว่า coverage เพราะต้องมี assertion ที่มีความหมายจริง เครื่องมือมี mutmut และ cosmic-ray สำหรับ Python และ Stryker สำหรับ JS/TS");
  flow(s, pres, [{ t: "code ต้นฉบับ" }, { t: "สร้าง mutant", sub: "> เป็น >= · + เป็น - · ลบบรรทัด", wt: 1.5, fill: K.amberT }, { t: "รัน test" }], 0.5, 1.3, 9, 1.1, { gap: 0.35, fs: 14, sfs: 12 });
  box(s, pres, 0.5, 2.65, 4.4, 1.0, K.greenT); T(s, [{ text: "test แดง = killed", options: { bold: true, fontSize: 14, color: K.green, breakLine: true } }, { text: "test ทำงาน", options: { fontSize: 13 } }], { x: 0.75, y: 2.65, w: 4, h: 1.0, valign: "middle" });
  box(s, pres, 5.1, 2.65, 4.4, 1.0, K.redT); T(s, [{ text: "test เขียว = survived", options: { bold: true, fontSize: 14, color: K.red, breakLine: true } }, { text: "ไม่มีอะไรตรวจตรงนี้", options: { fontSize: 13 } }], { x: 5.35, y: 2.65, w: 4, h: 1.0, valign: "middle" });
  box(s, pres, 0.5, 3.85, 9, 1.15, K.paper);
  T(s, [{ text: "Mutation score = mutant ที่ถูกฆ่า ÷ mutant ทั้งหมด โกงยากกว่า coverage", options: { bold: true, fontSize: 13, breakLine: true } }, { text: "เครื่องมือ: mutmut / cosmic-ray (Python) · Stryker (JS/TS)", options: { fontSize: 12, color: K.ink2 } }], { x: 0.75, y: 3.85, w: 8.5, h: 1.15, valign: "middle" });
  ref(s, "Stryker Mutator; mutmut"); }

// 16 Test double
{ const s = lightSlide(pres, S3, "Test Double: ของปลอม 5 ชนิด", "คำศัพท์ชุดนี้มาจากหนังสือ xUnit Test Patterns ของ Gerard Meszaros คนส่วนใหญ่เรียกทุกอย่างว่า mock ทำให้คุยกันคนละเรื่อง dummy แค่ให้พารามิเตอร์ครบ stub คืนค่าที่กำหนด spy จำว่าถูกเรียกอย่างไร mock ตั้งความคาดหวังและ fail ถ้าไม่ตรง fake คือของจริงเวอร์ชันย่อ เช่น in-memory repository");
  rowsTable(s, pres, [["Dummy", "ส่งไปให้ครบพารามิเตอร์ ไม่ถูกใช้จริง", "ต้องใส่ค่าแต่ค่านั้นไม่เกี่ยว"], ["Stub", "คืนค่าที่กำหนดไว้ล่วงหน้า", "ต้องการให้ dependency ตอบแบบเจาะจง"], ["Spy", "เป็น stub ที่จำว่าถูกเรียกอย่างไรบ้าง", "ตรวจว่ามีการเรียกจริง เช่น ส่งอีเมล"], ["Mock", "ตั้งความคาดหวังไว้ล่วงหน้า fail ถ้าไม่เป็นไปตามนั้น", "ตรวจพฤติกรรมการเรียกเป็นหลัก"], ["Fake", "ของจริงเวอร์ชันย่อที่ทำงานได้ เช่น in-memory repository", "อยากได้ของที่ทำงานจริงแต่เร็ว"]],
    0.5, 1.25, [1.2, 4.0, 3.8], 0.58, { head: ["ชนิด", "ทำอะไร", "ใช้เมื่อไร"], fs: 13 });
  ref(s, "Gerard Meszaros — xUnit Test Patterns; Martin Fowler — Test Double"); }

// 17 Over-mocking
{ const s = lightSlide(pres, S3, "Over-mocking: กับดักที่พบบ่อยที่สุด", "เมื่อ test เต็มไปด้วย mock สิ่งที่ตรวจจะกลายเป็นโครงสร้างภายในของ code ไม่ใช่พฤติกรรม ผลคือ refactor ทีไร test แดงทุกที จากตาข่ายนิรภัยกลายเป็นโซ่ตรวน หลักตัดสินคือ mock เฉพาะสิ่งที่ข้ามขอบเขตที่เราควบคุมไม่ได้ ส่วนตรรกะของเราเองใช้ของจริง กรณีตัวอย่างคือ time กับ random ทำให้ test flaky มากที่สุด ควร inject ตั้งแต่ต้น การออกแบบให้ test ได้กับการออกแบบให้ดีมักเป็นเรื่องเดียวกัน");
  box(s, pres, 0.5, 1.3, 4.4, 2.6, K.redT); T(s, "test เต็มไปด้วย mock", { x: 0.75, y: 1.4, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.red });
  T(s, bullets(["ตรวจโครงสร้างภายใน ไม่ใช่พฤติกรรมที่ผู้ใช้สนใจ", "refactor ทีไร test แดง ทั้งที่พฤติกรรมไม่เปลี่ยน", "ตาข่ายนิรภัย กลายเป็นโซ่ตรวน"]), { x: 0.75, y: 1.85, w: 3.9, h: 2.0, fontSize: 14 });
  box(s, pres, 5.1, 1.3, 4.4, 2.6, K.greenT); T(s, "หลักตัดสิน", { x: 5.35, y: 1.4, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.green });
  T(s, bullets(["mock เฉพาะสิ่งที่ข้ามขอบเขตที่คุมไม่ได้: network เวลา ระบบไฟล์ บริการภายนอก การสุ่ม", "ตรรกะภายในของเราเอง ใช้ของจริง"]), { x: 5.35, y: 1.85, w: 3.9, h: 2.0, fontSize: 14 });
  box(s, pres, 0.5, 4.05, 9, 0.95, K.amberT); T(s, [{ text: "กรณีตัวอย่าง: time กับ random ทำให้ test flaky มากที่สุด", options: { bold: true, fontSize: 13, breakLine: true } }, { text: "inject ทั้งสองตั้งแต่ต้น ไม่เรียก Date.now() กลางฟังก์ชัน", options: { fontSize: 13 } }], { x: 0.75, y: 4.05, w: 8.5, h: 0.95, valign: "middle" });
  ref(s, "Martin Fowler — Mocks Aren't Stubs"); }

// 18 TDD + BDD
{ const s = lightSlide(pres, S4, "TDD และ BDD", "TDD วนเป็น Red Green Refactor คุณค่าจริงไม่ใช่การได้ test แต่คือบังคับให้ออกแบบ interface ก่อนลงมือ ขั้น Red พิสูจน์ว่า test จับอะไรได้จริง test ที่ไม่เคยเห็นเป็นสีแดงคือ test ที่ยังไม่รู้ว่าใช้ได้ไหม กับ AI agent การเขียน test ก่อนคือให้เป้าหมายที่วัดได้ ส่วน BDD ใช้รูปแบบ Given When Then ซึ่งเป็นโครงเดียวกับ Arrange Act Assert ในระดับ unit");
  flow(s, pres, [{ t: "Red", sub: "เขียน test ที่ยังไม่ผ่าน", fill: K.redT }, { t: "Green", sub: "เขียน code ให้ผ่านแบบง่ายที่สุด", fill: K.greenT }, { t: "Refactor", sub: "จัดระเบียบโดย test เขียวตลอด", fill: K.tealT }], 0.5, 1.3, 9, 1.1, { gap: 0.3, fs: 15, sfs: 12 });
  box(s, pres, 0.5, 2.6, 4.4, 2.4, K.paper);
  T(s, bullets(["Red พิสูจน์ว่า test จับอะไรได้จริง", "test ก่อน คือการออกแบบ interface ก่อนลงมือ", "กับ AI agent: ได้เป้าหมายที่วัดได้ว่าเสร็จหรือยัง"], 8), { x: 0.75, y: 2.75, w: 3.9, h: 2.1, fontSize: 14 });
  box(s, pres, 5.1, 2.6, 4.4, 2.4, K.tealT); T(s, "BDD: Given / When / Then", { x: 5.3, y: 2.7, w: 4, h: 0.35, fontSize: 14, bold: true, color: K.teal });
  [["Given", "Arrange: เตรียมข้อมูล"], ["When", "Act: เรียกสิ่งที่ตรวจ"], ["Then", "Assert: เทียบผล"]].forEach((v, i) => { const y = 3.15 + i * 0.6; box(s, pres, 5.3, y, 4.0, 0.5, K.white); T(s, [{ text: v[0] + "  ", options: { bold: true, color: K.teal } }, { text: v[1] }], { x: 5.45, y, w: 3.8, h: 0.5, fontSize: 13, valign: "middle" }); });
  ref(s, "Kent Beck — Test-Driven Development: By Example"); }

// 19 Flaky causes
{ const s = lightSlide(pres, S4, "Flaky test: สาเหตุและวิธีแก้", "flaky test คือ test ที่เขียวบ้างแดงบ้างโดย code ไม่เปลี่ยน ทำลายทั้ง suite เพราะเมื่อคนชินกับการรันใหม่เดี๋ยวก็เขียว test แดงที่เป็นของจริงก็ถูกมองข้าม ตารางนี้ไล่ 6 สาเหตุ พร้อมอาการและวิธีแก้");
  rowsTable(s, pres, [["แชร์สถานะระหว่าง test", "สลับลำดับแล้วแดง", "ให้แต่ละ test สร้างและเก็บกวาดข้อมูลของตัวเอง"], ["พึ่งเวลาจริง", "แดงตอนข้ามวัน หรือเที่ยงคืน", "inject clock แล้วตรึงเวลาใน test"], ["รอด้วย sleep", "แดงเมื่อเครื่อง CI ช้ากว่าปกติ", "ใช้ assertion ที่รอจนกว่าเงื่อนไขจะเป็นจริง"], ["ลำดับแบบขนาน", "รันขนานแล้วแดง", "แยก database/schema ต่อ worker"], ["พึ่งบริการภายนอก", "แดงเมื่อเน็ตช้า", "ใช้ test double หรือ container ของตัวเอง"], ["ไม่ deterministic", "แดงแบบสุ่ม", "ตรึง seed ของการสุ่ม"]],
    0.5, 1.25, [2.5, 2.6, 3.9], 0.48, { head: ["สาเหตุ", "อาการ", "วิธีแก้"], fs: 12 });
  ref(s, "Martin Fowler — Eradicating Non-Determinism in Tests"); }

// 20 Flaky policy
{ const s = lightSlide(pres, S4, "นโยบายจัดการ flaky test", "นโยบายที่ทีมที่ทำถูกใช้ คือเจอแล้ว quarantine ย้ายออกจาก gate หลักทันที เปิด ticket ที่มีเจ้าของและกำหนดวัน แก้ที่ต้นเหตุ แล้วนำกลับเข้า suite สิ่งที่ห้ามทำคือใส่ retry ทับแล้วเดินหน้าต่อ เพราะ retry แค่ซ่อนอาการ บ่อยครั้งอาการนั้นคือ race condition จริงที่ผู้ใช้จะเจอทีหลัง");
  flow(s, pres, [{ t: "พบ flaky test" }, { t: "quarantine", sub: "ย้ายออกจาก gate หลักทันที", fill: K.amberT, wt: 1.3 }, { t: "เปิด ticket", sub: "มีเจ้าของและกำหนดวัน", wt: 1.3 }, { t: "แก้ที่ต้นเหตุ", fill: K.tealT }, { t: "นำกลับเข้า suite", fill: K.greenT }], 0.5, 1.3, 9, 1.4, { gap: 0.2, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.0, 4.4, 1.95, K.redT); T(s, "สิ่งที่ห้ามทำ", { x: 0.75, y: 3.1, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.red });
  T(s, "ใส่ retry ทับไว้แล้วเดินหน้าต่อ retry แค่ซ่อนอาการ บ่อยครั้งอาการนั้นคือ race condition จริงที่ผู้ใช้จะเจอทีหลัง", { x: 0.75, y: 3.55, w: 3.9, h: 1.3, fontSize: 14 });
  box(s, pres, 5.1, 3.0, 4.4, 1.95, K.paper); T(s, "ทำไมต้องจริงจัง", { x: 5.35, y: 3.1, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.teal });
  T(s, "เมื่อคนชินกับ “รันใหม่อีกทีเดี๋ยวก็เขียว” test แดงที่เป็นของจริงก็ถูกมองข้ามไปด้วย", { x: 5.35, y: 3.55, w: 3.9, h: 1.3, fontSize: 14 });
  ref(s, "Martin Fowler — Eradicating Non-Determinism in Tests"); }

// 21 Bug steps
{ const s = lightSlide(pres, S5, "เจอ bug แล้วทำอะไร: 6 ขั้น", "การเจอ bug เป็นแค่จุดเริ่ม ว่าจะถูกแก้จริงหรือหายไปเฉย ๆ ขึ้นกับสิ่งที่เกิดใน 15 นาทีถัดมา ขั้นที่ 1 คือขั้นที่คนข้ามบ่อยที่สุดและแพงที่สุด รายงานที่บอกแค่กดแล้วพังกินเวลา dev มากกว่าที่ tester ประหยัดได้หลายเท่า วิธีลดขั้นตอนคือตัดทีละอย่างแล้วลองใหม่ ถ้า Critical บน production ให้แจ้งทันที");
  const st = [["ทำซ้ำให้ได้", "ลดขั้นตอนให้สั้นที่สุดที่ยังเกิด ถ้าทำซ้ำไม่ได้ ให้บันทึกหลักฐาน อย่าทิ้ง"], ["ตรวจว่ามีคนรายงานแล้วหรือยัง", "มีแล้ว: เพิ่มหลักฐานลงใบเดิม ไม่เปิดใบใหม่"], ["หาขอบเขต", "เกิดทุก browser ไหม ทุก role ไหม ตั้งแต่ commit ไหน"], ["เก็บหลักฐาน", "ขั้นตอน · ผลที่คาด vs จริง · log + correlation id · screenshot · version · environment"], ["จัด severity และ priority", "แยกความรุนแรงทางเทคนิค ออกจากความเร่งด่วนทางธุรกิจ"], ["เขียนรายงานตามแม่แบบ", "เป็น Critical บน production ไหม ถ้าใช่ แจ้งทันที"]];
  st.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.25 + Math.floor(i / 2) * 1.1; box(s, pres, x, y, 4.4, 1.0, i === 0 ? K.amberT : K.paper); chip(s, pres, x + 0.15, y + 0.29, i + 1, i === 0 ? K.amber : K.teal, i === 0 ? K.ink : K.white);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.7, y, w: 3.6, h: 1.0, valign: "middle" }); });
  box(s, pres, 0.5, 4.6, 9, 0.45, K.ink); T(s, "ขั้นที่ 1 คือขั้นที่คนข้ามบ่อยที่สุดและแพงที่สุด", { x: 0.75, y: 4.6, w: 8.5, h: 0.45, fontSize: 13, bold: true, color: K.white, valign: "middle" }); }

// 22 Bug report template
{ const s = lightSlide(pres, S5, "แม่แบบรายงาน bug และหัวข้อที่ดี", "แม่แบบมีหัวข้อ environment ขั้นตอน ผลที่คาดหวังอ้าง AC หรือ spec ผลที่เกิดจริงเป็นข้อเท็จจริงไม่ใช่การเดาสาเหตุ ความถี่ หลักฐาน และ severity priority หัวข้อที่ดีทำให้คนอ่านรู้ทันทีว่าเรื่องนี้เกี่ยวกับตัวเองไหมโดยไม่ต้องเปิดอ่าน");
  codeBox(s, pres, 0.5, 1.3, 5.2, 3.65, ["Title: [ที่ไหน] [ทำอะไร] แล้ว", "       [เกิดอะไร] แทนที่จะ [ควรเกิดอะไร]", "Environment: version/commit,", "  env, browser/OS, account/role", "Steps: 1. 2. 3. (สั้นที่สุด)", "Expected: อ้าง AC หรือ spec", "Actual: ข้อเท็จจริง ไม่เดาสาเหตุ", "Frequency: ทุกครั้ง / 3 ใน 10", "Evidence: screenshot, log+requestId", "Severity / Priority / regression?"], 11);
  box(s, pres, 5.9, 1.3, 3.6, 1.15, K.redT); T(s, [{ text: "หัวข้อที่ไม่ช่วย", options: { bold: true, fontSize: 12, color: K.red, breakLine: true } }, { text: "“ระบบจองพัง” · “หน้าจอมีปัญหา”", options: { fontSize: 13 } }], { x: 6.05, y: 1.3, w: 3.3, h: 1.15, valign: "middle" });
  box(s, pres, 5.9, 2.55, 3.6, 1.45, K.greenT); T(s, [{ text: "หัวข้อที่ช่วย", options: { bold: true, fontSize: 12, color: K.green, breakLine: true } }, { text: "“หน้ารายการจอง: กดยกเลิกการจองที่อนุมัติแล้ว ได้ 500 แทนที่จะได้ 409 พร้อมข้อความ”", options: { fontSize: 12 } }], { x: 6.05, y: 2.55, w: 3.3, h: 1.45, valign: "middle" });
  box(s, pres, 5.9, 4.1, 3.6, 0.85, K.amberT); T(s, "รายงานที่ทำซ้ำไม่ได้ กินเวลาทีมมากกว่าที่ประหยัดได้หลายเท่า", { x: 6.05, y: 4.1, w: 3.3, h: 0.85, fontSize: 12, bold: true, valign: "middle" }); }

// 23 Severity vs Priority
{ const s = lightSlide(pres, S5, "Severity ต่างจาก Priority", "สองคำนี้ถูกใช้สลับกันบ่อยที่สุดแต่เป็นคนละเรื่อง severity คือความรุนแรงทางเทคนิค tester ตัดสิน priority คือความเร่งด่วนทางธุรกิจ เจ้าของผลิตภัณฑ์ตัดสิน ช่องที่ severity ต่ำแต่ priority สูง เช่นชื่อบริษัทสะกดผิดบนหน้าแรก พิสูจน์ว่าสองคำนี้ไม่ใช่สิ่งเดียวกัน และเป็นเหตุผลที่ tester ไม่ควรตัดสิน priority เพียงลำพัง");
  T(s, "Priority สูง", { x: 1.8, y: 1.25, w: 3.8, h: 0.35, fontSize: 14, bold: true, color: K.teal, align: "center" }); T(s, "Priority ต่ำ", { x: 5.7, y: 1.25, w: 3.8, h: 0.35, fontSize: 14, bold: true, color: K.teal, align: "center" });
  T(s, "Severity\nสูง", { x: 0.5, y: 1.7, w: 1.2, h: 1.4, fontSize: 14, bold: true, color: K.teal, valign: "middle" }); T(s, "Severity\nต่ำ", { x: 0.5, y: 3.2, w: 1.2, h: 1.4, fontSize: 14, bold: true, color: K.teal, valign: "middle" });
  [[1.8, 1.7, K.redT, "ชำระเงินแล้วเงินหักแต่ไม่ได้สินค้า", "แก้ทันที"], [5.7, 1.7, K.paper, "ระบบล่มเมื่อใช้ browser ที่เลิกสนับสนุนแล้ว", "เข้าคิวปกติ"], [1.8, 3.2, K.amberT, "ชื่อบริษัทสะกดผิดบนหน้าแรก", "แก้วันนี้ แม้ไม่กระทบการทำงาน"], [5.7, 3.2, K.paper, "tooltip ในหน้า admin เยื้อง 2px", "ทำเมื่อว่าง"]].forEach(v => { box(s, pres, v[0], v[1], 3.8, 1.4, v[2]);
    T(s, [{ text: v[3], options: { fontSize: 13, breakLine: true } }, { text: v[4], options: { fontSize: 13, bold: true, color: K.teal } }], { x: v[0] + 0.2, y: v[1], w: 3.4, h: 1.4, valign: "middle" }); });
  T(s, "Severity: tester ตัดสิน   ·   Priority: เจ้าของผลิตภัณฑ์ตัดสิน", { x: 0.5, y: 4.7, w: 9, h: 0.35, fontSize: 13, bold: true, color: K.ink2, align: "center" }); }

// 24 Defect life cycle
{ const s = lightSlide(pres, S5, "Defect Life Cycle: ใบอยู่ในมือใคร", "ใบ bug วิ่งจาก tester ไป triage ไป dev ไป CI แล้วกลับมาที่ tester เสมอ ใบที่ข้ามขั้น Retest ไปปิดเลย คือใบที่ไม่มีใครยืนยันว่าแก้จริง นอกจากเส้นหลักยังมีทางแยกคือ Rejected Duplicate Deferred ที่ต้องเขียนเหตุผล Cannot Reproduce และ Reopened เมื่อยังเกิดอยู่");
  const C = { t: K.tealT, g: K.amberT, d: K.greenT, c: K.paper };
  flow(s, pres, [{ t: "New", sub: "tester รายงาน", fill: C.t }, { t: "Assigned", sub: "triage มอบหมาย", fill: C.g }, { t: "In Progress", sub: "dev เริ่มแก้", fill: C.d }, { t: "Fixed", sub: "แก้ + test คุ้มครอง", fill: C.d }], 0.5, 1.3, 9, 0.95, { gap: 0.28, fs: 14, sfs: 11 });
  flow(s, pres, [{ t: "Ready for Test", sub: "deploy ขึ้น env ทดสอบ", fill: C.c }, { t: "Retest", sub: "tester ทดสอบซ้ำ", fill: C.t }, { t: "Verified", sub: "อาการหาย + regression เขียว", fill: C.t }, { t: "Closed", sub: "ปิดโดยผู้รายงาน", fill: C.t }], 0.5, 2.6, 9, 0.95, { gap: 0.28, fs: 14, sfs: 11 });
  [["Tester / ผู้รายงาน", C.t], ["Triage: PO + Lead", C.g], ["Developer", C.d], ["CI/CD", C.c]].forEach((v, i) => { const x = 0.5 + i * 2.28; box(s, pres, x, 3.7, 0.28, 0.28, v[1], { line: K.line }); T(s, v[0], { x: x + 0.38, y: 3.7, w: 1.85, h: 0.28, fontSize: 11, valign: "middle" }); });
  box(s, pres, 0.5, 4.15, 9, 0.85, K.ink); T(s, "ทางแยก: Rejected / Duplicate / Deferred (ต้องเขียนเหตุผล) · Cannot Reproduce · Reopened ถ้ายังเกิดอยู่ ใบที่ข้าม Retest คือใบที่ไม่มีใครยืนยันว่าแก้จริง", { x: 0.75, y: 4.15, w: 8.5, h: 0.85, fontSize: 13, color: K.white, valign: "middle" }); }

// 25 กติกาของวงจร
{ const s = lightSlide(pres, S5, "กติกาที่ทำให้วงจร bug ไม่พัง", "กติกาเหล่านี้ทำให้วงจรเป็นการเพิ่ม coverage ให้ loop จริง ๆ ไม่ใช่แค่ซ่อมอาการ ที่สำคัญคือคนปิดใบต้องเป็นผู้รายงาน เพราะคนแก้มีอคติว่าแก้แล้ว ทุกใบที่ปิดแบบ Fixed ต้องมี test ที่จะแดงถ้า bug กลับมา และใบที่ reopen เกิน 2 ครั้งต้องยกระดับเป็นการคุยเรื่องสาเหตุราก");
  rowsTable(s, pres, [["ผู้รายงานเป็นคนปิดใบ", "คนแก้มีอคติว่าแก้แล้ว คนอื่นยืนยันคือ Verify จริง"], ["ใบ Fixed ต้องมี test คุ้มครอง", "ไม่งั้นจะกลับมาแน่ และครั้งหน้าไม่มีใครรู้ตัว"], ["Rejected / Duplicate / Deferred ต้องมีเหตุผล", "คนถัดไปไม่ต้องสืบเรื่องเดิมซ้ำ"], ["Deferred ต้องมีเงื่อนไขกลับมาพิจารณา", "ไม่งั้นคือการปฏิเสธแบบสุภาพ"], ["Reopened เกิน 2 ครั้ง ยกระดับเป็นคุยสาเหตุราก", "แปลว่ากำลังแก้ที่อาการ"], ["ทุกใบมีสถานะและเจ้าของ", "ใบที่ไม่มีเจ้าของคือใบที่ไม่มีใครทำ"]],
    0.5, 1.25, [4.3, 4.7], 0.52, { fs: 12, fills: [K.paper, K.greenT, K.paper, K.paper, K.amberT, K.paper] }); }

// 26 bug กลับมา
{ const s = lightSlide(pres, S5, "bug ที่ปิดไปแล้วกลับมา ทำอย่างไร", "เมื่อเจออาการเดิมซ้ำหลังปิดใบ ให้ถามสามข้อตามลำดับ คือเป็นอาการเดียวกันจริงไหม สาเหตุรากเดียวกันไหม และข้าม release ไปแล้วหรือยัง กฎง่าย ๆ ที่ทีมส่วนใหญ่ใช้คือยังไม่ปล่อยให้ reopen ปล่อยไปแล้วให้เปิดใบใหม่ที่ลิงก์กลับ เพราะรายงานคุณภาพของแต่ละ release ต้องแช่แข็งได้ ไม่ว่าเลือกทางไหนต้องหาให้ได้ว่าทำไมหลุดมา และเขียน test ให้แดงก่อนแก้ code");
  const rows = [[1.25, 0.75, "เป็นอาการเดียวกันจริงไหม", [["คนละอาการ: เปิดใบใหม่ ไม่ต้องอ้างใบเดิม", K.paper], ["อาการเดียวกัน: ถามข้อถัดไป", K.paper]]],
    [2.15, 0.95, "สาเหตุรากเดียวกันหรือเปล่า", [["ยังไม่รู้: สืบก่อน เปิดใบใหม่พร้อมลิงก์ ค่อยรวมทีหลัง", K.paper], ["คนละสาเหตุ: เปิดใบใหม่ related to #เดิม", K.paper]]],
    [3.2, 0.95, "ข้าม release ไปแล้วหรือยัง", [["ยังไม่ปล่อย: Reopen ใบเดิม กลับสถานะ Assigned", K.greenT], ["ปล่อยแล้ว: เปิดใบใหม่ regression of #เดิม", K.amberT]]]];
  rows.forEach(([y, h, q, ans]) => { box(s, pres, 0.5, y, 3.3, h, K.tealT); T(s, q, { x: 0.65, y, w: 3.0, h, fontSize: 13, bold: true, valign: "middle" }); arrow(s, pres, 3.85, 4.05, y + h / 2);
    ans.forEach((a, j) => { const x = 4.1 + j * 2.75; box(s, pres, x, y, 2.65, h, a[1]); T(s, a[0], { x: x + 0.1, y, w: 2.45, h, fontSize: 12, valign: "middle" }); }); });
  box(s, pres, 0.5, 4.3, 9, 0.7, K.ink); T(s, "ยังไม่ปล่อย ให้ reopen · ปล่อยแล้ว ให้เปิดใบใหม่ที่ลิงก์กลับ เพราะรายงานของแต่ละ release ต้องแช่แข็งได้", { x: 0.75, y: 4.3, w: 8.5, h: 0.7, fontSize: 13, bold: true, color: K.white, valign: "middle" }); }

// 27 Triage + metrics
{ const s = lightSlide(pres, S5, "Triage และตัวเลขสุขภาพของกระบวนการ", "triage รอบละ 15 ถึง 20 นาที ไล่เฉพาะใบสถานะ New และตัดสินแค่ 3 อย่าง สิ่งที่ห้ามทำคือเริ่มดีบักตรงนั้น ส่วนตัวชี้วัดอย่าง DRE escape rate reopen rate regression rate defect age และ defect density ใช้ดูแนวโน้มของกระบวนการเท่านั้น ทันทีที่เอาจำนวน bug ของแต่ละคนไปประเมินคน คนจะเลิกรายงาน bug ของตัวเอง");
  box(s, pres, 0.5, 1.3, 3.7, 3.65, K.paper); T(s, "Triage: รอบละ 15-20 นาที", { x: 0.7, y: 1.4, w: 3.4, h: 0.35, fontSize: 14, bold: true, color: K.teal });
  [["1", "เป็น bug จริงไหม"], ["2", "priority เท่าไร (เจ้าของผลิตภัณฑ์ตัดสิน)"], ["3", "ใครเป็นเจ้าของ (ชื่อคน ไม่ใช่ชื่อทีม)"]].forEach((v, i) => { const y = 1.9 + i * 0.7; chip(s, pres, 0.7, y + 0.05, v[0], K.teal, K.white, 0.38); T(s, v[1], { x: 1.2, y, w: 2.9, h: 0.5, fontSize: 12, valign: "middle" }); });
  box(s, pres, 0.7, 4.0, 3.3, 0.8, K.redT); T(s, "ห้ามเริ่มดีบักหาสาเหตุใน triage", { x: 0.8, y: 4.0, w: 3.1, h: 0.8, fontSize: 12, bold: true, color: K.red, valign: "middle" });
  rowsTable(s, pres, [["DRE", "สัดส่วน bug ที่จับได้ก่อนถึงมือผู้ใช้"], ["Escape rate", "สัดส่วน bug ที่หลุดถึงผู้ใช้ ยิ่งต่ำยิ่งดี"], ["Reopen rate", "คุณภาพการแก้และการยืนยันในรอบเดียวกัน"], ["Regression rate", "suite กันของเก่าพังซ้ำได้ดีแค่ไหน"], ["Defect age", "เวลาเฉลี่ยจากรายงานจนปิด คิวติดตรงไหน"], ["Defect density", "bug ต่อขนาดโมดูล ส่วนไหนเสี่ยงที่สุด"]], 4.4, 1.3, [1.6, 3.5], 0.46, { fs: 11 });
  T(s, "ใช้ดูแนวโน้มกระบวนการ ไม่ใช่ประเมินคน", { x: 4.4, y: 4.65, w: 5.1, h: 0.3, fontSize: 12, bold: true, color: K.red }); }

// 28 Non-functional + exploratory
{ const s = lightSlide(pres, S6, "ทดสอบที่ไม่ใช่ฟังก์ชัน และ Exploratory", "นอกจากการทดสอบฟังก์ชันยังต้องทดสอบ performance security accessibility compatibility และ reliability การทดสอบ accessibility ด้วย axe-core สอดเข้าไปใน E2E ได้ตรง ๆ และมักเจอปัญหาจริงตั้งแต่ครั้งแรกที่รัน ส่วน exploratory testing คือการนั่งใช้ระบบจริงโดยตั้งใจหาเรื่อง มีกรอบเวลาและ charter กำกับ และทุกอย่างที่ยืนยันแล้วต้องแปลงเป็น automated test");
  rowsTable(s, pres, [["Performance", "เร็วพอไหมภายใต้โหลดจริง", "k6, JMeter, Locust"], ["Security", "มีช่องให้ทำสิ่งที่ไม่ควรทำไหม", "OWASP ZAP, CodeQL, Dependabot"], ["Accessibility", "คนใช้ screen reader ใช้ได้ไหม", "axe-core, Lighthouse"], ["Compatibility", "ทำงานบน browser/อุปกรณ์อื่นไหม", "Playwright หลาย project"], ["Reliability", "รันยาว ๆ แล้วยังปกติไหม", "soak test"]],
    0.5, 1.25, [1.4, 2.2, 1.6], 0.62, { head: ["ประเภท", "ถามว่า", "เครื่องมือ"], fs: 11 });
  box(s, pres, 5.9, 1.3, 3.6, 3.65, K.tealT); T(s, "Exploratory testing", { x: 6.1, y: 1.4, w: 3.2, h: 0.35, fontSize: 15, bold: true, color: K.teal });
  T(s, "สิ่งที่ automation ทดแทนไม่ได้", { x: 6.1, y: 1.8, w: 3.2, h: 0.3, fontSize: 12, color: K.ink2 });
  [["1", "ตั้งเวลา 30 นาที และ charter"], ["2", "จดทุกอย่างที่แปลก"], ["3", "แปลงที่ยืนยันแล้วเป็น automated test"]].forEach((v, i) => { const y = 2.25 + i * 0.7; chip(s, pres, 6.1, y + 0.1, v[0], K.teal, K.white, 0.4); T(s, v[1], { x: 6.65, y, w: 2.7, h: 0.6, fontSize: 13, valign: "middle" }); });
  T(s, "ข้อ 3 ทำให้ความรู้สะสม แทนที่จะหาใหม่ทุกสัปดาห์", { x: 6.1, y: 4.45, w: 3.2, h: 0.4, fontSize: 11, color: K.ink2 });
  ref(s, "k6; Playwright; axe-core"); }

// 29 Test AI systems
{ const s = lightSlide(pres, S6, "ทดสอบระบบที่มี AI อยู่ข้างใน", "ปัญหาพื้นฐานคือ LLM ไม่ deterministic input เดิมอาจได้ output ต่างกัน จึงใช้ assertEqual กับข้อความตรงตัวไม่ได้ แต่ยังทดสอบโครงสร้าง ขอบเขต พฤติกรรมรอบ ๆ ความปลอดภัย และต้นทุนได้แบบเดิม ส่วนที่ต้องเปลี่ยนคือใช้ eval set รันหลายครั้ง ให้คะแนนตามเกณฑ์ แล้วเทียบ threshold เช่น 90% ถ้าใช้ LLM ตรวจ LLM ต้องมีชุดที่คนตรวจเองไว้เทียบ");
  box(s, pres, 0.5, 1.25, 9, 0.5, K.redT); T(s, "LLM ไม่ deterministic: input เดิมอาจได้ output ต่างกัน ใช้ assertEqual กับข้อความตรงตัวไม่ได้", { x: 0.7, y: 1.25, w: 8.6, h: 0.5, fontSize: 13, bold: true, valign: "middle" });
  box(s, pres, 0.5, 1.9, 4.4, 3.1, K.greenT); T(s, "ยังทดสอบแบบเดิมได้", { x: 0.75, y: 2.0, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.green });
  T(s, bullets(["โครงสร้างผลลัพธ์: JSON ตรง schema ไหม", "ขอบเขต: ไม่มี field ต้องห้าม ความยาวอยู่ในเกณฑ์", "timeout, retry, fallback เมื่อ API ล่ม", "prompt injection ต้องไม่ทำให้ระบบทำสิ่งต้องห้าม", "ต้นทุน: token ต่อคำขอไม่เกินเพดาน"], 4), { x: 0.75, y: 2.4, w: 3.9, h: 2.5, fontSize: 12 });
  box(s, pres, 5.1, 1.9, 4.4, 3.1, K.amberT); T(s, "ต้องเปลี่ยนวิธี: Eval set", { x: 5.35, y: 2.0, w: 4, h: 0.35, fontSize: 15, bold: true, color: "B5651D" });
  ["ชุดตัวอย่าง input หลากหลาย พร้อมเกณฑ์", "รันหลายครั้ง", "ให้คะแนนตามเกณฑ์ ไม่ใช่เทียบตรงตัว", "ตัดสินที่ค่าเฉลี่ย เทียบ threshold เช่น ≥ 90%"].forEach((t, i) => { const y = 2.45 + i * 0.6; box(s, pres, 5.3, y, 4.0, 0.5, K.white); chip(s, pres, 5.38, y + 0.07, i + 1, K.amber, K.ink, 0.36); T(s, t, { x: 5.85, y, w: 3.4, h: 0.5, fontSize: 11, valign: "middle" }); }); }

// 30 แบ่งงาน AI / คน
{ const s = lightSlide(pres, S6, "แบ่งงาน: AI ขยาย คนตัดสิน", "บทบาทของ tester ไม่ได้ลดลงแต่ย้ายจุดโฟกัสจากเขียน test case ทีละใบ ไปเป็นการออกแบบเกณฑ์ว่าอะไรถูก AI ไม่มี oracle ของระบบเรา เพราะไม่รู้ว่าธุรกิจนี้ตกลงอะไรกันไว้ AI ช่วยแตกกรณี สร้างข้อมูล และแปลงเป็น code ได้ แต่การตัดสินว่าถูกหรือผิด การจัดลำดับตามความเสี่ยง severity priority การปิดใบ และการตัดสินว่าทดสอบพอแล้ว เป็นของคนเท่านั้น");
  box(s, pres, 0.5, 1.25, 9, 0.55, K.amberT); T(s, "AI ไม่มี oracle ของระบบเรา เพราะไม่รู้ว่าธุรกิจนี้ตกลงอะไรกันไว้", { x: 0.7, y: 1.25, w: 8.6, h: 0.55, fontSize: 14, bold: true, valign: "middle" });
  box(s, pres, 0.5, 1.95, 5.0, 3.05, K.greenT); T(s, "ให้ AI ทำได้", { x: 0.75, y: 2.03, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.green });
  T(s, bullets(["แตก AC เป็น test case เบื้องต้น", "ไล่ค่า boundary และ equivalence class", "สร้าง test data หลากหลาย", "แปลงขั้นตอนทดสอบด้วยมือเป็น Playwright", "ร่างรายงาน bug จากบันทึกดิบ", "วิเคราะห์ log จัดกลุ่มอาการ", "เสนอกรณีที่ทีมอาจมองข้าม"], 3), { x: 0.75, y: 2.45, w: 4.6, h: 2.5, fontSize: 12 });
  box(s, pres, 5.7, 1.95, 3.8, 3.05, K.redT); T(s, "คนเท่านั้น", { x: 5.95, y: 2.03, w: 3.4, h: 0.35, fontSize: 15, bold: true, color: K.red });
  T(s, bullets(["ตัดสินว่าผลลัพธ์ถูกหรือผิด", "จัดลำดับตามความเสี่ยงทางธุรกิจ", "ตัดสิน severity / priority", "ปิดใบ bug", "ตัดสินว่า “ทดสอบพอแล้ว”"], 6), { x: 5.95, y: 2.45, w: 3.4, h: 2.5, fontSize: 13 }); }

// 31 กับดัก
{ const s = lightSlide(pres, S6, "กับดักเมื่อใช้ AI ช่วยทดสอบ", "ห้ากับดักที่ต้องระวัง ข้อแรกคืออันตรายที่สุด ให้ agent เขียนทั้ง code และ test ในรอบเดียวกัน ถ้าเข้าใจโจทย์ผิดจะผิดเหมือนกันทั้งสองไฟล์และทุกอย่างเขียวสวยงาม ข้อสองสั่งว่าทำให้ test ผ่านแล้ว agent แก้ test แทน code ให้ใส่ข้อห้ามใน prompt และ AGENTS.md แล้วตรวจด้วย git diff --stat ก่อน commit");
  rowsTable(s, pres, [["ให้ agent เขียนทั้ง code และ test ในรอบเดียว", "เข้าใจโจทย์ผิดเหมือนกันทั้งสองไฟล์ เขียวสวยแต่ผิดหมด", "คนอนุมัติ AC และ assertion ก่อน หรือแยกรอบ/context"], ["สั่งว่า “ทำให้ test ผ่าน”", "agent แก้ test แทน code ตาข่ายนิรภัยหายเงียบ ๆ", "ห้ามแก้ไฟล์ test ใน prompt และ AGENTS.md ตรวจ git diff --stat"], ["รับ test ที่ generate มาโดยไม่อ่าน assertion", "coverage สูงแต่ mutation score ต่ำ", "อ่าน assertion ทุกบรรทัด ใช้ mutation testing ตรวจซ้ำ"], ["ให้ AI สรุปว่า “พร้อมปล่อยแล้ว”", "ไม่มีใครรับผิดชอบการตัดสินใจ", "go/no-go ต้องมีชื่อคนกำกับ ตาม RACI"], ["วางข้อมูลผู้ใช้จริงลง prompt", "ข้อมูลส่วนบุคคลรั่วออกนอกองค์กร", "ใช้ข้อมูลสังเคราะห์เท่านั้น ตรวจว่าไม่มี secret"]],
    0.5, 1.25, [3.0, 3.0, 3.0], 0.62, { head: ["กับดัก", "ผลที่ตามมา", "มาตรการ"], fs: 11, fills: [K.redT, K.paper, K.paper, K.paper, K.paper] }); }

// 32 Checklist
{ const s = lightSlide(pres, S6, "Checklist ก่อนบอกว่า test พอแล้ว", "ใช้ checklist นี้ก่อนบอกว่า test พอแล้ว ข้อที่ 7 คือ mutation testing แบบทำมือ และเป็นข้อที่ให้ข้อมูลมากที่สุดในเวลาที่น้อยที่สุด");
  ["ทุก business rule ใน spec มี test ที่จะแดงถ้าลบ rule นั้นทิ้ง", "มี test ของกรณีที่ต้องล้มเหลว ไม่ใช่เฉพาะ happy path", "ทดสอบค่าที่ขอบ ไม่ใช่แค่ค่ากลาง ๆ", "suite ทั้งชุดรันจบเร็วพอที่จะรันทุกครั้งที่แก้ code", "สลับลำดับ test แล้วยังเขียว", "รัน 10 ครั้งติดกันแล้วเขียวทั้ง 10 ครั้ง", "แก้ code ให้ผิดโดยตั้งใจ 1 จุด แล้วมี test แดงจริง (mutation testing แบบทำมือ)", "ไม่มี test ที่ถูก skip ค้างไว้โดยไม่มีเหตุผล", "CI รัน test ชุดเดียวกับในเครื่อง และได้ผลเหมือนกัน"].forEach((t, i) => { const y = 1.25 + i * 0.42, hi = i === 6; box(s, pres, 0.5, y, 9, 0.37, hi ? K.amberT : K.paper); chip(s, pres, 0.58, y + 0.02, i + 1, hi ? K.amber : K.teal, hi ? K.ink : K.white, 0.33);
    T(s, t, { x: 1.05, y, w: 8.3, h: 0.37, fontSize: 13, valign: "middle", bold: hi }); }); }

// 33 สรุป
{ const s = darkSlide(pres, S7, "สรุป 5 ข้อ ย้ำว่าคุณภาพของ test คือเพดานคุณภาพของ loop ทั้งชุด รวมถึง loop ที่มี AI agent");
  T(s, "สรุป", { x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  ["ต้นทุนของ bug ขึ้นกับเวลาที่เจอ tester จึงต้องเข้ามาตั้งแต่ requirement", "เลือกระดับ test ให้ตรงกับคำถาม และให้ suite รันเร็วพอจะเชื่อถือได้", "ออกแบบ test ด้วยเทคนิคที่มีหลักการ และวัดคุณภาพด้วย mutation ไม่ใช่แค่ coverage", "bug ต้องทำซ้ำได้ มี severity กับ priority และมีคนยืนยันก่อนปิด", "AI ช่วยขยายงานได้ แต่คนกำหนด oracle และตัดสินว่าถูกหรือผิด"].forEach((t, i) => { const y = 1.15 + i * 0.78; chip(s, pres, 0.7, y + 0.08, i + 1, K.amber, K.ink, 0.4); T(s, t, { x: 1.3, y, w: 8.2, h: 0.65, fontSize: 15, color: K.white, valign: "middle" }); }); }

// 34 Glossary
{ const s = lightSlide(pres, S8, "Glossary", "ใช้ทบทวนคำศัพท์สำคัญของบทอ่านนี้");
  [["Verification / Validation", "สร้างถูกวิธีไหม (ตรง spec) / สร้างของที่ถูกไหม (แก้ปัญหาผู้ใช้จริง)"], ["Test Oracle", "แหล่งที่บอกว่าผลลัพธ์ที่ถูกต้องคืออะไร เช่น spec, AC"], ["Severity / Priority", "ความรุนแรงทางเทคนิค (tester) / ความเร่งด่วนทางธุรกิจ (เจ้าของผลิตภัณฑ์)"], ["Regression", "ของที่เคยทำงานได้แล้วกลับพัง"],
    ["Flaky test", "test ที่บางครั้งเขียวบางครั้งแดง ทั้งที่ code ไม่เปลี่ยน"], ["Coverage", "สัดส่วน code ที่ถูกรัน ไม่ได้วัดว่ามีการตรวจ"], ["Mutation testing", "จงใจแก้ code ให้ผิดแล้วดูว่า test จับได้ไหม"], ["DRE", "Defect Removal Efficiency สัดส่วน bug ที่จับได้ก่อนถึงมือผู้ใช้"]].forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.25 + Math.floor(i / 2) * 0.93; box(s, pres, x, y, 4.4, 0.85, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 11 } }], { x: x + 0.2, y, w: 4.0, h: 0.85, valign: "middle" }); }); }

// 35 Ref
{ const s = lightSlide(pres, S9, "Ref", "รายการแหล่งอ้างอิงทั้งหมดจากท้ายบทอ่าน ให้ตรวจแหล่งเหล่านี้ก่อนเชื่อเนื้อหา เพราะบทอ่านเขียนโดยมี AI ช่วยและอาจมีส่วนที่ผิดหรือเก่าไปแล้ว");
  const mk = (head, items) => [{ text: head, options: { bold: true, fontSize: 14, color: K.teal, breakLine: true, paraSpaceBefore: 8, paraSpaceAfter: 3 } }].concat(items.map(t => ({ text: t, options: { fontSize: 12, breakLine: true, paraSpaceAfter: 2 } })));
  const left = [].concat(mk("มาตรฐานและหลักสูตร", ["ISTQB — Certified Tester Foundation Level Syllabus", "ISO/IEC/IEEE 29119 — Software Testing", "ISO/IEC 25010 — คุณลักษณะคุณภาพของซอฟต์แวร์", "IEEE 1044 — Standard Classification for Software Anomalies", "ISTQB Glossary"]), mk("หนังสือ", ["Gerard Meszaros — xUnit Test Patterns: Refactoring Test Code", "Kent Beck — Test-Driven Development: By Example", "Michael Feathers — Working Effectively with Legacy Code"]));
  const right = [].concat(mk("บทความอ้างอิงหลัก", ["Martin Fowler — Test Pyramid", "Martin Fowler — Test Double", "Martin Fowler — Mocks Aren't Stubs", "Martin Fowler — Eradicating Non-Determinism in Tests", "Kent C. Dodds — The Testing Trophy and Testing Classifications", "Google Testing Blog — Test Sizes"]), mk("เครื่องมือ", ["pytest · Vitest · Jest · Playwright", "Stryker Mutator · mutmut · axe-core · k6"]));
  T(s, left, { x: 0.5, y: 1.2, w: 4.4, h: 3.8, fontSize: 11 }); T(s, right, { x: 5.1, y: 1.2, w: 4.4, h: 3.8, fontSize: 11 }); }

L.save(pres, "R03-software-testing.pptx").then(() => console.log("saved"));
