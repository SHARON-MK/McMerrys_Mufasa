import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import McMerrysLoader from './components/Loader';
import Landing from './pages/landing/Landing-page';
import EventPage from './pages/services/Event_page';


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
          <Route path="/" element={<Landing />} />
          <Route path="/event" element={<EventPage />} />
          {/* <Route path="/service" element={<ServicesScreen />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
