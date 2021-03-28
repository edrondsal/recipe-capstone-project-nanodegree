import {DynamoDBAdapter} from '../adapters/DynamoDBAdapter'
import {Recipe} from '../models/Recipe'
import {RecipeRequest} from '../interfaces/RecipeRequest'
import {UpdateRequest} from '../interfaces/UpdateRequest'

export class RecipeAccess {

    private readonly database:DynamoDBAdapter<Recipe>
    private readonly indexName:string

    constructor(indexName:string = process.env.INDEX_NAME){
       this.database = new DynamoDBAdapter<Recipe>(process.env.RECIPES_TABLE,process.env.RECIPE_HASH_KEY,process.env.RECIPE_RANGE_KEY)
       this.indexName = indexName
    }

    async getAllIndexed(userId:string):Promise<Recipe[]>{
        return this.database.getAllIndexed(userId,this.indexName)
    }
    async get(userId:string,recipeId:string):Promise<Recipe>{
        return this.database.get(userId,recipeId)
    }
    async create(item:RecipeRequest,userId:string,recipeId:string):Promise<Recipe>{
        const timestamp = new Date().toISOString()
        let recipe:Recipe = {
            userId,
            recipeId,
            createdAt: timestamp,
            ...item
        }
       await this.database.create(recipe)
       return recipe
    }
    async update(updated:UpdateRequest,userId:string,recipeId:string):Promise<Object>{
        return this.database.update(updated,userId,recipeId)
    }
    async delete(userId:string,recipeId:string):Promise<Object>{
        return this.database.delete(userId,recipeId)
    }



}