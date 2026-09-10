'use client';

import { useState } from 'react';

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const canSend = value.trim() && !disabled;

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Écris ton message..."
        disabled={disabled}
        className="flex-1 rounded-full px-4 py-2.5 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
        style={{
          background: '#ffffff',
          color: '#111827',
          border: '1px solid #d1d5db',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#1d4ed8';
          e.target.style.boxShadow = '0 0 0 2px rgba(29,78,216,0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d1d5db';
          e.target.style.boxShadow = 'none';
        }}
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!canSend}
        className="shrink-0 w-10 h-10 text-white rounded-full flex items-center justify-center transition-colors shadow"
        style={{ background: canSend ? '#1d4ed8' : '#9ca3af', cursor: canSend ? 'pointer' : 'not-allowed' }}
        aria-label="Envoyer"
      >
        <SendIcon />
      </button>
    </form>
  );
}
