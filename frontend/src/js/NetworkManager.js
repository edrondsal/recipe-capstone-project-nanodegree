/**
* @class NetworkManager
* @classdesc Module handling the network request to the server to fetch the data needed for the Web App
*/
var NetworkManager = (function () {
    
    let mHeaders = new Headers();
    mHeaders.append("Content-Type","application/json")
    /**
    * @description Function that append or set a item to the header
    * @param {String} key - The header field name
    * @param {String} value - the field value to add
    */
    function addHeaderValue(key, value){
        mHeaders.append(key,value);
    }
    /**
    * @description Function that append the Authorization header
    * @param {String} type - The type of authorization
    * @param {String} value - the value of the authorization token
    */
    function setAuthorizationHeader(type,value){
        if(type!='Basic' && type!='Bearer' && type!='Digest' && type!='HOBA' && type!='Mutual' && type!='AWS4-HMAC-SHA256'){
            return;
        }
        let finalValue = `${type} ${value}`;
        addHeaderValue('Authorization',finalValue);
    }
    /**
    * @description Function that append the Bearer Authorization header
    * @param {String} jwt - the value of the JWT authorization token
    */
    function setJwtAuthorization(jwt){
        setAuthorizationHeader('Bearer',jwt);
    }    
    /**
    * @description Method to use fetch to realize a GET request
    * @param {String} url - The url to realiaze the GET request.
    * @return {Promise<Object>} a promise containing the JSON object 
    */
    async function getData(url = '') {
        let mInit = { 
            method:'GET',
            headers: mHeaders,
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
        let request = new Request(url,mInit);
        const response = await fetch(request);
        try{
            return response.json();
        }catch(error){
            console.log("error: ",error);
            return {};
        }
    }
    /**
    * @description Method to use fetch to realize a POST request
    * @param {String} url - The url to realiaze the POST request.
    * @param {Object} data - the data to send to backend
    * @return {Promise<Object>} a promise containing the JSON object 
    */
    async function postData(url = '',data = {}) {
            let mInit = { 
                method:'POST',
                headers: mHeaders,
                body: JSON.stringify(data),
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            };
            let request = new Request(url,mInit);
            const response = await fetch(request);
            try{
                return response.json();
            }catch(error){
                console.log("error: ",error);
                return {};
            }
    }
    /**
    * @description Method to use fetch to realize a DELETE request
    * @param {String} url - The url to realiaze the DELETE request.
    * @return {Promise<Object>} a promise containing the JSON object 
    */
    async function deleteData(url = '') {
            let mInit = { 
                method:'DELETE',
                headers: mHeaders,
                body: '', //JSON.stringify(data)
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            };
            let request = new Request(url,mInit);
            const response = await fetch(request);
            try{
                return response;
            }catch(error){
                console.log("error: ",error);
                return {};
            }
    }   
    /**
    * @description Method to use fetch to realize a PATCH request
    * @param {String} url - The url to realiaze the PATCH request.
    * @param {Object} data - the data to send to backend
    * @return {Promise<Object>} a promise containing the JSON object 
    */
     async function patchData(url = '',data = {}) {
        let mInit = { 
            method:'PATCH',
            headers: mHeaders,
            body: JSON.stringify(data),
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
        let request = new Request(url,mInit);
        const response = await fetch(request);
        try{
            return response;
        }catch(error){
            console.log("error: ",error);
            return {};
        }
    }
    return {
      getData,
      postData,
      patchData,
      deleteData,
      setJwtAuthorization
    };
})();

export {NetworkManager}