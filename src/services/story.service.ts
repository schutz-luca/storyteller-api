import { useChatGpt } from "./open-ia.service";

interface CreateStoryParams {
    goal: string;
    targetAudience: {
        profile: string;
        feelings: string;
    };
    story: {
        about: string;
        climax?: string;
        moral?: string;
    }
    structure: {
        soundsLike: string;
        creativeRef?: string;
        density: string;
    }
}

export const createStory = (params: CreateStoryParams, language?: string) => {
    try {
        let prompt;

        switch (language) {
            case 'pt':
            case 'pt-BR':
                prompt = `
                    Gere um resultado em texto no idioma português brasileiro com sintaxe de markdown, formatado, para cumprir com o objetivo de ${params.goal} que busque entender os sentimentos e sensações de ${params.targetAudience.profile} e façam-o sentir ${params.targetAudience.feelings}.
                    O enredo deve ser sobre ${params.story.about}${params.story.climax ? `, 
                        tendo o seguinte climax: ${params.story.climax}.` : ''}${params.story.moral ? `. Também deve ser apresentado a seguinte intenção como moral ou reflexão final: ${params.story.moral}` : '.'}
                        Para estrutura textual do artefato produzido, considere que o tom da construção soe ${params.structure.soundsLike}.
                        ${params.structure.creativeRef ? `Considere ${params.structure.creativeRef} como uma referência criativa.` : ''}
                        ${params.structure.density ? `Sobre a densidade do texto, crie uma narrativa ${params.structure.density}.` : ''}.
                    `;
                break;
            default:
                prompt = `
                    Generate a text output in english using markdown syntax, formatted to fulfill the objective of ${params.goal}, aiming to understand the feelings and sensations of ${params.targetAudience.profile} and make them feel ${params.targetAudience.feelings}.
                    The plot should be about ${params.story.about}${params.story.climax ? `, 
                        featuring the following climax: ${params.story.climax}.` : ''}${params.story.moral ? ` It should also present the following intention as a moral or final reflection: ${params.story.moral}` : '.'}
                        For the textual structure of the produced artifact, consider that the tone should sound ${params.structure.soundsLike}.
                        ${params.structure.creativeRef ? `Use ${params.structure.creativeRef} as a creative reference.` : ''}
                        ${params.structure.density ? `As for the text's density, create a ${params.structure.density} narrative.` : ''}.

                    `;
        }

        const result = useChatGpt([{
            role: 'user',
            content: prompt
        }], language)

        return result;
    }
    catch (error) {
        console.error('Error on createStory:', error);
        throw error;
    }
}
