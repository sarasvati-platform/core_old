import { SarasvatiError } from '@src/core/exceptions'
import { EntityId } from '@src/core/models/entity'
import { Note } from '@src/flashcards/models'
import { INoteRepository, IQuestionComparer } from '@src/flashcards/ports'

/**
 * Checks if the note has a unique question
 */
export class NoteQuestionIsUniqueRule {
    constructor(
        private noteRepsitory: INoteRepository<EntityId>,
        private questionComparer: IQuestionComparer
    ) {}

    check(note: Note) {
        const cards = this.noteRepsitory.findNoteByQuestion(note.question, this.questionComparer)
        if (cards.length == 1 && cards[0].id != note.id) {
            throw new SarasvatiError('Note with the same question already exists')
        } else if (cards.length > 1) {
            throw new SarasvatiError('Note with the same question already exists')
        }
    }
}