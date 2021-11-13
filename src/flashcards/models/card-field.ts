import { NamedCollection } from './card-collection'

export class CardField {
    /**
     * Initializes a new instance of the CardField class using the specified name
     * @param name Name of the field
     */
    constructor(
        public name: string
    ) {
    }
}

export class CardFieldsCollection extends NamedCollection<CardField> {
    protected _new(name: string): CardField {
        return new CardField(name)
    }
}