import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {ApiGatewayAdapter} from '../../adapters/AwsApiGatewayAdapter'
import * as RecipeApi from '../../businessLogic/RecipeApi'
import { createLogger } from '../../tools/logger'
import {Recipe} from '../../models/Recipe'

const logger = createLogger('ReadRecipe')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const apiGatewayAdapter = new ApiGatewayAdapter(event) 
  const userId:string = apiGatewayAdapter.getUserIdFromRequest()
  
  try{
    const items:Recipe[] = await RecipeApi.getAllRecipesForUser(userId)
    logger.info('Read',userId)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items
      })
    }
  }catch(error){
    logger.info('Read Error', error)
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