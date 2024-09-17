import { FC } from "react";

interface CardProps {
    title: string;
    value: string;
}

const Card: FC<CardProps> = ({ title, value }) => {
    return (
        <div className="h-40 w-80 flex flex-col justify-center items-center rounded-3xl border border-gray-50 border-opacity-10">
            <h3 className="font-bold text-4xl text-white">{value}</h3>
            <p className="font-medium text-base text-white">{title}</p>
        </div>
    )
}



const Index: FC = () => {

    const metrics: CardProps[] = [
        { title: "Total Volume", value: "$195,972,748" },
        { title: "Task Created", value: "4,969,693" },
        { title: "Unique Users", value: "269,920" },
    ]


    return (
        <>
            <div className="flex flex-wrap justify-center gap-4 m-1 mt-16">
                {
                    metrics.map((metric, index) => (
                        <Card key={index} title={metric.title} value={metric.value} />
                    ))
                }
            </div>
        </>
    );
}

export default Index;