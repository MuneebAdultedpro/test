export declare const getPromptForApplicantOnJobApply: (data: any) => string;
export declare const processPromptForApplicantOnJobApply: (
    prompt: any
) => Promise<string>;
/**
 * Calls the PaLM API using Vertex AI with the specified parameters.
 * @param {string} prompt - The user input prompt for the chatbot.
 * @param {string} context - The context for the chatbot's behavior.
 * @param {number} temperature - The temperature for response randomness (default: 0.7).
 * @returns {Promise<string | null>} - The generated response or null in case of an error.
 */
export declare function callChatGPTForJobApplicationChat(
    gptMessagesHistory: any
): Promise<string | null>;
export declare const sendJobApplicationToCandidateOnJobApply: (
    data: any
) => Promise<any>;
export declare const respondWithBotOnUserMessage: (chat: any) => Promise<any>;
