'use client'

import { motion } from "framer-motion"
import NetworkNode from "./network-node"
import NetworkBranch from "./network-branch"

export default function NetworkTree() {
  const nodes = [
    // Roots
    { x: -40, y: 120, delay: 0 },       // Left Root
    { x: 40, y: 120, delay: 0 },        // Right Root
    { x: -20, y: 110, delay: 0.2 },     // Left Sub-root
    { x: 20, y: 110, delay: 0.2 },      // Right Sub-root
    { x: 0, y: 100, delay: 0.5 },       // Root Base
    
    // Trunk
    { x: 0, y: 60, delay: 0.5 },
    { x: 0, y: 30, delay: 0.5 },
    
    // Main Branches Level 1
    { x: -40, y: 0, delay: 0.75 },
    { x: 40, y: 0, delay: 0.75 },
    { x: -20, y: -20, delay: 1 },
    { x: 20, y: -20, delay: 1 },
    
    // Branches Level 2
    { x: -60, y: -30, delay: 1.25 },
    { x: -30, y: -40, delay: 1.25 },
    { x: 30, y: -40, delay: 1.25 },
    { x: 60, y: -30, delay: 1.25 },
    
    // Canopy Edge Nodes
    { x: -80, y: -20, delay: 1.5 },
    { x: -70, y: -50, delay: 1.5 },
    { x: -50, y: -70, delay: 1.5 },
    { x: -20, y: -85, delay: 1.5 },
    { x: 0, y: -90, delay: 1.5 },
    { x: 20, y: -85, delay: 1.5 },
    { x: 50, y: -70, delay: 1.5 },
    { x: 70, y: -50, delay: 1.5 },
    { x: 80, y: -20, delay: 1.5 },
    
    // Extra Foliage Nodes
    { x: -40, y: -60, delay: 1.75 },
    { x: -10, y: -70, delay: 1.75 },
    { x: 10, y: -70, delay: 1.75 },
    { x: 40, y: -60, delay: 1.75 },
    { x: -30, y: -75, delay: 2.0 },
    { x: 30, y: -75, delay: 2.0 },
    { x: 0, y: -80, delay: 2.0 },
  ]

  const connections = [
    // Root System
    { from: 0, to: 2, delay: 0.2 },
    { from: 1, to: 3, delay: 0.2 },
    { from: 2, to: 4, delay: 0.3 },
    { from: 3, to: 4, delay: 0.3 },
    
    // Trunk
    { from: 4, to: 5, delay: 0.5 },
    { from: 5, to: 6, delay: 0.6 },
    
    // Primary Branches
    { from: 6, to: 7, delay: 0.75 },
    { from: 6, to: 8, delay: 0.75 },
    { from: 6, to: 9, delay: 1.0 },
    { from: 6, to: 10, delay: 1.0 },
    
    // Secondary Branches
    { from: 7, to: 11, delay: 1.25 },
    { from: 9, to: 12, delay: 1.25 },
    { from: 10, to: 13, delay: 1.25 },
    { from: 8, to: 14, delay: 1.25 },
    
    // Canopy Connections
    { from: 11, to: 15, delay: 1.5 },
    { from: 11, to: 16, delay: 1.5 },
    { from: 12, to: 17, delay: 1.5 },
    { from: 12, to: 18, delay: 1.5 },
    { from: 13, to: 19, delay: 1.5 },
    { from: 13, to: 20, delay: 1.5 },
    { from: 14, to: 21, delay: 1.5 },
    { from: 14, to: 22, delay: 1.5 },
    { from: 14, to: 23, delay: 1.5 },
    
    // Extra Foliage Connections
    { from: 16, to: 24, delay: 1.75 },
    { from: 17, to: 25, delay: 1.75 },
    { from: 20, to: 26, delay: 1.75 },
    { from: 21, to: 27, delay: 1.75 },
    { from: 18, to: 28, delay: 2.0 },
    { from: 20, to: 29, delay: 2.0 },
    { from: 19, to: 30, delay: 2.0 },
  ]

  return (
    <motion.div 
      className="w-96 h-96 text-primary mx-auto mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg viewBox="-100 -100 200 250">
        {/* Draw connections first */}
        {connections.map((conn, i) => (
          <NetworkBranch
            key={i}
            x1={nodes[conn.from].x}
            y1={nodes[conn.from].y}
            x2={nodes[conn.to].x}
            y2={nodes[conn.to].y}
            delay={conn.delay}
          />
        ))}
        
        {/* Draw nodes on top */}
        {nodes.map((node, i) => (
          <NetworkNode key={i} x={node.x} y={node.y} delay={node.delay} />
        ))}

        {/* Pulse animation on main nodes */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={nodes[i].x}
            cy={nodes[i].y}
            r="8"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 2,
              delay: nodes[i].delay,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}