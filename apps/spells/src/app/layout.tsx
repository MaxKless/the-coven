import './global.css';

export const metadata = {
  title: 'Magical Recipe Book',
  description: 'A spellbinding collection of magical recipes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
