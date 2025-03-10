import { cardStorage, createElement, createGridOptions } from '../../../utils';
import { API_URL, DEFAULT_CARD_FETCH_SIZE } from '../../../constants';
import { LoadingSpinner } from '../../atoms/LoadingSpinner';
import { Card } from "../../molecules/Card";
import { CardModal } from "../../organisms/CardModal";

export class GridView {
    constructor() {
        this.cards = [];
        this.spinner = new LoadingSpinner();
        this._cardsWrapper = createElement('div', { id: 'agGrid-container', className: 'ag-container' });
        this._cardsWrapper.style.height = '600px';
        this._cardsWrapper.style.width = '100%';
    }

    async loadCards() {
        this.spinner.show();

        let storedCards = cardStorage.load();

        if (storedCards.length > 0) {
            this.cards = storedCards.map(cardData => new Card(cardData));
        } else {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                this.cards = data.cards.slice(0, DEFAULT_CARD_FETCH_SIZE).map(card => new Card(card));
                cardStorage.save(this.cards.map(card => card.getData()));
            } catch (error) {
                console.error("Failed to fetch cards:", error);
            }
        }

        this.renderCards();
        this.spinner.hide();
    }

    renderCards() {
        this._cardsWrapper.innerHTML = '';

        if (!this.cards.length) {
            this._cardsWrapper.textContent = "No cards available.";
            return;
        }

        const gridOptions = createGridOptions(
            this.cards,
            this.removeCard.bind(this),
            this.addCard.bind(this),
            this.editCard.bind(this)
        );

        this.gridOptions = agGrid.createGrid(this._cardsWrapper, gridOptions);
    }

    removeCard(cardId) {
        this.cards = this.cards.filter(card => card.id !== cardId);
        this.renderCards();
    }

    addCard() {
        const modal = new CardModal(null, (updatedCard) => {
            const newCard = new Card({
                id: Date.now().toString(),
                name: updatedCard.name,
                power: updatedCard.power,
                rarity: updatedCard.rarity,
                artist: updatedCard.artist
            });

            this.cards.push(newCard);
            this.renderCards();
        });

        modal.open();
    }

    editCard(cardData) {
        const modal = new CardModal(cardData, (updatedCard) => {
            this.cards = this.cards.map(card =>
                card.id === updatedCard.id ? { ...card, ...updatedCard } : card
            );
            this.renderCards();
        });

        modal.open();
    }
}
