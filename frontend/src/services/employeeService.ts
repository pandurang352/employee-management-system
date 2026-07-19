import api from './api';
import type { ApiEnvelope, Employee, EmployeeListResponse, EmployeeFormInput, DashboardStats } from '../types';

export interface EmployeeQuery {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const fetchEmployees = async (query: EmployeeQuery) => {
  const res = await api.get<ApiEnvelope<EmployeeListResponse>>('/employees', { params: query });
  return res.data.data;
};

export const fetchEmployee = async (id: string) => {
  const res = await api.get<ApiEnvelope<Employee>>(`/employees/${id}`);
  return res.data.data;
};

export const createEmployee = async (payload: EmployeeFormInput) => {
  const res = await api.post<ApiEnvelope<Employee>>('/employees', payload);
  return res.data.data;
};

export const updateEmployee = async (id: string, payload: Partial<EmployeeFormInput>) => {
  const res = await api.put<ApiEnvelope<Employee>>(`/employees/${id}`, payload);
  return res.data.data;
};

export const deleteEmployee = async (id: string) => {
  const res = await api.delete<ApiEnvelope<Employee>>(`/employees/${id}`);
  return res.data.data;
};

export const assignManager = async (id: string, managerId: string | null) => {
  const res = await api.patch<ApiEnvelope<Employee>>(`/employees/${id}/manager`, { managerId });
  return res.data.data;
};

export const fetchReportees = async (id: string) => {
  const res = await api.get<ApiEnvelope<Employee[]>>(`/employees/${id}/reportees`);
  return res.data.data;
};

export const importEmployeesCsv = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/employees/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data;
};

export const fetchDashboardStats = async () => {
  const res = await api.get<ApiEnvelope<DashboardStats>>('/dashboard/stats');
  return res.data.data;
};
