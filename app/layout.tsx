import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import SideNav from '@/app/ui/dashboard/sidenav';

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Records Dashboard',
    default: 'Records Dashboard',
  },
  description: 'The official Records for SOPTB Nigeria.'
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}