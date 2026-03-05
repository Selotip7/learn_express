/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("tokens", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users", //defaultnya users.id jadi bisa ditulis seperti ini atau bisa juga references: { table: "users", column: "id" } atau references: '"users"(id)'
      onDelete: "cascade",
    },
    token: { type: "text", notNull: true },
    created_at: {
      type: "timestamp",
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("tokens");
};
