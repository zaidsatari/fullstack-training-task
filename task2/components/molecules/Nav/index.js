import { createElement } from '../../../utils';
import { NavLink } from '../../atoms/NavLink';
import { BurgerIcon } from '../../atoms/BurgerIcon';
import { APP_PAGES } from '../../../constants';

export class Nav {
  constructor() {
    this._nav = createElement('nav', { className: 'main-nav' });

    this.linksContainer = createElement('div', { className: 'nav-links' });

    this.links = APP_PAGES.map(({ text, href }) => {
      const link = new NavLink(text, href);
      this.linksContainer.appendChild(link.element);
      return link;
    });

    this.burger = new BurgerIcon(() => this.toggleMenu());
    this._nav.append(this.burger.element, this.linksContainer);

    window.addEventListener('hashchange', () => this.updateActiveLink());
    window.addEventListener('load', () => this.updateActiveLink());
    this.updateActiveLink();
  }

  toggleMenu() {
    this.linksContainer.classList.toggle('open');
  }

  updateActiveLink() {
    const currentPage = location.hash.replace('#', '') || 'home';
    this.links.forEach(link => {
      if (link.href === currentPage) {
        link.element.classList.add('active');
      } else {
        link.element.classList.remove('active');
      }
    });

    this.linksContainer.classList.remove('open');
  }

  setActiveLink(pageName) {
    this.links.forEach(link => {
      if (link.href === pageName) {
        link.element.classList.add('active');
      } else {
        link.element.classList.remove('active');
      }
    });
    this.linksContainer.classList.remove('open');
  }

  get element() {
    return this._nav;
  }
}
