import React, { Component } from 'react';
import UserForm from '../../components/UserForm';
import { Container } from 'react-bootstrap';

class UserEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''}
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <Container>
      <div className='UserEditPage'>
        <UserForm {...this.props} updateMessage={this.updateMessage} />
        <p>{this.state.message}</p>
      </div>
      </Container>
    );
  }
}

export default UserEditPage;