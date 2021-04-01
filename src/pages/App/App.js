import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
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
import CategoryPage from '../CategoryPage/CategoryPage';
import CategoryViewPage from '../CategoryViewPage/CategoryViewPage';
import CategoryEditPage from '../CategoryEditPage/CategoryEditPage';
import userService from '../../utils/userService';
import Navigation from '../../components/Navigation/Navigation';
import HomePage from '../../components/HomePage';
import recipeService from '../../utils/recipeService';



class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      recipes: recipeService.getRecipes(),
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
            <Route exact path='/' render={({ history }) => 
              <HomePage
                history={history}
                state={this.state}
              />
            }/>

            <Route exact path='/login' render={({ history }) => 
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            }/>

            <Route exact path='/signup' render={({ history }) => 
              this.state.user.role === 'Admin' ?
              <UserEditPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
              :
                <Redirect to='/login'/>
            }/>

            <Route exact path='/users' render={({ history }) => (
              this.state.user.role === 'Admin' ?
              <UsersPage
                history={history}
                user={this.state.user}
              />
              :
                <Redirect to='/login'/>
            )}/>    
            <Route exact path='/users/:id' render={(props) => (
              this.state.user.role === 'Admin' ?
              <UserViewPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>      

            <Route exact path='/users/:id/edit' render={(props) => (
              this.state.user.role === 'Admin' ?
              <UserEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>    
            
            <Route exact path='/recipes' render={({ history }) => (
              this.state.user.role ?
              <RecipesPage
                history={history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>    

            <Route exact path='/recipes/new' render={(props) => (
              this.state.user.role === 'Contributor' || this.state.user.role ==='Admin' ?
              <RecipeEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>  
              
            <Route exact path='/recipes/:id' render={(props) => (
              this.state.user.role ?
              <RecipeViewPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>      

            <Route exact path='/recipes/:id/edit' render={(props) => (
              this.state.user.role === 'Contributor' || this.state.user.role ==='Admin'?
              <RecipeEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>    

            <Route exact path='/mealPlans' render={({ history }) => (
              this.state.user.role ?
              <MealPlansPage
                history={history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>    
              
            <Route exact path='/mealPlans/:id' render={(props) => (
              this.state.user.role ?
              <MealPlanViewPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>      

            <Route exact path='/mealPlans/:id/edit' render={(props) => (
              this.state.user.role === 'Contributor' || this.state.user.role ==='Admin' ?
              <MealPlanEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>    

            <Route exact path='/categories' render={({ history }) => (
              this.state.user.role ?
              <CategoryPage
                history={history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>    
              
            <Route exact path='/categories/:id' render={(props) => (
              this.state.user.role ?
              <CategoryViewPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>      

            <Route exact path='/categories/:id/edit' render={(props) => (
              this.state.user.role === 'Contributor' || this.state.user.role ==='Admin' ?
              <CategoryEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            :
                <Redirect to='/login'/>
            )}/>    


          </Switch>
      </div>
    );
  }
}

export default App;
