import PropTypes from 'prop-types'

export default function Card({ card, handleSelection, flipped, isDisabled }) {
  const handleClick = () => {
    if (!isDisabled) {
      handleSelection(card)
    }
  }
  return (
    <div className='card'>
      <div className={flipped ? 'card--flipped' : ''}>
        <div
          style={{ backgroundImage: `url(${card.fields.image.url})` }}
          className='card__front'
        />
        <div className='card__back' onClick={handleClick}></div>
      </div>
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.shape({
    fields: PropTypes.shape({
      image: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
      }),
    }),
  }),
  handleSelection: PropTypes.func,
  flipped: PropTypes.bool,
  isDisabled: PropTypes.bool,
}
