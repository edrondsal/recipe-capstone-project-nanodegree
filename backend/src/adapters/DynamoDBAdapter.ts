import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)


function createDynamoDbDocumentClient():AWS.DynamoDB.DocumentClient{
    if(process.env.IS_OFFLINE){
        console.log('Creating DocumentClient for Offline test')
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: `http://localhost:${process.env.DYNAMODB_OFFLINE_PORT}/`
        })
    }

    return new XAWS.DynamoDB.DocumentClient()
}

export class DynamoDBAdapter<T> {

    private readonly docClient:AWS.DynamoDB.DocumentClient
    private readonly tableName:string
    private readonly hashKey:string
    private readonly rangeKey:string

    constructor(tableName:string,hashKey:string,rangeKey:string){
        this.docClient = createDynamoDbDocumentClient()
        this.tableName = tableName
        this.hashKey = hashKey
        this.rangeKey = rangeKey
    }

    async getAll(hashKey:string):Promise<T[]>{
        let expressionAttributeValues = {}
        expressionAttributeValues[`:${this.hashKey}`] = hashKey
        const keyConditionExpression = `${this.hashKey} = :${this.hashKey}`
        
        const result = await this.docClient.query({
            TableName: this.tableName,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues
          }).promise()
        
        const items = result.Items as T[]
        return items
    }
    async getAllIndexed(hashKey:string,index:string):Promise<T[]>{
        let expressionAttributeValues = {}
        expressionAttributeValues[`:${this.hashKey}`] = hashKey
        const keyConditionExpression = `${this.hashKey} = :${this.hashKey}`
        const result = await this.docClient.query({
            TableName: this.tableName,
            IndexName: index,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues
          }).promise()
        
        const items = result.Items as T[]
        return items
    }

    async get(hashKey:string,rangeKey?:string):Promise<T>{
        let keys = {}
        keys[this.hashKey] = hashKey
        if(this.rangeKey !== undefined && rangeKey!== undefined){
            keys[this.rangeKey] = rangeKey
        }

        const params = {
            TableName: this.tableName,
            Key: keys
          };
        const result = await this.docClient.get(params).promise()

        return result.Item as T
    }
    async create(item:T):Promise<Object>{
        return this.docClient.put({ 
            TableName: this.tableName,
            Item: item
          }).promise()
    }

    async update(updated:Object,hashKey:string,rangeKey?:string):Promise<Object>{
        let keys = {}
        keys[this.hashKey] = hashKey
        if(this.rangeKey !== undefined && rangeKey!== undefined){
            keys[this.rangeKey] = rangeKey
        }

        const updateExpression = Object.keys(updated).map(key=> `${key} = :${key}`).join(', ')
        const expressionAttributeValues = Object.entries(updated).reduce( (object,[key,value]) => {
            object[`:${key}`] = value
            return object
        } , {})
        
        const params = {
            TableName: this.tableName,
            Key: keys,
            UpdateExpression: `set ${updateExpression}`,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues:"UPDATED_NEW"
          };
        
        return this.docClient.update(params).promise()        
    }

    async delete(hashKey:string,rangeKey?:string):Promise<Object>{
        let keys = {}
        keys[this.hashKey] = hashKey
        if(this.rangeKey !== undefined && rangeKey!== undefined){
            keys[this.rangeKey] = rangeKey
        }

        const params = {
            TableName: this.tableName,
            Key: keys
          };
        
        return this.docClient.delete(params).promise()
    }

}