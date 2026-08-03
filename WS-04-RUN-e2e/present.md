# Present: E2E Testing

## เวลา: 1 ชั่วโมง (6 กลุ่ม × 10 นาที)
## รูปแบบ
- อาจารย์ random 1 คนจากกลุ่มมา present

---

## สิ่งที่ต้อง Present (10 นาที/กลุ่ม)

### Demo (5 นาที)
1. รัน `npx playwright test` ให้เห็น pass ใน terminal
2. เปิด Playwright HTML report
3. แสดง Page Object และอธิบาย pattern (พร้อมชี้ว่าทำไมไม่มี `expect` ข้างใน)
4. แสดง seed fixture และอธิบายว่าทำงานตอนไหน
5. เปิด `/api/test/seed` แล้วแสดงว่ามี guard กัน production

### อธิบาย (3 นาที)
- E2E test เหล่านี้ cover acceptance criteria ข้อไหนบ้าง (ชี้ไป GitHub Issue)
- เจอ flaky test ไหม แก้อย่างไร — หรือรัน `--repeat-each=3` ให้ดูสด

### คำถาม (2 นาที)
อาจารย์อาจถาม:
- "ถ้าไม่มี seed data test นี้จะพังอย่างไร"
- "ทำไม Page Object ดีกว่าเขียน selector ตรง ๆ ใน test"
- "Test นี้ทดสอบอะไรที่ unit test ทดสอบไม่ได้"
- "ถ้า E2E ตัวนี้แดงใน CI แต่เขียวบนเครื่องคุณ จะ debug อย่างไร"
- "ทำไมถึงเลือกเขียนแค่ N ตัวนี้ ไม่เขียนครอบทุก edge case"

---

## Rubric (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Tests ผ่าน** | fail | ผ่านบางส่วน | ผ่านทั้งหมด | ผ่าน + HTML report | ผ่าน + `--repeat-each=3` เขียวทุกรอบ |
| **Page Object** | ไม่มี | มีแต่ไม่ encapsulate | encapsulate locators | + methods ครบ ไม่มี expect ข้างใน | + อธิบาย benefit และขอบเขตของ pattern ได้ |
| **Seed & Isolation** | ไม่มี | มีแต่ไม่ cleanup | seed + cleanup | auto fixture | + isolated ทุก test + guard กัน production |
| **Test Quality** | แค่ happy path | happy path + 1 edge | happy + 2 edges | ครบ AC + ไม่มี waitForTimeout/วันที่ตายตัว | + trace กลับหา story ได้ทุกตัว + อธิบายว่าเลือกไม่เขียนอะไร เพราะอะไร |
| **Debugging** | ไม่รู้จัก report | เปิด report ได้ | อ่าน error ได้ | ใช้ trace/screenshot ได้ | แก้ flaky จริงพร้อมอธิบาย root cause |

**คะแนนเต็ม: 5 คะแนน** (เฉลี่ยจาก 5 เกณฑ์)
