import { EntityId } from '@src/core/models/entity'
import { ICardRepository } from '@src/flashcards/ports'
import { Card, CardType } from '@src/flashcards/models'
import { SarasvatiError } from '@src/core/exceptions'


export class ManageCardsUseCase {
    constructor(
        private repository: ICardRepository<EntityId>
    ) {}

    /**
     * Creates a new card
     * @param name Card type name
     * @returns Newly created card type
     */
    create(cardType: CardType): Card {
        return this.repository.createCard(cardType)
    }

    save(card: Card) {
        const cards = this.repository.findByQuestion(card.question)
        if (cards.length > 1) { throw new SarasvatiError('Card with the same question already exists') }
    }

    /**
     * Deletes card
     * @param card Card to delete
     */
    delete(card: Card) {
        this.repository.deleteCard(card.id)
    }

    /**
     * Finds card
     * @param id Id of card
     * @returns Card if found, otherwise undefined
     */
    find(id: EntityId): Card {
        return this.repository.findCardById(id)
    }

    findByQuestion(cardQuestion: string): Card[]  {
        return this.repository.findByQuestion(cardQuestion)
    }
}
