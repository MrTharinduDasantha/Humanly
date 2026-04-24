import { useState } from "react";

const AdminLeaveRequestsTable = ({
  leaveRequests,
  loading,
  handleDecision,
}) => {
  const [modal, setModal] = useState({ show: false, title: "", content: "" });

  const openModal = (title, content) =>
    setModal({ show: true, title, content });
  const closeModal = () => setModal({ show: false, title: "", content: "" });

  const getBadgeClass = (status) => {
    if (status === "accepted") return "text-bg-success";
    if (status === "rejected") return "text-bg-danger";
    return "text-bg-warning";
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <>
      {modal.show && (
        <div className="modal-backdrop-custom" onClick={closeModal}>
          <div
            className="modal-box-custom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-box-header">
              <h6 className="mb-0 fw-semibold">{modal.title}</h6>
              <button
                className="btn-close-custom"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="modal-box-body">
              <p className="mb-0 text-secondary" style={{ lineHeight: 1.7 }}>
                {modal.content}
              </p>
            </div>
            <div className="modal-box-footer">
              <button className="btn btn-sm btn-dark px-4" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="fw-bold mb-1">Leave Requests</h4>
              <p className="text-muted small mb-0">
                Approve or reject employee leave requests.
              </p>
            </div>
            <span className="badge text-bg-dark px-3 py-2 rounded-pill">
              {leaveRequests.length}
            </span>
          </div>

          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "70px" }}>Photo</th>
                  <th>Employee</th>
                  <th>Reason</th>
                  <th>Leave</th>
                  <th>Return</th>
                  <th>Status</th>
                  <th style={{ width: "180px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : leaveRequests.length > 0 ? (
                  leaveRequests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <img
                          src={request.employeePhoto || "images/user.png"}
                          alt={request.employeeName}
                          className="admin-thumb"
                        />
                      </td>
                      <td>
                        <div className="fw-semibold">
                          {request.employeeName}
                        </div>
                        <small className="text-muted">
                          {request.employeeEmail}
                        </small>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            openModal("Leave Reason", request.reason)
                          }
                        >
                          <i className="bi bi-eye me-1" />
                          View Reason
                        </button>
                      </td>
                      <td>{formatDate(request.leaveDate)}</td>

                      <td>{formatDate(request.returnDate)}</td>
                      <td>
                        <span
                          className={`badge ${getBadgeClass(request.status)}`}
                        >
                          {capitalize(request.status)}
                        </span>
                        {request.status === "rejected" &&
                          request.rejectionReason && (
                            <div className="mt-1">
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  openModal(
                                    "Rejection Reason",
                                    request.rejectionReason,
                                  )
                                }
                              >
                                <i className="bi bi-info-circle me-1" />
                                View Reason
                              </button>
                            </div>
                          )}
                      </td>
                      <td>
                        {request.status === "pending" ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() =>
                                handleDecision(request.id, "accepted")
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleDecision(request.id, "rejected")
                              }
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-muted small">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No leave requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLeaveRequestsTable;
