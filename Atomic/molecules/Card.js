import {createElement} from "../../Utilities/createElement.js";
import {Button} from "../atoms/Button.js";
import {Image} from "../atoms/Image.js";
import {handleBtnCardClick} from "../../Utilities/handleCardBtn.js";
import {Paragraph} from "../atoms/Paragraph.js";
import {Terograph} from "../atoms/Terograph.js";




/**
 * Card Class (Represents a single card)
 */
export class Card {
    constructor(data) {
        this.artist = data.artist;
        this.button = null;
        this.counter = data.counter;
        this.id = data.id;
        this.imageUrl = data.imageUrl
        this.isSelected = false;
        this.manaCost = data.manaCost;
        this.name = data.name;
        this.power = data.power;
        this.rarity = data.rarity;
        this.setName = data.setName;
        this.text = data.text;
        this.toughness = data.toughness;
        this.type = data.type;
        this.wrapper = null;

    }

    toggleSelection() {
        this.isSelected = !this.isSelected;
    }

    draw(count) {
        const wrapper = createElement("div", {className: "card",});

        const img = new Image(this.imageUrl,this.name,'cardImg');


        const content = createElement("div", { style: "flex-grow: 1;" });

        const title =  new Terograph('subtitle','sub-title',this.name).getElement()

        const manaCost =  new Paragraph('mana-cost',`${this.manaCost || "N/A"}`).getElement()

        const powerToughness = new Paragraph('power-toughness',`P/T: ${this.power || "N/A"} / ${this.toughness || "N/A"}`).getElement()


        const details = createElement("div", {id:"details"});
        details.innerHTML = `
            <p>Type: ${this.type}</p>
            <p>Rarity: ${this.rarity}</p>
            <p>Set: ${this.setName}</p>
            <p>Text: ${this.text || "No description"}</p>
            <p>Artist: ${this.artist}</p>
        `;

        const selectButton = new Button("Select", () => {
            handleBtnCardClick(this, wrapper, selectButton, count);
        });
        const showMoreButton = new Button(
            "Show More",
            () => {
                details.style.display =
                    details.style.display === "none" ? "block" : "none";
                showMoreButton.setText(
                    details.style.display === "none" ? "Show More" : "Show Less",
                );
            },
            "secondary",
        );


        content.append(
            title,
            manaCost,
            powerToughness,
            selectButton.getElement(),
            showMoreButton.getElement(),
            details,
        );
        wrapper.append(img.getElement(), content);

        this.wrapper = wrapper;
        this.button = selectButton;


        return wrapper;
    }
}