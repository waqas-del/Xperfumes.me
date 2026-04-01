import Link from 'next/link';
import { Perfume } from '@/lib/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <Link href={`/product/${perfume.id}`} className="group h-full block">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-zinc-200 bg-white rounded-xl">
        <div className="aspect-[4/5] bg-zinc-100 flex items-center justify-center p-6 relative">
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant="secondary" className="bg-white/80 backdrop-blur font-medium">
              {perfume.gender}
            </Badge>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">{perfume.name}</h3>
            <p className="text-sm uppercase tracking-widest text-zinc-500">{perfume.brand}</p>
          </div>
        </div>
        <CardContent className="flex-1 p-6">
          <p className="text-sm text-zinc-600 line-clamp-2 mb-4">
            <span className="font-medium text-zinc-900">Notes:</span> {perfume.keyNotes}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-zinc-500 line-through">{perfume.originalPrice} AED</span>
            <span className="font-serif text-xl font-bold text-zinc-900">{perfume.impressionPrice} AED</span>
          </div>
          <span className="text-sm font-medium uppercase tracking-wider text-zinc-900 group-hover:underline underline-offset-4">
            View
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
