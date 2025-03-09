import { CardForm } from "../../molecules/CardForm";
import { createElement } from "../../../utils";

export class CardModal {
    constructor(card = null, onSave) {
        this.modal = createElement("div", { className: "modal-container" });

        this.form = new CardForm(card, (updatedCard) => {
            onSave(updatedCard);
            this.close();
        }, () => this.close());

        this.modal.append(this.form.element);
    }

    open() {
        document.body.appendChild(this.modal);
    }

    close() {
        this.modal.remove();
    }
}
