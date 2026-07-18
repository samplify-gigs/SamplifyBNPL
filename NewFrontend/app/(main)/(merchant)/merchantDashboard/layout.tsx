import PageTransition from "@/components/Merchant/dashboard/PageTransition/pageTransition";
import Topbar from "@/components/Merchant/dashboard/Topbar/topbar";
import Sidebar from "@/components/Merchant/dashboard/Sidebar/sidebar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isAuth = false;

  try {
    const cookieStore = await cookies();

    const res = await fetch(
      "http://localhost:8080/api/merchantdash/dashboard",
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      isAuth = true;
    }
  } catch (err) {
    console.error("front err:", err);
  }

  if (isAuth) {
    redirect("/merchantlogin");
  }

  return (
    <div className="h-full bg-[#9D4EDD]/5">
      <Sidebar />

      <div className="lg:pl-64 ">
        <Topbar />

        <main className="px-4 lg:px-8 pb-28 lg:pb-10 ">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}
