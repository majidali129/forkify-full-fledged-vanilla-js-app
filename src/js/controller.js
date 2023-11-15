import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

import { async } from 'regenerator-runtime';
import 'core-js/stable';
import 'regenerator-runtime';


if(module.hot){
  module.hot.accept()
}


const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1)  Loading-recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // 2) Rendering-recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError()
  }
};
// https://github.com/majidali129/forkify-full-fledged-vanilla-js-app.git

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner()
    
    // 1) GETTING USER QUERY
    const query = searchView.getQuery();
    if(!query) return ;
    
    // 2) GETTING SEARCH RESULTS
    await model.loadSearchResults(query);

    // 3) RENDER SEARCH RESULTS
    resultsView.render(model.state.search.results);

  } catch (err) {
    console.log(err);
  }
}

// subscriber / observer
const init = () => {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}

init()