import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';
import cors from 'cors'
import bodyParser from 'body-parser';
import {z} from 'zod'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), 
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
});

app.use(cors());
app.use(bodyParser.json())

app.post('/register', async (req : Request, res : Response)=>{
    try {
        await client.connect();
        const validateSchema = registerSchema.parse(req.body)
        const { name, address} = validateSchema

        const insertUserName = `INSERT INTO users (name) VALUES ($1) RETURNING id;`;
        const insertUserAddress = 'INSERT INTO address (user_id,address) VALUES ($1,$2)'

        const userResult = await client.query(insertUserName,[name]);
        const userId = userResult.rows[0].id;
       
        await client.query(insertUserAddress,[userId,address])

        res.status(201).json({ message: 'User and address registered successfully' });

    }catch(e){
        if (e instanceof z.ZodError) {
            return res.status(400).json({ errors: e.errors });
        }
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(e)
    
    }finally{
        await client.end()
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});