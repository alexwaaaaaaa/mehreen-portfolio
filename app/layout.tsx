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
        
        {/* Mobile Touch Fix - Ensure desktop behavior works on mobile */}
        <Script id="mobile-touch-fix" strategy="afterInteractive">
          {`
            // Simple touch fix - just prevent touch from interfering with desktop styles
            (function() {
              if (typeof window === 'undefined') return;
              
              const isMobile = window.innerWidth <= 768;
              if (!isMobile) return;
              
              // Simulate hover states on touch for glowing elements
              const addTouchHover = (element) => {
                if (!element) return;
                
                element.addEventListener('touchstart', (e) => {
                  element.classList.add('hover');
                }, { passive: true });
                
                element.addEventListener('touchend', (e) => {
                  // Keep hover state briefly to maintain glow
                  setTimeout(() => {
                    element.classList.remove('hover');
                  }, 300);
                }, { passive: true });
              };
              
              // Apply to interactive elements
              const selectors = [
                'button',
                '.cursor-pointer',
                '[data-tab]',
                '.shadow-lg',
                '.shadow-xl',
                '.shadow-2xl'
              ];
              
              selectors.forEach(selector => {
                try {
                  const elements = document.querySelectorAll(selector);
                  elements.forEach(addTouchHover);
                } catch (e) {
                  console.warn('Invalid selector:', selector);
                }
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
