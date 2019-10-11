import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import MealPlanForm from '../../components/MealPlanForm';

class MealPlanEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      edit: true,
    }
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <Container>
        <div className='UserEditPage'>
          <MealPlanForm
            {...this.props}
            updateMessage={this.updateMessage}
            state={this.state}
            />
          <p>{this.state.message}</p>
        </div>
      </Container>
    );
  };
};

export default MealPlanEditPage;