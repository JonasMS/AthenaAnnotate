class Annote extends HTMLElement {
  createdCallback() {
    // styling
    this.style.backgroundColor = 'yellow';
  }
  addListener (cb) {
    this.addEventListener('click', cb);
  }
}

const Athena = document.registerElement(
  'athena-annote',
  Annote
);

export default Athena;
