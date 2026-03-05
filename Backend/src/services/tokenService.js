import pool from "#src/conn.js";

export const createToken = async (user) => {
  // BAGUSNYA DI HASH DULU TOKENNYA, JADI KALO ADA YANG NEMUIN TOKEN DI DB, GAK BISA LANGSUNG PAKE
  // BISA PAKE HASHING SEPERTI BCRYPT ATAU SHA256
  const { id, token } = user;

  const createdToken = await pool.query(
    "INSERT INTO tokens (user_id, token) VALUES ($1, $2) ",
    [id, token],

  );
  console.log("creating token for user id:", id);

  if (!createdToken) {
    throw new Error("failed to save token");
  }
};

export const findToken = async (token) => {
  const result = await pool.query(
    "SELECT * FROM tokens WHERE token = $1",
    [token],
  );
  const find = result.rows[0];
  // console.log("finding token:", token, "result:", find);
  // const find = await prisma.token.findUnique({
  //   where: {
  //     token: token,
  //   },
  // });
  return find;
};

export const deleteToken = async (token) => {
  const deleted= await pool.query(
    'delete from tokens where token=$1',
    [token]
  );
  console.log("deleting token:", token, "result:", deleted);
  
  // const deleted = await prisma.token.delete({
  //   where: {
  //     token: token,
  //   },
  // });
  // return deleted;
};

// await prisma.token.upsert({
//   where: {
//     user_id: user.id,
//   },
//   update: {
//     token: refreshToken,
//   },
//   create: {
//     user_id: user.id,
//     token: refreshToken,
//   },
// });
// Keuntungan:

// Kalau sudah ada → update

// Kalau belum ada → create

// Tidak perlu delete manual




export const findUserByToken = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [userId],
  );
  const find = result.rows[0];
  // console.log("finding user by token:", userId, "result:", find);
  return find;
};
