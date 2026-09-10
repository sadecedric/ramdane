import { Mistral } from '@mistralai/mistralai';
import { SYSTEM_PROMPT } from '@/config/systemPrompt';
import { sql, ensureTables } from '@/lib/db';

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 20;

export async function POST(request) {
  const { message, history = [], sessionId } = await request.json();

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return Response.json(
      { error: "The 'message' field is required and cannot be empty." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  try {
    const trimmedHistory = history.slice(-MAX_HISTORY_LENGTH);

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...trimmedHistory,
      { role: 'user', content: message.trim() },
    ];

    const response = await mistral.chat.complete({
      model: 'mistral-small-latest',
      messages,
    });

    const reply = response.choices[0]?.message?.content ?? '';

    if (sessionId && process.env.DATABASE_URL) {
      try {
        await ensureTables();
        await sql`
          INSERT INTO sessions (id, updated_at, message_count)
          VALUES (${sessionId}, NOW(), 1)
          ON CONFLICT (id) DO UPDATE
          SET updated_at = NOW(), message_count = sessions.message_count + 1
        `;
        await sql`
          INSERT INTO messages (session_id, role, content)
          VALUES (${sessionId}, 'user', ${message.trim()}),
                 (${sessionId}, 'assistant', ${reply})
        `;
      } catch (dbErr) {
        console.error('[chat] DB error:', dbErr.message ?? dbErr);
      }
    }

    return Response.json({ reply });
  } catch (err) {
    console.error('[chat] Mistral call error:', err.message ?? err);
    return Response.json(
      { error: 'An error occurred. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
