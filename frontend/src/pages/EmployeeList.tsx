// import { useEffect, useState, useCallback, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useDebounce } from '../hooks/useDebounce';
// import { fetchEmployees, deleteEmployee, importEmployeesCsv } from '../services/employeeService';
// import type { Employee, PaginationMeta } from '../types';
// import EmployeeTable from '../components/EmployeeTable';
// import SearchFilterBar from '../components/SearchFilterBar';
// import Pagination from '../components/Pagination';
// import Loader from '../components/Loader';

// const DEPARTMENTS = ['Engineering', 'Human Resources', 'Sales', 'Marketing', 'Finance', 'Executive', 'Operations'];

// const EmployeeList = () => {
//   const { user } = useAuth();
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [meta, setMeta] = useState<PaginationMeta | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const [search, setSearch] = useState('');
//   const [department, setDepartment] = useState('');
//   const [role, setRole] = useState('');
//   const [status, setStatus] = useState('');
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [order, setOrder] = useState('desc');
//   const [page, setPage] = useState(1);
//   const [importMessage, setImportMessage] = useState('');

//   const debouncedSearch = useDebounce(search, 400);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const data = await fetchEmployees({
//         page,
//         limit: 10,
//         search: debouncedSearch || undefined,
//         department: department || undefined,
//         role: role || undefined,
//         status: status || undefined,
//         sortBy,
//         order: order as 'asc' | 'desc',
//       });
//       setEmployees(data.employees);
//       setMeta(data.meta);
//     } catch {
//       setError('Unable to load employees.');
//     } finally {
//       setLoading(false);
//     }
//   }, [page, debouncedSearch, department, role, status, sortBy, order]);

//   useEffect(() => {
//     load();
//   }, [load]);

//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearch, department, role, status, sortBy, order]);

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this employee? This action can be reversed by an administrator.')) return;
//     try {
//       await deleteEmployee(id);
//       load();
//     } catch {
//       setError('Failed to delete employee.');
//     }
//   };

//   const handleImportClick = () => fileInputRef.current?.click();

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImportMessage('Importing...');
//     try {
//       const result = await importEmployeesCsv(file);
//       setImportMessage(`Imported ${result.created} employees. ${result.failed.length} rows failed.`);
//       load();
//     } catch {
//       setImportMessage('CSV import failed.');
//     } finally {
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   const canCreate = user?.role === 'super_admin' || user?.role === 'hr_manager';

//   return (
//     <div>
//       <div className="mb-6 flex items-center justify-between">
//         <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Employees</h1>
//         {canCreate && (
//           <div className="flex gap-2">
//             <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
//             <button
//               onClick={handleImportClick}
//               className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
//             >
//               Import CSV
//             </button>
//             <Link
//               to="/employees/new"
//               className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
//             >
//               + Add Employee
//             </Link>
//           </div>
//         )}
//       </div>

//       {importMessage && (
//         <div className="mb-4 rounded-md bg-brand-50 px-4 py-2 text-sm text-brand-700 dark:bg-brand-700/20 dark:text-brand-100">
//           {importMessage}
//         </div>
//       )}

//       <SearchFilterBar
//         search={search}
//         onSearchChange={setSearch}
//         department={department}
//         onDepartmentChange={setDepartment}
//         role={role}
//         onRoleChange={setRole}
//         status={status}
//         onStatusChange={setStatus}
//         sortBy={sortBy}
//         onSortByChange={setSortBy}
//         order={order}
//         onOrderChange={setOrder}
//         departments={DEPARTMENTS}
//       />

//       {error && <p className="mb-4 text-sm text-rose-600">{error}</p>}

//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <EmployeeTable employees={employees} currentUserRole={user!.role} onDelete={handleDelete} />
//           {meta && <Pagination meta={meta} onPageChange={setPage} />}
//         </>
//       )}
//     </div>
//   );
// };

// export default EmployeeList;


import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDebounce } from '../hooks/useDebounce';
import { fetchEmployees, deleteEmployee, importEmployeesCsv } from '../services/employeeService';
import type { Employee, PaginationMeta } from '../types';
import EmployeeTable from '../components/EmployeeTable';
import SearchFilterBar from '../components/SearchFilterBar';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const DEPARTMENTS = ['Engineering', 'Human Resources', 'Sales', 'Marketing', 'Finance', 'Executive', 'Operations'];

const EmployeeList = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [importMessage, setImportMessage] = useState('');

  const debouncedSearch = useDebounce(search, 400);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchEmployees({
        page,
        limit: 10,
        search: debouncedSearch || undefined,
        department: department || undefined,
        role: role || undefined,
        status: status || undefined,
        sortBy,
        order: order as 'asc' | 'desc',
      });
      setEmployees(data.employees);
      setMeta(data.meta);
    } catch {
      setError('Unable to load employees.');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, department, role, status, sortBy, order]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, department, role, status, sortBy, order]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this employee? This action can be reversed by an administrator.'))
      return;
    try {
      await deleteEmployee(id);
      load();
    } catch {
      setError('Failed to delete employee.');
    }
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportMessage('Importing...');
    try {
      const result = await importEmployeesCsv(file);
      setImportMessage(`Imported ${result.created} employees. ${result.failed.length} rows failed.`);
      load();
    } catch {
      setImportMessage('CSV import failed.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const canCreate = user?.role === 'super_admin' || user?.role === 'hr_manager';

  return (
    <div>
      {/* Header - Responsive */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 sm:text-2xl">
          Employees
        </h1>
        {canCreate && (
          <div className="flex flex-wrap gap-2">
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleImportClick}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <span className="hidden sm:inline">Import CSV</span>
              <span className="sm:hidden">📥</span>
            </button>
            <Link
              to="/employees/new"
              className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 sm:px-4"
            >
              <span className="hidden sm:inline">+ Add Employee</span>
              <span className="sm:hidden">➕</span>
            </Link>
          </div>
        )}
      </div>

      {importMessage && (
        <div className="mb-4 rounded-md bg-brand-50 px-4 py-2 text-sm text-brand-700 dark:bg-brand-700/20 dark:text-brand-100">
          {importMessage}
        </div>
      )}

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        role={role}
        onRoleChange={setRole}
        status={status}
        onStatusChange={setStatus}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        order={order}
        onOrderChange={setOrder}
        departments={DEPARTMENTS}
      />

      {error && <p className="mb-4 text-sm text-rose-600">{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <>
          <EmployeeTable
            employees={employees}
            currentUserRole={user!.role}
            onDelete={handleDelete}
          />
          {meta && <Pagination meta={meta} onPageChange={setPage} />}
        </>
      )}
    </div>
  );
};

export default EmployeeList;