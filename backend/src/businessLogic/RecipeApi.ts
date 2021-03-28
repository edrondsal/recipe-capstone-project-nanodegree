import {RecipeAccess} from '../ports/RecipeAccess'
import {Recipe} from '../models/Recipe'
import {RecipeRequest} from '../interfaces/RecipeRequest'
import {UpdateRequest} from '../interfaces/UpdateRequest'
import {pushKey} from '../tools/databasetool'
import {RecipePhotoBucketAccess} from '../ports/RecipePhotoBucketAccess'

export async function createRecipe(request:RecipeRequest,userId:string):Promise<Recipe>{
    const recipeAccess = new RecipeAccess()
    const recipeId = pushKey()
    return recipeAccess.create(request,userId,recipeId)
}

export async function getAllRecipesForUser(userId:string):Promise<Recipe[]>{
    const recipeAccess = new RecipeAccess()
    return recipeAccess.getAllIndexed(userId)
}

export async function updateRecipe(request:UpdateRequest,userId:string,recipeId:string):Promise<Object>{
    const recipeAccess = new RecipeAccess()
    return recipeAccess.update(request,userId,recipeId)
}

export async function addPhototUrl(fileName:string):Promise<string>{
  const bucketPort:RecipePhotoBucketAccess = new RecipePhotoBucketAccess()
  return bucketPort.getUploadSignedUrl(fileName)
}

export async function getPhototUrl(fileName:string):Promise<string>{
  const bucketPort:RecipePhotoBucketAccess = new RecipePhotoBucketAccess()
  return bucketPort.getDownloadSignedUrl(fileName)
}

export async function deleteRecipe(userId:string,recipeId:string):Promise<Object>{
    const recipeAccess = new RecipeAccess()
    return recipeAccess.delete(userId,recipeId)
}