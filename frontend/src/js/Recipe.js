import {config} from './Config'
import {NetworkManager} from './NetworkManager'

/**
* @description Prototype Constructor of the Recipe Model
*/
function Recipe(object){
    return Object.assign({}, object, {
        /**
        * @description Method get download url
        * @return {String} the resulting signed url
        */
        getDownloadUrl: async function(filename){
           return NetworkManager.getData(`${config.backendUrl}/${this.recipeId}/photourl?fileName=${filename}`);
        },
        /**
        * @description Method to get upload url
        * @return {String} the resulting signed url
        */
         getUploadUrl: async function(filename){
            return NetworkManager.postData(`${config.backendUrl}/${this.recipeId}/photourl?fileName=${filename}`,{});
        },
        /**
        * @description Method to get upload url
        * @return {String} the resulting signed url
        */
       deleteRecipe: async function(jwt){
        return NetworkManager.deleteData(`${config.backendUrl}/${this.recipeId}`);
       }
      });
}

export {Recipe}