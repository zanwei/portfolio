import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export default function StyleGuidePage() {
  return (
    <>
      <PageBackground color="#ffffff" />
      
      <div className="min-h-screen flex justify-center relative z-10">
        <div className="w-[500px] px-4" style={{ paddingBlock: 'calc(var(--spacing) * 3)' }}>
          {/* 导航 */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-[1.2rem] font-abc-normal text-black hover:text-gray-700 transition-colors"
            >
              ← Back to Home
            </Link>
            <span className="mx-4 text-gray-400">|</span>
            <Link 
              href="/projects/cms" 
              className="inline-flex items-center text-[1.2rem] font-abc-normal text-black hover:text-gray-700 transition-colors"
            >
              Content Management System
            </Link>
          </div>

          {/* 页面标题 */}
          <section className="mb-12">
            <h1 className="text-[1.5rem] font-times-italic font-medium text-black leading-tight mb-4">
              Style Guide
            </h1>
            <p className="font-abc-normal text-[1.2rem] text-black leading-relaxed">
              Preview of all
            </p>
          </section>

          {/* 样式展示 */}
          <section className="space-y-8">
            
            {/* 标题层级 */}
            <div>
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
                <strong>Title - Page Main Title</strong><br/>
                <code>text-[2.5rem] font-serif italic font-medium text-black leading-tight</code><br/>
                <code>fontFamily: &apos;Times, serif&apos;</code>
              </div>
              <h1 className="text-[2.5rem] font-times-italic font-medium text-black leading-tight">
                Page Main Title Example
              </h1>
            </div>

            <div>
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
                <strong>Heading 1 - Primary Section</strong><br/>
                <code>text-[1.375rem] font-serif font-medium text-black leading-tight mb-6 mt-8</code>
              </div>
              <h1 className="text-[1.375rem] font-abc font-medium text-black leading-tight mb-6 mt-8 first:mt-0">
                Heading 1 Example
              </h1>
            </div>

            <div>
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
                <strong>Heading 2 - Secondary Section</strong><br/>
                <code>text-[1.25rem] font-serif font-medium text-black leading-tight mb-4 mt-8</code>
              </div>
              <h2 className="text-[1.25rem] font-abc font-medium text-black leading-tight mb-4 mt-8">
                Heading 2 Example
              </h2>
            </div>

            <div>
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
                <strong>Heading 3 - Subsection</strong><br/>
                <code>text-[1.125rem] font-serif font-medium text-black leading-tight mb-4 mt-6</code>
              </div>
              <h3 className="text-[1.125rem] font-abc font-medium text-black leading-tight mb-4 mt-6">
                Heading 3 Example
              </h3>
            </div>

            {/* 正文段落 */}
            <div>
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
                <strong>Paragraph - Body Text</strong><br/>
                <code>font-sans text-[1rem] text-black leading-relaxed mb-4</code><br/>
                <code>fontFamily: &apos;ABCDiatype, sans-serif&apos;, fontWeight: 400</code>
              </div>
              <p className="font-abc-normal text-[1rem] text-black leading-relaxed mb-4">
                This is an example paragraph showcasing body text font and spacing effects.
              </p>
            </div>

            {/* 引用块 */}
            <div>
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
                <strong>Quote - Block Quote</strong><br/>
                <code>border-l-4 border-gray-400 pl-6 my-6 italic</code><br/>
                <code>font-serif text-[1rem] text-gray-700 leading-relaxed</code>
              </div>
              <blockquote className="border-l-4 border-gray-400 pl-6 my-6 italic">
                                  <p className="font-abc text-[1rem] text-gray-700 leading-relaxed">
                    &quot;Excellent design is not just about aesthetics, but more importantly about solving real problems and creating value for users. This is an example of a quote block, typically used to highlight important viewpoints, famous quotes, or key information.&quot;
                  </p>
              </blockquote>
            </div>

            {/* 无序列表 */}
            <div>
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
                <strong>Bullet List - Unordered List</strong><br/>
                <code>list-disc list-inside space-y-2 mb-4 ml-4</code><br/>
                <code>font-sans text-[1rem] text-black leading-relaxed</code>
              </div>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  First list item - showcasing unordered list style
                </li>
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Second list item - suitable for parallel points or features
                </li>
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Third list item - maintaining good visual hierarchy
                </li>
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Fourth list item - supports multi-line text, automatically wrapping when content is longer while maintaining proper indentation and spacing
                </li>
              </ul>
            </div>

            {/* 有序列表 */}
            <div>
              <div className="mb-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
                <strong>Number List - Ordered List</strong><br/>
                <code>list-decimal list-inside space-y-2 mb-4 ml-4</code><br/>
                <code>font-sans text-[1rem] text-black leading-relaxed</code>
              </div>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Requirements analysis and user research - understanding project goals and user needs
                </li>
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Prototype design and interaction design - creating user interfaces and interaction flows
                </li>
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Technical architecture and development implementation - coding features and functionality
                </li>
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Testing validation and performance optimization - ensuring quality and user experience
                </li>
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Deployment and continuous maintenance - launching the product and ongoing improvements
                </li>
              </ol>
            </div>

            {/* 组合示例 */}
            <div className="border-t pt-8 mt-8">
              <div className="mb-4 p-3 bg-blue-50 rounded text-sm text-blue-700">
                <strong>Combined Example - Comprehensive Application of Multiple Styles</strong>
              </div>

              <h2 className="text-[1.25rem] font-times-italic font-medium text-black leading-tight mb-4 mt-8">
                Project Development Process
              </h2>

              <p className="font-abc-normal text-[1rem] text-black leading-relaxed mb-4">
                We adopt a systematic approach to develop each project, ensuring that every aspect from concept to implementation meets the highest standards.
              </p>

              <h3 className="text-[1.125rem] font-times-italic font-medium text-black leading-tight mb-4 mt-6">
                Core Phases
              </h3>

              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Strategic Planning
                </li>
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Design Implementation
                </li>
                <li className="font-abc-normal text-[1rem] text-black leading-relaxed">
                  Technical Development
                </li>
              </ol>

              <blockquote className="border-l-4 border-gray-400 pl-6 my-6 italic">
                <p className="font-abc text-[1rem] text-gray-700 leading-relaxed">
                  Successful projects stem from meticulous planning and precise execution.
                </p>
              </blockquote>

              <p className="font-abc-normal text-[1rem] text-black leading-relaxed mb-4">
                Through this structured approach, we can ensure that each project achieves its intended goals and creates real value for users.
              </p>
            </div>

          </section>

          {/* 使用说明 */}
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Usage Instructions</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Visit <Link href="/projects/cms" className="text-blue-600 underline">/projects/cms</Link> to use the content management system for editing project content</li>
              <li>• All styles are implemented in the project detail pages and can be used directly in the CMS</li>
              <li>• Fonts use ABCDiatype (sans-serif) and Times (serif)</li>
              <li>• Colors primarily use black text with gray for quotes, maintaining clean consistency</li>
              <li>• Spacing uses Tailwind CSS standard sizes to ensure clear visual hierarchy</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
} 