import React from "react";
import "./NavBar.css";

export const Navbar = ({ menuOpen, toggleMenu }) => {
    return (
        <nav className={`navbar ${menuOpen ? "open" : ""}`}>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Cards</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    );
};
