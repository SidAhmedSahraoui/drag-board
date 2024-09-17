import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import RoutesWithNavBar from './routes';
import Spinner from './animation/spinner';

function App() {
  return (
    <div className="overflow-x-hidden overflow-y-scroll w-full h-full">
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<RoutesWithNavBar />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;