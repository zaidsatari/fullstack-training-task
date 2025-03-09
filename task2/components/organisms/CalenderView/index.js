import { createElement } from '../../../utils/index.js';

export class CalendarView {
    constructor() {
        this.cards = [];
        this._calendarWrapper = createElement('div', { id: 'calendar-container', className: 'calendar-container' });
        this._calendarWrapper.style.height = '400px';
        this._calendarWrapper.style.width = '100%';

        this.currentDate = new Date();
        this.renderCalendar();
    }

    async loadCards() {
        this.cards = Array.from({ length: 20 }, (_, index) => ({
            id: index + 1,
            name: `Card ${index + 1}`,
            date: this.randomDateInRange(),
        }));

        this.renderCalendar();
    }

    randomDateInRange() {
        const startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1); // Start of current month
        const endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0); // End of current month
        const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        return new Date(randomTimestamp).toLocaleDateString(); // Format as MM/DD/YYYY
    }

    renderCalendar() {
        this._calendarWrapper.innerHTML = '';
        const groupedEvents = this.groupCardsByDate();

        const calendarHeader = this.createCalendarHeader();
        const calendarGrid = this.createCalendarGrid(groupedEvents);

        this._calendarWrapper.appendChild(calendarHeader);
        this._calendarWrapper.appendChild(calendarGrid);
    }

    groupCardsByDate() {
        const groupedEvents = {};

        this.cards.forEach((card) => {
            const date = card.date || 'No Date';
            if (!groupedEvents[date]) groupedEvents[date] = [];
            groupedEvents[date].push(card);
        });

        return groupedEvents;
    }

    createCalendarHeader() {
        const header = createElement('div', { className: 'calendar-header' });

        const prevButton = createElement('button', { className: 'calendar-nav' });
        prevButton.textContent = '<';
        prevButton.addEventListener('click', () => this.changeMonth(-1));

        const monthYearDisplay = createElement('span', { className: 'month-year-display' }, `${this.getMonthName()} ${this.currentDate.getFullYear()}`);

        const nextButton = createElement('button', { className: 'calendar-nav' });
        nextButton.textContent = '>';
        nextButton.addEventListener('click', () => this.changeMonth(1));

        header.appendChild(prevButton);
        header.appendChild(monthYearDisplay);
        header.appendChild(nextButton);

        return header;
    }

    changeMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendar();
    }

    getMonthName() {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[this.currentDate.getMonth()];
    }

    createCalendarGrid(groupedEvents) {
        const grid = createElement('div', { className: 'calendar-grid' });
        const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const daysContainer = createElement('div', { className: 'calendar-days' });

        daysOfWeek.forEach(day => {
            const dayHeader = createElement('div', { className: 'calendar-day-header' }, day);
            daysContainer.appendChild(dayHeader);
        });


        const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
        const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

        let dayCounter = 1;
        for (let i = 0; i < totalCells; i++) {
            const dayCell = createElement('div', { className: 'calendar-day' });

            if (i >= firstDayOfMonth && dayCounter <= daysInMonth) {
                const dayNumber = createElement('div', { className: 'day-number' }, dayCounter);
                const dayString = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dayCounter).toLocaleDateString();

                // Add events for this day
                const eventsContainer = createElement('div', { className: 'calendar-events' });
                if (groupedEvents[dayString]) {
                    groupedEvents[dayString].forEach(card => {
                        const eventItem = createElement('div', { className: 'calendar-event' }, card.name);
                        eventsContainer.appendChild(eventItem);
                    });
                }

                dayCell.appendChild(dayNumber);
                dayCell.appendChild(eventsContainer);
                dayCounter++;
            }

            daysContainer.appendChild(dayCell);
        }

        grid.appendChild(daysContainer);
        return grid;
    }
}
