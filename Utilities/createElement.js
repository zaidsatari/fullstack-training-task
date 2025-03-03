export const createElement = (
    tagName,
    attributes = {},
    textContent = undefined,
    ) => {
    const element = document.createElement(tagName);

    Object.entries(attributes).forEach(([key, value]) => {
        element[key] = value;
    });
    if (textContent ) {
        element.textContent = textContent;
    }

    return element;
};