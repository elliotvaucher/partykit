import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { vibe, bio } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `Génère un plan de fête d'anniversaire ${vibe} pour enfants complet basé sur la description de la fête : ${bio}. Incluez un résumé de l'événement, des recettes et boissons, des idées de déguisements, des idées de jeux, une liste de courses, et une playlist musicale. Créez également un message d'invitation. Assurez-vous que le plan soit détaillé, créatif et adapté aux fêtes pour enfants. Important : formate le texte en markdown.`,
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
