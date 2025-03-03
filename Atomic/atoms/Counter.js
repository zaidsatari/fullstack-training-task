import {createElement} from "../../Utilities/createElement.js";


export class Counter{
    constructor(count = 0,tag,id,text){
        this.count = count;
        this.text = text;
        this.counterElement = createElement(
            tag,
            { id: id },
            `${this.text}:${this.count}`
        );
    }
    getElement = () => this.counterElement

    getCount = () => this.count

    increment = () => {
    this.count++;
    this.counterElement.innerText = `${this.text}: ${this.count}`;
    }

    decrement = () => {
    if (this.count > 0) this.count--;
    this.counterElement.innerText = `${this.text}: ${this.count}`;
    }

    reset = () => {
    this.count = 0;
    this.counterElement.innerText = `${this.text}: ${this.count}`;
    }
}