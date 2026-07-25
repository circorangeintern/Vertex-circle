import { Link, NavLink } from "react-router-dom";
import { cn } from "../../../utils/cn";

const linkCls = ({ isActive }) => cn("text-sm font-medium px-3 py-2 rounded-md", isActive ? "text-primary" : "text-text hover:text-primary");

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-border-1">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl text-primary">Aparta</Link>
        <nav className="hidden sm:flex items-center gap-1">
          <NavLink to="/listings" className={linkCls}>Browse</NavLink>
          <NavLink to="/list-property" className={linkCls}>List a property</NavLink>
        </nav>
        <Link to="/list-property" className="sm:hidden text-sm font-medium text-primary">List</Link>
      </div>
    </header>
  );
}
