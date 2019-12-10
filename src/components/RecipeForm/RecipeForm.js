import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import userService from '../../utils/userService';
import recipeService from '../../utils/recipeService';

class SignupForm extends Component {

  state = {
    name: '',
    prepTime: '',
    cookTime: '',
    instructions: '',
    instructionsHtml: '',
    instructionsString: '',
    ingredients: '',
    contributor: '',
    category: '',
    description: '',
    mealPlan: ''
  };

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recipeService.create(this.state);
      // Let <App> know a user has signed up!
      this.showRecipe();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.prepTime && this.state.cookTime && this.state.instructions && this.state.instructionsHtml && this.state.instructionsString && this.state.ingredients && this.state.contributor && this.state.category && this.state.description && this.state.mealPlan);
  }

  render() {
    return (
      <div>
        <header className="header-footer">Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <Button type="submit" variant="success" disabled={this.isFormInvalid()}>Sign Up</Button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;