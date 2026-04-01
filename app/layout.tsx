import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { cn } from "@/lib/utils";
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'X Perfumes | Luxury Scents, Crafted for You',
  description: 'Discover luxury scents crafted for you. Minimal, clean, premium perfumes.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, playfair.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t py-12 bg-muted/20 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
              <div>
                <h2 className="font-serif text-2xl font-bold mb-4">X PERFUMES</h2>
                <p className="text-muted-foreground">Luxury Scents, Crafted for You.</p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/shop" className="hover:text-foreground transition-colors">Shop All</Link></li>
                  <li><Link href="/about-us" className="hover:text-foreground transition-colors">About Us</Link></li>
                  <li><Link href="/contact-us" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/shipping-delivery" className="hover:text-foreground transition-colors">Shipping & Delivery</Link></li>
                  <li><Link href="/terms-conditions" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
                  <li><Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-muted-foreground text-center border-t pt-8">
              &copy; {new Date().getFullYear()} X Perfumes. All rights reserved.
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
