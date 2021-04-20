const pool = require("./db");

const transaction = async () => {
  try {
    pool.query("BEGIN");

    const step1 = `SELECT prelimexam.as_customer.customer_name AS "Customer",
      prelimexam.as_supplier.supplier_name AS "Supplier" ,
      prelimexam.as_product.product_name AS "Product", 
      prelimexam.as_purchaseorder.po_total AS "Price",
      prelimexam.as_lineitem.line_name AS "Priority Line" FROM prelimexam.as_customer
      JOIN prelimexam.as_purchaseorder ON prelimexam.as_customer.customer_id = 
      prelimexam.as_purchaseorder.customer_id JOIN prelimexam.as_lineitem ON prelimexam.as_purchaseorder.po_id = 
      prelimexam.as_lineitem.po_id JOIN prelimexam.as_product ON prelimexam.as_lineitem.product_id = 
      prelimexam.as_product.product_id JOIN prelimexam.as_supplier ON prelimexam.as_purchaseorder.supplier_id = 
      prelimexam.as_supplier.supplier_id`;

    pool.query(step1, (err, res) => {
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
