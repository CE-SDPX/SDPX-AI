# WS-03 · Lab — Unit Test Loop

**รูปแบบ:** งานกลุ่ม ใช้ repository เดิมของกลุ่มจาก WS-02

**เป้าหมาย:** feature `01-events` และ `02-register` ใช้งานได้ผ่าน API ตาม `openapi.yaml`
กฎ R1, R3, R4 และ R5 มี unit test ที่เขียนก่อน code และ CI รัน test ทุก PR
มี `plan.md` ของทั้ง 2 feature และ ADR-002 บันทึกการแบ่งชั้นของ code

---

## สิ่งที่ต้องมีก่อนเริ่ม

- WS-02 เสร็จแล้ว: `spec.md` ของทั้ง 2 feature, `openapi.yaml` และ ADR-001 ถูก merge และ CI ของ `main` เป็นสีเขียว
- ทุกคนทำ `0-Before.md` ส่วน B และ C เสร็จแล้ว และนำตารางกรณีทดสอบของกฎที่ตนรับผิดชอบมาด้วย

ทุกการแก้ไขยังทำบน branch แยกและเข้า `main` ผ่าน PR ที่สมาชิกอีกคนเป็นผู้อนุมัติ

---

## โครงสร้าง repository ที่จะได้เมื่อจบบทนี้

แสดงเฉพาะไฟล์ที่เพิ่มหรือแก้ในบทนี้ ตัวเลขหลังชื่อไฟล์คือขั้นตอนที่สร้างหรือแก้ไฟล์นั้น
ชื่อไฟล์ใน `src/` เป็นตัวอย่างสำหรับกลุ่มที่เลือกแบ่งเป็น 3 ชั้น ให้ใช้ตาม `plan.md` ของกลุ่ม

```
sdpx-[ชื่อกลุ่ม]/
├── AGENTS.md                          ← 3 เพิ่มคำสั่ง test และกติกาเรื่อง test
├── package.json                       ← 3 เพิ่ม vitest และคำสั่ง test
├── vitest.config.mts                  ← 3
├── docs/
│   ├── adr/
│   │   └── ADR-002-layering.md        ← 1
│   └── features/
│       ├── 01-events/plan.md          ← 2
│       └── 02-register/plan.md        ← 2
├── src/
│   ├── domain/
│   │   ├── types.ts                   ← 3
│   │   ├── events.ts                  ← 3
│   │   ├── events.test.ts             ← 3
│   │   ├── registration.ts            ← 4
│   │   └── registration-r*.test.ts    ← 4 แยกไฟล์ตามกฎ
│   ├── data/
│   │   └── store.ts                   ← 5 ตาม ADR-001
│   ├── lib/
│   │   └── current-user.ts            ← 5 ชั่วคราวจนถึงบทที่ 6
│   └── app/api/...                    ← 5 route handler ตาม openapi.yaml
├── evidence/
│   └── ws-03.md                       ← 6 และ 7
└── .github/workflows/ci.yml           ← 3 เพิ่มขั้น npm test
```

---

## ขั้นตอนที่ 1 — เขียน ADR-002 การแบ่งชั้นของ code

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/adr-002
```

สร้าง `docs/adr/ADR-002-layering.md` ทางเลือกอย่างน้อย 3 ทางตามที่เรียนใน lecture

```markdown
# ADR-002: การแบ่งชั้นของ code ใน src/

สถานะ: ใช้อยู่
วันที่: [วันที่]

## บริบท
[เหตุใดต้องตัดสินตอนนี้ เช่น สมาชิกหลายคนจะเริ่มเขียน code พร้อมกัน และกฎ R1–R5 ต้อง test ได้]

## ทางเลือกที่พิจารณา
1. เขียนทุกอย่างใน route handler — ข้อดี / ข้อเสีย
2. แยกเป็น route handler, domain และ data — ข้อดี / ข้อเสีย
3. ใช้ Server Actions แทน route handler — ข้อดี / ข้อเสีย

## การตัดสินใจ
[เลือกทางใด และแต่ละชั้นอยู่ในโฟลเดอร์ใด]

## ผลที่ตามมา
[test กฎได้อย่างไร ผลต่อการเปลี่ยนไปใช้ PostgreSQL ในบทที่ 5 และสิ่งที่ยากขึ้น]
```

ใช้ AI ช่วยหาข้อดีข้อเสียได้ แต่การตัดสินใจและเหตุผลต้องเขียนเอง
commit แล้วเปิด PR ให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- ADR มีทางเลือกอย่างน้อย 3 ทาง และหัวข้อการตัดสินใจระบุโฟลเดอร์ของแต่ละชั้น
- หัวข้อผลที่ตามมาบอกได้ว่าจะ test กฎ R1, R3, R4, R5 โดยไม่สร้างคำขอ HTTP ได้อย่างไร

**หากติดปัญหา**

- สมาชิกเห็นไม่ตรงกัน: เลือกทางที่ test กฎได้โดยตรง แล้วบันทึกอีกทางไว้ในทางเลือกที่พิจารณา
- ไม่แน่ใจว่าจะเก็บข้อมูลไว้ชั้นใด: ดู ADR-001 ชั้นที่เก็บข้อมูลต้องเป็นชั้นเดียวที่เปลี่ยนเมื่อเปลี่ยนไปใช้ PostgreSQL

---

## ขั้นตอนที่ 2 — ให้ AI ร่าง `plan.md` แล้วกลุ่มแก้จนใช้ได้

**ทำ**

```bash
git switch main
git pull origin main
git switch -c docs/plan-02-register
```

เปิด AI agent ในโหมดวางแผน (plan mode) หากเครื่องมือมีโหมดนี้ แล้วสั่ง

```
Read AGENTS.md, PROJECT.md, docs/adr/, and every file in docs/features/02-register/.
Write docs/features/02-register/plan.md in Thai with these sections:
1. References (intent, spec, ADRs)
2. Files to add or change, with what changes in each file (follow ADR-002)
3. Order of work, starting with the tests
4. Tests that prove the work is done: a table of test names and the rule code
   or spec section each one checks. Test names start with the rule code, for example
   "R1: ได้ WAITLISTED เมื่อที่นั่งเต็มพอดี". Include boundary values from the spec.
5. Risks and how each one is checked
6. Out of scope
Domain functions must take the current time as a parameter.
Do not decide anything the spec does not decide; list it under Risks instead.
Do not create or change any other file.
```

ทำแบบเดียวกันกับ `01-events` บน branch `docs/plan-01-events`
ในแผนของ `01-events` ให้มี function คำนวณที่นั่งคงเหลือ ซึ่งจะใช้ในขั้นตอนที่ 3

ตรวจแผนก่อน commit

- เทียบรายการ test กับตารางกรณีทดสอบที่สมาชิกเตรียมมาจาก `0-Before.md` เพิ่มกรณีที่แผนยังไม่มี
- ทุกกฎ R1, R3, R4, R5 มี test อย่างน้อย 1 ข้อที่เป็นค่าขอบ
- สมาชิกที่ไม่ได้อยู่ในบทสนทนากับ AI อ่านแผนแล้วบอกได้ว่าจะแก้ไฟล์ใดก่อน

เปิด PR ให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- `plan.md` ของทั้ง 2 feature ถูก merge
- รายการ test ทุกข้อขึ้นต้นด้วยรหัสกฎหรืออ้างหัวข้อใน spec
- `git status` ก่อน commit แสดงเฉพาะไฟล์ `plan.md`

**หากติดปัญหา**

- AI เริ่มเขียน code: ปฏิเสธการแก้ไขนั้น ใช้ plan mode หรือย้ำข้อห้ามในคำสั่ง
- แผนวาง code ต่างจาก ADR-002: สั่งให้แก้แผนตาม ADR-002 ห้ามแก้ ADR
- AI ตัดสินเรื่องที่ spec ยังไม่ได้ตัดสิน: ย้ายไปไว้ในหัวข้อความเสี่ยง แล้วกลุ่มตัดสินเพิ่มในตารางการตัดสินใจของ `spec.md`

---

## ขั้นตอนที่ 3 — ติดตั้ง Vitest และทำรอบ Red → Green แรกร่วมกัน

ขั้นตอนนี้ทำทั้งกลุ่มบนเครื่องเดียว โดยสลับกันพิมพ์ เพื่อให้ทุกคนเห็นลำดับเดียวกันก่อนแยกกันทำในขั้นตอนที่ 4

### 3.1 ติดตั้ง Vitest

**ทำ**

```bash
git switch main
git pull origin main
git switch -c test/seats-left
npm install -D vitest@5 @types/node@22
npm pkg set scripts.test="vitest run"
```

สร้าง `vitest.config.mts` ที่ระดับบนสุดของ repository

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: { include: ["src/**/*.test.ts"] },
});
```

**ผลที่ควรเห็น**

- `npm test` แสดง `No test files found` ซึ่งถูกต้อง เพราะยังไม่มี test

**หากติดปัญหา**

- `ERESOLVE could not resolve` ที่เกี่ยวกับ `@types/node`: `create-next-app` ติดตั้ง `@types/node` รุ่น 20 ซึ่ง Vitest 5 ไม่รองรับ ให้ติดตั้งพร้อม `@types/node@22` ตามคำสั่งข้างต้น
- warning ว่า `ESM syntax in a file loaded as CommonJS`: ตรวจว่าชื่อไฟล์ลงท้ายด้วย `.mts` ไม่ใช่ `.ts`

### 3.2 เขียน test ก่อน พร้อม function ว่าง

**ทำ**

สร้าง `src/domain/types.ts` ตามข้อมูลใน `PROJECT.md` หัวข้อ 3 และชื่อ field ที่ใช้ใน `openapi.yaml`

```ts
export type Role = "ORGANIZER" | "ATTENDEE";
export type RegistrationStatus = "CONFIRMED" | "WAITLISTED" | "CANCELLED";

export type User = { id: string; name: string; email: string; role: Role };
export type Event = { id: string; title: string; startsAt: Date; capacity: number; organizerId: string };
export type Registration = {
  id: string;
  eventId: string;
  userId: string;
  status: RegistrationStatus;
  createdAt: Date;
};
```

สร้าง `src/domain/events.ts` เป็น function ว่าง

```ts
import type { Event, Registration } from "./types";

export function seatsLeft(event: Event, registrations: Registration[]): number {
  throw new Error("not implemented");
}
```

สร้าง `src/domain/events.test.ts` ตามรายการ test ใน `docs/features/01-events/plan.md`
ตัวอย่างด้านล่างมี 2 test ให้เพิ่มจนครบตามแผน

```ts
import { describe, it, expect } from "vitest";
import { seatsLeft } from "@/domain/events";
import type { Registration } from "@/domain/types";

const event = {
  id: "e1", title: "Workshop", startsAt: new Date("2026-12-10T09:00:00Z"),
  capacity: 3, organizerId: "o1",
};
const reg = (userId: string, status: Registration["status"]): Registration => ({
  id: `r-${userId}`, eventId: "e1", userId, status,
  createdAt: new Date("2026-12-01T09:00:00Z"),
});

describe("seatsLeft", () => {
  it("ที่นั่งคงเหลือเท่ากับ capacity เมื่อยังไม่มีผู้ลงทะเบียน", () => {
    expect(seatsLeft(event, [])).toBe(3);
  });

  it("ไม่นับรายการ WAITLISTED และ CANCELLED", () => {
    const regs = [reg("u1", "CONFIRMED"), reg("u2", "WAITLISTED"), reg("u3", "CANCELLED")];
    expect(seatsLeft(event, regs)).toBe(2);
  });
});
```

```bash
npm test
```

**ผลที่ควรเห็น**

- test ทุกข้อไม่ผ่าน และข้อความ error คือ `not implemented`

**หากติดปัญหา**

- error `Cannot find package '@/domain/events'`: ตรวจว่ามี `resolve: { tsconfigPaths: true }` ใน `vitest.config.mts`
- test ผ่านทั้งที่ function ยังว่าง: test นั้นไม่ได้ตรวจอะไร ให้แก้ assertion ก่อนทำขั้นถัดไป
- lint แสดง warning ว่า parameter ไม่ได้ใช้: เป็นเพียง warning จะหายไปเมื่อเขียน code จริง

### 3.3 เพิ่ม `npm test` ใน CI และกติกาใน `AGENTS.md`

**ทำ**

เพิ่มขั้น `npm test` ใน `.github/workflows/ci.yml` ต่อจาก `npm run lint`

```yaml
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
      - run: npx --yes @redocly/cli@2 lint docs/openapi.yaml
```

เพิ่มในหัวข้อ Commands ของ `AGENTS.md`

```markdown
- test: `npm test`
- test เฉพาะกฎ: `npx vitest run -t "R1"`
```

เพิ่มในหัวข้อ Rules ของ `AGENTS.md`

```markdown
- ก่อนแก้ code ของ feature ให้อ่าน `docs/features/[feature]/plan.md` หากต้องทำต่างจากแผน ให้แก้ `plan.md` ใน commit เดียวกัน
- กฎ R1–R6 อยู่ใน `src/domain/` เท่านั้น ตาม ADR-002
- function ใน `src/domain/` ห้ามเรียก `new Date()` หรือ `Date.now()` ให้รับเวลาเป็น parameter
- หากคิดว่า test ผิด ให้หยุดและอธิบายเหตุผล ห้ามแก้ test เอง
- รัน `npm test` ก่อนรายงานว่างานเสร็จ และแสดงผลที่ได้
```

commit test พร้อม function ว่างก่อน แล้ว push และเปิด PR

```bash
git add .
git commit -m "test: add seatsLeft tests (red)"
git push -u origin test/seats-left
```

**ผลที่ควรเห็น**

- CI ของ PR เป็นสีแดงที่ขั้น `npm test` ส่วน Vercel preview ยัง build ผ่าน

**หากติดปัญหา**

- CI แดงที่ขั้น build แทนขั้น test: test import สิ่งที่ยังไม่มี ให้สร้าง function ว่างให้ครบทุกตัวที่ test เรียก
- CI แดงที่ขั้น `npm ci`: ตรวจว่า commit `package-lock.json` แล้ว

### 3.4 ให้ AI เขียน code จน test ผ่าน

**ทำ**

สั่ง AI agent

```
Read AGENTS.md and docs/features/01-events/plan.md.
Implement seatsLeft in src/domain/events.ts so that every test in
src/domain/events.test.ts passes. Do not edit any test file.
Run npm test and show the output.
```

ตรวจ diff ว่า AI แก้เฉพาะ `src/domain/events.ts` แล้วจึง commit และ push

```bash
git commit -am "feat: implement seatsLeft"
git push
```

ให้สมาชิกอีกคนอนุมัติ PR แล้ว merge

**ผลที่ควรเห็น**

- `npm test` แสดงว่า test ผ่านทั้งหมด พร้อม `Duration` ไม่กี่วินาที
- หน้า PR แสดง commit แรกที่ CI เป็นสีแดง ตามด้วย commit ที่ CI เป็นสีเขียว

**หากติดปัญหา**

- AI แก้ไฟล์ test: ปฏิเสธการแก้ไขนั้นทั้งหมด แล้วสั่งใหม่โดยย้ำว่าห้ามแก้ test
- AI บอกว่าเสร็จแต่ไม่ได้แสดงผลของ `npm test`: สั่งให้รันและแสดงผล ห้ามเชื่อคำว่าเสร็จโดยไม่มีผล

---

## ขั้นตอนที่ 4 — test ก่อน code ของกฎ R1, R3, R4, R5

**ทำ**

### 4.1 สร้าง function ว่างของการลงทะเบียน

สมาชิก 1 คนสร้าง function ว่างตามที่ระบุใน `docs/features/02-register/plan.md` แล้ว merge เข้า `main` ก่อน
เพื่อให้ทุกคนเขียน test เรียก function เดียวกัน ตัวอย่าง

```ts
// src/domain/registration.ts
import type { Event, Registration, RegistrationStatus } from "./types";

export type RegisterResult =
  | { ok: true; status: RegistrationStatus }
  | { ok: false; code: string };

export function register(
  event: Event,
  userId: string,
  registrations: Registration[],
  events: Event[],
  now: Date,
): RegisterResult {
  throw new Error("not implemented");
}
```

parameter `events` ใช้หาเวลาเริ่มของกิจกรรมอื่นเมื่อตรวจ R5 และค่า `code` ต้องตรงกับ error code ใน spec

### 4.2 แต่ละคนทำกฎที่ตนรับผิดชอบ

```bash
git switch main
git pull origin main
git switch -c test/r4
```

1. เขียน test ของกฎตนเองในไฟล์ `src/domain/registration-r4.test.ts` ตามรายการใน `plan.md` และตารางที่เตรียมมา
   ใช้ AI ช่วยเขียน code ของ test ได้ แต่ผลที่คาดไว้ในทุก assertion ต้องตรวจกับ spec และตารางการตัดสินใจด้วยตนเอง
2. รัน `npx vitest run -t "R4"` แล้วยืนยันว่าไม่ผ่านด้วย `not implemented` หรือค่าไม่ตรง
3. commit ด้วยข้อความ `test: add R4 tests (red)` แล้ว push และเปิด PR รอให้ CI เป็นสีแดง
4. สั่ง AI agent

   ```
   Read AGENTS.md, docs/features/02-register/spec.md and plan.md.
   Change src/domain/registration.ts so that the tests whose names start
   with "R4" pass, and every other test that passed before still passes.
   Do not edit any test file. If you think a test is wrong, stop and explain why.
   Run npm test and show the output.
   ```

5. ตรวจ diff แล้ว commit ด้วยข้อความ `feat: implement R4` และ push
6. ให้สมาชิกอีกคนอนุมัติ PR แล้ว merge

**ผลที่ควรเห็น**

- PR ของกฎแต่ละข้อมี commit ของ test ที่ CI เป็นสีแดง ตามด้วย commit ของ code ที่ CI เป็นสีเขียว
- `npm test` บน `main` ผ่านทั้งหมด และมี test ของ R1, R3, R4, R5 ครบ

**หากติดปัญหา**

- merge conflict ใน `registration.ts`: เกิดได้เพราะทุกคนแก้ function เดียวกัน ให้ `git pull origin main` แก้ conflict แล้วรัน `npm test` ให้ผ่านทั้งหมดก่อน push
- AI บอกว่า test ผิด: เปิด spec ดูพร้อมกันในกลุ่ม หาก test ผิดจริงให้คนแก้ test ใน commit แยก หาก spec ไม่ได้บอก ให้เพิ่มในตารางการตัดสินใจก่อน
- test ของ R4 ผ่านบ้างไม่ผ่านบ้างตามวันที่รัน: test หรือ code เรียก `new Date()` เอง ให้ใช้เวลาที่กำหนดไว้ตายตัว
- test ของกฎอื่นไม่ผ่านหลังแก้กฎของตน: code ใหม่กระทบกฎอื่น ให้ AI แก้ code ต่อ ห้ามแก้ test ของผู้อื่น

---

## ขั้นตอนที่ 5 — เชื่อม route handler และที่เก็บข้อมูล

**ทำ**

```bash
git switch main
git pull origin main
git switch -c feat/api-register
```

สั่ง AI agent

```
Read AGENTS.md, docs/openapi.yaml, docs/adr/, and plan.md of 01-events and 02-register.
Following the plans:
1. Create the data layer chosen in ADR-001, with seed users and seed events.
2. Create src/lib/current-user.ts. Until WS-06 it reads the user id from the
   request header "x-user-id" and returns the seed user, or null if not found.
   This is temporary; mark it with a comment "TEMPORARY until WS-06".
3. Create the route handlers for every endpoint of 01-events and 02-register in openapi.yaml.
   Route handlers only read the request, call src/domain, save data, and map
   error codes to the status codes in the spec. Pass new Date() as the current time.
Do not edit any test file or anything in docs/. Run npm run lint, npm test and npm run build.
```

ตรวจ diff ว่า route handler ไม่มีเงื่อนไขของกฎ R1–R5 อยู่เอง จากนั้นทดสอบในเครื่อง
โดยแทน path ด้วย path จริงใน `openapi.yaml` ของกลุ่ม

```bash
npm run dev
```

เปิด terminal อีกหน้าต่างแล้วรัน

```bash
curl -s -w " %{http_code}\n" http://localhost:3000/api/events
curl -s -w " %{http_code}\n" -X POST http://localhost:3000/api/events/[id]/registrations -H "x-user-id: [id ผู้ใช้]"
curl -s -w " %{http_code}\n" -X POST http://localhost:3000/api/events/[id]/registrations -H "x-user-id: [id ผู้ใช้]"
```

เพิ่มความเสี่ยงของ `current-user.ts` ไว้ในหัวข้อความเสี่ยงของ `docs/features/02-register/plan.md`
แล้ว commit และเปิด PR ให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- คำสั่งแรกได้รายการกิจกรรมจาก seed data พร้อม status `200`
- การลงทะเบียนครั้งแรกได้ status code ของกรณีสำเร็จตาม spec และครั้งที่สองได้ status code กับ error code ของ R3 ตาม spec
- หลัง merge แล้ว `[Live URL]/api/events` แสดงรายการกิจกรรม

**หากติดปัญหา**

- error เรื่อง `params` ใน route handler: Next.js 16 ส่ง `params` เป็น Promise ต้องใช้ `const { id } = await ctx.params`
- ได้ `500` แทน `404` เมื่อไม่พบกิจกรรม: route handler ไม่ได้ตรวจกรณีไม่พบข้อมูลก่อนเรียก domain
- ข้อมูลบน Live URL หายหรือไม่ตรงกันระหว่างการเรียกแต่ละครั้ง: เป็นผลของการเก็บข้อมูลในหน่วยความจำบน Vercel ตามที่บันทึกไว้ใน ADR-001 ให้ทดสอบการลงทะเบียนในเครื่อง
- route handler มีเงื่อนไขของกฎอยู่เอง: สั่งให้ย้ายไป `src/domain/` และเพิ่ม test ก่อนย้าย

---

## ขั้นตอนที่ 6 — แก้กฎให้ผิดทีละข้อ แล้วดูว่า test จับได้หรือไม่

**ทำ**

ทำในเครื่องบน `main` ล่าสุด **ไม่ commit**
สมาชิกแต่ละคนทำกับกฎที่ตนรับผิดชอบ

1. เปิด `src/domain/registration.ts` แล้วแก้ code ของกฎตนให้ผิด 1 จุด เช่น ลบเงื่อนไข หรือเปลี่ยน `<` เป็น `<=`
2. รัน `npm test` แล้วจดชื่อ test ที่ไม่ผ่าน
3. คืนไฟล์เดิมด้วย `git checkout -- src/domain`
4. ทำซ้ำอีก 1 จุด

บันทึกผลใน `evidence/ws-03.md` บน branch `docs/evidence-03`

```markdown
## ผลการแก้กฎให้ผิด

| กฎ | จุดที่แก้ | test ที่ไม่ผ่าน |
|---|---|---|
| R4 | เปลี่ยน `<` เป็น `<=` ในการเทียบเวลาเริ่ม | R4: ลงทะเบียนไม่ได้เมื่อถึงเวลาเริ่มพอดี |
| | | |
```

**ผลที่ควรเห็น**

- ทุกจุดที่แก้มี test ไม่ผ่านอย่างน้อย 1 ข้อ
- `git status` หลังคืนไฟล์ไม่แสดงการแก้ไขใน `src/`

**หากติดปัญหา**

- แก้แล้วไม่มี test ใดไม่ผ่าน: กฎจุดนั้นไม่มี test ป้องกัน ให้เพิ่ม test ใน PR ใหม่ตามลำดับของขั้นตอนที่ 4 แล้วทำขั้นตอนนี้ซ้ำ และบันทึกไว้ในตาราง
- คืนไฟล์ไม่ได้: ตรวจว่าอยู่ที่ระดับบนสุดของ repository แล้วรัน `git checkout -- src/domain` อีกครั้ง

---

## ขั้นตอนที่ 7 — เตรียมหลักฐาน

**ทำ**

### 7.1 เตรียม PR break-it-live

```bash
git switch main
git pull origin main
git switch -c demo/broken-rule
```

ลบหรือ comment เงื่อนไขที่ตรวจกฎ R5 ใน `src/domain/registration.ts`

```bash
git commit -am "test: break rule R5 on purpose"
git push -u origin demo/broken-rule
```

เปิด PR รอให้ `CI` เป็นสีแดงที่ขั้น `npm test` แล้ว **ปิด PR โดยไม่ merge**

### 7.2 บันทึกใน `evidence/ws-03.md`

เพิ่มส่วนนี้ไว้เหนือตารางจากขั้นตอนที่ 6

```markdown
# WS-03 Evidence

- จำนวน test และเวลาที่ใช้: [ตัวเลข Tests และ Duration จาก npm test บน main]
- PR ของแต่ละกฎ (commit test สีแดง แล้ว commit code สีเขียว):
  - R1: [ลิงก์ PR]
  - R3: [ลิงก์ PR]
  - R4: [ลิงก์ PR]
  - R5: [ลิงก์ PR]
- Break-it-live: [ลิงก์ PR ที่ CI ไม่ผ่านและปิดแล้ว]
- สิ่งที่ AI เสนอแต่กลุ่มไม่รับ:

| AI เสนอ | เหตุผลที่ไม่รับ |
|---|---|
| | |
| | |
```

commit แล้วเปิด PR ให้สมาชิกอีกคนอนุมัติ

**ผลที่ควรเห็น**

- PR break-it-live แสดง `CI` เป็นสีแดงที่ขั้น `npm test` และปิดแล้ว
- `evidence/ws-03.md` มีครบทุกหัวข้อ และตาราง "AI เสนอแต่ไม่รับ" อย่างน้อย 2 แถว

**หากติดปัญหา**

- CI ของ PR break-it-live ยังเป็นสีเขียว: R5 ไม่มี test ป้องกันจุดที่ลบ ให้กลับไปขั้นตอนที่ 6
- CI แดงที่ขั้น lint หรือ build แทนขั้น test: การลบทำให้มีตัวแปรที่ไม่ได้ใช้หรือ type ผิด ให้ลบเฉพาะเงื่อนไขของ `if` แทนการลบทั้งบล็อก

---

## Retro

ปรึกษากันในกลุ่ม แล้วบันทึกคำตอบสั้น ๆ ท้าย `evidence/ws-03.md`

1. กฎข้อใดที่ test ของกลุ่มยังป้องกันได้ไม่ครบ และรู้ได้อย่างไร
2. AI เสนอแก้ test หรือเสนอผลที่ขัดกับ spec ครั้งใดบ้าง และกลุ่มพบได้จากขั้นตอนใด
3. ขั้นตอนใดในวันนี้ยังทำด้วยมือ และควรเปลี่ยนเป็นการตรวจอัตโนมัติในบทใด
