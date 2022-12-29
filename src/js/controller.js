import * as model from './model.js';
import recipeView from './views/recipeView.js';

// this import is for Polyfilling
// so that we can support older browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    // guard if there is no current ID
    if (!id) {
      return;
    }

    // this creates a spinner while we load
    recipeView.renderSpinner();

    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
} // end showRecipe

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
