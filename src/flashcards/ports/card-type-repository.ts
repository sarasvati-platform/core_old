import { EntityId } from '@src/core/models/entity';
import { CardType } from '@src/flashcards/models';

export default interface ICardTypeRepository {
    /**
     * Creates new type of cards using specified name
     * @param name Name of the new type of cards
     * @returns New card type
     */
    createCardType(name: string): CardType

    /**
     * Deletes card type
     * @param id Id of CardType to delte
     */
    deleteCardType(id: EntityId): void

    /**
     * Finds type of a card
     * @param id Id of a type of card to find
     */
    findCardTypeById(id: EntityId): CardType
}
