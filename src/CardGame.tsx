import { useEffect, useState } from "react"
import Card from "./Card"
import { makeDeck } from "./makeDeck"

export type Card = {
  suit: string,
  number: string,
  id: number
}

export default function CardGame() {
  const [deck, setDeck] = useState<Card[]>([])
  const [myHand, setMyHand] = useState<Card[]>([])

  const dealCard = async () => {
    // If there are no cards in the deck, leave the function
    if (deck.length === 0) {
      return
    }
    const cardToDeal = deck.at(-1)!

    // Add to Hand on Back End
    await fetch("http://localhost:3000/myCards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardToDeal)
    })

    // Add to Hand on Front End
    setMyHand([...myHand, cardToDeal])

    // Remove from Deck on Back End
    fetch("http://localhost:3000/deck/" + cardToDeal.id, {
      method: "DELETE"
    })

    // Remove From Deck on Front End
    setDeck(deck.slice(0, -1))
  }

  const loadData = async () => {
    // Load deck from server
    const deckResponse = await fetch("http://localhost:3000/deck")
    const deckData = await deckResponse.json()
    setDeck(deckData)

    // Load hand from server
    const myResponse = await fetch("http://localhost:3000/myCards")
    const myData = await myResponse.json()
    setMyHand(myData)
  }

  // This will run once (ish) when the page first loads in
  useEffect(() => {
    loadData()
  }, []) // <-- Have to put empty array right here

  const reset = async () => {
    setDeck(makeDeck())
    setMyHand([])
    // TODO
  }

  return (
    <div className="m-4">
      <button onClick={reset} className="bg-slate-700 text-white p-4">Reset</button>
      <div className="bg-green-800 rounded-xl flex justify-center items-center text-white text-3xl w-50 h-70">
        <div className="text-center">
          <div className="mb-3">{deck.length}</div>
          <button onClick={dealCard} className="bg-green-950 text-xl mb-4 text-white p-4 rounded-lg">Deal Card</button>
        </div>
      </div>
      <div className="flex mt-4">
        {myHand.map(c => (
          <div key={c.number + c.suit} className="-me-20">
            <Card card={c} />
          </div>
        ))}
      </div>
    </div>
  )
}