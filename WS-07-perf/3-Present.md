# WS-07 · Present — Demo

**เวลา:** 5 นาทีต่อกลุ่ม

## ขั้นตอนการ Demo

| ลำดับที่ | ขั้นตอน | เกณฑ์ผ่าน |
|---|---|---|
| 1 | รัน `load/setup.sql` แล้ว `docker compose run --rm k6 run /load/r6.js` ในเครื่อง | log แสดง `confirmed 50` และ threshold ทุกข้อผ่าน |
| 2 | เปิด PR break-it-live จากขั้นตอนที่ 6 ของ lab (PR ที่ลบ `FOR UPDATE` และยังเปิดอยู่) | job `e2e` เป็นสีแดงที่ขั้น k6 ของ `r6.js` และปุ่ม merge กดไม่ได้ |
| 3 | ผู้ตรวจถามว่าเหตุใด transaction อย่างเดียวจึงไม่พอ | อธิบายได้ว่า 2 คำขออ่านจำนวนที่นั่งชุดเดียวกันได้ จนกว่าจะจองแถวด้วย `FOR UPDATE` |
| 4 | เปิดแท็บ Files changed ของ PR ที่แก้ R6 | ไม่มีไฟล์ใน `src/domain/` ถูกแก้ และมี integration test ที่ลงทะเบียนพร้อมกัน |
| 5 | รัน `docker compose run --rm k6 run /load/events.js` ในเครื่อง | threshold `p(95)<500` ผ่าน |
| 6 | เปิดหน้าสรุปของ workflow ล่าสุดบน `main` แล้วอ่านตารางของ band | บอกได้ว่าค่าอยู่ระดับใด และหากเป็น `2sigma` กลุ่มต้องทำอะไรตาม `AGENTS.md` |
| 7 | รัน `node ops/check-bands.mjs` ตามด้วยค่า p95 จาก CI 5 ค่าใน `evidence/ws-07.md` | `mean` และ `sd` ที่ได้ตรงกับใน `ops/bands.yaml` |
