import React from 'react';
import Article from './Article';

const ArticleList = ({ articles, onNoteClick }) => (
  <ul>
		{articles.map(article => (
			<Article
        key={article.id}
        {...article}
        onClick={onNoteClick}
			/>
		))}
  </ul>
);

export default ArticleList;
