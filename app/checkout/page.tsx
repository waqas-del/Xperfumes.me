'use client';

import { Suspense } from 'react';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-24 text-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isWhatsApp = searchParams.get('whatsapp') === 'true';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (items.length === 0 && !isSuccess) {
    router.push('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let whatsappWindow: Window | null = null;
    if (isWhatsApp) {
      // Open window synchronously to bypass popup blockers
      whatsappWindow = window.open('about:blank', '_blank');
    }

    try {
      const orderDetails = items.map(item => `- ${item.name} by ${item.brand} (${item.quantity}x)`).join('\n');
      const message = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}\n\nOrder:\n${orderDetails}\n\nTotal: ${getTotalPrice()} AED\n\nNotes: ${formData.notes}`;
      
      // 1. Send data to our backend API route
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items,
          total: getTotalPrice(),
          orderType: isWhatsApp ? 'whatsapp' : 'cod'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit order to backend');
      }

      // 2. Handle the user redirect/notification
      if (isWhatsApp) {
        const encodedMessage = encodeURIComponent(message);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const url = isMobile 
          ? `https://wa.me/971585328790?text=${encodedMessage}`
          : `https://web.whatsapp.com/send?phone=971585328790&text=${encodedMessage}`;
        
        if (whatsappWindow) {
          whatsappWindow.location.href = url;
        } else {
          // Fallback if popup blocker still blocked the initial open
          window.location.href = url;
        }
      } else {
        toast.success('Order placed successfully!');
      }

      setIsSuccess(true);
      clearCart();
      router.push('/about-us');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('There was a problem processing your order. Please try again.');
      if (whatsappWindow) {
        whatsappWindow.close();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-24">
      <h1 className="font-serif text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
        {isWhatsApp && (
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#25D366" className="w-10 h-10">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        )}
        <span className={isWhatsApp ? "text-[#128C7E]" : ""}>
          {isWhatsApp ? "Order via WhatsApp" : "Checkout"}
        </span>
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left Column - Form */}
        <div>
          <Card className={`border-zinc-200 ${isWhatsApp ? 'shadow-sm shadow-[#25D366]/20 border-[#25D366]/30' : ''}`}>
            <CardContent className="p-8">
              <h2 className={`font-serif text-2xl font-bold mb-6 ${isWhatsApp ? 'text-[#128C7E]' : ''}`}>Shipping Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required value={formData.name} onChange={handleChange} className="bg-zinc-50 border-zinc-200" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-zinc-50 border-zinc-200" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="bg-zinc-50 border-zinc-200" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea id="address" name="address" required value={formData.address} onChange={handleChange} className="bg-zinc-50 border-zinc-200 min-h-[100px]" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} className="bg-zinc-50 border-zinc-200" />
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting} 
                    className={`w-full rounded-full h-14 text-base font-medium text-white transition-colors ${
                      isWhatsApp 
                        ? 'bg-[#25D366] hover:bg-[#128C7E] shadow-lg shadow-[#25D366]/30' 
                        : 'bg-zinc-900 hover:bg-zinc-800'
                    }`}
                  >
                    {isSubmitting ? 'Processing...' : (
                      isWhatsApp ? (
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                          </svg>
                          Complete Order via WhatsApp
                        </span>
                      ) : 'Place Order (Cash on Delivery)'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Order Summary */}
        <div>
          <Card className={`border-zinc-200 sticky top-24 ${isWhatsApp ? 'bg-[#efeae2]/30 shadow-sm shadow-[#25D366]/10 border-[#25D366]/20' : 'bg-zinc-50'}`}>
            <CardContent className="p-8">
              <h2 className={`font-serif text-2xl font-bold mb-6 ${isWhatsApp ? 'text-[#128C7E]' : ''}`}>Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-zinc-900">{item.name}</h4>
                      <p className="text-sm text-zinc-500">{item.brand} x {item.quantity}</p>
                    </div>
                    <span className="font-medium text-zinc-900">{item.impressionPrice * item.quantity} AED</span>
                  </div>
                ))}
              </div>
              
              <Separator className="mb-6 border-zinc-200" />
              
              <div className="space-y-4 mb-6 text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{getTotalPrice()} AED</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <Separator className="mb-6 border-zinc-200" />
              
              <div className="flex justify-between items-end">
                <span className="font-medium text-zinc-900">Total</span>
                <span className="font-serif text-3xl font-bold text-zinc-900">{getTotalPrice()} AED</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
