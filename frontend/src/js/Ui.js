
/**
* @class Ui
* @classdesc Module handling the UI rendering
*/
var Ui = (function(){

    function renderMainScreen() {
        return `
            <div class="grid-container">
                <!-- Header containing the Navbar of the app-->
                <header class="header-section-layout header-section-style">
                    <h1>CAPSTONE</h1>
                    <nav id="navigaton-bar">
                        <ul>
                            <li><button id="log-out" class="border-button" href="#">LOG OUT</button></li>
                        </ul>
                    </nav>
                </header>
                <!-- input section of the app-->
                <section class="input-section-layout">
                    <div class="input-flex-container">
                        <h2>Create Recipe:</h2>
                        <button id="create-recipe" class="border-button">Add Recipe</button>
                    </div>
                </section>
                <!-- items cards section of the app-->
                <section class="items-section-layout">
                    <div id="recipes" class="items-flex-container">

                    </div>
                </section>
                <!-- Footer containing the Navbar of the app-->
                <footer class="footer-section-layout">
                    <p>© 2020 Copyright: Eduardo Rondon</p>
                </footer> 
            </div>
            <div id="dialogs-box">
            </div>
        `
    }
    function renderRecipeImage(recipe){
        if(!!recipe.photoUrl) return recipe.photoUrl;
        return './images/generic-photo.jpg';
    }
    function renderIngredient(ingredient){
        return `
            <div class="ingredient-container">
                <h4>${ingredient}</h4>
            </div> 
        `
    }
    function renderRecipeIngredients(recipe){
        return recipe.ingredients.map(ingredient=>renderIngredient(ingredient)).join('\n');
    }
    function renderRecipe(recipe){
        return `
        <!--Recipe Card-->
        <div class="card-container">
            <img class="card-image" src="${renderRecipeImage(recipe)}" alt="recipe photo">
            <div id="${recipe.recipeId}" class="card-body-container">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <div class="scrolling-container">
                    ${renderRecipeIngredients(recipe)}
                </div>
                <div class="dialog-button-row align-end">
                    <button class="borderless-button">DELETE</button>
                    <button class="borderless-button">EDIT</button>
                </div>
            </div>
        </div>            
        `
    }
    function renderRecipes(recipes) {
        const mapRecipes = recipes.map(recipe=>renderRecipe(recipe)).join('\n');
        return `
         ${mapRecipes}
        `
    }
    function renderPhotoFilename(filename){
        const node = document.querySelector('#create-recipe-photo');
        node.value = filename;
    }
    function renderEditRecipe(recipe) {
        return `
        <!--Dialog to enter a new trip, it hidden-item at begging becomes dialog-screen when add-button pressed-->
        <div id="dialog-new-recipe" class="dialog-screen dialog-on-top">
            <div class="dialog-content">
                <div class="dialog-row">
                    <label for="create-recipe-title" class="dialog-labels">Title</label>
                    <input type="text" class="dialog-input" id="create-recipe-title" placeholder="${recipe.title}">
                </div>
                <div class="dialog-row">
                    <label for="create-recipe-description" class="dialog-labels">Description</label>
                    <input type="text" class="dialog-input" id="create-recipe-description" placeholder="${recipe.description}">
                </div>
                <div class="dialog-row">
                    <label for="create-recipe-ingredients" class="dialog-labels">Ingredients</label>
                    <input type="text" class="dialog-input" id="create-recipe-ingredients" placeholder="${recipe.ingredients.join(',')}">
                </div>
                <div class="dialog-row">
                    <label for="create-recipe-photo" class="dialog-labels">Recipe Photo</label>
                    <input type="text" class="dialog-input" id="create-recipe-photo" placeholder="Choose the photo to load..."/>
                    <input type="file"  id="photo-recipe" style="display: none;"/>
					<button class="borderless-button" id="add-photo-recipe">LOAD</button>
                </div>
                <div class="dialog-button-row">
                    <button id="cancel-recipe" class="borderless-button">CANCEL</button>
                    <button id="update-recipe" class="borderless-button" recipe_id="${recipe.recipeId}">SAVE</button>
                </div>
            </div>
        </div>        
        `
    }
    function renderCreateDialog(){
        return `
            <!--Dialog to enter a new trip, it hidden-item at begging becomes dialog-screen when add-button pressed-->
            <div id="dialog-new-recipe" class="dialog-screen dialog-on-top">
                <div class="dialog-content">
                    <div class="dialog-row">
                        <label for="create-recipe-title" class="dialog-labels">Title</label>
                        <input type="text" class="dialog-input" id="create-recipe-title" placeholder="Enter Recipe Title">
                    </div>
                    <div class="dialog-row">
                        <label for="create-recipe-description" class="dialog-labels">Description</label>
                        <input type="text" class="dialog-input" id="create-recipe-description" placeholder="Enter Recipe Description">
                    </div>
                    <div class="dialog-row">
                        <label for="create-recipe-ingredients" class="dialog-labels">Ingredients</label>
                        <input type="text" class="dialog-input" id="create-recipe-ingredients" placeholder="Enter Ingredients separated by ,">
                    </div>
                    <div class="dialog-button-row">
                        <button id="cancel-recipe" class="borderless-button">CANCEL</button>
                        <button id="submit-recipe" class="borderless-button">SAVE</button>
                    </div>
                </div>
            </div>
        `
    }
    function renderWaitingDialog(){
        return `
            <!--Dialog loading after async request, it hidden-item at begging becomes dialog-screen when dialog-save-button pressed-->
            <div id="dialog-loading" class="dialog-screen dialog-on-top">
                <div class="loading-dialog-content">
                    <div class="loading-spinner"></div>
                    <p>Loading ...</p>
                </div>
            </div> 
        `    
    }
    function renderLoginScreen() {
        return `
            <div class="dialog-screen page-splash">
                <div id="login-box">
                    <h1>Welcome to Recipe App</h1>
                    <p>Please connect to acces the app</p>
                    <button class="border-button" type="submit"  id="sign-in" name="signin" style="margin-right:15px">Sign In</button>
                </div>
            </div>
        `
    }
    function renderAt(element, html) {
        if(element===null || element===undefined || html===null || html === undefined){
            return;
        }
        const node = document.querySelector(element);
        node.innerHTML = html;
    }

    return{
        renderMainScreen,
        renderRecipes,
        renderEditRecipe,
        renderLoginScreen,
        renderCreateDialog,
        renderWaitingDialog,
        renderPhotoFilename,
        renderAt
    }

})();

export {Ui}