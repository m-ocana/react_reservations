/* Feel free to edit */
import React, { Component } from 'react'

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
export default class BookingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { bookingEntries: [] }
  }

  componentDidMount() {
    fetch('http://localhost:3000/bookings.json')
      .then((response) => {
        return response.json()
      })
      .then((bookingEntries) => {
        this.setState({ bookingEntries })
      })
  }

  renderBookingEntries = () => {
    return null
  }

  render() {
    const { bookingEntries } = this.state
    return (
      <div>
        { bookingEntries.length ? this.renderBookingEntries()
          : <span>Sorry, no bookings were found</span>
        }
      </div>
    )
  }
}
