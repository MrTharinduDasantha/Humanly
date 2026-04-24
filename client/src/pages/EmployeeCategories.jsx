import { useState, useEffect } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";
import EmployeeCategoriesTable from "../components/EmployeeCategoriesTable";
import "./styles/EmployeeCategories.css";

const EmployeeCategories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    api
      .get("/api/employee-category/get")
      .then((response) => {
        if (response.data.status) {
          setCategories(response.data.employeeCategories);
          setLoading(false);
        } else toast.error(response.data.message);
      })
      .catch((error) => {
        setLoading(false);

        console.error(error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "" });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name;

    if (editingId) {
      api
        .put(`api/employee-category/edit/${editingId}`, { name })
        .then((response) => {
          if (response.data.status) {
            toast.success(response.data.message);
            resetForm();
            fetchCategories();
          } else toast.error(response.data.message);
        })
        .catch((error) => console.error(error));
    } else {
      api
        .post("/api/employee-category/add", { name })
        .then((response) => {
          if (response.data.status) {
            toast.success(response.data.message);
            resetForm("");
            fetchCategories();
          } else toast.error(response.data.message);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setEditingId(category.id);
  };
  return (
    <div className="employee-categories-page p-4">
      <div className="container-fluid">
        <div className="row g-4">
          {/* Form Card */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-1">
                  {editingId ? "Edit Category" : "Add Category"}
                </h4>
                <p className="text-muted small mb-4">
                  Manage employee categories from here.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter category name"
                      maxLength={30}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 rounded-3"
                    >
                      {editingId ? "Update" : "Save"}
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
          </div>

          {/* Table Card */}
          <EmployeeCategoriesTable
            setFormData={setFormData}
            setEditingId={setEditingId}
            fetchCategories={fetchCategories}
            loading={loading}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCategories;
