import Link from 'next/link';

export default function TermsConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="font-serif text-4xl font-bold mb-8">Terms & Conditions</h1>
      <div className="prose prose-zinc max-w-none">
        <p className="mb-4">
          Please read these Terms and Conditions (“Terms and Conditions”) carefully before using the https://xperfumes.me website operated by X Perfumes (“us”, “we”, or “our”). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service. By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Purchases</h2>
        <p className="mb-4">
          If you wish to purchase any product or service made available through the Service (“Purchase”), you may be asked to supply certain information relevant to your Purchase including, without limitation, your … The Purchases section is for businesses that sell online (physical or digital).
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Subscriptions</h2>
        <p className="mb-4">
          Some parts of the Service are billed on a subscription basis (“Subscription(s)”). You will be billed in advance on a recurring.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Content</h2>
        <p className="mb-4">
          Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the … The Content section is for businesses that allow users to create, edit, share, make content on their websites or apps.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Links to Other Web Sites</h2>
        <p className="mb-4">
          Our Service may contain links to third-party websites or services that are not owned or controlled by X Perfumes. X Perfumes LLC has no control over and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>
        <p className="mb-4">
          You further acknowledge and agree that X Perfumes shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Changes</h2>
        <p className="mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is a material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please <Link href="/contact-us" className="text-zinc-900 underline">contact us</Link>.
        </p>

        <div className="mt-12 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
          <p className="text-sm text-zinc-500 italic m-0">
            Disclaimer: Legal information is not legal advice. Read the disclaimer.
          </p>
        </div>
      </div>
    </div>
  );
}
