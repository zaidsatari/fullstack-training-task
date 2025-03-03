import {createLoadingSpinner, hideLoadingSpinner} from "../Atomic/atoms/spinner.js";
import {Card} from "../Atomic/molecules/Card.js";

const API_URL = "https://api.magicthegathering.io/v1/cards";

/**
 * Fetch Data from API
 */
export const fetchCards = async (SIZE) => {
    const spinner = createLoadingSpinner();
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.cards.slice(0, SIZE).map((card) => new Card(card));
    } catch (error) {
        console.error("Error fetching cards:", error);
        return [];
    } finally {
        hideLoadingSpinner(spinner);
    }
};
