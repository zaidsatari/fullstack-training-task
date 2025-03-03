import {fetchCards} from "../../Utilities/fetchCards.js";
import {setupGridContainer} from "../atoms/setupGridContainer.js";
import {darkMode} from "../../Utilities/darkMode.js";
import {createGridOptions} from "../../Utilities/createGridOptions.js";

const SELECTED_COLOR = "#d1ffd1";
const SIZE = 70;
const WRAPPER_BACKGROUND_COLOR = "#ffffff";


/*
 * CardList Class (Handles the list of cards)
 */

export class CardList {
    constructor(counter) {
        this.cards = [];
        this.counter = counter;
    }

    async loadCards() {
        this.cards = await fetchCards(SIZE);
        this.draw();
    }

    draw() {
        const container = setupGridContainer("div","card-container");

        /*this.cards.forEach((card) => {
            container.appendChild(card.draw(this.counter));

        });*/
        container.style.height = '500px';
        const gridOptions = createGridOptions(this.cards);
        agGrid.createGrid(container,gridOptions);

        document.body.appendChild(container);
    }

selectAll() {
this.cards.forEach((card) => {
    if (!card.isSelected) {
        card.isSelected = true;
        card.wrapper.style.backgroundColor = SELECTED_COLOR;
        card.button.setText("Deselect");
        this.counter.increment();
    }
});
}

deselectAll() {
this.cards.forEach((card) => {
    if (card.isSelected) {
        card.isSelected = false;
        card.wrapper.style.backgroundColor = WRAPPER_BACKGROUND_COLOR;
        card.button.setText("Select");
        this.counter.decrement();
    }
});
}
}
