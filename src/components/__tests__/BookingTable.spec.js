import renderComponent from '../../helpers/test-component'
import BookingTable from '../BookingTable'

const renderBookingTable = renderComponent(BookingTable)
const initialProps = {
  bookings: [
    {
      title: 'Mr',
      firstName: 'Fred',
      lastName: 'Bloggs',
      time: '16.00',
      partySize: 2,
      seated: true,
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
  ],
  entryIndex: 0,
  clickHandler: jest.fn()
}

describe('<BookingTable /> component', () => {
  describe('@renders', () => {
    it('should render BookingTable', () => {
      expect(renderBookingTable(initialProps).getTree())
        .toMatchSnapshot()
    })
  })

  describe('@events', () => {
    describe('on table row click', () => {
      it('should trigger onClickHander', () => {
        const { wrapper, instance } = renderBookingTable(initialProps)
        wrapper.find('tbody tr').first().simulate('click')
        expect(instance.props.clickHandler).toHaveBeenCalled()
      })
    })
  })
})
