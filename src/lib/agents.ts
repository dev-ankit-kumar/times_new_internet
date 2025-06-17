import OpenAI from 'openai';
import cards from '../data/cards.json';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getCardRecommendations(userProfile: any) {
  const prompt = `You are a credit card advisor. Based on the user profile:
${JSON.stringify(userProfile, null, 2)}
and this card database:
${JSON.stringify(cards, null, 2)}
Recommend the 3 best cards with reason and estimated reward.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4',
  });

  return completion.choices[0].message.content || '';
}
