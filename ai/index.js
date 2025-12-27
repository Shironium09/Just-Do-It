import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import dotenv from 'dotenv';
import { stringify } from 'querystring';
dotenv.config();

const app = express();
const port = 3000;
app.use(cors());
const upload = multer({ dest: 'uploads/' });

const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const API_TOKEN = process.env.CF_API_TOKEN;

const MODEL = "@cf/llava-hf/llava-1.5-7b-hf";

const behavior = `You are an expert in time management.
Analyze the user's schedule image and context.
Generate a highly efficient weekly schedule.

IMPORTANT FORMATTING RULES:
1. Start each day on a new line with the Day Name followed by a colon.
2. Put every single activity on its own new line.
3. Do not use asterisks (*) or bullet points.
4. Add a blank line between days.

Example Format:
Monday:
08:00 - 09:00: Activity A
09:00 - 10:00: Activity B

Tuesday:
08:00 - 09:00: Activity C
...
`;


app.post('/analyze', upload.single('file'), async (req, res) => {

    try{

        if(!req.file){

            return res.status(400).json({ error: "No file uploaded" });
        
        }

        const fileBuffer = fs.readFileSync(req.file.path);

        const imageArray = [...fileBuffer];

        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
            {

                method: "POST",
                headers: {

                    "Authorization": `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json"

                },
                body: JSON.stringify({

                    prompt: behavior + (req.body.context || ""),
                    image: imageArray

                })

            }
        );

        const result = await response.json();

        fs.unlinkSync(req.file.path);

        if(result.success){

            console.log("Successful Generation");
            res.json({ result: result.result.description });

        }else{

            console.error("Failed: ", JSON.stringify(result.errors, null, 2));
            res.status(500).json({

                error: "Error Generation Failed",
                details: result.errors

            });

        }

    }catch(error){

        console.error("Error: ", error);
        res.status(500).json({ error: "Something went wrong" });

    }

});

app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`);

});