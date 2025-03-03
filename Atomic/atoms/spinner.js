import {createElement} from "../../Utilities/createElement.js";

export const createLoadingSpinner = () => {
    const spinner = createElement("div", { id: "loading-spinner" });
    document.body.appendChild(spinner);
    return spinner;
};

/**
 * Hide the loading spinner
 */
export const hideLoadingSpinner = (spinner) => {
    if (spinner) {
        spinner.style.display = "none";
    }
};
