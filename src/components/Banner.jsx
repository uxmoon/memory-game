import PropTypes from 'prop-types'
import './Banner.css'

export default function Banner({
  playerName,
  successAttempts,
  failedAttempts,
  handleGameReset,
}) {
  return (
    <div className='banner'>
      <h2>Game over {playerName}!</h2>
      <p>You finish the game in {successAttempts + failedAttempts} attempts.</p>
      <p>Do you want play again?</p>
      <button className='banner__button' onClick={handleGameReset}>
        Start new game
      </button>
    </div>
  )
}

Banner.propTypes = {
  playerName: PropTypes.string,
  successAttempts: PropTypes.number,
  failedAttempts: PropTypes.number,
  handleGameReset: PropTypes.func,
}
