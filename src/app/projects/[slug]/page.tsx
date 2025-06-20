"use client";

import { notFound, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ZoomableImage from "@/components/ZoomableImage";
import ScrollProgressButton from "@/components/ScrollProgressButton";
import PageBackground from "@/components/PageBackground";
import { extractMostSaturatedColor, calculateOptimalTextColor } from "@/lib/color-utils";
import { scrollFadeConfig } from "@/lib/animation-constants";
import { initialProjects as projects } from "@/app/projects/cms/data/projects";
import type { Project, ContentSection } from "@/app/projects/cms/types";
import HorizontalImages from '@/components/HorizontalImages';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 渲染不同类型的内容块
function renderContentSection(section: ContentSection, index: number, textColor: string) {
  const key = `section-${index}`;
  
  const content = (() => {
    switch (section.type) {
      case "heading1":
        return (
          <h1 
            className="text-xl sm:text-[1.375rem] lg:text-2xl leading-tight mb-4 sm:mb-6 mt-6 sm:mt-8 first:mt-0"
            style={{ 
              fontFamily: 'ABCDiatype, Inter, Helvetica, Arial, PingFang SC, Microsoft YaHei, sans-serif',
              fontWeight: 300,
              color: textColor 
            }}
          >
            {section.text}
          </h1>
        );
      
      case "heading2":
        return (
          <h2 
            className="text-lg sm:text-[1.25rem] lg:text-xl leading-tight mb-3 sm:mb-4 mt-6 sm:mt-8"
            style={{ 
              fontFamily: 'ABCDiatype, Inter, Helvetica, Arial, PingFang SC, Microsoft YaHei, sans-serif',
              fontWeight: 300,
              color: textColor 
            }}
          >
            {section.text}
          </h2>
        );
      
      case "heading3":
        return (
          <h3 
            className="text-base sm:text-[1.125rem] lg:text-lg leading-tight mb-3 sm:mb-4 mt-4 sm:mt-6"
            style={{ 
              fontFamily: 'ABCDiatype, Inter, Helvetica, Arial, PingFang SC, Microsoft YaHei, sans-serif',
              fontWeight: 300,
              color: textColor 
            }}
          >
            {section.text}
          </h3>
        );
      
      case "paragraph":
        return (
          <p 
            className="text-sm sm:text-[1rem] lg:text-lg leading-relaxed mb-3 sm:mb-4"
            style={{ 
              fontFamily: 'ABCDiatype, Inter, Helvetica, Arial, PingFang SC, Microsoft YaHei, sans-serif',
              fontWeight: 300,
              color: textColor 
            }}
          >
            {section.text}
          </p>
        );
      
      case "quote":
        return (
          <blockquote className="border-l-4 border-gray-400 pl-4 sm:pl-6 my-4 sm:my-6 italic">
            <p 
              className="text-sm sm:text-[1rem] lg:text-lg leading-relaxed"
              style={{ 
                fontFamily: 'ABCDiatype, Inter, Helvetica, Arial, PingFang SC, Microsoft YaHei, sans-serif',
                fontWeight: 400,
                fontStyle: 'italic',
                color: textColor 
              }}
            >
              {section.text}
            </p>
          </blockquote>
        );
      
      case "bullet_list":
        return (
          <ul 
            className="list-disc list-inside space-y-1 sm:space-y-2 mb-3 sm:mb-4"
            style={{ 
              marginLeft: 'calc(var(--spacing) * 1)',
              color: textColor 
            }}
          >
            {section.items?.map((item: string, itemIndex: number) => (
              <li 
                key={itemIndex}
                className="text-sm sm:text-[1rem] lg:text-lg leading-relaxed"
                style={{ 
                  fontFamily: 'ABCDiatype, Inter, Helvetica, Arial, PingFang SC, Microsoft YaHei, sans-serif',
                  fontWeight: 300,
                  color: textColor 
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        );
      
      case "number_list":
        return (
          <ol 
            className="list-decimal list-inside space-y-1 sm:space-y-2 mb-3 sm:mb-4"
            style={{ 
              marginLeft: 'calc(var(--spacing) * 1)',
              color: textColor 
            }}
          >
            {section.items?.map((item: string, itemIndex: number) => (
              <li 
                key={itemIndex}
                className="text-sm sm:text-[1rem] lg:text-lg leading-relaxed"
                style={{ 
                  fontFamily: 'ABCDiatype, Inter, Helvetica, Arial, PingFang SC, Microsoft YaHei, sans-serif',
                  fontWeight: 300,
                  color: textColor 
                }}
              >
                {item}
              </li>
            ))}
          </ol>
        );
      
      case "image":
        return (
          <HorizontalImages urls={section.urls} url={section.url} alt={section.alt} />
        );
      
      case "code":
        return (
          <div className="my-6">
            <SyntaxHighlighter
              language={section.language || 'tsx'}
              style={oneLight}
              customStyle={{ borderRadius: 8, fontSize: 14, padding: 16 }}
              showLineNumbers
            >
              {section.code || ''}
            </SyntaxHighlighter>
          </div>
        );
      
      default:
        return null;
    }
  })();

  return content ? (
    <ScrollFadeIn key={key} index={index}>
      {content}
    </ScrollFadeIn>
  ) : null;
}

// 自定义 hook 用于监听元素的滚动可见性
function useScrollFadeIn() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 当元素的一小部分进入viewport时就触发
        if (entry.intersectionRatio >= 0.1) {
          setIsVisible(true);
        }
      },
      {
        threshold: scrollFadeConfig.threshold,
        rootMargin: scrollFadeConfig.rootMargin
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
}

// 滚动渐入组件
function ScrollFadeIn({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  const { ref, isVisible } = useScrollFadeIn();
  
  // 前3个元素直接显示，不需要滚动触发
  const shouldShowDirectly = index < 3;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: shouldShowDirectly ? 1 : 0 }}
      animate={{ opacity: shouldShowDirectly || isVisible ? 1 : 0 }}
      transition={{
        duration: shouldShowDirectly ? 0 : scrollFadeConfig.transitionDuration,
        ease: scrollFadeConfig.transitionEase,
        delay: shouldShowDirectly ? 0 : index * scrollFadeConfig.minStaggerDelay
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const presetBgColor = searchParams.get('bgColor');
  
  const [bgColor, setBgColor] = useState<string>(presetBgColor || "#ffffff");
  const [textColor, setTextColor] = useState<string>("#000000");

  // 如果有预设背景色，立即计算文字颜色
  useEffect(() => {
    if (presetBgColor) {
      setTextColor(calculateOptimalTextColor(presetBgColor));
    }
  }, [presetBgColor]);

  useEffect(() => {
    const getProject = async () => {
      // Await the params promise to resolve
      const { slug } = await params;
      const foundProject = projects.find((p) => p.slug === slug);
      
      if (foundProject) {
        setProject(foundProject);
      }
      
      setLoading(false);
    };

    getProject();
  }, [params]);

  // 在获取项目后，加载图片并提取最深颜色
  useEffect(() => {
    if (!project || presetBgColor) return; // 如果有预设颜色就不再重新提取

    const extractColorAndSetState = async () => {
      const hexColor = await extractMostSaturatedColor(project.cover);
      setBgColor(hexColor);
      setTextColor(calculateOptimalTextColor(hexColor));
    };

    extractColorAndSetState();
  }, [project, presetBgColor]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!project) return notFound();

  return (
    <>
      <PageBackground color={bgColor} />
      
      <div className="min-h-screen flex justify-center relative z-10">
        {/* Back Button - Desktop version with scroll progress */}
        <div className="hidden lg:block fixed left-[calc(50%-300px-44px-120px)] xl:left-[calc(50%-250px-16px-120px)] top-[calc(var(--spacing)*8)] z-50">
          <ScrollProgressButton href="/" color={textColor} />
        </div>

        <div className="w-full max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-[calc(var(--spacing)*8)] pb-[calc(var(--spacing)*12)]">
          {/* Back Button - Mobile version with progress bar at top */}
          <div className="lg:hidden mb-4">
            <ScrollProgressButton href="/" isMobile={true} color={textColor} />
          </div>

          {/* Project Title */}
          <ScrollFadeIn index={0}>
            <section className="mb-8 sm:mb-12">
              <div className="flex flex-col space-y-4 sm:space-y-6">
                <div>
                  <h1
                    className="text-xl sm:text-[1.5rem] lg:text-2xl font-medium leading-tight"
                    style={{ 
                      fontFamily: 'Times New Roman, Times, serif',
                      fontStyle: 'italic',
                      color: textColor 
                    }}
                  >
                    {project.title}
                  </h1>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <p 
                    className="text-base sm:text-[1.2rem] lg:text-xl leading-relaxed" 
                    style={{ 
                      fontFamily: 'ABCDiatype, Inter, Helvetica, Arial, PingFang SC, Microsoft YaHei, sans-serif',
                      fontWeight: 300,
                      color: textColor 
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </section>
          </ScrollFadeIn>

          {/* Project Image */}
          <ScrollFadeIn index={1}>
            <section className="mb-8 sm:mb-12">
              <div className="rounded-lg overflow-hidden bg-transparent">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                  <ZoomableImage
                    src={project.cover}
                    alt={project.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 600px"
                    priority
                  />
                </div>
              </div>
            </section>
          </ScrollFadeIn>

          {/* Project Content */}
          <section>
            <div className="space-y-0">
              {project.content.sections.map((section, index) => 
                renderContentSection(section, index + 2, textColor) // 从索引2开始，因为标题和图片占用了0和1
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
} 