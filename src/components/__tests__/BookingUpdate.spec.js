import renderComponent from '../../helpers/test-component'
import BookingUpdate from '../BookingUpdate'

const renderBookingUpdate = renderComponent(BookingUpdate)
const initialProps = {
  booking: {
    title: 'Mr',
    firstName: 'Fred',
    lastName: 'Bloggs',
    time: '16.00',
    partySize: 2,
    seated: false,
    cancelled: false,
    notes: ''
  },
  handleModalClose: jest.fn(),
  handleBookingChange: jest.fn()
}
describe('<BookingUpdate /> component', () => {
  describe('@renders', () => {
    it('should not render if no booking is passed as prop', () => {
      expect(renderBookingUpdate().getTree())
        .toMatchSnapshot()
    })

    it('should render with booking passed as prop', () => {
      expect(renderBookingUpdate(initialProps).getTree())
        .toMatchSnapshot()
    })

    it('should render booking with note', () => {
      expect(renderBookingUpdate({
        ...initialProps,
        booking: {
          ...initialProps.booking,
          notes: 'By appointment of the royal family'
        }
      }).getTree()).toMatchSnapshot()
    })
  })

  describe('@events', () => {
    describe('on X button click', () => {
      it('should invoke handleModalClose function', () => {
        const { wrapper, instance } = renderBookingUpdate(initialProps)
        wrapper.find('.close').props().clickHandler()
        expect(instance.props.handleModalClose).toHaveBeenCalled()
      })
    })

    describe('on radio button change', () => {
      it('should trigger handleBookingChange', () => {
        const { wrapper, instance } = renderBookingUpdate({
          ...initialProps,
          seated: true
        })
        wrapper.find('RadioButton').first().props().clickHandler()
        expect(instance.props.handleModalClose).toHaveBeenCalled()
      })
    })
  })
})
