import CustomersList from "@/components/Merchant/dashboard/customers-list/customers-list";

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-white text-xl lg:text-2xl font-bold">Customers</h1>
        <p className="text-white/40 text-sm">Everyone who's financed a purchase through your store.</p>
      </div>

      <CustomersList />
    </div>
  );
}
