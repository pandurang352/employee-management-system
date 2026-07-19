import api from './api';
import type { ApiEnvelope, OrgNode } from '../types';

export const fetchOrganizationTree = async () => {
  const res = await api.get<ApiEnvelope<OrgNode[]>>('/organization/tree');
  return res.data.data;
};
