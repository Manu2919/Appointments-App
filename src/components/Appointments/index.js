import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isClicked: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: newDate,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
    console.log(newAppointment)
  }

  isStarClicked = id => {
    const {appointmentsList} = this.state
    const updatedList = appointmentsList.map(item => {
      if (item.id === id) {
        return {...item, isFavorite: !item.isFavorite}
      }
      return item
    })
    this.setState({appointmentsList: updatedList})
  }

  starredList = () => {
    const {isClicked} = this.state
    this.setState({isClicked: !isClicked})
  }

  renderFormContainer = () => {
    const {title, date} = this.state
    return (
      <form className="form-card" onSubmit={this.addAppointment}>
        <div className="input-container">
          <label className="input-label" htmlFor="title-input">
            TITLE
          </label>
          <input
            id="title-input"
            type="text"
            className="input-field"
            placeholder="Title"
            value={title}
            onChange={this.onChangeTitle}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="date-input">
            DATE
          </label>
          <input
            id="date-input"
            type="date"
            className="date-field"
            value={date}
            onChange={this.onChangeDate}
          />
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    )
  }

  renderImageCard = () => (
    <div className="image-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
        alt="appointments"
        className="appointment-image"
      />
    </div>
  )

  renderAppointmentsNavbar = () => {
    const {isClicked} = this.state
    const highlightBtn = isClicked ? 'active-btn' : ''
    return (
      <div className="appointments-navbar-container">
        <h1 className="navbar-title">Appointments</h1>
        <button
          className={`starred-btn ${highlightBtn}`}
          type="button"
          onClick={this.starredList}
        >
          Starred
        </button>
      </div>
    )
  }

  getFilteredList = () => {
    const {appointmentsList, isClicked} = this.state
    if (isClicked) {
      return appointmentsList.filter(item => item.isFavorite === true)
    }
    return appointmentsList
  }

  render() {
    const updatedList = this.getFilteredList()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <h1 className="title"> Add Appointment</h1>
          <div className="forms-container">
            {this.renderFormContainer()}
            {this.renderImageCard()}
          </div>
          <hr className="horizontal-line" />
          {this.renderAppointmentsNavbar()}
          <ul className="appointments-list-container">
            {updatedList.map(eachItem => (
              <AppointmentItem
                details={eachItem}
                key={eachItem.id}
                isStarClicked={this.isStarClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
