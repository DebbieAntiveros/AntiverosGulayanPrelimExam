const pool = require("./db");

const sql = 'INSERT INTO prelimexam.AS_supplier (supplier_id, supplier_name, supplier_gender) VALUES ($1,$2,$3) RETURNING *';
const data = [3,'Debbie','Female'];

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    } else {
        console.log(res.rows[0]);
    }
});

pool.end();