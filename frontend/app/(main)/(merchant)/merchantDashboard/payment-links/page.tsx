import PaymentLinksGenerator from "@/components/Merchant/dashboard/payment-link/payment-link";

export default function PaymentLinksPage() {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-white text-xl lg:text-2xl font-bold">Payment links</h1>
        <p className="text-white/40 text-sm">Create shareable links your customers can use to apply and pay in installments.</p>
      </div>

      <PaymentLinksGenerator />
    </div>
  );
}
