'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { Perfume } from '@/lib/api';
import { toast } from 'sonner';

export function AddToCartButton({ perfume }: { perfume: Perfume }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(perfume);
    toast.success(`${perfume.name} added to cart`);
  };

  return (
    <Button onClick={handleAdd} size="lg" className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 h-14 text-base font-medium">
      Add to Cart
    </Button>
  );
}
