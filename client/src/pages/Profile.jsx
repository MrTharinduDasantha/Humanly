import { useEffect, useState } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";
import AdminProfileForm from "../components/AdminProfileForm";
import AddAdminForm from "../components/AddAdminForm";
import AdminsTable from "../components/AdminsTable";
import "./styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    email: "",
    password: "",
  });
  const [admins, setAdmins] = useState([]);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [profileFileKey, setProfileFileKey] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addAdminForm, setAddAdminForm] = useState({
    email: "",
    password: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingAddAdmin, setIsSubmittingAddAdmin] = useState(false);

  const fetchProfile = () => {
    api
      .get("/api/admin/profile")
      .then((response) => {
        if (response.data.status) {
          const admin = response.data.admin;
          setCurrentAdminId(admin.id);
          setProfile({
            name: admin.name || "",
            bio: admin.bio || "",
            email: admin.email || "",
            password: "",
          });
          setProfileImagePreview(admin.profilePic || "");
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingProfile(false));
  };

  const fetchAdmins = () => {
    api
      .get("/api/admin/get")
      .then((response) => {
        if (response.data.status) {
          setAdmins(response.data.admins);
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingAdmins(false));
  };

  useEffect(() => {
    fetchProfile();
    fetchAdmins();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImageFile(file);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  const resetProfileFile = () => {
    setProfileImageFile(null);
    setProfileImagePreview("");
    setProfileFileKey((prev) => prev + 1);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", profile.name);
    data.append("bio", profile.bio);
    data.append("email", profile.email);
    data.append("password", profile.password);
    if (profileImageFile) data.append("profilePic", profileImageFile);

    setIsSubmittingProfile(true);

    api
      .put("/api/admin/update-profile", data)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          setProfile((prev) => ({ ...prev, password: "" }));
          setProfileImageFile(null);
          setShowEditModal(false);
          fetchProfile();
          fetchAdmins();
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmittingProfile(false));
  };

  const handleAddAdminChange = (e) => {
    setAddAdminForm({ ...addAdminForm, [e.target.name]: e.target.value });
  };

  const resetAddAdminForm = () => {
    setAddAdminForm({ email: "", password: "" });
  };

  const handleAddAdminSubmit = (e) => {
    e.preventDefault();

    if (!addAdminForm.email.trim() || !addAdminForm.password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    setIsSubmittingAddAdmin(true);

    api
      .post("/api/admin/add", addAdminForm)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          resetAddAdminForm();
          fetchAdmins();
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmittingAddAdmin(false));
  };

  const handleDeleteAdmin = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?",
    );
    if (!confirmDelete) return;

    api
      .delete(`/api/admin/delete/${id}`)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          fetchAdmins();
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="profile-page p-4">
      <div className="container-fluid">
        <div className="row g-4 align-items-start">
          <AdminProfileForm
            loadingProfile={loadingProfile}
            handleProfileSubmit={handleProfileSubmit}
            profileImagePreview={profileImagePreview}
            profileFileKey={profileFileKey}
            handleProfileFileChange={handleProfileFileChange}
            resetProfileFile={resetProfileFile}
            profile={profile}
            handleProfileChange={handleProfileChange}
            isSubmittingProfile={isSubmittingProfile}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
          />

          <div className="col-12 col-lg-5">
            <AddAdminForm
              handleAddAdminSubmit={handleAddAdminSubmit}
              addAdminForm={addAdminForm}
              handleAddAdminChange={handleAddAdminChange}
              isSubmittingAddAdmin={isSubmittingAddAdmin}
            />
          </div>

          <div className="col-12 col-lg-7">
            <AdminsTable
              admins={admins}
              loadingAdmins={loadingAdmins}
              currentAdminId={currentAdminId}
              handleDeleteAdmin={handleDeleteAdmin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
