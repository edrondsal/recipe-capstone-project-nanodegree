/**
  * @description Function to return database key from a timestamp. Firebase style of doing to have keys already ordered by creation date
  * @returns {String} the database key string
  */
 export function pushKey(): string{
    const PUSH_CHARS:string = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
    let lastPushTime:number = Date.now()
    let timeStampChars:string[] = Array.from('k'.repeat(8));
    for (let i=0;i<7;i++){
        let index = lastPushTime%64;
        timeStampChars[7-i] = PUSH_CHARS[index];
        lastPushTime=lastPushTime/64;
    }
    
    let result:string = timeStampChars.join("");
    for(let j=0;j<11;j++){
        result = result + PUSH_CHARS[Math.floor(Math.random() * PUSH_CHARS.length)];
    }
    return result;
  }