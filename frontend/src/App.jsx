import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import Home from './pages/landing/landing';
import { ServicesScreen } from './pages/services/Service';
import McMerrysLoader from './components/Loader';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  if (loading) {
    return <McMerrysLoader />;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/service" element={<ServicesScreen />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
