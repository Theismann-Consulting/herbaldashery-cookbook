import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import CategoryForm from '../../components/CategoryForm';

class CategoryEditPage extends Component {
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
          <CategoryForm
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

export default CategoryEditPage;