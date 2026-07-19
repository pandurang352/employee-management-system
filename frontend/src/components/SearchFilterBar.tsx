// import { ChangeEvent } from 'react';

// interface SearchFilterBarProps {
//   search: string;
//   onSearchChange: (value: string) => void;
//   department: string;
//   onDepartmentChange: (value: string) => void;
//   role: string;
//   onRoleChange: (value: string) => void;
//   status: string;
//   onStatusChange: (value: string) => void;
//   sortBy: string;
//   onSortByChange: (value: string) => void;
//   order: string;
//   onOrderChange: (value: string) => void;
//   departments: string[];
// }

// const SearchFilterBar = ({
//   search,
//   onSearchChange,
//   department,
//   onDepartmentChange,
//   role,
//   onRoleChange,
//   status,
//   onStatusChange,
//   sortBy,
//   onSortByChange,
//   order,
//   onOrderChange,
//   departments,
// }: SearchFilterBarProps) => {
//   const inputClass =
//     'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100';

//   return (
//     <div className="mb-4 flex flex-wrap gap-3">
//       <input
//         type="text"
//         placeholder="Search by name or email..."
//         value={search}
//         onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
//         className={`${inputClass} min-w-[220px] flex-1`}
//       />

//       <select value={department} onChange={(e) => onDepartmentChange(e.target.value)} className={inputClass}>
//         <option value="">All Departments</option>
//         {departments.map((d) => (
//           <option key={d} value={d}>
//             {d}
//           </option>
//         ))}
//       </select>

//       <select value={role} onChange={(e) => onRoleChange(e.target.value)} className={inputClass}>
//         <option value="">All Roles</option>
//         <option value="super_admin">Super Admin</option>
//         <option value="hr_manager">HR Manager</option>
//         <option value="employee">Employee</option>
//       </select>

//       <select value={status} onChange={(e) => onStatusChange(e.target.value)} className={inputClass}>
//         <option value="">All Statuses</option>
//         <option value="active">Active</option>
//         <option value="inactive">Inactive</option>
//       </select>

//       <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)} className={inputClass}>
//         <option value="createdAt">Sort: Newest</option>
//         <option value="name">Sort: Name</option>
//         <option value="joiningDate">Sort: Joining Date</option>
//       </select>

//       <select value={order} onChange={(e) => onOrderChange(e.target.value)} className={inputClass}>
//         <option value="desc">Descending</option>
//         <option value="asc">Ascending</option>
//       </select>
//     </div>
//   );
// };

// export default SearchFilterBar;


import { ChangeEvent, useState } from 'react';

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  department: string;
  onDepartmentChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  order: string;
  onOrderChange: (value: string) => void;
  departments: string[];
}

const SearchFilterBar = ({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  order,
  onOrderChange,
  departments,
}: SearchFilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const inputClass =
    'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100';

  return (
    <div className="mb-4 space-y-3">
      {/* Search Row - Always visible */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          className={`${inputClass} min-w-[150px] flex-1`}
        />

        {/* Toggle Filters Button - visible only on mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          aria-label={showFilters ? 'Hide filters' : 'Show filters'}
          aria-expanded={showFilters}
        >
          <span className="flex items-center gap-1">
            <span>⚙️</span>
            <span className="text-xs">{showFilters ? 'Hide' : 'Filters'}</span>
          </span>
        </button>
      </div>

      {/* Filters - Collapsible on mobile, always visible on desktop */}
      <div
        className={`${
          showFilters ? 'block' : 'hidden'
        } md:flex md:flex-wrap md:gap-3 space-y-2 md:space-y-0`}
      >
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className={`${inputClass} w-full md:w-auto`}
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className={`${inputClass} w-full md:w-auto`}
        >
          <option value="">All Roles</option>
          <option value="super_admin">Super Admin</option>
          <option value="hr_manager">HR Manager</option>
          <option value="employee">Employee</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={`${inputClass} w-full md:w-auto`}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className={`${inputClass} w-full md:w-auto`}
        >
          <option value="createdAt">Sort: Newest</option>
          <option value="name">Sort: Name</option>
          <option value="joiningDate">Sort: Joining Date</option>
        </select>

        <select
          value={order}
          onChange={(e) => onOrderChange(e.target.value)}
          className={`${inputClass} w-full md:w-auto`}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilterBar;