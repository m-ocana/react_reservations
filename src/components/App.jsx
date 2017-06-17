/* Feel free to edit */
import React, { Component } from 'react'
import BookingContainer from '../containers/BookingContainer'
import style from './App.css'

export default class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <div className={style.header}>
          { /* TODO include, or replace heading with, logo */ }
          <h1 className={style.intro}>Table Reservations</h1>
        </div>
        <BookingContainer />
      </div>
    )
  }
}
