import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";
import Spinner from "./animation/spinner";
import { ErrorBoundary, ToastHost } from "./components";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
      <ToastHost />
    </ErrorBoundary>
  );
}

export default App;
