import renderComponent from '../../helpers/test-component'
import BookingContainer from '../BookingContainer'

const mockedState = {
  bookingEntries: [{
    date: '2017-03-13',
    bookings: [
      {
        title: 'Mr',
        firstName: 'Fred',
        lastName: 'Bloggs',
        time: '16.00',
        partySize: 2,
        seated: false,
        cancelled: false,
        notes: ''
      },
      {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Smith',
        time: '18.45',
        partySize: 1,
        seated: false,
        cancelled: true,
        notes: ''
      }
    ]
  }],
  activeBooking: null
}
const renderBookingContainer = renderComponent(BookingContainer)

describe('<BookingContainer /> ', () => {
  describe('@renders', () => {
    it('should render BookingContainer without bookings', () => {
      expect(renderBookingContainer().getTree())
        .toMatchSnapshot()
    })

    it('should render BookingContainer with results', () => {
      const bookingContainer = renderBookingContainer()
      bookingContainer.setState(mockedState)
      expect(bookingContainer.getTree())
        .toMatchSnapshot()
    })
  })

  describe('@lifecycle', () => {
    describe('componentDidMount', () => {
      it('should fetch data', () => {
        window.fetch = jest.fn().mockImplementation(() =>
          Promise.resolve())

        const { instance } = renderBookingContainer()
        expect(window.fetch).not.toHaveBeenCalled()
        instance.componentDidMount()
        expect(window.fetch).toHaveBeenCalled()
      })
    })
  })

  describe('@events', () => {
    describe('on handleClick callback', () => {
      it('should set state with active booking', () => {
        const { wrapper, instance } = renderBookingContainer()
        wrapper.setState(mockedState)
        instance.handleTableClick(null, 0, 0)
        expect(wrapper.state()).toMatchSnapshot()
      })
    })
  })
})
