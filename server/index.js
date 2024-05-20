import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/ErrorHandler.js';
import './db/server.js';

import authRouter from './routes/authRouter.js';
import booksRouter from './routes/booksRouter.js';


const app = express();
const PORT = 4000;

// app.use(cors()); // Enable Cross-Origin-Resource Sharing
// app.use(cors({ origin: 'https://website.com' })); allow access only from prod. website
// app.use(cors({ origin: ['https://website.com', 'https://anotherwebsite.com'] }));
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'https://prismaticc.netlify.app'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json()); // Parse incomming requests with JSON payloads
app.use(cookieParser()); // cookie-parser

// ROUTES
app.use('/auth', authRouter);
app.use('/books', booksRouter);


// Error Handler
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
