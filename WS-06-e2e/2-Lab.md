# WS-06 · Lab — E2E Loop

**รูปแบบ:** งานกลุ่ม ใช้ repository เดิมของกลุ่มจาก WS-05

**เป้าหมาย:** server รู้จักผู้ใช้จาก session เท่านั้น ระบบมีหน้าจอครบ 5 หน้า
journey หลักมี E2E test ที่ CI รันทุก PR และขวาง merge เมื่อไม่ผ่าน
และมี `.agents/verifier.md` ที่ใช้ตรวจ PR ด้วยบทสนทนาใหม่

---

## สิ่งที่ต้องมีก่อนเริ่ม

- WS-05 เสร็จแล้ว: `docker compose up -d --build` เปิดระบบได้ และเว็บจริงใช้ PostgreSQL
- ทุกคนทำ `0-Before.md` ส่วน B และ C เสร็จแล้ว และมีตาราง journey หลักของกลุ่ม
- เจ้าของ repository และเจ้าของ project บน Vercel อยู่ในคาบ เพราะขั้นตอนที่ 2 และ 6 ต้องใช้สิทธิ์ของเจ้าของ

---

## โครงสร้าง repository ที่จะได้เมื่อจบบทนี้

แสดงเฉพาะไฟล์ที่เพิ่มหรือแก้ในบทนี้ ตัวเลขหลังชื่อไฟล์คือขั้นตอนที่สร้างหรือแก้ไฟล์นั้น
ชื่อไฟล์ใน `src/` เป็นตัวอย่าง ให้ใช้ตาม `plan.md` ของกลุ่ม

```
sdpx-[ชื่อกลุ่ม]/
├── AGENTS.md                         ← 2, 4
├── playwright.config.ts              ← 3
├── .gitignore                        ← 3 ไม่เก็บผลของ Playwright
├── package.json                      ← 3 script e2e
├── .agents/
│   └── verifier.md                   ← 5
├── db/
│   └── schema.sql                    ← 2 เพิ่มตาราง sessions
├── docs/
│   ├── openapi.yaml                  ← 1 เพิ่ม /api/session และ 401, 403
│   └── features/
│       └── 04-access/
│           ├── intent.md             ← 1
│           ├── spec.md               ← 1
│           └── plan.md               ← 1
├── e2e/
│   ├── db.ts                         ← 3
│   └── journey.spec.ts               ← 3
├── src/
│   ├── lib/
│   │   ├── session.ts                ← 2
│   │   └── current-user.ts           ← 2 อ่านจาก session แทน header
│   ├── data/*.db.test.ts             ← 2 test ของ session
│   └── app/
│       ├── api/session/route.ts      ← 2
│       ├── login/                    ← 4
│       ├── events/                   ← 4 รายการและรายละเอียดกิจกรรม
│       ├── my-registrations/         ← 4
│       └── manage/                   ← 4 จัดการกิจกรรมของผู้จัด
├── evidence/
│   └── ws-06.md                      ← 7
└── .github/workflows/ci.yml          ← 6 เพิ่ม job e2e
```

ตาราง `sessions` บนฐานข้อมูลของเว็บจริง และ required check `e2e` ใน ruleset ไม่ใช่ไฟล์ใน repository

---

## ขั้นตอนที่ 1 — intent, spec และ plan ของ `04-access`

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/04-access
mkdir -p docs/features/04-access
```

ทำตามลำดับเดียวกับ `03-cancel` ใน WS-04 ใน branch เดียว

1. **intent.md** สมาชิก 1 คนเขียนเอง ไม่ใช้ AI ตามแบบฟอร์มใน WS-02
2. **spec.md** สั่ง AI ร่างด้วยคำสั่งเดียวกับขั้นตอนที่ 2 ของ WS-02 โดยเปลี่ยนชื่อ feature เป็น `04-access`
   และให้อ่านหัวข้อที่ 2 และ 5 ของ `PROJECT.md` ด้วย กลุ่มตัดสินข้อกังวลทุกข้อในตารางการตัดสินใจ อย่างน้อยต้องตัดสิน
   - เข้าสู่ระบบผ่าน `POST /api/session` ที่รับ `userId` ของผู้ใช้ใน seed data และออกจากระบบผ่าน `DELETE /api/session`
   - session หมดอายุเมื่อใด และ cookie มีคุณสมบัติใดตามหัวข้อ 2 ของ lecture
   - หน้าใดและ endpoint ใดต้องเข้าสู่ระบบก่อน ผู้ที่ยังไม่เข้าสู่ระบบเปิดแล้วเกิดอะไรขึ้น
   - ผู้เข้าร่วมเปิดหน้าจัดการกิจกรรม หรือสร้างกิจกรรม ได้ผลอย่างไร และผู้จัดเห็นรายชื่อของกิจกรรมของผู้จัดคนอื่นได้หรือไม่
3. เพิ่มหัวข้อ **ข้อความบนหน้าจอ** ใน `spec.md` เป็นตารางของทั้ง 5 หน้าตามหัวข้อที่ 5 ของ `PROJECT.md`
   ระบุชื่อปุ่มและข้อความที่ E2E test จะอ้างถึง เช่น ปุ่ม `ลงทะเบียน` ปุ่ม `ยกเลิก` ข้อความ `สถานะของฉัน: CONFIRMED` และ `ลำดับในคิวสำรอง: 1`
   ข้อความเหล่านี้คือสัญญาระหว่าง test กับหน้าจอ เปลี่ยนภายหลังต้องแก้ทั้ง spec และ test
4. **openapi.yaml** สั่ง AI เพิ่ม `/api/session` และ response `401` กับ `403` ตาม spec
   ลบ header `x-user-id` ออกหากเคยระบุไว้ แล้วรัน `npx --yes @redocly/cli@2 lint docs/openapi.yaml`
5. **plan.md** สั่ง AI ร่างด้วยคำสั่งเดียวกับขั้นตอนที่ 2 ของ WS-03 โดยเปลี่ยนชื่อ feature เป็น `04-access`
   ให้แผนครอบคลุมทั้ง session ในขั้นตอนที่ 2 และหน้าจอในขั้นตอนที่ 4

commit แล้วเปิด PR ทำ AI review ตาม `REVIEW.md` แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- ตารางการตัดสินใจครบทุกข้อข้างต้น
- ตารางข้อความบนหน้าจอครอบคลุมทุกขั้นในตาราง journey ที่เตรียมมาจาก `0-Before.md`
- CI ผ่านที่ขั้น lint ของ `openapi.yaml`

**หากติดปัญหา**

- AI ร่าง spec ที่มีรหัสผ่านหรือการสมัครสมาชิก: สิ่งเหล่านี้อยู่ในคอลัมน์ "ไม่ทำ" ของ `PROJECT.md` ให้ตัดออก
- ไม่แน่ใจว่าควรตอบ `401` หรือ `403`: ไม่มี session หรือ session หมดอายุตอบ `401` มี session แต่บทบาทไม่มีสิทธิ์ตอบ `403`

---

## ขั้นตอนที่ 2 — session แทน header `x-user-id`

**ทำ**

```bash
git switch main
git pull origin main
git switch -c feat/session
```

สั่ง AI agent ให้เพิ่มตาราง `sessions` ใน `db/schema.sql` ตาม `plan.md`
ตารางมีอย่างน้อย `id` (รหัส session), `user_id` และ `expires_at` ใช้ `CREATE TABLE IF NOT EXISTS` เหมือนตารางอื่น

ใส่ตารางใหม่ลงฐานข้อมูลทั้ง 2 แห่ง **ก่อน push** ขั้นนี้สมาชิกทำเอง

- **ในเครื่อง:** `schema.sql` ใช้ `IF NOT EXISTS` และ `seed.sql` ใช้ `ON CONFLICT DO NOTHING` จึงรันซ้ำได้โดยข้อมูลเดิมไม่หาย

  ```bash
  docker compose up -d db
  DATABASE_URL=postgres://app:app@localhost:5432/events npm run db:setup
  ```

- **เว็บจริง:** เจ้าของ project บน Vercel เปิด SQL Editor ของ Neon แล้วรันเฉพาะคำสั่ง `CREATE TABLE IF NOT EXISTS sessions ...`
  ต้องทำก่อน push เพราะ Preview deployment ของ PR นี้ใช้ฐานข้อมูลที่คัดลอกจากฐานข้อมูลของเว็บจริง

จากนั้นสั่ง AI agent

```
Read AGENTS.md, docs/features/04-access/spec.md and plan.md, and src/lib/current-user.ts.
Implement the session part of the plan:
1. src/lib/session.ts: create a session for a seed user with a random 32-byte id stored
   in the sessions table, and set a cookie named session with the attributes in the spec
   (HttpOnly, SameSite=Lax, Secure when NODE_ENV is production, Max-Age from the spec).
   Delete the session row and the cookie on logout.
2. src/app/api/session/route.ts: POST and DELETE as the spec says.
3. src/lib/current-user.ts: read the user only from the session cookie, ignoring expired
   sessions. Remove the x-user-id header and the TEMPORARY comment.
4. Every route handler returns 401 or 403 as the spec says.
5. An integration test in src/data or src/lib *.db.test.ts: an expired session gives no user.
Do not change src/domain/ or any existing test. Use await cookies() from next/headers.
Run npm run lint, npm test, npm run test:db and npm run build, and show the output.
```

ตรวจด้วย `curl` บนระบบที่ build ใหม่ แทนที่ id ด้วยค่าจริงของกลุ่ม

```bash
docker compose up -d --build --wait
curl -s -w " %{http_code}\n" -X POST http://localhost:3000/api/events/[id]/registrations -H "x-user-id: [id ผู้ใช้]"
curl -s -c cookies.txt -w "%{http_code}\n" -X POST http://localhost:3000/api/session -H "content-type: application/json" -d '{"userId":"[id ผู้ใช้]"}'
curl -s -b cookies.txt -w " %{http_code}\n" -X POST http://localhost:3000/api/events/[id]/registrations
rm cookies.txt
```

เพิ่มในหัวข้อ Rules ของ `AGENTS.md`

```markdown
- หาผู้ใช้ปัจจุบันผ่าน `src/lib/current-user.ts` เท่านั้น ห้ามรับ user id จาก body, query string หรือ header
- เปลี่ยน `db/schema.sql` ได้เฉพาะแบบที่รันซ้ำได้ เช่น `CREATE TABLE IF NOT EXISTS` และแจ้งสมาชิกให้ใส่ลงฐานข้อมูลของเว็บจริง
```

ปิดความเสี่ยงของ `current-user.ts` ในหัวข้อความเสี่ยงของ `docs/features/02-register/plan.md`
commit แล้วเปิด PR ทำ AI review แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- คำขอที่มีเฉพาะ header `x-user-id` ได้ `401`
- `POST /api/session` ได้ `204` และ `cookies.txt` มี cookie ของ session
- คำขอที่แนบ cookie ได้ status code ของกรณีสำเร็จตาม spec
- `git diff --stat origin/main -- src/domain` ไม่แสดงไฟล์ใด และ `npm run test:db` มี test ของ session ที่หมดอายุ
- หลัง merge การลงทะเบียนบน Live URL ต้องเข้าสู่ระบบก่อน

**หากติดปัญหา**

- `relation "sessions" does not exist`: ยังไม่ได้รัน `npm run db:setup` ในเครื่อง หรือยังไม่ได้สร้างตารางในฐานข้อมูลของเว็บจริง
- `cookies` was called outside a request scope: เรียก `cookies()` ได้เฉพาะใน route handler, Server Component หรือ Server Action และต้องใช้ `await`
- `curl` ได้ cookie แต่คำขอถัดไปยังได้ `401`: ตรวจว่าใช้ `-b cookies.txt` และชื่อ cookie ที่ `session.ts` ตั้งตรงกับที่ `current-user.ts` อ่าน
- AI ให้ `current-user.ts` อ่าน header เป็นทางสำรอง: ปฏิเสธ ทางสำรองนั้นคือช่องโหว่เดิม

---

## ขั้นตอนที่ 3 — เขียน E2E test ของ journey ก่อนมีหน้าจอ

**ทำ**

```bash
git switch main
git pull origin main
git switch -c feat/screens
npm install -D @playwright/test@1.64
npm pkg set scripts.e2e="playwright test"
```

เพิ่มใน `.gitignore`

```
/test-results/
/playwright-report/
```

สร้าง `playwright.config.ts`

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
```

`workers: 1` ให้ test รันทีละ test เพราะทุก test ใช้ฐานข้อมูลเดียวกัน

สร้าง `e2e/db.ts` สำหรับเตรียมข้อมูลตรงที่ PostgreSQL ในเครื่อง
แก้ค่า `'u-org'` เป็น id ของผู้จัดใน seed data ของกลุ่ม

```ts
import pg from "pg";

const url = process.env.DATABASE_URL ?? "postgres://app:app@localhost:5432/events";

export async function sql(text: string, params: unknown[] = []) {
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  try {
    return await client.query(text, params);
  } finally {
    await client.end();
  }
}

export async function createEvent(id: string, capacity: number) {
  await sql("DELETE FROM registrations WHERE event_id = $1", [id]);
  await sql("DELETE FROM events WHERE id = $1", [id]);
  await sql(
    "INSERT INTO events (id, title, starts_at, capacity, organizer_id) VALUES ($1, $2, now() + interval '7 days', $3, 'u-org')",
    [id, `E2E ${id}`, capacity],
  );
}
```

สั่ง AI agent พร้อมแนบตาราง journey ที่เตรียมมาจาก `0-Before.md`

```
Read AGENTS.md, PROJECT.md section 5, docs/features/04-access/spec.md (especially the
on-screen text table), playwright.config.ts and e2e/db.ts. Then read the journey table below.
Write e2e/journey.spec.ts with:
1. A helper loginAs(browser, name) that opens a new browser context, logs in through
   the login screen, and returns the page.
2. Test "journey: เต็ม → เข้าคิวสำรอง → มีผู้ยกเลิก → ได้ที่นั่ง" following the table,
   using createEvent with capacity 1 and two users in separate browser contexts.
3. A separate test that API requests without a session get 401, including one that
   sends x-user-id.
4. A separate test that opening an event page without a session follows the spec.
Use only getByRole, getByLabel and getByText with the exact text from the spec.
No CSS selectors, no waitForTimeout. Do not create or change any other file.

[ตาราง journey]
```

ตรวจ test ตามหลักการในหัวข้อ 3 ของ lecture แล้วรัน

```bash
docker compose up -d --build --wait
npm run e2e
```

commit test ที่ไม่ผ่านไว้ก่อน

```bash
git add .
git commit -m "test: add journey e2e (red)"
```

**ผลที่ควรเห็น**

- test ของ journey ไม่ผ่าน เพราะยังหาหน้าจอหรือปุ่มตามข้อความใน spec ไม่พบ
- test ที่ส่งคำขอไปที่ API โดยไม่มี session ผ่าน เพราะ session จากขั้นตอนที่ 2 ทำงานแล้ว ส่วน test ที่เปิดหน้ากิจกรรมยังไม่ผ่าน
- ใน `journey.spec.ts` ไม่มี CSS selector และไม่มี `waitForTimeout`

**หากติดปัญหา**

- `browserType.launch: Executable doesn't exist`: ยังไม่ได้รัน `npx playwright install chromium` ตามส่วน B ของ `0-Before.md`
- `ECONNREFUSED` ที่ `localhost:5432`: ยังไม่ได้เปิด service `db` หรือเปิดด้วย port อื่น ให้ตั้ง `DATABASE_URL` ก่อนรัน `npm run e2e`
- test ไม่ผ่านเพราะ `createEvent` ผิด foreign key: id ของผู้จัดใน `e2e/db.ts` ไม่มีใน seed data
- test ไม่ผ่านด้วยเหตุผลอื่นที่ไม่ใช่หน้าจอยังไม่มี: แก้ test ก่อน commit test ที่ไม่ผ่านต้องไม่ผ่านเพราะเหตุผลที่ถูกต้อง เหมือนใน WS-03

---

## ขั้นตอนที่ 4 — ทำหน้าจอจน E2E test ผ่าน

**ทำ**

ทำต่อบน branch `feat/screens`
`next.config.ts` ที่ create-next-app 16 สร้างไว้ตั้งแต่ WS-01 มี `cacheComponents: true` อยู่แล้ว ซึ่งมีผลต่อวิธีเขียนหน้าที่อ่านฐานข้อมูล
สั่ง AI agent

```
Read AGENTS.md, PROJECT.md section 5, docs/features/04-access/spec.md and plan.md,
and e2e/journey.spec.ts. Implement the five screens in PROJECT.md section 5 so that
the e2e tests pass, using the on-screen text in the spec exactly.
- Pages get data from src/data and src/domain on the server, and get the user from
  src/lib/current-user.ts. Buttons that change data call the existing API routes.
- This project has cacheComponents enabled. In a page, put every part that reads the
  database or cookies inside <Suspense>, and call await connection() from next/server
  before database reads that do not use cookies.
- Do not change anything in e2e/, src/domain/, or any existing test.
After each change run npm run build, then docker compose up -d --build --wait and
npm run e2e. Stop when all e2e tests pass and show the output.
```

ระหว่างที่ AI ทำงาน สมาชิกที่ไม่ได้สั่ง AI เตรียมตรวจด้วยมือ เมื่อ AI รายงานว่าเสร็จ

1. เปิด `http://localhost:3000/login` แล้วทำ journey ตามตารางที่เตรียมมาด้วยมือ ใช้ browser ปกติ 1 หน้าต่างและหน้าต่างแบบ private อีก 1 หน้าต่างเป็นผู้ใช้ 2 คน
2. ตรวจหน้าที่ journey ไม่ได้ผ่าน คือหน้าการลงทะเบียนของฉันและหน้าจัดการกิจกรรม
3. เข้าสู่ระบบเป็นผู้เข้าร่วม แล้วเปิดหน้าจัดการกิจกรรมโดยพิมพ์ URL เอง

เพิ่มในหัวข้อ Commands และ Rules ของ `AGENTS.md`

```markdown
- E2E test: `docker compose up -d --build --wait` แล้ว `npm run e2e`
```

```markdown
- ห้ามแก้ไฟล์ใน `e2e/` เพื่อให้ test ผ่าน หาก test ดูผิด ให้หยุดและอธิบาย
- ในหน้าที่อ่านฐานข้อมูลหรือ cookie ให้ห่อส่วนนั้นด้วย `<Suspense>`
```

commit แล้ว push ยังไม่ต้องเปิด PR ให้อนุมัติ จนกว่าจะทำขั้นตอนที่ 5

**ผลที่ควรเห็น**

- `npm run e2e` ผ่านทั้งหมด
- `git log --oneline` ของ branch มี commit ของ test ที่ไม่ผ่าน ก่อน commit ของหน้าจอ
- `git diff --stat origin/main -- e2e src/domain` แสดงเฉพาะไฟล์ใน `e2e/` ที่สร้างในขั้นตอนที่ 3 และไม่มีไฟล์ใน `src/domain`
- ผู้เข้าร่วมเปิดหน้าจัดการกิจกรรมไม่ได้ตามที่ spec กำหนด

**หากติดปัญหา**

- build ไม่ผ่านด้วยข้อความ `Next.js encountered uncached or runtime data during prerendering`:
  ส่วนที่อ่านฐานข้อมูลหรือ cookie อยู่นอก `<Suspense>` ให้ย้ายส่วนนั้นไปเป็น component แยกแล้วห่อด้วย `<Suspense>`
- build ใน Docker ไม่ผ่านเพราะเชื่อมต่อฐานข้อมูลไม่ได้: หน้านั้นถูก prerender ตอน build ให้เรียก `await connection()` ก่อนอ่านฐานข้อมูล
- E2E ยังเห็นหน้าจอเก่า: ลืม `--build` ใน `docker compose up`
- ปุ่มกดแล้วสถานะไม่เปลี่ยนจนกว่าจะ reload: หลังเรียก API ให้เรียก `router.refresh()` เพื่อให้หน้าดึงข้อมูลใหม่
- AI แก้ไฟล์ใน `e2e/`: ปฏิเสธการแก้ไขนั้น หาก guard ของกลุ่มจาก WS-05 ป้องกันไฟล์ test อยู่แล้ว ให้เพิ่ม `e2e/` เข้าไปใน PR แยก

---

## ขั้นตอนที่ 5 — ตรวจด้วย verifier ก่อน merge

**ทำ**

สมาชิกอีกคนสร้าง `.agents/verifier.md` บน branch `docs/verifier` จาก `main`

```markdown
---
name: verifier
description: Runs the system and checks that the current branch does what the spec says. Reports only; never fixes.
---

# Verifier

You are checking work that you did not write. Do not trust the author's description of it.

## Read first
- AGENTS.md and PROJECT.md sections 4 and 5
- spec.md and plan.md of the feature named in the request
- git diff --stat origin/main...HEAD

## Start the system
- docker compose up -d --build --wait
- Log in with curl:
  curl -s -c /tmp/verifier-cookies.txt -X POST http://localhost:3000/api/session -H "content-type: application/json" -d '{"userId":"<seed user id>"}'

## Check
1. Run npm test and npm run e2e. Record the numbers of passed and failed tests.
2. Exercise every behavior in the spec of this feature, through the API with the cookie
   file, and through the screens if you have a browser tool.
3. Exercise two neighboring flows from PROJECT.md section 5 that this change could break.
4. Send a request without a session to every endpoint the change touches.

## Rules
- Do not create, change, or delete any file in the repository. Do not commit or push.
- Do not run commands that delete data. If a guard blocks you, report it and continue.
- If you cannot check something, say so. Do not guess.

## Report in Thai, as Markdown for a PR comment
- Commands you ran and what you saw, briefly
- A table: behavior | spec section | what you saw | matches or not
- The neighboring flows you tried and the result
- What you could not check, and why
Do not say whether the PR should be merged.
```

เปิด PR ของ `.agents/verifier.md` ให้อนุมัติแล้ว merge

จากนั้นเปิด PR ของ `feat/screens` กด **Update branch** ในหน้า PR เพื่อรับ `.agents/verifier.md` จาก `main`
สมาชิกที่ไม่ได้สั่ง AI เขียนหน้าจอเปิด AI agent **ในบทสนทนาใหม่**

```bash
git fetch origin
git switch feat/screens
git pull
```

```
Read .agents/verifier.md and follow it to verify the current branch.
The feature is docs/features/04-access/ together with the five screens in PROJECT.md section 5.
```

นำรายงานไปวางเป็น comment ใน PR ผู้เขียนตอบทุกข้อที่ไม่ตรงกับ spec ว่าแก้หรือไม่แก้ พร้อมเหตุผล
ทำ AI review ตาม `REVIEW.md` เหมือนทุก PR แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- PR มี comment รายงานของ verifier ที่มีคำสั่งที่รันและตารางพฤติกรรมเทียบกับหัวข้อใน spec
- ทุกข้อที่ไม่ตรงกับ spec มีคำตอบจากผู้เขียน
- PR ถูก merge และหน้าจอขึ้นเว็บจริง

**หากติดปัญหา**

- verifier แก้ไฟล์หรือเสนอจะแก้: ปฏิเสธ แล้วย้ำว่ารายงานเท่านั้น
- verifier รายงานว่าทุกอย่างตรง โดยไม่มีคำสั่งหรือผลที่เห็นประกอบ: สั่งให้แสดงคำสั่งที่รันและผลที่เห็นจริงของแต่ละข้อ
- verifier ไม่มี browser: การตรวจผ่าน API และ `npm run e2e` เพียงพอสำหรับบทนี้ ให้บันทึกข้อจำกัดนี้ในรายงาน
- พบสิ่งที่ควรตรวจซ้ำทุก PR: เพิ่มเป็น E2E test ใน PR ถัดไป

---

## ขั้นตอนที่ 6 — E2E ใน CI และ PR break-it-live

### 6.1 เพิ่ม job `e2e`

**ทำ**

```bash
git switch main
git pull origin main
git switch -c ci/e2e
```

ใน `.github/workflows/ci.yml` ลบบรรทัด `- run: docker build -t app .` ออกจาก job `build`
เพราะ job ใหม่ build image เองอยู่แล้ว แล้วเพิ่ม job `e2e` ต่อท้ายไฟล์ ให้ `e2e:` ตรงกับ `build:`

```yaml
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: docker compose up -d --build --wait
      - run: npx playwright test
      - if: failure()
        run: docker compose logs app
      - if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

commit แล้วเปิด PR เมื่อ job ทั้ง 2 เป็นสีเขียวและได้รับอนุมัติ ให้ merge

หลัง merge เจ้าของ repository เปิด Settings → Rules → Rulesets → `main-gate`
ในส่วน Require status checks to pass เพิ่ม `e2e` แล้วบันทึก

**ผลที่ควรเห็น**

- PR มี check 2 รายการคือ `build` และ `e2e` และผ่านทั้งคู่
- ruleset `main-gate` มี required check ทั้ง `build` และ `e2e`

**หากติดปัญหา**

- ค้นหา `e2e` ใน ruleset ไม่พบ: GitHub แสดงเฉพาะ check ที่เคยรันใน repository แล้ว ให้รอให้ job `e2e` รันใน PR อย่างน้อย 1 ครั้ง
- `docker compose up --wait` ไม่ผ่าน: เปิด log ของขั้นนั้นใน CI ส่วนใหญ่เกิดจาก build ไม่ผ่าน ให้ลองคำสั่งเดียวกันในเครื่อง
- E2E ผ่านในเครื่องแต่ไม่ผ่านใน CI: ดาวน์โหลด `playwright-report` จากหน้าสรุปของ workflow แล้วเปิด trace ของ test ที่ไม่ผ่าน

### 6.2 PR break-it-live

**ทำ**

```bash
git switch main
git pull origin main
git switch -c demo/broken-e2e
```

ใน `src/data` ทำให้การยกเลิกไม่บันทึกสถานะ `CONFIRMED` ของผู้ที่ได้เลื่อนจากคิวสำรอง
เช่น comment บรรทัดที่ update สถานะของผู้นั้น **ห้ามแก้ `src/domain`**
รัน `npm test` ในเครื่องให้เห็นว่ายังผ่าน แล้ว push

```bash
npm test
git commit -am "test: skip saving the promoted registration on purpose"
git push -u origin demo/broken-e2e
```

เปิด PR รอให้ CI ทำงาน
**เปิด PR นี้ทิ้งไว้จนถึงคาบ demo** แล้วจึงปิดโดยไม่ merge หลัง demo
ดาวน์โหลด `playwright-report` ของ PR นี้ เปิด `index.html` แล้วเปิด trace ของ test ที่ไม่ผ่าน

**ผลที่ควรเห็น**

- `npm test` ในเครื่องผ่าน
- job `e2e` ไม่ผ่านที่ test ของ journey ในขั้นที่ผู้อยู่ในคิวสำรองควรได้ `CONFIRMED`
- ปุ่ม merge กดไม่ได้

**หากติดปัญหา**

- job `build` ไม่ผ่านด้วย: integration test ของกลุ่มตรวจการบันทึกนี้อยู่แล้ว ซึ่งเป็นเรื่องดี บันทึกไว้ใน evidence และยังใช้ PR นี้ได้
- job `e2e` ผ่าน: journey test ไม่ได้ตรวจสถานะหลังผู้อื่นยกเลิกด้วยการ reload หน้า ให้กลับไปแก้ test ใน PR แยก

---

## ขั้นตอนที่ 7 — บันทึกหลักฐาน

**ทำ**

สร้าง branch `docs/evidence-06` และ `evidence/ws-06.md`

```markdown
# WS-06 Evidence

- journey ด้วยมือผ่าน curl (จาก 0-Before.md): [เวลา] · จำนวนคำสั่ง: [จำนวน]
- journey ด้วย E2E test: ในเครื่อง [วินาที] · ใน CI ทั้ง job e2e [นาที วินาที]
- ผลของ npx playwright test --repeat-each 5: [ผ่านกี่ครั้งจากกี่ครั้ง]
- คำขอที่มีเฉพาะ header x-user-id ก่อนบทนี้: [status code จาก 0-Before.md] · หลังบทนี้: [status code]
- PR ของหน้าจอ: [ลิงก์] · commit ของ test ที่ไม่ผ่าน: [ลิงก์] · commit ที่ทำให้ผ่าน: [ลิงก์]
- รายงานของ verifier: [ลิงก์ comment]

| สิ่งที่ verifier พบ | หัวข้อใน spec | สิ่งที่กลุ่มทำ |
|---|---|---|
| | | |

- Break-it-live: [ลิงก์ PR] · job ที่ไม่ผ่าน: [build, e2e]
```

commit แล้วเปิด PR ซึ่งต้องผ่านด่านเช่นเดียวกับ PR อื่น

**ผลที่ควรเห็น**

- `evidence/ws-06.md` มีครบทุกหัวข้อ และตารางสิ่งที่ verifier พบมีอย่างน้อย 1 แถว
- PR ถูก merge ผ่าน ruleset ซึ่งตอนนี้ต้องผ่านทั้ง `build` และ `e2e`

**หากติดปัญหา**

- `--repeat-each 5` ไม่ผ่านบางครั้ง: test นั้น flaky ให้แก้ตามตารางในหัวข้อ 3 ของ lecture ก่อนบันทึก
- verifier ไม่พบสิ่งที่ไม่ตรงเลย: บันทึกสิ่งที่ verifier ตรวจไม่ได้แทน และพิจารณาว่าควรเพิ่มอะไรใน `.agents/verifier.md`

---

## Retro

ปรึกษากันในกลุ่ม แล้วบันทึกคำตอบสั้น ๆ ท้าย `evidence/ws-06.md`

1. verifier พบสิ่งใดที่ AI review, unit test และ E2E test ไม่พบ หรือไม่พบสิ่งใดที่ควรพบ
2. หากต้องเพิ่ม E2E test อีก 1 journey จะเลือก journey ใด และเหตุใดจึงไม่ตรวจด้วย unit test แทน
3. job `e2e` ทำให้เวลารอ CI ของแต่ละ PR เพิ่มขึ้นเท่าไร และคุ้มหรือไม่
