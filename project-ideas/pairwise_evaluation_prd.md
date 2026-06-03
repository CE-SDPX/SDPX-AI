# Product Requirements Document
## Pairwise Evaluation System (PairEval)

**Version:** 1.1  
**Date:** June 2026  
**Status:** Draft — Open Questions Resolved

---

## 1. Overview

### 1.1 Product Vision

PairEval เป็นระบบประเมินผลนักศึกษาแบบ Pairwise Comparison ที่ช่วยให้การให้คะแนนมีความเป็นธรรมและลดอคติ โดยแทนที่การให้คะแนนตัวเลขโดยตรง ด้วยการเปรียบเทียบคู่ (A vs B) แล้วคำนวณคะแนนจากผลรวม ระบบรองรับทั้งการประเมินระดับกลุ่มและระดับบุคคล

### 1.2 Target Users

| User Role | Description |
|---|---|
| Instructor | อาจารย์ผู้สอน (มีได้มากกว่า 1 คนต่อ Classroom) |
| Student | นักศึกษาในชั้นเรียน |

### 1.3 Key Principles

- การประเมินเป็นแบบ **Pairwise Comparison** เท่านั้น (ไม่มีการให้คะแนนตรง)
- ทุก combination ต้องได้รับการสุ่มประเมินอย่างน้อย **5 ครั้ง**
- นักศึกษา/กลุ่มห้ามประเมินตนเอง
- ระบบ Save ก่อน Submit ได้
- **Individual Score** อัปเดตแบบ rolling ทุกวัน เจ้าตัวเห็น progress ได้ตลอดจนถึง deadline
- **Instructor evaluation weight** กำหนดได้ต่อ Assignment (ค่า default = 1.0 แต่ปรับได้)
- รองรับ Export คะแนนเป็น CSV และ Excel
- **Peer anonymity:** นักศึกษาไม่เห็นว่าใครประเมินตนเอง (anonymous evaluations)
- **Late submission:** ได้ partial credit ตาม % ของ pairs ที่ submit
- **Re-submission:** นักศึกษา submit ใหม่ได้ทุกวันก่อน deadline โดยใช้คะแนน submission ล่าสุด
- **Group re-assignment:** เปลี่ยนกลุ่มหลัง Assignment สร้าง → ต้อง re-generate pairs
- **Instructor weight:** ใช้ค่าเดียวสำหรับทั้ง Group และ Individual criteria

---

## 2. User Stories

### 2.1 Instructor

| ID | Story |
|---|---|
| I-01 | ในฐานะอาจารย์ ฉันต้องการสร้าง Classroom และเพิ่มนักศึกษาผ่าน CSV (columns: email, groupname) |
| I-02 | ในฐานะอาจารย์ ฉันต้องการเพิ่มอาจารย์ท่านอื่นเข้า Classroom ได้ |
| I-03 | ในฐานะอาจารย์ ฉันต้องการสร้าง Assignment พร้อมกำหนด criteria การให้คะแนน |
| I-04 | ในฐานะอาจารย์ ฉันต้องการกำหนดคะแนนรวม แบ่งเป็น Group Score และ Individual Score |
| I-05 | ในฐานะอาจารย์ ฉันต้องการกำหนด % น้ำหนักของแต่ละ criteria ภายใน Group/Individual |
| I-06 | ในฐานะอาจารย์ ฉันต้องการกำหนด Deadline สำหรับการประเมิน |
| I-07 | ในฐานะอาจารย์ ฉันต้องการประเมิน Pairwise เองสำหรับบางคู่ที่ต้องการข้อมูลเพิ่ม |
| I-08 | ในฐานะอาจารย์ ฉันต้องการส่งบางคู่ให้ evaluator เพิ่มเติม X คน (เช่น 3 คน) |
| I-09 | ในฐานะอาจารย์ ฉันต้องการดู Report คะแนนรวมของทุกกลุ่มและทุกคน |
| I-10 | ในฐานะอาจารย์ ฉันต้องการดู Report ครอบคลุม: ทุก pair, จำนวน evaluation, คะแนนรวมต่อ criteria |
| I-11 | ในฐานะอาจารย์ ฉันต้องการกำหนด Instructor Evaluation Weight สำหรับแต่ละ Assignment |
| I-12 | ในฐานะอาจารย์ ฉันต้องการ Export คะแนนทั้งหมดเป็น CSV หรือ Excel |
| I-13 | ในฐานะอาจารย์ ฉันต้องการ re-assign กลุ่มนักศึกษาและ regenerate pairs ได้ก่อน deadline |

### 2.2 Student

| ID | Story |
|---|---|
| S-01 | ในฐานะนักศึกษา ฉันต้องการ Login ด้วย Google Account และเห็น Classroom ที่ตัวเองสังกัด |
| S-02 | ในฐานะนักศึกษา ฉันต้องการประเมินกลุ่มอื่น (Group Evaluation) ผ่าน Pairwise comparison |
| S-03 | ในฐานะนักศึกษา ฉันต้องการประเมินเพื่อนร่วมกลุ่ม (Individual Evaluation) ผ่าน Pairwise comparison |
| S-04 | ในฐานะนักศึกษา ฉันต้องการ Save คำตอบก่อน Submit |
| S-05 | ในฐานะนักศึกษา ฉันต้องการเห็นคะแนนกลุ่มของตัวเอง (หลัง deadline หรือแบบ rolling) |
| S-06 | ในฐานะนักศึกษา ฉันต้องการเห็นคะแนนส่วนบุคคลของตัวเอง แบบ real-time ทุกวัน |
| S-07 | ในฐานะนักศึกษาที่ไม่ประเมิน ฉันยอมรับว่าจะได้รับคะแนน 0 |
| S-08 | ในฐานะนักศึกษา ฉันต้องการ re-submit คำตอบได้ทุกวันก่อน deadline โดยระบบใช้คะแนน submission ล่าสุด |
| S-09 | ในฐานะนักศึกษา ฉันไม่ต้องการเห็นว่าใครประเมินตัวฉัน (anonymous) |

---

## 3. System Architecture Overview

```
[Student / Instructor]
        |
   Google OAuth
        |
  [Web Application]
   /            \
[Evaluation UI]  [Report UI]
        |
  [API Layer]
   /      \
[Pairing   [Scoring
 Engine]    Engine]
        |
   [Database]
```

---

## 4. Functional Requirements

### 4.1 Authentication

- **FR-AUTH-01:** Login ด้วย Google OAuth 2.0 เท่านั้น
- **FR-AUTH-02:** ระบบตรวจสอบ email กับรายชื่อใน Classroom โดยอัตโนมัติ
- **FR-AUTH-03:** Instructor มีสิทธิ์แตกต่างจาก Student โดยสิ้นเชิง
- **FR-AUTH-04:** Instructor คนเดียวกันสามารถเป็น Instructor ในหลาย Classroom

### 4.2 Classroom Management

- **FR-CLASS-01:** Instructor สร้าง Classroom พร้อม upload CSV (columns: `email`, `groupname`)
- **FR-CLASS-02:** ระบบ parse CSV และจัดกลุ่มนักศึกษาตาม `groupname` อัตโนมัติ
- **FR-CLASS-03:** Instructor สามารถเพิ่ม/ลบ Instructor ท่านอื่นใน Classroom ได้
- **FR-CLASS-04:** Student เห็นเฉพาะ Classroom ที่ email ตนเองอยู่ใน CSV

### 4.3 Assignment Management

- **FR-ASSIGN-01:** Instructor สร้าง Assignment โดยกำหนด:
  - ชื่อ Assignment
  - คะแนนรวม (เช่น 20 คะแนน)
  - สัดส่วน Group Score (เช่น 15 คะแนน)
  - สัดส่วน Individual Score (เช่น 5 คะแนน)
  - Deadline สำหรับ Group Evaluation
  - Deadline สำหรับ Individual Evaluation
- **FR-ASSIGN-02:** ภายใน Group Score กำหนด Criteria + % น้ำหนัก (รวมต้องได้ 100%)
  - ตัวอย่าง: UI 40%, Completeness 35%, Innovation 25%
- **FR-ASSIGN-03:** ภายใน Individual Score กำหนด Criteria + % น้ำหนัก (รวมต้องได้ 100%)
  - ตัวอย่าง: Teamwork 50%, Management 50%
- **FR-ASSIGN-04:** Instructor แก้ไข Assignment ได้ก่อน Deadline

### 4.4 Pairing Engine

#### 4.4.1 Group Evaluation Pairs

- **FR-PAIR-01:** สำหรับแต่ละ Criteria ของ Group Evaluation ระบบสุ่มคู่กลุ่ม (A vs B) โดย:
  - ไม่จับคู่กลุ่มกับตัวเอง
  - ครอบคลุมทุก Combination (nC2 pairs)
  - แต่ละ combination ได้รับการประเมินอย่างน้อย 5 ครั้ง
- **FR-PAIR-02:** แต่ละนักศึกษาได้รับ **5 คู่ต่อ criteria** ในแต่ละรอบ
- **FR-PAIR-03:** ระบบกระจาย pair ให้ครอบคลุม combination ทั้งหมด โดย Load balance ให้แต่ละ pair ได้รับจำนวน evaluator ใกล้เคียงกัน
- **FR-PAIR-04:** กลุ่มของ evaluator ห้ามประเมินกลุ่มตัวเอง

#### 4.4.2 Individual Evaluation Pairs

- **FR-PAIR-05:** สำหรับแต่ละ Criteria ของ Individual Evaluation นักศึกษาแต่ละคนประเมิน **เพื่อนร่วมกลุ่มเท่านั้น**
- **FR-PAIR-06:** ระบบสุ่มคู่ (Mr.A vs Miss.B) ภายในกลุ่ม 5 คู่ต่อ criteria
- **FR-PAIR-07:** ไม่มีการประเมินตนเอง (ห้าม self-evaluation)
- **FR-PAIR-08:** ทุก combination ภายในกลุ่มได้รับการประเมินอย่างน้อย 5 ครั้ง

#### 4.4.3 Group Re-assignment

- **FR-PAIR-09:** Instructor สามารถเปลี่ยนกลุ่มนักศึกษาได้ก่อน deadline
- **FR-PAIR-10:** เมื่อมีการเปลี่ยนกลุ่ม ระบบต้อง **re-generate pairs ทั้งหมด** สำหรับ Assignment นั้น
- **FR-PAIR-11:** Submissions ที่มีอยู่แล้ว (ก่อน re-generate) จะถูก **invalidate** และไม่นำมาคำนวณ
- **FR-PAIR-12:** ระบบส่ง notification/warning แก่ Instructor ก่อน re-generate ว่า submissions เดิมจะหายไป
- **FR-PAIR-13:** นักศึกษาที่เคย submit แล้ว จะได้รับ notification ว่าต้อง submit ใหม่ (pairs เปลี่ยนแล้ว)
- **FR-PAIR-14:** ระบบบันทึก re-generate history (timestamp, ผู้สั่ง) สำหรับ audit

#### 4.4.3 Coverage Algorithm (Conceptual)

```
Input: N items (groups or individuals), target_coverage = 5

total_pairs = N*(N-1)/2
evaluations_needed = total_pairs * target_coverage

For each evaluator (student):
  assigned_pairs = sample(all_pairs, 5, weight=inverse_current_coverage)
  exclude: pairs involving evaluator's own group/self

Iterate until all pairs reach target_coverage
```

### 4.5 Evaluation UI

#### 4.5.1 Group Evaluation Page

- **FR-EVAL-01:** หน้าเดียวแสดงทุก Criteria ของ Group Evaluation
- **FR-EVAL-02:** แต่ละ Criteria แสดง 5 คู่ เรียงต่อกัน รูปแบบ:

```
[Criteria Name]
Group A  ( ) ( ) ( ) ( ) ( )  Group B
Group C  ( ) ( ) ( ) ( ) ( )  Group D
...
```

- **FR-EVAL-03:** Radio buttons 5 ระดับ (1=ซ้ายดีกว่ามาก, 3=เท่ากัน, 5=ขวาดีกว่ามาก)
- **FR-EVAL-04:** ปุ่ม **Save** บันทึก draft ได้ตลอดเวลาก่อน submit
- **FR-EVAL-05:** ปุ่ม **Submit** ส่งคำตอบ (ไม่สามารถแก้ไขได้หลัง submit)
- **FR-EVAL-06:** ระบบเตือนหากยังมีคู่ที่ยังไม่ได้ประเมิน

#### 4.5.2 Individual Evaluation Page

- **FR-EVAL-07:** หน้าแยกต่างหากจาก Group Evaluation
- **FR-EVAL-08:** แสดงเฉพาะเพื่อนในกลุ่มตัวเอง
- **FR-EVAL-09:** แต่ละ Criteria แสดง 5 คู่ รูปแบบเดียวกับ Group
- **FR-EVAL-10:** ปุ่ม Save / Submit แยกกันจาก Group Evaluation

#### 4.5.3 Deadline Enforcement

- **FR-EVAL-11:** หลัง Deadline ระบบปิดการ Submit
- **FR-EVAL-12:** Draft ที่ Save ไว้แต่ยังไม่ Submit ถือว่าไม่มีการประเมิน → ได้ 0
- **FR-EVAL-13:** แสดง Countdown timer และ Deadline ชัดเจน

#### 4.5.4 Re-submission Policy

- **FR-EVAL-14:** นักศึกษาสามารถ re-submit ได้กี่ครั้งก็ได้ก่อน deadline
- **FR-EVAL-15:** ระบบเก็บ submission ทุกครั้ง แต่ใช้เฉพาะ **submission ล่าสุด** (latest submitted_at) ในการคำนวณคะแนน
- **FR-EVAL-16:** หน้า Evaluation แสดง timestamp ของ submission ล่าสุด เพื่อให้นักศึกษาทราบว่าคำตอบล่าสุดถูกบันทึกแล้ว
- **FR-EVAL-17:** Group Evaluation และ Individual Evaluation มี re-submission policy แยกกัน (submit ใหม่ในหน้าใดก็ใช้ latest ของหน้านั้น)

### 4.6 Scoring Engine

#### 4.6.1 Pairwise Score Calculation

แต่ละผลการเปรียบเทียบ A vs B (1–5) แปลงเป็น point:

| เลือก | A ได้ | B ได้ |
|---|---|---|
| 1 (A ดีกว่ามาก) | 1.0 | 0.0 |
| 2 (A ดีกว่า) | 0.75 | 0.25 |
| 3 (เท่ากัน) | 0.5 | 0.5 |
| 4 (B ดีกว่า) | 0.25 | 0.75 |
| 5 (B ดีกว่ามาก) | 0.0 | 1.0 |

- **FR-SCORE-01:** คะแนนรวมต่อ item = sum ของ points ที่ได้รับ / จำนวนครั้งที่ถูกประเมิน
- **FR-SCORE-02:** normalize ให้ผลรวมของทุก item ใน criteria = 1.0 (relative score)
- **FR-SCORE-03:** คะแนน criteria × % น้ำหนัก × คะแนนสูงสุด (Group หรือ Individual) = คะแนนที่ได้

#### 4.6.2 Zero Score Rule

- **FR-SCORE-04:** นักศึกษาที่ไม่ Submit ทั้ง Group และ Individual Evaluation → ได้ 0 คะแนนในส่วนนั้น
- **FR-SCORE-05:** (Discussion) นักศึกษาที่ Save แต่ไม่ Submit ถือว่า incomplete → ได้ 0

#### 4.6.3 Instructor Evaluation Weight

- **FR-SCORE-06:** แต่ละ Assignment มี config `instructor_weight` (default = 1.0, ปรับได้ตอนสร้าง Assignment)
- **FR-SCORE-07:** เมื่อ Instructor ประเมิน 1 คู่ คะแนนของ Instructor นั้นถูกนับเทียบเท่า `instructor_weight` การประเมินของ student
  - ตัวอย่าง: `instructor_weight = 3` → การประเมิน 1 ครั้งของ Instructor นับเป็น 3 votes
- **FR-SCORE-08:** `instructor_weight` เป็น **ค่าเดียว** ใช้กับทั้ง Group และ Individual criteria ของ Assignment นั้น (ไม่แยกรายชนิด)
- **FR-SCORE-09:** ระบบแสดง effective vote count ใน Report เพื่อความโปร่งใส

#### 4.6.4 Individual Score Rolling Update

- **FR-SCORE-10:** คะแนน Individual ของนักศึกษาแต่ละคนคำนวณและแสดงผลทุกวัน (daily update) ตั้งแต่วันแรกที่มีการประเมินจนถึง deadline
- **FR-SCORE-11:** เพื่อนร่วมกลุ่มสามารถกรอกผล Individual Evaluation ได้ทุกวัน (re-open / update ได้จนถึง deadline)
- **FR-SCORE-12:** นักศึกษาเจ้าตัวเห็นเฉพาะคะแนนรวมของตัวเอง ไม่เห็นว่าใครให้คะแนนเท่าไร
- **FR-SCORE-13:** คะแนนที่แสดงระหว่าง deadline มี label "Interim — อาจเปลี่ยนแปลงได้" ชัดเจน
- **FR-SCORE-14:** คะแนน final คำนวณหลัง deadline โดยใช้ submissions ทั้งหมดที่ submit แล้ว

#### 4.6.5 Partial Credit (Late / Incomplete Submission)

- **FR-SCORE-15:** นักศึกษาที่ submit บางส่วน (ไม่ครบทุก criteria หรือไม่ครบทุก pair) ได้ partial credit ตาม % ของ pairs ที่ submit

  ```
  completion_ratio = submitted_pairs / total_assigned_pairs
  partial_score    = full_earned_score × completion_ratio
  ```

- **FR-SCORE-16:** คำนวณ completion_ratio แยกระหว่าง Group Evaluation และ Individual Evaluation
- **FR-SCORE-17:** หน้า Evaluation แสดง progress bar: `X / Y pairs submitted` แต่ละ criteria เพื่อให้นักศึกษาเห็น completion ของตัวเอง
- **FR-SCORE-18:** หากไม่มี submission เลย → score = 0 (ไม่ใช่ partial)

#### 4.6.6 Peer Anonymity

- **FR-SCORE-19:** นักศึกษาเห็นเฉพาะ **คะแนนรวมของตัวเอง** ไม่เห็นว่าใครให้คะแนนเท่าไร
- **FR-SCORE-20:** Instructor เห็น evaluator ได้ใน Raw Pairs report แต่ไม่เปิดเผยต่อ student
- **FR-SCORE-21:** Export ประเภท Raw Pairs สำหรับ Instructor จะมีชื่อ evaluator แต่ลบออกในไฟล์ที่แชร์ให้นักศึกษา

### 4.7 Report & Visibility

#### 4.7.1 Instructor Report

- **FR-REPORT-01:** ดูคะแนนรวมของทุกกลุ่มแยกตาม Assignment
- **FR-REPORT-02:** ดูคะแนนรวมรายบุคคลทุกคนใน Classroom
- **FR-REPORT-03:** ดู **Pair Coverage Report** แสดง:
  - ทุก pair ที่เป็นไปได้ (กลุ่ม + บุคคล)
  - จำนวนครั้งที่ pair นั้นถูกประเมิน
  - ผล Pairwise score สะสมของแต่ละ pair ต่อแต่ละ criteria
- **FR-REPORT-04:** ปุ่ม **"ส่งประเมินเพิ่ม"** สำหรับเลือก pair และส่งให้ X คนประเมินเพิ่ม (random assign)
- **FR-REPORT-05:** ปุ่ม **"ประเมินเอง"** สำหรับ Instructor เปิดหน้า pairwise evaluation ของ pair นั้น

#### 4.7.2 Student Visibility

- **FR-REPORT-06:** นักศึกษาเห็นคะแนนรวมของกลุ่มตัวเอง (หลัง deadline หรือตามที่ Instructor กำหนด)
- **FR-REPORT-07:** นักศึกษาเห็นคะแนน Individual ของตัวเองแบบ rolling (daily update) พร้อม label "Interim" จนกว่าจะ final
- **FR-REPORT-08:** ไม่เปิดเผยคะแนนของกลุ่มอื่นหรือคนอื่นให้นักศึกษาดู

#### 4.7.3 Export

- **FR-EXPORT-01:** Instructor สามารถ Export ผลคะแนนได้ 2 รูปแบบ: **CSV** และ **Excel (.xlsx)**
- **FR-EXPORT-02:** Export รายงานได้ 3 ระดับ:
  - **Group Summary:** กลุ่ม × criteria × weighted score
  - **Individual Summary:** นักศึกษา × criteria × weighted score + total
  - **Raw Pairs:** ทุก pair, evaluator (anonymized), score ที่ให้, timestamp
- **FR-EXPORT-03:** Excel export มี 3 sheet แยกกัน (Group Summary, Individual Summary, Raw Pairs)
- **FR-EXPORT-04:** CSV export มีให้เลือกว่าจะ export sheet ไหน
- **FR-EXPORT-05:** ชื่อไฟล์ใช้ format `{classroom}_{assignment}_{type}_{YYYYMMDD}.{ext}`

---

## 5. Data Model (Conceptual)

### Core Entities

```
Classroom
├── id, name, created_by
├── Instructors (many-to-many: User)
└── Students (CSV import: email → User, groupname)

Group
├── id, classroom_id, name
└── Members (User[])

Assignment
├── id, classroom_id, name, total_score
├── group_max_score, individual_max_score
├── group_deadline, individual_deadline
├── instructor_weight  ← configurable, default 1.0
├── GroupCriteria[]  (name, weight%)
└── IndividualCriteria[]  (name, weight%)

PairAssignment
├── id, assignment_id, criteria_id
├── type: GROUP | INDIVIDUAL
├── item_a_id, item_b_id  (group_id or user_id)
└── assigned_to_user_id

EvaluationResponse
├── id, pair_assignment_id, evaluator_id
├── score (1–5)
├── saved_at, submitted_at
└── status: DRAFT | SUBMITTED

ComputedScore
├── id, assignment_id, criteria_id
├── item_id (group_id or user_id)
├── raw_score, normalized_score, weighted_score
├── is_final  (bool — false until deadline passed)
└── computed_at
```

---

## 6. Pairing Algorithm — Detailed Specification

### 6.1 Goal

ทุก combination (a, b) ต้องได้รับการ evaluate ≥ 5 ครั้ง โดยแต่ละ evaluator ได้รับ 5 pairs ต่อ criteria

### 6.2 Algorithm Steps

```
1. Generate all valid pairs: 
   - GROUP: all (Gi, Gj) where i≠j, remove pairs within same group
   - INDIVIDUAL: all (Pi, Pj) within same group where i≠j

2. Calculate required evaluations:
   total_needed = len(all_pairs) × 5
   evals_per_evaluator = 5

3. Build assignment list:
   - Repeat each pair 5 times → pool
   - Shuffle pool
   - Assign to evaluators in round-robin
   - Constraint: evaluator cannot be assigned their own group/self

4. Edge case: if group is small (≤ 2 groups), coverage may require 
   same evaluator to see same pair multiple times → allowed if necessary

5. Pre-generate all assignments when Assignment is created
   Store as PairAssignment records
```

### 6.3 Constraints

| Constraint | Rule |
|---|---|
| No self-evaluation | evaluator's group ≠ any item in pair (Group eval) |
| No self-evaluation | evaluator ≠ any person in pair (Individual eval) |
| Min coverage | Each pair evaluated ≥ 5 times |
| Balanced load | Each evaluator gets exactly 5 pairs per criteria (±1 rounding) |

---

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | หน้า Evaluation โหลดภายใน 2 วินาที |
| Availability | 99.5% uptime ช่วงก่อน Deadline |
| Security | Google OAuth, HTTPS, user data isolation |
| Scalability | รองรับ 1 Classroom = 200 นักศึกษา, 10 กลุ่ม |
| Mobile | Responsive design รองรับ mobile (เลือก radio button ง่าย) |
| Data Retention | เก็บ evaluation data ≥ 1 ปีการศึกษา |

---

## 8. Screen Flow

```
Login (Google) 
    ↓
Dashboard (Classroom List)
    ↓
Classroom Detail
    ├── [Instructor] → Manage Students / Create Assignment / View Reports
    └── [Student]   → Assignment List
                            ↓
                    Assignment Detail
                    ├── Group Evaluation Page (1 page, all group criteria)
                    │       → Save / Submit
                    └── Individual Evaluation Page (1 page, all individual criteria)
                            → Save / Submit
```

---

## 9. Edge Cases & Rules Summary

| Case | Behavior |
|---|---|
| นักศึกษาไม่ Submit เลย | ได้ 0 คะแนนในส่วนนั้น |
| กลุ่มมีสมาชิกคนเดียว | ไม่มี Individual Evaluation สำหรับกลุ่มนั้น |
| กลุ่มมีแค่ 2 กลุ่มทั้ง Classroom | แต่ละ pair ต้องได้ 5 evals → evaluator จะได้ pair เดิมซ้ำ |
| Instructor ประเมินเอง | นับรวมกับ evaluation data ปกติ (มี weight ตาม config หรือ weight=1) |
| เพิ่ม evaluator เสริม | ส่งให้ X คน random จาก pool ที่ยังไม่เคย eval pair นั้น |
| ผลรวม Criteria weight ≠ 100% | System validation ก่อน save assignment |
| Email ใน CSV ไม่มีในระบบ | เพิ่ม record pending → activate เมื่อ user นั้น login ครั้งแรก |

---

## 10. PRD Status

✅ **Open Questions ทั้งหมดได้รับการตัดสินใจแล้ว** — PRD พร้อมส่ง Development Team

### Recommended Next Steps

1. **Technical Design Review** — ทีม dev review Data Model และ Pairing Algorithm
2. **UI/UX Wireframe** — ออกแบบหน้า Evaluation (Group/Individual) และ Report
3. **API Contract** — กำหนด endpoints และ request/response schema
4. **Security Review** — ทบทวน anonymity implementation และ data isolation
5. **Performance Testing Plan** — วาง load test scenario สำหรับช่วงก่อน deadline

---

*Document prepared for development team review.*
