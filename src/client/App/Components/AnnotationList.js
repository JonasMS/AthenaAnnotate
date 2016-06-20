import React, { PropTypes } from 'react';
import Annotation from './Annotation';

const AnnotationList = ({ id, annotations, onAnnotationDelete, onAnnotationEdit, onSaveEdit }) => {
  const Annotations = annotations.filter(annotation => id === annotation.doc_id);
  const annotationList = Annotations.map(annotation => (
    <Annotation
      key={annotation.id}
      {...annotation}
      onAnnotationDelete={() => onAnnotationDelete(annotation.id)}
      onAnnotationEdit={onAnnotationEdit}
      onSaveEdit={onSaveEdit}
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
  onAnnotationEdit: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  annotations: PropTypes.array.isRequired,
};

export default AnnotationList;
