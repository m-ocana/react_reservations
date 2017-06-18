import React, { Component, PropTypes } from 'react'
import { formatName } from '../helpers/utils'
import style from './BookingTable.css'

export default class BookingTable extends Component {

  static PropTypes = {
    bookings: PropTypes.array,
    clickHandler: PropTypes.func,
    entryIndex: PropTypes.number
  }

  renderEntries = () => {
    const { bookings, entryIndex, clickHandler } = this.props
    return (
      bookings.map((booking, bookingIndex) => {
        const { time, partySize, seated, cancelled } = booking
        return (
          <tr
            onClick={(e) => clickHandler(e, entryIndex, bookingIndex)}
            className={cancelled ? style.cancelled : ''}
            key={bookingIndex}
          >
            <td>{formatName(booking)}</td>
            <td>{time}</td>
            <td>{partySize}</td>
            <td>{seated ? 'Y' : 'N'}</td>
          </tr>
        )
      })
    )
  }

  render() {
    return (
      <table className={style.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Covers</th>
            <th>Seated</th>
          </tr>
        </thead>
        <tbody>
          { this.renderEntries() }
        </tbody>
      </table>
    )
  }
}
