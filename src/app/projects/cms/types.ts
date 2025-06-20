// 项目数据类型定义
export interface ContentSection {
  type: 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'quote' | 'bullet_list' | 'number_list' | 'link' | 'image' | 'video' | 'code';
  text?: string;
  items?: string[];
  url?: string;
  urls?: string[];
  alt?: string;
  code?: string;
  language?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  cover: string;
  created: string;
  content: {
    sections: ContentSection[];
  };
} 