import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalenderView.css';

const API_URL = 'https://api.magicthegathering.io/v1/cards';

const assignRandomDates = (cards) => {
    return cards.map((card) => ({
        ...card,
        date: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    }));
};

const CalendarView = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setCards(assignRandomDates(data.cards.slice(0, 100)));
            } catch (error) {
                console.error('Failed to fetch cards:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const onDateChange = (newDate) => setDate(newDate);

    const eventsOnDate = cards.filter(card =>
        card.date.toDateString() === date.toDateString()
    );

    return (
        <div className="calendar-view">
            <h2>Magic Card Calendar</h2>
            <Calendar
                onChange={onDateChange}
                value={date}
                next2Label=">>"
                prev2Label="<<"
                tileContent={({ date, view }) => {
                    if (view === 'month') {
                        const card = cards.find(card => card.date.toDateString() === date.toDateString());
                        return card ? <p className="event-marker">{card.name}</p> : null;
                    }
                }}
            />
            <div className="events">
                <h3>Events on {date.toDateString()}</h3>
                {loading ? <p>Loading...</p> : (
                    eventsOnDate.length > 0 ? (
                        eventsOnDate.map(card => (
                            <div key={card.id} className="event-card">
                                <h4>{card.name}</h4>
                                <img
                                    src={card.imageUrl || 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card'}
                                    alt={card.name}
                                />
                            </div>
                        ))
                    ) : <p>No events on this date.</p>
                )}
            </div>
        </div>
    );
};

export default CalendarView;
