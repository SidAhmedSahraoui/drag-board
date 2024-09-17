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
        <div className="h-40 w-80 flex items-center gap-5">
            <h3 className="font-semibold text-2xl text-gray-200">{title}</h3>
            <img src={logo} alt="logo" className="h-16 w-16" />
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