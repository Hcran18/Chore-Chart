import { Cache } from "./cache"

export class Register {
    cache = null 
    user = null

    constructor(cache) {
        this.cache = cache
        this.user = cache.getUser()
    }

    async signUp() {
        const url = 'http://localhost:8000/register/' + this.user.getID() + '/' + this.user.getName()

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('There was an error signing up')
        }

        const data = await response.json()

        return data
    }

}