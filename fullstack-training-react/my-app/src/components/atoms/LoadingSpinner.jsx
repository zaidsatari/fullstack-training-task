import React from "react";
import "./LoadingSpinner.css";

export const LoadingSpinner = ({ visible }) => {
    return visible ? <div className="loading-spinner"></div> : null;
};
