import PageTransition from "@/components/Merchant/dashboard/PageTransition/pageTransition";
import Topbar from "@/components/Merchant/dashboard/Topbar/topbar";
import Sidebar from "@/components/Merchant/dashboard/Sidebar/sidebar";
import AuthGuard from "@/components/Helpers/Authgarddashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="h-full bg-[#9D4EDD]/5">
        <Sidebar />

        <div className="lg:pl-64 ">
          <Topbar />

          <main className="px-4 lg:px-8 pb-28 lg:pb-10 ">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
