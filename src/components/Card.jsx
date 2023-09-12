import PropTypes from 'prop-types'

export default function Card({ card, handleSelection }) {
  const handleClick = () => {
    handleSelection(card)
  }
  return (
    <div>
      <img
        src={card.fields.image.url}
        alt={card.fields.image.title}
        className='front'
      />
      <img
        src='img/cover.png'
        alt='card back'
        className='back'
        onClick={handleClick}
      />
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
}
