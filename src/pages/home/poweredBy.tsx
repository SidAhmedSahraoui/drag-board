import { FC } from "react";
import TypeScript from "../../images/typescript.svg"
import React from "../../images/react.svg"
import Framer from "../../images/framer.svg"
import Tailwind from "../../images/tailwind.svg"
import Zustand from "../../images/zustand.svg"

interface CardProps {
    title: string;
    logo: string;
}

const Card: FC<CardProps> = ({ title, logo }) => {
    return (
        <div className="w-40 h-10 sm:w-80 sm:h-20 flex justify-center items-center gap-3">
            <h3 className="font-semibold text-lg sm:text-2xl text-gray-200">{title}</h3>
            <img src={logo} alt="logo" className="w-8 h-8 sm:h-16 sm:w-16"
                style={{ 
                    filter: "grayscale(100%)",
                    WebkitFilter: "grayscale(100%)",
                    maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                }}
            
            />
        </div>
    )
}



const Index: FC = () => {

    const metrics: CardProps[] = [
        { title: "TypeScript", logo: TypeScript },
        { title: "React", logo: React },
        { title: "Framer", logo: Framer },
        { title: "Tailwind", logo: Tailwind },
        { title: "Zustand", logo: Zustand }
    ]


    return (
        <div className="mt-24">
            <h3 className="text-4xl font-semibold text-center text-gray-400">Powered By</h3>
            <div className="flex flex-wrap justify-center gap-4 m-1 mt-4">
                {
                    metrics.map((metric, index) => (
                        <Card key={index} title={metric.title} logo={metric.logo} />
                    ))
                }
            </div>
        </div>
    );
}

export default Index;