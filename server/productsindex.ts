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

// Route to get one product
products_app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  products_db.query(
    "SELECT * FROM products WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route for creating the product
products_app.post("/api/create", (req, res) => {
  const productId = req.body.productId;
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productType = req.body.productType;
  const productImageUrl = req.body.productImageUrl;

  products_db.query(
    "INSERT INTO products (product_id, product_name, product_price, product_type,product_image_url) VALUES (?,?,?,?,?)",
    [productId, productName, productPrice, productType, productImageUrl],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to update a product
products_app.put("/api/updateProduct/:product_id", (req, res) => {
  const productId = req.body.productId;
  const productNewName = req.body.productNewName;
  const productNewPrice = req.body.productNewPrice;
  const productNewImageUrl = req.body.productNewImageUrl;
  products_db.query(
    "UPDATE products SET product_name = ?, product_price = ?, product_image_url = ? WHERE product_id = ?",
    [productNewName, productNewPrice, productNewImageUrl, productId],
    (err, result) => {
      if (err) {
        res.send({ error: err.message });
        return;
      }
      res.send(result);
    }
  );
});

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
