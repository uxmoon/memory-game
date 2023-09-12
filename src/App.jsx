import { useEffect, useRef, useState } from 'react'
import Card from './components/Card'

export default function App() {
  // hooks
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [cards, setCards] = useState([])
  const [start, setStart] = useState(false)
  const [cardOne, setCardOne] = useState(null)
  const [cardTwo, setCardTwo] = useState(null)
  const [failed, setFailed] = useState(0)
  const [correct, setCorrect] = useState(0)
  const inputRef = useRef()

  // data fetching
  useEffect(() => {
    fetch(
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=9'
    )
      .then((response) => response.json())
      .then((response) => setData(response.entries))
  }, [])

  // handle user selection
  const handleSelection = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card)
  }

  // compare selected cards
  useEffect(() => {
    if (cardOne && cardTwo) {
      if (cardOne.fields.image.url === cardTwo.fields.image.url) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.fields.image.url === cardOne.fields.image.url) {
              return {
                ...card,
                matched: true,
              }
            } else {
              return card
            }
          })
        })
        setCorrect((prevCorrect) => prevCorrect + 1)
        resetTurn()
      } else {
        setFailed((prevFailed) => prevFailed + 1)
        resetTurn()
      }
    }
  }, [cardOne, cardTwo])

  // reset selection
  const resetTurn = () => {
    setCardOne(null)
    setCardTwo(null)
  }

  const handleStartGame = () => {
    if (inputRef.current.value === '') return
    setName(inputRef.current.value)
    const cloneData = [...data, ...data].sort(() => Math.random() - 0.5)
    setCards(cloneData)
    setStart(true)
  }

  return (
    <div className='container mx-auto'>
      <h1>Memory Game</h1>
      {!name.length ? (
        <>
          <p>Hi! Before we start the game please complete your name below.</p>
          <input type='text' defaultValue={name} ref={inputRef} />
          <button onClick={handleStartGame}>Start game</button>
        </>
      ) : (
        <p>Awesome! Let&apos;s play!</p>
      )}
      {start ? (
        <>
          <p>
            Correct attempts: {correct} Failed attempts: {failed}
          </p>
          <div className='grid'>
            {cards.map((card) => (
              <div key={crypto.randomUUID()}>
                <Card card={card} handleSelection={handleSelection} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Type a name before begin</p>
      )}
    </div>
  )
}
