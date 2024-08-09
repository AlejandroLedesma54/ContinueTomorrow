import 'reflect-metadata';
import './config/container'
import express, { Application } from 'express';
import { config } from 'dotenv';
import sequelize from './config/database';
import cors from 'cors';
import mainRouter from './routes/mainRouter';
import errorHandler from './middlewares/errorHandler';


config();

const PORT : number | string = process.env.PORT || 3000;
const app: Application = express();

app.use(cors());  // permitir todos los origienes
app.use(express.json());
app.use("/api", mainRouter);
app.use(errorHandler);

const startApp = async (): Promise<void> => {
    try{
        await sequelize.authenticate();
        console.log("Connection extablished successfully");
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
            
        });
    }catch(err){
        console.error("There was an error trying to connect the databajse", err);   
    }
};

startApp();