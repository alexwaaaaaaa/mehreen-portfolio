'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './theme/ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a101f]/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-0.5 shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:shadow-[0_0_30px_rgba(59,130,246,1)] transition-all duration-300">
            <div className="w-full h-full rounded-2xl bg-[var(--card-bg-primary)] flex items-center justify-center border border-blue-500/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 flex items-center justify-center shadow-[inset_0_0_10px_rgba(59,130,246,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--neon-purple)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
          <a
            href="#hero"
            className="text-xl font-bold text-white hover:text-blue-400 transition-all duration-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] hover:drop-shadow-[0_0_12px_rgba(59,130,246,1)]"
          >
            Mehreen
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="bg-[#1a1f35]/30 backdrop-blur-md rounded-full px-1 py-1 flex items-center border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-300 relative ${isActive ? 'neon-button-active' : 'neon-button'
                    } ${link.name === 'Contact' ? 'px-6 py-2 mx-0' : 'px-4 py-2 mx-0'} text-white`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 25px rgba(59, 130, 246, 0.9), 0 0 5px rgba(59, 130, 246, 1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetElement = document.querySelector(link.href) as HTMLElement;
                    if (targetElement) {
                      const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                      window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {link.name}
                  {/* Active state is now handled by CSS classes */}
                  {/* No additional div needed for Contact as the neon effect is applied directly */}
                </motion.a>
              );
            })}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[var(--foreground)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden dark:bg-black/95 bg-white/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-300 ${isActive ? 'neon-button-active' : 'neon-button'
                    } py-2 px-6 text-center my-1 text-white`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const targetElement = document.querySelector(link.href) as HTMLElement;
                    if (targetElement) {
                      const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                      window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="flex justify-center pt-2">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;