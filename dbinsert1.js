const pool = require("./db");

const sql = 'INSERT INTO prelimexam.AS_customer (customer_id, customer_name, customer_gender) VALUES ($1,$2,$3) RETURNING *';
const data = [2,'Paul','Male'];

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    } else {
        console.log(res.rows[0]);
    }
});

pool.end();