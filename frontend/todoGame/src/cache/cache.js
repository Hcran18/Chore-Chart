// Use the singleton pattern to create a cache object
export class Cache {

    static instance = null
    static user = null

    constructor() {}

    static getInstance() {
        if (this.instance === null) {
            this.instance = new Cache()
        }
        return this.instance
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

export default Cache