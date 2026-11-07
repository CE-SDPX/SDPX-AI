// ชุดเครื่องมือกลางสำหรับสร้าง slides ของทุกบท
const pptxgen = require("pptxgenjs");
const SKILL = "/Users/rathachai/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/4369f3e2-fed2-4bac-b47b-3e350b3a8145/71094a90-c6c4-40e9-8048-33e6f1a16e6f/skills/pptx";
const { applyTheme } = require(SKILL + "/scripts/apply_theme.js");

const FONT = "Tahoma";
const K = { ink: "14213D", ink2: "3D4F66", mute: "6B7A8C", paper: "F1F4F8", line: "D5DCE5",
  teal: "1F7A8C", tealT: "DCEEF1", amber: "F4A261", amberT: "FDEBD9",
  green: "2A9D6F", greenT: "DDF1E7", red: "D6594A", redT: "F9E0DC", white: "FFFFFF" };
const THEME = { name: "SDPX-AI", headFontFace: FONT, bodyFontFace: FONT, colors: {
  dk1: K.ink, lt1: "FFFFFF", dk2: K.ink2, lt2: K.paper, accent1: K.teal, accent2: K.amber,
  accent3: K.green, accent4: K.red, accent5: "6C7FD8", accent6: "8D99AE", hlink: K.teal, folHlink: K.ink2 } };

function newDeck(title, sections = []) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
  pres.title = title; pres.author = "SDPX-AI · KMITL";
  const foot = (c) => [
    { image: { path: __dirname + "/assets/favicon.png", x: 0.5, y: 5.2385, w: 0.143, h: 0.143 } },
    { text: { text: "rathachai.github.io", options: { x: 0.71, y: 5.17, w: 1.9, h: 0.28, fontFace: FONT, fontSize: 10, color: c, valign: "middle", margin: 0 } } }];
  pres.defineSlideMaster({ title: "LIGHT", background: { color: "FFFFFF" },
    objects: [...foot("8D99AE"), { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.3, w: 9, h: 0.85,
      fontFace: FONT, fontSize: 26, bold: true, color: K.ink, valign: "middle", margin: 0 }, text: "" } }],
    slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.25, fontFace: FONT, fontSize: 10, color: K.mute, align: "right" } });
  pres.defineSlideMaster({ title: "DARK", background: { color: K.ink }, objects: foot("FFFFFF") });
  sections.forEach(t => pres.addSection({ title: t }));
  return pres;
}
const T = (s, text, o) => s.addText(text, Object.assign({ fontFace: FONT, isTextBox: true, margin: 0, valign: "top", color: K.ink, fontSize: 14 }, o));
function box(s, pres, x, y, w, h, fill, o = {}) {
  s.addShape(pres.ShapeType.roundRect, Object.assign({ x, y, w, h, fill: { color: fill }, rectRadius: 0.08,
    line: { color: o.line || fill, width: o.line ? 1 : 0 } }, o.shape || {}));
}
function chip(s, pres, x, y, label, fill = K.teal, color = K.white, d = 0.42) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 } });
  T(s, String(label), { x, y, w: d, h: d, align: "center", valign: "middle", bold: true, fontSize: 14, color });
}
function arrow(s, pres, x1, x2, y, color = K.mute) {
  s.addShape(pres.ShapeType.line, { x: x1, y, w: x2 - x1, h: 0, line: { color, width: 1.5, endArrowType: "triangle" } });
}
// แถวของ node เชื่อมด้วยลูกศร  items: {t, sub, wt, fill, color, human}
function flow(s, pres, items, x, y, w, h, o = {}) {
  const gap = o.gap ?? 0.28, tot = items.reduce((a, i) => a + (i.wt || 1), 0);
  const unit = (w - gap * (items.length - 1)) / tot; let cx = x;
  items.forEach((it, i) => {
    const bw = unit * (it.wt || 1);
    box(s, pres, cx, y, bw, h, it.fill || K.paper, { line: it.line });
    const runs = [{ text: it.t, options: { bold: true, fontSize: o.fs || 14, color: it.color || K.ink, breakLine: !!it.sub } }];
    if (it.sub) runs.push({ text: it.sub, options: { fontSize: o.sfs || 12, color: it.color || K.ink2 } });
    T(s, runs, { x: cx + 0.08, y, w: bw - 0.16, h, align: "center", valign: "middle" });
    if (i < items.length - 1) arrow(s, pres, cx + bw + 0.03, cx + bw + gap - 0.03, y + h / 2);
    cx += bw + gap;
  });
}
function lightSlide(pres, section, title, notes) {
  const s = pres.addSlide({ masterName: "LIGHT", sectionTitle: section });
  s.addText(title, { placeholder: "title" });
  if (notes) s.addNotes(notes);
  return s;
}
function darkSlide(pres, section, notes) {
  const s = pres.addSlide({ masterName: "DARK", sectionTitle: section });
  if (notes) s.addNotes(notes);
  return s;
}
const ref = (s, text) => T(s, text, { x: 2.9, y: 5.15, w: 6.0, h: 0.3, fontSize: 10, color: K.mute, valign: "middle" });
// สไลด์ "ตัวอย่างจากการทำงานจริง"
function caseSlide(pres, section, o) {
  const s = lightSlide(pres, section, o.title, o.notes);
  box(s, pres, 0.5, 1.3, 5.3, 3.65, K.paper);
  T(s, o.tag, { x: 0.75, y: 1.45, w: 4.8, h: 0.35, fontSize: 12, bold: true, color: K.teal });
  T(s, o.facts.map((f, i) => ({ text: f, options: { bullet: true, breakLine: i < o.facts.length - 1, paraSpaceAfter: 8 } })),
    { x: 0.75, y: 1.85, w: 4.8, h: 3.0, fontSize: 14 });
  box(s, pres, 6.05, 1.3, 3.45, 3.65, K.amberT);
  T(s, o.principle, { x: 6.3, y: 1.45, w: 3.0, h: 0.35, fontSize: 12, bold: true, color: "B5651D" });
  T(s, o.takeaway, { x: 6.3, y: 1.85, w: 3.0, h: 3.0, fontSize: 16, bold: true });
  ref(s, o.refs);
  return s;
}

// กล่อง code พื้นเข้ม
function codeBox(s, pres, x, y, w, h, lines, fs = 12, fill = K.ink) {
  box(s, pres, x, y, w, h, fill);
  T(s, lines.map((l, i) => ({ text: l, options: { breakLine: i < lines.length - 1 } })), { x: x + 0.2, y: y + 0.15, w: w - 0.4, h: h - 0.3, fontSize: fs, fontFace: "Courier New", color: "E6EDF5" });
}
// ตารางแบบการ์ดแถว: rows = [[c1,c2,...]], cw = ความกว้างคอลัมน์, head = หัวตาราง
function rowsTable(s, pres, rows, x, y, cw, rh, o = {}) {
  const w = cw.reduce((a, b) => a + b, 0), fs = o.fs || 13;
  if (o.head) { let cx = x + 0.2; o.head.forEach((h, j) => { T(s, h, { x: cx, y, w: cw[j] - 0.1, h: 0.28, fontSize: 11, bold: true, color: K.mute }); cx += cw[j]; }); y += 0.3; }
  rows.forEach((r, i) => { const yy = y + i * (rh + 0.08); box(s, pres, x, yy, w, rh, (o.fills && o.fills[i]) || K.paper);
    let cx = x + 0.2; r.forEach((c, j) => { T(s, c, { x: cx, y: yy, w: cw[j] - 0.15, h: rh, fontSize: fs, valign: "middle", bold: j === 0 && !o.noBold, fontFace: (o.mono && o.mono.includes(j)) ? "Courier New" : FONT }); cx += cw[j]; }); });
}
// สไลด์เปรียบเทียบ ดี / ไม่ดี  (บล็อก code สองฝั่ง)
function goodBad(pres, section, title, notes, bad, good, fs = 11) {
  const s = lightSlide(pres, section, title, notes);
  [[bad, K.red, K.redT, "ตัวอย่างที่ไม่ดี", 0.5], [good, K.green, K.greenT, "ตัวอย่างที่ดี", 5.1]].forEach(([lines, c, tint, lab, x]) => {
    box(s, pres, x, 1.3, 4.4, 3.65, tint); T(s, lab, { x: x + 0.2, y: 1.4, w: 4, h: 0.3, fontSize: 13, bold: true, color: c });
    T(s, lines.map((l, i) => ({ text: l, options: { breakLine: i < lines.length - 1 } })), { x: x + 0.2, y: 1.75, w: 4.0, h: 3.1, fontSize: fs, fontFace: "Courier New" }); });
  return s;
}
async function save(pres, file) { const out = require("path").join(__dirname, "..", file); await pres.writeFile({ fileName: out }); await applyTheme(out, THEME); }
module.exports = { K, FONT, newDeck, T, box, chip, arrow, flow, lightSlide, darkSlide, caseSlide, ref, save, codeBox, rowsTable, goodBad };
