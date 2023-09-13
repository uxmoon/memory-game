import { useEffect, useRef, useState } from 'react'
import Card from './components/Card'

export default function App() {
  // hooks
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [cards, setCards] = useState([])
  const [start, setStart] = useState(false)
  const [cardOne, setCardOne] = useState(null)
  const [cardTwo, setCardTwo] = useState(null)
  const [failed, setFailed] = useState(0)
  const [success, setSuccess] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const inputRef = useRef()

  // data fetching
  useEffect(() => {
    setIsLoading(true)
    fetch(
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=9'
    )
      .then((response) => response.json())
      .then((response) => setData(response.entries))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // handle user selection
  const handleSelection = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card)
  }

  // compare selected cards
  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true)
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
        setSuccess((prevSuccess) => prevSuccess + 1)
        resetTurn()
      } else {
        setFailed((prevFailed) => prevFailed + 1)
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [cardOne, cardTwo])

  // reset selection
  const resetTurn = () => {
    setCardOne(null)
    setCardTwo(null)
    setDisabled(false)
  }

  // finish game and show message
  useEffect(() => {
    if (success === 9) {
      alert('You won')
    }
  }, [success])

  const handleStartGame = () => {
    if (inputRef.current.value === '') return
    setName(inputRef.current.value)
    const cloneData = [...data, ...data]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID(), matched: false }))
    setCards(cloneData)
    setStart(true)
  }

  return (
    <div className='container mx-auto'>
      <h1>Memory Game</h1>
      {isLoading ? (
        <h2>Loading game...</h2>
      ) : (
        <>
          <p>Hi! Before we start the game please complete your name below.</p>
          <input type='text' defaultValue={name} ref={inputRef} />
          <button onClick={handleStartGame}>Start game</button>
        </>
      )}
      {name.length ? <p>Awesome! Let&apos;s play!</p> : ''}
      {isFinished ? (
        <p>You finish the game {name}! Do you want to play again?</p>
      ) : (
        ''
      )}
      {start ? (
        <>
          <p>
            Successful attempts: {success} Failed attempts: {failed}
          </p>
          <div className='grid'>
            {cards.map((card) => (
              <div key={card.id}>
                <Card
                  card={card}
                  handleSelection={handleSelection}
                  flipped={card === cardOne || card === cardTwo || card.matched}
                  disabled={disabled}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  )
}
