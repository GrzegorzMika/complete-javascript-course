import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};


const controlSearchResults = async function() {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
  } catch (err) {
    console.log(err);
  }
};

const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();