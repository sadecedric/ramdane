'use client';

import { useState } from 'react';
import { PLATFORMS, WHATSAPP_URL } from '@/lib/config';

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3 shrink-0">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" className="w-3.5 h-3.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: '#22c55e' }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
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
        className="rounded-xl px-3 py-2.5 shadow-sm"
        style={{ background: '#ffffff', border: '1px solid #e5dcc8' }}
      >
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3 text-left"
          aria-expanded={isOpen}
          aria-controls="recommended-platforms"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#8a7f6a' }}>
            Plateformes recommandées
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: '#15803d' }}>
            {isOpen ? 'Masquer' : 'Afficher'}
            <ChevronIcon open={isOpen} />
          </span>
        </button>

        {isOpen && (
          <div id="recommended-platforms" className="mt-2">
            {promoCode && (
              <div
                className="mb-2 flex items-center justify-between rounded-xl px-3 py-2"
                style={{ background: '#fff7df', border: '1px solid #ead59e' }}
              >
                <span className="text-[11px] font-semibold" style={{ color: '#8a6418' }}>Code promo commun</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-extrabold" style={{ color: '#b45309' }}>{promoCode}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-md p-1 transition-colors"
                    style={{ color: copied ? '#16a34a' : '#8a7f6a' }}
                    title={`Copier le code ${promoCode}`}
                    aria-label={`Copier le code ${promoCode}`}
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-3">
              {PLATFORMS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-bold transition-colors"
                  style={{ color: '#111827', background: '#f3ede0', border: '1px solid #e5dcc8' }}
                  title={`Rejoindre ${p.name}`}
                >
                  <ExternalLinkIcon />
                  <span className="truncate">{p.name}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid #e5dcc8' }}>
              <span className="text-xs" style={{ color: '#8a7f6a' }}>Retrouve-moi sur</span>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-opacity"
                title="WhatsApp"
                aria-label="Contact WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
