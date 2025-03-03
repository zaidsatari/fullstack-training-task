import {createElement} from "../../Utilities/createElement.js";

const FALLBACK_IMAGE = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card";


export class Image{

    constructor(src,alt,className,onClick = ()=>{}){
        this.img = createElement("img", {
            className: className,
            src: src || FALLBACK_IMAGE,
           alt: alt,
        });
        this.img.addEventListener('click', onClick)
    }

    getElement() {
        return this.img;
    }
}