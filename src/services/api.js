const FEATHERLESS_API_KEY = import.meta.env.VITE_FEATHERLESS_API_KEY;
const BASE_URL = 'https://api.featherless.ai/v1';
export async function chatCompletion(messages, model) {
  try {
    console.log('Using model:', model);
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FEATHERLESS_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages
      })
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`);
    }

    const data = await response.json();
    
    // Validate the response structure
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      throw new Error('API response missing expected choices array');
    }
    
    if (!data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('API response missing expected message content');
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Chat completion error:', error);
    throw error;
  }
}

export async function textCompletion(prompt, model, maxTokens=500) {
  try {
    const response = await fetch(`${BASE_URL}/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FEATHERLESS_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        prompt,
        max_tokens: maxTokens
      })
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`);
    }

    const data = await response.json();
    
    // Validate the response structure
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      throw new Error('API response missing expected choices array');
    }
    
    return data.choices[0].text;

  } catch (error) {
    console.error('Text completion error:', error);
    throw error;
  }
} 

export async function fetchModels() {
  try {
    const response = await fetch(`${BASE_URL}/models`, {
      headers: {
        'Authorization': `Bearer ${FEATHERLESS_API_KEY}`
      }
    });

    const data = await response.json();
    
    // Transform the data to match our needs
    return data.data.map(model => ({
      id: model.id,
      name: model.name || model.id,
      model_class: model.model_class || 'Other',
      available_on_current_plan: model.available_on_current_plan,
      context_length: model.context_length,
      max_completion_tokens: model.max_completion_tokens
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}