import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages 
import Home from './pages/home';
import RoutesWithNavBar from './routes';

export default function App() {

  return (
    <div className="overflow-x-hidden overflow-y-scroll w-full h-full">
      <Router>
        <Suspense
          fallback={
              <div className="w-full h-[100vh] justify-center items-center">
                
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<RoutesWithNavBar />} />
            </Routes>
        </Suspense>
      </Router>
    </div>
    
  );
}
