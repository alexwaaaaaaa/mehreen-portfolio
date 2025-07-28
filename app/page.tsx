'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

import LoadingSpinner from './components/LoadingSpinner';
import NoSSR from './components/NoSSR';
import { rippleEffect } from './utils/animation';

// Lazy load components to avoid hydration issues
const Navbar = lazy(() => import('./components/Navbar'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));

export default function Home() {
  // For typewriter effect
  const [, setText] = useState('');
  const [index, setIndex] = useState(0);
  
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

  useEffect(() => {
    const phrases = ['Frontend Developer', 'Data Analyst', 'Problem Solver', 'Tech Enthusiast'];

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

  return (
    <NoSSR fallback={<LoadingSpinner />}>
      <main className="min-h-screen bg-transparent">
      <Suspense fallback={<div className="fixed top-0 left-0 w-full h-16 bg-transparent z-50" />}>
        <Navbar />
      </Suspense>
      <Suspense fallback={<div className="fixed inset-0 bg-[var(--background)] -z-10" />}>
        <ParticleBackground />
      </Suspense>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            {/* Profile Image with Glowing Card Effect */}
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-[3px] shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all duration-300">
                  <div className="w-full h-full bg-gray-800/90 rounded-full backdrop-blur-md"></div>
                </div>
                
                {/* Profile Image Container */}
                <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Additional Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-xl animate-pulse"></div>
              </motion.div>
            </motion.div>

            {/* Hello World Text */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[var(--cyan)] text-lg font-mono">Hello World, I&apos;m</p>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-500 via-cyan-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent animate-pulse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Mehreen Siddiqui
            </motion.h1>

            {/* Title with Gradient */}
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-rose-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Data Analyst & Web Developer
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              B.Tech CSE graduate from Lloyd Institute of Engineering & Technology, 
              crafting data-driven solutions and beautiful web experiences.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="px-8 py-4 bg-[var(--cyan)] text-white font-semibold rounded-lg hover:bg-[var(--cyan)]/90 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>

              <motion.button
                className="px-8 py-4 border border-[var(--card-border)] text-[var(--text-muted)] font-semibold rounded-lg hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[var(--card-border)] rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-[var(--cyan)] rounded-full mt-2"></div>
          </motion.div>
        </motion.div>
      </section>





      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8 bg-transparent relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-16 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Code Terminal Card - Green Theme */}
            <motion.div
              className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-2">~/projects/portfolio</span>
                </div>
                <div className="font-mono text-sm">
                  <div className="text-green-400">$ npm run dev</div>
                  <div className="text-gray-400">Starting development server...</div>
                  <div className="text-blue-400">Ready on http://localhost:3000</div>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Creative</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">Analytical</span>
                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">Problem Solver</span>
              </div>
            </motion.div>

            {/* What Drives Me Card - Blue Theme */}
            <motion.div
              className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-400">What Drives Me</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="text-blue-400 mb-1">💻</div>
                  <p className="text-xs text-blue-400 font-medium">Creative</p>
                </div>
                <div className="text-center p-3 bg-indigo-500/10 rounded-lg">
                  <div className="text-indigo-400 mb-1">📊</div>
                  <p className="text-xs text-indigo-400 font-medium">Logical</p>
                </div>
                <div className="text-center p-3 bg-sky-500/10 rounded-lg">
                  <div className="text-sky-400 mb-1">🎯</div>
                  <p className="text-xs text-sky-400 font-medium">Fast Learner</p>
                </div>
                <div className="text-center p-3 bg-cyan-500/10 rounded-lg">
                  <div className="text-cyan-400 mb-1">⚡</div>
                  <p className="text-xs text-cyan-400 font-medium">Dedicated</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                I&apos;m passionate about creating innovative solutions that make a difference. Whether it&apos;s building beautiful user interfaces or analyzing complex data patterns, I bring dedication and creativity to every project.
              </p>
            </motion.div>

            {/* My Journey Card - Orange/Pink Theme */}
            <motion.div
              className="bg-gradient-to-br from-orange-900/20 to-pink-900/20 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-orange-400">My Journey</h3>
              </div>

              <p className="text-white mb-4 leading-relaxed text-sm">
                I&apos;m Mehreen, a passionate Frontend Developer and Data Analyst with a B.Tech degree from Lloyd Institute of Engineering & Technology (2021-2024).
              </p>

              <p className="text-pink-200 mb-4 leading-relaxed text-sm">
                I combine creative design with analytical thinking to build engaging web experiences and extract meaningful insights from data.
              </p>

              <p className="text-orange-200 text-sm leading-relaxed">
                Currently pursuing my final year, I&apos;m eager to apply my skills in real-world projects and contribute to innovative solutions that make a positive impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 md:px-8 bg-transparent relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>
          
          <motion.p
            className="text-center text-[var(--text-muted)] mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My academic journey in Computer Science and Engineering
          </motion.p>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* B.Tech - Blue Theme */}
            <motion.div
              className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">Bachelor of Technology - BTech</h3>
                      <p className="text-blue-400 font-medium">Computer Science Engineering</p>
                      <p className="text-gray-300 text-sm">LLOYD Institute of Engineering & Technology</p>
                      <p className="text-gray-400 text-sm">Greater Noida, Uttar Pradesh, India</p>
                    </div>
                    <span className="text-gray-300 text-sm bg-blue-900/30 px-3 py-1 rounded-full">2021 - 2024</span>
                  </div>
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium">Currently Pursuing</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-white mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Computer Engineering</span>
                      <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded text-xs">Communication</span>
                      <span className="px-2 py-1 bg-sky-500/20 text-sky-400 rounded text-xs">Computer Science Engineering</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Diploma - Green Theme */}
            <motion.div
              className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">Diploma</h3>
                      <p className="text-green-400 font-medium">Civil Engineering</p>
                      <p className="text-gray-300 text-sm">Jamia Millia Islamia</p>
                      <p className="text-gray-400 text-sm">New Delhi, India</p>
                    </div>
                    <span className="text-gray-300 text-sm bg-green-900/30 px-3 py-1 rounded-full">January 2017 - February 2020</span>
                  </div>
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">Completed</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-white mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Civil Engineering</span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">Project Management</span>
                      <span className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded text-xs">Technical Drawing</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Matriculation - Orange Theme */}
            <motion.div
              className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">Matriculation</h3>
                      <p className="text-orange-400 font-medium">Secondary Education</p>
                      <p className="text-gray-300 text-sm">CBSE</p>
                      <p className="text-gray-400 text-sm">New Delhi, India</p>
                    </div>
                    <span className="text-gray-300 text-sm bg-orange-900/30 px-3 py-1 rounded-full">2015</span>
                  </div>
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">Completed</span>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-white mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">Academic Foundation</span>
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Critical Thinking</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 md:px-8 bg-transparent relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Skills
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-[var(--cyan)] mx-auto mb-16"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <Suspense fallback={<div className="w-full h-64 flex items-center justify-center"><LoadingSpinner /></div>}>
            <SkillsSection />
          </Suspense>
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
              className="relative cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 p-[2px] shadow-lg shadow-green-500/40 hover:shadow-green-500/60 transition-all duration-300">
                <div className="w-full h-full bg-gray-800/90 rounded-2xl backdrop-blur-md"></div>
              </div>
              
              <motion.div
                className="relative z-10 bg-transparent rounded-2xl overflow-hidden"
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
                  <div className="absolute inset-0 bg-[url(/images/data-planning.jpg)] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            </motion.div>

            {/* Project Card 3 - Portfolio Website */}
            <motion.div
              className="relative cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-purple-500 to-pink-600 p-[2px] shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-300">
                <div className="w-full h-full bg-gray-800/90 rounded-2xl backdrop-blur-md"></div>
              </div>
              
              <motion.div
                className="relative z-10 bg-transparent rounded-2xl overflow-hidden"
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
                  <div className="absolute inset-0 bg-[url(/images/code-editor.jpg)] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            </motion.div>

            {/* Project Card 4 - Customer Segmentation */}
            <motion.div
              className="relative cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-600 p-[2px] shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300">
                <div className="w-full h-full bg-gray-800/90 rounded-2xl backdrop-blur-md"></div>
              </div>
              
              <motion.div
                className="relative z-10 bg-transparent rounded-2xl overflow-hidden"
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
                  <div className="absolute inset-0 bg-[url(/images/analytics-dashboard.jpg)] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            </motion.div>



            {/* Project Card 6 - Financial Analytics */}
            <motion.div
              className="relative cursor-pointer group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 via-orange-500 to-red-600 p-[2px] shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300">
                <div className="w-full h-full bg-gray-800/90 rounded-2xl backdrop-blur-md"></div>
              </div>
              
              <motion.div
                className="relative z-10 bg-transparent rounded-2xl overflow-hidden"
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
                  <div className="absolute inset-0 bg-[url(/images/business-dashboard.jpg)] bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            {/* Contact Information - Blue Theme */}
            <motion.div
              className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-300">mehreensiddiqui740@gmail.com</p>
                  </div>
                </div>



                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-gray-300">New Delhi, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-blue-500/20">
                <div className="flex gap-4">
                  {/* LinkedIn */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-[2px] shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300">
                      <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
                    </div>
                    <a
                      href="https://www.linkedin.com/in/mehreen-siddiqui-4a4057250/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-400 hover:text-white transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </motion.div>

                  {/* GitHub */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 p-[2px] shadow-lg shadow-gray-500/40 hover:shadow-gray-500/60 transition-all duration-300">
                      <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
                    </div>
                    <a
                      href="https://github.com/mehreen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </motion.div>

                  {/* Twitter */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-600 p-[2px] shadow-lg shadow-sky-500/40 hover:shadow-sky-500/60 transition-all duration-300">
                      <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
                    </div>
                    <a
                      href="https://twitter.com/mehreen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-sky-400 hover:text-white transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400 via-red-500 to-pink-600 p-[2px] shadow-lg shadow-red-500/40 hover:shadow-red-500/60 transition-all duration-300">
                      <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
                    </div>
                    <a
                      href="mailto:mehreensiddiqui740@gmail.com"
                      className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-red-400 hover:text-white transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form - Green Theme */}
            <motion.div
              className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-md rounded-2xl p-8 border border-green-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold text-green-400 mb-8">Send Me a Message</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg focus:outline-none focus:border-green-400 transition-colors text-white placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg focus:outline-none focus:border-green-400 transition-colors text-white placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-white">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg focus:outline-none focus:border-green-400 transition-colors text-white placeholder-gray-400"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full p-3 bg-gray-800/50 border border-green-500/30 rounded-lg focus:outline-none focus:border-green-400 transition-colors text-white placeholder-gray-400 resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2"
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
      <footer className="py-16 px-4 border-t border-gray-700/50 bg-transparent">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Name and Title */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Mehreen <span className="text-cyan-400">Siddiqui</span>
                </h3>
                <p className="text-lg text-gray-300 mb-4">Data Analyst & Web Developer</p>
                <p className="text-gray-400 max-w-md">
                  B.Tech CSE graduate crafting data-driven solutions and beautiful web experiences.
                </p>
              </div>

              {/* Social Media Icons with Glowing Card Effect */}
              <div className="flex gap-4">
                {/* LinkedIn */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-[2px] shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300">
                    <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/mehreen-siddiqui-4a4057250/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-400 hover:text-white transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </motion.div>

                {/* GitHub */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 p-[2px] shadow-lg shadow-gray-500/40 hover:shadow-gray-500/60 transition-all duration-300">
                    <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
                  </div>
                  <a
                    href="https://github.com/mehreen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </motion.div>

                {/* Twitter */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-600 p-[2px] shadow-lg shadow-sky-500/40 hover:shadow-sky-500/60 transition-all duration-300">
                    <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
                  </div>
                  <a
                    href="https://twitter.com/mehreen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-sky-400 hover:text-white transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400 via-red-500 to-pink-600 p-[2px] shadow-lg shadow-red-500/40 hover:shadow-red-500/60 transition-all duration-300">
                    <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
                  </div>
                  <a
                    href="mailto:mehreensiddiqui740@gmail.com"
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-red-400 hover:text-white transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
              <p className="text-gray-400">© 2024 Mehreen Siddiqui. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Project Modal */}
      {
        selectedProject && (
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              project={selectedProject}
            />
          </Suspense>
        )
      }
      </main>
    </NoSSR>
  );
}