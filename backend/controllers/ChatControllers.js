import asyncHandler from "../middlewares/asyncHandler.js";
import { waitingForAIResponse } from "../utils/gptResponse.js";

const chatWithGPT = asyncHandler(async (req, res) => {
    try {
        const { message, previousMessages } = req.body;

        // Check if the message is empty
        if (!message || message.trim() === "") {
            return res.status(400).json({ message: "Message cannot be empty" });
        }

        // Check if the previous messages are provided and is an array
        if (!Array.isArray(previousMessages)) {
            return res.status(400).json({ message: "Previous messages must be an array" });
        }

        // Call the function to get the AI response
        const chatResponse = await waitingForAIResponse(message, previousMessages);

        // Testing OUTPUT FROM GPT ????????????????????????
        console.log("AI Response:", chatResponse);
 


        console.log(req.body);


        // Send the AI response back to the client
        // res.status(200).json(aiResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export { chatWithGPT };
