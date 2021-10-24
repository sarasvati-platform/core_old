export type EntityId = string

export class Entity {
    constructor (
        public id: EntityId
    ) {
        this.id = id
    }
}