import { Entity, EntityId } from '@src/core/models/entity'
import { CardField } from '@src/flashcards/models'
import { UnableToAddFieldError } from '@src/flashcards/exceptions/manage-card-types';

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
        // Check if the field with the same name already exists
        const fieldWithSameName = this.getField(name)
        if (fieldWithSameName)
            throw new UnableToAddFieldError('Field with same name already exists')

        // Add and return new field
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