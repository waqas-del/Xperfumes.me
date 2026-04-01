'use client';

import { Button } from '@/components/ui/button';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="font-serif text-5xl font-bold mb-12 text-center">About X Perfumes</h1>
      
      <div className="prose prose-zinc max-w-none prose-lg">
        <p className="text-xl text-zinc-600 leading-relaxed text-center mb-16">
          At X Perfumes, we believe fragrance is more than a scent—it’s identity, confidence, and memory bottled into a few powerful drops.
        </p>

        <p>
          Based in the UAE, we have spent the last 3 years perfecting the art of blending high-quality impressions of the world’s most loved niche, designer, and iconic perfumes. Our mission is simple: make luxury fragrances accessible without compromising on performance, character, or experience.
        </p>

        <h2 className="font-serif text-3xl font-bold mt-16 mb-6">What We Do</h2>
        <p>
          We specialize in creating premium perfume impressions inspired by renowned luxury and niche fragrances. Each blend is carefully crafted using high-grade ingredients to replicate the essence, depth, and evolution of original masterpieces.
        </p>
        <p>Our process combines:</p>
        <ul>
          <li>Deep understanding of fragrance structures</li>
          <li>Expert blending techniques</li>
          <li>Continuous testing for longevity and projection</li>
        </ul>
        <p className="font-medium italic text-zinc-800">We don’t just copy scents—we recreate experiences.</p>

        <h2 className="font-serif text-3xl font-bold mt-16 mb-6">Why We Do It</h2>
        <p>
          Luxury perfumes are beautiful—but often expensive, inaccessible, or not long-lasting in harsh climates like the UAE.
        </p>
        <p>We started XPerfumes to solve that.</p>
        <p>Our goal is to give fragrance lovers the freedom to:</p>
        <ul>
          <li>Wear their favorite scent DNA daily</li>
          <li>Explore multiple styles without overspending</li>
          <li>Enjoy long-lasting performance suited for Middle Eastern weather</li>
        </ul>
        <p className="font-medium text-zinc-800">We believe everyone deserves to smell exceptional—every day.</p>

        <h2 className="font-serif text-3xl font-bold mt-16 mb-8">What Makes Us Different</h2>
        <div className="space-y-8 not-prose">
          <div>
            <h3 className="font-bold text-xl mb-2 text-zinc-900">1. Long-Lasting Performance</h3>
            <p className="text-zinc-600 leading-relaxed">Our blends are optimized for strong projection and extended wear, even in hot climates.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2 text-zinc-900">2. Affordable Luxury</h3>
            <p className="text-zinc-600 leading-relaxed">Experience the essence of high-end perfumes at a fraction of the cost.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2 text-zinc-900">3. Custom Blending Expertise</h3>
            <p className="text-zinc-600 leading-relaxed">We go beyond impressions—offering personalized blends tailored to your taste and personality.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2 text-zinc-900">4. Tested & Refined</h3>
            <p className="text-zinc-600 leading-relaxed">Every fragrance is tested for balance, stability, and wearability before reaching you.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2 text-zinc-900">5. UAE-Based Craftsmanship</h3>
            <p className="text-zinc-600 leading-relaxed">Created with an understanding of regional preferences—bold, elegant, and memorable.</p>
          </div>
        </div>

        <h2 className="font-serif text-3xl font-bold mt-16 mb-6">Benefits of Choosing XPerfumes</h2>
        <ul>
          <li>Save significantly compared to original luxury brands</li>
          <li>Build a versatile fragrance wardrobe</li>
          <li>Enjoy strong compliments and signature scent potential</li>
          <li>Access scents that may be discontinued or hard to find</li>
          <li>Customize your own unique blend</li>
        </ul>

        <h2 className="font-serif text-3xl font-bold mt-16 mb-6">Our Vision</h2>
        <p>
          To become the go-to destination in the UAE for premium fragrance impressions and custom blends, trusted for quality, consistency, and creativity.
        </p>

        <h2 className="font-serif text-3xl font-bold mt-16 mb-6">Our Promise</h2>
        <p>At X Perfumes, every bottle represents:</p>
        <ul>
          <li>Craftsmanship</li>
          <li>Passion for perfumery</li>
          <li>Commitment to quality</li>
        </ul>
        <p className="font-serif text-2xl font-bold mt-8 text-zinc-900 leading-snug">
          We don’t sell perfumes.<br/>
          We deliver confidence in every spray.
        </p>

        <div className="bg-zinc-50 rounded-3xl p-8 md:p-12 text-center mt-16 border border-zinc-100 not-prose">
          <h2 className="font-serif text-3xl font-bold mb-6 mt-0">Let’s Create Your Signature Scent</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8 text-lg">
            Whether you&apos;re looking for your favorite luxury inspiration or a completely unique blend, we’re here to craft something unforgettable—just for you.
          </p>
          <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/30 transition-all" onClick={() => window.open('https://wa.me/971585328790', '_blank')}>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              WhatsApp us: +971 58 532 8790
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
