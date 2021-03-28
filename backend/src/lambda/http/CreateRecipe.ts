import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {ApiGatewayAdapter} from '../../adapters/AwsApiGatewayAdapter'
import * as RecipeApi from '../../businessLogic/RecipeApi'
import { createLogger } from '../../tools/logger'
import {Recipe} from '../../models/Recipe'
import {RecipeRequest} from '../../interfaces/RecipeRequest'

const logger = createLogger('CreateRecipe')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const apiGatewayAdapter = new ApiGatewayAdapter(event) 
    const userId:string = apiGatewayAdapter.getUserIdFromRequest()
    const newItem:RecipeRequest = apiGatewayAdapter.getCreateRecipeRequest()

    try{
        let item:Recipe  = await RecipeApi.createRecipe(newItem,userId)
        logger.info('Creation Recipe',userId)
        return {
          statusCode: 201,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({
            item
          })
        }
      }catch(error){
        logger.info('Creation Error', error)
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