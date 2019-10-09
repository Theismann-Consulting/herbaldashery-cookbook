import React from 'react';
import { Row, Col } from 'react-bootstrap';

const RecipeIngredients = (props) =>{
  let ingredients = props.state.recipe.ingredients ?
    props.state.recipe.ingredientsAmount.map((a, idx) =>
      <Row>
        <Col>{a}</Col> 
        <Col>{props.state.recipe.ingredients[idx].name}</Col>
      </Row>)
    :
    "No Ingredients"

  return (
    <div>
      {ingredients}
    </div>
  )
}

export default RecipeIngredients;