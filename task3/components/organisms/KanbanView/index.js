import { MAX_CARDS, DEFAULT_STATUS, COLUMN_STATUSES } from '../../../constants/index.js';
import { createElement, tableStorage } from '../../../utils/index.js';

export class KanbanView {
    constructor() {
        this.data = this.loadLimitedData();
        this.container = createElement('div', { className: 'kanban-view' });

        this.columns = this.createColumns();
        Object.values(this.columns).forEach(column => this.container.appendChild(column));

        this.render();
    }

    loadLimitedData() {
        let storedData = tableStorage.load().slice(0, MAX_CARDS);
        return storedData.map((item, index) => ({
            id: item.id || item.multiverseid || crypto.randomUUID(),
            name: item.name || `Task ${index + 1}`,
            status: COLUMN_STATUSES.includes(item.status) ? item.status : DEFAULT_STATUS,
        }));
    }

    createColumns() {
        const columns = {};
        COLUMN_STATUSES.forEach(status => {
            const columnKey = this.getColumnKey(status);
            columns[columnKey] = this.createColumn(status);
        });
        return columns;
    }

    createColumn(status) {
        const column = createElement('div', {
            className: 'kanban-column',
            'status': status
        });

        const title = createElement('h3', { className: 'kanban-header' }, status);
        title.setAttribute('data-status', status);
        column.appendChild(title);
        column.addEventListener('dragover', (e) => this.onDragOver(e));
        column.addEventListener('drop', (e) => this.onDrop(e));

        return column;
    }

    getColumnKey(status) {
        return status.toLowerCase().replace(/\s+/g, '');
    }

    setData(newData) {
        this.data = newData.slice(0, MAX_CARDS).map((item, index) => ({
            id: item.id,
            status: COLUMN_STATUSES.includes(item.status) ? item.status : DEFAULT_STATUS,
        }));
        tableStorage.save(this.data);
        this.render();
    }

    render() {
        Object.values(this.columns).forEach(column => {
            while (column.children.length > 1) {
                column.removeChild(column.lastChild);
            }
        });

        this.data.forEach((item) => {
            const card = this.createCard(item);
            const column = this.getColumnByStatus(item.status || DEFAULT_STATUS);
            column.appendChild(card);
        });
    }

    createCard(item) {
        const card = createElement('div', {
            className: 'kanban-card',
            draggable: 'true'
        });

        card.setAttribute('data-id', item.id);
        card.setAttribute('data-status', item.status);

        card.textContent = item.name;
        card.addEventListener('dragstart', (e) => this.onDragStart(e));

        return card;
    }

    getColumnByStatus(status) {
        return this.columns[this.getColumnKey(status)] || this.columns[this.getColumnKey(DEFAULT_STATUS)];
    }

    onDragStart(event) {
        const card = event.target;
        const cardId = card.dataset.id;
        const cardStatus = card.dataset.status;
        card.classList.add('dragging');

        if (!cardId || !cardStatus) {
            console.error('❌ Error: Dragged element is missing data-id or data-status', { card });
            return;
        }

        event.dataTransfer.setData('text/plain', cardId);
        event.dataTransfer.setData('status', cardStatus);
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const column = event.target.closest('.kanban-column');
        const newStatus = column ? column.status : null;

        if (!id || !COLUMN_STATUSES.includes(newStatus)) {
            console.error(`❌ Error: Dropping invalid ID (${id}) or column status (${newStatus})`);
            return;
        }

        this.data = this.data.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        );

        tableStorage.save(this.data);
        this.render();
    }

    get element() {
        return this.container;
    }
}
