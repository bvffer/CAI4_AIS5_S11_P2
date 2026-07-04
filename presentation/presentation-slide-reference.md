# Presentation Slide Reference — Customer Data ETL Pipeline

> **Purpose:** This document describes every slide in the 28-slide presentation deck in full detail — layout, text content, color usage, interactive elements, and narrative purpose. Use this as a reference for AI script generation.

---

## Global Design System

| Property | Value |
|---|---|
| Background | `#0D1117` (dark GitHub-like) |
| Primary Text | `#F0F6FC` (ice white) |
| Accent Blue | `#58A6FF` |
| Accent Green | `#3FB950` |
| Accent Amber | `#D29922` |
| Accent Red | `#F85149` |
| Accent Purple | `#BC8CFF` |
| Muted Text | `#8B949E` |
| Cards | `#1C2128` background |
| Card Borders | `rgba(240,246,252,0.1)` |
| Heading Font | Playfair Display (serif) |
| Body Font | Inter (sans-serif) |
| Code Font | JetBrains Mono (monospace) |
| Progress Bar | Fixed top, 3px tall, `#3FB950`, animates width 0–100% |
| Navigation | Arrow keys, 4vw click zones on left/right edges, bottom nav buttons, touch swipe |
| Transitions | Framer Motion horizontal slide (300px offset, 0.35s ease) |

---

## Slide 0 — Title / Hero
**Label:** "Title"

### Layout
Centered single-column on dark background. Three decorative concentric circles (subtle, `rgba(240,246,252,0.04–0.06)`) + three small colored dots (green, amber, blue) as background ornamentation. No cards, no tables.

### Text Content
1. **JetBrains Mono top line** (0.65rem, 0.2em letter-spacing, uppercase, opacity 0.35):
   `CAI4_AIS5_S11_P2 · Customer Data Integration`
2. **Heading** (Playfair Display, 4xl-6xl, bold):
   `Customer Data ETL Pipeline`
3. **Gradient divider line** (64px wide, 2px, green→blue→purple, opacity 0.6)
4. **Subheading** (Inter, base-lg, opacity 0.60, max-width 680px):
   `From fragmented CRM exports to a clean, trusted, analysis-ready PostgreSQL database`
5. **Team names** (opacity 0.40): `Ali · Amin · Aseel · Menna · Habiba`
6. **Stats footer** (JetBrains Mono, 0.65rem, opacity 0.25):
   `10,476 records | 5 pipeline stages | 28 slides`

### Purpose
Opener. Establishes project name, team, and core value proposition.

---

## Slide 1 — Executive Summary
**Label:** "Executive Summary"

### Layout
Standard slide-inner with heading + subheading, then a flow diagram bar, a 2-column grid (Problem | Solution), and a bottom metric strip.

### Text Content
- **Heading:** `One Pipeline, Three Sources, Zero Data Loss`
- **Subheading:** `A Python-based ETL pipeline that consolidates fragmented customer records from a CRM system into a single, clean, trusted PostgreSQL database.`
- **Flow strip** (JetBrains Mono tags with → arrows): `3 CRM Sources → 6 CSVs → Extract → Transform → Validate → Load → Reconcile → 5 Gold Tables`. Each chip has `background: color + 0x15`, `border: color + 0x25`.
- **Problem column** (red dot bullet):
  - Three CRM systems with different formats, conventions, and schemas
  - 317 missing values, 46 duplicate emails, 7 duplicate SKUs
  - Casing chaos, typos, impossible dates, price anomalies
  - No single trusted source for downstream reporting
- **Solution column** (green dot bullet):
  - Medallion architecture: Bronze → Silver → Gold
  - 5-stage pipeline with 6 sequential validation checks
  - Three quality tiers: Clean, Quarantine, Rejected
  - Idempotent, re-runnable with full audit trail
- **Metric strip** (horizontal, border card, 5 items):
  - `10,476` Records Processed (white)
  - `93.3%` Pass Rate (green)
  - `5` Gold Tables (amber)
  - `3` Automated Tests (blue)
  - `707` Flagged Records (amber)

### Purpose
One-slide overview. Answers: what, why, how. Core narrative hook.

---

## Slide 2 — Project at a Glance
**Label:** "Overview"

### Layout
Heading, then a 4-column stat card grid, a pipeline tag strip, a 5-column metrics row, and a bottom footer.

### Text Content
- **Heading:** `Project at a Glance`
- **Subheading:** `Key metrics that define the scope and scale of this ETL pipeline.`
- **4 stat cards** (icon + number + label + description):
  1. `6` Source Files — CSV files from 3 CRM systems (blue)
  2. `5` Pipeline Stages — E → T → V → L → R (purple)
  3. `3` Quality Tiers — Clean / Quarantine / Rejected (amber)
  4. `5` Gold Tables — PostgreSQL + etl_batch audit (green)
- **Pipeline tag strip** (same chip style): `Extract → Transform → Validate → Load → Reconcile`
- **5-column metrics row** (small dark cards with `Playfair Display` numbers):
  - `10,476` Raw Records
  - `9,769` Clean Loaded (green)
  - `607` Quarantined (amber)
  - `100` Rejected (red)
  - `93.3%` Pass Rate (green)
- **Footer** (JetBrains Mono, opacity 0.30): `3 source systems | 6 validation checks | 3 automated tests | 11 wiki pages`

### Purpose
Quick-reference infographic. Establishes scale and key numbers upfront.

---

## Slide 3 — Tech Stack
**Label:** "Technology"

### Layout
Heading, then a technology table, an architecture flow bar, and a 3-column capability row.

### Text Content
- **Heading:** `Tech Stack`
- **Subheading:** `The tools and technologies powering the ETL pipeline.`
- **Table** (columns: Technology | Purpose | Key Contribution | Details):
  - `Python 3.x` (blue) — ETL Engine — Core pipeline logic — Pandas, pathlib, json, datetime
  - `Pandas` (green) — Transformation — Data cleaning & validation — DataFrames, type inference, bulk export
  - `PostgreSQL` (amber) — Storage — Gold layer database — 5 gold tables, views, stored procedures
  - `psycopg2` (amber) — Connectivity — Bulk loading & upserts — COPY command, transaction-safe upserts
  - `pytest` (green) — Testing — Pipeline correctness — Row-count invariant, stale-file detection
  - `Git / GitHub` (purple) — Version Control — Collaboration & docs — Wiki (11 pages), PR templates, issues
- **Architecture flow bar:** `CSV Sources → Python/Pandas → Validation Layer → PostgreSQL → Reporting Views`
- **3 capability cards** (small, icon-free, colored dot + text):
  - `Idempotent` (green) — Safe to re-run. Staging truncated before each load.
  - `Traceable` (blue) — Every run logged in etl_batch with timestamps.
  - `Zero Data Loss` (amber) — Row-count invariant: C + Q + R = Raw, every run.

### Purpose
Establishes technical credibility. Shows the tool choices and why each matters.

---

## Slide 4 — The Problem — Sources & Quality
**Label:** "Problem Statement"

### Layout
Heading + subheading + 4-column stat row + 5-column entity table + 2 terminal panels side-by-side + impact callout bar.

### Text Content
- **Heading:** `Three Systems, Thousands of Inconsistencies`
- **Subheading:** `Customer data from three CRM exports — each with unique errors and gaps.`
- **4 stat boxes:**
  - `3` Source Systems — CRM A, B, C (white)
  - `46` Duplicate Emails — Across contacts + customers (red)
  - `7` Duplicate SKUs — In products catalog (amber)
  - `317` Missing Values — NULLs across all entities (amber)
- **Entity table** (columns: Entity | Rows | Unique PKs | Source | Key Issues):
  - contacts — 1,661 — 1,661 — CRM A — Casing, emails, phone formats
  - customers — 1,618 — 1,618 — CRM B — 46 dup. emails, status typos
  - products — 764 — 757 — CRM A — 7 dup. SKUs, category typos
  - sales_orders — 2,770 — 2,770 — CRM C — Impossible dates, status variants
  - order_lines — 3,663 — 3,663 — CRM C — Price anomalies, quantity outliers
- **Terminal panel 1 (casing & typos):** Simulated terminal with red/yellow/green dots. Shows raw text examples:
  `'B2B' vs 'b2b' vs '  B2B' vs '\tB2B\t'` / `'Active' vs 'active' vs 'ACTIVE'` / `'grcoeries' 'mobile-accessoreis'` / `'Marekting' 'Pendign' 'Pneding'`
- **Terminal panel 2 (dates & prices):** Shows:
  `'2026-13-45' '2206-04-29'` / `$0.79 -> $87,250.98 (price)` / `1 -> 99,175 (qty)` / `317 missing / 46 dup emails / 7 dup SKUs`
- **Impact callout** (red border, red text highlight):
  `Impact: Every downstream report inherits these errors. CRM B alone contributes 46 duplicate emails that break analytical joins. Pipeline must detect, quarantine, and report every issue.`

### Purpose
Builds the "why this matters" case. Concrete examples of bad data make the problem tangible.

---

## Slide 5 — Architecture Decision Records
**Label:** "Decisions"

### Layout
2-column grid of 5 decision cards (first 4 in 2×2, 5th spans both columns).

### Text Content
- **Heading:** `Architecture Decision Records`
- **Subheading:** `Key engineering choices that shaped the pipeline design.`
- **Decision 1 — Why Medallion?** (blue, #1): Three-tier (Bronze/Silver/Gold) preserves raw source of truth while providing clean analysis data. Decouples storage from transformation. _Alternative: Single-table ELT (rejected — no audit trail)_
- **Decision 2 — Cascade Validation** (green, #2): Six sequential checks with cascade quarantine ensure duplicate emails/SKUs quarantine all related records, not just the duplicate. _Alternative: Per-record independent checks (rejected — loses relational context)_
- **Decision 3 — COPY over INSERT** (amber, #3): PostgreSQL bulk COPY command loads clean CSVs into staging tables in seconds rather than row-by-row INSERT for 10K+ records. _Alternative: Row-by-row INSERT (rejected — 10× slower at this scale)_
- **Decision 4 — Python over Spark** (purple, #4): At 10K records, Pandas in Python is fast, simple, and dependency-free. Spark would add 2GB+ of overhead for no performance gain. _Alternative: PySpark (rejected — overkill for this data volume)_
- **Decision 5 — Staging + Upsert for Idempotency** (red, #5, full width): Truncate staging → COPY → stored procedure upsert guarantees safe re-runs. No duplicate rows, no data loss, every run is independent. _Alternative: INSERT-only (rejected — duplicate rows on re-run); MERGE (rejected — slower than truncate+COPY)_

### Purpose
Shows engineering rigor. Demonstrates that each design choice was deliberate with alternatives considered.

---

## Slide 6 — Data Volume Snapshot
**Label:** "Data Profile"

### Layout
Table + per-entity stacked horizontal bars + overall stacked bar with legend.

### Text Content
- **Heading:** `Data Volume Snapshot`
- **Subheading:** `Pre-processing row counts per entity and data quality classification.`
- **Table** (columns: Entity | Raw Rows | Clean (green) | Quarantine (amber) | Rejected (red) | Pass Rate):
  - contacts — 1,661 — 1,586 — 63 — 12 — 95.5%
  - customers — 1,618 — 1,539 — 71 — 8 — 95.1%
  - products — 764 — 757 — 7 — 0 — 99.1%
  - sales_orders — 2,770 — 2,630 — 112 — 28 — 94.9%
  - order_lines — 3,663 — 3,257 — 354 — 52 — 88.9%
  - **Total** — **10,476** — **9,769** — **607** — **100** — **93.3%** (bold row, thicker top border)
- **Per-entity bars:** Horizontal stacked bars (green/amber/red segments) per entity, entity name on left, raw count on right. JetBrains Mono labels.
- **Overall bar:** Full-width stacked bar showing 93.3% green, 5.8% amber, 0.9% red.
- **Legend:** 3 colored dots — Clean 93.3% / Quarantine 5.8% / Rejected 0.9%

### Purpose
Quantifies exactly what the pipeline produced. The table + bars give both precise numbers and visual intuition of data quality.

---

## Slide 7 — Medallion Architecture
**Label:** "Architecture"

### Layout
Three medallion cards in a horizontal row (Bronze ← → Silver ← → Gold) with ChevronRight arrows, then a 3-column benefit row.

### Text Content
- **Heading:** `Medallion Architecture`
- **Subheading:** `A three-tier data lakehouse pattern — raw data flows through Bronze, Silver, and Gold layers.`
- **Bronze card** (grey gradient background):
  - Layer 1 | **Bronze** | `data/raw/`
  - Untouched source CSVs. Six files from three CRM systems. Never modified.
  - Bullets: 10,476 raw records / contacts, customers, products, sales_orders, order_lines, etl_batch / Preserved exactly as downloaded
- **Silver card** (dark gradient background):
  - Layer 2 | **Silver** | `Python ETL`
  - Cleaning, validation, and normalization. Casing standardization, typo correction, date parsing, FK integrity checks.
  - Bullets: 6 validation checks applied sequentially / 3 output tiers / Cascade quarantine for email/SKU duplicates
- **Gold card** (green gradient background):
  - Layer 3 | **Gold** | `data/clean/ + PostgreSQL`
  - Analysis-ready tables. Five gold tables plus etl_batch audit log.
  - Bullets: 9,769 clean records loaded (93.3%) / Staging → Gold upsert via stored procedures / Full audit trail
- **3 benefit cards** (icon + text):
  - ScanSearch `Traceable` — Every run logged in etl_batch
  - RotateCcw `Idempotent` — Safe re-runs, staging truncated
  - ShieldCheck `Safe` — Bad data quarantined, never silently loaded

### Purpose
Explains the core architectural pattern. Each card is color-coded to its tier.

---

## Slide 8 — High-Level Architecture
**Label:** "Architecture"

### Layout
Full-view SVG diagram. Dark background with gradient-box rectangles and arrow lines showing the end-to-end flow.

### SVG Content (viewBox 0 0 900 380)
- **Row 1** — `CRM Sources` (box, white border) → arrow → `Extract` (blue border) → arrow → `data/raw/` (grey border)
- Arrow down → `Transform` (white border) → arrow → `data/clean/` (green border)
- Dotted box above clean: `Automated Tests` (amber dashed) with dashed arrow connecting down
- Arrow down → `Validate` (amber border)
- Horizontal branch line splits 3 ways: `Pass` (green, left) / `Fail` (amber, center) / `Reject` (red, right)
- Arrows down to 3 boxes: `Clean Data` (green bg) / `Quarantine` (amber bg) / `Rejected` (red bg)
- Arrow from Clean down → `Load / PostgreSQL` (blue border)
- Bottom text: `Reporting Views & Data Quality Metrics`

### Purpose
Shows the full data flow from sources to gold tables. The SVG is the centerpiece — clean, crisp, and informative.

---

## Slide 9 — Repository Structure Overview
**Label:** "Repository"

### Layout
2-column grid of 6 folder cards. Each card has a monogram icon, folder name, description, file count, and bullet details.

### Text Content
- **Heading:** `Repository Structure Overview`
- **Subheading:** `Top-level folder purposes and contents.`
- **6 folder cards:**
  1. `data/` (grey) — Data lake — 4 subdirs, 23 CSV files. Bullets: raw, clean, quarantine, rejected dirs
  2. `etl/` (blue) — Python ETL — 10 Python files, 2 utils. Bullets: main.py, extract.py through reconcile.py
  3. `scripts/` (amber) — SQL scripts — 5 SQL scripts + schema SVG. Bullets: 01–05 scripts
  4. `tests/` (green) — pytest suite — 3 test files + __init__.py. Bullets: pipeline status, invariant, stale file
  5. `wiki/` (purple) — Documentation — 11 pages, ~2000 lines. Bullets: architecture, pipeline, quality defs
  6. `presentation/` (white) — Deck — 28-slide deck. Bullets: Midnight Executive design, interactive components

### Purpose
Orientation for anyone new to the repo. Each card describes purpose and contents clearly.

---

## Slide 10 — Interactive Tree Explorer
**Label:** "Repository"

### Layout
Full-height VS Code–style file tree with search/filter input at top, expandable/collapsible folders, and a color legend at bottom.

### Interactive Elements
- **Filter input** — type to search/filter files in real time
- **Folders** — click to expand/collapse; initially all expanded
- **File type icons**: Folder (grey), .py (blue), .sql (amber), .md (purple), .csv (green)
- **Annotations** next to key folders: `data/` — "Data lake — raw → clean", `etl/` — "Python pipeline (5 stages)", `scripts/sql/` — "PostgreSQL schema & procedures", `tests/` — "Automated pipeline tests", `wiki/` — "Full project documentation"
- **Legend** at bottom: color dots for each file type
- **Scroll hint** "scroll for more ↓" (animated, bottom center)

### Full tree structure shows:
- `adf/` (empty folder for Azure Data Factory reference)
- `data/` → raw/ (7 CSVs), clean/ (6 CSVs), quarantine/ (5 CSVs), rejected/ (5 CSVs)
- `etl/` → __main__.py, main.py, config.py, extract.py, transform.py, validate.py, load.py, reconcile.py, utils/ (db.py, logger.py), logs/, output/
- `scripts/` → sql/ (schema.svg, scripts/ with 01–05 .sql)
- `tests/` → __init__.py, 3 test files
- `wiki/` → 11 .md files
- `presentation/`, `README.md`, `requirements.txt`, `project_structure.md`

### Purpose
Full repo visualization. Interactive tree lets the viewer explore at their own pace.

---

## Slide 11 — Guided Annotated Tour
**Label:** "Repository"

### Layout
Two-column layout: file tree on left, annotation cards on right.

### Left Column
Interactive FileTree (same as slide 10 but smaller).

### Right Column — Annotation Cards (6 items)
1. **Data Lake (data/)** — "All data in one place. Raw source files live untouched; clean, quarantine, and rejected CSVs are written by the pipeline." — `data/ → raw/ clean/ quarantine/ rejected/`
2. **Python ETL (etl/)** — "The pipeline itself. Five stage modules plus utils, config, and logs." — `etl/ → main.py + stage modules + utils/`
3. **SQL Scripts (scripts/sql/)** — "Five numbered scripts that set up the PostgreSQL schema." — `scripts/sql/scripts/ → 01 through 05 .sql files`
4. **Tests (tests/)** — "Three automated tests that verify pipeline status, row count invariant, and stale file overwrite." — `tests/ → test_pipeline_status.py + invariant + overwrite`
5. **Documentation (wiki/)** — "Eleven markdown pages covering everything from architecture to glossary." — `wiki/ → 11 .md pages`
6. **Quality Tiers (data/ subdirs)** — "Three output quality tiers map to three directories." — `data/clean/ + data/quarantine/ + data/rejected/`

### Purpose
Pairs the file tree with explanatory annotations. Great for live presentation where the presenter walks through each folder.

---

## Slide 12 — Pipeline Flow — 5 Stages
**Label:** "Pipeline"

### Layout
Interactive pipeline: 5 stage nodes in a horizontal row (Extract → Transform → Validate → Load → Reconcile) with click-to-select behavior. Below: detail panel showing selected stage info.

### Interactive Elements
- Click any stage node to select it
- Active stage gets scaled up with shadow; hover effect on all nodes
- **Detail panel** (shown for selected stage):
  - File badge: `etl/{stage_file}.py`
  - Description paragraph
  - Operation list (bullets)
- When Validate is selected, a 3-box output branch appears below: Clean / Quarantine / Rejected

### Stage Data
1. **Extract** (Download icon, blue) — Reads 6 CSVs from data/raw/, validates headers, returns dict of DataFrames
2. **Transform** (Shuffle icon, purple) — Trims whitespace, validates UUIDs, lowercases emails, canonicalizes lookup fields, parses dates and numbers
3. **Validate** (CheckCircle icon, amber) — 6 sequential checks: PK uniqueness, required fields, email uniqueness, SKU uniqueness, email format, FK integrity. Outputs 3 sets of CSVs
4. **Load** (Upload icon, green) — Truncate staging, bulk COPY clean CSVs, upsert to gold via stored procedures, audit to etl_batch
5. **Reconcile** (Scale icon, green) — Verifies clean+quarantine+rejected == raw, staging count == gold count, writes summary JSON and metrics log

### Purpose
The core interactive slide. Lets the presenter click through each stage and explain it in detail.

---

## Slide 13 — Stage Deep Dive: Extract
**Label:** "Pipeline — Stage 1"

### Layout
2-column layout: source files list on left, implementation details on right.

### Left Column — Source Files
6 file cards (filename + row count):
- `contacts.csv` — 1,661 rows
- `customers.csv` — 1,618 rows
- `products.csv` — 764 rows
- `sales_orders.csv` — 2,770 rows
- `order_lines.csv` — 3,663 rows
- `etl_batch.csv` — Metadata

### Right Column — Implementation
- Code snippet (`# etl/extract.py`) showing: `def extract() -> dict[str, pd.DataFrame]:` with the loop reading each file
- 3 green bullet points: validates headers, returns dict of DataFrames, logs row counts

### Purpose
Deep technical dive into the Extract stage.

---

## Slide 14 — Stage Deep Dive: Transform
**Label:** "Pipeline — Stage 2"

### Layout
2-column "Before vs After" layout.

### Left Column — Before (raw, red accent)
6 error chips showing raw data:
- email: `"  ALICE@EXAMPLE.COM  "`
- full_name: `"alice johnson"`
- phone: `"+1 (555) 123-4567"`
- status: `"  Pending"`
- order_date: `"2026-13-45"`
- list_price: `"$1,234.56"`

### Right Column — After (transformed, green accent)
6 fixed chips showing cleaned data:
- email: `"alice@example.com"`
- full_name: `"Alice Johnson"`
- phone: `"+15551234567"`
- status: `"pending"`
- order_date: `"2026-01-15"`
- list_price: `1234.56`

### Purpose
Concrete before/after makes the transformation stage tangible. The red→green visual communicates cleaning impact.

---

## Slide 15 — Stage Deep Dive: Validate
**Label:** "Pipeline — Stage 3"

### Layout
Top: 2-item legend (Pass green / Fail amber), then HorizontalCascade component showing 6 checks, then output result.

### HorizontalCascade (6 checks in a row with connecting arrows)
1. PK Uniqueness → Quarantine
2. Required Fields → Quarantine
3. Email Uniqueness → Cascade Quarantine
4. SKU Uniqueness → Cascade Quarantine
5. Email Format → Quarantine
6. FK Integrity → Quarantine

### Bottom
`ValidationResult → Clean / Quarantine / Rejected` (bold pill)

### Purpose
Shows the cascade validation logic. The "Cascade Quarantine" cases are unique — they quarantine ALL related records when a duplicate is found.

---

## Slide 16 — Stage Deep Dive: Load
**Label:** "Pipeline — Stage 4"

### Layout
2-column: load process steps on left, load order on right.

### Left Column — Load Process (4 steps)
1. Truncate Staging — Clear all stg_* tables
2. Bulk COPY — Load clean CSVs via psycopg2 COPY
3. Upsert to Gold — INSERT new / UPDATE existing / DELETE conflicts
4. Audit — Record run in etl_batch

### Right Column — Load Order
Code-style ordered list showing FK dependency order:
- `contact` (no FK deps)
- `product` (no FK deps)
- `customer` (FK → contact)
- `sales_order` (FK → customer)
- `order_line` (FK → sales_order + product)
- Footer: Stored procedures defined in `04_load_procedures.sql`

### Purpose
Explains the 4-step load process and why table load order matters (FK constraints).

---

## Slide 17 — Stage Deep Dive: Reconcile
**Label:** "Pipeline — Stage 5"

### Layout
Invariant equation (centered), DB check badge, italic proof statement, gold table row count table.

### Content
- **Invariant equation** (colored terms):
  `len(clean) (green) + len(quarantine) (amber) + len(rejected) (red) = len(raw) (white)`
- **DB check badge** (green checkmark): `PostgreSQL: staging row count == gold row count`
- **Proof text** (italic, centered): "Together these checks prove zero data loss on every single pipeline run."
- **Gold table row counts table:**
  - etl_batch — 2
  - contact — 1,586
  - customer — 1,539
  - product — 757
  - sales_order — 2,630
  - order_line — 3,257

### Purpose
Closes the pipeline explanation with the proof that every record is accounted for.

---

## Slide 18 — Three-Tier Quality Classification
**Label:** "Data Quality"

### Layout
3 tier cards in a row, then a destination table, then the invariant equation.

### 3 Tier Cards
1. **Rejected** (red, XCircle icon):
   - Missing PK or mandatory field, corrupted beyond repair
   - Path: `data/rejected/ → Fix at source`
   - Counts: contacts 12 | customers 8 | sales_orders 28 | order_lines 52

2. **Quarantine** (amber, AlertTriangle icon):
   - Valid PK but fails quality check. Recoverable through manual review.
   - Path: `data/quarantine/ → Manual review`
   - Counts: contacts 63 | customers 71 | products 7 | sales_orders 112 | order_lines 354

3. **Clean** (green, CheckCircle2 icon):
   - Passed all constraints. Ready for PostgreSQL gold tables.
   - Path: `data/clean/ → PostgreSQL`
   - Counts: contacts 1,586 | customers 1,539 | products 757 | sales_orders 2,630 | order_lines 3,257

### Destination Table
| Tier | Output Dir | Loadable? | Files | Action | % of Total |
|---|---|---|---|---|---|
| **Clean** (green) | data/clean/ | ✓ | 6 | Loaded to PostgreSQL gold tables | 93.3% |
| **Quarantine** (amber) | data/quarantine/ | ✗ | 5 | Held for manual review | 5.8% |
| **Rejected** (red) | data/rejected/ | ✗ | 5 | Fix at source system | 0.9% |

### Invariant Equation (centered footer)
`9,769 Clean + 607 Quarantine + 100 Rejected = 10,476 Total`

### Purpose
Defines the three-tier system precisely. Every record falls into exactly one tier, and the invariant proves completeness.

---

## Slide 19 — Entity Relationship Diagram
**Label:** "Database Design"

### Layout
Full-view SVG ERD showing 5 gold tables with FK arrows between them.

### SVG Content (viewBox 0 0 820 400)
- **contact** (blue border, top-left): PK id (UUID), email, full_name, phone, department, created_at
- → FK arrow → **customer** (green border, top-center): PK id (UUID), FK contact_id, segment, status
- → FK arrow → **sales_order** (amber border, top-right): PK id (UUID), FK customer_id, order_date, status
- **product** (red border, bottom-left): PK sku (varchar), name, category, list_price, quantity
- → FK arrow → **order_line** (purple border, bottom-right): PK id (UUID), FK sales_order_id, FK product_sku
- FK arrow from sales_order down to order_line
- **Legend box** at bottom: FK = Foreign Key (amber dot), PK = Primary Key (blue dot), "Tables: 5 Gold + 5 Staging + 1 Audit (etl_batch)"

### Purpose
Visual database schema reference. FK chain flows left-to-right, top-to-bottom.

---

## Slide 20 — Database Schema & SQL Scripts
**Label:** "Database"

### Layout
2-column layout: SQL scripts list on left, gold tables summary on right + load strategy callout.

### Left Column — SQL Scripts (5 numbered cards)
1. **01 — Enterprise Data Model** — `01_enterprise_data_model_mysql.sql` — Entity relationships and constraints
2. **02 — Create Tables** — `02_create_tables.sql` — 5 gold + 5 staging + etl_batch
3. **03 — Create Views** — `03_create_views.sql` — Reporting views and metrics
4. **04 — Load Procedures** — `04_load_procedures.sql` — Staging → gold upsert logic
5. **05 — Validation Queries** — `05_validation_queries.sql` — Post-run quality checks

### Right Column — Gold Tables
| Table | Type | Rows | Purpose |
|---|---|---|---|
| contact | Gold | 1,586 | Clean contact records |
| customer | Gold | 1,539 | Clean customer accounts |
| product | Gold | 757 | Clean product catalog |
| sales_order | Gold | 2,630 | Clean order headers |
| order_line | Gold | 3,257 | Clean line items |
| stg_* | Staging | — | Truncated each run |
| etl_batch | Audit | 2+ | Run metadata |

**Load strategy callout** (green border): "Bulk COPY → staging, then stored procedures upsert to gold. Staging truncated before each run for idempotency."

### Purpose
Reference for the database layer. Shows scripts must be run in order on first setup.

---

## Slide 21 — Results & Quality Comparison
**Label:** "Results"

### Layout
2-column layout: Row Count Reconciliation on left, Before vs After Quality Impact on right. Invariant equation footer.

### Left — Row Count Reconciliation
| Entity | Raw | Clean | Gold | Status |
|---|---|---|---|---|
| contacts | 1,661 | 1,586 | 1,586 | ✓ |
| customers | 1,618 | 1,539 | 1,539 | ✓ |
| products | 764 | 757 | 757 | ✓ |
| sales_orders | 2,770 | 2,630 | 2,630 | ✓ |
| order_lines | 3,663 | 3,257 | 3,257 | ✓ |
| **Total** | **10,476** | **9,769** | **9,769** | ✓ |

Stacked bar + "93.3% pass" label.

### Right — Before vs After Quality Impact
| Entity | Raw Issues | Issue Type | Clean Rows | Improvement |
|---|---|---|---|---|
| contacts | 75 flagged | Casing, emails, phone | 1,586 | 95.5% clean |
| customers | 79 flagged | 46 dup emails, typos | 1,539 | 95.1% clean |
| products | 7 flagged | 7 dup SKUs, categories | 757 | 99.1% clean |
| sales_orders | 140 flagged | Dates, status variants | 2,630 | 94.9% clean |
| order_lines | 406 flagged | Prices, qty outliers | 3,257 | 88.9% clean |
| **Total** | **707 flagged** | All categories | **9,769** | **93.3% clean** |

Legend: Clean / Quarantine / Rejected colored dots.

### Footer
`len(clean) (green) + len(quarantine) (amber) + len(rejected) (red) = len(raw) (white)` equation.

### Purpose
The results slide. Proves every entity's clean count matches gold count, and shows before/after quality improvement.

---

## Slide 22 — Module Dependency Graph
**Label:** "Architecture"

### Layout
Vertical dependency graph showing modules arranged top-to-bottom with arrows between layers. Text descriptions to the right of each row.

### Graph Layers (top to bottom)
1. `__main__.py` → "Entry point — delegates to main.py"
2. `main.py` → "Orchestrator — calls stages in sequence"
3. 6 stage boxes in a row (each with description below):
   - `extract.py` — Read CSVs
   - `transform.py` — Clean data
   - `validate.py` — Check quality
   - `load.py` — Write to DB
   - `reconcile.py` — Verify counts
   - `config.py` — Paths & constants
4. `utils/logger.py` + `utils/db.py` → "Shared utilities"
5. `psycopg2` → "External — PostgreSQL adapter"

### Legend
Colored squares: Entry (dark), Orchestrator (white), Stage (bordered), Utility (semi-transparent), External (amber)

### Purpose
Shows clean module separation. No circular dependencies. Each module has single responsibility.

---

## Slide 23 — Testing & Reliability
**Label:** "Reliability"

### Layout
3-column grid of test cards. Each card has icon, filename, description, and checkmarks.

### 3 Test Cards
1. **test_pipeline_status.py** (blue, CheckCircle):
   - Verifies each stage completes successfully with expected status code
   - ✓ ETL exit code == 0 / ✓ No unhandled exceptions / ✓ All stages report completion

2. **test_row_count_invariant.py** (green, Scale):
   - Validates: len(clean) + len(quarantine) + len(rejected) == len(raw)
   - ✓ Row count equation holds / ✓ Per-entity precision / ✓ Zero data loss guarantee

3. **test_stale_file_overwrite.py** (amber, RotateCcw):
   - Ensures re-running overwrites previous output rather than appending
   - ✓ File timestamps update / ✓ No duplicate rows / ✓ Idempotent re-runs

### Footer
`tests/ — 3 files · pytest · Run after every pipeline execution`

### Purpose
Shows the automated testing strategy. Tests cover correctness, data integrity, and idempotency.

---

## Slide 24 — Project Timeline
**Label:** "Planning"

### Layout
Top: 4-step timeline (connected circles with connecting line). Bottom: 4-column detail cards.

### Timeline Steps
1. **W1 — Exploration & Architecture** — Source discovery, data profiling, architecture design
2. **W2 — Pipeline Implementation** — ETL development, initial runs, transform rules
3. **W3 — Validation Hardening** — Quality checks, testing, edge case handling
4. **W4 — Documentation & Presentation** — Wiki completion, slide deck, final review

### Detail Cards
1. **Week 1** — Data profiling, architecture design, initial wiki pages — _All team members_
2. **Week 2** — Core ETL pipeline, transform rules, first successful run — _Ali (lead), Amin (extract/load)_
3. **Week 3** — Validation logic, automated tests, edge case handling — _Aseel (quality), Menna (SQL)_
4. **Week 4** — Full documentation, presentation, final review — _Habiba (docs), all (review)_

### Purpose
Shows the 4-week project plan. Each week has clear deliverables and team assignments.

---

## Slide 25 — Team Roles
**Label:** "Team"

### Layout
5-column grid of team member cards, each with a top border in their color, avatar icon, name, role, focus area, and artifact bullets.

### Team Members
1. **Ali** (blue, Compass icon) — Project Lead — Architecture & Transform — ETL main.py orchestration, transform.py cleaning rules, architecture decisions, project coordination
2. **Amin** (amber, Download icon) — Data Engineer — Extract & Load — extract.py source reader, load.py PostgreSQL loader, CSV profiling & schema, bulk COPY procedures
3. **Aseel** (green, ShieldCheck icon) — Quality Lead — Validation & Testing — validate.py 6-check cascade, 3 automated pytest files, row-count invariant, quarantine logic
4. **Menna** (purple, Database icon) — Data Modeler — SQL & Reporting — 5 SQL schema scripts, gold table design, reporting views, stored procedures
5. **Habiba** (amber, BookOpen icon) — Doc Lead — Documentation & BI — 11 wiki pages, Glossary & Team-Roles, Data-Randomness-Report, presentation design

### Purpose
Acknowledges individual contributions. Each card has a unique color-coded border.

---

## Slide 26 — Documentation — The Wiki
**Label:** "Documentation"

### Layout
4-column grid of 11 doc cards (2 rows: first row of 4, second row of 4, third row of 3). Each card has icon, filename, description, and sections.

### Wiki Pages
1. **Home.md** (FileText) — Project overview, quick-start — sections: Overview, Goals, Quick Start
2. **Run-Guide.md** (Play) — Step-by-step execution — sections: Prerequisites, Setup, Run, Troubleshoot
3. **Project-Architecture.md** (Blocks) — Medallion architecture — sections: Layers, Modules, Data Flow
4. **Data-Sources.md** (HardDrive) — Source descriptions — sections: 3 CRMs, 6 entities, Column defs
5. **Data-Randomness-Report.md** (BarChart3) — Quality issue stats — sections: Casing, Typos, Dates, Prices
6. **ETL-Pipeline.md** (GitBranch) — Pipeline stage docs — sections: 5 stages, Inputs/Outputs
7. **Transformation-Rules.md** (Wand2) — Every cleaning rule — sections: Trim, Normalize, Parse, Validate
8. **Data-Quality-Definitions.md** (ShieldCheck) — Tier definitions — sections: Tiers, Rules, Destinations
9. **Glossary.md** (BookOpen) — Term definitions — sections: ETL, Medallion, PK/FK, Stages
10. **Team-Roles.md** (Users) — Team responsibilities — sections: 5 members, Areas, Artifacts
11. **project_flow.md** (FileText) — Planning flow — sections: 4 weeks, Milestones, Deliverables

### Purpose
Shows the breadth and depth of project documentation. 11 pages covering every aspect.

---

## Slide 27 — Closing & Roadmap
**Label:** (None — final slide)

### Layout
Centered layout with decorative circles (same as hero). Three takeaway cards, four roadmap cards, "Thank you" heading, team names.

### Key Takeaways (3 cards, row)
1. **Zero data loss** proven by row-count invariant (green, ShieldCheck)
2. **Idempotent pipeline** — safe to re-run anytime (blue, RotateCcw)
3. **707 records** quarantined/rejected, never silently loaded (amber, CheckCircle2)

### Roadmap (4 cards, row)
1. **Incremental Loads** — Replace full refresh with CDC-based incremental extraction for daily delta runs (blue)
2. **Monitoring Dashboard** — Grafana dashboard for pipeline health, run metrics, quality trends (green)
3. **CI/CD Integration** — GitHub Actions to auto-run tests on PR, deploy schema changes, trigger pipelines (amber)
4. **Schema Evolution** — Versioned schema migration scripts for source system column changes (purple)

### Thank You Section
- `Thank you` (Playfair Display, 3xl, italic, white/90)
- Gradient divider (green→blue→purple, opacity 0.50)
- Team names: `Ali · Amin · Aseel · Menna · Habiba` (opacity 0.55)

### Purpose
Closes the presentation. Summarizes 3 key achievements and lays out 4 future directions.

---

## Slide Array Index Reference

| Index | Label | Slide Function |
|-------|-------|----------------|
| 0 | Title | Hero |
| 1 | Executive Summary | Problem/Solution summary |
| 2 | Project at a Glance | Metrics dashboard |
| 3 | Tech Stack | Technology table |
| 4 | The Problem — Sources & Quality | Entity table + terminal panels |
| 5 | Architecture Decision Records | 5 ADRs |
| 6 | Data Volume Snapshot | Table + stacked bars |
| 7 | Medallion Architecture | 3-tier cards |
| 8 | High-Level Architecture | SVG flow diagram |
| 9 | Repository Structure Overview | 6 folder cards |
| 10 | Interactive Tree Explorer | Full interactive file tree |
| 11 | Guided Annotated Tour | Tree + annotation cards |
| 12 | Pipeline Flow — 5 Stages | Interactive pipeline |
| 13 | Stage Deep Dive — Extract | Before/after + code |
| 14 | Stage Deep Dive — Transform | Before/after chips |
| 15 | Stage Deep Dive — Validate | Cascade component |
| 16 | Stage Deep Dive — Load | Steps + load order |
| 17 | Stage Deep Dive — Reconcile | Invariant equation |
| 18 | Three-Tier Quality Classification | Tier cards + table |
| 19 | Entity Relationship Diagram | SVG ERD |
| 20 | Database Schema & SQL Scripts | Scripts + gold tables |
| 21 | Results & Quality Comparison | Row counts + before/after |
| 22 | Module Dependency Graph | Vertical dep graph |
| 23 | Testing & Reliability | 3 test cards |
| 24 | Project Timeline | Timeline + detail cards |
| 25 | Team Roles | 5 member cards |
| 26 | Documentation — The Wiki | 11 doc cards |
| 27 | Closing & Roadmap | Takeaways + roadmap + thank you |

---

## Design Notes for Script Generation

**Tone:** Professional, confident, slightly technical. Avoid excessive cheerleading. Let the numbers speak.

**Key themes to emphasize across slides:**
- Idempotency (safe re-runs)
- Zero data loss (row-count invariant)
- Three-tier quality (Clean/Quarantine/Rejected)
- Medallion architecture (Bronze/Silver/Gold)
- Cascade quarantine (duplicate-related records quarantined together)

**When reading table data aloud:** Round to reasonable numbers. E.g., "over 10,000 records" instead of exactly 10,476. But be precise when making specific claims.

**Interactive slides (10, 11, 12):** In script, describe the elements available for viewer exploration rather than reading content verbatim.

**SVG slides (8, 19):** Describe the flow visually. For slide 8, trace the data path with hand gestures. For slide 19, follow the FK chain left-to-right.

**Color cues:** The three-tier colors (green=Clean, amber=Quarantine, red=Rejected) are consistent throughout — use them as visual anchors.
