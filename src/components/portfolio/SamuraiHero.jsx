import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SlashEffect from './SlashEffect';
import CherryBlossom from './CherryBlossom';

const SAMURAI_IDLE = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699bcabea901e12dc3cc3b26/a4e35fb52_generated_image.png';
const SAMURAI_DRAWN = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699bcabea901e12dc3cc3b26/d8afb91a0_generated_image.png';

export default function SamuraiHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* Cherry blossom petals */}
      <CherryBlossom />



      {/* Subtle vertical line */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5"
        initial={{ scaleY: 0 }}
        animate={isLoaded ? { scaleY: 1 } : {}}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Ink splash / glow under samurai */}
      <motion.div
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-64 h-8 rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 80%)' }}
        animate={isHovered ? { opacity: 1, scaleX: 1.3 } : { opacity: 0.5, scaleX: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center gap-0 md:gap-16 h-full md:pt-8">

        {/* Text - top on mobile, left on desktop */}
        <motion.div
          className="flex flex-col items-center md:items-start justify-end md:justify-center order-1 md:order-1 md:flex-1 w-full h-1/2 md:h-auto pt-10 md:pt-0 pb-4 md:pb-0 text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="text-white leading-none"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 8rem)', fontFamily: "'Cinzel', serif", fontWeight: 600, letterSpacing: '0.05em' }}>
            Rene Hernandez
          </h1>

          <motion.div
            className="w-16 h-px bg-white/40 my-6"
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            style={{ originX: 0 }}
          />

          <p className="text-white/50 tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', fontWeight: 300 }}>
            Backend Engineer
          </p>

          <div className="flex gap-6 mt-8 md:mt-10">
            <a href="#projects" className="text-white text-sm tracking-[0.2em] uppercase border-b border-white pb-1 hover:text-white/60 hover:border-white/60 transition-colors duration-300">
              View Work
            </a>
            <a href="#contact" className="text-white/40 text-sm tracking-[0.2em] uppercase border-b border-white/20 pb-1 hover:text-white/60 hover:border-white/40 transition-colors duration-300">
              Contact
            </a>
          </div>
        </motion.div>

        {/* Samurai - center/right */}
        <motion.div
          className="relative order-2 md:order-2 flex items-end justify-center flex-shrink-0"
          style={{ height: '50vh', width: 'clamp(200px, 60vw, 420px)' }}
          initial={{ opacity: 0, y: 80 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <>
            {/* Idle samurai */}
            <motion.img
              src={SAMURAI_IDLE}
              alt="Samurai"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full object-contain object-bottom select-none"
              style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.1, delay: isHovered ? 0.12 : 0 }}
              draggable={false}
            />

            {/* Sword-drawn samurai */}
            <motion.img
              src={SAMURAI_DRAWN}
              alt="Samurai drawing sword"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full object-contain object-bottom select-none"
              style={{ filter: 'invert(1)', mixBlendMode: 'screen' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.1, delay: isHovered ? 0.12 : 0 }}
              draggable={false}
            />

            {/* Double slash effect */}
            <SlashEffect isHovered={isHovered} />
          </>


        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/15" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/15" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/15" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/15" />
    </section>
  );
}