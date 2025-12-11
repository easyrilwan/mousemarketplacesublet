import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <>
      <main className="h-[calc(100dvh-84px)]">
        <Outlet />
      </main>

      <header>
        <Navbar />
      </header>

      {/* <footer>
        <Footer />
      </footer> */}
    </>
  );
}
