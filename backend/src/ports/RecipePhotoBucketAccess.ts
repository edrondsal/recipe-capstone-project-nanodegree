import {S3Adapter} from '../adapters/S3Adapter'

export class RecipePhotoBucketAccess {

    private readonly adapter:S3Adapter

    constructor(){
        this.adapter = new S3Adapter(parseInt(process.env.SIGNED_URL_EXPIRATION),process.env.PHOTO_URL_S3_BUCKET)
    }

    getUploadSignedUrl(fileName:string):string{
        return this.adapter.getUploadSignedUrl(fileName)
    }

    getDownloadSignedUrl(fileName:string):string{
        return this.adapter.getDownloadSignedUrl(fileName)
    }
}