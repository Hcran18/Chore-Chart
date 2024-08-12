// Use the singleton pattern to create a cache object
export class Cache {

    static instance = null
    static user = null

    static getInstance() {
        if (Cache.instance === null) {
            Cache.instance = new Cache()
        }
        return Cache.instance
    }

    constructor(user) {
        this.user = user
    }

    // Set the user
    setUser(user) {
        this.user = user
    }

    // Get the user
    getUser() {
        return this.user
    }
}