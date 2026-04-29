export function makeDeck() {
  const suits = ["♠️", "♣️", "♥️", "♦️"];
  const numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck = [];
  let nextId = 0

  // Build the 52-card deck
  for (const suit of suits) {
    for (const number of numbers) {
      deck.push({ suit, number, id: nextId++ });
    }
  }

  // Fisher-Yates Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}