const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref, codeBox, rowsTable, goodBad } = L;
const S0 = "เปิดคาบ", S1 = "ความปลอดภัยคือคุณภาพ", S2 = "Broken access control", S3 = "3 วิธีตรวจความปลอดภัย", S4 = "SKILL.md", S5 = "LESSONS.md", S6 = "สรุป", S7 = "Glossary", S8 = "Lab และการวัดผล";
const pres = L.newDeck("WS-08 Quality Loop", [S0, S1, S2, S3, S4, S5, S6, S7, S8]);
const bullets = (a) => a.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 } }));
const numbered = (s, items, y0 = 1.3, h = 0.62, fs = 14) => items.forEach((t, i) => { const y = y0 + i * (h + 0.1); box(s, pres, 0.5, y, 9, h, K.paper); chip(s, pres, 0.65, y + (h - 0.42) / 2, i + 1, K.teal, K.white, 0.42); T(s, t, { x: 1.3, y, w: 8, h, fontSize: fs, valign: "middle" }); });
const step7 = (s, st) => { st.forEach((v, i) => { const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4, x = 0.5 + col * 4.6, y = 1.3 + row * 0.9;
    box(s, pres, x, y, 4.4, 0.8, i === 6 ? K.amberT : K.paper); chip(s, pres, x + 0.15, y + 0.19, v[0], i === 6 ? K.amber : K.teal, i === 6 ? K.ink : K.white);
    T(s, [{ text: v[1], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[2], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.75, y, w: 3.55, h: 0.8, valign: "middle" }); });
  box(s, pres, 5.1, 4.0, 4.4, 0.8, K.ink); T(s, "แต่ละขั้น: ทำ → ผลที่ควรเห็น → หากติดปัญหา", { x: 5.25, y: 4.0, w: 4.1, h: 0.8, fontSize: 13, color: K.white, valign: "middle" }); };
const side = (s, items, x = 6.3, w = 3.2) => items.forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, x, y, w, 1.15, v[2] || K.paper);
  T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.15, y, w: w - 0.3, h: 1.15, valign: "middle" }); });

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดคาบ บทสุดท้าย ปิดวงจรของทั้งวิชาด้วยการตรวจความปลอดภัยที่รันซ้ำได้ และบันทึกบทเรียนที่ผูกกับสิ่งที่ป้องกัน");
  T(s, "WS-08", { x: 0.7, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "Quality Loop", { x: 0.7, y: 1.8, w: 8.6, h: 1.0, fontSize: 40, bold: true, color: K.white });
  T(s, [{ text: "Rathachai Chawuthai", options: { bold: true, fontSize: 18, color: K.white, breakLine: true } }, { text: "Computer Engineering, KMITL", options: { fontSize: 14, color: "B8C4D4" } }], { x: 0.7, y: 3.55, w: 8.6, h: 0.75 });
  T(s, "SDPX-AI · Software Development Process in Practice — AI-Assisted", { x: 0.7, y: 4.5, w: 8.6, h: 0.4, fontSize: 14, color: "B8C4D4" }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "เมื่อจบคาบ นักศึกษาควรทำได้", "อ่านวัตถุประสงค์ทั้ง 4 ข้อ");
  const it = ["ระบุความเสี่ยงใน OWASP Top 10:2025 ที่เกี่ยวกับระบบ และบทที่เพิ่มสิ่งป้องกันแต่ละข้อ", "เขียน test พิสูจน์ว่าผู้ใช้เข้าถึงข้อมูลของผู้อื่นไม่ได้ ทั้งผู้เข้าร่วมและผู้จัด", "แยกว่าเครื่องมืออัตโนมัติ AI security review และ test จับปัญหาคนละแบบอย่างไร", "เขียน SKILL.md สำหรับงานซ้ำ และ LESSONS.md ที่ผูกทุกบทเรียนกับสิ่งที่ป้องกันซ้ำ"];
  it.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.75; box(s, pres, x, y, 4.4, 1.55, K.paper); chip(s, pres, x + 0.2, y + 0.2, i + 1);
    T(s, t, { x: x + 0.8, y: y + 0.2, w: 3.4, h: 1.2, fontSize: 13 }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "กลุ่มส่วนใหญ่ตอบได้เพียงว่าลองแล้วไม่ได้ ซึ่งเป็นการตรวจครั้งเดียว ไม่ใช่สิ่งที่ตรวจซ้ำทุก PR บทนี้เปลี่ยนการลองครั้งเดียวให้เป็น test เครื่องมือใน CI และขั้นตอนที่ทำซ้ำได้ ใช้ผลการโจมตีในส่วน C ของ 0-Before ประกอบ");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "ผู้เข้าร่วมต้องดูหรือยกเลิกการลงทะเบียน\nของผู้อื่นไม่ได้ (PROJECT.md หัวข้อ 8)\nกลุ่มพิสูจน์ข้อนี้ได้อย่างไรตอนนี้", { x: 0.7, y: 1.5, w: 8.6, h: 2.4, fontSize: 28, bold: true, color: K.white });
  T(s, "ถ้าพรุ่งนี้มีคนแก้ code จนไม่เป็นจริง อะไรจะเตือน", { x: 0.7, y: 4.0, w: 8.6, h: 0.6, fontSize: 20, color: K.amber }); }

// 4 OWASP table (7 rows)
{ const s = lightSlide(pres, S1, "OWASP Top 10:2025 กับระบบของกลุ่ม",
    "OWASP Top 10:2025 ยังจัดให้ broken access control อยู่อันดับ 1 เหมือนฉบับก่อน ตารางแสดงเฉพาะข้อที่เกี่ยวกับระบบของกลุ่ม อ้างอิง owasp.org/Top10/2025");
  rowsTable(s, pres, [["A01", "Broken Access Control", "ผู้จัดดูรายชื่อกิจกรรมของผู้อื่น", "WS-06 session · access test (บทนี้)"], ["A02", "Security Misconfiguration", "error ตอบพร้อม stack trace", "REVIEW.md (WS-04) · security review"], ["A03", "Supply Chain Failures", "package หรือ workflow ถูกโจมตี", "สิทธิ์ CI (WS-04) · npm audit, Dependabot"], ["A04", "Cryptographic Failures", "รหัส session เดาได้", "รหัสสุ่ม 32 byte · cookie Secure (WS-06)"], ["A05", "Injection", "ต่อข้อความเป็น SQL", "query มี parameter (WS-05) · CodeQL"], ["A07", "Authentication Failures", "cookie เดิมใช้ได้หลังออกจากระบบ", "ลบ session (WS-06) · access test"], ["A10", "Exceptional Conditions", "500 พร้อมข้อความภายในเมื่อ body ผิดรูปแบบ", "ตรวจ input · test กรณีผิดรูปแบบ (บทนี้)"]], 0.5, 1.2, [0.7, 2.2, 3.0, 3.1], 0.4, { head: ["รหัส", "ความเสี่ยง", "ตัวอย่างในระบบนี้", "สิ่งที่ป้องกัน และบทที่เพิ่ม"], fs: 10, noBold: false });
  ref(s, "อ้างอิง: OWASP Top 10:2025"); }

// 5 Veracode
caseSlide(pres, S1, { title: "กรณีจริง: code ที่ AI เขียนเกือบครึ่งไม่ผ่าน", tag: "Veracode · 2025 GenAI Code Security Report · กรกฎาคม 2025",
  notes: "Veracode ให้ language model มากกว่า 100 ตัวเขียน code ใน Java, Python, C# และ JavaScript แล้วตรวจความปลอดภัย พบว่า 45% ของตัวอย่างมีช่องโหว่ในกลุ่ม OWASP Top 10 ในงานที่ต้องป้องกัน cross-site scripting AI ไม่ป้องกันใน 86% ของตัวอย่าง และ Java ไม่ผ่าน 72% ความปลอดภัยไม่ได้ดีขึ้นตามขนาดหรือความใหม่ของ model",
  facts: ["ให้ model มากกว่า 100 ตัวเขียน code ใน Java, Python, C#, JavaScript", "45% ของตัวอย่างมีช่องโหว่ในกลุ่ม OWASP Top 10", "งานป้องกัน cross-site scripting: ไม่ป้องกันใน 86% · Java ไม่ผ่าน 72%", "ความปลอดภัยไม่ได้ดีขึ้นตามขนาดหรือความใหม่ของ model"],
  principle: "บทเรียน", takeaway: "code ที่ทำงานได้ไม่ได้แปลว่าปลอดภัย และการเปลี่ยนไปใช้ model ที่ใหม่กว่าไม่ได้แก้ปัญหานี้",
  refs: "อ้างอิง: Veracode — 2025 GenAI Code Security Report" });

// 6 ตัววัด
{ const s = lightSlide(pres, S1, "ตัววัดของ loop นี้", "ใช้เกณฑ์ latency, fidelity, coverage จาก WS-01");
  rowsTable(s, pres, [["Latency", "access test และเครื่องมือตรวจอัตโนมัติรันในทุก PR"], ["Fidelity", "access test ไม่ผ่านทันทีเมื่อลบการตรวจสิทธิ์ข้อใดข้อหนึ่ง"], ["Coverage", "ทุกข้อใน security checklist มีหลักฐานว่าตรวจด้วยอะไร"]], 0.5, 1.3, [2.0, 7.0], 1.0, { fs: 14, fills: [K.paper, K.tealT, K.paper] }); }

// 7 authN vs authZ
{ const s = lightSlide(pres, S2, "authentication ไม่ใช่ authorization",
    "WS-06 ทำให้ server รู้ว่าคำขอมาจากใคร คือ authentication แต่ทุกคำขอต้องตอบอีก 2 คำถาม คำถามที่ 2 คือที่มาของ IDOR ซึ่งตรวจยากที่สุด เพราะ code ที่ตรวจเฉพาะบทบาทดูถูกต้องเมื่ออ่าน และทุก test ที่ใช้ผู้จัดคนเดียวก็ผ่าน seed data ส่วนใหญ่มีผู้จัดคนเดียว test ของข้อนี้จึงต้องสร้างผู้จัดคนที่ 2 เอง");
  flow(s, pres, [{ t: "รู้ว่าเป็นใคร", sub: "authentication (WS-06)", fill: K.greenT }, { t: "ทำสิ่งนี้ได้หรือไม่", sub: "ตรวจบทบาท", fill: K.amberT }, { t: "ข้อมูลนี้เป็นของเขาหรือไม่", sub: "ตรวจความเป็นเจ้าของ (IDOR)", fill: K.amberT }], 0.5, 1.4, 9, 1.2, { gap: 0.3, fs: 13, sfs: 11 });
  rowsTable(s, pres, [["ผู้เข้าร่วมสร้างกิจกรรมได้หรือไม่", "ไม่ตรวจ: เรียก API ตรงก็สร้างได้"], ["กิจกรรมนี้ผู้จัดคนนี้สร้างหรือไม่", "ไม่ตรวจ: ผู้จัดคนใดก็ดูรายชื่อของทุกกิจกรรม"]], 0.5, 3.0, [3.6, 5.4], 0.8, { fills: [K.redT, K.redT], fs: 13 });
  T(s, "test ของข้อ 2 ต้องสร้างผู้จัดคนที่ 2 เอง", { x: 0.5, y: 4.75, w: 9, h: 0.25, fontSize: 12, bold: true, color: K.teal }); }

// 8 Base44
caseSlide(pres, S2, { title: "กรณีจริง: id ที่เปิดเผยไม่ใช่ความลับ", tag: "Base44 (Wix) · Wiz Research · กรกฎาคม 2025",
  notes: "Wiz Research พบช่องโหว่ใน Base44 บริการสร้างแอปด้วย AI ของ Wix endpoint สำหรับสมัครและยืนยันบัญชีของแอปส่วนตัวไม่ต้องยืนยันตัวตนใด ๆ ต้องการเพียง app_id ซึ่งเห็นได้ใน URL ของแอป ผู้ใดก็สร้างบัญชีที่ยืนยันแล้วในแอปส่วนตัวขององค์กรอื่นได้ รวมถึงแอปที่ใช้ SSO Wix แก้ภายใน 24 ชั่วโมงและไม่พบหลักฐานว่าถูกใช้โจมตี",
  facts: ["endpoint สมัครและยืนยันบัญชีของแอปส่วนตัว ไม่ต้องยืนยันตัวตนใด ๆ", "ต้องการเพียง app_id ซึ่งเห็นได้ใน URL ของแอป", "ผู้ใดก็สร้างบัญชีที่ยืนยันแล้วในแอปส่วนตัวขององค์กรอื่นได้ รวมถึงแอปที่ใช้ SSO", "Wix แก้ภายใน 24 ชั่วโมง ไม่พบหลักฐานว่าถูกใช้โจมตี"],
  principle: "บทเรียน", takeaway: "id ที่เปิดเผยไม่ใช่ความลับ server ต้องตรวจสิทธิ์ทุกครั้ง แม้คำขอจะมี id ที่ถูกต้อง",
  refs: "อ้างอิง: Infosecurity Magazine — Critical Authentication Flaw in Base44 · The Hacker News" });

// 9 หลักการ
{ const s = lightSlide(pres, S2, "หลักการตรวจสิทธิ์และเจ้าของข้อมูล", "ตัวอย่างใช้ feature แจ้งเตือนซึ่งอยู่นอกขอบเขต สมมติมี GET /api/notifications/[id] ให้ผู้ใช้อ่านการแจ้งเตือนของตน");
  numbered(s, ["หาผู้ใช้จาก session แล้วตรวจทั้งบทบาทและความเป็นเจ้าของ ก่อนอ่านหรือแก้", "กรองด้วยเจ้าของใน query เอง: WHERE id = $1 AND user_id = $2", "ข้อมูลที่ไม่ใช่ของผู้ใช้ ตอบเหมือนไม่มีอยู่ (404) หรือ 403 ตาม spec ให้เหมือนกันทั้งระบบ", "test ใช้ผู้ใช้อย่างน้อย 2 คน และตรวจว่าคนหนึ่งเข้าถึงของอีกคนไม่ได้"], 1.3, 0.75, 14); }

// 10 ดี/ไม่ดี
goodBad(pres, S2, "ตัวอย่าง route handler: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดีตรวจเพียงว่ามี session query ไม่กรองด้วยเจ้าของ ผู้ใช้ทุกคนอ่านการแจ้งเตือนของทุกคนได้เพียงเปลี่ยน id ตัวอย่างที่ดีกรองด้วยเจ้าของใน query ข้อมูลของผู้อื่นจึงไม่เคยถูกโหลดขึ้นมา",
  ["const user = await currentUser();", "if (!user) return 401;", "const { id } = await ctx.params;", "return Response.json(", "  await findNotification(id)", "); // WHERE id = $1", "", "// ตรวจแค่ว่ามี session"],
  ["const user = await currentUser();", "if (!user) return 401;", "const { id } = await ctx.params;", "const n = await", "  findNotificationOfUser(", "    id, user.id);", "// WHERE id = $1 AND user_id = $2", "if (!n) return 404;", "return Response.json(n);"], 11);

// 11 access test + ปัญหา
{ const s = lightSlide(pres, S2, "access test: ใช้ผู้ใช้ 2 คน", "ตัวอย่าง access test: alice ขอการแจ้งเตือนของ bob ต้องได้ 404 test ที่มีผู้ใช้คนเดียวผ่านเสมอ เพราะไม่มีข้อมูลของผู้อื่นให้ลองเข้าถึง");
  codeBox(s, pres, 0.5, 1.3, 5.2, 2.3, ['test("ผู้ใช้อ่านการแจ้งเตือนของผู้อื่นไม่ได้",', "  async ({ playwright }) => {", '  const b = await createNotification("u-b");', "  const alice = await newContext();", '  await loginApi(alice, "u-a");', "  expect((await alice.get(`/api/notifications/${b}`))", "    .status()).toBe(404);", "});"], 10);
  [["ตรวจเพียงว่ามี session", "ทุกคนอ่านของทุกคนได้เพียงเปลี่ยน id"], ["query ไม่กรองด้วยเจ้าของ", "ข้อมูลผู้อื่นถูกโหลดแล้ว"], ["test ผู้ใช้คนเดียว", "ผ่านเสมอ ไม่มีของผู้อื่นให้ลอง"]].forEach((v, i) => { const y = 1.3 + i * 0.8; box(s, pres, 5.9, y, 3.6, 0.7, K.redT);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 11, breakLine: true } }, { text: v[1], options: { fontSize: 10 } }], { x: 6.05, y, w: 3.3, h: 0.7, valign: "middle" }); });
  box(s, pres, 0.5, 3.85, 9, 1.0, K.amberT); T(s, "access test ใช้ผู้ใช้ 2 คนเสมอ — สร้างผู้จัดคนที่ 2 เอง เพราะ seed ส่วนใหญ่มีผู้จัดคนเดียว", { x: 0.75, y: 3.85, w: 8.5, h: 1.0, fontSize: 15, bold: true, valign: "middle" }); }

// 12 3 วิธี
{ const s = lightSlide(pres, S3, "3 วิธีตรวจความปลอดภัยเสริมกัน",
    "ข้อค้นพบของ AI security review ที่ถูกต้องควรกลายเป็น access test เพื่อให้ปัญหาเดิมถูกจับทุก PR โดยไม่ต้องพึ่ง AI อีก ข้อค้นพบของเครื่องมือที่ไม่ใช่ปัญหาจริง ให้ปิดพร้อมเหตุผลในหน้าของเครื่องมือนั้น ไม่ปล่อยค้างจนทุกคนเลิกอ่าน CodeQL ใช้ได้ฟรีกับ repository แบบ public ผ่าน default setup ผลแสดงในแท็บ Security");
  rowsTable(s, pres, [["ตัวอย่าง", "CodeQL, npm audit, Dependabot, no-secrets", "AI ที่ทำตาม SKILL.md ของ security review", "e2e/access.spec.ts"], ["ทำงานเมื่อใด", "ทุก PR และเมื่อมีช่องโหว่ใหม่ของ package", "เมื่อสมาชิกสั่ง ก่อนส่งงาน หรือเพิ่ม endpoint", "ทุก PR"], ["จับได้ดี", "รูปแบบที่รู้จัก: SQL ต่อข้อความ package มีช่องโหว่ ความลับใน code", "ปัญหาที่ต้องเข้าใจความหมาย เช่น endpoint ลืมตรวจเจ้าของ", "กรณีที่เขียนไว้ ว่ายังถูกทุกครั้ง"], ["จับไม่ได้", "กฎของระบบ เช่น ผู้จัดต้องเป็นเจ้าของกิจกรรม", "สิ่งที่ไม่ได้อ่าน และอาจรายงานปัญหาที่ไม่มีจริง", "กรณีที่ไม่มีใครคิดจะเขียน"]], 0.5, 1.3, [1.3, 2.7, 2.9, 2.1], 0.74, { head: ["", "เครื่องมืออัตโนมัติ", "AI security review", "access test"], fs: 10, fills: [K.paper, K.paper, K.greenT, K.redT] });
  T(s, "ข้อค้นพบที่ถูกต้องของ AI ควรกลายเป็น access test", { x: 0.5, y: 4.78, w: 9, h: 0.25, fontSize: 12, bold: true, color: K.teal }); }

// 13 skill vs agents vs guard
{ const s = lightSlide(pres, S4, "skill ต่างจาก AGENTS.md และ guard อย่างไร",
    "playbook อธิบายว่า skill เป็นการควบคุมแบบคำแนะนำ ส่วน hook เป็นชั้นที่แน่นอนอยู่ด้านหลัง skill ทำให้การฝ่าฝืนเกิดได้ยาก hook ทำให้แทบเป็นไปไม่ได้ skill เหมาะกับงานที่ต้องใช้วิจารณญาณแต่ทำด้วยขั้นตอนเดิมทุกครั้ง เช่น security review");
  rowsTable(s, pres, [["ใช้เมื่อใด", "AI อ่านทุกครั้งที่เริ่มงาน", "AI โหลดเมื่องานตรงกับ description หรือสมาชิกสั่ง", "ทำงานอัตโนมัติก่อนคำสั่งหรือก่อน merge"], ["เนื้อหา", "กติกาสั้น ๆ ใช้กับทุกงาน", "ขั้นตอนละเอียดของงานเรื่องเดียว", "script ที่ขวาง"], ["ความแน่นอน", "คำแนะนำ", "คำแนะนำ", "แน่นอนทุกครั้ง"], ["ตัวอย่าง", "ห้ามรับ user id จาก body", "ขั้นตอน security review ทั้งระบบ", "protect-db.mjs"]], 0.5, 1.3, [1.4, 2.4, 2.8, 2.4], 0.78, { head: ["", "AGENTS.md", "skill", "guard"], fs: 11, fills: [K.paper, K.paper, K.amberT, K.paper] }); }

// 14 รูปแบบ skill
{ const s = lightSlide(pres, S4, "รูปแบบ Agent Skills",
    "skill เป็นโฟลเดอร์ที่มี SKILL.md ตามรูปแบบ Agent Skills ส่วนบนเป็น YAML มี name และ description agent อ่านเฉพาะส่วนนี้ตอนเริ่มงาน และโหลดทั้งหมดเมื่อตัดสินว่างานตรงกับ description วิชานี้เก็บที่ .agents/skills/[ชื่อ]/SKILL.md บาง agent อ่านจากโฟลเดอร์ของตนเอง เช่น Claude Code อ่านจาก .claude/skills/ อ้างอิง agentskills.io/specification");
  numbered(s, ["name ใช้ตัวพิมพ์เล็ก ตัวเลข ขีดกลาง และตรงกับชื่อโฟลเดอร์", "description บอกทั้งว่า skill ทำอะไร และใช้เมื่อใด", "เนื้อหาเป็นขั้นตอนที่ตรวจได้: อ่านอะไร ทำอะไร รายงานอย่างไร", "อ้างถึงไฟล์ของกลุ่ม (checklist, REVIEW.md) แทนการเขียนซ้ำ", "บอกสิ่งที่ห้ามทำ เช่น ห้ามแก้ไฟล์ระหว่าง review"], 1.25, 0.58, 13); ref(s, "อ้างอิง: Agent Skills — Specification"); }

// 15 skill ดี/ไม่ดี
goodBad(pres, S4, "ตัวอย่าง SKILL.md: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างเป็น skill สำหรับเพิ่ม endpoint ใหม่ ตัวอย่างที่ไม่ดี name มีตัวพิมพ์ใหญ่และช่องว่าง description ไม่บอกว่าใช้เมื่อใด และเนื้อหาไม่มีขั้นตอนที่ตรวจได้ ตัวอย่างที่ดีมี name ถูกรูปแบบ description บอกทั้งทำอะไรและใช้เมื่อใด และมี test ที่ใช้ผู้ใช้ 2 คน",
  ["---", "name: Security Helper", "description: Helps with security.", "---", "", "Make sure the endpoint is", "secure and follows best", "practices."],
  ["---", "name: add-endpoint", "description: Steps for adding or", "  changing an API route handler,", "  incl. access checks and tests.", "  Use when editing src/app/api/.", "---", "1 spec.md: find 401/403/404", "2 openapi.yaml first, then lint", "3 tests first: no session 401,", "  wrong role 403, 2 users", "4 user only from current-user.ts", "5 run npm test, test:db, e2e"], 10);

// 16 ปัญหา skill
{ const s = lightSlide(pres, S4, "SKILL.md ที่ไม่ดีมีปัญหาอะไร", "ข้อสุดท้ายคือสาเหตุที่ปัญหาแบบ IDOR ผ่านไปได้");
  rowsTable(s, pres, [["name มีตัวพิมพ์ใหญ่และช่องว่าง", "ผิดรูปแบบ agent บางตัวไม่โหลด skill นี้"], ["description ไม่บอกว่าใช้เมื่อใด", "agent ไม่รู้ว่าควรโหลดเมื่อแก้ route handler"], ["“secure” และ “best practices”", "ไม่มีขั้นตอนที่ตรวจได้ ได้ผลต่างกันทุกครั้ง"], ["ไม่มี test ที่ใช้ผู้ใช้ 2 คน", "ปัญหาแบบ IDOR ผ่านไปได้"]], 0.5, 1.3, [3.4, 5.6], 0.8, { fills: [K.redT, K.redT, K.redT, K.redT], fs: 13 }); }

// 17 LESSONS flow
{ const s = lightSlide(pres, S5, "จากความผิดพลาดเป็นสิ่งที่ป้องกัน",
    "ทุกบทเริ่มจากปัญหาจริงแล้วเพิ่มสิ่งที่ตรวจซ้ำได้ playbook แนะนำว่าเมื่อ AI ผิดเรื่องเดิมซ้ำให้บันทึกการแก้ในไฟล์ที่ AI อ่าน และทุกเหตุการณ์ที่เกิดกับระบบจริงควรกลายเป็นการตรวจที่รันซ้ำได้ LESSONS.md รวมบทเรียน แต่ละข้อชี้ไปที่สิ่งที่ป้องกัน บทเรียนที่ยังไม่มีสิ่งใดป้องกันคือสิ่งที่ยังพึ่งความจำ ลำดับที่ควรเลือกคือ test หรือ guard ก่อน เพราะทำงานแน่นอนทุกครั้ง");
  flow(s, pres, [{ t: "สิ่งที่ผิดพลาด" }, { t: "บทเรียนใน LESSONS.md", fill: K.amber }], 0.5, 1.3, 5.4, 0.9, { gap: 0.4, fs: 13 });
  [["test", "แน่นอนทุกครั้ง", K.greenT], ["guard หรือ gate", "แน่นอนทุกครั้ง", K.greenT], ["REVIEW.md · SKILL.md", "คำแนะนำ", K.paper], ["AGENTS.md", "คำแนะนำ", K.paper], ["ยอมรับความเสี่ยง", "พร้อมเหตุผล", K.amberT]].forEach((v, i) => { const x = 0.5 + i * 1.8; box(s, pres, x, 2.7, 1.7, 1.2, v[2]); T(s, [{ text: v[0], options: { bold: true, fontSize: 12, breakLine: true } }, { text: v[1], options: { fontSize: 10 } }], { x: x + 0.05, y: 2.7, w: 1.6, h: 1.2, align: "center", valign: "middle" }); });
  T(s, "บทเรียนที่ไม่มีสิ่งป้องกัน = ยังพึ่งความจำ · เลือก test หรือ guard ก่อน", { x: 0.5, y: 4.2, w: 9, h: 0.5, fontSize: 15, bold: true, color: K.teal }); }

// 18 LESSONS ดี/ไม่ดี
goodBad(pres, S5, "ตัวอย่าง LESSONS.md: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ไม่ดีไม่มีที่มาและลิงก์ ใช้คำว่าต้องระวังมากขึ้น ซึ่งไม่ทำให้สิ่งใดเปลี่ยน และไม่มีสิ่งที่ป้องกันหรือวิธีตรวจ ตัวอย่างที่ดีมีที่มา วิธีพบ สาเหตุจริง สิ่งที่ป้องกันตอนนี้ และคำสั่งที่ตรวจว่าทำงานจริง",
  ["## AI ทำ test พัง", "", "ต้องระวังมากขึ้นเวลาใช้ AI"],
  ["## L-04: AI แก้ test ให้ผ่าน", "- เกิดเมื่อ: WS-03 ขั้น 4 PR ของ R4", "  [ลิงก์ PR]", "- พบได้อย่างไร: ผู้อนุมัติเห็นใน diff", "- สาเหตุ: คำสั่งไม่ได้ห้ามแก้ test", "  และไม่มีอะไรตรวจ", "- ป้องกันตอนนี้: guard protect-tests.mjs", "  (WS-05) · กติกาใน AGENTS.md", "- ตรวจว่าทำงานจริง:", "  npx vitest run .agents"], 11);

// 19 ปัญหา lessons
{ const s = lightSlide(pres, S5, "LESSONS.md ที่ไม่ดีมีปัญหาอะไร", "สาเหตุที่เขียนได้เพียงลืมหรือไม่ระวัง ให้ถามต่อว่าเหตุใดจึงลืมได้ และอะไรควรจับได้แต่ไม่จับ คำตอบนั้นคือสาเหตุ");
  rowsTable(s, pres, [["ไม่มีที่มาและลิงก์", "ผู้อ่านภายหลังตรวจไม่ได้ว่าเกิดอะไรขึ้นจริง"], ["“ต้องระวังมากขึ้น”", "ไม่มีสิ่งใดเปลี่ยน เรื่องเดิมเกิดอีกเมื่อทุกคนลืม"], ["ไม่มีสิ่งที่ป้องกันหรือวิธีตรวจ", "ไม่รู้ว่าบทเรียนนี้ยังถูกป้องกันอยู่หรือไม่"]], 0.5, 1.3, [3.4, 5.6], 0.95, { fills: [K.redT, K.redT, K.redT], fs: 14 }); }

// 20 chain ทั้งวิชา
{ const s = lightSlide(pres, S5, "artifact chain ของทั้งวิชา", "แปดบท แปดไฟล์ในสาย แต่ละไฟล์มีสิ่งที่ตรวจซ้ำได้ของตน");
  rowsTable(s, pres, [["01", "AGENTS.md", "CI ตรวจ build และ deploy อัตโนมัติ"], ["02", "intent.md, spec.md, ADR-001", "lint ของ openapi.yaml"], ["03", "plan.md, ADR-002", "unit test ของกฎ R1–R5"], ["04", "REVIEW.md", "ruleset, CI ทุก PR และ AI review"], ["05", ".agents/guards/, ADR-003", "guard ก่อนคำสั่งของ agent · integration test"], ["06", ".agents/verifier.md", "E2E test ของ journey"], ["07", "ops/bands.yaml", "load test ของ R6 และ p95"], ["08", "SKILL.md, LESSONS.md", "access test, CodeQL, npm audit"]], 0.5, 1.2, [0.7, 3.2, 5.1], 0.36, { head: ["บท", "ไฟล์", "สิ่งที่ตรวจซ้ำได้"], fs: 11, mono: [1], fills: [K.paper, K.paper, K.paper, K.paper, K.paper, K.paper, K.paper, K.tealT] }); }

// 21 สรุป
{ const s = darkSlide(pres, S6, "สรุป 5 ข้อ ก่อนเข้าสู่ lab");
  T(s, "สรุป", { x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["broken access control ยังเป็นความเสี่ยงอันดับ 1 และ code ที่ AI เขียนเกือบครึ่งมีช่องโหว่ จึงต้องพิสูจน์ด้วยการตรวจที่รันซ้ำได้", "รู้ว่าผู้ใช้เป็นใครยังไม่พอ ต้องตรวจบทบาทและความเป็นเจ้าของ และ test ใช้ผู้ใช้อย่างน้อย 2 คน", "เครื่องมืออัตโนมัติ AI security review และ access test จับคนละแบบ ข้อค้นพบที่ถูกควรกลายเป็น test", "skill เก็บขั้นตอนของงานซ้ำ แต่ยังเป็นคำแนะนำ สิ่งที่ต้องเป็นจริงเสมอต้องเป็น test หรือ guard", "ทุกบทเรียนใน LESSONS.md ต้องชี้ไปที่สิ่งที่ป้องกันไม่ให้เกิดซ้ำ"];
  r.forEach((t, i) => { const y = 1.15 + i * 0.78; chip(s, pres, 0.7, y + 0.08, i + 1, K.amber, K.ink, 0.4); T(s, t, { x: 1.3, y, w: 8.2, h: 0.65, fontSize: 13, color: K.white, valign: "middle" }); }); }

// 22-23 Glossary
const GL = [["OWASP Top 10", "รายการความเสี่ยงของเว็บที่พบบ่อยที่สุด (ฉบับ 2025)"], ["Broken Access Control", "ผู้ใช้ทำหรือเข้าถึงสิ่งที่ไม่มีสิทธิ์ (A01)"], ["authentication / authorization", "รู้ว่าเป็นใคร / ตรวจว่าทำสิ่งนี้ได้และข้อมูลเป็นของเขา"],
  ["IDOR", "เข้าถึงข้อมูลผู้อื่นเพียงเปลี่ยน id เพราะไม่ตรวจเจ้าของ"], ["access test", "test ที่ใช้ผู้ใช้ 2 คนพิสูจน์ว่าเข้าถึงของกันไม่ได้"], ["CodeQL", "เครื่องมือวิเคราะห์ code ของ GitHub (default setup)"],
  ["npm audit", "ตรวจ package ที่มีช่องโหว่ (--omit=dev --audit-level=high)"], ["Dependabot alerts", "แจ้งเตือนช่องโหว่ของ package ในแท็บ Security"], ["security review", "AI ตรวจตามขั้นตอนของ skill ข้อค้นพบคนต้องตัดสิน"],
  ["SKILL.md", "ขั้นตอนของงานซ้ำในรูปแบบ Agent Skills (.agents/skills/)"], ["LESSONS.md", "บทเรียนที่ชี้ไปที่สิ่งที่ป้องกันไม่ให้เกิดซ้ำ"], ["security checklist", "รายการข้อที่ต้องตรวจ พร้อมหลักฐานและสถานะ"]];
[0, 6].forEach((k, n) => { const s = lightSlide(pres, S7, "Glossary (" + (n + 1) + "/2)", "ใช้ทบทวนคำศัพท์ของบทนี้");
  GL.slice(k, k + 6).forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.1, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.2, y, w: 4.0, h: 1.1, valign: "middle" }); }); });

// L1
{ const s = darkSlide(pres, S8, "เปลี่ยนจากบรรยายเป็นลงมือ");
  T(s, "Lab", { x: 0.7, y: 1.1, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "ผู้ใช้เข้าถึงของกันไม่ได้\nและพิสูจน์ได้ทุก PR", { x: 0.7, y: 1.7, w: 8.6, h: 1.6, fontSize: 36, bold: true, color: K.white });
  T(s, "checklist → access test → CodeQL/audit → security review → LESSONS.md", { x: 0.7, y: 3.8, w: 8.6, h: 0.5, fontSize: 16, color: "B8C4D4" }); }

// L2
{ const s = lightSlide(pres, S8, "Brief ของ lab: ทำอะไรและได้อะไร", "งานกลุ่ม ใช้ repository เดิมจาก WS-07");
  const c = [["รูปแบบ", "งานกลุ่ม ใช้ repository เดิมจาก WS-07"], ["เป้าหมาย", "ทุกข้อใน security checklist มีหลักฐาน · ผู้ใช้เข้าถึงข้อมูลผู้อื่นไม่ได้ และมี access test ทุก PR"], ["สิ่งที่ได้", "CI ตรวจ dependency · CodeQL ตรวจ code · SKILL.md ของ security review"], ["ปิดวิชา", "LESSONS.md ผูกบทเรียนทั้งภาคกับสิ่งที่ป้องกัน · ตารางหัวข้อ 8 ของ PROJECT.md"]];
  c.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.65; box(s, pres, x, y, 4.4, 1.5, i === 3 ? K.amberT : K.paper);
    T(s, v[0], { x: x + 0.25, y: y + 0.15, w: 3.9, h: 0.35, fontSize: 13, bold: true, color: K.teal }); T(s, v[1], { x: x + 0.25, y: y + 0.55, w: 3.9, h: 0.85, fontSize: 12 }); }); }

// L3
{ const s = lightSlide(pres, S8, "7 ขั้นตอนของ lab", "ทุกขั้นมี ทำ / ผลที่ควรเห็น / หากติดปัญหา");
  step7(s, [["1", "เขียน security checklist", "docs/security-checklist.md · S1–S14"], ["2", "access test", "e2e/access.spec.ts · ผู้ใช้ 2 คน"], ["3", "เครื่องมือตรวจอัตโนมัติ", "npm audit · CodeQL · Dependabot"], ["4", "security review ด้วย skill", ".agents/skills/security-review/SKILL.md"], ["5", "เตรียม PR break-it-live", "ลบการตรวจเจ้าของกิจกรรม · เปิดค้างไว้"], ["6", "LESSONS.md ของทั้งภาคการศึกษา", "อย่างน้อย 6 บทเรียนจาก 4 บท"], ["7", "บันทึกหลักฐาน", "evidence · ตารางหัวข้อ 8 ของ PROJECT.md"]]); }

// L4 repo
{ const s = lightSlide(pres, S8, "repository ที่จะได้เมื่อจบบทนี้", "CodeQL และ Dependabot alerts ในขั้นที่ 3 เป็นการตั้งค่าใน GitHub ไม่ใช่ไฟล์ใน repository");
  codeBox(s, pres, 0.5, 1.3, 5.8, 3.65, ["AGENTS.md ← 6 (บทเรียนที่ต้องจำ ≤ 5 ข้อ)", "LESSONS.md ← 6", ".agents/skills/security-review/", "  SKILL.md ← 4", "docs/security-checklist.md ← 1, 2, 3, 4", "e2e/", "  db.ts ← 2 (createUser)", "  access.spec.ts ← 2", "src/app/api/... ← 2, 4 (แก้ตามที่พบ)", "evidence/ws-08.md ← 7", ".github/workflows/ci.yml ← 3 (npm audit)"], 11);
  side(s, [["ในไฟล์", "access test · SKILL.md · LESSONS.md · ci.yml"], ["ใน GitHub", "CodeQL default setup · Dependabot alerts", K.amberT], ["เติมให้ครบ", "ทุกข้อใน checklist: หลักฐาน + สถานะ", K.greenT]]); }

// L5 checklist
{ const s = lightSlide(pres, S8, "ขั้นที่ 1: security checklist",
    "สร้าง docs/security-checklist.md ตั้งต้นจากตาราง แล้วเพิ่มข้อจากผลการลองโจมตีในส่วน C ของ 0-Before อย่างน้อย 2 ข้อ คอลัมน์ตรวจด้วยบอกวิธี คอลัมน์หลักฐานเติมในขั้นต่อไป ข้อ S1–S10 มีในเอกสาร lab และมี S11–S14 เพิ่ม");
  rowsTable(s, pres, [["S1", "ไม่มี session ได้ 401", "A01", "access test"], ["S2", "ผู้เข้าร่วมทำสิ่งของผู้จัดไม่ได้", "A01", "access test"], ["S3", "ผู้จัดดูรายชื่อของกิจกรรมผู้อื่นไม่ได้", "A01", "access test"], ["S4", "ผู้เข้าร่วมดู/ยกเลิกของผู้อื่นไม่ได้", "A01", "access test"], ["S5", "ไม่รับ user id จาก body/query/header", "A01", "security review · REVIEW.md"], ["S6", "cookie เดิมใช้ไม่ได้หลังออกจากระบบ", "A07", "access test"], ["S7–S10", "cookie flags · SQL parameter · body ผิดรูปแบบ · ความลับ", "A02–A10", "curl · CodeQL · access test"]], 0.5, 1.2, [0.9, 4.0, 1.5, 2.6], 0.44, { head: ["#", "ข้อ", "OWASP", "ตรวจด้วย"], fs: 10, noBold: false }); }

// L6 steps 2-3
{ const s = lightSlide(pres, S8, "ขั้นที่ 2–3: access test และเครื่องมืออัตโนมัติ",
    "ขั้น 2 เขียน e2e/access.spec.ts ใช้ผู้ใช้อย่างน้อย 2 คน เพิ่ม createUser ใน e2e/db.ts สร้างผู้จัดคนที่ 2 เอง ชื่อ test ขึ้นต้นด้วยรหัสข้อใน checklist ขั้น 3 เพิ่ม npm audit --omit=dev --audit-level=high ต่อจาก npm ci และก่อน no-secrets ในจ๊อบ build เปิด CodeQL default setup และ Dependabot alerts ทุก alert ต้องได้รับการจัดการ: แก้ใน PR แยกพร้อม test หรือ dismiss พร้อมเหตุผล");
  box(s, pres, 0.5, 1.3, 4.4, 3.65, K.tealT); T(s, "ขั้น 2: access test", { x: 0.75, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: K.teal });
  T(s, bullets(["e2e/access.spec.ts ผู้ใช้อย่างน้อย 2 คน", "createUser ใน e2e/db.ts · ผู้จัดคนที่ 2", "ชื่อ test ขึ้นต้นด้วยรหัสข้อ (S1…)", "ไม่ผ่านตอนแรก = พบช่องโหว่จริง แก้ใน PR"]), { x: 0.75, y: 1.9, w: 3.9, h: 2.9, fontSize: 12 });
  box(s, pres, 5.1, 1.3, 4.4, 3.65, K.amberT); T(s, "ขั้น 3: เครื่องมือ", { x: 5.35, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: "B5651D" });
  T(s, bullets(["npm audit --omit=dev --audit-level=high ใน job build", "CodeQL: Settings → Advanced Security → Default", "Dependabot alerts: เปิดใช้", "ทุก alert: แก้ใน PR แยก หรือ Dismiss พร้อมเหตุผล"]), { x: 5.35, y: 1.9, w: 3.9, h: 2.9, fontSize: 12 }); }

// L7 step 4
{ const s = lightSlide(pres, S8, "ขั้นที่ 4: security review ด้วย skill",
    "สร้าง .agents/skills/security-review/SKILL.md สมาชิกที่ไม่ได้เขียน code เปิดบทสนทนาใหม่ สั่งให้ทำตาม skill ห้ามแก้ไฟล์ รายงานเป็น issue ชื่อ Security review WS-08 ข้อ Important แต่ละข้อ: เพิ่ม access test ก่อนแก้ code หรือ comment ยืนยันว่าไม่ใช่ปัญหาพร้อมผลการลอง ข้อค้นพบที่ถูกต้องควรกลายเป็น test");
  flow(s, pres, [{ t: "สร้าง SKILL.md", sub: "security-review" }, { t: "บทสนทนาใหม่", sub: "สมาชิกที่ไม่ได้เขียน code · ห้ามแก้ไฟล์" }, { t: "issue", sub: "Security review WS-08", fill: K.tealT }, { t: "ข้อ Important", sub: "test ก่อนแก้ หรือพิสูจน์ว่าไม่ใช่ปัญหา", fill: K.amber }], 0.5, 1.4, 9, 1.5, { gap: 0.25, fs: 12, sfs: 10 });
  box(s, pres, 0.5, 3.3, 9, 1.6, K.paper); T(s, "ข้อค้นพบของ AI ที่ถูกต้องควรกลายเป็น access test เพื่อไม่ต้องพึ่ง AI อีก", { x: 0.75, y: 3.3, w: 8.5, h: 1.6, fontSize: 17, bold: true, valign: "middle" }); }

// L8 break
{ const s = lightSlide(pres, S8, "ขั้นที่ 5: break-it-live ลบการตรวจเจ้าของ",
    "ใน route handler ที่แสดงรายชื่อผู้ลงทะเบียนให้ผู้จัด ลบเฉพาะการตรวจว่าผู้จัดเป็นเจ้าของกิจกรรม คงการตรวจ session และบทบาทผู้จัดไว้ เปิด PR ทิ้งไว้ถึงคาบ demo แล้วปิดโดยไม่ merge job e2e ต้องไม่ผ่านที่ test ของข้อ S3");
  flow(s, pres, [{ t: "branch", sub: "demo/no-owner-check" }, { t: "ลบการตรวจเจ้าของ", sub: "คง session และบทบาทผู้จัด" }, { t: "เปิด PR", sub: "job e2e แดงที่ test ข้อ S3", fill: K.redT }, { t: "ปุ่ม merge กดไม่ได้", fill: K.amberT }], 0.5, 1.5, 9, 1.4, { gap: 0.25, fs: 12, sfs: 10 });
  box(s, pres, 0.5, 3.3, 9, 1.6, K.paper); T(s, "พิสูจน์ได้: code ที่ดูถูกต้อง (ตรวจบทบาทแล้ว) ยังรั่วข้อมูลผู้จัดคนอื่น และ access test จับได้", { x: 0.75, y: 3.3, w: 8.5, h: 1.6, fontSize: 16, bold: true, valign: "middle" }); }

// L9 LESSONS
{ const s = lightSlide(pres, S8, "ขั้นที่ 6: LESSONS.md ของทั้งภาคการศึกษา",
    "รวมรายการที่สมาชิกจดไว้ในส่วน C ของ 0-Before กับสิ่งที่พบในบทนี้ ใช้รูปแบบในหัวข้อ 5 อย่างน้อย 6 บทเรียนจากอย่างน้อย 4 บทที่ต่างกัน บทเรียนที่ยังไม่มีสิ่งป้องกันให้เพิ่มใน PR นี้หรือถัดไป หรือเขียนยอมรับความเสี่ยงพร้อมเหตุผล เพิ่มหัวข้อบทเรียนที่ต้องจำท้าย AGENTS.md ไม่เกิน 5 ข้อ ถ้านึกไม่ออก อ่าน Retro ของ evidence ws-01 ถึง ws-07");
  codeBox(s, pres, 0.5, 1.3, 5.6, 3.65, ["## L-01: [หัวข้อสั้น ๆ]", "- เกิดเมื่อ: [บท/ขั้น] · [ลิงก์]", "- พบได้อย่างไร: [ใคร/อะไรพบ]", "- สาเหตุ: [สาเหตุจริง ไม่ใช่ “ไม่ระวัง”]", "- สิ่งที่ป้องกันตอนนี้: [test/guard/gate/", "  REVIEW/SKILL/AGENTS + ชื่อไฟล์]", "- ตรวจว่าทำงานจริง: [คำสั่งหรือ PR break-it]"], 11);
  side(s, [["เกณฑ์", "อย่างน้อย 6 บทเรียน จาก 4 บท", K.tealT], ["AGENTS.md", "บทเรียนที่ต้องจำ ไม่เกิน 5 ข้อ อ้าง L-xx", K.amberT], ["ถ้านึกไม่ออก", "อ่าน Retro ของ evidence ws-01 ถึง ws-07", K.paper]]); }

// L10 evidence
{ const s = lightSlide(pres, S8, "ขั้นที่ 7: หลักฐาน และตารางหัวข้อ 8 ของ PROJECT.md", "เงื่อนไขข้อใดยังไม่ผ่าน ให้เขียนตามจริงพร้อมสิ่งที่ขาด อย่าใส่หลักฐานที่ไม่ได้พิสูจน์เงื่อนไขนั้น");
  rowsTable(s, pres, [["การโจมตีจาก 0-Before ที่สำเร็จ", "จำนวน · ตอนนี้ถูกป้องกันด้วย test ใด"], ["access test · CodeQL · npm audit", "จำนวน test ที่ไม่ผ่านตอนแรก · alert แก้/dismiss · high ขึ้นไป"], ["Security review · Break-it-live", "issue · Important แก้/ไม่ใช่ปัญหา · PR และ test ที่ไม่ผ่าน"], ["project เสร็จตามหัวข้อ 8 หรือไม่", "R1–R5 มี unit test · R6 ไม่ถูกละเมิด · journey ผ่านบน CI · เข้าถึงของผู้อื่นไม่ได้ · feature มี intent/spec/plan"]], 0.5, 1.3, [2.8, 6.2], 0.85, { fs: 11, fills: [K.paper, K.paper, K.paper, K.amberT] }); }

// L11 present
{ const s = lightSlide(pres, S8, "การวัดผล: Present 7 ขั้นตอน", "เวลา 5 นาทีต่อกลุ่ม ผู้ตรวจเลือกข้อใน checklist และบทเรียนใน LESSONS.md ไม่มีการให้คะแนน");
  const r = [["เข้าสู่ระบบบน Live URL ด้วย curl เป็นผู้เข้าร่วม เรียก endpoint รายชื่อผู้ลงทะเบียน", "ได้ status ที่ปฏิเสธตาม spec ไม่ได้รายชื่อ"], ["รัน docker compose up แล้ว npx playwright test access", "ผ่านทั้งหมด ชื่อ test ขึ้นต้นด้วยรหัสข้อ checklist"], ["เปิด PR break-it-live (ลบการตรวจเจ้าของ) ที่ยังเปิดอยู่", "job e2e แดงที่ test ของ S3 และปุ่ม merge กดไม่ได้"], ["ผู้ตรวจเลือก 1 ข้อใน security-checklist.md", "เปิดหลักฐานของข้อนั้นได้ และพิสูจน์ข้อนั้นจริง"], ["เปิดแท็บ Security ของ repository", "ไม่มี alert high/critical ที่เปิดค้างโดยไม่จัดการ"], ["เปิด issue Security review WS-08 เลือก 1 ข้อ Important", "มี PR เพิ่ม test ก่อนแก้ หรือ comment ยืนยันไม่ใช่ปัญหาพร้อมผลลอง"], ["ผู้ตรวจเลือก 1 บทเรียนใน LESSONS.md", "เปิดสิ่งที่ป้องกันได้ และอธิบายว่าจับปัญหาเดิมอย่างไร"]];
  T(s, "ขั้นตอน", { x: 1.05, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute }); T(s, "เกณฑ์ผ่าน", { x: 5.3, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  r.forEach((v, i) => { const y = 1.48 + i * 0.5; box(s, pres, 0.5, y, 9, 0.46, i % 2 ? K.white : K.paper); chip(s, pres, 0.55, y + 0.04, i + 1, K.teal, K.white, 0.38);
    T(s, v[0], { x: 1.05, y, w: 4.15, h: 0.46, fontSize: 9, valign: "middle", bold: true }); T(s, v[1], { x: 5.3, y, w: 4.1, h: 0.46, fontSize: 10, valign: "middle" }); }); }

// L12 Retro
{ const s = lightSlide(pres, S8, "Retro: ปรึกษากันแล้วบันทึกท้าย evidence", "ข้อ 3 เป็นคำถามปิดท้ายของทั้งวิชา");
  const q = ["ช่องโหว่ใดที่พบในบทนี้ มีอยู่ตั้งแต่บทใด และเหตุใด test, AI review หรือ verifier ของบทก่อนหน้าจึงไม่พบ", "สิ่งที่ตรวจซ้ำได้ซึ่งสร้างตลอดวิชา ข้อใดจับปัญหาได้จริงมากที่สุด และข้อใดไม่เคยจับอะไรเลย", "ถ้าเริ่ม project ใหม่พรุ่งนี้พร้อม AI agent จะสร้างสิ่งใดจากวิชานี้ก่อนเป็นอย่างแรก เพราะอะไร"];
  q.forEach((t, i) => { const y = 1.4 + i * 1.15; box(s, pres, 0.5, y, 9, 1.0, K.paper); chip(s, pres, 0.75, y + 0.29, i + 1); T(s, t, { x: 1.4, y, w: 7.9, h: 1.0, fontSize: 14, valign: "middle" }); }); }

L.save(pres, "ws-08-quality.pptx").then(() => console.log("saved"));
