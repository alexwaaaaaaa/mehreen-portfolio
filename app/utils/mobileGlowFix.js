// Universal Mobile Glow Fix - Apply to all components
export const initMobileGlowFix = () => {
  if (typeof window === 'undefined') return;
  
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return;
  
  // Function to force glow on elements
  const forceGlow = (element) => {
    if (!element) return;
    
    element.classList.add('mobile-glow-active', 'glow-effect', 'force-glow-persist');
    
    // Also apply to child elements that might have glow effects
    const glowChildren = element.querySelectorAll('.shadow-lg, .shadow-xl, .shadow-2xl, .bg-gradient-to-r, .bg-gradient-to-br');
    glowChildren.forEach(child => {
      child.classList.add('mobile-glow-active', 'glow-effect', 'force-glow-persist');
    });
  };
  
  // Function to maintain glow after touch events
  const maintainGlowAfterTouch = (element) => {
    if (!element) return;
    
    const touchHandler = (e) => {
      // Prevent default touch behavior that might interfere
      e.preventDefault();
      
      // Force glow immediately
      forceGlow(element);
      
      // Multiple safety checks
      setTimeout(() => forceGlow(element), 50);
      setTimeout(() => forceGlow(element), 200);
      setTimeout(() => forceGlow(element), 500);
    };
    
    element.addEventListener('touchstart', touchHandler, { passive: false });
    element.addEventListener('touchend', touchHandler, { passive: false });
    element.addEventListener('touchcancel', touchHandler, { passive: false });
  };
  
  // Apply to all interactive elements
  const applyToAllElements = () => {
    // Select all potentially glowing elements
    const selectors = [
      'button',
      '.cursor-pointer',
      '[role="button"]',
      '.shadow-lg',
      '.shadow-xl', 
      '.shadow-2xl',
      '.bg-gradient-to-r',
      '.bg-gradient-to-br',
      '.hover\\:shadow-lg',
      '.hover\\:shadow-xl',
      '.hover\\:shadow-2xl',
      '[data-tab]',
      '.glow-border',
      '.liquid-glass',
      '.neon-button'
    ];
    
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          forceGlow(element);
          maintainGlowAfterTouch(element);
        });
      } catch (e) {
        // Handle invalid selectors gracefully
        console.warn(`Invalid selector: ${selector}`);
      }
    });
  };
  
  // Initial application
  applyToAllElements();
  
  // Re-apply when DOM changes
  const observer = new MutationObserver(() => {
    applyToAllElements();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Continuous maintenance - check every 1 second
  setInterval(() => {
    applyToAllElements();
  }, 1000);
  
  // Force glow on page visibility change
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(applyToAllElements, 100);
    }
  });
  
  // Force glow on window focus
  window.addEventListener('focus', () => {
    setTimeout(applyToAllElements, 100);
  });
};

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileGlowFix);
  } else {
    initMobileGlowFix();
  }
}