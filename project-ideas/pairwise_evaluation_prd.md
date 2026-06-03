# Product Requirement Document (PRD)
## Project: Pairwise Evaluation System (Peer & Group Assessment)
**Version:** 3.0 (Comprehensive Report & Advanced Sampling Update)
**Status:** In Review

---

## 1. Objective & Overview
The **Pairwise Evaluation System** is a web-based assessment platform designed to eliminate traditional grading biases (such as grade inflation or recency bias). Instead of assigning absolute numeric scores, evaluators are presented with randomly selected pairs of groups or individuals and must perform a pairwise comparison (forced-choice or scale-based comparison) across specified criteria. 

The system leverages mathematical ranking models (e.g., Elo Rating System or Bradley-Terry Model) to convert comparison data into normalized scores, allowing instructors to generate fair individual and group grades.

---

## 2. User Personas & Roles

* **Instructors / Teachers (Co-teaching Supported):** Multiple instructors can be assigned to a single classroom. They can create classrooms, manage student rosters via CSV imports, configure assignments, participate in the evaluation process, view comprehensive matrix reports, execute manual evaluation overriding, and inject dynamic sample queues to specific numbers of students to gather more data.
* **Student:** Authenticates via Google Sign-In, accesses authorized classrooms, evaluates peer groups dynamically, conducts pairwise assessments of team members within their own group, and views finalized group/individual performance metrics.

---

## 3. Core Features & Functional Requirements

### 3.1 Classroom & User Management
* **Classroom Creation:** Instructors can instantiate multiple distinct courses/classrooms.
* **Multi-Instructor Support:** A classroom can host more than one instructor (Co-teachers). All assigned instructors share equal administrative privileges over assignments, evaluation overriding, and grading metrics.
* **Roster Import (CSV):** Instructors enroll students by uploading a `.csv` file. The file must strictly contain the following columns:
    * `email`: The student's official email address.
    * `groupname`: The name/identifier of the group the student belongs to.
* **Authentication & Authorization:**
    * Students and instructors log in using **Google OAuth**.
    * Student access is strictly restricted to emails present in the imported classroom roster.

### 3.2 Assignment & Criteria Configuration
Instructors can create assignments with the following parameters:
* **Metadata:** Title, Description, and **Deadline** (Date & Time string for automatic locking).
* **Group Criteria:** Criteria applied to evaluate peer groups (e.g., *User Interface (UI)*, *Completeness*). Each criterion possesses an independent weight percentage.
* **Individual Criteria:** Criteria applied to evaluate internal group members (e.g., *Teamwork*, *Management*). Each criterion possesses an independent weight percentage.
* **Weight Configuration:** Instructors configure the weight split between student peer evaluations and instructor evaluations (e.g., Instructor Evaluation: 40%, Student Peer Evaluation: 60%).

---

### 3.3 Evaluation Interface & Decoupled Submission Flow
The system separates group-level and individual-level evaluations into **two completely decoupled pages** managing their own states, validations, and submission lifecycles.

#### 3.3.1 Exclusion & Anti-Bias Constraint Rules (Strict Enforcement)
To maintain objectivity and statistical integrity, the system applies the following hard filters across all evaluation queues, algorithms, and manuals:
1. **Group Isolation Rule:** A student's own group **MUST NEVER** be presented to them for evaluation. A student cannot evaluate a pair if their own group is either Entity A or Entity B.
2. **Individual Isolation Rule:** A student **MUST NEVER** evaluate themselves. The logged-in student's identifier is strictly filtered out from any internal team pair queues generated for them.

#### 3.3.2 Page 1: Group Assignment Evaluation Page
This page aggregates all group-level evaluation criteria. Students evaluate *other groups* (excluding their own).
* **Volume:** Exactly **5 pairs per criterion** are presented to each student.
* Submitting this page locks the group assessment data (Read-Only state); however, it does not impact or depend on the completion status of the individual evaluation page.

#### 3.3.3 Page 2: Individual Assignment Evaluation Page
This page aggregates all individual-level criteria. Students evaluate *only* the members within their assigned group (excluding themselves).
* **Volume:** Exactly **5 pairs per criterion** are randomly generated.
* Submission of this page operates independently from the Group Evaluation page.

---

### 3.4 Advanced Matrix Report & Analytics Dashboard (New Feature)
Instructors have access to a deep analytical report demonstrating the operational data of all possible mathematical combinations.

#### 3.4.1 Pairwise Matrix Data Display
For each configured Criterion, the dashboard renders a table detailing **every mathematically possible pair combination** within the scope.
* **Columns Required:**
    * `Entity A` (Group Name or Student Name)
    * `Entity B` (Group Name or Student Name)
    * `Total Evaluations` (The cumulative count of times this specific pair has been evaluated across the system)
    * `Current Win Ratio / Outcome` (Calculated percentage of Entity A outperforming Entity B or vice versa)

#### 3.4.2 Dynamic Sample Injection & Redistribution Engine
Directly from the Matrix Report row, if instructors observe that certain combinations have low evaluation counts or volatile results, they can trigger a manual redistribution:
* **Action Button:** "Distribute Sample to More Students"
* **Input Parameter Box:** Instructor inputs an integer `XX` (e.g., 3 students).
* **System Process:** The system dynamically selects `XX` random students who qualify under the exclusion rules (i.e., the pair does not contain their own group or themselves) and appends this specific pair directly into their active evaluation queues. This enforces targeted sampling to rapidly gather more data points for specific pairs.

#### 3.4.3 Manual Instructor Override Evaluation
Instructors can inject themselves directly into the grading loop of any specific combination to anchor data or break deadlocks.
* **Action Button:** "Evaluate This Pair Personally"
* **System Process:** Opens a modal containing the standard slider interface for that pair. The input will save under the Instructor Evaluation pool. If there are multiple instructors, each instructor can evaluate independently, and their entries will be aggregated together under the designated instructor weight allocation.

---

### 3.5 Grading Rules & Penalty Logic
* **Non-participation Penalty:** If a student fails to submit a page before the assignment deadline, they receive a **score of 0** for that entire specific segment (Group Score of 0 or Individual Score of 0 respectively).

### 3.6 Reporting & Visibility Dashboard
* **Instructor Dashboard:** Real-time completion trackers, aggregate grade books showcasing finalized Group/Individual calculated weights, and export tools.
* **Student Visibility:** Anonymous and aggregated outputs only. Students see final calculated scores for their group and personal summaries without seeing who evaluated them or the granular pair distribution results.

---

## 4. Technical & Algorithmic Requirements

### 4.1 Matchmaking, Exclusion Filters, and Backfill Mechanics
The system backend must enforce strict parameters during evaluation runtime:
1. **Combination Coverage & Dynamic Exclusion Matrix:** The backend maps the absolute matrix of all possible pairs while actively passing them through user-specific exclusion matrices (`user_group != pair_entities` and `user_id != pair_entities`).
2. **5x Minimum Multiplier:** The initial matchmaking must distribute pairs across the student pool so that **every individual pair combination is evaluated at least 5 times** globally.
3. **Dynamic Cloned Backfill:** In cases where small group sizes yield fewer unique combinations than the required display (e.g., a group with only 3 members), the algorithm injects duplicate combinations with **inverted left/right orientation** to fulfill the 5-pair UI display constraint.

### 4.2 Scoring Calculation Model
* Raw selections from the comparison sliders (-2 to +2 scale values) are processed via an **Elo Rating System** or a **Bradley-Terry Model** to convert discrete pairwise wins/losses into continuous interval scales, normalizing scores into standard percentile grading structures.
