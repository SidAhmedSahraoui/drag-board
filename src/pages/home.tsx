import { FC } from "react";
import Short from "../images/short.png"
import AnimText from "../animation/animText";
import TextLoop from "../animation/textLoop";
import { Link } from "react-router-dom";
import { BoltIcon } from "@heroicons/react/24/solid";

const Home: FC = () => {
  return (
    <div  
      style={{
        backgroundImage: `url(${Short})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px',
        paddingTop: '64px',
    }}>
      <div className="flex flex-col">
          <div id="stars" >
              <p id="stars-text">
                  <AnimText />
              </p>
          </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-2 mx-2 my-8 text-center text-gray-50">
          The World's Last 
          <br />
          Task Tracking App
        </h2>
        <TextLoop />
      </div>
      <Link 
        to="/portfolio" 
        className="group mt-8 text-sm font-semibold rounded-full py-4 px-6 text-slate-900 hover:text-gray-50 bg-gray-50 hover:bg-red-500">
          Launch App
          <BoltIcon 
            className="h-4 w-4 inline-block ml-2 text-red-500 group-hover:text-gray-50" 
          />
      </Link>
    </div>
  );
};

export default Home;