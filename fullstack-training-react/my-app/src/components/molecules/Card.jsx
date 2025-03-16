import React, { useState } from "react";
import "./Card.css";
import { Button } from "../atoms/Button.jsx";

export const Card = ({card, isSelected, toggleSelect}) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className={`card ${isSelected ? "selected" : ""}`}>
            <img
                src={card.imageUrl || "path/to/fallback-image.jpg"}
                alt={card.name}
                className="card-image"
            />
            <div className="card-content">
                <h3>{card.name}</h3>
                <p>Mana Cost: {card.manaCost || "N/A"}</p>
                <p>P/T: {card.power || "N/A"} / {card.toughness || "N/A"}</p>

                <Button
                    text={showDetails ? "Show Less" : "Show More"}
                    type="secondary"
                    onClick={() => setShowDetails(!showDetails)}
                />

                {showDetails && (
                    <div className="card-details show">
                        <p><strong>Type:</strong> {card.type}</p>
                        <p><strong>Rarity:</strong> {card.rarity}</p>
                        <p><strong>Set:</strong> {card.setName}</p>
                        <p><strong>Artist:</strong> {card.artist}</p>
                    </div>
                )}

                <Button
                    text={isSelected ? "Deselect" : "Select"}
                    onClick={toggleSelect}
                />
            </div>
        </div>
    );
};

