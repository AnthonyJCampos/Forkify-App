import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// this import is for Polyfilling
// so that we can support older browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

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
    recipeView.renderError();
  }
} // end showRecipe

const controlSearchResults = async function () {
  try {
    // 1. get search query
    const query = searchView.getQuery();
    if (!query) {
      return;
    }
    // 2. load search results
    await model.loadSearchResults(query);
    // 3. render resuls to console
    console.log(model.state.search.results);
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
