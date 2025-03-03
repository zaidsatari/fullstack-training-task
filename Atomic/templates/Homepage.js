import {Counter} from "../atoms/Counter.js"
import  {CardList} from "../organisms/CardList.js"
import {setupLayout} from "../../Utilities/setupLayout.js";
import {NavBar} from "../organisms/NavBar.js"

/**
 * Homepage Class (Handles page layout and UI setup)
 */

export class Homepage {
    constructor() {
        this.counter = new Counter(0,'h3','selectedCounter','selected');
        this.cardList = new CardList(this.counter);
        this.header = new NavBar()

    }

    init() {
        this.cardList.loadCards();
        setupLayout(this.cardList, this.counter);
        this.header.draw()
    }
}
