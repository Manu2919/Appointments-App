import './index.css'

const AppointmentItem = props => {
  const {details, isStarClicked} = props
  const {id, title, date, isFavorite} = details

  const image = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarImg = () => {
    isStarClicked(id)
  }

  return (
    <li className="appointment-item">
      <div className="card">
        <p className="title-text">{title}</p>
        <button
          type="button"
          className="btn"
          onClick={onClickStarImg}
          data-testid="star"
        >
          <img src={image} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date-text">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
