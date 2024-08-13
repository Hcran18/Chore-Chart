export class Request {
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

    async post(url, errMessage) {
        return this.request(url, 'POST', errMessage)
    }

    async get(url, errMessage) {
        return this.request(url, 'GET', errMessage)
    }

    async put(url, errMessage) {
        return this.request(url, 'PUT', errMessage)
    }

    async delete(url, errMessage) {
        return this.request(url, 'DELETE', errMessage)
    }
}