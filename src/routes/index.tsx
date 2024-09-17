import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Portfolio from "../pages/portfolio";
import { MobileNavbar } from "../layouts";
import Gradient from "../images/gradient.png";
import NotFound from "../pages/404";

const RoutesWithNavBar: FC = () => {
  return (
    <div className="flex flex-col justify-between w-full h-screen">
            <div 
                className='flex flex-col h-full overflow-scroll mb-16'
                style={{
                    backgroundImage: `url(${Gradient})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed',
                }}>
                <Routes>
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        <MobileNavbar />
  </div>
  );
};

export default RoutesWithNavBar;