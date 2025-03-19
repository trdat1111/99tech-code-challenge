import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const resourceTable = mysqlTable("resources", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
});
