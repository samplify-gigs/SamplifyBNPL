import NavBar from "@/components/Navbar/NavBar";
import HomeBody from "@/components/home/HomeBody";

export default function Home() {
  return (
    <main className="h-full pt-10 ">
      <header className="w-full ">
        <NavBar />
      </header>
      <HomeBody />
    </main>
  );
}
