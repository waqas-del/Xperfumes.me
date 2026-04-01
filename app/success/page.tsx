import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-center max-w-2xl min-h-[60vh] flex flex-col items-center justify-center">
      <CheckCircle2 className="h-24 w-24 text-green-500 mb-8 mx-auto" />
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-zinc-900">Order Placed Successfully!</h1>
      <p className="text-xl text-zinc-600 mb-12 font-light">
        Thank you for choosing X Perfumes. Your order is being processed and will be delivered soon.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="rounded-full px-8 h-14 text-base bg-zinc-900 hover:bg-zinc-800 text-white">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base border-zinc-300 hover:bg-zinc-50 text-zinc-900">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
