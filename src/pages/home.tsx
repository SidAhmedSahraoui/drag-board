import { FC } from "react";
import Short from "../images/short.png"

const Home: FC = () => {
  return (
    <div style={{
        backgroundImage: `url(${Short})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
    }}>
      <h1 className="text-3xl font-bold text-center">Home</h1>
    </div>
  );
};

export default Home;