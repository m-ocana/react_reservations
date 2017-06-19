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
    describe('on handleTableClick callback', () => {
      it('should set state with active booking', () => {
        const { wrapper, instance } = renderBookingContainer()
        wrapper.setState(mockedState)
        instance.handleTableClick(null, 0, 0)
        expect(wrapper.state()).toMatchSnapshot()
      })
    })

    describe('on handleModalClose callback', () => {
      it('should set activeBooking to null', () => {
        const { wrapper, instance } = renderBookingContainer()
        wrapper.setState({
          ...mockedState,
          activeBooking: {
            entryIndex: 0,
            bookingIndex: 0
          }
        })
        instance.handleModalClose()
        expect(wrapper.state().activeBooking).toBe(null)
      })
    })

    describe('on handleBookingChange callback', () => {
      it('should modify booking to seated and update state', () => {
        const { wrapper, instance } = renderBookingContainer()
        wrapper.setState({
          ...mockedState,
          activeBooking: {
            entryIndex: 0,
            bookingIndex: 0
          }
        })
        instance.handleBookingChange({
          target: {
            value: 'seated',
            checked: true
          }
        })
        expect(wrapper.state()).toMatchSnapshot()
      })

      it('should modify booking to cancelled and update state', () => {
        const { wrapper, instance } = renderBookingContainer()
        wrapper.setState({
          ...mockedState,
          activeBooking: {
            entryIndex: 0,
            bookingIndex: 0
          }
        })
        instance.handleBookingChange({
          target: {
            value: 'cancelled',
            checked: true
          }
        })
        expect(wrapper.state()).toMatchSnapshot()
      })
    })
  })
})
