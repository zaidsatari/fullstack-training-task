import {setupGridContainer} from "../atoms/setupGridContainer.js";
import {Image} from "../atoms/Image.js";
import {NavItem} from "../atoms/NavItem.js";
import {Menu} from "../molecules/Menu.js";
import {darkMode} from "../../Utilities/darkMode.js";

export class NavBar {
    constructor(){

    }

    draw(){
       const container = setupGridContainer('div','header-container');
       const iconContainer = setupGridContainer('div','Icon-container');
       const hContainer = setupGridContainer('div','h-container');
       const logBtnContainer = setupGridContainer('div','log-btn-container');
       const itemsContainer = setupGridContainer('div','items-container');
        const burgerIcon = new Image("Atomic/atoms/hamburger-menu-icon-transparent-4.jpg",'burger icon',"burgerIcon",()=>{
            new Menu();
        })
       const logo = new Image("Atomic/atoms/baby-shower-cards-word-art-graphic-element-embellishment-light-green.png",'cards logo',"cards-logo");
        const toggleButton = darkMode()
        const item1 = new NavItem('#','Item','Home');
        const item2 = new NavItem('#','Item','About');
        const item3 = new NavItem('#','Item','Profile');
        const item4 = new NavItem('#','Item','Contact');
        const item5 = new NavItem('#','Item','Settings');
        const item6 = new NavItem('#','Item','Support');
        hContainer.appendChild(logo.getElement());
        iconContainer.appendChild(burgerIcon.getElement());
        itemsContainer.appendChild(item1.getElement());
        itemsContainer.appendChild(item2.getElement());
        itemsContainer.appendChild(item3.getElement());
        itemsContainer.appendChild(item4.getElement());
        itemsContainer.appendChild(item5.getElement());
        itemsContainer.appendChild(item6.getElement());
        logBtnContainer.appendChild(toggleButton.getElement());
        container.appendChild(iconContainer);
        container.appendChild(hContainer);
        container.appendChild(itemsContainer);
        container.appendChild(logBtnContainer);


        document.body.appendChild(container);

    }
}