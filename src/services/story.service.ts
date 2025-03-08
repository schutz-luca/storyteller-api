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

export const createStory = (params: CreateStoryParams, language: 'ptbr') => {
    try {

        if (language !== 'ptbr') throw { code: 400, message: 'Language not supported' }

        const prompt = `
        Gere um resultado em texto com sintaxe de markdown, formatado, para cumprir com o objetivo de ${params.goal} que busque entender os sentimentos e sensações de ${params.targetAudience.profile} e façam-o sentir ${params.targetAudience.feelings}.
        O enredo deve ser sobre ${params.story.about}${params.story.climax ? `, 
            tendo o seguinte climax: ${params.story.climax}.` : ''}${params.story.moral ? `. Também deve ser apresentado a seguinte intenção como moral ou reflexão final: ${params.story.moral}` : '.'}
            Para estrutura textual do artefato produzido, considere que o tom da construção soe ${params.structure.soundsLike}.
            ${params.structure.creativeRef ? `Considere ${params.structure.creativeRef} como uma referência criativa.` : ''}
            ${params.structure.density ? `Sobre a densidade do texto, crie uma narrativa ${params.structure.density}.` : ''}.
    `

        const result = useChatGpt([{
            role: 'user',
            content: prompt
        }])

        return result;
    }
    catch (error) {
        console.error('Error on createStory:', error);
        throw error;
    }
}
