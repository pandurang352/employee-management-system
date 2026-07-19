// import { Link } from 'react-router-dom';
// import type { Employee, Role } from '../types';
// import { formatCurrency, formatDate } from '../utils/validators';

// interface EmployeeTableProps {
//   employees: Employee[];
//   currentUserRole: Role;
//   onDelete: (id: string) => void;
// }

// const statusBadge = (status: string) =>
//   status === 'active'
//     ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
//     : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';

// const EmployeeTable = ({ employees, currentUserRole, onDelete }: EmployeeTableProps) => {
//   const canDelete = currentUserRole === 'super_admin';

//   return (
//     <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
//       <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//         <thead className="bg-gray-50 dark:bg-gray-900/40">
//           <tr>
//             {['ID', 'Name', 'Department', 'Designation', 'Salary', 'Joined', 'Status', 'Actions'].map((h) => (
//               <th
//                 key={h}
//                 className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
//               >
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//           {employees.length === 0 && (
//             <tr>
//               <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
//                 No employees found.
//               </td>
//             </tr>
//           )}
//           {employees.map((emp) => (
//             <tr key={emp._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
//               <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{emp.employeeId}</td>
//               <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
//                 <Link to={`/employees/${emp._id}`} className="hover:text-brand-600 hover:underline">
//                   {emp.name}
//                 </Link>
//                 <div className="text-xs text-gray-400">{emp.email}</div>
//               </td>
//               <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{emp.department}</td>
//               <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{emp.designation}</td>
//               <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{formatCurrency(emp.salary)}</td>
//               <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{formatDate(emp.joiningDate)}</td>
//               <td className="px-4 py-3">
//                 <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusBadge(emp.status)}`}>
//                   {emp.status}
//                 </span>
//               </td>
//               <td className="px-4 py-3 text-sm">
//                 <div className="flex gap-3">
//                   <Link to={`/employees/${emp._id}/edit`} className="text-brand-600 hover:underline">
//                     Edit
//                   </Link>
//                   {canDelete && (
//                     <button onClick={() => onDelete(emp._id)} className="text-rose-600 hover:underline">
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeeTable;

import { Link } from 'react-router-dom';
import type { Employee, Role } from '../types';
import { formatCurrency, formatDate } from '../utils/validators';

interface EmployeeTableProps {
  employees: Employee[];
  currentUserRole: Role;
  onDelete: (id: string) => void;
}

const statusBadge = (status: string) =>
  status === 'active'
    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';

const EmployeeTable = ({ employees, currentUserRole, onDelete }: EmployeeTableProps) => {
  const canDelete = currentUserRole === 'super_admin';

  return (
    <>
      {/* ===== DESKTOP TABLE VIEW ===== */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/40">
            <tr>
              {['ID', 'Name', 'Department', 'Designation', 'Salary', 'Joined', 'Status', 'Actions'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {employees.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No employees found.
                </td>
              </tr>
            )}
            {employees.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {emp.employeeId}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  <Link to={`/employees/${emp._id}`} className="hover:text-brand-600 hover:underline">
                    {emp.name}
                  </Link>
                  <div className="text-xs text-gray-400">{emp.email}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{emp.department}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{emp.designation}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {formatCurrency(emp.salary)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {formatDate(emp.joiningDate)}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusBadge(emp.status)}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-3">
                    <Link
                      to={`/employees/${emp._id}/edit`}
                      className="text-brand-600 hover:underline"
                    >
                      Edit
                    </Link>
                    {canDelete && (
                      <button onClick={() => onDelete(emp._id)} className="text-rose-600 hover:underline">
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="md:hidden space-y-3">
        {employees.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            No employees found.
          </div>
        )}
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Header: Name + Status */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <Link
                  to={`/employees/${emp._id}`}
                  className="text-base font-medium text-gray-900 hover:text-brand-600 dark:text-gray-100"
                >
                  {emp.name}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{emp.email}</p>
              </div>
              <span className={`ml-2 shrink-0 rounded-full px-2 py-1 text-xs font-medium ${statusBadge(emp.status)}`}>
                {emp.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">ID:</span>
                <span className="ml-1 text-gray-700 dark:text-gray-300">{emp.employeeId}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Dept:</span>
                <span className="ml-1 text-gray-700 dark:text-gray-300">{emp.department}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Designation:</span>
                <span className="ml-1 text-gray-700 dark:text-gray-300">{emp.designation}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Salary:</span>
                <span className="ml-1 text-gray-700 dark:text-gray-300">{formatCurrency(emp.salary)}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500 dark:text-gray-400">Joined:</span>
                <span className="ml-1 text-gray-700 dark:text-gray-300">{formatDate(emp.joiningDate)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex gap-4 border-t border-gray-100 pt-3 dark:border-gray-700">
              <Link
                to={`/employees/${emp._id}/edit`}
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                Edit
              </Link>
              {canDelete && (
                <button
                  onClick={() => onDelete(emp._id)}
                  className="text-sm font-medium text-rose-600 hover:underline"
                >
                  Delete
                </button>
              )}
              <Link
                to={`/employees/${emp._id}`}
                className="text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmployeeTable;