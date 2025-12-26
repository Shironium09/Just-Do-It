import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI(API_KEY);

async function main(){

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",
        contents: "What is the lore of Five Nights at Freddy's?"

    })

    console.log(response.text);

}

main();