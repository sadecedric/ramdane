'use client';

import { useState } from 'react';
import { PLATFORMS, WHATSAPP_URL } from '@/lib/config';

const BRANDS = {
  '1XBET':     { bg: '#0b4ea2', fg: '#ffffff', short: '1X' },
  'MELBET':    { bg: '#ffc800', fg: '#1a1a1a', short: 'M' },
  'BETWINNER': { bg: '#111827', fg: '#ffd400', short: 'B' },
  'PARIPESA':  { bg: '#e11d48', fg: '#ffffff', short: 'P' },
  'WINWIN':    { bg: '#0ea5e9', fg: '#ffffff', short: 'W' },
};

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PlatformLogo({ name }) {
  const brand = BRANDS[name] || { bg: '#6b5c45', fg: '#ffffff', short: name.slice(0, 2) };
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-black"
      style={{ background: brand.bg, color: brand.fg }}
      aria-hidden="true"
    >
      {brand.short}
    </span>
  );
}

export default function PlatformsCard() {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const promoCode = PLATFORMS.find((platform) => platform.code)?.code;

  const handleCopy = async () => {
    if (!promoCode) return;
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="px-3 pt-3 pb-1">
      <div
        className="rounded-2xl px-4 py-3 shadow-sm"
        style={{ background: '#ffffff', border: '1px solid #e9ded0' }}
      >
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3 text-left"
          aria-expanded={isOpen}
          aria-controls="recommended-platforms"
        >
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em]" style={{ color: '#6b5c45' }}>
            Plateformes &amp; code promo
          </span>
          <span className="text-[12px] font-extrabold" style={{ color: '#6b4a2f' }}>
            {isOpen ? 'Réduire' : 'Afficher'}
          </span>
        </button>

        {isOpen && (
          <div id="recommended-platforms" className="mt-3">
            <div className="grid grid-cols-2 gap-2.5">
              {PLATFORMS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-2.5 rounded-2xl px-3 py-2.5 text-[13px] font-extrabold transition-opacity hover:opacity-80"
                  style={{ color: '#2b2113', background: '#f6ece0', border: '1px solid #e9ded0' }}
                  title={`Rejoindre ${p.name}`}
                >
                  <PlatformLogo name={p.name} />
                  <span className="truncate">{p.name}</span>
                </a>
              ))}
            </div>

            <div className="mt-2.5 flex items-stretch gap-2.5">
              {promoCode && (
                <div
                  className="flex shrink-0 items-center gap-2 rounded-2xl py-1.5 pl-3 pr-1.5"
                  style={{ background: '#f6ece0', border: '2px dashed #a1703f' }}
                >
                  <span className="font-mono text-[14px] font-extrabold tracking-wide" style={{ color: '#2b2113' }}>
                    {promoCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex h-8 w-8 items-center justify-center rounded-xl transition-opacity hover:opacity-85"
                    style={{ background: copied ? '#16a34a' : '#5c4428', color: '#ffffff' }}
                    title={`Copier le code ${promoCode}`}
                    aria-label={`Copier le code ${promoCode}`}
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              )}

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-2.5 text-[14px] font-extrabold text-white transition-opacity hover:opacity-90"
                style={{ background: '#25d366' }}
                title="WhatsApp"
              >
                <WhatsAppIcon />
                <span className="truncate">Mon WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
