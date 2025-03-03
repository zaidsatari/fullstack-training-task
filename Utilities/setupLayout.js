import {createElement} from "./createElement.js";
import {setupGridContainer} from "../Atomic/atoms/setupGridContainer.js";
import {Button} from "../Atomic/atoms/Button.js";


/*
 * Function to set up the main layout of the page
 */

export const setupLayout = (cardList, counter) => {

    const container = setupGridContainer('div','btnCounter-container');
    document.body.appendChild(container);

    container.appendChild(counter.getElement());

    const btnContainer = createElement("div", { id:"btnContainer",style: "margin: 20px;" },);

    const selectAllBtn = new Button("Select All", () => cardList.selectAll());
    const deselectAllBtn = new Button(
        "Deselect All",
        () => {
            cardList.deselectAll();
            counter.reset();
        },
        "secondary",
    );

    btnContainer.appendChild(selectAllBtn.getElement());
    btnContainer.appendChild(deselectAllBtn.getElement());
    container.appendChild(btnContainer);



};
