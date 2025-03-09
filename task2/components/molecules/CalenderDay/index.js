import { createElement } from '../../../utils';

export class CalendarDay {
    constructor(date, events = []) {
        this.element = createElement('div', { className: 'calendar-day' });

        const dayNumber = createElement('div', { className: 'day-number' }, date.getDate());
        const eventsContainer = createElement('div', { className: 'calendar-events' });

        events.forEach(event => {
            const eventItem = createElement('div', { className: 'calendar-event' }, event.name);
            eventsContainer.appendChild(eventItem);
        });

        this.element.appendChild(dayNumber);
        this.element.appendChild(eventsContainer);
    }
}
