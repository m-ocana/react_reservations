import renderComponent from '../../helpers/test-component'
import RadioButton from '../RadioButton'

const renderRadioButton = renderComponent(RadioButton)
const initialProps = {
  className: 'radio-button',
  label: 'Yes',
  name: 'selection',
  value: 'on',
  clickHandler: jest.fn()
}

describe('<RadioButton /> component', () => {
  describe('@renders', () => {
    it('should render dumb RadioButton', () => {
      expect(renderRadioButton().getTree())
        .toMatchSnapshot()
    })

    it('should render RadioButton with initial props', () => {
      expect(renderRadioButton(initialProps).getTree())
        .toMatchSnapshot()
    })

    it('should render checked RadioButton', () => {
      expect(renderRadioButton({
        ...initialProps,
        checked: true
      }).getTree()).toMatchSnapshot()
    })
  })

  describe('@events', () => {
    beforeEach(() => jest.resetAllMocks())

    describe('onChange', () => {
      it('should trigger clickHandler', () => {
        const { wrapper, instance } = renderRadioButton(initialProps)
        wrapper.find('.radio-button').simulate('change', { target: { checked: true } })
        expect(instance.props.clickHandler).toHaveBeenCalled()
      })

      it('should not trigger clickHandler', () => {
        const { wrapper, instance } = renderRadioButton(initialProps)
        wrapper.find('.radio-button').simulate('change', { target: { checked: false } })
        expect(instance.props.clickHandler).not.toHaveBeenCalled()
      })

      it('should invoke handleChange function', () => {
        const { wrapper, instance } = renderRadioButton(initialProps)
        instance.handleChange = jest.fn()
        wrapper.find('.radio-button').simulate('change', { target: { checked: true } })
        expect(instance.handleChange).toHaveBeenCalled()
      })
    })
  })
})
