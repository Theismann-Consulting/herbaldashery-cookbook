import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem, Table, Row, Col } from 'react-bootstrap';
import recipeService from '../../utils/recipeService';
import ingredientService from '../../utils/ingredientService';
import RecipeIngredients from '../../components/RecipeIngredients';

class RecipeViewPage extends Component {
  state = {
    recipe: '',
    message: '',
    loading: true,

  }

  async componentDidMount() {
    const recipe = await recipeService.getRecipe(this.props.match.params.id);
    this.setState({
      recipe: recipe.recipe,
      loading: false,
    });
  };

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  handleDelete = async (e) => {
    try {
      if(this.props.match && this.props.match.params.id) {
        await recipeService.delete(this.props.match.params.id);
        this.props.history.push('/recipes');
      };
    } catch (err) {
      this.updateMessage(err.message);
    }
  }

  getName = async (i) => {
   let ingredient = await ingredientService.getIngredient(i);
   console.log(ingredient);
   return ingredient.ingredient.name;
  };

  render() {
    if(this.state.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="body">
      <h3>{this.state.message}</h3>
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
          <Card.Header className="text-right">{this.state.recipe.category.map((c) =>
          c.name)}</Card.Header>
          <Card.Body>
            <Card.Title>{this.state.recipe.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{this.state.recipe.description}</ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col className="font-weight-bold">Prep Time:</Col>
                <Col className="font-weight-bold">Cook Time:</Col>
              </Row>
              <Row>
                <Col>{this.state.recipe.prepTime} Min</Col>
                <Col>{this.state.recipe.cookTime} Min</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem dangerouslySetInnerHTML={{__html: this.state.recipe.instructionsHtml}}></ListGroupItem>
            <ListGroupItem>
              <Row>
              <Col className="font-weight-bold">Ingredients:</Col>
              </Row>
              <RecipeIngredients state={this.state} />
            </ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link as={ Link } to={`/recipes/${this.state.recipe._id}/edit`}>Edit Recipe</Card.Link>
            <Card.Link as={ Link } to='/recipes' onClick={this.handleDelete}>Delete Recipe</Card.Link>
          </Card.Body>
        </Card>
      </div>
    )
  };
};

export default RecipeViewPage;