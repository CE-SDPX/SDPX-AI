# Present: E2E Testing

## เวลา: 1 ชั่วโมง (6 กลุ่ม × 10 นาที)
## รูปแบบ
- อาจารย์ random 1 คนจากกลุ่มมา present

---

## สิ่งที่ต้อง Present (10 นาที/กลุ่ม)

### Demo (5 นาที)
1. รัน `npx playwright test` ให้เห็น pass ใน terminal
2. เปิด Playwright HTML report
3. แสดง Page Object และอธิบาย pattern
4. แสดง seed data fixture และอธิบายว่าทำงานอย่างไร

### อธิบาย (3 นาที)
- E2E test เหล่านี้ cover user story ไหนบ้าง
- เจอ flaky test ไหม แก้อย่างไร

### คำถาม (2 นาที)
อาจารย์อาจถาม:
- "ถ้าไม่มี seed data test นี้จะพังอย่างไร"
- "ทำไม Page Object ดีกว่าเขียน selector ตรงๆ ใน test"
- "Test นี้ทดสอบอะไรที่ unit test ทดสอบไม่ได้"

---

## Rubric (5 คะแนน)

| เกณฑ์ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| **Tests ผ่าน** | fail | ผ่านบางส่วน | ผ่านทั้งหมด | ผ่าน + HTML report | ผ่าน + report + screenshots on fail |
| **Page Object** | ไม่มี | มีแต่ไม่ encapsulate | encapsulate selectors | + methods ครบ | + อธิบาย benefit ได้ชัด |
| **Seed Data** | ไม่มี | มีแต่ไม่ cleanup | seed + cleanup | auto fixture | fixture + isolated state |
| **Test Quality** | แค่ happy path | happy path + 1 edge | happy + 2 edges | ครบ AC | ครบ AC + อธิบาย coverage ได้ |
| **Presentation** | ไม่ครบ | ครบแต่ไม่ชัด | ชัดเจน | ชัดเจน + ตอบได้ | ตอบทุกคำถาม + แสดง debugging skill |

**คะแนนเต็ม: 5 คะแนน**
