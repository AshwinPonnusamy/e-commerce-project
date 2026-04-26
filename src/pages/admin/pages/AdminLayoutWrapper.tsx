import React from "react";
import AdminLayout from "./AdminLayout";
import { Outlet } from "react-router-dom";

const AdminLayoutWrapper: React.FC = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminLayoutWrapper;
