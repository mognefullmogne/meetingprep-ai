'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BriefDisplayProps {
  content: string;
}

export function BriefDisplay({ content }: BriefDisplayProps) {
  return (
    <div className="prose prose-gray max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="mb-4 text-3xl font-bold text-gray-900" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="mb-3 mt-6 text-2xl font-semibold text-gray-800"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mb-2 mt-4 text-xl font-semibold text-gray-700" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed text-gray-700" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="mb-4 ml-6 list-disc space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2" {...props} />
          ),
          li: ({ node, ...props}) => (
            <li className="text-gray-700" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-gray-900" {...props} />
          ),
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code
                className="rounded bg-gray-100 px-1 py-0.5 text-sm text-gray-800"
                {...props}
              />
            ) : (
              <code
                className="block rounded bg-gray-100 p-4 text-sm text-gray-800"
                {...props}
              />
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
