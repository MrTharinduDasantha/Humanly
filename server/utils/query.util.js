import connection from "../configs/db.config.js";

const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });
};

export default query;
