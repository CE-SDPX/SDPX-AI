# WS-07 · Lab — Performance Loop

**รูปแบบ:** งานกลุ่ม ใช้ repository เดิมของกลุ่มจาก WS-06

**เป้าหมาย:** ผู้ใช้ 300 คนลงทะเบียนพร้อมกันแล้วไม่มีการจองเกิน `capacity` (R6)
หน้ารายการกิจกรรมมี p95 ไม่เกิน 500 ms เมื่อมีกิจกรรม 200 รายการ
ทุก PR ตรวจทั้งสองเรื่องใน CI และ `ops/bands.yaml` บอกว่าค่าใดปกติ และเมื่อค่าเปลี่ยนต้องทำอะไร

**load test ทั้งหมดในบทนี้ยิงเฉพาะ `docker compose up` ในเครื่องและใน CI ห้ามยิง Live URL**

---

## สิ่งที่ต้องมีก่อนเริ่ม

- WS-06 เสร็จแล้ว: CI ผ่านทั้ง `build` และ `e2e` และ ruleset บังคับทั้งคู่
- ทุกคนทำ `0-Before.md` ส่วน B และ C เสร็จแล้ว และจดคาดการณ์จำนวน `CONFIRMED` กับจำนวน query ไว้

---

## โครงสร้าง repository ที่จะได้เมื่อจบบทนี้

แสดงเฉพาะไฟล์ที่เพิ่มหรือแก้ในบทนี้ ตัวเลขหลังชื่อไฟล์คือขั้นตอนที่สร้างหรือแก้ไฟล์นั้น
ชื่อไฟล์ใน `src/` เป็นตัวอย่าง ให้ใช้ตาม `plan.md` ของกลุ่ม

```
sdpx-[ชื่อกลุ่ม]/
├── AGENTS.md                         ← 2, 5
├── compose.yaml                      ← 1 service k6
├── .gitignore                        ← 1 ไม่เก็บผลของ k6
├── vitest.config.mts                 ← 4
├── load/
│   ├── setup.sql                     ← 1
│   ├── r6.js                         ← 1
│   ├── events.js                     ← 3
│   └── results/.gitkeep              ← 1
├── ops/
│   ├── bands.yaml                    ← 4, 5
│   ├── bands.mjs                     ← 4
│   ├── bands.test.ts                 ← 4
│   └── check-bands.mjs               ← 4
├── docs/features/02-register/plan.md ← 2 เพิ่มหัวข้อ R6
├── src/
│   ├── data/
│   │   ├── [ไฟล์ของชั้น data]          ← 2 lock · 3 ดึงครั้งเดียว
│   │   └── *.db.test.ts              ← 2 test การลงทะเบียนพร้อมกัน
│   └── app/events/page.tsx           ← 3
├── evidence/
│   └── ws-07.md                      ← 7
└── .github/workflows/ci.yml          ← 4 load test ใน job e2e
```

---

## ขั้นตอนที่ 1 — load test ของ R6 ก่อนแก้

**ทำ**

```bash
git switch main
git pull origin main
git switch -c fix/r6-lock
mkdir -p load/results
touch load/results/.gitkeep
```

เพิ่มใน `.gitignore`

```
/load/results/*.json
```

เพิ่ม service `k6` ใน `compose.yaml` ใต้ service `app`
`profiles: ["load"]` ทำให้ `docker compose up` ปกติไม่เปิด k6 จะใช้เฉพาะเมื่อสั่ง `docker compose run k6`

```yaml
  k6:
    image: grafana/k6:2.3.0
    profiles: ["load"]
    user: root  # ให้เขียนผลลง ./load/results ได้บน Linux และใน CI
    environment:
      BASE_URL: http://app:3000
    volumes:
      - ./load:/load
    depends_on:
      - app
```

สร้าง `load/setup.sql` สำหรับเตรียมข้อมูลของ load test ในฐานข้อมูลในเครื่อง
แก้ `'u-org'` เป็น id ของผู้จัดใน seed data ของกลุ่ม

```sql
-- Load-test data. Runs only against the local database.
DELETE FROM registrations WHERE event_id LIKE 'load-%' OR user_id LIKE 'load-%';
DELETE FROM sessions WHERE user_id LIKE 'load-%';
DELETE FROM events WHERE id LIKE 'load-%';
DELETE FROM users WHERE id LIKE 'load-%';

INSERT INTO users (id, name, email, role)
SELECT 'load-' || lpad(n::text, 3, '0'), 'Load User ' || n, 'load' || n || '@example.com', 'ATTENDEE'
FROM generate_series(1, 300) AS n;

-- R6: one event with 50 seats for 300 people
INSERT INTO events (id, title, starts_at, capacity, organizer_id)
VALUES ('load-r6', 'Load R6', now() + interval '7 days', 50, 'u-org');

-- events list: 200 events, each with 30 registrations
INSERT INTO events (id, title, starts_at, capacity, organizer_id)
SELECT 'load-e' || n, 'Load Event ' || n, now() + (n || ' hours')::interval + interval '2 days', 40, 'u-org'
FROM generate_series(1, 200) AS n;

-- separate users so that R5 does not affect the R6 test
INSERT INTO users (id, name, email, role)
SELECT 'load-list-' || n, 'Load List ' || n, 'loadlist' || n || '@example.com', 'ATTENDEE'
FROM generate_series(1, 30) AS n;

INSERT INTO registrations (event_id, user_id, status)
SELECT 'load-e' || e, 'load-list-' || u, 'CONFIRMED'
FROM generate_series(1, 200) AS e, generate_series(1, 30) AS u;
```

สร้าง `load/r6.js`
script นี้ให้ผู้ใช้ 300 คนเข้าสู่ระบบก่อน แล้วส่งคำขอลงทะเบียนพร้อมกัน จากนั้นนับผู้ได้ที่นั่งจาก `/api/events`
หาก spec ของกลุ่มตอบการลงทะเบียนสำเร็จด้วย status อื่นที่ไม่ใช่ `201` หรือ `/api/events` ใช้ชื่อ field อื่น ให้แก้ให้ตรงกับ spec

```js
import http from "k6/http";
import { check } from "k6";
import { Counter } from "k6/metrics";

const BASE = __ENV.BASE_URL || "http://localhost:3000";
const EVENT = "load-r6";
const CAPACITY = 50;
const USERS = 300;
const overbooked = new Counter("overbooked_seats");

export const options = {
  scenarios: {
    register_at_once: { executor: "per-vu-iterations", vus: USERS, iterations: 1, maxDuration: "2m" },
  },
  thresholds: {
    overbooked_seats: ["count==0"],
    checks: ["rate==1"],
  },
};

export function setup() {
  const sessions = [];
  for (let i = 1; i <= USERS; i++) {
    const userId = `load-${String(i).padStart(3, "0")}`;
    const res = http.post(`${BASE}/api/session`, JSON.stringify({ userId }), {
      headers: { "content-type": "application/json" },
    });
    sessions.push(res.cookies.session[0].value);
  }
  return { sessions };
}

export default function (data) {
  const session = data.sessions[__VU - 1];
  const res = http.post(`${BASE}/api/events/${EVENT}/registrations`, null, { cookies: { session } });
  check(res, { "register returns 201": (r) => r.status === 201 });
}

export function teardown() {
  const events = http.get(`${BASE}/api/events`).json();
  const event = events.find((e) => e.id === EVENT);
  const confirmed = event.capacity - event.seatsLeft;
  console.log(`R6: capacity ${CAPACITY}, confirmed ${confirmed}`);
  if (confirmed > CAPACITY) overbooked.add(confirmed - CAPACITY);
  check(confirmed, { "R6: confirmed equals capacity": (c) => c === CAPACITY });
}
```

รันในเครื่อง 3 ครั้ง ทุกครั้งต้องรัน `setup.sql` ใหม่ก่อน

```bash
docker compose up -d --build --wait
docker compose exec -T db psql -q -U app -d events < load/setup.sql
docker compose run --rm k6 run /load/r6.js
```

จดจำนวน `confirmed` ทั้ง 3 ครั้ง แล้วเทียบกับที่คาดการณ์ไว้ใน `0-Before.md`
commit ไฟล์ทั้งหมดไว้ก่อนแก้

```bash
git add .
git commit -m "test: add R6 load test (red)"
```

**ผลที่ควรเห็น**

- log ของ k6 มีบรรทัด `R6: capacity 50, confirmed` ตามด้วยตัวเลขที่มากกว่า 50
- threshold `overbooked_seats` ไม่ผ่าน และ k6 จบด้วยข้อความ `thresholds on metrics ... have been crossed`
- `npm test`, `npm run test:db` และ `npm run e2e` ยังผ่านทั้งหมด

**หากติดปัญหา**

- `Cannot read property 'value' of undefined` ใน `setup`: การเข้าสู่ระบบไม่ได้ตั้ง cookie ชื่อ `session` ให้แก้ชื่อใน `r6.js` ให้ตรงกับที่ `src/lib/session.ts` ใช้
- check `register returns 201` ไม่ผ่านบางคำขอ: ดูว่าได้ status ใด หากเป็น `409` จาก R5 แปลว่าผู้ใช้ `load-*` มีรายการลงทะเบียนเดิม ให้รัน `setup.sql` ใหม่
- `insert or update on table "events" violates foreign key constraint`: id ของผู้จัดใน `setup.sql` ไม่มีใน seed data
- `confirmed` เท่ากับ 50 พอดีตั้งแต่ครั้งแรก: code ของกลุ่มอาจป้องกันไว้แล้ว ให้ตรวจว่าการอ่านและการบันทึกอยู่ใน transaction ที่มี `FOR UPDATE` หากไม่มี ให้รันซ้ำ เพราะ race condition ไม่ได้เกิดทุกครั้ง

---

## ขั้นตอนที่ 2 — แก้ R6 ด้วย row lock ในชั้น data

**ทำ**

ทำต่อบน branch `fix/r6-lock` เปิด AI agent ในโหมดวางแผนแล้วสั่ง

```
Read AGENTS.md, PROJECT.md section 4 (R6), docs/adr/, docs/features/02-register/plan.md,
docs/features/03-cancel/plan.md, src/data/, and the route handlers for registering and cancelling.
Add a section "R6: การลงทะเบียนพร้อมกัน" to docs/features/02-register/plan.md:
- In src/data, add a function that opens a transaction, locks the event row with
  SELECT ... FROM events WHERE id = $1 FOR UPDATE, reads the registrations, calls a
  callback, saves what the callback decides, and commits. Register and cancel both use it.
- src/domain does not change. The route handlers call the domain functions inside the callback.
- Tests: an integration test (*.db.test.ts) that creates its own users and an event with
  5 seats, runs 20 registrations at the same time with Promise.all, and expects exactly
  5 CONFIRMED.
- Risks: R5 is not protected by the event lock; register latency increases under load.
Do not create or change any other file.
```

ตรวจว่าแผนไม่มีไฟล์ใน `src/domain/` แล้วสั่งต่อ

```
Implement the R6 section of docs/features/02-register/plan.md.
Write the integration test first and run it against the code before the change; it must fail.
Then implement the lock. Do not change src/domain/ or any existing test.
Run npm run lint, npm test, npm run test:db and npm run build, and show the output.
```

ทดสอบด้วย load test อีก 3 ครั้ง

```bash
docker compose up -d --build --wait
docker compose exec -T db psql -q -U app -d events < load/setup.sql
docker compose run --rm k6 run /load/r6.js
```

จด `confirmed` และ p95 ของ `http_req_duration` ทั้งก่อนและหลังแก้ เพื่อใช้ในขั้นตอนที่ 7

เพิ่มในหัวข้อ Rules ของ `AGENTS.md`

```markdown
- การอ่านแล้วบันทึกที่ขึ้นกับจำนวนที่นั่งหรือคิวสำรอง ต้องทำใน transaction ที่จองแถวของกิจกรรมด้วย `FOR UPDATE`
- ห้ามยิง load test ไปที่ Live URL
```

commit แล้วเปิด PR ทำ AI review แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- integration test ใหม่ไม่ผ่านก่อนแก้ เช่น ได้ `CONFIRMED` 7 หรือ 8 คน และผ่านหลังแก้
- load test ได้ `confirmed 50` ทั้ง 3 ครั้ง และ threshold ทุกข้อผ่าน
- `git diff --stat origin/main -- src/domain` ไม่แสดงไฟล์ใด
- E2E test ยังผ่าน

**หากติดปัญหา**

- ยังจองเกินแม้มี transaction: ตรวจว่ามี `FOR UPDATE` และทั้งการอ่านกับการบันทึกใช้ client เดียวกับที่เปิด transaction
  หาก code เรียก `db().query(...)` ใน callback คำสั่งนั้นใช้การเชื่อมต่ออื่นที่อยู่นอก transaction
- test รอนานจนหมดเวลา: client ที่เปิด transaction ไม่ถูกคืนเมื่อเกิด error ตรวจว่ามี `ROLLBACK` และ `client.release()` ใน `finally`
- integration test ผ่านแม้ยังไม่ได้แก้: เพิ่มจำนวนคำขอพร้อมกัน หรือตรวจว่า test เรียก function ที่อ่านแล้วบันทึกจริง ไม่ได้เรียก domain อย่างเดียว
- integration test ไม่ผ่านใน CI เพราะไม่พบผู้ใช้: test ต้องสร้างผู้ใช้ของตนเอง เพราะ job `build` ไม่ได้รัน `load/setup.sql`

---

## ขั้นตอนที่ 3 — วัดและแก้หน้ารายการกิจกรรม

**ทำ**

```bash
git switch main
git pull origin main
git switch -c perf/events-list
```

สร้าง `load/events.js`

```js
import http from "k6/http";
import { check } from "k6";

const BASE = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  scenarios: {
    warmup: {
      executor: "constant-arrival-rate", rate: 5, timeUnit: "1s", duration: "10s",
      preAllocatedVUs: 10, tags: { phase: "warmup" },
    },
    measure: {
      executor: "constant-arrival-rate", rate: 20, timeUnit: "1s", duration: "30s",
      preAllocatedVUs: 50, startTime: "10s", tags: { phase: "measure" },
    },
  },
  thresholds: {
    "http_req_duration{phase:measure}": ["p(95)<500"],
    "checks{phase:measure}": ["rate==1"],
  },
};

export default function () {
  const res = http.get(`${BASE}/events`);
  check(res, { "events page 200": (r) => r.status === 200 });
}
```

หากหน้ารายการกิจกรรมของกลุ่มต้องเข้าสู่ระบบก่อน ให้เพิ่มการเข้าสู่ระบบใน `setup()` และส่ง cookie แบบเดียวกับ `r6.js`

วัดก่อนแก้ 3 ครั้ง

```bash
docker compose up -d --build --wait
docker compose exec -T db psql -q -U app -d events < load/setup.sql
docker compose run --rm k6 run /load/events.js
```

จด p95 ของ `http_req_duration{phase:measure}` ทั้ง 3 ครั้ง จากนั้นสั่ง AI agent ให้วิเคราะห์แบบอ่านอย่างเดียว

```
Read src/app/events/page.tsx and everything it calls in src/data.
Count how many SQL queries one request to /events sends when there are 200 events.
Explain where the count comes from. Do not change any file.
```

เมื่อ AI ยืนยันว่าเป็น N+1 query ให้สั่งแก้

```
Change the events list so that it loads the registrations of all listed events with one
query (WHERE event_id = ANY($1)), then computes seats left with the existing function in
src/domain. Do not move the seat rule into SQL. Do not change src/domain/ or any test.
Add an integration test for the new data function. Run npm run lint, npm test,
npm run test:db, npm run build and npm run e2e, and show the output.
```

วัดหลังแก้อีก 3 ครั้งด้วยคำสั่งเดิม แล้ว commit และเปิด PR ทำ AI review แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- ก่อนแก้ AI นับ query ได้เท่ากับจำนวนกิจกรรมบวก 1 หรือใกล้เคียง และ p95 มักเกิน 500 ms
- หลังแก้ จำนวน query ไม่ขึ้นกับจำนวนกิจกรรม และ threshold `p(95)<500` ผ่านทั้ง 3 ครั้ง
- จำนวนที่นั่งคงเหลือบนหน้ารายการกิจกรรมเท่าเดิมก่อนและหลังแก้

**หากติดปัญหา**

- ครั้งแรกหลัง build ช้ากว่าครั้งต่อไปมาก: นี่คือเหตุผลของช่วง warm-up ให้ใช้เฉพาะค่าของ `{phase:measure}`
- p95 ก่อนแก้ไม่ถึง 500 ms: เครื่องเร็ว ให้บันทึกค่าก่อนและหลังตามจริง เป้าหมายของขั้นนี้คือจำนวน query ไม่โตตามจำนวนกิจกรรม
- check `events page 200` ไม่ผ่าน: หน้าอาจพาไปหน้าเข้าสู่ระบบ ให้เพิ่ม cookie ตามที่เขียนไว้ข้างต้น
- ค่าแต่ละครั้งต่างกันมาก: ปิดโปรแกรมอื่นที่ใช้ CPU มาก และรันซ้ำ ค่าที่แกว่งคือสิ่งที่ band ในขั้นตอนที่ 5 ต้องรองรับ

---

## ขั้นตอนที่ 4 — load test ใน CI และ script ของ band

**ทำ**

```bash
git switch main
git pull origin main
git switch -c ci/load
npm install -D yaml@2
mkdir -p ops
```

สร้าง `ops/bands.yaml` โดยยังไม่มี baseline

```yaml
# ops/bands.yaml — ค่าปกติของตัววัด และสิ่งที่ต้องทำเมื่อค่าออกนอกช่วง
# อ่านโดย ops/check-bands.mjs หลัง load test ใน CI
metrics:
  - metric: events_page_p95_ms
    description: p95 ของหน้ารายการกิจกรรม ที่ 20 คำขอต่อวินาที หลัง warm-up
    file: load/results/events.json
    key: http_req_duration{phase:measure}
    stat: p(95)
    limit: 500          # เป้าหมายใน PROJECT.md เกินค่านี้ CI ไม่ผ่าน
    baseline:           # จาก CI 5 ครั้งล่าสุด ดู evidence/ws-07.md
      mean: null
      sd: null
    tiers:
      1sigma: { action: log }
      2sigma: { action: diagnose }
      3sigma: { action: propose }
```

สร้าง `ops/bands.mjs` ซึ่งมีเฉพาะการคำนวณ จึง test ได้ง่าย

```js
// Pure functions used by ops/check-bands.mjs. No I/O here, so they are easy to test.

export function classify(value, metric) {
  if (value > metric.limit) return { tier: "over-limit", fail: true };
  const { mean, sd } = metric.baseline ?? {};
  if (mean == null || sd == null || sd <= 0) return { tier: "no-baseline", fail: false };
  const z = (value - mean) / sd;
  if (z >= 3) return { tier: "3sigma", z, fail: false };
  if (z >= 2) return { tier: "2sigma", z, fail: false };
  if (z >= 1) return { tier: "1sigma", z, fail: false };
  return { tier: "normal", z, fail: false };
}

export function meanAndSd(values) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const sd = Math.sqrt(values.reduce((a, b) => a + (b - mean) ** 2, 0) / (values.length - 1));
  return { mean: Math.round(mean * 10) / 10, sd: Math.round(sd * 10) / 10 };
}
```

สร้าง `ops/check-bands.mjs`

```js
// Usage: node ops/check-bands.mjs            check every metric in ops/bands.yaml
//        node ops/check-bands.mjs 41 38 45 40 52   print mean and sd of past values
import { appendFileSync, readFileSync } from "node:fs";
import { parse } from "yaml";
import { classify, meanAndSd } from "./bands.mjs";

if (process.argv.length > 2) {
  console.log(meanAndSd(process.argv.slice(2).map(Number)));
  process.exit(0);
}

const ACTIONS = {
  normal: "ไม่ต้องทำอะไร",
  "no-baseline": "ยังไม่มี baseline ให้บันทึกค่านี้ไว้คำนวณ",
  "1sigma": "บันทึกไว้ ยังไม่ต้องทำอะไร",
  "2sigma": "ให้สมาชิกสั่ง AI วิเคราะห์แบบอ่านอย่างเดียว ตามขั้นตอนใน AGENTS.md",
  "3sigma": "ให้สมาชิกสั่ง AI วิเคราะห์และเสนอการแก้เป็น PR ซึ่งต้องผ่านด่านตามปกติ",
  "over-limit": "เกินเป้าหมาย CI ไม่ผ่าน",
};

const { metrics } = parse(readFileSync("ops/bands.yaml", "utf8"));
let failed = false;
const lines = ["| metric | ค่า | ระดับ | สิ่งที่ต้องทำ |", "|---|---|---|---|"];
for (const m of metrics) {
  const summary = JSON.parse(readFileSync(m.file, "utf8"));
  const value = summary.metrics[m.key][m.stat];
  const r = classify(value, m);
  failed ||= r.fail;
  lines.push(`| ${m.metric} | ${value.toFixed(1)} | ${r.tier} | ${ACTIONS[r.tier]} |`);
}
const report = lines.join("\n");
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + "\n");
process.exit(failed ? 1 : 0);
```

สร้าง `ops/bands.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { classify, meanAndSd } from "./bands.mjs";

const metric = { limit: 500, baseline: { mean: 40, sd: 5 } };

describe("bands", () => {
  it.each([
    [42, "normal"],
    [45, "1sigma"],
    [50, "2sigma"],
    [55, "3sigma"],
    [501, "over-limit"],
  ])("value %d is %s", (value, tier) => {
    expect(classify(value, metric).tier).toBe(tier);
  });

  it("only over-limit fails", () => {
    expect(classify(55, metric).fail).toBe(false);
    expect(classify(501, metric).fail).toBe(true);
  });

  it("without baseline only the limit applies", () => {
    expect(classify(300, { limit: 500, baseline: { mean: null, sd: null } }).tier).toBe("no-baseline");
  });

  it("mean and sample standard deviation", () => {
    expect(meanAndSd([40, 42, 38, 44, 36])).toEqual({ mean: 40, sd: 3.2 });
  });
});
```

เพิ่ม `ops` ใน `include` ของ `vitest.config.mts`

```ts
  test: { include: ["src/**/*.test.ts", ".agents/**/*.test.ts", "ops/**/*.test.ts"] },
```

ใน `.github/workflows/ci.yml` เพิ่ม 4 บรรทัดต่อจาก `- run: npx playwright test` ใน job `e2e`

```yaml
      - run: docker compose exec -T db psql -q -U app -d events < load/setup.sql
      - run: docker compose run --rm k6 run /load/r6.js
      - run: docker compose run --rm k6 run --summary-export /load/results/events.json /load/events.js
      - run: node ops/check-bands.mjs
```

ทดลองในเครื่องก่อน push

```bash
npm test
docker compose exec -T db psql -q -U app -d events < load/setup.sql
docker compose run --rm k6 run --summary-export /load/results/events.json /load/events.js
node ops/check-bands.mjs
```

commit แล้วเปิด PR ทำ AI review แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- `npm test` รัน test ของ band ด้วยและผ่าน
- `node ops/check-bands.mjs` ในเครื่องแสดงตารางที่มีค่า p95 และระดับ `no-baseline`
- job `e2e` ของ PR ผ่านขั้น k6 ทั้ง 2 ขั้น และหน้าสรุปของ workflow มีตารางเดียวกัน

**หากติดปัญหา**

- `Cannot find package 'yaml'`: ยังไม่ได้รัน `npm install -D yaml@2` หรือไม่ได้ commit `package-lock.json`
- CI ไม่ผ่านที่ k6 เพราะเขียน `/load/results/events.json` ไม่ได้: ตรวจว่ามี `user: root` ใน service `k6` และมี `load/results/.gitkeep` ใน git
- `Cannot read properties of undefined (reading 'p(95)')`: ชื่อ `key` ใน `bands.yaml` ต้องตรงกับชื่อ metric ใน `events.json` ทุกตัวอักษร
- job `e2e` ใช้เวลานานขึ้นมาก: load test ทั้ง 2 ไฟล์ควรใช้ไม่ถึง 1 นาที หากนานกว่านั้นให้ดูว่าขั้นใดช้า

---

## ขั้นตอนที่ 5 — ตั้ง baseline และขั้นตอนเมื่อค่าออกนอกช่วง

**ทำ**

เปิดหน้า Actions ของ repository เลือก workflow ที่ job `e2e` ผ่านขั้น `node ops/check-bands.mjs` แล้ว 5 ครั้ง
อ่านค่า p95 จากตารางในหน้าสรุปของแต่ละครั้ง
หากยังมีไม่ครบ 5 ครั้ง ให้เปิด workflow ล่าสุดแล้วกด **Re-run jobs** → **Re-run failed jobs** หรือ **Re-run all jobs** จนครบ

คำนวณ baseline

```bash
node ops/check-bands.mjs [ค่าที่ 1] [ค่าที่ 2] [ค่าที่ 3] [ค่าที่ 4] [ค่าที่ 5]
```

```bash
git switch main
git pull origin main
git switch -c ops/baseline
```

ใส่ค่า `mean` และ `sd` ที่ได้ลงใน `ops/bands.yaml` แล้วเพิ่มหัวข้อนี้ใน `AGENTS.md`

```markdown
## เมื่อ band แจ้งเตือน

- 2sigma: สมาชิกเปิด AI agent ในบทสนทนาใหม่แล้วสั่ง
  "Read ops/bands.yaml and the CI summary I paste below. Compare with the last merged PRs
  (git log --oneline -10) and explain which change most likely made events_page_p95_ms
  slower. Do not change any file." แล้วสมาชิกตัดสินว่าจะแก้ จะรอดู หรือปรับ band
- 3sigma: ทำแบบ 2sigma แล้วให้ AI เสนอการแก้เป็น PR ซึ่งต้องผ่าน CI, AI review และการอนุมัติตามปกติ
- over-limit: CI ไม่ผ่าน ให้แก้ก่อน merge
- ห้ามแก้ `ops/bands.yaml` เพื่อให้ CI ผ่าน การปรับ band ต้องมีเหตุผลใน PR
```

commit แล้วเปิด PR ทำ AI review แล้วให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- `ops/bands.yaml` มี `mean` และ `sd` จาก CI 5 ครั้ง
- ตารางในหน้าสรุปของ PR นี้แสดงระดับ เช่น `normal` หรือ `1sigma` แทน `no-baseline`

**หากติดปัญหา**

- `sd` เป็น 0 หรือใกล้ 0 มาก: ค่าทั้ง 5 ครั้งเท่ากันเกินไป band จะแจ้งเตือนทุกครั้งที่ค่าเปลี่ยนเล็กน้อย ให้เก็บผลเพิ่มอีก 5 ครั้งแล้วคำนวณใหม่
- ค่าจาก CI ต่างจากในเครื่องมาก: เป็นเรื่องปกติ baseline ของ CI ต้องมาจาก CI เท่านั้น

---

## ขั้นตอนที่ 6 — เตรียม PR break-it-live

**ทำ**

```bash
git switch main
git pull origin main
git switch -c demo/no-lock
```

ลบเฉพาะคำว่า `FOR UPDATE` ออกจาก query ที่จองแถวของกิจกรรม โดยยังเก็บ transaction ไว้

```bash
git commit -am "test: remove the event row lock on purpose"
git push -u origin demo/no-lock
```

เปิด PR รอให้ CI ทำงาน
**เปิด PR นี้ทิ้งไว้จนถึงคาบ demo** แล้วจึงปิดโดยไม่ merge หลัง demo

**ผลที่ควรเห็น**

- job `e2e` ไม่ผ่านที่ขั้น `docker compose run --rm k6 run /load/r6.js` และ log มี `confirmed` มากกว่า 50
- ปุ่ม merge กดไม่ได้

**หากติดปัญหา**

- job `build` ไม่ผ่านก่อน: integration test จากขั้นตอนที่ 2 จับได้ก่อน ซึ่งเป็นเรื่องดี บันทึกไว้ใน evidence และยังใช้ PR นี้ได้
- k6 ยังได้ `confirmed 50`: race condition ไม่ได้เกิดทุกครั้ง กด Re-run jobs หากยังผ่านหลายครั้ง ให้ตรวจว่าลบ `FOR UPDATE` ใน query ที่ใช้จริง

---

## ขั้นตอนที่ 7 — บันทึกหลักฐาน

สร้าง branch `docs/evidence-07` และ `evidence/ws-07.md`

```markdown
# WS-07 Evidence

## R6
- คาดการณ์จาก 0-Before.md: CONFIRMED [จำนวน] คน
- ก่อนแก้ (3 ครั้ง): confirmed [ค่า], [ค่า], [ค่า] · p95 ของคำขอลงทะเบียน [ms]
- หลังแก้ (3 ครั้ง): confirmed [ค่า], [ค่า], [ค่า] · p95 ของคำขอลงทะเบียน [ms]
- integration test ก่อนแก้ได้ CONFIRMED [จำนวน] จาก 5 ที่นั่ง
- PR: [ลิงก์]

## หน้ารายการกิจกรรม (ในเครื่อง 200 กิจกรรม)
- query ต่อ 1 คำขอ: ก่อนแก้ [จำนวน] · หลังแก้ [จำนวน]
- p95 ก่อนแก้ (3 ครั้ง): [ms], [ms], [ms]
- p95 หลังแก้ (3 ครั้ง): [ms], [ms], [ms]
- PR: [ลิงก์]

## Band
- p95 จาก CI 5 ครั้ง: [ms], [ms], [ms], [ms], [ms] · ลิงก์ workflow: [ลิงก์]
- mean [ms] · sd [ms]

## Break-it-live
- [ลิงก์ PR] · job ที่ไม่ผ่าน: [build, e2e] · confirmed ใน log: [จำนวน]
```

commit แล้วเปิด PR ซึ่งต้องผ่านด่านเช่นเดียวกับ PR อื่น

**ผลที่ควรเห็น**

- `evidence/ws-07.md` มีครบทุกหัวข้อ และ PR ถูก merge ผ่าน ruleset

**หากติดปัญหา**

- ไม่ได้จดค่าก่อนแก้: checkout commit ก่อนแก้ด้วย `git switch --detach [commit]` แล้ววัดใหม่ เสร็จแล้วกลับด้วย `git switch main`

---

## Retro

ปรึกษากันในกลุ่ม แล้วบันทึกคำตอบสั้น ๆ ท้าย `evidence/ws-07.md`

1. การคาดการณ์ใน `0-Before.md` ต่างจากผลจริงเท่าใด และเหตุใด
2. lock ทำให้คำขอลงทะเบียนช้าลงเท่าใด ยอมรับได้หรือไม่ และหากไม่ได้จะเลือกทางใดจากตารางใน lecture
3. ตัววัดใดอีกที่ควรมี band และตัววัดใดควรเป็น gate แทน
