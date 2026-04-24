import query from "../utils/query.util.js";

const addEmployeeCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "")
      return res.json({
        status: false,
        message: "Employee category name is required",
      });

    const sql = "INSERT INTO employee_category (name) VALUES (?)";
    await query(sql, [name.trim()]);

    res.json({
      status: true,
      message: "Employee category added successfully",
    });
  } catch (error) {
    console.log("Error in add employee category:", error);
    res.json({
      status: false,
      message: "Error in add employee category",
    });
  }
};

const editEmployeeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || name.trim() === "")
      return res.json({
        status: false,
        message: "Employee category name is required",
      });

    const sql = "UPDATE employee_category SET name = ? WHERE id = ?";
    await query(sql, [name.trim(), id]);

    res.json({
      status: true,
      message: "Employee category updated successfully",
    });
  } catch (error) {
    console.log("Error in edit employee category:", error);
    res.json({
      status: false,
      message: "Error in edit employee category",
    });
  }
};

const getEmployeeCategories = async (req, res) => {
  try {
    const sql = "SELECT * FROM employee_category";
    const response = await query(sql);

    res.json({
      status: true,
      employeeCategories: response,
    });
  } catch (error) {
    console.log("Error in get employee category:", error);
    res.json({
      status: false,
      message: "Error in get employee category",
    });
  }
};

const deleteEmployeeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM employee_category WHERE id = ?";
    await query(sql, [id]);

    res.json({
      status: true,
      message: "Employee category deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete employee category:", error);
    res.json({
      status: false,
      message: "Error in delete employee category",
    });
  }
};

export {
  addEmployeeCategory,
  editEmployeeCategory,
  getEmployeeCategories,
  deleteEmployeeCategory,
};
