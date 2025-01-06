import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { useChatGpt } from './services/open-ia.service';
import { createStory } from './services/story.service';

dotenv.config();
const PORT = process.env.PORT;

const app: Application = express();
app.use(cors());

// Middleware para JSON
app.use(express.json());

// Rotas básicas
app.post('/chat', async (req: Request, res: Response) => {
    try {
        const content = await useChatGpt(req.body.messages);
        res.send({ messages: content });
    }
    catch (error) {
        console.error(error);
    }
});

app.post('/create-story', async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const content = await createStory(req.body, 'ptbr');
        res.send({ content });
    }
    catch (error) {
        console.error(error);
    }
})

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`✨ Server running on port ${PORT}`);
});