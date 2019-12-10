import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, } from 'react-bootstrap';
import mealPlanService from '../../utils/mealPlanService';
import ingredientService from '../../utils/ingredientService';
import RecipesList from '../../components/RecipesList';

class MealPlanViewPage extends Component {
  state = {
    mealPlan: '',
    recipes: '',
    message: '',
    loading: true,

  }

  async componentDidMount() {
    const mealPlan = await mealPlanService.getMealPlan(this.props.match.params.id);
    this.setState({
      mealPlan: mealPlan.mealPlan,
      recipes: mealPlan.mealPlan.recipes,
      loading: false,
    });
  };

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  handleDelete = async (e) => {
    try {
      if(this.props.match && this.props.match.params.id) {
        await mealPlanService.delete(this.props.match.params.id);
        this.props.history.push('/mealPlans');
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
          <Card.Body>
            <Card.Title>{this.state.mealPlan.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{this.state.mealPlan.description}</ListGroupItem>
            <ListGroupItem>
              <RecipesList state={this.state}/>
            </ListGroupItem>
          </ListGroup>
          {this.props.user.role === 'Admin' &&
          <Card.Body>
            <Card.Link as={ Link } to={`/mealPlans/${this.state.mealPlan._id}/edit`}>Edit MealPlan</Card.Link>
            <Card.Link as={ Link } to='/mealPlans' onClick={this.handleDelete}>Delete MealPlan</Card.Link>
          </Card.Body>}
        </Card>
      </div>
    )
  };
};

export default MealPlanViewPage;