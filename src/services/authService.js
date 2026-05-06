import pool from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
export const registerNewUser = async (name , email, password) => {
    //check if user already exists
    const exists = await pool.query(
        "SELECT * FROM users WHERE email = $1", [email]
    );

    if (exists.rows.length > 0) {
        throw new Error("User already exists");
    }

    // hash the password
     const hashedPassword = await bcrypt.hash(password, 10);

    // insert the new user into the database
    const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, email",
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

// Login a user
export const loginUser = async (email, password) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1", [email]
    );
    if (result.rows.length === 0) {
        throw new Error("Invalid email or password");
    }
    const user= result.rows[0];

// compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
   
    // generate a JWT token
    const token = jwt.sign({id:user.id, email:user.email},
    process.env.JWT_SECRET, {expiresIn: "1d"}
    );

    return { token };
};
    
