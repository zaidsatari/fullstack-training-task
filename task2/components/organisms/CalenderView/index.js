import { createElement } from '../../../utils/index.js';

export class CalendarView {
    constructor() {
        this._calendarWrapper = createElement('div', { className: 'calendar-wrapper' });
        this.calendar = createElement('div', { id: 'calendar' });

        this.searchInput = createElement('input', {
            type: 'text',
            placeholder: 'Search Events...',
            className: 'calendar-search',
        });

        this.searchInput.addEventListener('input', () => this.filterEvents());

        this._calendarWrapper.append(this.searchInput, this.calendar);
    }

    async loadCards() {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        this.renderCalendar(cards);
    }

    renderCalendar(cards) {
        this.calendar.innerHTML = '';

        const groupedEvents = {};
        cards.forEach((card) => {
            const date = card.date || 'No Date';
            if (!groupedEvents[date]) groupedEvents[date] = [];
            groupedEvents[date].push(card);
        });

        Object.keys(groupedEvents).forEach((date) => {
            const dateSection = createElement('div', { className: 'calendar-day' });
            const dateHeader = createElement('h3', {}, date);

            const eventsContainer = createElement('div', { className: 'calendar-events' });
            groupedEvents[date].forEach((card) => {
                const eventItem = createElement('div', { className: 'calendar-event' }, card.name);
                eventsContainer.appendChild(eventItem);
            });

            dateSection.append(dateHeader, eventsContainer);
            this.calendar.appendChild(dateSection);
        });
    }

    filterEvents() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const events = this.calendar.querySelectorAll('.calendar-event');

        events.forEach((event) => {
            event.style.display = event.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
        });
    }
}
