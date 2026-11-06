# WS-08 · Lab — Quality Loop

**รูปแบบ:** งานกลุ่ม ใช้ repository เดิมของกลุ่มจาก WS-07

**เป้าหมาย:** ทุกข้อใน security checklist ของกลุ่มมีหลักฐานว่าตรวจด้วยอะไร
ผู้ใช้เข้าถึงข้อมูลของผู้อื่นไม่ได้ และมี access test ที่พิสูจน์ข้อนี้ทุก PR
CI ตรวจ dependency และ CodeQL ตรวจ code มี `SKILL.md` ของ security review
และ `LESSONS.md` ที่ผูกบทเรียนทั้งภาคการศึกษากับสิ่งที่ป้องกันไม่ให้เกิดซ้ำ

---

## สิ่งที่ต้องมีก่อนเริ่ม

- WS-07 เสร็จแล้ว: CI ผ่านทั้ง `build` และ `e2e` รวมถึง load test ของ R6
- ทุกคนทำ `0-Before.md` ส่วน B และ C เสร็จแล้ว และมีผลการลองโจมตีกับรายการบทเรียนที่จดไว้
- เจ้าของ repository อยู่ในคาบ เพราะขั้นตอนที่ 3 ต้องใช้สิทธิ์ของเจ้าของ

---

## โครงสร้าง repository ที่จะได้เมื่อจบบทนี้

แสดงเฉพาะไฟล์ที่เพิ่มหรือแก้ในบทนี้ ตัวเลขหลังชื่อไฟล์คือขั้นตอนที่สร้างหรือแก้ไฟล์นั้น

```
sdpx-[ชื่อกลุ่ม]/
├── AGENTS.md                         ← 6 เพิ่มบทเรียนที่ต้องจำ
├── LESSONS.md                        ← 6
├── .agents/
│   └── skills/
│       └── security-review/
│           └── SKILL.md              ← 4
├── docs/
│   └── security-checklist.md         ← 1, 2, 3, 4
├── e2e/
│   ├── db.ts                         ← 2 เพิ่ม createUser
│   └── access.spec.ts                ← 2
├── src/app/api/...                   ← 2, 4 แก้ตามที่ test หรือ security review พบ
├── evidence/
│   └── ws-08.md                      ← 7
└── .github/workflows/ci.yml          ← 3 เพิ่ม npm audit
```

CodeQL และ Dependabot alerts ในขั้นตอนที่ 3 เป็นการตั้งค่าใน GitHub ไม่ใช่ไฟล์ใน repository

---

## ขั้นตอนที่ 1 — เขียน security checklist

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/security-checklist
```

สร้าง `docs/security-checklist.md` ตั้งต้นจากตารางนี้
คอลัมน์ "ตรวจด้วย" บอกวิธีที่จะใช้ คอลัมน์ "หลักฐาน" จะเติมในขั้นตอนต่อไป
เพิ่มข้อจากผลการลองโจมตีในส่วน C ของ `0-Before.md` อย่างน้อย 2 ข้อ

```markdown
# Security checklist

| # | ข้อ | OWASP 2025 | ตรวจด้วย | หลักฐาน | สถานะ |
|---|---|---|---|---|---|
| S1 | คำขอที่ไม่มี session ไปยัง endpoint ที่ต้องเข้าสู่ระบบได้ 401 | A01 | access test | | |
| S2 | ผู้เข้าร่วมทำสิ่งที่เป็นของผู้จัดไม่ได้ เช่น สร้างกิจกรรม ดูรายชื่อผู้ลงทะเบียน | A01 | access test | | |
| S3 | ผู้จัดดูรายชื่อของกิจกรรมที่ผู้จัดคนอื่นสร้างไม่ได้ | A01 | access test | | |
| S4 | ผู้เข้าร่วมดูหรือยกเลิกการลงทะเบียนของผู้อื่นไม่ได้ | A01 | access test | | |
| S5 | server ไม่รับ user id จาก body, query string หรือ header | A01 | security review · REVIEW.md | | |
| S6 | cookie เดิมใช้ไม่ได้หลังออกจากระบบ และรหัส session ที่ปลอมขึ้นใช้ไม่ได้ | A07 | access test | | |
| S7 | cookie ของ session มี HttpOnly, Secure และ SameSite บนเว็บจริง | A04, A07 | curl -i ที่ Live URL | | |
| S8 | SQL ทุก query ใช้ parameter ไม่ต่อข้อความจาก input | A05 | CodeQL · security review | | |
| S9 | body ที่ผิดรูปแบบได้ 400 และ error ไม่มี stack trace หรือข้อความภายใน | A10 | access test · security review | | |
| S10 | ไม่มีค่าความลับใน repository | A02 | guard no-secrets (WS-05) | | |
| S11 | dependency ที่ใช้รันจริงไม่มีช่องโหว่ระดับ high ขึ้นไป | A03 | npm audit ใน CI · Dependabot | | |
| S12 | workflow ใน CI มีสิทธิ์น้อยที่สุด และไม่ใช้ pull_request_target | A03 | อ่าน ci.yml (WS-04) | | |
| S13 | [จากการลองโจมตีของกลุ่ม] | | | | |
| S14 | [จากการลองโจมตีของกลุ่ม] | | | | |
```

ตรวจข้อ S7 ได้ทันที แทนที่ id ด้วยผู้ใช้ใน seed data

```bash
curl -s -i -X POST [Live URL]/api/session -H "content-type: application/json" -d '{"userId":"[id ผู้ใช้]"}' | grep -i set-cookie
```

ใส่ผลในคอลัมน์หลักฐานของ S7 แล้ว commit และเปิด PR ให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- checklist มีอย่างน้อย 14 ข้อ และทุกข้อมีวิธีตรวจ
- บรรทัด `set-cookie` มี `HttpOnly`, `Secure` และ `SameSite=lax`

**หากติดปัญหา**

- ไม่พบ `Secure` บนเว็บจริง: ตรวจว่า `session.ts` ตั้ง `secure` เมื่อ `NODE_ENV` เป็น `production` และ Vercel ใช้ค่านั้นตอน build
- ไม่แน่ใจว่าข้อใดอยู่ในหมวดใดของ OWASP: ดูตารางในหัวข้อ 1 ของ lecture หากไม่ตรงหมวดใดให้เว้นไว้

---

## ขั้นตอนที่ 2 — access test

**ทำ**

```bash
git switch main
git pull origin main
git switch -c test/access
```

เพิ่มใน `e2e/db.ts`

```ts
export async function createUser(id: string, role: "ORGANIZER" | "ATTENDEE") {
  await sql(
    "INSERT INTO users (id, name, email, role) VALUES ($1, $1, $1 || '@example.com', $2) ON CONFLICT (id) DO NOTHING",
    [id, role],
  );
}
```

สร้าง `e2e/access.spec.ts` ตั้งต้นจาก test ของ session ซึ่งใช้ได้กับทุกกลุ่ม
แก้ `"u-a"` เป็น id ของผู้เข้าร่วมใน seed data และแก้ path ของการลงทะเบียนให้ตรงกับ `openapi.yaml` ของกลุ่ม

```ts
import { expect, test, type APIRequestContext } from "@playwright/test";
import { createEvent, createUser } from "./db";

async function loginApi(request: APIRequestContext, userId: string) {
  const res = await request.post("/api/session", { data: { userId } });
  expect(res.status()).toBe(204);
}

test.describe("access: session", () => {
  test.beforeAll(async () => {
    await createEvent("e2e-access", 5);
  });

  test("S6: cookie เดิมใช้ไม่ได้หลังออกจากระบบ", async ({ playwright }) => {
    const ctx = await playwright.request.newContext();
    await loginApi(ctx, "u-a");
    const { cookies } = await ctx.storageState();
    const old = cookies.find((c) => c.name === "session")!.value;
    expect((await ctx.delete("/api/session")).status()).toBe(204);
    const replay = await playwright.request.newContext({ extraHTTPHeaders: { cookie: `session=${old}` } });
    expect((await replay.post("/api/events/e2e-access/registrations")).status()).toBe(401);
  });

  test("S6: รหัส session ที่ปลอมขึ้นใช้ไม่ได้", async ({ playwright }) => {
    const forged = await playwright.request.newContext({ extraHTTPHeaders: { cookie: "session=forged-value" } });
    expect((await forged.post("/api/events/e2e-access/registrations")).status()).toBe(401);
  });
});
```

สั่ง AI agent ให้เขียน test ของข้ออื่น

```
Read AGENTS.md, docs/security-checklist.md, docs/features/04-access/spec.md,
docs/openapi.yaml, e2e/db.ts and e2e/access.spec.ts.
Add tests to e2e/access.spec.ts for checklist items S1, S2, S3, S4 and S9, and for
S13 and S14 if they can be tested through the API. Name each test with the item code first.
- Use createUser to make a second organizer and a second attendee; do not rely on
  seed data having more than one of each.
- Use separate request contexts for different users, and loginApi to log in.
- Expect the status codes in the spec.
- For S1, cover every endpoint in openapi.yaml that needs a session.
Do not change any file other than e2e/access.spec.ts. Do not change the application code.
```

ตรวจว่าทุก test ใช้ผู้ใช้อย่างน้อย 2 คนเมื่อตรวจข้อมูลของผู้อื่น แล้วรัน

```bash
docker compose up -d --build --wait
npx playwright test access
```

commit test ทั้งหมดก่อน แม้มีบาง test ที่ไม่ผ่าน

```bash
git add .
git commit -m "test: add access tests"
```

test ที่ไม่ผ่านคือช่องโหว่ที่พบ สั่ง AI แก้ทีละข้อ

```
The test "[ชื่อ test]" in e2e/access.spec.ts fails. Fix the application code so that it
passes, following docs/features/04-access/spec.md. Get the user only from
src/lib/current-user.ts and filter by owner inside the SQL query where data belongs to a user.
Do not change any test. Run npm test, npm run test:db and npm run e2e, and show the output.
```

เติมคอลัมน์หลักฐานของข้อที่ test ครอบคลุมด้วยชื่อไฟล์และชื่อ test
commit แล้วเปิด PR ทำ AI review แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- `npx playwright test access` ผ่านทั้งหมด และชื่อ test ขึ้นต้นด้วยรหัสข้อใน checklist
- หากมี test ที่ไม่ผ่านตอนแรก `git log` มี commit ของ test ก่อน commit ที่แก้
- ข้อ S1–S4, S6 และ S9 มีหลักฐานเป็นชื่อ test

**หากติดปัญหา**

- ทุก test ของผู้จัดผ่านทั้งที่ไม่ได้ตรวจความเป็นเจ้าของ: test ใช้ผู้จัดใน seed data คนเดียว ให้สร้างผู้จัดคนที่ 2 ด้วย `createUser` และให้คนนั้นเป็นผู้ลองเข้าถึง
- `loginApi` ได้ `400`: id ที่ส่งไม่มีในฐานข้อมูล ตรวจว่าเรียก `createUser` ก่อนเข้าสู่ระบบ
- S9 ได้ `500`: route handler ไม่ได้จัดการ body ที่ parse ไม่ได้ ให้ตอบ `400` ตาม spec และไม่ส่งข้อความ error ภายในกลับไป
- AI เสนอให้แก้ test เพื่อให้ผ่าน: ปฏิเสธ test ที่ไม่ผ่านคือช่องโหว่ หาก test ผิดจริง ให้แก้ spec ก่อนแล้วจึงแก้ test

---

## ขั้นตอนที่ 3 — เครื่องมือตรวจอัตโนมัติ

**ทำ**

```bash
git switch main
git pull origin main
git switch -c ci/audit
```

เพิ่มใน `.github/workflows/ci.yml` ต่อจาก `- run: npm ci` และก่อน `- run: node .agents/guards/no-secrets.mjs` ของ job `build`

```yaml
      - run: npm audit --omit=dev --audit-level=high
```

`--omit=dev` ตรวจเฉพาะ package ที่ใช้รันจริง และ `--audit-level=high` ทำให้ CI ไม่ผ่านเฉพาะช่องโหว่ระดับ high ขึ้นไป

commit แล้วเปิด PR ให้สมาชิกอีกคนอนุมัติ

ระหว่างนั้นเจ้าของ repository เปิด Settings → Advanced Security แล้ว

1. ในส่วน CodeQL analysis กด **Set up** → **Default** → **Enable CodeQL**
2. เปิดใช้ **Dependabot alerts**

รอให้ CodeQL ทำงานครั้งแรกเสร็จ แล้วเปิดแท็บ **Security** ของ repository ดู Code scanning และ Dependabot
ทุก alert ต้องได้รับการจัดการอย่างใดอย่างหนึ่ง

- แก้ใน PR แยก พร้อม test หากเป็นปัญหาจริง
- กด Dismiss พร้อมเลือกเหตุผลและเขียนคำอธิบาย หากไม่ใช่ปัญหาจริงหรือไม่กระทบระบบนี้

เติมหลักฐานของข้อ S8, S10, S11 และ S12 ใน checklist

**ผลที่ควรเห็น**

- job `build` มีขั้น `npm audit --omit=dev --audit-level=high` และผ่าน
- แท็บ Security แสดงผลของ CodeQL และไม่มี alert ระดับ high หรือ critical ที่เปิดค้างโดยไม่มีการจัดการ

**หากติดปัญหา**

- `npm audit` ไม่ผ่านเพราะช่องโหว่ใน package ที่ใช้รันจริง: ลอง `npm audit fix` ในเครื่อง แล้วรัน test ทั้งหมด หากต้องเปลี่ยนรุ่นหลักของ package ให้แจ้งผู้สอน
- ไม่พบเมนู Advanced Security: ต้องเป็นเจ้าของ repository และ repository ต้องเป็น public
- CodeQL ใช้เวลานาน: ทำงานใน GitHub Actions แยกจาก workflow ของกลุ่ม ทำขั้นตอนถัดไปไปก่อนได้

---

## ขั้นตอนที่ 4 — security review ด้วย skill

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/skill-security-review
mkdir -p .agents/skills/security-review
```

สร้าง `.agents/skills/security-review/SKILL.md`

```markdown
---
name: security-review
description: Reviews the whole repository against docs/security-checklist.md and OWASP Top 10:2025, focusing on access control. Use when asked for a security review, before submitting the project, or after adding or changing API endpoints.
---

# Security review

## Read first
- AGENTS.md, REVIEW.md, PROJECT.md sections 2 and 4
- docs/security-checklist.md
- docs/features/04-access/spec.md and docs/openapi.yaml

## Steps
1. List every route handler under src/app/api and every page that shows personal data.
   For each one, write in a table: how it gets the user, which role check it does,
   which ownership check it does, and the status codes for no session, wrong role, and not owner.
2. Start the system with docker compose up -d --build --wait. For every row where a check
   is missing or differs from the spec, try it with curl as two different users and record
   the command and the status code.
3. Read every SQL query in src/data. Report any query built by joining strings or by a
   template literal that contains input.
4. Send malformed JSON and wrong types to every POST, PUT and DELETE endpoint. Report any
   response with status 500, a stack trace, or an internal error message.
5. Go through each item in docs/security-checklist.md and say whether its evidence still holds.

## Rules
- Do not create, change, or delete any file. Do not commit or push.
- Do not run commands that delete data. Use only the local system, never the Live URL
  or the production database.
- Mark a finding Important only if you confirmed it with a request, or the code shows it clearly.

## Report in Thai, as Markdown for a GitHub issue
- The table from step 1
- Findings: [Important or Nit] file:line — problem — how you confirmed it — the test that would catch it
- Checklist items whose evidence no longer holds
- What you could not check, and why
```

commit แล้วเปิด PR ให้สมาชิกอีกคนอนุมัติแล้ว merge

หลัง merge สมาชิกที่ไม่ได้เขียน code ของ endpoint ส่วนใหญ่เปิด AI agent **ในบทสนทนาใหม่** บน `main` ล่าสุด แล้วสั่ง

```
Use the security-review skill in .agents/skills/security-review/SKILL.md to review this repository.
```

นำรายงานไปสร้างเป็น issue ชื่อ `Security review WS-08` ใน repository
ทุกข้อ Important ต้องจบด้วยอย่างใดอย่างหนึ่ง

- เพิ่ม test ใน `e2e/access.spec.ts` ที่ไม่ผ่าน แล้วแก้ code จนผ่าน ใน PR ที่อ้างถึง issue
- comment ใน issue ว่าไม่ใช่ปัญหาจริง พร้อมคำสั่งและผลที่ยืนยัน

**ผลที่ควรเห็น**

- issue มีตาราง endpoint และรายการข้อค้นพบตามรูปแบบใน skill
- ทุกข้อ Important มี PR ที่แก้พร้อม test หรือมี comment ที่อธิบายว่าเหตุใดจึงไม่ใช่ปัญหา

**หากติดปัญหา**

- agent ไม่รู้จัก skill: agent บางตัวไม่อ่าน `.agents/skills/` ให้สั่ง `Read .agents/skills/security-review/SKILL.md and follow it.` แทน
  หรือคัดลอกโฟลเดอร์ไปยังตำแหน่งของ agent นั้น เช่น `.claude/skills/` สำหรับ Claude Code
- agent รายงานข้อ Important โดยไม่มีคำสั่งหรือผลยืนยัน: สั่งให้ยืนยันด้วย `curl` ก่อน หรือลดเป็น Nit
- agent เริ่มแก้ไฟล์: ปฏิเสธ แล้วย้ำข้อห้ามใน skill

---

## ขั้นตอนที่ 5 — เตรียม PR break-it-live

**ทำ**

```bash
git switch main
git pull origin main
git switch -c demo/no-owner-check
```

ใน route handler ที่แสดงรายชื่อผู้ลงทะเบียนให้ผู้จัด ลบเฉพาะการตรวจว่าผู้จัดเป็นเจ้าของกิจกรรม
คงการตรวจว่ามี session และเป็นผู้จัดไว้

```bash
git commit -am "test: remove the event owner check on purpose"
git push -u origin demo/no-owner-check
```

เปิด PR รอให้ CI ทำงาน
**เปิด PR นี้ทิ้งไว้จนถึงคาบ demo** แล้วจึงปิดโดยไม่ merge หลัง demo

**ผลที่ควรเห็น**

- job `e2e` ไม่ผ่านที่ test ของข้อ S3
- ปุ่ม merge กดไม่ได้

**หากติดปัญหา**

- job `e2e` ผ่าน: test ของ S3 ไม่ได้ใช้ผู้จัดคนที่ 2 ให้กลับไปแก้ test ใน PR แยก

---

## ขั้นตอนที่ 6 — `LESSONS.md` ของทั้งภาคการศึกษา

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/lessons
```

รวมรายการที่สมาชิกจดไว้ในส่วน C ของ `0-Before.md` กับสิ่งที่พบในบทนี้ แล้วสร้าง `LESSONS.md`
ใช้รูปแบบในหัวข้อ 5 ของ lecture อย่างน้อย 6 บทเรียน จากอย่างน้อย 4 บทที่ต่างกัน

```markdown
# LESSONS

บทเรียนของกลุ่ม แต่ละข้อชี้ไปที่สิ่งที่ป้องกันไม่ให้เกิดซ้ำ

## L-01: [หัวข้อสั้น ๆ]
- เกิดเมื่อ: [บทและขั้นตอน] · [ลิงก์ PR, commit หรือ evidence]
- พบได้อย่างไร: [ใครหรืออะไรพบ]
- สาเหตุ: [สาเหตุจริง ไม่ใช่ "ไม่ระวัง"]
- สิ่งที่ป้องกันตอนนี้: [test, guard, gate, REVIEW.md, SKILL.md หรือ AGENTS.md พร้อมชื่อไฟล์]
- ตรวจว่าทำงานจริงได้อย่างไร: [คำสั่งหรือ PR break-it ที่แสดงว่าสิ่งนั้นจับได้]
```

บทเรียนที่ยังไม่มีสิ่งใดป้องกัน ให้เพิ่มสิ่งป้องกันใน PR นี้หรือ PR ถัดไป
หรือเขียน `สิ่งที่ป้องกันตอนนี้: ยอมรับความเสี่ยง` พร้อมเหตุผล

เพิ่มหัวข้อนี้ท้าย `AGENTS.md` โดยเลือกบทเรียนที่ AI agent ต้องรู้ก่อนเริ่มงาน ไม่เกิน 5 ข้อ

```markdown
## บทเรียนที่ต้องจำ
- [กติกาสั้น ๆ 1 บรรทัด] (LESSONS.md L-xx)
```

เติมคอลัมน์สถานะของ checklist ให้ครบทุกข้อ แล้ว commit และเปิด PR ทำ AI review แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- `LESSONS.md` มีอย่างน้อย 6 บทเรียน และทุกบทเรียนมีลิงก์ที่มาและสิ่งที่ป้องกันตอนนี้
- `AGENTS.md` มีหัวข้อบทเรียนที่ต้องจำ ไม่เกิน 5 ข้อ และทุกข้ออ้างถึงรหัสใน `LESSONS.md`
- ทุกข้อใน `docs/security-checklist.md` มีหลักฐานและสถานะ

**หากติดปัญหา**

- นึกบทเรียนไม่ออก: อ่านหัวข้อ Retro ท้าย `evidence/ws-01.md` ถึง `evidence/ws-07.md` และตาราง "ผลการ AI review ที่กลุ่มไม่ทำตาม" ใน `evidence/ws-04.md`
- สาเหตุเขียนได้เพียง "ลืม" หรือ "ไม่ระวัง": ถามต่อว่าเหตุใดจึงลืมได้ และอะไรควรจับได้แต่ไม่จับ คำตอบนั้นคือสาเหตุ

---

## ขั้นตอนที่ 7 — บันทึกหลักฐาน

**ทำ**

สร้าง branch `docs/evidence-08` และ `evidence/ws-08.md`

```markdown
# WS-08 Evidence

- การลองโจมตีจาก 0-Before.md ที่สำเร็จ: [จำนวน] จาก [จำนวน] · ตอนนี้ถูกป้องกันด้วย: [ชื่อ test]
- access test: [จำนวน] test · ไม่ผ่านตอนแรก [จำนวน] test · PR: [ลิงก์]
- CodeQL: alert ทั้งหมด [จำนวน] · แก้ [จำนวน] · dismiss พร้อมเหตุผล [จำนวน]
- npm audit --omit=dev: ช่องโหว่ระดับ high ขึ้นไป [จำนวน]
- Security review: [ลิงก์ issue] · Important [จำนวน] · แก้แล้ว [จำนวน] · ไม่ใช่ปัญหา [จำนวน]
- Break-it-live: [ลิงก์ PR] · test ที่ไม่ผ่าน: [ชื่อ test]

## project เสร็จตามหัวข้อที่ 8 ของ PROJECT.md หรือไม่

| เงื่อนไข | หลักฐาน | ผ่าน |
|---|---|---|
| กฎ R1–R5 มี unit test อย่างน้อยกฎละ 1 test และทุก test ผ่าน | | |
| load test ยืนยันว่า R6 ไม่ถูกละเมิด | | |
| journey ผ่านบน CI | | |
| ผู้เข้าร่วมดูหรือยกเลิกการลงทะเบียนของผู้อื่นไม่ได้ | | |
| ทุก feature มี intent.md, spec.md และ plan.md ครบ | | |
```

commit แล้วเปิด PR ซึ่งต้องผ่านด่านเช่นเดียวกับ PR อื่น

**ผลที่ควรเห็น**

- `evidence/ws-08.md` มีครบทุกหัวข้อ และตารางของหัวข้อที่ 8 มีหลักฐานทุกแถว
- PR ถูก merge ผ่าน ruleset

**หากติดปัญหา**

- เงื่อนไขข้อใดยังไม่ผ่าน: เขียนตามจริงพร้อมสิ่งที่ขาด อย่าใส่หลักฐานที่ไม่ได้พิสูจน์เงื่อนไขนั้น

---

## Retro

ปรึกษากันในกลุ่ม แล้วบันทึกคำตอบสั้น ๆ ท้าย `evidence/ws-08.md`

1. ช่องโหว่ใดที่พบในบทนี้ มีอยู่ตั้งแต่บทใด และเหตุใด test, AI review หรือ verifier ของบทก่อนหน้าจึงไม่พบ
2. สิ่งที่ตรวจซ้ำได้ซึ่งสร้างตลอดวิชา ข้อใดจับปัญหาได้จริงมากที่สุด และข้อใดไม่เคยจับอะไรได้เลย
3. หากเริ่ม project ใหม่พรุ่งนี้พร้อม AI agent จะสร้างสิ่งใดจากวิชานี้ก่อนเป็นอย่างแรก และเพราะอะไร
