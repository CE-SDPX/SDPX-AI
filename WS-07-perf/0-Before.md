# WS-07 · Before — Performance Loop

ตั้งแต่ WS-03 กฎทุกข้อผ่าน unit test และตั้งแต่ WS-06 journey หลักผ่าน E2E test
แต่ทุก test ยังส่งคำขอทีละรายการ ยังไม่มี test ใดตรวจว่าระบบทำงานถูกเมื่อมีผู้ใช้หลายร้อยคนพร้อมกัน
สัปดาห์นี้แต่ละกลุ่มจะยิงคำขอลงทะเบียนพร้อมกัน 300 คนเพื่อตรวจกฎ R6
วัดเวลาตอบสนองของหน้ารายการกิจกรรม แก้จนผ่านเป้าหมาย
และเขียน `ops/bands.yaml` ที่บอกว่าค่าใดปกติ และเมื่อค่าเปลี่ยนไปต้องทำอะไร

เนื้อหาในหน้านี้จะไม่มีการอธิบายซ้ำในชั้นเรียน
ช่วงต้นคาบจะมีการสุ่มถามความหมายของคำในส่วน A

---

## A. Keywords

| Keyword | ความหมายโดยย่อ |
|---|---|
| Load test | การส่งคำขอจำนวนมากเข้าระบบตามรูปแบบที่กำหนด เพื่อดูว่าระบบยังถูกต้องและเร็วพอหรือไม่ |
| p95 (percentile ที่ 95) | เวลาที่คำขอ 95% เร็วกว่าหรือเท่ากับค่านี้ บอกประสบการณ์ของผู้ใช้ที่โชคไม่ดีได้ดีกว่าค่าเฉลี่ย |
| Race condition | ผลลัพธ์ผิดเพราะคำขอหลายรายการทำงานซ้อนกัน เช่น 2 คำขอเห็นว่ายังเหลือ 1 ที่นั่งพร้อมกัน แล้วบันทึกทั้งคู่ |
| Transaction | กลุ่มคำสั่งของฐานข้อมูลที่สำเร็จทั้งหมดหรือไม่สำเร็จเลย |
| Row lock (`SELECT ... FOR UPDATE`) | การจองแถวในฐานข้อมูลไว้จนจบ transaction คำขออื่นที่ต้องการแถวเดียวกันต้องรอ |
| N+1 query | การ query 1 ครั้งเพื่อได้รายการ แล้ว query อีก 1 ครั้งต่อทุกรายการ ทำให้จำนวน query โตตามจำนวนข้อมูล |
| Baseline และ band | ค่าปกติของตัววัดซึ่งคำนวณจากผลที่ผ่านมา และช่วงห่างจากค่าปกติที่ใช้ตัดสินว่าต้องทำอะไร |

---

## B. ติดตั้งและตรวจเครื่องมือ

| สิ่งที่ต้องมี | วิธีตรวจ | ผลที่ต้องได้ |
|---|---|---|
| k6 ผ่าน Docker | `docker pull grafana/k6:2.3.0` แล้ว `docker run --rm grafana/k6:2.3.0 version` | แสดง `k6 v2.3.0` |
| ระบบจาก WS-06 | `docker compose up -d --build --wait` แล้ว `npm run e2e` | E2E test ผ่าน |

ไม่ต้องติดตั้ง k6 ลงเครื่อง เพราะจะรัน k6 เป็น service หนึ่งใน `compose.yaml`

---

## C. เตรียมใน repository

- [ ] CI ของกลุ่มบน `main` เป็นสีเขียวทั้ง `build` และ `e2e` และ PR ทั้งหมดของ WS-06 ถูก merge แล้ว
- [ ] สมาชิกแต่ละคนอ่าน code ของการลงทะเบียน ตั้งแต่ route handler จนถึงการบันทึกลงฐานข้อมูล แล้วจด
  - บรรทัดที่อ่านจำนวนผู้ได้ที่นั่ง และบรรทัดที่บันทึกการลงทะเบียน
  - คาดการณ์ว่าหากผู้ใช้ 300 คนลงทะเบียนกิจกรรมที่มี 50 ที่นั่งพร้อมกัน จะมีผู้ได้ `CONFIRMED` กี่คน และเพราะอะไร
- [ ] สมาชิกอีกคนนับว่าการเปิดหน้ารายการกิจกรรม 1 ครั้งส่ง query ไปที่ PostgreSQL กี่ครั้ง เมื่อมีกิจกรรม 200 รายการ
  ใช้ AI ช่วยอ่าน code ได้ แต่สั่งให้อ่านอย่างเดียว ห้ามแก้ไฟล์

สิ่งที่จดไม่ต้อง commit นำมาเทียบกับผลจริงในขั้นตอนที่ 1 และ 3 ของ lab

---

อ่านเพิ่มเติม (ไม่บังคับ)

- k6 — Scenarios: https://grafana.com/docs/k6/latest/using-k6/scenarios/
- k6 — Thresholds: https://grafana.com/docs/k6/latest/using-k6/thresholds/
- PostgreSQL — Explicit Locking: https://www.postgresql.org/docs/17/explicit-locking.html
- Vercel — What is Vercel's policy regarding load testing deployments?: https://vercel.com/kb/guide/what-s-vercel-s-policy-regarding-load-testing-deployments
- The AI-native SDLC playbook (Anthropic) อ่านเฉพาะหัวข้อ Maintain ส่วน `bands.yaml`: https://claude.com/resources/articles/the-ai-native-sdlc-playbook
