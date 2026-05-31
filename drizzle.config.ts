import { defineConfig } from "drizzle-kit"
import { env } from "./src/data/env.ts"

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    // url: env.DATABASE_URL,
    ssl: false,
  },
})
