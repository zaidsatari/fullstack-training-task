import { Button } from "../../atoms/Button";
import { InputField } from "../../atoms/InputField";
import { createElement } from "../../../utils";

export class CardForm {
    constructor(card = null, onSave, onCancel) {
        this.form = createElement("div", { className: "card-form" });

        this.nameField = new InputField("Name:", "card-name", card?.name || "");
        this.powerField = new InputField("Power:", "card-power", card?.power || "");
        this.rarityField = new InputField("Rarity:", "card-rarity", card?.rarity || "");
        this.artistField = new InputField("Artist:", "card-artist", card?.artist || "");

        this.saveButton = new Button("Save", () => {
            const updatedCard = {
                id: card ? card.id : Date.now().toString(),
                name: this.nameField.getValue(),
                power: this.powerField.getValue(),
                rarity: this.rarityField.getValue(),
                artist: this.artistField.getValue(),
            };

            onSave(updatedCard);
        });

        this.cancelButton = new Button("Cancel", onCancel, "secondary");

        this.form.append(
            this.nameField.element,
            this.powerField.element,
            this.rarityField.element,
            this.artistField.element,
            this.saveButton.element,
            this.cancelButton.element
        );
    }

    get element() {
        return this.form;
    }
}
