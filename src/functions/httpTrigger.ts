import { app, HttpRequest } from '@azure/functions';
import { createStory } from '../services/story.service';

app.post('create-story', {
    authLevel: 'anonymous',
    handler: async (request: HttpRequest) => {
        const body: any = await request.json();
        const content = await createStory(body, 'ptbr');
        return { jsonBody: { content } }
    }
})