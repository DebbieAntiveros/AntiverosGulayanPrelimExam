const pool = require("./db");

const sql = 'UPDATE prelimexam.AS_supplier SET supplier_name=$1 WHERE supplier_id=3 RETURNING*';
const data = ['Shan'];

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    } else {
        console.log(res.rows[0]);
    }
});

pool.end();