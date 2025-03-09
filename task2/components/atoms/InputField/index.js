import { createElement } from "../../../utils";

export class InputField {
    constructor(labelText, id, value = "") {
        this.container = createElement("div", { className: "input-group" });

        this.label = createElement("label", { for: id, textContent: labelText });

        this.input = createElement("input", {
            type: "text",
            id: id,
            value: value
        });

        this.container.append(this.label, this.input);
    }

    get element() {
        return this.container;
    }

    getValue() {
        return this.input.value;
    }
}
