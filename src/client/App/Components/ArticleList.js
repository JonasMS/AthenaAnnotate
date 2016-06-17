import React from 'react';
import Article from './Article';

const ArticleList = ({ articles, onNoteDelete, onNoteEdit }) => (
  <ul>
		{articles.map(article => (
			<Article
        key={article.id}
        {...article}
        onNoteDelete={onNoteDelete}
        onNoteEdit={onNoteEdit}
			/>
		))}
  </ul>
);

export default ArticleList;
