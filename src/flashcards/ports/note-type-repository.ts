import { NoteType } from '@src/flashcards/models'

export default interface INoteTypeRepository<IdType> {
    /**
     * Creates new type of cards using specified name
     * @param name Name of the new type of cards
     * @returns New note type
     */
    createNoteType(name: string): NoteType

    /**
     * Deletes note type
     * @param id Id of NoteType to delete
     */
    deleteNoteType(id: IdType): void

    /**
     * Finds type of a card
     * @param id Id of a type of card to find
     */
    findNoteTypeById(id: IdType): NoteType
}
