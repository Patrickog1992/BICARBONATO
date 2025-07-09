'use server';
/**
 * @fileOverview Generates AI-powered love note suggestions.
 *
 * - generateLoveNoteSuggestion - A function that generates a love note suggestion.
 * - GenerateLoveNoteSuggestionInput - The input type for the generateLoveNoteSuggestion function.
 * - GenerateLoveNoteSuggestionOutput - The return type for the generateLoveNoteSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLoveNoteSuggestionInputSchema = z.object({
  userSentiment: z.string().describe('The overall sentiment the user wants to convey in the love note (e.g., romantic, funny, supportive).'),
  relationshipLength: z.string().describe('The length of the relationship (e.g., less than a year, 1-3 years, 3+ years).'),
  sharedMemory: z.string().optional().describe('A specific shared memory or inside joke to include in the love note.'),
});
export type GenerateLoveNoteSuggestionInput = z.infer<typeof GenerateLoveNoteSuggestionInputSchema>;

const GenerateLoveNoteSuggestionOutputSchema = z.object({
  loveNote: z.string().describe('The generated love note suggestion.'),
});
export type GenerateLoveNoteSuggestionOutput = z.infer<typeof GenerateLoveNoteSuggestionOutputSchema>;

export async function generateLoveNoteSuggestion(input: GenerateLoveNoteSuggestionInput): Promise<GenerateLoveNoteSuggestionOutput> {
  return generateLoveNoteSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLoveNoteSuggestionPrompt',
  input: {schema: GenerateLoveNoteSuggestionInputSchema},
  output: {schema: GenerateLoveNoteSuggestionOutputSchema},
  prompt: `You are a creative AI assistant that helps users craft the perfect love note. Considering the user's sentiment, relationship length, and any shared memories, generate a heartfelt love note suggestion.

Sentiment: {{{userSentiment}}}
Relationship Length: {{{relationshipLength}}}
Shared Memory: {{{sharedMemory}}}

Love Note:`,
});

const generateLoveNoteSuggestionFlow = ai.defineFlow(
  {
    name: 'generateLoveNoteSuggestionFlow',
    inputSchema: GenerateLoveNoteSuggestionInputSchema,
    outputSchema: GenerateLoveNoteSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      console.error('The model did not return an output.');
      throw new Error('Failed to generate love note suggestion.');
    }
    return output;
  }
);
