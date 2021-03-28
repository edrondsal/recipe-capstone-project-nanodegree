import * as AWS from 'aws-sdk'


export class S3Adapter {

    private readonly s3:AWS.S3
    private readonly expirationLimit:number
    private readonly bucketName:string

    constructor(expirationLimit:number, bucketName:string){
        this.s3 = new AWS.S3({
          signatureVersion: 'v4' // Use Sigv4 algorithm
        })
        this.expirationLimit = expirationLimit
        this.bucketName = bucketName
    }

    getUploadSignedUrl(fileName:string):string{
        return this.s3.getSignedUrl('putObject', { 
            Bucket: this.bucketName, // Name of an S3 bucket
            Key: fileName, // id of an object this URL allows access to
            Expires: this.expirationLimit , // A URL is only valid for 5 minutes
            ContentType: 'image/jpeg'
          })
    }

    getDownloadSignedUrl(fileName:string):string{
        return this.s3.getSignedUrl('getObject', { 
            Bucket: this.bucketName, // Name of an S3 bucket
            Key: fileName, // id of an object this URL allows access to
            Expires: this.expirationLimit // A URL is only valid for 5 minutes
          })
    }


}