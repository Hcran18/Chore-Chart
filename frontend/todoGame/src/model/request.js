export class Request {
    /**
     * request method to send a response to an api
     * @param {String} url 
     * @param {String} method 
     * @param {String} errMessage 
     * @returns {Promise<any>} data from api
     */
    async request(url, method, errMessage) {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(errMessage)
        }

        const data = await response.json()

        return data
    }

    /**
     * Send a post request
     * @param {String} url 
     * @param {String} errMessage 
     * @returns {Promise<any>} data from api
     */
    async post(url, errMessage) {
        return this.request(url, 'POST', errMessage)
    }

    /**
     * Send a get request
     * @param {String} url 
     * @param {String} errMessage 
     * @returns {Promise<any>} data from api
     */
    async get(url, errMessage) {
        return this.request(url, 'GET', errMessage)
    }

    /**
     * Send a put request
     * @param {String} url 
     * @param {String} errMessage 
     * @returns {Promise<any>} data from api
     */
    async put(url, errMessage) {
        return this.request(url, 'PUT', errMessage)
    }

    /**
     * send a delete request
     * @param {String} url 
     * @param {String} errMessage 
     * @returns {Promise<any>} data from api
     */
    async delete(url, errMessage) {
        return this.request(url, 'DELETE', errMessage)
    }
}