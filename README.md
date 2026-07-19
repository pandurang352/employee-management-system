# 🏢 Employee Management System

> A full-stack employee management solution with role-based access control, organizational hierarchy, and responsive design.

## 📸 Screenshots

![Dashboard](./screenshots/dashboard.png)
![Employee List](./screenshots/employees.png)
![Mobile View](./screenshots/mobile.png)

## 🚀 Live Demo

- **Frontend:** https://ems-frontend.vercel.app
- **Backend API:** https://ems-backend.onrender.com/api

## ✨ Features

- 🔐 **Authentication:** JWT-based login with secure password hashing
- 👤 **Role-Based Access:** Super Admin, HR Manager, Employee
- 📊 **Dashboard:** Real-time statistics with charts
- 👥 **Employee Management:** Complete CRUD operations
- 🌳 **Organization Hierarchy:** Reporting structure with tree view
- 🔍 **Search & Filter:** Advanced filtering by department, role, status
- 📱 **Responsive Design:** Mobile-first with dark mode
- 📤 **CSV Import:** Bulk employee upload
- 🗑️ **Soft Delete:** Safe data retention
- 🌙 **Dark Mode:** System preference aware

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- React Query
- Recharts

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing

## 📦 Installation

### Prerequisites
- Node.js >= 18
- MongoDB
- npm/yarn

### Backend Setup
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run seed
npm run dev
\`\`\`

### Frontend Setup
\`\`\`bash
cd frontend
npm install
cp .env.example .env
npm run dev
\`\`\`

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@ems.com | Admin@123 |
| HR Manager | hr@ems.com | Hr@12345 |
| Employee | employee@ems.com | Employee@123 |

## 📚 API Documentation

### Authentication
\`\`\`
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
\`\`\`

### Employees
\`\`\`
GET    /api/employees
POST   /api/employees
GET    /api/employees/:id
PUT    /api/employees/:id
DELETE /api/employees/:id
PATCH  /api/employees/:id/manager
GET    /api/employees/:id/reportees
POST   /api/employees/import
\`\`\`

### Organization
\`\`\`
GET /api/organization/tree
\`\`\`

### Dashboard
\`\`\`
GET /api/dashboard/stats
\`\`\`

## 🧪 Testing

\`\`\`bash
# Backend
cd backend
npm test

# Frontend  
cd frontend
npm test
\`\`\`



## 📈 Performance Optimizations

- ✅ Database indexing
- ✅ Pagination
- ✅ Debounced search
- ✅ Lazy loading
- ✅ Code splitting
- ✅ Caching headers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT

## 👨‍💻 Author

[Your Name]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [yourusername](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- Assignment from [Company Name]
- Built with ❤️ for the hiring process