import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import PaginationView from './views/paginationView'

import { async } from 'regenerator-runtime';
import 'core-js/stable';
import 'regenerator-runtime';
import paginationView from './views/paginationView';


// if(module.hot){
//   module.hot.accept()
// }


const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 0) Update result view to mark selected result
    resultsView.update(model.getSearchResultsPage())

    // 1)  Loading-recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // 2) Rendering-recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError()
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner()
    
    // 1) GETTING USER QUERY
    const query = searchView.getQuery();
    if(!query) return ;
    
    // 2) GETTING SEARCH RESULTS
    await model.loadSearchResults(query);

    // 3) RENDER SEARCH RESULTS
    resultsView.render(model.getSearchResultsPage());

    // 4) RENDER PAGINATION BUTTONS
    PaginationView.render(model.state.search)

  } catch (err) {
    console.log(err);
  }
}

const controlPagination = (gotoPage) => {
 // 3) RENDER NEW SEARCH RESULTS
    resultsView.render(model.getSearchResultsPage(gotoPage));

    // 4) RENDER NEW PAGINATION BUTTONS
    PaginationView.render(model.state.search)  
}


// TO UPDATE SERVINGS AND UPDATE THE RECIPE VIEW
const controlUpdateServings = (updateTo) => {
  // update servings
  console.log('called');
  
  model.updateServings(updateTo)
  // update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

// subscriber / observer
const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addUpdateServings(controlUpdateServings)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination)
}

init()