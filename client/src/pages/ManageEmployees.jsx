import { useEffect, useState } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import "./styles/ManageEmployees.css";

const ManageEmployees = () => {
  const initialFormData = {
    name: "",
    categoryId: "",
    email: "",
    password: "",
    salary: "",
    address: "",
  };

  const [employees, setEmployees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);

  const fetchCategories = () => {
    api
      .get("/api/employee-category/get")
      .then((response) => {
        if (response.data.status)
          setCategories(response.data.employeeCategories);
        else toast.error(response.data.message);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingCategories(false));
  };

  const fetchEmployees = () => {
    api
      .get("/api/employee/get")
      .then((response) => {
        if (response.data.status) {
          setEmployees(response.data.employees);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingEmployees(false));
  };

  useEffect(() => {
    fetchCategories();
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setImageFile(null);
    setImagePreview("");
    setFileInputKey((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("categoryId", formData.categoryId);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("salary", formData.salary);
    data.append("address", formData.address);

    if (imageFile) {
      data.append("profilePhoto", imageFile);
    }

    setIsSubmitting(true);

    if (editingId)
      api
        .put(`/api/employee/edit/${editingId}`, data)
        .then((response) => {
          if (response.data.status) {
            toast.success(response.data.message);
            resetForm();
            fetchEmployees();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setIsSubmitting(false));
    else
      api
        .post("/api/employee/add", data)
        .then((response) => {
          if (response.data.status) {
            toast.success(response.data.message);
            resetForm();
            fetchEmployees();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setIsSubmitting(false));
  };

  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      categoryId: employee.categoryId,
      email: employee.email,
      password: "",
      salary: employee.salary,
      address: employee.address,
    });
    setEditingId(employee.id);
    setImagePreview(employee.profilePhoto);
    setImageFile(null);
  };
  return (
    <div className="employee-page p-4">
      <div className="container-fluid">
        <div className="row g-4">
          <EmployeeForm
            editingId={editingId}
            handleSubmit={handleSubmit}
            imagePreview={imagePreview}
            fileInputKey={fileInputKey}
            handleFileChange={handleFileChange}
            formData={formData}
            handleChange={handleChange}
            loadingCategories={loadingCategories}
            categories={categories}
            isSubmitting={isSubmitting}
            resetForm={resetForm}
          />

          <EmployeeTable
            fetchEmployees={fetchEmployees}
            employees={employees}
            loading={loadingEmployees}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;
