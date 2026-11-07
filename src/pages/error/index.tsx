import { FC } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../../lib";

const NotFound: FC = () => {
  usePageTitle("Page not found · DragBoard");

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-2 px-6 text-center">
      <p className="bg-gradient-to-r from-red-400 via-amber-300 to-violet-400 bg-clip-text text-8xl font-extrabold text-transparent">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-white">This page wandered off the board</h1>
      <p className="mb-6 max-w-sm text-sm text-slate-400">
        The link may be broken or the page may have been moved.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          Go home
        </Link>
        <Link
          to="/board"
          className="rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          Open the board
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
