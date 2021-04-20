const pool = require("./db");

const transaction = async () => {
  const purchaseOrderData = [
    [1, 1, 2, 10, "04/12/2021"],
    [2, 1, 5, 10, "04/12/2021"],
    [3, 1, 2, 10, "04/12/2021"],
  ];
  const lineItemData = [
    [1, 2, "Express Line", "High Order Priority"],
    [2, 5, "Standard Line", "High Order Priority"],
    [3, 1, "Express Line", "Low Order Priority"],
  ];

  try {
    pool.query("BEGIN");

    const step1 =
      "INSERT INTO prelimexam.AS_purchaseorder (po_id, customer_id, supplier_id, po_total, po_date) VALUES ($1,$2,$3,$4,$5) RETURNING *";

    const step2 =
      "INSERT INTO prelimexam.AS_lineitem (po_id, product_id, line_name, line_description) VALUES ($1,$2,$3,$4) RETURNING *";

    const purchaseQueries = purchaseOrderData.map(async (item) => {
      return await pool.query(step1, item);
    });

    Promise.all(purchaseQueries).then(() => {
      lineItemData.map((item) => {
        pool.query(step2, item, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log(res.rows[0]);
          }
        });
      });
    });

    await pool.query("COMMIT");
  } catch (e) {
    await pool.query("ROLLBACK");
  }
};

transaction();
