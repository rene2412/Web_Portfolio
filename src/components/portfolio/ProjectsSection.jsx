import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github } from 'lucide-react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: "Linux-Lab",
    description: "A full web application that allows users to learn and practice the Linux command line in a simulated environment. Features a custom bash shell, secure auth, email system, and REST APIs. Currently at 50+ users.",
    tags: ["PHP", "Python", "Bash", "React", "MySQL", "Apache", "Bash", "Digital Ocean"],
    year: "2025",
    link: "https://linux-lab.live",
    linkLabel: "Visit Site",
    media: [
      // Add your images/videos here. Example:
         { type: 'image', url: '/wc.png' },
         { type: 'image', url: '/dashboard.png', caption: 'Homepage' },
         { type: 'image', url: '/curl.png', caption: 'Homepage' },
         { type: 'image', url: '/networking.png', caption: 'Homepage' }
    ]
  },
  {
    id: 3,
    title: "Super Mario Bros Clone (C++)",
    description: "A C++ Super Mario Bros clone using the Raylib graphics API with collision detection, object management, and multi-threaded performance optimizations. Showcases polymorphism, smart pointers, and static texture loading.",
    tags: ["C++", "Raylib", "Multi-Threading", "Linux", "Git"],
    year: "2025",
    link: "https://www.youtube.com/@renehernandez6562",
    linkLabel: "Watch Demo",
    media: [
       { type: 'video', url: '/marioGamePlay.mp4' }
    ]
  },
  {
    id: 2,
    title: "Online Blackjack (C++)",
    description: "A complete blackjack game engine in C++ handling player/dealer logic, split hands, bets, and card management. Implements OOP, polymorphism, smart pointers, web-sockets, mutexes, HTTP controllers, and REST APIs.",
    tags: ["C++", "Dragon Web Framework", "Linux", "Git"],
    year: "2025",
    link: "https://www.youtube.com/@renehernandez6562",
    linkLabel: "Watch Demo",
    media: [
       { type: 'video', url: '/blackjackTeaser.mp4' }
    ]
  }
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="projects" className="bg-white py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-black/40 text-sm tracking-[0.4em] uppercase">03</span>
          <h2 className="text-black text-5xl md:text-7xl font-light tracking-tight mt-4">
            Projects & Development
          </h2>
          <div className="w-24 h-px bg-black mt-6" />
          <p className="text-black/50 mt-6 max-w-xl">
            Click a project to expand details and view media.
          </p>
        </motion.div>

        {/* Projects list */}
        <div>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="https://github.com/rene2412"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-black/60 hover:text-black transition-colors duration-300 group"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm tracking-[0.2em] uppercase">View more on GitHub</span>
            <motion.span className="group-hover:translate-x-1 transition-transform duration-300">→</motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
