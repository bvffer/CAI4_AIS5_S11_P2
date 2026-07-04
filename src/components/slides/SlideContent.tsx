'use client'

import { FileTree } from './FileTree'
import { AnnotatedTour } from './AnnotatedTour'
import { HorizontalCascade } from './HorizontalCascade'
import { MotionSlide } from './MotionSlide'
import {
  Database, FileText, GitBranch, Layers, ShieldCheck, Download,
  Shuffle, CheckCircle, Upload, Scale, ChevronRight, XCircle,
  AlertTriangle, CheckCircle2, Compass, BookOpen, HardDrive,
  BarChart3, Wand2, Users, Play, Blocks, ScanSearch, RotateCcw,
  FolderTree, FileCode, FileSpreadsheet, Grid3x3,
} from 'lucide-react'

const treeData = [
  { name: 'adf/', type: 'folder', children: [
    { name: 'datasets/', type: 'folder', children: [] },
    { name: 'linked_services/', type: 'folder', children: [] },
    { name: 'pipelines/', type: 'folder', children: [] }
  ]},
  { name: 'data/', type: 'folder', annotation: 'Data lake — raw → clean', children: [
    { name: 'raw/', type: 'folder', annotation: 'Untouched source of truth', children: [
      { name: 'contacts.csv', type: 'csv' },
      { name: 'customers.csv', type: 'csv' },
      { name: 'etl_batch.csv', type: 'csv' },
      { name: 'ITC CRM_dataset_combined.csv', type: 'csv' },
      { name: 'order_lines.csv', type: 'csv' },
      { name: 'products.csv', type: 'csv' },
      { name: 'sales_orders.csv', type: 'csv' }
    ]},
    { name: 'clean/', type: 'folder', children: [
      { name: 'contacts.csv', type: 'csv' },
      { name: 'customers.csv', type: 'csv' },
      { name: 'etl_batch.csv', type: 'csv' },
      { name: 'order_lines.csv', type: 'csv' },
      { name: 'products.csv', type: 'csv' },
      { name: 'sales_orders.csv', type: 'csv' }
    ]},
    { name: 'quarantine/', type: 'folder', children: [
      { name: 'contacts.csv', type: 'csv' },
      { name: 'customers.csv', type: 'csv' },
      { name: 'order_lines.csv', type: 'csv' },
      { name: 'products.csv', type: 'csv' },
      { name: 'sales_orders.csv', type: 'csv' }
    ]},
    { name: 'rejected/', type: 'folder', children: [
      { name: 'contacts.csv', type: 'csv' },
      { name: 'customers.csv', type: 'csv' },
      { name: 'order_lines.csv', type: 'csv' },
      { name: 'products.csv', type: 'csv' },
      { name: 'sales_orders.csv', type: 'csv' }
    ]}
  ]},
  { name: 'etl/', type: 'folder', annotation: 'Python pipeline (5 stages)', children: [
    { name: '__main__.py', type: 'py' },
    { name: 'main.py', type: 'py' },
    { name: 'config.py', type: 'py' },
    { name: 'extract.py', type: 'py' },
    { name: 'transform.py', type: 'py' },
    { name: 'validate.py', type: 'py' },
    { name: 'load.py', type: 'py' },
    { name: 'reconcile.py', type: 'py' },
    { name: 'utils/', type: 'folder', children: [
      { name: 'db.py', type: 'py' },
      { name: 'logger.py', type: 'py' }
    ]},
    { name: 'logs/', type: 'folder', children: [] },
    { name: 'output/', type: 'folder', children: [] }
  ]},
  { name: 'scripts/', type: 'folder', children: [
    { name: 'sql/', type: 'folder', annotation: 'PostgreSQL schema & procedures', children: [
      { name: 'schema.svg', type: 'other' },
      { name: 'scripts/', type: 'folder', children: [
        { name: '01_enterprise_data_model_mysql.sql', type: 'sql' },
        { name: '02_create_tables.sql', type: 'sql' },
        { name: '03_create_views.sql', type: 'sql' },
        { name: '04_load_procedures.sql', type: 'sql' },
        { name: '05_validation_queries.sql', type: 'sql' }
      ]}
    ]}
  ]},
  { name: 'tests/', type: 'folder', annotation: 'Automated pipeline tests', children: [
    { name: '__init__.py', type: 'py' },
    { name: 'test_pipeline_status.py', type: 'py' },
    { name: 'test_row_count_invariant.py', type: 'py' },
    { name: 'test_stale_file_overwrite.py', type: 'py' }
  ]},
  { name: 'wiki/', type: 'folder', annotation: 'Full project documentation', children: [
    { name: 'Home.md', type: 'md' },
    { name: 'Run-Guide.md', type: 'md' },
    { name: 'Data-Sources.md', type: 'md' },
    { name: 'Data-Randomness-Report.md', type: 'md' },
    { name: 'Project-Architecture.md', type: 'md' },
    { name: 'ETL-Pipeline.md', type: 'md' },
    { name: 'Transformation-Rules.md', type: 'md' },
    { name: 'Data-Quality-Definitions.md', type: 'md' },
    { name: 'Glossary.md', type: 'md' },
    { name: 'Team-Roles.md', type: 'md' },
    { name: 'project_flow.md', type: 'md' }
  ]},
  { name: 'presentation/', type: 'folder', children: [] },
  { name: 'README.md', type: 'md' },
  { name: 'requirements.txt', type: 'other' },
  { name: 'project_structure.md', type: 'md' }
]

const slideLabels = [
  'Title', 'Executive Summary', 'Project at a Glance', 'Tech Stack',
  'The Problem — Sources & Quality',
  'Data Volume Snapshot', 'Medallion Architecture',
  'Architecture Decision Records',
  'High-Level Architecture', 'Repository Overview',
  'Interactive Tree + Annotated Tour',
  'Pipeline Flow — 5 Stages', 'Stage Deep Dive — Extract',
  'Stage Deep Dive — Transform', 'Stage Deep Dive — Validate',
  'Stage Deep Dive — Load', 'Stage Deep Dive — Reconcile',
  'Three-Tier Quality Classification',
  'Entity Relationship Diagram',
  'Database Schema & SQL Scripts', 'Results & Quality Comparison',
  'Module Dependency Graph', 'Testing & Reliability',
  'Project Timeline', 'Team Roles',
  'Documentation — The Wiki', 'Closing & Roadmap'
]

interface SlideContentProps {
  index: number
}

export function SlideContent({ index }: SlideContentProps) {
  const slides: (() => React.ReactNode)[] = [
    // Slide 0: Hero
    () => (
      <div className="slide-inner items-center justify-center text-center" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background circles */}
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(240,246,252,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(240,246,252,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '8%', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(63,185,80,0.4)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '12%', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(210,153,34,0.4)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '25%', left: '15%', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(88,166,255,0.3)', pointerEvents: 'none' }} />

        <div className="max-w-3xl" style={{ position: 'relative', zIndex: 1 }}>
          <div className="font-['JetBrains_Mono'] text-[0.65rem] tracking-[0.2em] uppercase text-[#F0F6FC] opacity-35 mb-4">
            CAI4_AIS5_S11_P2 &middot; Customer Data Integration
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-3">
            Customer Data ETL Pipeline
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#3FB950] via-[#58A6FF] to-[#BC8CFF] mx-auto mb-4 opacity-60" />
          <p className="text-base md:text-lg text-[#F0F6FC] opacity-60 max-w-xl mx-auto mb-6 font-light leading-relaxed">
            From fragmented CRM exports to a clean, trusted, analysis-ready PostgreSQL database
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-[#F0F6FC] opacity-40 mb-6">
            <span>Ali</span><span className="w-1 h-1 rounded-full bg-[#F0F6FC] opacity-30" />
            <span>Amin</span><span className="w-1 h-1 rounded-full bg-[#F0F6FC] opacity-30" />
            <span>Aseel</span><span className="w-1 h-1 rounded-full bg-[#F0F6FC] opacity-30" />
            <span>Menna</span><span className="w-1 h-1 rounded-full bg-[#F0F6FC] opacity-30" />
            <span>Habiba</span>
          </div>
          <div className="flex items-center justify-center gap-6 text-[0.65rem] text-[#F0F6FC] opacity-25 font-['JetBrains_Mono']">
            <span>10,476 records</span>
            <span className="w-px h-3 bg-[#F0F6FC] opacity-15" />
            <span>5 pipeline stages</span>
            <span className="w-px h-3 bg-[#F0F6FC] opacity-15" />
            <span>28 slides</span>
          </div>
        </div>
      </div>
    ),

    // Slide 1: Executive Summary
    () => (
      <div className="slide-inner">
        <div className="slide-label">Executive Summary</div>
        <h2 className="slide-heading">One Pipeline, Three Sources, Zero Data Loss</h2>
        <p className="slide-subheading">
          A Python-based ETL pipeline that consolidates fragmented customer records from a CRM system into a single, clean, trusted PostgreSQL database.
        </p>
        {/* Flow diagram */}
        <div className="flex items-center justify-center gap-1.5 mb-2 flex-wrap">
          {[
            { label: '3 CRM Sources', color: '#8B949E' },
            { label: '6 CSVs', color: '#58A6FF' },
            { label: 'Extract', color: '#58A6FF' },
            { label: 'Transform', color: '#BC8CFF' },
            { label: 'Validate', color: '#D29922' },
            { label: 'Load', color: '#3FB950' },
            { label: 'Reconcile', color: '#3FB950' },
            { label: '5 Gold Tables', color: '#3FB950' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-medium" style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}25` }}>
                {s.label}
              </div>
              {i < 7 && <span className="text-[#F0F6FC] opacity-20 text-[9px]">&rarr;</span>}
            </div>
          ))}
        </div>
        {/* 2-column Problem | Solution */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1C2128] rounded-lg p-2.5 text-[#F0F6FC]">
            <h3 className="font-semibold text-xs mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F85149] shrink-0" /> The Problem
            </h3>
            <ul className="space-y-0.5 text-[10px] opacity-80">
              <li className="flex items-start gap-1.5"><span className="text-[#F85149] mt-px shrink-0">&#x2022;</span> Three CRM systems with different formats, conventions, and schemas</li>
              <li className="flex items-start gap-1.5"><span className="text-[#F85149] mt-px shrink-0">&#x2022;</span> 317 missing values, 46 duplicate emails, 7 duplicate SKUs</li>
              <li className="flex items-start gap-1.5"><span className="text-[#F85149] mt-px shrink-0">&#x2022;</span> Casing chaos, typos, impossible dates, price anomalies</li>
              <li className="flex items-start gap-1.5"><span className="text-[#F85149] mt-px shrink-0">&#x2022;</span> No single trusted source for downstream reporting</li>
            </ul>
          </div>
          <div className="bg-[#1C2128] rounded-lg p-2.5 text-[#F0F6FC]">
            <h3 className="font-semibold text-xs mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3FB950] shrink-0" /> The Solution
            </h3>
            <ul className="space-y-0.5 text-[10px] opacity-80">
              <li className="flex items-start gap-1.5"><span className="text-[#3FB950] mt-px shrink-0">&#x2022;</span> Medallion architecture: Bronze (raw) &rarr; Silver (ETL) &rarr; Gold (DB)</li>
              <li className="flex items-start gap-1.5"><span className="text-[#3FB950] mt-px shrink-0">&#x2022;</span> 5-stage pipeline with 6 sequential validation checks</li>
              <li className="flex items-start gap-1.5"><span className="text-[#3FB950] mt-px shrink-0">&#x2022;</span> Three quality tiers: Clean, Quarantine, Rejected</li>
              <li className="flex items-start gap-1.5"><span className="text-[#3FB950] mt-px shrink-0">&#x2022;</span> Idempotent, re-runnable with full audit trail</li>
            </ul>
          </div>
        </div>
        {/* Metric strip */}
        <div className="flex items-center justify-center gap-4 mt-2 py-1.5 rounded-lg bg-[#F0F6FC]/05 border border-[#F0F6FC]/08">
          {[
            { value: '10,476', label: 'Records Processed', color: '#F0F6FC' },
            { value: '93.3%', label: 'Pass Rate', color: '#3FB950' },
            { value: '5', label: 'Gold Tables', color: '#D29922' },
            { value: '3', label: 'Automated Tests', color: '#58A6FF' },
            { value: '707', label: 'Flagged Records', color: '#D29922' },
          ].map((m) => (
            <div key={m.label} className="flex items-baseline gap-1.5">
              <span className="font-['Playfair_Display'] text-sm font-bold" style={{ color: m.color }}>{m.value}</span>
              <span className="text-[9px] text-[#F0F6FC] opacity-40">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),

    // Slide 2: Project at a Glance
    () => (
      <div className="slide-inner">
        <div className="slide-label">Overview</div>
        <h2 className="slide-heading">Project at a Glance</h2>
        <p className="slide-subheading">Key metrics that define the scope and scale of this ETL pipeline.</p>
        {/* Row 1: 4 KPI cards */}
        <div className="grid-4">
          {[
            { icon: FileText, num: '6', label: 'Source Files', desc: 'CSV files from 3 CRM systems', color: '#58A6FF' },
            { icon: GitBranch, num: '5', label: 'Pipeline Stages', desc: 'E → T → V → L → R', color: '#BC8CFF' },
            { icon: Layers, num: '3', label: 'Quality Tiers', desc: 'Clean / Quarantine / Rejected', color: '#D29922' },
            { icon: Database, num: '5', label: 'Gold Tables', desc: 'PostgreSQL + etl_batch audit', color: '#3FB950' },
          ].map((s) => (
            <div key={s.label} className="card stat-card bg-[#1C2128]">
              <div className="stat-icon" style={{ color: s.color }}><s.icon size={18} /></div>
              <div className="stat-number" style={{ color: s.color }}>{s.num}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>
        {/* Row 2: Pipeline visualization */}
        <div className="flex items-center justify-center gap-1 mt-2 py-1.5 rounded-lg bg-[#F0F6FC]/05 border border-[#F0F6FC]/08">
          <span className="text-[9px] text-[#F0F6FC] opacity-30 mr-1 font-['JetBrains_Mono']">Pipeline:</span>
          {[
            { label: 'Extract', color: '#58A6FF' },
            { label: 'Transform', color: '#BC8CFF' },
            { label: 'Validate', color: '#D29922' },
            { label: 'Load', color: '#3FB950' },
            { label: 'Reconcile', color: '#3FB950' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-medium" style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}25` }}>
                {s.label}
              </div>
              {i < 4 && <span className="text-[#F0F6FC] opacity-20 text-[9px]">&rarr;</span>}
            </div>
          ))}
        </div>
        {/* Row 3: Metrics dashboard */}
        <div className="grid grid-cols-5 gap-2 mt-2">
          {[
            { label: 'Raw Records', value: '10,476', color: '#F0F6FC' },
            { label: 'Clean Loaded', value: '9,769', color: '#3FB950' },
            { label: 'Quarantined', value: '607', color: '#D29922' },
            { label: 'Rejected', value: '100', color: '#F85149' },
            { label: 'Pass Rate', value: '93.3%', color: '#3FB950' },
          ].map((m) => (
            <div key={m.label} className="text-center p-2 rounded-lg bg-[#0D1117] border border-[#F0F6FC]/10">
              <div className="font-['Playfair_Display'] text-lg font-bold" style={{ color: m.color }}>{m.value}</div>
              <div className="text-[9px] text-[#F0F6FC] opacity-50 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
        {/* Bottom stats row */}
        <div className="flex items-center justify-center gap-5 mt-2 text-[9px] text-[#F0F6FC] opacity-30 font-['JetBrains_Mono']">
          <span>3 source systems</span>
          <span className="w-px h-2.5 bg-[#F0F6FC] opacity-15" />
          <span>6 validation checks</span>
          <span className="w-px h-2.5 bg-[#F0F6FC] opacity-15" />
          <span>3 automated tests</span>
          <span className="w-px h-2.5 bg-[#F0F6FC] opacity-15" />
          <span>11 wiki pages</span>
        </div>
      </div>
    ),

    // Slide 3: Tech Stack
    () => (
      <div className="slide-inner">
        <div className="slide-label">Technology</div>
        <h2 className="slide-heading">Tech Stack</h2>
        <p className="slide-subheading">The tools and technologies powering the ETL pipeline.</p>
        {/* Technology matrix table */}
        <div className="source-table-wrap mt-1">
          <table className="source-table">
            <thead>
              <tr><th>Technology</th><th>Purpose</th><th>Key Contribution</th><th>Details</th></tr>
            </thead>
            <tbody>
              <tr><td className="font-semibold text-[#58A6FF]">Python 3.x</td><td>ETL Engine</td><td>Core pipeline logic</td><td>Pandas, pathlib, json, datetime</td></tr>
              <tr><td className="font-semibold text-[#3FB950]">Pandas</td><td>Transformation</td><td>Data cleaning &amp; validation</td><td>DataFrames, type inference, bulk export</td></tr>
              <tr><td className="font-semibold text-[#D29922]">PostgreSQL</td><td>Storage</td><td>Gold layer database</td><td>5 gold tables, views, stored procedures</td></tr>
              <tr><td className="font-semibold text-[#D29922]">psycopg2</td><td>Connectivity</td><td>Bulk loading &amp; upserts</td><td>COPY command, transaction-safe upserts</td></tr>
              <tr><td className="font-semibold text-[#3FB950]">pytest</td><td>Testing</td><td>Pipeline correctness</td><td>Row-count invariant, stale-file detection</td></tr>
              <tr><td className="font-semibold text-[#BC8CFF]">Git / GitHub</td><td>Version Control</td><td>Collaboration &amp; docs</td><td>Wiki (11 pages), PR templates, issues</td></tr>
            </tbody>
          </table>
        </div>
        {/* Architecture flow */}
        <div className="mt-2 py-1.5 px-3 rounded-lg bg-[#F0F6FC]/05 border border-[#F0F6FC]/08">
          <div className="text-[9px] text-[#F0F6FC] opacity-30 mb-1 font-['JetBrains_Mono']">Architecture Flow:</div>
          <div className="flex items-center justify-center gap-1">
            {[
              { label: 'CSV Sources', color: '#8B949E' },
              { label: 'Python/Pandas', color: '#58A6FF' },
              { label: 'Validation Layer', color: '#D29922' },
              { label: 'PostgreSQL', color: '#D29922' },
              { label: 'Reporting Views', color: '#3FB950' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-medium" style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}25` }}>
                  {s.label}
                </div>
                {i < 4 && <span className="text-[#F0F6FC] opacity-20 text-[9px]">&rarr;</span>}
              </div>
            ))}
          </div>
        </div>
        {/* Key capabilities */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[
            { title: 'Idempotent', desc: 'Safe to re-run. Staging truncated before each load.', color: '#3FB950' },
            { title: 'Traceable', desc: 'Every run logged in etl_batch with timestamps.', color: '#58A6FF' },
            { title: 'Zero Data Loss', desc: 'Row-count invariant: C + Q + R = Raw, every run.', color: '#D29922' },
          ].map((c) => (
            <div key={c.title} className="flex items-start gap-2 p-2 rounded bg-[#1C2128] text-[#F0F6FC]">
              <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: c.color }} />
              <div>
                <div className="text-[10px] font-semibold" style={{ color: c.color }}>{c.title}</div>
                <div className="text-[9px] opacity-60 leading-relaxed">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    // Slide 4: Merged Problem (Sources + Quality Issues)
    () => (
      <div className="slide-inner">
        <div className="slide-label">Problem Statement</div>
        <h2 className="slide-heading">Three Systems, Thousands of Inconsistencies</h2>
        <p className="slide-subheading">Customer data from three CRM exports — each with unique errors and gaps.</p>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {[
            { num: '3', label: 'Source Systems', desc: 'CRM A, B, C', color: '#F0F6FC' },
            { num: '46', label: 'Duplicate Emails', desc: 'Across contacts + customers', color: '#F85149' },
            { num: '7', label: 'Duplicate SKUs', desc: 'In products catalog', color: '#D29922' },
            { num: '317', label: 'Missing Values', desc: 'NULLs across all entities', color: '#D29922' },
          ].map((s) => (
            <div key={s.label} className="text-center p-2 rounded-lg bg-[#0D1117] border border-[#F0F6FC]/10">
              <div className="font-['Playfair_Display'] text-xl font-bold" style={{ color: s.color }}>{s.num}</div>
              <div className="text-[10px] text-[#F0F6FC] opacity-70 mt-0.5 font-semibold">{s.label}</div>
              <div className="text-[9px] text-[#F0F6FC] opacity-35 mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
        {/* Entity table + Terminal panels side by side */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2 flex-1 min-h-0">
          <div className="md:col-span-3 source-table-wrap overflow-y-auto">
            <table className="source-table">
              <thead>
                <tr><th>Entity</th><th>Rows</th><th>Unique PKs</th><th>Source</th><th>Key Issues</th></tr>
              </thead>
              <tbody>
                <tr><td>contacts</td><td>1,661</td><td>1,661</td><td>CRM A</td><td>Casing, emails, phone formats</td></tr>
                <tr><td>customers</td><td>1,618</td><td>1,618</td><td>CRM B</td><td>46 dup. emails, status typos</td></tr>
                <tr><td>products</td><td>764</td><td>757</td><td>CRM A</td><td>7 dup. SKUs, category typos</td></tr>
                <tr><td>sales_orders</td><td>2,770</td><td>2,770</td><td>CRM C</td><td>Impossible dates, status variants</td></tr>
                <tr><td>order_lines</td><td>3,663</td><td>3,663</td><td>CRM C</td><td>Price anomalies, quantity outliers</td></tr>
              </tbody>
            </table>
          </div>
          <div className="md:col-span-2 grid grid-rows-2 gap-2 min-h-0">
            <div className="terminal-panel overflow-y-auto">
              <div className="term-header">
                <div className="term-dot r" /><div className="term-dot y" /><div className="term-dot g" />
                <span className="term-title">casing &amp; typos</span>
              </div>
              <pre>{
`'B2B' vs 'b2b' vs '  B2B' vs '\\tB2B\\t'
'Active' vs 'active' vs 'ACTIVE'
'grcoeries' 'mobile-accessoreis'
'Marekting' 'Pendign' 'Pneding'`
              }</pre>
            </div>
            <div className="terminal-panel overflow-y-auto">
              <div className="term-header">
                <div className="term-dot r" /><div className="term-dot y" /><div className="term-dot g" />
                <span className="term-title">dates &amp; prices</span>
              </div>
              <pre>{
`'2026-13-45'  '2206-04-29'
$0.79  ->  $87,250.98  (price)
1      ->  99,175      (qty)
317 missing / 46 dup emails / 7 dup SKUs`
              }</pre>
            </div>
          </div>
        </div>
        <div className="mt-2 p-2 rounded bg-[#F85149]/08 border border-[#F85149]/15">
          <div className="text-[10px] text-[#F0F6FC] opacity-60 leading-relaxed">
            <span className="text-[#F85149] font-semibold">Impact:</span> Every downstream report inherits these errors. CRM B alone contributes 46 duplicate emails that break analytical joins. Pipeline must detect, quarantine, and report every issue.
          </div>
        </div>
      </div>
    ),

    // Slide 5: Architecture Decision Records
    () => (
      <div className="slide-inner">
        <div className="slide-label">Decisions</div>
        <h2 className="slide-heading">Architecture Decision Records</h2>
        <p className="slide-subheading">Key engineering choices that shaped the pipeline design.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 flex-1">
          <div className="bg-[#1C2128] rounded-lg p-2.5 flex flex-col">
            <div className="flex items-start gap-2 mb-1">
              <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-[#58A6FF]/15 text-[#58A6FF] text-[10px] font-bold">1</div>
              <div>
                <div className="text-[11px] font-semibold text-[#58A6FF]">Why Medallion?</div>
                <div className="text-[10px] text-[#F0F6FC] opacity-60 mt-0.5 leading-relaxed">
                  Three-tier (Bronze/Silver/Gold) preserves raw source of truth while providing clean analysis data. Decouples storage from transformation.
                </div>
              </div>
            </div>
            <div className="mt-auto text-[9px] text-[#8B949E] font-['JetBrains_Mono']">Alternative considered: Single-table ELT (rejected — no audit trail)</div>
          </div>
          <div className="bg-[#1C2128] rounded-lg p-2.5 flex flex-col">
            <div className="flex items-start gap-2 mb-1">
              <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-[#3FB950]/15 text-[#3FB950] text-[10px] font-bold">2</div>
              <div>
                <div className="text-[11px] font-semibold text-[#3FB950]">Cascade Validation</div>
                <div className="text-[10px] text-[#F0F6FC] opacity-60 mt-0.5 leading-relaxed">
                  Six sequential checks with cascade quarantine ensure duplicate emails/SKUs quarantine all related records, not just the duplicate.
                </div>
              </div>
            </div>
            <div className="mt-auto text-[9px] text-[#8B949E] font-['JetBrains_Mono']">Alternative: Per-record independent checks (rejected — loses relational context)</div>
          </div>
          <div className="bg-[#1C2128] rounded-lg p-2.5 flex flex-col">
            <div className="flex items-start gap-2 mb-1">
              <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-[#D29922]/15 text-[#D29922] text-[10px] font-bold">3</div>
              <div>
                <div className="text-[11px] font-semibold text-[#D29922]">COPY over INSERT</div>
                <div className="text-[10px] text-[#F0F6FC] opacity-60 mt-0.5 leading-relaxed">
                  PostgreSQL bulk COPY command loads clean CSVs into staging tables in seconds rather than row-by-row INSERT for 10K+ records.
                </div>
              </div>
            </div>
            <div className="mt-auto text-[9px] text-[#8B949E] font-['JetBrains_Mono']">Alternative: Row-by-row INSERT (rejected — 10x slower at this scale)</div>
          </div>
          <div className="bg-[#1C2128] rounded-lg p-2.5 flex flex-col">
            <div className="flex items-start gap-2 mb-1">
              <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-[#BC8CFF]/15 text-[#BC8CFF] text-[10px] font-bold">4</div>
              <div>
                <div className="text-[11px] font-semibold text-[#BC8CFF]">Python over Spark</div>
                <div className="text-[10px] text-[#F0F6FC] opacity-60 mt-0.5 leading-relaxed">
                  At 10K records, Pandas in Python is fast, simple, and dependency-free. Spark would add 2GB+ of overhead for no performance gain.
                </div>
              </div>
            </div>
            <div className="mt-auto text-[9px] text-[#8B949E] font-['JetBrains_Mono']">Alternative: PySpark (rejected — overkill for this data volume)</div>
          </div>
          <div className="bg-[#1C2128] rounded-lg p-2.5 flex flex-col md:col-span-2">
            <div className="flex items-start gap-2 mb-1">
              <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-[#F85149]/15 text-[#F85149] text-[10px] font-bold">5</div>
              <div>
                <div className="text-[11px] font-semibold text-[#F85149]">Staging + Upsert for Idempotency</div>
                <div className="text-[10px] text-[#F0F6FC] opacity-60 mt-0.5 leading-relaxed">
                  Truncate staging &rarr; COPY &rarr; stored procedure upsert guarantees safe re-runs. No duplicate rows, no data loss, every run is independent.
                </div>
              </div>
            </div>
            <div className="mt-auto text-[9px] text-[#8B949E] font-['JetBrains_Mono']">Alternative: INSERT-only (rejected — duplicate rows on re-run); MERGE (rejected — slower than truncate+COPY)</div>
          </div>
        </div>
      </div>
    ),

    // Slide 6: Data Volume Snapshot
    () => (
      <div className="slide-inner">
        <div className="slide-label">Data Profile</div>
        <h2 className="slide-heading">Data Volume Snapshot</h2>
        <p className="slide-subheading">Pre-processing row counts per entity and data quality classification.</p>
        <div className="source-table-wrap mt-1">
          <table className="source-table">
            <thead>
              <tr><th>Entity</th><th>Raw Rows</th><th className="text-[#3FB950]">Clean</th><th className="text-[#D29922]">Quarantine</th><th className="text-[#F85149]">Rejected</th><th>Pass Rate</th></tr>
            </thead>
            <tbody>
              <tr><td>contacts</td><td>1,661</td><td>1,586</td><td>63</td><td>12</td><td>95.5%</td></tr>
              <tr><td>customers</td><td>1,618</td><td>1,539</td><td>71</td><td>8</td><td>95.1%</td></tr>
              <tr><td>products</td><td>764</td><td>757</td><td>7</td><td>0</td><td>99.1%</td></tr>
              <tr><td>sales_orders</td><td>2,770</td><td>2,630</td><td>112</td><td>28</td><td>94.9%</td></tr>
              <tr><td>order_lines</td><td>3,663</td><td>3,257</td><td>354</td><td>52</td><td>88.9%</td></tr>
              <tr className="font-semibold border-t-2 border-[#F0F6FC]/20">
                <td>Total</td><td>10,476</td><td>9,769</td><td>607</td><td>100</td><td>93.3%</td></tr>
            </tbody>
          </table>
        </div>
        {/* Per-entity stacked bars */}
        <div className="mt-2 space-y-1.5">
          {[
            { entity: 'contacts', raw: 1661, clean: 1586, quarantine: 63, rejected: 12 },
            { entity: 'customers', raw: 1618, clean: 1539, quarantine: 71, rejected: 8 },
            { entity: 'products', raw: 764, clean: 757, quarantine: 7, rejected: 0 },
            { entity: 'sales_orders', raw: 2770, clean: 2630, quarantine: 112, rejected: 28 },
            { entity: 'order_lines', raw: 3663, clean: 3257, quarantine: 354, rejected: 52 },
          ].map((e) => (
            <div key={e.entity} className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#F0F6FC] opacity-50 w-24 shrink-0 text-right">{e.entity}</span>
              <div className="flex-1 h-4 rounded bg-[#F0F6FC]/05 overflow-hidden flex">
                <div className="bg-[#3FB950] h-full" style={{ width: `${(e.clean / e.raw) * 100}%` }} />
                <div className="bg-[#D29922] h-full" style={{ width: `${(e.quarantine / e.raw) * 100}%` }} />
                <div className="bg-[#F85149] h-full" style={{ width: `${(e.rejected / e.raw) * 100}%` }} />
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#F0F6FC] opacity-40 w-12 shrink-0">{e.raw.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex-1 h-3 rounded-full bg-[#F0F6FC]/10 overflow-hidden flex">
            <div className="bg-[#3FB950] h-full" style={{ width: '93.3%' }} />
            <div className="bg-[#D29922] h-full" style={{ width: '5.8%' }} />
            <div className="bg-[#F85149] h-full" style={{ width: '0.9%' }} />
          </div>
          <div className="flex gap-3 text-[10px] shrink-0">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#3FB950]" /> Clean 93.3%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#D29922]" /> Quarantine 5.8%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#F85149]" /> Rejected 0.9%</span>
          </div>
        </div>
      </div>
    ),

    // Slide 7: Medallion Architecture
    () => (
      <div className="slide-inner">
        <div className="slide-label">Architecture</div>
        <h2 className="slide-heading">Medallion Architecture</h2>
        <p className="slide-subheading">A three-tier data lakehouse pattern &mdash; raw data flows through Bronze, Silver, and Gold layers.</p>
        <div className="medallion-row">
          <div className="medallion-card bronze">
            <div className="med-label">Layer 1</div>
            <div className="med-title">Bronze</div>
            <div className="med-path">data/raw/</div>
            <div className="med-desc">Untouched source CSVs. Six files from three CRM systems. Never modified &mdash; the original source of truth.</div>
            <div className="mt-2 pt-2 border-t border-white/10 text-[10px] opacity-70 leading-relaxed">
              <div>&#x2022; 10,476 raw records</div>
              <div>&#x2022; contacts, customers, products, sales_orders, order_lines, etl_batch</div>
              <div>&#x2022; Preserved exactly as downloaded from CRM exports</div>
            </div>
          </div>
          <div className="med-arrow">
            <ChevronRight size={24} className="text-[#F0F6FC] opacity-40" />
          </div>
          <div className="medallion-card silver">
            <div className="med-label">Layer 2</div>
            <div className="med-title">Silver</div>
            <div className="med-path">Python ETL</div>
            <div className="med-desc">Cleaning, validation, and normalization. Casing standardization, typo correction, date parsing, FK integrity checks.</div>
            <div className="mt-2 pt-2 border-t border-white/10 text-[10px] opacity-70 leading-relaxed">
              <div>&#x2022; 6 validation checks applied sequentially</div>
              <div>&#x2022; 3 output tiers: Clean, Quarantine, Rejected</div>
              <div>&#x2022; Cascade quarantine for email/SKU duplicates</div>
            </div>
          </div>
          <div className="med-arrow">
            <ChevronRight size={24} className="text-[#F0F6FC] opacity-40" />
          </div>
          <div className="medallion-card gold">
            <div className="med-label">Layer 3</div>
            <div className="med-title">Gold</div>
            <div className="med-path">data/clean/ + PostgreSQL</div>
            <div className="med-desc">Analysis-ready tables. Five gold tables plus an etl_batch audit log. The single source of truth for reporting.</div>
            <div className="mt-2 pt-2 border-t border-white/10 text-[10px] opacity-70 leading-relaxed">
              <div>&#x2022; 9,769 clean records loaded (93.3%)</div>
              <div>&#x2022; Staging &rarr; Gold upsert via stored procedures</div>
              <div>&#x2022; Full audit trail in etl_batch table</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {[
            { icon: ScanSearch, title: 'Traceable', desc: 'Every run logged in etl_batch with timestamps, status, and notes' },
            { icon: RotateCcw, title: 'Idempotent', desc: 'Safe re-runs &mdash; staging truncated before each load' },
            { icon: ShieldCheck, title: 'Safe', desc: 'Bad data is quarantined, never silently loaded into production' },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-3 p-3 bg-[#1C2128] rounded-lg text-[#F0F6FC]">
              <div className="w-9 h-9 rounded-lg bg-[#161B22]/10 flex items-center justify-center shrink-0 text-[#161B22]">
                <b.icon size={18} />
              </div>
              <div>
                <div className="font-semibold text-xs">{b.title}</div>
                <div className="text-[11px] opacity-70 mt-0.5 leading-relaxed">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    // Slide 8: High-Level Architecture Diagram
    () => (
      <div className="slide-inner">
        <div className="slide-label">Architecture</div>
        <h2 className="slide-heading">High-Level Architecture</h2>
        <p className="slide-subheading">End-to-end data flow from CRM sources to reporting views.</p>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <svg viewBox="0 0 900 380" className="w-full h-auto" fill="none">
              <defs>
                <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#161B22" />
                  <stop offset="100%" stopColor="#0D1117" />
                </linearGradient>
              </defs>
              {/* Row 1: Sources */}
              <rect x="10" y="10" width="120" height="50" rx="8" fill="url(#boxGrad)" stroke="#F0F6FC" strokeOpacity="0.2" />
              <text x="70" y="42" textAnchor="middle" fill="#F0F6FC" fontSize="11" fontWeight="600">CRM Sources</text>
              <text x="70" y="130" textAnchor="middle" fill="#F0F6FC" opacity="0.3" fontSize="9">6 CSV files</text>

              <ArrowLine x1={130} y1={35} x2={170} y2={35} />

              {/* Row 2: Extract */}
              <rect x="170" y="10" width="110" height="50" rx="8" fill="url(#boxGrad)" stroke="#58A6FF" strokeOpacity="0.4" />
              <text x="225" y="42" textAnchor="middle" fill="#58A6FF" fontSize="11" fontWeight="600">Extract</text>

              <ArrowLine x1={280} y1={35} x2={320} y2={35} />

              {/* Row 3: data/raw */}
              <rect x="320" y="10" width="110" height="50" rx="8" fill="url(#boxGrad)" stroke="#8B949E" strokeOpacity="0.6" />
              <text x="375" y="42" textAnchor="middle" fill="#8B949E" fontSize="11" fontWeight="600">data/raw/</text>

              <ArrowDown x1={375} y1={60} x2={375} y2={90} />

              {/* Row 4: Transform */}
              <rect x="320" y="90" width="110" height="50" rx="8" fill="url(#boxGrad)" stroke="#F0F6FC" strokeOpacity="0.2" />
              <text x="375" y="122" textAnchor="middle" fill="#F0F6FC" fontSize="11" fontWeight="600">Transform</text>

              <ArrowLine x1={430} y1={115} x2={470} y2={115} />

              {/* Row 5: data/clean (right side) */}
              <rect x="470" y="90" width="110" height="50" rx="8" fill="url(#boxGrad)" stroke="#3FB950" strokeOpacity="0.6" />
              <text x="525" y="122" textAnchor="middle" fill="#3FB950" fontSize="11" fontWeight="600">data/clean/</text>

              {/* Tests box (dotted, above clean) */}
              <rect x="470" y="10" width="110" height="40" rx="6" fill="none" stroke="#D29922" strokeOpacity="0.4" strokeDasharray="4 3" />
              <text x="525" y="35" textAnchor="middle" fill="#D29922" opacity="0.6" fontSize="10">Automated Tests</text>
              <path d="M 525 50 L 525 84" stroke="#D29922" strokeOpacity="0.2" strokeDasharray="3 3" />

              <ArrowDown x1={525} y1={140} x2={525} y2={170} />

              {/* Row 6: Validate */}
              <rect x="320" y="170" width="110" height="50" rx="8" fill="url(#boxGrad)" stroke="#D29922" strokeOpacity="0.4" />
              <text x="375" y="202" textAnchor="middle" fill="#D29922" fontSize="11" fontWeight="600">Validate</text>

              {/* Branch lines to 3 outputs */}
              <line x1="375" y1="220" x2="375" y2="240" stroke="#F0F6FC" strokeOpacity="0.2" />
              <line x1="200" y1="240" x2="550" y2="240" stroke="#F0F6FC" strokeOpacity="0.15" />

              <text x="160" y="255" textAnchor="middle" fill="#3FB950" fontSize="10" fontWeight="500">Pass</text>
              <text x="375" y="255" textAnchor="middle" fill="#D29922" fontSize="10" fontWeight="500">Fail</text>
              <text x="610" y="255" textAnchor="middle" fill="#F85149" fontSize="10" fontWeight="500">Reject</text>

              <ArrowDown x1={160} y1={258} x2={160} y2={280} />
              <ArrowDown x1={375} y1={258} x2={375} y2={280} />
              <ArrowDown x1={610} y1={258} x2={610} y2={280} />

              {/* Row 7: 3 outputs */}
              <rect x="100" y="280" width="120" height="45" rx="6" fill="#3FB950" fillOpacity="0.12" stroke="#3FB950" strokeOpacity="0.4" />
              <text x="160" y="308" textAnchor="middle" fill="#3FB950" fontSize="10" fontWeight="500">Clean Data</text>

              <rect x="310" y="280" width="130" height="45" rx="6" fill="#D29922" fillOpacity="0.12" stroke="#D29922" strokeOpacity="0.4" />
              <text x="375" y="308" textAnchor="middle" fill="#D29922" fontSize="10" fontWeight="500">Quarantine</text>

              <rect x="550" y="280" width="120" height="45" rx="6" fill="#F85149" fillOpacity="0.12" stroke="#F85149" strokeOpacity="0.4" />
              <text x="610" y="308" textAnchor="middle" fill="#F85149" fontSize="10" fontWeight="500">Rejected</text>

              <ArrowDown x1={160} y1={325} x2={160} y2={350} />

              {/* Row 8: Load + PostgreSQL */}
              <rect x="100" y="350" width="120" height="30" rx="6" fill="url(#boxGrad)" stroke="#58A6FF" strokeOpacity="0.3" />
              <text x="160" y="369" textAnchor="middle" fill="#58A6FF" fontSize="10" fontWeight="600">Load / PostgreSQL</text>

              <text x="350" y="369" textAnchor="middle" fill="#F0F6FC" opacity="0.25" fontSize="9">Reporting Views & Data Quality Metrics</text>
            </svg>
          </div>
        </div>
      </div>
    ),

    // Slide 9: Repository Structure — Overview
    () => (
      <div className="slide-inner">
        <div className="slide-label">Repository</div>
        <h2 className="slide-heading">Repository Structure Overview</h2>
        <p className="slide-subheading">Top-level folder purposes and contents.</p>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            { name: 'data/', desc: 'Data lake — raw source files, clean output, quarantine, and rejected records', files: '4 subdirs, 23 CSV files', details: ['raw/ — untouched source CSVs', 'clean/ — validated records ready for DB', 'quarantine/ — fixable quality issues', 'rejected/ — permanently excluded records'], color: '#8B949E' },
            { name: 'etl/', desc: 'Python ETL pipeline — 5-stage module with utilities and logs', files: '10 Python files, 2 utils', details: ['main.py — orchestrator', 'extract.py — CSV reader', 'transform.py — cleaner', 'validate.py — 6-check cascade', 'load.py — PostgreSQL writer', 'reconcile.py — count verifier'], color: '#58A6FF' },
            { name: 'scripts/', desc: 'Numbered SQL scripts for PostgreSQL schema, views, and procedures', files: '5 SQL scripts + schema SVG', details: ['01 — Enterprise data model', '02 — Create gold + staging tables', '03 — Reporting views', '04 — Load procedures (upsert)', '05 — Validation queries'], color: '#D29922' },
            { name: 'tests/', desc: 'Automated pytest suite for pipeline status, invariants, and file overwrite', files: '3 test files + __init__.py', details: ['Pipeline status verification', 'Row-count invariant (C+Q+R=R)', 'Stale file overwrite detection'], color: '#3FB950' },
            { name: 'wiki/', desc: 'Full project documentation — 11 markdown pages covering all aspects', files: '11 pages, ~2000 lines', details: ['Architecture, pipeline, quality defs', 'Data sources, transformation rules', 'Glossary, team roles, run guide'], color: '#BC8CFF' },
            { name: 'presentation/', desc: 'Presentation assets, screenshots, and this slide deck', files: 'Next.js app + slide components', details: ['28-slide click-through deck', 'Midnight Executive design system', 'Interactive file tree & pipeline'], color: '#F0F6FC' },
          ].map((d) => (
            <div key={d.name} className="bg-[#1C2128] rounded-lg p-3 flex flex-col text-[#F0F6FC]">
              <div className="flex items-start gap-2.5 mb-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white text-[11px] font-bold font-['JetBrains_Mono']" style={{ background: d.color }}>
                  {d.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-['JetBrains_Mono'] text-sm font-semibold" style={{ color: d.color }}>{d.name}</div>
                  <div className="text-[10px] opacity-60 mt-0.5 leading-relaxed">{d.desc}</div>
                  <div className="text-[9px] text-[#8B949E] mt-0.5 font-['JetBrains_Mono']">{d.files}</div>
                </div>
              </div>
              <div className="space-y-0.5 mt-1 ml-9">
                {d.details.map((det) => (
                  <div key={det} className="text-[9px] text-[#F0F6FC] opacity-55 flex items-start gap-1">
                    <span className="text-[#3FB950] mt-px shrink-0">&#x2022;</span>
                    <span className="leading-tight">{det}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    // Slide 10: Interactive Tree Explorer
    () => (
      <div className="slide-inner" style={{ position: 'relative' }}>
        <div className="slide-label">Repository</div>
        <h2 className="slide-heading">Full Interactive Tree Explorer</h2>
        <p className="slide-subheading">Click to expand/collapse. Color-coded by file type.</p>
        <div className="file-tree-container flex-1">
          <FileTree data={treeData} />
        </div>
        <div className="scroll-hint">scroll for more &darr;</div>
      </div>
    ),

    // Slide 11: Guided Annotated Tour
    () => (
      <div className="slide-inner">
        <div className="slide-label">Repository</div>
        <h2 className="slide-heading">Guided Annotated Tour</h2>
        <p className="slide-subheading">Key directories explained.</p>
        <div className="two-col flex-1">
          <div className="file-tree-container">
            <FileTree data={treeData} />
          </div>
          <div className="overflow-y-auto">
            <AnnotatedTour />
          </div>
        </div>
      </div>
    ),

    // Slide 12: Pipeline Flow — 5 Stages
    () => (
      <div className="slide-inner">
        <div className="slide-label">Pipeline</div>
        <h2 className="slide-heading">Five-Stage Pipeline Flow</h2>
        <p className="slide-subheading">Each stage has a single responsibility. Click a stage to see its details.</p>
        <PipelineInteractive />
      </div>
    ),

    // Slides 13-17: Stage Deep Dives
    () => <StageDeepDive index={0} />,
    () => <StageDeepDive index={1} />,
    () => <StageDeepDive index={2} />,
    () => <StageDeepDive index={3} />,
    () => <StageDeepDive index={4} />,

    // Slide 18: Merged Quality Tiers (Definitions + Destinations)
    () => (
      <div className="slide-inner">
        <div className="slide-label">Data Quality</div>
        <h2 className="slide-heading">Three-Tier Quality Classification</h2>
        <p className="slide-subheading">Every record classified into one of three tiers. Per-entity counts and final destination shown below.</p>
        <div className="grid-3">
          <div className="tier-card tier-rejected">
            <div className="tier-icon"><XCircle size={18} /></div>
            <div className="tier-title">Rejected</div>
            <div className="tier-def">Missing PK or mandatory field, or corrupted beyond repair. Permanently excluded.</div>
            <div className="tier-path">data/rejected/ &rarr; Fix at source</div>
            <div className="mt-2 pt-2 border-t border-[#F85149]/20">
              <div className="text-[10px] text-[#F0F6FC] opacity-40 mb-1">Counts: {['contacts 12','customers 8','sales_orders 28','order_lines 52'].join(' | ')}</div>
            </div>
          </div>
          <div className="tier-card tier-quarantine">
            <div className="tier-icon"><AlertTriangle size={18} /></div>
            <div className="tier-title">Quarantine</div>
            <div className="tier-def">Valid PK but fails a quality check. Recoverable through manual review.</div>
            <div className="tier-path">data/quarantine/ &rarr; Manual review</div>
            <div className="mt-2 pt-2 border-t border-[#D29922]/20">
              <div className="text-[10px] text-[#F0F6FC] opacity-40 mb-1">Counts: {['contacts 63','customers 71','products 7','sales_orders 112','order_lines 354'].join(' | ')}</div>
            </div>
          </div>
          <div className="tier-card tier-clean">
            <div className="tier-icon"><CheckCircle2 size={18} /></div>
            <div className="tier-title">Clean</div>
            <div className="tier-def">Passed all constraints. Ready for PostgreSQL gold tables.</div>
            <div className="tier-path">data/clean/ &rarr; PostgreSQL</div>
            <div className="mt-2 pt-2 border-t border-[#3FB950]/20">
              <div className="text-[10px] text-[#F0F6FC] opacity-40 mb-1">Counts: {['contacts 1,586','customers 1,539','products 757','sales_orders 2,630','order_lines 3,257'].join(' | ')}</div>
            </div>
          </div>
        </div>
        <div className="source-table-wrap mt-2">
          <table className="source-table">
            <thead>
              <tr><th>Tier</th><th>Output Dir</th><th>Loadable?</th><th>Files</th><th>Action</th><th>% of Total</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="text-[#3FB950] font-semibold">Clean</span></td>
                <td className="font-['JetBrains_Mono']">data/clean/</td>
                <td className="text-[#3FB950]">&#x2713;</td>
                <td>6</td>
                <td>Loaded to PostgreSQL gold tables</td>
                <td><span className="text-[#3FB950]">93.3%</span></td>
              </tr>
              <tr>
                <td><span className="text-[#D29922] font-semibold">Quarantine</span></td>
                <td className="font-['JetBrains_Mono']">data/quarantine/</td>
                <td className="text-[#D29922]">&#x2717;</td>
                <td>5</td>
                <td>Held for manual review</td>
                <td><span className="text-[#D29922]">5.8%</span></td>
              </tr>
              <tr>
                <td><span className="text-[#F85149] font-semibold">Rejected</span></td>
                <td className="font-['JetBrains_Mono']">data/rejected/</td>
                <td className="text-[#F85149]">&#x2717;</td>
                <td>5</td>
                <td>Fix at source system</td>
                <td><span className="text-[#F85149]">0.9%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="recon-equation" style={{ padding: '0.3rem 0.5rem', margin: 0 }}>
            <span className="text-[#3FB950] font-bold" style={{ fontSize: '0.7rem' }}>9,769 Clean</span>
            <span className="recon-op">+</span>
            <span className="text-[#D29922] font-bold" style={{ fontSize: '0.7rem' }}>607 Quarantine</span>
            <span className="recon-op">+</span>
            <span className="text-[#F85149] font-bold" style={{ fontSize: '0.7rem' }}>100 Rejected</span>
            <span className="recon-op">=</span>
            <span className="text-[#F0F6FC] font-bold" style={{ fontSize: '0.7rem' }}>10,476 Total</span>
          </div>
        </div>
      </div>
    ),

    // Slide 19: Entity Relationship Diagram
    () => (
      <div className="slide-inner">
        <div className="slide-label">Database Design</div>
        <h2 className="slide-heading">Entity Relationship Diagram</h2>
        <p className="slide-subheading">Five gold tables with strict FK chains — contact &rarr; customer &rarr; sales_order &rarr; order_line, plus product.</p>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <svg viewBox="0 0 820 400" className="w-full h-auto" fill="none">
              <defs>
                <linearGradient id="erdGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#161B22" />
                  <stop offset="100%" stopColor="#0D1117" />
                </linearGradient>
              </defs>
              {/* contact table */}
              <rect x="20" y="20" width="170" height="90" rx="6" fill="url(#erdGrad)" stroke="#58A6FF" strokeOpacity="0.5" />
              <text x="105" y="42" textAnchor="middle" fill="#58A6FF" fontSize="11" fontWeight="700">contact</text>
              <line x1="20" y1="50" x2="190" y2="50" stroke="#58A6FF" strokeOpacity="0.3" />
              <text x="30" y="65" fill="#F0F6FC" fontSize="9" fontWeight="600">PK id (UUID)</text>
              <text x="30" y="80" fill="#F0F6FC" opacity="0.6" fontSize="9">email, full_name, phone</text>
              <text x="30" y="95" fill="#F0F6FC" opacity="0.6" fontSize="9">department, created_at</text>
              {/* FK arrow contact → customer */}
              <line x1="190" y1="50" x2="250" y2="50" stroke="#D29922" strokeOpacity="0.4" strokeWidth="1.5" />
              <polygon points="250,46 250,54 258,50" fill="#D29922" fillOpacity="0.4" />
              <text x="215" y="44" textAnchor="middle" fill="#D29922" fontSize="7" opacity="0.7">FK</text>
              {/* customer table */}
              <rect x="260" y="20" width="190" height="90" rx="6" fill="url(#erdGrad)" stroke="#3FB950" strokeOpacity="0.5" />
              <text x="355" y="42" textAnchor="middle" fill="#3FB950" fontSize="11" fontWeight="700">customer</text>
              <line x1="260" y1="50" x2="450" y2="50" stroke="#3FB950" strokeOpacity="0.3" />
              <text x="270" y="65" fill="#F0F6FC" fontSize="9" fontWeight="600">PK id (UUID)</text>
              <text x="270" y="80" fill="#D29922" opacity="0.8" fontSize="9">FK contact_id</text>
              <text x="270" y="95" fill="#F0F6FC" opacity="0.6" fontSize="9">segment, status</text>
              {/* FK arrow customer → sales_order */}
              <line x1="450" y1="50" x2="510" y2="50" stroke="#D29922" strokeOpacity="0.4" strokeWidth="1.5" />
              <polygon points="510,46 510,54 518,50" fill="#D29922" fillOpacity="0.4" />
              <text x="475" y="44" textAnchor="middle" fill="#D29922" fontSize="7" opacity="0.7">FK</text>
              {/* sales_order table */}
              <rect x="520" y="20" width="200" height="90" rx="6" fill="url(#erdGrad)" stroke="#D29922" strokeOpacity="0.5" />
              <text x="620" y="42" textAnchor="middle" fill="#D29922" fontSize="11" fontWeight="700">sales_order</text>
              <line x1="520" y1="50" x2="720" y2="50" stroke="#D29922" strokeOpacity="0.3" />
              <text x="530" y="65" fill="#F0F6FC" fontSize="9" fontWeight="600">PK id (UUID)</text>
              <text x="530" y="80" fill="#D29922" opacity="0.8" fontSize="9">FK customer_id</text>
              <text x="530" y="95" fill="#F0F6FC" opacity="0.6" fontSize="9">order_date, status</text>
              {/* product table (below left) */}
              <rect x="20" y="200" width="170" height="90" rx="6" fill="url(#erdGrad)" stroke="#F85149" strokeOpacity="0.5" />
              <text x="105" y="222" textAnchor="middle" fill="#F85149" fontSize="11" fontWeight="700">product</text>
              <line x1="20" y1="230" x2="190" y2="230" stroke="#F85149" strokeOpacity="0.3" />
              <text x="30" y="245" fill="#F0F6FC" fontSize="9" fontWeight="600">PK sku (varchar)</text>
              <text x="30" y="260" fill="#F0F6FC" opacity="0.6" fontSize="9">name, category, list_price</text>
              <text x="30" y="275" fill="#F0F6FC" opacity="0.6" fontSize="9">quantity</text>
              {/* order_line table (below right) */}
              <rect x="270" y="200" width="220" height="90" rx="6" fill="url(#erdGrad)" stroke="#BC8CFF" strokeOpacity="0.5" />
              <text x="380" y="222" textAnchor="middle" fill="#BC8CFF" fontSize="11" fontWeight="700">order_line</text>
              <line x1="270" y1="230" x2="490" y2="230" stroke="#BC8CFF" strokeOpacity="0.3" />
              <text x="280" y="245" fill="#F0F6FC" fontSize="9" fontWeight="600">PK id (UUID)</text>
              <text x="280" y="260" fill="#D29922" opacity="0.8" fontSize="9">FK sales_order_id</text>
              <text x="280" y="275" fill="#D29922" opacity="0.8" fontSize="9">FK product_sku</text>
              {/* FK arrow product → order_line */}
              <path d="M 190 245 L 250 245 L 250 255 L 270 255" stroke="#D29922" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
              <polygon points="270,251 270,259 278,255" fill="#D29922" fillOpacity="0.4" />
              {/* FK arrow sales_order → order_line */}
              <path d="M 520 80 L 510 80 L 510 265 L 490 265" stroke="#D29922" strokeOpacity="0.4" strokeWidth="1.5" fill="none" />
              <polygon points="490,261 490,269 482,265" fill="#D29922" fillOpacity="0.4" />
              {/* Legend */}
              <rect x="20" y="330" width="780" height="40" rx="6" fill="#0D1117" stroke="#30363D" />
              <text x="40" y="350" fill="#F0F6FC" fontSize="8" opacity="0.5">Legend:</text>
              <rect x="100" y="340" width="10" height="10" rx="2" fill="#D29922" />
              <text x="115" y="349" fill="#F0F6FC" fontSize="8" opacity="0.6">FK = Foreign Key</text>
              <rect x="240" y="340" width="10" height="10" rx="2" fill="#58A6FF" />
              <text x="255" y="349" fill="#F0F6FC" fontSize="8" opacity="0.6">PK = Primary Key</text>
              <text x="400" y="350" fill="#F0F6FC" fontSize="8" opacity="0.4">Tables: 5 Gold + 5 Staging + 1 Audit (etl_batch)</text>
            </svg>
          </div>
        </div>
      </div>
    ),

    // Slide 20: Database Schema & SQL Scripts
    () => (
      <div className="slide-inner">
        <div className="slide-label">Database</div>
        <h2 className="slide-heading">Database Schema &amp; SQL Scripts</h2>
        <p className="slide-subheading">Numbered scripts must be run in order on first setup. Stored procedures handle upsert logic.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
          <div>
            <h3 className="text-sm font-semibold mb-1.5 text-[#F0F6FC] opacity-70">SQL Scripts (run in order)</h3>
            <div className="space-y-1.5">
              {[
                { num: '01', name: 'Enterprise Data Model', file: '01_enterprise_data_model_mysql.sql', desc: 'Enterprise data model reference — defines entity relationships and constraints' },
                { num: '02', name: 'Create Tables', file: '02_create_tables.sql', desc: 'Create 5 gold tables + 5 staging tables + etl_batch audit table' },
                { num: '03', name: 'Create Views', file: '03_create_views.sql', desc: 'Summary views for downstream reporting and data quality metrics' },
                { num: '04', name: 'Load Procedures', file: '04_load_procedures.sql', desc: 'Staging → gold upsert logic: INSERT new / UPDATE existing / DELETE conflicts' },
                { num: '05', name: 'Validation Queries', file: '05_validation_queries.sql', desc: 'Post-run quality checks to verify data integrity and completeness' },
              ].map((s) => (
                <div key={s.num} className="flex items-start gap-2.5 p-2 rounded bg-[#F0F6FC]/05 border border-[#F0F6FC]/10">
                  <div className="w-7 h-7 rounded-lg bg-[#161B22] flex items-center justify-center shrink-0 text-white text-[11px] font-bold font-['JetBrains_Mono']">{s.num}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white">{s.name}</div>
                    <div className="text-[10px] font-['JetBrains_Mono'] text-[#F0F6FC] opacity-40 truncate">{s.file}</div>
                    <div className="text-[10px] text-[#F0F6FC] opacity-50 mt-0.5 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-1.5 text-[#F0F6FC] opacity-70">Gold Tables</h3>
            <div className="source-table-wrap">
              <table className="source-table">
                <thead>
                  <tr><th>Table</th><th>Type</th><th>Rows</th><th>Purpose</th></tr>
                </thead>
                <tbody>
                  <tr><td>contact</td><td>Gold</td><td>1,586</td><td>Clean contact records with normalized emails</td></tr>
                  <tr><td>customer</td><td>Gold</td><td>1,539</td><td>Clean customer accounts with FK → contact</td></tr>
                  <tr><td>product</td><td>Gold</td><td>757</td><td>Clean product catalog with normalized categories</td></tr>
                  <tr><td>sales_order</td><td>Gold</td><td>2,630</td><td>Clean order headers with FK → customer</td></tr>
                  <tr><td>order_line</td><td>Gold</td><td>3,257</td><td>Clean line items with FK → sales_order + product</td></tr>
                  <tr><td>stg_*</td><td>Staging</td><td>—</td><td>Truncated before each load (idempotency)</td></tr>
                  <tr><td>etl_batch</td><td>Audit</td><td>2+</td><td>Run metadata: timestamps, status, row counts</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-2 p-2 rounded bg-[#3FB950]/08 border border-[#3FB950]/15">
              <div className="text-[10px] text-[#F0F6FC] opacity-60 leading-relaxed">
                <span className="text-[#3FB950] font-semibold">Load strategy:</span> Bulk COPY → staging, then stored procedures upsert to gold. Staging truncated before each run for idempotency.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // Slide 21: Results + Before/After Quality Comparison
    () => (
      <div className="slide-inner">
        <div className="slide-label">Results</div>
        <h2 className="slide-heading">Expected Row Counts &amp; Quality Comparison</h2>
        <p className="slide-subheading">Raw vs. loaded table counts. Before-after view shows the pipeline's quality impact.</p>
        {/* Compact 2-col: Row counts + Before/After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1 flex-1 min-h-0">
          <div className="flex flex-col min-h-0">
            <h3 className="text-[10px] font-semibold text-[#F0F6FC] opacity-60 mb-1">Row Count Reconciliation</h3>
            <div className="source-table-wrap flex-1 overflow-y-auto">
              <table className="source-table">
                <thead>
                  <tr><th>Entity</th><th>Raw</th><th>Clean</th><th>Gold</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>contacts</td><td>1,661</td><td>1,586</td><td>1,586</td><td className="text-[#3FB950]">&#x2713;</td></tr>
                  <tr><td>customers</td><td>1,618</td><td>1,539</td><td>1,539</td><td className="text-[#3FB950]">&#x2713;</td></tr>
                  <tr><td>products</td><td>764</td><td>757</td><td>757</td><td className="text-[#3FB950]">&#x2713;</td></tr>
                  <tr><td>sales_orders</td><td>2,770</td><td>2,630</td><td>2,630</td><td className="text-[#3FB950]">&#x2713;</td></tr>
                  <tr><td>order_lines</td><td>3,663</td><td>3,257</td><td>3,257</td><td className="text-[#3FB950]">&#x2713;</td></tr>
                  <tr className="border-t-2 border-[#F0F6FC]/20 font-semibold">
                    <td>Total</td><td>10,476</td><td>9,769</td><td>9,769</td><td className="text-[#3FB950]">&#x2713;</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex-1 h-2 rounded bg-[#F0F6FC]/05 overflow-hidden flex">
                <div className="bg-[#3FB950] h-full" style={{ width: '93.3%' }} />
                <div className="bg-[#D29922] h-full" style={{ width: '5.8%' }} />
                <div className="bg-[#F85149] h-full" style={{ width: '0.9%' }} />
              </div>
              <span className="text-[9px] text-[#F0F6FC] opacity-40 shrink-0">93.3% pass</span>
            </div>
          </div>
          <div className="flex flex-col min-h-0">
            <h3 className="text-[10px] font-semibold text-[#F0F6FC] opacity-60 mb-1">Before vs. After — Quality Impact</h3>
            <div className="source-table-wrap flex-1 overflow-y-auto">
              <table className="source-table">
                <thead>
                  <tr><th>Entity</th><th>Raw Issues</th><th>Issue Type</th><th>Clean Rows</th><th>Improvement</th></tr>
                </thead>
                <tbody>
                  <tr><td>contacts</td><td>75 flagged</td><td>Casing, emails, phone</td><td>1,586</td><td className="text-[#3FB950]">95.5% clean</td></tr>
                  <tr><td>customers</td><td>79 flagged</td><td>46 dup emails, typos</td><td>1,539</td><td className="text-[#3FB950]">95.1% clean</td></tr>
                  <tr><td>products</td><td>7 flagged</td><td>7 dup SKUs, categories</td><td>757</td><td className="text-[#3FB950]">99.1% clean</td></tr>
                  <tr><td>sales_orders</td><td>140 flagged</td><td>Dates, status variants</td><td>2,630</td><td className="text-[#3FB950]">94.9% clean</td></tr>
                  <tr><td>order_lines</td><td>406 flagged</td><td>Prices, qty outliers</td><td>3,257</td><td className="text-[#3FB950]">88.9% clean</td></tr>
                  <tr className="border-t-2 border-[#F0F6FC]/20 font-semibold">
                    <td>Total</td><td>707 flagged</td><td>All issue categories</td><td>9,769</td><td className="text-[#3FB950]">93.3% clean</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[9px] text-[#F0F6FC] opacity-40">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#3FB950]" /> Clean</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#D29922]" /> Quarantine</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#F85149]" /> Rejected</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-1">
          <div className="recon-equation" style={{ padding: '0.25rem 0.4rem', margin: 0 }}>
            <div className="recon-term clean"><div className="rt-label">len(clean)</div></div>
            <div className="recon-op">+</div>
            <div className="recon-term quarantine"><div className="rt-label">len(quarantine)</div></div>
            <div className="recon-op">+</div>
            <div className="recon-term rejected"><div className="rt-label">len(rejected)</div></div>
            <div className="recon-op">=</div>
            <div className="recon-term raw"><div className="rt-label">len(raw)</div></div>
          </div>
        </div>
      </div>
    ),

    // Slide 22: Module Dependency Graph
    () => (
      <div className="slide-inner">
        <div className="slide-label">Architecture</div>
        <h2 className="slide-heading">Module Dependency Graph</h2>
        <p className="slide-subheading">Clean separation of concerns. No circular dependencies. Each module has a single responsibility.</p>
        <div className="dep-graph">
          <div className="dep-row">
            <div className="dep-box entry">__main__.py</div>
            <span className="text-[10px] text-[#F0F6FC] opacity-70 ml-2">Entry point — delegates to main.py</span>
          </div>
          <ChevronRight size={16} className="text-[#F0F6FC] opacity-40 -rotate-90" />
          <div className="dep-row">
            <div className="dep-box main">main.py</div>
            <span className="text-[10px] text-[#F0F6FC] opacity-70 ml-2">Orchestrator — calls stages in sequence</span>
          </div>
          <ChevronRight size={16} className="text-[#F0F6FC] opacity-40 -rotate-90" />
          <div className="dep-row">
            {[
              { name: 'extract.py', desc: 'Read CSVs' },
              { name: 'transform.py', desc: 'Clean data' },
              { name: 'validate.py', desc: 'Check quality' },
              { name: 'load.py', desc: 'Write to DB' },
              { name: 'reconcile.py', desc: 'Verify counts' },
              { name: 'config.py', desc: 'Paths & constants' },
            ].map((m) => (
              <div key={m.name} className="flex flex-col items-center">
                <div className="dep-box stage">{m.name}</div>
                <span className="text-[9px] text-[#F0F6FC] opacity-60 mt-0.5">{m.desc}</span>
              </div>
            ))}
          </div>
          <ChevronRight size={16} className="text-[#F0F6FC] opacity-40 -rotate-90" />
          <div className="dep-row">
            <div className="dep-box util">utils/logger.py</div>
            <div className="dep-box util">utils/db.py</div>
            <span className="text-[10px] text-[#F0F6FC] opacity-70 ml-2">Shared utilities</span>
          </div>
          <ChevronRight size={16} className="text-[#F0F6FC] opacity-40 -rotate-90" />
          <div className="dep-row">
            <div className="dep-box ext">psycopg2</div>
            <span className="text-[10px] text-[#F0F6FC] opacity-70 ml-2">External — PostgreSQL adapter</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-[10px] text-[#F0F6FC] opacity-60 mt-1">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#161B22]" /> Entry</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#F0F6FC]" /> Orchestrator</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border border-[#F0F6FC]/60 bg-transparent" /> Stage</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#F0F6FC]/30" /> Utility</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#D29922]" /> External</span>
        </div>
      </div>
    ),

    // Slide 23: Testing & Reliability
    () => (
      <div className="slide-inner">
        <div className="slide-label">Reliability</div>
        <h2 className="slide-heading">Testing &amp; Reliability</h2>
        <p className="slide-subheading">Three automated tests ensure pipeline correctness and data integrity.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
          {[
            {
              icon: CheckCircle, name: 'test_pipeline_status.py', color: '#58A6FF',
              desc: 'Verifies that each stage completes successfully and returns the expected status code.',
              checks: ['ETL exit code == 0', 'No unhandled exceptions', 'All stages report completion']
            },
            {
              icon: Scale, name: 'test_row_count_invariant.py', color: '#3FB950',
              desc: 'Validates: len(clean) + len(quarantine) + len(rejected) == len(raw).',
              checks: ['Row count equation holds', 'Per-entity precision', 'Zero data loss guarantee']
            },
            {
              icon: RotateCcw, name: 'test_stale_file_overwrite.py', color: '#D29922',
              desc: 'Ensures re-running overwrites previous output rather than appending.',
              checks: ['File timestamps update', 'No duplicate rows', 'Idempotent re-runs']
            },
          ].map((t) => (
            <div key={t.name} className="bg-[#1C2128] rounded-lg p-2.5 text-[#F0F6FC] flex flex-col border border-[#F0F6FC]/10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded flex items-center justify-center shrink-0" style={{ background: `${t.color}25`, color: t.color }}>
                  <t.icon size={14} />
                </div>
                <div className="font-['JetBrains_Mono'] text-[10px] font-semibold truncate" style={{ color: t.color }}>{t.name}</div>
              </div>
              <div className="text-[10px] text-[#F0F6FC] opacity-80 leading-relaxed mb-1.5 flex-1">{t.desc}</div>
              <ul className="space-y-0.5">
                {t.checks.map((c) => (
                  <li key={c} className="text-[9px] text-[#3FB950] flex items-center gap-1">
                    <span className="text-[#3FB950] font-bold">&#x2713;</span> <span className="text-[#F0F6FC] opacity-80">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-1.5">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[#F0F6FC] opacity-60 font-['JetBrains_Mono']">
            <FileCode size={12} /> tests/ &mdash; 3 files &middot; pytest &middot; Run after every pipeline execution
          </span>
        </div>
      </div>
    ),

    // Slide 24: Project Timeline
    () => (
      <div className="slide-inner">
        <div className="slide-label">Planning</div>
        <h2 className="slide-heading">Project Timeline</h2>
        <p className="slide-subheading">A four-week planning and execution cycle with clear milestones.</p>
        <div className="timeline">
          {[
            { week: 'W1', title: 'Exploration & Architecture', desc: 'Source discovery, data profiling, architecture design', deliverables: 'Wiki Home, Data-Sources, Architecture docs', team: 'All' },
            { week: 'W2', title: 'Pipeline Implementation', desc: 'ETL development, initial runs, transform rules', deliverables: 'ETL-Pipeline, Transformation-Rules, first pipeline run', team: 'Ali, Amin' },
            { week: 'W3', title: 'Validation Hardening', desc: 'Quality checks, testing, edge case handling', deliverables: 'Data-Quality-Definitions, 3 test files, quarantine logic', team: 'Aseel, Menna' },
            { week: 'W4', title: 'Documentation & Presentation', desc: 'Wiki completion, slide deck, final review', deliverables: 'Glossary, Team-Roles, project_flow, slide deck', team: 'Habiba, All' },
          ].map((s, i) => (
            <div key={s.week} className="timeline-step">
              <div className="timeline-num">{i + 1}</div>
              <div className="timeline-title">{s.title}</div>
              <div className="timeline-desc">{s.desc}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 mt-3">
          {[
            { week: 'Week 1', deliverables: 'Data profiling, architecture design, initial wiki pages', team: 'All team members' },
            { week: 'Week 2', deliverables: 'Core ETL pipeline, transform rules, first successful run', team: 'Ali (lead), Amin (extract/load)' },
            { week: 'Week 3', deliverables: 'Validation logic, automated tests, edge case handling', team: 'Aseel (quality), Menna (SQL)' },
            { week: 'Week 4', deliverables: 'Full documentation, presentation, final review', team: 'Habiba (docs), all (review)' },
          ].map((w) => (
            <div key={w.week} className="p-2 rounded bg-[#F0F6FC]/05 border border-[#F0F6FC]/10">
              <div className="text-[11px] font-semibold text-[#F0F6FC] opacity-70 mb-1">{w.week}</div>
              <div className="text-[10px] text-[#F0F6FC] opacity-50 leading-relaxed mb-1">{w.deliverables}</div>
              <div className="text-[10px] text-[#58A6FF] opacity-50 font-['JetBrains_Mono']">{w.team}</div>
            </div>
          ))}
        </div>
      </div>
    ),

    // Slide 25: Team Roles
    () => (
      <div className="slide-inner">
        <div className="slide-label">Team</div>
        <h2 className="slide-heading">Team Roles &amp; Contributions</h2>
        <p className="slide-subheading">Five members, five areas of ownership. Each contributed to multiple pipeline stages.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mt-2">
          {[
            { name: 'Ali', icon: Compass, role: 'Project Lead', area: 'Architecture & Transform', artifacts: ['ETL main.py orchestration', 'transform.py cleaning rules', 'Architecture decisions', 'Project coordination'], color: '#58A6FF' },
            { name: 'Amin', icon: Download, role: 'Data Engineer', area: 'Extract & Load', artifacts: ['extract.py source reader', 'load.py PostgreSQL loader', 'CSV profiling & schema', 'Bulk COPY procedures'], color: '#D29922' },
            { name: 'Aseel', icon: ShieldCheck, role: 'Quality Lead', area: 'Validation & Testing', artifacts: ['validate.py 6-check cascade', '3 automated pytest files', 'Row-count invariant', 'Quarantine logic'], color: '#3FB950' },
            { name: 'Menna', icon: Database, role: 'Data Modeler', area: 'SQL & Reporting', artifacts: ['5 SQL schema scripts', 'Gold table design', 'Reporting views', 'Stored procedures'], color: '#BC8CFF' },
            { name: 'Habiba', icon: BookOpen, role: 'Doc Lead', area: 'Documentation & BI', artifacts: ['11 wiki pages', 'Glossary & Team-Roles', 'Data-Randomness-Report', 'Presentation design'], color: '#D29922' },
          ].map((m) => (
            <div key={m.name} className="card card-dark team-card" style={{ borderTop: `2px solid ${m.color}` }}>
              <div className="team-avatar" style={{ borderColor: `${m.color}40` }}><m.icon size={20} /></div>
              <div className="team-name">{m.name}</div>
              <div className="text-[10px] font-semibold opacity-50 mb-1" style={{ color: m.color }}>{m.role}</div>
              <div className="text-[10px] text-[#F0F6FC] opacity-45 mb-2">{m.area}</div>
              <div className="space-y-0.5">
                {m.artifacts.map((a) => (
                  <div key={a} className="text-[9px] text-[#F0F6FC] opacity-40 flex items-start gap-1">
                    <span className="text-[#3FB950] mt-px shrink-0">&#x2022;</span>
                    <span className="leading-tight">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    // Slide 26: Documentation — The Wiki
    () => (
      <div className="slide-inner">
        <div className="slide-label">Documentation</div>
        <h2 className="slide-heading">Project Documentation &mdash; The Wiki</h2>
        <p className="slide-subheading">11 comprehensive wiki pages covering every aspect of the project.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mt-2">
          {[
            { icon: FileText, name: 'Home.md', desc: 'Project overview, quick-start, navigation hub', sections: 'Overview, Goals, Quick Start' },
            { icon: Play, name: 'Run-Guide.md', desc: 'Step-by-step pipeline execution instructions', sections: 'Prerequisites, Setup, Run, Troubleshoot' },
            { icon: Blocks, name: 'Project-Architecture.md', desc: 'Medallion architecture and module design', sections: 'Layers, Modules, Data Flow' },
            { icon: HardDrive, name: 'Data-Sources.md', desc: 'Source system descriptions and schemas', sections: '3 CRMs, 6 entities, Column defs' },
            { icon: BarChart3, name: 'Data-Randomness-Report.md', desc: 'Statistical analysis of data quality issues', sections: 'Casing, Typos, Dates, Prices' },
            { icon: GitBranch, name: 'ETL-Pipeline.md', desc: 'Detailed pipeline stage documentation', sections: '5 stages, Inputs/Outputs' },
            { icon: Wand2, name: 'Transformation-Rules.md', desc: 'Every cleaning and normalization rule', sections: 'Trim, Normalize, Parse, Validate' },
            { icon: ShieldCheck, name: 'Data-Quality-Definitions.md', desc: 'Clean, Quarantine, Rejected definitions', sections: 'Tiers, Rules, Destinations' },
            { icon: BookOpen, name: 'Glossary.md', desc: 'Domain and technical term definitions', sections: 'ETL, Medallion, PK/FK, Stages' },
            { icon: Users, name: 'Team-Roles.md', desc: 'Team member responsibilities and contributions', sections: '5 members, Areas, Artifacts' },
            { icon: FileText, name: 'project_flow.md', desc: 'Project planning flow and timeline', sections: '4 weeks, Milestones, Deliverables' },
          ].map((d) => (
            <div key={d.name} className="doc-card card bg-[#1C2128] text-[#F0F6FC] p-2.5">
              <div className="doc-icon"><d.icon size={14} /></div>
              <div className="min-w-0">
                <div className="doc-name">{d.name}</div>
                <div className="doc-desc">{d.desc}</div>
                <div className="text-[9px] text-[#8B949E] mt-0.5 font-['JetBrains_Mono'] opacity-60">{d.sections}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),

    // Slide 27: Enhanced Closing + Roadmap
    () => (
      <div className="slide-inner items-center justify-center text-center" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '350px', height: '350px', borderRadius: '50%', border: '1px solid rgba(240,246,252,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '1px solid rgba(240,246,252,0.04)', pointerEvents: 'none' }} />
        <div className="max-w-4xl w-full" style={{ position: 'relative', zIndex: 1 }}>
          {/* Key Takeaways */}
          <div className="font-['JetBrains_Mono'] text-[0.55rem] tracking-[0.15em] uppercase text-[#F0F6FC] opacity-50 mb-1">
            Key Takeaways
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {[
              { icon: ShieldCheck, text: 'Zero data loss proven by row-count invariant', color: '#3FB950' },
              { icon: RotateCcw, text: 'Idempotent pipeline — safe to re-run anytime', color: '#58A6FF' },
              { icon: CheckCircle2, text: '707 records quarantined/rejected, never silently loaded', color: '#D29922' },
            ].map((t) => (
              <div key={t.text} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[#F0F6FC]/08 border border-[#F0F6FC]/15">
                <t.icon size={16} style={{ color: t.color }} />
                <div className="text-[10px] text-[#F0F6FC] opacity-85 leading-relaxed">{t.text}</div>
              </div>
            ))}
          </div>
          {/* Next Steps / Roadmap */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[
              { step: '1', title: 'Incremental Loads', desc: 'Replace full refresh with CDC-based incremental extraction for daily delta runs', color: '#58A6FF' },
              { step: '2', title: 'Monitoring Dashboard', desc: 'Grafana dashboard showing pipeline health, run metrics, and data quality trends', color: '#3FB950' },
              { step: '3', title: 'CI/CD Integration', desc: 'GitHub Actions to auto-run tests on PR, deploy schema changes, and trigger pipelines', color: '#D29922' },
              { step: '4', title: 'Schema Evolution', desc: 'Versioned schema migration scripts to handle source system column changes gracefully', color: '#BC8CFF' },
            ].map((r) => (
              <div key={r.step} className="p-2 rounded bg-[#F0F6FC]/08 border border-[#F0F6FC]/15 text-left">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 rounded-full bg-[#161B22] flex items-center justify-center shrink-0 text-white text-[9px] font-bold font-['JetBrains_Mono']" style={{ color: r.color }}>{r.step}</div>
                  <div className="text-[11px] font-semibold text-white">{r.title}</div>
                </div>
                <div className="text-[9px] text-[#F0F6FC] opacity-75 leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
          {/* Thank you */}
          <div className="font-['Playfair_Display'] text-3xl text-white/90 italic mb-2">Thank you</div>
          <div className="w-10 h-0.5 bg-gradient-to-r from-[#3FB950] via-[#58A6FF] to-[#BC8CFF] mx-auto mb-2 opacity-50" />
          <div className="flex items-center justify-center gap-3 text-xs text-[#F0F6FC] opacity-55">
            <span>Ali</span><span className="w-px h-3 bg-[#F0F6FC] opacity-30" />
            <span>Amin</span><span className="w-px h-3 bg-[#F0F6FC] opacity-30" />
            <span>Aseel</span><span className="w-px h-3 bg-[#F0F6FC] opacity-30" />
            <span>Menna</span><span className="w-px h-3 bg-[#F0F6FC] opacity-30" />
            <span>Habiba</span>
          </div>
        </div>
      </div>
    ),
  ]

  const SlideComponent = slides[index]
  if (!SlideComponent) return null

  return (
    <MotionSlide index={index}>
      <div className="slide">
        {SlideComponent()}
      </div>
    </MotionSlide>
  )
}

// Arrow line for SVG
function ArrowLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F0F6FC" strokeOpacity="0.2" strokeWidth="1.5" />
      <polygon points={`${x2 - 6},${y2 - 4} ${x2 - 6},${y2 + 4} ${x2},${y2}`} fill="#F0F6FC" fillOpacity="0.2" />
    </>
  )
}

function ArrowDown({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F0F6FC" strokeOpacity="0.2" strokeWidth="1.5" />
      <polygon points={`${x2 - 4},${y2 - 6} ${x2 + 4},${y2 - 6} ${x2},${y2}`} fill="#F0F6FC" fillOpacity="0.2" />
    </>
  )
}

// Pipeline Interactive Component
import { useState } from 'react'

const stageData = [
  {
    id: 'extract', icon: Download, label: 'Extract', file: 'extract.py',
    desc: 'Reads six CSV files from data/raw/ into pandas DataFrames, validating that required column headers exist before loading.',
    ops: [
      'Reads contacts, customers, products, sales_orders, order_lines, and etl_batch CSVs from data/raw/',
      'Validates that each CSV contains the required column headers',
      'Returns a dictionary of DataFrames keyed by entity name for downstream processing',
      'Logs the row count of each extracted file for traceability',
    ]
  },
  {
    id: 'transform', icon: Shuffle, label: 'Transform', file: 'transform.py',
    desc: 'Cleans and normalizes each entity\'s data &mdash; standardizing values, correcting formats, and parsing types.',
    ops: [
      'Trims leading/trailing whitespace and tabs from all string fields',
      'Validates UUID format for primary key columns',
      'Validates and lowercases email addresses',
      'Canonicalises department, segment, status, and category via lookup tables',
      'Parses dates using three ISO format attempts',
      'Parses numeric prices and quantities, removing currency symbols and commas',
    ]
  },
  {
    id: 'validate', icon: CheckCircle, label: 'Validate', file: 'validate.py',
    desc: 'Runs six sequential validation checks, routing each record to Clean, Quarantine, or Rejected.',
    ops: [
      'PK uniqueness &mdash; duplicate primary keys are quarantined',
      'Required fields &mdash; missing mandatory fields trigger quarantine',
      'Email uniqueness &mdash; duplicates trigger cascade quarantine',
      'SKU uniqueness &mdash; duplicates trigger cascade quarantine',
      'Email format &mdash; invalid format triggers quarantine',
      'FK referential integrity &mdash; orphan records trigger quarantine',
      'Outputs three sets of CSVs: clean, quarantine, and rejected',
    ]
  },
  {
    id: 'load', icon: Upload, label: 'Load', file: 'load.py',
    desc: 'Loads clean data into PostgreSQL via a two-stage process: bulk COPY into staging tables, then upsert into gold tables.',
    ops: [
      'Truncates all staging tables to ensure idempotent re-runs',
      'Bulk COPY clean CSVs into staging tables using psycopg2',
      'Executes stored procedures: INSERT new records, UPDATE existing records',
      'DELETE-then-reinsert strategy for uniqueness conflicts',
      'Records each load as an etl_batch entry with timestamps and status',
    ]
  },
  {
    id: 'reconcile', icon: Scale, label: 'Reconcile', file: 'reconcile.py',
    desc: 'Verifies that no data was lost or duplicated during the pipeline run.',
    ops: [
      'Verifies: len(clean) + len(quarantine) + len(rejected) == len(raw)',
      'Verifies: PostgreSQL staging row count == gold row count',
      'Writes pipeline_summary_<timestamp>.json with per-entity counts',
      'Writes per-run logs to etl/logs/<timestamp>/',
      'Appends metrics to metrics.log for longitudinal tracking',
    ]
  }
]

function PipelineInteractive() {
  const [activeStage, setActiveStage] = useState('extract')
  const current = stageData.find(s => s.id === activeStage)!

  return (
    <div className="flex flex-col flex-1">
      <div className="pipeline-flow">
        {stageData.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`pipeline-node ${activeStage === s.id ? 'active' : ''}`}
              onClick={() => setActiveStage(s.id)}
            >
              <div className="pn-icon"><s.icon size={20} /></div>
              <div className="pn-label">{s.label}</div>
              <div className="pn-file">{s.file}</div>
            </div>
            {i < stageData.length - 1 && (
              <div className="pipeline-arrow"><ChevronRight size={20} /></div>
            )}
          </div>
        ))}
      </div>

      <div className="pipeline-detail">
        <div className="pd-header">
          <span className="pd-file">etl/{current.file}</span>
        </div>
        <p className="pd-desc" dangerouslySetInnerHTML={{ __html: current.desc }} />
        <ul className="pd-ops">
          {current.ops.map((op, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: op }} />
          ))}
        </ul>
      </div>

      {activeStage === 'validate' && (
        <div className="validate-branches">
          <div className="vb-box clean">
            <div className="vb-label">Clean</div>
            <div className="vb-path">data/clean/</div>
          </div>
          <div className="vb-box quarantine">
            <div className="vb-label">Quarantine</div>
            <div className="vb-path">data/quarantine/</div>
          </div>
          <div className="vb-box rejected">
            <div className="vb-label">Rejected</div>
            <div className="vb-path">data/rejected/</div>
          </div>
        </div>
      )}
    </div>
  )
}

// Stage Deep Dive slides
function StageDeepDive({ index }: { index: number }) {
  const stages = [
    {
      label: 'Stage 1', heading: 'Extract', icon: Download,
      content: (
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2 text-[#F0F6FC] opacity-70">Source Files</h3>
              <div className="space-y-1.5">
                {[
                  { file: 'contacts.csv', rows: '1,661 rows' },
                  { file: 'customers.csv', rows: '1,618 rows' },
                  { file: 'products.csv', rows: '764 rows' },
                  { file: 'sales_orders.csv', rows: '2,770 rows' },
                  { file: 'order_lines.csv', rows: '3,663 rows' },
                  { file: 'etl_batch.csv', rows: 'Metadata' },
                ].map((f) => (
                  <div key={f.file} className="flex items-center justify-between p-2 rounded bg-[#F0F6FC]/05 border border-[#F0F6FC]/10">
                    <span className="font-['JetBrains_Mono'] text-xs text-[#58A6FF]">{f.file}</span>
                    <span className="text-[11px] text-[#F0F6FC] opacity-50">{f.rows}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2 text-[#F0F6FC] opacity-70">Implementation</h3>
              <div className="p-3 rounded bg-[#0D1117] border border-[#F0F6FC]/10 font-['JetBrains_Mono'] text-xs text-[#F0F6FC] leading-relaxed">
                <div className="text-[#8B949E] mb-1"># etl/extract.py</div>
                def extract() -&gt; dict[str, pd.DataFrame]:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;dfs = {}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;for file in SOURCE_FILES:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path = RAW_DIR / file<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;df = pd.read_csv(path)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;validate_headers(df, file)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dfs[entity] = df<br />
                &nbsp;&nbsp;&nbsp;&nbsp;return dfs
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-start gap-2 text-xs text-[#F0F6FC] opacity-60">
                  <span className="text-[#3FB950] mt-0.5">&#x2022;</span>
                  Validates required column headers exist before loading
                </div>
                <div className="flex items-start gap-2 text-xs text-[#F0F6FC] opacity-60">
                  <span className="text-[#3FB950] mt-0.5">&#x2022;</span>
                  Returns dict of DataFrames keyed by entity name
                </div>
                <div className="flex items-start gap-2 text-xs text-[#F0F6FC] opacity-60">
                  <span className="text-[#3FB950] mt-0.5">&#x2022;</span>
                  Logs row count of each extracted file for traceability
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Stage 2', heading: 'Transform', icon: Shuffle,
      content: (
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm text-[#F0F6FC] opacity-70 mb-3">
            Before and after &mdash; each field type gets standardized.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-semibold mb-2 text-[#F85149]">Before (raw)</h3>
              <div className="space-y-1.5">
                {[
                  { field: 'email', before: '"  ALICE@EXAMPLE.COM  "' },
                  { field: 'full_name', before: '"alice johnson"' },
                  { field: 'phone', before: '"+1 (555) 123-4567"' },
                  { field: 'status', before: '"  Pending"' },
                  { field: 'order_date', before: '"2026-13-45"' },
                  { field: 'list_price', before: '"$1,234.56"' },
                ].map((f) => (
                  <div key={f.field} className="flex items-center gap-2 p-1.5 rounded bg-[#F85149]/05 text-xs">
                    <span className="font-['JetBrains_Mono'] text-[#D29922] w-20 shrink-0">{f.field}</span>
                    <span className="chip chip-error">{f.before}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold mb-2 text-[#3FB950]">After (transformed)</h3>
              <div className="space-y-1.5">
                {[
                  { field: 'email', after: '"alice@example.com"' },
                  { field: 'full_name', after: '"Alice Johnson"' },
                  { field: 'phone', after: '"+15551234567"' },
                  { field: 'status', after: '"pending"' },
                  { field: 'order_date', after: '"2026-01-15"' },
                  { field: 'list_price', after: '1234.56' },
                ].map((f) => (
                  <div key={f.field} className="flex items-center gap-2 p-1.5 rounded bg-[#3FB950]/05 text-xs">
                    <span className="font-['JetBrains_Mono'] text-[#D29922] w-20 shrink-0">{f.field}</span>
                    <span className="chip chip-fixed">{String(f.after)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Stage 3', heading: 'Validate', icon: CheckCircle,
      content: (
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-xs text-[#F0F6FC] opacity-50">Validation Cascade &mdash; 6 sequential checks</div>
            <div className="flex gap-2">
              <span className="text-[11px] flex items-center gap-1 text-[#3FB950]"><span className="w-2 h-2 rounded bg-[#3FB950]" /> Pass</span>
              <span className="text-[11px] flex items-center gap-1 text-[#D29922]"><span className="w-2 h-2 rounded bg-[#D29922]" /> Fail</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <HorizontalCascade />
          </div>
        </div>
      )
    },
    {
      label: 'Stage 4', heading: 'Load', icon: Upload,
      content: (
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2 text-[#F0F6FC] opacity-70">Load Process</h3>
              <div className="space-y-2">
                {[
                  { step: '1', title: 'Truncate Staging', desc: 'Clear all stg_* tables for idempotent re-run' },
                  { step: '2', title: 'Bulk COPY', desc: 'Load clean CSVs into staging via psycopg2 COPY' },
                  { step: '3', title: 'Upsert to Gold', desc: 'INSERT new / UPDATE existing / DELETE conflicts' },
                  { step: '4', title: 'Audit', desc: 'Record run in etl_batch with timestamps and status' },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-3 p-2 rounded bg-[#F0F6FC]/05 border border-[#F0F6FC]/10">
                    <div className="w-7 h-7 rounded-full bg-[#161B22] flex items-center justify-center shrink-0 text-white text-xs font-bold font-['JetBrains_Mono']">{s.step}</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{s.title}</div>
                      <div className="text-[11px] text-[#F0F6FC] opacity-55">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2 text-[#F0F6FC] opacity-70">Load Order</h3>
              <div className="p-3 rounded bg-[#0D1117] border border-[#F0F6FC]/10">
                <div className="font-['JetBrains_Mono'] text-xs text-[#F0F6FC] leading-loose">
                  <span className="text-[#58A6FF]">contact</span> <span className="text-[#8B949E]">(no FK deps)</span><br />
                  <span className="text-[#58A6FF]">product</span> <span className="text-[#8B949E]">(no FK deps)</span><br />
                  <span className="text-[#58A6FF]">customer</span> <span className="text-[#D29922]">(FK &rarr; contact)</span><br />
                  <span className="text-[#58A6FF]">sales_order</span> <span className="text-[#D29922]">(FK &rarr; customer)</span><br />
                  <span className="text-[#58A6FF]">order_line</span> <span className="text-[#D29922]">(FK &rarr; sales_order + product)</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-[#F0F6FC] opacity-50">
                Stored procedures defined in <span className="font-['JetBrains_Mono'] text-[#D29922]">04_load_procedures.sql</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Stage 5', heading: 'Reconcile', icon: Scale,
      content: (
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm text-[#F0F6FC] opacity-70 mb-2">
            Every pipeline run must prove that no data was lost. Two invariant checks guarantee this.
          </p>
          <div className="recon-equation">
            <div className="recon-term clean">
              <div className="rt-label">len(clean)</div>
            </div>
            <div className="recon-op">+</div>
            <div className="recon-term quarantine">
              <div className="rt-label">len(quarantine)</div>
            </div>
            <div className="recon-op">+</div>
            <div className="recon-term rejected">
              <div className="rt-label">len(rejected)</div>
            </div>
            <div className="recon-op">=</div>
            <div className="recon-term raw">
              <div className="rt-label">len(raw)</div>
            </div>
          </div>
          <div className="text-center mt-1">
            <div className="recon-db-check">
              <CheckCircle size={16} />
              PostgreSQL: staging row count == gold row count
            </div>
          </div>
          <p className="text-xs text-[#F0F6FC] opacity-50 italic text-center mt-2">
            Together these checks prove zero data loss on every single pipeline run.
          </p>
          <div className="source-table-wrap mt-2 max-w-md mx-auto">
            <table className="source-table">
              <thead>
                <tr><th>Gold Table</th><th>Rows After Clean Run</th></tr>
              </thead>
              <tbody>
                <tr><td>etl_batch</td><td>2</td></tr>
                <tr><td>contact</td><td>1,586</td></tr>
                <tr><td>customer</td><td>1,539</td></tr>
                <tr><td>product</td><td>757</td></tr>
                <tr><td>sales_order</td><td>2,630</td></tr>
                <tr><td>order_line</td><td>3,257</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  ]

  const stage = stages[index]
  return (
    <div className="slide-inner">
      <div className="slide-label">Pipeline &mdash; {stage.label}</div>
      <h2 className="slide-heading">Stage Deep Dive: {stage.heading}</h2>
      {stage.content}
    </div>
  )
}
