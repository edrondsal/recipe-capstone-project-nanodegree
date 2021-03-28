import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {ApiGatewayAdapter} from '../../adapters/AwsApiGatewayAdapter'
import * as RecipeApi from '../../businessLogic/RecipeApi'
import { createLogger } from '../../tools/logger'
import {UpdateRequest} from '../../interfaces/UpdateRequest'

const logger = createLogger('UpdateRecipe')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const apiGatewayAdapter = new ApiGatewayAdapter(event) 
    const userId:string = apiGatewayAdapter.getUserIdFromRequest()
    const recipeId = event.pathParameters.recipeId
    const update:UpdateRequest = apiGatewayAdapter.getUpdateRecipeRequest()

    if(update.description===undefined && update.ingredients===undefined && update.photoUrl===undefined && update.title===undefined){
        return {
            statusCode: 422,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            body: 'Malformed Request'
          }        
    }

    try{
        await RecipeApi.updateRecipe(update,userId,recipeId)
        logger.info('Updated',userId,recipeId)
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: ''
        }
      }catch(error){
        logger.info('Update Error', error)
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: 'Internal Server Error'
        }
      }    


}