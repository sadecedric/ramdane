'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import ChatBubble from '@/components/ChatBubble';
import VoiceBubble from '@/components/VoiceBubble';
import PlatformsCard from '@/components/PlatformsCard';
import ChatInput from '@/components/ChatInput';
import { WELCOME_MESSAGE } from '@/lib/config';
import { sendMessage } from '@/services/chatApi';

function getSessionId() {
  const key = 'dj_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(key, id); }
  return id;
}

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const sessionIdRef = useRef(null);

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const currentHistory = history;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text },
    ]);
    setIsLoading(true);

    try {
      const reply = await sendMessage(text, currentHistory.slice(-20), sessionIdRef.current);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'assistant', text: reply },
      ]);
      setHistory((prev) => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'assistant',
          text: "Désolé, je n'ai pas pu répondre. Réessaie dans un instant.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const QUICK_REPLIES = [
    'Comment gagner à Apple Fortune ?',
    'Comment gagner au jeu des deux dés ?',
    "Comment s'inscrire ?",
  ];

  return (
    <div
      className="flex flex-col h-dvh max-w-md mx-auto overflow-hidden"
      style={{ background: '#f7f2e7', color: '#292420' }}
    >
      <div className="shrink-0 sticky top-0 z-20">
        <Header />
      </div>

      <main className="flex-1 overflow-y-auto min-h-0 px-3 py-4 space-y-3">
        <ChatBubble sender="assistant" text={WELCOME_MESSAGE} />
        <VoiceBubble src="/welcome.ogg" />

        <div className="flex flex-wrap gap-2">
          {QUICK_REPLIES.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => handleSend(question)}
              disabled={isLoading}
              className="text-xs font-semibold px-3 py-2 rounded-full shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#ffffff', color: '#15803d', border: '1px solid #e5dcc8' }}
            >
              {question}
            </button>
          ))}
        </div>

        {messages.map((msg) => (
          <ChatBubble key={msg.id} sender={msg.sender} text={msg.text} />
        ))}

        {isLoading && (
          <ChatBubble sender="assistant">
            <span className="flex gap-1 items-center py-0.5">
              <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:0ms]"   style={{ background: '#16a34a' }} />
              <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:150ms]" style={{ background: '#16a34a' }} />
              <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:300ms]" style={{ background: '#16a34a' }} />
            </span>
          </ChatBubble>
        )}

        <div ref={bottomRef} />
      </main>

      <div
        className="shrink-0 sticky bottom-0 z-20"
        style={{ background: '#f7f2e7', borderTop: '1px solid #e5dcc8' }}
      >
        <PlatformsCard />
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
