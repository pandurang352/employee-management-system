import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { OrgNode } from '../types';

interface OrgTreeNodeProps {
  node: OrgNode;
  depth?: number;
}

const OrgTreeNode = ({ node, depth = 0 }: OrgTreeNodeProps) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <div style={{ marginLeft: depth * 24 }} className="mt-2">
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {hasChildren ? (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="h-5 w-5 shrink-0 text-gray-400 hover:text-gray-600"
            aria-label="Toggle"
          >
            {expanded ? '▾' : '▸'}
          </button>
        ) : (
          <span className="h-5 w-5 shrink-0" />
        )}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700 dark:bg-brand-700/30 dark:text-brand-100">
          {node.name.charAt(0)}
        </div>
        <div>
          <Link to={`/employees/${node._id}`} className="text-sm font-medium text-gray-900 hover:text-brand-600 dark:text-gray-100">
            {node.name}
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {node.designation} &middot; {node.department}
          </p>
        </div>
      </div>
      {expanded && hasChildren && (
        <div className="border-l border-dashed border-gray-300 dark:border-gray-600">
          {node.children.map((child) => (
            <OrgTreeNode key={child._id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrgTreeNode;
