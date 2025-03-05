console.log('Hello World');

const API_URL = 'https://api.magicthegathering.io/v1/cards';
const FALLBACK_IMAGE = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card";

const DEFAULT_CARD_FETCH_SIZE = 70;
const INITIAL_COUNTER = 0;
const BURGER_ICON_LINES = 3;

const CARD_TEXT = {
    DESELECT_ALL: 'Deselect ALL',
    DE_SELECT: 'Deselect',
    SELECT_ALL: 'Select All',
    SELECT: 'Select',
    SELECTED: 'Selected',
    SHOW_LESS: 'Show Less',
    SHOW_MORE: 'Show More',
}

const APP_PAGES = [
    { text: 'Home', href: 'home' },
    { text: 'About Us', href: 'about-us' },
    { text: 'Profile', href: 'profile' },
  ];
export {
    APP_PAGES,
    API_URL,
    BURGER_ICON_LINES,
    CARD_TEXT,
    DEFAULT_CARD_FETCH_SIZE,
    FALLBACK_IMAGE,
    INITIAL_COUNTER,
}