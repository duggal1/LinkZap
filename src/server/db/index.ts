import {drizzle} from "drizzle-orm/postgres-js";
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/your-db-name';

const client = postgres(connectionString, {
    prepare: false
})

export const db = drizzle(client, {schema})


export {eq, and, or, like, desc, asc} from "drizzle-orm"