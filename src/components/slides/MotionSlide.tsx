'use client'

import { motion } from 'framer-motion'

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export function MotionSlide({
  index,
  direction,
  children,
}: {
  index: number
  direction?: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      key={index}
      custom={direction ?? 0}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.25 },
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {children}
    </motion.div>
  )
}
