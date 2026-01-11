import { Outlet } from "react-router-dom";
import LiquidChrome from "./LiquidChrome";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      {/* Liquid Chrome Background */}
      <div className="fixed inset-0 z-0 blur-sm brightness-[0.15]">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.15}
          amplitude={0.4}
          frequencyX={3}
          frequencyY={2}
          interactive={true}
        />
      </div>

      {/* Content - pointer-events-none lets mouse pass to background, re-enabled on children */}
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar />
        </div>
        <main className="flex-1 pt-24 pointer-events-auto">
          <Outlet />
        </main>
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
