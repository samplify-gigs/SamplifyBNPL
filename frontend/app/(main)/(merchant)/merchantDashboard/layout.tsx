import PageTransition from "@/components/Merchant/dashboard/PageTransition/pageTransition";
import Topbar from "@/components/Merchant/dashboard/Topbar/topbar";
import Sidebar from "@/components/Merchant/dashboard/Sidebar/sidebar";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[image:var(--bg-gradient)]">
      <Sidebar />

      <div className="lg:pl-64">
        <Topbar />

        <main className="px-4 lg:px-8 pb-28 lg:pb-10">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
