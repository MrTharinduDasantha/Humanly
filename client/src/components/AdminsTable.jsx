import api from "../configs/api";
import toast from "react-hot-toast";

const AdminsTable = ({
  admins,
  loadingAdmins,
  currentAdminId,
  handleDeleteAdmin,
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="fw-bold mb-1">Admins</h4>
            <p className="text-muted small mb-0">
              View and delete admin accounts.
            </p>
          </div>
          <span className="badge text-bg-dark px-3 py-2 rounded-pill">
            {admins.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle table-hover">
            <thead className="table-light">
              <tr>
                <th style={{ width: "70px" }}>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th className="text-center" style={{ width: "100px" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loadingAdmins ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>
                      <img
                        src={admin.profilePic || "/images/user.png"}
                        alt={admin.name || "Admin"}
                        className="admin-thumb"
                      />
                    </td>
                    <td className="fw-medium">
                      {admin.name || "Unnamed Admin"}{" "}
                      {String(admin.id) === String(currentAdminId) && (
                        <span className="badge text-bg-success ms-1">You</span>
                      )}
                    </td>
                    <td>{admin.email}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Admin"
                        disabled={String(admin.id) === String(currentAdminId)}
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No admins found
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

export default AdminsTable;
