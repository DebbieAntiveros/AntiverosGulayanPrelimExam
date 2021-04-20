const pool = require("./db");

const transaction = async () => {
  const deleteData = [1];
  try {
    pool.query("BEGIN");

    const step1 =
    "DELETE FROM prelimexam.AS_lineitem WHERE po_id = $1 RETURNING*";

    const step2 =
      "DELETE FROM prelimexam.AS_purchaseorder WHERE po_id = $1 RETURNING*";

    const poData = await pool.query(step1, deleteData);
    Promise.resolve(poData).then(async () => {
      pool.query(step2, deleteData, async (err, res) => { 
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows);
          await pool.query("COMMIT");
        }
      });
    });
  } catch (e) {
    await pool.query("ROLLBACK");
  }

  pool.end;
};

transaction();
