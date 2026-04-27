import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { PgliteDatabase } from "drizzle-orm/pglite";
import { PgTable } from "drizzle-orm/pg-core";

export type DrizzleDB = NodePgDatabase | PgliteDatabase
export type DrizzleTable = PgTable
