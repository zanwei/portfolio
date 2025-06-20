import { motion } from "framer-motion";
import { ContentSection } from '../types';
import { fadeInVariants } from '../../../../lib/animation-constants';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SectionEditorProps {
  section: ContentSection;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<ContentSection>) => void;
}

export default function SectionEditor({
  section,
  index,
  isEditing,
  onEdit,
  onDelete,
  onUpdate
}: SectionEditorProps) {
  return (
    <motion.div
      key={index}
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      custom={index + 3}
      className="border rounded-lg p-4 bg-gray-50"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-600 uppercase">
          {section.type.replace('_', ' ')}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
          <button
            onClick={onDelete}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <EditingView section={section} onUpdate={onUpdate} />
      ) : (
        <PreviewView section={section} />
      )}
    </motion.div>
  );
}

function EditingView({ section, onUpdate }: { section: ContentSection; onUpdate: (updates: Partial<ContentSection>) => void }) {
  if (section.type === 'bullet_list' || section.type === 'number_list') {
    return (
      <div className="space-y-2">
        {section.items?.map((item, itemIndex) => (
          <input
            key={itemIndex}
            type="text"
            value={item}
            onChange={(e) => {
              const newItems = [...(section.items || [])];
              newItems[itemIndex] = e.target.value;
              onUpdate({ items: newItems });
            }}
            className="w-full p-2 border rounded"
          />
        ))}
        <button
          onClick={() => {
            const newItems = [...(section.items || []), 'New item'];
            onUpdate({ items: newItems });
          }}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          + Add Item
        </button>
      </div>
    );
  }

  if (section.type === 'link') {
    return (
      <div className="space-y-2">
        <input
          type="text"
          value={section.text || ''}
          onChange={e => onUpdate({ text: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Link text"
        />
        <input
          type="url"
          value={section.url || ''}
          onChange={e => onUpdate({ url: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="https://example.com"
        />
      </div>
    );
  }

  if (section.type === 'image') {
    return (
      <div className="space-y-2">
        <input
          type="url"
          value={section.url || ''}
          onChange={e => onUpdate({ url: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Image URL"
        />
        <input
          type="text"
          value={section.alt || ''}
          onChange={e => onUpdate({ alt: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Alt text"
        />
      </div>
    );
  }

  if (section.type === 'video') {
    return (
      <div className="space-y-2">
        <input
          type="url"
          value={section.url || ''}
          onChange={e => onUpdate({ url: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Video embed URL (YouTube, Vimeo, etc.)"
        />
      </div>
    );
  }

  if (section.type === 'code') {
    return (
      <div className="space-y-2">
        <textarea
          value={section.code || ''}
          onChange={e => onUpdate({ code: e.target.value })}
          className="w-full p-2 border rounded font-mono"
          rows={8}
          placeholder="输入代码..."
        />
        <input
          type="text"
          value={section.language || 'tsx'}
          onChange={e => onUpdate({ language: e.target.value })}
          className="w-full p-2 border rounded font-mono"
          placeholder="代码语言，如 tsx、js、css 等"
        />
      </div>
    );
  }

  return (
    <textarea
      value={section.text || ''}
      onChange={(e) => onUpdate({ text: e.target.value })}
      className="w-full p-2 border rounded"
      rows={section.type === 'paragraph' ? 4 : 2}
    />
  );
}

function PreviewView({ section }: { section: ContentSection }) {
  if (section.type === 'bullet_list' || section.type === 'number_list') {
    return (
      <ul className={section.type === 'number_list' ? 'list-decimal' : 'list-disc'} style={{ paddingLeft: '1.5em' }}>
        {section.items?.map((item, itemIndex) => (
          <li key={itemIndex}>{item}</li>
        ))}
      </ul>
    );
  }

  if (section.type === 'link') {
    return (
      <a href={section.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        {section.text || section.url}
      </a>
    );
  }

  if (section.type === 'image') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={section.url} alt={section.alt || ''} className="max-w-full h-auto rounded border" />
    );
  }

  if (section.type === 'video') {
    return (
      <div className="aspect-video w-full max-w-full">
        <iframe
          src={section.url}
          title={section.alt || 'Video'}
          className="w-full h-full rounded border"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (section.type === 'code') {
    return (
      <div className="my-4">
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
  }

  return (
    <div className={section.type === 'quote' ? 'italic border-l-4 border-gray-300 pl-3' : ''}>
      {section.text}
    </div>
  );
} 