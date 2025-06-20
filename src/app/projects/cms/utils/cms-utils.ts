import { Project } from '../types';

// 导出项目数据
export const exportData = (projects: Project[]) => {
  const dataStr = JSON.stringify(projects, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'projects-content.json';
  link.click();
}; 