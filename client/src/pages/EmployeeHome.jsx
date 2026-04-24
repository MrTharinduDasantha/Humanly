import { useEffect, useState } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";
import EmployeeProfileCard from "../components/EmployeeProfileCard";
import EmployeeLeaveRequestForm from "../components/EmployeeLeaveRequestForm";
import EmployeeLeaveHistoryTable from "../components/EmployeeLeaveHistoryTable";
import "./styles/EmployeeHome.css";

const initialProfile = {
  name: "",
  categoryId: "",
  email: "",
  password: "",
  salary: "",
  address: "",
};

const EmployeeHome = () => {
  const [categories, setCategories] = useState([]);
  const [employee, setEmployee] = useState(initialProfile);
  const [originalPhoto, setOriginalPhoto] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fileKey, setFileKey] = useState(0);
  const [leaves, setLeaves] = useState([]);
  const [leaveForm, setLeaveForm] = useState({
    reason: "",
    leaveDate: "",
    returnDate: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingLeaves, setLoadingLeaves] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSubmittingLeave, setIsSubmittingLeave] = useState(false);

  const fetchCategories = () => {
    setLoadingCategories(true);

    api
      .get("/api/employee-category/get")
      .then((response) => {
        if (response.data.status) {
          setCategories(response.data.employeeCategories);
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingCategories(false));
  };

  const fetchProfile = () => {
    setLoadingProfile(true);

    api
      .get("/api/employee-auth/profile")
      .then((response) => {
        if (response.data.status) {
          const data = response.data.employee;
          setEmployee({
            name: data.name || "",
            categoryId: data.categoryId || "",
            email: data.email || "",
            password: "",
            salary: data.salary || "",
            address: data.address || "",
          });
          setOriginalPhoto(data.profilePhoto || "");
          setImagePreview(data.profilePhoto || "");
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingProfile(false));
  };

  const fetchLeaves = () => {
    setLoadingLeaves(true);

    api
      .get("/api/employee-auth/leaves")
      .then((response) => {
        if (response.data.status) setLeaves(response.data.leaves);
        else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingLeaves(false));
  };

  useEffect(() => {
    fetchCategories();
    fetchProfile();
    fetchLeaves();
  }, []);

  const handleProfileChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetImage = () => {
    setImageFile(null);
    setImagePreview(originalPhoto);
    setFileKey((prev) => prev + 1);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", employee.name);
    data.append("categoryId", employee.categoryId);
    data.append("email", employee.email);
    data.append("password", employee.password);
    data.append("address", employee.address);

    if (imageFile) {
      data.append("profilePic", imageFile);
    }

    setIsSavingProfile(true);

    api
      .put("/api/employee-auth/update-profile", data)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          setEmployee((prev) => ({ ...prev, password: "" }));
          setImageFile(null);
          fetchProfile();
          fetchLeaves();
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSavingProfile(false));
  };

  const handleLeaveChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();

    setIsSubmittingLeave(true);

    api
      .post("/api/employee-auth/leave-request", leaveForm)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          setLeaveForm({ reason: "", leaveDate: "", returnDate: "" });
          fetchLeaves();
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmittingLeave(false));
  };

  return (
    <div className="employee-home-page p-4">
      <div className="container-fluid">
        <div className="row g-4">
          <EmployeeProfileCard
            loadingProfile={loadingProfile}
            employee={employee}
            categories={categories}
            loadingCategories={loadingCategories}
            imagePreview={imagePreview}
            fileKey={fileKey}
            handleFileChange={handleFileChange}
            resetImage={resetImage}
            handleProfileChange={handleProfileChange}
            handleProfileSubmit={handleProfileSubmit}
            isSavingProfile={isSavingProfile}
          />

          <div className="col-12 col-lg-5">
            <EmployeeLeaveRequestForm
              leaveForm={leaveForm}
              handleLeaveChange={handleLeaveChange}
              handleLeaveSubmit={handleLeaveSubmit}
              isSubmittingLeave={isSubmittingLeave}
            />
          </div>

          <div className="col-12 col-lg-7">
            <EmployeeLeaveHistoryTable
              leaves={leaves}
              loadingLeaves={loadingLeaves}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
