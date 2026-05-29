# Self-Learning: เตรียมก่อนเรียน Requirements & API Design

## วิธีใช้เอกสารนี้
อ่านและดูสื่อทั้งหมดก่อนเข้าห้อง อาจารย์จะ**ไม่สอนซ้ำ**เนื้อหาเหล่านี้ในห้อง แต่จะตอบเฉพาะจุดที่สงสัยจาก entry ticket

---

## สิ่งที่ต้องศึกษา

### 1. REST API Design
เข้าใจหลักการออกแบบ API ก่อนเข้า lab เพราะจะต้องเขียน OpenAPI spec ของ project ตัวเอง

- [video] REST API Design — Full Course, ดู 20 นาทีแรก — freeCodeCamp
  (https://www.youtube.com/watch?v=lsMQRaeKNDk)
- [reading] RESTful API Design Guidelines
  (https://restfulapi.net/)
- [reading] OpenAPI Specification Introduction
  (https://swagger.io/docs/specification/about/)

**จุดที่ต้องเข้าใจ:**
- HTTP methods: GET, POST, PUT, PATCH, DELETE ใช้เมื่อไหร่
- HTTP status codes: 200, 201, 400, 401, 404, 500 หมายความว่าอะไร
- Resource naming: `/users` vs `/getUsers` อันไหนถูกต้องและทำไม
- Request body vs Query parameters ต่างกันอย่างไร

### 2. Software Architecture Basics
- [video] ค้นหา "software architecture explained 5 minutes" บน YouTube
- [reading] ทบทวน MVC pattern จาก docs ของ framework ที่ใช้

**จุดที่ต้องเข้าใจ:**
- Component คืออะไร และแบ่งได้อย่างไร
- Frontend / Backend / Database แต่ละส่วนรับผิดชอบอะไร
- Monolith กับ Microservices ต่างกันอย่างไร

---

## Entry Ticket
ส่งก่อนเข้าห้องอย่างน้อย 1 ชั่วโมง:

> "วาด component diagram คร่าวๆ ของ project มาก่อน — คิดว่าจะมี component อะไรบ้าง"

ไม่ต้องสมบูรณ์ — อาจารย์จะใช้ diagram เหล่านี้เพื่อ discuss ร่วมกันในห้อง

---

## ไม่จำเป็นต้องศึกษาเพิ่มเติม
สิ่งต่อไปนี้จะสอนใน lab:
- วิธีเขียน OpenAPI spec จริงๆ
- วิธีใช้ AI ช่วย draft spec
- วิธีวาด ER diagram
