CREATE TABLE admin (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) DEFAULT NULL,
  bio text DEFAULT NULL,
  profile_pic varchar(255) DEFAULT NULL,
  profile_pic_public_id varchar(255) DEFAULT NULL,
  email varchar(100) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);

CREATE TABLE employee_category (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id int(11) NOT NULL AUTO_INCREMENT,
  profile_photo varchar(255) NOT NULL,
  profile_photo_public_id varchar(255) NOT NULL,
  name varchar(100) NOT NULL,
  category_id int(11) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(255) NOT NULL,
  salary decimal(10,2) NOT NULL,
  address text NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id),
  UNIQUE KEY email (email),
  KEY fk_employee_category (category_id),
  CONSTRAINT fk_employee_category
    FOREIGN KEY (category_id)
    REFERENCES employee_category (id)
    ON UPDATE CASCADE
);

CREATE TABLE leave_requests (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) NOT NULL,
  reason text NOT NULL,
  leave_date date NOT NULL,
  return_date date NOT NULL,
  status enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  rejection_reason text DEFAULT NULL,
  reviewed_by int(11) DEFAULT NULL,
  reviewed_at timestamp NULL DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id),
  KEY fk_leave_employee (employee_id),
  KEY fk_leave_admin (reviewed_by),
  CONSTRAINT fk_leave_employee
    FOREIGN KEY (employee_id)
    REFERENCES employees (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT fk_leave_admin
    FOREIGN KEY (reviewed_by)
    REFERENCES admin (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);