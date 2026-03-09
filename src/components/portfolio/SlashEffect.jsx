import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Single slash with glow + afterimage + impact
function Slash({ x1, y1, x2, y2, delay = 0 }) {
  return (
    <>
      {/* Main blade */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="white" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
        transition={{ duration: 0.22, delay, times: [0, 0.55, 1], ease: 'easeOut' }}
      />
      {/* Glow */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="white" strokeWidth="24" strokeLinecap="round"
        style={{ filter: 'blur(10px)' }}
        initial={{ pathLength: 0, opacity: 0.65 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.65, 0.65, 0] }}
        transition={{ duration: 0.22, delay, times: [0, 0.55, 1], ease: 'easeOut' }}
      />
      {/* Thin afterimage */}
      <motion.line
        x1={x1 - 10} y1={y1 - 10} x2={x2 - 10} y2={y2 - 10}
        stroke="white" strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0, 0.35, 0] }}
        transition={{ duration: 0.32, delay: delay + 0.04, times: [0, 0.5, 1] }}
      />
      {/* Impact flash at end point */}
      <motion.circle
        cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="35" fill="white"
        style={{ filter: 'blur(14px)' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.9, 0], scale: [0, 1.3, 0] }}
        transition={{ duration: 0.22, delay: delay + 0.2, ease: 'easeOut' }}
      />
      {/* Shockwave ring */}
      <motion.circle
        cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="12" fill="none" stroke="white" strokeWidth="2"
        style={{ transformOrigin: `${(x1 + x2) / 2}px ${(y1 + y2) / 2}px` }}
        initial={{ opacity: 0.9, scale: 0 }}
        animate={{ opacity: 0, scale: 5 }}
        transition={{ duration: 0.45, delay: delay + 0.22, ease: 'easeOut' }}
      />
    </>
  );
}

export default function SlashEffect({ isHovered }) {
  const [slashKey, setSlashKey] = useState(0);

  useEffect(() => {
    if (isHovered) {
      setSlashKey(k => k + 1);
    }
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          key={slashKey}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 20 }}
        >
          <svg viewBox="0 0 400 600" className="w-full h-full" fill="none" overflow="visible">
            {/* Single upward slash - 45 degree following sword */}
            <Slash x1={320} y1={450} x2={60} y2={190} delay={0.15} />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}