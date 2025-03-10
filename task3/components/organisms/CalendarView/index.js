import { MAX_TASKS } from '../../../constants/index.js';
import { createElement, tableStorage } from '../../../utils/index.js';
import { CalendarDay } from '../../atoms/CalendarDay/index.js';
import { CalendarHeader } from '../../molecules/CalendarHeader/index.js';

export class CalendarView {
    constructor() {
        this.container = createElement('div', { className: 'calendar-view' });

        this.currentDate = new Date();
        this.tasks = this.loadTasks();
        this.header = new CalendarHeader(() => this.changeMonth(-1), () => this.changeMonth(1));
        this.daysContainer = createElement('div', { className: 'calendar-days' });

        this.container.append(this.header.element, this.daysContainer);
        this.render();
    }

    loadTasks() {
        let tasks = tableStorage.load() || [];

        tasks = tasks.slice(0, MAX_TASKS);

        if (tasks.length === 0) {
            tasks = this.generatePlaceholderTasks(MAX_TASKS);
        }

        return this.assignUniqueDates(tasks);
    }

    generatePlaceholderTasks(count) {
        return Array.from({ length: count }, (_, index) => ({
            id: crypto.randomUUID(),
            name: `Task ${index + 1}`
        }));
    }

    assignUniqueDates(tasks) {
        const uniqueDates = this.generateUniqueDates(tasks.length);
        return tasks.map((task, index) => ({
            ...task,
            date: task.date || uniqueDates[index]
        }));
    }

    generateUniqueDates(count) {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        this.shuffleArray(days);

        return Array.from({ length: count }, (_, index) => {
            const day = days[index % days.length];
            return new Date(year, month, day).toISOString().split('T')[0];
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    render() {
        this.daysContainer.innerHTML = '';

        this.tasks = this.assignUniqueDates(tableStorage.load().slice(0, MAX_TASKS) || []);

        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

        this.header.updateLabel(
            firstDay.toLocaleString('default', { month: 'long' }),
            this.currentDate.getFullYear()
        );

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);

            const tasksForDay = this.tasks.filter(task =>
                new Date(task.date).toDateString() === date.toDateString()
            );

            const dayElement = new CalendarDay(date, tasksForDay, this).element;
            this.daysContainer.appendChild(dayElement);
        }

        tableStorage.save(this.tasks);
    }

    changeMonth(offset) {
        this.currentDate.setMonth(this.currentDate.getMonth() + offset);
        this.render();
    }

    get element() {
        return this.container;
    }
}
