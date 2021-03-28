import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {ApiGatewayAdapter} from '../../adapters/AwsApiGatewayAdapter'
import * as RecipeApi from '../../businessLogic/RecipeApi'
import { createLogger } from '../../tools/logger'

const logger = createLogger('DeleteRecipe')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const apiGatewayAdapter = new ApiGatewayAdapter(event) 
    const userId:string = apiGatewayAdapter.getUserIdFromRequest()
    const recipeId = event.pathParameters.recipeId

    try{
        await RecipeApi.deleteRecipe(userId,recipeId)
        logger.info('Deleted',userId,recipeId)
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: ''
        }
      }catch(error){
        logger.info('Delete Error', error)
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