import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;
app.use(cors());
const upload = multer({ dest: 'uploads/' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const behavior = "You are an expert in time management. In here, you are given an image (the user's schedule), and some context that they will be giving. Given those, make a schedule for the user's entire week. Make it so that the schedule is as effective and efficient as possible and will be very helpful for what the user's context. Make it simpler like for example, Monday: 8-9: Ready for school, 9-10: Class, or something like that. Make sure that it is understandable, and very helpful for the user. In scheduling, also take into account the priority of the subject and balance it out so that the whole thing would be as effective and efficient. Also, remove any greetings and stuff, just go ahead and generate a text for the schedule, and a little and slight explanation to why the schedule is as such. This is the context:"

app.post('/analyze', upload.single('file'), async (req, res) => {

    try{

        if(!req.file){

            return res.status(400).json({ error: "No file uploaded" });
        
        }

        const fileData = fs.readFileSync(req.file.path);
        const base64File = fileData.toString('base64');

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",
            contents: [

                {

                    role: "user",
                    parts: [

                        {

                            text: behavior + req.body.context

                        },

                        {

                            inlineData: {

                                mimeType: req.file.mimetype,
                                data: base64File

                            }

                        }

                    ]

                }

            ]

        });

        fs.unlinkSync(req.file.path);

        res.json({ result: response.text });

    }catch(error){

        console.error("Error: ", error);
        res.status(500).json({ error: "Something went wrong" });

    }

});

app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`);

});