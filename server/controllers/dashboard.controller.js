import query from "../utils/query.util.js";

const getEmployeesCount = async (req, res) => {
  try {
    const sql = "SELECT COUNT(*) AS count FROM employees";
    const response = await query(sql);

    res.json({
      status: true,
      count: response[0].count,
    });
  } catch (error) {
    console.log("Error in get employees count:", error);
    res.json({
      status: false,
      message: "Error in get employees count",
    });
  }
};

const getEmployersCount = async (req, res) => {
  try {
    const sql = "SELECT COUNT(*) AS count FROM admin";
    const response = await query(sql);

    res.json({
      status: true,
      count: response[0].count,
    });
  } catch (error) {
    console.log("Error in get employees count:", error);
    res.json({
      status: false,
      message: "Error in get employees count",
    });
  }
};

const getEmployeeCategoryCount = async (req, res) => {
  try {
    const sql = "SELECT COUNT(*) AS count FROM employee_category";
    const response = await query(sql);

    res.json({
      status: true,
      count: response[0].count,
    });
  } catch (error) {
    console.log("Error in get employee category count:", error);
    res.json({
      status: false,
      message: "Error in get employee category count",
    });
  }
};

export { getEmployeesCount, getEmployersCount, getEmployeeCategoryCount };
