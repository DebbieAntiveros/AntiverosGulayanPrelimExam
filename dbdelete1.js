const pool = require("./db");

const sql = 'DELETE FROM prelimexam.AS_customer WHERE customer_name=$1 RETURNING *';
const data = ['Christian'];

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    } else {
        console.log(res.rows[0]);
    }
});
