import { NOTE, HIGHLIGHT, HIGHLIGHT_NOTE } from '../../../common/annoteTypes';

class Annote extends HTMLElement {

  setStyle(type) {
    if (type === NOTE) {
      this.style.borderBottom = '3px dotted rgb(0, 149, 221)';
    } else if (type === HIGHLIGHT || type === HIGHLIGHT_NOTE) {
      this.style.backgroundColor = 'rgba(0, 149, 221, 0.3)';
    }
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
