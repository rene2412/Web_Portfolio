import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const languages = [
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
];

const technologies = [
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Apache", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Digital Ocean", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg" },
  { name: "Arduino", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
];

function SkillLogo({ item, index, isInView }) {
  return (
    <motion.div
      className="group flex flex-col items-center gap-3 cursor-default"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center p-3 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300">
        <img
          src={item.logo}
          alt={item.name}
          className="w-full h-full object-contain"
          style={{ filter: 'brightness(0.9)' }}
        />
      </div>
      <span className="text-white/50 text-xs tracking-wider group-hover:text-white/90 transition-colors duration-300">
        {item.name}
      </span>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-black py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white/40 text-sm tracking-[0.4em] uppercase">02</span>
          <h2 className="text-white text-5xl md:text-7xl font-light tracking-tight mt-4">
            Skills
          </h2>
          <div className="w-24 h-px bg-white mt-6" />
          <p className="text-white/50 mt-6 max-w-xl">
            Languages and technologies I work with.
          </p>
        </motion.div>

        {/* Languages */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/30 text-xs tracking-[0.4em] uppercase">Languages</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12">
            {languages.map((item, i) => (
              <SkillLogo key={item.name} item={item} index={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="text-white/30 text-xs tracking-[0.4em] uppercase">Technologies</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="flex flex-wrap gap-8 md:gap-12">
            {technologies.map((item, i) => (
              <SkillLogo key={item.name} item={item} index={i + languages.length} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
