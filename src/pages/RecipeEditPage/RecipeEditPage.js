import React, { Component } from 'react';
import RecipeForm from '../../components/RecipeForm';

class RecipeEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <div className='UserEditPage'>
        <RecipeForm {...this.props} updateMessage={this.updateMessage} />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default RecipeEditPage;