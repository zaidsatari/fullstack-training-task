console.log('Hello World');

const API_URL = 'https://api.magicthegathering.io/v1/cards';
const FALLBACK_IMAGE = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card";

/**
 * Utility function to create HTML elements dynamically
 */
const createElement = (tag, attributes = {}, textContent = '') => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        element[key] = value;
    });
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
};

/**
 * Function to create and configure the grid container
 */
const setupGridContainer = () => {
    const container = document.getElementById('card-container') || createElement('div', { id: 'card-container' });

    container.innerHTML = '';
    Object.assign(container.style, {
        display: 'grid',
        gap: '10px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        padding: '20px',
    });

    return container;
};

/**
 * Counter with Closure
 */
const createCounter = (count = 0) => {
    const counterElement = createElement('h3', { id: 'selected-counter' }, `Selected: ${count}`);

    return {
        getElement: () => counterElement,
        getCount: () => count,
        increment: () => {
            count++;
            counterElement.innerText = `Selected: ${count}`;
        },
        decrement: () => {
            if (count > 0) count--;
            counterElement.innerText = `Selected: ${count}`;
        },
        reset: () => {
            count = 0;
            counterElement.innerText = `Selected: ${count}`;
        }
    };
};

/**
 * Class for handling button creation and actions
 */
class Button {
    constructor(text, onClick, type = "primary") {
        this.button = createElement('button', {
            textContent: text,
            style: `
                background-color: ${type === "primary" ? 'var(--color-primary)' : "#28a745"};
                border-radius: 8px;
                border: none;
                box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
                color: white;
                cursor: pointer;
                font-size: 14px;
                font-weight: bold;
                margin: 10px;
                padding: 10px 15px;
                text-transform: uppercase;
                transition: all 0.3s ease-in-out;
            `
        });

        this.button.addEventListener("mouseover", () => {
            this.button.style.opacity = "0.9";
            this.button.style.boxShadow = "4px 4px 12px rgba(0, 0, 0, 0.2)";
        });

        this.button.addEventListener("mouseout", () => {
            this.button.style.opacity = "1";
            this.button.style.boxShadow = "2px 2px 8px rgba(0, 0, 0, 0.1)";
        });

        this.button.addEventListener('click', onClick);
    }

    getElement() {
        return this.button;
    }

    setText(text) {
        this.button.textContent = text;
    }
}

/**
 * Fetch Data from API
 */
const fetchCards = async (SIZE = 70) => {
    const spinner = createLoadingSpinner();
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.cards.slice(0, SIZE).map(card => new Card(card));
    } catch (error) {
        console.error('Error fetching cards:', error);
        return [];
    } finally {
        hideLoadingSpinner(spinner);
    }
};

/**
 * Hide the loading spinner
 */
const hideLoadingSpinner = (spinner) => {
    if (spinner) {
        spinner.style.display = 'none';
    }
};

/**
 * Function to create a loading spinner
 */
const createLoadingSpinner = () => {
    const spinner = createElement('div', { id: 'loading-spinner' });
    Object.assign(spinner.style, {
        animation: 'spin 1s linear infinite',
        border: '5px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '50%',
        borderTop: '5px solid #28a745',
        height: '50px',
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50px',
        zIndex: '1000',
    });

    document.body.appendChild(spinner);
    return spinner;
};

/**
 * Generate Card HTML
 */
const generateCardHTML = (card, counter) => {
    const wrapper = createElement('div', {
        className: 'card',
        style: `
            align-items: center;
            background-color: white;
            border-radius: 8px;
            border: 1px solid #ccc;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            display: flex;
            overflow: hidden;
            padding: 12px;
            position: relative;
            transition: transform 0.3s, background-color 0.3s;
        `
    });

    wrapper.addEventListener("mouseover", () => {
        wrapper.style.transform = "scale(1.02)";
    });

    wrapper.addEventListener("mouseout", () => {
        wrapper.style.transform = "scale(1)";
    });

    const img = createElement('img', {
        src: card.imageUrl,
        onerror: function() { this.src = FALLBACK_IMAGE; },
        style: 'width: 100px; height: auto; border-radius: 5px; margin-right: 15px;',
        alt: card.name
    });

    const content = createElement('div', { style: 'flex-grow: 1;' });

    const title = createElement('h3', {}, card.name);
    const manaCost = createElement('p', {}, `Mana Cost: ${card.manaCost || 'N/A'}`);
    const powerToughness = createElement('p', {}, `P/T: ${card.power || 'N/A'} / ${card.toughness || 'N/A'}`);

    const details = createElement('div', {
        style: `
            background: #000;
            border-top: 1px solid #ccc;
            color: #fff;
            display: none;
            font-size: 14px;
            left: 0;
            padding: 5px 30px;
            position: absolute;
            text-align: left;
            top: 0;
            transition: bottom 0.3s ease-in-out;
            width: 90%;
        `
    });
    details.innerHTML = `
        <p>Type: ${card.type}</p>
        <p>Rarity: ${card.rarity}</p>
        <p>Set: ${card.setName}</p>
        <p>Text: ${card.text || 'No description'}</p>
        <p>Artist: ${card.artist}</p>
    `;

    const selectButton = new Button('Select', () => handleBtnCardClick(card, wrapper, selectButton, counter));
    const showMoreButton = new Button('Show More', () => {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
        showMoreButton.setText(details.style.display === 'none' ? 'Show More' : 'Show Less');
    }, "secondary");

    content.append(title, manaCost, powerToughness, selectButton.getElement(), showMoreButton.getElement(), details);
    wrapper.append(img, content);

    card.wrapper = wrapper;
    card.button = selectButton;

    return wrapper;
};

/**
 * Handle Card Selection
 */
const handleBtnCardClick = (card, wrapper, button, counter) => {
    card.toggleSelection();
    wrapper.style.backgroundColor = card.isSelected ? '#d1ffd1' : '#fff';
    button.setText(card.isSelected ? 'Deselect' : 'Select');

    if (card.isSelected) {
        counter.increment();
    } else {
        counter.decrement();
    }
};

/**
 * Card Class (Represents a single card)
 */
class Card {
    constructor(data) {
        this.artist = data.artist;
        this.button = null;
        this.counter = data.counter;
        this.id = data.id;
        this.imageUrl = data.imageUrl || FALLBACK_IMAGE;
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

    draw () {
        const wrapper = createElement('div', {
            className: 'card',
            style: `
                align-items: center;
                background-color: white;
                border-radius: 8px;
                border: 1px solid #ccc;
                box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                display: flex;
                overflow: hidden;
                padding: 12px;
                position: relative;
                transition: transform 0.3s, background-color 0.3s;
            `
        });
    
        wrapper.addEventListener("mouseover", () => {
            wrapper.style.transform = "scale(1.02)";
        });
    
        wrapper.addEventListener("mouseout", () => {
            wrapper.style.transform = "scale(1)";
        });
    
        const img = createElement('img', {
            src: this.imageUrl,
            onerror: function() { this.src = FALLBACK_IMAGE; },
            style: 'width: 100px; height: auto; border-radius: 5px; margin-right: 15px;',
            alt: this.name
        });
    
        const content = createElement('div', { style: 'flex-grow: 1;' });
    
        const title = createElement('h3', {}, this.name);
        const manaCost = createElement('p', {}, `Mana Cost: ${this.manaCost || 'N/A'}`);
        const powerToughness = createElement('p', {}, `P/T: ${this.power || 'N/A'} / ${this.toughness || 'N/A'}`);
    
        const details = createElement('div', {
            style: `
                background: rgba(255, 255, 255, 0.9);
                border-top: 1px solid #ccc;
                color: #333;
                display: none;
                font-size: 14px;
                left: 0;
                padding: 10px;
                position: absolute;
                text-align: left;
                top: 0;
                transition: bottom 0.3s ease-in-out;
                width: 100%;
            `
        });
        details.innerHTML = `
            <p>Type: ${this.type}</p>
            <p>Rarity: ${this.rarity}</p>
            <p>Set: ${this.setName}</p>
            <p>Text: ${this.text || 'No description'}</p>
            <p>Artist: ${this.artist}</p>
        `;
    
        const selectButton = new Button('Select', () => handleBtnCardClick(this, wrapper, selectButton, this.counter));
        const showMoreButton = new Button('Show More', () => {
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
            showMoreButton.setText(details.style.display === 'none' ? 'Show More' : 'Show Less');
        }, "secondary");
    
        content.append(title, manaCost, powerToughness, selectButton.getElement(), showMoreButton.getElement(), details);
        wrapper.append(img, content);
    
        this.wrapper = wrapper;
        this.button = selectButton;
    
        return wrapper;
    };
}

/**
 * CardList Class (Handles the list of cards)
 */
class CardList {
    constructor(counter) {
        this.cards = [];
        this.counter = counter;
    }

    async loadCards() {
        this.cards = await fetchCards();
        this.draw();
    }

    draw() {
        const container = setupGridContainer();
        this.cards.forEach(card => {
            container.appendChild(generateCardHTML(card, this.counter));
        });

        document.body.appendChild(container);
    }

    selectAll() {
        this.cards.forEach(card => {
            if (!card.isSelected) {
                card.isSelected = true;
                card.wrapper.style.backgroundColor = '#d1ffd1';
                card.button.setText('Deselect');
                this.counter.increment();
            }
        });
    }

    deselectAll() {
        this.cards.forEach(card => {
            if (card.isSelected) {
                card.isSelected = false;
                card.wrapper.style.backgroundColor = '#fff';
                card.button.setText('Select');
                this.counter.decrement();
            }
        });
    }
}

/**
 * Function to set up the main layout of the page
 */
const setupLayout = (cardList, counter) => {
    Object.assign(document.body.style, {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        margin: '20px',
    });

    document.body.appendChild(counter.getElement());

    const btnContainer = createElement('div', { style: 'margin: 20px;' });

    const selectAllBtn = new Button('Select All', () => cardList.selectAll());
    const deselectAllBtn = new Button('Deselect All', () => {
        cardList.deselectAll();
        counter.reset();
        
    },'secondary');

    btnContainer.appendChild(selectAllBtn.getElement());
    btnContainer.appendChild(deselectAllBtn.getElement());
    document.body.appendChild(btnContainer);

    const container = setupGridContainer();
    document.body.appendChild(container);
};

/**
 * Page Class (Handles page layout and UI setup)
 */
class Page {
    constructor() {
        this.counter = createCounter(0);
        this.cardList = new CardList(this.counter);
    }

    init() {
        setupLayout(this.cardList, this.counter);
        this.cardList.loadCards();
    }
}

/**
 * Initialize Page
 */
const page = new Page();
page.init();
