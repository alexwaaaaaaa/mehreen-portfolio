import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mehreen | Frontend Developer",
  description: "Portfolio website of Mehreen - Frontend Developer and Data Analyst",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300 bg-[var(--background)] text-[var(--foreground)]`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        
        {/* Force Desktop Glow on Mobile */}
        <Script id="mobile-desktop-glow" strategy="afterInteractive">
          {`
            // Force mobile to show desktop-level glow effects
            (function() {
              if (typeof window === 'undefined') return;
              
              const isMobile = window.innerWidth <= 768;
              if (!isMobile) return;
              
              // Force desktop-style glow on all interactive elements
              const forceDesktopGlow = () => {
                const selectors = [
                  'button',
                  '.cursor-pointer',
                  '[data-tab]',
                  '.shadow-lg',
                  '.shadow-xl',
                  '.shadow-2xl',
                  '.bg-gradient-to-r',
                  '.shadow-blue-500\\/40',
                  '.shadow-green-500\\/40',
                  '.shadow-purple-500\\/40',
                  '.shadow-cyan-500\\/40'
                ];
                
                selectors.forEach(selector => {
                  try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                      // Force desktop-level glow
                      element.style.filter = 'drop-shadow(0 0 10px currentColor)';
                      element.style.boxShadow = element.style.boxShadow || '0 0 20px currentColor';
                      
                      // Add touch handlers to maintain glow
                      element.addEventListener('touchstart', () => {
                        element.style.filter = 'drop-shadow(0 0 15px currentColor)';
                      }, { passive: true });
                      
                      element.addEventListener('touchend', () => {
                        setTimeout(() => {
                          element.style.filter = 'drop-shadow(0 0 10px currentColor)';
                        }, 200);
                      }, { passive: true });
                    });
                  } catch (e) {
                    console.warn('Invalid selector:', selector);
                  }
                });
              };
              
              // Apply immediately and on DOM changes
              forceDesktopGlow();
              
              const observer = new MutationObserver(forceDesktopGlow);
              observer.observe(document.body, { childList: true, subtree: true });
              
              // Re-apply periodically to ensure glow persists
              setInterval(forceDesktopGlow, 2000);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
