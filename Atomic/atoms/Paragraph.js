import {createElement} from "../../Utilities/createElement.js";

export class Paragraph{

    constructor(className,text){
        this.p = createElement("p", {
            className: className,
            textContent: text,
        });
    }

    getElement() {
        return this.p;
    }
}