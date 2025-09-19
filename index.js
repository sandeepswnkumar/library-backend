import express from 'express';
import appRouter from './src/app.route.js';
import { PrismaClient } from './generated/prisma/index.js';
const PORT = process.env.APP_PORT || 5000;


const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use('/',appRouter)
// app.use(errorHandler);
const server = app.listen(PORT, function () {
    console.log('Listing on port ', PORT)
})

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
