import { SarasvatiError } from '@src/core/exceptions'
import { EntityId } from '@src/core/models/entity'
import { ICardRepository, IQuestionComparer } from '@src/flashcards/ports'

/**
 * Checks if the card has a unique question
 */
export class NoteQuestionIsUniqueRule {
    constructor(
        private cardsRepsitory: ICardRepository<EntityId>,
        private questionComparer: IQuestionComparer
    ) {}

    check(question: string) {
        const cards = this.cardsRepsitory.findCardByQuestion(question, this.questionComparer)
        if (cards.length >= 1) {
            throw new SarasvatiError('Card with the same question already exists')
        }
    }
}