import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import UsersPage from '../UsersPage/UsersPage';
import LoginPage from '../LoginPage/LoginPage';
import UserViewPage from '../UserViewPage/UserViewPage';
import UserEditPage from '../UserEditPage/UserEditPage';
import RecipesPage from '../RecipesPage/RecipesPage';
import RecipeViewPage from '../RecipeViewPage/RecipeViewPage';
import RecipeEditPage from '../RecipeEditPage/RecipeEditPage';
import MealPlansPage from '../MealPlansPage/MealPlansPage';
import MealPlanViewPage from '../MealPlanViewPage/MealPlanViewPage';
import MealPlanEditPage from '../MealPlanEditPage/MealPlanEditPage';
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

  componentDidMount(){
    this.setState({
      user: userService.getCurrUser()
    })
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getCurrUser()});
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
                user={this.state.user}
              />
            }/>    
            <Route exact path='/users/:id' render={(props) => 
              <UserViewPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            }/>      

            <Route exact path='/users/:id/edit' render={(props) => 
              <UserEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            }/>    
            
            <Route exact path='/recipes' render={({ history }) =>
              <RecipesPage
                history={history}
                user={this.state.user}
              />
            }/>    

            <Route exact path='/recipes/new' render={(props) => 
              <RecipeEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            }/>  
              
            <Route exact path='/recipes/:id' render={(props) => 
              <RecipeViewPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            }/>      

            <Route exact path='/recipes/:id/edit' render={(props) => 
              <RecipeEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            }/>    

            <Route exact path='/mealPlans' render={({ history }) =>
              <MealPlansPage
                history={history}
                user={this.state.user}
              />
            }/>    
              
            <Route exact path='/mealPlans/:id' render={(props) => 
              <MealPlanViewPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            }/>      

            <Route exact path='/mealPlans/:id/edit' render={(props) => 
              <MealPlanEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            }/>    


          </Switch>
      </div>
    );
  }
}

export default App;
