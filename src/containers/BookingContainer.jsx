import React, { Component } from 'react'
import BookingTable from '../components/BookingTable'
import BookingUpdate from '../components/BookingUpdate'
import style from './BookingContainer.css'

export default class BookingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookingEntries: [],
      activeBooking: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/bookings.json')
      .then((response) => {
        return response.json()
      })
      .then((bookingEntries) => {
        this.setState({ bookingEntries })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  getActiveBooking = () => {
    const {
      bookingEntries,
      activeBooking: { entryIndex, bookingIndex }
    } = this.state
    return bookingEntries[entryIndex].bookings[bookingIndex] || null
  }

  handleTableClick = (e, entryIndex, bookingIndex) => {
    this.setState({
      activeBooking: {
        entryIndex,
        bookingIndex
      }
    })
  }

  handleModalClose = () => {
    this.setState({ activeBooking: null })
  }

  handleBookingChange = (e) => {
    const {
      bookingEntries,
      activeBooking: { entryIndex, bookingIndex }
    } = this.state

    const seated = e.target.value === 'seated' && e.target.checked
    const cancelled = e.target.value === 'cancelled' && e.target.checked

    const booking = {
      ...this.getActiveBooking(),
      seated,
      cancelled
    }

    const bookings = Object.assign(
      [],
      bookingEntries[entryIndex].bookings,
      { [bookingIndex]: booking }
    )

    const updateEntries = Object.assign(
      [],
      bookingEntries,
      { [entryIndex]: { ...bookingEntries[entryIndex], bookings } }
    )

    this.setState({
      bookingEntries: updateEntries
    })
  }

  renderBookingEntries = () => {
    return (
      this.state.bookingEntries.map(({ date, bookings }, index) => {
        const formattedDate = new Date(date).toLocaleDateString()
        return (
          <div className={style.booking_entries} key={date}>
            <h2 className={style.date}>Booking for {formattedDate}</h2>
            <BookingTable
              bookings={bookings}
              clickHandler={this.handleTableClick}
              entryIndex={index}
            />
          </div>
        )
      })
    )
  }

  render() {
    const { bookingEntries, activeBooking } = this.state
    const booking = activeBooking && this.getActiveBooking()
    return (
      <div className={style.booking_container}>
        { bookingEntries.length ? this.renderBookingEntries()
          : <p>Sorry, no bookings were found</p>
        }
        { activeBooking &&
          <BookingUpdate
            booking={booking}
            handleModalClose={this.handleModalClose}
            handleBookingChange={this.handleBookingChange}
          />
        }
      </div>
    )
  }
}
