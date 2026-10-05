# Database Schema Design & ER Diagram - Employee Module (ERP 5.0)

Design of relational database schema and ER Diagram based on the 44 data points across 6 sections, system metadata, change request workflows, authentication tables, and Organisation Hierarchy.

---

## 🏛️ Organisation Structure & Hierarchy Integration

```mermaid
graph TD
    MD["Managing Director (Madhu)"]
    
    MD --> COO["COO"]
    MD --> Primary["Primary (Head + 11)"]
    MD --> B2B["B2B (Headed by MD + 4)"]
    MD --> Plots["Plots (1 person -> MD)"]
    MD --> Secondary["Secondary (Head + 5)"]
    MD --> Projects["Projects (Team TBD)"]

    COO --> RR["Residential Rental (Head + 3)"]
    COO --> CR["Commercial Rental (Head + 4)"]
    COO --> PM["Property Management (Head + 3)"]
    COO --> RS["Registration & Survey (Head + 7)"]
    COO --> Liaison["Liaison (Head + 12)"]
```

### Impact on Database Design & Business Logic:

1. **Master Data Seed (`verticals` enum / lookup)**:
   - **Direct Verticals under MD**: `PRIMARY`, `B2B`, `PLOTS`, `SECONDARY`, `PROJECTS`.
   - **Service Verticals under COO**: `RESIDENTIAL_RENTAL`, `COMMERCIAL_RENTAL`, `PROPERTY_MANAGEMENT`, `REGISTRATION_SURVEY`, `LIAISON`.
   - **Functional Verticals**: `MARKETING`, `SALES`, `OPERATIONS`, `HUMAN_RESOURCE`, `FINANCE_ADMIN`.

2. **Hierarchical Reporting Tree (`reportingAuthorityId`)**:
   - **Top Node**: MD (`reportingAuthorityId = null`).
   - **Level 1**: COO and Vertical Heads of Primary, Plots, Secondary, Projects (`reportingAuthorityId = MD.id`).
   - **Level 2 (Service Heads)**: Heads of Residential Rental, Commercial Rental, Property Management, Registration & Survey, Liaison (`reportingAuthorityId = COO.id`).
   - **Level 3 (Team Members)**: Team members report to their respective Vertical Head.

3. **Subordinate Privacy Filter Engine (`FR-12`)**:
   - Recursive SQL query on `reportingAuthorityId` tree calculates all direct and indirect subordinates for any Vertical Head.
   - Automatically masks **Restricted Data** fields when fetched by a Vertical Head viewing their team.

---

## 🖼️ Visual ER Diagram

![Employee Module & Authentication ER Diagram](/home/mbibinbabu/.gemini/antigravity/brain/8cd066fd-bd71-44e5-9a35-dfe6819792ad/employee_auth_er_diagram_1791174793193.png)

---

## 🗺️ Interactive Mermaid ER Diagram

```mermaid
erDiagram
    User ||--o| PasswordHistory : "has histories"
    User ||--o| PasswordResetRequest : "raises / actions"
    User ||--o| AuthActivityLog : "logs activity"
    User ||--o| Employee : "linked to"

    Employee ||--o| EmployeePersonalDetail : "has personal identity"
    Employee ||--o| EmployeeCommunicationDetail : "has communication info"
    Employee ||--o{ EmergencyContact : "1 to 3 contacts"
    Employee ||--o| EmployeeDocument : "has identity & org docs"
    Employee ||--o{ EducationalDocument : "cascading edu docs"
    Employee ||--o| EmployeeEmploymentDetail : "has employment details"
    Employee ||--o| EmployeeProbationDetail : "conditional probation"
    Employee ||--o| EmployeeFinancialDetail : "has financial info"
    
    Employee ||--o{ VerticalTransferHistory : "tracks vertical moves"
    Employee ||--o{ PromotionHistory : "tracks role promotions"
    Employee ||--o{ PayRevisionHistory : "tracks salary changes"
    Employee ||--o{ AppraisalHistory : "tracks appraisal windows"

    Employee ||--o{ EmployeeChangeRequest : "raises change requests"
    EmployeeChangeRequest ||--o{ ChangeRequestField : "contains requested fields"
    Employee ||--o{ EmployeeFieldHistory : "tracks field versioning"
    Employee ||--o{ EmployeeAuditLog : "tracks immutable audit log"
```
