import { createElement, tableStorage } from "../../../utils/index.js";
import { MAX_VISIBLE_TASKS, DATE_FORMAT_OPTIONS } from '../../../constants/index.js';

export class CalendarDay {
    constructor(date, tasks = [], calendar) {
        this.date = date;
        this.tasks = tasks;
        this.calendar = calendar;
        this.element = this.createDayElement();
    }

    createDayElement() {
        const dayContainer = createElement('div', { className: 'calendar-day', 'data-date': this.date });

        const dateLabel = createElement('span', { className: 'date-label' }, this.date.getDate());

        const taskContainer = createElement('div', { className: 'task-container' });

        this.tasks.slice(0, MAX_VISIBLE_TASKS).forEach(task => {
            const taskElement = createElement('div', { 
                className: 'task', 
                draggable: 'true', 
            }, `${task.name} (${new Date(task.date).toLocaleDateString('en-US', DATE_FORMAT_OPTIONS)})`);
            
            taskElement.setAttribute('data-id', task.id)
            taskElement.addEventListener('dragstart', (e) => this.onDragStart(e));
            taskContainer.appendChild(taskElement);
        });

        if (this.tasks.length > MAX_VISIBLE_TASKS) {
            const moreTasks = createElement('div', { className: 'more-tasks' }, `+${this.tasks.length - MAX_VISIBLE_TASKS} more`);
            taskContainer.appendChild(moreTasks);
        }

        dayContainer.append(dateLabel, taskContainer);
        dayContainer.addEventListener('dragover', (e) => this.onDragOver(e));
        dayContainer.addEventListener('drop', (e) => this.onDrop(e));

        return dayContainer;
    }

    onDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.getAttribute('data-id'));
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event) {
        event.preventDefault();
    
        const taskId = event.dataTransfer.getData('text/plain');
        let targetDate = new Date(this.date);
        targetDate.setDate(targetDate.getDate() + 1);
        targetDate = targetDate.toISOString().split('T')[0];
    
        if (!taskId) {
            console.error("❌ Error: Dropped Task ID is missing.");
            return;
        }
    
        let tasks = tableStorage.load();
        let taskFound = false;
    
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                taskFound = true;
                return { ...task, date: targetDate };
            }
            return task;
        });
    
        if (!taskFound) {
            console.error("❌ Error: Task not found in storage.");
            return;
        }
    
        tableStorage.save(tasks);
    
        if (this.calendar) {
            this.calendar.render();
        } else {
            console.error("❌ Error: Calendar reference is missing.");
        }
    }
    
}
