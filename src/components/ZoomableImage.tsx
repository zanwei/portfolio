import { useState, useId, ReactNode } from "react";
import { createPortal } from "react-dom";
import Image, { ImageProps } from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/**
 * 通用可缩放图片组件
 * 满足以下需求：
 * 1. 图片充满容器，处理不同长宽比的图片显示，圆角为 4px
 * 2. 点击图片时，0.1s 内缩放到 98%，cubic-bezier(0,0,0.4,1)
 * 3. 释放点击后，放大到距屏幕四周 10% 的大小，伴随 #000/5 + backdrop-blur(10px) 遮罩
 * 4. 放大/收起整体动画 0.2s，cubic-bezier(0,0,0.4,1)
 */
interface ZoomableImageProps extends Omit<ImageProps, "fill"> {
  /** 覆盖额外的容器类名，可用于自定义尺寸等 */
  className?: string;
  /** 传递子元素（例如 caption），会一起参与布局动画 */
  children?: ReactNode;
}

export default function ZoomableImage({
  src,
  alt,
  className = "",
  children,
  ...rest
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  // layoutId 用于 framer-motion 的 shared layout 动画
  const layoutId = useId();

  const toggle = () => setIsOpen((v) => !v);
  const close = () => setIsOpen(false);

  // easing 数组形式便于在 motion 中复用
  const ease = [0, 0, 0.4, 1] as const;

  // 缩略图版本的图片元素 - 使用 object-cover 充满容器
  const thumbnailImageElement = (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover pointer-events-none select-none rounded-[4px]" // 使用object-cover充满容器，添加4px圆角
      {...rest}
    />
  );

  // 放大版本的图片元素 - 使用 object-contain 保持完整显示
  const fullImageElement = (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain pointer-events-none select-none rounded-[4px]" // 放大时使用object-contain完整显示
      {...rest}
    />
  );

  return (
    <>
      {/* 缩略图容器 - 充满容器 */}
      <motion.div
        layoutId={layoutId}
        onClick={toggle}
        whileTap={{ scale: 0.98, transition: { duration: 0.1, ease } }}
        transition={{ duration: 0.2, ease }} // 修改为0.2s
        className={`relative w-full h-full overflow-hidden bg-transparent rounded-[4px] cursor-pointer ${className}`} // 添加4px圆角，充满容器
        style={{ 
          border: "none"
        }}
      >
        {thumbnailImageElement}
        {children}
      </motion.div>

      {/* 放大视图 & 遮罩 */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 z-[1000] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease }} // 修改为0.2s
              >
                {/* 遮罩层 - 修改为 #000/5 + backdrop-blur(10px) */}
                <motion.div
                  className="absolute inset-0 bg-black/5 backdrop-blur-[10px] cursor-pointer" // 修改遮罩样式
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease }} // 修改为0.2s
                  onClick={close}
                />

                {/* 放大的图片容器 - 修改为距屏幕四周10% */}
                <motion.div
                  layoutId={layoutId}
                  className="relative rounded-[4px] overflow-hidden cursor-pointer" // 添加4px圆角
                  style={{
                    width: "80vw", // 距离四周 10% 留白，即80%
                    height: "80vh", // 距离四周 10% 留白，即80%
                  }}
                  onClick={close}
                  transition={{ duration: 0.2, ease }} // 修改为0.2s
                >
                  {fullImageElement}
                  {children}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
} 