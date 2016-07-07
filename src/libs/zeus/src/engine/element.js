class Annote extends HTMLElement {
  createdCallback() {
    // styling
    this.style.borderBottom = '3px dotted rgb(0, 149, 221)';
  }
  addListener(cb) {
    this.addEventListener('click', cb);
  }
  addDataProp(prop, value) {
    this.dataset[prop] = value;
  }
}

const Athena = document.registerElement(
  'athena-annote',
  Annote
);

export default Athena;
