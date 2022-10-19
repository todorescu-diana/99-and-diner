const express = require("express");
const db = require("./config/db.ts");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all users
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one user
app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the user
app.post("/api/create", (req, res) => {
  const userFirstName = req.body.userFirstName;
  const userLastName = req.body.userLastName;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const userRole = req.body.userRole;

  db.query(
    "INSERT INTO users (user_id, user_first_name, user_last_name, user_email, user_password, user_role) VALUES (?,?,?)",
    [userFirstName, userLastName, userEmail, userPassword, userRole],
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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
