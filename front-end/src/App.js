import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import Chart from './components/Charts';



function App () {


    return (
        <BrowserRouter>

          <TopNav />

          <Routes>

            <Route path='/' exact element={<Chart />} />

            <Route path=':symbol' element={<Chart />} />

          </Routes>

          <SideNav />

        </BrowserRouter>
    )
}

export default App