import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';
import recipeService from '../../utils/recipeService';
import RecipesList from '../../components/RecipesList';

class RecipesPage extends Component {
  state = {
    recipes: [],
    loading: true,
  }

  async componentDidMount(){
    const recipes = await recipeService.getRecipes();
    this.setState({ 
      recipes: recipes.recipes,
      loading: false,
    });
  };

  async componentDidUpdate(prevProps, prevState){
    if (this.state.recipes.recipes !== prevState.recipes.recipes) {
      const recipes= await recipeService.getRecipes();

      this.setState({ recipes: recipes.recipes });
    }
  }

  render() {
    if(this.state.loading){
      return(
        <div>Loading...</div>
      )
    }
    return (
      <Container>
        <Row className="justify-content-center">
        {this.props.user.role === 'Admin' && <Button className="float-right" variant="info" as={ Link } to='/recipes/new'>Create Recipe</Button>}
        </Row>
       <RecipesList state={this.state}/>
      </Container>
    );
  };
};

export default RecipesPage;
