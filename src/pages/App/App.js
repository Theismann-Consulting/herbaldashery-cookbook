import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import UsersPage from '../UsersPage/UsersPage';
import UserEditPage from '../UserEditPage/UserEditPage';
import userService from '../../utils/userService';
import Navigation from '../../components/Navigation/Navigation';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      users: [],
      // recipes: recipeService.getRecipes(),
    }
  }


  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getCurrUser()});
  }

  async componentDidMount(){
    const users = await userService.getUsers();
    this.setState({ users: users.users });
  };

  render() {
    return (
      <div>
        <Navigation 
        user={this.state.user}
        handleLogout={this.handleLogout}
        handleSignupOrLogin={this.handleSignupOrLogin}
        />
          <Switch>
            <Route exact path='/users' render={({ history }) =>
              <UsersPage
                history={history}
                users={this.state.users}
                user={this.state.user}
              />
            }/>    
            <Route exact path='/users/:id' render={(props) => 
              <UserEditPage
                {...props}
                history={props.history}
                users={this.state.users}
                user={this.state.user}
              />
            }/>               
          </Switch>
      </div>
    );
  }
}

export default App;
