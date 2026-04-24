import { Outlet } from "react-router";
import EmployeeSidebar from "../components/EmployeeSidebar";

const EmployeeDashboard = () => {
  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row flex-nowrap h-100">
        <EmployeeSidebar />

        <div className="col p-0 m-0 d-flex flex-column h-100">
          <div
            className="p-3 d-flex justify-content-center shadow bg-white flex-shrink-0"
            style={{ zIndex: 100 }}
          >
            <h4 className="mb-0">Employee Portal</h4>
          </div>
          <div className="flex-grow-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
