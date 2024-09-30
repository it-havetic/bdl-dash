import React from "react";
import RegistrationForm from "../components/RegistrationForm";
import UsersTable from "../components/UsersTable";

const UserManagement = () => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3">
        <RegistrationForm />
      </div>
      <div className="w-2/3">
        <UsersTable />
      </div>
    </div>
  );
};

export default UserManagement;
