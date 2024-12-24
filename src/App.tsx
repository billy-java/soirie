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
        {/* Home: sans Navbar */}
        <Route path="/" element={<Home />} />

        {/* Autres pages : avec Navbar */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                {/* Routes avec la Navbar */}
                <Route path="/parametres" element={<Parametres />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/aide" element={<Aide />} />

                {/* Routes spécifiques pour les événements */}
                <Route path="/e/:eId/dashboard" element={<Dashboard />} />
                <Route path="/e/:eId/taches" element={<Taches />} />
                <Route path="/e/:eId/depenses" element={<Depenses />} />
                <Route path="/e/:eId/prestataires" element={<Prestataires />} />
                <Route path="/e/:eId/menu" element={<Menu />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
