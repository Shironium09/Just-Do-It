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

const behavior = "You are an expert in time management. In here, you are given an image (the user's schedule), and some context that they will be giving. Given those, make a schedule for the user's entire week. Make it so that the schedule is as effective and efficient as possible and will be very helpful for what the user's context. Make it simpler like for example, Monday: 8-9: Ready for school, 9-10: Class, or something like that. Make sure that it is understandable, and very helpful for the user. In scheduling, also take into account the priority of the subject and balance it out so that the whole thing would be as effective and efficient. Also, remove any greetings and stuff, just go ahead and generate a text for the schedule, and a little and slight explanation to why the schedule is as such. Also, please format it properly, like for example: Monday: (newline) 6-7:30: Something (then another new line), essential, make a newline every after daya and every after time and schedule. This is the context:"

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