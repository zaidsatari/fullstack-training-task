import React from "react";

export const Navbar = ({ toggleMenu, isOpen }) => (
    <nav className="navbar">
        <h1>Card Collection</h1>
        <div className="burger" onClick={toggleMenu}>
            <div className={isOpen ? "line open" : "line"}></div>
            <div className={isOpen ? "line open" : "line"}></div>
            <div className={isOpen ? "line open" : "line"}></div>
        </div>
    </nav>
);
