const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, ref, rowsTable } = L;
const S0 = "เปิดบท", S1 = "ทำไมโครงการพลาด", S2 = "วงจรชีวิต", S3 = "RACI", S4 = "เลือกแนวทาง", S5 = "WBS", S6 = "ประมาณงาน", S7 = "AI กับ PM", S8 = "วัดผล", S9 = "สรุป", S10 = "Glossary", S11 = "Ref";
const pres = L.newDeck("IT Project Management ในยุค AI", [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11]);
const numbered = (s, items, y0 = 1.3, h = 0.62, fs = 14) => items.forEach((t, i) => { const y = y0 + i * (h + 0.1); box(s, pres, 0.5, y, 9, h, K.paper); chip(s, pres, 0.65, y + (h - 0.42) / 2, i + 1, K.teal, K.white, 0.42); T(s, t, { x: 1.3, y, w: 8, h, fontSize: fs, valign: "middle" }); });
const ln = (s, x1, y1, x2, y2, color = K.mute, w = 1.5, arr = true) => { const o = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), line: { color, width: w } }; if (arr) o.line.endArrowType = "triangle"; if ((x2 >= x1) !== (y2 >= y1)) o.flipV = true; s.addShape(pres.ShapeType.line, o); };
function casePlain(o) {
  const s = lightSlide(pres, o.sec, o.title, o.notes);
  box(s, pres, 0.5, 1.3, 5.3, 3.65, K.paper);
  T(s, o.tag, { x: 0.75, y: 1.45, w: 4.8, h: 0.35, fontSize: 12, bold: true, color: K.teal });
  T(s, o.facts.map((f, i) => ({ text: f, options: { bullet: true, breakLine: i < o.facts.length - 1, paraSpaceAfter: 8 } })), { x: 0.75, y: 1.85, w: 4.8, h: 3.0, fontSize: 17 });
  box(s, pres, 6.05, 1.3, 3.45, 3.65, K.amberT);
  T(s, o.principle, { x: 6.3, y: 1.45, w: 3.0, h: 0.35, fontSize: 12, bold: true, color: "B5651D" });
  T(s, o.takeaway, { x: 6.3, y: 1.85, w: 3.0, h: 3.0, fontSize: 18, bold: true });
}

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดบทนี้ว่าด้วยการบริหารโครงการ IT ในยุคที่มี AI ช่วยงาน บทนี้ให้ภาพรวมตั้งแต่เหตุผลที่โครงการพลาด RACI WBS การประมาณงาน จนถึงบทบาทของ AI");
  T(s, "Reading 01", { x: 0.7, y: 1.4, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "IT Project Management\nในยุค AI", { x: 0.7, y: 2.0, w: 8.6, h: 1.8, fontSize: 40, bold: true, color: K.white });
  box(s, pres, 0.7, 4.2, 2.4, 0.08, K.amber); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "อ่านแล้วจะได้อะไร", "บทนี้มีเป้าหมาย 6 ข้อ ให้ผู้เรียนอธิบายสาเหตุที่โครงการ IT พลาด แยก predictive กับ adaptive ทำ RACI และ WBS ประมาณงานอย่างมีหลักการ และรู้ว่า AI ช่วยตรงไหนได้จริง");
  const it = ["อธิบายว่าทำไมโครงการ IT ล้มเหลวบ่อยกว่าโครงการก่อสร้าง", "แยก predictive ออกจาก adaptive และเลือกใช้ให้ถูกงาน", "ทำ RACI และวางตัวกับแต่ละ role ได้ถูกจังหวะ", "แตกงานเป็น WBS ที่ตรวจรับได้ และหา critical path เจอ", "ประมาณงานอย่างมีหลักการ ไม่เดาตามความรู้สึก", "บอกได้ว่า AI ช่วยงาน PM ตรงไหนได้ และตรงไหนไม่ควรให้ช่วย"];
  it.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.05, K.paper); chip(s, pres, x + 0.2, y + 0.31, i + 1);
    T(s, t, { x: x + 0.8, y, w: 3.45, h: 1.05, fontSize: 14, valign: "middle" }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "สะพานที่สร้างไปครึ่งหนึ่ง ใคร ๆ ก็ดูออกว่าครึ่งหนึ่ง แต่ระบบซอฟต์แวร์ที่เขียนไปแล้ว 90% อาจเหลืออีก 90% ก็ได้ ให้ผู้เรียนลองคิดว่าทำไมความคืบหน้าของซอฟต์แวร์จึงดูยาก แล้วพาเข้าหัวข้อแรก");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.7, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "ระบบที่ “เขียนไปแล้ว 90%”\nอาจเหลืออีก 90% ก็ได้", { x: 0.7, y: 1.3, w: 8.6, h: 1.5, fontSize: 32, bold: true, color: K.white });
  T(s, "สะพานที่สร้างไปครึ่งหนึ่ง ใคร ๆ ก็ดูออกว่าครึ่งหนึ่ง ซอฟต์แวร์ดูไม่ออก", { x: 0.7, y: 3.0, w: 8.6, h: 0.4, fontSize: 14, color: "B8C4D4" });
  box(s, pres, 0.7, 3.65, 4.2, 0.45, K.teal); T(s, "ที่รายงาน: เขียนแล้ว 90%", { x: 0.9, y: 3.65, w: 3.9, h: 0.45, fontSize: 13, bold: true, color: K.white, valign: "middle" });
  box(s, pres, 0.7, 4.25, 8.6, 0.45, K.amber); T(s, "ที่เหลือจริง: อาจอีก 90%", { x: 0.9, y: 4.25, w: 8.2, h: 0.45, fontSize: 13, bold: true, color: K.ink, valign: "middle" }); }

// 4 ตัวเลข
{ const s = lightSlide(pres, S1, "โครงการ IT ใหญ่ ๆ เกินแผนแค่ไหน", "งานวิจัยของ McKinsey ร่วมกับ University of Oxford สำรวจโครงการ IT กว่า 5,400 โครงการ โครงการขนาดใหญ่เกินงบเฉลี่ย 45% เกินเวลา 7% และส่งมอบคุณค่าน้อยกว่าที่สัญญา 56% ที่น่าสนใจกว่าคือหาง ซึ่งโครงการงบบานเกิน 200% เรียกว่า black swan เกิดบ่อยกว่าทฤษฎีปกติทำนาย Flyvbjerg เรียกว่า fat-tailed risk ดังนั้นดูแค่ค่าเฉลี่ยไม่พอ");
  T(s, "โครงการ IT กว่า 5,400 โครงการ: ค่าเฉลี่ยของโครงการขนาดใหญ่", { x: 0.5, y: 1.2, w: 9, h: 0.3, fontSize: 14, color: K.ink2 });
  [["45%", "ใช้งบเกินแผน", K.redT, K.red], ["7%", "ใช้เวลาเกินแผน", K.amberT, "B5651D"], ["56%", "ส่งมอบคุณค่าน้อยกว่าที่สัญญาไว้", K.redT, K.red]].forEach((v, i) => { const x = 0.5 + i * 3.05; box(s, pres, x, 1.6, 2.9, 1.85, v[2]);
    T(s, v[0], { x, y: 1.7, w: 2.9, h: 0.9, fontSize: 44, bold: true, color: v[3], align: "center", valign: "middle" });
    T(s, v[1], { x: x + 0.2, y: 2.65, w: 2.5, h: 0.7, fontSize: 14, align: "center", valign: "top" }); });
  box(s, pres, 0.5, 3.7, 9, 1.25, K.paper);
  T(s, "ดูที่หาง ไม่ใช่ค่าเฉลี่ย", { x: 0.75, y: 3.78, w: 8.5, h: 0.3, fontSize: 14, bold: true, color: K.teal });
  T(s, "โครงการที่งบบานเกิน 200% (black swan) เกิดบ่อยกว่าที่ทฤษฎีปกติทำนาย ความเสียหายจริงอยู่ที่ “เกินงบมหาศาลนาน ๆ ครั้ง” (fat-tailed risk)", { x: 0.75, y: 4.1, w: 8.5, h: 0.8, fontSize: 14 });
  ref(s, "McKinsey & Company ร่วมกับ University of Oxford (Delivering large-scale IT projects...); Flyvbjerg และ Gardner (2023)"); }

// 5 สาเหตุ 4 ข้อ
{ const s = lightSlide(pres, S1, "สาเหตุเชิงโครงสร้าง 4 ข้อ", "สาเหตุมี 4 ข้อ คือซอฟต์แวร์มองไม่เห็นด้วยตา ความต้องการเปลี่ยนได้เพราะเปลี่ยนแล้วดูเหมือนไม่มีต้นทุน งานส่วนใหญ่ไม่เคยทำมาก่อนจึงไม่มีสถิติ และความเสี่ยงกระจุกอยู่ปลายทางคือ integration กับ deploy ข้อ 4 เชื่อมกับ loop ของวิชา เพราะกว่าจะรู้ว่าพลาดก็เหลือเวลาน้อยเกินแก้");
  const c = ["ซอฟต์แวร์มองไม่เห็นด้วยตา", "ความต้องการเปลี่ยนได้ตลอด เพราะเปลี่ยนแล้วดูเหมือนไม่มีต้นทุน", "งานส่วนใหญ่ไม่เคยทำมาก่อน จึงไม่มีสถิติให้อ้างอิง", "ความเสี่ยงกระจุกอยู่ปลายทาง: integration และ deploy"];
  c.forEach((t, i) => { const x = 0.5 + i * 2.3, last = i === 3; box(s, pres, x, 1.3, 2.15, 1.65, last ? K.amberT : K.paper); chip(s, pres, x + 0.12, 1.4, i + 1, last ? K.amber : K.teal, last ? K.ink : K.white, 0.4);
    T(s, t, { x: x + 0.12, y: 1.9, w: 1.95, h: 1.0, fontSize: 13 }); ln(s, x + 1.075, 2.95, x + 1.075, 3.3, K.mute); });
  box(s, pres, 0.5, 3.3, 9, 0.7, K.redT); T(s, "ความคืบหน้าที่รายงาน ไม่ตรงกับความคืบหน้าจริง", { x: 0.7, y: 3.3, w: 8.6, h: 0.7, fontSize: 16, bold: true, valign: "middle", align: "center" });
  ln(s, 5.0, 4.0, 5.0, 4.3, K.mute);
  box(s, pres, 0.5, 4.3, 9, 0.65, K.ink); T(s, "รู้ว่ามีปัญหาช้าเกินกว่าจะแก้ได้ถูก", { x: 0.7, y: 4.3, w: 8.6, h: 0.65, fontSize: 16, bold: true, color: K.white, valign: "middle", align: "center" }); }

// 6 กรณี
casePlain({ sec: S1, title: "กรณีตัวอย่าง: คำถามแรกของ PM", tag: "PM ที่มีประสบการณ์",
  notes: "PM ที่มีประสบการณ์ไม่ถามว่าจะเสร็จเมื่อไร แต่ถามว่าอะไรคือสิ่งที่ยังไม่รู้ และจะรู้ได้เร็วที่สุดเมื่อไร มาตรการที่ตรงจุดที่สุดคือบังคับ deploy ของจริงตั้งแต่สัปดาห์แรกทั้งที่ยังไม่มี feature เพื่อย้ายความเสี่ยงจากปลายทางมาไว้ต้นทาง",
  facts: ["ไม่ถามว่า “จะเสร็จเมื่อไร”", "แต่ถามว่า “อะไรคือสิ่งที่เรายังไม่รู้ และจะรู้ได้เร็วที่สุดเมื่อไร”", "deploy ของจริงตั้งแต่สัปดาห์แรก แม้ยังไม่มี feature", "ย้ายความเสี่ยงจากปลายทางมาไว้ต้นทาง"],
  principle: "หลักคิด", takeaway: "โครงการที่จัดการดีคือโครงการที่ทยอยลดความไม่รู้ ไม่ใช่โครงการที่ทำตามแผนได้เป๊ะ" });

// 7 วงจรชีวิต
{ const s = lightSlide(pres, S2, "วงจรชีวิตโครงการและกรอบของ Princeton", "หน่วยงาน PATCO ของ Princeton แบ่งโครงการเป็น 4 ระยะ และกำหนดว่าแต่ละระยะต้องมีเอกสารอะไร ถ้าขอบเขตเปลี่ยนในช่วง Execution ต้องกลับไปวางแผน และบทเรียนตอน Closeout ต้องเข้าโครงการถัดไป นอกจากนี้ยังมี PPIM สำหรับงานที่เป้าหมายคือปรับกระบวนการ ไม่ใช่สร้างระบบใหม่");
  flow(s, pres, [{ t: "Initiation", sub: "เราจะแก้ปัญหาอะไร และใครเกี่ยวข้อง", fill: K.tealT }, { t: "Planning", sub: "ขอบเขต เวลา ทรัพยากร ความเสี่ยง" }, { t: "Execution", sub: "ลงมือ และควบคุมการเปลี่ยนแปลง" }, { t: "Closeout", sub: "ส่งมอบ ถอดบทเรียน ส่งต่อทีมดูแล", fill: K.amberT }], 0.5, 1.3, 9, 1.5, { gap: 0.28, fs: 15, sfs: 12 });
  box(s, pres, 0.5, 3.0, 4.4, 0.5, K.paper); T(s, "Execution → Planning: เมื่อขอบเขตเปลี่ยน", { x: 0.65, y: 3.0, w: 4.1, h: 0.5, fontSize: 12, valign: "middle" });
  box(s, pres, 5.1, 3.0, 4.4, 0.5, K.paper); T(s, "Closeout → Initiation: บทเรียนเข้าโครงการถัดไป", { x: 5.25, y: 3.0, w: 4.1, h: 0.5, fontSize: 12, valign: "middle" });
  box(s, pres, 0.5, 3.75, 9, 1.2, K.tealT);
  T(s, [{ text: "PPIM (Princeton Process Improvement Methodology)", options: { bold: true, color: K.teal, breakLine: true } }, { text: "ใช้เมื่อเป้าหมายคือ “ปรับกระบวนการ” ไม่ใช่ “สร้างระบบใหม่” โครงการ IT ที่ล้มเหลวหลายโครงการเป็นการเปลี่ยนกระบวนการของคน แต่ถูกจัดการเหมือนเขียนซอฟต์แวร์", options: {} }], { x: 0.75, y: 3.85, w: 8.5, h: 1.0, fontSize: 14 });
  ref(s, "Princeton University, PATCO: Project and Technology Consulting Office"); }

// 8 เอกสารตามระยะ
{ const s = lightSlide(pres, S2, "เอกสารสำคัญของแต่ละระยะ", "แต่ละระยะมีเอกสารที่ตอบคำถามเฉพาะ เช่น Charter ตอบว่าทำไมต้องทำ RACI ตอบว่าใครตัดสินใจ Risk Register ตอบว่าอะไรอาจพัง ส่วน Post Project Responsibilities ตอบว่าใครดูแลต่อ ซึ่งเป็นจุดที่โครงการของมหาวิทยาลัยพลาดบ่อยที่สุด");
  rowsTable(s, pres, [["Initiation", "Project Charter / Initiation Plan", "ทำไมต้องทำ ใครอนุมัติ ขอบเขตคร่าว ๆ คืออะไร"], ["Initiation", "Project Roles / RACI Matrix", "ใครตัดสินใจ ใครลงมือ ใครต้องถูกถาม ใครแค่รับรู้"], ["Planning", "Work Breakdown / Schedule", "งานใหญ่แตกเป็นงานย่อยอะไร ลำดับเป็นอย่างไร"], ["Planning", "Risk Register", "อะไรอาจพัง เราจะรู้ได้อย่างไร และจะทำอะไร"], ["Execution", "Status Report / Change Log", "ตอนนี้อยู่ตรงไหนเทียบกับ baseline และมีอะไรเปลี่ยนบ้าง"], ["Closeout", "Post Project Responsibilities", "ใครดูแลต่อหลังโครงการจบ จุดนี้โครงการของมหาวิทยาลัยพลาดบ่อยที่สุด"]],
    0.5, 1.2, [1.3, 2.8, 4.9], 0.5, { head: ["ระยะ", "เอกสาร", "คำถามที่เอกสารนั้นตอบ"], fs: 12, fills: [K.paper, K.paper, K.tealT, K.tealT, K.paper, K.amberT] });
  ref(s, "Princeton University, PATCO: Project and Technology Consulting Office"); }

// 9 กรณี closeout
casePlain({ sec: S2, title: "กรณีตัวอย่าง: เอกสาร Closeout ถูกข้าม", tag: "ระยะที่ถูกข้ามบ่อยที่สุด",
  notes: "เอกสารระยะ Closeout ถูกข้ามบ่อยที่สุดและเจ็บที่สุด ระบบที่ส่งมอบแล้วไม่มีใครดูแลต่อจะกลายเป็นระบบผีภายใน 1 ปี คือยังมีคนใช้แต่ไม่มีใครกล้าแตะ และต้องใช้เทคนิคอย่าง characterization test เข้าไปแกะทีหลัง",
  facts: ["เอกสารระยะ Closeout ถูกข้ามบ่อยที่สุดและเจ็บที่สุด", "ระบบที่ส่งมอบแล้วไม่มีใครดูแลต่อ กลายเป็น “ระบบผี” ภายใน 1 ปี", "ยังมีคนใช้ แต่ไม่มีใครกล้าแตะ", "ต้องใช้เทคนิคอย่าง characterization test เข้าไปแกะทีหลัง"],
  principle: "สิ่งที่ต้องทำก่อนจบ", takeaway: "ก่อนปิดโครงการ ต้องตกลงให้ชัดว่าใครดูแลระบบต่อ" });

// 10 RACI 4 ตัวอักษร
{ const s = lightSlide(pres, S3, "RACI: ใครตัดสินใจ ใครลงมือ", "RACI คือตารางหน้าเดียวที่ตอบว่าตกลงใครตัดสินใจเรื่องนี้ R คือผู้ลงมือ A คือผู้รับผิดชอบผลลัพธ์และอนุมัติ มีได้คนเดียว C คือคนที่ต้องถามก่อน สื่อสารสองทาง I คือคนที่ต้องรู้ทีหลัง สื่อสารทางเดียว ใช้คำถามว่างานพังต่อหน้าอาจารย์หรือลูกค้าแล้วใครต้องยืนขึ้นตอบ เพื่อหา A");
  const d = [["R", "Responsible", "คนที่ลงมือทำงานนั้นจริง ๆ", "อย่างน้อย 1 คน (มีหลายคนได้)", K.teal], ["A", "Accountable", "คนที่รับผิดชอบผลลัพธ์ และอนุมัติว่างานเสร็จ", "ต้องมี 1 คนเท่านั้น", K.red], ["C", "Consulted", "คนที่ต้องถูกถามก่อนตัดสินใจ (สื่อสารสองทาง)", "0 ถึงหลายคน", K.green], ["I", "Informed", "คนที่ต้องรู้ผลหลังตัดสินใจ (สื่อสารทางเดียว)", "0 ถึงหลายคน", K.mute]];
  d.forEach((v, i) => { const x = 0.5 + i * 2.3; box(s, pres, x, 1.3, 2.15, 2.55, K.paper); chip(s, pres, x + 0.15, 1.42, v[0], v[4], K.white, 0.55);
    T(s, v[1], { x: x + 0.8, y: 1.42, w: 1.3, h: 0.55, fontSize: 13, bold: true, valign: "middle" });
    T(s, v[2], { x: x + 0.15, y: 2.1, w: 1.85, h: 1.0, fontSize: 12 });
    T(s, v[3], { x: x + 0.15, y: 3.15, w: 1.85, h: 0.6, fontSize: 12, bold: true, color: v[4] === K.mute ? K.ink2 : v[4] }); });
  box(s, pres, 0.5, 4.05, 9, 0.9, K.amberT);
  T(s, "ถ้างานชิ้นนี้พังต่อหน้าอาจารย์หรือลูกค้า ใครคือคนที่ต้องยืนขึ้นตอบ? คำตอบต้องเป็นชื่อคนเดียว คนนั้นคือ A", { x: 0.75, y: 4.05, w: 8.5, h: 0.9, fontSize: 14, bold: true, valign: "middle" }); }

// 11 กติกา RACI
{ const s = lightSlide(pres, S3, "กติกา 5 ข้อของ RACI ที่ห้ามละเมิด", "กติกา 5 ข้อคือ หนึ่งงานมี A เดียว เพราะ A สองคนคือไม่มี A ทุกงานต้องมี A A กับ R เป็นคนเดียวกันได้ในทีมเล็ก C ไม่มีสิทธิ์ยับยั้ง ถ้ามีอำนาจหยุดงานได้จริงก็เป็น A และอย่าใส่ C มากเกินไปเพราะทุก C คือการรอ 1 รอบ");
  numbered(s, ["หนึ่งงานมี A เดียวเท่านั้น A สองคนคือไม่มี A", "ทุกงานต้องมี A งานที่ไม่มี A จะถูกลืม", "A กับ R เป็นคนเดียวกันได้ เขียน A/R โดยเฉพาะในทีมเล็ก", "C ไม่มีสิทธิ์ยับยั้ง คนตัดสินคือ A", "อย่าใส่ C เยอะเกินไป ทุก C คือการรอ 1 รอบ"], 1.3, 0.62, 15); }

// 12 ตัวอย่าง RACI
{ const s = lightSlide(pres, S3, "ตัวอย่าง RACI ของโครงการในวิชา", "ตัวอย่างนี้เลือกบางแถวจากตารางในบท ให้ดูแถวตัดสินใจตัด feature A อยู่ที่ Product Owner ไม่ใช่ PM เพราะการตัดของออกเป็นเรื่องคุณค่า ไม่ใช่เรื่องแผน เป็นเส้นแบ่งที่ PM มือใหม่ก้าวข้ามบ่อยที่สุด");
  rowsTable(s, pres, [["กำหนดขอบเขตและลำดับความสำคัญ", "A", "R", "C", "I", "C"], ["เลือก tech stack", "I", "A", "R", "C", "C"], ["ออกแบบ API contract", "C", "A", "R", "C", "I"], ["เขียน code + unit test", "I", "A", "R", "I", "—"], ["อนุมัติ deploy ขึ้น staging", "I", "A/R", "R", "C", "I"], ["ตัดสินใจตัด feature เมื่อเวลาไม่พอ", "A", "R", "C", "I", "C"], ["รายงานความคืบหน้ารายสัปดาห์", "I", "A/R", "I", "I", "I"]],
    0.5, 1.2, [3.6, 1.08, 1.08, 1.08, 1.08, 1.08], 0.38, { head: ["กิจกรรม (PO = Product Owner)", "PO", "PM", "Dev", "QA", "อาจารย์"], fs: 13, fills: [K.paper, K.paper, K.paper, K.paper, K.paper, K.amberT, K.paper] });
  T(s, "แถวที่ 6: A อยู่ที่ Product Owner เพราะการตัดของออกคือการตัดสินใจเรื่องคุณค่า ไม่ใช่เรื่องแผน", { x: 0.5, y: 4.8, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal }); }

// 13 PM ต่อ role
{ const s = lightSlide(pres, S3, "PM ปฏิบัติกับแต่ละ role ต่างกัน", "RACI ไม่มีประโยชน์ถ้า PM ปฏิบัติกับทุกคนเหมือนกัน กับ A ให้เสนอทางเลือกพร้อม trade-off และ deadline กับ R ให้กำจัดสิ่งกีดขวางและรับข่าวร้ายโดยไม่ตำหนิ เพราะนั่นคือ latency ของ loop ระดับทีม กับ C ให้ถามเจาะจงและปิด loop กลับ กับ I ให้อัปเดตสม่ำเสมอและอ่านจบใน 30 วินาที และยึดกฎ no surprises คือผู้บริหารรับข่าวร้ายได้ แต่ไม่รับข่าวร้ายที่เพิ่งรู้ตอนสาย");
  const d = [["A", "กับ A", "ทำให้เขาตัดสินใจได้ ไม่ใช่ตัดสินใจแทน", "เสนอ 2 ทางพร้อม trade-off และ deadline", "ถามลอย ๆ ว่า “จะเอาแบบไหนดี”", K.red], ["R", "กับ R", "กำจัดสิ่งกีดขวาง ไม่เร่งหรือคุมรายละเอียด", "ตกลง DoD ก่อนเริ่ม และรับข่าวร้ายโดยไม่ตำหนิ", "ถามความคืบหน้าเป็น % ทุกวัน", K.teal], ["C", "กับ C", "ถามให้ตรงจุดและถามให้ทัน", "ถามเจาะจงพอตอบได้ใน 10 นาที และปิด loop กลับ", "ส่งเอกสาร 20 หน้าแล้วบอกให้ช่วยดู", K.green], ["I", "กับ I", "ทำให้เขาไม่ต้องมาถาม", "อัปเดตตามรอบ อ่านจบใน 30 วินาที", "ส่งเฉพาะตอนมีข่าวดี", K.mute]];
  d.forEach((v, i) => { const x = 0.5 + i * 2.3; box(s, pres, x, 1.3, 2.15, 3.65, K.paper); chip(s, pres, x + 0.15, 1.42, v[0], v[5], K.white, 0.5);
    T(s, v[1], { x: x + 0.8, y: 1.42, w: 1.3, h: 0.5, fontSize: 15, bold: true, valign: "middle" });
    T(s, v[2], { x: x + 0.15, y: 2.05, w: 1.85, h: 0.85, fontSize: 12, bold: true });
    T(s, "แบบที่ช่วย", { x: x + 0.15, y: 2.95, w: 1.85, h: 0.22, fontSize: 11, bold: true, color: K.green });
    T(s, v[3], { x: x + 0.15, y: 3.18, w: 1.85, h: 0.75, fontSize: 12 });
    T(s, "แบบที่ไม่ช่วย", { x: x + 0.15, y: 4.0, w: 1.85, h: 0.22, fontSize: 11, bold: true, color: K.red });
    T(s, v[4], { x: x + 0.15, y: 4.23, w: 1.85, h: 0.65, fontSize: 12 }); }); }

// 14 decision tree
{ const s = lightSlide(pres, S4, "Predictive, Adaptive หรือ Hybrid", "ไม่มีสูตรเดียวที่ใช้ได้ทุกงาน ให้ถามก่อนว่าความต้องการนิ่งหรือยัง ถ้ายังไม่นิ่งให้ใช้ adaptive ถ้านิ่งแล้วให้ถามต่อว่าต้นทุนแก้ทีหลังสูงไหม ถ้าสูงมากเช่น hardware หรือสัญญาจัดซื้อให้ใช้ predictive ถ้าไม่สูงให้ใช้ hybrid");
  box(s, pres, 0.5, 1.4, 3.3, 0.9, K.ink); T(s, "ความต้องการชัดและนิ่งแล้วหรือยัง", { x: 0.65, y: 1.4, w: 3.0, h: 0.9, fontSize: 14, bold: true, color: K.white, valign: "middle", align: "center" });
  ln(s, 3.8, 1.85, 6.2, 1.85); T(s, "ยังไม่นิ่ง", { x: 3.9, y: 1.5, w: 2.2, h: 0.3, fontSize: 12, bold: true, color: K.mute, align: "center" });
  box(s, pres, 6.2, 1.4, 3.3, 0.9, K.greenT); T(s, [{ text: "Adaptive", options: { bold: true, fontSize: 14, breakLine: true } }, { text: "รอบสั้น ส่งของบ่อย ให้ผู้ใช้เห็นเร็ว", options: { fontSize: 12 } }], { x: 6.3, y: 1.4, w: 3.1, h: 0.9, valign: "middle", align: "center" });
  ln(s, 2.15, 2.3, 2.15, 2.9); T(s, "นิ่ง", { x: 2.3, y: 2.45, w: 1.2, h: 0.3, fontSize: 12, bold: true, color: K.mute });
  box(s, pres, 0.5, 2.9, 3.3, 2.05, K.ink2); T(s, "ต้นทุนของการแก้ทีหลังสูงไหม", { x: 0.65, y: 2.9, w: 3.0, h: 2.05, fontSize: 14, bold: true, color: K.white, valign: "middle", align: "center" });
  ln(s, 3.8, 3.3, 6.2, 3.3); T(s, "สูงมาก เช่น hardware, สัญญาจัดซื้อ", { x: 3.9, y: 2.82, w: 2.25, h: 0.45, fontSize: 11, bold: true, color: K.mute, align: "center", valign: "bottom" });
  box(s, pres, 6.2, 2.8, 3.3, 1.0, K.tealT); T(s, [{ text: "Predictive", options: { bold: true, fontSize: 14, breakLine: true } }, { text: "วางแผนละเอียดก่อนลงมือ", options: { fontSize: 12 } }], { x: 6.3, y: 2.8, w: 3.1, h: 1.0, valign: "middle", align: "center" });
  ln(s, 3.8, 4.45, 6.2, 4.45); T(s, "ไม่สูง", { x: 3.9, y: 4.1, w: 2.2, h: 0.3, fontSize: 12, bold: true, color: K.mute, align: "center" });
  box(s, pres, 6.2, 3.95, 3.3, 1.0, K.amberT); T(s, [{ text: "Hybrid", options: { bold: true, fontSize: 14, breakLine: true } }, { text: "แผนใหญ่แบบ predictive งานพัฒนาแบบ adaptive", options: { fontSize: 12 } }], { x: 6.3, y: 3.95, w: 3.1, h: 1.0, valign: "middle", align: "center" }); }

// 15 hybrid + triangle
{ const s = lightSlide(pres, S4, "Hybrid ในองค์กรไทย และสามเหลี่ยมข้อจำกัด", "องค์กรไทยส่วนใหญ่ใช้ hybrid เพราะสัญญาและงบถูกล็อกแบบ predictive แต่ทีมพัฒนาทำงานเป็นรอบสั้น วิธีจัดการคือล็อกงบและเวลา ให้ scope ยืดหยุ่น สามเหลี่ยมคลาสสิกบอกว่าเลือกได้ 2 จาก 3 แต่ในงานจริงเมื่อผู้บริหารยืนยันทั้ง 3 ด้าน Quality จะถูกลดเงียบ ๆ กลายเป็นหนี้เทคนิค PMBOK Guide ฉบับที่ 7 ยอมรับว่าวิธีบริหารต้องเลือกให้เหมาะกับบริบท");
  box(s, pres, 0.5, 1.3, 4.4, 3.0, K.paper);
  T(s, "องค์กรไทยส่วนใหญ่ใช้ Hybrid", { x: 0.7, y: 1.4, w: 4.0, h: 0.35, fontSize: 15, bold: true, color: K.teal });
  T(s, [{ text: "สัญญาและงบ: ล็อกแบบ predictive เพราะระบบจัดซื้อบังคับ", options: { bullet: true, breakLine: true, paraSpaceAfter: 6 } }, { text: "ทีมพัฒนา: ทำงานเป็นรอบสั้นแบบ adaptive", options: { bullet: true, breakLine: true, paraSpaceAfter: 6 } }, { text: "วิธีจัดการ: ล็อกงบและเวลา ให้ scope ยืดหยุ่นตามลำดับความสำคัญ", options: { bullet: true } }], { x: 0.7, y: 1.85, w: 4.0, h: 2.4, fontSize: 13 });
  ln(s, 7.0, 1.8, 6.1, 3.3, K.mute, 1.5, false); ln(s, 7.8, 1.8, 8.7, 3.3, K.mute, 1.5, false); ln(s, 6.9, 3.55, 7.9, 3.55, K.mute, 1.5, false);
  box(s, pres, 6.6, 1.3, 1.6, 0.5, K.teal); T(s, "Scope", { x: 6.6, y: 1.3, w: 1.6, h: 0.5, fontSize: 14, bold: true, color: K.white, align: "center", valign: "middle" });
  box(s, pres, 5.3, 3.3, 1.6, 0.5, K.teal); T(s, "Time", { x: 5.3, y: 3.3, w: 1.6, h: 0.5, fontSize: 14, bold: true, color: K.white, align: "center", valign: "middle" });
  box(s, pres, 7.9, 3.3, 1.6, 0.5, K.teal); T(s, "Cost", { x: 7.9, y: 3.3, w: 1.6, h: 0.5, fontSize: 14, bold: true, color: K.white, align: "center", valign: "middle" });
  s.addShape(pres.ShapeType.ellipse, { x: 6.7, y: 2.4, w: 1.4, h: 0.6, fill: { color: K.amber }, line: { color: K.amber, width: 0 } }); T(s, "Quality", { x: 6.7, y: 2.4, w: 1.4, h: 0.6, fontSize: 13, bold: true, align: "center", valign: "middle" });
  T(s, "ผู้บริหารยืนยันทั้ง 3 ด้าน: Quality ถูกลดเงียบ ๆ กลายเป็นหนี้เทคนิค", { x: 5.1, y: 3.9, w: 4.4, h: 0.45, fontSize: 12, bold: true, color: K.ink2, align: "center" });
  box(s, pres, 0.5, 4.5, 9, 0.5, K.tealT); T(s, "PMBOK Guide ฉบับ 7: จากกระบวนการ 49 ข้อ เป็น 12 หลักการและ 8 performance domains", { x: 0.7, y: 4.5, w: 8.6, h: 0.5, fontSize: 13, bold: true, valign: "middle" });
  ref(s, "PMI, A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th Edition"); }

// 16 WBS 3 กติกา
{ const s = lightSlide(pres, S5, "กติกา 3 ข้อที่ทำให้ WBS ใช้ได้จริง", "ข้อ 1 กฎ 100% ลูกรวมกันต้องได้ขอบเขตของพ่อพอดี ขาดคืองานหาย เกินคือ scope creep ข้อ 2 แตกเป็นของที่ตรวจรับได้ ไม่ใช่การกระทำ เช่น รายงานผล E2E ที่เขียวทั้งชุด ข้อ 3 แตกจนเป็น Work Package ตามกฎ 8/80 คือ 8 ถึง 80 ชั่วโมง และโครงการขนาดวิชาเรียนควรเล็กกว่านั้นคือ 4-16 ชั่วโมงต่อชิ้น");
  const d = [["กฎ 100%", "ลูกทุกตัวรวมกันต้องได้ขอบเขตของพ่อพอดี", "ขาด = งานหาย\nเกิน = scope creep แอบเข้ามา", K.tealT], ["แตกเป็น “ของ” ไม่ใช่ “การกระทำ”", "ไม่ช่วย: “ทดสอบ”", "ช่วย: “รายงานผล E2E ที่เขียวทั้งชุด” ตอบได้ทันทีว่าเสร็จเมื่อไร", K.amberT], ["แตกจนประมาณและมอบหมายได้", "Work Package ตามกฎ 8/80 คือ 8-80 ชั่วโมงต่อชิ้น", "โครงการขนาดวิชาเรียน: 4-16 ชั่วโมงต่อชิ้น", K.greenT]];
  d.forEach((v, i) => { const x = 0.5 + i * 3.05; box(s, pres, x, 1.3, 2.9, 3.65, v[3]); chip(s, pres, x + 0.15, 1.45, i + 1, K.teal, K.white, 0.5);
    T(s, v[0], { x: x + 0.8, y: 1.4, w: 1.95, h: 0.85, fontSize: 14, bold: true, valign: "middle" });
    T(s, v[1], { x: x + 0.2, y: 2.45, w: 2.5, h: 1.0, fontSize: 13, bold: true });
    T(s, v[2], { x: x + 0.2, y: 3.5, w: 2.5, h: 1.35, fontSize: 13 }); });
  ref(s, "PMI, Practice Standard for Work Breakdown Structures, 3rd Edition"); }

// 17 WBS tree
{ const s = lightSlide(pres, S5, "หน้าตาของ WBS: ระบบจองห้องประชุม", "ตัวอย่างนี้แตกจากราก 1.0 เป็น 5 กิ่ง สังเกตว่า 1.1 การจัดการโครงการก็เป็นกิ่งหนึ่งด้วย เพราะการประชุมและเขียนรายงานใช้เวลาจริง โครงการที่ลืมกิ่งนี้จะประมาณเวลาต่ำกว่าความจริงราว 10-20% แต่ละกิ่งแตกต่อเป็นของที่ตรวจรับได้ เช่น user story ที่ผ่าน review และโมดูล Booking งานที่ไม่อยู่ใน WBS จะโผล่มาในสัปดาห์สุดท้ายเสมอ");
  box(s, pres, 3.5, 1.2, 3.0, 0.5, K.ink); T(s, "1.0 ระบบจองห้องประชุม", { x: 3.5, y: 1.2, w: 3.0, h: 0.5, fontSize: 14, bold: true, color: K.white, align: "center", valign: "middle" });
  const ch = ["1.1 การจัดการโครงการ", "1.2 ความต้องการและการออกแบบ", "1.3 การพัฒนา", "1.4 การทดสอบ", "1.5 การนำขึ้นใช้งาน"];
  ln(s, 5.0, 1.7, 5.0, 1.95, K.mute, 1.5, false); ln(s, 1.35, 1.95, 8.65, 1.95, K.mute, 1.5, false);
  ch.forEach((t, i) => { const x = 0.5 + i * 1.825; ln(s, x + 0.85, 1.95, x + 0.85, 2.2, K.mute, 1.5, false); box(s, pres, x, 2.2, 1.7, 0.75, i === 0 ? K.amberT : K.tealT); T(s, t, { x: x + 0.06, y: 2.2, w: 1.58, h: 0.75, fontSize: 12, bold: true, align: "center", valign: "middle" }); });
  box(s, pres, 0.5, 3.1, 1.7, 1.9, K.amberT); T(s, "ลืมกิ่งนี้ ประมาณเวลาต่ำกว่าจริงราว 10-20%", { x: 0.6, y: 3.1, w: 1.5, h: 1.9, fontSize: 12, bold: true, valign: "middle", align: "center" });
  ["1.2.1 User story + AC ที่ผ่าน review", "1.2.2 openapi.yaml ที่ validate ผ่าน", "1.2.3 C4 diagram Level 1 และ 2"].forEach((t, j) => { const y = 3.1 + j * 0.68; box(s, pres, 2.325, y, 1.7, 0.6, K.paper); T(s, t, { x: 2.38, y, w: 1.6, h: 0.6, fontSize: 11, valign: "middle", align: "center" }); });
  ["1.3.1 โมดูล Auth", "1.3.2 โมดูล Booking", "1.3.3 หน้าจอผู้ใช้"].forEach((t, j) => { const y = 3.1 + j * 0.68; box(s, pres, 4.15, y, 1.7, 0.6, K.paper); T(s, t, { x: 4.2, y, w: 1.6, h: 0.6, fontSize: 11, valign: "middle", align: "center" }); });
  box(s, pres, 6.2, 3.1, 3.3, 1.9, K.ink); T(s, "งานที่ไม่อยู่ใน WBS จะโผล่มาในสัปดาห์สุดท้ายเสมอ", { x: 6.4, y: 3.1, w: 2.9, h: 1.9, fontSize: 15, bold: true, color: K.white, valign: "middle" }); }

// 18 WBS dictionary
{ const s = lightSlide(pres, S5, "WBS Dictionary: ที่ที่ความคลุมเครือไปตาย", "WBS เป็นแค่ชื่อกล่อง สิ่งที่ทำให้ใช้งานได้จริงคือ WBS Dictionary ซึ่งอธิบายแต่ละ work package ช่องที่มีค่าที่สุดและถูกละเลยบ่อยที่สุดคือไม่รวมอะไร เพราะข้อพิพาทเรื่องขอบเขตเกือบทั้งหมดเกิดจากสองฝ่ายเข้าใจขอบนอกของงานไม่ตรงกัน");
  const f = [["รหัส", "1.3.2.3"], ["ชื่อ", "กฎกันจองซ้อน + unit test"], ["สิ่งที่ส่งมอบ", "ฟังก์ชันตรวจช่วงเวลาทับซ้อน + unit test ครอบคลุมกรณีขอบ"], ["เกณฑ์ยอมรับ", "test ผ่านทุกกรณีในตาราง boundary + CI เขียว + มีคนอื่น review แล้ว"], ["ไม่รวมอะไร", "ไม่รวมหน้าจอแจ้งเตือน ไม่รวมการแจ้งอีเมล"], ["ผู้รับผิดชอบ (R)", "[ชื่อ]"], ["ผู้อนุมัติ (A)", "[ชื่อ] เชื่อมกับ RACI"], ["ประมาณเวลา", "6 ชั่วโมง (O=4, M=6, P=12 → PERT ≈ 6.7)"], ["ขึ้นกับงานไหน", "1.2.2 openapi.yaml ต้องเสร็จก่อน"]];
  f.forEach((v, i) => { const x = 0.5 + (i % 3) * 3.05, y = 1.25 + Math.floor(i / 3) * 1.15; box(s, pres, x, y, 2.9, 1.05, i === 4 ? K.amberT : K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 11, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 13 } }], { x: x + 0.15, y: y + 0.06, w: 2.6, h: 0.95 }); });
  T(s, "ช่อง “ไม่รวมอะไร” มีค่าที่สุด: ข้อพิพาทส่วนใหญ่เกิดจากขอบนอกของงานที่เข้าใจไม่ตรงกัน", { x: 0.5, y: 4.75, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal }); }

// 19 critical path
{ const s = lightSlide(pres, S5, "จาก WBS ไปสู่ตารางเวลา: critical path", "WBS บอกว่ามีอะไรบ้างแต่ไม่บอกลำดับ จึงต้องใส่การพึ่งพา เส้นทางที่ยาวที่สุดคือ critical path ในตัวอย่างคือ 1.2.2 ไป 1.3.3 ไป 1.4.2 ไป 1.5.1 รวม 6.5 วัน งานบนเส้นนี้ช้า 1 วัน ทั้งโครงการช้า 1 วัน ส่วนงานนอกเส้นมี float เวลามีปัญหาให้ช่วยคนที่อยู่บน critical path ก่อน");
  const N = (x, y, t, sub, crit) => { box(s, pres, x, y, 1.8, 0.85, crit ? K.amberT : K.paper, { line: crit ? K.amber : undefined }); T(s, [{ text: t, options: { bold: true, fontSize: 12, breakLine: true } }, { text: sub, options: { fontSize: 12, color: K.ink2 } }], { x: x + 0.06, y, w: 1.68, h: 0.85, align: "center", valign: "middle" }); };
  N(0.5, 2.3, "1.2.2 openapi.yaml", "1 วัน", true); N(2.9, 1.35, "1.3.2.1 API สร้างการจอง", "2 วัน", false); N(2.9, 3.2, "1.3.3 หน้าจอผู้ใช้", "3 วัน", true); N(5.3, 2.3, "1.4.2 E2E test", "2 วัน", true); N(7.7, 2.3, "1.5.1 deploy staging", "0.5 วัน", true);
  ln(s, 2.3, 2.725, 2.9, 1.775); ln(s, 2.3, 2.725, 2.9, 3.625, K.amber, 2.5); ln(s, 4.7, 1.775, 5.3, 2.725); ln(s, 4.7, 3.625, 5.3, 2.725, K.amber, 2.5); ln(s, 7.1, 2.725, 7.7, 2.725, K.amber, 2.5);
  box(s, pres, 0.5, 4.25, 9, 0.7, K.ink);
  T(s, [{ text: "Critical path (สีส้ม): 1.2.2 → 1.3.3 → 1.4.2 → 1.5.1 = 6.5 วัน", options: { bold: true, color: K.amber, breakLine: true } }, { text: "ช้า 1 วันบนเส้นนี้ ทั้งโครงการช้า 1 วัน งานนอกเส้นมี float", options: { color: K.white } }], { x: 0.75, y: 4.25, w: 8.5, h: 0.7, fontSize: 13, valign: "middle" }); }

// 20 agile WBS
{ const s = lightSlide(pres, S5, "WBS ในโลก Agile: แตกเป็นชิ้นบาง", "Agile ไม่ได้ไม่ใช้ WBS แค่เปลี่ยนชื่อและจังหวะ ความต่างจริงมี 2 ข้อ คือความละเอียดไม่เท่ากันทั้งแผน (progressive elaboration) และหน่วยล่างสุดต้องส่งมอบคุณค่าได้ การแตกตามชั้นเทคนิคทำให้จบสองงานแรกแล้วยังไม่มีอะไรให้ผู้ใช้ลอง ส่วน vertical slice ได้ของที่ deploy ได้ตั้งแต่สัปดาห์แรก");
  T(s, "ศัพท์แบบดั้งเดิม", { x: 0.5, y: 1.2, w: 4, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  flow(s, pres, [{ t: "Project" }, { t: "Deliverable" }, { t: "Work Package" }, { t: "Activity" }], 0.5, 1.45, 9, 0.55, { gap: 0.3, fs: 13 });
  T(s, "ศัพท์แบบ agile / AI-DLC", { x: 0.5, y: 2.1, w: 4, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  flow(s, pres, [{ t: "Intent", fill: K.tealT }, { t: "Unit / Epic", fill: K.tealT }, { t: "Story", fill: K.tealT }, { t: "Bolt / Task", fill: K.tealT }], 0.5, 2.35, 9, 0.55, { gap: 0.3, fs: 13 });
  box(s, pres, 0.5, 3.2, 4.4, 1.75, K.redT); T(s, "แตกตามชั้นเทคนิค", { x: 0.7, y: 3.28, w: 4.0, h: 0.3, fontSize: 13, bold: true, color: K.red });
  T(s, "ทำ database → ทำ API → ทำ UI\nจบสองงานแรกแล้วยังไม่มีอะไรให้ผู้ใช้ลอง และยังไม่รู้ว่าออกแบบถูกไหม", { x: 0.7, y: 3.65, w: 4.0, h: 1.25, fontSize: 13 });
  box(s, pres, 5.1, 3.2, 4.4, 1.75, K.greenT); T(s, "แตกเป็นชิ้นบาง (vertical slice)", { x: 5.3, y: 3.28, w: 4.0, h: 0.3, fontSize: 13, bold: true, color: K.green });
  T(s, "“จองห้องได้ 1 ห้องในวันเดียว โดยยังไม่มีการยกเลิก”\nได้ของที่ deploy ได้จริงตั้งแต่สัปดาห์แรก และได้ feedback ทันที", { x: 5.3, y: 3.65, w: 4.0, h: 1.25, fontSize: 13 });
  ref(s, "Jeff Patton, User Story Mapping; AWS, AI-Driven Development Life Cycle (AI-DLC)"); }

// 21 AI ช่วย WBS
{ const s = lightSlide(pres, S5, "ให้ AI ช่วยทำ WBS: AI เสนอ คนตัดสิน", "AI ช่วยระดมรายการงานได้ดี เพราะจำงานที่คนมักลืมได้ครบ แต่เสนอทุกอย่างเหมือนสำคัญเท่ากัน คนต้องตัด ต้องจัดลำดับ ประมาณเวลา และกำหนดเจ้าของ ใน prompt อย่าให้ AI ใส่ตัวเลขเวลา เพราะตัวเลขนั้นมาจากค่าเฉลี่ยของข้อความบนอินเทอร์เน็ต ไม่ใช่ velocity ของทีม");
  rowsTable(s, pres, [["เสนอรายการงานที่เป็นไปได้", "AI"], ["ตัดสิ่งที่ไม่จำเป็นออก", "คน: รู้เกณฑ์หรือคุณค่าทางธุรกิจ"], ["ตัดสินลำดับความสำคัญ", "คน"], ["ประมาณเวลา", "คน: อ้างอิงเวลาจริงของทีมเอง"], ["กำหนดเจ้าของงาน", "คน"], ["ตรวจกฎ 100%", "คน และใช้ AI ช่วยหาช่องว่างอีกรอบ"]], 0.5, 1.2, [4.2, 4.8], 0.4, { head: ["ขั้น", "ใครทำ"], fs: 13, fills: [K.greenT, K.amberT, K.amberT, K.amberT, K.amberT, K.amberT] });
  box(s, pres, 0.5, 4.4, 9, 0.6, K.ink); T(s, "ใน prompt อย่าให้ AI ใส่ตัวเลขเวลา: ตัวเลขนั้นมาจากค่าเฉลี่ยของข้อความบนอินเทอร์เน็ต ไม่ใช่ velocity ของทีม", { x: 0.7, y: 4.4, w: 8.6, h: 0.6, fontSize: 13, bold: true, color: K.white, valign: "middle" }); }

// 22 Cone
{ const s = lightSlide(pres, S6, "Cone of Uncertainty: ประมาณตอนไหนก็แม่นต่างกัน", "ความแม่นของการประมาณขึ้นกับว่าประมาณตอนไหน ตอนเสนอโครงการคลาดเคลื่อนได้ 4 เท่าทั้งสองทาง หลังกำหนด requirement ประมาณ 1.5 เท่า หลังออกแบบเสร็จประมาณ 1.25 เท่า บทเรียนคือถ้าถูกขอตัวเลขตอนต้นโครงการ ให้ตอบเป็นช่วง เช่น 3-7 สัปดาห์ ซื่อสัตย์กว่า 5 สัปดาห์");
  const d = [["ตอนเสนอโครงการ", "คลาดเคลื่อนได้ 4 เท่า ทั้งสองทาง", 2.5, K.redT], ["หลังกำหนด requirement", "คลาดเคลื่อน ~1.5 เท่า", 1.9, K.amberT], ["หลังออกแบบเสร็จ", "คลาดเคลื่อน ~1.25 เท่า", 1.5, K.tealT], ["ระหว่างทำ", "เข้าใกล้ของจริง", 1.1, K.greenT]];
  d.forEach((v, i) => { const x = 0.5 + i * 2.33, y = 1.25 + (2.5 - v[2]) / 2; box(s, pres, x, y, 2.0, v[2], v[3]);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.08, y, w: 1.84, h: v[2], align: "center", valign: "middle" }); if (i < 3) arrow(s, pres, x + 2.03, x + 2.3, 2.5); });
  box(s, pres, 0.5, 4.0, 9, 0.95, K.ink);
  T(s, [{ text: "ถ้าถูกขอตัวเลขตอนต้นโครงการ ให้ตอบเป็นช่วง", options: { bold: true, color: K.amber, breakLine: true } }, { text: "“ประมาณ 3-7 สัปดาห์” ซื่อสัตย์กว่า “5 สัปดาห์” และป้องกันตัวเองได้ดีกว่ามาก", options: { color: K.white } }], { x: 0.75, y: 4.0, w: 8.5, h: 0.95, fontSize: 14, valign: "middle" });
  ref(s, "Steve McConnell, Software Estimation: Demystifying the Black Art"); }

// 23 PERT
{ const s = lightSlide(pres, S6, "PERT และ planning fallacy", "สูตร PERT คือ E เท่ากับ O บวก 4M บวก P หารด้วย 6 โดย O คือกรณีราบรื่น M คือกรณีปกติ P คือกรณีเจอปัญหาที่คาดไว้ ค่าที่ได้เอนไปทาง M แต่ถ่วงด้วย P ช่วยแก้อคติที่คนประมาณจากภาพราบรื่น อคตินี้เรียกว่า planning fallacy คือประมาณงานของตัวเองต่ำเกินจริงอย่างเป็นระบบ แม้เคยพลาดมาแล้วหลายครั้ง");
  box(s, pres, 0.5, 1.3, 4.4, 1.5, K.ink); T(s, "E = (O + 4M + P) / 6", { x: 0.5, y: 1.3, w: 4.4, h: 1.5, fontSize: 28, bold: true, color: K.white, align: "center", valign: "middle" });
  [["O", "optimistic", "ทุกอย่างราบรื่น", K.green], ["M", "most likely", "ปกติ", K.teal], ["P", "pessimistic", "เจอปัญหาที่คาดไว้", K.red]].forEach((v, i) => { const x = 0.5 + i * 1.5; box(s, pres, x, 3.0, 1.4, 1.95, K.paper); chip(s, pres, x + 0.45, 3.12, v[0], v[3], K.white, 0.5);
    T(s, v[1], { x: x + 0.05, y: 3.75, w: 1.3, h: 0.3, fontSize: 11, bold: true, align: "center" }); T(s, v[2], { x: x + 0.1, y: 4.1, w: 1.2, h: 0.8, fontSize: 12, align: "center" }); });
  box(s, pres, 5.1, 1.3, 4.4, 3.65, K.amberT);
  T(s, "planning fallacy", { x: 5.3, y: 1.42, w: 4.0, h: 0.35, fontSize: 15, bold: true, color: "B5651D" });
  T(s, "คนประมาณงานของตัวเองต่ำเกินจริงอย่างเป็นระบบ แม้จะเคยพลาดแบบเดียวกันมาแล้วหลายครั้ง", { x: 5.3, y: 1.9, w: 4.0, h: 1.2, fontSize: 14, bold: true });
  T(s, "ค่า E เอนไปทาง M แต่ถูกถ่วงด้วย P ช่วยแก้อคติที่ประมาณจากภาพที่ทุกอย่างราบรื่น", { x: 5.3, y: 3.15, w: 4.0, h: 1.0, fontSize: 13 });
  T(s, "ตัวอย่าง: O=4, M=6, P=12 → E ≈ 6.7 ชั่วโมง", { x: 5.3, y: 4.3, w: 4.0, h: 0.5, fontSize: 13, bold: true, color: K.teal });
  ref(s, "Daniel Kahneman, Thinking, Fast and Slow"); }

// 24 Reference class
{ const s = lightSlide(pres, S6, "Reference Class Forecasting: มองจากข้างนอก", "วิธีแก้ planning fallacy ที่ Flyvbjerg เสนอคือเลิกประมาณจากภายใน แล้วดูสถิติจากภายนอก ตัวอย่างตัวเลขเป็นตัวเลขสมมติ ในระดับนักศึกษาทำได้ทันทีโดยจดเวลาจริงของทุก task ในสัปดาห์แรก แล้วใช้เป็นฐานเทียบ ทำเป็น loop ประมาณ ทำ วัด ปรับตัวคูณ ทีมที่โตแล้วถามว่าตัวคูณของทีมเราคือเท่าไร");
  box(s, pres, 0.5, 1.3, 4.4, 2.0, K.redT); T(s, "มุมมองจากข้างใน", { x: 0.7, y: 1.4, w: 4.0, h: 0.3, fontSize: 13, bold: true, color: K.red });
  T(s, "“งานนี้มี 5 หน้าจอ หน้าจอละ 2 วัน = 10 วัน”", { x: 0.7, y: 1.8, w: 4.0, h: 1.4, fontSize: 15 });
  box(s, pres, 5.1, 1.3, 4.4, 2.0, K.greenT); T(s, "มุมมองจากข้างนอก (ตัวเลขสมมติ)", { x: 5.3, y: 1.4, w: 4.0, h: 0.3, fontSize: 13, bold: true, color: K.green });
  T(s, "“3 feature ที่แล้วของทีมเรา ประมาณไว้ 10 วัน ใช้จริง 16, 14, 22 วัน ดังนั้นงานนี้น่าจะ 16-22 วัน”", { x: 5.3, y: 1.8, w: 4.0, h: 1.4, fontSize: 14 });
  T(s, "loop ของการประมาณ", { x: 0.5, y: 3.45, w: 5, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  flow(s, pres, [{ t: "ประมาณ" }, { t: "ลงมือทำ" }, { t: "วัดเวลาจริง" }, { t: "ตัวคูณ", sub: "จริง / ประมาณ", fill: K.tealT }], 0.5, 3.72, 9, 0.8, { gap: 0.3, fs: 14, sfs: 12 });
  T(s, "ทีมที่โตแล้วถามว่า “ตัวคูณของทีมเราคือเท่าไร” ไม่ใช่ “ประมาณแม่นไหม”", { x: 0.5, y: 4.65, w: 9, h: 0.35, fontSize: 13, bold: true, color: K.teal });
  ref(s, "Bent Flyvbjerg และ Dan Gardner, How Big Things Get Done (2023)"); }

// 25 before/after AI
{ const s = lightSlide(pres, S7, "AI เปลี่ยนต้นทุนของแต่ละขั้นใน loop", "AI ไม่ได้ทำให้การบริหารโครงการง่ายขึ้นโดยอัตโนมัติ สิ่งที่เปลี่ยนคือต้นทุนของแต่ละขั้น เมื่อขั้น Act ถูกลงมาก ขั้นที่กลายเป็นคอขวดคือ Verify และการตัดสินใจ นี่คือเหตุผลที่วิชานี้ลงทุนกับ test, CI และ observability มากกว่าการสอนเขียน code เร็ว ๆ");
  T(s, "ก่อนมี AI agent", { x: 0.5, y: 1.2, w: 5, h: 0.3, fontSize: 14, bold: true, color: K.ink2 });
  flow(s, pres, [{ t: "Plan", sub: "ชั่วโมง" }, { t: "Act", sub: "วัน-สัปดาห์" }, { t: "Verify", sub: "ชั่วโมง" }], 0.5, 1.55, 9, 1.1, { gap: 0.4, fs: 15, sfs: 13 });
  T(s, "หลังมี AI agent", { x: 0.5, y: 2.85, w: 5, h: 0.3, fontSize: 14, bold: true, color: K.teal });
  flow(s, pres, [{ t: "Plan", sub: "ชั่วโมง" }, { t: "Act", sub: "นาที-ชั่วโมง", fill: K.greenT }, { t: "Verify", sub: "กลายเป็นคอขวด", fill: K.redT }], 0.5, 3.2, 9, 1.1, { gap: 0.4, fs: 15, sfs: 13 });
  T(s, "เมื่อ “ลงมือ” ถูกลง ขั้น “ตรวจ” และ “ตัดสินใจ” กลายเป็นคอขวด", { x: 0.5, y: 4.55, w: 9, h: 0.4, fontSize: 14, bold: true, color: K.teal }); }

// 26 AI ทำได้ดี
{ const s = lightSlide(pres, S7, "สิ่งที่ AI ทำได้ดีในงาน PM", "AI ทำได้ดีกับงานที่มีรูปแบบซ้ำและมีตัวอย่างเยอะ เช่น แตก epic เป็น task ร่างเอกสาร charter และ status report ตั้งคำถามความเสี่ยงที่ทีมมองข้าม สรุป meeting เป็น action item และแปลง requirement เป็น user story แต่ทุกอย่างยังมีส่วนที่คนต้องตรวจหรือยืนยันต่อ");
  rowsTable(s, pres, [["แตก epic เป็น task ย่อย", "งานมีรูปแบบซ้ำ ๆ และมีตัวอย่างเยอะ", "ตัดสินว่าอันไหนไม่ต้องทำ"], ["ร่างเอกสาร charter, status report", "โครงสร้างเอกสารเป็นมาตรฐาน", "ยืนยันว่าตัวเลขในเอกสารมาจากไหน"], ["ตั้งคำถามความเสี่ยงที่ทีมมองข้าม", "ไม่ผูกพันกับแผนที่ทีมภูมิใจ", "ประเมินว่าความเสี่ยงไหนจริงในบริบทนี้"], ["สรุป meeting เป็น action item", "เป็นงานถอดความที่ใช้เวลาคนมาก", "ยืนยันเจ้าของงานและกำหนดวัน"], ["แปลง requirement เป็น user story + AC", "มีรูปแบบชัด ทำซ้ำได้", "ตรวจว่า AC วัดผลได้จริงหรือไม่"]],
    0.5, 1.2, [3.0, 3.0, 3.0], 0.6, { head: ["งาน", "ทำไม AI ทำได้ดี", "สิ่งที่คนยังต้องทำ"], fs: 12, fills: [K.paper, K.paper, K.paper, K.paper, K.paper] }); }

// 27 ไม่ควรให้ AI ตัดสิน
{ const s = lightSlide(pres, S7, "สิ่งที่ไม่ควรให้ AI ตัดสิน", "มี 4 เรื่องที่ไม่ควรให้ AI ตัดสิน คือตัวเลขประมาณการที่ผูกสัญญา การจัดลำดับความสำคัญของ feature การประเมินคน และการตัดสินว่าพอแล้ว นอกจากนี้ให้ระวัง automation bias คือคนเชื่อตารางสวย ๆ ที่มีทศนิยมมากกว่าคำตอบเดียวกันที่เขียนด้วยลายมือ วิธีป้องกันคือบังคับให้ทุกตัวเลขมีที่มา");
  const d = [["ตัวเลขประมาณการที่ผูกสัญญา", "AI ไม่รู้ velocity จริงของทีมเรา"], ["การจัดลำดับความสำคัญของ feature", "ต้องรู้ว่าใครจ่ายเงิน ใครมีอำนาจ"], ["การประเมินคน", "เป็นเรื่องจริยธรรมและกฎหมาย"], ["การตัดสินใจว่า “พอแล้ว”", "เกณฑ์คุณภาพที่ยอมรับได้เป็นการตัดสินใจทางธุรกิจ"]];
  d.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.3; box(s, pres, x, y, 4.4, 1.15, K.redT); chip(s, pres, x + 0.15, y + 0.37, i + 1, K.red, K.white, 0.42);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: v[1], options: { fontSize: 12, color: K.ink2 } }], { x: x + 0.75, y, w: 3.55, h: 1.15, valign: "middle" }); });
  box(s, pres, 0.5, 3.95, 9, 1.0, K.amberT);
  T(s, [{ text: "ระวัง Automation bias", options: { bold: true, color: "B5651D", breakLine: true } }, { text: "ตารางสวยที่มีทศนิยมทำให้คนเชื่อมากขึ้น บังคับให้ทุกตัวเลขมีที่มา ตัวเลขที่ไม่มีที่มาถือว่ายังไม่มีตัวเลขนั้น", options: { bold: true } }], { x: 0.75, y: 3.95, w: 8.5, h: 1.0, fontSize: 14, valign: "middle" });
  ref(s, "OWASP, Top 10 for Large Language Model Applications (Excessive Agency)"); }

// 28 AI-DLC
{ const s = lightSlide(pres, S7, "AI-DLC: จาก Sprint สู่ Bolt", "เมื่อขั้น Act เร็วขึ้นระดับ 10 เท่า รอบ 2 สัปดาห์ก็เริ่มไม่สมเหตุสมผล แนวคิด AI-DLC จึงเสนอหน่วยงานที่เล็กลงมาก คือ Intent ไป Unit ไป Story ไป Bolt ซึ่งใช้เวลาระดับชั่วโมงถึงวัน สิ่งที่ไม่เปลี่ยนคือ bolt ต้องจบด้วยของที่ verify ได้จริง ถ้าย่อรอบโดยไม่มี verify ที่เชื่อถือได้ก็แค่พังเร็วขึ้น");
  flow(s, pres, [{ t: "Intent", sub: "ทำไมถึงต้องมีสิ่งนี้" }, { t: "Unit", sub: "ก้อน feature ที่แยกได้" }, { t: "Story", sub: "สิ่งที่ผู้ใช้ทำได้ 1 อย่าง" }, { t: "Bolt", sub: "ชั่วโมง-วัน ออกแบบ → ทำ → test ผ่าน", fill: K.amberT }, { t: "Bolt ถัดไป", fill: K.greenT }], 0.5, 1.3, 9, 1.6, { gap: 0.22, fs: 14, sfs: 12 });
  box(s, pres, 0.5, 3.1, 9, 0.5, K.redT); T(s, "ถ้า verify ไม่ผ่าน: bolt วนกลับไปที่ Story", { x: 0.7, y: 3.1, w: 8.6, h: 0.5, fontSize: 13, bold: true, valign: "middle", align: "center" });
  box(s, pres, 0.5, 3.85, 9, 1.1, K.ink); T(s, "bolt ยังต้องจบด้วยของที่ verify ได้จริง ย่อรอบโดยไม่มี verify ที่เชื่อถือได้ ไม่ได้ทำให้เร็วขึ้น แต่ทำให้พังเร็วขึ้น", { x: 0.75, y: 3.85, w: 8.5, h: 1.1, fontSize: 16, bold: true, color: K.white, valign: "middle" });
  ref(s, "AWS, AI-Driven Development Life Cycle (AI-DLC)"); }

// 29 วัดผล
{ const s = lightSlide(pres, S8, "Goodhart's Law: ตัวชี้วัดที่เล่นเกมได้", "ตัวชี้วัดที่แย่จะถูกเล่นเกมทันทีที่ใช้ประเมินคน เรียกว่า Goodhart's Law คือเมื่อตัวชี้วัดกลายเป็นเป้าหมายก็เลิกเป็นตัวชี้วัดที่ดี DORA metrics ทนต่อการเล่นเกมกว่าเพราะวัดที่ระบบส่งมอบ ไม่ใช่ตัวคน ข้อค้นพบสำคัญคือความเร็วกับความมั่นคงไม่ได้แลกกัน ทีมที่ปล่อยของบ่อยกว่ามักพังน้อยกว่าและฟื้นเร็วกว่า");
  rowsTable(s, pres, [["จำนวนบรรทัด code", "เขียนยาวขึ้นเพื่อให้ดูขยัน", "ไม่ควรใช้เลย"], ["Velocity", "ทีมจะพองแต้ม story point", "ใช้พยากรณ์ในทีมเท่านั้น ห้ามเทียบข้ามทีม"], ["% งานเสร็จ", "รายงาน 90% ค้างได้เป็นเดือน", "นับเฉพาะสิ่งที่ deploy ขึ้น staging แล้ว"], ["จำนวน bug ที่ปิด", "สร้าง bug ง่าย ๆ มาปิดเอง", "ดูแนวโน้ม bug ที่หลุดถึงผู้ใช้แทน"]],
    0.5, 1.15, [2.2, 3.0, 3.8], 0.5, { head: ["ตัวชี้วัด", "ปัญหาเมื่อใช้ผิด", "ใช้อย่างไรให้ถูก"], fs: 12, fills: [K.paper, K.paper, K.paper, K.paper] });
  T(s, "DORA metrics: วัดที่ระบบส่งมอบ ไม่ใช่ตัวคน", { x: 0.5, y: 3.95, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal });
  [["Deployment Frequency", K.tealT], ["Lead Time for Changes", K.tealT], ["Change Failure Rate", K.greenT], ["Failed Deployment Recovery Time", K.greenT]].forEach((v, i) => { const x = 0.5 + i * 2.3; box(s, pres, x, 4.3, 2.15, 0.7, v[1]); T(s, v[0], { x: x + 0.08, y: 4.3, w: 1.99, h: 0.7, fontSize: 11, bold: true, align: "center", valign: "middle" }); });
  ref(s, "DORA, Accelerate State of DevOps Report"); }

// 30 สรุป
{ const s = darkSlide(pres, S9, "สรุปประเด็นสำคัญ 5 ข้อของบท ให้ทวนทีละข้อและถามว่าข้อไหนยังไม่ชัด");
  T(s, "สรุป", { x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["โครงการ IT พลาดเพราะความคืบหน้ามองไม่เห็น และความเสี่ยงกระจุกที่ปลายทาง ให้ย้ายความเสี่ยงมาไว้ต้นทาง", "RACI: ทุกงานมี A เดียว และ PM วางตัวต่างกันตาม role", "เลือก predictive, adaptive หรือ hybrid ตามความนิ่งของความต้องการและต้นทุนการแก้ภายหลัง", "WBS แตกเป็นของที่ตรวจรับได้ ตามกฎ 100% แล้วหา critical path", "ประมาณเป็นช่วง ใช้ข้อมูลจริงของทีม ให้ AI เสนอ แต่คนตัดสินและตรวจที่มาของตัวเลข"];
  r.forEach((t, i) => { const y = 1.15 + i * 0.78; chip(s, pres, 0.7, y + 0.08, i + 1, K.amber, K.ink, 0.4); T(s, t, { x: 1.3, y, w: 8.2, h: 0.65, fontSize: 15, color: K.white, valign: "middle" }); }); }

// 31 Glossary
{ const s = lightSlide(pres, S10, "Glossary", "ใช้ทบทวนศัพท์สำคัญของบทนี้ ศัพท์อื่นเช่น RACI, WBS, Scope, Stakeholder อธิบายไว้แล้วในเนื้อหาแต่ละหัวข้อ");
  const g = [["Scope creep", "ขอบเขตที่บวมขึ้นทีละนิดโดยไม่มีใครอนุมัติเวลาหรือคนเพิ่ม"], ["Baseline", "แผนหรือตัวเลขที่ตกลงกันตอนต้น ใช้เทียบว่าเบี่ยงไปเท่าไร"], ["Deliverable", "ของที่ส่งมอบและตรวจรับได้จริง ไม่ใช่ “ความคืบหน้า”"], ["Work Package", "ชิ้นล่างสุดของ WBS ที่ประมาณเวลาได้ และให้คนเดียวรับผิดชอบได้"], ["Critical path", "ลำดับงานที่ถ้าช้า 1 วัน ทั้งโครงการก็ช้า 1 วัน"], ["Float / Slack", "เวลาที่งานหนึ่งยืดได้โดยไม่กระทบวันจบโครงการ"], ["Velocity", "ปริมาณงานที่ทีมทำเสร็จจริงต่อรอบ ใช้พยากรณ์ ไม่ใช้เร่งทีม"], ["Definition of Done", "เงื่อนไขที่ทำให้งานชิ้นหนึ่งนับว่า “เสร็จ” ตรงกันทั้งทีม"]];
  g.forEach((v, i) => { const x = 0.5 + (i % 4) * 2.3, y = 1.3 + Math.floor(i / 4) * 1.85; box(s, pres, x, y, 2.15, 1.7, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, color: K.teal, breakLine: true, paraSpaceAfter: 4 } }, { text: v[1], options: { fontSize: 13 } }], { x: x + 0.15, y: y + 0.12, w: 1.85, h: 1.5 }); }); }

// 32 Ref
{ const s = lightSlide(pres, S11, "Ref", "รายการอ้างอิงทั้งหมดของบทนี้ ให้เปิดตรวจกับแหล่งต้นฉบับก่อนเชื่อ เว็บไซต์ของ Princeton บางส่วนปิดกั้นการเข้าถึงแบบอัตโนมัติ ให้เปิดผ่าน browser ปกติ");
  const a = ["PMI. A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th Edition", "PMI. Project Management Principles", "Princeton University. PATCO: Project and Technology Consulting Office", "Princeton OIT. IT Governance และ Annual IT Planning Process", "Scrum Guide ฉบับทางการ", "Atlassian. DACI: a decision-making framework", "PMI. Practice Standard for Work Breakdown Structures, 3rd Edition", "Jeff Patton. User Story Mapping"];
  const b = ["McKinsey & Company ร่วมกับ University of Oxford. Delivering large-scale IT projects on time, on budget, and on value", "Bent Flyvbjerg และ Dan Gardner. How Big Things Get Done (2023)", "DORA. Accelerate State of DevOps Report", "Steve McConnell. Software Estimation: Demystifying the Black Art", "Daniel Kahneman. Thinking, Fast and Slow", "AWS. AI-Driven Development Life Cycle (AI-DLC)", "OWASP. Top 10 for Large Language Model Applications"];
  const bl = (arr) => arr.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < arr.length - 1, paraSpaceAfter: 8 } }));
  T(s, bl(a), { x: 0.5, y: 1.3, w: 4.4, h: 3.7, fontSize: 12 }); T(s, bl(b), { x: 5.1, y: 1.3, w: 4.4, h: 3.7, fontSize: 12 }); }

L.save(pres, "R01-it-project-management-ai.pptx").then(() => console.log("saved"));
