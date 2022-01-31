import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import {createConnection} from 'typeorm'
const app = express();
// puerto que va correr
app.set("port",process.env.PORT);
createConnection();    
// Middlewares
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Authorization'
    ],
    methods: 'GET,PUT,POST,DELETE',
    origin:'*'
};
app.use(cors(options));
app.use(express.json());
app.use(morgan('dev'));
app.disable("x-powered-by");

const swaggerDocument: any = require('../swagger.json');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// routes

import userRouter from './modules/user/router';
app.use("/api/users",userRouter);

import directionRouter from './modules/direction/router';
app.use("/api/direction",directionRouter);
export default app;