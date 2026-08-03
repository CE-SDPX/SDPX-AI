# Lecture: E2E Testing & the E2E Test Harness

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (4 นาที)

เปิด user stories ที่กลุ่มเลือกมา discuss:
- Stories ไหนที่เหมาะกับ E2E test และทำไม
- Stories ไหนที่ควรเป็น unit test แทน (มักเป็นพวก "คำนวณราคา", "ตรวจ format")
- ขั้นตอนที่นักศึกษาเขียนมา ตรงกับ Acceptance Criteria ที่เขียนไว้ตอน WS-02 ไหม

---

## 2. Acceptance Loop: จาก AC สู่ test ที่รันได้ (4 นาที)

```
Acceptance Criteria (WS-02)
        ↓
   E2E Test (วันนี้)
        ↓
   Story = Done เมื่อเขียว
```

E2E คือ loop ที่ **ครอบคลุมกว้างที่สุดแต่ช้าที่สุด** ในวิชานี้

| | Unit Test Loop | Acceptance (E2E) Loop |
|---|---|---|
| Latency | วินาที | นาที |
| Coverage | logic ทีละก้อน | ทั้งเส้นทางของ user |
| จับอะไรได้ที่อีกอันจับไม่ได้ | — | wiring ผิด, route หาย, build พัง, integration ระหว่างชั้น |
| จำนวนที่ควรมี | มาก | น้อยแต่สำคัญ |

**กติกา:** ถ้าเรื่องหนึ่ง unit test ตรวจได้ ให้ตรวจด้วย unit test
เก็บ E2E ไว้สำหรับสิ่งที่ต้องมี browser จริงเท่านั้น
E2E ที่เยอะเกินจะทำให้ latency ของ loop รวมพุ่ง จนสุดท้ายไม่มีใครรัน

**ใช้ E2E เมื่อ:**
- ต้องการยืนยัน user journey ทั้งหมด end-to-end
- มี acceptance criteria ที่ involve หลาย components
- ต้องการ catch integration bugs ที่ unit test ไม่จับ

**ไม่ใช้ E2E เมื่อ:**
- ทดสอบ business logic ที่ unit test จับได้
- ต้องการ test ที่รันเร็ว
- ต้องการครอบคลุมทุก edge case

---

## 3. กับดักใหญ่: Flaky Tests (7 นาที)

Flaky test คือ test ที่บางครั้ง pass บางครั้ง fail โดยไม่มีการเปลี่ยน code

> Flaky test อันตรายกว่า test ที่ fail เสมอ เพราะมันทำลาย **fidelity** —
> พอทีมเริ่มพูดว่า "อ๋อ อันนั้นมันแดงประจำ กด re-run เถอะ"
> loop ทั้งวงก็หมดความหมาย และ AI agent ที่อ่านผลก็จะได้ข้อมูลขยะ

### สาเหตุที่ 1 — รอตามเวลาแทนรอตาม state
```typescript
// แย่: hardcoded wait — ช้าเกินไปก็เสียเวลา เร็วเกินไปก็แดง
await page.waitForTimeout(3000);

// ดี: web-first assertion รอให้เองจนกว่าเงื่อนไขเป็นจริง (หรือ timeout)
await expect(page.getByTestId('booking-confirmed')).toBeVisible();
```

### สาเหตุที่ 2 — State ค้างจาก test ก่อนหน้า
```typescript
// แย่: tests share state
// Test A สร้าง booking แล้ว Test B อาจเจอ booking นั้น

// ดี: แต่ละ test เริ่มจาก clean state
test.beforeEach(async () => {
  await seedDatabase();
});
```

### สาเหตุที่ 3 — Locator ที่เปลี่ยนตาม style
```typescript
// แย่: class เปลี่ยนเมื่อ redesign
await page.click('.btn.btn-primary.submit-form');

// ดีกว่า: role สะท้อนสิ่งที่ user เห็นและใช้จริง
await page.getByRole('button', { name: 'Book Now' }).click();

// ดีเมื่อไม่มี role/label ที่เสถียร
await page.getByTestId('submit-booking').click();
```

### สาเหตุที่ 4 — ข้อมูลที่ขึ้นกับเวลาจริง
```typescript
// แย่: test จะพังทุกวันจันทร์ หรือพังตอนสิ้นเดือน
await page.fill('#date', '2024-12-01');   // วันในอดีต → ระบบปฏิเสธ

// ดี: คำนวณจากวันนี้เสมอ
const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
await page.getByLabel('Date').fill(tomorrow);
```

### เครื่องมือ debug: Trace Viewer
เปิดใน config แล้ว Playwright จะเก็บ trace ตอน retry:
```typescript
use: { trace: 'on-first-retry' }
```
```bash
npx playwright show-trace trace.zip
```
ได้ timeline, DOM snapshot ทุก step, network, console — ใช้ debug test ที่แดงเฉพาะใน CI ได้จริง

> **นโยบายที่แนะนำ:** ถ้า test แดงแบบสุ่ม ห้ามใส่ `retry` แล้วปล่อยผ่าน
> ให้หา root cause หรือ `test.skip` พร้อมเปิด issue — การซ่อนอาการคือการทำลาย loop

---

## 4. E2E Test Harness (8 นาที)

> **E2E Test Harness** = โครงสร้างที่ทำให้ E2E test รันซ้ำได้ผลเดิม
> ประกอบด้วย **Page Objects + Fixtures + Seed Data + Config**
> (คำว่า harness ในวิชานี้ใช้กับเรื่อง testing เท่านั้น — WS-03 และ WS-04)

### 4.1 Page Object Model — ชั้น locator

**ปัญหาที่ POM แก้**
```typescript
// แย่: selector กระจายทุก test ถ้า UI เปลี่ยนต้องแก้ทุกที่
test('booking flow', async ({ page }) => {
  await page.click('[data-testid="room-card-1"]');
  await page.fill('[data-testid="date-input"]', '2024-12-01');
  await page.click('[data-testid="submit-booking"]');
});

test('double booking rejected', async ({ page }) => {
  await page.click('[data-testid="room-card-1"]');          // ซ้ำ
  await page.fill('[data-testid="date-input"]', '2024-12-01'); // ซ้ำ
});
```

**POM Solution**
```typescript
// tests/e2e/pages/BookingPage.ts
import { Page, Locator } from '@playwright/test';

export class BookingPage {
  readonly submitButton: Locator;
  readonly confirmation: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.submitButton = page.getByRole('button', { name: 'Book Now' });
    this.confirmation = page.getByTestId('confirm-msg');
    this.errorMessage = page.getByTestId('error-msg');
  }

  async goto() {
    await this.page.goto('/booking');
  }

  async selectRoom(roomId: number) {
    await this.page.getByTestId(`room-card-${roomId}`).click();
  }

  async fillDate(date: string) {
    await this.page.getByLabel('Date').fill(date);
  }

  async submit() {
    await this.submitButton.click();
  }
}
```

```typescript
// tests/e2e/specs/booking.spec.ts
test('booking flow', async ({ page }) => {
  const bookingPage = new BookingPage(page);
  await bookingPage.goto();
  await bookingPage.selectRoom(1);
  await bookingPage.fillDate(tomorrow());
  await bookingPage.submit();
  await expect(bookingPage.confirmation).toBeVisible();
});
```

**กฎของ Page Object:**
- เก็บ **locator และ action** ไว้ข้างใน
- **ห้ามใส่ `expect` ไว้ใน Page Object** — assertion อยู่ใน test เท่านั้น
  เพราะ Page Object บอกว่า "ทำอะไรได้" ส่วน test บอกว่า "คาดหวังอะไร"

### 4.2 Fixtures + Seed Data — ชั้น state

E2E Harness ต้องการ seed data ที่ consistent เพื่อให้ทุก test run เริ่มจาก known state

```typescript
// tests/e2e/fixtures/index.ts
import { test as base, expect } from '@playwright/test';

export const test = base.extend<{ seededDb: void }>({
  seededDb: [async ({ request }, use) => {
    await request.post('/api/test/seed');
    await use();
    await request.post('/api/test/cleanup');
  }, { auto: true }],   // auto: true = รันทุก test โดยไม่ต้องประกาศ
});

export { expect };
```

```typescript
// ใช้ใน tests — import จาก fixtures ไม่ใช่จาก @playwright/test
import { test, expect } from '../fixtures';

test('booking flow', async ({ page }) => {
  // มั่นใจว่า database มี test data พร้อมแล้ว และจะถูกล้างหลังจบ
});
```

### 4.3 สรุปองค์ประกอบของ E2E Harness

| ชั้น | ไฟล์ | หน้าที่ |
|---|---|---|
| Config | `playwright.config.ts` | baseURL, retries, trace, reporter |
| State | `fixtures/`, `seed/` | ทำให้ทุก test เริ่มจากจุดเดียวกัน |
| Locator | `pages/` | ซ่อนรายละเอียด UI จาก test |
| Scenario | `specs/` | อ่านแล้วเห็น user journey เป็นภาษาคน |

ถ้า 4 ชั้นนี้ครบ E2E จะรันได้เหมือนกันทั้งบนเครื่องตัวเองและใน CI (WS-06)

---

## 5. ให้ AI ช่วยเขียน E2E อย่างไรให้ไม่พัง (4 นาที)

E2E เป็นจุดที่ AI พลาดบ่อยที่สุด เพราะมันไม่เห็นหน้าจอจริง

| AI มักทำ | ปัญหา | แก้โดย |
|---|---|---|
| เดา selector จากชื่อ | locator ไม่มีอยู่จริง → แดงทันที | ให้มันอ่านไฟล์ component ก่อน |
| ใส่ `waitForTimeout` | flaky | ห้ามไว้ใน `AGENTS.md` |
| ใส่วันที่ตายตัว | พังในอนาคต | บอกให้คำนวณจากวันนี้ |
| เขียน E2E ครอบทุก edge case | suite ช้ามาก | บอกจำนวนที่ต้องการชัด ๆ |

**Prompt ที่ใช้ได้:**
```
Read tests/e2e/pages/BookingPage.ts and the component files under src/components
before writing anything.

Write 3 E2E tests for this acceptance criteria:
[วาง Given/When/Then จาก GitHub Issue]

Rules:
- Use the existing Page Object; add methods to it if needed, but no expect() inside it.
- Use getByRole or getByLabel when possible, getByTestId otherwise.
- Never use waitForTimeout — use web-first assertions.
- Compute dates relative to today, never hardcode.
Then run `npx playwright test` and fix until green.
```

---

## Key Takeaways
- E2E คือ loop ที่กว้างที่สุดแต่ช้าที่สุด — ใช้เท่าที่จำเป็น ให้ unit test รับงานส่วนใหญ่
- Flaky test ทำลาย fidelity ของ loop ทั้งวง อย่าปล่อยผ่านด้วย retry
- E2E Test Harness = Config + Seed/Fixtures + Page Objects + Specs
- Page Object เก็บ locator และ action ไว้ — assertion อยู่ใน test เท่านั้น
- AI เขียน E2E ได้ก็ต่อเมื่อได้อ่าน component จริงก่อน และถูกห้ามใช้ทางลัดที่ทำให้ flaky

---

## AI-DLC Connection: Construction Phase — Acceptance Test Stage

ใน AI-DLC Construction Phase E2E tests คือ **Acceptance Test** ที่ verify story:

```
Story มี Acceptance Criteria (Given/When/Then)
    ↓
E2E Test implement acceptance criteria นั้น
    ↓
ถ้า E2E pass = story "Done" ตาม AI-DLC definition
```

**E2E Test Harness = AI-DLC Acceptance Test Infrastructure:**
- Page Object Model — consistent interface สำหรับ test ทุก bolt
- Seed Data Fixtures — ensure known state ก่อนทุก test run
- Test Isolation — ทุก bolt run เริ่มจาก clean state

Human checkpoint: AI generate E2E scenarios จาก acceptance criteria →
human verify ว่าครอบคลุม realistic และไม่ได้แค่ทำให้เขียว

> ตอนนี้เรามี loop ครบ 2 ชั้นแล้ว (unit + acceptance)
> WS-05 จะทำให้ทั้งสองรันได้เหมือนกันทุกเครื่อง และ WS-06 จะรันให้อัตโนมัติทุก push
