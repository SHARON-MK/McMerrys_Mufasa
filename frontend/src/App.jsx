import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Home from './pages/landing/landing';
import { ServicesScreen } from './pages/services/Service';


function App() {
  return (
    <Router>
      <div >
        

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/service" element={<ServicesScreen />} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
