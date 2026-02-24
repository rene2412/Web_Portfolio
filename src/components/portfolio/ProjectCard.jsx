import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github
} from 'lucide-react';

export default function ProjectCard({ project, index, isInView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = project.media || [];
  const hasMedia = slides.length > 0;

  const prevSlide = (e) => {
    e.stopPropagation();
    if (!slides.length) return;
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    if (!slides.length) return;
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <motion.div
      className="border-t border-black/10 last:border-b relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Black slide highlight */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ originX: 0 }}
      />

      {/* Header row — click to toggle */}
      <button
        className="relative z-10 w-full text-left py-6 md:py-10 flex items-center justify-between gap-4 group"
        onClick={() => setIsOpen((v) => !v)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <span
              className={`text-sm tracking-[0.2em] transition-colors duration-300 ${
                isHovered ? 'text-white/50' : 'text-black/40'
              }`}
            >
              {project.year}
            </span>
            <div
              className={`w-8 h-px transition-colors duration-300 ${
                isHovered ? 'bg-white/30' : 'bg-black/20'
              }`}
            />
          </div>

          <h3
            className={`text-2xl md:text-3xl font-light tracking-wide transition-colors duration-300 ${
              isHovered ? 'text-white' : 'text-black'
            }`}
          >
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden md:flex flex-wrap gap-2 max-w-xs">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs tracking-wider border transition-colors duration-300 ${
                  isHovered
                    ? 'border-white/30 text-white/80'
                    : 'border-black/20 text-black/60'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <motion.div
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              isHovered ? 'border-white text-white' : 'border-black/20 text-black/40'
            }`}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden relative z-10"
          >
            <div className="pb-10 grid md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Description + links */}
              <div className="md:col-span-5 flex flex-col justify-between gap-6">
                <div className="flex md:hidden flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-xs tracking-wider border transition-colors duration-300 ${
                        isHovered
                          ? 'border-white/30 text-white/80'
                          : 'border-black/20 text-black/60'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p
                  className={`leading-relaxed text-base md:text-lg font-light transition-colors duration-300 ${
                    isHovered ? 'text-white/70' : 'text-black/60'
                  }`}
                >
                  {project.description}
                </p>

                <div className="flex gap-6">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase border-b pb-1 transition-colors duration-300 ${
                        isHovered
                          ? 'border-white text-white hover:text-white/60'
                          : 'border-black text-black hover:text-black/50'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {project.linkLabel || 'View Project'}
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase border-b pb-1 transition-colors duration-300 ${
                        isHovered
                          ? 'border-white/40 text-white/60 hover:text-white'
                          : 'border-black/30 text-black/50 hover:text-black'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Media slideshow
                  - NO overflow-hidden on the container, so media is NEVER cropped
                  - w-full h-auto so the media dictates its own height naturally */}
              <div className="md:col-span-7 relative w-full">
                {hasMedia ? (
                  <div className="relative">
                    {/* Render ALL slides stacked — only the active one is visible.
                        This keeps the container sized to the tallest slide at all
                        times so the layout never collapses/jumps between transitions. */}
                    <div className="relative">
                      {slides.map((slide, i) => (
                        <motion.div
                          key={i}
                          className={i === 0 ? 'relative w-full' : 'absolute inset-0 w-full'}
                          animate={{ opacity: i === slideIndex ? 1 : 0 }}
                          transition={{ duration: 0.35 }}
                          style={{ pointerEvents: i === slideIndex ? 'auto' : 'none' }}
                        >
                          {slide.type === 'video' ? (
                            <video
                              className="w-full h-auto block"
                              src={slide.url}
                              autoPlay={i === slideIndex}
                              muted
                              loop
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <img
                              src={slide.url}
                              alt={slide.caption || project.title}
                              className="w-full h-auto block"
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {slides.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/60 text-white flex items-center justify-center rounded hover:bg-black transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                          onClick={nextSlide}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/60 text-white flex items-center justify-center rounded hover:bg-black transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {slides.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSlideIndex(i);
                              }}
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                i === slideIndex ? 'bg-white' : 'bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                
                ) : (
                  <div className="flex flex-col items-center gap-3 text-black/30 p-10 border border-black/10 rounded">
                    <div className="w-12 h-12 border border-black/20 rounded flex items-center justify-center">
                      <span className="text-2xl">🎬</span>
                    </div>
                    <p className="text-xs tracking-[0.3em] uppercase">Media coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}