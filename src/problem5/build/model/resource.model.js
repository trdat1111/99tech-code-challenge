"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceTable = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.resourceTable = (0, mysql_core_1.mysqlTable)("resources", {
    id: (0, mysql_core_1.int)("id").primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)("name", { length: 255 }).notNull(),
    type: (0, mysql_core_1.varchar)("type", { length: 255 }).notNull(),
});
