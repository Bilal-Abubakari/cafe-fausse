import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Reservations from './pages/Reservations/Reservations';
import Menu from './pages/Menu/Menu';
import About from './pages/About/About';
import Gallery from './pages/Gallery/Gallery';

function App() {

  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/gallery" element={<Gallery />} />
              </Routes>
          </div>
      </Router>
  )
}

export default App
