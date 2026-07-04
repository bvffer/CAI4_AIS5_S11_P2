'use client'

import { ChevronRight } from 'lucide-react'

const checks = [
  { num: '1', label: 'PK Uniqueness', fail: 'Quarantine' },
  { num: '2', label: 'Required Fields', fail: 'Quarantine' },
  { num: '3', label: 'Email Uniqueness', fail: 'Cascade Quarantine' },
  { num: '4', label: 'SKU Uniqueness', fail: 'Cascade Quarantine' },
  { num: '5', label: 'Email Format', fail: 'Quarantine' },
  { num: '6', label: 'FK Integrity', fail: 'Quarantine' },
]

export function HorizontalCascade() {
  return (
    <div className="w-full py-2">
      <div className="flex items-start justify-center gap-0 flex-wrap">
        {checks.map((check, i) => (
          <div key={check.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="cascade-main" style={{ maxWidth: 160 }}>
                <span className="cascade-num">{check.num}</span>
                <span className="cascade-text text-[11px]">{check.label}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-8 h-px bg-[#D97706]" />
                <span className="cascade-fail-label text-[10px]">{check.fail}</span>
              </div>
            </div>
            {i < checks.length - 1 && (
              <div className="flex items-center px-1 mt-[-24px]">
                <ChevronRight size={14} className="text-[#CADCFC] opacity-20" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-3">
        <div className="cascade-result text-xs">ValidationResult &rarr; Clean / Quarantine / Rejected</div>
      </div>
    </div>
  )
}
