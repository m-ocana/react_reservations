import React, { Component, PropTypes } from 'react'
import style from './RadioButton.css'

export default class RadioButton extends Component {

  static PropTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    clickHandler: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string
  }

  static defaultProps = {
    checked: false,
    className: '',
    clickHandler: () => {},
    label: '',
    name: '',
    value: ''
  }

  handleChange = (e) => {
    this.props.clickHandler(e)
  }

  render() {
    const { checked, className, label, name, value } = this.props
    return (
      <label
        className={style.radio_button}
        htmlFor={label}
      >
        <input
          checked={checked}
          className={style[`${className}`]}
          name={name}
          onChange={(e) => {
            if (e.target.checked !== checked) this.handleChange(e)
          }}
          type="radio"
          value={value}
        />
        { label &&
          <span className={style.label}>{label}</span>
        }
      </label>
    )
  }
}
