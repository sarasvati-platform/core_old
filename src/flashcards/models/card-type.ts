import { Entity, EntityId } from '@src/core/models/entity'
import { CardFieldsCollection } from '@src/flashcards/models'

export class CardType extends Entity {
    fieldsCollection = new CardFieldsCollection()

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

    get fields(): CardFieldsCollection {
        return this.fieldsCollection
    }
}