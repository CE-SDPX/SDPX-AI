const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref, codeBox, rowsTable, goodBad } = L;
const S0 = "เปิดคาบ", S1 = "Performance Loop", S2 = "Race condition และ R6", S3 = "วัดความเร็วและ N+1", S4 = "ops/bands.yaml", S5 = "สรุป", S6 = "Glossary", S7 = "Lab และการวัดผล";
const pres = L.newDeck("WS-07 Performance Loop", [S0, S1, S2, S3, S4, S5, S6, S7]);
const bullets = (a) => a.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 } }));
const numbered = (s, items, y0 = 1.3, h = 0.62, fs = 14) => items.forEach((t, i) => { const y = y0 + i * (h + 0.1); box(s, pres, 0.5, y, 9, h, K.paper); chip(s, pres, 0.65, y + (h - 0.42) / 2, i + 1, K.teal, K.white, 0.42); T(s, t, { x: 1.3, y, w: 8, h, fontSize: fs, valign: "middle" }); });
const step7 = (s, st) => { st.forEach((v, i) => { const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4, x = 0.5 + col * 4.6, y = 1.3 + row * 0.9;
    box(s, pres, x, y, 4.4, 0.8, i === 6 ? K.amberT : K.paper); chip(s, pres, x + 0.15, y + 0.19, v[0], i === 6 ? K.amber : K.teal, i === 6 ? K.ink : K.white);
    T(s, [{ text: v[1], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[2], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.75, y, w: 3.55, h: 0.8, valign: "middle" }); });
  box(s, pres, 5.1, 4.0, 4.4, 0.8, K.ink); T(s, "แต่ละขั้น: ทำ → ผลที่ควรเห็น → หากติดปัญหา", { x: 5.25, y: 4.0, w: 4.1, h: 0.8, fontSize: 13, color: K.white, valign: "middle" }); };
const side = (s, items, x = 6.3, w = 3.2) => items.forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, x, y, w, 1.15, v[2] || K.paper);
  T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.15, y, w: w - 0.3, h: 1.15, valign: "middle" }); });

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดคาบ บทนี้ตรวจสิ่งที่ test ที่เรียกทีละครั้งมองไม่เห็น คือการทำงานพร้อมกันและความช้าเมื่อข้อมูลเยอะ");
  T(s, "WS-07", { x: 0.7, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "Performance Loop", { x: 0.7, y: 1.8, w: 8.6, h: 1.0, fontSize: 40, bold: true, color: K.white });
  T(s, [{ text: "Rathachai Chawuthai", options: { bold: true, fontSize: 18, color: K.white, breakLine: true } }, { text: "Computer Engineering, KMITL", options: { fontSize: 14, color: "B8C4D4" } }], { x: 0.7, y: 3.55, w: 8.6, h: 0.75 });
  T(s, "SDPX-AI · Software Development Process in Practice — AI-Assisted", { x: 0.7, y: 4.5, w: 8.6, h: 0.4, fontSize: 14, color: "B8C4D4" }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "เมื่อจบคาบ นักศึกษาควรทำได้", "อ่านวัตถุประสงค์ทั้ง 4 ข้อ");
  const it = ["อธิบายว่าเหตุใด code ที่ผ่าน unit และ E2E test ยังผิดกฎ R6 ได้ และแก้ด้วย transaction กับ row lock ในชั้น data", "เขียน load test ที่วัดผลได้ซ้ำ ใช้ p95 และ threshold เป็นเงื่อนไขของ CI", "หาและแก้ N+1 query โดยยังเก็บกฎไว้ใน src/domain", "เขียน ops/bands.yaml ที่แยก gate ออกจาก band และระบุว่าคนกับ AI ทำอะไรในแต่ละระดับ"];
  it.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.75; box(s, pres, x, y, 4.4, 1.55, K.paper); chip(s, pres, x + 0.2, y + 0.2, i + 1);
    T(s, t, { x: x + 0.8, y: y + 0.2, w: 3.4, h: 1.2, fontSize: 12 }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "คำตอบที่มักได้คือ 50 เพราะ unit test ของ R1 ตรวจกรณีที่นั่งเต็มพอดีแล้ว ขั้นที่ 1 ของ lab จะแสดงผลจริงซึ่งมักมากกว่า 50 หลายเท่า ส่วนจำนวน query มักเท่ากับจำนวนกิจกรรมบวก 1 ซึ่งไม่เป็นปัญหาเมื่อมี 3 กิจกรรมใน seed แต่ช้าลงทุกครั้งที่กิจกรรมเพิ่ม ใช้ผลส่วน C ของ 0-Before");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "ผู้ใช้ 300 คนลงทะเบียนกิจกรรม 50 ที่นั่งพร้อมกัน\nคาดว่าจะมี CONFIRMED กี่คน", { x: 0.7, y: 1.5, w: 8.6, h: 1.8, fontSize: 30, bold: true, color: K.white });
  T(s, "หน้ารายการกิจกรรม 1 ครั้งส่ง query กี่ครั้ง", { x: 0.7, y: 3.6, w: 8.6, h: 0.6, fontSize: 22, color: K.amber }); }

// 4 วัดที่ไหน
{ const s = lightSlide(pres, S1, "load test ทำได้ที่ไหน",
    "ตัวเลขจากแต่ละที่เทียบกันตรง ๆ ไม่ได้ เครื่องสมาชิก เครื่อง CI และเว็บจริงเร็วไม่เท่ากัน p95 ในเครื่อง 40 ms ไม่ได้แปลว่าเว็บจริงจะได้ 40 ms สิ่งที่เทียบได้คือค่าจากที่เดียวกันในเวลาต่างกัน เช่น CI ก่อนและหลัง PR หนึ่ง อ้างอิง Vercel policy regarding load testing deployments");
  rowsTable(s, pres, [["docker compose up ในเครื่อง", "ได้", "เป็นระบบของกลุ่มเอง ข้อมูลทดสอบไม่กระทบใคร"], ["CI", "ได้", "ใช้ compose ชุดเดียวกับในเครื่อง ตามที่ทำใน WS-05"], ["Live URL บน Vercel และ Neon", "ไม่ได้", "Vercel อนุญาต load test เฉพาะลูกค้า Enterprise ที่ขออนุมัติก่อน และฐานข้อมูลแผนฟรีมีขีดจำกัด"]], 0.5, 1.3, [2.8, 1.0, 5.2], 0.85, { head: ["ที่", "ใช้ได้หรือไม่", "เหตุผล"], fs: 12, fills: [K.greenT, K.greenT, K.redT] });
  T(s, "เทียบตัวเลขเฉพาะจากที่เดียวกันในเวลาต่างกัน", { x: 0.5, y: 4.5, w: 9, h: 0.3, fontSize: 14, bold: true, color: K.teal }); ref(s, "อ้างอิง: Vercel — policy regarding load testing deployments"); }

// 5 ตัววัด
{ const s = lightSlide(pres, S1, "ตัววัด: p95 อัตราผิดพลาด และความถูกต้อง", "ค่าเฉลี่ยซ่อนคำขอที่ช้ามากไว้ ถ้าคำขอ 1 ใน 20 ใช้ 3 วินาที ค่าเฉลี่ยอาจยังดูดีแต่ผู้ใช้จำนวนมากพบความช้านั้น");
  rowsTable(s, pres, [["p95", "คำขอ 95% เร็วกว่าค่านี้", "ค่าเฉลี่ยซ่อนคำขอที่ช้ามาก (1 ใน 20 ใช้ 3 วินาทีก็ยังดูดี)"], ["อัตราคำขอที่ผิดพลาด", "สัดส่วนคำขอที่ไม่ได้ status ที่คาดไว้", "ระบบที่ตอบเร็วเพราะตอบ 500 ไม่ได้เร็วจริง"], ["ความถูกต้องหลังทดสอบ", "เช่น จำนวน CONFIRMED เทียบกับ capacity", "load test ของ R6 สนใจผลที่ถูกต้องมากกว่าความเร็ว"]], 0.5, 1.3, [2.2, 3.0, 3.8], 0.85, { head: ["ตัววัด", "ความหมาย", "เหตุผลที่ใช้"], fs: 12 });
  T(s, "Latency: load test ทั้งชุดใน CI อยู่ในระดับนาที · Fidelity: R6 ไม่ผ่านทุกครั้งเมื่อไม่มี lock · Coverage: ทุก PR ตรวจ R6 และ p95", { x: 0.5, y: 4.6, w: 9, h: 0.4, fontSize: 11, color: K.ink2 }); }

// 6 race diagram
{ const s = lightSlide(pres, S2, "เหตุใด test ที่มีอยู่จึงไม่เห็น R6",
    "function register ใน src/domain ถูกต้องทุกกรณี เพราะตัดสินจากข้อมูลที่ได้รับ ปัญหาอยู่ที่ข้อมูลนั้นล้าสมัยไปแล้วตั้งแต่ก่อนบันทึก unit test และ E2E ส่งคำขอทีละรายการ จึงไม่เห็นช่วงเวลาที่ซ้อนกัน");
  box(s, pres, 0.5, 1.2, 9, 0.5, K.paper); T(s, "ที่นั่ง 50 · CONFIRMED แล้ว 49", { x: 0.5, y: 1.2, w: 9, h: 0.5, fontSize: 14, bold: true, align: "center", valign: "middle" });
  flow(s, pres, [{ t: "คำขอ A อ่านรายการ", sub: "เห็น 49" }, { t: "domain ตัดสิน", sub: "“เหลือ 1 ที่”" }, { t: "A INSERT CONFIRMED", fill: K.amberT }], 0.5, 1.9, 9, 0.9, { gap: 0.3, fs: 12, sfs: 11 });
  flow(s, pres, [{ t: "คำขอ B อ่านรายการ", sub: "เห็น 49 (พร้อมกัน)" }, { t: "domain ตัดสิน", sub: "“เหลือ 1 ที่”" }, { t: "B INSERT CONFIRMED", fill: K.amberT }], 0.5, 3.0, 9, 0.9, { gap: 0.3, fs: 12, sfs: 11 });
  box(s, pres, 0.5, 4.2, 9, 0.7, K.redT); T(s, "ผล: CONFIRMED 51 จาก 50 ที่นั่ง — domain ถูกต้อง แต่ข้อมูลที่ได้รับล้าสมัย", { x: 0.75, y: 4.2, w: 8.5, h: 0.7, fontSize: 15, bold: true, valign: "middle" }); }

// 7 ทางเลือก
{ const s = lightSlide(pres, S2, "ทางเลือกในการแก้ R6", "วิชานี้ใช้ทางที่ 3 เพราะเข้าใจง่ายและตรวจได้ด้วย load test");
  rowsTable(s, pres, [["lock ใน memory ของ server", "ใช้ได้ใน process เดียว", "Vercel มีหลาย instance แต่ละตัวมี lock ของตนเอง จึงไม่ป้องกัน"], ["transaction อย่างเดียว", "ยังจองเกิน", "isolation ปกติของ PostgreSQL ไม่กัน 2 transaction อ่านข้อมูลชุดเดียวกันพร้อมกัน"], ["transaction + SELECT ... FOR UPDATE", "คำขอของกิจกรรมเดียวกันทำงานทีละรายการ", "คำขอที่รอ lock ช้าลง กิจกรรมอื่นไม่ได้รับผล"], ["isolation SERIALIZABLE", "PostgreSQL ยกเลิก transaction ที่ขัดกัน", "code ต้องลองใหม่เมื่อถูกยกเลิก ซับซ้อนกว่า"]], 0.5, 1.3, [2.6, 2.6, 3.8], 0.82, { head: ["ทางเลือก", "ผล", "ข้อจำกัด"], fs: 11, fills: [K.redT, K.redT, K.greenT, K.paper] }); }

// 8 lock ใน data
{ const s = lightSlide(pres, S2, "lock อยู่ในชั้น data domain ไม่เปลี่ยน",
    "lock อยู่ในชั้น data ตาม ADR-002 ชั้น data เปิด transaction จองแถวของกิจกรรม อ่านรายการลงทะเบียน ส่งข้อมูลให้ function ใน src/domain ตัดสิน แล้วบันทึกก่อนปล่อย lock การยกเลิกต้องใช้ lock เดียวกัน เพราะการเลื่อนผู้อยู่ในคิวสำรองกับการลงทะเบียนใหม่พร้อมกันก็จองเกินได้ lock ของแถวกิจกรรมไม่ได้ป้องกัน R5 ถ้าต้องป้องกันด้วย ต้องจองแถวของผู้ใช้เพิ่มและจองตามลำดับเดียวกันทุกครั้ง บันทึกเป็นความเสี่ยงในแผน");
  flow(s, pres, [{ t: "BEGIN", sub: "transaction" }, { t: "SELECT ... FOR UPDATE", sub: "จองแถวกิจกรรม", fill: K.amber }, { t: "อ่านรายการลงทะเบียน" }, { t: "domain ตัดสิน", sub: "ไม่เปลี่ยน", fill: K.greenT }, { t: "บันทึก · COMMIT", sub: "ปล่อย lock" }], 0.5, 1.4, 9, 1.4, { gap: 0.2, fs: 12, sfs: 10 });
  rowsTable(s, pres, [["การยกเลิก", "ต้องใช้ lock เดียวกัน (เลื่อนคิวสำรองพร้อมลงทะเบียนใหม่ก็จองเกินได้)"], ["R5", "lock แถวกิจกรรมไม่กัน R5 ต้องจองแถวผู้ใช้เพิ่มตามลำดับเดียวกัน บันทึกเป็นความเสี่ยง"]], 0.5, 3.2, [1.8, 7.2], 0.75, { fills: [K.amberT, K.amberT], fs: 12 }); }

// 9 atomic หลักการ
{ const s = lightSlide(pres, S2, "ตรวจเงื่อนไขและบันทึกเป็นขั้นเดียว", "ตัวอย่างใช้ feature แจ้งเตือนซึ่งอยู่นอกขอบเขต สมมติ registrations มีคอลัมน์ notified_at และผู้ได้ที่นั่งต้องได้รับแจ้งครั้งเดียว แม้ process ส่งแจ้งเตือนรันพร้อมกันหลายตัว");
  numbered(s, ["การตรวจเงื่อนไขและการบันทึกต้องเป็นขั้นเดียวกันในฐานข้อมูล ไม่ใช่อ่านแล้วค่อยเขียน", "ทำได้ด้วย UPDATE ... WHERE เงื่อนไข RETURNING ซึ่งสำเร็จได้เพียงคำขอเดียว หรือด้วย row lock", "สิ่งที่ย้อนไม่ได้ เช่น ส่งการแจ้งเตือน ทำหลังฐานข้อมูลยืนยันแล้วเท่านั้น"], 1.3, 0.9, 14); }

// 10 ดี/ไม่ดี
goodBad(pres, S2, "ตัวอย่าง: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดีอ่านแล้วค่อยเขียนเป็น 2 คำสั่ง process 2 ตัวอ่านเห็น null พร้อมกันแล้วส่งแจ้งเตือนทั้งคู่ และส่งก่อนบันทึก ตัวอย่างที่ดีใช้ UPDATE ... WHERE notified_at IS NULL RETURNING ซึ่งสำเร็จได้เพียงคำขอเดียว",
  ["const { rows } = await db().query(", '  "SELECT notified_at FROM', '   registrations WHERE id = $1",', "  [id]);", "if (rows[0].notified_at === null) {", "  await sendNotification(id);", "  await db().query(", '    "UPDATE registrations SET', '     notified_at = now()', '     WHERE id = $1", [id]);', "}"],
  ["const { rows } = await db().query(", '  "UPDATE registrations', "   SET notified_at = now()", "   WHERE id = $1", "     AND notified_at IS NULL", '   RETURNING id",', "  [id]);", "if (rows.length === 1)", "  await sendNotification(id);"], 11);

// 11 ปัญหา
{ const s = lightSlide(pres, S2, "ตัวอย่างที่ไม่ดีมีปัญหาอะไร", "ข้อผิดพลาดนี้เห็นได้เฉพาะเมื่อทดสอบพร้อมกัน");
  rowsTable(s, pres, [["อ่านแล้วค่อยเขียนเป็น 2 คำสั่ง", "process 2 ตัวอ่านเห็น null พร้อมกัน แล้วส่งการแจ้งเตือนทั้งคู่"], ["ส่งการแจ้งเตือนก่อนบันทึก", "ถ้าบันทึกไม่สำเร็จ รอบถัดไปจะส่งซ้ำอีก"], ["test ที่เรียกทีละครั้งผ่านเสมอ", "ข้อผิดพลาดนี้เห็นได้เฉพาะเมื่อทดสอบพร้อมกัน"]], 0.5, 1.3, [3.4, 5.6], 0.95, { fills: [K.redT, K.redT, K.redT], fs: 14 }); }

// 12 CodeRabbit
caseSlide(pres, S2, { title: "กรณีจริง: AI กับการทำงานพร้อมกัน", tag: "CodeRabbit · ธันวาคม 2025",
  notes: "CodeRabbit วิเคราะห์ pull request open source 470 รายการ PR ที่ AI ร่วมเขียน 320 รายการ และคนเขียนเอง 150 รายการ PR ที่ AI ร่วมเขียนมีปัญหาเฉลี่ย 10.83 ข้อต่อ PR เทียบกับ 6.45 ข้อ ปัญหาความถูกต้องของการทำงานพร้อมกันและลำดับการทำงานพบประมาณ 2 เท่า การอ่านเขียนข้อมูลเกินจำเป็นรวม query ซ้ำซ้อนพบประมาณ 8 เท่า รายงานระบุว่ายืนยันผู้เขียนแต่ละ PR โดยตรงไม่ได้",
  facts: ["วิเคราะห์ PR open source 470 รายการ: AI ร่วมเขียน 320 · คนเขียนเอง 150", "ปัญหาเฉลี่ย 10.83 ข้อต่อ PR เทียบกับ 6.45 ข้อ", "ปัญหาการทำงานพร้อมกันและลำดับการทำงาน พบประมาณ 2 เท่า", "การอ่านเขียนข้อมูลเกินจำเป็น (รวม query ซ้ำซ้อน) พบประมาณ 8 เท่า", "ข้อจำกัด: ยืนยันผู้เขียนแต่ละ PR โดยตรงไม่ได้"],
  principle: "เชื่อมกับบทนี้", takeaway: "ทั้ง 2 แบบ (race condition และ N+1) คือสิ่งที่ code ดูถูกต้องเมื่ออ่าน และผ่าน test ที่เรียกทีละครั้ง",
  refs: "อ้างอิง: CodeRabbit — State of AI vs Human Code Generation Report" });

// 13 load test หลักการ
{ const s = lightSlide(pres, S3, "หลักการเขียน load test ที่วัดซ้ำได้", "constant-arrival-rate คือกำหนดอัตราคำขอ เมื่อระบบช้าลง คำขอต่อวินาทียังคงที่ ความช้าจึงปรากฏในผล ตัวอย่างวัดหน้าตั้งค่าการแจ้งเตือน k6 จบด้วย exit code ที่ไม่ใช่ 0 เมื่อ threshold ไม่ผ่าน CI จึงใช้ได้ทันที");
  numbered(s, ["กำหนดอัตราคำขอ (arrival rate) ไม่ใช่จำนวนผู้ใช้ที่วนส่งให้เร็วที่สุด", "มีช่วง warm-up ที่ไม่นับ", "ใช้ threshold เป็นเงื่อนไข เช่น p95 < 500 ms (k6 exit ไม่ใช่ 0 เมื่อไม่ผ่าน)", "ตรวจ status ของทุกคำขอ คำตอบเร็วเพราะ error ไม่นับว่าเร็ว", "เตรียมข้อมูลให้ใกล้ขนาดจริง · ยิงเฉพาะระบบของตนเอง"], 1.25, 0.6, 13); }

// 14 k6 ดี/ไม่ดี
goodBad(pres, S3, "ตัวอย่าง k6: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดียิง Live URL บน Vercel ซึ่งผิดนโยบาย ใช้ vus ที่วนส่งให้เร็วที่สุด ไม่มี warm-up ใช้ avg เป็น threshold และไม่ตรวจ status หรือใส่ cookie ตัวอย่างที่ดีใช้ constant-arrival-rate มี warm-up และ threshold ของช่วงวัดเท่านั้น",
  ["export const options = {", "  vus: 100,", '  duration: "30s",', "  thresholds: {", '    http_req_duration:', '      ["avg<500"] },', "};", "export default function () {", "  http.get(", '    "https://sdpx-g3.vercel.app/..."', "  );", "}"],
  ["scenarios: {", "  warmup: { rate: 5, duration: '10s' },", "  measure: {", '    executor: "constant-arrival-rate",', "    rate: 20, timeUnit: '1s',", "    duration: '30s', startTime: '10s' },", "},", "thresholds: {", '  "http_req_duration{phase:measure}":', '    ["p(95)<500"],', '  "checks{phase:measure}": ["rate==1"] }'], 10);

// 15 ปัญหา k6
{ const s = lightSlide(pres, S3, "load test ที่ไม่ดีมีปัญหาอะไร", "ไม่มี cookie ทำให้หน้าตอบ 401 หรือพาไปหน้า login ซึ่งเร็วกว่าหน้าจริง");
  rowsTable(s, pres, [["ยิง Live URL บน Vercel", "ผิดนโยบายของ Vercel และตัวเลขขึ้นกับเครือข่ายของผู้ยิง"], ["vus: 100 วนส่งเร็วที่สุด", "ระบบช้าลง จำนวนคำขอลดเอง ผลดูดีกว่าความจริง"], ["ไม่มี warm-up", "คำขอแรก ๆ ที่ช้ามากปนอยู่ในผล ตัวเลขแต่ละครั้งต่างกันมาก"], ["threshold เป็น avg", "คำขอที่ช้ามากซ่อนอยู่ในค่าเฉลี่ย"], ["ไม่ตรวจ status และไม่มี cookie", "หน้าที่ตอบ 401 หรือพาไป login เร็วกว่าหน้าจริง ผลจึงผิด"]], 0.5, 1.3, [3.2, 5.8], 0.62, { fills: [K.redT, K.redT, K.redT, K.redT, K.redT], fs: 12 }); }

// 16 N+1
{ const s = lightSlide(pres, S3, "N+1 query",
    "แต่ละ query อาจใช้เวลาไม่ถึง 1 ms แต่เมื่อมี 200 กิจกรรมและ 20 คำขอต่อวินาที ระบบต้องตอบ 4,000 query ต่อวินาที pool ของการเชื่อมต่อฐานข้อมูลมีจำนวนจำกัด คำขอจึงต่อคิวกันจน p95 สูงขึ้นหลายเท่า");
  box(s, pres, 0.5, 1.3, 4.4, 2.6, K.redT); T(s, "ก่อน: 1 + N query", { x: 0.75, y: 1.4, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.red });
  T(s, ["SELECT events", "SELECT registrations WHERE event_id = กิจกรรมที่ 1", "...", "SELECT registrations WHERE event_id = กิจกรรมที่ N"].map((t, i, a) => ({ text: t, options: { breakLine: i < a.length - 1, paraSpaceAfter: 4 } })), { x: 0.75, y: 1.85, w: 3.9, h: 1.9, fontSize: 11, fontFace: "Courier New" });
  box(s, pres, 5.1, 1.3, 4.4, 2.6, K.greenT); T(s, "หลัง: 2 query", { x: 5.35, y: 1.4, w: 4, h: 0.35, fontSize: 15, bold: true, color: K.green });
  T(s, ["SELECT events", "SELECT registrations WHERE event_id = ANY(รายการ id)"].map((t, i, a) => ({ text: t, options: { breakLine: i < a.length - 1, paraSpaceAfter: 4 } })), { x: 5.35, y: 1.85, w: 3.9, h: 1.9, fontSize: 11, fontFace: "Courier New" });
  box(s, pres, 0.5, 4.15, 9, 0.8, K.amberT); T(s, "200 กิจกรรม × 20 คำขอต่อวินาที = 4,000 query ต่อวินาที → pool เต็ม คำขอต่อคิว p95 สูงหลายเท่า", { x: 0.75, y: 4.15, w: 8.5, h: 0.8, fontSize: 14, bold: true, valign: "middle" }); }

// 17 2 ทางแก้
{ const s = lightSlide(pres, S3, "แก้ N+1 ได้ 2 ทาง", "ให้เริ่มจากทางแรกแล้ววัดใหม่ ถ้าผ่านเป้าหมายก็ไม่ต้องย้ายกฎไป SQL การตัดสินใจเรื่องประสิทธิภาพควรมาจากตัวเลขที่วัดได้ ไม่ใช่จากการเดา");
  rowsTable(s, pres, [["ดึงรายการลงทะเบียนของทุกกิจกรรมด้วย query เดียว แล้วส่งให้ seatsLeft ใน src/domain", "กฎยังอยู่ที่เดียวตาม ADR-002", "ดึงข้อมูลมากกว่าที่ต้องใช้"], ["ให้ PostgreSQL นับด้วย COUNT(*) ... GROUP BY", "ดึงข้อมูลน้อยที่สุด", "วิธีนับที่นั่งไปอยู่ใน SQL กฎมี 2 ที่ต้องแก้พร้อมกัน"]], 0.5, 1.3, [3.8, 2.5, 2.7], 1.2, { head: ["ทาง", "ข้อดี", "ข้อเสีย"], fs: 12, fills: [K.greenT, K.paper] });
  box(s, pres, 0.5, 4.2, 9, 0.7, K.tealT); T(s, "เริ่มจากทางแรก → วัดใหม่ → ถ้าผ่านเป้าหมายไม่ต้องย้ายกฎไป SQL", { x: 0.75, y: 4.2, w: 8.5, h: 0.7, fontSize: 14, bold: true, valign: "middle" }); }

// 18 gate vs band
{ const s = lightSlide(pres, S4, "gate ขวางทันที band เฝ้าดู",
    "กฎ R6 เป็น gate เสมอ จองเกินแม้ 1 ที่ก็ผิดกฎ ไม่มีช่วงที่ยอมรับได้");
  rowsTable(s, pres, [["ตัวอย่าง", "จำนวนที่นั่งเกิน capacity = 0 · p95 < 500 ms", "p95 หน้ารายการกิจกรรมสูงกว่าค่าปกติของ CI"], ["ตัดสินอย่างไร", "ผ่านหรือไม่ตามค่าที่กำหนด", "เทียบกับค่าเฉลี่ยและส่วนเบี่ยงเบนมาตรฐาน (σ) ของผลที่ผ่านมา"], ["เมื่อเกิด", "CI ไม่ผ่าน merge ไม่ได้", "CI ยังผ่าน แต่บอกว่าต้องทำอะไรต่อ"], ["เหตุผล", "ละเมิดกฎหรือเป้าหมายแล้ว", "ยังไม่ผิด แต่กำลังเปลี่ยน รอจนเกินเป้าจะหา PR ต้นเหตุยาก"]], 0.5, 1.3, [1.6, 3.4, 4.0], 0.66, { head: ["", "gate", "band"], fs: 11, fills: [K.paper, K.paper, K.paper, K.paper] });
  box(s, pres, 0.5, 4.6, 9, 0.42, K.amberT); T(s, "R6 เป็น gate เสมอ ไม่มีช่วงที่ยอมรับได้", { x: 0.75, y: 4.6, w: 8.5, h: 0.42, fontSize: 13, bold: true, valign: "middle" }); }

// 19 ระดับ σ
{ const s = lightSlide(pres, S4, "ระดับ σ และผู้ที่ทำ",
    "playbook ใช้ bands.yaml กำหนดระดับตามระยะห่างจากค่าปกติ การตรวจว่าค่าออกนอกช่วงทำด้วย script ที่ทำงานแน่นอนทุกครั้ง ไม่ใช้ AI AI ถูกเรียกเฉพาะหลังค่าออกนอกช่วง และทำได้เท่าที่ระดับนั้นอนุญาต ใน playbook script เรียก AI เองอัตโนมัติ ในวิชานี้สมาชิกเป็นผู้สั่ง ตามหลักการเริ่มจากทำเองแล้วจึงเขียนเป็น code");
  rowsTable(s, pres, [["ต่ำกว่า 1σ", "ไม่ทำอะไร", "—"], ["1σ", "ค่าปรากฏในสรุปของ CI", "ไม่ต้องทำอะไร"], ["2σ", "สมาชิกสั่ง AI วิเคราะห์ตามคำสั่งใน AGENTS.md ห้ามแก้ไฟล์", "สมาชิกอ่านผลแล้วตัดสิน: แก้ รอดู หรือปรับ band"], ["3σ", "สมาชิกสั่ง AI วิเคราะห์และเปิด PR แก้ไข", "PR ผ่าน CI, AI review และอนุมัติตามปกติ"]], 0.5, 1.3, [1.3, 4.0, 3.7], 0.66, { head: ["ระดับ", "ในวิชานี้", "คนอยู่ในวงอย่างไร"], fs: 11, fills: [K.paper, K.tealT, K.amberT, K.redT] });
  T(s, "script ตรวจ · คนตัดสิน · AI ทำได้เท่าที่ระดับอนุญาต", { x: 0.5, y: 4.7, w: 9, h: 0.3, fontSize: 13, bold: true, color: K.teal }); }

// 20 baseline
{ const s = lightSlide(pres, S4, "baseline มาจากที่เดียวกับที่ตรวจ",
    "baseline ของ band ใน CI ต้องคำนวณจากผลของ CI ไม่ใช่จากเครื่องของสมาชิก lab ใช้ค่า p95 จาก CI 5 ครั้ง ซึ่ง ops/check-bands.mjs พิมพ์ไว้ในสรุปของทุก workflow 5 ครั้งน้อยเกินกว่าจะเป็นสถิติที่ดี แต่พอให้เห็นว่าค่าแกว่งเท่าใด เมื่อมีผลมากขึ้นให้คำนวณใหม่ ถ้า band แจ้งเตือนบ่อยโดยไม่มีปัญหาจริง ให้ปรับ band แทนการเพิกเฉย");
  flow(s, pres, [{ t: "p95 จาก CI 5 ครั้ง", sub: "check-bands.mjs พิมพ์ในสรุป" }, { t: "คำนวณ mean และ sd", sub: "บันทึกใน ops/bands.yaml", fill: K.tealT }, { t: "ครั้งถัด ๆ ไป", sub: "เทียบค่ากับ band" }], 0.5, 1.4, 9, 1.3, { gap: 0.3, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.1, 9, 1.8, K.paper); T(s, bullets(["คำนวณจาก CI ไม่ใช่เครื่องสมาชิก", "5 ครั้งน้อย แต่พอให้เห็นว่าค่าแกว่งเท่าใด", "band เตือนบ่อยโดยไม่มีปัญหาจริง: ปรับ band ไม่ใช่เพิกเฉย"]), { x: 0.75, y: 3.2, w: 8.5, h: 1.6, fontSize: 14 }); }

// 21 สรุป
{ const s = darkSlide(pres, S5, "สรุป 5 ข้อ ก่อนเข้าสู่ lab");
  T(s, "สรุป", { x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["load test ทำเฉพาะกับระบบตนเองในเครื่องหรือ CI และเทียบตัวเลขเฉพาะจากที่เดียวกัน", "function ใน domain ที่ถูกต้องยังผิดได้เมื่อข้อมูลล้าสมัย transaction อย่างเดียวไม่พอ ต้อง FOR UPDATE ในชั้น data", "ใช้ p95 อัตราคำขอคงที่ และ warm-up แล้วให้ threshold เป็นเงื่อนไขของ CI", "N+1 ไม่เห็นเมื่อข้อมูลน้อย แก้ด้วยการดึงครั้งเดียวและเก็บกฎไว้ใน domain", "gate ขวางสิ่งที่ผิดแล้ว band เตือนสิ่งที่กำลังเปลี่ยน script ตรวจ คนตัดสิน AI ทำได้เท่าที่ระดับอนุญาต"];
  r.forEach((t, i) => { const y = 1.15 + i * 0.78; chip(s, pres, 0.7, y + 0.08, i + 1, K.amber, K.ink, 0.4); T(s, t, { x: 1.3, y, w: 8.2, h: 0.65, fontSize: 13, color: K.white, valign: "middle" }); }); }

// 22-23 Glossary
const GL = [["race condition", "ผลผิดเมื่อหลายคำขอทำงานซ้อนกัน แต่ถูกเมื่อทำทีละคำขอ"], ["transaction", "กลุ่มคำสั่งฐานข้อมูลที่สำเร็จหรือล้มทั้งชุด"], ["row lock / FOR UPDATE", "จองแถวให้คำขอเดียวทำงานต่อได้จนกว่าจะปล่อย"],
  ["p95", "คำขอ 95% เร็วกว่าค่านี้ ใช้แทนค่าเฉลี่ย"], ["threshold", "เงื่อนไขของ k6 ที่ทำให้ exit ไม่ใช่ 0 เมื่อไม่ผ่าน"], ["arrival rate", "กำหนดคำขอต่อวินาทีคงที่ ไม่ใช่จำนวนผู้ใช้ที่วนส่ง"],
  ["warm-up", "ช่วงเริ่มระบบที่ไม่นับในผล"], ["N+1 query", "1 query หลัก + N query ต่อรายการ ช้าลงเมื่อข้อมูลเพิ่ม"], ["gate", "เงื่อนไขที่ขวาง CI ทันทีเมื่อไม่ผ่าน เช่น R6"],
  ["band", "ช่วงค่าปกติที่เฝ้าดู วัดเป็น σ จากผลที่ผ่านมา"], ["σ (sd)", "ส่วนเบี่ยงเบนมาตรฐาน บอกว่าค่าแกว่งจากค่าเฉลี่ยเท่าใด"], ["bands.yaml", "ไฟล์กำหนด band และระดับ 1σ 2σ 3σ พร้อมสิ่งที่ทำ"]];
[0, 6].forEach((k, n) => { const s = lightSlide(pres, S6, "Glossary (" + (n + 1) + "/2)", "ใช้ทบทวนคำศัพท์ของบทนี้");
  GL.slice(k, k + 6).forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.1, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.2, y, w: 4.0, h: 1.1, valign: "middle" }); }); });

// L1
{ const s = darkSlide(pres, S7, "เปลี่ยนจากบรรยายเป็นลงมือ load test ทั้งหมดยิงเฉพาะ docker compose ในเครื่องและใน CI ห้ามยิง Live URL");
  T(s, "Lab", { x: 0.7, y: 1.1, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "300 คนพร้อมกัน\nแล้ว R6 ยังถูกต้อง", { x: 0.7, y: 1.7, w: 8.6, h: 1.6, fontSize: 38, bold: true, color: K.white });
  T(s, "k6 ก่อนแก้ → row lock → N+1 → CI + band → break-it-live", { x: 0.7, y: 3.8, w: 8.6, h: 0.5, fontSize: 16, color: "B8C4D4" }); }

// L2
{ const s = lightSlide(pres, S7, "Brief ของ lab: ทำอะไรและได้อะไร", "งานกลุ่ม ใช้ repository เดิมจาก WS-06 ห้ามยิง Live URL");
  const c = [["รูปแบบ", "งานกลุ่ม ใช้ repository เดิมจาก WS-06"], ["เป้าหมาย", "ผู้ใช้ 300 คนลงทะเบียนพร้อมกัน ไม่จองเกิน capacity (R6) · หน้ารายการกิจกรรม p95 ไม่เกิน 500 ms เมื่อมี 200 กิจกรรม"], ["สิ่งที่ได้", "ทุก PR ตรวจทั้งสองเรื่องใน CI · ops/bands.yaml บอกว่าค่าใดปกติและเมื่อเปลี่ยนต้องทำอะไร"], ["ข้อห้าม", "load test ยิงเฉพาะ docker compose ในเครื่องและใน CI ห้ามยิง Live URL"]];
  c.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.65; box(s, pres, x, y, 4.4, 1.5, i === 3 ? K.redT : K.paper);
    T(s, v[0], { x: x + 0.25, y: y + 0.15, w: 3.9, h: 0.35, fontSize: 13, bold: true, color: K.teal }); T(s, v[1], { x: x + 0.25, y: y + 0.55, w: 3.9, h: 0.85, fontSize: 12 }); }); }

// L3
{ const s = lightSlide(pres, S7, "7 ขั้นตอนของ lab", "ทุกขั้นมี ทำ / ผลที่ควรเห็น / หากติดปัญหา");
  step7(s, [["1", "load test ของ R6 ก่อนแก้", "k6 ใน compose · เห็น confirmed เกิน 50"], ["2", "แก้ R6 ด้วย row lock ในชั้น data", "ไม่แก้ domain · integration test พร้อมกัน"], ["3", "วัดและแก้หน้ารายการกิจกรรม", "200 กิจกรรม · N+1 → 2 query"], ["4", "load test ใน CI และ script ของ band", "job e2e · bands.mjs · check-bands.mjs"], ["5", "ตั้ง baseline และขั้นตอนเมื่อค่าออกนอกช่วง", "p95 จาก CI 5 ครั้ง · AGENTS.md"], ["6", "เตรียม PR break-it-live", "ลบ FOR UPDATE · เปิดค้างไว้"], ["7", "บันทึกหลักฐาน", "ก่อน/หลังแก้ · band · confirmed ใน log"]]); }

// L4 repo
{ const s = lightSlide(pres, S7, "repository ที่จะได้เมื่อจบบทนี้", "ชื่อไฟล์ใน src/ เป็นตัวอย่าง ให้ใช้ตาม plan.md ของกลุ่ม");
  codeBox(s, pres, 0.5, 1.3, 5.8, 3.65, ["compose.yaml ← 1 (service k6)", "load/setup.sql · r6.js ← 1", "load/events.js ← 3", "ops/bands.yaml ← 4, 5", "ops/bands.mjs · bands.test.ts ← 4", "ops/check-bands.mjs ← 4", "docs/features/02-register/plan.md ← 2 (R6)", "src/data/... ← 2 lock · 3 ดึงครั้งเดียว", "src/data/*.db.test.ts ← 2 ลงทะเบียนพร้อมกัน", "src/app/events/page.tsx ← 3", "evidence/ws-07.md ← 7", ".github/workflows/ci.yml ← 4 (load test)"], 11);
  side(s, [["gate", "R6 และ p95 < 500 ms ขวาง CI", K.redT], ["band", "ops/bands.yaml · เฝ้าดูค่าที่เปลี่ยน", K.amberT], ["ห้ามเปลี่ยน", "src/domain/", K.paper]]); }

// L5 step 1-2
{ const s = lightSlide(pres, S7, "ขั้นที่ 1–2: เห็นปัญหาก่อน แล้วแก้ด้วย lock",
    "ขั้น 1 ใช้ k6 ใน compose (user: root) รัน load/setup.sql แล้ว docker compose run --rm k6 run /load/r6.js ผู้ใช้ 300 คน กิจกรรม 50 ที่นั่ง ผลมักมี confirmed มากกว่า 50 หลายเท่า ขั้น 2 เพิ่ม transaction และ FOR UPDATE ในชั้น data เขียน integration test ที่ลงทะเบียนพร้อมกัน ห้ามแก้ src/domain ใช้ lock เดียวกับการยกเลิก");
  box(s, pres, 0.5, 1.3, 4.4, 3.65, K.redT); T(s, "ขั้น 1: ก่อนแก้", { x: 0.75, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: K.red });
  T(s, bullets(["รัน load/setup.sql", "docker compose run --rm k6 run /load/r6.js", "300 คน · 50 ที่นั่ง", "log: confirmed มากกว่า 50 หลายเท่า", "จดค่า 3 ครั้ง"]), { x: 0.75, y: 1.9, w: 3.9, h: 2.9, fontSize: 12 });
  box(s, pres, 5.1, 1.3, 4.4, 3.65, K.greenT); T(s, "ขั้น 2: แก้ด้วย row lock", { x: 5.35, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: K.green });
  T(s, bullets(["transaction + FOR UPDATE ในชั้น data", "ไม่แก้ src/domain", "integration test: ลงทะเบียนพร้อมกัน ได้ CONFIRMED เท่า capacity", "การยกเลิกใช้ lock เดียวกัน", "รัน k6 ซ้ำ: confirmed 50"]), { x: 5.35, y: 1.9, w: 3.9, h: 2.9, fontSize: 12 }); }

// L6 step 3
{ const s = lightSlide(pres, S7, "ขั้นที่ 3: วัดและแก้หน้ารายการกิจกรรม",
    "เตรียมข้อมูล 200 กิจกรรมในเครื่อง วัด query ต่อ 1 คำขอและ p95 ก่อนแก้ 3 ครั้ง ด้วย load/events.js แก้ N+1 ด้วยการดึงรายการลงทะเบียนของทุกกิจกรรมด้วย query เดียว WHERE event_id = ANY($1) ส่งให้ seatsLeft ใน domain แล้ววัดใหม่ 3 ครั้ง");
  flow(s, pres, [{ t: "เตรียม 200 กิจกรรม", sub: "ในเครื่อง" }, { t: "วัดก่อนแก้ 3 ครั้ง", sub: "query ต่อคำขอ · p95", fill: K.redT }, { t: "ดึงครั้งเดียว", sub: "WHERE event_id = ANY($1)", fill: K.tealT }, { t: "วัดหลังแก้ 3 ครั้ง", sub: "p95 < 500 ms", fill: K.greenT }], 0.5, 1.5, 9, 1.4, { gap: 0.25, fs: 12, sfs: 10 });
  box(s, pres, 0.5, 3.3, 9, 1.6, K.paper); T(s, "ถ้าผ่านเป้าหมาย ไม่ต้องย้ายกฎไป SQL — เก็บ seatsLeft ไว้ใน src/domain", { x: 0.75, y: 3.3, w: 8.5, h: 1.6, fontSize: 16, bold: true, valign: "middle" }); }

// L7 step 4-5
{ const s = lightSlide(pres, S7, "ขั้นที่ 4–5: load test ใน CI และ band",
    "ขั้น 4 เพิ่ม load test ใน job e2e: r6.js และ events.js ใน CI สร้าง ops/bands.mjs (คำนวณระดับ σ), check-bands.mjs (พิมพ์ตารางในสรุปของ workflow) และ bands.test.ts vitest include ต้องเพิ่ม ops ขั้น 5 ตั้ง baseline จากค่า p95 ของ CI 5 ครั้ง ลงใน bands.yaml และเพิ่มขั้นตอนเมื่อ band แจ้งเตือนใน AGENTS.md");
  rowsTable(s, pres, [["ci.yml", "ใน job e2e: k6 r6.js (gate) และ events.js (threshold p95)"], ["ops/bands.mjs · check-bands.mjs", "คำนวณระดับ σ · พิมพ์ตาราง band ในสรุปของ workflow"], ["ops/bands.test.ts", "ทดสอบการคำนวณ (vitest include ต้องเพิ่ม ops)"], ["ops/bands.yaml · AGENTS.md", "baseline จาก CI 5 ครั้ง · ขั้นตอนเมื่อ 2σ และ 3σ"]], 0.5, 1.3, [3.2, 5.8], 0.75, { fs: 12, fills: [K.tealT, K.paper, K.paper, K.amberT] }); }

// L8 break
{ const s = lightSlide(pres, S7, "ขั้นที่ 6: break-it-live ลบ FOR UPDATE",
    "ลบเฉพาะคำว่า FOR UPDATE ออกจาก query ที่จองแถวกิจกรรม โดยเก็บ transaction ไว้ เปิด PR ทิ้งไว้ถึงคาบ demo แล้วปิดโดยไม่ merge ถ้า job build ไม่ผ่านก่อน เพราะ integration test จับได้ก่อน ถือเป็นเรื่องดี ถ้า k6 ยังได้ confirmed 50 race ไม่ได้เกิดทุกครั้ง กด Re-run jobs และตรวจว่าลบใน query ที่ใช้จริง");
  flow(s, pres, [{ t: "branch", sub: "demo/no-lock" }, { t: "ลบ FOR UPDATE", sub: "เก็บ transaction ไว้" }, { t: "เปิด PR", sub: "job e2e แดงที่ k6 r6.js", fill: K.redT }, { t: "log: confirmed > 50", sub: "ปุ่ม merge กดไม่ได้", fill: K.amberT }], 0.5, 1.5, 9, 1.4, { gap: 0.25, fs: 12, sfs: 10 });
  rowsTable(s, pres, [["build แดงก่อน", "integration test จับได้ก่อน ดี บันทึกไว้ ยังใช้ PR นี้ได้"], ["k6 ยังได้ confirmed 50", "race ไม่เกิดทุกครั้ง กด Re-run jobs · ตรวจว่าลบใน query ที่ใช้จริง"]], 0.5, 3.3, [3.0, 6.0], 0.7, { fills: [K.amberT, K.amberT], fs: 12 }); }

// L9 evidence
{ const s = lightSlide(pres, S7, "หลักฐานใน evidence/ws-07.md", "ถ้าไม่ได้จดค่าก่อนแก้ ให้ git switch --detach commit ก่อนแก้ แล้ววัดใหม่");
  rowsTable(s, pres, [["R6", "คาดการณ์ · ก่อนแก้ 3 ครั้ง (confirmed, p95) · หลังแก้ 3 ครั้ง · integration test ก่อนแก้ · PR"], ["หน้ารายการกิจกรรม (200 กิจกรรม)", "query ต่อคำขอ ก่อน/หลัง · p95 ก่อน/หลัง 3 ครั้ง · PR"], ["Band", "p95 จาก CI 5 ครั้ง · ลิงก์ workflow · mean และ sd"], ["Break-it-live", "ลิงก์ PR · job ที่ไม่ผ่าน · confirmed ใน log"]], 0.5, 1.3, [3.4, 5.6], 0.85, { fs: 12, fills: [K.paper, K.paper, K.paper, K.amberT] }); }

// L10 present
{ const s = lightSlide(pres, S7, "การวัดผล: Present 7 ขั้นตอน", "เวลา 5 นาทีต่อกลุ่ม ขั้น 3 ผู้ตรวจถามเหตุผล ไม่มีการให้คะแนน");
  const r = [["รัน load/setup.sql แล้ว k6 r6.js ในเครื่อง", "log แสดง confirmed 50 และ threshold ทุกข้อผ่าน"], ["เปิด PR break-it-live (ลบ FOR UPDATE) ที่ยังเปิดอยู่", "job e2e แดงที่ k6 r6.js และปุ่ม merge กดไม่ได้"], ["ผู้ตรวจถามว่าทำไม transaction อย่างเดียวไม่พอ", "2 คำขออ่านที่นั่งชุดเดียวกันได้ จนกว่าจะจองแถว"], ["เปิด Files changed ของ PR ที่แก้ R6", "ไม่มีไฟล์ใน src/domain/ และมี integration test พร้อมกัน"], ["รัน k6 /load/events.js ในเครื่อง", "threshold p(95)<500 ผ่าน"], ["เปิดสรุป workflow ล่าสุดบน main อ่านตาราง band", "บอกระดับของค่า และถ้า 2σ ต้องทำอะไรตาม AGENTS.md"], ["รัน node ops/check-bands.mjs ด้วยค่า p95 จาก CI 5 ค่า", "mean และ sd ตรงกับใน ops/bands.yaml"]];
  T(s, "ขั้นตอน", { x: 1.05, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute }); T(s, "เกณฑ์ผ่าน", { x: 5.3, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  r.forEach((v, i) => { const y = 1.48 + i * 0.5; box(s, pres, 0.5, y, 9, 0.46, i % 2 ? K.white : K.paper); chip(s, pres, 0.55, y + 0.04, i + 1, K.teal, K.white, 0.38);
    T(s, v[0], { x: 1.05, y, w: 4.15, h: 0.46, fontSize: 10, valign: "middle", bold: true }); T(s, v[1], { x: 5.3, y, w: 4.1, h: 0.46, fontSize: 11, valign: "middle" }); }); }

// L11 Retro
{ const s = lightSlide(pres, S7, "Retro: ปรึกษากันแล้วบันทึกท้าย evidence", "ข้อ 3 แยกตัววัดที่ควรเป็น gate ออกจากที่ควรเป็น band");
  const q = ["การคาดการณ์ใน 0-Before ต่างจากผลจริงเท่าใด และเหตุใด", "lock ทำให้คำขอลงทะเบียนช้าลงเท่าใด ยอมรับได้หรือไม่ ถ้าไม่ได้จะเลือกทางใดจากตาราง", "ตัววัดใดอีกที่ควรมี band และตัววัดใดควรเป็น gate แทน"];
  q.forEach((t, i) => { const y = 1.4 + i * 1.15; box(s, pres, 0.5, y, 9, 1.0, K.paper); chip(s, pres, 0.75, y + 0.29, i + 1); T(s, t, { x: 1.4, y, w: 7.9, h: 1.0, fontSize: 16, valign: "middle" }); }); }

L.save(pres, "ws-07-perf.pptx").then(() => console.log("saved"));
