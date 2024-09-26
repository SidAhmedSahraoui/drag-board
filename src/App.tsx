import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages
import Home from './pages/home';
import NotFound from './pages/error';

// routes
import RoutesWithNavBar from './routes';

// components
import Spinner from './animation/spinner';

function App() {
  return (
    <div className="overflow-x-hidden overflow-y-scroll w-full h-full">
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<RoutesWithNavBar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;