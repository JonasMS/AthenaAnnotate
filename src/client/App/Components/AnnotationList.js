import React, { PropTypes } from 'react';
import Annotation from './Annotation';

const AnnotationList = (
  {
    id,
    annotations,
    onAnnotationDelete,
    onEditBody,
    onSaveEdit,
    onDeleteBody,
  }
) => {
  const Annotations = annotations.filter(annotation => id === annotation.doc_id);
  const annotationList = Annotations.map(annotation => (
    <Annotation
      key={annotation.id}
      {...annotation}
      onAnnotationDelete={() => onAnnotationDelete(annotation.id)}
      onEditBody={onEditBody}
      onSaveEdit={onSaveEdit}
      onDeleteBody={onDeleteBody}
    />
  ));
  return (
    <ul>
      {annotationList}
    </ul>
  );
};

AnnotationList.propTypes = {
  id: PropTypes.number.isRequired,
  onAnnotationDelete: PropTypes.func.isRequired,
  onEditBody: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  onDeleteBody: PropTypes.func.isRequired,
  annotations: PropTypes.array.isRequired,
};

export default AnnotationList;
