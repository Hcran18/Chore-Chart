export class User {
    // A user has a ID, name, and points
    constructor(id, name, points) {
        this.id = id
        this.name = name
        this.points = points
    }

    // Get the user's ID
    getID() {
        return this.id
    }

    // Set the user's ID
    setID(id) {
        this.id = id
    }

    // Get the user's name
    getName() {
        // Capitalize the first letter of the user's name
        this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
        return this.name
    }

    // Set the user's name
    setName(name) {
        this.name = name
    }

    // Get the user's points
    getPoints() {
        return this.points
    }

    // Set the user's points
    setPoints(points) {
        this.points = points
    }
}