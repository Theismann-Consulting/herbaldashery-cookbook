import React, { Component } from 'react';
import { Button, Form, Container, Toast } from 'react-bootstrap';
import ingredientService from '../utils/ingredientService';
import 'react-quill/dist/quill.snow.css';


class IngredientForm extends Component {

  state = {
    name: '',
    contributor: '',
    greeting: 'Add New Ingredient',
    message:'',
  };

  async componentDidMount(){
    if(this.props.match && this.props.match.params.id) {
      const ingredient = await ingredientService.getIngredient(this.props.match.params.id);
      console.log(ingredient);
      this.setState({
        name: ingredient.ingredient.name,
        contributor: ingredient.ingredient.contributor,
        greeting: `Edit ${ingredient.ingredient.name} ingredient`,
        
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(this.props.match && this.props.match.params.id) {
        await ingredientService.update(this.state, this.props.match.params.id);
        this.props.history.push(`/ingredients/${this.props.match.params.id}`);
      } else {
        await ingredientService.create(this.state);
        this.props.updateIngredients();
        this.updateMessage('Ingredient Created Successfully');
        setTimeout(function(){this.updateMessage('')}.bind(this),3000);
      }
    } catch (err) {
      this.updateMessage(err.message);
      setTimeout(function(){this.updateMessage('')}.bind(this),3000);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
        <div>
        <h3>{this.state.greeting}</h3>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Ingredient Name</Form.Label>
              <Form.Control name="name" placeholder="Full Name" onChange={this.handleChange} value={this.state.name || ''} />
            </Form.Group>
            <Button className='btn-sm float-right' variant="success" type="submit" onClick={this.handleSubmit}>
              Create
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;{this.state.message}
          </Form>
        </div>
    );
  }
}

export default IngredientForm;