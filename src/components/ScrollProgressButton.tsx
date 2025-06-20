"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ScrollProgressButtonProps {
  href: string;
  className?: string;
  isMobile?: boolean;
  color?: string;
}

const ScrollProgressButton = ({ href, className = '', isMobile = false, color = '#000000' }: ScrollProgressButtonProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(progress, 1));
    };

    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        
        const animateProgress = () => {
          updateScrollProgress();
          
          if (isScrollingRef.current) {
            rafRef.current = requestAnimationFrame(animateProgress);
          }
        };
        
        rafRef.current = requestAnimationFrame(animateProgress);
      }
      
      // 重置滚动结束定时器
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        // 最后更新一次确保准确性
        updateScrollProgress();
      }, 100);
    };

    // 初始化时计算一次
    updateScrollProgress();

    // 监听滚动事件
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      clearTimeout(scrollTimeout);
    };
  }, []);

  const radius = 21; // For 44px container (44/2 - 2/2 stroke)
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  if (isMobile) {
    // Mobile: header bar removed, now a simple back button.
    // "移除 header 的所有效果，只做占位"
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center p-2 -ml-2 rounded-md transition-colors hover:bg-black/10 active:bg-black/20 ${className}`}
        aria-label="Back"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          style={{ color }}
        >
          <path 
            d="M19 12H5M5 12L12 19M5 12L12 5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    );
  }

  // Desktop: circular progress button
  return (
    <div className={`relative ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors hover:bg-gray-200 active:bg-gray-300"
        aria-label="Back"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          style={{ color }}
        >
          <path 
            d="M19 12H5M5 12L12 19M5 12L12 5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      
      <svg
        className="absolute inset-0 w-11 h-11 pointer-events-none"
        viewBox="0 0 44 44"
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#d1d5db" // gray-300
          strokeWidth="2"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center'
          }}
        />
      </svg>
    </div>
  );
};

export default ScrollProgressButton; 