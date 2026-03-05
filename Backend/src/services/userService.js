import dotenv from "dotenv";
dotenv.config();
import pool from "../conn.js";
import bcrypt from "bcrypt";

export const createUser = async (req) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password:", hashedPassword);
  const result = await pool.query(
    "INSERT into users (name,email,password,role) values ($1,$2,$3,$4) RETURNING *",
    [name, email, hashedPassword, "USER"],
  );
  console.log("result:", result);
  return result.rows[0];
};

// const create = await prisma.user.create({
//   data: {
//     name: name,
//     email: email,
//     password: hashedPassword,
//   },
// });
// };

export const login = async (req) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });
  if (!user) {
    throw new Error("user not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("isMatch:", isMatch);

  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  // console.log("user:", user)
  return user;
};

