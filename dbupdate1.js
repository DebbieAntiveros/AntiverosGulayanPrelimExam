const pool = require("./db");

const sql = 'UPDATE prelimexam.AS_customer SET customer_name=$1 WHERE customer_id=2 RETURNING*';
const data = ['Christian'];

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    } else {
        console.log(res.rows[0]);
    }
});

pool.end();