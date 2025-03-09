import { createElement } from '../../../utils/index.js';
import { API_URL } from '../../../constants/index.js';

export class KanbanView {
    constructor() {
        this._kanbanWrapper = createElement('div', { className: 'kanban-wrapper' });
        this.columns = ['To Do', 'In Progress', 'Done'];
        this.lists = {};
        this.cards = [];
    }

    async loadCards() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            this.cards = data.cards;

            console.log('Loaded cards from API:', this.cards);


            this._kanbanWrapper.innerHTML = '';
            this.columns.forEach((col) => {
                const columnEl = createElement('div', { className: 'kanban-column' });
                const titleEl = createElement('h3', {}, col);
                const listEl = createElement('div', { className: 'kanban-list', id: col });


                listEl.addEventListener('dragover', (e) => e.preventDefault());
                listEl.addEventListener('drop', (e) => this.handleDrop(e, col));

                columnEl.append(titleEl, listEl);
                this._kanbanWrapper.appendChild(columnEl);
                this.lists[col] = listEl;
            });


            this.renderCards();
        } catch (error) {
            console.error("Failed to fetch cards:", error);
        }
    }

    renderCards() {
        console.log('Rendering cards...');

        this.cards.forEach((card) => this.createKanbanCard(card));
    }

    createKanbanCard(card) {
        console.log('Rendering card:', card);
        const cardEl = createElement('div', {
            className: 'kanban-card',
            draggable: true,
            id: card.id,
        }, card.name);


        cardEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.id);
        });

        const listEl = this.lists[card.status] || this.lists['To Do'];
        listEl.appendChild(cardEl);
    }

    handleDrop(event, newStatus) {
        console.log('Dropped card to:', newStatus);
        const cardId = event.dataTransfer.getData('text/plain');
        const cardEl = document.getElementById(cardId);

        if (cardEl) {
            console.log('Card ID:', cardId);
            this.lists[newStatus].appendChild(cardEl);


            const updatedCards = this.cards.map((card) =>
                card.id === cardId ? { ...card, status: newStatus } : card
            );
            this.cards = updatedCards;


            localStorage.setItem('cards', JSON.stringify(updatedCards));
        }
    }
}
