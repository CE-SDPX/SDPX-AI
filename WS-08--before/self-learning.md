# Self-Learning: เตรียมก่อนเรียน Code Quality & Security

## สิ่งที่ต้องศึกษา

### Code Smells & Refactoring
- [video] More Python Code Smells: Avoid These 7 Smelly Snags — ArjanCodes
  (https://www.youtube.com/watch?v=zmWf_cHyo8s)
- [video] Uncle Bob's SOLID Principles Made Easy — ArjanCodes
  (https://www.youtube.com/watch?v=pTB30aXS77U)
- [reading] Code Smells — Refactoring Guru (https://refactoring.guru/refactoring/smells)
- [reading] Refactoring Techniques (https://refactoring.guru/refactoring/techniques)
- [reading] Technical Debt — Martin Fowler (https://martinfowler.com/bliki/TechnicalDebt.html)

### Security
- [reading] OWASP Top 10 (https://owasp.org/www-project-top-ten/)
- [reading] OWASP Top 10 for LLM Applications
  (https://owasp.org/www-project-top-10-for-large-language-model-applications/)
  อ่านเฉพาะ *Prompt Injection*, *Sensitive Information Disclosure*, *Excessive Agency*
- [reading] GitHub — Secret Scanning
  (https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning)

### Architecture Decision Records
- [reading] ADR — Architectural Decision Records (https://adr.github.io/)
  ดูตัวอย่าง template แล้วเลือกแบบที่ชอบ

**จุดที่ต้องเข้าใจ:**
- Code smells ที่พบบ่อย: Long Method, God Class, Duplicate Code, Magic Numbers
- Refactoring ต่างจาก rewriting อย่างไร — และทำไมต้องมี test ก่อน
- OWASP Top 10 ข้อไหนเกี่ยวกับ project ของกลุ่มมากที่สุด
- ถ้าให้ AI agent รันคำสั่งได้เอง ความเสี่ยงใหม่ที่เพิ่มขึ้นคืออะไร (Excessive Agency)
- ADR บันทึกอะไร และทำไมต้องบันทึก "ทางเลือกที่ไม่ได้เลือก" ด้วย

---

## เช็คตัวเองก่อนเข้าห้อง

- [ ] บอกชื่อ code smell ได้อย่างน้อย 4 แบบ
- [ ] อธิบายได้ว่า refactoring ต่างจาก rewriting อย่างไร
- [ ] บอกได้ว่า OWASP Top 10 ข้อไหนเกี่ยวกับ project ของกลุ่มมากที่สุด
- [ ] อธิบายได้ว่า Excessive Agency ของ AI agent คือความเสี่ยงแบบไหน

### วอร์มอัพ: หา Function ที่แย่ที่สุดในกลุ่ม
เลือก 1 function จาก codebase ที่คิดว่าแย่ที่สุด แล้วตอบตัวเอง 2 ข้อ:

1. มันแย่เพราะอะไร — ระบุชื่อ code smell ให้ได้
2. **ถ้าจะ refactor มันตอนนี้ มี test อะไรคุ้มครองอยู่บ้าง**

ถ้าคำตอบข้อ 2 คือ "ไม่มีเลย" — นั่นคือคำตอบที่ถูก และเป็นจุดเริ่มของ lab สัปดาห์นี้
(function นั้นจะถูกใช้เป็นเป้าหมายจริงใน lab จึงควรเลือกอันที่กลุ่มอยากแก้จริง ๆ)
