import { Provider } from 'react-redux';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import Chart from './components/Charts';
import store from './redux/store';

function App () {


    return (
      <Provider store={store}>
        <TopNav />

        <Chart />

        <SideNav />
      </Provider>
    )
}

export default App