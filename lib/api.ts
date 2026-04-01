import Papa from 'papaparse';

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  category: string;
  gender: string;
  olfactoryFamily: string;
  keyNotes: string;
  whenToWear: string;
  bestOccasion: string;
  longevity: string;
  sillage: string;
  year: string;
  perfumer: string;
  originalPrice: number;
  impressionPrice: number;
  pros: string;
  cons: string;
  comment: string;
  profession: string;
  persona: string;
}

export function calculateImpressionPrice(originalPrice: number): number {
  if (originalPrice > 1500) return 99;
  if (originalPrice > 1000) return 89;
  if (originalPrice > 750) return 79;
  if (originalPrice > 500) return 69;
  return 60;
}

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export async function getPerfumes(): Promise<Perfume[]> {
  try {
    const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vR-DPbyadf4F8LFQ8zmZfnTDrfmknmOk9IijaeSv2wDATIiz_33PZLVsp7jGlrYHPYlZfAhhqzONv8d/pub?output=csv', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch data');
    const text = await res.text();
    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
    
    const perfumesMap = new Map<string, Perfume>();
    
    parsed.data
      .filter((row: any) => row['Perfume Name'])
      .forEach((row: any) => {
        const name = row['Perfume Name'];
        const id = generateSlug(name);
        const originalPrice = parseFloat(row['Price (AED)']) || 0;
        const category = row['Category'] || '';
        
        if (perfumesMap.has(id)) {
          const existing = perfumesMap.get(id)!;
          if (category && !existing.category.includes(category)) {
            existing.category = existing.category ? `${existing.category} / ${category}` : category;
          }
        } else {
          perfumesMap.set(id, {
            id,
            name,
            brand: row['Brand'] || '',
            category,
            gender: row['Gender'] || '',
            olfactoryFamily: row['Olfactory Family'] || '',
            keyNotes: row['Key Notes'] || '',
            whenToWear: row['When to Wear'] || '',
            bestOccasion: row['Best Occasion'] || '',
            longevity: row['Longevity'] || '',
            sillage: row['Sillage'] || '',
            year: row['Year'] || '',
            perfumer: row['Perfumer'] || '',
            originalPrice,
            impressionPrice: calculateImpressionPrice(originalPrice),
            pros: row['Pros'] || '',
            cons: row['Cons'] || '',
            comment: row['Comment'] || '',
            profession: row['Profession'] || '',
            persona: row['Persona'] || '',
          });
        }
      });
      
    return Array.from(perfumesMap.values());
  } catch (error) {
    console.error('Error fetching perfumes:', error);
    return [];
  }
}

export async function getPerfumeById(id: string): Promise<Perfume | undefined> {
  const perfumes = await getPerfumes();
  return perfumes.find(p => p.id === id);
}
