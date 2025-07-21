import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import Navigation from '@/components/Navigation';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Rohan Ray - Bioinformatics & Software Engineering',
  description: 'Personal portfolio of Rohan Ray, Bioinformatics Graduate Student & Software Engineer',
  keywords: 'bioinformatics, software engineering, machine learning, neuroscience, computational biology',
  authors: [{ name: 'Rohan Ray' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Navigation />
          <main style={{ paddingTop: '80px' }}>
            {children}
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}