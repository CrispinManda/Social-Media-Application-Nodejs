import express from 'express';
import bodyParser from 'body-parser';
import logger from './src/utils/logger.js';
import userRouter from './src/routes/userRoutes.js';
import postRouter from './src/routes/postRoutes.js';
import groupRouter from './src/routes/groupRoutes.js';
import eventRouter from './src/routes/EventRoutes.js';
import messageRouter from './src/routes/messagesRoutes.js';
import dotenv from 'dotenv';
import cron from 'node-cron';
import  {sendWelcomeEmailToNewUsers} from './src/config/mailConfig.js';
import rateLimitMiddleware from './src/middlewares/rateLimitMiddleware.js';

dotenv.config();
const port = process.env.API_PORT || 3000;
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
rateLimitMiddleware(app);

app.get('/health', (req, res) => {
    res.status(200).send('I am very healthy💪');
});

//Routes
app.use('/api', userRouter);
app.use("/api", postRouter); 
app.use("/api", groupRouter);;
app.use("/api", eventRouter); ;
app.use("/api", messageRouter);


// schedule sending email
cron.schedule('*/5 * * * * *', () => {
    logger.info("sending email after every five seconds ...............")
    sendWelcomeEmailToNewUsers()
    
});

app.listen(port, () => {
    logger.info(`server running on http://localhost:${port} `);
})