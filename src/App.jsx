import { useEffect, useRef, useState } from 'react'
import Card from './components/Card'
import Alert from './components/Alert'
import Banner from './components/Banner'
import Score from './components/Score'

export default function App() {
  // hooks
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState([])
  const [cards, setCards] = useState([])
  const [playerName, setPlayerName] = useState('')
  const [isPlaying, setisPlaying] = useState(false)
  const [pickCardOne, setPickCardOne] = useState(null)
  const [pickCardTwo, setPickCardTwo] = useState(null)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [successAttempts, setSuccessAttempts] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isGameFinished, setIsGameFinished] = useState(false)
  const inputRef = useRef()

  // data fetching
  useEffect(() => {
    setIsLoading(true)
    setError(undefined)
    const controller = new AbortController()
    fetch(
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=9',
      { signal: controller.signal }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
      })
      .then((response) => setData(response.entries))
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // handle user selection
  const handleSelection = (card) => {
    pickCardOne ? setPickCardTwo(card) : setPickCardOne(card)
  }

  // compare selected cards
  useEffect(() => {
    if (pickCardOne && pickCardTwo) {
      setIsDisabled(true)
      if (pickCardOne.fields.image.url === pickCardTwo.fields.image.url) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.fields.image.url === pickCardOne.fields.image.url) {
              return {
                ...card,
                matched: true,
              }
            } else {
              return card
            }
          })
        })
        setSuccessAttempts((prevSuccess) => prevSuccess + 1)
        resetTurn()
      } else {
        setFailedAttempts((prevFailed) => prevFailed + 1)
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [pickCardOne, pickCardTwo])

  // reset selection
  const resetTurn = () => {
    setPickCardOne(null)
    setPickCardTwo(null)
    setIsDisabled(false)
  }

  // finish game and show message
  useEffect(() => {
    if (successAttempts === 9) {
      setIsGameFinished(true)
    }
  }, [successAttempts])

  // start game
  const handleStartGame = (e) => {
    e.preventDefault()
    if (inputRef.current.value === '') return
    setPlayerName(inputRef.current.value)
    const cloneData = [...data, ...data]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID(), matched: false }))
    setCards(cloneData)
    setisPlaying(true)
  }

  // display error message
  if (error != null) {
    return (
      <>
        <div className='wrapper'>
          <h1>Memory Game</h1>
          <Alert />
        </div>
      </>
    )
  }

  // reset game
  const handleGameReset = () => {
    const sortCards = cards
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: crypto.randomUUID(), matched: false }))
    setCards(sortCards)
    setFailedAttempts(0)
    setSuccessAttempts(0)
    setIsGameFinished(false)
    setPickCardOne(null)
    setPickCardTwo(null)
  }

  return (
    <div className='wrapper'>
      <h1>Memory Game</h1>
      {isLoading ? <p>Loading game...</p> : ''}
      {!isLoading && !isPlaying ? (
        <>
          <p>
            Welcome! Before we start the game please complete your name below.
          </p>
          <form onSubmit={handleStartGame} className='form'>
            <input
              type='text'
              defaultValue={playerName}
              ref={inputRef}
              className='form__input'
            />
            <button type='submit' className='form__button'>
              Start game
            </button>
          </form>
        </>
      ) : (
        ''
      )}

      {isGameFinished && (
        <Banner
          playerName={playerName}
          successAttempts={successAttempts}
          failedAttempts={failedAttempts}
          handleGameReset={handleGameReset}
        />
      )}

      {isPlaying ? (
        <>
          <Score
            successAttempts={successAttempts}
            failedAttempts={failedAttempts}
          />
          <div className='card-grid'>
            {cards.map((card) => (
              <div key={card.id}>
                <Card
                  card={card}
                  handleSelection={handleSelection}
                  flipped={
                    card === pickCardOne || card === pickCardTwo || card.matched
                  }
                  isDisabled={isDisabled}
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
