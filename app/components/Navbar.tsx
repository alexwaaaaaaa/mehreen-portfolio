'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    { name: 'Home', href: '#hero', id: 'hero', color: 'cyan' },
    { name: 'About', href: '#about', id: 'about', color: 'blue' },
    { name: 'Education', href: '#education', id: 'education', color: 'green' },
    { name: 'Skills', href: '#skills', id: 'skills', color: 'purple' },
    { name: 'Projects', href: '#projects', id: 'projects', color: 'orange' },
    { name: 'Contact', href: '#contact', id: 'contact', color: 'pink' },
  ];

  // Get dynamic colors based on active section
  const getSectionColors = (section: string) => {
    switch (section) {
      case 'hero':
        return {
          bg: 'from-cyan-400 via-cyan-500 to-blue-600',
          shadow: 'shadow-cyan-500/40',
          text: 'text-cyan-400'
        };
      case 'about':
        return {
          bg: 'from-blue-400 via-blue-500 to-indigo-600',
          shadow: 'shadow-blue-500/40',
          text: 'text-blue-400'
        };
      case 'education':
        return {
          bg: 'from-green-400 via-green-500 to-emerald-600',
          shadow: 'shadow-green-500/40',
          text: 'text-green-400'
        };
      case 'skills':
        return {
          bg: 'from-purple-400 via-purple-500 to-pink-600',
          shadow: 'shadow-purple-500/40',
          text: 'text-purple-400'
        };
      case 'projects':
        return {
          bg: 'from-orange-400 via-orange-500 to-red-600',
          shadow: 'shadow-orange-500/40',
          text: 'text-orange-400'
        };
      case 'contact':
        return {
          bg: 'from-pink-400 via-pink-500 to-rose-600',
          shadow: 'shadow-pink-500/40',
          text: 'text-pink-400'
        };
      default:
        return {
          bg: 'from-cyan-400 via-cyan-500 to-blue-600',
          shadow: 'shadow-cyan-500/40',
          text: 'text-cyan-400'
        };
    }
  };

  const currentColors = getSectionColors(activeSection);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="#hero"
            className={`text-xl font-bold text-white hover:${currentColors.text} transition-all duration-300`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Mehreen <span className={currentColors.text}>Siddiqui</span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.id;
            const linkColors = getSectionColors(link.id);
            return (
              <motion.div
                key={link.name}
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Glowing Border Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${isActive
                    ? `bg-gradient-to-r ${linkColors.bg} p-[2px] shadow-lg ${linkColors.shadow} shadow-2xl`
                    : 'bg-gray-700/30 p-[1px] hover:bg-gray-600/50'
                  }`}>
                  <div className="w-full h-full bg-gray-800/80 rounded-2xl backdrop-blur-md"></div>
                </div>

                {/* Navigation Link */}
                <motion.a
                  href={link.href}
                  className={`relative z-10 flex items-center justify-center px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetElement = document.getElementById(link.id);
                    if (targetElement) {
                      const offsetTop = targetElement.offsetTop - 80;
                      window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {link.name}
                </motion.a>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
          className="md:hidden mt-4 bg-gray-800/95 backdrop-blur-md rounded-2xl mx-4 border border-gray-700/50 shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const linkColors = getSectionColors(link.id);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                    ? `bg-gradient-to-r ${linkColors.bg} text-white shadow-lg ${linkColors.shadow}`
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const targetElement = document.getElementById(link.id);
                    if (targetElement) {
                      const offsetTop = targetElement.offsetTop - 80;
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
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;