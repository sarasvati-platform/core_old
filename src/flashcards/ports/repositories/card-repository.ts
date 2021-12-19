import { CardType, Note, Card } from '@src/flashcards/models'

export default interface ICardRepository<IdType> {

    /* -------------------------------------------------------------------------- */
    /*                          Create / Update / Delete                          */
    /* -------------------------------------------------------------------------- */

    /**
     * Creates new card using specified type and note
     * @param type Type of a card
     * @param note Note to get data from
     */
    createCard(type: CardType, note: Note): Card

    /**
     * Saves changes of the specified card
     * @param note Card to save
     */
    saveCard(card: Card): void

    /**
     * Deletes card
     * @param id Id of NoteType to delete
     */
    deleteCard(id: IdType): void

    /* -------------------------------------------------------------------------- */
    /*                                    Find                                    */
    /* -------------------------------------------------------------------------- */

    /**
     * Finds card by id
     * @param id Id of a card
     */
    findCardById(id: IdType): Card

    /**
     * Returns all cards
     * @returns All cards
     */
    getAllCards(): ReadonlyArray<Card>

    /**
     * Returns cards of the specified note
     * @param note Note
     */
    getCardsOfNote(note: Note): ReadonlyArray<Card>
}
