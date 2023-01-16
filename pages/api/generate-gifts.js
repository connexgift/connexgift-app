import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { occasion, gender, age, hobbies } = req.body;
  
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "ERROR 500",
        // OpenAI API key not configured, please follow instructions in README.md
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(occasion, gender, age, hobbies),
      temperature: 0.6,
      max_tokens: 300,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with request: ${error.message}`);
      // Error with OpenAI API request: 
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
function generatePrompt(occasion, gender, age, hobbies) {
  return `Suggest 3 ideas of gifts for ${occasion} for a ${gender} who is ${age} years old and who has as hobbies ${hobbies}.`;
}