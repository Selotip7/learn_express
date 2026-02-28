import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createToken } from "#src/services/userServices.js";
dotenv.config();

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  //
  maxAge: 7 * 24 * 60 * 60 * 1000, //30 days
  // Ini bukan mengatur JWT.

  // Ini mengatur:

  // Berapa lama cookie disimpan di browser.

  // 🔸 maxAge

  // Ini berarti:
  // Cookie akan disimpan di browser selama 30 hari.

  // Setelah 30 hari:
  // Browser otomatis hapus cookie itu.

  // Jadi ini adalah:
  // 👉 Umur cookie di sisi browser.
};

// export const generateAceessToken=(user)=>{
//   return jwt.sign(
//     {
//       id: user.id,
//       email: user.email,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: "1d",
//     },
//   );
// }

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30s",
    },
  );

  // Ini mengatur:

  // Berapa lama JWT valid secara kriptografi.

  // Artinya:
  // Di dalam token akan ada field exp (expired time).

  // Kalau lewat 30 detik:
  // jwt.verify() akan gagal.

  // Jadi ini adalah:
  // 👉 Umur token di sisi server.
};

export const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    },
  );
  user = { ...user, token: refreshToken };
  await createToken(user);

  return refreshToken;
};
