const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, ref, codeBox, rowsTable } = L;
const S0 = "เปิดบท", S1 = "สถาปัตยกรรมและ QA", S2 = "C4 Model", S3 = "รูปแบบสถาปัตยกรรม", S4 = "ข้อมูลและ Resilience", S5 = "Security และ ADR", S6 = "ยุค AI agent", S7 = "สรุป", S8 = "Glossary", S9 = "Ref";
const pres = L.newDeck("Reading 04 System Architecture Design", [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9]);
const bl = (a, sp = 6) => a.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: sp } }));
const vline = (s, x, y1, y2, color = K.mute) => s.addShape(pres.ShapeType.line, { x, y: y1, w: 0, h: y2 - y1, line: { color, width: 1.5, endArrowType: "triangle" } });
const larrow = (s, x1, x2, y, color = K.mute) => s.addShape(pres.ShapeType.line, { x: x2, y, w: x1 - x2, h: 0, flipH: true, line: { color, width: 1.5, endArrowType: "triangle" } });
const card = (s, x, y, w, h, fill, title, tc, body, fs = 12, tfs = 14) => { box(s, pres, x, y, w, h, fill); T(s, title, { x: x + 0.2, y: y + 0.12, w: w - 0.4, h: 0.35, fontSize: tfs, bold: true, color: tc }); T(s, body, { x: x + 0.2, y: y + 0.55, w: w - 0.4, h: h - 0.65, fontSize: fs }); };
const node = (s, x, y, w, h, fill, t, sub, fs = 12, color) => { box(s, pres, x, y, w, h, fill); const r = [{ text: t, options: { bold: true, fontSize: fs, color: color || K.ink, breakLine: !!sub } }]; if (sub) r.push({ text: sub, options: { fontSize: fs - 1, color: color || K.ink2 } }); T(s, r, { x: x + 0.06, y, w: w - 0.12, h, align: "center", valign: "middle" }); };

// 1 title
{ const s = darkSlide(pres, S0, "บทนี้พูดถึงการตัดสินใจเชิงสถาปัตยกรรมที่เปลี่ยนทีหลังแล้วแพง เริ่มจากการเลือกว่าระบบต้องเก่งเรื่องอะไร วาดด้วย C4 เลือกรูปแบบ ใส่ resilience และบันทึกด้วย ADR สถาปัตยกรรมกำหนดว่า loop ของเราจะสั้นได้แค่ไหน");
  s.addShape(pres.ShapeType.rect, { x: 0.7, y: 1.55, w: 0.9, h: 0.08, fill: { color: K.amber }, line: { color: K.amber, width: 0 } });
  T(s, "System Architecture Design", { x: 0.7, y: 1.85, w: 8.6, h: 1.0, fontSize: 40, bold: true, color: K.white });
  T(s, "Reading 04", { x: 0.7, y: 3.0, w: 8, h: 0.5, fontSize: 20, color: "B8C4D4" }); }

// 2 objectives
{ const s = lightSlide(pres, S0, "อ่านแล้วจะได้อะไร", "บทนี้มี 6 เป้าหมาย ทุกข้อตอบคำถามว่าทำไมถึงเลือกแบบนี้ ซึ่งเป็นคำถามหลักในการสัมภาษณ์ระดับ senior อ่านทีละข้อและบอกว่าจะเห็นแต่ละข้อในสไลด์ถัดไป");
  const it = [["แยกการตัดสินใจเชิงสถาปัตยกรรมออกจากรายละเอียดตอนเขียน code", "ถกเฉพาะเรื่องที่ย้อนกลับยาก"], ["เริ่มออกแบบจาก quality attribute ไม่ใช่จาก technology", "ตอบได้ว่าทำไมถึงเลือกแบบนี้"], ["วางระบบด้วย C4 ให้คนอ่านเข้าใจ", "diagram ที่อ่านไม่รู้เรื่องคือเวลาที่เสียเปล่า"], ["อธิบายว่าเมื่อไรควรและไม่ควรแยก service", "แยกเร็วเกินไปทำให้ทีมเล็กล้มเหลวบ่อยที่สุด"], ["ใส่ resilience pattern ที่จำเป็น", "เรียกบริการภายนอกโดยไม่มี timeout ระบบล่มได้ทั้งระบบ"], ["บันทึกการตัดสินใจเป็น ADR", "ทีมในอนาคตไม่ต้องรื้อเรื่องที่ตัดสินแล้ว"]];
  it.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.25 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.08, K.paper); chip(s, pres, x + 0.15, y + 0.33, i + 1);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11.5, color: K.ink2 } }], { x: x + 0.7, y, w: 3.6, h: 1.08, valign: "middle" }); }); }

// 3 hook
{ const s = darkSlide(pres, S0, "ถามผู้เรียนก่อน ให้ลองนึกถึงการตัดสินใจในโปรเจกต์ เช่น เลือกฐานข้อมูล หรือตั้งชื่อตัวแปร แล้วถามว่าอีก 3 เดือนถ้าอยากเปลี่ยนจะใช้เวลาเท่าไร คำตอบนี้คือเกณฑ์แยกว่าเรื่องไหนเป็นสถาปัตยกรรม");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "ถ้าอีก 3 เดือนอยากเปลี่ยนการตัดสินใจนี้\nต้องใช้เวลาเท่าไร", { x: 0.7, y: 1.5, w: 8.6, h: 1.8, fontSize: 32, bold: true, color: K.white });
  T(s, "สถาปัตยกรรมเป็นตัวกำหนดว่า loop ของเราจะสั้นได้แค่ไหน ระบบที่มีขอบเขตชัดทดสอบทีละส่วน ปล่อยของทีละส่วน และให้ AI agent ทำงานทีละส่วนได้", { x: 0.7, y: 3.7, w: 8.6, h: 1.0, fontSize: 16, color: "B8C4D4" }); }

// 4 definition
{ const s = lightSlide(pres, S1, "สถาปัตยกรรมคือสิ่งที่เปลี่ยนทีหลังแล้วแพง", "นิยามจาก Martin Fowler และ Ralph Johnson คือสิ่งที่คนในทีมเห็นว่าสำคัญ และโดยทั่วไปคือสิ่งที่เปลี่ยนทีหลังแล้วแพง ใช้คำถามเดียวแยกได้ทันที ถ้าเปลี่ยนได้ในไม่กี่ชั่วโมงก็ตัดสินใจเร็ว ๆ แล้วเดินหน้า ถ้าต้องใช้หลายสัปดาห์หรือรื้อข้อมูลต้องมี ADR ทีมมักใช้เวลาถกเรื่องที่ย้อนกลับง่ายมากเกินไป Jeff Bezos เรียกว่า two-way door กับ one-way door");
  box(s, pres, 0.5, 1.2, 9, 0.6, K.tealT); T(s, "นิยาม (Fowler และ Johnson): สิ่งที่คนในทีมเห็นว่าสำคัญ และโดยทั่วไปคือสิ่งที่เปลี่ยนทีหลังแล้วแพง", { x: 0.7, y: 1.2, w: 8.6, h: 0.6, fontSize: 13, bold: true, valign: "middle" });
  node(s, 2.5, 1.95, 5, 0.55, K.amberT, "ถ้าอีก 3 เดือนอยากเปลี่ยน ใช้เวลาเท่าไร", null, 14);
  vline(s, 3.5, 2.5, 2.85); vline(s, 6.5, 2.5, 2.85);
  card(s, 0.5, 2.9, 4.4, 1.3, K.greenT, "ไม่กี่ชั่วโมง: ไม่ใช่สถาปัตยกรรม", K.green, "ตัดสินใจเร็ว ๆ แล้วเดินหน้า เช่น ชื่อตัวแปร for หรือ map การจัดโฟลเดอร์", 12);
  card(s, 5.1, 2.9, 4.4, 1.3, K.redT, "หลายสัปดาห์ หรือต้องรื้อข้อมูล", K.red, "เป็นสถาปัตยกรรม ต้องมี ADR เช่น ฐานข้อมูล ขอบเขต service สัญญา API ที่มีคนใช้แล้ว", 12);
  box(s, pres, 0.5, 4.35, 9, 0.7, K.ink); T(s, [{ text: "two-way door ", options: { bold: true, color: K.amber } }, { text: "รีบเดินผ่านไป   ", options: { color: K.white } }, { text: "one-way door ", options: { bold: true, color: K.amber } }, { text: "ค่อยยืนคิดให้นาน (Jeff Bezos)", options: { color: K.white } }], { x: 0.75, y: 4.35, w: 8.5, h: 0.7, fontSize: 14, valign: "middle" });
  ref(s, "Martin Fowler. Software Architecture Guide; Amazon, จดหมายถึงผู้ถือหุ้นปี 2016 (แนวคิด two-way door)"); }

// 5 QA table
{ const s = lightSlide(pres, S1, "เริ่มจาก Quality Attribute ไม่ใช่ Technology", "คำถามแรกของการออกแบบไม่ใช่จะใช้อะไร แต่เป็นระบบนี้ต้องเก่งเรื่องอะไรเป็นพิเศษ ISO/IEC 25010 จัดคุณลักษณะคุณภาพไว้เป็นหมวด ตารางนี้คือหมวดที่ใช้บ่อย แต่ละข้อมีคำถามที่ต้องตอบเป็นตัวเลข และมีผลต่อการออกแบบต่างกัน");
  rowsTable(s, pres, [["Performance", "p95 ต่ำกว่ากี่ ms ที่กี่ผู้ใช้พร้อมกัน", "cache, index, งานแบบ async"], ["Scalability", "ต้องรองรับให้โตกี่เท่าใน 1 ปี", "stateless, queue, read replica"], ["Availability", "ยอมให้ล่มได้กี่นาทีต่อเดือน", "redundancy, health check"], ["Security", "ข้อมูลอะไรที่รั่วไม่ได้เด็ดขาด", "trust boundary, เข้ารหัส, สิทธิ์ขั้นต่ำ"], ["Maintainability", "คนใหม่ใช้กี่วันกว่าจะแก้ bug แรกได้", "ขอบเขตชัด, coupling ต่ำ, มี test"], ["Testability", "ทดสอบตรรกะโดยไม่ยกทั้งระบบได้ไหม", "แยก I/O ออกจากตรรกะ, inject dependency"], ["Observability", "มีปัญหาแล้วรู้ว่าอยู่ตรงไหนใน กี่นาที", "structured log, correlation id, metrics"]], 0.5, 1.15, [1.75, 3.55, 3.7], 0.44, { head: ["Quality Attribute", "คำถามที่ต้องตอบเป็นตัวเลข", "ผลต่อการออกแบบ"], fs: 12 });
  ref(s, "ISO/IEC 25010. System and software quality models"); }

// 6 QA numbers + conflicts
{ const s = lightSlide(pres, S1, "QA ต้องมีตัวเลข และมักขัดกันเอง", "QA ที่ไม่มีตัวเลขยังไม่ใช่ requirement เป็นแค่ความปรารถนา ระบบต้องเร็วเอาไปออกแบบไม่ได้ แต่หน้ารายการห้องแสดงผลภายใน 500 ms ที่ p95 เมื่อมีผู้ใช้ 50 คน ใช้ได้ทันที นอกจากนี้ QA มักขัดกัน งานสถาปนิกคือเลือกว่าจะยอมแย่ตรงไหนแล้วเขียนเหตุผลลง ADR");
  card(s, 0.5, 1.2, 4.4, 1.45, K.redT, "ยังเป็นแค่ความปรารถนา", K.red, [{ text: "“ระบบต้องเร็ว”", options: { bold: true, fontSize: 15, breakLine: true } }, { text: "เอาไปออกแบบอะไรไม่ได้เลย", options: { fontSize: 12 } }], 12);
  card(s, 5.1, 1.2, 4.4, 1.45, K.greenT, "ใช้เป็น requirement ได้", K.green, [{ text: "หน้ารายการห้องแสดงผลภายใน 500 ms ที่ p95 เมื่อมีผู้ใช้พร้อมกัน 50 คน", options: { bold: true, fontSize: 12, breakLine: true } }, { text: "ตั้งเป็น threshold ของการทดสอบได้ตรง ๆ", options: { fontSize: 12 } }], 12);
  T(s, "QA มักขัดกันเอง", { x: 0.5, y: 2.8, w: 5, h: 0.3, fontSize: 14, bold: true, color: K.teal });
  [["Security vs Performance", "ตรวจสิทธิ์ทุกชั้น ยิ่งตรวจยิ่งช้า"], ["Consistency vs Availability", "ข้อมูลตรงกันทันที กับตอบได้แม้บางส่วนล่ม"], ["Flexibility vs Simplicity", "เผื่อทุกกรณี กับเข้าใจง่าย แก้เร็ว"]].forEach((v, i) => { const x = 0.5 + i * 3.05; node(s, x, 3.15, 2.9, 1.0, K.amberT, v[0], v[1], 13); });
  box(s, pres, 0.5, 4.3, 9, 0.65, K.ink); T(s, "งานของสถาปนิกคือเลือกว่าจะยอมแย่ตรงไหน แล้วเขียนเหตุผลของการยอมนั้นลงใน ADR", { x: 0.75, y: 4.3, w: 8.5, h: 0.65, fontSize: 14, bold: true, color: K.white, valign: "middle" });
  ref(s, "ISO/IEC 25010. System and software quality models"); }

// 7 C4 levels
{ const s = lightSlide(pres, S2, "C4 Model: วาดทีละระดับ ไม่ปนกัน", "diagram ส่วนใหญ่มีปัญหาเพราะปนหลายระดับความละเอียดไว้ในรูปเดียว C4 Model ของ Simon Brown แก้เรื่องนี้ด้วย 4 ระดับ ผู้บริหารดู Level 1 ทีมพัฒนาและคนดูแลระบบใช้ Level 2 เป็นหลัก Level 3 ใช้เฉพาะส่วนที่ซับซ้อน ส่วน Level 4 แทบไม่ต้องวาดเพราะ code อ่านเองได้และเก่าเร็วที่สุด");
  const lv = [["Level 1: System Context", "ระบบเราอยู่ตรงไหนในโลก ใครใช้ ต่อกับอะไรบ้าง", "ผู้บริหาร และ stakeholder", K.paper], ["Level 2: Container", "ระบบประกอบด้วยอะไรที่ deploy แยกได้บ้าง", "ทีมพัฒนาและคนดูแลระบบ ใช้เป็นหลัก", K.tealT], ["Level 3: Component", "ข้างใน container หนึ่ง มีส่วนอะไรบ้าง", "ใช้เฉพาะส่วนที่ซับซ้อนจริง", K.paper], ["Level 4: Code", "class diagram วาดเฉพาะเมื่อจำเป็นจริง", "แทบไม่ต้องวาด code อ่านเองได้ และเก่าเร็วที่สุด", K.paper]];
  lv.forEach((v, i) => { const y = 1.25 + i * 0.9; box(s, pres, 0.5, y, 9, 0.8, v[3]); chip(s, pres, 0.65, y + 0.19, i + 1);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: v[1], options: { fontSize: 12, color: K.ink2 } }], { x: 1.25, y, w: 4.6, h: 0.8, valign: "middle" });
    box(s, pres, 6.0, y + 0.1, 3.4, 0.6, K.white); T(s, v[2], { x: 6.12, y: y + 0.1, w: 3.16, h: 0.6, fontSize: 11.5, valign: "middle", align: "center" }); });
  ref(s, "Simon Brown. The C4 model for visualising software architecture"); }

// 8 C4 L1 + L2
{ const s = lightSlide(pres, S2, "ตัวอย่าง Level 1 และ Level 2", "ซ้ายคือ Level 1 ระบบจองห้องประชุมกับผู้ใช้สองกลุ่มและระบบภายนอกสองตัว ขวาคือ Level 2 แตกเป็น Web App, API Service, PostgreSQL, Queue และ Background Worker กติกาคือทุกกล่องบอกเทคโนโลยี ทุกเส้นบอกทิศทางและวิธีสื่อสาร กล่องเดียวกันต้องชื่อเดียวกันทุกที่รวมถึงชื่อโฟลเดอร์ และเก็บ diagram เป็น Mermaid ใน repo ไม่ใช่รูปในสไลด์");
  T(s, "Level 1: System Context", { x: 0.5, y: 1.2, w: 4.2, h: 0.3, fontSize: 13, bold: true, color: K.teal });
  node(s, 0.5, 1.6, 2.0, 0.75, K.paper, "นักศึกษา", "จอง ยกเลิก ดูประวัติ", 12); node(s, 2.7, 1.6, 2.0, 0.75, K.paper, "เจ้าหน้าที่", "อนุมัติ ดูรายงาน", 12);
  vline(s, 1.5, 2.35, 2.85); vline(s, 3.7, 2.35, 2.85);
  node(s, 0.5, 2.9, 4.2, 0.8, K.teal, "ระบบจองห้องประชุม", "ระบบที่เรากำลังสร้าง", 14, K.white);
  vline(s, 1.5, 3.7, 4.2); vline(s, 3.7, 3.7, 4.2);
  node(s, 0.5, 4.25, 2.0, 0.75, K.line, "บริการส่งอีเมล", "ระบบภายนอก", 12); node(s, 2.7, 4.25, 2.0, 0.75, K.line, "SSO มหาวิทยาลัย", "ระบบภายนอก", 12);
  T(s, "Level 2: Container", { x: 5.2, y: 1.2, w: 4.3, h: 0.3, fontSize: 13, bold: true, color: K.teal });
  node(s, 5.2, 1.6, 1.3, 0.9, K.tealT, "Web App", "Next.js", 12); arrow(s, pres, 6.52, 6.68, 2.05); node(s, 6.7, 1.6, 1.3, 0.9, K.tealT, "API Service", "Node.js", 12); arrow(s, pres, 8.02, 8.18, 2.05); node(s, 8.2, 1.6, 1.3, 0.9, K.tealT, "PostgreSQL", "SQL", 12);
  vline(s, 7.35, 2.5, 3.0); node(s, 6.7, 3.05, 1.3, 0.8, K.paper, "Queue", "push job", 12); arrow(s, pres, 8.02, 8.18, 3.45); node(s, 8.2, 3.05, 1.3, 0.8, K.paper, "Worker", "อีเมล รายงาน", 12);
  vline(s, 8.85, 3.85, 4.3); node(s, 8.2, 4.35, 1.3, 0.65, K.line, "อีเมลภายนอก", null, 11);
  T(s, "ทุกกล่องบอกเทคโนโลยี ทุกเส้นบอกทิศทางและวิธีสื่อสาร เช่น JSON over HTTPS, SQL", { x: 5.2, y: 3.05, w: 1.4, h: 1.9, fontSize: 11, color: K.ink2 });
  ref(s, "Simon Brown. The C4 model for visualising software architecture"); }

// 9 layer vs tier + 3-tier
{ const s = lightSlide(pres, S3, "Layer กับ Tier ไม่ใช่สิ่งเดียวกัน", "รูปแบบไม่ใช่ของที่ต้องเลือกอันเดียวใช้ทั้งระบบ ระบบจริงมักผสมกัน Layer คือการแบ่งเชิงตรรกะภายใน code ชุดเดียวกัน ส่วน Tier คือการแบ่งเชิงกายภาพที่แยกเครื่องหรือ process จริง ระบบหนึ่งมี 4 layer แต่เป็น 2 tier ได้ และเป็นเรื่องปกติ 3-Tier แบบคลาสสิกคือ Presentation, Application และ Data");
  rowsTable(s, pres, [["Layer", "การแบ่งเชิงตรรกะภายใน code ชุดเดียวกัน", "controller / service / repository"], ["Tier", "การแบ่งเชิงกายภาพ แยกเครื่องหรือ process จริง", "browser / app server / database"]], 0.5, 1.2, [1.2, 4.6, 3.2], 0.7, { head: ["", "หมายถึง", "ตัวอย่าง"], fs: 12, fills: [K.paper, K.tealT] });
  T(s, "3-Tier แบบคลาสสิก", { x: 0.5, y: 3.0, w: 5, h: 0.3, fontSize: 13, bold: true, color: K.teal });
  flow(s, pres, [{ t: "Tier 1: Presentation", sub: "Browser / Mobile App", fill: K.paper }, { t: "Tier 2: Application", sub: "business rule ตรวจสิทธิ์ ตรวจ input", fill: K.tealT }, { t: "Tier 3: Data", sub: "Database Server", fill: K.paper }], 0.5, 3.35, 9, 1.0, { gap: 0.5, fs: 13, sfs: 11 });
  T(s, "Tier 1 ถึง 2: HTTPS / JSON      Tier 2 ถึง 3: SQL over TCP", { x: 0.5, y: 4.45, w: 9, h: 0.3, fontSize: 12, color: K.ink2, align: "center" });
  T(s, "ระบบหนึ่งมี 4 layer แต่เป็น 2 tier ได้ และเป็นเรื่องปกติมาก", { x: 0.5, y: 4.75, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal, align: "center" }); }

// 10 3-tier tradeoffs + N-layer
{ const s = lightSlide(pres, S3, "3-Tier: ราคาที่จ่าย และการแบ่งชั้นใน backend", "3-Tier ยังเป็นค่าเริ่มต้นของระบบองค์กร เพราะขยายแต่ละ tier แยกกันได้ ขอบเขตความปลอดภัยชัด และแบ่งงานตามธรรมชาติ ข้อเสียคือทุกคำขอวิ่งผ่านทุกชั้น และตรรกะรั่วผิดชั้นได้ถ้าไม่มีวินัย กฎที่ห้ามละเมิดคือ Tier 1 ห้ามต่อ database ตรง ภายใน backend แบ่งเป็น Controller, Service, Repository เรียกลงเท่านั้น ถ้าเปิด controller แล้วนับ if เยอะ แปลว่า rule อยู่ผิดชั้น");
  card(s, 0.5, 1.2, 2.9, 1.95, K.greenT, "ได้อะไร", K.green, bl(["ขยายแต่ละ tier แยกกัน", "database ไม่ต้องเปิดสู่อินเทอร์เน็ต", "ทีมแบ่งงานตามธรรมชาติ"], 3), 12);
  card(s, 3.55, 1.2, 2.9, 1.95, K.redT, "เสียอะไร", K.red, bl(["ทุกคำขอวิ่งผ่านทุกชั้น latency เพิ่ม", "ตรรกะรั่วผิดชั้นถ้าไม่มีวินัย", "ชั้นที่แค่ส่งต่อ = sinkhole"], 3), 12);
  card(s, 6.6, 1.2, 2.9, 1.95, K.amberT, "กฎที่ห้ามละเมิด", "B5651D", [{ text: "Tier 1 ห้ามต่อ database ตรง ต้องผ่าน Tier 2 เสมอ การซ่อนปุ่มบนหน้าจอไม่ใช่การควบคุมสิทธิ์", options: { fontSize: 12 } }], 12);
  T(s, "N-layer ภายใน backend: เรียกลงเท่านั้น ห้ามเรียกขึ้น", { x: 0.5, y: 3.3, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal });
  flow(s, pres, [{ t: "Controller / Route", sub: "แปลง HTTP ห้ามมี rule", fill: K.paper }, { t: "Service / Use Case", sub: "business rule ทั้งหมด", fill: K.tealT }, { t: "Repository", sub: "domain กับตาราง", fill: K.paper }, { t: "Database", fill: K.paper }], 0.5, 3.65, 9, 0.85, { gap: 0.3, fs: 12, sfs: 11 });
  T(s, "ตรวจเร็ว: เปิด controller แล้วนับ if ถ้าเยอะ แปลว่า rule อยู่ผิดชั้น (anemic service)", { x: 0.5, y: 4.65, w: 9, h: 0.4, fontSize: 12.5, bold: true, color: "B5651D", align: "center", valign: "middle" }); }

// 11 MVC
{ const s = lightSlide(pres, S3, "MVC: ทิศทางเดียว Model ไม่รู้จัก View", "MVC แยกข้อมูล ออกจากการแสดงผล ออกจากการรับคำสั่ง หัวใจคือทิศทางเดียว Model ต้องไม่รู้จัก View ทำให้ทดสอบ Model ได้โดยไม่ต้องเปิดหน้าจอ บนเว็บ HTTP เป็นแบบขอแล้วตอบครั้งเดียว Controller จึงดึงข้อมูลไปส่งให้ View ส่วน Fat Controller คือกับดัก controller ควรบางและทำแค่ 3 อย่าง ตระกูลเดียวกันที่จะเจอคือ MVP, MVVM และ component-based แบบ unidirectional");
  flow(s, pres, [{ t: "ผู้ใช้", sub: "1. กดปุ่ม" }, { t: "Controller", sub: "2. ตีความ input สั่งงาน model", fill: K.tealT }, { t: "Model", sub: "3. ข้อมูล + business rule ไม่รู้จัก UI", fill: K.amberT }, { t: "View", sub: "4. แสดงผลจาก model" }], 0.5, 1.25, 9, 1.15, { gap: 0.3, fs: 13, sfs: 11 });
  card(s, 0.5, 2.6, 4.4, 1.6, K.paper, "MVC บนเว็บ", K.teal, "HTTP ขอแล้วตอบครั้งเดียว Model ไม่แจ้ง View เอง Controller เป็นคนดึงข้อมูลไปส่งให้ View (Model 2 ใน Rails, Laravel, Django, Spring MVC)", 12);
  card(s, 5.1, 2.6, 4.4, 1.6, K.redT, "กับดัก: Fat Controller", K.red, "Controller ทำแค่ 3 อย่าง แปลง input เรียก use case แปลง output ถ้ายาวเกิน 30 บรรทัดหรือมี if ซ้อนกัน แปลว่า rule อยู่ผิดที่", 12);
  box(s, pres, 0.5, 4.35, 9, 0.65, K.ink); T(s, "ตระกูลเดียวกัน: MVP · MVVM · component-based ที่ state ไหลทางเดียว (React, Svelte)", { x: 0.75, y: 4.35, w: 8.5, h: 0.65, fontSize: 13, bold: true, color: K.white, valign: "middle" }); }

// 12 Hexagonal
{ const s = lightSlide(pres, S3, "Hexagonal / Clean: พึ่งพาชี้เข้าแกนกลาง", "หลักเดียวที่ต้องจำคือทิศทางการพึ่งพาชี้เข้าหาแกนกลางเสมอ core ประกาศ port ว่าต้องการอะไร โลกภายนอกมาทำตามเป็น adapter Clean Architecture ของ Robert C. Martin เป็นแนวคิดเดียวกันที่เพิ่ม Dependency Rule ประโยชน์ที่วัดได้ในตารางเป็นตัวเลขสมมติ ราคาที่ต้องจ่ายคือไฟล์เยอะขึ้น สำหรับ CRUD ง่าย ๆ อาจไม่คุ้ม");
  const col = (x, w, title, items, fill) => { box(s, pres, x, 1.2, w, 2.0, fill); T(s, title, { x: x + 0.1, y: 1.25, w: w - 0.2, h: 0.35, fontSize: 12, bold: true, color: K.teal, align: "center" }); items.forEach((t, i) => node(s, x + 0.15, 1.65 + i * 0.37, w - 0.3, 0.33, K.white, t, null, 11)); };
  col(0.5, 2.5, "Driving: คนเรียกเรา", ["HTTP Controller", "CLI / Cron", "Test"], K.paper);
  col(3.55, 2.9, "Core: ไม่รู้จักโลกภายนอก", ["Use Cases", "Domain Model", "Ports (interface ที่ core ประกาศ)"], K.tealT);
  col(7.0, 2.5, "Driven: ของที่เราเรียก", ["PostgreSQL Adapter", "In-Memory Adapter", "Email Adapter", "Fake Email Adapter"], K.paper);
  arrow(s, pres, 3.02, 3.53, 2.2); arrow(s, pres, 6.47, 6.98, 2.2);
  rowsTable(s, pres, [["unit test ต้องยก PostgreSQL ใช้ 40 วินาที", "สลับเป็น in-memory adapter จบใน 200 ms"], ["เปลี่ยน REST เป็น GraphQL ต้องแก้ rule ด้วย", "เพิ่ม adapter ใหม่ 1 ตัว core ไม่ต้องแตะ"], ["ทดสอบกรณีอีเมลส่งไม่สำเร็จยากมาก", "ใช้ fake adapter ที่สั่งให้ล้มเหลวได้"]], 0.5, 3.3, [4.5, 4.5], 0.42, { head: ["ก่อน (ตัวเลขสมมติ)", "หลัง"], fs: 11, noBold: true });
  ref(s, "Alistair Cockburn. Hexagonal Architecture"); }

// 13 Modular monolith
{ const s = lightSlide(pres, S3, "Modular Monolith: จุดเริ่มสำหรับทีมเล็ก", "Modular monolith คือก้อนเดียวที่ข้างในแบ่งโมดูลชัด เงื่อนไข 4 ข้อทำให้เป็น modular จริงไม่ใช่แค่ชื่อโฟลเดอร์ คือเป็นเจ้าของตารางตัวเอง เรียกข้ามโมดูลผ่าน public API เท่านั้น มี fitness function ที่ทำให้ build แดงเมื่อ import ข้ามขอบเขต และแต่ละโมดูลมี test ที่รันแยกได้ เราได้ประโยชน์ของขอบเขตชัดโดยไม่จ่ายความซับซ้อนของระบบกระจาย และแยกเป็น service ทีหลังได้โดยไม่ต้องรื้อ");
  box(s, pres, 0.5, 1.2, 9, 1.65, K.paper, { line: K.line }); T(s, "1 process / 1 deployment", { x: 0.7, y: 1.25, w: 5, h: 0.3, fontSize: 12, bold: true, color: K.mute });
  const mods = [["โมดูล Report", "ภายใน: query อ่านอย่างเดียว"], ["โมดูล Booking", "ภายใน: service, repo, ตาราง bookings"], ["โมดูล User", "ภายใน: service, repo, ตาราง users"]];
  mods.forEach((m, i) => { const x = 0.75 + i * 2.95; node(s, x, 1.6, 2.4, 1.1, i === 1 ? K.tealT : K.white, m[0], "public API\n" + m[1], 12); if (i < 2) arrow(s, pres, x + 2.42, x + 2.93, 2.15); });
  T(s, "เรียกผ่าน public API เท่านั้น", { x: 0.75, y: 2.88, w: 5.8, h: 0.25, fontSize: 11, color: K.ink2, align: "center" });
  ["แต่ละโมดูลเป็นเจ้าของตารางของตัวเอง ห้าม query ข้าม", "เรียกข้ามโมดูลผ่าน interface สาธารณะเท่านั้น", "fitness function ทำให้ build แดงเมื่อ import ข้ามขอบเขต", "แต่ละโมดูลมี test ของตัวเองที่รันแยกได้"].forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 3.2 + Math.floor(i / 2) * 0.72; box(s, pres, x, y, 4.4, 0.64, K.paper); chip(s, pres, x + 0.12, y + 0.11, i + 1, K.teal, K.white, 0.42); T(s, t, { x: x + 0.65, y, w: 3.65, h: 0.64, fontSize: 12, valign: "middle" }); });
  box(s, pres, 0.5, 4.7, 9, 0.4, K.amberT); T(s, "ได้ขอบเขตชัดโดยไม่จ่ายความซับซ้อนของระบบกระจาย และแยกเป็น service ทีหลังได้", { x: 0.7, y: 4.7, w: 8.6, h: 0.4, fontSize: 12, bold: true, valign: "middle" });
  ref(s, "Martin Fowler. MonolithFirst"); }

// 14 microservices principles
{ const s = lightSlide(pres, S3, "Microservices: ต้องครบ 4 หลักถึงเป็นของจริง", "microservices คือหลายบริการที่ deploy แยกกันได้และมีข้อมูลของตัวเอง ตารางนี้บอกหลัก 4 ข้อ และสิ่งที่จะกลายเป็นถ้าละเมิด เช่น ถ้าไม่แยกฐานข้อมูลจะเป็น shared database ถ้า deploy ไม่อิสระจะเป็น distributed monolith ซึ่งได้ข้อเสียของทั้งสองแบบ");
  rowsTable(s, pres, [["Database per service", "แต่ละ service เป็นเจ้าของข้อมูลตัวเอง", "shared database แยกไม่จริง"], ["Deploy อิสระ", "ปล่อย service เดียวได้โดยไม่แตะตัวอื่น", "distributed monolith"], ["ล้มเหลวแยกส่วน", "service หนึ่งล่ม อีกตัวยังทำงานได้", "ล่มพร้อมกันทั้งระบบ"], ["ทีมเป็นเจ้าของตลอดวงจร", "ทีมเดียวดูแลตั้งแต่เขียนถึง on-call", "ส่งต่อกันแล้วไม่มีใครรับผิดชอบ"]], 0.5, 1.2, [2.6, 3.6, 2.8], 0.64, { head: ["หลัก", "ความหมาย", "ถ้าละเมิดจะกลายเป็น"], fs: 13, fills: [K.paper, K.paper, K.paper, K.paper] });
  box(s, pres, 0.5, 4.4, 9, 0.55, K.redT); T(s, "Distributed Monolith: แยก service แล้วแต่ยังต้อง deploy พร้อมกัน ได้ข้อเสียของทั้งสองแบบ", { x: 0.7, y: 4.4, w: 8.6, h: 0.55, fontSize: 12.5, bold: true, valign: "middle" });
  ref(s, "Martin Fowler. Microservice Trade-Offs; Sam Newman. Building Microservices, 2nd Edition"); }

// 15 problems -> patterns
{ const s = lightSlide(pres, S3, "ปัญหาที่โผล่ทันทีที่แยก service และวิธีแก้", "ทันทีที่แยก service จะเจอปัญหาใหม่ 6 แบบ และแต่ละแบบมี pattern ที่ใช้แก้ เช่น เรียกข้ามแล้วปลายทางล่มใช้ circuit breaker กับ timeout และ retry ไม่มี transaction ข้ามฐานใช้ saga ไล่ปัญหาไม่ได้ใช้ distributed tracing ทั้งหมดนี้คือต้นทุนที่ต้องจ่ายเมื่อแยก");
  T(s, "ปัญหา", { x: 0.7, y: 1.17, w: 3, h: 0.25, fontSize: 11, bold: true, color: K.mute }); T(s, "pattern ที่ใช้แก้", { x: 5.2, y: 1.17, w: 3, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  [["เรียกข้าม service แล้วปลายทางล่ม", "Circuit Breaker + Timeout + Retry"], ["ต้องแก้ข้อมูลหลาย service ให้สอดคล้อง แต่ไม่มี transaction ข้ามฐาน", "Saga: ทำทีละขั้น ถ้าล้มให้ทำขั้นชดเชยย้อนกลับ"], ["ไล่ปัญหาไม่ได้ว่าเกิดที่ service ไหน", "Distributed Tracing ส่ง correlation id ทุก hop"], ["client ต้องยิงหลาย service", "API Gateway หรือ BFF"], ["service หาที่อยู่ของกันและกันไม่เจอ", "Service Discovery / DNS ภายใน"], ["แก้ API แล้วคนอื่นพัง", "Consumer-driven contract test + versioning"]].forEach((v, i) => { const y = 1.45 + i * 0.59;
    node(s, 0.5, y, 4.2, 0.52, K.redT, v[0], null, 12); arrow(s, pres, 4.75, 5.15, y + 0.26); node(s, 5.2, y, 4.3, 0.52, K.greenT, v[1], null, 12); });
  ref(s, "Martin Fowler. Microservice Trade-Offs"); }

// 16 saga
{ const s = lightSlide(pres, S3, "Saga: ไม่มี rollback อัตโนมัติ ต้องเขียนขั้นชดเชยเอง", "Saga ใช้ทดแทน transaction ข้าม service ตัวอย่างคือจองห้องชั่วคราวแล้วตัดเงินล้มเหลว ต้องยกเลิกการจองชั่วคราวด้วยขั้นชดเชยที่เราเขียนเอง และระหว่างที่ saga ยังไม่จบระบบอยู่ในสถานะไม่สอดคล้องชั่วคราว ต้องให้ผู้ใช้เห็นสถานะ เช่น กำลังดำเนินการ ปิดท้ายด้วยข้อสรุปสำหรับโครงการในวิชา คือไม่แยก microservices");
  flow(s, pres, [{ t: "1. จองห้องชั่วคราว", sub: "Booking: ok", fill: K.greenT }, { t: "2. ตัดเงิน", sub: "Payment: ล้มเหลว (บัตรถูกปฏิเสธ)", fill: K.redT }, { t: "2c. ยกเลิกการจองชั่วคราว", sub: "compensating action", fill: K.amberT }, { t: "แจ้งผู้ใช้", sub: "ว่าไม่สำเร็จ" }], 0.5, 1.25, 9, 1.4, { gap: 0.3, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 2.85, 9, 0.85, K.paper); T(s, "ระหว่างที่ saga ยังไม่จบ ระบบอยู่ในสถานะไม่สอดคล้องชั่วคราว ต้องออกแบบให้ผู้ใช้เห็นสถานะนั้นอย่างเหมาะสม เช่น “กำลังดำเนินการ”", { x: 0.75, y: 2.85, w: 8.5, h: 0.85, fontSize: 13.5, valign: "middle" });
  box(s, pres, 0.5, 3.9, 9, 1.1, K.ink); T(s, "สำหรับโครงการในวิชานี้", { x: 0.8, y: 3.98, w: 8.4, h: 0.3, fontSize: 12, bold: true, color: K.amber });
  T(s, "อย่าแยก microservices ทีม 3-5 คน เวลา 8 สัปดาห์ ต้นทุนการดูแลจะกินเวลาที่ควรใช้สร้าง feature ให้ทำ modular monolith ที่มีขอบเขตชัดแทน", { x: 0.8, y: 4.3, w: 8.4, h: 0.65, fontSize: 14, bold: true, color: K.white }); }

// 17 event-driven
{ const s = lightSlide(pres, S3, "Event-Driven: เพิ่มผู้รับโดยไม่แตะผู้ส่ง", "ผู้ผลิตเหตุการณ์ publish เข้า event bus และผู้รับหลายรายมา subscribe ประโยชน์ที่แท้จริงคือเพิ่มผู้รับได้โดยไม่แก้ code ของผู้ส่ง เช่น เพิ่มระบบเก็บสถิติโดยไม่แตะ Booking Service มี 3 แบบคือ message queue, pub/sub และ event streaming ที่เก็บ log ไว้ย้อนอ่านได้");
  node(s, 0.5, 1.5, 2.3, 0.85, K.tealT, "Booking Service", "publish BookingCreated", 12); arrow(s, pres, 2.82, 3.28, 1.93);
  node(s, 3.3, 1.2, 2.3, 1.65, K.amberT, "Event Bus / Broker", "Kafka, RabbitMQ, SQS", 12);
  [["Notification: ส่งอีเมล", 1.2], ["Analytics: เก็บสถิติ", 1.8], ["Audit: บันทึกร่องรอย", 2.4]].forEach(v => { arrow(s, pres, 5.62, 6.18, v[1] + 0.225); node(s, 6.2, v[1], 3.3, 0.45, K.paper, v[0], null, 12); });
  rowsTable(s, pres, [["Message Queue", "ข้อความหนึ่งมีผู้รับหนึ่ง อ่านแล้วหายไป", "งานที่ทำครั้งเดียว เช่น ส่งอีเมล"], ["Pub/Sub", "ข้อความหนึ่งมีผู้รับหลายคน", "แจ้งเหตุการณ์ให้หลายระบบ"], ["Event Streaming", "เก็บ log เหตุการณ์ไว้ ย้อนอ่านใหม่ได้", "วิเคราะห์ย้อนหลัง สร้าง state ใหม่"]], 0.5, 3.15, [2.0, 3.8, 3.2], 0.5, { head: ["แบบ", "ลักษณะ", "เหมาะกับ"], fs: 12 }); }

// 18 event costs, CQRS, ES
{ const s = lightSlide(pres, S3, "ราคาของ Event-Driven, CQRS และ Event Sourcing", "Event-driven มีราคาที่ต้องเข้าใจก่อนใช้ ข้อความอาจมาซ้ำหรือผิดลำดับ ต้องมี dead-letter queue และไล่ปัญหายาก CQRS แยกทางอ่านออกจากทางเขียน ใช้เมื่ออ่านกับเขียนต่างกันมาก เช่น อ่าน 1000 ครั้งต่อเขียน 1 ครั้ง ราคาคือ eventual consistency Event sourcing เก็บเหตุการณ์แทนสถานะ ได้ประวัติฟรีแต่ซับซ้อนและย้อนกลับยาก ไม่แนะนำสำหรับโครงการในวิชา");
  card(s, 0.5, 1.2, 2.9, 3.75, K.redT, "ราคาที่ต้องจ่าย", K.red, bl(["ข้อความอาจมาซ้ำ ผู้รับต้อง idempotent เสมอ", "อาจมาผิดลำดับ อย่าพึ่งลำดับถ้าไม่จำเป็น", "ล้มซ้ำ ๆ ต้องมี dead-letter queue", "ไล่ปัญหายาก ไม่มี stack trace เดียว"], 10), 14);
  card(s, 3.55, 1.2, 2.9, 3.75, K.tealT, "CQRS", K.teal, bl(["แยกทางอ่านออกจากทางเขียน", "ใช้เมื่ออ่านกับเขียนต่างกันมาก เช่น อ่าน 1000 ครั้งต่อเขียน 1 ครั้ง", "ราคา: ฝั่งอ่านตามหลังเล็กน้อย (eventual consistency) ต้องอธิบายให้ผู้ใช้เข้าใจ"], 10), 14);
  card(s, 6.6, 1.2, 2.9, 3.75, K.paper, "Event Sourcing", K.ink, bl(["เก็บเหตุการณ์แทนสถานะปัจจุบัน", "ได้ประวัติทุกการเปลี่ยนแปลง มีค่ากับงานตรวจสอบย้อนหลัง", "ซับซ้อนสูง ย้อนกลับยาก ไม่แนะนำสำหรับโครงการในวิชานี้"], 10), 14); }

// 19 serverless
{ const s = lightSlide(pres, S3, "Serverless: ได้ความสะดวก แลกกับข้อจำกัด", "Serverless คือ function ที่รันเมื่อถูกเรียกและตายเมื่อเสร็จ ได้ไม่ต้องดูแล server จ่ายตามการใช้จริง และขยายอัตโนมัติ แต่เสียเรื่อง cold start เพดานเวลาต่อครั้ง vendor lock-in และการทดสอบในเครื่องที่ยากกว่า ข้อจำกัดสำคัญที่สุดคือ function ต้องไม่มี state");
  flow(s, pres, [{ t: "Event", sub: "HTTP / ไฟล์ / เวลา / คิว", fill: K.paper }, { t: "Function", sub: "รันเมื่อถูกเรียก ตายเมื่อเสร็จ", fill: K.tealT }, { t: "Managed DB / บริการอื่น", fill: K.paper }], 0.5, 1.2, 9, 0.85, { gap: 0.4, fs: 13, sfs: 11 });
  T(s, "ได้อะไร", { x: 0.5, y: 2.17, w: 4, h: 0.25, fontSize: 12, bold: true, color: K.green }); T(s, "เสียอะไร", { x: 5.1, y: 2.17, w: 4, h: 0.25, fontSize: 12, bold: true, color: K.red });
  const g = ["ไม่ต้องดูแล server เลย", "จ่ายตามการใช้จริง ไม่ใช้ก็ไม่มีค่าใช้จ่าย", "ขยายขนาดอัตโนมัติตามโหลด", "เหมาะกับงานเป็นช่วง เช่น รายงานรายเดือน"], b = ["Cold start: คำขอแรกหลังพักช้ากว่าปกติ", "มีเพดานเวลาต่อครั้ง ไม่เหมาะกับงานยาว", "ผูกกับผู้ให้บริการค่อนข้างแน่น (vendor lock-in)", "ทดสอบและไล่ปัญหาในเครื่องตัวเองยากกว่า"];
  g.forEach((t, i) => { const y = 2.45 + i * 0.57; node(s, 0.5, y, 4.4, 0.5, K.greenT, t, null, 12); node(s, 5.1, y, 4.4, 0.5, K.redT, b[i], null, 12); });
  T(s, "function ต้องไม่มี state · connection pool ของ database เป็นปัญหาเมื่อเปิดพร้อมกันหลายพันตัว", { x: 0.5, y: 4.78, w: 9, h: 0.3, fontSize: 12, bold: true, color: "B5651D", valign: "middle" }); }

// 20 BFF + micro-frontend
{ const s = lightSlide(pres, S3, "BFF และ Micro-frontend", "BFF แก้ปัญหาที่ client แต่ละชนิดต้องการข้อมูลไม่เหมือนกัน ถ้าใช้ API ตัวเดียวมันจะบวม BFF เป็นของทีม frontend ไม่ใช่ทีม backend ซึ่งเป็นประเด็นเชิงองค์กรที่สำคัญกว่าเรื่องเทคนิค ส่วน micro-frontend คือแนวคิดเดียวกับ microservices แต่ใช้กับหน้าจอ เหมาะกับองค์กรใหญ่ ไม่เหมาะกับทีมเล็ก");
  T(s, "BFF: Backend for Frontend", { x: 0.5, y: 1.2, w: 5.2, h: 0.3, fontSize: 13, bold: true, color: K.teal });
  node(s, 0.5, 1.6, 1.25, 0.9, K.paper, "Web App", null, 12); arrow(s, pres, 1.77, 2.03, 2.05); node(s, 2.05, 1.6, 2.0, 0.9, K.tealT, "BFF สำหรับ Web", "รวมข้อมูล ตัด field ที่ไม่ใช้", 12);
  node(s, 0.5, 2.8, 1.25, 0.9, K.paper, "Mobile App", null, 12); arrow(s, pres, 1.77, 2.03, 3.25); node(s, 2.05, 2.8, 2.0, 0.9, K.tealT, "BFF สำหรับ Mobile", "ส่งข้อมูลน้อยลง ประหยัดเน็ต", 12);
  arrow(s, pres, 4.07, 4.33, 2.05); arrow(s, pres, 4.07, 4.33, 3.25); node(s, 4.35, 1.6, 1.4, 2.1, K.paper, "Booking Service", "User Service", 12);
  card(s, 6.0, 1.2, 3.5, 2.5, K.paper, "Micro-frontend", K.teal, bl(["แนวคิดเดียวกับ microservices ใช้กับหน้าจอ แต่ละทีมเป็นเจ้าของส่วนของหน้าจอและ deploy เอง", "เหมาะ: องค์กรใหญ่ หลายทีมทำเว็บเดียวกัน", "ไม่เหมาะ: ทีมเล็ก ต้นทุนทำให้หน้าตาสอดคล้องสูงมาก"], 4), 11.5);
  box(s, pres, 0.5, 3.95, 9, 1.0, K.amberT); T(s, "BFF เป็นของทีม frontend ไม่ใช่ทีม backend ซึ่งเป็นประเด็นเชิงองค์กรที่สำคัญกว่าเรื่องเทคนิค", { x: 0.75, y: 3.95, w: 8.5, h: 1.0, fontSize: 15, bold: true, valign: "middle" }); }

// 21 LLM architecture
{ const s = lightSlide(pres, S3, "สถาปัตยกรรมของแอปที่มี LLM อยู่ข้างใน", "รูปแบบนี้กลายเป็นมาตรฐานโดยพฤตินัยในช่วงไม่กี่ปีที่ผ่านมา ขาเข้า ผู้ใช้ถามผ่าน application layer ที่ตรวจสิทธิ์และ input จากนั้น retriever ค้นข้อมูลจาก index แล้ว prompt builder ประกอบ context ส่งให้ LLM ขาออกผ่าน output guard ตรวจ schema และกรองข้อมูลอ่อนไหว ทุกขั้นเฝ้าดูด้วย observability");
  const cx = [0.5, 2.825, 5.15, 7.475], W = 2.025;
  [["ผู้ใช้", "ถามคำถาม", K.paper], ["Application Layer", "ตรวจสิทธิ์ ตรวจ input จำกัดอัตรา", K.tealT], ["Retriever", "ค้นข้อมูลที่เกี่ยวข้อง", K.paper], ["Prompt Builder", "ประกอบ context + คำถาม", K.paper]].forEach((v, i) => { node(s, cx[i], 1.25, W, 0.9, v[2], v[0], v[1], 12); if (i < 3) arrow(s, pres, cx[i] + W + 0.02, cx[i + 1] - 0.02, 1.7); });
  node(s, cx[2], 2.45, W, 0.55, K.amberT, "Vector / Search Index", null, 11.5); vline(s, cx[2] + W / 2, 2.15, 2.43);
  vline(s, cx[3] + W / 2, 2.15, 3.2);
  [["ผู้ใช้", "เห็นคำตอบ", K.paper], ["Application Layer", "ส่งคำตอบ", K.tealT], ["Output Guard", "ตรวจ schema กรองข้อมูลอ่อนไหว", K.greenT], ["LLM", "", K.amberT]].forEach((v, i) => { node(s, cx[i], 3.2, W, 0.9, v[2], v[0], v[1] || null, 12); if (i < 3) larrow(s, cx[i + 1] - 0.02, cx[i] + W + 0.02, 3.65); });
  box(s, pres, 0.5, 4.3, 9, 0.65, K.ink); T(s, "Observability: log, จำนวน token, ต้นทุน, เวลา เฝ้าดูทุกขั้น", { x: 0.75, y: 4.3, w: 8.5, h: 0.65, fontSize: 14, bold: true, color: K.white, valign: "middle" }); }

// 22 LLM principles
{ const s = lightSlide(pres, S3, "หลักออกแบบที่ต่างจากระบบทั่วไป", "แอปที่มี LLM ต้องคิดต่างจากระบบทั่วไป 5 เรื่อง ผลลัพธ์ไม่คงที่ต้องบังคับ schema ของ retriever ต้องป้องกัน prompt injection ต้องมี timeout fallback และตรึงเวอร์ชัน ต้นทุนไม่คงที่ต้องวัด token และ agent ต้องจำกัดสิทธิ์ ให้ปฏิบัติกับ LLM เหมือน third-party API ที่ช้าได้ ล่มได้ และตอบผิดได้");
  rowsTable(s, pres, [["ผลลัพธ์ไม่คงที่", "บังคับ output ให้ตรง schema แล้วตรวจด้วย validator เสมอ"], ["ทุกอย่างที่ retriever ดึงมาคือข้อมูล ไม่ใช่คำสั่ง", "ป้องกัน prompt injection อย่าให้ข้อความที่ดึงมาสั่งงานระบบได้"], ["model อาจล่ม ช้า หรือเปลี่ยนเวอร์ชัน", "ต้องมี timeout, fallback และตรึงเวอร์ชันของ model"], ["ต้นทุนต่อคำขอไม่คงที่", "วัด token ต่อคำขอ ตั้งเพดาน และเฝ้าดูเหมือน metric อื่น"], ["agent ที่ทำงานเองได้", "จำกัดสิทธิ์ให้น้อยที่สุด ให้คนอนุมัติก่อนทำสิ่งที่ย้อนกลับไม่ได้"]], 0.5, 1.2, [3.5, 5.5], 0.56, { fs: 12, fills: [K.paper, K.redT, K.paper, K.paper, K.paper] });
  box(s, pres, 0.5, 4.5, 9, 0.55, K.ink); T(s, "ปฏิบัติกับ LLM เหมือน third-party API ที่ช้าได้ ล่มได้ และตอบผิดได้", { x: 0.75, y: 4.5, w: 8.5, h: 0.55, fontSize: 14, bold: true, color: K.white, valign: "middle" }); }

// 23 choose table
{ const s = lightSlide(pres, S3, "เลือกรูปแบบไหนเมื่อไร", "ตารางนี้เทียบทุกรูปแบบที่เรียนมา ดูความซับซ้อน เหมาะกับอะไร และไม่เหมาะกับอะไร สังเกตว่า 3-Tier กับ Modular Monolith คือคำตอบของงานในวิชานี้ ส่วน CQRS กับ Event Sourcing ไม่เหมาะกับโครงการในวิชา");
  const cw = [2.3, 0.95, 3.05, 2.7], hd = ["รูปแบบ", "ซับซ้อน", "เหมาะกับ", "ไม่เหมาะกับ"]; let hx = 0.7; hd.forEach((h, j) => { T(s, h, { x: hx, y: 1.15, w: cw[j] - 0.1, h: 0.25, fontSize: 11, bold: true, color: K.mute }); hx += cw[j]; });
  const cf = { "ต่ำ": K.greenT, "กลาง": K.amberT, "สูง": K.redT, "สูงมาก": K.redT };
  [["3-Tier / Layered", "ต่ำ", "ระบบองค์กรทั่วไป งานในวิชานี้", "business rule ซับซ้อนมาก"], ["MVC", "ต่ำ", "เว็บที่ render ฝั่ง server", "state ฝั่ง client ซับซ้อน"], ["Hexagonal / Clean", "กลาง", "business rule มีน้ำหนัก", "CRUD ง่าย ๆ ไม่มี rule"], ["Modular Monolith", "กลาง", "ทีมเล็กที่อยากได้ขอบเขตชัด", "ต้องปล่อยของคนละจังหวะจริง"], ["Microservices", "สูง", "หลายทีม ขยายบางส่วนแยก", "ทีมต่ำกว่า 10 คน"], ["Event-Driven", "สูง", "งานที่ทำภายหลังได้ ผู้รับหลายราย", "งานที่ต้องตอบผลทันทีเสมอ"], ["CQRS / Event Sourcing", "สูงมาก", "ตรวจสอบย้อนหลัง อ่านหนักมาก", "โครงการในวิชานี้"], ["Serverless", "กลาง", "งานเป็นช่วง งานตามตารางเวลา", "งานที่ต้องตอบเร็วตลอดเวลา"]].forEach((r, i) => { const y = 1.42 + i * 0.46; box(s, pres, 0.5, y, 9, 0.42, i === 3 ? K.tealT : K.paper); let x = 0.7;
    r.forEach((c, j) => { if (j === 1) { box(s, pres, x - 0.05, y + 0.06, 0.8, 0.3, cf[c]); T(s, c, { x: x - 0.05, y: y + 0.06, w: 0.8, h: 0.3, fontSize: 11, align: "center", valign: "middle", bold: true }); } else T(s, c, { x, y, w: cw[j] - 0.15, h: 0.42, fontSize: 11.5, valign: "middle", bold: j === 0 }); x += cw[j]; }); }); }

// 24 decision flow
{ const s = lightSlide(pres, S3, "เส้นทางการตัดสินใจเลือกรูปแบบ", "เริ่มจากถามว่า business rule ซับซ้อนไหม ถ้าไม่มากใช้ 3-Tier กับ MVC ถ้าซับซ้อนเพิ่ม Hexagonal ที่ core จากนั้นถามว่ามีหลายทีมปล่อยของคนละจังหวะไหม ถ้าไม่มีคือ modular monolith ซึ่งเป็นคำตอบของโครงการนี้ สุดท้ายถ้ามีงานที่ผู้ใช้ไม่ต้องรอผลให้เพิ่ม queue เฉพาะงานนั้น คำถามที่ควรถามก่อนรับรูปแบบใดคือปัญหาอะไรที่เรามีอยู่จริงที่สิ่งนี้แก้ได้");
  const rows = [["business rule ซับซ้อนไหม", ["ไม่มาก", "3-Tier + MVC เรียบง่าย เข้าใจง่าย", K.paper], ["ซับซ้อน", "เพิ่ม Hexagonal ที่ core เพื่อให้ทดสอบได้เร็ว", K.paper]], ["มีหลายทีมที่ปล่อยของคนละจังหวะไหม", ["ไม่มี", "Modular Monolith คำตอบของโครงการในวิชานี้", K.tealT], ["มี", "พิจารณา Microservices แยกทีละส่วนที่ขอบเขตชัดที่สุด", K.paper]], ["มีงานที่ผู้ใช้ไม่ต้องรอผลไหม", ["มี", "เพิ่ม Queue / Event เฉพาะงานนั้น", K.paper], ["ไม่มี", "พอแล้ว อย่าเพิ่มความซับซ้อนที่ยังไม่ต้องใช้", K.paper]]];
  rows.forEach((r, i) => { const y = 1.2 + i * 0.95; node(s, 0.5, y, 3.0, 0.8, K.amberT, r[0], null, 13); [1, 2].forEach((k, j) => { const a = r[k], x = 3.8 + j * 2.95; arrow(s, pres, j === 0 ? 3.52 : 6.57, x - 0.02, y + 0.4); box(s, pres, x, y, 2.75, 0.8, a[2]); T(s, [{ text: a[0], options: { bold: true, fontSize: 11, color: K.teal, breakLine: true } }, { text: a[1], options: { fontSize: 12 } }], { x: x + 0.1, y, w: 2.55, h: 0.8, valign: "middle" }); }); if (i < 2) vline(s, 2.0, y + 0.8, y + 0.95); });
  box(s, pres, 0.5, 4.1, 9, 0.9, K.ink); T(s, "ก่อนรับรูปแบบใด ถามว่า “ปัญหาอะไรที่เรามีอยู่ตอนนี้จริง ๆ ที่สิ่งนี้แก้ให้ได้” ถ้าเป็นปัญหาในอนาคต แปลว่าจ่ายค่าความซับซ้อนล่วงหน้า ให้จดเงื่อนไขใน ADR แล้วเดินหน้าด้วยของที่เรียบง่ายกว่า", { x: 0.75, y: 4.1, w: 8.5, h: 0.9, fontSize: 13, bold: true, color: K.white, valign: "middle" }); }

// 25 data
{ const s = lightSlide(pres, S4, "ข้อมูลที่เก็บผิดรูปแบบ 6 เดือน ย้ายยากมาก", "code เขียนใหม่ได้ในหนึ่งสัปดาห์ แต่ข้อมูลที่เก็บผิดรูปแบบมา 6 เดือนย้ายยากมาก ตารางซ้ายคือการตัดสินใจเรื่องข้อมูลพร้อมคำถามที่ต้องถามตัวเองก่อน Idempotency เป็นเรื่องสถาปัตยกรรม เครือข่ายล้มเหลวและผู้ใช้กดซ้ำเป็นเรื่องปกติ ด้านขวาคือ client ส่ง Idempotency-Key มาด้วย ถ้ายิงซ้ำ API เจอ key เดิมและคืนผลเดิมไม่สร้างใหม่");
  rowsTable(s, pres, [["Relational หรือ Document", "join บ่อยไหม schema เปลี่ยนบ่อยแค่ไหน"], ["Normalize แค่ไหน", "อ่านบ่อยหรือเขียนบ่อยกว่ากัน"], ["ขอบเขต transaction", "อะไรต้องสำเร็จหรือล้มไปด้วยกัน"], ["เก็บประวัติหรือทับของเก่า", "จะมีวันที่ถามว่า “ตอนนั้นข้อมูลเป็นอย่างไร” ไหม"], ["ทำ soft delete ไหม", "มีข้อกำหนดกฎหมายเรื่องการลบจริงไหม (PDPA)"]], 0.5, 1.2, [2.1, 2.8], 0.55, { head: ["การตัดสินใจ", "ถามตัวเองก่อน"], fs: 12 });
  T(s, "Idempotency: ส่งคำขอซ้ำ ผลเท่าเดิม", { x: 5.6, y: 1.2, w: 3.9, h: 0.3, fontSize: 12.5, bold: true, color: K.teal });
  node(s, 5.6, 1.6, 3.9, 0.8, K.greenT, "ครั้งที่ 1: POST /bookings + key abc123", "201 Created (booking #42)", 12); vline(s, 7.55, 2.4, 2.75);
  node(s, 5.6, 2.8, 3.9, 0.7, K.redT, "เครือข่ายขาด", "client ไม่ได้รับคำตอบ", 12); vline(s, 7.55, 3.5, 3.85);
  node(s, 5.6, 3.9, 3.9, 0.8, K.greenT, "ยิงซ้ำด้วย key เดิม", "200 OK booking #42 เดิม ไม่สร้างใหม่", 12);
  T(s, "ระบบที่รับคำขอเดียวกันสองครั้งแล้วสร้างการจองสองรายการ คือระบบที่ออกแบบพลาด", { x: 0.5, y: 4.8, w: 9, h: 0.3, fontSize: 12, bold: true, color: "B5651D" }); }

// 26 resilience
{ const s = lightSlide(pres, S4, "Resilience: ให้พังแล้วไม่ลามทั้งระบบ", "สมมติฐานคือทุกอย่างปลายสายเครือข่ายจะล้มเหลวสักวัน คำถามคือตอนมันล่มระบบเราจะทำตัวอย่างไร ด้านบนคือสถานะของ circuit breaker จาก Closed เป็น Open เมื่อล้มเหลวติดกันเกินเกณฑ์ ครบเวลาพักเป็น Half-Open แล้วทดลองเรียก ตารางล่างคือ 5 pattern และสิ่งที่ต้องระวัง ตัวอย่าง graceful degradation ในระบบจองห้อง ถ้าบริการอีเมลล่ม การจองต้องยังทำได้ ไม่ตอบ 500 ทั้งคำขอ");
  flow(s, pres, [{ t: "Closed", fill: K.greenT }, { t: "Open", sub: "ไม่เรียกปลายทาง คืนค่าสำรอง", fill: K.redT }, { t: "Half-Open", sub: "ทดลองเรียก", fill: K.amberT }], 0.5, 1.2, 9, 0.8, { gap: 2.1, fs: 13, sfs: 11 });
  T(s, "ล้มเหลวติดกันเกินเกณฑ์", { x: 2.2, y: 1.15, w: 2.1, h: 0.4, fontSize: 11, color: K.ink2, align: "center" }); T(s, "ครบเวลาพัก", { x: 5.8, y: 1.15, w: 2.1, h: 0.4, fontSize: 11, color: K.ink2, align: "center" });
  T(s, "จาก Half-Open: ทดลองเรียกแล้วสำเร็จกลับไป Closed · ยังล้มเหลวอยู่กลับไป Open", { x: 0.5, y: 2.1, w: 9, h: 0.3, fontSize: 11.5, color: K.ink2, align: "center" });
  rowsTable(s, pres, [["Timeout", "การเรียกค้างจนกิน connection หมด", "ตั้งทุกการเรียกข้ามเครือข่าย ไม่มีข้อยกเว้น"], ["Retry + backoff + jitter", "ความล้มเหลวชั่วคราว", "retry เฉพาะที่ idempotent"], ["Circuit Breaker", "ยิงซ้ำใส่ระบบที่กำลังพัง", "ต้องมีเส้นทางสำรองเมื่อวงจรเปิด"], ["Bulkhead", "ส่วนที่ช้าดูดทรัพยากรจนส่วนอื่นตาย", "จำกัดจำนวน connection ต่อปลายทาง"], ["Graceful Degradation", "ฟีเจอร์รองพังแล้วทั้งระบบล่ม", "แยกให้ออกว่าอะไรคือแกน อะไรคือส่วนเสริม"]], 0.5, 2.45, [2.2, 3.2, 3.6], 0.42, { head: ["Pattern", "แก้ปัญหาอะไร", "สิ่งที่ต้องระวัง"], fs: 11 });
  ref(s, "Microsoft. Cloud Design Patterns (Circuit Breaker, Bulkhead, Retry)"); }

// 27 security
{ const s = lightSlide(pres, S5, "ความปลอดภัยเป็นเรื่องของการออกแบบ", "การเติม security ทีหลังแพงกว่าออกแบบให้ปลอดภัยตั้งแต่ต้น ซ้ายคือ 3 หลักที่ต้องอยู่ในหัวตอนวาด diagram ขวาคือ STRIDE ให้ไล่ถามทีละข้อกับ diagram ที่วาดไว้ ใช้เวลา 30 นาทีกับ Level 2 diagram แล้วไล่ 6 ข้อนี้ มักเจอปัญหาจริงอย่างน้อย 2 ข้อ");
  [["Trust boundary", "จุดที่ข้อมูลข้ามจากฝั่งที่เราควบคุมไม่ได้เข้ามา ทุกจุดข้ามต้องตรวจ input"], ["Least privilege", "ทุกส่วนได้สิทธิ์เท่าที่จำเป็น API ที่แค่อ่านรายงานไม่ควรใช้ credential ที่แก้ข้อมูลได้"], ["Defense in depth", "อย่าให้ปลอดภัยขึ้นกับชั้นเดียว ซ่อนปุ่มบน UI ไม่ใช่การควบคุมสิทธิ์ ต้องตรวจฝั่ง server"]].forEach((v, i) => { const y = 1.2 + i * 1.12; box(s, pres, 0.5, y, 4.2, 1.02, K.tealT); T(s, [{ text: v[0], options: { bold: true, fontSize: 13.5, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 11.5 } }], { x: 0.7, y, w: 3.85, h: 1.02, valign: "middle" }); });
  [["S", "Spoofing", "มีทางปลอมเป็นคนอื่นไหม"], ["T", "Tampering", "มีทางแก้ข้อมูลระหว่างทางไหม"], ["R", "Repudiation", "พิสูจน์ได้ไหมว่าใครทำ"], ["I", "Information Disclosure", "มีข้อมูลหลุดเกินจำเป็นไหม"], ["D", "Denial of Service", "ยิงรัวแล้วล่มได้ไหม"], ["E", "Elevation of Privilege", "ทำสิ่งที่ไม่ควรทำได้ไหม"]].forEach((v, i) => { const y = 1.2 + i * 0.57; box(s, pres, 4.95, y, 4.55, 0.5, K.paper); chip(s, pres, 5.03, y + 0.04, v[0], K.teal, K.white, 0.42); T(s, [{ text: v[1] + "  ", options: { bold: true, fontSize: 11.5 } }, { text: v[2], options: { fontSize: 11.5, color: K.ink2 } }], { x: 5.55, y, w: 3.9, h: 0.5, valign: "middle" }); });
  box(s, pres, 0.5, 4.65, 9, 0.42, K.amberT); T(s, "ไล่ STRIDE 30 นาทีกับ Level 2 diagram มักเจอปัญหาจริงอย่างน้อย 2 ข้อ", { x: 0.7, y: 4.65, w: 8.6, h: 0.42, fontSize: 12.5, bold: true, valign: "middle" });
  ref(s, "Microsoft. Threat Modeling / STRIDE; OWASP. Threat Modeling"); }

// 28 ADR + fitness
{ const s = lightSlide(pres, S5, "ADR และ Fitness Function", "ADR คือเอกสารสั้นหนึ่งฉบับต่อหนึ่งการตัดสินใจ ส่วนที่มีค่าที่สุดคือ Alternatives Considered เพราะบอกทีมอนาคตว่าทางที่น่าสนใจเคยถูกพิจารณาและตกไปเพราะอะไร ADR ที่ล้าสมัยไม่ต้องลบ เปลี่ยนสถานะเป็น Superseded ส่วน fitness function มาจากหนังสือ Building Evolutionary Architectures เป็น test อัตโนมัติที่ตรวจว่าสถาปัตยกรรมยังเป็นไปตามที่ตั้งใจ ไม่เช่นนั้นกติกาจะถูกละเมิดภายในไม่กี่เดือน");
  codeBox(s, pres, 0.5, 1.2, 4.4, 2.95, ["# ADR-00X: [หัวข้อ]", "## Status", "Proposed | Accepted |", "Superseded by ADR-00Y", "## Context", "## Decision", "## Alternatives Considered", "## Consequences", "## Revisit When"], 11);
  box(s, pres, 0.5, 4.3, 4.4, 0.7, K.amberT); T(s, "ส่วนที่มีค่าที่สุดคือ Alternatives Considered ADR ที่ล้าสมัยให้เปลี่ยนสถานะ ไม่ต้องลบ", { x: 0.65, y: 4.3, w: 4.1, h: 0.7, fontSize: 11.5, bold: true, valign: "middle" });
  box(s, pres, 5.1, 1.2, 4.4, 3.8, K.paper);
  T(s, "Fitness Function: test อัตโนมัติที่ตรวจว่าสถาปัตยกรรมยังเป็นตามที่ตั้งใจ", { x: 5.3, y: 1.3, w: 4.0, h: 0.6, fontSize: 13, bold: true, color: K.teal });
  T(s, bl(["build แดงถ้า import ข้ามขอบเขตโมดูล", "ไม่มี layer ล่างเรียก layer บน", "load test ทำให้ CI แดงถ้า p95 เกินที่ตกลง", "response ของ API ตรงกับ openapi.yaml", "สแกน dependency ที่มีช่องโหว่ในทุก PR"], 5), { x: 5.3, y: 1.95, w: 4.0, h: 2.2, fontSize: 12 });
  T(s, "ข้อตกลงบนกระดาษ กลายเป็นสัญญาณที่แดงได้ภายในไม่กี่นาที", { x: 5.3, y: 4.2, w: 4.0, h: 0.7, fontSize: 13, bold: true, color: "B5651D" });
  ref(s, "Michael Nygard. Documenting Architecture Decisions; Ford, Parsons, Kua. Building Evolutionary Architectures"); }

// 29 AI agent era
{ const s = lightSlide(pres, S6, "ขอบเขตชัดยิ่งมีค่าเมื่อ AI agent ร่วมเขียน code", "เมื่อมี agent ช่วยเขียน code ขอบเขตที่ชัดเจนยิ่งมีค่าสูงขึ้น ระบบที่ขอบเขตพร่าทำให้ agent ต้องอ่านเกือบทั้ง repo context ล้นและคุณภาพตก ระบบที่ขอบเขตชัดให้ agent อ่านแค่โมดูลเดียว ต้องเขียน AGENTS.md เก็บ diagram เป็น Mermaid ใน repo เก็บ ADR ไว้ และทำ fitness function ให้ครบ ข้อควรระวังคือไม่ควรให้ AI ตัดสินขอบเขต service และโครงสร้างข้อมูลหลัก");
  node(s, 0.5, 1.2, 1.2, 0.75, K.redT, "ขอบเขตพร่า", null, 12);
  flow(s, pres, [{ t: "agent ต้องอ่าน code เกือบทั้ง repo เพื่อแก้ 1 อย่าง", wt: 1.6, fill: K.redT }, { t: "context ล้น คุณภาพตก", fill: K.redT }, { t: "แก้จุดหนึ่ง พังอีกจุด", fill: K.redT }], 1.85, 1.2, 7.65, 0.75, { gap: 0.25, fs: 11.5 });
  node(s, 0.5, 2.1, 1.2, 0.75, K.greenT, "ขอบเขตชัด", null, 12);
  flow(s, pres, [{ t: "agent อ่านแค่โมดูลเดียว + interface เพื่อนบ้าน", wt: 1.6, fill: K.greenT }, { t: "context พอดี เข้าใจครบ", fill: K.greenT }, { t: "test ของโมดูลนั้นตอบได้ทันที", fill: K.greenT }], 1.85, 2.1, 7.65, 0.75, { gap: 0.25, fs: 11.5 });
  ["AGENTS.md บอกว่าโมดูลไหนทำอะไร ห้ามข้ามขอบเขตไหน", "diagram เป็น Mermaid ใน repo agent อ่านข้อความได้ แต่อ่านรูปในสไลด์ไม่ได้", "ADR อยู่ใน repo ไม่ให้ agent เสนอทางที่ทีมเคยปฏิเสธ", "fitness function ให้ครบ agent ละเมิดกติกาที่ไม่มีอะไรบังคับเร็วกว่ามนุษย์"].forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 3.0 + Math.floor(i / 2) * 0.62; box(s, pres, x, y, 4.4, 0.55, K.paper); chip(s, pres, x + 0.1, y + 0.065, i + 1, K.teal, K.white, 0.42); T(s, t, { x: x + 0.62, y, w: 3.7, h: 0.55, fontSize: 11, valign: "middle" }); });
  box(s, pres, 0.5, 4.3, 9, 0.75, K.ink); T(s, "ไม่ควรมอบให้ AI ตัดสินขอบเขต service และโครงสร้างข้อมูลหลัก ต้องรู้ทิศทางธุรกิจ 1-2 ปี ให้ AI สำรวจทางเลือก คนเป็นคนเลือกและเขียนเหตุผลลง ADR", { x: 0.75, y: 4.3, w: 8.5, h: 0.75, fontSize: 12.5, bold: true, color: K.white, valign: "middle" }); }

// 30 checklist
{ const s = lightSlide(pres, S7, "Checklist ก่อนบอกว่าออกแบบเสร็จ", "ใช้ 10 ข้อนี้ตรวจงานออกแบบก่อนส่ง ข้อสุดท้ายตรวจง่ายที่สุดและบอกอะไรได้มากที่สุด ถ้าทดสอบตรรกะธุรกิจโดยไม่ยกทั้งระบบไม่ได้ แปลว่าตรรกะยังผูกกับ infrastructure ซึ่งทำให้ loop ยาวตลอดทั้งโครงการ");
  ["ระบุ quality attribute สำคัญที่สุด 3 ข้อ พร้อมตัวเลข", "มี C4 Level 1 และ 2 ใน repo เป็น Mermaid", "ทุกกล่องใน diagram มีที่อยู่ใน repo และชื่อตรงกัน", "ระบุขอบเขต transaction ว่าอะไรต้องสำเร็จไปด้วยกัน", "ทุกการเรียกข้ามเครือข่ายมี timeout", "ระบุได้ว่าถ้าบริการภายนอกล่ม ระบบทำตัวอย่างไร", "ไล่ STRIDE กับ diagram อย่างน้อย 1 รอบ", "มี ADR สำหรับทุกการตัดสินใจที่ย้อนกลับยาก", "มี fitness function อย่างน้อย 1 ตัว", "ทดสอบตรรกะธุรกิจได้โดยไม่ต้องยกระบบทั้งหมดขึ้นมา"].forEach((t, i) => { const col = i < 5 ? 0 : 1, row = i % 5, x = 0.5 + col * 4.6, y = 1.2 + row * 0.66; box(s, pres, x, y, 4.4, 0.58, i === 9 ? K.amberT : K.paper); chip(s, pres, x + 0.1, y + 0.08, i + 1, i === 9 ? K.amber : K.teal, i === 9 ? K.ink : K.white, 0.42); T(s, t, { x: x + 0.65, y, w: 3.65, h: 0.58, fontSize: 12, valign: "middle" }); });
  box(s, pres, 0.5, 4.65, 9, 0.42, K.ink); T(s, "ข้อ 10 ตรวจง่ายสุด ถ้าทำไม่ได้ แปลว่าตรรกะยังผูกกับ infrastructure และ loop จะยาวตลอดโครงการ", { x: 0.75, y: 4.65, w: 8.5, h: 0.42, fontSize: 12, bold: true, color: K.white, valign: "middle" }); }

// 31 summary
{ const s = darkSlide(pres, S7, "สรุป 5 ข้อ สถาปัตยกรรมที่ดีทำให้ loop สั้นและให้ AI agent ทำงานทีละส่วนได้ ให้ผู้เรียนเลือกหนึ่งข้อที่จะนำไปใช้ในโปรเจกต์");
  T(s, "สรุป", { x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  ["สถาปัตยกรรมคือสิ่งที่เปลี่ยนทีหลังแล้วแพง ถกเรื่องนี้ให้นาน ตัดสินเรื่องอื่นให้เร็ว", "เริ่มจาก quality attribute ที่มีตัวเลข ไม่ใช่จาก technology และเขียนเหตุผลของสิ่งที่ยอมแลกลง ADR", "ทีมเล็กเริ่มที่ modular monolith ที่ขอบเขตถูกบังคับจริง อย่าแยก service เร็วเกินไป", "ทุกอย่างปลายสายเครือข่ายล้มได้ ใส่ timeout และอย่าให้ฟีเจอร์รองล้มฟีเจอร์หลัก", "ทำ fitness function ให้กติกาแดงได้เอง เพราะ agent ละเมิดกติกาที่ไม่มีอะไรบังคับ"].forEach((t, i) => { const y = 1.15 + i * 0.78; chip(s, pres, 0.7, y + 0.1, i + 1, K.amber, K.ink, 0.4); T(s, t, { x: 1.3, y, w: 8.2, h: 0.65, fontSize: 15, color: K.white, valign: "middle" }); }); }

// 32 glossary
{ const s = lightSlide(pres, S8, "Glossary", "ใช้ทบทวนศัพท์สำคัญของบทนี้ 12 คำ ให้ผู้เรียนลองอธิบายแต่ละคำด้วยคำพูดของตัวเองก่อนดูคำตอบ");
  [["Architecture", "การตัดสินใจที่เปลี่ยนทีหลังแล้วแพง"], ["Quality Attribute", "คุณสมบัติที่ไม่ใช่ฟังก์ชัน เช่น เร็ว ปลอดภัย"], ["Coupling / Cohesion", "ส่วนต้องรู้จักกันมากแค่ไหน / ของในโมดูลเกี่ยวกันจริงแค่ไหน"], ["C4 Model", "4 ระดับ: Context / Container / Component / Code"], ["Container (C4)", "หน่วยที่รันและ deploy แยกได้ ต่างจาก Docker"], ["Modular Monolith", "ก้อนเดียวแต่แบ่งโมดูลชัด ขอบเขตบังคับจริง"], ["Distributed Monolith", "แยก service แต่ยังต้อง deploy พร้อมกัน"], ["Idempotent", "เรียกซ้ำกี่ครั้งผลลัพธ์ก็เท่าเดิม"], ["Circuit Breaker", "ตัดการเรียกบริการที่กำลังพัง ไม่ให้ลากทั้งระบบ"], ["Graceful Degradation", "ส่วนรองพัง แต่ส่วนสำคัญยังใช้ได้"], ["ADR", "เอกสารสั้น 1 ฉบับต่อ 1 การตัดสินใจ"], ["Fitness Function", "test อัตโนมัติที่ตรวจว่าสถาปัตยกรรมยังตามที่ตั้งใจ"]].forEach((v, i) => { const x = 0.5 + (i % 3) * 3.05, y = 1.2 + Math.floor(i / 3) * 0.95; box(s, pres, x, y, 2.9, 0.85, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 12.5, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 11 } }], { x: x + 0.15, y, w: 2.6, h: 0.85, valign: "middle" }); }); }

// 33 Ref
{ const s = lightSlide(pres, S9, "Ref", "รายการอ้างอิงทั้งหมดของบทนี้ ให้เช็กกับแหล่งเดิมก่อนเชื่อ เพราะเอกสารเขียนโดยมี AI ช่วยและอาจมีส่วนที่ผิดหรือเก่าไปแล้ว");
  const L1 = ["Martin Fowler. Software Architecture Guide", "Martin Fowler. Who Needs an Architect?", "Martin Fowler. MonolithFirst", "Martin Fowler. Microservice Trade-Offs", "Martin Fowler. Conway's Law", "Simon Brown. The C4 model for visualising software architecture", "arc42. แม่แบบเอกสารสถาปัตยกรรม", "ADR. Architectural Decision Records", "Michael Nygard. Documenting Architecture Decisions"],
    L2 = ["Alistair Cockburn. Hexagonal Architecture", "Microsoft. Cloud Design Patterns", "AWS Well-Architected Framework", "The Twelve-Factor App", "ISO/IEC 25010. System and software quality models", "Ford, Parsons, Kua. Building Evolutionary Architectures", "Sam Newman. Building Microservices, 2nd Edition", "Martin Kleppmann. Designing Data-Intensive Applications", "SEI Carnegie Mellon. Software Architecture", "Microsoft. Threat Modeling / STRIDE", "OWASP. Threat Modeling"];
  [[L1, 0.5], [L2, 5.1]].forEach(([arr, x]) => { box(s, pres, x, 1.2, 4.4, 3.8, K.paper); T(s, bl(arr, 2), { x: x + 0.2, y: 1.3, w: 4.0, h: 3.6, fontSize: 11 }); }); }

L.save(pres, "R04-system-architecture-design.pptx").then(() => console.log("saved"));
