import express from 'express';
import cors from 'cors'
import appRouter from './src/app.route.js';
const PORT = process.env.APP_PORT || 5000;

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use('/', appRouter)
// app.use(errorHandler);
const server = app.listen(PORT, function () {
    console.log('Listing on port ', PORT)
})
