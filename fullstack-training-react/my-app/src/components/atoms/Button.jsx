import React from "react";
import "./Button.css";

export const Button = ({ text, onClick, type = "primary" }) => {
    return (
        <button className={`button-container ${type}`} onClick={onClick}>
            {text}
        </button>
    );
};
