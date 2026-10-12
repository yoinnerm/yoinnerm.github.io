export interface ChatApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatApiOptions {
  messages: ChatApiMessage[];
  systemInstruction?: string;
  model?: string;
  onChunk?: (chunkText: string) => void;
}

export async function sendChatMessage(options: ChatApiOptions): Promise<string> {
  const { messages, systemInstruction, model, onChunk } = options;

  // If streaming callback is provided, attempt streaming SSE first
  if (onChunk) {
    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          systemInstruction,
          model,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en servidor (${response.status})`);
      }

      if (!response.body) {
        throw new Error('Respuesta vacía');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.slice(5).trim();
          if (dataStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            if (parsed.text) {
              accumulatedText += parsed.text;
              onChunk(parsed.text);
            }
          } catch {
            // Ignore parse errors for incomplete chunks
          }
        }
      }

      if (accumulatedText.trim()) {
        return accumulatedText;
      }
    } catch (streamError) {
      console.warn('Streaming error, falling back to unary /api/chat:', streamError);
      // Fallback below
    }
  }

  // Fallback / standard unary fetch
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      systemInstruction,
      model,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error del servidor (${response.status})`);
  }

  const data = await response.json();
  return data.reply;
}
