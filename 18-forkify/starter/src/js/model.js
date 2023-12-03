import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    console.log(data);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === state.recipe.id))
      state.recipe.bookmarked = true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSearchedResultPage = function (page = state.search.page) {
  state.search.page = page;
  return state.search.results.slice(
    (page - 1) * RESULTS_PER_PAGE,
    page * RESULTS_PER_PAGE - 1
  );
};

export const updateServings = function (newServings) {
  const scaler = newServings / state.recipe.servings;
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity *= scaler;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  state.bookmarks.splice(
    state.bookmarks.findIndex(bookmark => bookmark.id === id),
    1
  );
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  localStorage.getItem('bookmarks')
    ? (state.bookmarks = JSON.parse(localStorage.getItem('bookmarks')))
    : state;
};

export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient-') && entry[1] !== '')
    .map(ing => {
      const ingArr = ing[1].split(',').map(e => e.trim());
      if (ingArr.length !== 3) throw new Error('Invalid ingredients');
      const [quantity, unit, description] = ingArr;
      return {
        quantity: quantity ? +quantity : null,
        unit,
        description,
      };
    });

  const recipe = {
    title: newRecipe.title,
    publisher: newRecipe.publisher,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    servings: +newRecipe.servings,
    cooking_time: +newRecipe.cookingTime,
    ingredients,
  };
  const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
  state.recipe = createRecipeObject(data);
  addBookmark(state.recipe);
};

init();
