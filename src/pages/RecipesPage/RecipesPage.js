import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import recipeService from '../../utils';

class App extends Component {
  state = {
    recipe: '',
    recipes: [],
  };

  getRecipe = (id) => this.state.starships[id];

  async componentDidMount() {
    const recipes = await recipeService.getAllRecipes();
    this.setState({ receipes: recipes.results });
  };

  render() {
    return(
      <div className="RecipesPage">
        <Switch>
          <Route exact path='/' render={() => 
            <section>
              {this.state.starships.map((starship, idx) => 
                <Link
                  to={`/starships/${idx}`}
                  key={starship.name}
                >
                  {starship.name}
                </Link>
              )}
            </section>
          }/>
          <Route path='/starships/:idx' render={(props) => 
            <StarshipPage
              {...props}
              getStarship={this.getStarship}
            />
          }/>
        </Switch>
      </div>
    );
  };
};

export default App;