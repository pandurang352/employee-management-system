import { useEffect, useState } from 'react';
import { fetchOrganizationTree } from '../services/organizationService';
import type { OrgNode } from '../types';
import OrgTreeNode from '../components/OrgTreeNode';
import Loader from '../components/Loader';

const OrganizationTree = () => {
  const [tree, setTree] = useState<OrgNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchOrganizationTree();
        setTree(data);
      } catch {
        setError('Unable to load organization tree.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">Organization Structure</h1>
      {tree.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No organization data available yet.</p>
      ) : (
        <div>
          {tree.map((node) => (
            <OrgTreeNode key={node._id} node={node} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationTree;
