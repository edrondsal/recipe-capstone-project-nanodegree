import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../tools/logger'
import * as RecipeApi from '../../businessLogic/RecipeApi'


const logger = createLogger('auth')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const recipeId:string = event.pathParameters.recipeId
  const fileName:string = `${event.queryStringParameters.fileName}`

 

  const photoUrl = await RecipeApi.getPhototUrl(fileName)

  logger.info('recipe photo url created',recipeId,photoUrl)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      photoUrl
    })
  }
}