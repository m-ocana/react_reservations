import React, { Component, PropTypes } from 'react'
import style from './Button.css'

export default class Button extends Component {

  static PropTypes = {
    className: PropTypes.string,
    clickHandler: PropTypes.func
  }

  static defaultProps = {
    className: '',
    clickHandler: () => {}
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.clickHandler()
  }

  render() {
    const { className } = this.props
    return (
      <button
        className={style[`${className}`]}
        onClick={this.handleClick}
      >
        { this.props.children }
      </button>
    )
  }
}
