import { defineConfig } from "prisma/config";
import dotenv from "dotenv";
import path from "node:path";


// Ensure environment variables are loaded manually
dotenv.config();


export default defineConfig({
  schema: path.join("prisma", ""),
  migrations: {
    seed: 'node prisma/seed.js',
  },
  datasource: {
    provider: "postgresql",  // Replace with your DB provider (e.g., mysql, sqlite, etc.)
    url: process.env.DATABASE_URL,  // Loads the DATABASE_URL environment variable
  },
});