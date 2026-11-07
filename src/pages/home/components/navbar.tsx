import { FC } from "react";
import { Link } from "react-router-dom";
import { Squares2X2Icon } from "@heroicons/react/20/solid";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#faq", label: "FAQ" },
];

export const Logo: FC = () => (
  <span className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white">
    <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-red-500 to-violet-600 shadow-lg shadow-red-500/20">
      <Squares2X2Icon className="h-4 w-4 text-white" />
    </span>
    DragBoard
  </span>
);

const Navbar: FC = () => (
  <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0619]/70 backdrop-blur-xl">
    <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
      <Link to="/" aria-label="DragBoard home" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
        <Logo />
      </Link>

      <ul className="hidden items-center gap-1 md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <Link
        to="/board"
        className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 transition-colors hover:bg-red-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
      >
        Open board
      </Link>
    </nav>
  </header>
);

export default Navbar;
