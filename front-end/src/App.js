import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import Chart from './components/Charts';
import store from './redux/store';


function App () {


    return (
      <Provider store={store}>
        <BrowserRouter>
          <TopNav />

          <Chart />
          

          <SideNav />
        </BrowserRouter>
      </Provider>
    )
}

export default App