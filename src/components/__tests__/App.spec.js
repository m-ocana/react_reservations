import renderComponent from '../../helpers/test-component'
import App from '../App'

const renderApp = renderComponent(App)

describe('<App /> component', () => {
  describe('@renders', () => {
    it('should render App', () => {
      expect(renderApp().getTree())
        .toMatchSnapshot()
    })
  })
})
