import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BriefcaseIcon, CurrencyDollarIcon, ArrowsUpDownIcon, ArrowTrendingUpIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';

const MobileNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex justify-around bg-gray-900 p-2 fixed bottom-0 w-full font-semibold border-t-2 border-gray-600">
      <Link to="/portfolio" className={`flex flex-col items-center ${location.pathname === '/portfolio' ? 'text-white' : 'text-gray-500'}`}>
        <BriefcaseIcon className="w-7 h-7" />
        <span className="text-xs mt-1">Portfolio</span>
      </Link>

      <Link to="/trade" className={`flex flex-col ml-2 items-center ${location.pathname === '/trade' ? 'text-white' : 'text-gray-500'}`}>
        <CurrencyDollarIcon className="w-7 h-7" />
        <span className="text-xs mt-1">Trade</span>
      </Link>

      <Link to="/swap" className={`flex flex-col ml-2 items-center ${location.pathname === '/swap' ? 'text-white' : 'text-gray-500'}`}>
        <ArrowsUpDownIcon className="w-7 h-7" />
        <span className="text-xs mt-1">Swap</span>
      </Link>

      <Link to="/pools" className={`flex flex-col ml-2 items-center ${location.pathname === '/pools' ? 'text-white' : 'text-gray-500'}`}>
        <ArrowTrendingUpIcon className="w-7 h-7" />
        <span className="text-xs mt-1">Pools</span>
      </Link>

      <Link to="/settings" className={`flex flex-col ml-2 items-center ${location.pathname === '/settings' ? 'text-white' : 'text-gray-500'}`}>
        <Cog8ToothIcon className="w-7 h-7" />
        <span className="text-xs mt-1">Settings</span>
      </Link>
    </div>
  );
};

export default MobileNavbar;
