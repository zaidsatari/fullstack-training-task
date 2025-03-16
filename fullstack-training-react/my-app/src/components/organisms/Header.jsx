import React, { useState } from "react";
import { Navbar } from "../molecules/NavBar.jsx";
import { BurgerIcon } from "../atoms/BurgerIcon.jsx";
import "./Header.css";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>My Card Collection</h1>
            </div>
            <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
            <BurgerIcon toggleMenu={toggleMenu} />
        </header>
    );
};

export default Header;
