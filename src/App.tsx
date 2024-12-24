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
import Menu from './pages/evenements/Menu';
import Aide from './pages/evenements/menu/Aide';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Route pour les pages d'événements avec la Navbar */}
        <Route
          path="/e/:eId/*"
          element={
            <>
              <Navbar />
              <div className="content">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="taches" element={<Taches />} />
                  <Route path="depenses" element={<Depenses />} />
                  <Route path="prestataires" element={<Prestataires />} />
                  <Route path="menu" element={<Menu />} />
                </Routes>
              </div>
            </>
          }
        />

        {/* Routes non liées aux événements */}
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aide" element={<Aide />} />
      </Routes>
    </Router>
  );
};

export default App;
