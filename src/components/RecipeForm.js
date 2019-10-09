import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Col } from 'react-bootstrap';
import recipeService from '../utils/recipeService';
import ingredientService from '../utils/ingredientService';
import categoryService from '../utils/categoryService';
import mealPlanService from '../utils/mealPlanService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import IngredientForm from './IngredientForm';


class RecipeForm extends Component {

  state = {
    name: '',
    prepTime: '',
    cookTime: '',
    instructions: '',
    instructionsHtml: '',
    instructionsString: '',
    ingredients: [],
    ingredientsAmount: [],
    ingredientsName: [],
    contributor: '',
    category: [],
    description: '',
    mealPlan: [],
    greeting: 'Create a New Recipe',
    allIngredients: [],
    allCategories: [],
    allMealPlans: [],
    message: '',
    ingredientForm: false,
    ingredientsInput: {},
    ingredientsAmountInput: '',
  };

  quill = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        ['link', 'image', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    },

    placeholder: 'What steps are needed to make the recipe...',
  };

  triggerIngredientForm = () => {
    this.setState( {
        ...this.state,
        ingredientForm: true,
    })
  }

  closeIngredientForm = () => {
    this.setState( {
        ...this.state,
        ingredientForm: false,
    })
  }

  async componentDidMount(){
    const ingredients = await this.getAllIngredients();
    const categories = await this.getAllCategories();
    const mealPlans = await this.getAllMealPlans();
    this.setState({
      allIngredients: ingredients.ingredients,
      allCategories: categories.categories,
      allMealPlans: mealPlans.mealPlans,
    })
    if(this.props.match && this.props.match.params.id) {
      const recipe = await recipeService.getRecipe(this.props.match.params.id);
      await this.setState({
        name: recipe.recipe.name,
        prepTime: recipe.recipe.prepTime,
        cookTime: recipe.recipe.cookTime,
        instructions: recipe.recipe.instructions,
        ingredients: recipe.recipe.ingredients,
        ingredientsAmount: recipe.recipe.ingredientsAmount,
        contributor: recipe.recipe.contributor,
        category: recipe.recipe.category,
        description: recipe.recipe.description,
        mealPlan: recipe.recipe.mealPlan,
        greeting: `Edit ${recipe.recipe.name} Recipe`,        
      })
    }
  }

  updateIngredients = async () => {
      const ingredients= await this.getAllIngredients();
      this.setState({ allIngredients: ingredients.ingredients });
  }
  instructions = {}

  async getAllIngredients() {
    return await ingredientService.getIngredients();
  };

  async getAllCategories() {
    return await categoryService.getCategories();
  };

  async getAllMealPlans() {
    return await mealPlanService.getMealPlans();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  quillHandleChange = (content, delta, source, editor) => {
    this.instructions.delta = editor.getContents(content);
    this.instructions.html = content;
    this.instructions.string = editor.getText(content);
  }

  quillSave = () => {
    this.setState({
      instructions: this.instructions.delta,
      instructionsHtml: this.instructions.html,
      instructionsString: this.instructions.string,
    })
    this.updateMessage("Instructions Saved")
    setTimeout(function(){this.updateMessage('')}.bind(this),3000);
  }
  

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(this.props.match && this.props.match.params.id) {
        await recipeService.update(this.state, this.props.match.params.id);
        this.props.history.push(`/recipes/${this.props.match.params.id}`);
      } else {
        await recipeService.create(this.state);
        this.props.history.push('/recipes')
      }
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  }

  getIngredientName = async (i) => {
    if(i._id){
      return i.name;
    } else {
      let ingredient = await ingredientService.getIngredient(i);
      return ingredient.ingredient.name;
    }
  }

  handleAddIngredient = async () => {
    let ingredients = [...this.state.ingredients];
    let amount = [...this.state.ingredientsAmount];
    let ingredientsName = [...this.state.ingredientsName];
    let iName = await this.getIngredientName(this.state.ingredientsInput);
    ingredients.push(this.state.ingredientsInput);
    amount.push(this.state.ingredientsAmountInput);
    ingredientsName.push(iName);
    this.setState({
      ingredients: ingredients,
      ingredientsAmount: amount,
      ingredientsInput: '',
      ingredientsAmountInput: '',
      ingredientsName: ingredientsName, 
    });
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <Container>
        <h3>{this.state.greeting}</h3>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" placeholder="Full Name" onChange={this.handleChange} value={this.state.name || ''} />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description || ''} />
            </Form.Group>

            <Form.Group controlId="formPrepTime">
              <Form.Label>Prep Time</Form.Label>
              <Form.Control name='prepTime' placeholder="Enter Prep Time in Min" onChange={this.handleChange} value={this.state.prepTime || ''} />
              <Form.Text className="text-muted">
                Please input Preparation Time in Minutes
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formCookTime">
              <Form.Label>Cook Time</Form.Label>
              <Form.Control name='cookTime' placeholder="Enter Cook Time in Min" onChange={this.handleChange} value={this.state.cookTime || ''} />
              <Form.Text className="text-muted">
                Please input Cooking Time in Minutes
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formInstructions">
              <Form.Label>Instructions <div className="font-italic">{this.state.message}</div></Form.Label>
              <Button className="float-right btn-sm" onClick={this.quillSave}>Save</Button>
              <ReactQuill 
                modules={this.quill.modules}
                placeholder={this.quill.placeholder}
                // defaultValue={this.state.instructionsInput}
                onChange={this.quillHandleChange}
                value={this.state.instructions || ''} 
              />
              <Form.Text className="text-muted">
                Make sure to save the Instructions before moving on.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="formIngredients">
                  <Form.Label>Amount</Form.Label>
                    {this.state.ingredientsAmount && this.state.ingredientsAmount.map((ingredientAmount, idx) =>
                      <Form.Control value={`${ingredientAmount}`} disabled/>
                    )}
                    <Form.Control name='ingredientsAmountInput' onChange={this.handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formIngredients">
                  <Form.Label>Ingredients</Form.Label>
                      {this.state.ingredients && this.state.ingredients.map((ingredient, idx) =>
                        <Form.Control value={`${ this.state.ingredientsName[idx]} `} disabled />
                      )}
                      <Form.Control as="select" name="ingredientsInput" onChange={this.handleChange}>
                          <option value=''>None</option>
                          {this.state.allIngredients.map((ingredient, idx) =>
                            <option value={`${ingredient._id}`}>{ingredient.name}</option>
                          )}
                      </Form.Control>
                  {!this.state.ingredientForm && 
                  <Button className='btn-sm' variant='success' onClick={this.triggerIngredientForm}>Create New Ingredient</Button>}
                  {this.state.ingredientForm && 
                  <Button className='btn-sm' variant='success' onClick={this.closeIngredientForm}>Close Ingredient Form</Button>}
                </Form.Group>
              </Form.Row>
                  <Button className='btn-sm' variant='success' onClick={this.handleAddIngredient}>Add Ingredient</Button>
            </Form.Group>
            <Form.Group>
              {this.state.ingredientForm && <IngredientForm updateIngredients={this.updateIngredients} />}
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Select Category</Form.Label>
              <Form.Control as="select" name="category" onChange={this.handleChange} value={this.state.category} multiple >
                <option value='Unassigned'>None</option>
                {this.state.category.map((category, idx) =>
                <option value={`${category._id}`}>{category.name}</option>
                )}
              </Form.Control>
              <Form.Text as={Link} to="/categories/new">Add New Category </Form.Text>
            </Form.Group>

            <Form.Group controlId="formMealPlans">
              <Form.Label>Select Meal Plans</Form.Label>
                <Form.Control as="select" name="mealPlans" onChange={this.handleChange} value={this.state.mealPlan} multiple >
                <option value=''>None</option>
                {this.state.mealPlan.map((mealPlan, idx) =>
                <option value={`${mealPlan._id}`}>{mealPlan.name}</option>
                )}
              </Form.Control>
              <Form.Text as={Link} to="/ingredients/new">Add New MealPlan </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form>
      </Container>
    );
  }
}

export default RecipeForm;