import renderComponent from '../../helpers/test-component'
import Button from '../Button'

const renderButton = renderComponent(Button)
const initialProps = {
  className: 'button',
  clickHandler: jest.fn()
}

describe('<Button /> component', () => {
  describe('@renders', () => {
    it('should render dumb Button', () => {
      expect(renderButton().getTree())
        .toMatchSnapshot()
    })

    it('should render Button with initial props', () => {
      expect(renderButton(initialProps).getTree())
        .toMatchSnapshot()
    })

    it('should render Button with children', () => {
      expect(renderButton({
        ...initialProps,
        children: 'Im a button!'
      }).getTree()).toMatchSnapshot()
    })
  })

  describe('@events', () => {
    beforeEach(() => jest.resetAllMocks())

    describe('on button click', () => {
      it('should trigger clickHandler', () => {
        const { wrapper, instance } = renderButton(initialProps)
        wrapper.find('.button').simulate('click', { preventDefault: jest.fn() })
        expect(instance.props.clickHandler).toHaveBeenCalled()
      })
    })
  })
})
