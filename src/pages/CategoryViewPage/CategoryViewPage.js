import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import categoryService from '../../utils/categoryService';
import ingredientService from '../../utils/ingredientService';
import RecipesList from '../../components/RecipesList';

class CategoryViewPage extends Component {
  state = {
    category: '',
    recipes: '',
    message: '',
    loading: true,

  }

  async componentDidMount() {
    const category = await categoryService.getCategory(this.props.match.params.id);
    this.setState({
      category: category.category,
      recipes: category.category.recipes,
      loading: false,
    });
  };

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  handleDelete = async (e) => {
    try {
      if(this.props.match && this.props.match.params.id) {
        await categoryService.delete(this.props.match.params.id);
        this.props.history.push('/categories');
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
            <Card.Title>{this.state.category.name}</Card.Title>
          </Card.Body>
          <Card.Body>
          <RecipesList state={this.state}/>
          </Card.Body>
          {this.props.user.role === 'Admin' &&
          <Card.Body>
            <Card.Link as={ Link } to={`/categories/${this.state.category._id}/edit`}>Edit Category</Card.Link>
            <Card.Link as={ Link } to='/categories' onClick={this.handleDelete}>Delete Category</Card.Link>
          </Card.Body>}
        </Card>
      </div>
    )
  };
};

export default CategoryViewPage;