# Lab: E2E Testing & E2E Harness

## เวลา: 1.5 ชั่วโมง
## เป้าหมาย
สร้าง E2E test harness ที่ครอบคลุม user journey หลัก และพร้อมรันใน CI

---

## ขั้นตอนที่ 1 — Page Object Model Structure (15 นาที)

```
tests/
├── e2e/
│   ├── fixtures/
│   │   └── index.ts          ← custom fixtures + seed data
│   ├── pages/
│   │   ├── HomePage.ts       ← Page Objects
│   │   └── [Domain]Page.ts
│   └── specs/
│       ├── smoke.spec.ts     ← basic health checks
│       └── [domain].spec.ts  ← feature tests
├── playwright.config.ts
└── seed/
    └── test-data.ts          ← seed data definitions
```

### สร้าง Playwright Config
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,  // false ระหว่าง dev เพื่อหลีกเลี่ยง state conflicts
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],
});
```

---

## ขั้นตอนที่ 2 — สร้าง Page Objects (20 นาที)

สร้าง Page Object สำหรับ domain ของกลุ่ม:

```typescript
// tests/e2e/pages/[Domain]Page.ts
import { Page, Locator } from '@playwright/test';

export class [Domain]Page {
  readonly page: Page;

  // Define locators เป็น properties
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.getByTestId('submit-btn');
    this.successMessage = page.getByTestId('success-msg');
    this.errorMessage = page.getByTestId('error-msg');
  }

  async goto() {
    await this.page.goto('/[route]');
  }

  async fillForm(data: { [key: string]: string }) {
    for (const [field, value] of Object.entries(data)) {
      await this.page.getByTestId(`input-${field}`).fill(value);
    }
  }

  async submit() {
    await this.submitButton.click();
  }
}
```

---

## ขั้นตอนที่ 3 — Seed Data และ Fixtures (20 นาที)

```typescript
// tests/e2e/fixtures/index.ts
import { test as base, expect } from '@playwright/test';

type TestFixtures = {
  cleanDb: void;
};

export const test = base.extend<TestFixtures>({
  cleanDb: [async ({}, use) => {
    // Setup: seed ข้อมูลก่อน test
    await fetch('http://localhost:3000/api/test/seed', { method: 'POST' });

    await use();

    // Teardown: cleanup หลัง test
    await fetch('http://localhost:3000/api/test/cleanup', { method: 'POST' });
  }, { auto: true }],  // auto: true = รันอัตโนมัติทุก test
});

export { expect };
```

```typescript
// tests/seed/test-data.ts
export const testData = {
  rooms: [
    { id: 1, name: 'A101', capacity: 10, isAvailable: true },
    { id: 2, name: 'A102', capacity: 20, isAvailable: false },
  ],
  users: [
    { id: 1, email: 'student@test.com', role: 'student' },
  ],
};
```

---

## ขั้นตอนที่ 4 — เขียน E2E Tests (35 นาที)

### Smoke Tests (Health Check)
```typescript
// tests/e2e/specs/smoke.spec.ts
import { test, expect } from '../fixtures';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Campus/);
  await expect(page.getByTestId('main-nav')).toBeVisible();
});

test('main feature page accessible', async ({ page }) => {
  await page.goto('/[main-route]');
  await expect(page.getByTestId('page-heading')).toBeVisible();
});
```

### Feature Tests (Happy Path + Edge Cases)
```typescript
// tests/e2e/specs/[domain].spec.ts
import { test, expect } from '../fixtures';
import { [Domain]Page } from '../pages/[Domain]Page';

test.describe('[Domain] feature', () => {
  test('happy path: [main action] succeeds', async ({ page }) => {
    const domainPage = new [Domain]Page(page);
    await domainPage.goto();

    await domainPage.fillForm({ /* ข้อมูลที่ถูกต้อง */ });
    await domainPage.submit();

    await expect(domainPage.successMessage).toBeVisible();
  });

  test('edge case: [error scenario]', async ({ page }) => {
    const domainPage = new [Domain]Page(page);
    await domainPage.goto();

    await domainPage.fillForm({ /* ข้อมูลที่ทำให้เกิด error */ });
    await domainPage.submit();

    await expect(domainPage.errorMessage).toContainText('expected error text');
  });
});
```

---

## Artifacts ที่ต้องส่ง

| Artifact | รายละเอียด | ที่ส่ง |
|---|---|---|
| `tests/e2e/pages/` | Page Objects ≥ 1 ไฟล์ | GitHub repo |
| `tests/e2e/fixtures/` | Custom fixture พร้อม seed/cleanup | GitHub repo |
| `tests/e2e/specs/` | Smoke test + ≥ 2 feature tests | GitHub repo |
| `playwright-report/` | HTML report จากการรัน | GitHub repo |

### เกณฑ์ผ่าน
- [ ] E2E tests รันผ่านทั้งหมด
- [ ] มี Page Object อย่างน้อย 1 ตัว
- [ ] Seed data และ cleanup ทำงานได้
- [ ] ทุก test ใช้ data-testid ไม่ใช่ CSS class
