const orders_express = require("express");
const orders_db = require("./config/db.ts");
const orders_cors = require("cors");

const orders_app = orders_express();
const ORDERSPORT = 3004;
orders_app.use(orders_cors());
orders_app.use(orders_express.json());

// Route to get all orders
orders_app.get("/api/get", (req, res) => {
  orders_db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one user
orders_app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  orders_db.query("SELECT * FROM orders WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the user
orders_app.post("/api/create", (req, res) => {
  const productName = req.body.productFirstName;
  const productPrice = req.body.productPrice;
  const productType = req.body.productType;

  orders_db.query(
    "INSERT INTO users (product_id, product_name, product_price, product_type) VALUES (?,?,?)",
    [productName, productPrice, productType],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// // Route to like a post
// app.post('/api/like/:id',(req,res)=>{

// const id = req.params.id;
// db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
//     if(err) {
//    console.log(err)   }
//    console.log(result)
//     });
// });

// // Route to delete a post

// app.delete('/api/delete/:id',(req,res)=>{
// const id = req.params.id;

// db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
// if(err) {
// console.log(err)
//         } }) })

orders_app.listen(ORDERSPORT, () => {
  console.log(`Server is running on ${ORDERSPORT}`);
});
