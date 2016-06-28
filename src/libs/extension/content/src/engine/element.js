class Annote extends HTMLElement {
  createdCallback() {
    // styling
    this.style.backgroundColor = 'yellow';
  }
  addListener (callback) {
    this.addEventListener(
      'click',
      callback
    );
  }
}

const Athena = document.registerElement(
  'athena-annote',
  Annote
);

export default Athena;
