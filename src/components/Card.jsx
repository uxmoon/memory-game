import PropTypes from 'prop-types'

export default function Card({
  card: {
    fields: {
      image: { title, url },
    },
  },
}) {
  return (
    <div>
      <img src={url} alt={title} className='front' />
      <img src='img/cover.png' alt='card back' className='back' />
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
}
