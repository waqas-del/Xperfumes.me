import { getPerfumes } from '@/lib/api';
import { PerfumeCard } from '@/components/perfume-card';
import { ShopFilters } from '@/components/shop-filters';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const perfumes = await getPerfumes();
  const resolvedSearchParams = await searchParams;
  
  // Filter logic
  const genderFilter = resolvedSearchParams.gender as string;
  const brandFilter = resolvedSearchParams.brand as string;
  const searchFilter = resolvedSearchParams.q as string;
  const whenToWearFilter = resolvedSearchParams.whenToWear as string;
  const occasionFilter = resolvedSearchParams.bestOccasion as string;
  
  let filteredPerfumes = perfumes;
  
  if (genderFilter) {
    filteredPerfumes = filteredPerfumes.filter(p => p.gender.toLowerCase() === genderFilter.toLowerCase());
  }
  
  if (brandFilter) {
    filteredPerfumes = filteredPerfumes.filter(p => p.brand.toLowerCase() === brandFilter.toLowerCase());
  }
  
  if (searchFilter) {
    const q = searchFilter.toLowerCase();
    filteredPerfumes = filteredPerfumes.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      p.keyNotes.toLowerCase().includes(q)
    );
  }

  if (whenToWearFilter) {
    filteredPerfumes = filteredPerfumes.filter(p => 
      p.whenToWear.toLowerCase().includes(whenToWearFilter.toLowerCase())
    );
  }

  if (occasionFilter) {
    filteredPerfumes = filteredPerfumes.filter(p => 
      p.bestOccasion.toLowerCase().includes(occasionFilter.toLowerCase())
    );
  }

  // Extract unique brands for filter
  const brands = Array.from(new Set(perfumes.map(p => p.brand))).sort();

  // Extract unique seasons for filter
  const seasonsSet = new Set<string>();
  perfumes.forEach(p => {
    if (p.whenToWear) {
      p.whenToWear.split(',').forEach(s => {
        const trimmed = s.trim();
        if (trimmed) seasonsSet.add(trimmed);
      });
    }
  });
  const seasons = Array.from(seasonsSet).sort();

  // Extract unique occasions for filter
  const occasionsSet = new Set<string>();
  perfumes.forEach(p => {
    if (p.bestOccasion) {
      p.bestOccasion.split(',').forEach(o => {
        const trimmed = o.trim();
        if (trimmed) occasionsSet.add(trimmed);
      });
    }
  });
  const occasions = Array.from(occasionsSet).sort();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-zinc-900">Our Collection</h1>
          <p className="text-zinc-600 max-w-2xl">
            Explore our curated selection of luxury fragrances. From timeless classics to modern masterpieces.
          </p>
        </div>
        <div className="text-sm text-zinc-500 font-medium tracking-wider uppercase">
          {filteredPerfumes.length} Results
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <ShopFilters 
            brands={brands} 
            seasons={seasons}
            occasions={occasions}
            currentGender={genderFilter} 
            currentBrand={brandFilter} 
            currentSearch={searchFilter} 
            currentWhenToWear={whenToWearFilter}
            currentOccasion={occasionFilter}
          />
        </div>
        
        {/* Product Grid */}
        <div className="flex-1">
          {filteredPerfumes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPerfumes.map((perfume) => (
                <PerfumeCard key={perfume.id} perfume={perfume} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-zinc-50 rounded-2xl">
              <h3 className="font-serif text-2xl font-bold mb-2">No fragrances found</h3>
              <p className="text-zinc-600">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
