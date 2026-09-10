import './globals.css';

export const metadata = {
  title: 'RAM ANALYSE — Apple of Fortune',
  description: 'Assistant Apple of Fortune — RAM ANALYSE',
  icons: {
    icon: '/apple.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
