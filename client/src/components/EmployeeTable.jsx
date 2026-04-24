import api from "../configs/api";
import toast from "react-hot-toast";

const EmployeeTable = ({ fetchEmployees, employees, loading, onEdit }) => {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) return;

    api
      .delete(`/api/employee/delete/${id}`)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          fetchEmployees();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="fw-bold mb-1">Employees</h4>
            <p className="text-muted small mb-0">
              View, edit, and delete employee records.
            </p>
          </div>
          <span className="badge text-bg-dark px-3 py-2 rounded-pill">
            {employees.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle table-hover">
            <thead className="table-light">
              <tr>
                <th style={{ width: "90px" }}>Photo</th>
                <th>Name</th>
                <th>Category</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Address</th>
                <th style={{ width: "140px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <img
                        src={employee.profilePhoto}
                        alt={employee.name}
                        className="employee-thumb"
                      />
                    </td>
                    <td className="fw-medium">{employee.name}</td>
                    <td>{employee.categoryName}</td>
                    <td>{employee.email}</td>
                    <td>{Number(employee.salary).toLocaleString()}</td>
                    <td className="text-truncate" style={{ maxWidth: "180px" }}>
                      {employee.address}
                    </td>
                    <td>
                      <button
                        onClick={() => onEdit(employee)}
                        className="btn btn-sm btn-outline-primary me-2"
                        title="Edit Employee"
                      >
                        <i className="bi bi-pencil-square" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Employee"
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
