import { createElement } from '../../../utils';
import { CalendarDay } from '../../molecules/CalenderDay';

export class CalendarView {
    constructor() {
        this.cards = []; // Store cards (events)
        this._calendarWrapper = createElement('div', {id: 'calendar-container', className: 'calendar-container'});

        this.currentDate = new Date();
        this.renderCalendar();
    }

    async loadCards() {
        this.cards = Array.from({length: 20}, (_, index) => ({
            id: index + 1,
            name: `Card ${index + 1}`,
            date: this.randomDateInRange(),
        }));

        this.renderCalendar();
    }

    randomDateInRange() {
        const startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
        return new Date(randomTimestamp).toLocaleDateString();
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
        const header = createElement('div', {className: 'calendar-header'});

        const prevButton = createElement('button', {className: 'calendar-nav'}, '<');
        prevButton.addEventListener('click', () => this.changeMonth(-1));

        const monthYearDisplay = createElement('span', {className: 'month-year-display'}, `${this.getMonthName()} ${this.currentDate.getFullYear()}`);

        const nextButton = createElement('button', {className: 'calendar-nav'}, '>');
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
        const grid = createElement('div', {className: 'calendar-grid'});
        const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
        const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

        let dayCounter = 1;
        for (let i = 0; i < totalCells; i++) {
            if (i >= firstDayOfMonth && dayCounter <= daysInMonth) {
                const dayString = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dayCounter).toLocaleDateString();
                const dayEvents = groupedEvents[dayString] || [];
                const calendarDay = new CalendarDay(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dayCounter), dayEvents);
                grid.appendChild(calendarDay.element);
                dayCounter++;
            } else {
                grid.appendChild(createElement('div', {className: 'calendar-day empty'}));
            }
        }

        return grid;
    }

    renderCalendar() {
        this._calendarWrapper.innerHTML = '';
        const groupedEvents = this.groupCardsByDate();

        const calendarHeader = this.createCalendarHeader();
        const calendarGrid = this.createCalendarGrid(groupedEvents);

        this._calendarWrapper.appendChild(calendarHeader);
        this._calendarWrapper.appendChild(calendarGrid);
    }
}

