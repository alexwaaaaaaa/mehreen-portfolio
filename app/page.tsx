'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import ProjectModal from './components/ProjectModal';
import SkillIcon from './components/SkillIcon';
import { rippleEffect } from './utils/animation';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  // For typewriter effect
  const [, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const phrases = ['Frontend Developer', 'Data Analyst', 'Problem Solver', 'Tech Enthusiast'];
    setMounted(true);

    // Initialize intersection observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-up').forEach((el) => {
      observer.observe(el);
    });

    // Typewriter effect
    let currentPhrase = phrases[index];
    let currentIndex = 0;
    let interval: NodeJS.Timeout;

    const type = () => {
      if (currentIndex < currentPhrase.length) {
        setText(currentPhrase.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        // Pause at the end of the phrase
        clearInterval(interval);
        setTimeout(() => {
          interval = setInterval(erase, 50);
        }, 1500);
      }
    };

    const erase = () => {
      if (currentIndex > 0) {
        setText(currentPhrase.substring(0, currentIndex - 1));
        currentIndex--;
      } else {
        clearInterval(interval);
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setTimeout(() => {
          currentPhrase = phrases[(index + 1) % phrases.length];
          interval = setInterval(type, 100);
        }, 500);
      }
    };

    interval = setInterval(type, 100);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [index]);

  // Project type definition
  type Project = {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    demoLink?: string;
    sourceLink?: string;
  };

  // State for project modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <ParticleBackground />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Welcome Badge */}
            <motion.div
              className="mb-8 inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="px-6 py-3 rounded-2xl bg-[var(--neon-purple)]/20 border border-[var(--neon-purple)]/40 text-[var(--neon-purple)] text-base font-medium shadow-lg shadow-[var(--neon-purple)]/20 backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  <span className="text-lg">👋</span>
                  <span>Welcome to my digital space</span>
                </span>
              </div>
            </motion.div>

            {/* Main Hero Card */}
            <motion.div
              className="bg-[var(--card-bg)] backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-4xl border border-[var(--border)] shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Hi, I&apos;m <span className="text-[var(--neon-purple)]">Mehreen</span>
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-[var(--neon-purple)]">
                Web Developer & Data Analyst
              </h2>

              <p className="text-lg mb-10 text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
                B.Tech CSE graduate from Lloyd Institute of Engineering & Technology, crafting data-driven solutions and beautiful web experiences.
              </p>

              <div className="flex gap-6 flex-wrap justify-center">
                <motion.button
                  className="neon-button px-10 py-4 rounded-full text-white font-medium flex items-center gap-2 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 25px rgba(59, 130, 246, 0.9), 0 0 5px rgba(59, 130, 246, 1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    rippleEffect(e);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Let&apos;s Connect
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>

                <motion.button
                  className="neon-button px-10 py-4 rounded-full text-white font-medium flex items-center gap-2 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 0 25px rgba(59, 130, 246, 0.9), 0 0 5px rgba(59, 130, 246, 1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    rippleEffect(e);
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View My Work
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>


          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-[var(--text-muted)] mb-2">Scroll to explore</p>
          <div className="animate-bounce">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[var(--text-muted)] mx-auto"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8 bg-transparent relative">

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* My Journey Card */}
            <motion.div
              className="bg-[var(--card-bg-primary)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--neon-purple)]/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--neon-purple)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--neon-purple)]">My Journey</h3>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">
                I&apos;m Mehreen, a passionate Frontend Developer and Data Analyst with a B.Tech degree from Lloyd Institute of Engineering & Technology (2021-2024).
              </p>

              <p className="text-gray-300 mb-4 leading-relaxed">
                I combine creative design with analytical thinking to build engaging web experiences and extract meaningful insights from data. My goal is to create solutions that not only look beautiful but also solve real-world problems.
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] rounded-full text-sm">Creative</span>
                <span className="px-3 py-1 bg-[var(--neon-blue)]/20 text-[var(--neon-blue)] rounded-full text-sm">Analytical</span>
                <span className="px-3 py-1 bg-[var(--neon-green)]/20 text-[var(--neon-green)] rounded-full text-sm">Problem Solver</span>
              </div>
            </motion.div>

            {/* What Drives Me Card */}
            <motion.div
              className="bg-[var(--card-bg-primary)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl hover:shadow-[0_0_30px_rgba(0,238,255,0.3)] transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--neon-blue)]/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--neon-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--neon-blue)]">What Drives Me</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-[var(--neon-blue)]/10 rounded-lg">
                  <div className="w-8 h-8 mx-auto mb-2 text-[var(--neon-blue)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--neon-blue)] font-medium">Creative</p>
                </div>

                <div className="text-center p-4 bg-[var(--neon-green)]/10 rounded-lg">
                  <div className="w-8 h-8 mx-auto mb-2 text-[var(--neon-green)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--neon-green)] font-medium">Logical</p>
                </div>

                <div className="text-center p-4 bg-[var(--neon-purple)]/10 rounded-lg">
                  <div className="w-8 h-8 mx-auto mb-2 text-[var(--neon-purple)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--neon-purple)] font-medium">Fast Learner</p>
                </div>

                <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                  <div className="w-8 h-8 mx-auto mb-2 text-orange-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-orange-400 font-medium">Dedicated</p>
                </div>
              </div>

              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                I&apos;m passionate about creating innovative solutions that make a difference. Whether it&apos;s building beautiful user interfaces or analyzing complex data patterns, I bring dedication and creativity to every project.
              </p>
            </motion.div>
          </div>


        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 md:px-8 bg-transparent relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {/* Education Timeline */}
            <div className="space-y-12">
              {/* B.Tech */}
              <motion.div
                className="bg-[var(--card-bg-primary)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl hover:shadow-[0_0_30px_rgba(0,255,140,0.3)] transition-all duration-300"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[var(--neon-green)]/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--neon-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">B.Tech in Computer Science and Engineering</h3>
                        <p className="text-[var(--neon-green)] font-medium text-lg">Lloyd Institute of Engineering & Technology</p>
                        <p className="text-[var(--text-muted)] text-sm">Greater Noida</p>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <span className="inline-block px-4 py-2 bg-[var(--neon-green)]/20 text-[var(--neon-green)] rounded-full text-sm font-medium">
                          2021 - 2024
                        </span>
                      </div>
                    </div>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      Completed Bachelor of Technology with comprehensive knowledge in computer science fundamentals, data structures, algorithms, and modern web technologies. Specialized in frontend development and data analysis with hands-on experience in React, Next.js, Python, and various data visualization tools.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Diploma */}
              <motion.div
                className="bg-[var(--card-bg-primary)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[var(--neon-blue)]/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--neon-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Diploma in Civil Engineering</h3>
                        <p className="text-[var(--neon-blue)] font-medium text-lg">Jamia Millia Islamia</p>
                        <p className="text-[var(--text-muted)] text-sm">New Delhi</p>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <span className="inline-block px-4 py-2 bg-[var(--neon-blue)]/20 text-[var(--neon-blue)] rounded-full text-sm font-medium">
                          Jan 2017 - Feb 2020
                        </span>
                      </div>
                    </div>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      Completed three-year diploma program with comprehensive knowledge in civil engineering fundamentals, construction technology, structural design, and project planning. Gained practical experience in surveying, building materials, and construction management which developed strong analytical and problem-solving skills.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CBSE */}
              <motion.div
                className="bg-[var(--card-bg-primary)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[var(--neon-purple)]/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--neon-purple)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Matriculation (Class 10th)</h3>
                        <p className="text-[var(--neon-purple)] font-medium text-lg">CBSE Board</p>
                        <p className="text-[var(--text-muted)] text-sm">New Delhi</p>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <span className="inline-block px-4 py-2 bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] rounded-full text-sm font-medium">
                          2015
                        </span>
                      </div>
                    </div>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      Successfully completed matriculation with excellent grades in core subjects including Mathematics, Science, Social Studies, and English. Developed strong foundational knowledge and study habits that prepared me for advanced technical education and engineering studies.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 md:px-8 bg-transparent relative">

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Skills
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Frontend Development Card */}
            <motion.div
              className="bg-[var(--card-bg-primary)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl hover:shadow-[0_0_30px_rgba(0,238,255,0.3)] transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--neon-blue)]/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--neon-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--neon-blue)]">Frontend Development</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Git'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="neon-skill-tag p-4 flex flex-col items-center justify-center"
                    whileHover={{
                      scale: 1.05
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 mb-2 flex items-center justify-center text-[var(--neon-blue)]">
                      <SkillIcon skill={skill} className="w-10 h-10" />
                    </div>
                    <p className="font-medium text-sm text-center text-white">{skill}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Data Analysis Card */}
            <motion.div
              className="bg-[var(--card-bg-primary)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl hover:shadow-[0_0_30px_rgba(0,255,140,0.3)] transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[var(--neon-green)]/20 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--neon-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--neon-green)]">Data Analysis</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['Python', 'SQL', 'Pandas', 'NumPy', 'Matplotlib', 'Power BI', 'Excel', 'Tableau'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="neon-skill-tag-green p-4 flex flex-col items-center justify-center"
                    whileHover={{
                      scale: 1.05
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-10 h-10 mb-2 flex items-center justify-center text-[var(--neon-green)]">
                      <SkillIcon skill={skill} className="w-10 h-10" />
                    </div>
                    <p className="font-medium text-sm text-center text-white">{skill}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 px-4 md:px-8 bg-transparent relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            My Projects
          </motion.h2>

          <motion.p
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Here are some of my recent projects showcasing my skills in web development and data analysis.
          </motion.p>

          <div className="project-grid grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12">


            {/* Project Card 2 - Sales Data Analysis */}
            <motion.div
              className="bg-[#0d1117]/80 rounded-lg overflow-hidden border border-gray-800 hover:border-[var(--neon-green)] transition-all duration-300 cursor-pointer group"
              whileHover={{
                y: -5,
                boxShadow: '0 0 15px var(--neon-green)'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              onClick={() => openProjectModal({
                title: "Sales Data Analysis Dashboard",
                description: "Comprehensive sales performance analysis with interactive Power BI dashboard, Python automation for data processing, and Excel reporting. Features trend analysis, forecasting, and KPI tracking.",
                image: "/images/analytics-dashboard.jpg",
                technologies: ["Python", "Power BI", "Excel", "SQL", "Pandas"],
                demoLink: "#",
                sourceLink: "#"
              })}
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-700/20">
                  <div className="absolute inset-0 bg-[url('/images/data-planning.jpg')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Sales Data Analysis Dashboard</h3>
                  <p className="text-gray-300 text-sm">Power BI dashboard with Python automation</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="neon-project-tag-green">Python</span>
                  <span className="neon-project-tag-green">Power BI</span>
                  <span className="neon-project-tag-green">Excel</span>
                  <span className="neon-project-tag-green">SQL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Data Analysis</span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-full bg-[#122d1f] text-[var(--neon-green)] hover:bg-[#1a422d] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        rippleEffect(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded-full bg-[#122d1f] text-[var(--neon-green)] hover:bg-[#1a422d] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        rippleEffect(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project Card 3 - Portfolio Website */}
            <motion.div
              className="bg-[#0d1117]/80 rounded-lg overflow-hidden border border-gray-800 hover:border-[var(--neon-purple)] transition-all duration-300 cursor-pointer group"
              whileHover={{
                y: -5,
                boxShadow: '0 0 15px var(--neon-purple)'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              onClick={() => openProjectModal({
                title: "Portfolio Website",
                description: "Personal portfolio website with animations, responsive design, and modern UI. Built with Next.js, Tailwind CSS, and Framer Motion for smooth interactions.",
                image: "/images/code-editor.jpg",
                technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
                demoLink: "#",
                sourceLink: "#"
              })}
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-700/20">
                  <div className="absolute inset-0 bg-[url('/images/code-editor.jpg')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Portfolio Website</h3>
                  <p className="text-gray-300 text-sm">Personal portfolio website with animations</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="neon-project-tag">Next.js</span>
                  <span className="neon-project-tag">Framer Motion</span>
                  <span className="neon-project-tag">Tailwind CSS</span>
                  <span className="neon-project-tag">TypeScript</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Web Development</span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-full bg-[#2d1f2f] text-[var(--neon-purple)] hover:bg-[#422d42] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        rippleEffect(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded-full bg-[#2d1f2f] text-[var(--neon-purple)] hover:bg-[#422d42] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        rippleEffect(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project Card 4 - Customer Segmentation */}
            <motion.div
              className="bg-[#0d1117]/80 rounded-lg overflow-hidden border border-gray-800 hover:border-[var(--neon-green)] transition-all duration-300 cursor-pointer group"
              whileHover={{
                y: -5,
                boxShadow: '0 0 15px var(--neon-green)'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              onClick={() => openProjectModal({
                title: "Customer Segmentation Analysis",
                description: "Advanced customer segmentation using machine learning algorithms with Power BI visualization, Excel reporting, and SQL database integration. Includes RFM analysis and behavioral clustering.",
                image: "/images/analytics-dashboard.jpg",
                technologies: ["Python", "Power BI", "Excel", "SQL", "Scikit-learn"],
                demoLink: "#",
                sourceLink: "#"
              })}
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-700/20">
                  <div className="absolute inset-0 bg-[url('/images/analytics-dashboard.jpg')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Customer Segmentation Analysis</h3>
                  <p className="text-gray-300 text-sm">ML clustering with Power BI visualization</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="neon-project-tag-green">Python</span>
                  <span className="neon-project-tag-green">Scikit-learn</span>
                  <span className="neon-project-tag-green">Power BI</span>
                  <span className="neon-project-tag-green">SQL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Data Analysis</span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-full bg-[#122d1f] text-[var(--neon-green)] hover:bg-[#1a422d] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        rippleEffect(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded-full bg-[#122d1f] text-[var(--neon-green)] hover:bg-[#1a422d] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        rippleEffect(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>



            {/* Project Card 6 - Financial Analytics */}
            <motion.div
              className="bg-[#0d1117]/80 rounded-lg overflow-hidden border border-gray-800 hover:border-[var(--neon-green)] transition-all duration-300 cursor-pointer group"
              whileHover={{
                y: -5,
                boxShadow: '0 0 15px var(--neon-green)'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              viewport={{ once: true }}
              onClick={() => openProjectModal({
                title: "Financial Analytics Suite",
                description: "Complete financial analysis toolkit with Power BI dashboards, Excel automation, Python modeling, and SQL database management. Features risk assessment, portfolio analysis, and automated reporting.",
                image: "/images/business-dashboard.jpg",
                technologies: ["Python", "Power BI", "Excel", "SQL", "NumPy"],
                demoLink: "#",
                sourceLink: "#"
              })}
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-700/20">
                  <div className="absolute inset-0 bg-[url('/images/business-dashboard.jpg')] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Financial Analytics Suite</h3>
                  <p className="text-gray-300 text-sm">Power BI dashboards with Python automation</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="neon-project-tag-green">Python</span>
                  <span className="neon-project-tag-green">Pandas</span>
                  <span className="neon-project-tag-green">Plotly</span>
                  <span className="neon-project-tag-green">Streamlit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Data Analysis</span>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-full bg-[#122d1f] text-[var(--neon-green)] hover:bg-[#1a422d] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        rippleEffect(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded-full bg-[#122d1f] text-[var(--neon-green)] hover:bg-[#1a422d] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        rippleEffect(e);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>


          </div>


        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-transparent relative">

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>

          <motion.p
            className="text-center text-[var(--text-muted)] mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have a project in mind or want to collaborate? Feel free to reach out!
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              className="bg-[var(--card-bg-primary)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl hover:shadow-[0_0_30px_rgba(0,238,255,0.3)] transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold text-[var(--neon-blue)] mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--neon-blue)]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--neon-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)]">Email</h4>
                    <p className="text-[var(--text-muted)]">mehreensiddiqui740@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--neon-green)]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--neon-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)]">Phone</h4>
                    <p className="text-[var(--text-muted)]">+91 8512030184</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--neon-purple)]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--neon-purple)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--foreground)]">Location</h4>
                    <p className="text-[var(--text-muted)]">New Delhi, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-[var(--card-border)]">
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/mehreen-siddiqui-4a4057250/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--neon-blue)]/20 flex items-center justify-center text-[var(--neon-blue)] hover:bg-[var(--neon-blue)]/30 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  <a
                    href="https://github.com/mehreen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--neon-purple)]/20 flex items-center justify-center text-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/30 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>

                  <a
                    href="https://twitter.com/mehreen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--neon-blue)]/20 flex items-center justify-center text-[var(--neon-blue)] hover:bg-[var(--neon-blue)]/30 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>

                  <a
                    href="mailto:mehreensiddiqui740@gmail.com"
                    className="w-10 h-10 rounded-full bg-[var(--neon-green)]/20 flex items-center justify-center text-[var(--neon-green)] hover:bg-[var(--neon-green)]/30 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-[var(--card-bg-primary)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold text-[var(--neon-purple)] mb-8">Send Me a Message</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-[var(--foreground)]">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 bg-[var(--card-bg)]/50 border border-[var(--card-border)] rounded-lg focus:outline-none focus:border-[var(--neon-blue)] transition-colors text-[var(--foreground)]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-[var(--foreground)]">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 bg-[var(--card-bg)]/50 border border-[var(--card-border)] rounded-lg focus:outline-none focus:border-[var(--neon-blue)] transition-colors text-[var(--foreground)]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-[var(--foreground)]">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 bg-[var(--card-bg)]/50 border border-[var(--card-border)] rounded-lg focus:outline-none focus:border-[var(--neon-blue)] transition-colors text-[var(--foreground)]"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-[var(--foreground)]">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full p-3 bg-[var(--card-bg)]/50 border border-[var(--card-border)] rounded-lg focus:outline-none focus:border-[var(--neon-blue)] transition-colors text-[var(--foreground)] resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-[var(--neon-blue)] text-white font-medium hover:bg-[var(--neon-blue)]/90 shadow-lg shadow-[var(--neon-blue)]/30 transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={rippleEffect}
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--card-border)] bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Mehreen</h3>
              <p className="text-[var(--text-muted)]">Frontend Developer & Data Analyst</p>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/mehreen-siddiqui-4a4057250/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--card-bg-primary)] border border-[var(--card-border)] flex items-center justify-center text-[var(--neon-blue)] hover:border-[var(--neon-blue)] hover:shadow-[0_0_10px_rgba(0,238,255,0.3)] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="https://github.com/mehreen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--card-bg-primary)] border border-[var(--card-border)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--neon-purple)] hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://twitter.com/mehreen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--card-bg-primary)] border border-[var(--card-border)] flex items-center justify-center text-[var(--neon-blue)] hover:border-[var(--neon-blue)] hover:shadow-[0_0_10px_rgba(0,238,255,0.3)] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              <a
                href="mailto:mehreensiddiqui740@gmail.com"
                className="w-10 h-10 rounded-full bg-[var(--card-bg-primary)] border border-[var(--card-border)] flex items-center justify-center text-[var(--neon-green)] hover:border-[var(--neon-green)] hover:shadow-[0_0_10px_rgba(0,255,140,0.3)] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--card-border)] text-center">
            <p className="text-[var(--text-muted)]">© 2024 Mehreen. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {
        selectedProject && (
          <ProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            project={selectedProject}
          />
        )
      }
    </main>
  );
}