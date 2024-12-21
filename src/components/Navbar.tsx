import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isEventPage = location.pathname.includes("/event/");
  
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Accueil
          </Link>
        </li>
        
        {isEventPage ? (
          <>
            <li>
              <Link
                to="/event/:eventId/dashboard"
                className={location.pathname.includes("/dashboard") ? "active" : ""}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/event/:eventId/tasks"
                className={location.pathname.includes("/tasks") ? "active" : ""}
              >
                Tâches
              </Link>
            </li>
            <li>
              <Link
                to="/event/:eventId/expenses"
                className={location.pathname.includes("/expenses") ? "active" : ""}
              >
                Dépenses
              </Link>
            </li>
            <li>
              <Link
                to="/event/:eventId/providers"
                className={location.pathname.includes("/providers") ? "active" : ""}
              >
                Prestataires
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={location.pathname.includes("/settings") ? "active" : ""}
              >
                Paramètres
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className={location.pathname.includes("/faq") ? "active" : ""}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname.includes("/contact") ? "active" : ""}
              >
                Contact
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
