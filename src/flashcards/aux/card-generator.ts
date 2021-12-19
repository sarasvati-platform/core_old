import { ICardRepository } from '@src/flashcards/ports'
import { EntityId } from '@src/core/models/entity'
import { Note, Card } from '@src/flashcards/models'

export class CardsGenerator {
    /**
     * Initializes a new instance of the ManageNotesUseCase class
     * @param repository Note repository
     * @param questionComparer Comparer to find notes by question
     */
    constructor(
        private repository: ICardRepository<EntityId>,
    ){
    }

    generateCards(note: Note): Card[] {
        const result: Card[] = []

        for (const cardType of note.type.cardTypes.all) {
            const card = this.repository.createCard(cardType, note)
            result.push(card)
        }

        return result
    }
}
