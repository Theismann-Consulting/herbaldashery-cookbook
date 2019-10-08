import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import UsersPage from '../UsersPage/UsersPage';
import LoginPage from '../LoginPage/LoginPage';
import UserViewPage from '../UserViewPage/UserViewPage';
import UserEditPage from '../UserEditPage/UserEditPage';
import userService from '../../utils/userService';
import Navigation from '../../components/Navigation/Navigation';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
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

  async updateUsers(nextState){
    if (nextState.users === this.state.users) {
      const users = await userService.getUsers();
      this.setState({ users: users.users });
    }
  }

  render() {
    return (
      <div>
        <Navigation 
        user={this.state.user}
        handleLogout={this.handleLogout}
        handleSignupOrLogin={this.handleSignupOrLogin}
        />
          <Switch>
            <Route exact path='/signup' render={({ history }) => 
              <UserEditPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
                
              />
            }/>
            <Route exact path='/login' render={({ history }) => 
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            }/>

            <Route exact path='/users' render={({ history }) =>
              <UsersPage
                history={history}
                users={this.state.users}
                user={this.state.user}
              />
            }/>    
            <Route exact path='/users/:id' render={(props) => 
              <UserViewPage
                {...props}
                history={props.history}
                users={this.state.users}
                user={this.state.user}
              />
            }/>      

            <Route exact path='/users/:id/edit' render={(props) => 
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
