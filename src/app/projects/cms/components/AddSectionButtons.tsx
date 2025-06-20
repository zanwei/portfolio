import { ContentSection } from '../types';

interface AddSectionButtonsProps {
  onAddSection: (type: ContentSection['type']) => void;
}

export default function AddSectionButtons({ onAddSection }: AddSectionButtonsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button 
        onClick={() => onAddSection('heading1')} 
        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded"
      >
        + H1
      </button>
      <button 
        onClick={() => onAddSection('heading2')} 
        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded"
      >
        + H2
      </button>
      <button 
        onClick={() => onAddSection('heading3')} 
        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded"
      >
        + H3
      </button>
      <button 
        onClick={() => onAddSection('paragraph')} 
        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded"
      >
        + Paragraph
      </button>
      <button 
        onClick={() => onAddSection('quote')} 
        className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded"
      >
        + Quote
      </button>
      <button 
        onClick={() => onAddSection('bullet_list')} 
        className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded"
      >
        + Bullet List
      </button>
      <button 
        onClick={() => onAddSection('number_list')} 
        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded"
      >
        + Number List
      </button>
      <button 
        onClick={() => onAddSection('link')} 
        className="px-3 py-1 text-sm bg-cyan-100 text-cyan-800 rounded"
      >
        + Link
      </button>
      <button 
        onClick={() => onAddSection('image')} 
        className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded"
      >
        + Image
      </button>
      <button 
        onClick={() => onAddSection('video')} 
        className="px-3 py-1 text-sm bg-pink-100 text-pink-800 rounded"
      >
        + Video
      </button>
    </div>
  );
} 