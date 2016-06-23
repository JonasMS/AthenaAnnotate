const tagOpen = '<span>';
const tagClose = '</span>';


export const placeAnnote = (node, annote) => {
  const children = node.childNodes;
  console.log('node: ', node);
  console.log('children: ', children);
  if (children.length > 0) {
    for (var i = 0; i < children.length; i++) {
      placeAnnote(children[i], annote);
    }
  } else if (!!node.textContent) {
    const idx =
    node
    .textContent
    .indexOf(annote);
    console.log('text: ', node.textContent);
    console.log('idx: ', idx);
    if (idx >= 0) { // insert span tags
      node.parentNode.innerHTML =
        tagOpen +
        node
        .textContent
        .substring(
          idx,
          idx + annote.length
        ) +
        tagClose +
        node
        .textContent
        .substring(
          idx + annote.length
        );
    }


  }
};
