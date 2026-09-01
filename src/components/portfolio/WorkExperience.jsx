import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    company: 'Checkpoint Software Technologies',
    role: 'Software Engineer Intern, Advanced Networking Team',
    period: '2026',
    bullets: [
      'Developed REST API capabilities for BGP IPv6 next-hop routes over IPv4 routes within a production networking codebase.',
      'Designed and configured network topologies for BGP peering and configured static routes for BGP peers'
    ],
  },
];

export default function WorkExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-black py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white/40 text-sm tracking-[0.4em] uppercase">02</span>
          <h2 className="text-white text-5xl md:text-7xl font-light tracking-tight mt-4">
            Experience
          </h2>
          <div className="w-24 h-px bg-white mt-6" />
          <p className="text-white/50 mt-6 max-w-xl">
          </p>
        </motion.div>

        {/* Experience list */}
        <div>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="border-t border-white/10 last:border-b py-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-8">
                <div>
                  <h3 className="text-white text-2xl md:text-3xl font-light tracking-wide">
                    {exp.company}
                  </h3>
                  <p className="text-white/50 text-sm tracking-[0.2em] uppercase mt-2">
                    {exp.role}
                  </p>
                </div>
                <span className="text-white/30 text-sm tracking-[0.2em] uppercase">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-4 max-w-3xl">
                {exp.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-white/60 font-light leading-relaxed text-base md:text-lg"
                  >
                    <span className="text-white/30 mt-2 flex-shrink-0">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}