import React, { Component } from 'react';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Col, InputGroup } from 'react-bootstrap';
import recipeService from '../utils/recipeService';
import ingredientService from '../utils/ingredientService';
import categoryService from '../utils/categoryService';
import mealPlanService from '../utils/mealPlanService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import IngredientForm from './IngredientForm';
import MealPlanForm from './MealPlanForm';
import CategoryForm from './CategoryForm';


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
    categoryNames: [],
    categoryInput: '',
    categoryRemove: '',
    description: '',
    mealPlan: [],
    mealPlanNames: [],
    mealPlanRemove: '',
    mealPlanInput: '',
    greeting: 'Create a New Recipe',
    allIngredients: [],
    allCategories: [],
    allMealPlans: [],
    message: '',
    ingredientForm: false,
    ingredientsInput: '',
    ingredientsAmountInput: '',
    mealPlanForm: false,
    categoryForm: false,
    loading: true,
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
  
  instructions = {}
  
  /*--------------------- Component Update Functions ------------------------*/
  
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
        ingredientsName: recipe.recipe.ingredientsName,
        contributor: recipe.recipe.contributor,
        category: recipe.recipe.category,
        description: recipe.recipe.description,
        mealPlan: recipe.recipe.mealPlan,
        greeting: `Edit ${recipe.recipe.name} Recipe`,        
      })
    }
    this.setState({loading: false});
  }

  updateIngredients = async () => {
      const ingredients= await this.getAllIngredients();
      this.setState({ allIngredients: ingredients.ingredients });
  }

  updateCategories = async () => {
      const categories= await this.getAllCategories();
      this.setState({ allCategories: categories.categories });
  }

  updateMealPlans = async () => {
      const mealPlans= await this.getAllMealPlans();
      this.setState({ allMealPlans: mealPlans.mealPlans });
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  /*--------------------- Component Form Functions --------------------------*/

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
  
  handleAddCategory = async (e) => {
    if(this.state.categoryInput){
      let category = [...this.state.category];
      let categoryNames = [...this.state.categoryNames];
      let cName = await this.getCategoryName(this.state.categoryInput);
      category.push(this.state.categoryInput);
      categoryNames.push(cName);
      this.setState({
        category: category,
        categoryNames: categoryNames,
        categoryInput: '',
      });
    } else {return};
  }

  handleRemoveCategory = (e) => {
    if(this.state.categoryRemove){
      let selection = this.state.categoryRemove;
      let category = [...this.state.category];
      let categoryNames = [...this.state.categoryNames];
      let cat;
      if(selection._id){
        category.filter(function(val, idx, arr){
          if(val._id == selection._id){
            cat = idx;
          }
        });
        category.splice(cat, 1);
      } else {
        category.filter(function(val, idx, arr){
          if(val == selection){
            categoryNames.splice(idx, 1)
          }
          cat = idx;
        },
        );
        category.splice(cat, 1);
      }
      this.setState({
        category: category,
        categoryNames: categoryNames,
      })
    } else {return};
  }

  handleAddMealPlan = async () => {
    if(this.state.mealPlanInput){
      let mealPlan = [...this.state.mealPlan];
      let mealPlanNames = [...this.state.mealPlanNames];
      let mName = await this.getMealPlanName(this.state.mealPlanInput);
      mealPlan.push(this.state.mealPlanInput);
      mealPlanNames.push(mName);
      this.setState({
        mealPlan: mealPlan,
        mealPlanNames: mealPlanNames,
        mealPlanInput: '',
      });
    } else {return};
  }

  handleRemoveMealPlan = (e) => {
    if(this.state.mealPlanRemove){
      let selection = this.state.mealPlanRemove;
      let mealPlan = [...this.state.mealPlan];
      let mealPlanNames = [...this.state.mealPlanNames];
      let mp;
      if(selection._id){
        mealPlan.filter(function(val, idx, arr){
          if(val._id == selection._id){
            mp = idx;
          }
        });
        mealPlan.splice(mp, 1);
      } else {
        mealPlan.filter(function(val, idx, arr){
          if(val == selection){
            mealPlanNames.splice(idx, 1)
          }
          mp = idx;
        },
        );
        mealPlan.splice(mp, 1);
      }
      this.setState({
        mealPlan: mealPlan,
        mealPlanNames: mealPlanNames,
      })
    } else {return}
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

  handleAddIngredient = async () => {
    if(this.state.ingredientsInput){
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
    } else {return}
  }

  isFormInvalid() {
    return !(this.state.name && this.state.dscription && this.state.instructions && this.state.prepTime && this.state.cookTime);
  }

  /*--------------------- Form Helper Functions -----------------------------*/

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

  triggerMealPlanForm = () => {
    this.setState( {
        ...this.state,
        mealPlanForm: true,
    })
  }

  closeMealPlanForm = () => {
    this.setState( {
        ...this.state,
        mealPlanForm: false,
    })
  }

  triggerCategoryForm = () => {
    this.setState( {
        ...this.state,
        categoryForm: true,
    })
  }

  closeCategoryForm = () => {
    this.setState( {
        ...this.state,
        categoryForm: false,
    })
  }
  


  /*--------------------- API Functions -------------------------------------*/

  async getAllIngredients() {
    return await ingredientService.getIngredients();
  };

  async getAllCategories() {
    return await categoryService.getCategories();
  };

  async getAllMealPlans() {
    return await mealPlanService.getMealPlans();
  };


  getIngredientName = async (i) => {
    if(i._id){
      return i.name;
    } else {
      let ingredient = await ingredientService.getIngredient(i);
      return ingredient.ingredient.name;
    }
  }

  getMealPlanName = async (mp) => {
    console.log(mp);
    if(mp._id){
      return mp.name;
    } else {
      let mealPlan = await mealPlanService.getMealPlan(mp);
      return mealPlan.mealPlan.name;
    }
  }


  getCategoryName = async (c) => {
    console.log(c);
    if(c._id){
      return c.name;
    } else {
      let category = await categoryService.getCategory(c);
      return category.category.name;
    }
  }

/*-------------------------------------- Render -----------------------------------*/

  render() {
    if(this.state.loading){
      return(
      <div>Loading...</div>
      )};
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
                  {!this.state.ingredientForm && 
                  <Button className='btn-sm float-right' variant='info' onClick={this.triggerIngredientForm}>Create New Ingredient</Button>}
                  {this.state.ingredientForm && 
                  <Button className='btn-sm float-right' variant='info' onClick={this.closeIngredientForm}>Close Ingredient Form</Button>}
                      {this.state.ingredients && this.state.ingredients.map((ingredient, idx) =>
                        <Form.Control value={`${this.state.ingredientsName[idx]}`} disabled />
                      )}
                      <Form.Control as="select" name="ingredientsInput" onChange={this.handleChange}>
                          <option disabled selected>None</option>
                          {this.state.allIngredients.map((ingredient, idx) =>
                            <option value={`${ingredient._id}`}>{ingredient.name}</option>
                          )}
                      </Form.Control>
                </Form.Group>
              </Form.Row>
                  <Button className='btn-sm' variant='info' onClick={this.handleAddIngredient}>Add Ingredient</Button>
            </Form.Group>
            <Form.Group>
              {this.state.ingredientForm && <IngredientForm updateIngredients={this.updateIngredients} />}
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formCategory">
                <Form.Label>Select Category</Form.Label>
                {!this.state.categoryForm && 
                    <Button className='btn-sm float-right' variant='info' onClick={this.triggerCategoryForm}>Create New Category</Button>}
                    {this.state.categoryForm && 
                    <Button className='btn-sm float-right' variant='info' onClick={this.closeCategoryForm}>Close Category Form</Button>}
                <Form.Control as="select" name="categoryInput" onChange={this.handleChange} multiple>
                  {this.state.allCategories.map((category, idx) =>
                    <option value={`${category._id}`}>{category.name}</option>
                  )}
                </Form.Control>
                  <Button className='btn-sm' variant='info' onClick={this.handleAddCategory}>Add Category</Button>
              </Form.Group>
              <Form.Group as={Col} controlId="formCategory">
                <Form.Label>Remove Category</Form.Label>
                <Form.Control as="select" name="categoryRemove" onChange={this.handleChange} multiple>
                  {this.state.category.map((category, idx) => {
                    if(category._id){
                      return <option value={`${category._id}`} >{category.name}</option>
                    } else {
                      return <option value={`${category}`} >{this.state.categoryNames[idx]}</option>
                    }
                  })}
                </Form.Control>
                  <Button className='btn-sm' variant='info' onClick={this.handleRemoveCategory}>Remove Category</Button>
              </Form.Group>
            </Form.Row>
              <Form.Group>
                {this.state.categoryForm && <CategoryForm updateCategories={this.updateCategories} />}
              </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formMealPlan">
                <Form.Label>Select Meal Plan</Form.Label>
                {!this.state.mealPlanForm && 
                    <Button className='btn-sm float-right' variant='info' onClick={this.triggerMealPlanForm}>Create New MealPlan</Button>}
                    {this.state.mealPlanForm && 
                    <Button className='btn-sm float-right' variant='info' onClick={this.closeMealPlanForm}>Close MealPlan Form</Button>}
                <Form.Control as="select" name="mealPlanInput" onChange={this.handleChange} multiple>
                  {this.state.allMealPlans.map((mealPlan, idx) =>
                    <option value={`${mealPlan._id}`}>{mealPlan.name}</option>
                  )}
                </Form.Control>
                  <Button className='btn-sm' variant='info' onClick={this.handleAddMealPlan}>Add MealPlan</Button>
              </Form.Group>
              <Form.Group as={Col} controlId="formMealPlan">
                <Form.Label>Remove MealPlan</Form.Label>
                <Form.Control as="select" name="mealPlanRemove" onChange={this.handleChange} multiple>
                  {this.state.mealPlan.map((mealPlan, idx) => {
                    if(mealPlan._id){
                      return <option value={`${mealPlan._id}`} >{mealPlan.name}</option>
                    } else {
                      return <option value={`${mealPlan}`} >{this.state.mealPlanNames[idx]}</option>
                    }
                  })}
                </Form.Control>
                  <Button className='btn-sm' variant='info' onClick={this.handleRemoveMealPlan}>Remove MealPlan</Button>
              </Form.Group>
            </Form.Row>
              <Form.Group>
                {this.state.mealPlanForm && <MealPlanForm 
                closeMealPlanForm={this.closeMealPlanForm}
                updateMealPlans={this.updateMealPlans} />}
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