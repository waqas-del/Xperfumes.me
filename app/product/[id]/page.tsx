import { getPerfumeById, getPerfumes } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { WhatsAppOrderButton } from '@/components/whatsapp-order-button';
import { PerfumeCard } from '@/components/perfume-card';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const perfumes = await getPerfumes();
  return perfumes.map((perfume) => ({
    id: perfume.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const perfume = await getPerfumeById(resolvedParams.id);
  if (!perfume) return { title: 'Not Found' };
  
  return {
    title: `${perfume.name} by ${perfume.brand} | X Perfumes`,
    description: perfume.comment,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const perfume = await getPerfumeById(resolvedParams.id);

  if (!perfume) {
    notFound();
  }

  const allPerfumes = await getPerfumes();
  const similarPerfumes = allPerfumes
    .filter((p) => p.id !== perfume.id && (p.olfactoryFamily === perfume.olfactoryFamily || p.brand === perfume.brand))
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left Column - Visual Representation */}
        <div className="bg-zinc-50 rounded-3xl p-8 lg:p-16 flex flex-col items-center justify-center min-h-[60vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-200/50 via-zinc-50 to-zinc-50"></div>
          <div className="relative z-10 text-center space-y-6">
            <Badge variant="outline" className="text-zinc-500 border-zinc-300 bg-white/50 backdrop-blur tracking-widest uppercase">
              {perfume.brand}
            </Badge>
            <h1 className="font-serif text-5xl lg:text-7xl font-bold text-zinc-900 leading-tight">
              {perfume.name}
            </h1>
            <p className="text-xl text-zinc-600 font-light italic">
              {perfume.olfactoryFamily}
            </p>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-zinc-900 text-white hover:bg-zinc-800">{perfume.gender}</Badge>
              <Badge variant="secondary" className="bg-zinc-100 text-zinc-700">{perfume.category}</Badge>
            </div>
            <h2 className="text-3xl font-serif font-bold text-zinc-900 mb-2">{perfume.name}</h2>
            <p className="text-zinc-500 uppercase tracking-widest text-sm mb-6">by {perfume.perfumer} • {perfume.year}</p>
            
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium uppercase tracking-wider text-zinc-500">Impression Price:</span>
                <span className="font-serif text-4xl font-bold text-zinc-900">{perfume.impressionPrice} AED</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium uppercase tracking-wider text-zinc-500">Original Price:</span>
                <span className="text-xl text-zinc-400 line-through">{perfume.originalPrice} AED</span>
              </div>
              <p className="text-sm text-zinc-500 italic mt-2">
                * Note: You are purchasing a high-quality impression of this fragrance.
              </p>
            </div>

            <p className="text-zinc-700 leading-relaxed text-lg mb-8">
              {perfume.comment}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <AddToCartButton perfume={perfume} />
              <WhatsAppOrderButton perfume={perfume} />
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 mb-4">Fragrance Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-1">Key Notes</span>
                  <span className="text-zinc-900 font-medium">{perfume.keyNotes}</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-1">Family</span>
                  <span className="text-zinc-900 font-medium">{perfume.olfactoryFamily}</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-1">Longevity</span>
                  <span className="text-zinc-900 font-medium">{perfume.longevity}</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-1">Sillage</span>
                  <span className="text-zinc-900 font-medium">{perfume.sillage}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 mb-4">The Experience</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-1">When to Wear</span>
                  <span className="text-zinc-900 font-medium">{perfume.whenToWear}</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-1">Best Occasion</span>
                  <span className="text-zinc-900 font-medium">{perfume.bestOccasion}</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-1">Persona</span>
                  <span className="text-zinc-900 font-medium">{perfume.persona}</span>
                </div>
                <div>
                  <span className="block text-xs text-zinc-500 uppercase tracking-wider mb-1">Profession</span>
                  <span className="text-zinc-900 font-medium">{perfume.profession}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-zinc-50 p-6 rounded-2xl">
                <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 mb-3">Pros</h3>
                <ul className="list-disc list-inside text-zinc-700 space-y-1">
                  {perfume.pros.split(',').map((pro, i) => (
                    <li key={i}>{pro.trim()}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-50 p-6 rounded-2xl">
                <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 mb-3">Cons</h3>
                <ul className="list-disc list-inside text-zinc-700 space-y-1">
                  {perfume.cons.split(',').map((con, i) => (
                    <li key={i}>{con.trim()}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarPerfumes.length > 0 && (
        <div className="mt-24 border-t pt-16">
          <h2 className="text-3xl font-serif font-bold text-zinc-900 mb-8 text-center">Similar Fragrances</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {similarPerfumes.map((p) => (
              <PerfumeCard key={p.id} perfume={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
