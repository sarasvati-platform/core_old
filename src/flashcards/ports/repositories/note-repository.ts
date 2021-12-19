import { Note, NoteType } from '@src/flashcards/models'
import { IQuestionComparer } from '@src/flashcards/ports'

export default interface INoteRepository<IdType> {

    /* -------------------------------------------------------------------------- */
    /*                          Create / Update / Delete                          */
    /* -------------------------------------------------------------------------- */

    /**
     * Creates new note
     * @returns New note
     */
    createNote(type: NoteType): Note

    /**
     * Saves changes of the specified note
     * @param note Note to save
     */
    saveNote(note: Note): void

    /**
     * Deletes note
     * @param id Id of Note to delete
     */
    deleteNote(id: IdType): void

    /* -------------------------------------------------------------------------- */
    /*                                    Find                                    */
    /* -------------------------------------------------------------------------- */

    /**
     * Finds note
     * @param id Id of note
     */
    findNoteById(id: IdType): Note

    /**
     * Returns list of notes that matches search criteria
     * @param question Query to search
     * @param comparer Compares questions for equality
     */
    findNoteByQuestion(question: string, comparer: IQuestionComparer): ReadonlyArray<Note>
}
