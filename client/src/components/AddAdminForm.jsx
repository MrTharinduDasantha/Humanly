const AddAdminForm = ({
  handleAddAdminSubmit,
  addAdminForm,
  handleAddAdminChange,
  isSubmittingAddAdmin,
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-1">Add Admin</h4>
        <p className="text-muted small mb-4">
          Create a new admin account quickly.
        </p>

        <form onSubmit={handleAddAdminSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleAddAdminChange}
              value={addAdminForm.email}
              className="form-control form-control-lg rounded-3"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleAddAdminChange}
              value={addAdminForm.password}
              className="form-control form-control-lg rounded-3"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-success px-4 rounded-3"
            disabled={isSubmittingAddAdmin}
          >
            {isSubmittingAddAdmin ? "Saving..." : "Add Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdminForm;
