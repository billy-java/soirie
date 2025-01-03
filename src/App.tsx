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
import Inscription from './pages/auth/Inscription';
import Restaurer from './pages/auth/Restaurer';
import Invitation from './pages/Invitations';

import RoutesProtegee from './RoutesProtegee';
import RoutesProtegeeAuth from './RoutesProtegeeAuth';

const App: React.FC = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/restaurer" element={<Restaurer />} />

          <Route path="/e/:eId/invitation" element={<Invitation />} />

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

          <Route
            path="/parametres"
            element={<RoutesProtegeeAuth element={<Parametres />} />}
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/aide" element={<Aide />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
