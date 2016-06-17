import React from 'react';
import Article from './Article';

const ArticleList = ({ articles, onNoteDelete, onNoteEdit, editText }) => (
  <ul>
		{articles.map(article => (
			<Article
        key={article.id}
        {...article}
        onNoteDelete={onNoteDelete}
        onNoteEdit={onNoteEdit}
        editText={editText}
			/>
		))}
  </ul>
);

export default ArticleList;
