// Seeds the database with a Super Admin, an HR Manager, and a sample Employee.
// Run with: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const Employee = require('../src/models/Employee');

const seedUsers = [
  {
    name: 'Alexandra Reeve',
    email: 'admin@ems.com',
    password: 'Admin@123',
    phone: '9876543210',
    department: 'Executive',
    designation: 'Chief Executive Officer',
    salary: 250000,
    role: 'super_admin',
    status: 'active',
  },
  {
    name: 'Priya Sharma',
    email: 'hr@ems.com',
    password: 'Hr@12345',
    phone: '9876543211',
    department: 'Human Resources',
    designation: 'HR Manager',
    salary: 90000,
    role: 'hr_manager',
    status: 'active',
  },
  {
    name: 'Rahul Verma',
    email: 'employee@ems.com',
    password: 'Employee@123',
    phone: '9876543212',
    department: 'Engineering',
    designation: 'Software Engineer',
    salary: 75000,
    role: 'employee',
    status: 'active',
  },
];

const run = async () => {
  await connectDB();

  console.log('Clearing existing employees collection...');
  await Employee.deleteMany({});

  console.log('Creating seed accounts...');
  const [admin, hr, employee] = await Employee.create(seedUsers);

  // Give the sample employee a reporting manager for a non-trivial org tree
  employee.reportingManager = hr._id;
  await employee.save();
  hr.reportingManager = admin._id;
  await hr.save();

  console.log('\nSeed complete. Sample accounts:');
  console.log('----------------------------------------------------');
  console.log('Super Admin  -> email: admin@ems.com    password: Admin@123');
  console.log('HR Manager   -> email: hr@ems.com       password: Hr@12345');
  console.log('Employee     -> email: employee@ems.com password: Employee@123');
  console.log('----------------------------------------------------');

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
