import React, { Component } from 'react'
import BookingTable from '../components/BookingTable'
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

  handleClick = (e, entryIndex, bookingIndex) => {
    this.setState({
      activeBooking: {
        entryIndex,
        bookingIndex
      }
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
              clickHandler={this.handleClick}
              entryIndex={index}
            />
          </div>
        )
      })
    )
  }

  render() {
    const { bookingEntries } = this.state
    return (
      <div>
        { bookingEntries.length ? this.renderBookingEntries()
          : <p>Sorry, no bookings were found</p>
        }
      </div>
    )
  }
}
