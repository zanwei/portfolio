# CMS 项目内容管理系统

这个目录包含了项目内容管理系统的所有文件，已经被重构为模块化的结构以便更好地管理和维护。

## 文件结构

```
cms/
├── README.md                           # 说明文档
├── page.tsx                           # 主页面组件
├── types.ts                          # TypeScript 类型定义
├── data/
│   └── projects.ts                    # 项目数据配置
├── utils/
│   ├── animations.ts                  # 动画配置
│   └── cms-utils.ts                   # CMS 工具函数
└── components/
    ├── ProjectSelector.tsx            # 项目选择器组件
    ├── ContentEditor.tsx              # 内容编辑器主组件
    ├── AddSectionButtons.tsx          # 添加内容块按钮组件
    └── SectionEditor.tsx              # 单个内容块编辑器组件
```

## 模块说明

### 核心文件

- **`page.tsx`** - 主页面组件，负责状态管理和组件整合
- **`types.ts`** - 定义了 `ContentSection` 和 `Project` 接口

### 数据层

- **`data/projects.ts`** - 存放初始项目数据，可以轻松添加新项目

### 工具层

- **`utils/animations.ts`** - Framer Motion 动画配置
- **`utils/cms-utils.ts`** - 导出数据等实用函数

### 组件层

- **`ProjectSelector.tsx`** - 左侧项目选择面板
- **`ContentEditor.tsx`** - 主要的内容编辑器，整合所有编辑功能
- **`AddSectionButtons.tsx`** - 添加不同类型内容块的按钮组
- **`SectionEditor.tsx`** - 处理单个内容块的编辑和预览

## 使用方法

1. 访问 CMS 页面
2. 从左侧选择要编辑的项目
3. 使用顶部按钮添加不同类型的内容块
4. 点击 "Edit" 编辑内容，点击 "Done" 保存
5. 使用 "Export Data" 导出项目数据

## 添加新项目

要添加新项目，请编辑 `data/projects.ts` 文件：

```typescript
export const initialProjects: Project[] = [
  // ... 现有项目
  {
    slug: "new-project",
    title: "New Project Title",
    description: "Project description",
    cover: "/images/project-cover.jpg",
    content: {
      sections: [
        {
          type: "heading1",
          text: "Welcome to the new project"
        }
      ]
    }
  }
];
```

## 扩展功能

- 要添加新的内容块类型，请更新 `types.ts` 中的 `ContentSection` 接口
- 要添加新的工具函数，请在 `utils/` 目录下创建相应文件
- 要添加新的 UI 组件，请在 `components/` 目录下创建 