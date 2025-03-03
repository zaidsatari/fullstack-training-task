import {createElement} from "../../Utilities/createElement.js";
import {Paragraph} from "./Paragraph.js";

export class Terograph{

    constructor(type,className,text) {
        if (type.toUpperCase() === 'TITLE') {
            this.tero = createElement("h6", {
                className: className,
                textContent: text,
            })
        } else if (type.toUpperCase() === 'SUBTITLE') {
            this.tero = createElement("h3", {
                className: className,
                textContent: text,
            })
        } else
        {
            this.tero = new Paragraph(className, text);
        }
    }

    getElement() {
        return this.tero;
    }
}