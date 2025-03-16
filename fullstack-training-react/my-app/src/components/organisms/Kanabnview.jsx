import React, { useEffect, useState } from "react";
import "./KanbanView.css";

const API_URL = 'https://api.magicthegathering.io/v1/cards';

const COLUMNS = ["To Do", "In Progress", "Done"];

export const KanbanView = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                const storedCards = JSON.parse(localStorage.getItem("cards")) || data.cards.map(card => ({ ...card, status: "To Do" }));
                setCards(storedCards);
            } catch (error) {
                console.error("Failed to fetch cards:", error);
            }
        };

        fetchCards();
    }, []);

    const handleDrop = (event, newStatus) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData("text/plain");
        const updatedCards = cards.map((card) =>
            card.id === cardId ? { ...card, status: newStatus } : card
        );
        setCards(updatedCards);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
    };

    const handleDragStart = (event, cardId) => {
        event.dataTransfer.setData("text/plain", cardId);
    };

    return (
        <div className="kanban-wrapper">
            {COLUMNS.map((col) => (
                <div key={col} className="kanban-column">
                    <h3>{col}</h3>
                    <div
                        className="kanban-list"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, col)}
                    >
                        {cards.filter((card) => card.status === col).map((card) => (
                            <div
                                key={card.id}
                                className="kanban-card"
                                draggable
                                onDragStart={(e) => handleDragStart(e, card.id)}
                            >
                                {card.name || "Unnamed Card"}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};