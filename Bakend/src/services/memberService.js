import pool from "#src/conn.js";

export const addMember = async (userData) => {
  const { name, email, phone, role, status } = userData;

  const newUser = await pool.query(
    "INSERT into members (name,email,phone,role,status) values ($1,$2,$3,$4,$5) RETURNING *",
    [name, email, phone, role, status],
  );

  // const newUser = await prisma.member.create({
  //   data: {
  //     name,
  //     email,
  //     phone,
  //     role,
  //     status,
  //   },
  // });
  return newUser;
};

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM members");
  return result.rows;
  // return await prisma.member.findMany();
};

export const deleteMember = async (id) => {
  const deleted = await pool.query(
    "DELETE FROM members WHERE id = $1 RETURNING *",
    [id],
  );

  if(deleted.rowCount === 0) {
      if (deleted.rowCount === 0) {
        const error = new Error("User not found");
        error.code = 404;
        
        throw error;
      }
  }
  return deleted.rows[0];
};