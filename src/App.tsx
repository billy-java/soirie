import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/evenements/Dashboard';
import Depenses from './pages/evenements/Depenses';
import Contact from './pages/evenements/menu/Contact';
import Parametres from './pages/evenements/menu/Parametres';
import Prestataires from './pages/evenements/Prestataires';
import Taches from './pages/evenements/Taches';
import Home from './pages/Home';
import Menu from './pages/evenements/Menu';
import Aide from './pages/evenements/menu/Aide';
import Connexion from './pages/auth/Connexion';
import RoutesProtegee from './RoutesProtegee';

const App: React.FC = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />

          {/* Routes pour les pages d'événements */}
          <Route
            path="/e/:eId/dashboard"
            element={<RoutesProtegee element={<Dashboard />} />}
          />
          <Route
            path="/e/:eId/taches"
            element={<RoutesProtegee element={<Taches />} />}
          />
          <Route
            path="/e/:eId/depenses"
            element={<RoutesProtegee element={<Depenses />} />}
          />
          <Route
            path="/e/:eId/prestataires"
            element={<RoutesProtegee element={<Prestataires />} />}
          />
          <Route
            path="/e/:eId/menu"
            element={<RoutesProtegee element={<Menu />} />}
          />

          {/* Routes sans sous-routes */}
          <Route path="/parametres" element={<Parametres />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aide" element={<Aide />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
