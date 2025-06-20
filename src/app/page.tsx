"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import LetterSwapForward from "@/fancy/components/text/letter-swap-forward-anim";
import { useState, useEffect } from "react";
import HoverImage from "@/components/HoverImage";
import SocialLinks from "@/components/SocialLinks";
import PageBackground from "@/components/PageBackground";
import { extractMostSaturatedColor } from "@/lib/color-utils";
import { projectsData, companiesData } from "@/lib/project-data";
import { fadeInVariants, EASING, DURATION } from "@/lib/animation-constants";

export default function HomePage() {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [projectColors, setProjectColors] = useState<Record<string, string>>({});

  // 预提取所有项目的颜色
  useEffect(() => {
    const extractColors = async () => {
      const colors: Record<string, string> = {};
      for (const project of projectsData) {
        colors[project.slug] = await extractMostSaturatedColor(project.cover);
      }
      setProjectColors(colors);
    };
    extractColors();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // 需要动画的所有元素，依次编号
  let motionIndex = 0;

  return (
    <>
      <PageBackground color="#ffffff" />
      
      <div className="min-h-screen flex justify-center relative z-10">
        <HoverImage
          src={hoveredCompany ? companiesData[hoveredCompany as keyof typeof companiesData].image : ''}
          x={mousePosition.x}
          y={mousePosition.y}
          visible={!!hoveredCompany}
        />
        <div className="w-[500px] px-4" style={{ paddingBlock: 'calc(var(--spacing) * 12)' }}>
          {/* Hero Section */}
          <section className="mb-12">
            <div className="flex flex-col space-y-6">
              {/* 上方：zanwei.guo */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                custom={motionIndex++}
                className="flex justify-between items-center"
              >
                <LetterSwapForward
                  label="zanwei.guo"
                  className="font-serif italic font-medium text-[1.2rem] text-black leading-tight justify-start"
                  reverse={false}
                  transition={{
                    type: "spring",
                    duration: DURATION.TRANSITION,
                  }}
                  staggerDuration={0.02}
                />
                <SocialLinks />
              </motion.div>
              
              {/* 下方：内容区域 */}
              <div className="space-y-4">
                {[
                  "Problems are always arising and constantly being solved. That is my mission.",
                  <>
                    Now, I am creating tools at{' '}
                    <Link
                      href={companiesData.affine.href}
                      className="underline decoration-gray-300 underline-offset-[15%] hover:decoration-gray-600"
                      onMouseEnter={() => setHoveredCompany('affine')}
                      onMouseLeave={() => setHoveredCompany(null)}
                      onMouseMove={handleMouseMove}
                    >
                      {companiesData.affine.name}
                    </Link>{' '}
                    that helps humans record their knowledge in an effective way.
                  </>,
                  <>
                    In the past, I have digitized their processes for many large companies at{' '}
                    <Link
                      href={companiesData.ming.href}
                      className="underline decoration-gray-300 underline-offset-[15%] hover:decoration-gray-600"
                      onMouseEnter={() => setHoveredCompany('ming')}
                      onMouseLeave={() => setHoveredCompany(null)}
                      onMouseMove={handleMouseMove}
                    >
                      {companiesData.ming.name}
                    </Link>{' '}
                    and also helped them create tools.
                  </>
                ].map((content, index) => (
                  <motion.p
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    custom={motionIndex++}
                    className="font-abc-light text-[1.2rem] text-black leading-relaxed"
                  >
                    {content}
                  </motion.p>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section>
            <div className="space-y-[2rem]">
              {projectsData.map((project) => (
                <motion.div
                  key={project.slug}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  custom={motionIndex++}
                  whileTap={{ 
                    scale: 0.98,
                    transition: {
                      duration: DURATION.FAST,
                      ease: EASING.CUBIC_SMOOTH
                    }
                  }}
                >
                  <Link
                    href={`/projects/${project.slug}${projectColors[project.slug] ? `?bgColor=${encodeURIComponent(projectColors[project.slug])}` : ''}`}
                    className="block group"
                  >
                    <div
                      className="border border-gray-200 rounded-2xl overflow-hidden bg-white transition-shadow duration-200 group/card"
                      style={{ boxShadow: '0px 4px 2px 0px rgba(0, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.09), 0px 0px 1px 0px rgba(0, 0, 0, 0.10)' }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 64px 18px 0px rgba(0, 0, 0, 0.00), 0px 41px 16px 0px rgba(0, 0, 0, 0.01), 0px 23px 14px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.09), 0px 3px 6px 0px rgba(0, 0, 0, 0.10)')}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 4px 2px 0px rgba(0, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.09), 0px 0px 1px 0px rgba(0, 0, 0, 0.10)')}
                    >
                      {/* 16:9 图片容器 */}
                      <div className="relative w-full aspect-[16/9] bg-gray-400 rounded-2xl overflow-hidden">
                        <Image
                          src={project.cover}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="500px"
                        />
                      </div>
                      {/* Title & Created Time */}
                      <div className="px-0 pt-3 pb-4">
                        <div className="font-abc-normal text-black text-[1.0625rem] leading-[23px] tracking-[-0.16px] mb-[2px] pl-[1rem] pr-[1rem]">
                          {project.title}
                        </div>
                        <div className="font-times-italic text-[#828282] text-[0.8125rem] leading-[23px] tracking-[-0.13px] pl-[1rem] pr-[1rem]">
                          {project.created.replace(/-/g, '/').replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1/$2/$3')}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
