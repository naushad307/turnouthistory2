import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import {fileURLToPath} from 'url';
import api from './routes/api.js';

if(!process.env.MONGODB_URI||!process.env.JWT_SECRET){console.error('MONGODB_URI and JWT_SECRET are required in .env');process.exit(1)}
await mongoose.connect(process.env.MONGODB_URI);
console.log('MongoDB connected:',mongoose.connection.name);
const app=express();
app.use(helmet({contentSecurityPolicy:false}));app.use(cors());app.use(express.json({limit:'5mb'}));app.use('/api',api);
const __dirname=path.dirname(fileURLToPath(import.meta.url));app.use(express.static(path.join(__dirname,'public')));
app.use((req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
const port=process.env.PORT||3000;app.listen(port,()=>console.log(`http://localhost:${port}`));
