import { useState } from "react";

const EmployeeLeaveHistoryTable = ({ leaves, loadingLeaves }) => {
  const [modal, setModal] = useState({ show: false, title: "", content: "" });

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const openModal = (title, content) =>
    setModal({ show: true, title, content });
  const closeModal = () => setModal({ show: false, title: "", content: "" });

  const getBadgeClass = (status) => {
    if (status === "accepted") return "text-bg-success";
    if (status === "rejected") return "text-bg-danger";
    return "text-bg-warning";
  };
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

      <div className="card border-0 shadow-sm rounded-4 h-100">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-1">Leave History</h4>
          <p className="text-muted small mb-4">
            Your leave requests and their status.
          </p>

          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th>Reason</th>
                  <th>Leave</th>
                  <th>Return</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loadingLeaves ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : leaves.length > 0 ? (
                  leaves.map((leave) => (
                    <tr key={leave.id}>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            openModal("Leave Reason", leave.reason)
                          }
                        >
                          <i className="bi bi-eye me-1" />
                          View Reason
                        </button>
                      </td>

                      <td>{formatDate(leave.leaveDate)}</td>
                      <td>{formatDate(leave.returnDate)}</td>

                      <td>
                        <span
                          className={`badge ${getBadgeClass(leave.status)}`}
                        >
                          {capitalize(leave.status)}
                        </span>
                        {leave.status === "rejected" &&
                          leave.rejectionReason && (
                            <div className="mt-1">
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  openModal(
                                    "Rejection Reason",
                                    leave.rejectionReason,
                                  )
                                }
                              >
                                <i className="bi bi-info-circle me-1" />
                                View Reason
                              </button>
                            </div>
                          )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No leave requests yet
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

export default EmployeeLeaveHistoryTable;
