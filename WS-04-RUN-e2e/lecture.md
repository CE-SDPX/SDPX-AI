# Lecture: E2E Testing & E2E Harness

## เวลา: 30 นาที

---

## 1. Entry Ticket Review (5 นาที)

เปิด user stories ที่กลุ่มเลือกมา discuss:
- Stories ไหนที่เหมาะกับ E2E test และทำไม
- Stories ไหนที่ควรเป็น unit test แทน

---

## 2. E2E Testing กับ Unit Testing ต่างกันอย่างไร (3 นาที)

```
Unit Test:          ทดสอบ function เดียว ใน isolation
Integration Test:   ทดสอบหลาย components ทำงานร่วมกัน
E2E Test:           ทดสอบ user journey ทั้งหมดผ่าน browser จริง
```

**ใช้ E2E เมื่อ:**
- ต้องการยืนยัน user journey ทั้งหมด end-to-end
- มี acceptance criteria ที่ involve หลาย components
- ต้องการ catch integration bugs ที่ unit test ไม่จับ

**ไม่ใช้ E2E เมื่อ:**
- ทดสอบ business logic ที่ unit test จับได้
- ต้องการ test ที่รันเร็ว
- Test ทุก edge case (E2E ช้าและแพง)

---

## 3. กับดัก: Flaky Tests (5 นาที)

Flaky test คือ test ที่บางครั้ง pass บางครั้ง fail โดยไม่มีการเปลี่ยน code

### สาเหตุหลัก

**รอตาม time แทน state:**
```typescript
// แย่: hardcoded wait
await page.waitForTimeout(3000);

// ดี: รอจนกว่า element จะพร้อม
await page.waitForSelector('[data-testid="booking-confirmed"]');
await expect(page.locator('.success')).toBeVisible();
```

**State ค้างจาก test ก่อนหน้า:**
```typescript
// แย่: tests share state
// Test A สร้าง booking แล้ว Test B อาจเจอ booking นั้น

// ดี: แต่ละ test เริ่มจาก clean state
test.beforeEach(async ({ page }) => {
  await seedDatabase();  // reset ก่อนทุก test
});
```

**พึ่ง CSS class ที่เปลี่ยนได้:**
```typescript
// แย่: class เปลี่ยนเมื่อ redesign
await page.click('.btn.btn-primary.submit-form');

// ดี: testid ไม่เปลี่ยนตาม style
await page.click('[data-testid="submit-booking"]');
```

---

## 4. Page Object Model: E2E Harness Pattern (7 นาที)

Page Object Model (POM) คือ design pattern ที่ encapsulate interactions กับแต่ละ page
เป็นส่วนสำคัญของ E2E Harness เพราะทำให้ tests maintainable

### ปัญหาที่ POM แก้
```typescript
// แย่: selector กระจายทุก test ถ้า UI เปลี่ยนต้องแก้ทุกที่
test('booking flow', async ({ page }) => {
  await page.click('[data-testid="room-card-1"]');
  await page.fill('[data-testid="date-input"]', '2024-12-01');
  await page.click('[data-testid="submit-booking"]');
  await expect(page.locator('[data-testid="confirm-msg"]')).toBeVisible();
});

test('double booking rejected', async ({ page }) => {
  await page.click('[data-testid="room-card-1"]');  // ซ้ำ
  await page.fill('[data-testid="date-input"]', '2024-12-01');  // ซ้ำ
  // ...
});
```

### POM Solution
```typescript
// pages/BookingPage.ts
export class BookingPage {
  constructor(private page: Page) {}

  async selectRoom(roomId: number) {
    await this.page.click(`[data-testid="room-card-${roomId}"]`);
  }

  async fillDate(date: string) {
    await this.page.fill('[data-testid="date-input"]', date);
  }

  async submit() {
    await this.page.click('[data-testid="submit-booking"]');
  }

  async getConfirmationMessage() {
    return this.page.locator('[data-testid="confirm-msg"]');
  }
}

// tests/e2e/booking.spec.ts
test('booking flow', async ({ page }) => {
  const bookingPage = new BookingPage(page);
  await bookingPage.selectRoom(1);
  await bookingPage.fillDate('2024-12-01');
  await bookingPage.submit();
  await expect(await bookingPage.getConfirmationMessage()).toBeVisible();
});
```

---

## 5. Seed Data & Test Isolation (5 นาที)

E2E Harness ต้องการ seed data ที่ consistent เพื่อให้ทุก test run เริ่มจาก known state

### Playwright Fixtures สำหรับ Seed Data
```typescript
// fixtures/index.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  // Fixture ที่รัน seed data ก่อนทุก test
  seededDb: async ({}, use) => {
    await resetDatabase();
    await seedTestData();
    await use(undefined);
    await cleanupDatabase();
  },
});

// ใช้ใน tests
test('booking flow', async ({ page, seededDb }) => {
  // มั่นใจว่า database มี test data พร้อมแล้ว
});
```

---

## Key Takeaways
- E2E tests ที่ดีใช้ data-testid และ wait for state ไม่ใช่ time
- Page Object Model ทำให้ test maintainable เมื่อ UI เปลี่ยน
- Seed data และ clean state เป็นหัวใจของ E2E Harness
- E2E harness ที่ดีทำให้ tests รันได้ทั้ง local และ CI


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

**E2E Harness = AI-DLC Acceptance Test Infrastructure:**
- Page Object Model — consistent interface สำหรับ test ทุก bolt
- Seed Data Fixtures — ensure known state ก่อนทุก test run
- Test Isolation — ทุก bolt run เริ่มจาก clean state

Human checkpoint: AI generate E2E scenarios จาก acceptance criteria → human verify ว่าครอบคลุม และ realistic
