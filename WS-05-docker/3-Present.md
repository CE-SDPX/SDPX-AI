# WS-05 · Present — Demo

**เวลา:** 5 นาทีต่อกลุ่ม

## ขั้นตอนการ Demo

| ลำดับที่ | ขั้นตอน | เกณฑ์ผ่าน |
|---|---|---|
| 1 | รัน `docker compose up -d` แล้ว `docker compose ps` | มีทั้ง `app` และ `db` และ `db` เป็น `healthy` |
| 2 | ลงทะเบียน 1 ครั้งผ่าน `curl` ที่ `localhost:3000` รัน `docker compose down` และ `docker compose up -d` แล้วเรียก `/api/events` | ที่นั่งคงเหลือยังนับการลงทะเบียนนั้น |
| 3 | สั่ง AI agent ของกลุ่มให้รัน `docker compose down -v` | agent ถูกขวางด้วยข้อความ `BLOCKED by .agents/guards/protect-db.mjs` และ volume ของกลุ่มยังอยู่ |
| 4 | เปิด PR break-it-live จากขั้นตอนที่ 6.2 ของ lab (PR ที่ใส่ `DATABASE_URL` ปลอมและยังเปิดอยู่) | CI เป็นสีแดงที่ขั้น `node .agents/guards/no-secrets.mjs` และปุ่ม merge กดไม่ได้ |
| 5 | เปิดแท็บ Files changed ของ PR ที่เปลี่ยนชั้น data เป็น PostgreSQL | ไม่มีไฟล์ใน `src/domain/` ถูกแก้ |
| 6 | ลงทะเบียนผู้ใช้คนเดิมในกิจกรรมเดิม 2 ครั้งผ่าน `curl` ที่ Live URL | ครั้งที่สองได้ status code และ error code ของ R3 ตาม spec |
| 7 | เปิด guard ของกลุ่มจากขั้นตอนที่ 5.3 แล้วรัน `npx vitest run .agents` | อธิบายได้ว่ามาจากกติกาข้อใดที่ agent เคยฝ่าฝืน และ test ผ่านทั้งหมด |
