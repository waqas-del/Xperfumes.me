import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPerfumes, Perfume } from '@/lib/api';
import { PerfumeCard } from '@/components/perfume-card';

function ProductSection({ 
  title, 
  description, 
  perfumes, 
  viewAllLink, 
  bgClass 
}: { 
  title: string; 
  description: string; 
  perfumes: Perfume[]; 
  viewAllLink: string; 
  bgClass: string; 
}) {
  if (!perfumes || perfumes.length === 0) return null;
  
  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-4xl font-bold mb-4">{title}</h2>
            <p className="text-zinc-600">{description}</p>
          </div>
          <Link href={viewAllLink} className="hidden md:block text-sm uppercase tracking-widest font-medium hover:underline underline-offset-4">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" className="rounded-full">
            <Link href={viewAllLink}>View All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const perfumes = await getPerfumes();
  
  const topPicks = perfumes.slice(0, 4);
  const bestMen = perfumes.filter(p => p.gender === 'Male' || p.gender === 'Men').slice(0, 4);
  const bestWomen = perfumes.filter(p => p.gender === 'Female' || p.gender === 'Women').slice(0, 4);
  const bestSellers = perfumes.slice(4, 8); // Grab the next 4 for best sellers

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-zinc-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-200/50 via-zinc-50 to-zinc-50"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 text-zinc-900">
            Luxury Scents, <br />
            <span className="italic font-light text-zinc-600">Crafted for You</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-xl mx-auto font-light">
            Discover our exclusive collection of premium fragrances, designed to leave a lasting impression.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 text-base h-14 bg-zinc-900 hover:bg-zinc-800">
              <Link href="/shop">Shop Collection</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-14 border-zinc-300 hover:bg-zinc-100">
              <Link href="/shop?gender=Unisex">Explore Unisex</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/shop?gender=Male" className="group block relative h-80 bg-zinc-100 overflow-hidden rounded-2xl flex items-center justify-center transition-all hover:bg-zinc-200">
              <div className="text-center">
                <h3 className="font-serif text-3xl mb-2">For Him</h3>
                <span className="text-sm uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-colors">Explore</span>
              </div>
            </Link>
            <Link href="/shop?gender=Female" className="group block relative h-80 bg-zinc-100 overflow-hidden rounded-2xl flex items-center justify-center transition-all hover:bg-zinc-200">
              <div className="text-center">
                <h3 className="font-serif text-3xl mb-2">For Her</h3>
                <span className="text-sm uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-colors">Explore</span>
              </div>
            </Link>
            <Link href="/shop?gender=Unisex" className="group block relative h-80 bg-zinc-100 overflow-hidden rounded-2xl flex items-center justify-center transition-all hover:bg-zinc-200">
              <div className="text-center">
                <h3 className="font-serif text-3xl mb-2">Unisex</h3>
                <span className="text-sm uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-colors">Explore</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <ProductSection 
        title="Top Picks" 
        description="Curated selection of our finest fragrances." 
        perfumes={topPicks} 
        viewAllLink="/shop" 
        bgClass="bg-zinc-50" 
      />

      <ProductSection 
        title="Best Men Perfumes" 
        description="Powerful and sophisticated scents for him." 
        perfumes={bestMen} 
        viewAllLink="/shop?gender=Male" 
        bgClass="bg-white" 
      />

      <ProductSection 
        title="Best Women Perfumes" 
        description="Elegant and captivating fragrances for her." 
        perfumes={bestWomen} 
        viewAllLink="/shop?gender=Female" 
        bgClass="bg-zinc-50" 
      />

      <ProductSection 
        title="Best Seller Perfumes" 
        description="Our most loved and highly rated impressions." 
        perfumes={bestSellers} 
        viewAllLink="/shop" 
        bgClass="bg-white" 
      />
    </div>
  );
}
