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
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
});

process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    // Optionally exit: process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Promise Rejection:', reason);
    // Optionally exit: process.exit(1);
});
const server = app.listen(PORT, function () {
    console.log('Listing on port ', PORT)
})
