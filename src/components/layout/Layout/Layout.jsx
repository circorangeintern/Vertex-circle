import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t border-border-1 py-6 text-center text-sm text-muted">© {new Date().getFullYear()} Aparta</footer>
    </div>
  );
}
