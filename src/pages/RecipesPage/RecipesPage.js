import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem, Container, Row } from 'react-bootstrap';
import recipeService from '../../utils/recipeService';
import RecipeEditPage from '../RecipeEditPage/RecipeEditPage';

class RecipesPage extends Component {
  state = {
    recipes: [],
  }

  async componentDidMount(){
    const recipes = await recipeService.getRecipes();
    this.setState({ recipes: recipes.recipes });
  };

    async componentDidUpdate(prevProps, prevState){
    if (this.state.recipes.recipes !== prevState.recipes.recipes) {
      const recipes= await recipeService.getUsers();

      this.setState({ recipes: recipes.recipes });
    }
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Button className="float-right" variant="info" as={ Link } to='/recipes/new'>Create Recipe</Button><br />
        </Row>
        <Row className="justify-content-center">
          {this.state.recipes.map((recipe, idx) =>
          
          <Card style={{ width: '20rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
            <Card.Header className="text-right">{recipe.category}</Card.Header>
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
      </Container>
    );
  };
};

export default RecipesPage;
