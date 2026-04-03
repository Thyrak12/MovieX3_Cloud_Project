import React from 'react';
import Card from 'react-bootstrap/Card';
import './Swipe.css';

const MovieCard = ({ url, title , onClick}) => (
  <div className='movie-card-wrapper' onClick={onClick} style={{ cursor: 'pointer' }}>
    <Card style={{ width: '15rem' }} className='card'>
      <Card.Img className='card-img' variant="top" src={url} />
      <Card.Body className='card-body'>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  </div>
);

export default MovieCard;