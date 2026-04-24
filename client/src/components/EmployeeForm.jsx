const EmployeeForm = ({
  editingId,
  handleSubmit,
  imagePreview,
  fileInputKey,
  handleFileChange,
  formData,
  handleChange,
  loadingCategories,
  categories,
  isSubmitting,
  resetForm,
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-1">
          {editingId ? "Edit Employee" : "Add Employee"}
        </h4>
        <p className="text-muted small mb-4">Manage employee data from here.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-center">
            <div className="mb-3">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="employee-preview"
                />
              )}
            </div>

            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />
            <small className="text-muted d-block mt-2">
              {editingId
                ? "Choose a new photo only if you want to replace the current one."
                : "Profile photo is required."}
            </small>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="form-control form-control-lg rounded-3"
              placeholder="Enter employee name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select
              name="categoryId"
              onChange={handleChange}
              value={formData.categoryId}
              className="form-select form-select-lg rounded-3"
              disabled={loadingCategories}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="form-control form-control-lg rounded-3"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password{" "}
              {editingId && <span className="text-muted">(optional)</span>}
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="form-control form-control-lg rounded-3"
              placeholder={
                editingId
                  ? "Leave blank to keep current password"
                  : "Enter password"
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              value={formData.salary}
              className="form-control form-control-lg rounded-3"
              placeholder="Enter salary"
              step="0.01"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <textarea
              name="address"
              onChange={handleChange}
              value={formData.address}
              className="form-control rounded-3"
              rows="4"
              placeholder="Enter address"
            />
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary px-4 rounded-3"
              disabled={isSubmitting}
            >
              {editingId
                ? isSubmitting
                  ? "Updating..."
                  : "Update"
                : isSubmitting
                  ? "Adding..."
                  : "Add"}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn btn-outline-secondary px-4 rounded-3"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
