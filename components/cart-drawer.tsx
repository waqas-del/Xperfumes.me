'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isMounted, setIsMounted] = useState(false);
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Your Cart</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button onClick={() => onOpenChange(false)}>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 py-4">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                      <h3 className="font-medium leading-none">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-semibold">{item.impressionPrice} AED</span>
                        <span className="text-sm line-through text-muted-foreground">{item.originalPrice} AED</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="pt-6 border-t mt-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-serif text-xl">{getTotalPrice()} AED</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Shipping and taxes calculated at checkout.</p>
              <div className="flex flex-col gap-3">
                <Button className="w-full" size="lg" onClick={() => onOpenChange(false)}>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" className="w-full" size="lg" onClick={() => onOpenChange(false)}>
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
