'use client'

import { motion } from "framer-motion"

export default function NetworkNode({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <>
      <motion.circle
        cx={x}
        cy={y}
        r="3"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r="6"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      />
    </>
  )
}