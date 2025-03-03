import {createElement} from "../../Utilities/createElement.js";

export class NavItem {
    constructor(url,classname,text){
        this.url = url;
        this.classname = classname;
        this.text = text;

        this.item = createElement('a',{className:`${this.classname}`},this.text);
        this.item.href = this.url;

    }

    getElement(){
        return this.item
    }
}