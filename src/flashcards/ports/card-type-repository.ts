import { CardType } from '@src/flashcards/models'

export default interface ICardTypeRepository<IdType> {
    /**
     * Creates new type of cards using specified name
     * @param name Name of the new type of cards
     * @returns New card type
     */
    createCardType(name: string): CardType

    /**
     * Deletes card type
     * @param id Id of CardType to delete
     */
    deleteCardType(id: IdType): void

    /**
     * Finds type of a card
     * @param id Id of a type of card to find
     */
    findCardTypeById(id: IdType): CardType
}
