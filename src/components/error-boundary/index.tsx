import { Component, type ErrorInfo, type ReactNode } from "react";
import { STORAGE_KEY } from "../../lib/store/useStore";

type State = { error: Error | null };

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error", error, info.componentStack);
  }

  private resetData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn(error);
    }
    window.location.assign("/");
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
        <p className="max-w-md text-sm text-slate-400">
          The board hit an unexpected error. Reloading usually fixes it; if it keeps happening, reset the
          saved board data.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
          >
            Reload
          </button>
          <button
            onClick={this.resetData}
            className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/15"
          >
            Reset saved data
          </button>
        </div>
      </div>
    );
  }
}
