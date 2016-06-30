export const createAnnote = (
  target,
  annotations,
  user
) => {
  const url = target.source;
  // TODO: do not use annotations.length to determine
  // annotation id, will be problematic in event of an
  // annotation deletion

  // TODO: add '/' before annoteId if target.souce
  // does not end w/ a '/'
  const annoteId = `/annote${annotations.length}/`;

  return {
    id: url + annoteId + user.id,
    creator: user.id,
    body: '',
    target,
  };
};
