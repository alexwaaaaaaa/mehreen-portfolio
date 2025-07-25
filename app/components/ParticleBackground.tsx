'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from './theme/ThemeProvider';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles (reduced count for better performance)
    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    const darkColors = ['#a855f7', '#3b82f6', '#6366f1', '#8b5cf6'];
    const lightColors = ['#6366f1', '#8b5cf6', '#6600cc'];
    const colors = theme === 'dark' ? darkColors : lightColors;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Animation loop with performance optimization
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      });
      
      // Draw connections between nearby particles
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = theme === 'dark' ? '#00eeff' : '#0066cc';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [theme]);
  
  if (!mounted) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full -z-20 transition-colors duration-500 bg-[var(--background)]"></div>
        <div className="fixed top-0 left-0 w-full h-full -z-20 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,_var(--bg-gradient-from),_transparent_70%)]"></div>
        <div className="fixed top-0 left-0 w-full h-full -z-20 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_bottom_left,_var(--bg-gradient-to),_transparent_70%)]"></div>
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-20 transition-colors duration-500 bg-[var(--background)]"></div>
      <div className="fixed top-0 left-0 w-full h-full -z-20 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,_var(--bg-gradient-from),_transparent_70%)]"></div>
      <div className="fixed top-0 left-0 w-full h-full -z-20 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_bottom_left,_var(--bg-gradient-to),_transparent_70%)]"></div>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10 transition-opacity duration-500"
        style={{ opacity: theme === 'dark' ? 0.4 : 0.2 }}
      />
    </>
  );
};

export default ParticleBackground;