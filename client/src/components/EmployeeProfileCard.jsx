import { useState } from "react";
import { createPortal } from "react-dom";

const EmployeeProfileCard = ({
  loadingProfile,
  employee,
  categories,
  loadingCategories,
  imagePreview,
  fileKey,
  handleFileChange,
  resetImage,
  handleProfileChange,
  handleProfileSubmit,
  isSavingProfile,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const getCategoryName = () => {
    const match = categories.find(
      (c) => String(c.id) === String(employee.categoryId),
    );
    return match ? match.name : "—";
  };

  const handleSubmitAndClose = (e) => {
    handleProfileSubmit(e);
    if (!isSavingProfile) setShowEditModal(false);
  };

  return (
    <>
      <div className="card border-0 shadow-sm rounded-4 employee-profile-card">
        <div className="card-body p-4">
          {loadingProfile ? (
            <div className="text-center py-4 text-muted">Loading...</div>
          ) : (
            <div className="row align-items-center g-4">
              <div className="col-12 col-sm-auto text-center">
                <div className="profile-pic-wrapper mx-auto">
                  <img
                    src={imagePreview || "/images/user.png"}
                    alt={employee.name || "Employee"}
                    className="profile-card-pic"
                  />
                  <button
                    className="profile-edit-btn"
                    title="Edit Profile"
                    onClick={() => setShowEditModal(true)}
                  >
                    <i className="bi bi-pencil-fill" />
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm">
                <h5 className="fw-bold mb-1">{employee.name || "—"}</h5>
                <p className="text-muted small mb-3">{employee.email || "—"}</p>
                <div className="d-flex flex-wrap gap-2">
                  <span className="badge rounded-pill text-bg-primary px-3 py-2">
                    <i className="bi bi-tag me-1" />
                    {getCategoryName()}
                  </span>
                  <span className="badge rounded-pill text-bg-success px-3 py-2">
                    <i className="bi bi-currency-dollar me-1" />
                    {employee.salary
                      ? `${Number(employee.salary).toLocaleString()}`
                      : "—"}
                  </span>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="employee-info-block rounded-3 p-3">
                  <p
                    className="text-muted small fw-semibold mb-1 text-uppercase"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                  >
                    Address
                  </p>
                  <p className="mb-0 small" style={{ lineHeight: 1.6 }}>
                    {employee.address || "No address added yet."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showEditModal &&
        createPortal(
          <>
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content rounded-4 border-0 shadow-lg">
                  <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title fw-bold">Edit Profile</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowEditModal(false)}
                    />
                  </div>

                  <div className="modal-body pt-2">
                    <form onSubmit={handleSubmitAndClose}>
                      <div className="mb-4 text-center">
                        {imagePreview ? (
                          <div className="image-preview-container mb-3">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="profile-preview"
                            />
                            <button
                              type="button"
                              className="btn-remove-preview"
                              title="Remove Image"
                              onClick={resetImage}
                            >
                              <i className="bi bi-x-lg" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-muted small mb-2">
                            No profile picture selected
                          </p>
                        )}
                        <input
                          key={fileKey}
                          type="file"
                          accept="image/*"
                          className="form-control form-control-sm"
                          onChange={handleFileChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleProfileChange}
                          value={employee.name}
                          className="form-control form-control-lg rounded-3"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Category
                        </label>
                        <select
                          name="categoryId"
                          onChange={handleProfileChange}
                          value={employee.categoryId}
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
                          onChange={handleProfileChange}
                          value={employee.email}
                          className="form-control form-control-lg rounded-3"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Password{" "}
                          <span className="text-muted fw-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          onChange={handleProfileChange}
                          value={employee.password}
                          className="form-control form-control-lg rounded-3"
                          placeholder="Leave blank to keep current password"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          Address
                        </label>
                        <textarea
                          name="address"
                          onChange={handleProfileChange}
                          value={employee.address}
                          className="form-control rounded-3"
                          rows="3"
                          placeholder="Enter your address"
                        />
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="submit"
                          className="btn btn-primary px-4 rounded-3"
                          disabled={isSavingProfile}
                        >
                          {isSavingProfile ? "Saving..." : "Update Profile"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary px-4 rounded-3"
                          onClick={() => setShowEditModal(false)}
                          disabled={isSavingProfile}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" />
          </>,
          document.body,
        )}
    </>
  );
};

export default EmployeeProfileCard;
