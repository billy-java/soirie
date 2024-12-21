import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/evenements/Dashboard';
import Depenses from './pages/evenements/Depenses';
import Contact from './pages/evenements/menu/Contact';
import Faq from './pages/evenements/menu/Faq';
import Parametres from './pages/evenements/menu/Parametres';
import Prestataires from './pages/evenements/Prestataires';
import Taches from './pages/evenements/Taches';
import Home from './pages/Home';
import Evenement from './pages/Evenement';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/e/:eId" element={<Evenement />} />
          <Route path="/e/:eId/dashboard" element={<Dashboard />} />
          <Route path="/e/:eId/taches" element={<Taches />} />
          <Route path="/e/:eId/depenses" element={<Depenses />} />
          <Route path="/e/:eId/prestataires" element={<Prestataires />} />
          <Route path="/parametres" element={<Parametres />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
