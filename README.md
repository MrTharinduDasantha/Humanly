# Humanly: Employee Management System

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-black?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Bootstrap](https://img.shields.io/badge/Styling-Bootstrap-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)

Humanly is a comprehensive, full-stack Employee Management System designed to streamline workplace administration. The platform features robust role-based access control, allowing employers (admins) to efficiently manage staff, roles, and leave requests, while providing employees with a dedicated portal to update their profiles and request time off.

---

## 🚀 Demo

Click the link below to see the demonstration of the Humanly platform.

Link 👉 https://drive.google.com/file/d/1KtJ4OANrzq7RlA4GXq-OTds9Yc8bAHHK/view?usp=sharing 👈

---

## ✨ Features

| Category | Features |
|---|---|
| Role-Based Access | Secure login system for both Employers (Admins) and Employees. |
| Admin Dashboard | View high-level metrics including Total Employees, Total Employers, and Employee Category Counts. |
| Employee Management | Admins can add (with profile pic, name, category, email, password, salary, address), edit, and delete employee records. |
| Category Management | Admins can create, edit, and remove employee job categories (Ex: Frontend Developer, Backend Developer). |
| Leave Management (Admin) | Admins can review, accept, or reject employee leave requests. Rejected requests require a provided reason. |
| Admin Profile Controls | Admins can add new employers or delete existing ones. Admins can update their own profile details (bio, picture, name, email, password). |
| Employee Portal | Employees can log in to update their personal profile details (excluding salary). |
| Leave Requests (Employee) | Employees can submit leave requests (Reason, Leave Date, Return Date) and track the status (Pending, Accepted, Rejected with reason). |
| Notifications | Real-time success and error feedback powered by React Hot Toast. |

---

## 🛠️ Technologies Used

### Frontend (Client)
* **React.js:** Frontend library for building dynamic user interfaces.
* **JavaScript:** Core programming language.
* **Bootstrap & CSS:** For responsive layout and custom styling.
* **React Router DOM:** For seamless client-side page navigation.
* **Axios:** For handling API requests to the backend server.
* **React Hot Toast:** For elegant, real-time user notifications.

### Backend (Server) & Database
* **Node.js & Express.js:** Scalable backend runtime and web framework.
* **MySQL:** Relational database management system for structured data storage.
* **Bcrypt:** For secure password hashing and protection.
* **JSON Web Token (JWT):** For secure authentication and route protection.
* **Multer:** Middleware for handling multipart/form-data (file uploads).

### Third-Party Services
* **Cloudinary:** Cloud storage solution for securely hosting user profile images.

---

## ⚙️ Installation & Setup

Clone the repository and navigate to the project folder to install dependencies.
```bash
  git clone https://github.com/MrTharinduDasantha/Humanly.git
  cd Humanly
```

**1. Database Setup (MySQL & XAMPP)**

Before running the backend, you must configure the database:
* Install and open XAMPP, then start the Apache and MySQL modules.
* Open your browser and go to `http://localhost/phpmyadmin`.
* Create a new database named `humanly` (or a name of your choice).
* Select the database and import the `humanly.sql` file located in the `server/db` folder of this project to generate the required tables.
* **Initial Admin Setup:** To log into the system for the first time, you must manually insert an `admin` record into the admin table. Run an SQL command to insert an email (Ex:`admin@gmail.com`) and a password (Ex:`Admin123`).

**2. Server Setup (Backend)**

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```
* **Environment Variables (Server)**

Create a .env file in the server folder and add the following configuration:
```bash
PORT = 5000
FRONTEND_URL = "http://localhost:5173"
NODE_ENV = "development"
JWT_SECRET = "humanly_website_secret_key"
CLOUDINARY_URL = "Enter your cloudinary uri"
```

**3. Client Setup (Frontend)**

Open a new terminal window, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```
**Environment Variables**

Create a .env file in the client folder and add the following configuration:

```bash
VITE_BASE_URL = "http://localhost:5000"
```

**4. Run the Application**

Start the backend server:
```bash
cd server
npm run server
```
Start the frontend development server:
```bash
cd client
npm run dev
```
---

## 💻 Usage

**Admin (Employer) Workflow:**

1. Log in using the initial Admin credentials you added to the database.

2. Navigate to the Dashboard to view system statistics.

3. Manage Categories to set up roles (Ex: "Full Stack Developer").

4. Add Employees under specific categories and assign their salaries and details.

5. Manage Leave Requests to approve or deny time off submitted by your staff.

6. Manage Admins to grant employer access to other users.

**Employee Workflow:**

1. Log in using the credentials provided by the Admin.

2. Update your personal details and profile picture in the Profile section.

3. Submit time-off requests via the Leave Requests tab and monitor their approval status.

---

## 📸 Screenshots

![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%201.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%202.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%203.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%204.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%205.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%206.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%207.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%208.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%209.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%2010.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%2011.png)
![image alt](https://github.com/MrTharinduDasantha/Humanly/blob/3068282b3d986ae90d376c6ce2bba61c88aee88f/client/src/assets/website-images/Img%20-%2012.png)

<h4 align="center"> Don't forget to leave a star ⭐️ </h4>
