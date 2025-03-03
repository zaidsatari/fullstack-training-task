const NOT_SELECTED_COLOR = "#fff";
const SELECTED_COLOR = "#d1ffd1";

/**
 * Handle Card Selection
 */
export const handleBtnCardClick = (card, wrapper, button, counter) => {
    card.toggleSelection();
    wrapper.style.backgroundColor = card.isSelected
        ? SELECTED_COLOR
        : NOT_SELECTED_COLOR;
    button.setText(card.isSelected ? "Deselect" : "Select");

    if (card.isSelected) {
        counter.increment();
    } else {
        counter.decrement();
    }
};