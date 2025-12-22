import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <>
      <main className="h-[calc(100dvh-84px)]">
        <Outlet />
      </main>

      <Navbar />

      <ToastContainer />
    </>
  );
}
