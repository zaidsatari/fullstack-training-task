import {NavItem} from "../Atomic/atoms/NavItem.js";

export const appendItemsToContainer = (container, items) => {
    items.forEach((text) => {
        const menuItem = new NavItem("#", "menu-item", text);
        const menuContainer = document.getElementById('menu-container');
        const cardContainer = document.getElementById('card-container');
        if (text === "Home") {
            menuItem.getElement().addEventListener('click', () => {

                menuContainer.style.transform = "translateX(-100%)";
                setTimeout(() => menuContainer.remove(), 300);
                cardContainer.style.opacity = "1";
            });
        } else {

            menuItem.getElement().addEventListener('click', () => {
                console.log(`${text} clicked`);
            });
        }
        container.appendChild(menuItem.getElement());
    });
};