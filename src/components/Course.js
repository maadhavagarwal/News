import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import coursesContext from './context/coursesContext';

function Course() {
  let navigate = useNavigate();
  const context = useContext(coursesContext);
  const { courses, getNews } = context;

  return (
    <Container>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      <Row>
        <Col md={3}>
          <Image src={courses.urlToImage}></Image>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{courses.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>{courses._id}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Author: {courses.author}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>{courses.description}</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Link to={courses.url}>
                <Button className="btn-black btn-sucess">Add to cart</Button>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Course;
