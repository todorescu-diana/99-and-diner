const products_express = require("express");
const products_db = require("./config/db.ts");
const products_cors = require("cors");

const products_app = products_express();
const PRODUCTSPORT = 3003;
products_app.use(products_cors());
products_app.use(products_express.json());

// Route to get all products
products_app.get("/api/get", (req, res) => {
    products_db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one user
products_app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  products_db.query("SELECT * FROM products WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the user
products_app.post("/api/create", (req, res) => {
  const productName = req.body.productFirstName;
  const productPrice = req.body.productPrice;
  const productType = req.body.productType;

  products_db.query(
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

products_app.listen(PRODUCTSPORT, () => {
  console.log(`Server is running on ${PRODUCTSPORT}`);
});
