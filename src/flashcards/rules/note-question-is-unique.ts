import { SarasvatiError } from '@src/core/exceptions'
import { EntityId } from '@src/core/models/entity'
import { INoteRepository, IQuestionComparer } from '@src/flashcards/ports'

/**
 * Checks if the note has a unique question
 */
export class NoteQuestionIsUniqueRule {
    constructor(
        private noteRepsitory: INoteRepository<EntityId>,
        private questionComparer: IQuestionComparer
    ) {}

    check(question: string) {
        const cards = this.noteRepsitory.findNoteByQuestion(question, this.questionComparer)
        if (cards.length >= 1) {
            throw new SarasvatiError('Note with the same question already exists')
        }
    }
}