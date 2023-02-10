import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import UserModel from "./models/User.js";

import { registerValidation } from "./validations/auth.js";

mongoose
  .connect(
    "mongodb+srv://rmerkulov:25522552@cluster0.serka4p.mongodb.net/cats?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("BD error: ", err));

const app = express();
app.use(express.json());

//register of users
app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await doc.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Can't registered",
    });
  }
});

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
