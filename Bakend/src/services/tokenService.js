import prisma from "#src/conn.js";

export const createToken = async (user) => {
  // BAGUSNYA DI HASH DULU TOKENNYA, JADI KALO ADA YANG NEMUIN TOKEN DI DB, GAK BISA LANGSUNG PAKE
  // BISA PAKE HASHING SEPERTI BCRYPT ATAU SHA256
  const { id, token } = user;
  const createdToken = await prisma.token.create({
    data: {
      user_id: id,
      token: token,
    },
  });
  console.log("creating token for user id:", id);

  if (!createdToken) {
    throw new Error("failed to save token");
  }
};

export const findToken = async (token) => {
  const find = await prisma.token.findUnique({
    where: {
      token: token,
    },
  });
  return find;
};

export const deleteToken = async (token) => {
  const deleted = await prisma.token.delete({
    where: {
      token: token,
    },
  });
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
