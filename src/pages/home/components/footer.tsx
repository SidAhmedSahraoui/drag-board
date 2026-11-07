import { FC } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./navbar";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Use cases", href: "#use-cases" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Try the sample board", to: "/board" },
    ],
  },
];

const Footer: FC = () => (
  <footer className="mx-auto mt-28 w-full max-w-6xl border-t border-white/10 px-4 py-12 sm:px-6">
    <div className="flex flex-col justify-between gap-10 md:flex-row">
      <div className="max-w-xs">
        <Link to="/" aria-label="DragBoard home" className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
          <Logo />
        </Link>
        <p className="mt-4 text-sm leading-relaxed text-slate-500">
          A fast, keyboard-friendly drag &amp; drop task board that saves right in your browser.
        </p>
      </div>
      <div className="flex gap-16">
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {"to" in l && l.to ? (
                    <Link to={l.to} className="text-sm text-slate-400 hover:text-white">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="text-sm text-slate-400 hover:text-white">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </div>
    <p className="mt-12 text-xs text-slate-600">© {new Date().getFullYear()} DragBoard. All rights reserved.</p>
  </footer>
);

export default Footer;
