import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { isProperty } from '@babel/types';

const RecipeIngredients = (props) =>{
  let ingredients = props.state.recipe.ingredients > 0 ?
    props.state.recipe.ingredients.map((i) => 
      <Row>
        <Col>{i.amount}</Col>
        <Col>{i.name}</Col>
      </Row>
    )
    :
    "No Ingredients"

  return (
    <div>
      {ingredients}
    </div>
  )
}

export default RecipeIngredients;