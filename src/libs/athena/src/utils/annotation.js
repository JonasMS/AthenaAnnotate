// TODO: move to engine?

export const createAnnote = (
  target,
  annotations,
  user
) => {
  const url = target.source;
  console.log('target: ', target);
  // const url = window.location.href;

  // TODO: do not use annotations.length to determine
  // annotation id, will be problematic in event of an
  // annotation deletion

  // TODO: add '/' before annoteId if target.souce
  // does not end w/ a '/'
  const annoteId = '/annote' + annotations.length + '/';
  // const {
  //   exact,
  //   prefix,
  //   suffix,
  // } = annotation.target;

  return {
    id: url + annoteId + user.id,
    creator: user.id,
    body: '',
    target,
  };

  // return Object.assign({}, annotation, {
  //   id: url + annoteId + user.id,
  //   createdAt: Date.now(),
  //   creator: user.id,
  //   // target: {
  //   //   source: url,
  //   //   selector: {
  //   //     exact,
  //   //     prefix,
  //   //     suffix,
  //   //   },
  //   // },
  // });
};

// modifyAnnotation
// getAnnoteIdx
// insertAnnote
