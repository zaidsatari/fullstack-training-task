import {createElement} from "../../Utilities/createElement.js";

/**
 * Class for handling button creation and actions
 */

const PRIMARY_COLOR = "#007bff";
const SECONDARY_COLOR = "#28a745";

export class Button {
    constructor(text, onClick, type = "primary") {
        this.button = createElement("button", {
            textContent: text,
            className:"btn",
            style: `
                background-color: ${type === "primary" ? PRIMARY_COLOR : SECONDARY_COLOR};
                `,
        });

        this.button.addEventListener("click", onClick);
    }

    getElement() {
        return this.button;
    }

    setText(text) {
        this.button.textContent = text;
    }
}
