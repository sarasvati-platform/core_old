import { EntityId } from '@src/core/models/entity'
import { CardType, Note } from '@src/flashcards/models'

export class Card {
    /**
     * Initializes a new instance of the CardType class using the specified name
     * @param name Name of the card type
     */
    constructor(
        public id: EntityId,
        public type: CardType,
        public note: Note,
    ) {
    }
}

export class RenderedCard {
    constructor(
        public sections: string[]
    ) {}
}