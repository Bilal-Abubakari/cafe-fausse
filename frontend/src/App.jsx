import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
// import Reservations from './pages/Reservations/Reservations';
// import About from './pages/About/About';
// import Gallery from './pages/Gallery/Gallery';

function App() {

  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  {/*<Route path="/about" element={<About />} />*/}
                  {/*<Route path="/reservations" element={<Reservations />} />*/}
                  {/*<Route path="/gallery" element={<Gallery />} />*/}
              </Routes>
          </div>
      </Router>
  )
}

export default App
