import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages 
import Home from './pages/home';
import RoutesWithNavBar from './routes';

export default function App() {

  return (
    <div className="overflow-x-hidden w-full h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<RoutesWithNavBar />} />
        </Routes>
      </Router>
    </div>
    
  );
}
