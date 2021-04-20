const pool = require("./db");

const transaction = async () => {
  try {
    pool.query("BEGIN");
    const data = ["Gerald"];
    const step1 =
      "UPDATE prelimexam.AS_supplier SET supplier_name = $1 WHERE supplier_id=1 RETURNING *";

    pool.query(step1, data, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows);
      }
    });

    await pool.query("COMMIT");
  } catch (e) {
    await pool.query("ROLLBACK");
  }

  pool.end;
};

transaction();
