import { useEffect, useState } from 'react'

export default function App() {
  const [cards, setCards] = useState([])
  // get images
  useEffect(() => {
    fetch(
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20'
    )
      .then((response) => response.json())
      .then((data) => {
        setCards(data.entries)
      })
  }, [])

  console.log(cards)

  return (
    <div>
      <h1>Memory Game</h1>
      <ul>
        {cards.slice(0, 9).map((card) => (
          <li key={card.fields.image.uuid}>
            <img
              src={card.fields.image.url}
              alt={card.fields.image.title}
              width='200'
            />
            {card.fields.image.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
