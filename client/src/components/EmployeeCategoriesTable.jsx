import api from "../configs/api";
import toast from "react-hot-toast";

const EmployeeCategoriesTable = ({
  setFormData,
  setEditingId,
  fetchCategories,
  loading,
  categories,
}) => {
  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setEditingId(category.id);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee category?",
    );

    if (!confirmDelete) return;

    api
      .delete(`/api/employee-category/delete/${id}`)
      .then((response) => {
        if (response.data.status) {
          toast.success(response.data.message);
          fetchCategories();
        } else toast.error(response.data.message);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col-12 col-lg-8">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="fw-bold mb-1">Employee Categories</h4>
              <p className="text-muted small mb-0">
                View, edit, and delete categories.
              </p>
            </div>
            <span className="badge text-bg-dark px-3 py-2 rounded-pill">
              {categories.length}
            </span>
          </div>

          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th>Category Name</th>
                  <th style={{ width: "140px" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : categories.length > 0 ? (
                  categories.map((category, index) => (
                    <tr key={category.id}>
                      <td>{index + 1}</td>
                      <td className="fw-medium">{category.name}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(category)}
                          className="btn btn-sm btn-outline-primary me-2"
                          title="Edit Employee Category"
                        >
                          <i className="bi bi-pencil-square" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete Employee Category"
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-muted">
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCategoriesTable;
