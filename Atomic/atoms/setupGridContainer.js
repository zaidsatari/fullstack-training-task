import {createElement} from "../../Utilities/createElement.js";

export const setupGridContainer = (tag,Id) => {
    const container =
        document.getElementById(Id) ||
        createElement(tag, { id: Id });

    container.innerHTML = "";

    return container;
};
