import { createPortal } from "react-dom";

const AdminProfileForm = ({
  loadingProfile,
  handleProfileSubmit,
  profileImagePreview,
  profileFileKey,
  handleProfileFileChange,
  resetProfileFile,
  profile,
  handleProfileChange,
  isSubmittingProfile,
  showEditModal,
  setShowEditModal,
}) => {
  return (
    <>
      <div className="card border-0 shadow-sm rounded-4 text-center profile-card">
        <div className="card-body p-4">
          {loadingProfile ? (
            <div className="py-5 text-muted">Loading...</div>
          ) : (
            <>
              <div className="profile-pic-wrapper mx-auto mb-3">
                <img
                  src={profileImagePreview || "/images/user.png"}
                  alt={profile.name || "Admin"}
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

              <h5 className="fw-bold mb-1">
                {profile.name || "Unnamed Admin"}
              </h5>
              <p className="text-muted small mb-0">
                {profile.bio || "No bio added yet."}
              </p>
            </>
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
                    <form onSubmit={handleProfileSubmit}>
                      <div className="mb-4 text-center">
                        {profileImagePreview ? (
                          <div className="image-preview-container mb-3">
                            <img
                              src={profileImagePreview}
                              alt="Preview"
                              className="profile-preview"
                            />
                            <button
                              type="button"
                              className="btn-remove-preview"
                              title="Remove Image"
                              onClick={resetProfileFile}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </div>
                        ) : (
                          <div className="mb-3">
                            <small className="text-muted d-block mb-2">
                              No profile picture selected
                            </small>
                          </div>
                        )}
                        <input
                          key={profileFileKey}
                          type="file"
                          accept="image/*"
                          className="form-control form-control-sm"
                          onChange={handleProfileFileChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleProfileChange}
                          value={profile.name}
                          className="form-control form-control-lg rounded-3"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Bio</label>
                        <textarea
                          name="bio"
                          onChange={handleProfileChange}
                          value={profile.bio}
                          className="form-control rounded-3"
                          rows="3"
                          placeholder="Write a short bio"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleProfileChange}
                          value={profile.email}
                          className="form-control form-control-lg rounded-3"
                          placeholder="Enter email"
                        />
                      </div>

                      <div className="mb-4">
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
                          value={profile.password}
                          className="form-control form-control-lg rounded-3"
                          placeholder="Leave blank to keep current password"
                        />
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          type="submit"
                          className="btn btn-primary px-4 rounded-3"
                          disabled={isSubmittingProfile}
                        >
                          {isSubmittingProfile
                            ? "Updating..."
                            : "Update Profile"}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary px-4 rounded-3"
                          onClick={() => setShowEditModal(false)}
                          disabled={isSubmittingProfile}
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

export default AdminProfileForm;
