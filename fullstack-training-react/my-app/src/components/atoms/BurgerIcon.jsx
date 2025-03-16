import React from "react";
import "./BurgerIcon.css";

export const BurgerIcon = ({ toggleMenu }) => {
    return (
        <div className="burger-icon" onClick={toggleMenu}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    );
};
