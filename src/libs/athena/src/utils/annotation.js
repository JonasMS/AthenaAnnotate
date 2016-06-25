// TODO: move to engine?

export const createAnnote = ({
  annotation,
  annotations,
  user,
}) => {
  const url = window.location.href;
  const annoteId =
    'annote' + annotations.length + '/';
  const {
    exact,
    prefix,
    suffix,
  } = annotation.target;

  return Object.assign({}, annotation, {
    id: url + annoteId + user.id,
    createdAt: Date.now(),
    creator: user.id,
    target: {
      source: url,
      selector: {
        exact,
        prefix,
        suffix,
      },
    },
  });
};

// modifyAnnotation
// getAnnoteIdx
// insertAnnote
