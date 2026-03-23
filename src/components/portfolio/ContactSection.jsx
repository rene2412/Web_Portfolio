import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="bg-black py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 border border-white/5 rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 border border-white/5 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white/40 text-sm tracking-[0.4em] uppercase">04</span>
          <h2 className="text-white text-5xl md:text-7xl font-light tracking-tight mt-4">
            Connect
          </h2>
          <div className="w-24 h-px bg-white mt-6" />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-12 sm:gap-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Email */}
          <div>
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Get in touch</p>
            <a
              href="mailto:hrene2412@gmail.com"
              className="text-xl md:text-2xl lg:text-3xl text-white font-light hover:text-white/70 transition-colors duration-300"
            >
              hrene2412@gmail.com
            </a>
          </div>

          {/* LinkedIn */}
          <div>
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/rene-hernandez-b2b42223b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300 group"
            >
              <div className="w-10 h-10 border border-white/20 group-hover:border-white/60 flex items-center justify-center transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </div>
              <span className="text-sm tracking-wide">Rene Hernandez</span>
            </a>
          </div>
        </motion.div>

        {/* Availability status */}
        <motion.div
          className="flex items-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-white/60 text-sm">Available for new opportunities</span>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-white/30 text-sm">
            © 2026 — Rene Hernandez
          </p>
          <p className="text-white/30 text-sm tracking-[0.2em]">
            California, USA
          </p>
        </motion.div>
      </div>
    </section>
  );
}