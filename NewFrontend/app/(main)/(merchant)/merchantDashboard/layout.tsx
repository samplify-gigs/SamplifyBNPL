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
  try {
    const cookieStore = await cookies();
    const newURL = process.env.NEXT_PUBLIC_BASE_URL;
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    console.log("this is coolie header:", cookieHeader);

    const res = await fetch(`${newURL}/api/merchantdash/dashboard`, {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      redirect("/merchantlogin");
    }
  } catch (err) {
    console.error("front err:", err);
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
