'use client'

import { FolderTree, FileCode, Database, ShieldCheck, BookOpen, HardDrive, FlaskConical } from 'lucide-react'

const annotations = [
  {
    icon: HardDrive,
    title: 'Data Lake (data/)',
    desc: 'All data in one place. Raw source files live untouched; clean, quarantine, and rejected CSVs are written by the pipeline.',
    path: 'data/ → raw/ clean/ quarantine/ rejected/',
    color: '#8B5E34'
  },
  {
    icon: FileCode,
    title: 'Python ETL (etl/)',
    desc: 'The pipeline itself. Five stage modules (extract → transform → validate → load → reconcile) plus utils, config, and logs.',
    path: 'etl/ → main.py + stage modules + utils/',
    color: '#79C0FF'
  },
  {
    icon: Database,
    title: 'SQL Scripts (scripts/sql/)',
    desc: 'Five numbered scripts that set up the PostgreSQL schema: tables, views, stored procedures for upsert, and validation queries.',
    path: 'scripts/sql/scripts/ → 01 through 05 .sql files',
    color: '#FFA657'
  },
  {
    icon: FlaskConical,
    title: 'Tests (tests/)',
    desc: 'Three automated tests that verify pipeline status, the row count invariant, and stale file overwrite behavior.',
    path: 'tests/ → test_pipeline_status.py + invariant + overwrite',
    color: '#0E9F6E'
  },
  {
    icon: BookOpen,
    title: 'Documentation (wiki/)',
    desc: 'Eleven markdown pages covering everything from architecture to data quality definitions to glossary terms.',
    path: 'wiki/ → 11 .md pages',
    color: '#D2A8FF'
  },
  {
    icon: ShieldCheck,
    title: 'Quality Tiers (data/ subdirs)',
    desc: 'Three output quality tiers map to three directories: clean → DB load, quarantine → review, rejected → fix source.',
    path: 'data/clean/ + data/quarantine/ + data/rejected/',
    color: '#D97706'
  },
]

export function AnnotatedTour() {
  return (
    <div className="space-y-2 pr-1">
      {annotations.map((a) => (
        <div key={a.title} className="annot-card">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${a.color}15`, color: a.color }}>
              <a.icon size={14} />
            </div>
            <div className="annot-title">{a.title}</div>
          </div>
          <div className="annot-desc">{a.desc}</div>
          <div className="annot-path">{a.path}</div>
        </div>
      ))}
    </div>
  )
}
