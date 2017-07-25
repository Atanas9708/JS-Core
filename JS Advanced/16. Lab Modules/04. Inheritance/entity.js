class Entity {
    constructor(name){
        if (new.target == Entity)
            throw new Error("Cannot create an instance of the abstract class Entity")
        this.name = name;
    }
}

module.exports = Entity;