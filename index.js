import express from "express";
import mongoose from "mongoose";
import checkAuth from "./utils/checkAuth.js";
import { registerValidation } from "./validations/auth.js";
import { getMe, login, register } from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://rmerkulov:25522552@cluster0.serka4p.mongodb.net/cats?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("BD error: ", err));

const app = express();
app.use(express.json());

//authorize user
app.post("/auth/login", login);

//register of users
app.post("/auth/register", registerValidation, register);

//info for user
app.get("/auth/me", checkAuth, getMe);

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
