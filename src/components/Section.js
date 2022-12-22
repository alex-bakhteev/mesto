export default class Section {
    constructor({ items, renderer }, cardsContainer) {
        this._items = items;
        this._renderer = renderer;
        this._cardsContainer = document.querySelector(cardsContainer);
    }

    renderElements() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(card) {
        this._cardsContainer.prepend(card);
    }
}
