import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

const openia = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export const useChatGpt = async (messages: ChatCompletionMessageParam[]) => {
    try {
        if (!messages || !Array.isArray(messages))
            throw { code: 400, message: 'Invalid request format. Expected an array of messages.' }

        const response = await openia.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { "role": "system", "content": "Você é um assistente que ajuda o usuário a criar narrativas focadas nos requisitos que o usuário passar." },
                ...messages
            ]
        })

        return response.choices[0].message.content
    }
    catch (error: any) {
        console.error('Error interacting with OpenAI API:', error.message);
        throw { code: 500, message: error?.message || 'Internal Error' }
    }
}
