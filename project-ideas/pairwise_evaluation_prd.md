# Product Requirement Document (PRD)
## Project: Pairwise Evaluation System (Peer & Group Assessment)
**Version:** 2.0 (Decoupled Submission Update)
**Status:** Approved

---

## 1. Objective & Overview
The **Pairwise Evaluation System** is a web-based assessment platform designed to eliminate traditional grading biases (such as grade inflation or recency bias). Instead of assigning absolute numeric scores, evaluators are presented with randomly selected pairs of groups or individuals and must perform a pairwise comparison (forced-choice or scale-based comparison) across specified criteria. 

The system leverages mathematical ranking models (e.g., Elo Rating System or Bradley-Terry Model) to convert comparison data into normalized scores, allowing instructors to generate fair individual and group grades.

---

## 2. User Personas & Roles

* **Instructor (Teacher):** Creates classrooms, manages student rosters via CSV imports, configures assignments with custom assessment criteria and weights, participates in the evaluation process, and exports final calculated grade reports.
* **Student:** Authenticates via Google Sign-In, accesses authorized classrooms, evaluates peer groups dynamically, conducts pairwise assessments of team members within their own group, and views finalized group/individual performance metrics.

---

## 3. Core Features & Functional Requirements

### 3.1 Classroom & User Management
* **Classroom Creation:** Instructors can instantiate multiple distinct courses/classrooms.
* **Roster Import (CSV):** Instructors enroll students by uploading a `.csv` file. The file must strictly contain the following columns:
    * `email`: The student's official email address.
    * `groupname`: The name/identifier of the group the student belongs to.
* **Authentication & Authorization:** * Students must log in using **Google OAuth**.
    * Access is restricted to students whose emails exist in the imported classroom roster.
    * Upon successful login, students are presented with a dashboard displaying only the classrooms they are enrolled in.

### 3.2 Assignment & Criteria Configuration
Instructors can create assignments with the following parameters:
* **Metadata:** Title, Description, and **Deadline** (Date & Time string for automatic locking).
* **Group Criteria:** Criteria applied to evaluate peer groups (e.g., *User Interface (UI)*, *Completeness*). Each criterion possesses an independent weight percentage.
* **Individual Criteria:** Criteria applied to evaluate internal group members (e.g., *Teamwork*, *Management*). Each criterion possesses an independent weight percentage.
* **Weight Configuration:** Instructors must configure the weight split between student peer evaluations and instructor evaluations (e.g., Instructor Evaluation: 40%, Student Peer Evaluation: 60%).

---

### 3.3 Evaluation Interface & Decoupled Submission Flow
To ensure structural clarity and optimize user focus, the system separates group-level and individual-level evaluations into **two completely decoupled pages**. Each page manages its own states, validations, and submission lifecycles.

#### 3.3.1 Page 1: Group Assignment Evaluation Page
This page aggregates all group-level evaluation criteria. Students evaluate *other groups* (excluding their own).
* **Behavior & Rules:**
    * The student must complete all randomized pairs across all group criteria before submission is permitted.
    * **Volume:** Exactly **5 pairs per criterion** are presented to each student.
    * Submitting this page locks the group assessment data (Read-Only state); however, it does not impact or depend on the completion status of the individual evaluation page.
* **UI Wireframe Concept:**
    ```text
    ========================================================================
    [PAGE] GROUP ASSIGNMENT EVALUATION             Deadline: 15 Oct, 23:59 น.
    Status: 🟡 In Progress (10/15 Pairs)
    ========================================================================
    
    ▶ Criteria 1: User Interface (UI) (Weight: XX%)
      (Description: Visual appeal, usability, and responsive layout.)
      
      Pair 1:  Group A   [ ] [X] [ ] [ ] [ ]   Group B
      Pair 2:  Group C   [ ] [ ] [ ] [ ] [X]   Group D
      Pair 3:  Group B   [ ] [ ] [X] [ ] [ ]   Group E
      Pair 4:  Group A   [ ] [ ] [ ] [X] [ ]   Group D
      Pair 5:  Group E   [X] [ ] [ ] [ ] [ ]   Group C
          
    ------------------------------------------------------------------------
    ▶ Criteria 2: Completeness (Weight: XX%)
      (Description: Functionality matches core requirements with minimal bugs.)
      
      Pair 1:  Group B   [ ] [ ] [ ] [X] [ ]   Group D
      Pair 2:  Group C   [ ] [X] [ ] [ ] [ ]   Group E
      Pair 3:  Group A   [X] [ ] [ ] [ ] [ ]   Group G
      Pair 4:  Group F   [ ] [ ] [X] [ ] [ ]   Group B
      Pair 5:  Group D   [ ] [ ] [ ] [ ] [X]   Group A
    
    ========================================================================
    [ SAVE DRAFT ]                             [ SUBMIT GROUP EVALUATION ]
    ```

#### 3.3.2 Page 2: Individual Assignment Evaluation Page
This page aggregates all individual-level criteria. Students evaluate *only* the members within their assigned group.
* **Behavior & Rules:**
    * Students evaluate pairs of their own teammates. The logged-in student's own name is strictly excluded from appearing as a target in any pair.
    * **Volume:** Exactly **5 pairs per criterion** are randomly generated.
    * Submission of this page operates independently from the Group Evaluation page.
* **UI Wireframe Concept:**
    ```text
    ========================================================================
    [PAGE] INDIVIDUAL ASSIGNMENT EVALUATION          Your Team: Group A
    Status: 🟡 In Progress (5/10 Pairs)
    ========================================================================
    
    ▶ Criteria 1: Teamwork (Weight: XX%)
      (Description: Collaboration, active meeting attendance, and reliability.)
          
      Pair 1:  Mr. A      [X] [ ] [ ] [ ] [ ]   Miss. B
      Pair 2:  Mr. C      [ ] [ ] [ ] [X] [ ]   Miss. D
      Pair 3:  Miss. B    [ ] [ ] [X] [ ] [ ]   Mr. C
      Pair 4:  Miss. D    [ ] [X] [ ] [ ] [ ]   Mr. A
      Pair 5:  Mr. C      [ ] [ ] [ ] [ ] [X]   Mr. A
          
    ------------------------------------------------------------------------
    ▶ Criteria 2: Management (Weight: XX%)
      (Description: Time management, punctual task delivery, and planning.)
          
      Pair 1:  Mr. E      [ ] [ ] [ ] [X] [ ]   Miss. C
      Pair 2:  Mr. D      [ ] [ ] [X] [ ] [ ]   Miss. B
      Pair 3:  Miss. C    [X] [ ] [ ] [ ] [ ]   Mr. B
      Pair 4:  Mr. D      [ ] [ ] [ ] [X] [ ]   Mr. E
      Pair 5:  Miss. B    [ ] [X] [ ] [ ] [ ]   Miss. C
    
    ========================================================================
    [ SAVE DRAFT ]                        [ SUBMIT INDIVIDUAL EVALUATION ]
    ```

---

### 3.4 Instructor Assessment Capabilities
* Instructors participate directly in the assignment evaluation to anchor the scoring spectrum.
* The system generates a custom queue for the instructor consisting of **10 randomized pairs per group-level criterion**.
* Instructor inputs are processed through the same mathematical model but are weighted uniquely based on the assignment's configuration configuration.

### 3.5 Grading Rules & Penalty Logic
* **Save Draft Functionality:** Users can continuously save their current selection progress before final submission. Local states must be persisted to avoid data loss on page refresh or tab switches.
* **Decoupled Validation:** The submission of Page 1 requires 100% completion of group pairs. The submission of Page 2 requires 100% completion of individual pairs. A user can submit one page while leaving the other as a draft.
* **Non-participation Penalty:** If a student fails to submit a page before the assignment deadline, they receive a **score of 0** for that entire specific segment:
    * Failing to submit the Group Page results in a Group Score of 0 for that student.
    * Failing to submit the Individual Page results in an Individual Score of 0 for that student.

### 3.6 Reporting & Visibility Dashboard
* **Instructor Dashboard:**
    * Real-time status trackers demonstrating submission completion percentages (Not Started / Draft Saved / Submitted) per student for both pages.
    * Aggregated grade books showcasing final calculated Group Scores, Individual Scores, and Final Weighted Grades.
    * Data export capability via `.csv` formats.
* **Student Visibility:**
    * **Group View:** Students can view the final, algorithmically aggregated score for their specific group.
    * **Individual View:** Students can see their final personal evaluation score. To protect relationships and encourage honesty, individual submissions are completely **anonymous**—students will never see raw score selections or identifiers of who graded them.

---

## 4. Technical & Algorithmic Requirements

### 4.1 Matchmaking & Distribution Algorithm
The system backend must enforce strict parameters during evaluation runtime:
1.  **Combination Coverage:** The backend must map out the absolute matrix of all possible pairs (Group vs Group, and Member vs Member within the same group).
2.  **5x Minimum Multiplier:** To ensure statistical confidence and mitigate malicious outliers, the matchmaking system must distribute pairs dynamically across the student pool so that **every individual pair combination is evaluated at least 5 times** globally.
3.  **Dynamic Cloned Backfill:** In cases where a small group size or limited classroom enrollment yields fewer unique combinations than the required evaluation items (e.g., a group containing only 3 members cannot naturally supply 5 completely unique individual pairs), the algorithm must inject duplicate combinations with **inverted left/right orientation** to fulfill the 5-pair UI display constraint.

### 4.2 Scoring Calculation Model
* Raw selections from the comparison sliders (-2 to +2 scale values corresponding to selection bubbles) must be mapped into comparison match results (Win/Loss/Draw/Marginal Advantage).
* The system backend must execute an **Elo Rating System** or a **Bradley-Terry Model** to convert discrete pairwise wins/losses into continuous interval scales, normalizing scores into standard percentile grading structures.
