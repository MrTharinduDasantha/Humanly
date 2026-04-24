import { useEffect, useState } from "react";
import api from "../configs/api";
import "./styles/Home.css";

const Home = () => {
  const [counts, setCounts] = useState({
    employees: 0,
    employers: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      const [employeesResponse, employersResponse, categoriesResponse] =
        await Promise.all([
          api.get("/api/dashboard/employees-count"),
          api.get("/api/dashboard/employers-count"),
          api.get("/api/dashboard/employee-category-count"),
        ]);

      setCounts({
        employees: employeesResponse.data.count || 0,
        employers: employersResponse.data.count || 0,
        categories: categoriesResponse.data.count || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const cards = [
    {
      title: "Employees",
      value: counts.employees,
      icon: "bi-people-fill",
      text: "Total employees in the system",
      bg: "card-blue",
    },
    {
      title: "Employers",
      value: counts.employers,
      icon: "bi-person-badge-fill",
      text: "Total admins accounts",
      bg: "card-purple",
    },
    {
      title: "Categories",
      value: counts.categories,
      icon: "bi-tags-fill",
      text: "Employee categories created",
      bg: "card-green",
    },
  ];
  return (
    <div className="dashboard-page p-4">
      <div className="container-fluid">
        <div className="dashboard-header mb-4">
          <h3 className="fw-bold mb-1">Dashboard</h3>
          <p className="text-muted mb-0">
            Overview of your employee management system.
          </p>
        </div>

        <div className="row g-4">
          {cards.map((card, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={index}>
              <div className={`dashboard-card ${card.bg} shadow-sm`}>
                <div className="dashboard-card-icon">
                  <i className={`bi ${card.icon}`}></i>
                </div>

                <div className="dashboard-card-content">
                  <h6 className="mb-1">{card.title}</h6>
                  <h2 className="fw-bold mb-1">
                    {loading ? "..." : card.value}
                  </h2>
                  <p className="mb-0">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-2">Welcome 👋</h5>
                <p className="text-muted mb-0">
                  Use the sidebar to manage employees, employee categories, and
                  your profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
