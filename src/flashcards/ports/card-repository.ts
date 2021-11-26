import { Note, NoteType } from '@src/flashcards/models'
import { IQuestionComparer } from '@src/flashcards/ports'

export default interface ICardRepository<IdType> {
    /**
     * Creates new card
     * @returns New card
     */
    createCard(noteType: NoteType): Note

    /**
     * Saves changes of the specified card
     * @param card Note to save
     */
    saveCard(card: Note): void

    /**
     * Deletes card
     * @param id Id of Note to delete
     */
    deleteCard(id: IdType): void

    /**
     * Finds card
     * @param id Id of card
     */
    findCardById(id: IdType): Note

    /**
     * Returns list of cards that matches search criteria
     * @param question Query to search
     * @param comparer Compares questions for equality
     */
    findCardByQuestion(question: string, comparer: IQuestionComparer): Note[]
}
