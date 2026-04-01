export default function ShippingDeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="font-serif text-4xl font-bold mb-8">Shipping and Delivery</h1>
      <div className="prose prose-zinc max-w-none">
        <p className="mb-4">
          We strive to deliver your luxury fragrances as quickly and safely as possible. Please read our shipping policy below for details on delivery times and costs.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Processing Time</h2>
        <p className="mb-4">
          All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Domestic Shipping Rates and Estimates</h2>
        <p className="mb-4">
          Shipping charges for your order will be calculated and displayed at checkout. We offer free standard shipping on all orders within the UAE.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">International Shipping</h2>
        <p className="mb-4">
          Currently, we only ship within the United Arab Emirates. We are working on expanding our delivery network soon.
        </p>
      </div>
    </div>
  );
}
