import {AuthClient} from './AuthClient'
import {NetworkManager} from './NetworkManager'
import {config} from './Config'
import {Recipe} from './Recipe'

/**
 * The store object
 * @typedef {Object} Store
 * @property {Auth0Client} auth0 - the authentication object
 * @property {Recipe[]} recipes - the list of recipes for the user
 */

var ViewController = (function(){


    // The store will hold all information needed globally
    /** @type {Store} */
    let  store = {
        auth0: null,
        recipes: null,
        initialized: false,
        jwt: null,
        file: null
    }

    /**
    * @description Function that update the store
    * @param {Store} state- The store object
    * @param {object} object - the object to update the store
    * @return {Store} the new updated store
    */
    function updateStore(state,object) {
        return Object.assign({},state,object);
    }

    async function initialize(){
        const auth0 = await AuthClient.configureClient();
        store = updateStore(store,{auth0, initialized:true});
    }
    async function isAuthenticated(){
        const authenticated = await AuthClient.isAuthenticated(store.auth0);
        if(authenticated && store.jwt===null){
            const token = await AuthClient.getToken(store.auth0);
            NetworkManager.setJwtAuthorization(token);
            store = updateStore(store,{jwt:token});
        }
        return authenticated;
    }
    async function signIn(){
        return AuthClient.login(store.auth0);
    }
    async function handleRedirectCall(){
        await AuthClient.handleRedirectCall(store.auth0);
        
        if(store.jwt === null){
            const token = await AuthClient.getToken(store.auth0);
            NetworkManager.setJwtAuthorization(token);
            store = updateStore(store,{jwt:token});
        }
        
        return token;
    }
    async function logOut(){
        return AuthClient.logout(store.auth0);
    }
    async function getRecipe(recipeId){
        if(store.recipes===null){
            return undefined;
        }
        const recipe = store.recipes.find(item => item.recipeId === recipeId);
        return Recipe(recipe);
    }
    async function createRecipe(){
        const titleElement = document.getElementById('create-recipe-title');
        const descriptionElement = document.getElementById('create-recipe-description');
        const ingredientsElement = document.getElementById('create-recipe-ingredients');

        const ingredients = ingredientsElement.value.split(",");
        const title = titleElement.value;
        const description = descriptionElement.value;

        const recipe = {
            title,
            description,
            ingredients
        }
        
        
        try{
            const result = await NetworkManager.postData(`${config.backendUrl}`,recipe);
        }catch(error){
            console.log(error);
        }
    }
    async function updateRecipe(recipeId){
        const titleElement = document.getElementById('create-recipe-title');
        const descriptionElement = document.getElementById('create-recipe-description');
        const ingredientsElement = document.getElementById('create-recipe-ingredients');

        const ingredientsString = ingredientsElement.value;
        const title = titleElement.value;
        const description = descriptionElement.value;

        let recipe = {};

        let changeToSave = false;

        if(!!title){
            recipe['title'] = title;
            changeToSave = true;
        }

        if(!!description){
            recipe['description'] = description;
            changeToSave = true;
        }

        if(!!ingredientsString){
            recipe['ingredients'] = ingredientsString.split(",");
            changeToSave = true;
        }

        if(store.file != null){
            changeToSave = true;
            const recipeForFile = Recipe({recipeId, ...recipe});
            const uploadUrl = await recipeForFile.getUploadUrl(store.file.name);
            //const downloadUrl = await recipeForFile.getDownloadUrl(store.file.name);
            const downloadUrl = `${config.bucketUrl}/${store.file.name}`;
            await fetch(uploadUrl.uploadUrl, { method: 'PUT',mode: 'cors', cache: 'default', credentials: 'same-origin', redirect: 'follow', referrerPolicy: 'no-referrer',body: store.file});
            recipe['photoUrl'] = downloadUrl;
        }

        if(!changeToSave) return;

        try{
            const result = await NetworkManager.patchData(`${config.backendUrl}/${recipeId}`,recipe);
        }catch(error){
            console.log(error);
        }
    }
    async function deleteRecipe(recipeId){
        try{
            const recipe = await getRecipe(recipeId);
            await recipe.deleteRecipe();
        }catch(error){
            console.log(error);
        }
    }
    async function loadRecipes(){
        try{
            const result = await NetworkManager.getData(`${config.backendUrl}`);
            store = updateStore(store,{recipes:result.items});
            return store.recipes;
        }catch(error){
            console.log(error);
            return undefined;
        }
    }
    function setFileForUpload(file){
        store = updateStore(store,{file});  
    }

    return {
        initialize,
        isAuthenticated,
        signIn,
        handleRedirectCall,
        logOut,
        getRecipe,
        createRecipe,
        updateRecipe,
        deleteRecipe,
        loadRecipes,
        setFileForUpload
    }
    

})();

export {ViewController}