import { Entity, EntityId } from '@src/core/models/entity'
import { CardField } from '@src/flashcards/models'

export class CardType extends Entity {
    fields: CardField[] = []

    /**
     * Initializes a new instance of the CardType class using the specified id and name
     * @param id Id of a card type
     * @param name Name of a card type
     */
    constructor(
        public id: EntityId,
        public name: string
    ) {
        super(id)
        this.name = name
    }

    getField(name: string): CardField {
        return this.fields.find(field => field.name === name)
    }

    /**
     * Adds a new field
     * @param name Name of a field
     * @returns Field
     */
    addField(name: string): CardField {
        const field = new CardField(name)
        this.fields.push(field)
        return field
    }

    /**
     * Deletes the field
     * @param name Name of a field
     * @returns Field
     */
    deleteField(name: string) {
        this.fields = this.fields.filter(field => field.name !== name)
    }
}