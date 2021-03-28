
import { Ui } from './Ui'
import {ViewController} from './ViewController'



var App = (function() {

    async function onPageLoad() {
        try {
            await ViewController.initialize();
            const isAuthenticated = await ViewController.isAuthenticated();
            if(isAuthenticated){
                Ui.renderAt('#root',Ui.renderMainScreen());
                loadRecipes();
            }else{

                const query = window.location.search;
                if (query.includes("code=") && query.includes("state=")) {
                    await ViewController.handleRedirectCall();
                    window.history.replaceState({}, document.title, "/");
                    Ui.renderAt('#root',Ui.renderMainScreen());
                    loadRecipes();
                }else{
                    Ui.renderAt('#root',Ui.renderLoginScreen());
                }

                
            }
        } catch(error) {
            console.log(error);
        }
    }
    
    function setupClickHandlers() {
        document.addEventListener('click', function(event) {
            clickHandlers(event)
        }, false)
        document.addEventListener('change',function(event){
            changeHandlers(event);
        });
    }
    
    async function changeHandlers(event){
        const { target } = event
        
        if(target.matches('#photo-recipe')){
            const file = target.files[0];
            Ui.renderPhotoFilename(file.name);
            ViewController.setFileForUpload(file);
        }
    }

    async function clickHandlers(event){
        const { target } = event

        // Race track form field  !!target.parentElement && target.parentElement.matches('.card.track')
        if (target.matches('#sign-in')) {
            await ViewController.signIn();
            Ui.renderAt('#root',Ui.renderMainScreen());
            loadRecipes();
        } 
    
        if (target.matches('#create-recipe')) {
            Ui.renderAt('#dialogs-box',Ui.renderCreateDialog());
        }
        if(target.matches('#cancel-recipe')){
            Ui.renderAt('#dialogs-box','');
        }   
        if(target.matches('#submit-recipe')){
            await ViewController.createRecipe();
            loadRecipes();
        }
        if(target.matches('#add-photo-recipe')){
            document.getElementById('photo-recipe').click();
        }
        if (target.matches('#update-recipe')) {
            await ViewController.updateRecipe(target.getAttribute('recipe_id'));
            loadRecipes();  
        }
       
        if (target.innerText === 'EDIT' && !!target.parentElement.parentElement && target.parentElement.parentElement.matches('.card-body-container')) {
            const recipe = await ViewController.getRecipe(target.parentElement.parentElement.id);
            Ui.renderAt('#dialogs-box',Ui.renderEditRecipe(recipe));
        }
        if ( target.innerText === 'DELETE' && !!target.parentElement.parentElement && target.parentElement.parentElement.matches('.card-body-container')) {
            await ViewController.deleteRecipe(target.parentElement.parentElement.id); 
            loadRecipes();
        }

        if (target.matches('#log-out')) {
            await ViewController.logOut();
            Ui.renderAt('#root',Ui.renderLoginScreen());
        }
    }
    
    async function loadRecipes(){
        Ui.renderAt('#dialogs-box',Ui.renderWaitingDialog());
        const recipes = await ViewController.loadRecipes();
        Ui.renderAt('#recipes',Ui.renderRecipes(recipes));
        Ui.renderAt('#dialogs-box','');
    }

    return {
        onPageLoad,
        setupClickHandlers
    }


})();

export {App}

