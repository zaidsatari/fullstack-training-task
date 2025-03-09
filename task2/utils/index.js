import { Button } from "../components/atoms/Button/index.js";

/**
 * Utility function to create HTML elements dynamically
 */
const createElement = (tag, attributes = {}, textContent = '', styles = {}) => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element[key] = value);
    if (textContent) element.textContent = textContent;
    Object.assign(element.style, styles);
    return element;
};

/**
 * LocalStorage Utility for managing state
 */
class LocalStorageUtil {
    constructor(key) {
        this.key = key;
    }

    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    load() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    clear() {
        localStorage.removeItem(this.key);
    }
}

const cardStorage = new LocalStorageUtil('selectedCards');

/**
 * Counter Class (Handles counting selected items)
 */
class Counter {
    constructor(count = 0) {
        this._count = count;
        this._element = createElement('h3', { id: 'selected-counter' }, `Selected: ${count}`);
    }

    get element() {
        return this._element;
    }

    get count(){ return this._count }
    set count(value){ this._count = value }

    increment() {
        this.count++;
        this.element.innerText = `Selected: ${this.count}`;
    }

    decrement () {
        if (this.count > 0) this.count--;
        this.element.innerText = `Selected: ${this.count}`;
    }

    reset(){
        this.count = 0;
        this.element.innerText = `Selected: ${this.count}`;
    }
}

const createGridOptions = (cards, onRemove, onAdd, onEdit) => {
    return {
        columnDefs: [
            { field: "name", headerName: "Card Name", flex: 2 },
            { field: "power", headerName: "Power", valueGetter: (params) => params.data.power ?? "N/A" },
            { field: "rarity", headerName: "Rarity", flex: 2 },
            { field: "artist", headerName: "Artist", flex: 2 },
            {
                field: "imageUrl",
                headerName: "Image",
                cellRenderer: (params) => `<img src="${params.value || FALLBACK_IMAGE}" alt="Card Image" width="50" />`
            },
            {
                headerName: "Actions",
                cellRenderer: (params) => {
                    const container = document.createElement("div");
                    container.style.display = "flex";
                    container.style.gap = "8px";

                    // Add button ➕
                    const addButton = document.createElement("button");
                    addButton.innerHTML = "➕";
                    addButton.style.cursor = "pointer";
                    addButton.style.border = "none";
                    addButton.style.background = "transparent";
                    addButton.style.fontSize = "16px";
                    addButton.addEventListener("click", () => onAdd(params.data));

                    // Edit button ✏️
                    const editButton = document.createElement("button");
                    editButton.innerHTML = "✏️";
                    editButton.style.cursor = "pointer";
                    editButton.style.border = "none";
                    editButton.style.background = "transparent";
                    editButton.style.fontSize = "16px";
                    editButton.addEventListener("click", () => onEdit(params.data));


                    const deleteButton = document.createElement("button");
                    deleteButton.innerHTML = "❌";
                    deleteButton.style.cursor = "pointer";
                    deleteButton.style.border = "none";
                    deleteButton.style.background = "transparent";
                    deleteButton.style.fontSize = "16px";
                    deleteButton.addEventListener("click", () => onRemove(params.data.id));

                    container.append(addButton, editButton, deleteButton);
                    return container;
                },
                width: 120
            }
        ],
        defaultColDef: {
            flex: 1,
            filter: true,
            floatingFilter: true,
        },
        rowData: cards,
    };
};

function openCardForm(card = null, onSave) {
    const form = document.createElement('div');
    form.innerHTML = `
        <div class="modal">
            <h2>${card ? "Edit Card" : "Add Card"}</h2>
            <label>Name: <input type="text" id="card-name" value="${card?.name || ''}" /></label>
            <label>Power: <input type="text" id="card-power" value="${card?.power || ''}" /></label>
            <label>Rarity: <input type="text" id="card-rarity" value="${card?.rarity || ''}" /></label>
            <label>Artist: <input type="text" id="card-artist" value="${card?.artist || ''}" /></label>
        </div>
    `;

    const saveButton = new Button('Save', () => {
        const updatedCard = {
            id: card ? card.id : Date.now().toString(),
            name: document.getElementById("card-name").value,
            power: document.getElementById("card-power").value,
            rarity: document.getElementById("card-rarity").value,
            artist: document.getElementById("card-artist").value
        };

        onSave(updatedCard);
        form.remove();
    });

    const cancelButton = new Button('Cancel', () => {
        form.remove();
    });

    form.querySelector('.modal').appendChild(saveButton.element);
    form.querySelector('.modal').appendChild(cancelButton.element);

    form.style.position = 'fixed';
    form.style.top = '50%';
    form.style.left = '50%';
    form.style.transform = 'translate(-50%, -50%)';
    form.style.backgroundColor = 'white';
    form.style.padding = '20px';
    form.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
    form.style.zIndex = '1000';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '10px';

    document.body.appendChild(form);
}





export {
    Counter,
    createElement,
    cardStorage,
    LocalStorageUtil,
    createGridOptions,
    openCardForm,
}