import openai from '../openai.js';
import { META_PROMPT } from './constants.js';

// define a function that waits for the OpenAI's GPT response
const waitingForAIResponse = async (message, previousMessages = [], highlightedText = "") => {
    try {
        // Only include last 5 messages for context to reduce tokens
        const recentMessages = previousMessages.slice(-5);

        const formattedMessages = [
            { role: 'system', content: META_PROMPT },
            ...recentMessages.map((msg) => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.message,
            })),
            {
                role: 'system',
                content: META_PROMPT
            },
            { role: 'user', content: `Here is the highlighted text: ${highlightedText}. Here is the input: ${message}.` },
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: formattedMessages,
            temperature: 0.7,
            presence_penalty: 0.1,
        });

        return {
            sender: 'bot',
            message: response.choices[0].message.content,
            timestamp: Date.now(),
        };
    } catch (error) {
        console.error('AI response error:', error);
        return {
            sender: 'bot',
            message: 'Sorry, I am unable to respond at the moment.',
            timestamp: Date.now(),
        };
    }
};

export { waitingForAIResponse };