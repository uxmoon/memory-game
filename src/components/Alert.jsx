export default function Alert() {
  return (
    <div className='alert' role='alert'>
      <strong className='alert__title'>
        There was a problem loading the game.
      </strong>{' '}
      <span className='alert__text'>
        We&apos;re experiencing technical difficulties.
      </span>
    </div>
  )
}
