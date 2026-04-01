export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="font-serif text-4xl font-bold mb-8">Refund Policy</h1>
      <div className="prose prose-zinc max-w-none">
        <p className="mb-4">
          We want you to be completely satisfied with your purchase from X Perfumes. If you are not entirely happy with your order, we are here to help.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Returns</h2>
        <p className="mb-4">
          You have 14 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused, in the same condition that you received it, and in the original packaging.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Refunds</h2>
        <p className="mb-4">
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Shipping</h2>
        <p className="mb-4">
          You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.
        </p>
      </div>
    </div>
  );
}
