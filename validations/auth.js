import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be minimum 6 symbols").isLength({ min: 5 }),
  body("fullName", "Please enter your name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar url").optional().isURL(),
];
