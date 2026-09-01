import React from 'react';
import SamuraiHero from '@/components/portfolio/SamuraiHero';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import WorkExperience from '@/components/portfolio/WorkExperience';

export default function Home() {
  return (
    <main className="bg-black">
      <SamuraiHero />
      <AboutSection />
      <WorkExperience />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
