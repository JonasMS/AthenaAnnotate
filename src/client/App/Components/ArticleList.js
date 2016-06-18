import React, { PropTypes } from 'react';
import Article from './Article';

const ArticleList = ({ articles, onNoteDelete, onNoteEdit, editText }) => {
  const articleList = articles.map(article => (
    <Article
      key={article.id}
      {...article}
      onNoteDelete={onNoteDelete}
      onNoteEdit={onNoteEdit}
      editText={editText}
    />
      ));
  return (
    <ul>
      {articleList}
    </ul>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  onNoteEdit: PropTypes.func.isRequired,
  onNoteDelete: PropTypes.func.isRequired,
  editText: PropTypes.func.isRequired,
};

export default ArticleList;
