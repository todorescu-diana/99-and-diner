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

// Route to get one order
orders_app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  orders_db.query("SELECT * FROM orders WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the order
orders_app.post("/api/create", (req, res) => {
  const orderId = req.body.orderId;
  const orderUserId = req.body.orderUserId;
  const orderProducts = req.body.orderProducts;
  const orderNotes = req.body.orderNotes;
  const orderTotalPrice = req.body.orderTotalPrice;
  const orderAddress = req.body.orderAddress;
  const orderDate = req.body.orderDate;
  const orderTime = req.body.orderTime;

  orders_db.query(
    "INSERT INTO orders (order_id, order_user_id, order_products, order_notes, order_total_price, order_address, order_date, order_time) VALUES (?,?,?,?,?,?,?,?)",
    [
      orderId,
      orderUserId,
      orderProducts,
      orderNotes,
      orderTotalPrice,
      orderAddress,
      orderDate,
      orderTime,
    ],
    (err, result) => {
      if (err) {
        res.send({ error: err.message });
        console.log(err);
      }
      res.send(result);
      console.log(result);
    }
  );
});

orders_app.listen(ORDERSPORT, () => {
  console.log(`Server is running on ${ORDERSPORT}`);
});
