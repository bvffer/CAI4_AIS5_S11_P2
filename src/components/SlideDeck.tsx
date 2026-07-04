'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SlideContent } from './slides/SlideContent'

const TOTAL_SLIDES = 28

export function SlideDeck() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const goTo = useCallback((n: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, n))
    setDirection(clamped - current)
    setCurrent(clamped)
  }, [current])

  const next = useCallback(() => {
    if (current < TOTAL_SLIDES - 1) {
      setDirection(1)
      setCurrent(c => c + 1)
    }
  }, [current])

  const prev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent(c => c - 1)
    }
  }, [current])

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(TOTAL_SLIDES - 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [next, prev, goTo])

  // Touch swipe
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      const dy = e.changedTouches[0].clientY - touchStartY.current
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) next()
        else prev()
      }
    }
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [next, prev])

  // Click zones
  const handleClickLeft = useCallback(() => prev(), [prev])
  const handleClickRight = useCallback(() => next(), [next])

  return (
    <>
      {/* Progress Bar */}
      <div
        id="slide-progress"
        style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }}
      />

      {/* Click zones */}
      {current > 0 && (
        <div className="click-zone prev" onClick={handleClickLeft} />
      )}
      {current < TOTAL_SLIDES - 1 && (
        <div className="click-zone next" onClick={handleClickRight} />
      )}

      {/* Slides */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
        <AnimatePresence initial={false} custom={direction}>
          <SlideContent key={current} index={current} />
        </AnimatePresence>
      </div>

      {/* Nav Arrows */}
      <button
        className="slide-nav-btn slide-nav-prev"
        onClick={prev}
        disabled={current === 0}
        aria-label="Previous slide"
        suppressHydrationWarning
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="slide-nav-btn slide-nav-next"
        onClick={next}
        disabled={current === TOTAL_SLIDES - 1}
        aria-label="Next slide"
        suppressHydrationWarning
      >
        <ChevronRight size={20} />
      </button>


    </>
  )
}
