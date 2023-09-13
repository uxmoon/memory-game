import PropTypes from 'prop-types'
import './Score.css'

export default function Score({ successAttempts, failedAttempts }) {
  return (
    <p className='score'>
      <span className='score__success'>
        Successful attempts: {successAttempts}
      </span>
      <span className='score__failed'>
        Failed attempts:
        {failedAttempts}
      </span>
    </p>
  )
}

Score.propTypes = {
  successAttempts: PropTypes.number,
  failedAttempts: PropTypes.number,
}
