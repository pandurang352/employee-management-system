export type Role = 'super_admin' | 'hr_manager' | 'employee';
export type Status = 'active' | 'inactive';

export interface Employee {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  joiningDate: string;
  status: Status;
  role: Role;
  reportingManager: { _id: string; name: string; employeeId: string; designation: string } | null;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  designation: string;
  profileImage: string | null;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface EmployeeListResponse {
  employees: Employee[];
  meta: PaginationMeta;
}

export interface OrgNode {
  _id: string;
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  status: Status;
  profileImage: string | null;
  children: OrgNode[];
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  departmentCount: number;
  byDepartment: { department: string; count: number }[];
}

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface EmployeeFormInput {
  name: string;
  email: string;
  password?: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  joiningDate: string;
  status: Status;
  role: Role;
  reportingManager?: string | null;
}
