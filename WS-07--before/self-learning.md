# Self-Learning: เตรียมก่อนเรียน Performance & Observability

## สิ่งที่ต้องศึกษา

- [video] k6 setup for Load Testing — step by step (https://www.youtube.com/watch?v=XR2MAivt-9E)
- [reading] k6 — Running k6 (https://grafana.com/docs/k6/latest/get-started/running-k6/)
- [reading] k6 — Test Types (https://grafana.com/docs/k6/latest/testing-guides/test-types/)
  smoke / load / stress / soak ต่างกันอย่างไร
- [reading] The Three Pillars of Observability
  (https://www.ibm.com/think/insights/observability-pillars)
- [reading] Google SRE Book — Service Level Objectives
  (https://sre.google/sre-book/service-level-objectives/)
  อ่านหัวข้อ *Indicators, Objectives, Agreements* ก็พอ

**จุดที่ต้องเข้าใจ:**
- Virtual Users (VUs) คืออะไร
- p95 latency ต่างจาก average อย่างไร และทำไม average หลอกได้
- Logs, Metrics, Traces ต่างกันอย่างไร
- SLI / SLO คืออะไร และต่างจาก "ทำให้เร็วที่สุด" อย่างไร

---

## Entry Ticket
> "คิดว่า feature ไหนใน project จะเป็น bottleneck และทำไม"
>
> เขียนเป็น hypothesis ที่พิสูจน์ได้ เช่น
> "คิดว่า `GET /api/rooms?date=` จะช้าที่สุด เพราะมัน join ตาราง bookings ทั้งตาราง
> คาดว่า p95 จะเกิน 500ms ที่ 10 VUs"
>
> ผิดได้ ไม่หักคะแนน — แต่ต้องกล้าเดาเป็นตัวเลข เพราะสัปดาห์นี้เราจะไปวัดของจริงมาเทียบ
