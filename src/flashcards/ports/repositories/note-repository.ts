import { Note, NoteType } from '@src/flashcards/models'
import { IQuestionComparer } from '@src/flashcards/ports'

export default interface INoteRepository<IdType> {
    /**
     * Creates new card
     * @returns New card
     */
    createNote(noteType: NoteType): Note

    /**
     * Saves changes of the specified card
     * @param card Note to save
     */
    saveNote(card: Note): void

    /**
     * Deletes card
     * @param id Id of Note to delete
     */
    deleteNote(id: IdType): void

    /**
     * Finds card
     * @param id Id of card
     */
    findNoteById(id: IdType): Note

    /**
     * Returns list of notes that matches search criteria
     * @param question Query to search
     * @param comparer Compares questions for equality
     */
    findNoteByQuestion(question: string, comparer: IQuestionComparer): Note[]
}
