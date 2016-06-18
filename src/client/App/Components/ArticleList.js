import React, { PropTypes } from 'react';
import Article from './Article';

const ArticleList = ({ articles }) => {
  const articleList = articles.map(article => (
    <Article
      key={article.id}
      {...article}
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
};

export default ArticleList;
