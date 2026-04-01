'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { CartDrawer } from './cart-drawer';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tight">X PERFUMES</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/shop" className="transition-colors hover:text-foreground/80 text-foreground/60">Shop All</Link>
            <Link href="/shop?gender=Male" className="transition-colors hover:text-foreground/80 text-foreground/60">For Him</Link>
            <Link href="/shop?gender=Female" className="transition-colors hover:text-foreground/80 text-foreground/60">For Her</Link>
            <Link href="/shop?gender=Unisex" className="transition-colors hover:text-foreground/80 text-foreground/60">Unisex</Link>
            <Link href="/about-us" className="transition-colors hover:text-foreground/80 text-foreground/60">About Us</Link>
            <Link href="/contact-us" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact Us</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden md:flex relative items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-9 bg-muted/50 border-none focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingBag className="h-5 w-5" />
            {isMounted && itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}
