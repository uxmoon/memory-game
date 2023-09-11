import { useEffect, useRef, useState } from 'react'

export default function App() {
  // hooks
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [cards, setCards] = useState([])
  const [start, setStart] = useState(false)
  const inputRef = useRef()

  // data fetching
  useEffect(() => {
    fetch(
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=9'
    )
      .then((response) => response.json())
      .then((response) => setData(response.entries))
  }, [])

  const handleName = () => {
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
          <button onClick={handleName}>Start game</button>
        </>
      ) : (
        <p>Awesome! Let&apos;s play!</p>
      )}
      {start ? (
        cards.map((card) => (
          <div key={crypto.randomUUID()}>
            <img
              src={card.fields.image.url}
              alt={card.fields.image.title}
              width={100}
            />
          </div>
        ))
      ) : (
        <p>Type a name before begin</p>
      )}
    </div>
  )
}
