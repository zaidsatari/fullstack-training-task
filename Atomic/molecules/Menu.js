import { setupGridContainer } from "../atoms/setupGridContainer.js";
import { Button } from "../atoms/Button.js";
import { appendItemsToContainer } from "../../Utilities/appendItems.js";

export class Menu {
    constructor() {
        this.cardContainer = document.getElementById("card-container");
        this.menuContainer = setupGridContainer("div", "menu-container");
        this.menuItems = ["Home", "About", "Profile", "Contact", "Settings", "Support"];
        this.closeButton = null;
        this.setupMenu();
    }

    setupMenu() {

        this.cardContainer.style.opacity = "0.50";


        this.createCloseButton();


        appendItemsToContainer(this.menuContainer, this.menuItems);


        document.body.appendChild(this.menuContainer);


        setTimeout(() => {
            this.menuContainer.style.transform = "translateX(0)"; // Slide in from the left
        }, 0);
    }

    createCloseButton() {

        const closeButtonC = new Button('X', (e) => {
            e.preventDefault();
            this.menuContainer.style.transform = "translateX(-100%)";
            setTimeout(() => this.menuContainer.remove(), 300);
            this.cardContainer.style.opacity = "1";
        }, 'secondary');

        this.closeButton = closeButtonC.getElement();
        this.closeButton.style.position = 'absolute';
        this.closeButton.style.top = '10px';
        this.closeButton.style.right = '10px';
        this.closeButton.style.fontSize = '24px';
        this.closeButton.style.fontWeight = 'bold';
        this.closeButton.style.color = 'black';
        this.closeButton.style.textDecoration = 'none';
        this.closeButton.style.cursor = 'pointer';

        this.menuContainer.appendChild(this.closeButton);
    }
}

