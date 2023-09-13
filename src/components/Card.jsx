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
        <img
          src={card.fields.image.url}
          alt={card.fields.image.title}
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
