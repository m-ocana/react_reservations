import React, { Component, PropTypes } from 'react'
import Button from './Button'
import RadioButton from './RadioButton'
import { formatName } from '../helpers/utils'
import style from './BookingUpdate.css'

export default class BookingUpdate extends Component {

  static PropTypes = {
    booking: PropTypes.object,
    handleModalClose: PropTypes.func,
    handleBookingChange: PropTypes.func
  }

  static defaultProps = {
    booking: null,
    handleModalClose: () => {},
    handleBookingChange: () => {}
  }

  onRadioButtonChange = (e) => {
    this.props.handleBookingChange(e)
  }

  render() {
    const { booking, handleModalClose } = this.props
    if (!booking) return null
    const { cancelled, notes, seated, time, partySize } = booking
    return (
      <div className={style.booking_update}>
        <h2 className={style.title}>Booking update</h2>
        <form>
          <Button
            className="close"
            clickHandler={handleModalClose}
          />
          <div>
            <span className={style.label_for}>Name</span>
            <span>{formatName(booking)}</span>
          </div>
          <div>
            <span className={style.label_for}>Time</span>
            <span>{time}</span>
          </div>
          <div>
            <span className={style.label_for}>Covers</span>
            <span>{partySize}</span>
          </div>
          <div>
            <span className={style.label_for}>Seated</span>
            <RadioButton
              checked={!cancelled && !seated}
              label="No"
              name="selection"
              clickHandler={this.onRadioButtonChange}
              value="not_seated"
            />
            <RadioButton
              checked={!cancelled && seated}
              label="Yes"
              name="selection"
              clickHandler={this.onRadioButtonChange}
              value="seated"
            />
            <RadioButton
              checked={cancelled}
              label="Cancelled"
              name="selection"
              clickHandler={this.onRadioButtonChange}
              value="cancelled"
            />
          </div>
          { !!notes &&
            <div>
              <span className={style.label_for}>Notes</span>
              <p>{notes}</p>
            </div>
          }
        </form>
      </div>
    )
  }
}
