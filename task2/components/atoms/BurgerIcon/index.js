import { BURGER_ICON_LINES } from '../../../constants';
import { createElement } from '../../../utils';

export class BurgerIcon {
  constructor(onClick) {
    this._burger = createElement('div', { className: 'burger' });
    for (let i = 0; i < BURGER_ICON_LINES; i++) {
      this._burger.appendChild(createElement('div'));
    }
    this._burger.addEventListener('click', onClick);
  }

  get element() {
    return this._burger;
  }
}
