import { APIGatewayProxyEvent} from 'aws-lambda'
import {getUserId} from '../tools/usertool'
import { RecipeRequest } from '../interfaces/RecipeRequest'
import {UpdateRequest} from '../interfaces/UpdateRequest'


export class ApiGatewayAdapter {

    private readonly event:APIGatewayProxyEvent

    constructor(event:APIGatewayProxyEvent){
        this.event = event
    }

    getCreateRecipeRequest():RecipeRequest{
        return JSON.parse(this.event.body) as RecipeRequest
    }

    getUpdateRecipeRequest():UpdateRequest{
        return JSON.parse(this.event.body) as UpdateRequest
    }

    getUserIdFromRequest():string {
        return getUserId(this.event)
    }
}