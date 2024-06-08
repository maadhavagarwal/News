import React, { useState, useEffect } from 'react';
import HomeScreen from './screen/HomeScreen';

function ParentComponent() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2024-05-07&sortBy=publishedAt&apiKey=54aa4d61a86145c5bb234d41395f76d3");
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      
      <HomeScreen articles={articles} />
    </div>
  );
}

export default ParentComponent;
