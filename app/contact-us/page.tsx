'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success('Message sent successfully! We will get back to you soon.');
      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('There was a problem sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <h1 className="font-serif text-5xl font-bold mb-12 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-zinc-600 mb-8">
            Have a question about our fragrances, your order, or just want to say hello? We&apos;d love to hear from you. Fill out the form and our team will get back to you as soon as possible.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-zinc-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-zinc-900" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">Visit Us</h3>
                <p className="text-zinc-600">Dubai, United Arab Emirates</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-zinc-100 p-3 rounded-full">
                <Phone className="h-6 w-6 text-zinc-900" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">Call Us</h3>
                <p className="text-zinc-600">+971 58 532 8790</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-zinc-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-zinc-900" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">Email Us</h3>
                <p className="text-zinc-600">info@xperfumes.me</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-50 p-8 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required className="bg-white border-zinc-200" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" required className="bg-white border-zinc-200" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" required className="bg-white border-zinc-200" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required className="bg-white border-zinc-200 min-h-[150px]" />
            </div>
            
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full h-14 text-base font-medium bg-zinc-900 hover:bg-zinc-800 text-white">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
