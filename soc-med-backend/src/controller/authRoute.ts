import { Request, Response } from "express";
import { pool } from "../config/dbConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(req: Request, res: Response): Promise<void> {
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    mobileNumber,
    email,
    password,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    const exists = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (exists.rows.length > 0) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    //Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (
                first_name, last_name, email, mobile_number, password, date_of_birth, gender
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        firstName,
        lastName,
        email,
        mobileNumber,
        hashedPassword,
        dateOfBirth,
        gender,
      ]
    );

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ message: "Server error" });
  }
}
