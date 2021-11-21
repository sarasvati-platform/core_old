import { Card, CardType } from '@src/flashcards/models'

export default interface ICardRepository<IdType> {
    /**
     * Creates new card
     * @returns New card
     */
    createCard(cardType: CardType): Card

    /**
     * Deletes card
     * @param id Id of Card to delete
     */
    deleteCard(id: IdType): void

    /**
     * Finds card
     * @param id Id of card
     */
    findCardById(id: IdType): Card

    findByQuestion(question: string): Card[]
}
