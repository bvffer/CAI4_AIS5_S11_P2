'use client'

import { useState, useMemo } from 'react'
import { ChevronRight, Folder, FileCode, FileText, Database, FileSpreadsheet, File } from 'lucide-react'

interface TreeNode {
  name: string
  type: 'folder' | 'py' | 'sql' | 'md' | 'csv' | 'other'
  annotation?: string
  children?: TreeNode[]
}

const iconMap: Record<string, { icon: React.ReactNode; cls: string }> = {
  folder: { icon: <Folder size={13} />, cls: 'folder' },
  py: { icon: <FileCode size={13} />, cls: 'py' },
  sql: { icon: <Database size={13} />, cls: 'sql' },
  md: { icon: <FileText size={13} />, cls: 'md' },
  csv: { icon: <FileSpreadsheet size={13} />, cls: 'csv' },
  other: { icon: <File size={13} />, cls: 'other' },
}

function TreeItem({ item, depth, filter }: { item: TreeNode; depth: number; filter: string }) {
  const [open, setOpen] = useState(true)
  const isFolder = item.type === 'folder'
  const hasChildren = isFolder && item.children && item.children.length > 0

  const nameMatch = filter === '' || item.name.toLowerCase().includes(filter.toLowerCase())
  const childrenMatch = hasChildren
    ? item.children!.some(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    : false

  if (filter && !nameMatch && !childrenMatch) return null

  const iconInfo = iconMap[item.type] || iconMap.other

  return (
    <div>
      <div
        className={`ft-item ${hasChildren ? 'has-children' : ''}`}
        style={{ paddingLeft: `${depth * 16}px` }}
        onClick={(e) => {
          if (hasChildren) {
            e.stopPropagation()
            setOpen(!open)
          }
        }}
      >
        {hasChildren ? (
          <span className={`ft-chevron ${open ? 'open' : ''}`}>
            <ChevronRight size={12} />
          </span>
        ) : (
          <span style={{ width: 14, minWidth: 14, display: 'inline-block', marginRight: '0.2rem' }} />
        )}
        <span className={`ft-icon ${isFolder ? 'folder' : item.type}`}>
          {iconInfo.icon}
        </span>
        <span className={`ft-name ${isFolder ? 'folder-name' : `file-${item.type}`}`}>
          {item.name}
        </span>
        {item.annotation && (
          <span className="ft-annotation">&middot; {item.annotation}</span>
        )}
      </div>
      {hasChildren && (
        <div className={`ft-children ${open ? 'open' : ''}`}>
          {item.children!.map((child, i) => (
            <TreeItem key={i} item={child} depth={depth + 1} filter={filter} />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileTree({ data }: { data: TreeNode[] }) {
  const [filter, setFilter] = useState('')

  return (
    <div>
      <div className="ft-filter">
        <input
          type="text"
          placeholder="Filter files..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="ft-root">
        {data.map((item, i) => (
          <TreeItem key={i} item={item} depth={0} filter={filter} />
        ))}
      </div>
      <div className="ft-legend">
        <span className="ft-legend-item"><span className="ft-legend-dot" style={{ background: '#CADCFC' }} /> Folder</span>
        <span className="ft-legend-item"><span className="ft-legend-dot" style={{ background: '#79C0FF' }} /> .py</span>
        <span className="ft-legend-item"><span className="ft-legend-dot" style={{ background: '#FFA657' }} /> .sql</span>
        <span className="ft-legend-item"><span className="ft-legend-dot" style={{ background: '#D2A8FF' }} /> .md</span>
        <span className="ft-legend-item"><span className="ft-legend-dot" style={{ background: '#7EE787' }} /> .csv</span>
      </div>
    </div>
  )
}
