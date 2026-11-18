import './globals.css';

export const metadata = {
  title: 'Mr HB analyse — Crash',
  description: 'Assistant Crash — Mr HB analyse',
  icons: {
    icon: '/crash.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
