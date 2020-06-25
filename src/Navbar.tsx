import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="home">
        <Link to="/home">RACEGEX</Link>
      </div>
      <div className="sections">
        <Link to="/play/learn">Learn</Link>
        <Link to="/play/practice">Practice</Link>
        <Link to="/play/compete">Compete</Link>{" "}
      </div>
    </nav>
  );
};

export default Navbar;
