// src/pages/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
// Imagine you have a different header for the admin area
// import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <AdminHeader /> */}
      <main className="flex-grow p-8">
        <Outlet /> {/* AdminDashboard will render here */}
      </main>
    </div>
  );
};

export default AdminLayout;