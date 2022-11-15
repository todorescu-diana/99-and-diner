const promotions_express = require("express");
const promotions_db = require("./config/db.ts");
const promotions_cors = require("cors");

const promotions_app = promotions_express();
const promotionsPORT = 3005;
promotions_app.use(promotions_cors());
promotions_app.use(promotions_express.json());

// Route to get all promotions
promotions_app.get("/api/get", (req, res) => {
  promotions_db.query("SELECT * FROM promotions", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one promotion
promotions_app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  promotions_db.query(
    "SELECT * FROM promotions WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route for creating the promotion
promotions_app.post("/api/create", (req, res) => {
  const promotionId = req.body.promotionId;
  const promotionName = req.body.promotionName;
  const promotionPriceNormal = req.body.promotionPriceNormal;
  const promotionPriceSpecial = req.body.promotionPriceSpecial;

  promotions_db.query(
    "INSERT INTO promotions (promotion_id, promotion_name, promotion_price_normal, promotion_price_special) VALUES (?,?,?, ?)",
    [promotionId, promotionName, promotionPriceNormal, promotionPriceSpecial],
    (err, result) => {
      if (err) {
        res.send({ error: err.message });
        console.log(err);
        return;
      }
      res.send(result);
      console.log(result);
    }
  );
});

// Route to update a promotion
promotions_app.put("/api/updateProduct/:promotion_id", (req, res) => {
  const promotionId = req.body.promotionId;
  const promotionNewName = req.body.promotionNewName;
  const promotionNewPriceNormal = req.body.promotionNewPriceNormal;
  const promotionNewPriceSpecial = req.body.promotionNewPriceSpecial;
  console.log(req.body.promotionNewPriceSpecial)
  promotions_db.query(
    "UPDATE promotions SET promotion_name = ?, promotion_price_normal = ?, promotion_price_special = ? WHERE promotion_id = ?",
    [promotionNewName, promotionNewPriceNormal, promotionNewPriceSpecial, promotionId],
    (err, result) => {
      if (err) {
        res.send({ error: err.message });
        return;
      }
      res.send(result);
    }
  );
});

// Route to delete a promotion

promotions_app.delete("/api/delete/:promotion_id", (req, res) => {
  const promotionId = req.params.promotion_id;

  promotions_db.query(
    "DELETE FROM promotions WHERE promotion_id = ?",
    [promotionId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ error: err.message });
      }
      res.send(result);
    }
  );
});

promotions_app.listen(promotionsPORT, () => {
  console.log(`Server is running on ${promotionsPORT}`);
});
