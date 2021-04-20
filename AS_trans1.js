const pool = require("./db");

const customer_data = [
  [1, "Debbie", "Female"],
  [2, "John", "Male"],
  [3, "Cena", "Male"],
  [4, "Mae", "Female"],
  [5, "Gabgab", "Male"],
];
const supplier_data = [
  [1, "Rowan", "Male"],
  [2, "Nelson", "Male"],
  [3, "Athena", "Female"],
  [4, "Antonette", "Female"],
  [5, "Anton", "Male"],
];
const product_data = [
  [1, 2, "Nokia Cellphone", "Very sturdy"],
  [2, 2, "Apple Watch", "Expensive"],
  [3, 1, "Book", "Full of knowledge"],
  [4, 3, "Skateboard", "Good item"],
  [5, 5, "Pencil", "Monggol 2"],
];

const transaction = async () => {
  try {
    pool.query("BEGIN");
    // Customer Insert

    customer_data.map(async (item) => {
      const query =
        "INSERT INTO prelimexam.AS_customer (customer_id, customer_name, customer_gender) VALUES ($1,$2,$3) RETURNING *";
      await pool.query(query, item);
    });

    // Supplier Insert
    const supplierQueries = supplier_data.map(async (item) => {
      const query =
        "INSERT INTO prelimexam.AS_supplier (supplier_id, supplier_name, supplier_gender) VALUES ($1,$2,$3) RETURNING *";
      return await pool.query(query, item);
    });

    Promise.all(supplierQueries).then(() => {
      product_data.map((item) => {
        const query =
          "INSERT INTO prelimexam.AS_product(product_id, supplier_id, product_name, product_description) VALUES ($1,$2,$3,$4) RETURNING *";
        pool.query(query, item, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log(res.rows[0]);
          }
        });
      });
    }).catch((error)=> console.log(error));

    pool.query("COMMIT");
  } catch (e) {
    await pool.query("ROLLBACK");
  }
  pool.end;
};

transaction();
