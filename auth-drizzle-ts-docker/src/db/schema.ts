import { uuid, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 45 }).notNull(),
  lastName: varchar("last_name", { length: 45 }),
  email: varchar("email").unique().notNull(),
  password:varchar("password").notNull(),
  salt: text("salt"),
  refreshtoken: text("refresh_token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
