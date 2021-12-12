import { EntityId } from '@src/core/models/entity'
import { ICardRepository, IQuestionComparer } from '@src/flashcards/ports'
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
        private repository: ICardRepository<EntityId>,
        private questionComparer: IQuestionComparer = new QuestionComparer()
    ) {
        this.noteQuestionIsUnique = new NoteQuestionIsUniqueRule(repository, questionComparer)
        this.noteTypeMustHaveFields = new NoteTypeMustHaveFieldsRule()
    }

    /**
     * Creates a new card
     * @param name Note type name
     * @returns Newly created note type
     */
    createNote(noteType: NoteType): Note {
        this.noteTypeMustHaveFields.check(noteType)
        return this.repository.createNote(noteType)
    }

    /**
     * Saves changes of specified card
     * @param card Note to save
     */
    saveNote(card: Note) {
        this.noteQuestionIsUnique.check(card.question)
        this.repository.saveNote(card)
    }

    /**
     * Deletes card
     * @param card Note to delete
     */
    deleteNote(card: Note) {
        this.repository.deleteNote(card.id)
    }

    /**
     * Finds card
     * @param id Id of card
     * @returns Note if found, otherwise undefined
     */
    findNote(id: EntityId): Note {
        return this.repository.findNoteById(id)
    }

    /**
     * Find cards by question
     * @param question Search criteria
     * @returns List of cards that matches the searching criteria
     */
    findNoteByQuestion(question: string): Note[]  {
        return this.repository.findNoteByQuestion(question, this.questionComparer)
    }
}
