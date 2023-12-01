import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers.js';


export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1
  }
};

export const loadRecipe = async function(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadSearchResults = async function(query) {
  try {w
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSearchedResultPage = function(page = state.search.page) {
  state.search.page = page;
  return state.search.results.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE - 1);
};

export const updateServings = function(newServings) {
  const scaler = newServings / state.recipe.servings;
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity *= scaler;
  });
  state.recipe.servings = newServings;
};