import { EntityId } from '@src/core/models/entity'
import { INoteRepository, IQuestionComparer } from '@src/flashcards/ports'
import { QuestionComparer } from '@src/flashcards/aux/question-comparer'
import { Note, NoteType } from '@src/flashcards/models'
import { NoteQuestionIsUniqueRule } from '@src/flashcards/rules/note-question-is-unique'
import { NoteTypeMustHaveFieldsRule } from '../../rules/note-type-must-have-fields'


/**
 * Manages list of [notes]{@link Note}.
 */
export class ManageNotesUseCase {
    private noteQuestionIsUnique: NoteQuestionIsUniqueRule
    private noteTypeMustHaveFields: NoteTypeMustHaveFieldsRule

    /**
     * Initializes a new instance of the ManageNotesUseCase class
     * @param repository Note repository
     * @param questionComparer Comparer to find notes by question
     */
    constructor(
        private repository: INoteRepository<EntityId>,
        private questionComparer: IQuestionComparer = new QuestionComparer()
    ) {
        this.noteQuestionIsUnique = new NoteQuestionIsUniqueRule(repository, questionComparer)
        this.noteTypeMustHaveFields = new NoteTypeMustHaveFieldsRule()
    }

    /**
     * Creates a new note
     * @param name Note type name
     * @returns Newly created note type
     */
    createNote(noteType: NoteType): Note {
        this.noteTypeMustHaveFields.check(noteType)
        return this.repository.createNote(noteType)
    }

    /**
     * Saves changes of specified note
     * @param card Note to save
     */
    saveNote(note: Note) {
        this.noteQuestionIsUnique.check(note)
        this.repository.saveNote(note)
    }

    /**
     * Deletes note
     * @param card Note to delete
     */
    deleteNote(card: Note) {
        this.repository.deleteNote(card.id)
    }

    /**
     * Finds note
     * @param id Id of card
     * @returns Note if found, otherwise undefined
     */
    findNote(id: EntityId): Note {
        return this.repository.findNoteById(id)
    }

    /**
     * Find note by question
     * @param question Search criteria
     * @returns List of cards that matches the searching criteria
     */
    findNoteByQuestion(question: string): ReadonlyArray<Note>  {
        return this.repository.findNoteByQuestion(question, this.questionComparer)
    }
}
