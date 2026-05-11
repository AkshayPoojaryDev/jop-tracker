import { registerNewUser,loginUser } from "../services/authService.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/authValidator.js";

export const register = async (req, res) => {
  try {
    const validatedData =
      registerSchema.parse(req.body);

    const user = await registerUser(
      validatedData.name,
      validatedData.email,
      validatedData.password
    );

    res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const validatedData =
      loginSchema.parse(req.body);

    const data = await loginUser(
      validatedData.email,
      validatedData.password
    );

    res.json({
      message: "Login successful",
      token: data.token,
    });
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};