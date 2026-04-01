'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

interface ShopFiltersProps {
  brands: string[];
  seasons: string[];
  occasions: string[];
  currentGender?: string;
  currentBrand?: string;
  currentSearch?: string;
  currentWhenToWear?: string;
  currentOccasion?: string;
}

export function ShopFilters({ brands, seasons, occasions, currentGender, currentBrand, currentSearch, currentWhenToWear, currentOccasion }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(currentSearch || '');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  };

  useEffect(() => {
    if (debouncedSearchQuery !== (currentSearch || '')) {
      updateFilter('q', debouncedSearchQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  const clearFilters = () => {
    router.push('/shop');
    setSearchQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('q', searchQuery);
  };

  const hasFilters = currentGender || currentBrand || currentSearch || currentWhenToWear || currentOccasion;

  return (
    <div className="flex flex-col gap-6 sticky top-24">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          type="search"
          placeholder="Search fragrances..."
          className="pl-9 bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-900"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 mb-3">Gender</h3>
          <Select value={currentGender || 'all'} onValueChange={(v) => updateFilter('gender', v === 'all' ? null : v)}>
            <SelectTrigger className="w-full bg-zinc-50 border-zinc-200">
              <SelectValue placeholder="All Genders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="Male">For Him</SelectItem>
              <SelectItem value="Female">For Her</SelectItem>
              <SelectItem value="Unisex">Unisex</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 mb-3">Brand</h3>
          <Select value={currentBrand || 'all'} onValueChange={(v) => updateFilter('brand', v === 'all' ? null : v)}>
            <SelectTrigger className="w-full bg-zinc-50 border-zinc-200">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 mb-3">When to Wear</h3>
          <Select value={currentWhenToWear || 'all'} onValueChange={(v) => updateFilter('whenToWear', v === 'all' ? null : v)}>
            <SelectTrigger className="w-full bg-zinc-50 border-zinc-200">
              <SelectValue placeholder="All Seasons" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Seasons</SelectItem>
              {seasons.map((season) => (
                <SelectItem key={season} value={season}>{season}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-900 mb-3">Best Occasion</h3>
          <Select value={currentOccasion || 'all'} onValueChange={(v) => updateFilter('bestOccasion', v === 'all' ? null : v)}>
            <SelectTrigger className="w-full bg-zinc-50 border-zinc-200">
              <SelectValue placeholder="All Occasions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Occasions</SelectItem>
              {occasions.map((occasion) => (
                <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters} className="w-full justify-start text-zinc-500 hover:text-zinc-900 px-0">
          <X className="mr-2 h-4 w-4" />
          Clear all filters
        </Button>
      )}
    </div>
  );
}
