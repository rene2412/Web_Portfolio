import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section ref={ref} className="bg-white py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-black/40 text-sm tracking-[0.4em] uppercase">01</span>
            <h2 className="text-black text-5xl md:text-7xl font-light tracking-tight mt-4">
              About
            </h2>
            <div className="w-24 h-px bg-black mt-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-black/80 text-xl md:text-2xl font-light leading-relaxed mb-4">
              Hello, I'm Rene — an aspiring Software Engineer with a focus in backend development and C++.
            </p>
            <p className="text-black/50 leading-relaxed">
              Take a look at some projects I have built.
            </p>
          </motion.div>
        </div>
      </section>

      </>
  );
}
