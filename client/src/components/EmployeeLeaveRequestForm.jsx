const EmployeeLeaveRequestForm = ({
  leaveForm,
  handleLeaveChange,
  handleLeaveSubmit,
  isSubmittingLeave,
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-1">Request Leave</h4>
        <p className="text-muted small mb-4">
          Send a leave request to your employer.
        </p>

        <form onSubmit={handleLeaveSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Reason</label>
            <textarea
              name="reason"
              onChange={handleLeaveChange}
              value={leaveForm.reason}
              className="form-control rounded-3"
              rows="4"
              placeholder="Write the reason for leave"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Leave Date</label>
            <input
              type="date"
              name="leaveDate"
              onChange={handleLeaveChange}
              value={leaveForm.leaveDate}
              className="form-control form-control-lg rounded-3"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Return Date</label>
            <input
              type="date"
              name="returnDate"
              onChange={handleLeaveChange}
              value={leaveForm.returnDate}
              min={leaveForm.leaveDate || undefined}
              className="form-control form-control-lg rounded-3"
            />
          </div>

          <button
            type="submit"
            className="btn btn-success px-4 rounded-3"
            disabled={isSubmittingLeave}
          >
            {isSubmittingLeave ? "Sending..." : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLeaveRequestForm;
