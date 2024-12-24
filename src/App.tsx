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

const App: React.FC = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />

          {/* Route pour les pages d'événements avec la Navbar */}
          <Route
            path="/e/:eId/*"
            element={
              <div className="content">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="taches" element={<Taches />} />
                  <Route path="depenses" element={<Depenses />} />
                  <Route path="prestataires" element={<Prestataires />} />
                  <Route path="menu" element={<Menu />} />
                </Routes>
              </div>
            }
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
