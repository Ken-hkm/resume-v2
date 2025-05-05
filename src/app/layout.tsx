import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Changed font for a more standard look
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })


export const metadata: Metadata = {
  title: "Kenneth's Resume", // Updated title
  description: 'Online resume for Kenneth Hakim',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
