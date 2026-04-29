import type { Card } from "./App"

type Props = {
    card: Card
}

export default function Card({ card }: Props) {
    return (
        <div className="bg-slate-50 shadow-lg shadow-slate-800 relative rounded-xl flex justify-center items-center p-5 w-50 h-70">
            <span className="text-4xl font-medium absolute top-0 left-0 ps-4 pt-3">{card.number}</span>
            <span className="text-5xl">{card.suit}</span>
        </div>
    )
}