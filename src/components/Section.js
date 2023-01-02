export default class Section {
    constructor({ renderer }, cardsContainer) {
        this._renderer = renderer;
        this._cardsContainer = document.querySelector(cardsContainer);
    }

    renderElements(cards) {
        cards.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._cardsContainer.prepend(element);
    }
}
