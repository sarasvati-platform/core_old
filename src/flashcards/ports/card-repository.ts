import { Card, CardType } from '@src/flashcards/models'
import { IQuestionComparer } from '@src/flashcards/ports'

export default interface ICardRepository<IdType> {
    /**
     * Creates new card
     * @returns New card
     */
    createCard(cardType: CardType): Card

    /**
     * Saves changes of the specified card
     * @param card Card to save
     */
    saveCard(card: Card): void

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

    /**
     * Returns list of cards that matches search criteria
     * @param question Query to search
     * @param comparer Compares questions for equality
     */
    findCardByQuestion(question: string, comparer: IQuestionComparer): Card[]
}
