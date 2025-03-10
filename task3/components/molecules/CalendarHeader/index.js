import { createElement } from "../../../utils/index.js";
import { Button } from "../../atoms/Button/index.js";

export class CalendarHeader {
    constructor(onPrev, onNext) {
        this.element = createElement('div', { className: 'calendar-header' });

        this.monthLabel = createElement('span', { className: 'month-label' });

        const prevButton = new Button('←', onPrev);
        const nextButton = new Button('→', onNext);

        this.element.append(prevButton.element, this.monthLabel, nextButton.element);
    }

    updateLabel(month, year) {
        this.monthLabel.textContent = `${month} ${year}`;
    }
}
