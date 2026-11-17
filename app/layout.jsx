import './globals.css';

export const metadata = {
  title: 'RAM ANALYSE — Crash',
  description: 'Assistant Crash — RAM ANALYSE',
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
