// 动画配置常量
// 统一管理所有页面和组件的动画参数

import { cubicBezier } from "framer-motion";

// 缓动曲线
export const EASING = {
  SMOOTH: [0, 0, 0.4, 1] as const,
  CUBIC_SMOOTH: cubicBezier(0, 0, 0.4, 1),
  SPRING: [0, 0, 0.58, 1] as const,
} as const;

// 动画持续时间
export const DURATION = {
  FAST: 0.1,
  NORMAL: 0.2,
  SLOW: 0.3,
  VERY_SLOW: 0.5,
  TRANSITION: 0.6,
} as const;

// 错开延迟
export const STAGGER = {
  MINIMAL: 0.01,
  SMALL: 0.02,
  MEDIUM: 0.03,
  LARGE: 0.06,
} as const;

// 常用动画变体
export const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * STAGGER.SMALL,
      duration: DURATION.SLOW,
      ease: EASING.CUBIC_SMOOTH,
    },
  }),
};

export const cmsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: i * STAGGER.LARGE 
    } 
  })
};

export const scrollFadeConfig = {
  threshold: [0, 0.3] as number[],
  rootMargin: '0px 0px 5% 0px',
  transitionDuration: DURATION.VERY_SLOW,
  transitionEase: EASING.SPRING,
  minStaggerDelay: STAGGER.MINIMAL,
}; 