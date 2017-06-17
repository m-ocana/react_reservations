import toJson from 'enzyme-to-json'
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
      }
    ]
  }]
}
const renderContainer = renderComponent(BookingContainer)

describe('<BookingContainer /> ', () => {
  describe('@renders', () => {
    it('should render BookingContainer without bookings', () => {
      expect(renderContainer().getTree())
        .toMatchSnapshot()
    })

    it('should render BookingContainer with bookings', () => {
      const { wrapper } = renderContainer()
      wrapper.setState({ mockedState })
      expect(toJson(wrapper))
        .toMatchSnapshot()
    })
  })

  describe('@lifecycle', () => {
    describe('componentDidMount', () => {
      it('should fetch data', () => {
        window.fetch = jest.fn().mockImplementation(() =>
          Promise.resolve())

        const { instance } = renderContainer()
        expect(window.fetch).not.toHaveBeenCalled()
        instance.componentDidMount()
        expect(window.fetch).toHaveBeenCalled()
      })
    })
  })
})
