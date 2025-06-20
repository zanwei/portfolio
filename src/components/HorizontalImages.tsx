import Image from 'next/image';
import { useRef, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface HorizontalImagesProps {
  urls?: string[];
  url?: string;
  alt?: string;
}

export default function HorizontalImages({ urls, url, alt }: HorizontalImagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);
  
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  const images = urls && urls.length > 0 ? urls : url ? [url] : [];
  
  const smoothScroll = useCallback((targetScrollLeft: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const startScrollLeft = container.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    const duration = 150;
    let startTime: number;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // 使用 easeOutQuart 缓动函数
      const ease = 1 - Math.pow(1 - progress, 4);
      container.scrollLeft = startScrollLeft + distance * ease;

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateScroll);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  }, []);

  // 鼠标滚轮处理函数
  const handleWheel = useCallback((e: WheelEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    // 判断是竖向滚动还是横向滑动
    const absDeltaX = Math.abs(e.deltaX);
    const absDeltaY = Math.abs(e.deltaY);

    // 仅当竖向滚动更明显时，才阻止默认并自定义横向滚动
    if (absDeltaY > absDeltaX) {
      e.preventDefault();
      e.stopPropagation();
      // 把竖向滚动转为横向滚动
      const scrollSpeed = absDeltaY > 50 ? e.deltaY * 0.8 : e.deltaY * 1.2;
      const targetScrollLeft = container.scrollLeft + scrollSpeed;
      smoothScroll(targetScrollLeft);
    }
    // 否则（横向滑动，如 trackpad），让浏览器原生处理
  }, [smoothScroll]);

  // 鼠标进入/离开处理
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    // 禁用页面滚动
    document.body.style.overflow = 'hidden';
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // 恢复页面滚动
    document.body.style.overflow = '';
    // 清理动画
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // 添加/移除滚轮事件监听器
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 添加非被动的滚轮事件监听器
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // 清理函数
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // 图片点击放大
  const handleImageClick = useCallback((imageSrc: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setZoomedImage(imageSrc);
  }, []);

  const closeZoom = useCallback(() => {
    setZoomedImage(null);
  }, []);

  const ease = [0, 0, 0.4, 1] as const;

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <>
        <div className="w-screen max-w-none relative left-1/2 -translate-x-1/2 my-8">
          <div className="flex justify-center px-6">
            <motion.div 
              className="relative w-full max-w-4xl aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-2xl cursor-pointer"
              whileTap={{ scale: 0.98, transition: { duration: 0.1, ease } }}
              onClick={(e) => handleImageClick(images[0], e)}
            >
              <Image src={images[0]} alt={alt || ''} fill className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* 放大视图 */}
        {typeof window !== "undefined" && createPortal(
          <AnimatePresence>
            {zoomedImage && (
              <motion.div
                className="fixed inset-0 z-[1000] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/5 backdrop-blur-[10px] cursor-pointer"
                  onClick={closeZoom}
                />
                <motion.div
                  className="relative rounded-xl overflow-hidden cursor-pointer"
                  style={{ width: "80vw", height: "80vh" }}
                  onClick={closeZoom}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2, ease }}
                >
                  <Image src={zoomedImage} alt={alt || ''} fill className="object-contain" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </>
    );
  }

  return (
    <>
      <div 
        ref={containerRef}
        className="w-screen max-w-none relative left-1/2 -translate-x-1/2 my-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{
            // CSS 硬件加速优化
            transform: 'translateZ(0)',
            willChange: 'scroll-position',
            scrollBehavior: 'auto' // 禁用浏览器默认平滑滚动，使用自定义实现
          }}
        >
          {/* 调整padding让首尾图片可以滑动到中心 */}
          <div 
            className="flex gap-6" 
            style={{ 
              minWidth: 'max-content',
              paddingLeft: 'calc(50vw - min(250px, 25vw))',
              paddingRight: 'calc(50vw - min(250px, 25vw))',
              // 优化渲染性能
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {images.map((img, idx) => (
              <motion.div 
                key={idx} 
                className="relative flex-shrink-0 w-[400px] lg:w-[500px] aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-2xl cursor-pointer"
                whileTap={{ scale: 0.98, transition: { duration: 0.1, ease } }}
                onClick={(e) => handleImageClick(img, e)}
                style={{
                  // 硬件加速优化每个图片元素
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <Image src={img} alt={alt || ''} fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 放大视图 */}
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {zoomedImage && (
            <motion.div
              className="fixed inset-0 z-[1000] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease }}
            >
              <motion.div
                className="absolute inset-0 bg-black/5 backdrop-blur-[10px] cursor-pointer"
                onClick={closeZoom}
              />
              <motion.div
                className="relative rounded-xl overflow-hidden cursor-pointer"
                style={{ width: "80vw", height: "80vh" }}
                onClick={closeZoom}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2, ease }}
              >
                <Image src={zoomedImage} alt={alt || ''} fill className="object-contain" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
} 