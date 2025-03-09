import { CardList } from '../../organisms/CardList/index.js';
import { GridView } from '../../organisms/GridView/index.js';
import { KanbanView } from '../../organisms/KanbanBoard/index.js';
import { CalendarView } from '../../organisms/CalenderView/index.js';
import { Button } from '../../atoms/Button/index.js';
import { INITIAL_COUNTER, CARD_TEXT } from '../../../constants/index.js';
import { Counter, cardStorage, createElement } from '../../../utils/index.js';

export class HomePage {
    constructor() {
        this.counter = new Counter(INITIAL_COUNTER);
        this.cardList = new CardList(this.counter);
        this.gridView = new GridView();
        this.kanbanView = new KanbanView();
        this.calendarView = new CalendarView();

        this.currentView = 'list';
        this.pageContent = null;
    }

    async init(pageContent) {
        this.pageContent = pageContent;
        await this.cardList.loadCards();
        await this.gridView.loadCards();
        await this.kanbanView.loadCards();
        await this.calendarView.loadCards();
        this.draw();
    }

    draw() {
        if (!this.pageContent) return;

        this.pageContent.innerHTML = '';


        const counterWrapper = createElement('div', { className: 'counter-wrapper' });
        const counterBtnContainer = createElement('div', { className: 'counter-btn-container' });

        const selectAllButton = new Button(CARD_TEXT.SELECT_ALL, () => this.cardList.selectAll());
        const deselectAllButton = new Button(CARD_TEXT.DESELECT_ALL, () => this.handleDeselectAll(), 'secondary');


        counterBtnContainer.append(
            selectAllButton.element,
            deselectAllButton.element,

        );

        counterWrapper.appendChild(this.counter.element);
        counterWrapper.appendChild(counterBtnContainer);
        this.pageContent.append(counterWrapper);


        const viewToggleContainer = createElement('div', { className: 'view-toggle-container' });

        const toggleGridButton = new Button('Grid View', () => this.switchView('grid'));
        const toggleListButton = new Button('List View', () => this.switchView('list'));
        const toggleKanbanButton = new Button('Kanban View', () => this.switchView('kanban'));
        const toggleCalendarButton = new Button('Calendar View', () => this.switchView('calendar'));

        viewToggleContainer.append(
            toggleListButton.element,
            toggleGridButton.element,
            toggleKanbanButton.element,
            toggleCalendarButton.element
        );


        viewToggleContainer.style.display = 'flex';
        viewToggleContainer.style.justifyContent = 'space-between';
        viewToggleContainer.style.marginTop = '10px';

        const buttons = viewToggleContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.marginRight = '10px';
        });


        this.pageContent.append(viewToggleContainer);


        switch (this.currentView) {
            case 'grid':
                counterWrapper.style.display = 'none';
                counterBtnContainer.style.display = 'none';
                this.pageContent.append(this.gridView._cardsWrapper);
                break;
            case 'kanban':
                counterWrapper.style.display = 'none';
                counterBtnContainer.style.display = 'none';
                this.pageContent.append(this.kanbanView._kanbanWrapper);
                break;
            case 'calendar':
                counterWrapper.style.display = 'none';
                counterBtnContainer.style.display = 'none';
                this.pageContent.append(this.calendarView._calendarWrapper);
                break;
            default:
                this.pageContent.append(this.cardList.cardsWrapper);
        }
    }

    switchView(view) {
        this.currentView = view;
        this.draw();
    }

    handleDeselectAll() {
        this.cardList.deselectAll();
        this.counter.reset();
        cardStorage.save([]);
    }
}
