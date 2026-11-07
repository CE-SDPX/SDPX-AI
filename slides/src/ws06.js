const L = require("./lib");
const { K, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref, codeBox, rowsTable, goodBad } = L;
const S0 = "เปิดคาบ", S1 = "E2E test อยู่ตรงไหน", S2 = "Session และสิทธิ์", S3 = "เขียน E2E test", S4 = "Verifier", S5 = "E2E ใน CI", S6 = "สรุป", S7 = "Glossary", S8 = "Lab และการวัดผล";
const pres = L.newDeck("WS-06 E2E Loop", [S0, S1, S2, S3, S4, S5, S6, S7, S8]);
const bullets = (a) => a.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1, paraSpaceAfter: 6 } }));
const numbered = (s, items, y0 = 1.3, h = 0.62, fs = 14) => items.forEach((t, i) => { const y = y0 + i * (h + 0.1); box(s, pres, 0.5, y, 9, h, K.paper); chip(s, pres, 0.65, y + (h - 0.42) / 2, i + 1, K.teal, K.white, 0.42); T(s, t, { x: 1.3, y, w: 8, h, fontSize: fs, valign: "middle" }); });
const step7 = (s, st) => { st.forEach((v, i) => { const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4, x = 0.5 + col * 4.6, y = 1.3 + row * 0.9;
    box(s, pres, x, y, 4.4, 0.8, i === 6 ? K.amberT : K.paper); chip(s, pres, x + 0.15, y + 0.19, v[0], i === 6 ? K.amber : K.teal, i === 6 ? K.ink : K.white);
    T(s, [{ text: v[1], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[2], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.75, y, w: 3.55, h: 0.8, valign: "middle" }); });
  box(s, pres, 5.1, 4.0, 4.4, 0.8, K.ink); T(s, "แต่ละขั้น: ทำ → ผลที่ควรเห็น → หากติดปัญหา", { x: 5.25, y: 4.0, w: 4.1, h: 0.8, fontSize: 13, color: K.white, valign: "middle" }); };
const side = (s, items, x = 6.3, w = 3.2) => items.forEach((v, i) => { const y = 1.3 + i * 1.25; box(s, pres, x, y, w, 1.15, v[2] || K.paper);
  T(s, [{ text: v[0], options: { bold: true, fontSize: 13, breakLine: true } }, { text: v[1], options: { fontSize: 11, color: K.ink2 } }], { x: x + 0.15, y, w: w - 0.3, h: 1.15, valign: "middle" }); });
const dark = (s, big, y = 1.5) => T(s, big, { x: 0.7, y, w: 8.6, h: 2.8, fontSize: 30, bold: true, color: K.white });

// 1 ชื่อบท
{ const s = darkSlide(pres, S0, "เปิดคาบ บทนี้ตรวจว่าชั้นต่าง ๆ เชื่อมกันถูก และทำให้ server รู้จักผู้ใช้จาก session");
  T(s, "WS-06", { x: 0.7, y: 1.2, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "E2E Loop", { x: 0.7, y: 1.8, w: 8.6, h: 1.0, fontSize: 40, bold: true, color: K.white });
  T(s, [{ text: "Rathachai Chawuthai", options: { bold: true, fontSize: 18, color: K.white, breakLine: true } }, { text: "Computer Engineering, KMITL", options: { fontSize: 14, color: "B8C4D4" } }], { x: 0.7, y: 3.55, w: 8.6, h: 0.75 });
  T(s, "SDPX-AI · Software Development Process in Practice — AI-Assisted", { x: 0.7, y: 4.5, w: 8.6, h: 0.4, fontSize: 14, color: "B8C4D4" }); }

// 2 วัตถุประสงค์
{ const s = lightSlide(pres, S0, "เมื่อจบคาบ นักศึกษาควรทำได้", "อ่านวัตถุประสงค์ทั้ง 4 ข้อ");
  const it = ["อธิบายว่า E2E จับข้อผิดพลาดชนิดใดที่ unit และ integration test จับไม่ได้ และเหตุใดควรมีไม่กี่ test", "ทำให้ server รู้จักผู้ใช้จาก session และตรวจสิทธิ์ฝั่ง server ทุกคำขอ", "เขียน E2E test ของ journey ที่อ่านจาก spec ไม่ขึ้นกับ HTML และไม่ flaky", "เขียน .agents/verifier.md ให้ AI ตรวจด้วยบทสนทนาใหม่ และแยกจาก AI review และ E2E ใน CI"];
  it.forEach((t, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.4 + Math.floor(i / 2) * 1.75; box(s, pres, x, y, 4.4, 1.55, K.paper); chip(s, pres, x + 0.2, y + 0.2, i + 1);
    T(s, t, { x: x + 0.8, y: y + 0.2, w: 3.4, h: 1.2, fontSize: 13 }); }); }

// 3 คำถามเปิด
{ const s = darkSlide(pres, S0, "คำตอบคือไม่มี unit test ตรวจ function ที่คืนผลถูกต้อง integration test ตรวจ query ทีละตัวแต่ไม่ได้ตรวจว่า route handler เรียก query ครบ ผู้ใช้จะพบเองเมื่อรอในคิวสำรองแล้วไม่ได้ที่นั่ง ผลจากส่วน C ของ 0-Before: journey ด้วย curl ใช้เวลาหลายนาที และยกเลิกแทนผู้อื่นด้วย x-user-id ได้เพราะ server เชื่อสิ่งที่ส่งมา");
  T(s, "คำถามเปิด", { x: 0.7, y: 0.8, w: 8, h: 0.4, fontSize: 16, bold: true, color: K.amber });
  T(s, "ชั้น data ลืมบันทึกสถานะ CONFIRMED\nของผู้ที่ได้เลื่อนจากคิวสำรอง\nแต่ function cancel ใน domain ถูกต้องทุกกรณี", { x: 0.7, y: 1.5, w: 8.6, h: 2.4, fontSize: 26, bold: true, color: K.white });
  T(s, "test ใดของกลุ่มจะไม่ผ่าน", { x: 0.7, y: 4.1, w: 8.6, h: 0.5, fontSize: 20, color: K.amber }); }

// 4 E2E อยู่ตรงไหน
{ const s = lightSlide(pres, S1, "E2E test ตรวจผ่านทุกชั้น",
    "unit test ชี้ที่ domain integration test ชี้ที่ data และ PostgreSQL ส่วน E2E test เริ่มจาก browser ผ่านหน้าจอ route handler domain data จนถึงฐานข้อมูล");
  flow(s, pres, [{ t: "browser" }, { t: "หน้าจอ", sub: "src/app" }, { t: "route handler", sub: "src/app/api" }, { t: "domain", sub: "src/domain", fill: K.tealT }, { t: "data", sub: "src/data", fill: K.tealT }, { t: "PostgreSQL" }], 0.5, 1.5, 9, 1.1, { gap: 0.2, fs: 12, sfs: 10 });
  [["E2E test", "ตั้งแต่ browser ถึงฐานข้อมูล", 0.5, 4.2, K.amberT], ["integration test", "data + PostgreSQL", 5.0, 2.2, K.paper], ["unit test", "domain", 7.4, 2.1, K.paper]].forEach(v => { box(s, pres, v[2], 3.1, v[3], 1.2, v[4]); T(s, [{ text: v[0], options: { bold: true, fontSize: 14, breakLine: true } }, { text: v[1], options: { fontSize: 11 } }], { x: v[2] + 0.1, y: 3.1, w: v[3] - 0.2, h: 1.2, valign: "middle", align: "center" }); }); }

// 5 เปรียบเทียบ
{ const s = lightSlide(pres, S1, "unit, integration และ E2E ต่างกันอย่างไร", "E2E ช้ากว่าและหาสาเหตุยากกว่า จึงมีเฉพาะ journey หลักไม่กี่เรื่อง");
  rowsTable(s, pres, [["ตรวจอะไร", "กฎ 1 ข้อใน domain", "query กับ PostgreSQL", "journey ผ่านทุกชั้น"], ["จับอะไรได้", "เงื่อนไขของกฎผิด", "query ผิด เรียงลำดับผิด", "ชั้นเชื่อมกันผิด: ไม่เรียก query ครบ ปุ่มเรียก endpoint ผิด ไม่ส่ง cookie"], ["เวลาต่อ test", "มิลลิวินาที", "ไม่กี่สิบมิลลิวินาที", "หลายวินาที"], ["เมื่อไม่ผ่าน", "ชี้กฎที่ผิดทันที", "ชี้ query ที่ผิด", "รู้ว่า journey พัง แต่ต้องหาว่าชั้นใด"], ["ควรมี", "ทุกกฎและค่าขอบ", "ทุก query ที่มีเงื่อนไข", "journey หลักไม่กี่เรื่อง"]], 0.5, 1.3, [1.5, 2.2, 2.3, 3.0], 0.62, { head: ["", "unit", "integration", "E2E"], fs: 11 }); }

// 6 ไม่แทน unit + ตัววัด
{ const s = lightSlide(pres, S1, "E2E ไม่ได้แทน unit test",
    "กฎ R4 ที่ยกเลิกได้จนถึง 24 ชั่วโมงก่อนเริ่มพอดียังตรวจด้วย unit test เพราะสร้างสถานการณ์นั้นผ่านหน้าจอยากและช้า E2E ตรวจเฉพาะว่าชิ้นส่วนที่ test แยกกันแล้วทำงานร่วมกันได้ตาม journey");
  box(s, pres, 0.5, 1.3, 9, 0.9, K.amberT); T(s, "E2E ตรวจว่าชิ้นส่วนที่ test แยกกันแล้วทำงานร่วมกันได้ตาม journey", { x: 0.75, y: 1.3, w: 8.5, h: 0.9, fontSize: 16, bold: true, valign: "middle" });
  rowsTable(s, pres, [["Latency", "เวลาที่ E2E test ของ journey ใช้ในเครื่องและใน CI"], ["Fidelity", "ไม่ผ่านเมื่อชั้นใดเชื่อมผิด และผ่านซ้ำได้ทุกครั้งเมื่อ code ถูก"], ["Coverage", "journey หลักใน PROJECT.md ครบ และทุก PR ต้องผ่านก่อน merge"]], 0.5, 2.5, [1.6, 7.4], 0.72, { fs: 12 }); }

// 7 session flow
{ const s = lightSlide(pres, S2, "เหตุใด header x-user-id ต้องหายไป",
    "ตั้งแต่ WS-03 current-user.ts อ่าน user id จาก header ที่ใครก็ตั้งได้ ผลส่วน C ของ 0-Before แสดงว่ายกเลิกการลงทะเบียนของคนอื่นได้ด้วยคำสั่งเดียว PROJECT.md หัวข้อ 2 กำหนดว่า server ต้องตรวจสิทธิ์จาก session ทุกครั้งและห้ามเชื่อ user id ที่ browser ส่งมา ระบบนี้เข้าสู่ระบบด้วยการเลือกผู้ใช้จาก seed data ไม่มีรหัสผ่าน ตามขอบเขตของ PROJECT.md");
  flow(s, pres, [{ t: "POST /api/session", sub: "{ userId }" }, { t: "server บันทึก session", sub: "รหัสสุ่ม · เวลาหมดอายุ", fill: K.tealT }, { t: "Set-Cookie: session", sub: "HttpOnly · Secure · SameSite=Lax" }], 0.5, 1.3, 9, 1.2, { gap: 0.3, fs: 13, sfs: 11 });
  flow(s, pres, [{ t: "browser ส่ง cookie เอง", sub: "ทุกคำขอ" }, { t: "server หา user จากรหัส", sub: "ที่ยังไม่หมดอายุ", fill: K.tealT }, { t: "201 หรือ 401", sub: "ถ้าไม่มี session", fill: K.amberT }], 0.5, 2.9, 9, 1.2, { gap: 0.3, fs: 13, sfs: 11 });
  T(s, "server เป็นผู้ตัดสินว่า cookie นั้นเป็นของใคร ไม่ใช่ browser", { x: 0.5, y: 4.4, w: 9, h: 0.4, fontSize: 15, bold: true, color: K.teal }); }

// 8 cookie
{ const s = lightSlide(pres, S2, "คุณสมบัติของ cookie แต่ละข้อป้องกันอะไร", "Secure: browser ส่ง cookie เฉพาะทาง HTTPS ยกเว้น localhost ที่ browser ยอมให้ใช้ได้ระหว่างพัฒนา");
  rowsTable(s, pres, [["รหัสสุ่มยาว (32 byte)", "เดารหัสของผู้อื่นไม่ได้"], ["HttpOnly", "JavaScript ในหน้าเว็บอ่าน cookie ไม่ได้ script แปลกปลอมขโมยรหัสไม่ได้"], ["Secure", "browser ส่ง cookie เฉพาะทาง HTTPS (localhost ยกเว้นระหว่างพัฒนา)"], ["SameSite=Lax", "เว็บอื่นส่งคำขอที่เปลี่ยนข้อมูลแทนผู้ใช้โดยแนบ cookie ไม่ได้"], ["หมดอายุ + ลบ session ตอนออกจากระบบ", "รหัสที่หลุดไปใช้ได้ไม่ตลอดไป"]], 0.5, 1.3, [3.2, 5.8], 0.62, { fs: 12, mono: [0] }); }

// 9 หลักการสิทธิ์
{ const s = lightSlide(pres, S2, "ตรวจสิทธิ์ทุกคำขอฝั่ง server", "การซ่อนปุ่มบนหน้าจอไม่ใช่การตรวจสิทธิ์ คำขอส่งตรงไปที่ API ได้เสมอ");
  numbered(s, ["ทุก route handler และหน้าที่แสดงข้อมูลส่วนตัวหาผู้ใช้ผ่าน src/lib/current-user.ts เท่านั้น", "ไม่รับ user id จาก body, query string หรือ header", "ไม่มี session ตอบ 401 · มี session แต่ไม่มีสิทธิ์ ตอบ 403", "การซ่อนปุ่มบนหน้าจอไม่ใช่การตรวจสิทธิ์"], 1.3, 0.75, 14); }

// 10 ดี/ไม่ดี
goodBad(pres, S2, "ตัวอย่าง route handler: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างใช้ feature แจ้งเตือนซึ่งอยู่นอกขอบเขตของ project สมมติมี endpoint เปิดหรือปิดการแจ้งเตือนของตน ตัวอย่างที่ไม่ดีรับ userId จาก body ไม่ตรวจ session และไม่ตรวจชนิดของ enabled",
  ["export async function PUT(req) {", "  const { userId, enabled } =", "    await req.json();", "  await setNotificationPreference(", "    userId, enabled);", "  return new Response(null,", "    { status: 204 });", "}"],
  ["export async function PUT(req) {", "  const user = await currentUser();", "  if (!user) return Response.json(", '    { code: "UNAUTHENTICATED" },', "    { status: 401 });", "  const { enabled } = await req.json();", "  await setNotificationPreference(", "    user.id, enabled === true);", "  return new Response(null,", "    { status: 204 });", "}"], 11);

// 11 ปัญหา
{ const s = lightSlide(pres, S2, "route handler ที่ไม่ดีมีปัญหาอะไร", "ข้อแรกคือช่องโหว่ที่พบบ่อยที่สุดในระบบที่ AI สร้าง");
  rowsTable(s, pres, [["รับ userId จาก body", "ผู้ใช้คนใดก็ปิดการแจ้งเตือนของคนอื่นได้"], ["ไม่ตรวจว่ามี session", "ผู้ที่ยังไม่เข้าสู่ระบบก็เรียกได้"], ["ไม่ตรวจชนิดของ enabled", "ค่าที่ไม่ใช่ boolean ถูกบันทึกลงฐานข้อมูล"]], 0.5, 1.3, [3.2, 5.8], 0.9, { fills: [K.redT, K.redT, K.redT], fs: 14 });
  box(s, pres, 0.5, 4.2, 9, 0.7, K.amberT); T(s, "REVIEW.md จาก WS-04 มีข้อห้ามอ่าน user id จาก body อยู่แล้ว บทนี้ทำให้เป็นจริงทั้งระบบ", { x: 0.75, y: 4.2, w: 8.5, h: 0.7, fontSize: 13, bold: true, valign: "middle" }); }

// 12 Lovable
caseSlide(pres, S2, { title: "กรณีจริง: แอปที่ AI สร้างเชื่อ browser", tag: "Lovable · CVE-2025-48757 · มีนาคม–พฤษภาคม 2025",
  notes: "Matt Palmer และผู้ร่วมวิจัยตรวจแอปที่สร้างด้วย Lovable จากแอป 1,645 แอปในหน้ารวมผลงาน พบ 170 แอปที่ผู้ใดก็อ่านหรือเขียนข้อมูลได้โดยไม่ต้องเข้าสู่ระบบ ข้อมูลที่รั่วมีอีเมล ชื่อ เบอร์โทร ข้อมูลการชำระเงิน และ API key แอปเรียกฐานข้อมูลจาก browser โดยตรงและขาดการตรวจสิทธิ์ฝั่งฐานข้อมูล ได้รหัส CVE-2025-48757 Lovable โต้แย้งว่าเป็นความรับผิดชอบของผู้สร้างแต่ละแอป",
  facts: ["ตรวจ 1,645 แอปในหน้ารวมผลงานของ Lovable", "พบ 170 แอป ที่ผู้ใดก็อ่านหรือเขียนข้อมูลได้โดยไม่ต้องเข้าสู่ระบบ", "ข้อมูลที่รั่ว: อีเมล ชื่อ เบอร์โทร ข้อมูลการชำระเงิน API key", "เรียกฐานข้อมูลจาก browser โดยตรง ตรวจสิทธิ์อยู่ที่หน้าจอ", "Lovable โต้แย้งว่าเป็นความรับผิดชอบของผู้สร้างแต่ละแอป"],
  principle: "บทเรียน", takeaway: "code ที่ AI สร้างทำงานได้ตามที่เห็นบนหน้าจอ แต่การตรวจสิทธิ์ฝั่ง server ต้องมีคนกำหนดและตรวจเอง",
  refs: "อ้างอิง: Matt Palmer — Statement on CVE-2025-48757 · NVD — CVE-2025-48757" });

// 13 หลักการ E2E
{ const s = lightSlide(pres, S3, "หลักการเขียน E2E test",
    "ไม่ทำ endpoint สำหรับล้างข้อมูลในระบบ test ใช้ DATABASE_URL ของฐานข้อมูลในเครื่องโดยตรง ระบบที่ขึ้นเว็บจริงจึงไม่มีทางล้างข้อมูล แต่ละ context ของผู้ใช้มี cookie ของตนเอง เหมือนผู้ใช้คนละเครื่อง");
  numbered(s, ["อ่านจาก spec ไม่ใช่จาก code: อ้างข้อความบนหน้าจอที่ spec กำหนด", "ใช้ locator แบบที่ผู้ใช้เห็น: getByRole(\"button\", { name }) ไม่ใช่ .btn-primary", "เตรียมข้อมูลตรงที่ฐานข้อมูล ทำและตรวจผ่านหน้าจอ", "แต่ละ test สร้างข้อมูลของตนเอง ไม่พึ่ง seed", "รอด้วย expect ไม่ใช่เวลาที่กำหนดเอง (waitForTimeout)", "ผู้ใช้หลายคนใช้ browser context แยกกัน", "ไม่ทำ endpoint ล้างข้อมูลในระบบ ใช้ DATABASE_URL ในเครื่องตรง ๆ"], 1.2, 0.46, 12); }

// 14 ดี/ไม่ดี
goodBad(pres, S3, "ตัวอย่าง E2E test: ไม่ดี เทียบกับ ดี",
  "ตัวอย่างที่ดีสร้างกิจกรรมของตนเอง 1 ที่นั่ง ใช้ผู้ใช้ 2 คน (Alice, Bob) ใน context แยกกัน Bob อยู่ในคิวสำรอง Alice ยกเลิก แล้ว Bob เห็นข้อความที่ได้ที่นั่ง ใช้ locator แบบที่ผู้ใช้เห็น ตัวอย่างที่ไม่ดีใช้ selector ตามโครงสร้าง ใช้ e-1 จาก seed ใช้ผู้ใช้คนเดียว และ waitForTimeout",
  ['test("notification", async ({page}) => {', '  await page.goto("/login");', '  await page.click(', '    "ul > li:nth-child(2) > button");', '  await page.goto("/events/e-1");', '  await page.click(".btn-primary");', "  await page.waitForTimeout(2000);", '  await page.click(".btn-danger");', "  expect(await page.content())", '    .toContain("ได้ที่นั่ง");', "});"],
  ['test("แจ้งเตือน: คิวสำรองเห็นข้อความ", ...', '  await createEvent("e2e-notify", 1);', '  const alice = await loginAs(browser,', '    "Alice");', '  await alice.getByRole("button",', '    { name: "ลงทะเบียน" }).click();', "  // Bob ลงทะเบียน → อยู่ในคิวสำรอง", '  await alice.getByRole("button",', '    { name: "ยกเลิก" }).click();', "  await bob.reload();", '  await expect(bob.getByText(', '    "คุณได้ที่นั่งจากคิวสำรองแล้ว"))', "    .toBeVisible();"], 10);

// 15 ปัญหา
{ const s = lightSlide(pres, S3, "E2E test ที่ไม่ดีมีปัญหาอะไร", "ผู้ใช้คนเดียวลงทะเบียนแล้วยกเลิกเอง ไม่มีใครอยู่ในคิวสำรอง จึงไม่ได้ตรวจการเลื่อนคิวเลย");
  rowsTable(s, pres, [["selector ตามโครงสร้าง HTML และ class", "เปลี่ยนลำดับผู้ใช้หรือ class แล้ว test พัง ทั้งที่ระบบถูก"], ["ใช้กิจกรรม e-1 จาก seed", "seed เปลี่ยน หรือ test อื่นลงทะเบียนไว้ก่อน ผลจะเปลี่ยน"], ["ผู้ใช้คนเดียวลงทะเบียนแล้วยกเลิกเอง", "ไม่มีคนในคิวสำรอง ไม่ได้ตรวจการเลื่อนคิวเลย"], ["waitForTimeout(2000)", "ช้าโดยไม่จำเป็น และ flaky เมื่อเครื่องช้ากว่า 2 วินาที"], ["page.content() มีคำว่า “ได้ที่นั่ง”", "ผ่านได้แม้ข้อความอยู่ส่วนอื่นของหน้า เช่น คำอธิบายกิจกรรม"], ["ชื่อ test ไม่บอกพฤติกรรม", "ไม่ผ่านใน CI แล้วไม่รู้ว่าพฤติกรรมใดพัง"]], 0.5, 1.3, [3.4, 5.6], 0.52, { fills: [K.redT, K.redT, K.redT, K.redT, K.redT, K.redT], fs: 11 }); }

// 16 flaky
{ const s = lightSlide(pres, S3, "test ที่ flaky ต้องแก้ ไม่ใช่ปล่อยไว้",
    "ใน CI ตั้งให้ลองใหม่ 1 ครั้ง Playwright รายงาน test ที่ผ่านในครั้งที่ 2 ว่า flaky test ที่ถูกรายงานว่า flaky ต้องแก้ ไม่ใช่ปล่อยไว้เพราะ CI เป็นสีเขียว ใช้ npx playwright test --repeat-each 5 ตรวจในเครื่อง");
  rowsTable(s, pres, [["รอด้วยเวลาที่กำหนดเอง", "ใช้ expect ที่รอจนเห็นผล"], ["พึ่งข้อมูลที่ test อื่นสร้าง", "ให้แต่ละ test สร้างข้อมูลของตนเอง"], ["ตรวจก่อนหน้าจอโหลดข้อมูลใหม่", "รอข้อความที่ยืนยันผลก่อนทำขั้นต่อไป"], ["เวลากิจกรรมใกล้ขอบกฎ R4", "สร้างกิจกรรมที่เริ่มในอีก 7 วัน ให้ห่างจากขอบชัดเจน"]], 0.5, 1.3, [3.4, 5.6], 0.62, { head: ["สาเหตุที่พบบ่อย", "วิธีแก้"], fs: 13 });
  box(s, pres, 0.5, 4.5, 9, 0.5, K.amberT); T(s, "ลองใหม่ 1 ครั้งใน CI แล้วรายงาน flaky · แก้ทุก test ที่ถูกรายงาน", { x: 0.75, y: 4.5, w: 8.5, h: 0.5, fontSize: 13, bold: true, valign: "middle" }); }

// 17 loop vs verifier
{ const s = lightSlide(pres, S4, "feedback loop กับ verifier ต่างกัน",
    "playbook แยก 2 สิ่งนี้ feedback loop คือ test และ build ที่ agent รันซ้ำระหว่างทำงานจนผ่าน verifier คือการตรวจครั้งสุดท้ายด้วยบทสนทนาใหม่เมื่อ agent คิดว่างานเสร็จ ผลจึงไม่ถูกชักนำโดยสมมติฐานเดียวกับที่ใช้เขียน code");
  flow(s, pres, [{ t: "agent ทำงาน", sub: "feedback loop: test + build รันซ้ำจนผ่าน" }, { t: "agent คิดว่าเสร็จ" }, { t: "verifier", sub: "บทสนทนาใหม่ · เปิดระบบจริง · รายงานอย่างเดียว", fill: K.amber }], 0.5, 1.4, 9, 1.4, { gap: 0.3, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.2, 9, 1.7, K.paper); T(s, "verifier ไม่ถูกชักนำด้วยสมมติฐานเดียวกับที่ใช้เขียน code เพราะเริ่มจาก spec และระบบที่รัน ไม่ใช่จากคำอธิบายของผู้เขียน", { x: 0.75, y: 3.2, w: 8.5, h: 1.7, fontSize: 15, bold: true, valign: "middle" }); }

// 18 เปรียบเทียบ 3
{ const s = lightSlide(pres, S4, "AI review, verifier และ E2E ใน CI", "เมื่อ verifier พบพฤติกรรมที่ควรตรวจซ้ำทุก PR ให้เพิ่มเป็น E2E test verifier จึงเป็นทางที่ test ใหม่เกิดจากสิ่งที่พบจริง");
  rowsTable(s, pres, [["อ่านอะไร", "diff, REVIEW.md, spec", "spec, plan และระบบที่รัน", "journey ที่เขียนไว้"], ["ทำอะไร", "อ่าน code แล้วหาปัญหา", "เปิดระบบ ลองใช้ แล้วรายงาน", "รันซ้ำทุก PR"], ["จับอะไรได้", "code ต่างจาก spec · logic ผิด", "พฤติกรรมที่ยังไม่มี test · flow ข้างเคียงพัง", "journey ที่เคยใช้ได้กลับพัง"], ["ตัดสิน", "ไม่ตัดสิน ผู้อนุมัติตัดสิน", "ไม่ตัดสิน ผู้อนุมัติตัดสิน", "ขวาง merge ด้วย ruleset"]], 0.5, 1.3, [1.4, 2.4, 2.7, 2.5], 0.82, { head: ["", "AI review (WS-04)", "verifier (บทนี้)", "E2E ใน CI"], fs: 11 }); }

// 19 สถานการณ์
{ const s = lightSlide(pres, S4, "สถานการณ์ที่พบบ่อย: “ทดสอบแล้ว ผ่านทั้งหมด”", "สถานการณ์ที่พบบ่อย ไม่ใช่เหตุการณ์จริงที่มีแหล่งอ้างอิง");
  T(s, "สถานการณ์ที่พบบ่อย", { x: 0.5, y: 1.25, w: 5, h: 0.3, fontSize: 12, bold: true, color: K.teal });
  flow(s, pres, [{ t: "agent ทำหน้ารายละเอียดกิจกรรม", sub: "รายงาน “ทดสอบแล้ว ผ่านทั้งหมด”" }, { t: "หมายถึง npm test", sub: "ตรวจแค่กฎใน src/domain", fill: K.amberT }, { t: "ปุ่มยกเลิกเรียก path ที่สะกดผิด", sub: "ผู้อนุมัติอ่าน diff ไม่สังเกต", fill: K.redT }], 0.5, 1.65, 9, 1.5, { gap: 0.3, fs: 12, sfs: 11 });
  box(s, pres, 0.5, 3.5, 9, 1.4, K.greenT); T(s, "verifier ที่เปิดระบบแล้วกดปุ่มจริง จะพบตั้งแต่ครั้งแรก", { x: 0.75, y: 3.5, w: 8.5, h: 1.4, fontSize: 18, bold: true, valign: "middle" }); }

// 20 verifier หลักการ
{ const s = lightSlide(pres, S4, "หลักการเขียน .agents/verifier.md", "template อยู่ในขั้นตอนที่ 5 ของ lab agent บางตัวรองรับเรียก verifier เป็น subagent เช่น Claude Code อ่านจาก .claude/agents/ ถ้าไม่มี ให้เปิดบทสนทนาใหม่แล้วสั่งให้อ่าน .agents/verifier.md ให้ผลเดียวกัน");
  numbered(s, ["เปิดในบทสนทนาใหม่ โดยสมาชิกที่ไม่ได้สั่ง AI เขียน code ของ PR นั้น", "บอกว่าต้องอ่านอะไร และเปิดระบบด้วยคำสั่งใด", "ลองพฤติกรรมที่ PR เปลี่ยน และ flow ข้างเคียง 2 flow", "ห้ามแก้ไฟล์ ห้าม commit ห้ามรันคำสั่งที่ลบข้อมูล (guard จาก WS-05 ขวางอยู่)", "รายงานทุกคำสั่งพร้อมผลที่เห็นจริง · ไม่ตัดสินว่า merge ได้"], 1.25, 0.6, 13); }

// 21 verifier template
{ const s = lightSlide(pres, S4, "โครงของ .agents/verifier.md", "ฉบับเต็มเป็นภาษาอังกฤษอยู่ในขั้นตอนที่ 5 ของ lab รายงานเป็นภาษาไทยในรูป Markdown สำหรับวางเป็น comment ใน PR");
  codeBox(s, pres, 0.5, 1.3, 5.6, 3.65, ["---", "name: verifier", "description: Runs the system and checks", "  the branch against the spec. Reports only.", "---", "## Read first  AGENTS.md · spec · plan · diff", "## Start the system", "  docker compose up -d --build --wait", "## Check  npm test · npm run e2e ·", "  spec behaviors · 2 neighboring flows ·", "  no-session request to every endpoint", "## Rules  never edit/commit/delete data", "## Report in Thai (PR comment)"], 11);
  side(s, [["ตาราง", "พฤติกรรม | หัวข้อ spec | สิ่งที่เห็น | ตรงหรือไม่", K.tealT], ["ต้องมี", "คำสั่งที่รันและผลที่เห็นจริง · สิ่งที่ตรวจไม่ได้และเหตุผล", K.paper], ["ห้าม", "บอกว่า PR ควร merge หรือไม่", K.redT]]); }

// 22 CI jobs
{ const s = lightSlide(pres, S5, "E2E ใน CI: job e2e แยกจาก build",
    "E2E ต้องใช้ระบบทั้งระบบ CI เปิดด้วย docker compose up แบบเดียวกับในเครื่อง สิ่งแวดล้อมจาก WS-05 ทำให้ผลในเครื่องและใน CI เหมือนกัน แยกเป็น job e2e 2 job รันพร้อมกัน เจ้าของ repository เพิ่ม e2e เป็น required status check ใน ruleset main-gate job e2e build image เอง จึงย้าย docker build ออกจาก job build");
  flow(s, pres, [{ t: "Pull request" }], 0.5, 2.1, 1.7, 1.0, { fs: 13 });
  arrow(s, pres, 2.25, 2.9, 1.75); arrow(s, pres, 2.25, 2.9, 3.0);
  box(s, pres, 3.0, 1.35, 3.5, 0.95, K.tealT); T(s, [{ text: "job build", options: { bold: true, fontSize: 13, breakLine: true } }, { text: "lint · unit · integration · build", options: { fontSize: 11 } }], { x: 3.1, y: 1.35, w: 3.3, h: 0.95, valign: "middle", align: "center" });
  box(s, pres, 3.0, 2.8, 3.5, 0.95, K.tealT); T(s, [{ text: "job e2e", options: { bold: true, fontSize: 13, breakLine: true } }, { text: "compose up · playwright test", options: { fontSize: 11 } }], { x: 3.1, y: 2.8, w: 3.3, h: 0.95, valign: "middle", align: "center" });
  arrow(s, pres, 6.55, 7.1, 1.82); arrow(s, pres, 6.55, 7.1, 3.27);
  box(s, pres, 7.15, 1.9, 2.35, 1.3, K.amber); T(s, "ruleset\nbuild + e2e", { x: 7.15, y: 1.9, w: 2.35, h: 1.3, fontSize: 14, bold: true, align: "center", valign: "middle" });
  box(s, pres, 3.0, 4.0, 6.5, 0.9, K.paper); T(s, "ไม่ผ่าน → เก็บ playwright-report (HTML + trace) ไว้ให้ดาวน์โหลดจากหน้า CI", { x: 3.15, y: 4.0, w: 6.2, h: 0.9, fontSize: 13, valign: "middle" }); }

// 23 trace
{ const s = lightSlide(pres, S5, "trace ช่วยหาสาเหตุโดยไม่ต้องรันซ้ำ", "trace แสดงภาพหน้าจอ คำขอ และ log ของทุกขั้น จึงหาสาเหตุได้โดยไม่ต้องรันซ้ำในเครื่อง");
  rowsTable(s, pres, [["แยกเป็น job e2e", "2 job รันพร้อมกัน เห็นทันทีว่าส่วนใดไม่ผ่าน"], ["required check", "เจ้าของ repo เพิ่ม e2e ใน ruleset main-gate"], ["เก็บ report และ trace", "ภาพหน้าจอ คำขอ และ log ของทุกขั้น ดาวน์โหลดจากหน้า CI"], ["build image ใน job e2e", "ย้าย docker build ออกจาก job build"]], 0.5, 1.3, [3.2, 5.8], 0.8, { fs: 13 }); }

// 24 สรุป
{ const s = darkSlide(pres, S6, "สรุป 5 ข้อ ก่อนเข้าสู่ lab");
  T(s, "สรุป", { x: 0.7, y: 0.4, w: 8, h: 0.6, fontSize: 30, bold: true, color: K.amber });
  const r = ["E2E จับการเชื่อมกันผิดระหว่างชั้น แต่ช้าและหาสาเหตุยาก จึงมีเฉพาะ journey หลัก", "server รู้จักผู้ใช้จาก session ที่ตนออกให้ และตรวจสิทธิ์ทุกคำขอ การซ่อนปุ่มไม่ใช่การตรวจสิทธิ์", "E2E อ่านจาก spec ใช้ locator แบบที่ผู้ใช้เห็น สร้างข้อมูลเอง และรอด้วย expect", "verifier ตรวจด้วยบทสนทนาใหม่ เปิดระบบจริง สิ่งที่พบซ้ำได้ควรกลายเป็น E2E test", "E2E เป็น required check ของทุก PR และเก็บ trace ไว้เมื่อไม่ผ่าน"];
  r.forEach((t, i) => { const y = 1.15 + i * 0.78; chip(s, pres, 0.7, y + 0.08, i + 1, K.amber, K.ink, 0.4); T(s, t, { x: 1.3, y, w: 8.2, h: 0.65, fontSize: 14, color: K.white, valign: "middle" }); }); }

// 25-26 Glossary
const GL = [["E2E test", "test ที่ตรวจ journey ผ่านทุกชั้นตั้งแต่ browser"], ["Playwright", "เครื่องมือควบคุม browser เพื่อทำ E2E test"], ["journey", "ลำดับที่ผู้ใช้ทำตามเป้าหมาย เช่น ลงทะเบียนจนได้ที่นั่ง"],
  ["session", "การที่ server จำผู้ใช้ผ่านรหัสที่ตนออกให้"], ["HttpOnly / Secure / SameSite", "คุณสมบัติของ cookie ที่ป้องกันการขโมยและการส่งข้ามเว็บ"], ["401 / 403", "ยังไม่เข้าสู่ระบบ / เข้าแล้วแต่ไม่มีสิทธิ์"],
  ["locator", "วิธีหา element แบบที่ผู้ใช้เห็น เช่น getByRole"], ["browser context", "browser แยกที่มี cookie ของตนเอง เหมือนผู้ใช้คนละเครื่อง"], ["flaky test", "test ที่ผลไม่คงที่ แก้ที่สาเหตุ ไม่ใช่รันซ้ำ"],
  ["trace", "บันทึกภาพ คำขอ และ log ของทุกขั้น ใช้หาสาเหตุ"], ["verifier", "การตรวจสุดท้ายในบทสนทนาใหม่ เปิดระบบจริง รายงานอย่างเดียว"], ["required check e2e", "job ที่ต้องผ่านก่อน merge ตาม ruleset"]];
[0, 6].forEach((k, n) => { const s = lightSlide(pres, S7, "Glossary (" + (n + 1) + "/2)", "ใช้ทบทวนคำศัพท์ของบทนี้");
  GL.slice(k, k + 6).forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.3 + Math.floor(i / 2) * 1.2; box(s, pres, x, y, 4.4, 1.1, K.paper);
    T(s, [{ text: v[0], options: { bold: true, fontSize: 14, color: K.teal, breakLine: true } }, { text: v[1], options: { fontSize: 12 } }], { x: x + 0.2, y, w: 4.0, h: 1.1, valign: "middle" }); }); });

// L1
{ const s = darkSlide(pres, S8, "เปลี่ยนจากบรรยายเป็นลงมือ");
  T(s, "Lab", { x: 0.7, y: 1.1, w: 8, h: 0.5, fontSize: 18, bold: true, color: K.amber });
  T(s, "journey ผ่านหน้าจอ\nตรวจโดย E2E และ verifier", { x: 0.7, y: 1.7, w: 8.6, h: 1.6, fontSize: 36, bold: true, color: K.white });
  T(s, "04-access → session → E2E (แดง) → หน้าจอ (เขียว) → verifier → job e2e", { x: 0.7, y: 3.8, w: 8.6, h: 0.5, fontSize: 16, color: "B8C4D4" }); }

// L2
{ const s = lightSlide(pres, S8, "Brief ของ lab: ทำอะไรและได้อะไร", "งานกลุ่ม ใช้ repository เดิมจาก WS-05");
  const c = [["รูปแบบ", "งานกลุ่ม ใช้ repository เดิมจาก WS-05"], ["เป้าหมาย", "server รู้จักผู้ใช้จาก session เท่านั้น · ระบบมีหน้าจอครบ 5 หน้า"], ["สิ่งที่ได้", "journey หลักมี E2E test ที่ CI รันทุก PR และขวาง merge เมื่อไม่ผ่าน"], ["ด้วย", ".agents/verifier.md ที่ใช้ตรวจ PR ด้วยบทสนทนาใหม่"]];
  c.forEach((v, i) => { const x = 0.5 + (i % 2) * 4.6, y = 1.35 + Math.floor(i / 2) * 1.65; box(s, pres, x, y, 4.4, 1.5, K.paper);
    T(s, v[0], { x: x + 0.25, y: y + 0.15, w: 3.9, h: 0.35, fontSize: 13, bold: true, color: K.teal }); T(s, v[1], { x: x + 0.25, y: y + 0.55, w: 3.9, h: 0.85, fontSize: 13 }); }); }

// L3
{ const s = lightSlide(pres, S8, "7 ขั้นตอนของ lab", "ทุกขั้นมี ทำ / ผลที่ควรเห็น / หากติดปัญหา");
  step7(s, [["1", "intent, spec, plan ของ 04-access", "ผ่าน PR · ตัดสินข้อกังวลเรื่องสิทธิ์"], ["2", "session แทน header x-user-id", "ตาราง sessions · cookie · current-user.ts"], ["3", "E2E ของ journey ก่อนมีหน้าจอ", "Playwright · test แดงก่อน"], ["4", "ทำหน้าจอจน E2E ผ่าน", "5 หน้า · Suspense + connection()"], ["5", "ตรวจด้วย verifier ก่อน merge", "สมาชิกอีกคน · บทสนทนาใหม่"], ["6", "E2E ใน CI + break-it-live", "job e2e · required check · PR ค้างเปิด"], ["7", "บันทึกหลักฐาน", "เวลา journey · repeat-each 5 · verifier"]]); }

// L4 repo
{ const s = lightSlide(pres, S8, "repository ที่จะได้เมื่อจบบทนี้", "ตาราง sessions บนฐานข้อมูลของเว็บจริงและ required check e2e ใน ruleset ไม่ใช่ไฟล์ใน repository");
  codeBox(s, pres, 0.5, 1.3, 5.8, 3.65, ["playwright.config.ts · package.json ← 3", ".agents/verifier.md ← 5", "db/schema.sql ← 2 (ตาราง sessions)", "docs/openapi.yaml ← 1 (/api/session, 401, 403)", "docs/features/04-access/ ← 1", "e2e/db.ts · journey.spec.ts ← 3", "src/lib/session.ts ← 2", "src/lib/current-user.ts ← 2 (จาก session)", "src/app/api/session/route.ts ← 2", "src/app/login · events · my-registrations", "  · manage ← 4", "evidence/ws-06.md ← 7", ".github/workflows/ci.yml ← 6 (job e2e)"], 11);
  side(s, [["ในไฟล์", "ci.yml (job e2e) · verifier.md · e2e/"], ["ใน GitHub/เว็บจริง", "ruleset: required check e2e · ตาราง sessions", K.amberT], ["ถูกลบ", "การอ่าน x-user-id header", K.redT]]); }

// L5 session
{ const s = lightSlide(pres, S8, "ขั้นที่ 2: session แทน header",
    "สร้างตาราง sessions เพิ่ม db/schema.sql cookie ชื่อ session (HttpOnly, SameSite=Lax, Secure ใน production) current-user.ts อ่านจาก session แทน header ตาราง sessions บนฐานข้อมูลของเว็บจริงสมาชิกใส่ผ่าน SQL Editor ไม่ใช่ agent");
  flow(s, pres, [{ t: "ตาราง sessions", sub: "db/schema.sql" }, { t: "POST /api/session", sub: "Set-Cookie: session" }, { t: "current-user.ts", sub: "อ่านจาก session", fill: K.tealT }, { t: "ไม่มี session = 401", fill: K.amberT }], 0.5, 1.5, 9, 1.4, { gap: 0.25, fs: 13, sfs: 11 });
  box(s, pres, 0.5, 3.4, 9, 1.5, K.redT); T(s, "ตาราง sessions บนฐานข้อมูลเว็บจริง: สมาชิกใส่ผ่าน SQL Editor ไม่ใช่ agent (ตามหลักจาก WS-05)", { x: 0.75, y: 3.4, w: 8.5, h: 1.5, fontSize: 15, bold: true, valign: "middle" }); }

// L6 steps 3-4
{ const s = lightSlide(pres, S8, "ขั้นที่ 3–4: E2E แดงก่อน แล้วทำหน้าจอให้เขียว",
    "ขั้น 3 ติดตั้ง @playwright/test@1.64 เขียน journey ก่อนมีหน้าจอ อ้างข้อความบนหน้าจอตาม spec ขั้น 4 สั่ง AI ทำ 5 หน้าจอจน E2E ผ่าน โดยห้ามแก้ e2e/ src/domain หรือ test เดิม next.config.ts จาก create-next-app 16 มี cacheComponents true อยู่แล้ว ต้องใส่ส่วนที่อ่านฐานข้อมูลหรือ cookie ใน Suspense และเรียก await connection() ระหว่างที่ AI ทำงาน สมาชิกอีกคนเตรียมตรวจด้วยมือ");
  box(s, pres, 0.5, 1.3, 4.4, 3.65, K.redT); T(s, "ขั้น 3: ก่อนมีหน้าจอ", { x: 0.75, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: K.red });
  T(s, bullets(["ติดตั้ง @playwright/test@1.64", "เขียน e2e/journey.spec.ts ตาม spec", "ยืนยันว่า test ไม่ผ่านด้วยเหตุผลที่ถูกต้อง", "commit test แดงก่อน"]), { x: 0.75, y: 1.9, w: 3.9, h: 2.9, fontSize: 13 });
  box(s, pres, 5.1, 1.3, 4.4, 3.65, K.greenT); T(s, "ขั้น 4: ทำหน้าจอ", { x: 5.35, y: 1.4, w: 4, h: 0.4, fontSize: 15, bold: true, color: K.green });
  T(s, bullets(["สั่ง AI ทำ 5 หน้าจอตาม PROJECT.md หัวข้อ 5", "ห้ามแก้ e2e/, src/domain/, test เดิม", "Suspense + await connection() (cacheComponents)", "สมาชิกอีกคนตรวจด้วยมือ: 2 ผู้ใช้, URL ตรง"]), { x: 5.35, y: 1.9, w: 3.9, h: 2.9, fontSize: 13 }); }

// L7 verifier step 5
{ const s = lightSlide(pres, S8, "ขั้นที่ 5: verifier ก่อน merge",
    "สมาชิกอีกคนสร้าง .agents/verifier.md บน branch docs/verifier แล้ว merge จากนั้น Update branch ใน PR feat/screens สมาชิกที่ไม่ได้สั่ง AI เขียนหน้าจอเปิด AI agent ในบทสนทนาใหม่ สั่ง Read .agents/verifier.md and follow it นำรายงานไปวางเป็น comment ผู้เขียนตอบทุกข้อที่ไม่ตรงกับ spec ถ้า verifier แก้ไฟล์ ให้ปฏิเสธ ถ้ารายงานไม่มีคำสั่งและผล ให้สั่งแสดงใหม่");
  flow(s, pres, [{ t: "PR verifier.md", sub: "merge เข้า main" }, { t: "Update branch", sub: "feat/screens" }, { t: "บทสนทนาใหม่", sub: "สมาชิกที่ไม่ได้เขียน" }, { t: "รายงานเป็น comment", sub: "คำสั่ง + ตาราง", fill: K.tealT }, { t: "ผู้เขียนตอบ", sub: "ทุกข้อที่ไม่ตรง", fill: K.amber }], 0.5, 1.4, 9, 1.4, { gap: 0.2, fs: 12, sfs: 10 });
  rowsTable(s, pres, [["verifier แก้ไฟล์หรือเสนอแก้", "ปฏิเสธ ย้ำว่ารายงานเท่านั้น"], ["รายงานว่าตรงหมดแต่ไม่มีคำสั่ง/ผล", "สั่งให้แสดงคำสั่งและผลที่เห็นจริงของแต่ละข้อ"], ["ไม่มี browser", "ตรวจผ่าน API และ npm run e2e พอ บันทึกข้อจำกัด"]], 0.5, 3.1, [3.4, 5.6], 0.5, { fills: [K.amberT, K.amberT, K.amberT], fs: 12 }); }

// L8 CI + break
{ const s = lightSlide(pres, S8, "ขั้นที่ 6: job e2e และ break-it-live",
    "6.1 เพิ่ม job e2e ใน ci.yml แล้วเจ้าของ repository เพิ่ม e2e เป็น required check ใน main-gate 6.2 ใน src/data ทำให้การยกเลิกไม่บันทึกสถานะ CONFIRMED ของผู้ที่ได้เลื่อนจากคิวสำรอง ห้ามแก้ src/domain รัน npm test ในเครื่องให้เห็นว่ายังผ่าน แล้ว push เปิด PR ทิ้งไว้ถึงคาบ demo ดาวน์โหลด playwright-report เปิด trace ของ test ที่ไม่ผ่าน ถ้า build ไม่ผ่านด้วย เพราะ integration test ตรวจการบันทึกนี้อยู่แล้ว ถือเป็นเรื่องดี");
  flow(s, pres, [{ t: "ใน src/data", sub: "ไม่บันทึก CONFIRMED ของผู้ได้เลื่อนคิว" }, { t: "npm test ในเครื่อง", sub: "ยังผ่าน (ห้ามแก้ domain)", fill: K.greenT }, { t: "เปิด PR", sub: "job e2e ไม่ผ่าน", fill: K.redT }, { t: "เปิด trace", sub: "จาก playwright-report" }], 0.5, 1.4, 9, 1.4, { gap: 0.25, fs: 12, sfs: 10 });
  box(s, pres, 0.5, 3.2, 9, 1.7, K.paper); T(s, [{ text: "พิสูจน์ได้: unit test ผ่าน แต่ journey พัง — E2E จับสิ่งที่ unit test ไม่เห็น", options: { bold: true, fontSize: 16, breakLine: true } }, { text: "PR เปิดทิ้งไว้ถึงคาบ demo แล้วปิดโดยไม่ merge", options: { fontSize: 13 } }], { x: 0.75, y: 3.2, w: 8.5, h: 1.7, valign: "middle" }); }

// L9 evidence
{ const s = lightSlide(pres, S8, "หลักฐานใน evidence/ws-06.md", "ถ้า --repeat-each 5 ไม่ผ่านบางครั้ง test นั้น flaky ให้แก้ก่อนบันทึก ถ้า verifier ไม่พบอะไร ให้บันทึกสิ่งที่ตรวจไม่ได้");
  rowsTable(s, pres, [["journey ด้วยมือผ่าน curl (0-Before)", "เวลา · จำนวนคำสั่ง"], ["journey ด้วย E2E test", "ในเครื่อง (วินาที) · ใน CI job e2e (นาที วินาที)"], ["npx playwright test --repeat-each 5", "ผ่านกี่ครั้งจากกี่ครั้ง"], ["คำขอที่มีเฉพาะ x-user-id", "status code ก่อนบทนี้ เทียบกับหลังบทนี้"], ["PR หน้าจอ · รายงาน verifier", "commit test แดง → commit ผ่าน · ลิงก์ comment"], ["สิ่งที่ verifier พบ · Break-it-live", "ตาราง สิ่งที่พบ/หัวข้อ spec/สิ่งที่ทำ · ลิงก์ PR และ job ที่ไม่ผ่าน"]], 0.5, 1.3, [3.5, 5.5], 0.56, { fs: 12 }); }

// L10 present
{ const s = lightSlide(pres, S8, "การวัดผล: Present 7 ขั้นตอน", "เวลา 5 นาทีต่อกลุ่ม ผู้ตรวจเลือกผู้ใช้จาก seed data ในขั้น 1 ไม่มีการให้คะแนน");
  const r = [["เปิด Live URL เข้าสู่ระบบเป็นผู้ใช้ที่ผู้ตรวจเลือก เปิดการลงทะเบียนของฉัน", "แสดงเฉพาะรายการของผู้ใช้คนนั้น พร้อมสถานะ"], ["curl ลงทะเบียนที่ Live URL ด้วย x-user-id โดยไม่มี cookie", "ได้ 401"], ["docker compose up -d --build --wait แล้ว npm run e2e", "test ของ journey ผ่าน"], ["เปิด PR break-it-live ที่ยังเปิดอยู่", "job e2e แดง และปุ่ม merge กดไม่ได้"], ["เปิด trace ของ test ที่ไม่ผ่านใน playwright-report", "ชี้ขั้นที่ไม่ผ่านและสิ่งที่หน้าจอแสดงแทน"], ["เปิด comment รายงาน verifier เลือก 1 ข้อที่ไม่ตรง spec", "อธิบายว่า verifier พบอย่างไร และกลุ่มทำอะไร"], ["เข้าสู่ระบบเป็นผู้เข้าร่วม พิมพ์ URL หน้าจัดการกิจกรรมเอง", "เปิดไม่ได้ตามที่ spec กำหนด"]];
  T(s, "ขั้นตอน", { x: 1.05, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute }); T(s, "เกณฑ์ผ่าน", { x: 5.3, y: 1.2, w: 3.5, h: 0.25, fontSize: 11, bold: true, color: K.mute });
  r.forEach((v, i) => { const y = 1.48 + i * 0.5; box(s, pres, 0.5, y, 9, 0.46, i % 2 ? K.white : K.paper); chip(s, pres, 0.55, y + 0.04, i + 1, K.teal, K.white, 0.38);
    T(s, v[0], { x: 1.05, y, w: 4.15, h: 0.46, fontSize: 10, valign: "middle", bold: true }); T(s, v[1], { x: 5.3, y, w: 4.1, h: 0.46, fontSize: 11, valign: "middle" }); }); }

// L11 Retro
{ const s = lightSlide(pres, S8, "Retro: ปรึกษากันแล้วบันทึกท้าย evidence", "ข้อ 3 ใช้ตัวเลขจาก evidence");
  const q = ["verifier พบสิ่งใดที่ AI review, unit test และ E2E ไม่พบ หรือไม่พบสิ่งใดที่ควรพบ", "ถ้าเพิ่ม E2E อีก 1 journey จะเลือกอะไร และเหตุใดไม่ตรวจด้วย unit test", "job e2e ทำให้เวลารอ CI ของแต่ละ PR เพิ่มเท่าไร และคุ้มหรือไม่"];
  q.forEach((t, i) => { const y = 1.4 + i * 1.15; box(s, pres, 0.5, y, 9, 1.0, K.paper); chip(s, pres, 0.75, y + 0.29, i + 1); T(s, t, { x: 1.4, y, w: 7.9, h: 1.0, fontSize: 16, valign: "middle" }); }); }

L.save(pres, "ws-06-e2e.pptx").then(() => console.log("saved"));
