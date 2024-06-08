import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomeScreen({ articles }) {
  return (
    <>
      <h1 className='text-center m-3'>Latest Tech News</h1>
      <hr />
      <Row>
        {articles.map((article, index) => (
          <Col key={index} sm={12} md={6} lg={4} xl={3}>
            <Card style={{maxHeight:"820px"}}>
              <Card.Img src={article.urlToImage}  style={{height:'250px'}} alt="No Image avlable"/>
              <Card.Body>
                <Card.Title><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Text>Published at: {new Date(article.publishedAt).toLocaleString()}</Card.Text>
               <Button className='bg-dark'> <a href={article.url} target="_blank" rel="noopener noreferrer" className='text-light'> Read more</a></Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
