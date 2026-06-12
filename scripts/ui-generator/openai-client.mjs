const DEFAULT_OPENAI_MODEL = 'gpt-4.1-mini';

export async function generateWithOpenAI({
  componentName,
  figmaSpec,
  patternSamples,
  openAIApiKey,
  model = DEFAULT_OPENAI_MODEL,
  temperature = 0.2,
  maxTokens = 6144,
  buildGenerationPrompt,
}) {
  if (!openAIApiKey) {
    throw new Error('OpenAI API key is required to call generateWithOpenAI.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature,
      response_format: { type: 'json_object' },
      messages: buildGenerationPrompt({
        componentName,
        figmaSpec,
        patternSamples,
      }),
      max_tokens: maxTokens,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    const error = payload?.error?.message || JSON.stringify(payload);
    throw new Error(`OpenAI API error (${response.status}): ${error}`);
  }

  const content = payload?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI response missing completion content.');
  }

  return payload;
}

