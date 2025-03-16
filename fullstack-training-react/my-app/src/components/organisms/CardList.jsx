import React, { useEffect, useState } from "react";
import "./CardList.css";
import { Card } from "../molecules/Card.jsx";
import { Navbar } from "../NavLink.jsx";
import { Button } from "../atoms/Button.jsx";
import { LoadingSpinner } from "../atoms/LoadingSpinner.jsx";

const API_URL = "https://api.magicthegathering.io/v1/cards";
const FALLBACK_IMAGE = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card";
const STORAGE_KEY = "selectedCards";

export const CardList = () => {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState(new Set(
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    ));
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setCards(data.cards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...selectedCards]));
    }, [selectedCards]);

    const toggleSelect = (id) => {
        setSelectedCards((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            updatedSelected.has(id) ? updatedSelected.delete(id) : updatedSelected.add(id);
            return new Set(updatedSelected);
        });
    };

    const selectAll = () => {
        const allSelected = new Set(cards.map((card) => card.id));
        setSelectedCards(allSelected);
    };

    const deselectAll = () => {
        setSelectedCards(new Set());
    };

    return (
        <div>
            <Navbar toggleMenu={() => setMenuOpen(!menuOpen)} isOpen={menuOpen} />

            <div className="header-container">
                <h1>Card Collection</h1>
                <div className="controls">
                    <Button text="Select All" onClick={selectAll} />
                    <Button text="Deselect All" onClick={deselectAll} />
                    <p>Selected: {selectedCards.size}</p>
                </div>
            </div>

            {loading ? <LoadingSpinner visible={true} /> :
                <div className="card-list">
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            card={{ ...card, imageUrl: card.imageUrl || FALLBACK_IMAGE }}
                            isSelected={selectedCards.has(card.id)}
                            toggleSelect={() => toggleSelect(card.id)}
                        />
                    ))}
                </div>
            }
        </div>
    );
};
