const pool = require("./db");

const sql = 'DELETE FROM prelimexam.AS_supplier WHERE supplier_name=$1 RETURNING *';
const data = ['Shan'];

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    } else {
        console.log(res.rows[0]);
    }
});

pool.end();