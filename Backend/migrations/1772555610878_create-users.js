export const up = (pgm) => {
  pgm.createType("user_role", ["ADMIN", "USER"]);

  pgm.createTable("users", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    email: { type: "varchar(150)", notNull: true, unique: true },
    password: { type: "text", notNull: true },
    role: { type: "user_role", default: "USER" },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable("users");
  pgm.dropType("user_role");
};
