import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

function RecipesList(props){

  return(
      <Row className="justify-content-center">
        {props.state.recipes.map((recipe, idx) =>
        
        <Card style={{ width: '20rem' }}>
          {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
          <Card.Header className="text-right">{recipe.category[0].name}</Card.Header>
          <Card.Body>
            <Card.Title>{ recipe.name }</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{recipe.description}</ListGroupItem>
          </ListGroup>
          <Card.Body>
          <Button variant="info" as={ Link } to={`/recipes/${recipe._id}`}>View Recipe</Button>
          </Card.Body>
        </Card>
        )}
      </Row>
  )
}

export default RecipesList;