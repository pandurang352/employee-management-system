// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import DarkModeToggle from '../components/DarkModeToggle';

// const navItems = [
//   { to: '/dashboard', label: 'Dashboard', icon: '📊' },
//   { to: '/employees', label: 'Employees', roles: ['super_admin', 'hr_manager'], icon: '👥' },
//   { to: '/organization', label: 'Organization', icon: '🌳' },
//   { to: '/profile', label: 'My Profile', icon: '🙍' },
// ];

// const roleLabel: Record<string, string> = {
//   super_admin: 'Super Admin',
//   hr_manager: 'HR Manager',
//   employee: 'Employee',
// };

// const MainLayout = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:block">
//         <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6 dark:border-gray-700">
//           <span className="text-xl font-bold text-brand-600">EMS</span>
//         </div>
//         <nav className="space-y-1 p-4">
//           {navItems.map((item) => {
//             if (item.roles && user && !item.roles.includes(user.role)) return null;
//             return (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
//                     isActive
//                       ? 'bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100'
//                       : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
//                   }`
//                 }
//               >
//                 <span>{item.icon}</span>
//                 {item.label}
//               </NavLink>
//             );
//           })}
//         </nav>
//       </aside>

//       <div className="flex flex-1 flex-col">
//         <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800">
//           <div className="text-sm text-gray-500 dark:text-gray-400">
//             Welcome back, <span className="font-medium text-gray-800 dark:text-gray-100">{user?.name}</span>
//             {user && (
//               <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                 {roleLabel[user.role]}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-3">
//             <DarkModeToggle />
//             <button
//               onClick={handleLogout}
//               className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
//             >
//               Logout
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;


import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import DarkModeToggle from '../components/DarkModeToggle';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/employees', label: 'Employees', roles: ['super_admin', 'hr_manager'], icon: '👥' },
  { to: '/organization', label: 'Organization', icon: '🌳' },
  { to: '/profile', label: 'My Profile', icon: '🙍' },
];

const roleLabel: Record<string, string> = {
  super_admin: 'Super Admin',
  hr_manager: 'HR Manager',
  employee: 'Employee',
};

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ===== DESKTOP SIDEBAR - Hidden on mobile ===== */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 md:block">
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6 dark:border-gray-700">
          <span className="text-xl font-bold text-brand-600">EMS</span>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            if (item.roles && user && !item.roles.includes(user.role)) return null;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1 flex-col">
        {/* ===== HEADER ===== */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 md:px-6">
          {/* Left section - Mobile menu toggle + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger button - visible only on mobile */}
            <button
              onClick={toggleMobileMenu}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Mobile logo - visible only on mobile */}
            <span className="text-xl font-bold text-brand-600 md:hidden">EMS</span>

            {/* Desktop welcome message - hidden on mobile */}
            <div className="hidden text-sm text-gray-500 dark:text-gray-400 md:block">
              Welcome back,{' '}
              <span className="font-medium text-gray-800 dark:text-gray-100">{user?.name}</span>
              {user && (
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {roleLabel[user.role]}
                </span>
              )}
            </div>
          </div>

          {/* Right section - Dark mode toggle + Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            <DarkModeToggle />
            <button
              onClick={handleLogout}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">🚪</span>
            </button>
          </div>
        </header>

        {/* ===== MOBILE NAVIGATION DRAWER ===== */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            
            {/* Drawer */}
            <div
              className="fixed left-0 top-0 z-40 h-full w-72 transform border-r border-gray-200 bg-white shadow-xl transition-transform dark:border-gray-700 dark:bg-gray-800 md:hidden"
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-700">
                <span className="text-xl font-bold text-brand-600">EMS</span>
                <button
                  onClick={closeMobileMenu}
                  className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="space-y-1 p-4">
                {navItems.map((item) => {
                  if (item.roles && user && !item.roles.includes(user.role)) return null;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                          isActive
                            ? 'bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100'
                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </NavLink>
                  );
                })}

                {/* Mobile user info */}
                <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {user?.role && roleLabel[user.role]}
                    </span>
                  </div>
                </div>
              </nav>
            </div>
          </>
        )}

        {/* ===== MAIN CONTENT AREA ===== */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;