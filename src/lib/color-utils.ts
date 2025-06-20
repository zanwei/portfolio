// 颜色提取和计算工具函数

/**
 * 从图片中提取最高饱和度的颜色
 * @param imageSrc 图片源地址
 * @returns Promise<string> 返回十六进制颜色值
 */
export const extractMostSaturatedColor = (imageSrc: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve("#ffffff");
        return;
      }

      const width = 50;
      const height = Math.floor((img.height / img.width) * width);
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height).data;

      let mostSaturated = { r: 0, g: 0, b: 0, saturation: 0 };

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        
        const max = Math.max(r, g, b) / 255;
        const min = Math.min(r, g, b) / 255;
        const lightness = (max + min) / 2;
        
        let saturation = 0;
        if (max !== min) {
          saturation = lightness > 0.5 
            ? (max - min) / (2 - max - min)
            : (max - min) / (max + min);
        }
        
        if (saturation > mostSaturated.saturation && lightness > 0.2 && lightness < 0.8) {
          mostSaturated = { r, g, b, saturation };
        }
      }

      if (mostSaturated.saturation === 0) {
        mostSaturated = { r: 128, g: 128, b: 128, saturation: 0 };
      }

      const toHex = (c: number) => c.toString(16).padStart(2, "0");
      const hexColor = `#${toHex(mostSaturated.r)}${toHex(mostSaturated.g)}${toHex(mostSaturated.b)}`;
      resolve(hexColor);
    };

    img.onerror = () => {
      resolve("#ffffff");
    };
  });
};

/**
 * 根据背景颜色计算最佳的文字颜色（黑色或白色）
 * @param hexColor 背景颜色的十六进制值
 * @returns string 返回 "#ffffff" 或 "#000000"
 */
export const calculateOptimalTextColor = (hexColor: string): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // 计算相对亮度
  const rel = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  
  const bgLum = 0.2126 * rel(r) + 0.7152 * rel(g) + 0.0722 * rel(b);
  const whiteLum = 1;
  const blackLum = 0;

  // 对比度公式 (L1 + 0.05) / (L2 + 0.05)
  const contrastWhite = (Math.max(bgLum, whiteLum) + 0.05) / (Math.min(bgLum, whiteLum) + 0.05);
  const contrastBlack = (Math.max(bgLum, blackLum) + 0.05) / (Math.min(bgLum, blackLum) + 0.05);

  return contrastWhite >= contrastBlack ? "#ffffff" : "#000000";
}; 